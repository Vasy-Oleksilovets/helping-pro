import Proxy from './Proxy';
import Vue from 'vue';

class AdminProxy extends Proxy {
    /**
     * The constructor for the AdminProxy.
     *
     * @param {Object} parameters The query parameters.
     */
    constructor(parameters = {}) {
        super('api/admin', parameters);
    }

    getAdminProfile(data) {
        return new Promise((resolve, reject) => {
            const url = `${this.endpoint}/get_profile`;
            Vue.$http
                .post(url, data, {
                    headers: {
                        Authorization:
                            'Bearer ' + localStorage.getItem('id_token'),
                    },
                })
                .then(response => {
                    resolve(response);
                })
                .catch(response => {
                    if (response) {
                        reject(response.data);
                    } else {
                        reject();
                    }
                });
        });
    }

    getEstimatorSearchObjects() {
        return new Promise((resolve, reject) => {
            const url = 'api/info/estimator_search';
            Vue.$http
                .get(url)
                .then(response => {
                    resolve(response.data);
                })
                .catch(response => {
                    if (response) {
                        reject(response.data);
                    } else {
                        reject();
                    }
                });
        });
    }

    getEstimatorsSearch(data) {
        return new Promise((resolve, reject) => {
            const url = 'api/admin/estimators_search';
            Vue.$http
                .post(url, data)
                .then(response => {
                    resolve(response.data);
                })
                .catch(response => {
                    if (response) {
                        reject(response.data);
                    } else {
                        reject();
                    }
                });
        });
    }

    getProjectSearch(data) {
        return new Promise((resolve, reject) => {
            const url = 'api/admin/projects_search';
            Vue.$http
                .post(url, data, {
                    headers: {
                        Authorization:
                            'Bearer ' + localStorage.getItem('id_token'),
                    },
                })
                .then(response => {
                    resolve(response.data);
                })
                .catch(response => {
                    if (response) {
                        reject(response.data);
                    } else {
                        reject();
                    }
                });
        });
    }

    getProjectToEdit(data) {
        return new Promise((resolve, reject) => {
            const url = 'api/admin/edit_project';
            Vue.$http
                .post(url, data)
                .then(response => {
                    resolve(response.data);
                })
                .catch(response => {
                    if (response) {
                        reject(response.data);
                    } else {
                        reject();
                    }
                });
        });
    }

    claimTask(data) {
        return new Promise((resolve, reject) => {
            const url = 'api/admin/claim_task';
            Vue.$http
                .post(url, data, {
                    headers: {
                        Authorization:
                            'Bearer ' + localStorage.getItem('id_token'),
                    },
                })
                .then(response => {
                    resolve(response.data);
                })
                .catch(response => {
                    if (response) {
                        reject(response.data);
                    } else {
                        reject();
                    }
                });
        });
    }

    getAllAccounts() {
        return new Promise((resolve, reject) => {
            const url = 'api/admin/get_all_accounts';
            Vue.$http
                .get(url, {
                    headers: {
                        Authorization:
                            'Bearer ' + localStorage.getItem('id_token'),
                    },
                })
                .then(response => {
                    resolve(response.data);
                })
                .catch(response => {
                    if (response) {
                        reject(response.data);
                    } else {
                        reject();
                    }
                });
        });
    }

    getAccount(data) {
        return new Promise((resolve, reject) => {
            const url = 'api/admin/get_account';
            Vue.$http
                .post(url, data, {
                    headers: {
                        Authorization:
                            'Bearer ' + localStorage.getItem('id_token'),
                    },
                })
                .then(response => {
                    resolve(response.data);
                })
                .catch(response => {
                    if (response) {
                        reject(response.data);
                    } else {
                        reject();
                    }
                });
        });
    }

    getInviteEmailList(data) {
        return new Promise((resolve, reject) => {
            const url = 'api/admin/get_invite_emails_list';
            Vue.$http
                .post(url, data, {
                    headers: {
                        Authorization:
                            'Bearer ' + localStorage.getItem('id_token'),
                    },
                })
                .then(response => {
                    resolve(response);
                })
                .catch(response => {
                    if (response) {
                        reject(response);
                    } else {
                        reject();
                    }
                });
        });
    }

    resendInvite(data) {
        return new Promise((resolve, reject) => {
            const url = 'api/admin/resend_invite';
            Vue.$http
                .post(url, data, {
                    headers: {
                        Authorization:
                            'Bearer ' + localStorage.getItem('id_token'),
                    },
                })
                .then(response => {
                    resolve(response);
                })
                .catch(response => {
                    if (response) {
                        reject(response);
                    } else {
                        reject();
                    }
                });
        });
    }
}
export default AdminProxy;
