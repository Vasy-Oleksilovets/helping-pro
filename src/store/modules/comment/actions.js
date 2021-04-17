/* ============
 * Actions for the code module
 * ============
 *
 * The actions that are available on the
 * code module.
 */

import ProjectProxy from '@/proxies/ProjectProxy.js';
import * as types from './mutation-types';
import state from './state';

export const initAllComments = ({ commit }, payload) => 
{ 
  new ProjectProxy().getAllComments(
    payload.subProjectId,
  )
  .then((response) => {
    commit(types.INIT_ALL_COMMIT, {
      comments: response,
      subProjectId: payload.subProjectId,
    });
  })
  .catch((response) => {
  });
}

export const getCommentsByTypeId = ({ commit }, payload) => 
{ 
  new ProjectProxy().getCommentsByTypeId(
    payload.targetId,
  )
  .then((response) => {
    commit(types.GET_COMMENT_BY_TYPE_ID, {
      comments: response.comments,
      targetId: payload.targetId,
    });
  })
  .catch((response) => {
  });
}

export const addComment = ({ commit }, payload) => 
{ 
  new ProjectProxy().addComment(
    payload.message,
    state.currentTargetId
  )
  .then((response) => {
    payload.vue.$notify({
      group: "notify",
      type: "success",
      title: "Successfully saved",
      text: "Comment created successfully!",
      duration: 4000,
      speed: 1000
    });
    // Fetch all comments again
    getCommentsByTypeId({ commit }, {
      targetId: state.currentTargetId
    })
    initAllComments({ commit }, {
      subProjectId: state.currentSubProjectId
    })
  })
  .catch((response) => {
  });
}

export default {
  initAllComments,
  getCommentsByTypeId,
  addComment,
};
