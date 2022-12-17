import CreateMovieRepository from "../create";
import ListRepository from "./index";
import { IStream, Stream } from "../../../../enterprise-layer/domain";
import Status from "../../../utils/status";
import File from "../../../utils/file";
import { config } from "../../../utils/config";

describe("ListRepository", async () => {
  const movieTest: IStream = {
    title: "testList",
    category: "testList",
    description: "testList",
  };
  let createMovieRepository: CreateMovieRepository;
  let listRepository: ListRepository;
  let file: File;

  beforeAll(async () => {
    createMovieRepository = new CreateMovieRepository(config);
    listRepository = new ListRepository(config);
    file = File.getInstance(config);
    await file.read();
  });

  afterAll(async () => {
    await file.delete();
  });

  test("should be able list movie with status code 200", async () => {
    const result = await listRepository.list();
    expect(result.statusCode).toBe(Status.ok());
  });

  test("should be able list movie with data", async () => {
    const { stream } = await createMovieRepository.create(
      new Stream(movieTest)
    );
    const { movies } = await listRepository.list();

    setTimeout(() => {
      const result = movies?.find((movie) => movie.id === stream?.id);
      expect(result).toStrictEqual(stream);
    }, 100);
  });
});
