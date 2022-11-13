import { Stream, IStream } from "../../../../enterprise-layer/domain";
import { CreateMovieRepository } from "../../../../adapters-layer/repository";
import { ICreateMovie, ICreateMovieResponse } from "./ICreate";

class CreateMovieUseCase implements ICreateMovie {
  private _createMovieRepository: CreateMovieRepository;

  constructor(movieRepository: CreateMovieRepository) {
    this._createMovieRepository = movieRepository;
  }

  async create(stream: IStream): Promise<ICreateMovieResponse> {
    const result = await this._createMovieRepository.create(new Stream(stream));
    return result;
  }
}

export default CreateMovieUseCase;
