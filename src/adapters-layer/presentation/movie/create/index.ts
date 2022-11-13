import { CreateMovieController } from "../../../controllers";
import { CreateMovieRepository } from "../../../repository";
import { CreateMovieUseCase } from "../../../../application-layer/useCase/movie";

const createMovieRepository = new CreateMovieRepository();
const createMovieUseCase = new CreateMovieUseCase(createMovieRepository);
const createMoviePresentation = new CreateMovieController(createMovieUseCase);

export { createMoviePresentation };
