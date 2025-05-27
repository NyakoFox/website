'use client';

import { useEffect, useMemo, useRef, useState } from "react";
import styles from './ColorList.module.css';
import usePersistentState from '@/hooks/usePersistentState';
import { load_image_white } from '@/src/imageutils';

function getRGB(r, g, b) {
    return `rgb(${Math.trunc(r)}, ${Math.trunc(g)}, ${Math.trunc(b)})`;
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

function getDataForEntity(name) {
    switch (name)
    {
        case "player":
            return { name: "Player", offX: -6, offY: -2, width: 12, height: 21, spriteIDs: [0, 1, 2, 1], timeBetweenFrames: 6 };
        case "playerdead":
            return { name: "Player (dead)", offX: -6, offY: -2, width: 12, height: 21, spriteIDs: [12] };
        case "crewmate":
            return { name: "Crewmate", offX: -6, offY: -2, width: 12, height: 21, spriteIDs: [0, 1, 2, 1], timeBetweenFrames: 6 };
        case "supercrewmate":
            return { name: "Supercrewmate", offX: -6, offY: -2, width: 12, height: 21, spriteIDs: [0, 1, 2, 1], timeBetweenFrames: 6 };
        case "supercrewmatedead":
            return { name: "Supercrewmate (dead)", offX: -6, offY: -2, width: 12, height: 21, spriteIDs: [12] };
        case "trinket":
            return { name: "Trinket", width: 16, height: 16, spriteIDs: [22] };
        case "enemy":
            return { name: "Enemy", width: 16, height: 16, spriteIDs: [78, 79, 80, 81], timeBetweenFrames: 6 };
        case "gravitronsquares":
            return { name: "Gravitron Squares", width: 16, height: 16, spriteIDs: [78, 79, 80, 81], timeBetweenFrames: 6 };
        case "gravitronsquareindicators":
            return { name: "Gravitron Square Indicators (inaccurate display)", offX: -13, offY: -5, width: 3, height: 6, spriteIDs: [78] };
        case "terminal":
            return { name: "Terminal", width: 16, height: 16, spriteIDs: [17] };
        case "cosmeticterminal":
            return { name: "Cosmetic Terminal", width: 16, height: 16, spriteIDs: [17] };
        case "checkpoint":
            return { name: "Checkpoint", width: 16, height: 16, spriteIDs: [21] };
        case "gravityline":
            return { name: "Gravity Line", width: 32, height: 1, spriteIDs: [132] };
        case "gravitylineactive":
            return { name: "Gravity Line (Active)", width: 32, height: 1, spriteIDs: [132] };
        case "coin":
            return { name: "Coin (inaccurate display)", width: 8, height: 8, spriteIDs: [84] };
        case "particle":
            return { name: "Particle", width: 4, height: 4, spriteIDs: [84] };
        case "gravitytoken":
            return { name: "Gravity token", offX: -6, offY: -2, width: 12, height: 21, spriteIDs: [11] };
        case "hugewarptoken":
            return { name: "Huge warp token", width: 32, height: 32, scaleX: 6, scaleY: 6, spriteIDs: [18, 19], timeBetweenFrames: 12 };
        case "warptoken":
            return { name: "Warp token", width: 16, height: 16, spriteIDs: [18, 19], timeBetweenFrames: 12 };
        case "motubase":
            return { name: "Master of The Universe trophy base", offX: -4, offY: -14, width: 8, height: 2, spriteIDs: [180] };
        case "flmtrophy":
            return { name: "Final Level Mastered trophy", offX: -3, offY: -1, width: 10, height: 15, spriteIDs: [184] };
        case "ss1mtrophy":
            return { name: "Space Station 1 Mastered trophy", offX: -3, offY: -1, width: 10, height: 15, spriteIDs: [184] };
        case "ss2mtrophy":
            return { name: "Space Station 2 Mastered trophy", offX: -3, offY: -1, width: 10, height: 15, spriteIDs: [184] };
        case "lmtrophy":
            return { name: "Laboratory Mastered trophy", offX: -3, offY: -1, width: 10, height: 15, spriteIDs: [184] };
        case "wzmtrophy":
            return { name: "Warp Zone Mastered trophy", offX: -3, offY: -1, width: 10, height: 15, spriteIDs: [184] };
        case "ttmtrophy":
            return { name: "Tower Mastered trophy", offX: -3, offY: -1, width: 10, height: 15, spriteIDs: [184] };
        case "gamecomplete":
            return { name: "Game Complete trophy", offX: 0, offY: 0, width: 16, height: 19, spriteIDs: [188] };
        case "flipmodecomplete":
            return { name: "Flip Mode Complete trophy", offX: 0, offY: 0, width: 16, height: 19, spriteIDs: [189] };
        case "teleporter":
            return { name: "Teleporter", width: 96, height: 96, teleporter: "inactive" };
        case "teleporteractive":
            return { name: "Active teleporter", width: 96, height: 96, teleporter: "active" };
        case "teleporteractivated":
            return { name: "Activated teleporter", width: 96, height: 96, teleporter: "activated" };
        case "teleportingcrewmate":
            return { name: "Teleporting crewmate", offX: -6, offY: -2, width: 12, height: 21, spriteIDs: [0] };
        case "motutrophy":
            return { name: "Master of The Universe trophy", offX: -6*6, offY: -2*6, width: 12*6, height: 21*6, scaleX: 6, scaleY: 6, spriteIDs: [0] };

        case "last5seconds":
            return { name: "\"Last 5 seconds on the Super Gravitron\" trophy", width: 16, height: 19, spriteIDs: [183] };
        case "last10seconds":
            return { name: "\"Last 10 seconds on the Super Gravitron\" trophy", width: 16, height: 19, spriteIDs: [183] };
        case "last15seconds":
            return { name: "\"Last 15 seconds on the Super Gravitron\" trophy", width: 16, height: 19, spriteIDs: [183] };
        case "last20seconds":
            return { name: "\"Last 20 seconds on the Super Gravitron\" trophy", width: 16, height: 19, spriteIDs: [183] };
        case "last30seconds":
            return { name: "\"Last 30 seconds on the Super Gravitron\" trophy", width: 16, height: 19, spriteIDs: [183] };
        case "last1minute":
            return { name: "\"Last 1 minute on the Super Gravitron\" trophy", width: 16, height: 19, spriteIDs: [183] };

        case "less500deaths":
            return { name: "\"Win with less than 500 deaths\" trophy", width: 16, height: 19, spriteIDs: [182] };
        case "less250deaths":
            return { name: "\"Win with less than 250 deaths\" trophy", width: 16, height: 19, spriteIDs: [182] };
        case "less100deaths":
            return { name: "\"Win with less than 100 deaths\" trophy", width: 16, height: 19, spriteIDs: [182] };
        case "less50deaths":
            return { name: "\"Win with less than 50 deaths\" trophy", width: 16, height: 19, spriteIDs: [182] };

        default:
            return { name: "Unknown", width: 16, height: 16, spriteIDs: [0] };
    }
}

function getEntityColorDisplays() {
    // Only get ones we care about
    return ["player", "trinket", "enemy", "terminal", "checkpoint"];
}

function getComponentFromName(name, spritesTexture, teleporterTexture, colorID, noflashingmode, shouldDisplayName) {
    const data = getDataForEntity(name);
    if (data == null) return null;
    const { name: displayName, offX, offY, width, height, scaleX, scaleY, spriteIDs, timeBetweenFrames, teleporter } = data;
    return <Sprite key={name} name={displayName} spritesTexture={spritesTexture} teleporterTexture={teleporterTexture} teleporter={teleporter} offX={offX} offY={offY} width={width} height={height} colorID={colorID} spriteIDs={spriteIDs} scaleX={scaleX} scaleY={scaleY} timeBetweenFrames={timeBetweenFrames} noflashingmode={noflashingmode} displayName={shouldDisplayName} />
}

function getEntityDisplaysForColor(colorID) {
    switch (colorID)
    {
        case 0:
            return ["player", "crewmate", "gravitytoken", "particle"];
        case 1:
            return ["playerdead", "supercrewmatedead"];
        case 3:
            return ["trinket", "hugewarptoken"];
        case 4:
            return ["checkpoint", "terminal", "cosmeticterminal", "motubase"];
        case 5:
            return ["checkpoint", "terminal"];
        case 6:
        case 7:
        case 8:
        case 9:
        case 11:
        case 12:
        case 17:
            return ["enemy"];
        case 10:
            return ["warptoken"];
        case 13:
        case 14:
        case 15:
        case 16:
            return ["crewmate", "supercrewmate"];
        case 20:
            return ["enemy", "crewmate", "supercrewmate"];
        case 21:
            return ["gravitronsquares"];
        case 23:
            return ["gravitronsquareindicators"];

        case 24:
            return ["gravitylineactive"];
        case 25:
            return ["gravityline"];

        case 26:
            return ["coin"];

        case 27:
            return ["particle"];

        case 30:
            return ["flmtrophy"];
        case 31:
            return ["ss1mtrophy"];
        case 32:
            return ["ss2mtrophy"];
        case 33:
            return ["ttmtrophy"];
        case 34:
            return ["wzmtrophy"];
        case 35:
            return ["lmtrophy"];
        case 36:
            return ["last30seconds", "less100deaths"];
        case 37:
            return ["gamecomplete", "flipmodecomplete"];
        case 38:
            return ["last20seconds", "less250deaths"];
        case 39:
            return ["last5seconds", "last10seconds", "last15seconds", "less500deaths"]
        case 40:
            return ["last1minute", "less50deaths"];
        case 100:
            return ["teleporter"];
        case 101:
            return ["teleporteractive"];
        case 102:
            return ["teleporteractivated", "teleportingcrewmate", "motutrophy"];

        case 2: // Intended for enemies, but left unused
        case 19: // "Enemy : Dark Gray"
        case 22: // "Enemy: Indicator Gray" (unused variant of gravitron square indicator)
        default:
            return [];
    }
}

function getcol(t, glow, noflashingmode, linestate)
{
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

    case 24: // Gravity line (Inactive)
        return getRGB(96, 96, 96);
    case 25: // Gravity line (Active)
        if (noflashingmode)
        {
            return getRGB(200 - 20, 200 - 20, 200 - 20);
        }

        switch (linestate)
        {
        default:
        case 0:
            return getRGB(200 - 20, 200 - 20, 200 - 20);
        case 1:
            return getRGB(245 - 30, 245 - 30, 225 - 30);
        case 2:
            return getRGB(225 - 30, 245 - 30, 245 - 30);
        case 3:
            return getRGB(200 - 20, 200 - 20, 164 - 10);
        case 4:
            return getRGB(196 - 20, 255 - 30, 224 - 20);
        case 5:
            return getRGB(196 - 20, 235 - 30, 205 - 20);
        case 6:
            return getRGB(164 - 10, 164 - 10, 164 - 10);
        case 7:
            return getRGB(205 - 20, 245 - 30, 225 - 30);
        case 8:
            return getRGB(225 - 30, 255 - 30, 205 - 20);
        case 9:
            return getRGB(245 - 30, 245 - 30, 245 - 30);
        }
    case 26: // Coin
        if (noflashingmode)
        {
            return getRGB(234, 234, 10);
        }
        return getRGB(250 - Math.trunc(GETCOL_RANDOM * 32), 250 - Math.trunc(GETCOL_RANDOM * 32), 10);
    case 27: // Particle flashy red
        return getRGB((GETCOL_RANDOM * 64), 10, 10);

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

function useGameLogic(update, render, dependencies) {
    const requestRef = useRef();
    const previousTimeRef = useRef();
    const timerRef = useRef();

    const glow = useRef(0);
    const glowdir = useRef(0);
    const linestate = useRef(0);
    const linedelay = useRef(0);

    const updateColors = () => {
        if (glowdir.current == 0) {
            glow.current += 2;
            if (glow.current >= 62) glowdir.current = 1;
        }else {
            glow.current -= 2;
            if (glow.current < 2) glowdir.current = 0;
        }

        if (linedelay.current <= 0)
        {
            linestate.current++;
            if (linestate.current >= 10) linestate.current = 0;
            linedelay.current = 2;
        }
        else
        {
            linedelay.current--;
        }

        update(glow.current, linestate.current);
    }

    const animate = time => {
        if (previousTimeRef.current != undefined) {
            const deltaTime = time - previousTimeRef.current;
            let update = false;
            timerRef.current += deltaTime;
            while (timerRef.current >= 1000 / 30) {
                timerRef.current -= 1000 / 30;
                update = true;
            }

            if (update) updateColors();

            render();
        }
        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animate);
    }

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        timerRef.current = 0;
        return () => cancelAnimationFrame(requestRef.current);
    }, dependencies); // Make sure the effect runs only once
}

