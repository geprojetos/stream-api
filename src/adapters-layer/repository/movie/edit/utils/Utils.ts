import { IStream } from "../../../../../enterprise-layer/domain";
import Messages from "../../../../utils/messages";
import Status from "../../../../utils/status";

class Utils {
  static isInvalidId(movie: IStream) {
    if (!movie?.id) {
      return {
        statusCode: Status.badRequest(),
        message: Messages.movie().notIdToEdit,
      };
    }
  }

  static isValidData(movie: IStream) {
    return movie.title || movie.category || movie.description;
  }

  static isInValidData() {
    return {
      statusCode: Status.badRequest(),
      message: Messages.movie().notDataToEdit,
    };
  }
}

export default Utils;
