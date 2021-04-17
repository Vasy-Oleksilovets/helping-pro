import Axios from 'axios';

const RESOURCE_NAME = '/';

export default {
    getAllBuildingTypes() {
        return Axios.get(RESOURCE_NAME + 'api/all-building-categories/');
    },
    getAllBuildingSubcategories() {
        return Axios.get(RESOURCE_NAME + 'api/subcategories/');
    },
    /*  getEstimate(data) {
    return Axios.post(RESOURCE_NAME + "api/estimate_project", data);
  },

  get(id) {
    return Axios.get(`${RESOURCE_NAME}/${id}`);
  },
 
  create(data) {
    return Axios.post(RESOURCE_NAME, data);
  },
 
  update(id, data) {
    return Axios.put(`${RESOURCE_NAME}/${id}`, data);
  },
 
  delete(id) {
    return Axios.delete(`${RESOURCE_NAME}/${id}`);
  }*/
};
