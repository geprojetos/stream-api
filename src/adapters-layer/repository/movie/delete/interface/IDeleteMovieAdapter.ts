import { IDeleteMovieResponse } from "../../../../../application-layer/useCase/movie/delete/IDelete";

interface IDeleteMovieAdapter {
  delete: (id: string) => Promise<IDeleteMovieResponse>;
}

export { IDeleteMovieAdapter };
