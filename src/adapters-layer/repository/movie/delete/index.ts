import { ICreateMovieResponse } from "../../../../application-layer/useCase/movie";
import { IDeleteMovieAdapter } from "./interface/IDeleteMovieAdapter";
import Error from "./utils/Error";

class DeleteMovieRepository implements IDeleteMovieAdapter {
  public async delete(id: string): Promise<ICreateMovieResponse> {
    try {
      const response = await this._validate(id);
      return response;
    } catch (error) {
      return Error.error(error);
    }
  }

  private async _validate(id: string) {
    return {
      statusCode: 0,
      message: "",
      id,
    };
  }
}

export default DeleteMovieRepository;
