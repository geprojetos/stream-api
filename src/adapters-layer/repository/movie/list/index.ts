import { logger } from "../../../utils/logger";
import Messages from "../../../utils/messages";
import Status from "../../../utils/status";
import File from "../../../utils/file";
import { IListMovieAdapter } from "./IListMovieAdapter";
import { IListMovieResponse } from "../../../../application-layer/useCase/movie/list/IList";

class ListRepository implements IListMovieAdapter {
  private _file: File;

  constructor() {
    this._file = File.getInstance();
  }

  async list(): Promise<IListMovieResponse> {
    try {
      return await this._isSuccess();
    } catch (error) {
      return this._isError(error);
    }
  }

  private async _isSuccess() {
    const result = await this._file.getCopyMovies();
    logger.info(Messages.movie().listSuccessfully);
    return {
      message: Messages.movie().listSuccessfully,
      statusCode: Status.ok(),
      movies: result,
    };
  }

  private _isError(error: unknown) {
    logger.error(error);
    return {
      message: Messages.movie().movieListingError,
      statusCode: Status.badRequest(),
    };
  }
}

export default ListRepository;
