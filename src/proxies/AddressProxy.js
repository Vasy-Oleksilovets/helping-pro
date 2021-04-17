import Proxy from './Proxy';
import Vue from 'vue';

class AddressProxy extends Proxy {
    /**
     * The constructor for the AccountProxy.
     *
     * @param {Object} parameters The query parameters.
     */
    constructor(parameters = {}) {
        super('api/addresses', parameters);
    }

    getStates() {
        return new Promise((resolve, reject) => {
            const url = `${this.endpoint}/get_states`;
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
    
    getCities(code){
        return new Promise((resolve, reject) => {
            const url = `${this.endpoint}/cities/` + code;
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

}

export default AddressProxy;