export function Sprite({ spritesTexture, teleporterTexture, name, width, height, colorID, offX, offY, spriteIDs, scaleX, scaleY, timeBetweenFrames, noflashingmode, onClick, displayName, teleporter }) {
    const canvas = useRef(null);

    const boxWidth = width ?? 32;
    const boxHeight = height ?? 32;

    const color = useRef(null);

    const countdown = useRef(0);

    const drawframe = useRef(0);
    const walkingframe = useRef(0);
    const framedelay = useRef(0);

    const renderColors = () => {
        if (spritesTexture == null) return;
        if (teleporterTexture == null) return;

        const ctx = canvas.current.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);

        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = boxWidth;
        tempCanvas.height = boxHeight;
        const tempCtx = tempCanvas.getContext('2d');
        tempCtx.imageSmoothingEnabled = false;
        tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);

        if (teleporter != null) {
            const spritesheetWidth = Math.trunc(teleporterTexture.width / 96);

            let spriteID = drawframe.current;
            if (spriteID > 9) spriteID = 8;
            if (spriteID < 1) spriteID = 1;

            const spriteX = spriteID % spritesheetWidth;
            const spriteY = Math.trunc(spriteID / spritesheetWidth);

            ctx.drawImage(teleporterTexture, 0 * 96, 0 * 96, 96, 96, offX ?? 0, offY ?? 0, boxWidth, boxHeight);
            ctx.fillStyle = 'rgb(16,16,16)';
            ctx.globalCompositeOperation = 'multiply';
            ctx.fillRect(0, 0, canvas.current.width, canvas.current.height);
            ctx.globalCompositeOperation = 'destination-in';
            ctx.drawImage(teleporterTexture, 0 * 96, 0 * 96, 96, 96, offX ?? 0, offY ?? 0, boxWidth, boxHeight);
            ctx.globalCompositeOperation = 'source-over';

            tempCtx.drawImage(teleporterTexture, spriteX * 96, spriteY * 96, 96, 96, offX ?? 0, offY ?? 0, boxWidth, boxHeight);
            tempCtx.fillStyle = color.current;
            tempCtx.globalCompositeOperation = 'multiply';
            tempCtx.fillRect(0, 0, canvas.current.width, canvas.current.height);
            tempCtx.globalCompositeOperation = 'destination-in';
            tempCtx.drawImage(teleporterTexture, spriteX * 96, spriteY * 96, 96, 96, offX ?? 0, offY ?? 0, boxWidth, boxHeight);

            ctx.drawImage(tempCanvas, 0, 0, boxWidth, boxHeight);
        }
        else
        {
            // draw piece from SpritesTexture
            const spriteID = spriteIDs[0];

            const spritesheetWidth = Math.trunc(spritesTexture.width / 32);

            const spriteX = spriteID % spritesheetWidth;
            const spriteY = Math.trunc(spriteID / spritesheetWidth);

            ctx.drawImage(spritesTexture, spriteX * 32, spriteY * 32, 32, 32, offX ?? 0, offY ?? 0, boxWidth, boxHeight);

            ctx.fillStyle = color.current;

            ctx.globalCompositeOperation = 'multiply';
            ctx.fillRect(0, 0, canvas.current.width, canvas.current.height);

            ctx.globalCompositeOperation = 'destination-in';

            ctx.drawImage(spritesTexture, spriteX * 32, spriteY * 32, 32, 32, offX ?? 0, offY ?? 0, 32 * (scaleX ?? 1), 32 * (scaleY ?? 1));
        }
    }

    useGameLogic((glow, linestate) => {

        countdown.current--;
        if (countdown.current <= 0) {
            countdown.current = timeBetweenFrames;
            if (timeBetweenFrames > 0) {
                spriteIDs.push(spriteIDs.shift());
            }
        }

        if (teleporter != null)
        {
            if (teleporter == "active")
            {
                const tile = 2;

                framedelay.current--;
                if (framedelay.current <= 0)
                {
                    framedelay.current = 1;
                    walkingframe.current = Math.trunc(fRandom() * 6);
                    if (walkingframe.current >= 4)
                    {
                        walkingframe.current = -1;
                        framedelay.current = 4;
                    }
                }

                drawframe.current = tile;
                drawframe.current += walkingframe.current;
            }
            if (teleporter == "activated")
            {
                const tile = 6;

                drawframe.current = tile;
                framedelay.current--;
                if (framedelay.current <= 0)
                {
                    framedelay.current = 2;
                    walkingframe.current = Math.trunc(fRandom() * 6);
                    if (walkingframe.current >= 4)
                    {
                        walkingframe.current = -5;
                        framedelay.current = 4;
                    }
                }

                drawframe.current = tile;
                drawframe.current += walkingframe.current;
            }
        }

        color.current = getcol(colorID, glow, noflashingmode, linestate);
    }, () => {
        renderColors();
    }, [noflashingmode, colorID, spriteIDs]);

    const style = {
        width: boxWidth*2,
        height: boxHeight*2,
        display: 'inline-block'
    };

    if (displayName) {
        return <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '10px'
        }}>
            <canvas ref={canvas} onClick={onClick} width={boxWidth} height={boxHeight} style={style}></canvas>
            <p style={{
                maxWidth: '10rem'
            }}>{name}</p>
        </div>
    }

    return <canvas ref={canvas} onClick={onClick} width={boxWidth} height={boxHeight} style={style}></canvas>
}

