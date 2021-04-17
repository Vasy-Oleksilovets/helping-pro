/* ============
 * Actions for the account module
 * ============
 *
 * The actions that are available on the
 * account module.
 */

import { LOGIN_ERROR, LOGIN_SUCCESS } from './mutation-types';

export default {
    login({ commit }, { user, password }) {
        return new Promise((resolve, reject) => {
            api.getSecured(user, password)
                .then(response => {
                    if (response.status == 200) {
                        console.log('Login successful');
                        // place the loginSuccess state into our vuex store
                        commit(LOGIN_SUCCESS, {
                            userName: user,
                            userPass: password,
                        });
                    }
                    resolve(response);
                })
                .catch(error => {
                    console.log('Error: ' + error);
                    // place the loginError state into our vuex store
                    commit(LOGIN_ERROR),
                        {
                            userName: user,
                        };
                    reject('Invalid credentials!');
                });
        });
    },
    loggedIn({ commit }, { token /*user, firstname, accountCode*/ }) {
        return new Promise((resolve, reject) => {
            commit(LOGIN_SUCCESS, {
                token: token,
            });
        });
    },
    logout({ commit }) {
        return new Promise((resolve, reject) => {
            commit('logout');
            localStorage.removeItem('id_token');
            delete axios.defaults.headers.common['Authorization'];
            resolve();
        });
    },
    emailConfirmed({ commit }, { emailAddress }) {
        return new Promise((resolve, reject) => {
            commit('confirmed_email', {
                emailAddress: emailAddress,
            });
        });
    },
};
