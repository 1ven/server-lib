import { mergeDeepRight } from "ramda";

export type Response = {
  status: number;
  // body?: T,
  body?: any;
  headers?: Record<string, string>;
};

export { default as simple } from "./simple";
export { default as json } from "./json";
export { default as html } from "./html";
export { default as plain } from "./plain";
export { default as withHeaders } from "./withHeaders";
export { default as withBody } from "./withBody";
export { default as withStatus } from "./withStatus";
