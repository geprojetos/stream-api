import CreateMovieRepository from "./movie/create";
import { ICreateMovieAdapter } from "./movie/create/interface/ICreateMovieAdapter";
import ListMovieRepository from "./movie/list";
import { IListMovieAdapter } from "./movie/list/interface/IListMovieAdapter";
import EditRepository from "./movie/edit";

export {
  EditRepository,
  CreateMovieRepository,
  ICreateMovieAdapter,
  ListMovieRepository,
  IListMovieAdapter,
};
