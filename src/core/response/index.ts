import { is, path, isNil, keys, reduce } from "ramda";
import http = require("http");
import raw from "./raw";
import json from "./json";
import xml from "./xml";
import { Response } from "../../response";

export const toResponseString = (res: Response): string =>
  makeStatusLine(res.status) +
  makeHeaders(res.headers) +
  makeBody(res.body, res.headers);

const makeStatusLine = (status: number): string =>
  `HTTP/1.1 ${status} ${http.STATUS_CODES[status]}`;

const makeHeaders = (headers?): string =>
  isNil(headers)
    ? ""
    : reduce(
        (acc: string, key: string) => acc + `\n${key}: ${headers[key]}`,
        "",
        keys(headers)
      );

const makeBody = (data?: any, headers?): string => {
  const contentType: any = path(["Content-Type"], headers);
  const format = (s: string) => `\n\n${s}`;

  if (!data) {
    return "";
  }

  if (contentType === "application/json") {
    return format(json(data));
  }

  if (contentType === "application/xml") {
    return format(xml(data));
  }

  return format(raw(data));
};
