import { IStream, Stream } from "../../../../enterprise-layer/domain";
import { logger } from "../../../../utils/logger";
import { ICreateMovieResponse } from "../../../../application-layer/useCase/movie";
import Messages from "../../../../utils/messages";
import Status from "../../../../utils/status";
import File from "../../../../utils/file";
import { IListMovieAdapter } from "./IListMovieAdapter";
import { IListMovieResponse } from "../../../../application-layer/useCase/movie/list/IList";

class ListRepository implements IListMovieAdapter {
  private _movieList: IStream[];
  private _file: File;

  constructor() {
    this._movieList = [];
    this._file = new File(this._movieList);
  }

  copyListMovies() {
    return JSON.parse(JSON.stringify(this._file.getMovies()));
  }

  async list(): Promise<IListMovieResponse> {
    return {
      message: "",
      statusCode: 0,
      stream: await this.copyListMovies(),
    };
  }
}

export default ListRepository;
