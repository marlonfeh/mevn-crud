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
          
      }, (error) => {
        console.log(error);
      });
  },
  logoutUser(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    context.commit('logoutUser')

    router.push('/login')

    //Clear Notes in Store
  },
};