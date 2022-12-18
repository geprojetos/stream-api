import { EditMovieController } from "../../../controllers";
import { EditRepository } from "../../../repository";
import { EditMovieUseCase } from "../../../../application-layer/useCase/movie";

const editRepository = new EditRepository();
const editMovieUseCase = new EditMovieUseCase(editRepository);
const editMoviePresentation = new EditMovieController(editMovieUseCase);

export { editMoviePresentation };
