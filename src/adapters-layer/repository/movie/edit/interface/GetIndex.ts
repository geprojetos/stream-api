import { IStream } from "../../../../../enterprise-layer/domain";

interface GetIndexProps {
  movies: IStream[];
  id: string | undefined;
}

export { GetIndexProps };
