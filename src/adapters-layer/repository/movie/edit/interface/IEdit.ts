import { IListMovieResponse } from "../../../../../application-layer/useCase/movie/list/IList";

interface IEdit {
  edit: () => Promise<IListMovieResponse>;
}

export { IEdit };
