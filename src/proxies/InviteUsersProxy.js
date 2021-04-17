// eslint-disable-ne
import Proxy from './Proxy';
import Vue from 'vue';
class InviteUsersProxy extends Proxy {
 
    inviteProgramManager(data) {
        return new Promise((resolve, reject) => {
            const url = 'api/inviteuser/invite_mgr';
            Vue.$http
                .post(url, data, {
                    headers: {
                        "Content-Type": "application/json",
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
    inviteUser(data) {
        return new Promise((resolve, reject) => {
            const url = 'api/account/send_client_user_invitation';
            Vue.$http
                .post(url, data, {
                    headers: {
                        "Content-Type": "application/json",
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
    getInvitesList() {
        return new Promise((resolve, reject) => {
            const url = 'api/client/get_client_email_invites/3';
            Vue.$http
                .post(url, {
                    headers: {
                        "Content-Type": "application/json",
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

export default InviteUsersProxy;