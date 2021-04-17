/* ============
 * Actions for the project module
 * ============
 *
 * The actions that are available on the
 * project module.
 */

import ProjectProxy from '@/proxies/ProjectProxy.js';
import * as types from './mutation-types';

export const find = ({ commit }) => {};

export const measurement = ({ commit }) => {
    new ProjectProxy()
        .measurements()
        .then(response => {
            commit(types.MEASUREMENT, response);
        })
        .catch(() => {
            console.log('Getting measurements request failed...');
        });
};

export default {
    find,
    measurement,
};
