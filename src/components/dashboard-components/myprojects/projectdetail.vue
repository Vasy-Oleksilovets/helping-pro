<template>
    <div class="project-detail">
      <DashHeaderCreateProject :goBackToProjects="goBackToProjects" :role="role"/>
      <div style="margin: 30px">
        <div style="display: flex">
          <b-btn style="margin-left: 0" @click="changePageStep('details')" :class="page_step == 'details'? 'active-tab': 'unactive-tab'">
            <router-link :to="{path: `/dashboard/myprojects/detail/${project_id}` }">Details</router-link>
          </b-btn>
          <b-btn @click="changePageStep('drawings')" :class="page_step == 'drawings'? 'active-tab': 'unactive-tab'">
            <router-link :to="{path: `/dashboard/myprojects/detail/${project_id}/drawings` }">Drawings</router-link>
          </b-btn>
          <b-btn @click="changePageStep('documents')" :class="page_step == 'documents'? 'active-tab': 'unactive-tab'">
            <router-link :to="{path: `/dashboard/myprojects/detail/${project_id}/documents` }">Documents</router-link>
          </b-btn>
          <b-btn @click="changePageStep('fee')" :class="page_step == 'fee'? 'active-tab': 'unactive-tab'">
            <router-link :to="{path: `/dashboard/myprojects/detail/${project_id}/feesubmission` }">Fee</router-link>
          </b-btn>
          <b-btn @click="changePageStep('basis')" :class="page_step == 'basis'? 'active-tab': 'unactive-tab'">
            <router-link :to="{path: `/dashboard/myprojects/detail/${project_id}/basisestimate` }">Basis of Estimate</router-link>
          </b-btn>
          <b-btn @click="changePageStep('estimate')" :class="page_step == 'estimate'? 'active-tab': 'unactive-tab'">
            <router-link :to="{path: `/dashboard/myprojects/detail/${project_id}/estimates/${project_id}` }">Estimate</router-link>
          </b-btn>  
          <b-btn @click="changePageStep('takeoff')" :class="page_step == 'takeoff'? 'active-tab': 'unactive-tab'">
            <router-link :to="{path: `/dashboard/myprojects/detail/${project_id}/estimates/${project_id}` }">Take-Off</router-link>
          </b-btn>
          <b-btn @click="changePageStep('calculate')" :class="page_step == 'calculate'? 'active-tab': 'unactive-tab'">
            <router-link :to="{path: `/dashboard/myprojects/detail/${project_id}/calculatefee` }">Calculate Fee</router-link>
          </b-btn>
          <b-btn @click="changePageStep('summary')" :class="page_step == 'summary'? 'active-tab': 'unactive-tab'">
            <router-link :to="{path: `/dashboard/myprojects/detail/${project_id}/summary` }">Summary</router-link>
          </b-btn>
          <b-dropdown v-if="is_export=='estimates'" id="dropdown-1" text="Export" class="ml-3">
            <template v-slot:button-content>
              <b-icon icon="download" scale="1" class="mr-2"></b-icon><span>Export</span>
            </template>
            <b-dropdown-item @click="createPDF">PDF Document(.pdf)</b-dropdown-item>
            <b-dropdown-item>
              <download-csv :data="json_data" name="filename.csv">CSV Document(.csv)</download-csv>
            </b-dropdown-item>
            <b-dropdown-item>Preview</b-dropdown-item>
          </b-dropdown>
          <b-dropdown v-if="is_export=='basisestimate'" id="dropdown-1" text="Export" class="ml-3">
            <template v-slot:button-content>
              <b-icon icon="download" scale="1" class="mr-2"></b-icon><span>Export</span>
            </template>
            <b-dropdown-item @click="createPDF">PDF Document(.pdf)</b-dropdown-item>
            <b-dropdown-item>Preview</b-dropdown-item>
          </b-dropdown>
          <b-btn v-if="role === 7 || role === 8" class="btn-style1 ml-3" style="background-color: #D7844B">Submit to Client</b-btn>
        </div>
        <div v-if="show_comments_icon" @click="openComments" class="comments-style" role="button">
          <span>View comments</span>
          <img role="button" alt="comment icon" class="ml-2" src="~@/assets/img/small-icons/comments.png"/>
        </div>
      </div>

      <!--Document Part -->
      <div class="content">
        <router-view :role='role' :project_id="project_id"></router-view>
      </div>
      <!-- Add New Document Modal -->
      <b-modal id="modal-center" size="xl">
        <template v-slot:modal-header="{ close }">
          <!-- Emulate built in modal header close button action -->
          <div class="d-flex align-items-center justify-content-between w-100 custom-border-bottom pb-2">
            <div class="font-weight-bold ml-3">Add new document</div>
            <img @click="close()" role="button" alt="image" src="~@/assets/img/small-icons/small-modal-remove.png"/>
          </div>
        </template>
        <div class="text-center project-detail" style="position: relative">
          <div class="mt-2">
            <img role="button" alt="File Default Image" src="~@/assets/img/small-icons/upload-avatar-default.png"/>
          </div>
          <div class="mt-4">Drag and drop document files to upload</div>
          <file-upload style="position: absolute; top: 0; left: 44%; width: 130px; height: 140px" accept="image/*" v-model="files"></file-upload>
        </div>
        <template v-slot:modal-footer="{ ok }">
          <div class="text-center mb-4" style="margin-left: auto; margin-right: auto;">
            <b-btn class="dialog-btn-style first-btn-style" @click="ok()">SELECT FILES</b-btn>
          </div>
        </template>
      </b-modal>
      <!-- End Document Part -->
    </div>
