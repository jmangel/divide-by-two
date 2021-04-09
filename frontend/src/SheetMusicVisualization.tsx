import React from 'react';
import SheetMusic from '@slnsw/react-sheet-music';
import { countSharpsAndFlats } from './ChordMapper';
import { ChordRowObject } from './ChordRow';
import { MeasureInfo } from './App';

const SheetMusicVisualization: React.FC<{
  chordRowObjects: ChordRowObject[],
  measureInfo: MeasureInfo,
}> = ({
  chordRowObjects,
  measureInfo,
}) => {
  const { beatsPerMeasure, subdivisions } = measureInfo;

  const scales = chordRowObjects.map(({ selectedScaleObject }) => selectedScaleObject);
  const scalesNotes = scales.map(scale => scale?.scaleNotes || []);

  const globalHeaders = {
    X: 1,
    L: '1/4',
  }

  const repeatedHeaders = {
    M: `${beatsPerMeasure}/${subdivisions}`,
  }

  const globalHeadersArray = Object.entries(globalHeaders).map(([key, value]) => `${key}:${value}`);
  const repeatedHeadersArray = Object.entries(repeatedHeaders).map(([key, value]) => `${key}:${value}`);

  const notatedScales = scalesNotes.map((scaleNotes) => {
    const abcNotationScaleNotes = scaleNotes.map((scaleNote) => {
      const sharpsAndFlats = countSharpsAndFlats(scaleNote);
      const sharpsAndFlatsNotation = sharpsAndFlats > 0 ? '^'.repeat(sharpsAndFlats) : '_'.repeat(-sharpsAndFlats);
      return `${sharpsAndFlatsNotation}${scaleNote.replace(/b/g, '').replace(/#/g, '')}`;
    })

    return `${abcNotationScaleNotes.join(',')}|`;
  })

  const lines = notatedScales.map((notatedScale) => {
    return [...repeatedHeadersArray, notatedScale].join('\n')
  })

  const notation = [...globalHeadersArray, '%%stretchlast true', ...lines].join('\n')

  return (
    <SheetMusic
      notation={notation}
    />
  );
};

export default SheetMusicVisualization;
