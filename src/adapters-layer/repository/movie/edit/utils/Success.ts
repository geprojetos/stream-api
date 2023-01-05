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

    const index = movies?.findIndex((movie) => movie.id === id);

    if (index === -1) {
      return {
        statusCode: Status.badRequest(),
        message: Messages.movie().notFind,
      };
    }

    const newValue: IStream = {
      id: movies[index].id,
      title: movie.title || movies[index].title,
      category: movie.category || movies[index].category,
      description: movie.description || movies[index].description,
    };

    movies.splice(index, 1, newValue);

    this._file.write(movies);

    return {
      message: Messages.movie().editSuccessfully,
      statusCode: Status.created(),
      id,
    };
  }
}

export default Success;
