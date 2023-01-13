import DeleteMovieRepository from ".";
import { IStream, Stream } from "../../../../enterprise-layer/domain";
import { config } from "../../../utils/config";
import File from "../../../utils/file";
import Status from "../../../utils/status";
import CreateMovieRepository from "../create";
import ListRepository from "../list";

describe("DeleteMovieRepository", async () => {
  let createMovieRepository: CreateMovieRepository;
  let deleteMovieRepository: DeleteMovieRepository;
  let listRepository: ListRepository;
  let file: File;

  const movieFirstDeleteTest: IStream = {
    id: "",
    title: "testDeleteSuccess",
    category: "testDeleteSuccess",
    description: "testDeleteSuccess",
  };

  beforeAll(async () => {
    createMovieRepository = new CreateMovieRepository(config);
    deleteMovieRepository = new DeleteMovieRepository(config);
    listRepository = new ListRepository(config);
    file = File.getInstance(config);
  });

  afterAll(async () => {
    await file.delete();
  });

  test("should be able not delete movie [is not find] status 404", async () => {
    const result = deleteMovieRepository.delete("");
    expect((await result).statusCode).toBe(Status.notFind());
  });

  test("should be able delete movie with status 200", async () => {
    const create = await createMovieRepository.create(
      new Stream(movieFirstDeleteTest)
    );
    const createResult = {
      id: create.stream?.id || "",
    };
    const list = await listRepository.list();
    const movieDelete = list.movies?.find(
      (movie) => movie.id === createResult.id
    );

    if (movieDelete?.id) {
      const result = await deleteMovieRepository.delete(movieDelete?.id);
      expect(result.statusCode).toBe(Status.ok());
    }
  });

  test("should be able delete movie clear list", async () => {
    const create = await createMovieRepository.create(
      new Stream(movieFirstDeleteTest)
    );
    const createResult = {
      id: create.stream?.id || "",
    };
    const list = await listRepository.list();
    const movieDelete = list.movies?.find(
      (movie) => movie.id === createResult.id
    );

    if (movieDelete?.id) {
      await deleteMovieRepository.delete(movieDelete.id);
      const result = await listRepository.list();
      expect(result.movies?.length).toBe(0);
    }
  });
});
