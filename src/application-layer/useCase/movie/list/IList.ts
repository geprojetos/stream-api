import { IStream } from "../../../../enterprise-layer/domain/stream";

interface IListMovie {
  list: () => Promise<IListMovieResponse>;
}

interface IListMovieResponse {
  statusCode: number;
  message: string;
  movies?: IStream[];
}

export { IListMovie, IListMovieResponse };
