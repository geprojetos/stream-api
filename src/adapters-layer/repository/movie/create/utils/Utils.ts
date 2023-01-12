import { IStream, Stream } from "../../../../../enterprise-layer/domain";
import File from "../../../../utils/file";
import { logger } from "../../../../utils/logger";
import Messages from "../../../../utils/messages";
import Status from "../../../../utils/status";
import { ICreateMovieProps } from "../interface/ICreateProps";

class Utils {
  private _file: File;

  constructor(file: File) {
    this._file = file;
  }

  public isInValid(movie: Stream) {
    if (this._isInvalidValue(movie)) {
      logger.error(`${Messages.movie().invalidData}`);
      return {
        statusCode: Status.badRequest(),
        message: Messages.movie().invalidData,
      };
    }
  }

  private _isInvalidValue(movie: Stream) {
    return (
      !movie.stream().title ||
      !movie.stream().category ||
      !movie.stream().description
    );
  }

  public async isAlreadyExisting(movie: Stream) {
    const movies: IStream[] = await this._file.read();
    const isDuplicated = this._isDuplicated({
      movies,
      movie,
    });

    if (isDuplicated?.length) {
      logger.warn(
        `${Messages.movie().alreadyExisting} -> ${isDuplicated[0].id}`
      );
      return {
        statusCode: Status.conflict(),
        message: Messages.movie().alreadyExisting,
        stream: movie?.stream(),
      };
    }
  }

  private _isDuplicated(props: ICreateMovieProps) {
    const { movies, movie } = props;
    return movies?.filter((content) => content.title === movie?.stream().title);
  }

  public async isSuccess(movie: Stream) {
    const response = await this._isApply(movie);
    logger.info(`${Messages.movie().saveInDataBase} => ${movie.stream().id}`);
    return {
      statusCode: response?.statusCode || Status.badRequest(),
      message: Messages.movie().saveInDataBase,
      stream: movie.stream(),
    };
  }

  private async _isApply(movie: Stream) {
    const movies: IStream[] = await this._file.read();
    movies?.push(movie.stream());
    return await this._file.write(movies || []);
  }
}

export default Utils;
