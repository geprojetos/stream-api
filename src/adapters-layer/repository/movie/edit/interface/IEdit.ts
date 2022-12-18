import { IListMovieResponse } from "../../../../../application-layer/useCase/movie/list/IList";
import { IStream } from "../../../../../enterprise-layer/domain";

interface IEdit {
  edit: (movie: IStream) => Promise<IListMovieResponse>;
}

export { IEdit };
