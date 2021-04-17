/* ============
 * Vuex Store
 * ============
 *
 * The store of the application.
 *
 * http://vuex.vuejs.org/en/index.html
 */

import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

// Modules
import account from "./modules/account";
import code from "./modules/code";
import project from "./modules/project";
import report from "./modules/report";
import auth from "./modules/auth";
import projectmanager from "./modules/projectmanager";
import comment from "./modules/comment";
import app from "./modules/app";
import createPersistedState from 'vuex-persistedstate';
import SecureLS from 'secure-ls';
let ls = new SecureLS({ isCompression: false });
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    /**
     * Assign the modules to the store.
     */
    modules: {
        account,
        code,
        project,
        report,
        auth,
        projectmanager,
        comment,
        app
    },

    /**
     * If strict mode should be enabled.
     */
    strict: false,

    /**
     * Plugins used in the store.
     */
    plugins: debug ? [
        createLogger(),
        createPersistedState({
            storage: {
                getItem: (key) => ls.get(key),
                setItem: (key, value) => ls.set(key, value),
                removeItem: (key) => ls.remove(key),
            }
        })
    ] : [createPersistedState({
        storage: {
            getItem: (key) => ls.get(key),
            setItem: (key, value) => ls.set(key, value),
            removeItem: (key) => ls.remove(key),
        }
    })],
});
