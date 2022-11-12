import Stream from "../../../../enterprise-layer/domain/stream";
import { IListMovieResponse } from "../../../../application-layer/useCase/movie/list/IList";

interface IListMovieAdapter {
  list: () => Promise<IListMovieResponse>;
}

export { IListMovieAdapter };
