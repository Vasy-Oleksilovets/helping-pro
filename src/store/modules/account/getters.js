/* ============
 * Getters for the account module
 * ============
 *
 * The getters that are available on the
 * account module.
 */

export default {
    isLoggedIn: state => state.loginSuccess,
    hasLoginErrored: state => state.loginError,
    getUserName: state => state.userName,
    getUserPass: state => state.userPass,
    getAccountCode: state => state.accountCode,
    getUserCode: state => state.userCode,
    getAccountOfficeId: state => state.accountOfficeId,
};
