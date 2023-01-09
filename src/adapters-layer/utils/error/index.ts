import Status from "../../utils/status";

class Error {
  static isError(error: unknown) {
    return {
      statusCode: Status.badRequest(),
      message: JSON.stringify(error),
    };
  }
}

export default Error;
