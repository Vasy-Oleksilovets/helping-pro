/* ============
 * Mutations for the project module
 * ============
 *
 * The mutations that are available on the
 * project module.
 */

import { FIND, MEASUREMENT } from './mutation-types';

/* eslint-disable no-param-reassign */
export default {
    [FIND](state, project) {},
    [MEASUREMENT](state, measurements) {
        state.measurements = measurements;
    },
};
