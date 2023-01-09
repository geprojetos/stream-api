import DeleteMovieRepository from ".";
import { config } from "../../../utils/config";
import File from "../../../utils/file";
import Status from "../../../utils/status";

describe("DeleteMovieRepository", async () => {
  let deleteMovieRepository: DeleteMovieRepository;
  let file: File;

  beforeAll(async () => {
    deleteMovieRepository = new DeleteMovieRepository(config);
    file = File.getInstance(config);
  });

  afterAll(async () => {
    await file.delete();
  });
  test("should be able delete movie with status 200", async () => {
    const result = deleteMovieRepository.delete("test");
    expect((await result).statusCode).toBe(Status.ok());
  });
});
