import File from "../../../../utils/file";
import Messages from "../../../../utils/messages";
import Status from "../../../../utils/status";

class Success {
  private _file: File;

  constructor(file: File) {
    this._file = file;
  }

  public async success() {
    const result = await this._file.read();
    return {
      message: Messages.movie().listSuccessfully,
      statusCode: Status.ok(),
      movies: result || [],
    };
  }
}

export default Success;
