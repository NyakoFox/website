'use client'

import { useEffect, useState } from "react";
import style from './ItemPicker.module.css';
import ItemRenderer from './ItemRenderer';

export default function ItemPicker({ item, setItem, lang, className }) {
    const [open, setOpen] = useState(false);

    const [items, setItems] = useState({});
    useEffect(() => {
        async function doFetch() {
            const resp = await fetch('https://raw.githubusercontent.com/misode/mcmeta/summary/item_components/data.json');
            setItems(await resp.json());
        };
        doFetch();
    }, [])

    return <div className={className}>
        <div onClick={() => setOpen(!open)} className={style.item_picker_display}>
            {item == null ? 'Select Item...' : <ItemRenderer lang={lang} item={item} name={true}/>}
            <div className={style.arrow}>{open ? '⮝' : '⮟'}</div>
        </div>
        {open && <div className={style.item_picker}>
            {
                Object.keys(items).map((key) => {
                    return <div key={key} onClick={() => { setOpen(false); setItem(key) }}>
                        <ItemRenderer lang={lang} item={key} />
                    </div>
                })
            }
        </div>}
    </div>
}
