import Proxy from './Proxy';
import Vue from 'vue';
import store from '@/store';

class EstimatorProxy extends Proxy {
    /**
     * The constructor for the EstimatorProxy.
     *
     * @param {Object} parameters The query parameters.
     */
    constructor(parameters = {}) {
        super('/api/estimator', parameters);
    }

    /**
     * Method used to get
     *
     * @returns {Promise} The result in a promise
     */
    getEstimatorProfile() {
        return new Promise((resolve, reject) => {
            const url = `${this.endpoint}/get_profile`;
            Vue.$http
                .post(url, {
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
  
  setEstimatorOpen(data) {
    return new Promise((resolve, reject) => {
      const url = `${this.endpoint}/set_estimator_open`; 
      Vue.$http.post(url, data, {
        headers: {
            Authorization:
                'Bearer ' + localStorage.getItem('id_token'),
        },
    })      
        .then((response) => {
          resolve(response);
        })
        .catch((response) => {
          if (response) {
            reject(response.data);
          } else {
            reject();
          }
        });
      });
    }  

  createEstimatorProfile(data) {
    return new Promise((resolve, reject) => {
      const url = "api/info/create_estimator_account"; 
      Vue.$http.post(url, data)      
        .then((response) => {
          resolve(response);
        })
        .catch((response) => {
          if (response) {
            reject(response.data);
          } else {
            reject();
          }
        });
      });
    }

    sendEstimatorRegistrationEmail(data) {
        return new Promise((resolve, reject) => {
            const url = 'api/info/send_estimator_reg_email';
            Vue.$http
                .post(url, data, {
                  headers: {
                    "Content-Type": "application/json"
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

    sendEstimatorRegistrationCompleteEmail(data){
      return new Promise((resolve, reject) => {
        const url = '/api/info/send_estimator_reg_success_email';
        Vue.$http
          .post(url, data)
          .then(response => {
            resolve(response);
          })
          .catch(response => {
            if(response){
              reject(response.data);
            } else {
              reject();
            }
          })
      })
    }

    getProfileInfo() {
        return new Promise((resolve, reject) => {
            const url = `${this.endpoint}/get_profile_info`;
            Vue.$http
                .post(url)
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

    getEstimatorRegistrationObjects() {
        return new Promise((resolve, reject) => {
            const url = 'api/info/registration_lists';
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

    updateEstimatorProfile(data) {
        return new Promise((resolve, reject) => {
            const url = `${this.endpoint}/update_estimator_profile`;
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
  
  uploadEstimatorCertifications(data) {
    return new Promise((resolve, reject) => {
      const url = `${this.endpoint}/upload_estimator_certifications`;     
      Vue.$http.post(url, data)      
        .then((response) => {
          resolve(response);
        })
        .catch((response) => {
          if (response) {
            reject(response.data);
          } else {
            reject();
          }
        });
    });
  }

  uploadEstimatorCertFiles(data) {
    return new Promise((resolve, reject) => {
      const url = `${this.endpoint}/upload_estimator_cert_files`;     
      Vue.$http.post(url, data)      
        .then((response) => {
          resolve(response);
        })
        .catch((response) => {
          if (response) {
            reject(response.data);
          } else {
            reject();
          }
        });
    });
  }

  deleteEstimatorCertFile(data) {
    return new Promise((resolve, reject) => {
      const url = `${this.endpoint}/delete_estimator_cert_file`;     
      Vue.$http.post(url, data)      
        .then((response) => {
          resolve(response);
        })
        .catch((response) => {
          if (response) {
            reject(response.data);
          } else {
            reject();
          }
        });
    });
  } 
    getExpertiseSubcategories(id) {
        return new Promise((resolve, reject) => {
            const url = 'api/info/subcategories/' + id;
            Vue.$http
                .get(url)
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

  getEstimatorInviteEmail(data) {
    return new Promise((resolve, reject) => {
      const url = "api/info/get_invite_email"; 
      Vue.$http.post(url, data)      
        .then((response) => {
          resolve(response);
        })
        .catch((response) => {
          if (response) {
            reject(response.data);
          } else {
            reject();
          }
        });
      });
    }

    createEstimatorUser(data) {
        return new Promise((resolve, reject) => {
            const url = 'api/info/create_estimator_user';
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

    searchExpertiseSubcategories(data) {
        return new Promise((resolve, reject) => {
            const url = 'api/info/searchSubcategories?searchstr=' + data;
            Vue.$http
                .get(url)
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

    getEstimators(data) {
      return new Promise((resolve, reject) => {
          const url = 'api/estimator/estimator_details';
          Vue.$http
              .get(url,{
                params :data ? {...data} :{}
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

    updateEstimatorStatus(data) {
      return new Promise((resolve, reject) => {
          const url = 'api/estimator/estimator_status';
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

    updateEstimatorRole(data) {
      return new Promise((resolve, reject) => {
          const url = 'api/estimator/update_role';
          Vue.$http
              .post(url, data, {
                transformResponse: function(response) {
                  try {
                    return JSON.parse(response);
                  } catch (error) {
                    console.log("Json Parse of updateEstimatorRole response failed");
                    return response;
                  }
                }
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

}

export default EstimatorProxy;
