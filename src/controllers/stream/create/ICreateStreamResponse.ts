import { IStream } from "../../../domain";

interface ICreateStreamResponse {
  statusCode: number;
  message: string;
  stream?: IStream;
}

export { ICreateStreamResponse };
