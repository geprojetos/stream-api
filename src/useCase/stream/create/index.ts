import { ICreateStreamResponse } from "../../../controllers";
import { Stream, IStream } from "../../../domain";
import { StreamRepository } from "../../../repository";
import { ICreateStream } from "./ICreate";

class CreateStreamUseCase implements ICreateStream {
  private _streamRepository: StreamRepository;

  constructor(streamRepository: StreamRepository) {
    this._streamRepository = streamRepository;
  }

  async create(stream: IStream): Promise<ICreateStreamResponse> {
    const result = await this._streamRepository.create(new Stream(stream));
    return result;
  }
}

export default CreateStreamUseCase;
