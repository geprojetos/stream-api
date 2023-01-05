class Messages {
  static movie() {
    return {
      createSuccessfully: "Movie created successfully",
      saveInDataBase: "Movie saved in the database",
      errorSaveInDataBase: "Error on save movie in data base",
      alreadyExisting: "Movie already existing",
      listSuccessfully: "Movie listed successfully",
      editSuccessfully: "Movie edited successfully",
      movieListingError: "Movie listing error",
      errorCreateMovie: "Error create movie repository",
      notFind: "Not find",
      notDataToEdit: "No data to edit",
      notIdToEdit: "No id to edit",
      invalidData:
        "Invalid data, is required 'title', 'description', 'category'",
    };
  }
}

export default Messages;
