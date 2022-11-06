import InMemoryMovieRepository from "../../../../__test__/repository/movie/InMemoryMovieRepository";
import { Stream } from "../../../../enterprise-layer/domain";
import Status from "../../../../utils/status";
import Messages from "../../../../utils/messages";

describe("MovieRepository", async () => {
  let inMemoryMovieRepository: InMemoryMovieRepository;

  beforeAll(() => {
    inMemoryMovieRepository = new InMemoryMovieRepository();
  });

  test("should be able create movie", async () => {
    const result = await inMemoryMovieRepository.create(
      new Stream({
        title: "test",
        category: "test",
        description: "test",
      })
    );
    expect(result.statusCode).toBe(200);
  });

  test("should be able error create movie equal title", async () => {
    await inMemoryMovieRepository.create(
      new Stream({
        title: "test",
        category: "test",
        description: "test",
      })
    );
    const result = await inMemoryMovieRepository.create(
      new Stream({
        title: "test",
        category: "test",
        description: "test",
      })
    );
    expect(result).toStrictEqual({
      statusCode: Status.code().conflict,
      message: Messages.movie().alreadyExisting,
    });
  });
});
