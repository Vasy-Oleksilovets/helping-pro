<template>
  <div class="adminEditProject">
    <Navigation />
    <main class="bg-img content">
        <hr style="background-color:#ed6d3a; height:4px" />
        <b-breadcrumb :items="items"></b-breadcrumb>
        <section class="secWhite secValidate">
            <b-tabs content-class="mt-3">
                <b-tab id="projectTab" title="Project Details" active>
                    <div class="container text-center">
                        <div class="container text-left">
                            <div v-if="project != null">
                                <div v-if="companyName"><strong>Account: {{companyName}}</strong></div><br/>
                                <form @submit="checkForm">
                                    <label for="projectName">Project Name: </label>&nbsp;
                                    <input id="projectName" type="text" v-model="project.name"/><br/>
                                    <label for="budget">Budget: </label>&nbsp;
                                    <input id="budget" v-on:input="budgetChange()" type="text" v-model="project.budget"/><br/>
                                    <div class="container text-left">
                                        <h5 style="color:#ed6d3a;">{{budgetString}}</h5>               
                                    </div>                                    
                                    <label for="feeEstimate">Fee Estimate: </label>&nbsp;
                                    <input id="feeEstimate" v-on:input="feeChange()" type="text" v-model="project.feeEstimate"/><br/> 
                                    <div class="container text-left">
                                        <h5 style="color:#ed6d3a;">{{feeString}}</h5>               
                                    </div>                                    
                                    <label for="sqFeet">Total Square Feet: </label>&nbsp;
                                    <input id="sqFeet" type="text" v-model="project.totalSquareFeet"/><br/>     
                                    <label for="totNumPages">Total Number of Pages: </label>&nbsp;
                                    <input id="totNumPages" type="text" v-model="project.totalNumPages"/><br/>                                                                     
                                    <span>Release to estimate if the project fee has been paid. Changing from false to true will send the 
                                        project to the cost estimators.</span><br/><br/>
                                    <label for="release">Release to Estimate: </label>&nbsp;
                                    <select id="release" type="text" v-model="project.releaseToEstimate">
                                        <option>true</option>
                                        <option>false</option>
                                    </select>
                                    <div class="form-group">
                                        <label>Narrative</label>
                                        <textarea disabled class="form-control narrative-height" rows="4" v-model="project.narrative"/>
                                    </div>
                                    <div>Building Type: {{buildingTypeName}}</div>
                                    <div>Start Date: {{project.dateStart}}</div> 
                                    <div>End Date: {{project.dateEnd}}</div> 
                                    <div>Drawings Available : {{project.drawingsAvailable}}</div> 
                                    <div>Procurement Method: {{project.procurementMethod}}</div>   
                                    <!--<div>Project Status: {{project.projectStatus.name}}</div> -->
                                    <div>Project Scope: {{project.projectScope}}</div>  
                                    <div>Estimate Type: {{project.estimateType}}</div>  
                                    <div>Delivery Method: {{project.deliveryMethod}}</div> 
                                    <div>State: {{project.state}}</div>             
                                    <br/>                      
                                    <br/>
                                    <b-btn :disabled="saveBtnClicked" variant="success" type="submit">Save Project</b-btn>&nbsp;&nbsp;  
                                    <b-btn type=button @click.prevent="onCancel" >Cancel</b-btn> 
                                </form>
                                <div class="container text-center">
                                    <p>{{message}}</p>
                                </div>                
                            </div>                
                        </div>                                
                    <p></p>
                    </div>
                    <div class="container text-left alert-danger">
                        <p v-if="errors.length">
                            <b>Please correct the following error(s):</b>
                            <ul>
                            <li v-for="(error, idx) in errors" :key="idx">{{ error }}</li>
                            </ul>
                        </p> 
                    </div> 
                </b-tab>
                <b-tab title="Documents">
                    <div v-if="project != null">
                        <UploadProjectFiles v-bind:showSplitPages='showSplitPages' v-bind:showDelete='showDelete' ref="uploadProjectFiles"/>     
                    </div>
                </b-tab>                
                <b-tab title="Sub-Projects">
                    <div v-if="project != null">
                        <button @click="addSubProject()" class="btn btn-success">{{addProjectText}}</button><br/><br/>
                        <div v-show="showAddSubProject">
                          <form @submit.prevent="checkNewForm">
                            <div>Project type: 
                              <select tabindex=14 id="category" v-model="newSubProject.categoryId" name="category">
                                <option v-for="category in categories" :value="category.id" v-text="category.name" :key="category.id + '1'"></option>
                              </select>
                            </div><br/>
                            <div>Number of Pages: <input :maxlength="10" id="numPages" v-model="newSubProject.numberOfPages" type="text" name="numPages"/></div><br/>
                            <div>Estimator Fee: <input :maxlength="10" id="estimatorFee" v-model="newSubProject.estimatorFee" type="text" name="estimatorFee"/></div><br/>
                            <button :disabled="subSaveBtnClicked" type="submit" class="btn btn-success">Save Sub-Project</button><br/><br/>
                          </form>
                        <div class="container text-left alert-danger">
                            <p v-if="newErrors.length">
                                <b>Please correct the following error(s):</b>
                                <ul>
                                <li v-for="(error, idx) in newErrors" :key="idx">{{ error }}</li>
                                </ul>
                            </p> 
                        </div>                           
                        </div>

                        <div v-show="!showAddSubProject" v-for="subProject in subProjects" :key="'SUB'+subProject.id">
                            <div><strong>{{subProject.expertiseCategory.name}}</strong></div>
                            <div>Start Date: {{getSimpleDate(subProject.dateStart)}}</div>
                            <div>End Date: {{getSimpleDate(subProject.dateEnd)}}</div>
                            <div>Page Count: {{subProject.numberOfPages}}</div>
                            <div>Estimator Fee: {{formatCurrency(subProject.estimatorFee)}}</div>
                            <div>Estimator: {{getEstimatorName(subProject)}}</div>
                            <router-link :to="`/adminEditSubProject/${subProject.id}/${projectId}`">
                              <div>
                                <p>Edit Sub-Project</p>
                              </div>
                            </router-link>  

                            <router-link :to="`/dashboard/project-manager/${subProject.id}`">
                              <div>
                                <p>Edit Sub-Project Estimate Lines</p>
                              </div>
                            </router-link>  
                            <hr/>
                        </div>
                    </div>
                </b-tab>
                <b-tab title="Project History">
                  <div class="container text-left">
                    <div v-if="project != null">
                      <div >
                        <table cellpadding="10" border="1">
                          <tr>
                            <th>Timestamp</th><th>Process</th><th>Entry User</th><th>Assigned User</th><th>Comments</th>
                          </tr>
                            <tr v-for="entry in historyEntries" :key="'ENT'+entry.id">
                              <!-- <div>-->
                                  <td>{{getSimpleDateTime(entry.createdAt)}}</td>
                                  <td>{{entry.historyProcess.name}}</td>
                                  <td>{{entry.entryUser.firstName}} {{entry.entryUser.lastName}}</td>
                                  <td>{{entry.assignedUser.firstName}} {{entry.assignedUser.lastName}}</td>
                                  <td>{{entry.comments}}</td>
                              </tr>
                        </table>
                      </div>
                    </div>
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
import NumberUtil from '@/utils/NumberUtil.js'; 
import UploadProjectFiles from '@/components/UploadProjectFiles.vue';

