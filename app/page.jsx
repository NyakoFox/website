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
        <span className={styles.word}>
          <img src="https://text.glitter-graphics.net/sblue/t.gif" border="0" />
          <img src="https://text.glitter-graphics.net/sblue/h.gif" border="0" />
          <img src="https://text.glitter-graphics.net/sblue/i.gif" border="0" />
          <img src="https://text.glitter-graphics.net/sblue/s.gif" border="0" />
        </span>
        <img
          src="https://dl3.glitter-graphics.net/empty.gif"
          width="20"
          border="0"
        />
        <span className={styles.word}>
        <img src="https://text.glitter-graphics.net/sblue/s.gif" border="0" />
        <img src="https://text.glitter-graphics.net/sblue/i.gif" border="0" />
        <img src="https://text.glitter-graphics.net/sblue/t.gif" border="0" />
        <img src="https://text.glitter-graphics.net/sblue/e.gif" border="0" />
        </span>
        <img
          src="https://dl3.glitter-graphics.net/empty.gif"
          width="20"
          border="0"
        />
        <span className={styles.word}>
          <img src="https://text.glitter-graphics.net/sblue/i.gif" border="0" />
          <img src="https://text.glitter-graphics.net/sblue/s.gif" border="0" />
        </span>
        <img
          src="https://dl3.glitter-graphics.net/empty.gif"
          width="20"
          border="0"
        />
        <span className={styles.word}>
          <img src="https://text.glitter-graphics.net/sblue/u.gif" border="0" />
          <img src="https://text.glitter-graphics.net/sblue/n.gif" border="0" />
          <img src="https://text.glitter-graphics.net/sblue/d.gif" border="0" />
          <img src="https://text.glitter-graphics.net/sblue/e.gif" border="0" />
          <img src="https://text.glitter-graphics.net/sblue/r.gif" border="0" />
        </span>
        <img
          src="https://dl3.glitter-graphics.net/empty.gif"
          width="20"
          border="0"
        />
        <span className={styles.word}>
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
        </span>
      </a>
      <br />
      <br />
      <a href="https://www.glitter-graphics.com">
        <img
          src="https://dl7.glitter-graphics.net/pub/546/546677m95gpbskkb.gif"
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
      <h2>some stuff:</h2>
      <a href="/vvvvvv">VVVVVV tools</a>

      <h2>find me other places:</h2>
      <div className={styles.links}>
      <a href="https://bsky.app/profile/nyako.gay">bluesky</a> •
      <a href="https://www.youtube.com/@nyakofox">youtube</a> •
      <a href="https://nyako.dev/">professional site</a> •
      <a href="https://nyako.dev/posts/">blog</a>
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
      <p>Right click and copy URL! <i>And please hotlink in case I decide to change the design in the future!</i></p>

      <h2>my awesome cool friends:</h2>
      <div className={styles.buttons}>
        <a href="https://sapphic.moe" title="sapphic's site" target="_blank"><img alt="sapphic.moe" height="31" src="/friends/sapphic.png"/></a>
        <a href="https://espi.me" title="espi's site" target="_blank"><img alt="espi's site" height="31" src="/friends/espi.png"/></a>
        <a href="https://megu.dev" title="megu's site" target="_blank"><img alt="megu's site" height="31" src="/friends/megu.png"/></a>
        <a href="https://picturesforfreeonlinebuynow.neocities.org/" title="pictures for free" target="_blank"><img alt="pictures for free" height="31" src="/friends/pictures.png"/></a>
        <a href="https://eir-nya.gay/" title="eir's site" target="_blank"><img alt="eir's site" height="31" src="/friends/eir.gif"/></a>
      </div>
    </main>
    </>
  );
}
