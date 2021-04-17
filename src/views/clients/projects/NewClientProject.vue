<template>
  <div class="clientProjects">
    <Navigation/>
    <main class="bg-img content">
        <h4>Projects</h4>
        <hr style="background-color:#ed6d3a; height:4px"/> 
        <b-breadcrumb :items="items"></b-breadcrumb>

        <!-- choose the project type for the estimate -->
        <section class="secWhite" v-show="showChooseProjectType">
            <div class="container text-center">
                <h2 class="title">Choose a Validation method based on your projects status</h2>
                <div class="statusCards d-flex align-items-center justify-content-center">
                    <div @click="selectNewProjectType('CS')" class="singlCard d-flex align-items-center justify-content-center flex-column">
                        <p>Concept Screening</p>
                    </div>                    
                    <div @click="selectNewProjectType('SD')" class="singlCard d-flex align-items-center justify-content-center flex-column">
                        <div class="Cardicon lightBulb"></div>
                        <p>Schematic Design</p>
                    </div>
                    <div @click="selectNewProjectType('DD')"  class="singlCard d-flex align-items-center justify-content-center flex-column">
                        <div class="Cardicon bookIcon"></div>
                        <p>Design Documents</p>
                    </div>
                    <div @click="selectNewProjectType('CD')"  class="singlCard d-flex align-items-center justify-content-center flex-column">
                        <div class="Cardicon docIcon"></div>
                        <p>Construction Documents</p>
                    </div>
                    <div @click="selectNewProjectType('CDB')"  class="singlCard d-flex align-items-center justify-content-center flex-column">
                        <div class="Cardicon editIcon"></div>
                        <p>Construction Documents, Bids, Proposals</p>
                    </div>
                </div>
            </div>
        </section>
        <section class="secWhite" v-show="showChooseBuildingType">
            <div class="container text-left">
                <h3 style="color:#ed6d3a;">Choose Your Project Type</h3>
                <select size="10" id="projectExperience" v-model="newProjectEstimate.buildingTypeId" name="buildingTypeId">
                    <optgroup v-for="category in categories" :label="category.title" :key="category.title + '1'">
                    <option v-for="buildingType in category.buildingTypes" :value="buildingType.id" v-text="buildingType.name" :key="buildingType.id + '1'"></option>
                </optgroup>
                </select> 
            </div>
            <!--<div class="container text-left">
                <h3 style="color:#ed6d3a;">Private or Government Project</h3>
                <div>
                    <input type="radio" id="projectTypeP" value="P" v-model="newProjectEstimate.projectType">
                    <label for="projectTypeP">Private</label>
                </div>
                <div>
                    <input type="radio" id="projectTypeG" value="G" v-model="newProjectEstimate.projectType">
                    <label for="projectTypeG">Government</label>
                </div>                    
            </div>-->
            <div class="container text-left">
                <h3 style="color:#ed6d3a;">Budget in U.S. Dollars</h3>
                <div>
                    <input id="budget" v-on:input="estimateBudgetChange()" v-model="newProjectEstimate.budget">
                    <label for="budget"> &nbsp;(numbers only)</label>
                </div>                 
            </div>
            <div class="container text-left">
                <h4 style="color:#ed6d3a;">{{budgetString}}</h4>               
            </div>                         
            <br/>
            <button @click="checkEstimateForm" class="btn btn-success">Create New Project</button>  
            <!--<button @click="checkEstimateForm" class="btn btn-success">Get Estimate</button>-->
    <!--
            <div v-if="showResponse == true"> 
                <br/>
                <hr/>
                <div v-if="projectEstimate !=null">
                    <div>
                        <div v-if="projectEstimate.phaseEstimate.phase.shortName == 'CS'">
                            <span><strong>Fee Estimate for Concept Screening:</strong> {{projectEstimate.phaseEstimate.feeString}}</span> 
                        </div> 
                    </div>                        
                    <div>
                        <div v-if="projectEstimate.phaseEstimate.phase.shortName == 'SD'">
                            <span><strong>Fee Estimate for Schematic Design:</strong> {{projectEstimate.phaseEstimate.feeString}}</span> 
                        </div> 
                    </div>
                    <div>
                        <div v-if="projectEstimate.phaseEstimate.phase.shortName == 'DD'">
                            <span><strong>Fee Estimate for Design Documents:</strong> {{projectEstimate.phaseEstimate.feeString}}</span> 
                        </div> 
                    </div>
                    <div>
                        <div v-if="projectEstimate.phaseEstimate.phase.shortName == 'CD'">
                            <span><strong>Fee Estimate for Construction Documents:</strong> {{projectEstimate.phaseEstimate.feeString}}</span> 
                        </div> 
                    </div>
                    <div>
                        <div v-if="projectEstimate.phaseEstimate.phase.shortName == 'CDB'">
                            <span><strong>Fee Estimate for Construction Documents, Bids, Proposals:</strong> {{projectEstimate.phaseEstimate.feeString}}</span> 
                        </div> 
                    </div>

                    <br/>
                    <div>
                        <input type="radio" id="feeActionA" value="A" v-model="feeAction">
                        <label for="feeActionA">Accept</label>
                    </div>
                    <div>
                        <input type="radio" id="feeActionN" value="G" v-model="feeAction">
                        <label for="feeActionN">Negotiate</label>
                    </div>                                              
                    
                    <button @click="clearEstimate()" class="btn btn-success">Clear Form</button> &nbsp; 
                    <button @click="createNewProject()" class="btn btn-success">Create New Project</button>                                                                           
                </div>
            </div> 
            -->            
        </section>       

        <section class="secWhite secValidate">
            <div v-show="showCreateProject" class="container text-left"> <!--v-if show -->
                <div class="form-group">
                    <label>Name</label>
                    <input v-model="newProject.name" type="text" class="form-control" placeholder="Name" />
                </div>
                <div class="form-group">
                    <label>Narrative</label>
                    <textarea class="form-control narrative-height" rows="4" v-model="newProject.narrative"/>
                </div> 
                <div class="form-group">
                    <label>Building Type</label>
                    <select disabled class="form-control" v-model="newProject.buildingTypeId">
                        <option v-for="buildingType in this.buildingTypes" v-bind:value="buildingType.id">
                            <template v-if="buildingType.order >= 10">
                                {{ buildingType.category + '.' + buildingType.order + '&nbsp;&nbsp;&nbsp;' +  buildingType.name }}
                            </template>
                            <template v-if="buildingType.order < 10">
                                {{ buildingType.category + '.' + buildingType.order + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +  buildingType.name }}
                            </template>
                        </option>
                    </select>
                </div>
                <div class="row">
                        <div class="col-6">
                        <div class="form-group">
                            <label>Budget </label>&nbsp;
                            <input disabled v-model="budgetString" class="form-control"/>
                        </div>
                        <div class="form-group">
                            <label> Start Date </label>
                            <date-picker v-model="newProject.dateStart" lang="en" class="pull-right" />
                        </div>                               
                        <div class="form-group">
                            <label>Procurement Method</label>
                            <select v-model="newProject.procurementMethod" class="form-control">
                                <option v-for="procurementMethod in $store.state.project.procurementMethods" v-bind:value="procurementMethod.key">{{procurementMethod.value}}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Estimate Type</label>
                                <select disabled v-model="newProject.projectStatusId" class="form-control">
                            <option v-for="projectStatus in projectStatuses" v-bind:value="projectStatus.id">{{projectStatus.name}}</option>
                            </select>
                        </div>
                        <div class="form-group" v-if="newProject.buildingTypeId == airportBuildingTypeId">
                            <label>Project Scope</label>
                            <select v-model="newProject.projectScope" class="form-control">
                                <option v-for="projectScope in $store.state.project.projectScopes" v-bind:value="projectScope.key">{{projectScope.value}}</option>
                            </select>
                        </div>
                        </div><!-- end of left column -->
                        <div class="col-6">
                        <div class="form-group">
                            <label> Drawings Available </label>
                            <select v-model="newProject.drawingsAvailable" class="form-control">
                            <option v-for="booleanOption in $store.state.project.booleanOptions" v-bind:value="booleanOption.key">{{booleanOption.value}}</option>
                            </select>                              
                        </div>                             
                        <!--<div class="form-group">
                            <label>Total Square Feet</label>
                            <input v-model="newProject.totalSquareFeet" v-on:change="totalSquareFeetChange()" type="text" 
                                class="form-control" placeholder="Total Square Feet" />                              
                        </div>-->
                        <div class="form-group">
                            <label>End Date</label>
                            <date-picker v-model="newProject.dateEnd"  lang="en" class="pull-right"/> 
                        </div>
                        <!--<div class="form-group">
                            <label>Estimate Type</label>
                            <select v-model="newProject.estimateType" class="form-control">
                                <option v-for="estimateType in $store.state.project.estimateTypes" v-bind:value="estimateType.key">{{estimateType.value}}</option>
                            </select>
                        </div>-->
                        <div class="form-group">
                            <label> Delivery Method</label>
                            <select v-model="newProject.deliveryMethod" class="form-control">
                                <option v-for="deliveryMethod in $store.state.project.deliveryMethods" v-bind:value="deliveryMethod.key">{{deliveryMethod.value}}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>State</label>
                            <select v-model="newProject.state" class="form-control">
                                <option v-for="state in $store.state.project.states" v-bind:value="state.key">{{state.value}}</option>
                            </select>
                        </div>
                    </div><!-- end of right column -->                  
                    <div class="modal-footer">
                        <button
                          class="btn btn-success"
                          @click="createProject();"
                          v-bind:disabled="newProject.name == null || newProject.budget == null || newProject.dateEnd == null || newProject.dateStart == null || newProject.deliveryMethod == null || newProject.drawingsAvailable == null  || newProject.procurementMethod == null || newProject.projectStatusId == null || newProject.buildingTypeId == null || newProject.state == null ">
                          Create
                        </button>
                        <button @click="cancel();" class="btn btn-danger">Cancel</button>
                    </div><!-- end of modal-footer -->                         
                </div><!-- end row -->
            </div>  <!-- end v-if show -->      
		</section>
        <section class="secWhite" v-show="showUploadDocuments">
            <UploadProjectFiles v-bind:showDelete='showDelete' ref="uploadProjectFiles"/>                    
            <br/>
            <button @click="finishDocuments" class="btn btn-success">Finish</button>           
        </section>         
        <div class="container text-left alert-danger">
            <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                <li v-for="(error, idx) in errors" :key="idx">{{ error }}</li>
                </ul>
            </p> 
        </div>          
	</main>
    <footer>
        <div class="container text-center">
            <a href="#" title="">
                <img src="~@/assets/img/logoWhite.png" alt="">
            </a>
            <p>Copyright, 2019 Construction Check. All Rights Reserved.</p>
        </div>
    </footer>       
	</div> 
