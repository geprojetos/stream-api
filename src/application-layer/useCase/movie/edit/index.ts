import { EditRepository } from "../../../../adapters-layer/repository";
import { IEditMovie, IEditMovieResponse } from "./IEdit";

class EditMovieUseCase implements IEditMovie {
  private _editRepository: EditRepository;

  constructor(editRepository: EditRepository) {
    this._editRepository = editRepository;
  }

  async list(): Promise<IEditMovieResponse> {
    const result = await this._editRepository.edit();
    return result;
  }
}

export default EditMovieUseCase;
