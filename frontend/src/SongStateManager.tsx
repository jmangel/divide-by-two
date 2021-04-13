import { parse, ParsedQuery, stringify } from "query-string";
import { ArrayParam, DecodedValueMap, decodeQueryParams, encodeQueryParams, NumberParam, StringParam } from "serialize-query-params";
import { MeasureInfo, Song } from "./App";
import { ChordRowObject } from "./ChordRow";
import { openDb } from "./indexedDb";
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
  sst: StringParam,
};


export const stringifyUrlSongStateObject = (songStateObject: UrlSongStateObject | DecodedValueMap<typeof paramConfigMap>) => {
  const encodedStateQuery = encodeQueryParams(paramConfigMap, songStateObject);
  return stringify(encodedStateQuery);
}

export const songStateObjectToUrlSongStateObject = (object: SongStateObject): UrlSongStateObject => {
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

const songStoreName = 'songs';

export const savedSongTitleToDecodedQueryObject = async (savedSongTitle: string) => {
  const db = await openDb();

  const value = await db.get(songStoreName, savedSongTitle);

  return value ? decodeQueryParams(paramConfigMap, parse(value)) : null;
}

export const decodeStringifiedQuery = (stringifiedQuery: string) => {
  return decodeQueryParams(paramConfigMap, parse(stringifiedQuery))
}

export const decodeParsedQuery = (parsedQuery: ParsedQuery) => {
  return decodeQueryParams(paramConfigMap, parsedQuery);
}

export const stringifySongStateObject = (object: SongStateObject) => {
  const songStateObject = songStateObjectToUrlSongStateObject(object);
  return stringifyUrlSongStateObject(songStateObject);
}