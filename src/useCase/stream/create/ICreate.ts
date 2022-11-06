import { IStream } from "../../../domain/stream";

interface ICreateStream {
  create: (stream: IStream) => void;
}

export { ICreateStream };
