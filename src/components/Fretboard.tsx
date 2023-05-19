import { bassFrets, guitarFrets } from '@/constants/frets';
import { loadSounds } from './utilities/fretboard';
import { Note, Interval, ActiveNotes, FretX, FretY, Sounds } from '../types/types'
import { useEffect, useState } from 'react';
import { Howl } from 'howler';

type FretboardType = {
  instrument: 'bass' | 'guitar' | null,
  note: Note | null,
  position: 'first' | 'second' | null,
  scale: 'major' | 'minor' | null,
  settings: boolean,
  handleSettings: (value: boolean) => void,
}

const Fretboard = (props: FretboardType) => {
  const {instrument, note, position, scale, settings, handleSettings} = props;
  const [bpm, setBpm] = useState<number>(80);
  const bpmSteps: number[] = [-1, -10, 10, 1];
  const [currentNote, setCurrentNote] = useState<[Interval, Note] | []>([]);
  const [intervals, setIntervals] = useState<[Interval, Note][] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [notePositions, setNotePositions] = useState<[FretX, FretY][] | []>([]);
  const [practice, setPractice] = useState<boolean>(false); // Starts practice once sounds are ready.
  const [practiceInterval, setPracticeInterval] = useState<NodeJS.Timer | null>(null);
  const [practiceReady, setPracticeReady] = useState<boolean>(false); // Starts practice once sounds are ready.
  const [reverseFretboard, setReverseFreboard] = useState<boolean>(false);
  const [selectedFret, setSelectedFret] = useState<typeof bassFrets | typeof guitarFrets | null>(null);
  const [sounds, setSounds] = useState<string[] | []>([]);
  const [updateSounds, setUpdateSounds] = useState<boolean>(false); // Fetch new sounds or not.
  const [volume, setVolume] = useState<number>(0.5);

  useEffect(() => {
    setUpdateSounds(true);
    setSounds([]);
    const fetchScales = async () => {
      if (instrument && note && scale && position) {
        const response = await fetch(`/api/scales?note=${note}&scale=${scale}&instrument=${instrument}&position=${position}`);
        const data: ActiveNotes = await response.json();
        setIntervals(data.intervals);
        setNotePositions(data.positions);
        setSelectedFret(instrument === 'bass' ? bassFrets : guitarFrets);
      }
    }
    fetchScales();
  }, [instrument, note, scale, position])
  useEffect(() => {
    const fetchSounds = async () => {
      setLoading(true);
      const response = await fetch(`/api/sounds?notePositions=${encodeURIComponent(JSON.stringify(notePositions))}&instrument=${instrument}`);
      const data: Sounds = await response.json();
      const cached_sounds = await loadSounds(data.soundUrls);
      cached_sounds && setSounds(cached_sounds);
      setPracticeReady(true);
      setLoading(false);
    };
    if (updateSounds) {
      fetchSounds()
      setUpdateSounds(false);
    }
    sounds.length !== 0 && setPracticeReady(true);
    setCurrentNote([]);
    practiceInterval && clearInterval(practiceInterval)
  }, [practice])

  useEffect(() => {
    if (practiceReady) {
      let newInterval: NodeJS.Timer;
      if (sounds.length > 0 && practice) {
        let index = 0;
        playNote(index);
        index++;
        newInterval = setInterval(() => {
          playNote(index);
          index === 7 ? index = 0 : index++;
        }, 60000 / bpm);
        setPracticeInterval(newInterval);
      }
      setPracticeReady(false);
    }
  }, [practiceReady])

  useEffect(() => {
    Howler.volume(volume);
  }, [volume])

  const checkNote = (position: number[]): boolean => {
    if (notePositions) {
      return notePositions.some(note => note[0] == position[0] && note[1] == position[1]);
    }
    return false
  }

  const checkFret = (item: number) => {
    for (let i = 0; i < notePositions.length; i++) {
      if (notePositions[i][0] === item) {
        return true; // itemmber matches the first item of a nested array
      }
    }
    return false; // Number does not match the first item of any nested array
  }

  const displayNote = (position: number[]): [Interval, Note] | undefined => {
    if (notePositions && intervals) {
      const index = notePositions.findIndex(n => n[0] === position[0] && n[1] === position[1]);
      return index !== -1 ? intervals[index] : undefined;
    }
  }

  const handleBpm = (value: number) => {
    if (bpm + value >= 10 && bpm + value <= 280) {
      setBpm(bpm + value);
    }
  }
  const handlePractice = () => {
    setPractice(!practice);
    handleSettings(!settings);
  }

  const handleVolume = (value: number) => {
    if (volume + value >= 0 && volume + value <= 1) {
      setVolume(Number((volume + value).toFixed(1)));
    }
  }

  const playNote = (index: number) => {
    if (intervals && sounds) {
      setCurrentNote(intervals[index]);
      stop();
      const sound = new Howl({ src: sounds[index], format: ['mp3'] });
      sound.play();
      sound.fade(0.1, 0, 1000);
    }
  }

  return (
    <div className='flex flex-col mb-8'>
      <div className='bg-gray-200 flex flex-wrap md:flex-row justify-between m-auto p-2 md:p-4 rounded-sm min-w-full lg:min-w-fit w-2/3'>
        <div className='flex w-1/2 md:flex-1 flex-col gap-1 md:gap-4 text-center'>
          <h3 className='text-lg md:text-2xl'>BPM</h3>
          <span className='text-lg md:text-2xl' tabIndex={0} aria-label={`Current bpm ${bpm}`}>{bpm}</span>
          <div className='flex gap-2 md:gap-4'>
            {bpmSteps.map((step) => <button key={bpmSteps.indexOf(step)} disabled={bpm + step > 280 || bpm + step < 10 || practice ? true : false} type='button' aria-label={`${step < 0 ? 'Decrease' : 'Increase'} bpm by ${step}`} className={`${step > 0 ? 'active:bg-emerald-700' : 'active:bg-red-700'} bg-gray-500 flex h-11 w-11 items-center justify-center m-auto rounded-sm shadow-equal-sm shadow-black text-slate-50 text-lg md:text-2xl transition-all ease-in-out duration-150 active:scale-95 active:shadow-none disabled:bg-gray-500 disabled:cursor-not-allowed disabled:opacity-80  disabled:scale-100 disabled:shadow-none focus-visible:outline focus-visible:outline-black focus-visible:outline-4`} onClick={() => handleBpm(step)}>
              <span className={`${step > 0 ? step === 1 ? 'scale-75 ' : '' : step === -1 ? 'scale-75 rotate-180 ' : 'rotate-180'} flex`}>▲</span>
            </button>)
            }
          </div>
        </div>
        <div className='flex w-1/2 md:flex-1 flex-col gap-1 md:gap-4 text-center'>
          <h3 className='text-lg md:text-2xl'>Volume</h3>
          <span className='text-lg md:text-2xl' tabIndex={0} aria-label={`Current volume level ${bpm}`}>{volume * 100}</span>
          <div className='flex gap-2 md:gap-4 justify-center'>
            <button type='button' aria-label='Decrease volume by 10%' disabled={volume === 0 && true} className='bg-gray-500 flex h-11 w-11 items-center justify-center md:m-auto rounded-sm shadow-equal-sm shadow-black text-slate-50 text-lg md:text-2xl transition-all ease-in-out duration-150 active:bg-red-700 active:scale-95 active:shadow-none disabled:bg-gray-500 disabled:cursor-not-allowed disabled:opacity-80  disabled:scale-100 disabled:shadow-none focus-visible:outline focus-visible:outline-black focus-visible:outline-4' onClick={() => handleVolume(-0.1)}><span className='rotate-180'>▲</span></button>
            <button type='button' aria-label='Increase volume by 10%' disabled={volume === 1 && true} className='bg-gray-500 flex h-11 w-11 items-center justify-center md:m-auto rounded-sm shadow-equal-sm shadow-black text-slate-50 text-lg md:text-2xl transition-all ease-in-out duration-150 active:bg-emerald-700 active:scale-95 active:shadow-none disabled:bg-gray-500 disabled:cursor-not-allowed disabled:opacity-80  disabled:scale-100 disabled:shadow-none focus-visible:outline focus-visible:outline-black focus-visible:outline-4' onClick={() => handleVolume(0.1)}><span>▲</span></button>
          </div>
        </div>
        <div className='flex flex-1 flex-col gap-1 md:gap-4 text-center justify-between'>
          <h3 className='text-lg md:text-2xl'>Fret Direction</h3>
          <span className='text-lg md:text-2xl' tabIndex={0} aria-label={`Current volume level ${bpm}`}>{!reverseFretboard ? 'Left to Right' : 'Right to Left'}</span>
          <div className='flex gap-2 md:gap-4 justify-center'>
            <button type='button' aria-label='Set fretboard direction left to right' disabled={!reverseFretboard} className='bg-gray-500 flex h-11 w-11 items-center justify-center md:m-auto rounded-sm shadow-equal-sm shadow-black text-slate-50 text-lg md:text-2xl transition-all ease-in-out duration-150 active:bg-emerald-700 active:scale-95 active:shadow-none disabled:bg-gray-500 disabled:cursor-not-allowed disabled:opacity-80  disabled:scale-100 disabled:shadow-none focus-visible:outline focus-visible:outline-black focus-visible:outline-4' onClick={() => setReverseFreboard(false)}><span className='rotate-90'>▲</span></button>
            <button type='button' aria-label='Set fretboard direction right to left' disabled={reverseFretboard} className='bg-gray-500 flex h-11 w-11 items-center justify-center md:m-auto rounded-sm shadow-equal-sm shadow-black text-slate-50 text-lg md:text-2xl transition-all ease-in-out duration-150 active:bg-emerald-700 active:scale-95 active:shadow-none disabled:bg-gray-500 disabled:cursor-not-allowed disabled:opacity-80  disabled:scale-100 disabled:shadow-none focus-visible:outline focus-visible:outline-black focus-visible:outline-4' onClick={() => setReverseFreboard(true)}><span className='-rotate-90'>▲</span></button>
          </div>
        </div>
      </div>
      <div className='my-2 md:my-4 text-center'>
        {intervals && notePositions && <button type='button' disabled={loading && sounds.length === 0} className={`${practice ? 'bg-red-700 hover:bg-red-500' : 'bg-emerald-700 hover:bg-emerald-500'} m-auto p-2 rounded-sm shadow-equal-sm shadow-black text-slate-50 text-lg md:text-2xl transition-all ease-in-out duration-150 w-full md:w-96 active:scale-95 active:shadow-none disabled:bg-gray-500 disabled:cursor-not-allowed disabled:opacity-80  disabled:scale-100 disabled:shadow-none focus-visible:outline focus-visible:outline-black focus-visible:outline-4`} onClick={handlePractice}>{loading && sounds.length === 0 ? 'Loading' : practice ? 'Stop Practice' : 'Start Practice'}</button>}
      </div>
      <div className='flex flex-wrap gap-1 md:gap-6 justify-center my-2 md:my-4'>
        {intervals && intervals.map((interval, index) =>
          <div key={index} className={`${currentNote[0] === interval[0] && currentNote[1] === interval[1] && 'bg-teal-500 current-note shadow-equal-md shadow-black'} bg-gray-200 flex flex-col group p-2 rounded-full text-xl text-center transition-all ease-in-out duration-300`} id={`interval_${index}`}>
            <div className='bg-gray-500 flex flex-col h-9 w-9 justify-center rounded-full text-slate-50 group-[.current-note]:bg-cyan-900 group-[.current-note]:shadow-equal-md group-[.current-note]:shadow-black'>
              <span aria-hidden='true'>{interval[1]}</span>
              <span className='sr-only'>{`Note ${interval[1]} ${interval[1].includes('♭') ? 'flat' : interval[1].includes('♯') ? 'sharp' : ''}`}</span>
            </div>
            <span aria-hidden='true' className='my-1 text-center'>{interval[0]}</span>
            <span className='sr-only'>{`Interval ${interval[0]}`}</span>
          </div>
        )
        }
      </div>
      <div className={`${reverseFretboard ? 'flex-row-reverse' : ''} flex gap-1 justify-around my-2 md:my-4 self-center text-center w-full`}>
        {selectedFret && selectedFret.map((fret) =>
          <div className={`${checkFret(selectedFret.indexOf(fret)) || selectedFret.indexOf(fret) === 0 ? 'flex' : 'hidden md:flex'} flex-1 flex-col gap-1`} key={selectedFret.indexOf(fret)}>
            {
              selectedFret.indexOf(fret) !== 0 ?
                <div className=' bg-gray-500 flex h-12 items-center justify-center py-8 rounded-sm text-slate-50 text-lg text-shadow-sm shadow-gray-900'>
                  <span>{selectedFret.indexOf(fret)}</span>
                </div> :
                <div className=' bg-gray-500 flex h-12 items-center justify-center py-8 rounded-sm text-slate-50 text-lg text-shadow-sm shadow-gray-900'>
                  <span>Open String</span>
                </div>
            }
            {fret.map((fretNote) => {
              if (checkNote([selectedFret.indexOf(fret), fretNote[1]])) {
                const note = displayNote([selectedFret.indexOf(fret), fretNote[1]]);
                if (note) {
                  return <div className={`${currentNote[0] === note[0] && currentNote[1] === note[1] && 'current-note'} bg-gray-200 group h-8 relative rounded-sm text-center`} data-active-note='true' data-current-note={currentNote[0] === note[0] && currentNote[1] === note[1] && true} key={fret.indexOf(fretNote)}>
                    <span className='absolute left-[50%] top-[50%] bg-cyan-900 flex h-7 w-7 items-center justify-center origin-center rounded-full scale-100 shadow-equal-sm shadow-gray-900 transition-all ease-in-out duration-300 translate-x-[-50%] translate-y-[-50%] group-[.current-note]:bg-teal-500 group-[.current-note]:scale-125 group-[.current-note]:shadow-equal-md'>
                      <span className='absolute left-[50%] top-[50%] text-shadow-sm text-slate-50 shadow-gray-900 translate-x-[-50%] translate-y-[-50%] group-[.current-note]:text-gray-900 group-[.current-note]:shadow-gray-500'>{note[1]}</span>
                    </span>
                  </div>
                }
              } else {
                return <div className='bg-gray-200 flex h-8 items-center justify-center relative rounded-sm text-center' data-active-note='false' key={fret.indexOf(fretNote)}>
                  <span className='text-shadow-sm shadow-gray-400'>{fretNote[0]}</span>
                </div>
              }
            })}
          </div>)}
      </div>
    </div>
  )
}

export default Fretboard;
