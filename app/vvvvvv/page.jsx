import styles from './styles.module.css';
import ColorList from '@/components/ColorList';
import TextboxGenerator from '@/components/TextboxGenerator';

export default async function VVVVVVPage() {
    return <>
        <div className={styles.container}>
            <img src="/vvvvvv.png" alt="Minecraft Item Generator" className={styles.logo} />

            <div>
                <h2>Color list</h2>
                <ColorList />
            </div>

            <div>
                <h2>Textbox generator (WIP!)</h2>
                <TextboxGenerator />
            </div>

        </div>
    </>
}
