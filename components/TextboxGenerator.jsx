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

    const [colorPickerOpen, setColorPickerOpen] = useState(false);

    const [colors, setColors] = useState({
        player: [164, 164, 255],
        cyan: [164, 164, 255],
        red: [255, 60, 60],
        green: [144, 255, 144],
        yellow: [255, 255, 134],
        blue: [95, 95, 255],
        purple: [255, 134, 255],
        white: [244, 244, 244],
        gray: [174, 174, 174],
        orange: [255, 130, 20],
        transparent: [0, 0, 0]
    });

    const [customColor, setCustomColor] = useState({r: 255, g: 255, b: 255});

    const [color, setColor] = useState('player');

    const canvas = useRef(null);

    function getForegroundColor(c = color) {
        if (c === 'custom') {
            if (customColor.r === 0 && customColor.g === 0 && customColor.b === 0) return 'rgb(255, 255, 255)';
            return `rgb(${customColor.r}, ${customColor.g}, ${customColor.b})`;
        }
        if (c === 'transparent') return 'rgb(255, 255, 255)';
        return `rgb(${colors[c].join(',')})`;
    }

    function getBackgroundColor(col = color) {
        // divide r, g and b by 6, truncate
        if (col === 'custom') {
            if (customColor.r === 0 && customColor.g === 0 && customColor.b === 0) return 'rgb(0, 0, 0)';
            return `rgb(${customColor.r / 6}, ${customColor.g / 6}, ${customColor.b / 6})`;
        }
        if (col === 'transparent') return 'rgb(0, 0, 0)';
        return `rgb(${colors[col].map(c => Math.trunc(c / 6)).join(',')})`;
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

        if (color === 'transparent') {
        }
        else if (color === 'custom' && customColor.r === 0 && customColor.g === 0 && customColor.b === 0) {
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

    }, [text, color, customColor]);

    return <div className={styles.container}>
        <button onClick={() => setColorPickerOpen(!colorPickerOpen)}>Pick color...</button>
        {
            colorPickerOpen && <div className={styles.colorPicker}>
                {
                    Object.keys(colors).map(c => <button key={c} style={{color: getForegroundColor(c), backgroundColor: getBackgroundColor(c), borderColor: getForegroundColor(c)}} onClick={() => setColor(c)}>{c}</button>)
                }
                <button onClick={() => setColor('custom')}>custom</button>
            </div>
        }

        {
            color === 'custom' && <>
                <RgbColorPicker color={customColor} onChange={setCustomColor} />
                <div className={styles.customColorInput}>
                    <label htmlFor="customRed">R</label>
                    <input id="customRed" type="number" value={customColor.r} min={0} max={255} onChange={e => setCustomColor({...customColor, r: e.target.value})} />
                    <label htmlFor="customGreen">G</label>
                    <input id="customGreen" type="number" value={customColor.g} min={0} max={255} onChange={e => setCustomColor({...customColor, g: e.target.value})} />
                    <label htmlFor="customBlue">B</label>
                    <input id="customBlue" type="number" value={customColor.b} min={0} max={255} onChange={e => setCustomColor({...customColor, b: e.target.value})} />
                </div>
            </>
        }

        <TextareaAutosize value={text} onChange={e => setText(e.target.value)} style={{resize: 'none'}} placeholder="Your text here..." />

        <canvas ref={canvas} style={{width: canvasWidth, height: canvasHeight}}></canvas>

        <p>This requires JS to be enabled.</p>
    </div>
}
