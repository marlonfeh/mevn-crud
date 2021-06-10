export default {
  notes(state) {
    return state.notes;
  },
  isEmpty(state){
    return state.notes.length === 0

    /*
    if (state.notes.length > 0) {
      return false;
    } else {
      return true;
    }
    */
  }
  /*
  getNoteById: (state) => (id) => {
    return state.notes.find(note => note.id === id)
  }
  */
};