<template>
  <div class="costProViewSubProject">
    <Navigation />
    <main class="bg-img content">
        <hr style="background-color:#ed6d3a; height:4px" />
        <b-breadcrumb :items="items"></b-breadcrumb>
        <section class="secWhite secValidate">
            <b-tabs content-class="mt-3">
                <b-tab id="subprojectTab" title="Sub-Project Details" active>
                    <div class="container text-center">
                        <div class="container text-left">
                            <div v-if="subProject.expertiseCategory != null"><strong>{{subProject.expertiseCategory.name}}</strong></div><br/>

                            <div>Start Date: {{formatDate(dateStart)}} </div><br/>  
                            <div>End Date: {{formatDate(dateEnd)}} </div><br/>          
                            <div>Number of Pages: {{subProject.numberOfPages}}</div><br/>
                            <div>Estimator Fee: {{formatCurrency(subProject.estimatorFee)}}</div><br/>
                            <br/>
                            <button @click="checkNewForm" :disabled="subSaveBtnClicked" class="btn btn-success">Save Sub-Project</button><br/><br/>
                            <br/>

                            <router-link :to="`/costProPastProjects`">
                                <div>
                                <p>Go Back</p>
                                </div>
                            </router-link> 
                        </div>                        
                        <div class="container text-left alert-danger">
                            <p v-if="newErrors.length">
                                <b>Please correct the following error(s):</b>
                                <ul>
                                <li v-for="(error, idx) in newErrors" :key="idx">{{ error }}</li>
                                </ul>
                            </p> 
                        </div>                         
                    </div>
                </b-tab>
                <b-tab title="Documents">
                    <div v-if="subProject != null" id="documentSection" class="container text-left">
                        <h5>Blueprints</h5>
                        <div v-for="document in subProject.subProjectDocuments" :key="document.id">
                            Uploaded: {{document.fileName}} <br/>
                        </div><br/>                     
                    </div>
                </b-tab>                             
            </b-tabs>                                      
        </section>
    </main>
    <footer>
      <div class="container text-center">
        <a href="#" title="">
          <img src="~@/assets/img/logoWhite.png" alt="" />
        </a>
        <p>Copyright, 2019 Construction Check. All Rights Reserved.</p>
      </div>
    </footer>    
  </div>
</template>

<script>
import AdminProxy from '@/proxies/AdminProxy.js';
import ProjectProxy from '@/proxies/ProjectProxy.js';
import Navigation from "@/components/Navigation.vue"; 
import DatePicker from 'vue2-datepicker';
import SearchEstimators from '@/components/SearchEstimators.vue';

export default {
  name: "estimate",
  data() {
    return {
      errors: [],
      newErrors: [],
      subprojectId:'',
      subProject:{},
      dateStart:null,
      dateEnd: null,
      subProjectObj:{},
      showAssign:false,
      project: {},
      subProjects:[],
      file: '',
      subSaveBtnClicked:false,
      message:'',
      items: [
        {
          text: 'Cost Pro Home',
          to: { name: 'costProHome' }
        },
        {
          text: 'Past Projects',
          to: { name: 'costProPastProjects' }
        },        
        {
          text: 'View Sub-Project',
          active: true
        }
      ],       
    };
  },
  methods: {
    checkNewForm: function (e) {
        this.newErrors = [];
        if (!this.subProject.numberOfPages) {
            this.newErrors.push('Number of pages required.');
        }else{
            // check budget for numbers only
            if(!this.isNumeric(this.subProject.numberOfPages)){
                this.newErrors.push('Number of pages requires numbers only.');
            }
        } 
        if (!this.subProject.estimatorFee) {
            this.newErrors.push('Estimator fee required.');
        }else{
            // check budget for numbers only
            if(!this.isNumeric(this.subProject.estimatorFee)){
                this.newErrors.push('Estimator fee requires numbers only.');
            }
        } 
        if(this.dateStart != null && this.dateEnd != null){
            if (this.dateStart > this.dateEnd) {
                this.newErrors.push('Start date is after the end date.');
            }
        }

        if(this.newErrors.length == 0){
            this.subSaveBtnClicked = true;
            this.saveSubProject();
            return true;
        }else{
            e.preventDefault();
        }                   
    },
    handleFileUpload(){
        this.file = this.$refs.uploadFile.files[0];
    },
    submitFile(){
        let formData = new FormData();
        formData.append('uploadFile', this.file);
        formData.append("subProjectId", this.subprojectId);
        new ProjectProxy().uploadSubProjectFiles(formData).then((response) => {
            this.subProject = response.data;
        }).catch(function(){
            console.log('FAILURE!!');
        });
    },    
    deleteFile(id){
        if(confirm("Do you really want to delete this document?")){
            var params = new URLSearchParams();
            params.append('documentId', id);
            params.append('subProjectId', this.subprojectId);
            new ProjectProxy().deleteSubProjectFile(params).then((response) => {
                this.subProject = response.data;
            })
            .catch(e => {
                    this.errors.push("There was an error deleting the file. Please try again.");
            })
        }
    }, 
    openFile(url) {
        var win = window.open(url, '_blank');
        win.focus();
    },        
    saveSubProject(){
        this.message = '';
        this.subProjectObj.id = this.subProject.id;
        this.subProjectObj.numberOfPages = this.subProject.numberOfPages;
        this.subProjectObj.estimatorFee = this.subProject.estimatorFee;
        this.subProjectObj.dateStart = this.dateStart;
        this.subProjectObj.dateEnd = this.dateEnd;
        this.subProjectObj.active = this.subProject.active;       
        new ProjectProxy().saveSubProject(this.subProjectObj).then((response) => {
          this.subProject = response;
          this.subProjectObj = {};
          this.message = "Sub-Project Saved!"
        })
        .catch(error => {
          this.newErrors.push(error);
        });  
    },            
    getSubProject(){
      new ProjectProxy().getSubProject(this.subprojectId).then((response) => {
            this.subProject = response;
            var d = this.subProject.dateStart.split("T");
            var parts = d[0].split('-'); 
            d = this.subProject.dateEnd.split("T");
            this.dateStart = new Date(parts[0], parts[1] - 1, parts[2]); 
            parts = d[0].split('-');
            this.dateEnd = new Date(parts[0], parts[1] - 1, parts[2]);         
        })
        .catch(error => {
          this.errors.push(error);
        });
    },
    isNumeric: function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    },           
    formatCurrency(val){
      if(val){
        return "$" + val.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); 
      }else{
        return '';
      }
    },
    formatDate(val){
        var d = JSON.stringify(val).split("T");
        return d[0].replace("\"", "");
    },
    getEstimatorName(val){
      if(val.estimatorProfile == null){
        return "Unassigned";
      }else{
        return val.estimatorProfile.user.firstName + " " + val.estimatorProfile.user.lastName;
      }
    }       
  }, 
  components: {
    Navigation: Navigation,
    DatePicker,
    'SearchEstimators': SearchEstimators 
  }, 
  created(){
      console.log("enter sub proj");
      this.subprojectId = this.$route.params.subproject_id;
      this.projectId = this.$route.params.project_id;
      this.getSubProject();
  }
}
</script>