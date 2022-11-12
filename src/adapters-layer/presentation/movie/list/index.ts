import { ListMovieController } from "../../../controllers";
import { ListMovieRepository } from "../../../repository";
import { ListMovieUseCase } from "../../../../application-layer/useCase/movie";

const listMovieRepository = new ListMovieRepository();
const listMovieUseCase = new ListMovieUseCase(listMovieRepository);
const listMoviePresentation = new ListMovieController(listMovieUseCase);

export { listMoviePresentation };
