import React from 'react';
import { ChordRowObject } from './ChordRow';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';
import './CustomPianoStyles.css'
import { CHROMATIC_NOTES, lowerChordToneIntervalInSemitones, lowerChordTones, toChromaticNote } from './ChordMapper';

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

const keyboardConfigForScaleNotes = (scaleNotes: string[], octaves: number): KeyboardConfigEntry[] => {
  const enharmonicScaleNotes: Record<string, string> = {};

  scaleNotes.forEach((value) => {
    CHROMATIC_NOTES.find(enharmonicNotes =>
      enharmonicNotes.includes(value)
    )?.forEach((chromaticNote) =>
      enharmonicScaleNotes[chromaticNote.toLowerCase()] = value.toLowerCase()
    );
  })

  const keyboardConfig = baseKeyboardConfig.map((entry) => {
    const entryClone: KeyboardConfigEntry = Object.assign({}, entry);
    Object.entries(entry).forEach((keyEntry) => {
      const key = keyEntry[0] as keyof KeyboardConfigEntry;
      const value = keyEntry[1] as string;

      entryClone[key] = enharmonicScaleNotes[value] || ''
    })
    return entryClone;
  });

  const result = [];

  for (let i = 0; i < octaves; i++) {
    result.push(...keyboardConfig);
  }

  return result;
}

const lowerChordToneMidiNumbers = (chordNote: string, chordQuality: string, upperBound: number): number[] => {
  const tonicMidiNumber = MidiNumbers.fromNote(`${toReactPianoPitchIndex(chordNote)}4`);
  const intervals = lowerChordToneIntervalInSemitones(chordQuality);
  return intervals.map((semitones) => {
    let scaleNoteMidiNumber = tonicMidiNumber + semitones;
    while (scaleNoteMidiNumber > upperBound) scaleNoteMidiNumber -= 12;
    return scaleNoteMidiNumber;
  })
}

const ChordPianoVisualization: React.FC<{
  chordRowObject: ChordRowObject,
}> = ({
  chordRowObject,
}) => {
  const { selectedScaleObject, chordNote, chordQuality, bassNote } = chordRowObject;
  const numOctaves = 2;

  const readableBassNote = bassNote.replace(/\//g, '');

  const scaleNotes = selectedScaleObject?.scaleNotes;
  let chordTones = lowerChordTones(chordNote, chordQuality);
  if (readableBassNote) chordTones = [toReactPianoPitchIndex(readableBassNote), ...chordTones];

  const firstNote = MidiNumbers.fromNote('c4');
  const lastNote = MidiNumbers.fromNote(`b${4 + numOctaves - 1}`);

  // customize indicators here
  const labeledNotes: string[] = scaleNotes || chordTones;
  // TODO: include bass note as root, but what about widespread chords? 3 octaves?
  const activeNotes = lowerChordToneMidiNumbers(chordNote, chordQuality, lastNote);

  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: keyboardConfigForScaleNotes(labeledNotes, numOctaves),
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
