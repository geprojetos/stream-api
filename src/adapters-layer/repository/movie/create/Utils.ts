import { ValidateProps } from ".";
import { logger } from "../../../utils/logger";
import Messages from "../../../utils/messages";
import Status from "../../../utils/status";

class Utils {
  static isValid(props: ValidateProps) {
    const { movie } = props;

    if (
      !movie.stream().title ||
      !movie.stream().category ||
      !movie.stream().description
    ) {
      logger.error(`${Messages.movie().invalidData}`);
      return {
        statusCode: Status.badRequest(),
        message: Messages.movie().invalidData,
      };
    }
  }

  static isDuplicated(props: ValidateProps) {
    const { contentFile, movie } = props;

    return contentFile?.filter(
      (content) => content.title === movie?.stream().title
    );
  }

  static isAlreadyExisting(props: ValidateProps) {
    const { movie, contentFile } = props;
    const isAlready = this.isDuplicated({
      contentFile,
      movie,
    });

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
