import InMemoryListMovieRepository from "../../../../__test__/repository/movie/InMemoryListMovieRepository";
import { IStream, Stream } from "../../../../enterprise-layer/domain";
import Status from "../../../utils/status";

describe("InMemoryListMovieRepository", async () => {
  const movieTest: IStream = {
    title: "test",
    category: "test",
    description: "test",
  };
  let inMemoryListMovieRepository: InMemoryListMovieRepository;

  beforeAll(() => {
    inMemoryListMovieRepository = new InMemoryListMovieRepository();
  });

  test("should be able list movie with status code 200", async () => {
    const result = await inMemoryListMovieRepository.list();
    expect(result.statusCode).toBe(Status.ok());
  });
});
