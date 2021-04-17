import Proxy from './Proxy';
import Vue from 'vue';

class AccountProxy extends Proxy {
  /**
   * The constructor for the AccountProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('api/account', parameters);
  }

  verifyEmailAddress(data) {
    return new Promise((resolve, reject) => {
      const url = 'api/info/send_verify_email';
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

  
  passwordReset(data) {
    return new Promise((resolve, reject) => {
      const url = `api/info/reset_password/`;
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

  confirmEmailAddress(data) {
    return new Promise((resolve, reject) => {
      const url = 'api/info/confirm_verify_email';
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

  businessSuccessSignupEmail(data) {
    return new Promise((resolve, reject) => {
      const url = 'api/info/biz_success_signup_email';
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

  createAccount(data) {
    localStorage.removeItem('id_token');
    Vue.$http.defaults.headers.common.Authorization = '';
    return new Promise((resolve, reject) => {
      const url = 'api/info/create_account';
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

  getAccountInfo(data) {
    return new Promise((resolve, reject) => {
      const url = `${this.endpoint}/get_account`;
      //const url = "api/client/get_account";
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

  getAccountProjects(data) {
    return new Promise((resolve, reject) => {
      const url = `${this.endpoint}/get_account_projects`;
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

  getAccountUsers(data) {
    return new Promise((resolve, reject) => {
      const url = `${this.endpoint}/get_account_users`;
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

  getClientUser(data) {
    return new Promise((resolve, reject) => {
      const url = `${this.endpoint}/get_account_user`;
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

  saveClientUser(data) {
    return new Promise((resolve, reject) => {
      //const url = `${this.endpoint}/admin/save_account_user`;
      const url = `${this.endpoint}/get_account_user`;
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

  sendClientUserInvitation(data) {
    return new Promise((resolve, reject) => {
      const url = `${this.endpoint}/send_client_user_invitation`;
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

  getInviteEmail(data) {
    return new Promise((resolve, reject) => {
      const url = 'api/client/get_invite_email';
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

  confirmClientInvite(data) {
    return new Promise((resolve, reject) => {
      const url = 'api/info/confirm_client_invite';
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

  getOffices(data) {
    return new Promise((resolve, reject) => {
      const url = `${this.endpoint}/get_offices`;
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

  getAccountClients(data) {
    return new Promise((resolve, reject) => {
      const url = `${this.endpoint}/get_account_clients`;
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

  saveAccountClient(data) {
    return new Promise((resolve, reject) => {
      const url = `${this.endpoint}/new_account_client`;
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

  editAccountClient(data) {
    return new Promise((resolve, reject) => {
      const url = `${this.endpoint}/edit_account_client`;
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

  getOffice(id) {
    return new Promise((resolve, reject) => {
      const url = `${this.endpoint}/get_office/` + id;
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

  saveOffice(data) {
    return new Promise((resolve, reject) => {
      const url = `${this.endpoint}/save_client_office/`;
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

  updateAccount(data) {
    return new Promise((resolve, reject) => {
      const url = `${this.endpoint}/update_account/`;
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

  updateAccountOffice(data) {
    return new Promise((resolve, reject) => {
      const url = `${this.endpoint}/update_account_office/`;
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

  logout(data) {
    return new Promise((resolve, reject) => {
      const url = 'api/info/logout';
      Vue.$http
        .post(url, data, {
          headers: {
            Authorization:
              'Bearer ' + localStorage.getItem('id_token'),
          },
        })
        .then(response => {
          // remove the token client side
          this.$store.dispatch('auth/logout');
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

  getPrivacyUrl() {
    return new Promise((resolve, reject) => {
      const url = 'api/info/get_privacy_url';
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

  uploadCompanyLogo(data, options) {
    return new Promise((resolve, reject) => {
      const url = `${this.endpoint}/upload_account_logo`;
      Vue.$http
        .post(url, data, options)
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

  deleteCompanyLogo(data) {
    return new Promise((resolve, reject) => {
      const url = `${this.endpoint}/delete_account_logo`;
      Vue.$http
        .post(url, data)
        .then(response => {
          resolve(response);
        })
        .catch(response => {
          if(response) {
            reject(response.data);
          } else {
            reject();
          }
        });
    });
  }

  getCompanyProfile() {
    return new Promise((resolve, reject) => {
      const url = 'api/account/get_company_profile';
      Vue.$http
        .post(url, {
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
  
  getExtraProfile(data) {
    //estimatorProfileId
    const getProfile = Vue.$http.post(`/api/estimator/get_profile`,data.estimatorProfileId,{
      headers : {
        'Content-Type' : "text/plain"
      }
    });
    const getRegList = Vue.$http.get(`/api/info/registration_lists`);
    const getProfileInfo = Vue.$http.post(`/api/estimator/get_profile_info`,data.estimatorProfileId,{
       headers : {
         'Content-Type' : "text/plain"
       }
    })
    const requests = [getProfile, getRegList, getProfileInfo];
    return new Promise((resolve, reject) => {
      Vue.$http.all(requests).then(response => {
        resolve(response.map(each =>{
          return each.data ? {...each.data} : {...each}
        }));
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

  setUserStatus(data) {
    return new Promise((resolve, reject) => {
      const url = 'api/account/set_account_user_status';
      Vue.$http
        .post(url, data, {
          headers: {
            Authorization:
              'Bearer ' + localStorage.getItem('id_token'),
          }
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

export default AccountProxy;
