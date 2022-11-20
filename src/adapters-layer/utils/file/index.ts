import { readFile, writeFile } from "fs";
import { join } from "path";
import { IStream } from "../../../enterprise-layer/domain";
import { logger } from "../logger";
import Messages from "../messages";

class File {
  private _path?: string;
  private _isDataBaseTest?: boolean;
  private _streamList: IStream[];
  static instance: File | undefined;

  constructor(isDataBaseTest?: boolean) {
    this._streamList = [];
    this._isDataBaseTest = isDataBaseTest;
    this._initialize();
  }

  private _initialize() {
    this._selectDataBase();
    this._readMovieDataBase();
  }

  private _selectDataBase() {
    if (this._isDataBaseTest) {
      this._path = join(
        __dirname,
        "..",
        "..",
        "..",
        "frameworks-layer",
        "database",
        "movie-test.json"
      );
      return;
    }

    this._path = join(
      __dirname,
      "..",
      "..",
      "..",
      "frameworks-layer",
      "database",
      "movie.json"
    );
  }

  public static getInstance(isDataBaseTest?: boolean) {
    if (this.instance) {
      return this.instance;
    }

    this.instance = new File(isDataBaseTest);
    return this.instance;
  }

  private async _readMovieDataBase() {
    if (this._path) {
      readFile(this._path, (error, data) => {
        if (error) {
          logger.error(error.message);
          throw new Error(error.message);
        }
        if (data?.toString()) {
          this._streamList = JSON.parse(data.toString());
          return;
        }
        this._streamList = [];
      });
    }
  }

  public saveMovieDataBase(stream: IStream[]) {
    if (this._path) {
      writeFile(this._path, JSON.stringify(stream), (error) => {
        if (error) {
          throw new Error(Messages.movie().errorSaveInDataBase);
        }
      });
    }
  }

  public async clearAllMoviesDataBase() {
    if (this._path) {
      writeFile(this._path, JSON.stringify([""]), (error) => {
        if (error) {
          throw new Error(Messages.movie().errorSaveInDataBase);
        }
      });
    }
  }

  async getCopyMovies(): Promise<IStream[]> {
    await this._readMovieDataBase();
    return JSON.parse(JSON.stringify(this._streamList));
  }
}

export default File;
