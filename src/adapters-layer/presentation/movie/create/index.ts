import { CreateMovieController } from "../../../controllers";
import { MovieRepository } from "../../../repository";
import { CreateMovieUseCase } from "../../../../application-layer/useCase/movie";

const movieRepository = new MovieRepository();
const createMovieUseCase = new CreateMovieUseCase(movieRepository);
const createMoviePresentation = new CreateMovieController(createMovieUseCase);

export { createMoviePresentation };
