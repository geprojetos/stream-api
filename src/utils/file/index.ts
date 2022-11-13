import { readFile, writeFile } from "fs";
import { join } from "path";
import { IStream } from "../../enterprise-layer/domain";
import Messages from "../messages";

class File {
  private _path = join(
    __dirname,
    "..",
    "..",
    "frameworks-layer",
    "database",
    "movie.json"
  );
  private _streamList: IStream[];
  static instance: File | undefined;

  constructor() {
    this._streamList = [];
    this._readMovieDataBase();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }

    this.instance = new File();
    return this.instance;
  }

  async _readMovieDataBase() {
    readFile(this._path, (error, data) => {
      if (error) {
        throw new Error(error.message);
      }
      if (data?.toString()) {
        this._streamList = JSON.parse(data.toString());
        return;
      }
      this._streamList = [];
    });
  }

  _saveMovieDataBase(stream: IStream[]) {
    writeFile(this._path, JSON.stringify(stream), (error) => {
      if (error) {
        throw new Error(Messages.movie().errorSaveInDataBase);
      }
    });
  }

  async getCopyMovies(): Promise<IStream[]> {
    await this._readMovieDataBase();
    return JSON.parse(JSON.stringify(this._streamList));
  }
}

export default File;
