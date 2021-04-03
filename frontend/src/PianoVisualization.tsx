import React from 'react';
import { ChordRowObject } from './ChordRow';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';
import './CustomPianoStyles.css'
import { CHROMATIC_NOTES, toChromaticNote } from './ChordMapper';

const REACT_PIANO_PITCH_INDEXES: Record<string, any> = {
  'C': 0,
  'C#': 1,
  'Db': 1,
  'D': 2,
  'D#': 3,
  'Eb': 3,
  'E': 4,
  'F': 5,
  'F#': 6,
  'Gb': 6,
  'G': 7,
  'G#': 8,
  'Ab': 8,
  'A': 9,
  'A#': 10,
  'Bb': 10,
  'B': 11,
};

const toReactPianoPitchIndex = (note: string): string => {
 return (REACT_PIANO_PITCH_INDEXES[note]) ? note : toChromaticNote(note);
}
interface KeyboardConfigEntry {
  natural: string;
  flat: string;
  sharp: string;
}

const baseKeyboardConfig: KeyboardConfigEntry[] = [
  { natural: 'c', flat: 'cb', sharp: 'c#' },
  { natural: 'd', flat: 'db', sharp: 'd#' },
  { natural: 'e', flat: 'eb', sharp: 'e#' },
  { natural: 'f', flat: 'fb', sharp: 'f#' },
  { natural: 'g', flat: 'gb', sharp: 'g#' },
  { natural: 'a', flat: 'ab', sharp: 'a#' },
  { natural: 'b', flat: 'bb', sharp: 'b#' },
]

const keyboardConfigForScaleNotes = (scaleNotes: string[]): KeyboardConfigEntry[] => {
  const enharmonicScaleNotes: Record<string, string> = {};

  scaleNotes.forEach((value) => {
    CHROMATIC_NOTES.find(enharmonicNotes =>
      enharmonicNotes.includes(value)
    )?.forEach((chromaticNote) =>
      enharmonicScaleNotes[chromaticNote.toLowerCase()] = value.toLowerCase()
    );
  })

  return baseKeyboardConfig.map((entry) => {
    const entryClone: KeyboardConfigEntry = Object.assign({}, entry);
    Object.entries(entry).forEach((keyEntry) => {
      const key = keyEntry[0] as keyof KeyboardConfigEntry;
      const value = keyEntry[1] as string;

      entryClone[key] = enharmonicScaleNotes[value] || ''
    })
    return entryClone;
  })
}

const ChordPianoVisualization: React.FC<{
  chordRowObject: ChordRowObject,
}> = ({
  chordRowObject,
}) => {
  const { selectedScaleObject } = chordRowObject;

  const scaleNotes = selectedScaleObject?.scaleNotes || [];
  const lowerChordTones = [
    scaleNotes[0],
    scaleNotes[2],
    scaleNotes[4],
    scaleNotes[6] || scaleNotes[scaleNotes.length - 1],
  ].filter((element) => !!element) as string[];

  const firstNote = MidiNumbers.fromNote('c4');
  const lastNote = MidiNumbers.fromNote('b4');

  // customize indicators here
  const pressedNotes: string[] = lowerChordTones;
  const labeledNotes: string[] = scaleNotes;

  const activeNotes = pressedNotes.map(scaleNote => MidiNumbers.fromNote(`${toReactPianoPitchIndex(scaleNote)}4`));

  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: keyboardConfigForScaleNotes(labeledNotes),
  });

  return (
    <Piano
      noteRange={{ first: firstNote, last: lastNote }}
      playNote={() => {}}
      stopNote={() => {}}
      keyboardShortcuts={keyboardShortcuts}
      activeNotes={activeNotes}
    />
  );

}

export default ChordPianoVisualization;
