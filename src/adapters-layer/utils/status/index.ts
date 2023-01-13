class Status {
  static ok() {
    return 200;
  }

  static created() {
    return 201;
  }

  static badRequest() {
    return 400;
  }

  static notFind() {
    return 404;
  }

  static conflict() {
    return 409;
  }
}

export default Status;
