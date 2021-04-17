/* ============
 * Actions for the report module
 * ============
 *
 * The actions that are available on the
 * report module.
 */

import ReportProxy from '@/proxies/ReportProxy';

export const find = ({ commit }, payload) => new ReportProxy().find(payload);

export default {
    find,
};
