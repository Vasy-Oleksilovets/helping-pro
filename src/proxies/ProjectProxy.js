import BaseProxy from '@/proxies/Proxy.js';
import Vue from 'vue';

class ProjectProxy extends BaseProxy {
  /**
   * The constructor of the ProjectProxy
   *
   */
  constructor(parameters = {}) {
    super('api/projects', parameters);
  }
  /**
   * Method used to delete project.
   *
   * @param {int} id The given identifier.
   *
   * @returns {Promise} The result in a promise.
   */
  delete(id) {
    return new Promise((resolve, reject) => {
      const url = `${this.endpoint}/${id}`;
      Vue.$http
        .delete(url, {})
        .then(response => {
          resolve(response.data);
        })
        .catch(({ response }) => {
          if (response) {
            reject(response.data);
          } else {
            reject();
          }
        });
    });
  }

  createProject(data) {
    return new Promise((resolve, reject) => {
      const url = `${this.endpoint}/create_project`;
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

  getProjects(data) {
    return new Promise((resolve, reject) => {
      const url = `${this.endpoint}/get_projects`;
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
        .catch(({ response }) => {
          if (response) {
            reject(response.data);
          } else {
            reject();
          }
        });
    });
  }

  getSubProjects(id) {
    return new Promise((resolve, reject) => {
      const url = `${this.endpoint}/get_subprojects/` + id;
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

  getSubProject(id) {
    return new Promise((resolve, reject) => {
      const url = `${this.endpoint}/get_subproject/` + id;
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

  /**
   * Method used to get project types
   *
   * @returns {Promise} The result in a promise
   */
  // types() {
  //   return new Promise((resolve, reject) => {
  //     let url = this.endpoint + '/types';
  //     Vue.$http.get(url, {})
  //     .then((response) => {
  //       resolve(response.data);
  //     })
  //     .catch((response) => {
  //       if (response) {
  //         reject(response.data);
  //       } else {
  //         reject();
  //       }
  //     });
  //   });
  // }

  /**
   * Method used to get building types
   */
  buildingTypes() {
    return new Promise((resolve, reject) => {
      const url = `${this.endpoint}/types`;
      Vue.$http
        .get(url, {})
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

  getExpertiseCategories() {
    return new Promise((resolve, reject) => {
      const url = `${this.endpoint}/expertise_categories`;
      Vue.$http
        .get(url, {})
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

  buildingTypesHelper() {
    return new Promise((resolve, reject) => {
      const url = `${this.endpoint}/building_types`;
      Vue.$http
        .get(url, {})
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

  measurements() {
    return new Promise((resolve, reject) => {
      const url = `${this.endpoint}/measurements`;
      Vue.$http
        .get(url, {})
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

  getEstimate(data) {
    return new Promise((resolve, reject) => {
      const url = `${this.endpoint}/estimate_project`;
      Vue.$http
        .post(url, data, {})
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

  saveProject(data) {
    return new Promise((resolve, reject) => {
      const url = `${this.endpoint}/save_project`;
      Vue.$http
        .post(url, data, {})
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

  createSubProject(data) {
    return new Promise((resolve, reject) => {
      const url = `${this.endpoint}/create_sub_project`;
      Vue.$http
        .post(url, data, {})
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

  saveSubProject(data) {
    return new Promise((resolve, reject) => {
      const url = `${this.endpoint}/save_sub_project`;
      Vue.$http
        .post(url, data, {})
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

  setSubProjectEstimator(data) {
    return new Promise((resolve, reject) => {
      const url = `${this.endpoint}/set_sub_project_estimator`;
      Vue.$http
        .post(url, data, {})
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

  uploadSubProjectFiles(data) {
    return new Promise((resolve, reject) => {
      const url = `${this.endpoint}/upload_sub_project_docs`;
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

  deleteSubProjectFile(data) {
    return new Promise((resolve, reject) => {
      const url = `${this.endpoint}/delete_sub_project_doc`;
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

  getEstimatorCurrentProjects(data) {
    return new Promise((resolve, reject) => {
      const url = `${this.endpoint}/get_estimator_current_projects`;
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

  getEstimatorPastProjects(data) {
    return new Promise((resolve, reject) => {
      const url = `${this.endpoint}/get_estimator_past_projects`;
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

  getEstimateLinesBySubProjectId(id) {
    return new Promise((resolve, reject) => {
      const url = `${this.endpoint}/get_project/${id}/lines`;
      Vue.$http
        .get(url, {})
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

  saveEstimateLineBySubProjecetId(data, subProjectId, lineId) {
    const line = Object.assign({
      code: data.newNumber,
      count: data.quantity,
      equipmentCostPer: data.equipmentCostPer,
      estimateLineId: lineId,
      laborCostPer: data.laborCostPer,
      materialCostPer: data.materialCostPer,
      measurement: data.measurement,
      selected: true,
      subcontractorCostPer: data.subcontractorCostPer,
    });
    const body = Object.assign({
      lines: [line],
      projectId: subProjectId,
    });
    console.log(JSON.stringify(body));
    console.log(subProjectId);
    return new Promise((resolve, reject) => {
      const url = `api/reports/estimates`;
      Vue.$http
        .post(url, body, {})
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

  deleteEstimateLinesById(id) {
    return new Promise((resolve, reject) => {
      const url = `api/reports/estimates/${id}`;
      Vue.$http
        .delete(url, {})
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

  getSubProjectById(id) {
    return new Promise((resolve, reject) => {
      const url = `api/projects/get_project/${id}`;
      Vue.$http
        .get(url, {})
        .then(response => {
          console.log(response);
          resolve(response.data);
        })
        .catch(response => {
          console.log(response);
          if (response) {
            reject(response.data);
          } else {
            reject();
          }
        })
    });
  }

  // Comment APIs
  getAllComments(subProjectId) {
    return new Promise((resolve, reject) => {
      const url = `api/comments/subproject/${subProjectId}`;
      Vue.$http.get(url, {})
        .then((response) => {
          resolve(response.data);
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

  getCommentsByTypeId(typeId) {
    return new Promise((resolve, reject) => {
      const url = `api/comments/1/${typeId}`;
      Vue.$http.get(url, {})
        .then((response) => {
          resolve(response.data);
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

  uploadProjectDocument(data) {
    return new Promise((resolve, reject) => {
      const url = `${this.endpoint}/upload_project_document`;     
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


  uploadProjectDrawings(data, projectId, type) {
    return new Promise((resolve, reject) => {
      const url = `${this.endpoint}/upload_project_document?projectId=${projectId}&type=${type}`;  
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }   
      Vue.$http.post(url, data, config)      
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

  addComment(message, targetId) {
    const body = Object.assign({
      comment: message,
    });

    return new Promise((resolve, reject) => {
      const url = `api/comments/1/${targetId}`;
      Vue.$http.post(url, body, {})
        .then((response) => {
          resolve(response.data);
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

  feeEstimateAction(data) {
    return new Promise((resolve, reject) => {
        const url = `${this.endpoint}/fee_estimate_action`;
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

export default ProjectProxy;
