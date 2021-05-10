import React, { ChangeEvent, useEffect, useState, Dispatch, SetStateAction } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from 'reactstrap';
import {
  useQueryParams,
  ArrayParam,
  NumberParam,
  StringParam,
  withDefault,
} from 'use-query-params';
import { SketchPicker } from 'react-color';

const iRealReader = require('ireal-reader');

import './App.css';
import ChordCarousel from './ChordCarousel';
import parseChordString from './ChordParser';
import ChordRow, { ChordRowObject, scalesForChordRowObject } from './ChordRow'
import ColorWheel from './ColorWheel';
import { parseStringifiedChordRowObject, csvifyChordRowObjects, parseCsvifiedChordRowObjects } from './JsonCondenser'
import { MonochromaticPossibleRootScale, regenerateMonochromaticSchemes } from './ScaleColorer';
import { CHROMATIC_NOTES, PossibleRootScale } from './ChordMapper';

const createChordRowObject = (): ChordRowObject => {
  return { chordQuality: '' } as ChordRowObject;
}

interface Song {
  title: string;
  music: {
    measures: Array<Array<string>>;
  };
};
const createSongObject = (title: string | null): Song => {
  return { title } as Song;
}

const App: React.FC = () => {
  const [newChordRows, setNewChordRows] = useState(1);

  const [query, setQuery] = useQueryParams({
    a: withDefault(ArrayParam, undefined),
    c: withDefault(StringParam, csvifyChordRowObjects([createChordRowObject()])),
    t: withDefault(StringParam, ''),
    i: withDefault(NumberParam, -1)
  });
  const { a, c, t, i } = query;

  const startingChordRowObjects = (c) ? parseCsvifiedChordRowObjects(c) : (a as Array<string> || []).map(parseStringifiedChordRowObject);
  const [chordRowObjects, setChordRowObjects] = useState(startingChordRowObjects);
  if (a) setQuery({ a: undefined }, 'pushIn');
  if (c === '') setQuery({ c: csvifyChordRowObjects(chordRowObjects) }, 'pushIn');

  useEffect(() => {
    setQuery(
      { c: csvifyChordRowObjects(chordRowObjects) },
      'pushIn'
    )
  }, [chordRowObjects]);

  const [song, setSong] = useState(createSongObject(t));

  useEffect(() => {
    setQuery(
      { t: song.title },
      'pushIn'
    )

    document.title = `Song Scaler - ${song.title}`

  }, [song]);

  const [expandedRowIndex, setExpandedRowIndex] = useState(i);
  const toggle = (rowIndex: number) => {
    if (expandedRowIndex > -1) setExpandedRowIndex(-1);
    else setExpandedRowIndex(rowIndex);
  }

  useEffect(() => {
    setQuery(
      { i: expandedRowIndex },
      'pushIn'
    )
  }, [expandedRowIndex]);

  // const expandedChordRow = (expandedRowIndex > -1) && chordRowObjects[expandedRowIndex];

  // const [rgbValues, setRgbValues] = useState([50, 241, 255]);

  // const [redRgbValue, greenRgbValue, blueRgbValue] = rgbValues;

  // const [monochromaticSchemes, setMonochromaticSchemes] = useState<{ [key in MonochromaticPossibleRootScale]: string }[]>(
  //   regenerateMonochromaticSchemes(redRgbValue, greenRgbValue, blueRgbValue)
  // );

  // const [globalKeyNote, setGlobalKeyNote] = useState('');
  // const [globalKeyScale, setGlobalKeyScale] = useState('');

  const [numToDivide, setNumToDivide] = useState(2.0);

  // const applyGlobalKey = () => {
  //   if (globalKeyNote === '' || globalKeyScale === '') return;
  //   if (CHROMATIC_NOTES.find(chromaticNoteArray => chromaticNoteArray.includes(globalKeyNote)) == undefined) return;
  //   if (!((Object.keys(PossibleRootScale) as [keyof typeof PossibleRootScale]).find(key => PossibleRootScale[key] === globalKeyScale))) return;

  //   let newChordRows = chordRowObjects.slice();
  //   newChordRows.forEach((chordRowObject) => {
  //     if (!chordRowObject.selectedScale && !chordRowObject.selectedScaleRoot) {
  //       const matchingScale = scalesForChordRowObject(chordRowObject)
  //         .find(({ rootScale, rootScaleNote }) => rootScale === globalKeyScale && rootScaleNote === globalKeyNote);

  //       if (matchingScale != undefined) {
  //         chordRowObject.selectedScaleRoot = matchingScale.scaleNotes[0];
  //         chordRowObject.selectedScale = matchingScale.scaleName;
  //       }
  //     }

  //     return chordRowObject;
  //   });

  //   setChordRowObjects(newChordRows);
  // };

  // useEffect(() => {
  //   setMonochromaticSchemes(regenerateMonochromaticSchemes(redRgbValue, greenRgbValue, blueRgbValue));
  // }, rgbValues);

  // const handleRowChange = (rowIndex: number, newValue: string, key: keyof ChordRowObject): void => {
  //   let newChordRows = chordRowObjects.slice()
  //   newChordRows[rowIndex][key] = newValue
  //   setChordRowObjects(newChordRows)
  // }

  // const handleFiles = (event: ChangeEvent<HTMLInputElement>) => {
  //   Array.from((event.target as HTMLInputElement).files as FileList).forEach((file: File) => {
  //     var reader = new FileReader();
  //     reader.readAsText(file, "UTF-8");
  //     reader.onload = (evt: ProgressEvent<FileReader>) => {
  //       if (!evt.target?.result) {
  //         return alert('error reading file: no result')
  //       }
  //       const playlist = iRealReader(evt.target?.result);

  //       const newSong: Song = playlist.songs[0];
  //       if (newSong) {
  //         setSong(newSong);
  //         const newChordRows = newSong.music.measures.flatMap((measures) => {
  //           return measures.map((measure) => {
  //             const parsedChordString = parseChordString(measure);

  //             return {
  //               chordNote: parsedChordString[0],
  //               chordQuality: parsedChordString[1],
  //               bassNote: parsedChordString[2],
  //               selectedScale: '',
  //               selectedScaleRoot: '',
  //               availableTensions: '',
  //             }

  //           });
  //         })
  //         setChordRowObjects(newChordRows)
  //       } else alert('no song found');
  //     }
  //     reader.onerror = () => {
  //       alert('error reading file');
  //     }
  //   })
  // }

  const dividedNumber = (numToDivide / 2)

  const dividedNumbers: Array<string | number> = (((dividedNumber * 1000) % 10) > 0) ? [
    Math.ceil(100 * dividedNumber) / 100,
    Math.floor(100 * dividedNumber) / 100,
  ] : [
    dividedNumber
  ]

  return (
    <div className="App">
      <header className="App-header flex-row justify-content-between">
        {song.title &&
          <span className="ml-3">
            {song.title}
          </span>
        }
        <Button
          className="ml-auto mr-3"
          color="primary"
          onClick={() => {
            const el = document.createElement('textarea');
            el.value = window.location.href;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
        }}>Copy Share link to clipboard</Button>
      </header>
      <Input
        type="number"
        name="numToDivide"
        value={numToDivide}
        onChange={e => setNumToDivide(parseFloat(e.target.value))}
        className='w-25 mx-2'
        inline
      />
      {
        dividedNumbers.map((dividedNumber) => (
          <p>{dividedNumber}</p>
        ))
      }
      {/* {
        expandedChordRow ? (
          <ChordCarousel
            expandedRowIndex={expandedRowIndex}
            chordRowObjects={chordRowObjects}
            monochromaticSchemes={monochromaticSchemes}
            setExpandedRowIndex={setExpandedRowIndex}
            onRowChange={handleRowChange}
            toggle={toggle}
          />
        ) : (
        <Container fluid>
          <Row className='mx-auto py-2 my-2'>
            <Col className="border py-2 mx-5">
              <div className="custom-file">
                <Label className="custom-file-label" for="irealImportFile">Import song from iReal Pro</Label>
                <Input
                  type="file"
                  name="irealImportFile"
                  id="irealImportFile"
                  onChange={handleFiles}
                />
                <FormText color="muted" className="py-1">
                  Export the song from iReal Pro as HTML and upload here.
                </FormText>
              </div>
            </Col>
            <Col className="border py-2 mx-5">
              <Row>
                <Col>
                  <div>
                    <Label for="globalKeyNote">Root of global key</Label>
                    <Input
                      type="text"
                      name="globalKeyNote"
                      id="globalKeyNote"
                      onChange={(e) => setGlobalKeyNote(e.target.value)}
                    />
                  </div>
                </Col>
                <Col>
                  <Label for="globalKeyScale">Quality of global key</Label>
                  <Input
                    type="text"
                    name="globalKeyScale"
                    id="globalKeyScale"
                    onChange={(e) => setGlobalKeyScale(e.target.value)}
                  />
                </Col>
              </Row>
              <FormText color="muted" className="py-1">
                The key chosen here will apply to any unselected chords.
              </FormText>
              <Button
                className="ml-auto mr-3"
                color="primary"
                onClick={applyGlobalKey}>Apply</Button>
            </Col>
          </Row>
          {chordRowObjects.map((chordRowObject, rowIndex) => <ChordRow
            chordRowObject={chordRowObject}
            onRowExpand={ () => toggle(rowIndex) }
            onRowChange={(newValue: string, key: keyof ChordRowObject) => handleRowChange(rowIndex, newValue, key)}
            monochromaticSchemes={monochromaticSchemes}
          />)}
          <Row className='w-25 mx-auto border'>
            <Button onClick={() => {
              if (newChordRows < 0) {
                setChordRowObjects(chordRowObjects => chordRowObjects.slice(0,newChordRows))
              } else {
                const newChordRowsArray: Array<ChordRowObject> = [...Array(newChordRows)].map(() => createChordRowObject())
                setChordRowObjects(chordRowObjects => [...chordRowObjects, ...newChordRowsArray])
              }
            }}>Add</Button>
            <Input
              type="number"
              name="newChordRows"
              value={newChordRows}
              onChange={e => setNewChordRows(parseInt(e.target.value))}
              className='w-25 mx-2'
              inline
            />
            Row(s)
          </Row>
          <Row>
            <Col xs={2}>
              <SketchPicker
                width="100"
                className="m-0"
                color={ `rgb(${redRgbValue},${greenRgbValue},${blueRgbValue})` }
                onChangeComplete={(color, _) => setRgbValues([color.rgb.r, color.rgb.g, color.rgb.b])}
              />
            </Col>
            <ColorWheel monochromaticSchemes={monochromaticSchemes} />
          </Row>
        </Container>
        )
      } */}
    </div>
  );
}

export default App;
