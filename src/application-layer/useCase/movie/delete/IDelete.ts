interface IDeleteMovie {
  delete: (id: string) => Promise<IDeleteMovieResponse>;
}

interface IDeleteMovieResponse {
  statusCode: number;
  message: string;
  id?: string;
}

export { IDeleteMovie, IDeleteMovieResponse };
