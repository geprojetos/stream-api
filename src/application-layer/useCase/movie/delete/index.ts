import { DeleteRepository } from "../../../../adapters-layer/repository";
import { IDeleteMovie, IDeleteMovieResponse } from "./IDelete";

class DeleteMovieUseCase implements IDeleteMovie {
  private _deleteMovieRepository: DeleteRepository;

  constructor(movieRepository: DeleteRepository) {
    this._deleteMovieRepository = movieRepository;
  }

  async delete(id: string): Promise<IDeleteMovieResponse> {
    const result = await this._deleteMovieRepository.delete(id);
    return result;
  }
}

export default DeleteMovieUseCase;
