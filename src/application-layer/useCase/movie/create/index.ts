import { Stream, IStream } from "../../../../enterprise-layer/domain";
import { MovieRepository } from "../../../../adapters-layer/repository";
import { ICreateMovie, ICreateMovieResponse } from "./ICreate";

class CreateMovieUseCase implements ICreateMovie {
  private _movieRepository: MovieRepository;

  constructor(movieRepository: MovieRepository) {
    this._movieRepository = movieRepository;
  }

  async create(stream: IStream): Promise<ICreateMovieResponse> {
    const result = await this._movieRepository.create(new Stream(stream));
    return result;
  }
}

export default CreateMovieUseCase;
