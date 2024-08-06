'use client';

import { useEffect, useRef, useState } from "react";
import styles from './TextboxGenerator.module.css';
import { load_font, draw_text, get_text_size } from '@/src/font.js';
import TextareaAutosize from 'react-textarea-autosize';
import { RgbColorPicker, HexColorInput } from "react-colorful";

export default function TextboxGenerator() {
    const [text, setText] = useState('');
    const [font, setFont] = useState(null);
    const [canvasWidth, setCanvasWidth] = useState(0);
    const [canvasHeight, setCanvasHeight] = useState(0);
    const [scale, setScale] = useState(2);

    const [colors, setColors] = useState({
        player:      {r: 164, g:164, b: 255},
        cyan:        {r: 164, g:164, b: 255},
        red:         {r: 255, g:60,  b: 60 },
        green:       {r: 144, g:255, b: 144},
        yellow:      {r: 255, g:255, b: 134},
        blue:        {r: 95,  g:95,  b: 255},
        purple:      {r: 255, g:134, b: 255},
        white:       {r: 244, g:244, b: 244},
        gray:        {r: 174, g:174, b: 174},
        orange:      {r: 255, g:130, b: 20 },
        transparent: {r: 0,   g: 0,  b: 0  }
    });

    const [customColor, setCustomColor] = useState({r: 164, g: 164, b: 255});

    const canvas = useRef(null);

    function getForegroundColor(c = customColor) {
        if (c.r === 0 && c.g === 0 && c.b === 0) return 'rgb(255, 255, 255)';
        return `rgb(${c.r}, ${c.g}, ${c.b})`;
    }

    function getBackgroundColor(col = customColor) {
        // divide r, g and b by 6, truncate
        if (col.r === 0 && col.g === 0 && col.b === 0) return 'rgb(0, 0, 0)';
        return `rgb(${col.r / 6}, ${col.g / 6}, ${col.b / 6})`;
    }

    useEffect(() => {
        load_font('font').then((font) => {
            console.log('Font loaded');
            setFont(font);
        });
    }, [])

    useEffect(() => {
        if (!font) return;

        const ctx = canvas.current.getContext('2d');

        // get text width and height
        const { width, height } = get_text_size(font, text);

        // calculate new width and new height, text might be multiline
        const lines = text.split('\n');

        // new width is just the width of the longest line
        const newWidth = lines.reduce((acc, line) => {
            const { width } = get_text_size(font, line);
            return Math.max(acc, width);
        }, 0);
        const newHeight = height * lines.length;

        canvas.current.width = (newWidth + 16) * scale;
        canvas.current.height = (newHeight + 16) * scale;

        setCanvasWidth(canvas.current.width);
        setCanvasHeight(canvas.current.height);

        // clear canvas
        ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);

        ctx.imageSmoothingEnabled = false;
        ctx.scale(scale, scale);

        if (customColor.r === 0 && customColor.g === 0 && customColor.b === 0) {
        }
        else
        {
            // draw a box around the text
            ctx.fillStyle = getBackgroundColor()
            ctx.fillRect(0, 0, newWidth + 16, newHeight + 16);
            ctx.fillStyle = getForegroundColor()
            ctx.fillRect(1, 1, newWidth + 14, newHeight + 14);
            ctx.fillStyle = getBackgroundColor()
            ctx.fillRect(3, 3, newWidth + 10, newHeight + 10);
            ctx.fillStyle = getForegroundColor()
            ctx.fillRect(4, 4, newWidth + 8, newHeight + 8);
            ctx.fillStyle = getBackgroundColor()
            ctx.fillRect(5, 5, newWidth + 6, newHeight + 6);
        }

        // draw the text
        ctx.fillStyle = getForegroundColor();

        for (let i = 0; i < lines.length; i++) {
            draw_text(ctx, font, lines[i], 8, 8 + (height * i));
        }

    }, [text, customColor]);

    return <div className={styles.container}>
        <div className={styles.colors}>
            <div className={styles.colorPicker}>
                {
                    Object.keys(colors).map(c => <button key={c} style={{color: getForegroundColor(colors[c]), backgroundColor: getBackgroundColor(colors[c]), borderColor: getForegroundColor(colors[c])}} onClick={() => setCustomColor(colors[c])}>{c}</button>)
                }
            </div>

            <div className={styles.customColorPickerGroup}>
            <RgbColorPicker color={customColor} onChange={setCustomColor} />
                <div className={styles.customColorInput}>
                    <div>
                        <label htmlFor="customRed">R</label>
                        <input id="customRed" type="number" value={customColor.r} min={0} max={255} onChange={e => setCustomColor({...customColor, r: e.target.value})} />
                    </div>
                    <div>
                        <label htmlFor="customGreen">G</label>
                        <input id="customGreen" type="number" value={customColor.g} min={0} max={255} onChange={e => setCustomColor({...customColor, g: e.target.value})} />
                    </div>
                    <div>
                        <label htmlFor="customBlue">B</label>
                        <input id="customBlue" type="number" value={customColor.b} min={0} max={255} onChange={e => setCustomColor({...customColor, b: e.target.value})} />
                    </div>
                </div>
            </div>
        </div>

        <TextareaAutosize value={text} onChange={e => setText(e.target.value)} style={{resize: 'none'}} placeholder="Your text here..." />

        <canvas ref={canvas} style={{width: canvasWidth}}></canvas>

        <div>
            <button onClick={() => {
                const link = document.createElement('a');
                link.download = 'textbox.png';
                link.href = canvas.current.toDataURL();
                link.click();
            }}>Download Image</button>

            <button onClick={() => {
                // copy
                canvas.current.toBlob(blob => {
                    navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
                });
            }}>Copy Image</button>
        </div>

        <p>This requires JS to be enabled.</p>
    </div>
}