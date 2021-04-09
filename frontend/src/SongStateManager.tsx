import { stringify } from "query-string";
import { ArrayParam, encodeQueryParams, NumberParam, StringParam } from "serialize-query-params";
import { MeasureInfo, Song } from "./App";
import { ChordRowObject } from "./ChordRow";
import { csvifyChordRowObjects } from "./JsonCondenser";
import { csvifyMeasureInfos } from "./MeasureCondenser";
import { TransposingKeys } from "./Steps/ChooseKey";

interface SongStateObject {
  chordRowObjects: ChordRowObject[];
  song: Song;
  expandedRowIndex: number;
  stepIndex: number;
  measures: MeasureInfo[];
  transposingKey: TransposingKeys;
  bpm: number;
}

export interface UrlSongStateObject {
  c: string;
  t: string;
  i: number;
  s: number;
  m: string;
  k: string;
  b: number;
  a?: string[];
}

export const paramConfigMap = {
  a: ArrayParam,
  c: StringParam,
  t: StringParam,
  i: NumberParam,
  s: NumberParam,
  m: StringParam,
  k: StringParam,
  b: NumberParam,
};


const stringifyUrlSongStateObject = (songStateObject: UrlSongStateObject) => {
  const encodedStateQuery = encodeQueryParams(paramConfigMap, songStateObject);
  return stringify(encodedStateQuery);
}

const songStateObjectToUrlSongStateObject = (object: SongStateObject): UrlSongStateObject => {
  const { measures, chordRowObjects, song, expandedRowIndex, stepIndex, transposingKey, bpm } = object;

  return {
    m: csvifyMeasureInfos(measures),
    c: csvifyChordRowObjects(chordRowObjects),
    t: song.title,
    i: expandedRowIndex,
    s: stepIndex,
    k: transposingKey,
    b: bpm,
  };
}

export const stringifySongStateObject = (object: SongStateObject) => {
  const songStateObject = songStateObjectToUrlSongStateObject(object);
  return stringifyUrlSongStateObject(songStateObject);
}