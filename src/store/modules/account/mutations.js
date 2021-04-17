/* ============
 * Mutations for the account module
 * ============
 *
 * The mutations that are available on the
 * account module.
 */
import Vue from 'vue';
import {
    CONFIRMED_EMAIL,
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    LOGOUT,
    SESSION_EXPIRED,
} from './mutation-types';

export default {
    [LOGIN_SUCCESS](state, payload) {
        state.loginSuccess = true;
        localStorage.setItem('id_token', payload.token);
        state.token = payload.token;
        Vue.$http.defaults.headers.common.Authorization = `Bearer ${
            payload.token
        }`;
    },
    [LOGIN_ERROR](state, payload) {
        state.loginSuccess = false;
        state.loginError = true;
        state.userName = null;
        state.emailAddress = null;
        state.firstName = null;
    },
    [SESSION_EXPIRED](state, payload) {
        state.loginSuccess = false;
        state.loginError = true;
        state.userName = null;
        state.emailAddress = null;
        state.firstName = null;
    },
    [CONFIRMED_EMAIL](state, payload) {
        state.emailAddress = payload.emailAddress;
    },
    [LOGOUT](state) {
        state.loginSuccess = false;
        state.userName = '';
        state.firstName = '';
        state.accountCode = '';
        state.loginError = false;
        state.emailAddress = '';
        state.userCode = '';
        state.token = '';
        state.accountOfficeId = '';
        Vue.$http.defaults.headers.common.Authorization = '';
    },
};
