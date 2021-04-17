/* ============
 * Actions for the project module
 * ============
 *
 * The actions that are available on the
 * project module.
 */

import ProjectProxy from '@/proxies/ProjectProxy.js';
import CodeProxy from '@/proxies/CodeProxy.js';
import * as types from './mutation-types';
import state from './state';

export const createProjectEstimate = ({ commit }, payload) => {
    // Call save estimate line proxy
    let lineId = state.lineIdsByCodeNumber[payload.cell.newNumber];
    lineId = lineId == undefined ? null : lineId;
    new ProjectProxy()
        .saveEstimateLineBySubProjecetId(
            payload.cell,
            state.subProjectId,
            lineId
        )
        .then(response => {
            // commit(types.ADD_NEW_ESTIMATE_LINE, payload);
            // // Recalculate construction check
            // commit(types.CALCULATE_CONSTRUCTION_CHECK);
            payload.vue.$notify({
                group: 'notify',
                type: 'success',
                title: 'Successfully saved',
                text: 'Estimate line created successfully!',
                duration: 4000,
                speed: 1000,
            });
            getLinesBySubProjectId({ commit }, state.subProjectId);
        })
        .catch(response => {});
};

export const updateProjectEstimate = ({ commit }, payload) => {
    let lineId = state.lineIdsByCodeNumber[payload.cell.newNumber];
    new ProjectProxy()
        .saveEstimateLineBySubProjecetId(
            payload.cell,
            state.subProjectId,
            lineId
        )
        .then(response => {
            payload.vue.$notify({
                group: 'notify',
                type: 'warn',
                title: 'Successfully updated',
                text: 'Estimate line updated successfully!',
                duration: 4000,
                speed: 1000,
            });
            payload.cell = Object.assign(payload.cell, {
                estimateLineId: response[0].id,
            });
            commit(types.UPDATE_ESTIMATE_LINE, payload);
            // Recalculate construction check
            commit(types.CALCULATE_CONSTRUCTION_CHECK);
        })
        .catch(response => {});
};

export const setContructionCheckValue = ({ commit }, payload) => {
    commit(types.SET_CONSTRUCTION_CHECK, payload);
};

export const reCalculateCCValue = ({ commit }) => {
    commit(types.CALCULATE_CONSTRUCTION_CHECK);
};

export const removeEstimateLine = ({ commit }, payload) => {
    if (payload.lineId == undefined) {
        payload.vue.$notify({
            group: 'notify',
            type: 'error',
            title: 'Cannot remove this estimate line',
            text: 'Cannot remove this estimate line',
            duration: 3000,
            speed: 1000,
        });
        return;
    }
    new ProjectProxy()
        .deleteEstimateLinesById(payload.lineId)
        .then(response => {
            payload.vue.$notify({
                group: 'notify',
                type: 'success',
                title: 'Successfully removed',
                text: 'Estimate line removed successfully!',
                duration: 4000,
                speed: 1000,
            });
            getLinesBySubProjectId({ commit }, state.subProjectId);
        })
        .catch(response => {});
};

export const initiateEstimateLine = ({ commit }, payload) => {
    // Get sub-project by id and set project budget
    new ProjectProxy()
        .getSubProjectById(payload.id)
        .then(response => {
            console.log(response);
            commit(types.SET_SUB_PROJECT_BUDGET, response.estimatorFee);
        })
        .catch(response => {});

    new CodeProxy()
        .simple()
        .then(response => {
            commit('ALL_MASTER_CODES', response);
            commit(types.SET_SUB_PROJECT_ID, payload);
            getLinesBySubProjectId({ commit }, payload.id);
        })
        .catch(response => {});
};

function getLinesBySubProjectId({ commit }, subProjectId) {
    new ProjectProxy()
        .getEstimateLinesBySubProjectId(subProjectId)
        .then(response => {
            commit(types.INITIATE_ESTIMATE_LINE, {
                initialEstimateLines: response.sort(compareByMasterCode),
            });
            commit(types.CALCULATE_CONSTRUCTION_CHECK);
        })
        .catch(response => {});
}

function compareByMasterCode(a, b) {
    if (a.masterFormatCode.id > b.masterFormatCode.id) return 1;
    if (a.masterFormatCode.id < b.masterFormatCode.id) return -1;
    return 0;
}

export default {
    createProjectEstimate,
    updateProjectEstimate,
    setContructionCheckValue,
    reCalculateCCValue,
    removeEstimateLine,
    initiateEstimateLine,
};
