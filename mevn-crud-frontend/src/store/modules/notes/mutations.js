export default {
  fetchNotes(state, payload) {
    state.notes = payload.notes;
  },
  addNote(state, payload) {
    const Note = {
      _id: payload._id,
      title: payload.title,
      content: payload.content,
      creator: payload.creator,
      createdAt: payload.createdAt,
    };

    state.notes.push(Note)
  },
  updateNote(state, payload) {
    state.notes = [...state.notes.map(item => item._id !== payload._id ? item : {...item, ...payload})]
  },
  deleteNote(state, payload) {
    let index = state.notes.findIndex(note => note._id == payload)
    state.notes.splice(index, 1)
  },
  deleteAll(state) {
    state.notes = []
  },
};


