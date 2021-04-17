/* ============
 * Account Module
 * ============
 */

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import state from './state';
import createPersistedState from 'vuex-persistedstate';

export default {
    namespaced: true,
    actions,
    getters,
    mutations,
    state,
    plugins: [createPersistedState()],
};
