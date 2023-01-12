import CreateMovieRepository from "../create";
import EditRepository from "./index";
import { IStream, Stream } from "../../../../enterprise-layer/domain";
import Status from "../../../utils/status";
import File from "../../../utils/file";
import { config } from "../../../utils/config";
import ListRepository from "../list";

describe("EditRepository", async () => {
  const movieFirstEditTest: IStream = {
    id: "testEditSuccess",
    title: "testEditSuccess",
    category: "testEditSuccess",
    description: "testEditSuccess",
  };
  const movieSecondEditTest: IStream = {
    id: "",
    title: "testEditErrorId",
    category: "testEditErrorId",
    description: "testEditErrorId",
  };
  const movieThirdEditTest: IStream = {
    id: "testEditErrorInformation",
    title: "",
    category: "",
    description: "",
  };
  const movieEditTest: IStream = {
    title: "movie edited",
    category: "movie edited",
    description: "movie edited",
  };
  let createMovieRepository: CreateMovieRepository;
  let editRepository: EditRepository;
  let listRepository: ListRepository;
  let file: File;

  beforeAll(async () => {
    createMovieRepository = new CreateMovieRepository(config);
    editRepository = new EditRepository(config);
    listRepository = new ListRepository(config);
    file = File.getInstance(config);
    await file.read();
  });

  afterAll(async () => {
    await file.delete();
  });

  test("should be able not edit [without id] movie with status code 400", async () => {
    const result = await editRepository.edit(movieSecondEditTest);
    expect(result.statusCode).toBe(Status.badRequest());
  });

  test("should be able not edit [without information] movie with status code 400", async () => {
    const result = await editRepository.edit(movieThirdEditTest);
    expect(result.statusCode).toBe(Status.badRequest());
  });

  test("should be able not edit [is not find] movie with status code 400", async () => {
    const result = await editRepository.edit(movieThirdEditTest);
    expect(result.statusCode).toBe(Status.badRequest());
  });

  test("should be able edit movie with status code 200", async () => {
    const create = await createMovieRepository.create(
      new Stream(movieFirstEditTest)
    );
    const createResult: IStream = {
      id: create.stream?.id || "",
      title: movieEditTest.title,
      category: movieEditTest.category,
      description: movieEditTest.description,
    };

    await editRepository.edit(createResult);
    const list = await listRepository.list();
    const result = list.movies?.find((movie) => movie.id === createResult.id);
    expect(result).toStrictEqual(createResult);
  });
});
