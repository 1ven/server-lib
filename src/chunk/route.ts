import * as UrlPattern from "url-pattern";
import { compose, replace, omit } from "ramda";
import { symbol } from "./";
import { Request } from "../request";
import { Response } from "../response";

export type RouteRequest = Request & Matched;

export type Matched = {
  params?: Record<string, string>;
  rest?: string;
};

export type RouteChunk = (req: RouteRequest) => Response;

export default (template: string, chunk: RouteChunk) => (req: RouteRequest) => {
  const matched = match(prettifyTemplate(template), req);

  if (matched) {
    return chunk({ ...req, ...matched });
  }

  throw symbol;
};

const prettifyTemplate = (t: string) => t.replace(/^\/?(.*?)\/?$/g, "/$1");

const match = (template: string, req: RouteRequest) => {
  const result = new UrlPattern(template).match(req.rest || req.uri);
  return result
    ? {
        rest: result._,
        params: { ...omit(["_"], result), ...req.params }
      }
    : void 0;
};
