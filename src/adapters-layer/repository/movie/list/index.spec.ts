import InMemoryCreateRepository from "../../../../__test__/repository/movie/InMemoryCreateRepository";
import InMemoryListRepository from "../../../../__test__/repository/movie/InMemoryListRepository";
import { IStream, Stream } from "../../../../enterprise-layer/domain";
import Status from "../../../../utils/status";
import Messages from "../../../../utils/messages";

describe("MovieRepository", async () => {
  const movieTest: IStream = {
    title: "test",
    category: "test",
    description: "test",
  };
  let inMemoryCreateRepository: InMemoryCreateRepository;
  let inMemoryListRepository: InMemoryCreateRepository;

  beforeAll(() => {
    inMemoryCreateRepository = new InMemoryCreateRepository();
    inMemoryListRepository = new InMemoryListRepository();
  });

  test("should be able list movies with status code 201", async () => {
    await inMemoryCreateRepository.create(new Stream(movieTest));
    const result = await inMemoryListRepository.list();
    expect(result.statusCode).toBe(Status.ok());
  });
});
