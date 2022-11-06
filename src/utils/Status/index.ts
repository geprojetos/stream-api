class Status {
  static code() {
    return {
      ok: 200,
      created: 201,
      badRequest: 400,
      conflict: 409,
    };
  }
}

export default Status;
