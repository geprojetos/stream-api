import { logger } from "../../../utils/logger";
import Messages from "../../../utils/messages";
import Status from "../../../utils/status";

class Error {
  static error(error: unknown) {
    logger.error(`${Messages.movie().errorCreateMovie} => ${error}`);
    return {
      statusCode: Status.badRequest(),
      message: JSON.stringify(error),
    };
  }
}

export default Error;
