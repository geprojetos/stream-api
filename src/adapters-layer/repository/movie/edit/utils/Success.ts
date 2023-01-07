import { IEditMovieResponse } from "../../../../../application-layer/useCase/movie";
import File from "../../../../utils/file";
import Messages from "../../../../utils/messages";
import Status from "../../../../utils/status";
import { IStream } from "../../../../../enterprise-layer/domain";
import Utils from "./Utils";
import { logger } from "../../../../utils/logger";

class Success {
  private _file: File;

  constructor(file: File) {
    this._file = file;
  }

  public async success(movie: IStream): Promise<IEditMovieResponse> {
    const { id } = movie;
    const movies: IStream[] = await this._file.read();
    const listEdited: IStream[] = Utils.applyEdited({ movies, movie });
    this._file.write(listEdited);
    logger.info(`${Messages.movie().editSuccessfully}`);

    return {
      message: Messages.movie().editSuccessfully,
      statusCode: Status.created(),
      id,
    };
  }
}

export default Success;
