import { MeasureInfo } from '../App';
import { csvifyMeasureInfo, csvifyMeasureInfos } from '../MeasureCondenser';

describe('csvifyMeasureInfo', () => {
  it('shortens each key of MeasureInfo', () => {
    const measureInfo: MeasureInfo = {
      beatsPerMeasure: 4,
      subdivisions: 4,
      chordCount: 2,
    }

    const expectedCsv = '4.4.2'

    expect(csvifyMeasureInfo(measureInfo)).toEqual(expectedCsv);
  })

  it('sorts keys correctly', () => {
    const measureInfo: MeasureInfo = {
      beatsPerMeasure: 4,
      subdivisions: 4,
      chordCount: 2,
    }

    const expectedCsv = '4.4.2'

    expect(csvifyMeasureInfo(measureInfo)).toEqual(expectedCsv);
  })
})

describe('csvifyChordRowObjects', () => {
  it('csvifies all chordRowObjects', () => {
    const chordRowObjects: MeasureInfo[] = [
      {
        beatsPerMeasure: 4,
        subdivisions: 4,
        chordCount: 2,
      },
      {
        beatsPerMeasure: 3,
        subdivisions: 8,
        chordCount: 1,
      },
    ]

    let expectedCsv = `4.4.2
    3.8.1`.replace(/\n  +/g, '\n');

    expect(csvifyMeasureInfos(chordRowObjects)).toEqual(expectedCsv);
  })
})