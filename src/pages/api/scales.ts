import { Request, Response } from 'express';
import {mayor_scales, minor_scales } from '../../constants/scales';
import { Notes, Note, Interval, FretboardQuery, ActiveNotes, FretY, FretX } from '../../types/types'

export default function handler(req: Request<{}, {}, {}, FretboardQuery>, res: Response): void {
  let activeNotes: ActiveNotes | {} = {};
  const data = req.query;
  const {note, scale, instrument, position}: FretboardQuery = data;
  let selectedScale: Notes[] | undefined;

    if (note && instrument && scale && position && mayor_scales && minor_scales) {
      if (scale === 'major') {
        selectedScale = mayor_scales?.[instrument]?.[note]?.position[position].notes;
      } else {
        selectedScale = minor_scales?.[instrument]?.[note]?.position[position].notes;
      }
    }

  if (Array.isArray(selectedScale)) {
    let positions: [FretX, FretY][] = [];
    let intervals: [Interval, Note][] = [];
    let sounds: string[] = [];
    selectedScale.map(async (note) => {
      const fret: [FretX, FretY] = note.fret_position;
      const fretNote: [Interval, Note] = note.interval;
      positions.push(fret);
      intervals.push(fretNote);
    });
    activeNotes = {positions, intervals, sounds};
  }

  res.status(200).json(activeNotes);
}