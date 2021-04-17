import BaseProxy from '@/proxies/Proxy.js';
import Vue from 'vue';

class CalculateFeeProxy extends BaseProxy {
  /**
   * The constructor of the ProjectProxy
   *
   */
  constructor(parameters = {}) {
    super('api/project', parameters);
  }

  factors(){
    return new Promise((resolve, reject) => {
      const url =  `${this.endpoint}/costdata`;
      Vue.$http
      .get(url)
      .then(res =>  resolve(res.data))
      .catch(res =>  res?  reject(res) : reject())
    })
  }

  feeData(data){
    return new Promise((resolve, reject) => {
        const url =  `${this.endpoint}/fee/${data ? data.project_id : 0}`;
        Vue.$http
        .get(url)
        .then(res =>  resolve(res.data))
        .catch(res =>  res?  reject(res) : reject())
      })
  }

  saveFeeData(data){
    return new Promise((resolve, reject) => {
        const url =  `${this.endpoint}/fee`;
        Vue.$http
        .post(url,data)
        .then(res =>  resolve(res.data))
        .catch(res =>  res?  reject(res) : reject())
      })
  }
}

export default CalculateFeeProxy