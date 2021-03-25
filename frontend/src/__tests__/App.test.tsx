import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import App, { beatIndexToMeasureIndex, beatIsOnNewMeasure, MeasureInfo } from '../App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  shallow(<App />);
});

describe('beatIndexToMeasureIndex', () => {
  it('plays 4/4 as 4/4', () => {
    const fourFourMeasures: MeasureInfo[] = [
      {
        beatsPerMeasure: 4,
        subdivisions: 4,
        chordCount: 1
      },
      {
        beatsPerMeasure: 4,
        subdivisions: 4,
        chordCount: 1
      },
    ];
    expect(beatIndexToMeasureIndex(fourFourMeasures, 0)).toEqual(0);
    expect(beatIndexToMeasureIndex(fourFourMeasures, 3)).toEqual(0);
    expect(beatIndexToMeasureIndex(fourFourMeasures, 4)).toEqual(1);
  })

  it('plays 2/2 as 4/4', () => {
    const twoTwoMeasures: MeasureInfo[] = [
      {
        beatsPerMeasure: 2,
        subdivisions: 2,
        chordCount: 1
      },
      {
        beatsPerMeasure: 2,
        subdivisions: 2,
        chordCount: 1
      },
    ];
    expect(beatIndexToMeasureIndex(twoTwoMeasures, 0)).toEqual(0);
    expect(beatIndexToMeasureIndex(twoTwoMeasures, 3)).toEqual(0);
    expect(beatIndexToMeasureIndex(twoTwoMeasures, 4)).toEqual(1);
  })
})

describe('beatIsOnNewMeasure', () => {
  it('plays 4/4 as 4/4', () => {
    const fourFourMeasures: MeasureInfo[] = [
      {
        beatsPerMeasure: 4,
        subdivisions: 4,
        chordCount: 1
      },
      {
        beatsPerMeasure: 4,
        subdivisions: 4,
        chordCount: 1
      },
    ];
    expect(beatIsOnNewMeasure(fourFourMeasures, 0)).toEqual(true);
    expect(beatIsOnNewMeasure(fourFourMeasures, 3)).toEqual(false);
    expect(beatIsOnNewMeasure(fourFourMeasures, 4)).toEqual(true);
  })

  it('plays 2/2 as 4/4', () => {
    const twoTwoMeasures: MeasureInfo[] = [
      {
        beatsPerMeasure: 2,
        subdivisions: 2,
        chordCount: 1
      },
      {
        beatsPerMeasure: 2,
        subdivisions: 2,
        chordCount: 1
      },
    ];
    expect(beatIsOnNewMeasure(twoTwoMeasures, 0)).toEqual(true);
    expect(beatIsOnNewMeasure(twoTwoMeasures, 3)).toEqual(false);
    expect(beatIsOnNewMeasure(twoTwoMeasures, 4)).toEqual(true);
  })
})