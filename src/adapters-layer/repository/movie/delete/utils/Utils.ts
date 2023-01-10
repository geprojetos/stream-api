import { IDeleteMovieResponse } from "../../../../../application-layer/useCase/movie";
import File from "../../../../utils/file";
import { logger } from "../../../../utils/logger";
import Messages from "../../../../utils/messages";
import Status from "../../../../utils/status";

class Utils {
  private _file: File;

  constructor(file: File) {
    this._file = file;
  }

  public async isNotFind(id: string) {
    const isNotFind = await this._file.findById(id);
    if (!id || !isNotFind.length) {
      logger.error(`${Messages.movie().isNotFindMovieForDelete}, ${id}`);
      return {
        statusCode: Status.badRequest(),
        message: Messages.movie().isNotFindMovieForDelete,
        id,
      };
    }
  }

  public async isSuccess(id: string): Promise<IDeleteMovieResponse> {
    const response = await this._file.deleteById(id);
    if (response?.statusCode === 200) {
      return {
        message: Messages.movie().deleteSuccessfully,
        statusCode: Status.ok(),
        id,
      };
    }

    logger.error(`${Messages.movie().deleteError}, ${id}`);
    return {
      message: Messages.movie().deleteError,
      statusCode: Status.badRequest(),
    };
  }
}

export default Utils;
