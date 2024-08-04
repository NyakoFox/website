'use client';

import { useEffect, useRef, useState } from "react";
import styles from './ColorList.module.css';

function getRGB(r, g, b) {
    return `rgb(${r}, ${g}, ${b})`;
}

function RGBf(r, g, b) {
    r = Math.trunc((r + 128) / 3);
    g = Math.trunc((g + 128) / 3);
    b = Math.trunc((b + 128) / 3);
    return getRGB(r, g, b);
}

function fRandom() {
    return Math.random();
}

function getcol(t, glow)
{
    const noflashingmode = false;
    let trinketcolset = false;
    let trinketr = 0
    let trinketg = 0
    let trinketb = 0
    const GETCOL_RANDOM = (noflashingmode ? 0.5 : fRandom());

    // Setup predefinied colours as per our zany palette
    switch(t)
    {
        // Player Normal
    case 0:
        return getRGB(160 - glow/2 - Math.trunc((GETCOL_RANDOM * 20)), 200 - glow/2, 220 - glow);
        // Player Hurt
    case 1:
        return getRGB(196 - (GETCOL_RANDOM * 64), 10, 10);
        // Enemies and stuff
    case 2:
        return getRGB(225 - (glow / 2), 75, 30);
    case 3: // Trinket
        if (!trinketcolset)
        {
            trinketr = 200 - (GETCOL_RANDOM * 64);
            trinketg = 200 - (GETCOL_RANDOM * 128);
            trinketb = 164 + (GETCOL_RANDOM * 60);
            trinketcolset = true;
        }
        return getRGB(trinketr, trinketg, trinketb);
    case 4: // Inactive savepoint
    {
        const temp = (glow / 2) + Math.trunc((GETCOL_RANDOM * 8));
        return getRGB(80 + temp, 80 + temp, 80 + temp);
    }
    case 5: // Active savepoint
        return getRGB(164 + (GETCOL_RANDOM * 64), 164 + (GETCOL_RANDOM * 64), 255 - (GETCOL_RANDOM * 64));
    case 6: // Enemy : Red
        return getRGB(250 - glow / 2, 60 - glow / 2, 60 - glow / 2);
    case 7: // Enemy : Green
        return getRGB(100 - glow / 2 - Math.trunc((GETCOL_RANDOM * 30)), 250 - glow / 2, 100 - glow / 2 - Math.trunc((GETCOL_RANDOM * 30)));
    case 8: // Enemy : Purple
        return getRGB(250 - glow / 2, 20, 128 - glow / 2 + Math.trunc((GETCOL_RANDOM * 30)));
    case 9: // Enemy : Yellow
        return getRGB(250 - glow / 2, 250 - glow / 2, 20);
    case 10: // Warp point (white)
        return getRGB(255 - (GETCOL_RANDOM * 64), 255 - (GETCOL_RANDOM * 64), 255 - (GETCOL_RANDOM * 64));
    case 11: // Enemy : Cyan
        return getRGB(20, 250 - glow / 2, 250 - glow / 2);
    case 12: // Enemy : Blue
        return getRGB(90 - glow / 2, 90 - glow / 2, 250 - glow / 2);
        // Crew Members
        // green
    case 13:
        return getRGB(120 - glow / 4 - Math.trunc((GETCOL_RANDOM * 20)), 220 - glow / 4, 120 - glow / 4);
        // Yellow
    case 14:
        return getRGB(220 - glow / 4 - Math.trunc((GETCOL_RANDOM * 20)), 210 - glow / 4, 120 - glow / 4);
        // pink
    case 15:
        return getRGB(255 - glow / 8, 70 - glow / 4, 70 - glow / 4);
        // Blue
    case 16:
        return getRGB(75, 75, 255 - glow / 4 - Math.trunc((GETCOL_RANDOM * 20)));

    case 17: // Enemy : Orange
        return getRGB(250 - glow / 2, 130 - glow / 2, 20);
    case 18: // Enemy : Gray
        return getRGB(130 - glow / 2, 130 - glow / 2, 130 - glow / 2);
    case 19: // Enemy : Dark gray
        return getRGB(60 - glow / 8, 60 - glow / 8, 60 - glow / 8);
        // Purple
    case 20:
        return getRGB(220 - glow / 4 - Math.trunc((GETCOL_RANDOM * 20)), 120 - glow/4, 210 - glow/4);

    case 21: // Enemy : Light Gray
        return getRGB(180 - glow/2, 180 - glow/2, 180 - glow/2);
    case 22: // Enemy : Indicator Gray
        return getRGB(230 - glow/2, 230 - glow/2, 230 - glow/2);
    case 23: // Enemy : Indicator Gray
        return getRGB(255 - glow / 2 - Math.trunc((GETCOL_RANDOM * 40)), 255 - glow/2 - Math.trunc((GETCOL_RANDOM * 40)), 255 - glow/2 - Math.trunc((GETCOL_RANDOM * 40)));

        // Trophies
        // cyan
    case 30:
        return RGBf(160, 200, 220);
        // Purple
    case 31:
        return RGBf(220, 120, 210);
        // Yellow
    case 32:
        return RGBf(220, 210, 120);
        // red
    case 33:
        return RGBf(255, 70, 70);
        // green
    case 34:
        return RGBf(120, 220, 120);
        // Blue
    case 35:
        return RGBf(75, 75, 255);
        // Gold
    case 36:
        return getRGB(180, 120, 20);
    case 37: // Trinket
        if (!trinketcolset)
        {
            trinketr = 200 - (GETCOL_RANDOM * 64);
            trinketg = 200 - (GETCOL_RANDOM * 128);
            trinketb = 164 + (GETCOL_RANDOM * 60);
            trinketcolset = true;
        }
        return RGBf(trinketr, trinketg, trinketb);
        // Silver
    case 38:
        return RGBf(196, 196, 196);
        // Bronze
    case 39:
        return RGBf(128, 64, 10);
        // Awesome
    case 40: // Teleporter in action!
    {
        if (noflashingmode)
        {
            return getRGB(196, 196, 223);
        }

        const temp = GETCOL_RANDOM * 150;
        if (temp < 33)
        {
            return RGBf(255 - (GETCOL_RANDOM * 64), 64 + (GETCOL_RANDOM * 64), 64 + (GETCOL_RANDOM * 64));
        }
        else if (temp < 66)
        {
            return RGBf(64 + (GETCOL_RANDOM * 64), 255 - (GETCOL_RANDOM * 64), 64 + (GETCOL_RANDOM * 64));
        }
        else if (temp < 100)
        {
            return RGBf(64 + (GETCOL_RANDOM * 64), 64 + (GETCOL_RANDOM * 64), 255 - (GETCOL_RANDOM * 64));
        }
        else
        {
            return RGBf(164 + (GETCOL_RANDOM * 64), 164 + (GETCOL_RANDOM * 64), 255 - (GETCOL_RANDOM * 64));
        }
    }

    case 100: // Inactive Teleporter
    {
        const temp = (glow / 2) + (GETCOL_RANDOM * 8);
        return getRGB(42 + temp, 42 + temp, 42 + temp);
    }
    case 101: // Active Teleporter
        return getRGB(164 + (GETCOL_RANDOM * 64), 164 + (GETCOL_RANDOM * 64), 255 - (GETCOL_RANDOM * 64));
    case 102: // Teleporter in action!
    {
        if (noflashingmode)
        {
            return getRGB(196, 196, 223);
        }

        const temp = GETCOL_RANDOM * 150;
        if (temp < 33)
        {
            return getRGB(255 - (GETCOL_RANDOM * 64), 64 + (GETCOL_RANDOM * 64), 64 + (GETCOL_RANDOM * 64));
        }
        else if (temp < 66)
        {
            return getRGB(64 + (GETCOL_RANDOM * 64), 255 - (GETCOL_RANDOM * 64), 64 + (GETCOL_RANDOM * 64));
        }
        else if (temp < 100)
        {
            return getRGB(64 + (GETCOL_RANDOM * 64), 64 + (GETCOL_RANDOM * 64), 255 - (GETCOL_RANDOM * 64));
        }
        else
        {
            return getRGB(164 + (GETCOL_RANDOM * 64), 164 + (GETCOL_RANDOM * 64), 255 - (GETCOL_RANDOM * 64));
        }
    }
    }

    return getRGB(255, 255, 255);
}

