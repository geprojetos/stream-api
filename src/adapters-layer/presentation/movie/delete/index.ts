import { DeleteMovieController } from "../../../controllers";
import { DeleteRepository } from "../../../repository";
import { DeleteMovieUseCase } from "../../../../application-layer/useCase/movie";

const deleteRepository = new DeleteRepository();
const deleteMovieUseCase = new DeleteMovieUseCase(deleteRepository);
const deleteMoviePresentation = new DeleteMovieController(deleteMovieUseCase);

export { deleteMoviePresentation };
