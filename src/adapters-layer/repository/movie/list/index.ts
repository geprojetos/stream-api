import File from "../../../utils/file";
import { IListMovieAdapter } from "./IListMovieAdapter";
import { IListMovieResponse } from "../../../../application-layer/useCase/movie/list/IList";
import { IConfig } from "../../../utils/config";
import Success from "./Success";
import Error from "./Error";

class ListRepository implements IListMovieAdapter {
  private _file: File;
  private _success: Success;

  constructor(config?: IConfig) {
    this._file = File.getInstance(config);
    this._success = new Success(this._file);
  }

  async list(): Promise<IListMovieResponse> {
    try {
      return await this._success.success();
    } catch (error) {
      return Error.error(error);
    }
  }
}

export default ListRepository;
