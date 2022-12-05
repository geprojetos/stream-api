import { IStream, Stream } from "../../../../enterprise-layer/domain";
import { logger } from "../../../utils/logger";
import { ICreateMovieResponse } from "../../../../application-layer/useCase/movie";
import Messages from "../../../utils/messages";
import Status from "../../../utils/status";
import File from "../../../utils/file";
import { ICreateMovieAdapter } from "./ICreateMovieAdapter";
import { IConfig } from "../../../utils/config";

interface AlreadyMovie {
  movie: Stream;
  contentFile?: IStream[];
  isAlready?: IStream[];
}

class CreateMovieRepository implements ICreateMovieAdapter {
  private _file: File;
  private _status: ICreateMovieResponse;

  constructor(config?: IConfig) {
    this._file = File.getInstance(config);
    this._status = {
      message: "",
      statusCode: 0,
    };
  }

  public async create(movie: Stream): Promise<ICreateMovieResponse> {
    try {
      return this._validate(movie);
    } catch (error) {
      return this._error(error);
    }
  }

  private async _validate(movie: Stream) {
    const contentFile: IStream[] = await this._file.read();
    const isAlready = this._isAlready({ contentFile, movie });
    await this._isError({ isAlready, movie });
    await this._isSuccess({ isAlready, movie, contentFile });
    return this._status;
  }

  private _isAlready(alreadyMovie: AlreadyMovie) {
    return alreadyMovie.contentFile?.filter(
      (content) => content.title === alreadyMovie.movie?.stream().title
    );
  }

  private async _isError(alreadyMovie: AlreadyMovie) {
    if (alreadyMovie.isAlready?.length) {
      this._status = {
        statusCode: Status.conflict(),
        message: Messages.movie().alreadyExisting,
        stream: alreadyMovie.movie?.stream(),
      };
      logger.warn(
        `${Messages.movie().alreadyExisting} -> ${alreadyMovie.isAlready[0].id}`
      );
    }
  }

  private async _isSuccess(alreadyMovie: AlreadyMovie) {
    if (!alreadyMovie.isAlready?.length) {
      alreadyMovie.contentFile?.push(alreadyMovie.movie.stream());
      const response = await this._file.write(alreadyMovie?.contentFile || []);
      this._status = {
        statusCode: response?.statusCode || Status.badRequest(),
        message: Messages.movie().saveInDataBase,
        stream: alreadyMovie.movie.stream(),
      };
      logger.info(
        `${Messages.movie().saveInDataBase} => ${
          alreadyMovie.movie.stream().id
        }`
      );
    }
  }

  private _error(error: unknown) {
    logger.error(`error create repository movie => ${error}`);
    return {
      statusCode: Status.badRequest(),
      message: JSON.stringify(error),
    };
  }
}

export default CreateMovieRepository;
