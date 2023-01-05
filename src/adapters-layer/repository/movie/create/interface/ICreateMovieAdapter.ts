import Stream from "../../../../../enterprise-layer/domain/stream";
import { ICreateMovieResponse } from "../../../../../application-layer/useCase/movie";

interface ICreateMovieAdapter {
  create: (stream: Stream) => Promise<ICreateMovieResponse>;
}

export { ICreateMovieAdapter };
