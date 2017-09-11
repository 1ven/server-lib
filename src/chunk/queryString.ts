import * as qs from 'qs';
import { Chunk } from './';
import { Request } from "../request";
import { Response } from "../response";

export type Query = {
  query?: Record<string, string>
}

export type QueryChunk = (req: Request & Query) => Promise<Response>;

const urlToQueryString = (url: string) => {
  const match = url.match(/^.*\?(.*)$/);
  return match && match[1];
}

export default (chunk: QueryChunk) => (req: Request) =>
  chunk({
    ...req,
    query: qs.parse(urlToQueryString(req.uri))
  })