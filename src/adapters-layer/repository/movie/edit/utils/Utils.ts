import { IStream } from "../../../../../enterprise-layer/domain";
import File from "../../../../utils/file";
import { logger } from "../../../../utils/logger";
import Messages from "../../../../utils/messages";
import Status from "../../../../utils/status";
import { GetIndexProps } from "../interface/GetIndex";
import { MovieEditProps } from "../interface/MovieEdit";

class Utils {
  private _file: File;

  constructor(file: File) {
    this._file = file;
  }

  public isInvalidId(movie: IStream) {
    if (!movie?.id) {
      logger.warn(`${Messages.movie().idIsRequiredForEditing}`);
      return {
        statusCode: Status.badRequest(),
        message: Messages.movie().idIsRequiredForEditing,
      };
    }
  }

  public async isNotFind(props: MovieEditProps) {
    const { movie } = props;
    const { id } = movie;
    const isFindById = await this._file.findById(id || "");

    if (!isFindById.length) {
      logger.warn(`${Messages.movie().movieIsNotFind}`);
      return {
        statusCode: Status.badRequest(),
        message: Messages.movie().movieIsNotFind,
      };
    }
  }

  public async isSuccess(movie: IStream) {
    if (this._isValidData(movie)) {
      const { id } = movie;
      const movies: IStream[] = await this._file.read();
      const editedList: IStream[] = this._applyEdited({ movies, movie });
      this._file.write(editedList);
      logger.info(`${Messages.movie().editSuccessfully}`);

      return {
        message: Messages.movie().editSuccessfully,
        statusCode: Status.created(),
        id,
      };
    }
  }

  private _isValidData(movie: IStream) {
    return movie.title || movie.category || movie.description;
  }

  private _applyEdited(props: MovieEditProps) {
    const { movies, movie } = props;
    const { id } = movie;
    const index = this._getIndex({ movies, id });

    const newValue: IStream = {
      id: movies[index].id,
      title: movie.title || movies[index].title,
      category: movie.category || movies[index].category,
      description: movie.description || movies[index].description,
    };

    movies.splice(index, 1, newValue);
    return movies;
  }

  private _getIndex = (props: GetIndexProps) => {
    const { movies, id } = props;
    return movies?.findIndex((movie) => movie.id === id);
  };

  public isInValidData() {
    logger.warn(`${Messages.movie().notDataForEditing}`);
    return {
      statusCode: Status.badRequest(),
      message: Messages.movie().notDataForEditing,
    };
  }
}

export default Utils;
