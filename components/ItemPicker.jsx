'use client'

import { useEffect, useState } from "react";
import style from './ItemPicker.module.css';
import ItemRenderer from './ItemRenderer';

function componentArrayToObject(components) {
    let obj = {};
    for (let i = 0; i < components.length; i++) {
        obj[components[i].type.replace('minecraft:', '')] = components[i].value;
    }
    return obj;
}

export default function ItemPicker({ item, setItem, lang, className, items }) {
    const [open, setOpen] = useState(false);

    return <div className={className}>
        <div onClick={() => setOpen(!open)} className={style.item_picker_display}>
            {item == null ? 'Select Item...' : <ItemRenderer lang={lang} item={item} name={true} components={componentArrayToObject(items[item])} />}
            <div className={style.arrow}>{open ? '⮝' : '⮟'}</div>
        </div>
        {open && <div className={style.item_picker}>
            {
                Object.keys(items).map((key) => {
                    return <div key={key} onClick={() => { setOpen(false); setItem(key) }}>
                        <ItemRenderer lang={lang} item={key} components={componentArrayToObject(items[key])} />
                    </div>
                })
            }
        </div>}
    </div>
}
