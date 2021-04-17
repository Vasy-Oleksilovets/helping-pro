/* ============
 * State of the account module
 * ============
 *
 * The initial state of the account module.
 */

export default {
    loginSuccess: false,
    loginError: false,
    userName: null,
    firstName: null,
    emailAddress: null,
    accountCode: null,
    accountOfficeId: null,
    userCode: null,
    token: localStorage.getItem('token') || '',
    currentUser: {},
};
