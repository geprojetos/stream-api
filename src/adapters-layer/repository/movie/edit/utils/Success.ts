import { IEditMovieResponse } from "../../../../../application-layer/useCase/movie";
import File from "../../../../utils/file";
import Messages from "../../../../utils/messages";
import Status from "../../../../utils/status";
import { IStream } from "../../../../../enterprise-layer/domain";

class Success {
  private _file: File;

  constructor(file: File) {
    this._file = file;
  }

  public async success(movie: IStream): Promise<IEditMovieResponse> {
    const { id } = movie;
    const movies: IStream[] = await this._file.read();
    const isFind = movies?.find((movie) => movie.id === id);
    return {
      message: Messages.movie().listSuccessfully,
      statusCode: Status.ok(),
      movie: {
        title: "edit",
        category: "edit",
        description: "edit",
      },
    };
  }
}

export default Success;
