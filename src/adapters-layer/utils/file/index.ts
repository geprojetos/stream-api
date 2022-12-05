import { readFileSync, writeFileSync } from "fs";
import { IStream } from "../../../enterprise-layer/domain";
import { config, IConfig } from "../config";
import { logger } from "../logger";
import Status from "../status";

class File {
  private _path?: string;
  private _isConfig?: IConfig;
  static instance: File | undefined;

  constructor(config?: IConfig) {
    this._isConfig = config;
    this._selectDataBase();
  }

  private _selectDataBase() {
    if (this._isConfig) {
      this._path = this._isConfig.fullPathTest;
      return;
    }
    this._path = config.fullPath;
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

  public static getInstance(config?: IConfig) {
    if (this.instance) {
      return this.instance;
    }

    this.instance = new File(config);
    return this.instance;
  }
}

export default File;
