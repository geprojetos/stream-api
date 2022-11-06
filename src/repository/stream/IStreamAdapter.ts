import { ICreateStreamResponse } from "../../controllers";
import Stream from "../../domain/stream";

interface IStreamAdapter {
  create: (stream: Stream) => Promise<ICreateStreamResponse>;
}

export { IStreamAdapter };