export function Color({ id, noflashingmode, onClick }) {
    const canvas = useRef(null);

    const boxWidth = 24;
    const boxHeight = 24;

    const color = useRef(null);

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

    useGameLogic((glow, linestate) => {
        color.current = getcol(id, glow, noflashingmode, linestate);
    }, () => {
        renderColors();
    }, [noflashingmode, id]);

    const style = {
        width: boxWidth*2,
        height: boxHeight*2,
        display: 'inline-block',
        cursor: 'pointer',
        borderWidth: '1px',
        borderColor: '#fff',
        borderStyle: 'solid',
    };

    return <canvas ref={canvas} onClick={onClick} key={id} width={boxWidth} height={boxHeight} style={style}></canvas>
}

export default function ColorList() {
    const [selectedColor, setSelectedColor] = useState(0);
    const [noflashingmode, setNoflashingmode] = usePersistentState('noflashingmode', true);
    const [showUnmergedColors, setShowUnmergedColors] = usePersistentState('showUnmergedColors', false);
    const [showUnreleasedColors, setShowUnreleasedColors] = usePersistentState('showUnreleasedColors', false);

    const [spritesTexture, setSpritesTexture] = useState(null);
    const [teleporterTexture, setTeleporterTexture] = useState(null);

    useEffect(() => {
        load_image_white('sprites').then(setSpritesTexture);
        load_image_white('teleporter').then(setTeleporterTexture);
    }, [])

    const allColorIDs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 100, 101, 102];
    const unmergedColors = [];
    const unreleasedColors = [24, 25, 26, 27];

    if (showUnmergedColors) {
        allColorIDs.push(...unmergedColors);
    }

    if (showUnreleasedColors) {
        allColorIDs.push(...unreleasedColors);
    }

    // Sort
    allColorIDs.sort((a, b) => a - b);

    return <div className={styles.container}>
        <p>
            Colors in VVVVVV are animated through code. The boxes below show every color and let you read more information about them.
        </p>
        <br />
        <label className={styles.checkbox}>
            <input type="checkbox" checked={noflashingmode} onChange={e => setNoflashingmode(e.target.checked)} />
            Reduce flashing mode (VVVVVV accessibility option)
        </label>
        <label className={styles.checkbox}>
            <input type="checkbox" checked={showUnmergedColors} onChange={e => setShowUnmergedColors(e.target.checked)} disabled={unmergedColors.length === 0} />
            Show unmerged colors
        </label>
        <label className={styles.checkbox}>
            <input type="checkbox" checked={showUnreleasedColors} onChange={e => setShowUnreleasedColors(e.target.checked)} disabled={unreleasedColors.length === 0} />
            Show unreleased colors
        </label>
        <div className={styles.colorList}>
        {
            allColorIDs.map((colorID) => <Color key={colorID} id={colorID} noflashingmode={noflashingmode} onClick={() => setSelectedColor(colorID)} />)
        }
        </div>
        <div className={styles.colorInfo}>
            <h2>Selected color information</h2>

            <div className={styles.centeredFlex}>
                <Color id={selectedColor} noflashingmode={noflashingmode} />
            </div>

            {
                (unmergedColors.includes(selectedColor)) && (
                    <figure id="unmerged-warning" className={styles.warning}>
                        <figcaption>Unmerged Color!</figcaption>
                        <p>This color is awaiting review in a <b>Pull Request</b>, therefore it is not available in the current version of VVVVVV.</p>
                    </figure>
                )
            }

            {
                (unreleasedColors.includes(selectedColor)) && (
                    <figure id="unreleased-warning" className={styles.warning}>
                        <figcaption>Unreleased Color!</figcaption>
                        <p>This color is not available in the current version of VVVVVV. Once the next version releases, this color will be available.</p>
                    </figure>
                )
            }

            <h3>Used by:</h3>
            <div className={styles.centeredFlex}>
                {
                    getEntityDisplaysForColor(selectedColor).map(entityName => {
                        return getComponentFromName(entityName, spritesTexture, teleporterTexture, selectedColor, noflashingmode, true);
                    })
                }
            </div>
            {
                (getEntityDisplaysForColor(selectedColor).length === 0) && <p>No entities use this color by default".</p>
            }

            <h3>Color display:</h3>
            <div className={styles.centeredFlex}>
                {
                    getEntityColorDisplays().map(entityName => {
                        return getComponentFromName(entityName, spritesTexture, teleporterTexture, selectedColor, noflashingmode, false);
                    })
                }
            </div>
        </div>

        <p>This requires JS to be enabled.</p>
    </div>
}
