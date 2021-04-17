/* ============
 * Mutations for the code module
 * ============
 *
 * The mutations that are available on the
 * code module.
 */

import { INDEX, ALL_MASTER_CODES, SET_NEW_EST_STATUS } from './mutation-types';

/* eslint-disable no-param-reassign */
export default {
    [INDEX](state, codes) {
        state.codesHash = {};
        for (const code of codes) {
            state.codesHash[code.number] = code.title;
        }
    },

    [SET_NEW_EST_STATUS](state, payload) {
        state.newEstimateStatus = payload.status;
        state.newCodeNumber = payload.number;
        state.newCodeTitle = payload.title;
        state.newId = payload.id;
    },
};
