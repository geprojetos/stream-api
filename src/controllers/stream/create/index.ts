import { CreateStreamUseCase } from "../../../useCase/stream";
import { Request } from "../../../app";
import { ICreateStreamResponse } from "./ICreateStreamResponse";
import Messages from "../../../utils/Messages";
import Status from "../../../utils/Status";

class CreateStreamController {
  constructor(private _createStreamUseCase: CreateStreamUseCase) {}

  async execute(request: Request): Promise<ICreateStreamResponse> {
    const { title, category, description } = request.body;
    const result = await this._createStreamUseCase.create({
      title,
      category,
      description,
    });
    return {
      statusCode: Status.code().created,
      message: Messages.stream().createSuccessfully,
      stream: result.stream,
    };
  }
}

export default CreateStreamController;
