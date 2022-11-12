import { ListMovieRepository } from "../../../../adapters-layer/repository";
import { IListMovie, IListMovieResponse } from "./IList";

class ListMovieUseCase implements IListMovie {
  private _listMovieRepository: ListMovieRepository;

  constructor(movieRepository: ListMovieRepository) {
    this._listMovieRepository = movieRepository;
  }

  async list(): Promise<IListMovieResponse> {
    const result = await this._listMovieRepository.list();
    return result;
  }
}

export default ListMovieUseCase;
