'use client'

export default function TextRenderer({ text, baseStyle = {} }) {
    const colorToHex = (color) => {
        if (!color) return '#FFFFFF';

        switch(color)
        {
            case "dark_red": return "#AA0000";
            case "red": return "#FF5555";
            case "gold": return "#FFAA00";
            case "yellow": return "#FFFF55";
            case "dark_green": return "#00AA00";
            case "green": return "#55FF55";
            case "aqua": return "#55FFFF";
            case "dark_aqua": return "#00AAAA";
            case "dark_blue": return "#0000AA";
            case "blue": return "#5555FF";
            case "light_purple": return "#FF55FF";
            case "dark_purple": return "#AA00AA";
            case "white": return "#FFFFFF";
            case "gray": return "#AAAAAA";
            case "dark_gray": return "#555555";
            case "black": return "#000000";
        }
        // ok, well, if it starts with #, then return it, its hex
        if (color.startsWith('#')) return color;
    };

    // first, let's assume it's json. but, wrap in a try/catch block in case it's not

    let json = [];
    try {
        json = JSON.parse(text)
    } catch (e) {
        // okay, it's invalid json. scary error
        json = [{ text: "ERROR! Invalid JSON!" }]
    }

    // what if it's an object? wrap it in an array
    if (typeof json === 'object' && !Array.isArray(json)) json = [json]
    if (typeof json === 'string') {
        json = [{ text: json }]
        // If it contains `{`, `}`, `[`, `]` or `:`, it should be invalid. Minecraft quirk...
        if (json[0].text.match(/[\{\}\[\]:]/)) {
            json = [{ text: "ERROR! Invalid JSON!" }]
        }
    }

    // okay, it's an array. map over it and return a span for each element
    return <span>
        {json.map((element, index) => {
            // if the element is a string, just return that
            if (typeof element === 'string') return <span key={index}>{element}</span>

            // if the element is an object...
            return <span key={index} style={{
                color: colorToHex(element.color ?? baseStyle.color),
                fontFamily: (element.bold ?? baseStyle.bold) ? ((element.italic ?? baseStyle.italic) ? 'MinecraftBoldItalic' : 'MinecraftBold') : ((element.italic ?? baseStyle.italic) ? 'MinecraftItalic' : 'MinecraftRegular')
            }}>{element.text}</span>
        })}
    </span>
}
