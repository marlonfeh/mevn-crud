import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  namespaced: true,
  state() {
    return {
      notes: [
        /*
        {
          _id: "1",
          title: "Note 10",
          content:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse molestias ducimus soluta voluptatibus, quae et quas laboriosam. Veniam voluptas necessitatibus quos soluta veritatis quisquam molestiae ipsum dolor ipsa. Natus, odit?",
          created: "20. May 15:52",
          creator: "User2",
        },
        {
          _id: "2",
          title: "Note 2",
          content:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse molestias ducimus soluta voluptatibus, quae et quas laboriosam. Veniam voluptas necessitatibus quos soluta veritatis quisquam molestiae ipsum dolor ipsa. Natus, odit?",
          created: "20. May 15:52",
          creator: "User1",
        },
        {
          _id: "1",
          title: "Note 3",
          content:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse molestias ducimus soluta voluptatibus, quae et quas laboriosam. Veniam voluptas necessitatibus quos soluta veritatis quisquam molestiae ipsum dolor ipsa. Natus, odit?",
          created: "20. May 15:52",
          creator: "User1",
        },
        */
      ],
    };
  },
  mutations,
  actions,
  getters
};