<template>
  <div class="position-relative">
    <DashHeaderCreateProject :goBackToProjects="goBackToProjects"/>
    <div class="client-manager-create-project">
      <!-- Define black blue linke of the header -->
      <!-- <div class="table-header">
      </div> -->
      <!-- Define content of the page -->
      <div class="content-card">
        <!-- <div v-else style="height: 21px"></div> -->
        <!-- Define tab bar round icon define -->
        <!-- <div class="custom-tabbar-icon d-flex justify-content-center">
          <div class="round-icon mr-2 standard-color"></div>
          <div :class="step!==1? 'round-icon standard-color mr-2': 'round-icon grey-color mr-2'"></div>
          <div :class="step > 2? 'round-icon standard-color mr-2':'round-icon grey-color mr-2'"></div>
          <div :class="step==4? 'round-icon standard-color':'round-icon grey-color'"></div>
        </div> -->

        <!-- Define 3 pages for creating project -->
        <div v-if="createProjectStep==1" class="create-new-project">
          <CreateNewProject :goBackToProjects="goBackToProjects" v-on:sendDataToParent="receiveData" :gotoNextTab="gotoNextTab" :create_new_project_info="create_new_project_info" :category_name="category_name" :custom_character="custom_character">
            <div style="position: relative" slot="title">
              <autocomplete :search="search" @submit="searchChange($event)" placeholder="Some Building Type" aria-label="Some Building Type">
                <template #default="{rootProps, inputProps, inputListeners, resultListProps, resultListListeners, results, resultProps}">
                  <div v-bind="rootProps">
                  <input v-bind="inputProps" v-on="inputListeners" @focus="initialSearch" v-model="custom_character" :style="no_data? 'padding: 5px 40% 5px 10px !important; ':''"/>
                  <ul v-bind="resultListProps" v-on="resultListListeners">
                    <li v-for="(result, index) in results" :key="resultProps[index].id" v-bind="resultProps[index]">
                      {{ result }}
                    </li>
                  </ul>
                  </div>
                </template>
              </autocomplete>
              <div v-if="no_data" class="d-flex align-items-center" role="button" style="position: absolute; right: 10px; top: 8px;" @click="addCustomBuildingType">
                <b-icon icon="plus" scale="1.5"></b-icon>
                <div class="font-weight-normal">Add Building Type</div>
              </div>
            </div>
            <b-form-input slot="category" disabled class="mt-2" v-model="category_name"></b-form-input>
          </CreateNewProject>
        </div>

        <div v-if="createProjectStep==2">
          <CreateProjectEstimate :goBackToProjects="goBackTab" v-on:emitCreateProjectEstimate="emitCreateProjectEstimate" :gotoNextTab="gotoNextTab" :create_project_esti_info="create_project_esti_info"/>
        </div>

        <!-- Payments and Billing Page -->
        <!-- <div v-if="step==4">
          <PaymentsAndBilling v-on:addedPayment="updatePaymentData" v-on:createProject="createProject"/>
        </div> -->
        <!-- Upload Project Documents Page -->
        
        <UploadProjectDocuments :createProject="createProject" :goBackToProjects="goBackTab" :gotoNextTab="gotoNextTab" v-on:emitUploadProjectDocuments="emitUploadProjectDocuments" v-on:submitProject="submitProject" :upload_project_documents="upload_project_documents" v-if="createProjectStep==3"/>
        <!-- Modal -->
        <div>
          <b-modal id="modal-center" centered>
            <template v-slot:modal-header="{}">
              <span @click="close()"></span>
            </template>
            <div class="text-center">
              Are you sure you want to leave this page? The changes you have made will not be saved.
              <br />
              Leave this page?
            </div>
            <template v-slot:modal-footer="{ ok }">
              <div class="text-center mb-4" style="margin-left: auto; margin-right: auto">
                <b-btn class="dialog-btn-style mr-5" style="background-color: #0C2340" @click="ok(), reloadPage()">Yes</b-btn>
                <b-btn class="dialog-btn-style" style="background-color: #95B8E4" @click="ok()">No</b-btn>
              </div>
            </template>
          </b-modal>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
var converter = require('number-to-words');
import { mapState } from 'vuex'
import DashHeaderCreateProject from '../dash-header-create-project';
//Import Components for each page
import CreateNewProject from './createproject/createnewproject.vue';
import CreateProjectEstimate from './createproject/createprojectestimate.vue';
// import PaymentsAndBilling from './createproject/paymentsandbilling.vue';
import UploadProjectDocuments from './createproject/uploadprojectdocuments.vue';
import Autocomplete from '@trevoreyre/autocomplete-vue';
import EstimatorProxy from '@/proxies/EstimatorProxy.js';
import { BIcon, BIconThreeDotsVertical, BIconXCircle, BIconPlus } from 'bootstrap-vue'
import FileUpload from 'vue-upload-component/dist/vue-upload-component.part.js';
import ProjectProxy from '@/proxies/ProjectProxy.js';


