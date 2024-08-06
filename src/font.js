async function load_image(url)
{
    // create a promise, and resolve it when the image is loaded
    return new Promise((resolve, reject) => {
        const image = new Image()
        image.src = url
        image.onload = () => {
            resolve(image)
        }
    })
}

function get_advance(font, char)
{
    if (char in font.special)
    {
        return font.special[char].advance
    }
    else
    {
        return font.width
    }
}

export function get_text_size(font, text)
{
    const chars = font.chars
    const width = font.width
    const height = font.height

    let cx = 0
    let cy = 0

    for (let i = 0; i < text.length; i++)
    {
        const char = text.codePointAt(i)
        if (char >= 0x10000)
        {
            i++;
        }

        if (char in chars)
        {
            cx += get_advance(font, char)
        }
        else if (font.fallback_font !== undefined && char in font.fallback_font.chars)
        {
            cx += width
        }
        else if (0xFFFD in chars)
        {
            cx += get_advance(font, 0xFFFD)
        }
        else
        {
            cx += get_advance(font, 63)
        }
    }

    return { width: cx, height: height }
}

export function draw_text(ctx, font, text, x, y)
{
    const chars = font.chars
    const width = font.width
    const height = font.height

    let cx = x
    let cy = y

    // lets care about fillStyle... ugh

    const newCanvas = document.createElement('canvas')
    newCanvas.width = font.image.width
    newCanvas.height = font.image.height
    const newCtx = newCanvas.getContext('2d')
    newCtx.drawImage(font.image, 0, 0)
    const data = newCtx.getImageData(0, 0, font.image.width, font.image.height)

    let r = 0
    let g = 0
    let b = 0
    // Okay okay, let's parse ctx.fillStyle

    if (ctx.fillStyle.startsWith('#'))
    {
        const hex = ctx.fillStyle.substring(1)
        r = parseInt(hex.substring(0, 2), 16)
        g = parseInt(hex.substring(2, 4), 16)
        b = parseInt(hex.substring(4, 6), 16)
    }
    else if (ctx.fillStyle.startsWith('rgb'))
    {
        const rgb = ctx.fillStyle.substring(4, ctx.fillStyle.length - 1).split(',')
        r = parseInt(rgb[0])
        g = parseInt(rgb[1])
        b = parseInt(rgb[2])
    }
    else
    {
        // it might just be a color name? is there an api for this? whatever, make it white
        r = 255
        g = 255
        b = 255
    }

    for (let i = 0; i < data.data.length; i += 4)
    {
        data.data[i] = r
        data.data[i + 1] = g
        data.data[i + 2] = b
    }
    newCtx.putImageData(data, 0, 0)

    for (let i = 0; i < text.length; i++)
    {
        const char = text.codePointAt(i)
        if (char >= 0x10000)
        {
            i++;
        }

        if (char in chars)
        {
            const c = chars[char]
            ctx.drawImage(newCanvas, c.x, c.y, width, height, cx, cy, width, height)
            cx += get_advance(font, char)
        }
        else if (font.fallback_font !== undefined && char in font.fallback_font.chars)
        {
            const c = font.fallback_font.chars[char]

            const fallback_width = font.fallback_font.width
            const fallback_height = font.fallback_font.height

            const offx = Math.trunc((width - fallback_width) / 2)
            const offy = Math.trunc((height - fallback_height) / 2)

            ctx.drawImage(font.fallback_font.image, c.x, c.y, font.fallback_font.width, font.fallback_font.height, cx + offx, cy + offy, font.fallback_font.width, font.fallback_font.height)
            cx += width
        }
        else if (0xFFFD in chars)
        {
            const c = chars[0xFFFD]
            ctx.drawImage(newCanvas, c.x, c.y, width, height, cx, cy, width, height)
            cx += get_advance(font, 0xFFFD)
        }
        else
        {
            // use ?
            const c = chars[63]
            ctx.drawImage(newCanvas, c.x, c.y, width, height, cx, cy, width, height)
            cx += get_advance(font, 63)
        }
    }
}

export async function load_font(font_name)
{
    // Load the image
    const image = await load_image(`/vvvvvv/fonts/${font_name}.png`)

    // Load the XML
    const parser = new DOMParser()
    const request = await fetch(`/vvvvvv/fonts/${font_name}.fontmeta`)
    const response = await request.text()
    const xml = parser.parseFromString(response, 'text/xml')
    const root = xml.documentElement

    const font = {
        type: root.getElementsByTagName('type')[0]?.textContent, // either unspecified (undefined here), or "buttons"
        name: root.getElementsByTagName('display_name')[0]?.textContent ?? "Unnamed Font",
        width: parseInt(root.getElementsByTagName('width')[0]?.textContent ?? 8),
        height: parseInt(root.getElementsByTagName('height')[0]?.textContent ?? 8),
        white_teeth: parseInt(root.getElementsByTagName('white_teeth')[0]?.textContent ?? 0),
        fallback: root.getElementsByTagName('fallback')[0]?.textContent, // can be undefined!
        chars: {},
        special: {},
        image: image
    }

    if (font.fallback !== undefined)
    {
        font.fallback_font = await load_font(font.fallback)
    }

    if (font.white_teeth == 0)
    {
        // Font isn't completely white, so let's make it white. every pixel should have its r, g and b values always 255. alpha is untouched.
        const canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(image, 0, 0)
        const data = ctx.getImageData(0, 0, image.width, image.height)
        for (let i = 0; i < data.data.length; i += 4)
        {
            data.data[i] = 255
            data.data[i + 1] = 255
            data.data[i + 2] = 255
        }
        ctx.putImageData(data, 0, 0)
        font.image = canvas
    }

    let x = 0
    let y = 0

    // loop through root -> chars
    for (const range of root.getElementsByTagName('chars')[0].getElementsByTagName('range'))
    {
        const start = parseInt(range.getAttribute('start'))
        const end = parseInt(range.getAttribute('end'))

        for (let i = start; i <= end; i++)
        {
            font.chars[i] = {
                x: x,
                y: y
            }

            x += font.width
            if (x >= image.width)
            {
                x = 0
                y += font.height
            }
        }
    }

    // loop through root -> special
    if (root.getElementsByTagName('special').length == 0)
    {
        // no special characters
        return font
    }

    for (const special of root.getElementsByTagName('special')[0].getElementsByTagName('range'))
    {
        const start = parseInt(special.getAttribute('start'))
        const end = parseInt(special.getAttribute('end'))

        for (let i = start; i <= end; i++)
        {
            font.special[i] = {
                advance: parseInt(special.getAttribute('advance')) ?? font.width,
                color: parseInt(special.getAttribute('color') ?? 0)
            }
        }
    }

    return font
}
