'use client'

import { motion, useAnimate } from "framer-motion"
import { useRef, useState } from "react";

export default function WindowsButton() {
    const audioRef = useRef(null);
    const [scope, animate] = useAnimate();
    const [cursorImage, setCursorImage] = useState("open");

    return (
        <>
            <audio ref={audioRef} src="/sounds/wii.wav" />
            <img src="https://88x31.kate.pet/console_wii.png" height="31" onClick={() => {
                audioRef.current.currentTime = 0;
                audioRef.current.volume = 0.2;
                audioRef.current.play();
                const animation = async () => {
                    await animate(scope.current, { y: -10 }, { duration: 0.1, ease: 'easeOut' });
                    await animate(scope.current, { y: 0 }, { duration: 0.5, type: 'spring', bounce: 0.75, ease: 'easeIn' });
                }
                animation();
                // with framer motion, let's make it bounce
            }} ref={scope} draggable={false} style={{ cursor: `url(wii/p1${cursorImage}.png) 10 10, pointer` }}
                onMouseDown={() => {
                    setCursorImage("closed");
                }}
                onMouseUp={() => {
                    setCursorImage("open");
                }}
                onMouseLeave={() => {
                    setCursorImage("open");
                }}
                onMouseEnter={() => {
                    setCursorImage("open");
                }}
            />
        </>
    );
}