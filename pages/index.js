import Header from '../components/Header';
import styles from '../styles/Home.module.scss'
import { useState, useEffect } from 'react';
import { mayor_scales, minor_scales } from "../assets/variables/scales";
import Fretboard from '../components/Fretboard';

export default function Home() {
    const [note, setNote] = useState('');
    const [activeNotes, setActiveNotes] = useState([]);
    const [scale, setScale] = useState('');
    const [instrument, setInstrument] = useState('')
    const [position, setPosition] = useState('')
    const [settings, setSettings] = useState(true);
    const [manual, setManual] = useState(false);
    const [lowFret, setLowFret] = useState(0);
    const [highFret, setHighFret] = useState(13);

    const manageSettings = (val) => {
        setSettings(val)
        setManual(!manual);
    };

    const setBaseAndTopFrets = () => {
        const notes = activeNotes.slice(-8);
        var high = 0;
        var low = 13;
        notes.map(note => {
            if (note[0] > high) {
                high = note[0];
                setHighFret(high);
            }
            if (note[0] < low) {
                low = note[0];
                setLowFret(low);
            }
        })
    }

    useEffect(()=> {
        var notes = [];
        setActiveNotes([]);
        if (scale === 'major' && note && position && instrument) {
            note && mayor_scales[instrument][note].position[position].notes.map(position => { setActiveNotes([...notes, notes.push(position.interval[1])]); });
            note && mayor_scales[instrument][note].position[position].notes.map(position => { setActiveNotes([...notes, notes.push(position.fret_position)]); });
        } else if (scale === 'minor' && note && position && instrument) {
            note && minor_scales[instrument][note].position[position].notes.map(position => { setActiveNotes([...notes, notes.push(position.interval[1])]); });
            note && minor_scales[instrument][note].position[position].notes.map(position => { setActiveNotes([...notes, notes.push(position.fret_position)]); });
        }
        setActiveNotes(notes);
        if (note && scale && instrument && position && !manual) {
            setSettings(!settings);
        }
    }, [note, scale, instrument, position]);
    useEffect(()=> setBaseAndTopFrets(), [settings]);
    return (
        <div className={styles.container}>
            <Header settings={settings} manual={manual}/>
            <main className={styles.main}>
                <div className={styles.description}>
                    <h1 className={styles.h1} style={{display : !manual && !settings && 'none'}} title='Master the scales on the fretboard'>Master the scales on the fretboard</h1>
                    {!note || !scale || !instrument || !position ? <h2 className={`${styles['h2']} ${styles['instructions']}`}>Please select an instrument, note, scale and position to start</h2> :
                        <h2 className={`${styles['h2']} ${styles['instructions']}`} style={{marginTop : !manual && !settings && '0'}}>{note.toUpperCase()} {scale.toUpperCase()} SCALE {position.toUpperCase()} POSITION ON {instrument.toUpperCase()}
                            <span onClick={()=>{manageSettings(!settings)}}>
                                <svg className={settings ? styles.settings : styles.settings_active} style={{height: !settings ? '25px' : 0}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path d="M421.7 220.3L188.5 453.4l-33.9-33.9 3.5-3.5H112c-8.8 0-16-7.2-16-16v-46.1l-3.49 3.5c-4.73 4.8-8.2 10.6-10.09 17l-22.98 78.2 78.16-23c5.5-1.9 12.2-5.4 17-10.1l33.9 33.9c-10.4 10.4-23.3 18.1-37.4 22.2L30.77 511c-8.42 2.5-17.53.2-23.74-6.9-6.21-5.3-8.532-14.4-6.054-22.9L36.37 360.9c4.16-14.1 11.79-27 22.2-37.4L291.7 90.34l130 129.96zm71-161.55c25 24.99 25 65.55 0 90.55l-48.4 48.4-130-129.98 48.4-48.4c25-24.998 65.6-24.998 90.6 0l39.4 39.43z"></path>
                                </svg>
                                <svg className={!settings ? styles.settings : styles.settings_active} style={{height: !settings ? 0 : '35px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                    <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25-6.2 6.25-14.4 9.35-22.6 9.35s-16.38-3.125-22.62-9.375L160 301.3 54.63 406.6C48.38 412.9 40.19 416 32 416s-16.37-3.1-22.625-9.4c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"></path>
                                </svg>
                            </span>
                        </h2>
                    }
                </div>
                <div className={styles.selection} style={{maxHeight: !settings && 0 }}>
                    <div className={`${styles['option']} ${styles['instrumentContainer']}`}>
                        <div className={styles.instrument_selector}>
                            <div onClick={() => setInstrument('bass')} className={instrument === 'bass' ? `${styles['instrument']} ${styles['instrument']} ${styles['instrumentSelected']}` : `${styles['instrument']}`}>
                                <div>
                                    <h3 className={styles.h1}>Bass</h3>
                                </div>
                            </div>
                            <div onClick={() => setInstrument('guitar')} className={instrument === 'guitar' ? `${styles['instrument']} ${styles['instrument']} ${styles['instrumentSelected']}` : `${styles['instrument']}`}>
                                <div>
                                    <h3 className={styles.h1}>Guitar</h3>
                                </div>
                            </div>
                        </div>
                        <div className={instrument === 'bass' ? `${styles['instrument_icon']} ${styles['hide_guitar']}` : instrument === 'guitar' ? `${styles['instrument_icon']} ${styles['hide_bass']}` : styles.instrument_icon}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="201"
                                height="160"
                                fill="none"
                                viewBox="0 0 201 160"
                            >
                                <g id="bass">
                                    <g id="fret">
                                        <g id="guitar_fret">
                                            <path
                                                id="guitar"
                                                fill="#1f1f1f"
                                                d="M157.218 48.77c2.191-.365 4.468-.017 6.229 1.337 3.493 2.684 8.57 7.98 5.296 14.387a1417.627 1417.627 0 00-5.648 11.135 9.602 9.602 0 00-.757 2.098l-.536 2.265a10 10 0 01-6.074 7.007l-38.923 15.296 2.025-47.12 38.388-6.405z"
                                            ></path>
                                        </g>
                                        <circle
                                            id="fret_curve"
                                            cx="130.707"
                                            cy="79.741"
                                            r="26.122"
                                            fill="#1f1f1f"
                                            transform="rotate(-14.89 130.707 79.74)"
                                        ></circle>
                                        <path
                                            id="fret_head"
                                            fill="#1f1f1f"
                                            d="M29.968 75.79a10 10 0 017.835-6.782l90.527-15.424-9.834 48.096-62.742 23.804a10.005 10.005 0 01-5.86.379l-5.127-1.219a10 10 0 01-7.198-6.637l-9.653-29.686a10 10 0 01-.005-6.168l2.057-6.362z"
                                        ></path>
                                    </g>
                                    <g id="tuners" fill="#1f1f1f">
                                        <g id="guitar_tuners">
                                            <ellipse
                                                id="tuner"
                                                cx="125.606"
                                                cy="46.207"
                                                rx="8.912"
                                                ry="5.685"
                                                transform="rotate(-9.415 125.606 46.207)"
                                            ></ellipse>
                                            <ellipse
                                                id="tuner_2"
                                                cx="146.811"
                                                cy="43.441"
                                                rx="8.912"
                                                ry="5.685"
                                                transform="rotate(-9.415 146.811 43.441)"
                                            ></ellipse>
                                        </g>
                                        <ellipse
                                            id="tuner_3"
                                            cx="42.95"
                                            cy="59.316"
                                            rx="8.912"
                                            ry="5.685"
                                            transform="rotate(-9.415 42.95 59.316)"
                                        ></ellipse>
                                        <ellipse
                                            id="tuner_4"
                                            cx="104.932"
                                            cy="48.834"
                                            rx="8.912"
                                            ry="5.685"
                                            transform="rotate(-9.415 104.932 48.834)"
                                        ></ellipse>
                                        <ellipse
                                            id="tuner_5"
                                            cx="104.932"
                                            cy="48.834"
                                            rx="8.912"
                                            ry="5.685"
                                            transform="rotate(-9.415 104.932 48.834)"
                                        ></ellipse>
                                        <ellipse
                                            id="tuner_6"
                                            cx="84.243"
                                            cy="52.022"
                                            rx="8.912"
                                            ry="5.685"
                                            transform="rotate(-9.415 84.243 52.022)"
                                        ></ellipse>
                                        <ellipse
                                            id="tuner_7"
                                            cx="63.553"
                                            cy="55.21"
                                            rx="8.912"
                                            ry="5.685"
                                            transform="rotate(-9.415 63.553 55.21)"
                                        ></ellipse>
                                    </g>
                                </g>
                            </svg>
                        </div>
                    </div>
                    <div className={styles.option}>
                        <div className={styles.noteContainer}>
                            <div onClick={() => setNote('a')} className={ note !== 'a' ? `${styles['note']} ${styles['h1']}` : `${styles['note']} ${styles['note_mobile']} ${styles['h1']}`}>A</div>
                            <div onClick={() => setNote('b')} className={ note !== 'b' ? `${styles['note']} ${styles['h1']}` : `${styles['note']} ${styles['note_mobile']} ${styles['h1']}`}>B</div>
                            <div onClick={() => setNote('c')} className={ note !== 'c' ? `${styles['note']} ${styles['h1']}` : `${styles['note']} ${styles['note_mobile']} ${styles['h1']}`}>C</div>
                            <div onClick={() => setNote('d')} className={ note !== 'd' ? `${styles['note']} ${styles['h1']}` : `${styles['note']} ${styles['note_mobile']} ${styles['h1']}`}>D</div>
                            <div onClick={() => setNote('e')} className={ note !== 'e' ? `${styles['note']} ${styles['h1']}` : `${styles['note']} ${styles['note_mobile']} ${styles['h1']}`}>E</div>
                            <div onClick={() => setNote('f')} className={ note !== 'f' ? `${styles['note']} ${styles['h1']}` : `${styles['note']} ${styles['note_mobile']} ${styles['h1']}`}>F</div>
                            <div onClick={() => setNote('g')} className={ note !== 'g' ? `${styles['note']} ${styles['h1']}` : `${styles['note']} ${styles['note_mobile']} ${styles['h1']}`}>G</div>
                        </div>
                        <div className={`${styles['h1']} ${styles['noteSelected']}`}>{note.toLocaleUpperCase()}</div>
                        <h3 className={`${styles['h3']} ${styles['option_label']}`}>Note</h3>
                    </div>
                    <div className={styles.option}>
                        <div className={styles.scaleContainer}>
                            <div onClick={() => setScale('major')} className={scale === 'major' ? `${styles['scale']} ${styles['h1']} ${styles['scaleSelected']}` : `${styles['scale']} ${styles['h1']}`}>Major</div>
                            <div onClick={() => setScale('minor')} className={scale === 'minor' ? `${styles['scale']} ${styles['h1']} ${styles['scaleSelected']}` : `${styles['scale']} ${styles['h1']}`}>Minor</div>
                        </div>
                        <h3 className={`${styles['h3']} ${styles['option_label']}`}>Scale</h3>
                    </div>
                    <div className={styles.option}>
                        <div className={styles.positionContainer}>
                            <div onClick={() => setPosition('first')} className={position === 'first' ? `${styles['position']} ${styles['h1']} ${styles['positionSelected']}` : `${styles['position']} ${styles['h1']}`}>First</div>
                            <div onClick={() => setPosition('second')} className={position === 'second' ? `${styles['position']} ${styles['h1']} ${styles['positionSelected']}` : `${styles['position']} ${styles['h1']}`}>Second</div>
                        </div>
                        <h3 className={`${styles['h3']} ${styles['option_label']}`}>Position</h3>
                    </div>
                </div>
                {note && scale && instrument && position && <Fretboard activeNotes={activeNotes} settings={settings} note={note} scale={scale} instrument={instrument} position={position} lowFret={lowFret} highFret={highFret} />}
            </main>

            <footer className={styles.footer}>

            </footer>
        </div>
    )
}
