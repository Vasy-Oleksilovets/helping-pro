import BaseProxy from '@/proxies/Proxy.js';
import Vue from 'vue';

class CodeProxy extends BaseProxy {
  /**
   * The constructor of the CodeProxy
   *
   */
  constructor(parameters = {}) {
    super('api/codes', parameters);
  }
  /**
   * Method used for simple code fetching
   */
  simple() {
    return new Promise((resolve, reject) => {
      const url = `${this.endpoint}/simple`;
      Vue.$http
        .get(url, {})
        .then(response => {
          resolve(response.data);
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
  /**
   * Method used for autocomplete search
   */
  search(searchTerm) {
    return new Promise((resolve, reject) => {
      const url = `${this.endpoint}/search?value=${searchTerm}`;
      Vue.$http
        .get(url, {})
        .then(response => {
          resolve(response.data);
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

export default CodeProxy;
