import { mayor_scales, minor_scales } from "../assets/variables/scales";
import { bassFrets, guitarFrets } from "../assets/variables/frets";
import styles from './../styles/Fretboard.module.scss';
import { useEffect, useState } from "react";
import { Howl } from 'howler';
import {
    Guitar_0_1, Guitar_0_2, Guitar_0_3, Guitar_0_4, Guitar_0_5, Guitar_0_6,
    Guitar_1_1, Guitar_1_2, Guitar_1_3, Guitar_1_4, Guitar_1_5, Guitar_1_6,
    Guitar_2_1, Guitar_2_2, Guitar_2_3, Guitar_2_4, Guitar_2_5, Guitar_2_6,
    Guitar_3_1, Guitar_3_2, Guitar_3_3, Guitar_3_4, Guitar_3_5, Guitar_3_6,
    Guitar_4_1, Guitar_4_2, Guitar_4_3, Guitar_4_4, Guitar_4_5, Guitar_4_6,
    Guitar_5_1, Guitar_5_2, Guitar_5_3, Guitar_5_4, Guitar_5_5, Guitar_5_6,
    Guitar_6_1, Guitar_6_2, Guitar_6_3, Guitar_6_4, Guitar_6_5, Guitar_6_6,
    Guitar_7_1, Guitar_7_2, Guitar_7_3, Guitar_7_4, Guitar_7_5, Guitar_7_6,
    Guitar_8_1, Guitar_8_2, Guitar_8_3, Guitar_8_4, Guitar_8_5, Guitar_8_6,
    Guitar_9_1, Guitar_9_2, Guitar_9_3, Guitar_9_4, Guitar_9_5, Guitar_9_6,
    Guitar_10_1, Guitar_10_2, Guitar_10_3, Guitar_10_4, Guitar_10_5, Guitar_10_6,
    Guitar_11_1, Guitar_11_2, Guitar_11_3, Guitar_11_4, Guitar_11_5, Guitar_11_6,
    Guitar_12_1, Guitar_12_2, Guitar_12_3, Guitar_12_4, Guitar_12_5, Guitar_12_6,
    Guitar_13_1, Guitar_13_2, Guitar_13_3, Guitar_13_4, Guitar_13_5, Guitar_13_6,
    Bass_0_1, Bass_0_2, Bass_0_3, Bass_0_4,
    Bass_1_1, Bass_1_2, Bass_1_3, Bass_1_4,
    Bass_2_1, Bass_2_2, Bass_2_3, Bass_2_4,
    Bass_3_1, Bass_3_2, Bass_3_3, Bass_3_4,
    Bass_4_1, Bass_4_2, Bass_4_3, Bass_4_4,
    Bass_5_1, Bass_5_2, Bass_5_3, Bass_5_4,
    Bass_6_1, Bass_6_2, Bass_6_3, Bass_6_4,
    Bass_7_1, Bass_7_2, Bass_7_3, Bass_7_4,
    Bass_8_1, Bass_8_2, Bass_8_3, Bass_8_4,
    Bass_9_1, Bass_9_2, Bass_9_3, Bass_9_4,
    Bass_10_1, Bass_10_2, Bass_10_3, Bass_10_4,
    Bass_11_1, Bass_11_2, Bass_11_3, Bass_11_4,
    Bass_12_1, Bass_12_2, Bass_12_3, Bass_12_4,
    Bass_13_1, Bass_13_2, Bass_13_3, Bass_13_4
} from '../assets/variables/sounds';

