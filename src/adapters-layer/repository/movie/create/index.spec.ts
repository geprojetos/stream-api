import InMemoryCreateRepository from "../../../../__test__/repository/movie/InMemoryCreateRepository";
import { IStream, Stream } from "../../../../enterprise-layer/domain";
import Status from "../../../../utils/status";
import Messages from "../../../../utils/messages";

describe("MovieRepository", async () => {
  const movieTest: IStream = {
    title: "test",
    category: "test",
    description: "test",
  };
  let inMemoryMovieRepository: InMemoryCreateRepository;

  beforeAll(() => {
    inMemoryMovieRepository = new InMemoryCreateRepository();
  });

  test("should be able create movie with status code 201", async () => {
    const result = await inMemoryMovieRepository.create(new Stream(movieTest));
    expect(result.statusCode).toBe(Status.created());
  });

  test("should be able error create movie with status code 409", async () => {
    await inMemoryMovieRepository.create(new Stream(movieTest));
    const result = await inMemoryMovieRepository.create(new Stream(movieTest));
    expect(result).toStrictEqual({
      statusCode: Status.conflict(),
      message: Messages.movie().alreadyExisting,
    });
  });
});
