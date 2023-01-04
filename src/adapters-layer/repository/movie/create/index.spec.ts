import CreateMovieRepository from "./index";
import { IStream, Stream } from "../../../../enterprise-layer/domain";
import Status from "../../../utils/status";
import File from "../../../utils/file";
import { config } from "../../../utils/config";

describe("CreateMovieRepository", async () => {
  const movieTest: IStream = {
    title: "testCreateMovie",
    category: "testCreateMovie",
    description: "testCreateMovie",
  };
  const movieSecondTest: IStream = {
    title: "testCreateMovie2",
    category: "testCreateMovie2",
    description: "testCreateMovie2",
  };
  const movieThirdTest: IStream = {
    title: "",
    category: "",
    description: "",
  };
  let createMovieRepository: CreateMovieRepository;
  let file: File;

  beforeAll(() => {
    createMovieRepository = new CreateMovieRepository(config);
    file = File.getInstance(config);
  });

  afterAll(async () => {
    await file.delete();
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
    setTimeout(() => {
      expect(result.statusCode).toBe(Status.conflict());
    }, 100);
  });

  test("should be able not create movie with status 400", async () => {
    const result = await createMovieRepository.create(
      new Stream(movieThirdTest)
    );
    expect(result.statusCode).toBe(Status.badRequest());
  });
});
