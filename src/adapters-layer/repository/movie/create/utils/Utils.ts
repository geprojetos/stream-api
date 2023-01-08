import { Stream } from "../../../../../enterprise-layer/domain";
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

  public isInValid(props: ICreateMovieProps) {
    const { movie } = props;

    if (this._isValue(movie)) {
      logger.error(`${Messages.movie().invalidData}`);
      return {
        statusCode: Status.badRequest(),
        message: Messages.movie().invalidData,
      };
    }
  }

  private _isValue(movie: Stream) {
    return (
      !movie.stream().title ||
      !movie.stream().category ||
      !movie.stream().description
    );
  }

  public isAlreadyExisting(props: ICreateMovieProps) {
    const { movie, contentFile } = props;
    const isAlready = this._isDuplicated({
      contentFile,
      movie,
    });

    if (isAlready?.length) {
      logger.warn(`${Messages.movie().alreadyExisting} -> ${isAlready[0].id}`);
      return {
        statusCode: Status.conflict(),
        message: Messages.movie().alreadyExisting,
        stream: movie?.stream(),
      };
    }
  }

  private _isDuplicated(props: ICreateMovieProps) {
    const { contentFile, movie } = props;

    return contentFile?.filter(
      (content) => content.title === movie?.stream().title
    );
  }

  public async isSuccess(props: ICreateMovieProps) {
    const { movie, contentFile } = props;
    const isDuplicated = this._isDuplicated({
      contentFile,
      movie,
    });

    if (!isDuplicated?.length) {
      contentFile?.push(movie.stream());
      logger.info(
        `${Messages.movie().saveInDataBase} => ${props.movie.stream().id}`
      );
      const response = await this._file.write(props?.contentFile || []);
      return {
        statusCode: response?.statusCode || Status.badRequest(),
        message: Messages.movie().saveInDataBase,
        stream: movie.stream(),
      };
    }
  }
}

export default Utils;
