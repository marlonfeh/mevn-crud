import axios from 'axios';

export default {
  async fetchNotes(context) {
    const token = context.rootGetters["user/token"]
    

    if(token===null) return

    console.log(token)

    await axios
      .get('http://localhost:8080/notes/', {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      .then(res => {
        console.log(res.data.notes)
        context.commit('fetchNotes', res.data)
      })
      //.catch((error) => {console.log(error)})
  },
  async addNote(context, data) {
    await axios
      .post('http://localhost:8080/notes/', {
        title: data.title,
        content: data.content,
        creator: data.creator
      })
      .then((res) => {
        console.log(res);
        context.commit('addNote', res.data.note)
      }, (error) => {
        console.log(error);
      });
  },
  async updateNote(context, data){
    await axios
      .put(`http://localhost:8080/notes/${data._id}`, {
        title: data.title,
        content: data.content
      })
      .then(res => {
        console.log(res)
        context.commit('updateNote', res.data.note)
      })
      .catch(error => console.log(error))
  },
  async deleteNote(context, _id){
    await axios
      .delete(`http://localhost:8080/notes/${_id}`)
      .then((res) => {
        console.log(res);
        context.commit('deleteNote', _id)
      }, (error) => {
        console.log(error);
      });

  },
  async deleteAll(context){
    await axios
      .delete('http://localhost:8080/notes/')
      .then((res) => {
        console.log(res);
        context.commit('deleteAll')
      }, (error) => {
        console.log(error);
      });
  },
  clearNotesStore(context){
    context.commit('deleteAll')
  }
};