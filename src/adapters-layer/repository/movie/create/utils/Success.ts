import { ValidateProps } from "..";
import File from "../../../../utils/file";
import { logger } from "../../../../utils/logger";
import Messages from "../../../../utils/messages";
import Status from "../../../../utils/status";
import Utils from "./Utils";

class Success {
  private _file: File;

  constructor(file: File) {
    this._file = file;
  }

  public async isSuccess(props: ValidateProps) {
    const { movie, contentFile } = props;
    const isAlready = Utils.isDuplicated({
      contentFile,
      movie,
    });

    if (!isAlready?.length) {
      contentFile?.push(movie.stream());
      logger.info(
        `${Messages.movie().saveInDataBase} => ${props.movie.stream().id}`
      );
      const response = await this._file.write(props?.contentFile || []);
      return {
        statusCode: response?.statusCode || Status.badRequest(),
        message: Messages.movie().saveInDataBase,
        stream: movie.stream(),
      };
    }
  }
}

export default Success;
