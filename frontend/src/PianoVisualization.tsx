import React, { useEffect } from 'react';
import { ChordRowObject } from './ChordRow';
import { Instrument } from "piano-chart";
import scaleToHexColor, { MonochromaticPossibleRootScale } from './ScaleColorer';

const ChordPianoVisualization: React.FC<{
  chordRowObject: ChordRowObject,
  monochromaticSchemes: { [key in MonochromaticPossibleRootScale]: string }[],
}> = ({
  chordRowObject,
  monochromaticSchemes,
}) => {
  const { chordNote, selectedScaleObject } = chordRowObject;

  const renderPiano = () => {
    const pianoContainer = document.getElementById('pianoContainer');
    if (!pianoContainer) return;

    pianoContainer.innerHTML = '';

    const selectedScalePianoOptions = selectedScaleObject ? {
      highlightedNotes: selectedScaleObject.scaleNotes,
      highlightColor: scaleToHexColor(selectedScaleObject.rootScale, selectedScaleObject.rootScaleNote, monochromaticSchemes),
    } : {}

    const piano = new Instrument(pianoContainer, {
      startOctave: 4,
      endOctave: 4,
      endNote: 'B',
      ...selectedScalePianoOptions
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
