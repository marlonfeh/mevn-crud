import axios from 'axios';
import router from '../../../router/index.js'

export default {
  tryLogin(context) {
    const token = localStorage.getItem('token');
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    const expiresIn = +tokenExpiration - new Date().getTime();

    console.log("tryLogin, expiresIn: " + expiresIn)

    if (expiresIn < 0) {
      return;
    }

    context.commit('setIsLoggedIn', token)
  },
  async loginUser(context, data) {
    await axios
      .post('http://localhost:8080/auth/login', {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        console.log(res.data);
        context.commit('loginUser', res.data)
        
        const expiresIn = res.data.expiresIn * 1000;
        const expirationDate = new Date().getTime() + expiresIn;

        localStorage.setItem('token', res.data.token);
        localStorage.setItem('tokenExpiration', expirationDate);

        router.push('/home')
          
      });
  },
  async signupUser(context, data) {
    await axios
      .put('http://localhost:8080/auth/signup', {
        name: data.username,
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        console.log(res.data);

        console.log(data)


        //Überarbeiten
        context.dispatch('loginUser', data)
      });
  },
  logoutUser(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    context.commit('logoutUser')
    //Clear Notes in Store
    context.dispatch('notes/clearNotesStore', null, { root: true })

    router.push('/login')    
  },
};