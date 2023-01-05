import { IStream } from "../../../../enterprise-layer/domain/stream";

interface IEditMovie {
  edit: (movie: IStream) => Promise<IEditMovieResponse>;
}

interface IEditMovieResponse {
  statusCode: number;
  message: string;
  id?: string;
}

export { IEditMovie, IEditMovieResponse };
