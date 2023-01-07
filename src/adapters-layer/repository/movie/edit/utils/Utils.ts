import { IStream } from "../../../../../enterprise-layer/domain";
import { logger } from "../../../../utils/logger";
import Messages from "../../../../utils/messages";
import Status from "../../../../utils/status";

interface GetIndexProps {
  movies: IStream[];
  id: string | undefined;
}

interface MovieEditedProps {
  movies: IStream[];
  movie: IStream;
}

class Utils {
  static getIndex = (props: GetIndexProps) => {
    const { movies, id } = props;
    return movies?.findIndex((movie) => movie.id === id);
  };

  static isNotFind(props: MovieEditedProps) {
    const { movie, movies } = props;
    const { id } = movie;
    const index = this.getIndex({ movies, id });

    if (index === -1) {
      logger.warn(`${Messages.movie().movieIsNotFind}`);
      return {
        statusCode: Status.badRequest(),
        message: Messages.movie().movieIsNotFind,
      };
    }
  }

  static applyEdited(props: MovieEditedProps) {
    const { movies, movie } = props;
    const { id } = movie;
    const index = Utils.getIndex({ movies, id });

    const newValue: IStream = {
      id: movies[index].id,
      title: movie.title || movies[index].title,
      category: movie.category || movies[index].category,
      description: movie.description || movies[index].description,
    };

    movies.splice(index, 1, newValue);
    return movies;
  }

  static isInvalidId(movie: IStream) {
    if (!movie?.id) {
      logger.warn(`${Messages.movie().idIsRequiredForEditing}`);
      return {
        statusCode: Status.badRequest(),
        message: Messages.movie().idIsRequiredForEditing,
      };
    }
  }

  static isValidData(movie: IStream) {
    return movie.title || movie.category || movie.description;
  }

  static isInValidData() {
    logger.warn(`${Messages.movie().notDataForEditing}`);
    return {
      statusCode: Status.badRequest(),
      message: Messages.movie().notDataForEditing,
    };
  }
}

export default Utils;
