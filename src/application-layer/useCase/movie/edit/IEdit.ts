import { IStream } from "../../../../enterprise-layer/domain/stream";

interface IEditMovie {
  list: () => Promise<IEditMovieResponse>;
}

interface IEditMovieResponse {
  statusCode: number;
  message: string;
  movies?: IStream[];
}

export { IEditMovie, IEditMovieResponse };
