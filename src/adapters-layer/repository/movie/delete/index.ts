import { ICreateMovieResponse } from "../../../../application-layer/useCase/movie";
import { IDeleteMovieAdapter } from "./interface/IDeleteMovieAdapter";
import Error from "./utils/Error";

class DeleteMovieRepository implements IDeleteMovieAdapter {
  public async delete(id: string): Promise<ICreateMovieResponse> {
    try {
      const response = await this._validate();
      return response;
    } catch (error) {
      return Error.error(error);
    }
  }

  private async _validate() {
    return {
      statusCode: 0,
      message: "",
    };
  }
}

export default DeleteMovieRepository;
