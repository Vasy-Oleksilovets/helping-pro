/* ============
 * Mutations for the auth module
 * ============
 *
 * The mutations that are available on the
 * account module.
 */

import Vue from 'vue';
import {
    DASH_NAV_TOGGLE, 
    CREATE_PROJECT_STEP,
    RESET
} from './mutation-types';
import initState from './state';

/* eslint-disable no-param-reassign */
export default {
    [DASH_NAV_TOGGLE](state) {
        state.dashNavToggle = !state.dashNavToggle;
    },
    [CREATE_PROJECT_STEP](state, payload) {
        state.createProjectStep = payload.step;
    },
    [RESET](state) {
        Object.keys(initState).forEach(key => state[key] = initState[key])
    }
};