export default {
  name: "estimate",
  data() {
    return {
      showDelete: true,
      showSplitPages: true,
      errors: [],
      newErrors: [],
      historyEntries: [],
      projectId: '',
      project: {},
      showAddSubProject: false,
      categories:[],
      showResults: false,
      budgetString: "",
      feeString:'',
      subProjects:[],
      saveBtnClicked:false,
      subSaveBtnClicked:false,
      addProjectText: 'Add Sub-Project',
      buildingTypeName:'',
      companyName:'',
      newSubProject:{},
      message:'',
      items: [
          {
              text: 'Admin Home',
              to: { name: 'adminHome' }
          },
          {
              text: 'Search Projects',
              to: { name: 'adminSearchProjects' }
          },          
          {
              text: 'Edit Project',
              active: true
          }
      ],       
    };
  },
  methods: {
    addSubProject(){
      this.showAddSubProject = !this.showAddSubProject;
      if(!this.showAddSubProject){
        this.addProjectText = "Add Sub-Project";
      }else{
        this.addProjectText = "Cancel";
      }
    },
    getLink(subproject){
      return "/adminEditSubProject?subprojectId=" + this.subProject.id;
    },
    getProject(){
      new ProjectProxy().find(this.projectId).then((response) => {
          this.project = response.project;
          this.historyEntries = response.historyEntryList;
          this.buildingTypeName = this.project.buildingType.name;
          this.subProjects = this.project.subProjects;
          this.$refs.uploadProjectFiles.setProjectId(this.project.id);
          this.budgetChange();
          this.feeChange();
        })
        .catch(error => {
          this.errors.push(error);
        });
           
    },
    getSubProjects(){
      new ProjectProxy().getSubProjects(this.projectId).then((response) => {
          this.subProjects = response;
        })
        .catch(error => {
          this.errors.push(error);
        });
           
    },  
    getCategories(){
      new ProjectProxy().getExpertiseCategories().then((response) => {
          this.categories = response;
        })
        .catch(error => {
          this.errors.push(error);
        });
           
    }, 
    getSimpleDate: function(val){
      if(val){
        var s = val.split("T");
        return s[0];
      }
      return null;
    } , 
    getSimpleDateTime: function(val){
      if(val){
        var s = val.split("T");
        var t = s[1].split(".");

        return s[0] + " " + t[0];
      }
      return null;
    } ,        
    saveProject(){
        this.message = '';
        new ProjectProxy().saveProject(this.project).then((response) => {
          this.message = "Project Saved!"
        })
        .catch(error => {
          this.errors.push(error);
        });  
    }, 
    saveSubProject(){
        this.message = '';
        this.newSubProject.projectId = this.projectId;
        new ProjectProxy().createSubProject(this.newSubProject).then((response) => {
          this.subProjects = response.project.subProjects;
          this.historyEntries = response.historyEntryList;
          this.message = "Sub-Project Saved!";
          this.addSubProject();
        })
        .catch(error => {
          this.newErrors.push(error);
        });  
    },        
    onCancel(){
        this.$router.push('/adminSearchProjects');
    },    
    checkNewForm: function (e) {
      this.newErrors = [];
      if (!this.newSubProject.numberOfPages) {
          this.newErrors.push('Number of pages required.');
      }else{
          // check budget for numbers only
          if(!this.isNumeric(this.newSubProject.numberOfPages)){
              this.newErrors.push('Number of pages requires numbers only.');
          }
      } 
      if (!this.newSubProject.estimatorFee) {
          this.newErrors.push('Estimator fee required.');
      }else{
          // check budget for numbers only
          if(!this.isNumeric(this.newSubProject.estimatorFee)){
              this.newErrors.push('Estimator fee requires numbers only.');
          }
      } 

      if (!this.newSubProject.categoryId) {
          this.newErrors.push('Project Type required.');
      }else{
          // ensure not duplicate category
          for(var index = 0; index < this.subProjects.length; index++){
            var sub = this.subProjects[index];
              if(sub.expertiseCategory.id == this.newSubProject.categoryId){
                this.newErrors.push('Duplicate Project Type. There can only be one sub-project of each type.');
                break;
              }
          }
      } 

      if(this.newErrors.length == 0){
          this.subSaveBtnClicked = true;
          this.saveSubProject();
          this.newSubProject = {};
          return true;
      }else{
          e.preventDefault();
      }                   
    },    
    checkForm: function (e) {
        this.errors = [];
        if (!this.project.name) {
            this.errors.push('Project name required.');
        }        
        if (!this.project.budget) {
            this.errors.push('Budget required.');
        }else{
            // check budget for numbers only
            if(!this.isNumeric(this.project.budget)){
                this.errors.push('Budget requires numbers only.');
            }
        } 
        if (!this.project.feeEstimate) {
            this.errors.push('Fee estimate required.');
        }else{
            // check budget for numbers only
            if(!this.isNumeric(this.project.feeEstimate)){
                this.errors.push('Fee estimate requires numbers only.');
            }
        } 
        // verify non-duplicate category

        if(this.errors.length == 0){
            this.saveProject();
            return true;
        }else{
            e.preventDefault();
        }
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
    budgetChange(){
      this.budgetString = NumberUtil.currencyFormatter(this.project.budget);
    },
    feeChange(){
      this.feeString = NumberUtil.currencyFormatter(this.project.feeEstimate);
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
    'UploadProjectFiles': UploadProjectFiles,
  },
  computed: {

  },
  created() {
    this.projectId = this.$route.query.pid;
    this.getProject();
    this.getCategories();
  },
};
</script>
