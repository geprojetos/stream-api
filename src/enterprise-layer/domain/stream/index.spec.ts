import Stream from ".";

describe("Streams", () => {
  test("should be able create random id", () => {
    const stream = new Stream({
      title: "test",
      category: "test",
      description: "test",
    });
    expect(stream).toHaveProperty("_id");
  });
});
