import { ValidateProps } from ".";
import { logger } from "../../../utils/logger";
import Messages from "../../../utils/messages";
import Status from "../../../utils/status";

class Utils {
  static isDuplicated(props: ValidateProps) {
    const { contentFile, movie } = props;

    return contentFile?.filter(
      (content) => content.title === movie?.stream().title
    );
  }

  static isAlreadyExisting(props: ValidateProps) {
    const { isAlready, movie } = props;

    if (isAlready?.length) {
      logger.warn(`${Messages.movie().alreadyExisting} -> ${isAlready[0].id}`);
      return {
        statusCode: Status.conflict(),
        message: Messages.movie().alreadyExisting,
        stream: movie?.stream(),
      };
    }
  }
}

export default Utils;
