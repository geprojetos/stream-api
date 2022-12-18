import { EditRepository } from "../../../../adapters-layer/repository";
import { IEditMovie, IEditMovieResponse } from "./IEdit";
import { IStream } from "../../../../enterprise-layer/domain";

class EditMovieUseCase implements IEditMovie {
  private _editRepository: EditRepository;

  constructor(editRepository: EditRepository) {
    this._editRepository = editRepository;
  }

  async edit(movie: IStream): Promise<IEditMovieResponse> {
    const result = await this._editRepository.edit(movie);
    return result;
  }
}

export default EditMovieUseCase;
