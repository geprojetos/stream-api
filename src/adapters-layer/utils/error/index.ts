import Status from "../../utils/status";

class Error {
  static error(error: unknown) {
    return {
      statusCode: Status.badRequest(),
      message: JSON.stringify(error),
    };
  }
}

export default Error;
