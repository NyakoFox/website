'use client';

import { useEffect, useRef, useState } from "react";
import styles from './TextboxGenerator.module.css';
import { load_font, draw_text, get_text_size } from '@/src/font.js';

export default function TextboxGenerator() {
    const [text, setText] = useState('');
    const [font, setFont] = useState(null);
    const [canvasWidth, setCanvasWidth] = useState(0);
    const [canvasHeight, setCanvasHeight] = useState(0);
    const [scale, setScale] = useState(2);
    const canvas = useRef(null);

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
        // draw a box around the text
        ctx.fillStyle = '#1B1B2A'
        ctx.fillRect(0, 0, newWidth + 16, newHeight + 16);
        ctx.fillStyle = '#A4A4FF'
        ctx.fillRect(1, 1, newWidth + 14, newHeight + 14);
        ctx.fillStyle = '#1B1B2A'
        ctx.fillRect(3, 3, newWidth + 10, newHeight + 10);
        ctx.fillStyle = '#A4A4FF'
        ctx.fillRect(4, 4, newWidth + 8, newHeight + 8);
        ctx.fillStyle = '#1B1B2A'
        ctx.fillRect(5, 5, newWidth + 6, newHeight + 6);

        // draw the text
        ctx.fillStyle = '#A4A4FF';

        for (let i = 0; i < lines.length; i++) {
            draw_text(ctx, font, lines[i], 8, 8 + (height * i));
        }

    }, [text]);

    return <div className={styles.container}>
        <textarea type="text" id="textbox" value={text} onChange={e => setText(e.target.value)}></textarea>

        <canvas ref={canvas} style={{width: canvasWidth, height: canvasHeight}}></canvas>

        <p>This requires JS to be enabled.</p>
    </div>
}
