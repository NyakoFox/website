'use client';

import { useState } from 'react';
import styles from './Taskbar.module.css';

export default function Taskbar()
{
    const [menuOpen, setMenuOpen] = useState(false);
    const [overlayOpen, setOverlayOpen] = useState(false);
    const [shutOff, setShutOff] = useState(false);

    return (
        <div className={styles.taskbar}>
            {
                shutOff && <div className={styles.shutdown_anim}></div>
            }
            { overlayOpen && <div className={styles.overlay}>
                <div className={styles.shutdown}>
                    <div className={styles.shutdown_ok}     onClick={() => setShutOff(true)}></div>
                    <div className={styles.shutdown_cancel} onClick={() => setOverlayOpen(false)}></div>
                    <div className={styles.shutdown_close}  onClick={() => setOverlayOpen(false)}></div>
                    <div className={styles.shutdown_help}   onClick={() => setOverlayOpen(false)}></div>
                </div>
            </div> }
            <div className={`${styles.start} ${menuOpen && styles.start_clicked}`} onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen &&
                    <div className={styles.start_menu}>
                        <div className={styles.start_menu_content}>
                            <div className={styles.start_banner}></div>
                            <div className={styles.start_menu_items}>
                                <div className={`${styles.start_menu_button}`}>WIP!</div>
                                <div className={`${styles.start_menu_button} ${styles.start_menu_button_log_off}`}></div>
                                <div className={`${styles.start_menu_button} ${styles.start_menu_button_shutdown}`}  onClick={() => setOverlayOpen(!overlayOpen)}></div>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <div className={styles.icons}></div>
            <div className={styles.windows}></div>
            <div className={styles.tray}></div>
        </div>
    );
}
