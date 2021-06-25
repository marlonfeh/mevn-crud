import axios from 'axios';

export default {
  tryLogin(context) {

    //Verify JWT
    //check expiration date


    //call userid auth-route


    if(context.getters.token){
      context.commit('toggleIsLoggedIn')
    }
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
        //rausnehmen
        localStorage.setItem('userId', res.data.userId);
          
      }, (error) => {
        console.log(error);
      });
  },
  logoutUser(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    //rausnehmen
    localStorage.removeItem('userId');
    context.commit('logoutUser')
  },
};