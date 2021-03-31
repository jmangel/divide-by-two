import React, { useEffect } from 'react';
import { ChordRowObject } from './ChordRow';
import { Instrument } from "piano-chart";

const ChordPianoVisualization: React.FC<{
  chordRowObject: ChordRowObject,
}> = ({
  chordRowObject,
}) => {
  const { chordNote, selectedScaleObject } = chordRowObject;

  const renderPiano = () => {
    const pianoContainer = document.getElementById('pianoContainer');
    if (!pianoContainer) return;

    pianoContainer.innerHTML = '';

    const piano = new Instrument(pianoContainer, {
      startOctave: 4,
      endOctave: 4,
      endNote: 'B',
      highlightedNotes: selectedScaleObject?.scaleNotes || [],
    });
    piano.create();

    piano.keyDown(`${chordNote}4`);
  }

  useEffect(() => {
    renderPiano();
  });

  return (
    <div id="pianoContainer" />
  );
}

export default ChordPianoVisualization;
