interface ParsedChord {
  length?: number;
  note: string;
  quality?: string;
  bassNote?: string;
}

interface ParsedMeasure {
  chords: ParsedChord[];
};

const basicMeasureSplitter = String.raw ` ?L?Z|[\|\]\}]`;
const measureSplitterRegexWithXyQ = new RegExp(`(?<=XyQ(?!${basicMeasureSplitter})|${basicMeasureSplitter})`);

export const rawToMeasures = (raw: string): ParsedMeasure[] => {
  raw = raw.trim();

  const splitMeasures = raw.split(measureSplitterRegexWithXyQ).filter((measure) => measure !== '');

  const measures = splitMeasures.map((measureString) => {
    return {
      chords: [{
        note: measureString
      }]
    };
  });


  return measures;
}