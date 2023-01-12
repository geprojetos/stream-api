import { IStream, Stream } from "../../../../../enterprise-layer/domain";

interface ICreateMovieProps {
  movie: Stream;
  movies?: IStream[];
  isAlready?: IStream[];
}

export { ICreateMovieProps };
