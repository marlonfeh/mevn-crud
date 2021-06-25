import { createStore } from 'vuex'

import notesModule from './modules/notes/index.js';
import userModule from './modules/user/index.js';

const store = createStore({
  modules: {
    notes: notesModule,
    user: userModule,
  },
  state() {
    return {
      isLoading: false,
      //Implement
      isLoadingSpecificNote: false,
      error: null
    };
  },
  getters: {
    isLoggedIn(state) {
      return state.isLoggedIn;
    },
    userId(state) {
      return state.userId;
    },
    username(state) {
      return state.username;
    },
    isLoading(state) {
      return state.isLoading;
    },
    isLoadingSpecificNote(state) {
      return state.isLoadingSpecificNote;
    },
    error(state){
      return state.error;
    }
  },
  actions: {
    toggleLoading(context){
      context.commit('toggleLoading');
    },
    setError(context){
      context.commit('setError');
    },
    resolveError(context){
      context.commit('resolveError');
    }
  },
  mutations: {
    toggleLoading(state){
      state.isLoading = !state.isLoading
    },
    setError(state){
      state.error = true
    },
    resolveError(state){
      state.error = null
    },
    }
  
});

export default store;
