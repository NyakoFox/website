'use client';

import { useEffect, useRef, useState } from "react";
import styles from './TextboxGenerator.module.css';

export default function TextboxGenerator() {
    const [text, setText] = useState('');
    const canvas = useRef(null);

    useEffect(() => {
        const ctx = canvas.current.getContext('2d');

        // clear canvas
        ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);

        // set up the text, anchored from the top-left
        ctx.textRendering = 'geometricPrecision';
        ctx.font = '8px Space Station';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';

        // get text width and height
        const metrics = ctx.measureText(text);
        const metricsHeight = ctx.measureText("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;':\",./<>?\\`~");
        const width = metrics.width;
        const height = metricsHeight.actualBoundingBoxAscent + metricsHeight.actualBoundingBoxDescent;

        // draw a box around the text
        ctx.fillStyle = '#1B1B2A'
        ctx.fillRect(0, 0, width + 16, height + 16);
        ctx.fillStyle = '#A4A4FF'
        ctx.fillRect(1, 1, width + 14, height + 14);
        ctx.fillStyle = '#1B1B2A'
        ctx.fillRect(3, 3, width + 10, height + 10);
        ctx.fillStyle = '#A4A4FF'
        ctx.fillRect(4, 4, width + 8, height + 8);
        ctx.fillStyle = '#1B1B2A'
        ctx.fillRect(5, 5, width + 6, height + 6);

        // draw the text
        ctx.fillStyle = '#A4A4FF';
        ctx.fillText(text, 8, 8);
    }, [text]);

    return <div className={styles.container}>
        <textarea type="text" id="textbox" value={text} onChange={e => setText(e.target.value)}></textarea>

        <canvas ref={canvas} width="320" height="240"></canvas>

        <p>This requires JS to be enabled.</p>
        <p>If the text is blurry, try a different browser.</p>
        <p>This is a work in progress, and might be completely rewritten in the future. Who knows.</p>
    </div>
}
