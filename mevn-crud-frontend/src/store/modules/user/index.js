import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

/*
  const user = JSON.parse(localStorage.getItem('user'));
  const initialState = user
    ? { isloggedIn: true, user }
    : { isloggedIn: false, token: null, userId: null, username: null };
*/

export default {
  namespaced: true,
  //state: initialState,
  state() {
    return {
      isLoggedIn: false,
      //Check cookie
      token: null,
      userId: null,
      username: null,
    };
  },
  mutations,
  actions,
  getters
};