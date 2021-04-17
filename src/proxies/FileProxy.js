import BaseProxy from './Proxy';
import Vue from 'vue';

class FileProxy extends BaseProxy {
    /**
     * The constructor for the FileProxy
     *
     * @param {Object} parameters The query parameters
     */
    constructor(parameters = {}) {
        super('files', parameters);
    }

    upload(params, options) {
        return new Promise((resolve, reject) => {
            const url = `${this.endpoint}/upload`;
            Vue.$http
                .post(url, params, options)
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

    download(id, options) {
        return new Promise((resolve, reject) => {
            const url = `${this.endpoint}/${id}`;
            Vue.$http
                .get(url, options)
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

    deleteProjectFile(data) {
        return new Promise((resolve, reject) => {
            const url = `${this.endpoint}/delete_project_doc`;
            Vue.$http
                .post(url, data)
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

    getPdfPages(data) {
        return new Promise((resolve, reject) => {
            const url = `${this.endpoint}/pages/${data}`;
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
}

export default FileProxy;
