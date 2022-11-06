import { readFile, writeFile } from "fs";
import { join } from "path";
import { IStream } from "../../domain";
import Messages from "../../utils/Messages";

class HelperDataBase {
  private _path = join(__dirname, "..", "..", "database", "stream.json");
  private _streamList: IStream[];

  constructor(streamList: IStream[]) {
    this._streamList = streamList;
  }

  _readStreamDataBase() {
    readFile(this._path, (error, data) => {
      if (error) {
        throw new Error(error.message);
      }
      this._streamList = JSON.parse(data?.toString() || "[]");
    });
  }

  _saveStreamDataBase(stream: IStream[]) {
    writeFile(this._path, JSON.stringify(stream), (error) => {
      if (error) {
        throw new Error(Messages.stream().errorSaveInDataBase);
      }
    });
  }
}

export default HelperDataBase;
