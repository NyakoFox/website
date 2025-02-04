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

export async function load_image_white(name)
{
    // Load the image
    const image = await load_image(`/vvvvvv/${name}.png`)

    // Let's make it white. every pixel should have its r, g and b values always 255. alpha is untouched.
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

    return canvas;
}
