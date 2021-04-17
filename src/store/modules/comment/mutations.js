/* ============
 * Mutations for the code module
 * ============
 *
 * The mutations that are available on the
 * code module.
 */

import { INIT_ALL_COMMIT, GET_COMMENT_BY_TYPE_ID } from './mutation-types';

/* eslint-disable no-param-reassign */
export default {
  [INIT_ALL_COMMIT](state, payload) {
    state.allComments = payload.comments;
    state.currentSubProjectId = payload.subProjectId;
  },

  [GET_COMMENT_BY_TYPE_ID](state, payload) {
    state.commentsByTargetId = payload.comments;
    state.currentTargetId = payload.targetId;

    // Get Estimate Line by TargetId
    findLineByTargetId(
      this.state.projectmanager.estimateLines, 
      state.currentTargetId, 
      state
    );
  },
};

function findLineByTargetId (theObject, id, state) {
  if(theObject instanceof Array) {
    for (let i = 0; i < theObject.length; i ++) {
      findLineByTargetId(theObject[i], id, state);
    }
  } else {
    if (theObject['estimateLineId'] === id) {
      state.selectedEstimateLine = Object.assign({}, theObject);
      return;
    } else {
      findLineByTargetId(theObject['children'], id, state);
    }
  }
}
