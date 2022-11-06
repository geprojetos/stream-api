import Stream from "../../../enterprise-layer/domain/stream";
import { ICreateMovieResponse } from "../../../application-layer/useCase/movie";

interface IMovieAdapter {
  create: (stream: Stream) => Promise<ICreateMovieResponse>;
}

export { IMovieAdapter };
