'use client'

import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import ItemPicker from '@/components/ItemPicker';
import ItemRenderer from '@/components/ItemRenderer';

function TextInput({ title, placeholder, components, setComponents, keyName, description }) {
    return (
        <div>
            <p>{title}</p>
            <textarea placeholder={placeholder} onChange={(e) => {
                if (e.target.value === "") {
                    let newComponents = { ...components };
                    delete newComponents[keyName];
                    setComponents(newComponents);
                    return;
                }
                let newComponents = { ...components };
                newComponents[keyName] = e.target.value;
                setComponents(newComponents);
            }}></textarea>
            <p className={styles.description}>{description}</p>
        </div>
    )
}

function BooleanOption({ title, components, setComponents, keyName, description }) {
    return (
        <div>
            <p>{title}</p>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
            }}>
                <div>
                    <input type="radio" name={keyName} id={keyName + "_true"} onChange={(e) => {
                        if (e.target.checked) {
                            let newComponents = { ...components };
                            newComponents[keyName] = {};
                            setComponents(newComponents);
                        }
                    }
                    } />
                    <label htmlFor={keyName + "_true"}>True</label>
                </div>
                <div>
                    <input defaultChecked={true} type="radio" name={keyName} id={keyName + "_false"} onChange={(e) => {
                        if (e.target.checked) {
                            let newComponents = { ...components };
                            delete newComponents[keyName];
                            setComponents(newComponents);
                        }
                    }
                    } />
                    <label htmlFor={keyName + "_false"}>False</label>
                </div>
            </div>

            <p className={styles.description}>{description}</p>
        </div>
    )
}

function BooleanDefaultOption({ title, components, setComponents, keyName, description }) {
    // true, false and default.
    // default is leaving it out
    return (
        <div>
            <p>{title}</p>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
            }}>
                <div>
                    <input type="radio" name={keyName} id={keyName + "_true"} onChange={(e) => {
                        if (e.target.checked) {
                            let newComponents = { ...components };
                            newComponents[keyName] = true;
                            setComponents(newComponents);
                        }
                    }
                    } />
                    <label htmlFor={keyName + "_true"}>True</label>
                </div>
                <div>
                    <input type="radio" name={keyName} id={keyName + "_false"} onChange={(e) => {
                        if (e.target.checked) {
                            let newComponents = { ...components };
                            newComponents[keyName] = false;
                            setComponents(newComponents);
                        }
                    }
                    } />
                    <label htmlFor={keyName + "_false"}>False</label>
                </div>
                <div>
                    <input defaultChecked={true} type="radio" name={keyName} id={keyName + "_default"} onChange={(e) => {
                        if (e.target.checked) {
                            let newComponents = { ...components };
                            delete newComponents[keyName];
                            setComponents(newComponents);
                        }
                    }
                    } />
                    <label htmlFor={keyName + "_default"}>Default</label>
                </div>
            </div>

            <p className={styles.description}>{description}</p>
        </div>
    )
}

function GenericRadio({ title, components, setComponents, keyName, options, description }) {
    return (
        <div>
            <p>{title}</p>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
            }}>
                {options.map((option) => {
                    return <div key={option.key ?? option.value}>
                        <input defaultChecked={option.value == "default"} type="radio" name={keyName} id={keyName + "_" + option.key ?? option.value} onChange={(e) => {
                            if (e.target.checked) {
                                if (option.value === "default") {
                                    let newComponents = { ...components };
                                    delete newComponents[keyName];
                                    setComponents(newComponents);
                                    return;
                                }
                                let newComponents = { ...components };
                                newComponents[keyName] = option.value;
                                setComponents(newComponents);
                            }
                        }
                        } />
                        <label htmlFor={keyName + "_" + (option.key ?? option.value)}>{option.label}</label>
                    </div>
                })}
            </div>

            <p className={styles.description}>{description}</p>
        </div>
    )
}

export default function MCItems() {
    const [item, setItem] = useState("stone_sword");
    
    const [loading, setLoading] = useState(true);
    const [lang, setLang] = useState({});
    const [items, setItems] = useState({});

    const [components, setComponents] = useState({});
    const [output, setOutput] = useState("");

    const componentsWithDefaults = () => {
        // ok, so we have "components" which are our custom ones.
        // we also have items[item] which are the default ones.
        // let's merge them together, with the custom ones taking precedence

        let newComponents = {}
        items[item].forEach(element => {
            newComponents[element.type.replace("minecraft:", "")] = element.value;
        });

        for (const key in components) {
            newComponents[key] = components[key];
        }

        return newComponents;
    }

    useEffect(() => {
        async function doFetch() {
            const resp = await fetch('https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/lang/en_us.json');
            setLang(await resp.json());
            const resp2 = await fetch('https://raw.githubusercontent.com/misode/mcmeta/summary/item_components/data.json');
            setItems(await resp.json());
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
                <div>
                    <p>Base Item:</p>
                    <ItemPicker item={item} setItem={setItem} lang={lang} items={items}></ItemPicker>
                    <p className={styles.description}>The base item to modify</p>
                </div>
                <TextInput title="Custom name:" placeholder={"\"My Cool Sword\""} components={components} setComponents={setComponents} keyName="custom_name" description="The custom name of the item, as if it was set in an anvil. Must be JSON." />
                <TextInput title="Item name:" placeholder={"\"Emerald Sword\""} components={components} setComponents={setComponents} keyName="item_name" description="The item name of, as if it was from a language file. Must be JSON." />

                <BooleanDefaultOption title="Enchantment glint override:" components={components} setComponents={setComponents} keyName="enchantment_glint_override" description={`The override for the enchantment glint.
True = always display.
False = never display.
Default = the default behavior.`} />
                <BooleanOption title="Hide tooltip:" components={components} setComponents={setComponents} keyName="hide_tooltip" description="Whether to hide the tooltip when hovering over the item." />
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
                    <p className={styles.description}>The maximum stack size of the item. 0 = Default stack size.</p>
                </div>

                <GenericRadio title="Rarity:" components={components} setComponents={setComponents} keyName="rarity" options={[
                    { key: "default", value: "default", label: "Default" },
                    { key: "common", value: "common", label: "Common" },
                    { key: "uncommon", value: "uncommon", label: "Uncommon" },
                    { key: "rare", value: "rare", label: "Rare" },
                    { key: "epic", value: "epic", label: "Epic" }
                ]} description="The rarity of the item." />
                <GenericRadio title="Unbreakable:" components={components} setComponents={setComponents} keyName="unbreakable" options={[
                    { key: "default", value: "default", label: "False" },
                    { key: "true", value: {}, label: "True" },
                    { key: "true_hide", value: {show_in_tooltip: false}, label: "True, hide in tooltip" }
                ]} description="Whether the item is unbreakable." />

                <div/>

                <div/>
                <div><hr/><br/></div>
                <div/>

                <div/>
                <div>
                    <ItemRenderer item={item} lang={lang} name={true} components={componentsWithDefaults()}></ItemRenderer>
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
