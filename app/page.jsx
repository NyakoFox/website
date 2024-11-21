import Image from "next/image";
import styles from "./page.module.css";
import WindowsButton from "@/components/WindowsButton";
import WiiButton from "@/components/WiiButton";

export default function Home() {
  return (
    <>
    <main className={styles.main}>

      <a
        href="https://www.glitter-graphics.com/myspace/text_generator.php"
        target="_blank"
        className={styles.title}
      >
        <img src="https://text.glitter-graphics.net/sblue/t.gif" border="0" />
        <img src="https://text.glitter-graphics.net/sblue/h.gif" border="0" />
        <img src="https://text.glitter-graphics.net/sblue/i.gif" border="0" />
        <img src="https://text.glitter-graphics.net/sblue/s.gif" border="0" />
        <img
          src="https://dl3.glitter-graphics.net/empty.gif"
          width="20"
          border="0"
        />
        <img src="https://text.glitter-graphics.net/sblue/s.gif" border="0" />
        <img src="https://text.glitter-graphics.net/sblue/i.gif" border="0" />
        <img src="https://text.glitter-graphics.net/sblue/t.gif" border="0" />
        <img src="https://text.glitter-graphics.net/sblue/e.gif" border="0" />
        <img
          src="https://dl3.glitter-graphics.net/empty.gif"
          width="20"
          border="0"
        />
        <img src="https://text.glitter-graphics.net/sblue/i.gif" border="0" />
        <img src="https://text.glitter-graphics.net/sblue/s.gif" border="0" />
        <img
          src="https://dl3.glitter-graphics.net/empty.gif"
          width="20"
          border="0"
        />
        <img src="https://text.glitter-graphics.net/sblue/u.gif" border="0" />
        <img src="https://text.glitter-graphics.net/sblue/n.gif" border="0" />
        <img src="https://text.glitter-graphics.net/sblue/d.gif" border="0" />
        <img src="https://text.glitter-graphics.net/sblue/e.gif" border="0" />
        <img src="https://text.glitter-graphics.net/sblue/r.gif" border="0" />
        <img
          src="https://dl3.glitter-graphics.net/empty.gif"
          width="20"
          border="0"
        />
        <img src="https://text.glitter-graphics.net/sblue/c.gif" border="0" />
        <img src="https://text.glitter-graphics.net/sblue/o.gif" border="0" />
        <img src="https://text.glitter-graphics.net/sblue/n.gif" border="0" />
        <img src="https://text.glitter-graphics.net/sblue/s.gif" border="0" />
        <img src="https://text.glitter-graphics.net/sblue/t.gif" border="0" />
        <img src="https://text.glitter-graphics.net/sblue/r.gif" border="0" />
        <img src="https://text.glitter-graphics.net/sblue/u.gif" border="0" />
        <img src="https://text.glitter-graphics.net/sblue/c.gif" border="0" />
        <img src="https://text.glitter-graphics.net/sblue/t.gif" border="0" />
        <img src="https://text.glitter-graphics.net/sblue/i.gif" border="0" />
        <img src="https://text.glitter-graphics.net/sblue/o.gif" border="0" />
        <img src="https://text.glitter-graphics.net/sblue/n.gif" border="0" />
      </a>
      <br />
      <br />
      <a href="https://www.glitter-graphics.com">
        <img
          src="http://dl7.glitter-graphics.net/pub/546/546677m95gpbskkb.gif"
          width="150"
          height="160"
          border="0"
        />
      </a>
      <br />
      <p className={styles.description}>
        <a href="https://www.glitter-graphics.com">
          <img
            src="http://dl9.glitter-graphics.net/pub/1062/1062489gkzgn7klcv.gif"
            width="16"
            height="15"
            border="0"
          />
        </a>
        It's not done yet!!
        <a href="https://www.glitter-graphics.com">
          <img
            src="http://dl9.glitter-graphics.net/pub/1062/1062489gkzgn7klcv.gif"
            width="16"
            height="15"
            border="0"
          />
        </a>
      </p>
      <div className={styles.links}>
      <a href="https://twitter.com/NyakoFox">twitter</a> •
      <a href="https://bsky.app/profile/nyako.gay">bluesky</a> •
      <a href="https://www.youtube.com/@nyakofox">youtube</a>
      </div>

      <div className={styles.buttons}>
        <WindowsButton />
        <a href="https://vscode.dev/" target="_blank"><img src="https://88x31.kate.pet/vscode.gif" height="31" draggable={false} /></a>
        <WiiButton />
        <a href="https://kristal.cc/" target="_blank"><img src="/buttons/virovirokun.gif" height="31" draggable={false} /></a>
        <a href="https://www.smwcentral.net/?p=profile&id=57839" target="_blank"><img src="/buttons/smwc.gif" height="31" draggable={false} /></a>
      </div>

      <div className={styles.buttons}>
        <img src="/buttons/nyako.png" height="31" draggable={false} />
      </div>
      <p>Right click and copy URL!</p>

      {/*
      <br/>

      <h2>friends:</h2>
      <div className={styles.buttons}>
        <a href="https://sapphic.moe" title="sapphic's site" target="_blank">
          <img alt="Sapphic.moe" height="31" src="/friends/sapphic.png"/>
        </a>
      </div>

      */}
    </main>
    </>
  );
}
