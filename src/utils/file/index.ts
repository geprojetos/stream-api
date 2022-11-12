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

  constructor(streamList: IStream[]) {
    this._streamList = streamList;
    this._readMovieDataBase();
  }

  _readMovieDataBase() {
    readFile(this._path, (error, data) => {
      if (error) {
        throw new Error(error.message);
      }
      this._streamList = JSON.parse(data?.toString() || "[]");
    });
  }

  _saveMovieDataBase(stream: IStream[]) {
    writeFile(this._path, JSON.stringify(stream), (error) => {
      if (error) {
        throw new Error(Messages.movie().errorSaveInDataBase);
      }
    });
  }

  getMovies(): IStream[] {
    return this._streamList;
  }
}

export default File;