export default {
  name: 'ClientManagerCreateProject',
  components: {
    DashHeaderCreateProject,
    CreateNewProject,
    CreateProjectEstimate,
    UploadProjectDocuments,
    Autocomplete,
    BIcon,
    BIconThreeDotsVertical,
    BIconXCircle,
    BIconPlus,
    FileUpload
  },

  props: ['role', 'profile', 'goBack'],

  data() {
    return {
      custom_character: '',
      category_name: '',
      step: 1,
      create_pro_estimate: true,
      validate_pro_estimate: false,
      modal_project_name: '',
      modal_category: '',
      modal_building_type: '',
      budget: '',
      building_type: [],
      payment_info: '',
      create_new_project_info: {
        project_estimate_type: "",
        phase_select: [],
      },
      create_project_esti_info: {},
      upload_project_documents: [],

      project_detail_file: [],
      upload_additional_drawings: [],
      upload_additional_photos: [],

      no_data: false
    };
  },

  methods: {
    addCustomBuildingType () {
      this.auto_compelete_list = [];
      this.searchChange(this.custom_character);
    },

    gotoNextTab(){
      if(this.phase_select == '') return
      this.$store.dispatch('app/createProjectStep', { step: this.createProjectStep + 1 })
    },

    goBackTab(){
      this.$store.dispatch('app/createProjectStep', { step: this.createProjectStep - 1 })
    },

    movePage(page_number){
      this.step = page_number;
    },

    removeUploadFile(index) {
      this.uploading_files.splice(index, 1);
    },

    reloadPage(){
      this.$emit('cancelCreate');
      this.$router.push('/dashboard/index');
    },

    gotoDashboard() {
      this.$router.push('/dashboard/index');
    },

    updatePaymentData(value) {
      this.payment_info = value;
    },

    receiveData(value){
      this.create_new_project_info = value;
    },

    emitCreateProjectEstimate(value){
      this.create_project_esti_info = value;
    },

    emitUploadProjectDocuments(value){
      this.upload_project_documents = value;
      this.createProject('save');
    },

    submitProject(value){
      this.upload_project_documents = value;
      this.createProject('submit');
    },

    createProject(action){
      var params = {};
      params.name = this.create_project_esti_info.project_name;
      params.narrative = this.create_project_esti_info.description;
      params.action = action;
      var bt = this.building_type;
      if(!bt.id){
        params.buildingTypeId = null;
        params.buildingTypeName = bt.name;
      }else{
        params.buildingTypeId = this.building_type.id;
        params.buildingTypeName = null;
      }
      params.stateId = this.create_new_project_info.state_select.id;
      params.cityId = this.create_new_project_info.city_select.id;
      params.constructionType = this.create_new_project_info.construction_type;
      params.clientId = this.create_project_esti_info.client.id;
      var bud = this.create_project_esti_info.budget;
      if(bud){
        bud = bud.replaceAll(',','');
      }
      params.budget = bud;
      // TEMP
      //params.feeEstimate = this.create_project_esti_info.feeEstimate;
      params.deliveryMethod = this.create_project_esti_info.delivery_select;
      params.estimateType = this.create_new_project_info.project_estimate_type.toUpperCase();
      if(params.estimateType == "CREATE") {
        let temp = [];
        for (const [key, value] of Object.entries(this.create_new_project_info.start_date)) {
          let item = {};
          item.id = key;
          item.startDate = value;
          item.endDate = this.create_new_project_info.end_date[key];
          temp.push(item);
        }
        params.phases = temp;
      }
      else {
        console.log(params.estimateType);
        console.log(this.create_new_project_info);
        let temp = [];
        let item = {};
        const { phase_select, start_date_validate, end_date_validate } = this.create_new_project_info;
        item.id = phase_select;
        item.startDate = start_date_validate;
        item.endDate = end_date_validate;
        temp.push(item);
        params.phases = temp;
      }
      params.procurementMethod = this.create_project_esti_info.procurement_select;
      let start_date = {}, end_date = {};
      Object.keys(this.create_new_project_info.phase_checks).forEach(key => {
        if (this.create_new_project_info.phase_checks[key]) {
          start_date[key] = this.create_new_project_info.start_date[key];
          end_date[key] = this.create_new_project_info.end_date[key];
        }
      })
      params.drawingsAvailable = this.upload_project_documents.length > 0;
      params.name = this.create_project_esti_info.project_name;
      console.log("params$%#", JSON.stringify(params));
      var projectID = 0;
      new ProjectProxy().createProject(params).then((response) => {
        // upload documents
        projectID = response.id;
        for(var index = 0; index < this.upload_project_documents.length; index++){
          let formData = new FormData();
          formData.append('projectId', projectID);
          formData.append('file', this.upload_project_documents[index].file);
          formData.append("name", this.upload_project_documents[index].name);
          formData.append("type", this.upload_project_documents[index].kind);
          console.log(formData);
          new ProjectProxy().uploadProjectDocument(formData).then((response) => {
            if (response.status == "200") {
              //this.estimatorProfile = response.data;
            }
          }).catch(function(){
          });
        }
        this.$router.push(`/dashboard/myprojects/detail/${projectID}`)
      }).catch(error => {
      })
    },

    searchChange(event){
      console.log("hey changing now");
      if(event == undefined){
        this.category_name = `Undefined`;
      }
      if(this.auto_compelete_list.length > 0){
        for(let i=0; i< this.auto_compelete_list.length; i++){
          if(this.auto_compelete_list[i].name == event){
            this.building_type = this.auto_compelete_list[i];
            this.custom_character = this.building_type.name
            this.category_name = `Category ${this.building_type.category}.${this.building_type.order}`
          }
        }
      }
      else {
        this.category_name = `Undefined`;
        const temp_building_type = {
          category: undefined,
          id: undefined,
          name: this.custom_character,
          order: undefined
        }
        this.building_type = temp_building_type;
      }
    },

    initialSearch(){
      console.log("this is the stroy");
      search("");
    },

    receiveResult(input) {
      return new Promise(resolve => {
        new EstimatorProxy()
          .searchExpertiseSubcategories(input)
          .then(response => {
            const result = response.data;
            resolve(result);
          })
          .catch(e => {});
      });
    },

    async search(input) {
      const results = await this.receiveResult(input);
      const return_data = results.filter(element => {
        return element.name.toLowerCase().startsWith(input.toLowerCase());
      });
      this.auto_compelete_list = return_data;
      let real_data = [];
      for(let i=0 ;i < return_data.length; i++){
        real_data.push(return_data[i].name);
      }
      if(real_data.length == 0){
        this.no_data = true
        real_data.push("No Recorded Building Type");
      }
      else this.no_data = false;
      return real_data;
    },

    goBackToProjects(){
      let userRole = localStorage.getItem('user_role');
      console.log(userRole);
      if(userRole == 6) this.$router.push('/dashboard/index');
      else this.$emit('goback')
    },
  },

  created() {
  },

  watch: {
    budget: function(newValue) {
      const result = newValue
        .replace(/\D/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      this.budget = `$${result}`;
    },
  },

  filters: {
    toWords: function (value) {
      if (!value) return ''
      let result = converter.toWords(value.replace(',' , '').replace('$' , ''));
      return result.charAt(0).toUpperCase() + result.slice(1);
    }
  },
  computed: mapState('app', ['createProjectStep'])
};
</script>

<style scoped>

.table-header {
  background-color: #061831;
  color: white;
  padding: 15px 30px 15px 30px;
  min-width: 1200px !important;
  height: 51px;
}

.content-card {
  margin: 30px;
  background-color: white;
  min-height: 80vh;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  padding: 32px;
}

.round-icon {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  cursor: pointer;
}

.title-font {
  font-weight: 600;
  font-size: 18px;
}


.next-btn-style {
  background-color: #0C2340;
  border-radius: 3px;
  min-width: 150px;
}

.sub-btn-style {
  min-width: 200px;
  background-color: #0C2340;
  border-radius: 5px;
  padding: 8px 8px
}

.cancel-btn-style {
  background-color: white;
  border-color: white;
  color: black;
}

.standard-color {
  background-color:#0C2340
}

.grey-color {
  background-color: #C4C4C4;
}

.create-project-estimate {
  padding: 1% 5%;
}

.project-detail {
  font-size: 0.9em;
  color: black;
  font-weight: 600;
  background-color: #F2F2F2;
  padding: 40px 10px
}

.uploading-file-list-box {
  border: 1px solid #C9C9C9;
  height: 220px;
  overflow: auto;
}

.dialog-btn-style {
  width: 100px;
  border-radius: 3px;
}

.dialog-btn-style1 {
  width: 150px;
  border-radius: 3px;
}

</style>
