import { IStream } from "../../../../enterprise-layer/domain/stream";

interface ICreateMovie {
  create: (stream: IStream) => void;
}

interface ICreateMovieResponse {
  statusCode: number;
  message: string;
  stream?: IStream;
}

export { ICreateMovie, ICreateMovieResponse };
