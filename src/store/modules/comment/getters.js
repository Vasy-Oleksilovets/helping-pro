/* ============
 * Getters for the code module
 * ============
 *
 * The getters that are available on the
 * code module.
 */

export default {
  getAllComments: state => state.allComments,
  getEstimateComments: state => state.commentsByTargetId,
  getSelectedEstimateLine: state => state.selectedEstimateLine,
};
