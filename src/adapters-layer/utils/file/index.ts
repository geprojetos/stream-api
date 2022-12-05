import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { IStream } from "../../../enterprise-layer/domain";
import { logger } from "../logger";
import Status from "../status";

class File {
  private _path?: string;
  private _isDataBaseTest?: boolean;
  static instance: File | undefined;

  constructor(isDataBaseTest?: boolean) {
    this._isDataBaseTest = isDataBaseTest;
    this._selectDataBase();
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

  async read() {
    try {
      if (this._path) {
        const fileContent = await readFileSync(this._path, {
          encoding: "utf8",
        });
        return JSON.parse(fileContent.toString());
      }
    } catch (error: unknown) {
      logger.error(`error readFileSync, ${error}`);
    }
  }

  async write(stream: IStream[]) {
    try {
      if (this._path) {
        await writeFileSync(this._path, JSON.stringify(stream));
        return {
          statusCode: Status.created(),
        };
      }
    } catch (error) {
      logger.error(`error writeFileSync, ${error}`);
      return {
        statusCode: Status.badRequest(),
      };
    }
  }

  async delete() {
    try {
      if (this._path) {
        await writeFileSync(this._path, "[]");
        return {
          statusCode: Status.ok(),
        };
      }
    } catch (error) {
      logger.error(`error delete writeFileSync, ${error}`);
      return {
        statusCode: Status.badRequest(),
      };
    }
  }

  public static getInstance(isDataBaseTest?: boolean) {
    if (this.instance) {
      return this.instance;
    }

    this.instance = new File(isDataBaseTest);
    return this.instance;
  }
}

export default File;