</template>

<script>
	import Vue from 'vue';
    import ProjectProxy from '@/proxies/ProjectProxy.js';
    import Navigation from '@/components/Navigation.vue';
    import DatePicker from 'vue2-datepicker';
    import NumberUtil from '@/utils/NumberUtil.js'; 
    import UploadProjectFiles from '@/components/UploadProjectFiles.vue';
    
    export default {
        name: "clientProjects",
        data() {
            return {
                errors: [],// used in child Component UploadProjectFiles
                showDelete: false,              
                showCreateProject:false,
                showUploadDocuments:false,
                showResponse: false,
                showChooseProjectType:true,
                showChooseBuildingType: false,
                showRemovalConfirmationModal: false,
                projectId: null,
                feeAction:'A',
                budgetString:'',
                projects: [],
                categories: [],
                newProject:{},
                buildingTypes: [],
                projectStatuses: [],
                projectBuildingType: '',
                projectEstimate: null,
                airportBuildingTypeId: 12,
                newProjectEstimate:{
                    buildingTypeId:'',
                    projectType:'P',
                    budget:'',
                    phase:'',
                },
                items: [
                    {
                        text: 'Client Home',
                        to: { name: 'clientHome' }
                    },
                    {
                        text: 'New Project',
                        active: true
                    }
                ],           
            }
        },
        methods: {
            getEstimate: function (e){
                this.showResponse = false;
                var params = this.newProjectEstimate;
                new ProjectProxy().getEstimate(params).then((response) => {
                    // JSON responses are automatically parsed.
                    this.projectEstimate = response;
                    this.createNewProject();
                })
                .catch(e => {
                    this.errors.push(e)
                })            
            },  
            clearEstimate(){
                this.newProjectEstimate.buildingTypeId = '';
                this.newProjectEstimate.phase = '';
                this.newProjectEstimate.budget = '';
                //this.newProjectEstimate.projectType = 'P';
                this.showChooseProjectType = true;
                this.showChooseBuildingType = false;   
                this.feeAction = "A";             

            },
            createNewProject(){
                this.showChooseProjectType = false;
                this.showCreateProject = true;
                this.showChooseBuildingType = false;
                this.showUploadDocuments = false;
                this.newProject.budget = this.newProjectEstimate.budget;
                this.newProject.feeEstimate = this.projectEstimate.phaseEstimate.fee;
                this.newProject.buildingTypeId = this.newProjectEstimate.buildingTypeId;
                this.newProject.feeAction = this.feeAction;
                this.newProject.projectStatusId = this.projectEstimate.phaseEstimate.phase.id;
                this.newProject.phaseId = this.projectEstimate.phaseEstimate.phase.id;
            },
            cancel(){
                this.showChooseProjectType = true;
                this.showChooseBuildingType = false; 
                this.showCreateProject = false;
                this.showUploadDocuments = false;
            },  
            finishDocuments(){
                Vue.router.push({
                    name: 'report.show',
                    params: { project_id: this.projectId }
                });
            },        
            checkEstimateForm: function (e) {
                var noErrors = true;
                this.errors = [];
                if (!this.newProjectEstimate.budget) {
                    this.newProjectEstimate.budget = 0;
                    //this.errors.push('Budget required.');
                    //noErrors = false;
                }else{
                    // check budget for numbers only
                    if(!this.isNumeric(this.newProjectEstimate.budget)){
                        this.errors.push('Budget requires numbers only.');
                        noErrors = false;
                    }
                }
                if (!this.newProjectEstimate.buildingTypeId) {
                    this.errors.push('Category required.');
                    noErrors = false;
                }
                if (!this.newProjectEstimate.phase) {
                    this.errors.push('Select at least one phase to estimate.');
                    noErrors = false;
                }

                if(noErrors){
                    this.getEstimate();
                    return true;
                }else{
                    e.preventDefault();
                }
            },
            isNumeric: function (n) {
                return !isNaN(parseFloat(n)) && isFinite(n);
            },            
            selectNewProjectType(val){
                this.newProjectEstimate.phase = val;
                this.showChooseProjectType = false;
                this.showChooseBuildingType = true;
            }, 
            selectProjectType(){
                this.showChooseProjectType = false;
            },
            fetchProjectStatuses() {
                let url = "/api/projects/info/status";
                let conf = {};

                this.isLoading = true;
                Vue.$http.get(url, conf)
                    .then((response) => {
                    this.projectStatuses = response.data;
                    })
                    .catch((error) => {
                        console.log('error fetcihing status');
                        console.log(error);
                    })
                    .finally( () => {
                        this.isLoading = false;
                    });
            },
            fetchBuildingTypesHelper() {
                new ProjectProxy().buildingTypesHelper()
                .then((response) => {
                    this.categories = response;
                })
                .catch((error) => {
                    this.$notify({
                    group: 'notify',
                    type: 'error',
                    title: 'Error occurred',
                    text: 'Error occurred while getting building types',
                    duration: 5000,
                    speed: 1000,
                    })
                })
                .finally( () => {
                });      
            },            
            fetchBuildingTypes() {
                new ProjectProxy().buildingTypes()
                .then((response) => {
                    this.buildingTypes = response;
                })
                .catch((error) => {
                    this.$notify({
                    group: 'notify',
                    type: 'error',
                    title: 'Error occurred',
                    text: 'Error occurred while getting building types',
                    duration: 5000,
                    speed: 1000,
                    })
                })
                .finally( () => {
                });      
            },
            budgetChange() {
                this.newProject.budget = NumberUtil.numberFormat(NumberUtil.parseCommaFloat(this.newProject.budget));
                if (this.newProject.budget == 'NaN') {
                    debugger;
                    this.newProject.budget = '';
                }
            },
            estimateBudgetChange(){
               this.budgetString = NumberUtil.currencyFormatter(this.newProjectEstimate.budget);
            },
            totalSquareFeetChange() {
                this.newProject.totalSquareFeet = NumberUtil.numberFormat(NumberUtil.parseCommaFloat(this.newProject.totalSquareFeet));
                if (this.newProject.totalSquareFeet == 'NaN') {
                    this.newProject.totalSquareFeet = '';
                }
            },
            createProject() {
                let url = "/api/projects/create_project";
                let conf = {};

                // validate budget and total square feet
                if(this.newProject.budget){
                    this.newProject.budget = this.newProject.budget.replace(/,/g, '');
                }
                if (isNaN(this.newProject.budget)) {
                    this.$notify({
                        group: 'notify',
                        type: 'error',
                        title: 'Error occurred',
                        text: 'Please input Number for budget!',
                        duration: 5000,
                        speed: 1000,
                    });

                    return false;
                }
/*
                if(this.newProject.totalSquareFeet){
                    this.newProject.totalSquareFeet = this.newProject.totalSquareFeet.replace(/,/g, '');
                    if (isNaN(this.newProject.totalSquareFeet)) {
                        this.$notify({
                            group: 'notify',
                            type: 'error',
                            title: 'Error occurred',
                            text: 'Please input Number for total square feet!',
                            duration: 5000,
                            speed: 1000,
                        });

                        return false;
                    }                    
                }
*/

                if (this.newProject.dateStart > this.newProject.dateEnd) {
                    this.$notify({
                        group: 'notify',
                        type: 'error',
                        title: 'Error occurred',
                        text: 'Please Select correct dates!',
                        duration: 5000,
                        speed: 1000,
                    });

                    return false;
                }

            if (this.newProject.buildingTypeId == null) {
                this.$notify({
                    group: 'notify',
                    type: 'error',
                    title: 'Error occurred',
                    text: 'Please Select building type!',
                    duration: 5000,
                    speed: 1000,
                });

                return false;
            }

            let params = this.newProject;
            this.isLoading = true;
            this.showChooseProjectType = false;
            this.showCreateProject = false;
            this.showChooseBuildingType = false;            
            // create the project
            Vue.$http.post(url, params, conf)
                .then((response) => {
                this.showModal = false;
                this.projectId = response.data.id;
                if(this.newProject.drawingsAvailable){
                    this.showUploadDocuments = true;
                }else{
                    // no documents, proceed
                    this.showUploadDocuments = false;
                    Vue.router.push({
                        name: 'report.show',
                        params: { project_id: response.data.id }
                    });
                }
                this.$refs.uploadProjectFiles.setProjectId(this.projectId);
                this.$notify({
                    group: 'notify',
                    type: 'success',
                    title: 'Successfully created',
                    text: 'Project created successfully!',
                    duration: 5000,
                    speed: 1000,
                });
                })
                .catch((error) => {
                this.$notify({
                    group: 'notify',
                    type: 'error',
                    title: 'Error occurred',
                    text: 'Error occurred while creating project',
                    duration: 5000,
                    speed: 1000,
                });
                })
                .finally( () => {
                this.isLoading = false;
                }); 
            },
/* TEMP            
            handleFileUpload() {
                this.file = this.$refs.file.files[0];
            }, 
        uploadFile() {
          if (this.file == null) {
            this.$notify({
                group: 'notify',
                type: 'error',
                title: 'Error occurred',
                text: 'Please select file to upload',
                duration: 5000,
                speed: 1000,
              });

            return;
          }
          let params = new FormData();
          params.append('file', this.file);
          params.append('projectId', this.currentProjectId);
          var options = { headers: { 'Content-Type': 'multipart/form-data' } };
          this.isLoading = true;
          this.fileProxy.upload(params, options)
            .then((response) => {
              this.$notify({
                group: 'notify',
                type: 'success',
                title: 'Successfully uploaded',
                text: 'File uploaded successfully!',
                duration: 5000,
                speed: 1000,
              });
              this.file = null;
              this.getFiles();
            })
            .catch((error) => {
              this.$notify({
                group: 'notify',
                type: 'error',
                title: 'Error occurred',
                text: 'Error occurred while uploading file',
                duration: 5000,
                speed: 1000,
              });
            })
            .finally( () => {
              this.isLoading = false;
            });
        }, 
        getFiles() {
          this.isLoading = true;
          this.fileProxy.all()
            .then((response) => {
              this.files = response;

              this.$notify({
                group: 'notify',
                type: 'success',
                title: 'Successfully retrieved files',
                text: 'Retrieved files successfully',
                duration: 5000,
                speed: 1000,
              });
            })
            .catch((error) => {
              this.$notify({
                group: 'notify',
                type: 'error',
                title: 'Error occurred',
                text: 'Error occurred while retrieving files',
                duration: 5000,
                speed: 1000,
              });
            })
            .finally(() => {
              this.isLoading = false;
            });
        }, 
        downloadFile(file) {
          const options = { responseType: 'blob' };
          this.fileProxy.download(file.id, options)
            .then((response) => {
              if (!window.navigator.msSaveOrOpenBlob) {
                const url = window.URL.createObjectURL(new Blob([response]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', file.fileName);
                document.body.appendChild(link);
                link.click();
              } else {
                // BLOB FOR EXPLORER 11
                const url = window.navigator.msSaveOrOpenBlob(new Blob([response]), file.fileName);
                const link = document.createElement('a');
                link.setAttribute('download', file.fileName);
                document.body.appendChild(link);
                link.click();
              }
            });
        },
        deleteFile() {
          this.isLoading = true;
          this.fileProxy.destroy(this.currentFile.id)
            .then((response) => {
              this.$notify({
                group: 'notify',
                type: 'success',
                title: 'Successfully deleted files',
                text: 'Deleted file successfully',
                duration: 5000,
                speed: 1000,
              });
              this.getFiles();
            })
            .catch((error) => {
              this.$notify({
                group: 'notify',
                type: 'error',
                title: 'Error occurred',
                text: 'Error occurred while deleting file',
                duration: 5000,
                speed: 1000,
              });          
            })
            .finally(() => {
              this.showRemovalConfirmationModal = false;
              this.isLoading = false;
            });
        },
        removeConfirmationDialog(file) {
          this.currentFile = file;
          this.showRemovalConfirmationModal = true;
        }, */                                                              
        },
        components: { 
            'Navigation': Navigation,
            'UploadProjectFiles': UploadProjectFiles,
            DatePicker,
        },
        mounted() {
            //this.fetchProjects();
            this.fetchProjectStatuses();
            this.fetchBuildingTypes();  
            this.fetchBuildingTypesHelper();
        }                
    };    
</script>