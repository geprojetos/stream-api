class Messages {
  static movie() {
    return {
      createSuccessfully: "Movie created successfully",
      saveInDataBase: "Movie saved in the database",
      errorSaveInDataBase: "Error on save movie in data base",
      alreadyExisting: "Movie already existing",
      listSuccessfully: "Movie listed successfully",
      editSuccessfully: "Movie edited successfully",
      editError: "Movie edited error",
      deleteError: "Movie deleted error",
      deleteSuccessfully: "Movie removed successfully",
      isNotFindMovieForDelete: "Is not find movie for deleteById",
      movieListingError: "Movie listing error",
      errorCreateMovie: "Error create movie repository",
      movieIsNotFind: "Movie is not find",
      notDataForEditing: "No data for editing",
      idIsRequiredForEditing: "Id is required for editing",
      invalidData:
        "Invalid data, is required 'title', 'description', 'category'",
    };
  }
}

export default Messages;
