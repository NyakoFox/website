'use client'

import { useEffect, useRef, useState } from "react";
import TextRenderer from './TextRenderer';
import style from './ItemRenderer.module.css';

export default function ItemRenderer({ item, lang = {}, name = false, components = {} }) {

    const ToTextComponent = (text) => {
        if (!text) return null;

        return "{ \"text\": \"" + text + "\" }";
    };

    const translatedName = components.item_name ?? ToTextComponent(lang["item.minecraft." + item]) ?? ToTextComponent(lang["block.minecraft." + item]) ?? ToTextComponent(item);
    const displayName = components.custom_name ?? translatedName;
    const hasCustomName = components.custom_name !== undefined;
    const tooltip = useRef(null);
    const [hovered, setHovered] = useState(false);
    const [mouse_x, setMouseX] = useState(0);
    const [mouse_y, setMouseY] = useState(0);
    const [errored, setErrored] = useState(false);
    const [image, setImage] = useState("/minecraft/renders/" + item + ".png");

    const baseStyle = {
        color: "white",
        bold: false,
        italic: false
    }

    if (components.rarity === "common")
    {
        baseStyle.color = "white";
    }
    else if (components.rarity === "uncommon")
    {
        baseStyle.color = "yellow";
    }
    else if (components.rarity === "rare")
    {
        baseStyle.color = "aqua";
    }
    else if (components.rarity === "epic")
    {
        baseStyle.color = "light_purple";
    }

    if (hasCustomName)
    {
        baseStyle.italic = true;
    }

    useEffect(() => {
        setImage("/minecraft/renders/" + item + ".png");
    }, [item]);

    useEffect(() => {
        if (tooltip.current && hovered) {
            /* attach to cursor */
            tooltip.current.style.left = mouse_x + 24 + "px";
            tooltip.current.style.top = mouse_y + "px";
        }
    });

    return <>
        <div className={style.item}
            onMouseEnter={(e) => {
                setMouseX(e.clientX);
                setMouseY(e.clientY);
                setHovered(true);
            }}
            onMouseLeave={(e) => {
                setMouseX(e.clientX);
                setMouseY(e.clientY);
                setHovered(false);
            }}
            onMouseMove={(e) => {
                setMouseX(e.clientX);
                setMouseY(e.clientY);
            }} 
        >
            <img src={image} alt={translatedName} onError={() => {
                if (!errored) {
                    setImage("/minecraft/renders/missing.png");
                    setErrored(true);
                }
            }} />
            {
                name && <TextRenderer text={displayName} baseStyle={baseStyle} />
            }
            {
                !components.hide_tooltip && hovered && <div ref={tooltip} className={style.tooltip}><TextRenderer text={displayName} baseStyle={baseStyle} /></div>
            }
        </div>
    </>
}
