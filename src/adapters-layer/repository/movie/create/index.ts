import { Stream } from "../../../../enterprise-layer/domain";
import { ICreateMovieResponse } from "../../../../application-layer/useCase/movie";
import { ICreateMovieAdapter } from "./interface/ICreateMovieAdapter";
import { IConfig } from "../../../utils/config";
import Validate from "./utils/Validate";
import Error from "../../../utils/error";
import Messages from "../../../utils/messages";
import { logger } from "../../../utils/logger";

class CreateMovieRepository implements ICreateMovieAdapter {
  private _validate: Validate;

  constructor(config?: IConfig) {
    this._validate = new Validate(config);
  }

  public async create(movie: Stream): Promise<ICreateMovieResponse> {
    try {
      return await this._validate.isValidate(movie);
    } catch (error) {
      logger.error(`${Messages.movie().errorCreateMovie} => ${error}`);
      return Error.isError(error);
    }
  }
}

export default CreateMovieRepository;