</template>
<script>
import FileUpload from 'vue-upload-component/dist/vue-upload-component.part.js';
import { BIcon, BIconCaretDownFill, BIconDownload } from 'bootstrap-vue'
import Drawing from './drawing';
import EventBus from '../../../plugins/event-bus';
import store from "@/store";
import jspdf from 'jspdf';
import downloadCsv from 'vue-json-csv'
import DashHeaderDetail from '../dash-header-detail'
import DashHeaderCreateProject from '../dash-header-create-project'

export default {
  name: 'ProjectDetail',
  components: {
    FileUpload,
    Drawing,
    BIcon,
    BIconDownload,
    downloadCsv,
    DashHeaderDetail,
    DashHeaderCreateProject
  },
  props: ['role'],
  data() {
    return {
      documents: [
        {
          id: 0,
          file_name: 'Document 1',
          file_type: 'jpg',
          file_size: 10,
          data_updated: '01/02/2020',
          uploaded_by: 'Roger Williams',
        },
        {
          id: 1,
          file_name: 'Document 2',
          file_type: 'jpg',
          file_size: 10,
          data_updated: '01/02/2020',
          uploaded_by: 'Roger Williams',
        },
        {
          id: 2,
          file_name: 'Document 3',
          file_type: 'png',
          file_size: 10,
          data_updated: '01/02/2020',
          uploaded_by: 'Roger Williams',
        },
        {
          id: 3,
          file_name: 'Document 4',
          file_type: 'png',
          file_size: 10,
          data_updated: '01/02/2020',
          uploaded_by: 'Roger Williams'
        },
      ],
      temp_documents: [],
      selected: [],
      check_all: false,
      files: [],
      file_type_list: [],
      step: 0,
      editable: [],
      show_comments_icon: false,
      project_id: '',
      is_export: "",
      json_data: [
        {
          'name': 'Tony Peña',
          'city': 'New York',
          'country': 'United States',
          'birthdate': '1978-03-15',
          'phone': {
            'mobile': '1-541-754-3010',
            'landline': '(541) 754-3010'
          }
        },
        {
          'name': 'Thessaloniki',
          'city': 'Athens',
          'country': 'Greece',
          'birthdate': '1987-11-23',
          'phone': {
            'mobile': '+1 855 275 5071',
            'landline': '(2741) 2621-244'
          }
        }
      ],
      page_step: 'details'
    };
  },
  methods: {
    //Download All function, check all the items
    toggle_All(checked) {
      const download_list = this.documents.map(document => {
        return document.id;
      });
      this.selected = checked ? download_list : [];
    },
    
    removeDuplicates(data) {
      return [...new Set(data)];
    },
    //Filter data with file type

    filter_by_file_type(type) {
      this.documents = this.temp_documents.filter(
        document => document.file_type == type
      );
    },

    show_all_type_data() {
      this.documents = this.temp_documents;
    },

    view_tags(type) {
      this.step = type;
    },

    editFileName(index) {
      this.editable[index] = !this.editable[index];
      this.$forceUpdate();
    },

    openComments() {
      store.dispatch("comment/initAllComments", {
        subProjectId: this.$route.params.subproject_id,
      });
      EventBus.$emit('open_comments');
    },

    createPDF(){
      let pdfName = 'test';
      var doc = new jspdf ();
      doc.text("Dummy Data", 10, 10);
      doc.save(pdfName + '.pdf');
    }, 

    goBackToProjects() {
      this.$router.push('/dashboard/createproject');
    },

    changePageStep(param){
      this.page_step = param;
    }
  },
  created() {

    this.project_id = this.$route.params.project_id;

    const temp_list_type = this.documents.map(document => {
      return document.file_type;
    });
    this.file_type_list = this.removeDuplicates(temp_list_type);
    this.temp_documents = this.documents;
    //Initialize Editable array with false
    for (var i = 0; i < this.documents.length; i++) {
      this.editable[i] = false;
    }
  },
  watch: {
    $route(to, from) {
      var currentUrl = window.location.pathname;
      if (currentUrl.includes('estimates')){
        this.show_comments_icon = true;
        this.is_export = "estimates";
      }
      else {
        this.show_comments_icon = false;
        this.is_export = "other";
      }

      if(currentUrl.includes('basisestimate')) this.is_export = "basisestimate";

      //If router is changed project_id should be changed
      if(this.$route.params.project_id){
        this.project_id = this.$route.params.project_id;
      }
    },
  },
  mounted: function() {
    var currentUrl = window.location.pathname;
    if (currentUrl.includes('estimates')) this.show_comments_icon = true;
  },
};
</script>
<style scoped>
.custom-table-content {
  padding: 15px 20px 15px 0px;
  padding-right: 20px;
}
.project-detail {
  font-size: 0.9em;
  color: black;
  font-weight: 600;
}
.proj-det-modal {
  position: absolute;
  background-color: black;
}
.project-detail {
  font-weight: 600;
}
.sub-menu-button {
  background-color: #061831;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.active-tab {
  min-width: 98px;
  height: 32px;
  padding: 9px 12px;
  border-radius: 8px;
  background-color: #0071e3;
  border-color: #0071e3;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 13px;
}