const Fretboard = ({ activeNotes, settings, note, scale, instrument, position, lowFret, highFret }) => {
    const [frets, setFrets] = useState();
    const [practice, setPractice] = useState(false);
    const [currentNote, setCurrentNote] = useState('');
    const [intervalId, setIntervalId] = useState(0);
    const [bpm, setBpm] = useState(80);
    const [feedback, setFeedback] = useState(false);
    const [leftHand, setLeftHand] = useState(false);
    const [changefretDirection, setChangeFretDirection] = useState(false);
    const [hideNotes, setHideNotes] = useState(false);
    const [mute, setMute] = useState(false);

    const searchForArray = (haystack, needle) => {
        var i, j, current;
        for (i = 0; i < haystack.length; ++i) {
            if (needle.length === haystack[i].length) {
                current = haystack[i];
                for (j = 0; j < needle.length && needle[j] === current[j]; ++j);
                if (j === needle.length)
                    return i;
            }
        }
        return -1;
    }

    const guitar_0_1 = Guitar_0_1;
    const guitar_0_2 = Guitar_0_2;
    const guitar_0_3 = Guitar_0_3;
    const guitar_0_4 = Guitar_0_4;
    const guitar_0_5 = Guitar_0_5;
    const guitar_0_6 = Guitar_0_6;
    const guitar_1_1 = Guitar_1_1;
    const guitar_1_2 = Guitar_1_2;
    const guitar_1_3 = Guitar_1_3;
    const guitar_1_4 = Guitar_1_4;
    const guitar_1_5 = Guitar_1_5;
    const guitar_1_6 = Guitar_1_6;
    const guitar_2_1 = Guitar_2_1;
    const guitar_2_2 = Guitar_2_2;
    const guitar_2_3 = Guitar_2_3;
    const guitar_2_4 = Guitar_2_4;
    const guitar_2_5 = Guitar_2_5;
    const guitar_2_6 = Guitar_2_6;
    const guitar_3_1 = Guitar_3_1;
    const guitar_3_2 = Guitar_3_2;
    const guitar_3_3 = Guitar_3_3;
    const guitar_3_4 = Guitar_3_4;
    const guitar_3_5 = Guitar_3_5;
    const guitar_3_6 = Guitar_3_6;
    const guitar_4_1 = Guitar_4_1;
    const guitar_4_2 = Guitar_4_2;
    const guitar_4_3 = Guitar_4_3;
    const guitar_4_4 = Guitar_4_4;
    const guitar_4_5 = Guitar_4_5;
    const guitar_4_6 = Guitar_4_6;
    const guitar_5_1 = Guitar_5_1;
    const guitar_5_2 = Guitar_5_2;
    const guitar_5_3 = Guitar_5_3;
    const guitar_5_4 = Guitar_5_4;
    const guitar_5_5 = Guitar_5_5;
    const guitar_5_6 = Guitar_5_6;
    const guitar_6_1 = Guitar_6_1;
    const guitar_6_2 = Guitar_6_2;
    const guitar_6_3 = Guitar_6_3;
    const guitar_6_4 = Guitar_6_4;
    const guitar_6_5 = Guitar_6_5;
    const guitar_6_6 = Guitar_6_6;
    const guitar_7_1 = Guitar_7_1;
    const guitar_7_2 = Guitar_7_2;
    const guitar_7_3 = Guitar_7_3;
    const guitar_7_4 = Guitar_7_4;
    const guitar_7_5 = Guitar_7_5;
    const guitar_7_6 = Guitar_7_6;
    const guitar_8_1 = Guitar_8_1;
    const guitar_8_2 = Guitar_8_2;
    const guitar_8_3 = Guitar_8_3;
    const guitar_8_4 = Guitar_8_4;
    const guitar_8_5 = Guitar_8_5;
    const guitar_8_6 = Guitar_8_6;
    const guitar_9_1 = Guitar_9_1;
    const guitar_9_2 = Guitar_9_2;
    const guitar_9_3 = Guitar_9_3;
    const guitar_9_4 = Guitar_9_4;
    const guitar_9_5 = Guitar_9_5;
    const guitar_9_6 = Guitar_9_6;
    const guitar_10_1 = Guitar_10_1;
    const guitar_10_2 = Guitar_10_2;
    const guitar_10_3 = Guitar_10_3;
    const guitar_10_4 = Guitar_10_4;
    const guitar_10_5 = Guitar_10_5;
    const guitar_10_6 = Guitar_10_6;
    const guitar_11_1 = Guitar_11_1;
    const guitar_11_2 = Guitar_11_2;
    const guitar_11_3 = Guitar_11_3;
    const guitar_11_4 = Guitar_11_4;
    const guitar_11_5 = Guitar_11_5;
    const guitar_11_6 = Guitar_11_6;
    const guitar_12_1 = Guitar_12_1;
    const guitar_12_2 = Guitar_12_2;
    const guitar_12_3 = Guitar_12_3;
    const guitar_12_4 = Guitar_12_4;
    const guitar_12_5 = Guitar_12_5;
    const guitar_12_6 = Guitar_12_6;
    const guitar_13_1 = Guitar_13_1;
    const guitar_13_2 = Guitar_13_2;
    const guitar_13_3 = Guitar_13_3;
    const guitar_13_4 = Guitar_13_4;
    const guitar_13_5 = Guitar_13_5;
    const guitar_13_6 = Guitar_13_6;

    const bass_0_1 = Bass_0_1;
    const bass_0_2 = Bass_0_2;
    const bass_0_3 = Bass_0_3;
    const bass_0_4 = Bass_0_4;
    const bass_1_1 = Bass_1_1;
    const bass_1_2 = Bass_1_2;
    const bass_1_3 = Bass_1_3;
    const bass_1_4 = Bass_1_4;
    const bass_2_1 = Bass_2_1;
    const bass_2_2 = Bass_2_2;
    const bass_2_3 = Bass_2_3;
    const bass_2_4 = Bass_2_4;
    const bass_3_1 = Bass_3_1;
    const bass_3_2 = Bass_3_2;
    const bass_3_3 = Bass_3_3;
    const bass_3_4 = Bass_3_4;
    const bass_4_1 = Bass_4_1;
    const bass_4_2 = Bass_4_2;
    const bass_4_3 = Bass_4_3;
    const bass_4_4 = Bass_4_4;
    const bass_5_1 = Bass_5_1;
    const bass_5_2 = Bass_5_2;
    const bass_5_3 = Bass_5_3;
    const bass_5_4 = Bass_5_4;
    const bass_6_1 = Bass_6_1;
    const bass_6_2 = Bass_6_2;
    const bass_6_3 = Bass_6_3;
    const bass_6_4 = Bass_6_4;
    const bass_7_1 = Bass_7_1;
    const bass_7_2 = Bass_7_2;
    const bass_7_3 = Bass_7_3;
    const bass_7_4 = Bass_7_4;
    const bass_8_1 = Bass_8_1;
    const bass_8_2 = Bass_8_2;
    const bass_8_3 = Bass_8_3;
    const bass_8_4 = Bass_8_4;
    const bass_9_1 = Bass_9_1;
    const bass_9_2 = Bass_9_2;
    const bass_9_3 = Bass_9_3;
    const bass_9_4 = Bass_9_4;
    const bass_10_1 = Bass_10_1;
    const bass_10_2 = Bass_10_2;
    const bass_10_3 = Bass_10_3;
    const bass_10_4 = Bass_10_4;
    const bass_11_1 = Bass_11_1;
    const bass_11_2 = Bass_11_2;
    const bass_11_3 = Bass_11_3;
    const bass_11_4 = Bass_11_4;
    const bass_12_1 = Bass_12_1;
    const bass_12_2 = Bass_12_2;
    const bass_12_3 = Bass_12_3;
    const bass_12_4 = Bass_12_4;
    const bass_13_1 = Bass_13_1;
    const bass_13_2 = Bass_13_2;
    const bass_13_3 = Bass_13_3;
    const bass_13_4 = Bass_13_4;

    const changeBpm = (value) => {

        setFeedback(true);
        if (practice) {
            setPractice(false);
            clearInterval(intervalId);
            setIntervalId(0);
            setCurrentNote('');
            if (bpm + value >= 10 && bpm + value <= 280) {
                setBpm(bpm + value);
            }

        } else {
            if (bpm + value >= 10 && bpm + value <= 280) {
                setBpm(bpm + value);
            }
        }
        setTimeout(() => setFeedback(false), 100)
    }

    const runPractice = () => {
        if (intervalId === 0) {
            setPractice(true);
            let index = 8;
            setCurrentNote(activeNotes[index]);
            if (index === 15) {
                index = 8;
            } else {
                index++
            }
            const newInterval = setInterval(() => {
                setCurrentNote(activeNotes[index]);
                if (index === 15) {
                    index = 8;
                } else {
                    index++
                }
            }, 60000 / bpm)
            setIntervalId(newInterval);
        } else {
            setPractice(false);
            clearInterval(intervalId);
            setIntervalId(0);
            setCurrentNote('');
        }
    }

    useEffect(() => {
        practice && runPractice();
        setFrets(instrument === 'bass' ? bassFrets : guitarFrets);
    }, [note, scale, instrument, position]);
    useEffect(() => {
        if (!mute) {
            if (instrument === 'bass') {
                stop();
                const sound = currentNote && new Howl({ src: [eval('bass_' + currentNote[0] + '_' + currentNote[1])], volume: 0.1 })
                sound && sound.play();
                sound && sound.fade(0.1, 0, 1000);
            } else {
                stop();
                const sound = currentNote && new Howl({ src: [eval('guitar_' + currentNote[0] + '_' + currentNote[1])], volume: 0.1 })
                sound && sound.play();
                sound && sound.fade(0.1, 0, 1000);
            }
        }
    }, [currentNote])

    useEffect(() => {
        practice && runPractice();
    }, [settings, leftHand, changefretDirection])

    if (note && scale && instrument && position) {
        return (
            <div className={styles.fretboard} style={{ maxHeight: settings && 0 }}>
                <div className={styles.scale_notes}>
                    <h3>Notes</h3>
                    <div>
                        <div className={styles.note}>{note && scale === 'major' ? mayor_scales[instrument][note].position[position].notes.map(note => <p className={styles.note} key={note.interval[0]} ><span key={note.interval[0]} >{note.interval[1]}</span><span key={1 + note.interval[0]} >{note.interval[0]}</span></p>) : minor_scales[instrument][note].position[position].notes.map(note => <p className={styles.note} key={note.interval[0]}><span key={note.interval[0]} >{note.interval[1]}</span><span key={1 + note.interval[0]} >{note.interval[0]}</span></p>)}</div>
                    </div>

                </div>
                <div className={styles.fretboard_controls}>
                    <div className={styles.tempo_container}>
                        <div className={styles.title}>BPM</div>
                        <div className={styles.controls}>
                            <div className={`${styles.button} ${styles.down1}`} disabled={bpm === 10 && true} style={{ backgroundColor: bpm === 10 && '#bbbbbb' }} onClick={() => changeBpm(-1)} >▲</div>
                            <div className={`${styles.button} ${styles.down10}`} disabled={bpm < 20 && true} style={{ backgroundColor: bpm < 20 && '#bbbbbb' }} onClick={() => changeBpm(-10)} >▲</div>
                            <div className={styles.bpm} style={{ fontSize: feedback ? '30px' : '25px' }}>{bpm}</div>
                            <div className={`${styles.button} ${styles.up10}`} disabled={bpm > 270 && true} style={{ backgroundColor: bpm > 270 && '#bbbbbb' }} onClick={() => changeBpm(10)} >▲</div>
                            <div className={`${styles.button} ${styles.up1}`} disabled={bpm === 280 && true} style={{ backgroundColor: bpm === 280 && '#bbbbbb' }} onClick={() => changeBpm(1)} >▲</div>
                        </div>
                    </div>
                    <div className={styles.start_container}>
                        <div className={styles.practice_container}>
                            <div id='start_practice' className={practice ? styles.practicing : ''} onClick={runPractice}>{!practice ? 'Start' : 'Stop'}</div>
                        </div>
                        <div className={styles.settings_container}>
                            <div className={styles.fret_hand}>
                                <span className={leftHand ? styles.left_hand : ''} onClick={() => setLeftHand(!leftHand)}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                        className="svg-inline--fa fa-hand-paper fa-w-14"
                                        data-icon="hand-paper"
                                        data-prefix="fas"
                                        viewBox="0 0 448 512"
                                    >
                                        <path
                                            d="M408.781 128.007C386.356 127.578 368 146.36 368 168.79V256h-8V79.79c0-22.43-18.356-41.212-40.781-40.783C297.488 39.423 280 57.169 280 79v177h-8V40.79C272 18.36 253.644-.422 231.219.007 209.488.423 192 18.169 192 40v216h-8V80.79c0-22.43-18.356-41.212-40.781-40.783C121.488 40.423 104 58.169 104 80v235.992l-31.648-43.519c-12.993-17.866-38.009-21.817-55.877-8.823-17.865 12.994-21.815 38.01-8.822 55.877l125.601 172.705A48 48 0 00172.073 512h197.59c22.274 0 41.622-15.324 46.724-37.006l26.508-112.66a192.011 192.011 0 005.104-43.975V168c.001-21.831-17.487-39.577-39.218-39.993z"
                                        ></path>
                                    </svg>
                                </span>
                            </div>
                            <div className={styles.fret_direction}>
                                <span className={changefretDirection ? styles.change_fret_direction : ''} onClick={() => setChangeFretDirection(!changefretDirection)}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="95"
                                        height="91"
                                        fill="none"
                                        viewBox="0 0 95 91"
                                    >
                                        <g id="Frame 1" fill="#fff" clipPath="url(#clip0_1_2)">
                                            <path id="body_right" d="M32 49H64V79H32z"></path>
                                            <path
                                                id="arrow_right"
                                                d="M93 64.5L62.25 88.316V40.684L93 64.5z"
                                            ></path>
                                            <path
                                                id="body_left"
                                                d="M62 41H94V71H62z"
                                                transform="rotate(180 62 41)"
                                            ></path>
                                            <path id="arrow_left" d="M1 25.5L31.75 1.684v47.632L1 25.5z"></path>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_1_2">
                                                <path fill="#fff" d="M0 0H95V91H0z"></path>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </span>
                            </div>
                            <div className={styles.fret_hide_notes}>
                                <span className={hideNotes ? styles.hide_notes : ''} onClick={() => setHideNotes(!hideNotes)}>
                                    <svg className={styles.hide_notes} style={{ height: hideNotes ? '50px' : 0 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                        <path d="M279.6 160.4c2.8-.3 5.6-.4 8.4-.4 53 0 96 42.1 96 96 0 53-43 96-96 96-53.9 0-96-43-96-96 0-2.8.1-5.6.4-8.4 9.3 4.5 20.1 8.4 31.6 8.4 35.3 0 64-28.7 64-64 0-11.5-3.9-22.3-8.4-31.6zm201-47.8c46.8 43.4 78.1 94.5 92.9 131.1 3.3 7.9 3.3 16.7 0 24.6-14.8 35.7-46.1 86.8-92.9 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.58-80.6C48.62 355.1 17.34 304 2.461 268.3a31.967 31.967 0 010-24.6C17.34 207.1 48.62 156 95.42 112.6 142.5 68.84 207.2 32 288 32c80.8 0 145.5 36.84 192.6 80.6zM288 112c-79.5 0-144 64.5-144 144s64.5 144 144 144 144-64.5 144-144-64.5-144-144-144z"></path>
                                    </svg>
                                    <svg className={styles.hide_notes} style={{ height: hideNotes ? 0 : '50px' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                        <path d="M150.7 92.77C195 58.27 251.8 32 320 32c80.8 0 145.5 36.84 192.6 80.6 46.8 43.4 78.1 94.5 92.9 131.1 3.3 7.9 3.3 16.7 0 24.6-13.4 32.3-40.3 77.8-79.9 118.4l105.2 82.4c10.4 8.2 12.3 23.3 4.1 33.7-8.2 10.4-23.3 12.3-33.7 4.1L9.196 42.89C-1.236 34.71-3.065 19.63 5.112 9.196 13.29-1.236 28.37-3.065 38.81 5.112L150.7 92.77zm72.4 56.73l90.3 70.8c4.2-8.5 6.6-18.1 6.6-29.2 0-10.6-3.9-21.4-8.4-30.7 2.8-.3 5.6-1.3 8.4-1.3 53 0 96 43 96 96 0 14.6-2.9 27.6-8.9 39.4l39.5 30.2c11.1-20.4 17.4-43.8 17.4-69.6 0-78.6-64.5-144-144-144-37.3 0-71.4 15.1-96.9 38.4zM320 480c-80.8 0-145.5-36.8-192.6-80.6-46.78-44.3-78.06-95.4-92.94-131.1a31.98 31.98 0 010-24.6c9.54-22.9 25.83-52.5 48.63-82.2l94.31 74.3c-.9 6.6-1.4 13.3-1.4 19.3 0 80.4 64.5 144.9 144 144.9 18.7 0 36.6-3.6 53-10.1l73.2 57.6C409.9 467.1 367.8 480 320 480z"></path>
                                    </svg>
                                </span>
                            </div>
                            <div className={styles.fret_hide_notes}>
                                <span className={mute ? styles.hide_notes : ''} onClick={() => setMute(!mute)}>
                                    <svg className={styles.hide_notes} style={{ height: mute ? '50px' : 0 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                    <path d="M412.6 182c-10.28-8.334-25.41-6.867-33.75 3.402-8.406 10.24-6.906 25.35 3.375 33.74C393.5 228.4 400 241.8 400 255.1c0 14.17-6.5 27.59-17.81 36.83-10.28 8.396-11.78 23.5-3.375 33.74 4.719 5.806 11.62 8.802 18.56 8.802 5.344 0 10.75-1.779 15.19-5.399C435.1 311.5 448 284.6 448 255.1s-12.9-54.7-35.4-73.1zm60.5-73.8c-10.22-8.334-25.34-6.898-33.78 3.34-8.406 10.24-6.906 25.35 3.344 33.74C476.6 172.1 496 213.3 496 255.1s-19.44 82.1-53.31 110.7c-10.25 8.396-11.75 23.5-3.344 33.74a23.962 23.962 0 0018.56 8.771c5.375 0 10.75-1.779 15.22-5.431C518.2 366.9 544 313 544 255.1S518.2 145 473.1 108.2zm61.3-74.8c-10.22-8.334-25.34-6.867-33.78 3.34-8.406 10.24-6.906 25.35 3.344 33.74C559.9 116.3 592 183.9 592 255.1s-32.09 139.7-88.06 185.5c-10.25 8.396-11.75 23.5-3.344 33.74C505.3 481 512.2 484 519.2 484c5.375 0 10.75-1.779 15.22-5.431C601.5 423.6 640 342.5 640 255.1S601.5 88.34 534.4 33.4zm-233.2 1.58c-11.5-5.181-25.01-3.076-34.43 5.29L131.8 160.1H48c-26.51 0-48 21.48-48 47.96v95.92c0 26.48 21.49 47.96 48 47.96h83.84l134.9 119.8A32.167 32.167 0 00288 479.8c4.438 0 8.959-.931 13.16-2.835A31.81 31.81 0 00320 447.9V64.12c0-12.57-7.3-23.99-18.8-29.14z"></path>
                                    </svg>
                                    <svg className={styles.hide_notes} style={{ height: mute ? 0 : '50px' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
      <path d="M301.2 34.85c-11.5-5.188-25.02-3.122-34.44 5.253L131.8 160H48c-26.51 0-48 21.49-48 47.1v95.1c0 26.51 21.49 47.1 48 47.1h83.84l134.9 119.9a32.023 32.023 0 0021.26 8.094c4.438 0 8.972-.937 13.17-2.844 11.5-5.156 18.82-16.56 18.82-29.16V64c-.89-12.59-7.29-24-18.79-29.15zM513.9 255.1l47.03-47.03c9.375-9.375 9.375-24.56 0-33.94s-24.56-9.375-33.94 0L480 222.1 432.1 175c-9.375-9.375-24.56-9.375-33.94 0s-9.375 24.56 0 33.94l47.03 47.03L398.16 303c-9.375 9.375-9.375 24.56 0 33.94 9.373 9.373 24.56 9.381 33.94 0L480 289.9l47.03 47.03c9.373 9.373 24.56 9.381 33.94 0 9.375-9.375 9.375-24.56 0-33.94L513.9 255.1z"></path>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.fret_board} style={{ flexDirection: leftHand && 'row-reverse' }}>
                    {frets &&
                        frets.map((fret) => {
                            return (
                                <div className={frets.indexOf(fret) === 0 ? `${styles.fret} ${styles.open_fret}` : frets.indexOf(fret) < lowFret || frets.indexOf(fret) > highFret ? `${styles.fret} ${styles.fret_hidden}` : `${styles.fret}`} key={frets.indexOf(fret)} id={`${frets.indexOf(fret)}_${lowFret}_${highFret}`} style={{ flexDirection: changefretDirection && 'column-reverse' }}>
                                    {frets.indexOf(fret) !== frets.length && fret.map((position) => {
                                        return (
                                            <div style={{ backgroundColor: frets.indexOf(fret) === 3 || frets.indexOf(fret) === 5 || frets.indexOf(fret) === 7 || frets.indexOf(fret) === 9 || frets.indexOf(fret) === 12 ? '#dedada' : '' }} className={searchForArray(activeNotes, [frets.indexOf(fret), position[1]]) !== -1 && frets.indexOf(fret) === currentNote[0] && position[1] === currentNote[1] && practice ? `${styles.position} ${styles.selected}` : searchForArray(activeNotes, [frets.indexOf(fret), position[1]]) !== -1 && !practice ? `${styles.position} ${styles.selected}` : styles.position} key={fret.indexOf(position)}><div className={styles.string} /><div className={styles.marker} /><span className={!hideNotes ? `${styles.note}` : `${styles.hidden_note}`} >{searchForArray(activeNotes, [frets.indexOf(fret), position[1]]) !== -1 ? activeNotes[searchForArray(activeNotes, [frets.indexOf(fret), position[1]]) - 8] : position[0]}</span></div>
                                        )
                                    })}
                                    {frets.indexOf(fret) == frets.length && fret.map((position) => {

                                        return (
                                            <div className={searchForArray(activeNotes, [frets.indexOf(fret), position[1]]) !== -1 && frets.indexOf(fret) === currentNote[0] && position[1] === currentNote[1] && practice ? `${styles.position} ${styles.selected}` : searchForArray(activeNotes, [frets.indexOf(fret), position[1]]) !== -1 && !practice ? `${styles.position} ${styles.selected}` : `${styles.position} ${styles.hidden}`} key={fret.indexOf(position)}><div className={styles.string} /><div className={styles.marker} /><span className={!hideNotes ? `${styles.note}` : `${styles.hidden_note}`}>{searchForArray(activeNotes, [frets.indexOf(fret), position[1]]) !== -1 ? activeNotes[searchForArray(activeNotes, [frets.indexOf(fret), position[1]]) - 8] : position[0]}</span></div>
                                        )
                                    })}
                                    {frets.indexOf(fret) !== frets.length && <div className={styles.fret_number} >{frets.indexOf(fret) !== 0 ? frets.indexOf(fret) : ' '}</div>}
                                    {frets.indexOf(fret) == frets.length && <div className={!activeNotes.some(e => e[0] === 13) ? styles.hidden : null}>{frets.indexOf(fret)}</div>}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Fretboard;