import { curry } from 'ramda';
import { Request } from '../request';
import { Chunk } from './';

export default curry((fn: Function, chunk: Chunk) => {
  fn();
  return (req: Request) => chunk(req);
})