.unactive-tab {
  min-width: 98px;
  height: 32px;
  padding: 9px 12px;
  border-radius: 8px;
  border: solid 1px #dfe0eb;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 13px;
}

.active-tab a {
  font-family: Montserrat;
  font-size: 11px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.5px;
  text-align: center;
  color: #ffffff;
  text-decoration: none;
}

.unactive-tab a {
  min-width: 74px;
  height: 14px;
  font-family: Montserrat;
  font-size: 11px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.5px;
  text-align: center;
  color: #7c7e89;
  text-decoration: none;
}

.dialog-btn-style {
  padding: 7px 40px 7px 40px;
  max-width: 200px;
  border-radius: 8px;
  border-width: 0;
}
.second-btn-style {
  background-color: #83afdb;
}
.first-btn-style {
  background-color: #19293e;
}
.custom-table-header {
  background-color: #0c2340;
  color: white;
  padding: 10px 20px 10px 0px;
  min-width: 1065px !important;
}
.grey-color {
  background-color: #e7e7e7;
}
.file-name-change {
  font-size: 0.9em;
}
.custom-control-inline {
  margin-right: 0rem !important;
}
.btn-active-style {
  border-radius: 5px;
  border-width: 0;
  background-color: #0c2340;
  color: white;
}
.btn-nonactive-style {
  border-radius: 5px;
  border-width: 0;
  background-color: #c9c9c9;
  color: white;
}
.each_row {
  min-width: 1065px !important;
}
.custom-border-bottom {
  border-bottom: 1px solid #c9c9c9;
}
.file_name_input_style {
  width: 150px;
  border: 1px solid white;
}
.comments-style {
  color: white;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 2em;
}

@media (max-width: 800px) {
  .table-all {
    overflow: auto;
    width: auto;
  }
  .sub-menu-button {
    background-color: #061831;
    display: block;
    width: 100%;
  }
  .comments-style {
    color: white;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 1em;
  }
}
</style>