export function Color({ id }) {
    const canvas = useRef(null);

    const boxWidth = 24;
    const boxHeight = 24;

    const color = useRef(null);

    const requestRef = useRef();
    const previousTimeRef = useRef();
    const timerRef = useRef();

    const glow = useRef(0);
    const glowdir = useRef(0);

    const updateColors = () => {
        if (glowdir.current == 0) {
            glow.current += 2;
            if (glow.current >= 62) glowdir.current = 1;
        }else {
            glow.current -= 2;
            if (glow.current < 2) glowdir.current = 0;
        }
        color.current = getcol(id, glow.current);
    }

    const renderColors = () => {
        const ctx = canvas.current.getContext('2d');
        ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
        ctx.fillStyle = color.current;
        ctx.fillRect(0, 0, boxWidth, boxHeight);

        ctx.fillStyle = '#000000';
        ctx.textRendering = 'geometricPrecision';
        ctx.font = '8px Space Station';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(id, (boxWidth/2)+1, boxHeight/2);
        ctx.fillText(id, (boxWidth/2), boxHeight/2+1);
        ctx.fillText(id, (boxWidth/2)-1, boxHeight/2);
        ctx.fillText(id, (boxWidth/2), boxHeight/2-1);
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(id, (boxWidth/2), boxHeight/2);
    }

    const animate = time => {
        if (previousTimeRef.current != undefined) {
            const deltaTime = time - previousTimeRef.current;
            timerRef.current += deltaTime;
            if (timerRef.current >= 1000 / 30) {
                timerRef.current -= 1000 / 30;
                updateColors();
            }

            renderColors();
        }
        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animate);
    }

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        timerRef.current = 0;
        return () => cancelAnimationFrame(requestRef.current);
    }, []); // Make sure the effect runs only once

    return <canvas ref={canvas} key={id} width={boxWidth} height={boxHeight} style={{
        width: boxWidth*2,
        height: boxHeight*2,
        display: 'inline-block'
    }}></canvas>
}

export default function ColorList() {
    const allColorIDs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 100, 101, 102];

    return <div className={styles.container}>
        <div className={styles.colorList}>
        {
            allColorIDs.map((colorID) => <Color key={colorID} id={colorID} />)
        }
        </div>

        <p>This requires JS to be enabled.</p>
    </div>
}
