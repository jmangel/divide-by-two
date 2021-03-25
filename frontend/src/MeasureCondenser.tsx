import { MeasureInfo } from "./App";

const CSV_DELIMITER = '.';
const CSV_DELIMITER_REGEX = new RegExp(`[${CSV_DELIMITER}|]`, 'g');

export const createMeasureInfo = (): MeasureInfo => {
  return { beatsPerMeasure: 4, subdivisions: 4, chordCount: 1 } as MeasureInfo;
}

const SORTED_MEASURE_INFO_KEYS = Object.keys(createMeasureInfo());

export const csvifyMeasureInfo = (measure: MeasureInfo): string => {
  const ordered: { [key: string]: number; } = {};
  Object.keys(measure).sort((a, b) => {
    return SORTED_MEASURE_INFO_KEYS.indexOf(a) - SORTED_MEASURE_INFO_KEYS.indexOf(b);
  }).forEach((key) => {
    ordered[key] = measure[key as keyof MeasureInfo];
  });

  const valuesArray = Object.values(ordered);
  const result = valuesArray.join(CSV_DELIMITER);

  return result;
}

export const csvifyMeasureInfos = (chordRowObjects: Array<MeasureInfo>): string => {
  const result = chordRowObjects.map((chordRowObject) => csvifyMeasureInfo(chordRowObject)).join('\n')

  return result;
}

export const parseCsvifiedMeasureInfos = (csvifiedObject: string): MeasureInfo[] => {
  const lines = csvifiedObject.split('\n');

  const headers = SORTED_MEASURE_INFO_KEYS;

  // backward compatibility
  if (lines.length === 1 && lines[0].split(CSV_DELIMITER_REGEX).length !== 3) {
    return mapMemoizedMeasuresToMeasureInfos(csvifiedObject.split('.').map((index: string) => parseInt(index)));
  }

  const result = lines.map((line) => {
    let measureInfo = {} as MeasureInfo;

    headers.forEach((header, i) => {
      const stringifiedValue = line.split(CSV_DELIMITER_REGEX)[i];
      measureInfo[header as keyof MeasureInfo] = parseInt(stringifiedValue);
    })


    return measureInfo;
  });

  return result;
}

// only needed for backward compatibility
const mapMemoizedMeasuresToMeasureInfos = (memoizedMeasures: number[]): MeasureInfo[] => {
  return memoizedMeasures.map((memoizedMeasure) => {
    if (memoizedMeasure < 10) return {
      chordCount: memoizedMeasure,
      beatsPerMeasure: 4,
      subdivisions: 4
    }; // backward compatibility
    const memoizedMeasureString = memoizedMeasure.toString();
    const chordCount = parseInt(memoizedMeasureString.slice(0, -2));
    const memoizedTimeSignature = memoizedMeasureString.slice(-2);
    const [beatsPerMeasure, subdivisions] = memoizedTimeSignature.startsWith('12') ? [12, 8] : [parseInt(memoizedTimeSignature[0]), parseInt(memoizedTimeSignature[1])];
    return {
      beatsPerMeasure,
      subdivisions,
      chordCount,
    };
  });
}
