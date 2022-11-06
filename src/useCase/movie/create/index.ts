import { Stream, IStream } from "../../../domain";
import { MovieRepository } from "../../../repository";
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
