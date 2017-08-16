export type Request = {
  uri: string;
  method: string;
  body?: any;
  headers?: Record<string, string>;
};
