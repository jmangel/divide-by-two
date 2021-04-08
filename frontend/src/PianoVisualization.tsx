import React, { Fragment } from 'react';
import { ChordRowObject } from './ChordRow';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';
import './CustomPianoStyles.css'
import { CHROMATIC_NOTES, lowerChordToneIntervalInSemitones, lowerChordTones, toChromaticNote } from './ChordMapper';
import { GrTarget } from 'react-icons/gr';

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

const chordTones = (chordRowObject: ChordRowObject) => {
  const { chordNote, chordQuality, bassNote } = chordRowObject;

  const readableBassNote = bassNote.replace(/\//g, '');

  let chordTones = lowerChordTones(chordNote, chordQuality);
  if (readableBassNote) chordTones = [toReactPianoPitchIndex(readableBassNote), ...chordTones];

  return chordTones;
}

const chordTonePitchIndexes = (chordRowObject: ChordRowObject) => {
  return chordTones(chordRowObject).map(chordTone => REACT_PIANO_PITCH_INDEXES[chordTone]);
}

const isLeadingOrStandingTone = (currentChordPitchIndexes: number[], pitchIndex: number) => {
  return currentChordPitchIndexes.some((currentPitchIndex) => {
    const oneWayDistance = Math.abs(currentPitchIndex - pitchIndex);
    const minDistance = Math.min(oneWayDistance, 12 - oneWayDistance);
    return minDistance <= 1;
  })
}

const ChordPianoVisualization: React.FC<{
  chordRowObject: ChordRowObject,
  nextChord?: ChordRowObject,
}> = ({
  chordRowObject,
  nextChord,
}) => {
  const { selectedScaleObject, chordNote, chordQuality } = chordRowObject;
  const numOctaves = 2;

  const scaleNotes = selectedScaleObject?.scaleNotes;

  const firstNote = MidiNumbers.fromNote('c4');
  const lastNote = MidiNumbers.fromNote(`b${4 + numOctaves - 1}`);

  // customize indicators here
  const labeledNotes: string[] = scaleNotes || chordTones(chordRowObject);
  // TODO: include bass note as root, but what about widespread chords? 3 octaves?
  const activeNotes = lowerChordToneMidiNumbers(chordNote, chordQuality, lastNote);

  const currentChordPitchIndexes = chordTonePitchIndexes(chordRowObject);
  const nextChordPitchIndexes = nextChord ? chordTonePitchIndexes(nextChord) : [];
  const leadingOrStandingTonePitchIndexes = nextChordPitchIndexes.filter(nextPitchIndex => isLeadingOrStandingTone(currentChordPitchIndexes, nextPitchIndex))

  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: keyboardConfigForScaleNotes(labeledNotes, numOctaves),
  });

  interface NoteLabelProps {
    keyboardShortcut: string;
    midiNumber: number;
    isActive: boolean;
    isAccidental: boolean;
  }

  return (
    <Piano
      noteRange={{ first: firstNote, last: lastNote }}
      playNote={() => {}}
      stopNote={() => {}}
      className="pe-none"
      keyboardShortcuts={keyboardShortcuts}
      activeNotes={activeNotes}
      renderNoteLabel={({ keyboardShortcut, midiNumber, isActive, isAccidental }: NoteLabelProps) => {
        const pitchIndex = REACT_PIANO_PITCH_INDEXES[MidiNumbers.getAttributes(midiNumber).pitchName];
        const isTargetNote = leadingOrStandingTonePitchIndexes.includes(pitchIndex);

        const classNames = ['ReactPiano__NoteLabel']
        if (isActive) classNames.push('ReactPiano__NoteLabel--active');
        if (isAccidental) classNames.push('ReactPiano__NoteLabel--accidental');
        if (!isAccidental) classNames.push('ReactPiano__NoteLabel--natural');
        if (isTargetNote) classNames.push('bg-success', 'text-white');

        const className = classNames.join(' ');

        const elements = [];
        if (keyboardShortcut) elements.push(keyboardShortcut);
        else if (isTargetNote) elements.push(<GrTarget className="ReactPiano__NoteLabel w-100" />);

        return (elements.length > 0) && (
          <div
            className={className}
          >
            {elements}
          </div>
        );
      }}
    />
  );

}

export default ChordPianoVisualization;
