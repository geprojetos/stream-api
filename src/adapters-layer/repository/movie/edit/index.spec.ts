import CreateMovieRepository from "../create";
import EditRepository from "./index";
import { IStream } from "../../../../enterprise-layer/domain";
import Status from "../../../utils/status";
import File from "../../../utils/file";
import { config } from "../../../utils/config";

describe("EditRepository", async () => {
  const movieTest: IStream = {
    id: "testEdit",
    title: "testEdit",
    category: "testEdit",
    description: "testEdit",
  };
  let createMovieRepository: CreateMovieRepository;
  let editRepository: EditRepository;
  let file: File;

  beforeAll(async () => {
    createMovieRepository = new CreateMovieRepository(config);
    editRepository = new EditRepository(config);
    file = File.getInstance(config);
    await file.read();
  });

  afterAll(async () => {
    await file.delete();
  });

  test("should be able edit movie with status code 200", async () => {
    const result = await editRepository.edit(movieTest);
    expect(result.statusCode).toBe(Status.ok());
  });
});
