import { IStream, Stream } from "../../../../../enterprise-layer/domain";

interface ICreateMovieProps {
  movie: Stream;
  contentFile?: IStream[];
  isAlready?: IStream[];
}

export { ICreateMovieProps };
