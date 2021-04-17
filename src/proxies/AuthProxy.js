import Proxy from './Proxy';
import Vue from 'vue';

class AuthProxy extends Proxy {
  /**
   * * The constructor for the ArtistProxy.
   * *
   * * @param {Object} parameters The query parameters.
   * */
  constructor(parameters = {}) {
    super('oauth', parameters);
  }
  /**
   * * Method used to login.
   * *
   * * @param {String} username The username.
   * * @param {String} password The password.
   * *
   * * @returns {Promise} The result in a promise.
   * */
  login({ username, password }) {
    const data = {
      username,
      password,
      client_id: process.env.VUE_APP_API_CLIENT_ID,
      client_secret: process.env.VUE_APP_API_CLIENT_SECRET,
      grant_type: 'password',
      scope: '',
    };
    return this.submit('post', `${this.endpoint}/token`, data);
  }
  getLogin(data) {
    const url = 'api/info/get_user';
    return new Promise((resolve, reject) => {
      Vue.$http
        .post(url, data)
        .then(response => {
          resolve(response);
        })
        .catch(({ response }) => {
          if (response) {
            reject(response.data);
          } else {
            reject();
          }
        });
    });
  }

  forgotPassword(data){
    const url = 'api/info/forgot_password';
    return new Promise((resolve, reject) => {
      Vue.$http
        .post(url, data)
        .then(response => {
          resolve(response);
        })
        .catch(({response}) => {
          if(response){
            reject(response.data);
          } else {
            reject();
          }
        })
    })
  }

  /**
   * Method used to register the user.
   *
   * @param {Object} data The register data.
   *
   * @returns {Promise} The result in a promise.
   */
  register(data) {
    return this.submit('post', `${this.endpoint}/register`, data);
  }

  getDashboard() {
    return new Promise((resolve, reject) => {
      const url = "api/users/get_dashboard";
      Vue.$http
        .post(url, {
          headers: {
            Authorization:
              'Bearer ' + localStorage.getItem('id_token'),
          },
        })
        .then(response => {
          resolve(response);
        })
        .catch(response => {
          if (response) {
            reject(response.data);
          } else {
            reject();
          }
        });
    });
  }     
}

export default AuthProxy;
