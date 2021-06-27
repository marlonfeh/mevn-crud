export default {
  loginUser(state, payload) {
    console.log(payload.token)

    state.isLoggedIn = true
    state.token = payload.token

    //console.log(state.token)
  },
  setIsLoggedIn(state, payload){
    state.isLoggedIn = true
    state.token = payload

    //console.log(state.isLoggedIn)
    //console.log(state.token)
  },
  logoutUser(state){
    state.isLoggedIn = false
    state.token = null
    state.username = null
    state.userId = null
  }
};