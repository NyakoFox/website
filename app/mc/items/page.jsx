'use client'

import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import ItemPicker from '@/components/ItemPicker';
import ItemRenderer from '@/components/ItemRenderer';

export default function MCItems() {
    const [item, setItem] = useState("stone_sword");

    const [loading, setLoading] = useState(true);
    const [lang, setLang] = useState({});

    const [components, setComponents] = useState({});
    const [output, setOutput] = useState("");


    useEffect(() => {
        async function doFetch() {
            const resp = await fetch('https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/lang/en_us.json');
            const json = await resp.json();
            setLang(json);
            setLoading(false);
        };
        doFetch();
    }, []);

    const ToObject = (obj) => {
        let str = "{";
        let atLeastOne = false;
        for (const key in obj) {
            let value = obj[key];
            if (typeof value === 'string') {
                value = '"' + value + '"';
            }
            else if (typeof value === 'object') {
                value = ToObject(value);
            }
            str += key + ":" + value + ",";
            atLeastOne = true;
        }
        if (atLeastOne) str = str.slice(0, -1);
        str += "}";
        return str;
    }

    useEffect(() => {
        let itemString = item;
        // if components isnt an empty object
        if (Object.keys(components).length !== 0) {
            itemString += "[";
            for (const key in components) {
                let component = components[key];
                // if it's a string, wrap it in quotes, and escape any quotes in the string
                if (typeof component === 'string') {
                    component = component.replace(/"/g, '\\"');
                    component = '"' + component + '"';
                }
                else if (typeof component === 'object') {
                    // if it's an object, let's convert it to a minecraft object
                    component = ToObject(component);
                }

                itemString += key + "=" + component + ",";
            }
            itemString = itemString.slice(0, -1);
            itemString += "]";
        }
        setOutput("/give @a " + itemString);
    }, [item, components]);

    return <>
        <div className={styles.container}>
            <img src="/itemgen.png" alt="Minecraft Item Generator" className={styles.logo} />
            {
            loading ? <p>Loading...</p> :
            <div className={styles.grid}>
                <div className={styles.item}>
                    <p>Base Item:</p>
                    <ItemPicker item={item} setItem={setItem} lang={lang}></ItemPicker>
                    <p className={styles.description}>The base item to modify</p>
                </div>
                <div className={styles.item}>
                    <p>Custom name:</p>
                    <textarea placeholder={"\"My Cool Sword\""} onChange={(e) => {
                        if (e.target.value === "") {
                            let newComponents = { ...components };
                            delete newComponents.custom_name;
                            setComponents(newComponents);
                            return;
                        }
                        setComponents({ ...components, custom_name: e.target.value })}
                    }></textarea>
                    <p className={styles.description}>The custom name of the item, as if it was set in an anvil. Must be JSON.</p>
                </div>
                <div className={styles.item}>
                    <p>Item name:</p>
                    <textarea placeholder={"\"Emerald Sword\""} onChange={(e) => {
                        if (e.target.value === "") {
                            let newComponents = { ...components };
                            delete newComponents.item_name;
                            setComponents(newComponents);
                            return;
                        }
                        setComponents({ ...components, item_name: e.target.value })}
                    }></textarea>
                    <p className={styles.description}>The item name of, as if it was from a language file. Must be JSON.</p>
                </div>

                <div/>
                <div>
                    <p>Hide tooltip:</p>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem'
                    }}>
                        <div>
                            <input type="radio" name="hide_tooltip" id="hide_tooltip_true" onChange={(e) => {
                                if (e.target.checked) setComponents({ ...components, hide_tooltip: {} });
                            }
                            } />
                            <label htmlFor="hide_tooltip_true">True</label>
                        </div>
                        <div>
                            <input defaultChecked={true} type="radio" name="hide_tooltip" id="hide_tooltip_false" onChange={(e) => {
                                if (e.target.checked) {
                                    let newComponents = { ...components };
                                    delete newComponents.hide_tooltip;
                                    setComponents(newComponents);
                                }
                            }
                            } />
                            <label htmlFor="hide_tooltip_false">False</label>
                        </div>
                    </div>

                    <p className={styles.description}>Whether to hide the tooltip when hovering over the item.</p>
                </div>
                <div>
                    <p>Max stack size:</p>
                    <div>
                    <input style={{width: "100%"}} type="range" min={0} max={99} value={components.max_stack_size ?? 0} list="stackSizeMarkers" onChange={(e) => {
                        if (e.target.value === 0) {
                            let newComponents = { ...components };
                            delete newComponents.max_stack_size;
                            setComponents(newComponents);
                            return;
                        }
                        setComponents({ ...components, max_stack_size: parseInt(e.target.value) })}
                    } />
                    <datalist id="stackSizeMarkers">
                        <option value={0} label={0}></option>
                        <option value={1} label={1}></option>
                        <option value={16} label={16}></option>
                        <option value={32} label={32}></option>
                        <option value={64} label={64}></option>
                    </datalist>
                    <input type="number" min={0} max={99} value={components.max_stack_size ?? 0} onChange={(e) => {
                        if (e.target.value === "") {
                            let newComponents = { ...components };
                            delete newComponents.max_stack_size;
                            setComponents(newComponents);
                            return;
                        }
                        setComponents({ ...components, max_stack_size: parseInt(e.target.value) })}
                    } />
                    </div>
                    <p className={styles.description}>The maximum stack size of the item. 0 = Default</p>
                </div>

                <div/>
                <div><hr/><br/></div>
                <div/>

                <div/>
                <div>
                    <ItemRenderer item={item} lang={lang} name={true} components={components}></ItemRenderer>
                </div>
                <div/>

                <div/>
                <div className={styles.output}>
                    {output}
                </div>
                <div/>
            </div>
            }
        </div>
    </>
}
