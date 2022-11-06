import { CreateStreamController } from "../../../controllers";
import { StreamRepository } from "../../../repository";
import { CreateStreamUseCase } from "../../../useCase/stream";

const streamRepository = new StreamRepository();
const createStreamUseCase = new CreateStreamUseCase(streamRepository);
const createStreamPresentation = new CreateStreamController(
  createStreamUseCase
);

export { createStreamPresentation };
