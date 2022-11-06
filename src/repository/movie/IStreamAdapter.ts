import Stream from "../../domain/stream";
import { ICreateMovieResponse } from "../../useCase/movie";

interface IMovieAdapter {
  create: (stream: Stream) => Promise<ICreateMovieResponse>;
}

export { IMovieAdapter };
