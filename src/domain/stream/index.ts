import { randomUUID } from "crypto";

interface IStream {
  id?: string | undefined;
  title: string;
  category: string;
  description: string;
}

class Stream {
  private _id: string | undefined;
  private _title: string;
  private _category: string;
  private _description: string;

  constructor(stream: IStream) {
    this._generateRandomUUID();
    this._title = stream.title;
    this._category = stream.category;
    this._description = stream.description;
  }

  private _generateRandomUUID() {
    if (!this._id) {
      this._id = randomUUID();
    }
  }

  stream(): IStream {
    return {
      id: this._id,
      title: this._title,
      category: this._category,
      description: this._description,
    };
  }
}

export default Stream;
export { IStream };
