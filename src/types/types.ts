
/*****************************************/
/* ACTIVE NOTES INTERFACE
/* Elements required to build selected scale.
/******************************************/
export interface ActiveNotes {
  positions: [FretX, FretY][];
  intervals: [Interval, Note][];
}

/*****************************************/
/* FRET POSITION TYPES
/* All possible note positions.
/******************************************/

export type FretX = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
export type FretY = 1 | 2 | 3 | 4 | 5 | 6;

/*****************************************/
/* FRETBOARD QUERY INTERFACE
/* Required elements to return selected scale.
/******************************************/
export interface FretboardQuery {
  note: Note;
  scale: 'major' | 'minor';
  instrument: 'bass' | 'guitar';
  position: 'first' | 'second';
}

/*****************************************/
/* FRETS TYPE
/* Top level array corresponds to fretboard,
/* second level array corresponds to individual fret on fretboard,
/* third level array corresponds to individual note on fret.
/******************************************/
export type Frets = [ Note | `${Note}/${Note}`, FretY ][][];

/*****************************************/
/* INTERVAL TYPE
/* All the possible intervals.
/******************************************/
export type Interval = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

/*****************************************/
/* NOTE TYPE
/* All the possible notes.
/******************************************/
export type Note = 'A♭' |'A' | 'A♯' | 'B♭' | 'B' | 'C' | 'C♯' | 'D♭' | 'D' | 'D♯' | 'E♭' | 'E' | 'F' | 'F♯' | 'G♭' | 'G' | 'G♯';

/*****************************************/
/* NOTES TYPE
/* All the possible notes, their corresponding interval and position on the fretboard.
/******************************************/
export type Notes = {
  interval: [Interval, Note],
  fret_position: [FretX, FretY]
}

/*****************************************/
/* POSITION TYPE
/* All the positions of a scale on the fretboard.
/******************************************/
type Position = {
  first: {
    notes: Notes[]
  },
  second: {
    notes: Notes[]
  }
}

/*****************************************/
/* SCALE TYPE
/* All the positions of a scale on the fretboard.
/******************************************/
type Scale = {
  [key in Note]?: {
    position: Position
  }
}

/*****************************************/
/* SCALES TYPE
/* All the scales and its positions on the fretboard per instrument.
/******************************************/
export type Scales = {
  bass: Scale,
  guitar: Scale
}

/*****************************************/
/* SOUND QUERY INTERFACE
/* Required elements to return sounds for selected scale.
/******************************************/
export interface SoundsQuery {
  notePositions: string;
  instrument: 'bass' | 'guitar';
}

/*****************************************/
/* SOUNDS INTERFACE
/* Required elements to return sounds for selected scale.
/******************************************/
export interface Sounds {
  soundUrls: string[];
}