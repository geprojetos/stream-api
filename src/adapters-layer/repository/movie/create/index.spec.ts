import InMemoryCreateMovieRepository from "../../../../__test__/repository/movie/InMemoryCreateMovieRepository";
import { IStream, Stream } from "../../../../enterprise-layer/domain";
import Status from "../../../utils/status";
import Messages from "../../../utils/messages";

describe("MovieRepository", async () => {
  const movieTest: IStream = {
    title: "test",
    category: "test",
    description: "test",
  };
  let inMemoryCreateMovieRepository: InMemoryCreateMovieRepository;

  beforeAll(() => {
    inMemoryCreateMovieRepository = new InMemoryCreateMovieRepository();
  });

  test("should be able create movie with status code 201", async () => {
    const result = await inMemoryCreateMovieRepository.create(
      new Stream(movieTest)
    );
    expect(result.statusCode).toBe(Status.created());
  });

  test("should be able error create movie with status code 409", async () => {
    await inMemoryCreateMovieRepository.create(new Stream(movieTest));
    const result = await inMemoryCreateMovieRepository.create(
      new Stream(movieTest)
    );
    expect(result).toStrictEqual({
      statusCode: Status.conflict(),
      message: Messages.movie().alreadyExisting,
    });
  });
});
