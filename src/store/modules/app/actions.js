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

export const dashNavToggle = ({ commit }) => {
    commit(types.DASH_NAV_TOGGLE);
};
export const createProjectStep = ({ commit }, payload) => {
    commit(types.CREATE_PROJECT_STEP, {
        step: payload.step
    });
};
export const reset = ({ commit }) => {
    commit(types.RESET);
}

export default {
    dashNavToggle,
    createProjectStep,
    reset
};
