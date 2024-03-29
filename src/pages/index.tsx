import { useState } from 'react'
import Fretboard from '@/components/Fretboard'
import { Archivo_Black } from 'next/font/google';
import Header from '@/components/Header';

const archivo_black = Archivo_Black({ subsets: ['latin'], weight: '400' });
const Home = () => {

  const instruments: ('bass' | 'guitar')[] = ['bass', 'guitar'];
  const notes: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const positions: string[] = ['first', 'second'];
  const scales: string[] = ['major', 'minor'];
  const [allSelected, setAllSelected] = useState(false);
  const [instrument, setInstrument] = useState<'bass' | 'guitar' | null>(null)
  const [note, setNote] = useState<'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | null>(null);
  const [position, setPosition] = useState<'first' | 'second' | null>(null)
  const [scale, setScale] = useState<'major' | 'minor' | null>(null);
  const [settings, setSettings] = useState<boolean>(false);

  const handleSelected = () => {
    setAllSelected(!allSelected);
    if (settings) {
      setSettings(false);
      handleSettings();
    }
  }

  const handleSettings = () => {
      setSettings(!settings);
  }

  return (
    <>
      <Header />
      <main className={`${archivo_black.className} max-w-screen-xl px-4 mx-auto text-gray-900 min-h-screen`}>
        <h1 className='mx-auto text-center text-2xl md:text-4xl'>Master the scales on the fretboard</h1>
        <h2 className='mx-auto text-center text-lg md:text-2xl'>Select an instrument, note, scale, and position to start</h2>
        <div className='bg-gray-200 flex flex-col gap-4 my-2 md:my-4 m-auto min-w-full lg:min-w-fit w-2/3 p-2 md:p-4 rounded-sm'>
          {!allSelected && <div className='flex gap-6 flex-col'>
            <div className='flex flex-col gap-2 md:gap-4 w-full justify-between align-middle items-center'>
              <h3 className='text-lg md:text-2xl text-center'>Note</h3>
              <div className='flex w-full justify-between'>
                {notes.map((item) => {
                  return <button type='button' key={notes.indexOf(item)} aria-label={`${item} note`} className={`${note === item ? 'bg-emerald-700 outline-4' : 'bg-gray-500 hover:bg-gray-600'} h-fit outline outline-transparent outline-2 px-4 py-2 rounded-sm shadow-equal-sm shadow-black text-slate-50 transition-all ease-in-out duration-150 active:scale-95 active:shadow-none focus-visible:outline focus-visible:outline-black focus-visible:outline-4`} onClick={() => setNote(item as 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G')} >{item}</button>
                })}
              </div>
            </div>
            <div className='flex flex-col md:flex-row gap-4 lg:gap-16'>
              <div className='flex flex-1 flex-col gap-4'>
                <h3 className='text-lg md:text-2xl text-center'>Scale</h3>
                <div className='flex gap-8 lg:gap-4 justify-center lg:justify-between'>
                  {scales.map(item => <button type='button' key={scales.indexOf(item)} aria-label={`${item} scale`} className={`${scale === item ? 'bg-emerald-700 outline-4' : 'bg-gray-500 hover:bg-gray-600'} capitalize h-fit w-20 outline outline-transparent outline-2 py-2 rounded-sm shadow-equal-sm shadow-black text-slate-50 transition-all ease-in-out duration-150 active:scale-95 active:shadow-none focus-visible:outline focus-visible:outline-black focus-visible:outline-4`} onClick={() => setScale(item as 'major' | 'minor')}>{item}</button>)}
                </div>
              </div>
              <div className='flex flex-1 flex-col gap-4'>
                <h3 className='text-lg md:text-2xl text-center'>Position</h3>
                <div className='flex gap-8 lg:gap-4 justify-center lg:justify-between'>
                  {positions.map(item => <button type='button' key={positions.indexOf(item)} aria-label={`${item} position`} className={`${position == item ? 'bg-emerald-700 outline-4' : 'bg-gray-500 hover:bg-gray-600'} capitalize h-fit w-20 outline outline-transparent outline-2 py-2 rounded-sm shadow-equal-sm shadow-black text-slate-50 transition-all ease-in-out duration-150 active:scale-95 active:shadow-none focus-visible:outline focus-visible:outline-black focus-visible:outline-4`} onClick={() => setPosition(item as 'first' | 'second')}>{item}</button>)}
                </div>
              </div>
              <div className='flex flex-1 flex-col gap-4'>
                <h3 className='text-lg md:text-2xl text-center'>Instrument</h3>
                <div className='flex gap-8 lg:gap-4 justify-center lg:justify-between'>
                  {instruments.map(item => <button type='button' key={instruments.indexOf(item)} aria-label={`Instrument: ${item}`} className={`${instrument === item ? 'bg-emerald-700 outline-4' : 'bg-gray-500 hover:bg-gray-600'} capitalize h-fit w-20 outline outline-transparent outline-2 py-2 rounded-sm shadow-equal-sm shadow-black text-slate-50 transition-all ease-in-out duration-150 active:scale-95 active:shadow-none focus-visible:outline focus-visible:outline-black focus-visible:outline-4`} onClick={() => setInstrument(item)}>{item}</button>)}
                </div>
              </div>
            </div>
          </div>}
          { allSelected && <div className='flex flex-col gap-4 items-center'>
            <h3 className='m-auto text-center text-lg md:text-2xl'>{`${note?.toUpperCase()} ${scale}`} scale - <span className='capitalize'>{position}</span> position - <span className='capitalize'>{instrument}</span></h3>
          </div>}
          {note && scale && instrument && position && <button id='continue_button' disabled={settings} className={`${allSelected? 'bg-red-700' : 'bg-emerald-700 outline-4'} h-fit w-28 m-auto outline outline-transparent outline-2 px-4 py-2 rounded-sm shadow-equal-sm shadow-black text-slate-50 transition-all ease-in-out duration-150 active:scale-95 active:shadow-none disabled:cursor-not-allowed disabled:opacity-60  disabled:scale-100 disabled:shadow-none focus-visible:outline focus-visible:outline-black focus-visible:outline-4`} onClick={()=>handleSelected()}>{allSelected ? 'Edit' : 'Continue'}</button>}
        </div>
        {allSelected && <Fretboard settings={settings} handleSettings={handleSettings} note={note} scale={scale} instrument={instrument} position={position} />}
      </main>
    </>
  )
}

export default Home;
