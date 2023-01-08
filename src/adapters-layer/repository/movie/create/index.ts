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
  private _defaultResponse: ICreateMovieResponse;

  constructor(config?: IConfig) {
    this._validate = new Validate(config);
    this._defaultResponse = {
      message: "",
      statusCode: 0,
    };
  }

  public async create(movie: Stream): Promise<ICreateMovieResponse> {
    try {
      const response = await this._validate.isValidate(movie);
      if (response) return response;
      return this._defaultResponse;
    } catch (error) {
      logger.error(`${Messages.movie().errorCreateMovie} => ${error}`);
      return Error.error(error);
    }
  }
}

export default CreateMovieRepository;
