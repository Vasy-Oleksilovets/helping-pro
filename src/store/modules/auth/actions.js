/* ============
 * Actions for the auth module
 * ============
 *
 * The actions that are available on the
 * auth module.
 */

import Vue from 'vue';
//import store from '@/store';
import * as types from './mutation-types';

export const check = ({ commit }) => {
    commit(types.CHECK);
};

export const register = ({ commit }) => {
    commit(types.LOGIN, 'RandomGeneratedToken');
    Vue.router.push({
        name: 'home.index',
    });
};

export const login = ({ commit }, payload) => {
  
    return new Promise((resolve, reject) => {
        commit(types.LOGIN, {
            token: payload.token,
            userRole: payload.userRole,
        });
    });
};

export const logout = ({ commit }) => {
    sessionStorage.removeItem("isAuthenticated");
    commit(types.LOGOUT);
    Vue.router.push({
        name: 'login',
    });
};

export const setMyProfile = ({ commit }, payload) => {
    commit(
        types.SET_PROFILE, {
            profile: payload.profile,
        }
        );
    //commit(types.SET_NEW_EST_STATUS, payload);
};

export default {
    check,
    register,
    login,
    logout,
    setMyProfile
};
