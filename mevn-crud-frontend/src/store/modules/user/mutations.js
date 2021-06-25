export default {
  loginUser(state, payload) {
    console.log(payload.token)

    state.isLoggedIn = true
    state.token = payload.token
    state.userId = payload.userId

    console.log(state.token)
  },
  toggleIsLoggedIn(state){
    state.isLoggedIn = !state.isLoggedIn
  },
  logoutUser(state){
    state.isLoggedIn = false
    state.token = null
    state.username = null
    state.userId = null
  }
};