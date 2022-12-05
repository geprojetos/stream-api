import CreateMovieRepository from "./index";
import { IStream, Stream } from "../../../../enterprise-layer/domain";
import Status from "../../../utils/status";
import File from "../../../utils/file";

describe("MovieRepository", async () => {
  const movieTest: IStream = {
    title: "test",
    category: "test",
    description: "test",
  };
  const movieSecondTest: IStream = {
    title: "test2",
    category: "test2",
    description: "test2",
  };
  let createMovieRepository: CreateMovieRepository;
  let file: File;

  beforeAll(() => {
    createMovieRepository = new CreateMovieRepository(true);
    file = File.getInstance(true);
  });

  afterAll(() => {
    file.delete();
  });

  test("should be able create movie with status code 201", async () => {
    const result = await createMovieRepository.create(new Stream(movieTest));
    expect(result.statusCode).toBe(Status.created());
  });

  test("should be able create movie", async () => {
    const result = await createMovieRepository.create(
      new Stream(movieSecondTest)
    );
    delete result.stream?.id;
    expect(result.stream).toStrictEqual(movieSecondTest);
  });

  test("should be able not create movie with status 409", async () => {
    await createMovieRepository.create(new Stream(movieSecondTest));
    const result = await createMovieRepository.create(
      new Stream(movieSecondTest)
    );
    expect(result.statusCode).toBe(Status.conflict());
  });
});
