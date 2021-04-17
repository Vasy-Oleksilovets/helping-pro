/* ============
 * Actions for the code module
 * ============
 *
 * The actions that are available on the
 * code module.
 */

import CodeProxy from '@/proxies/CodeProxy';
import * as types from './mutation-types';

export const index = ({ commit }, payload) => new CodeProxy().simple(payload);

export const setNewEstimateStatus = ({ commit }, payload) => {
    commit(types.SET_NEW_EST_STATUS, payload);
};

export default {
    index,
    setNewEstimateStatus,
};
