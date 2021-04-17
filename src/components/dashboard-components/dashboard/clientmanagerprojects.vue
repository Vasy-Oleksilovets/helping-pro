<template>
  <div class="dash-welcome">
    <div class="row title-text justify-content-between min-height-unset">
      <div class="underline list-header">Projects</div>
      <div>
        <b-btn @click="gotoCreateProject" class="btn-style1 mb-2">Create New Project + </b-btn>
      </div>
    </div>
    <div v-if="projects!==undefined && Object.keys(projects).length > 0" class="project-rect">
      <div v-if="Object.keys(projects).length==0">
        <div class="row no-gutters">
          <b-col cols="12" lg="3" class="card-section">
            <div class="custom-card mt-3">
              <div class="card-content">
                <div class="title-text underline">Create a project</div>
                <div class="title-text-size mt-2">
                  <img src="~@/assets/img/non-active-checker.png" class="mr-2" alt="Non Active Checker"/>
                  <span>Create a project</span>
                </div>
                <div class="title-text-size mt-2 ">
                  <img src="~@/assets/img/non-active-checker.png" class="mr-2" alt="Non Active Checker"/>
                  <span>Edit project details</span>
                </div>
                <div class="title-text-size mt-2 ">
                  <img src="~@/assets/img/non-active-checker.png" class="mr-2" alt="Non Active Checker"/>
                  <span>Submit project</span>
                </div>
                <div class="title-text-size mt-2 ">
                  <img src="~@/assets/img/non-active-checker.png" class="mr-2" alt="Non Active Checker"/>
                  <span>Project approved</span>
                </div>
              </div>
              <div class="row">
                <b-col>
                  <div class="d-flex justify-content-end mt-2 mb-2 mr-2">
                    <b-button class="btn-style" @click="gotoCreateProject">Create Project</b-button>
                  </div>
                </b-col>
              </div>
            </div>
          </b-col>
        </div>
      </div>
      <div v-for="(parentProject, key) in projects" :key="key" class="row grey-underline">
        <b-col v-for="(project, index) in parentProject" v-bind:key="index" class="lg-3" cols="12" sm="6" md="4">
          <div class="row title-text mt-4 no-gutters">Project Name - {{project.name}}  &nbsp;&nbsp; {{project.phaseName}}</div>
          <div class="row no-gutters">
            <b-col class="card-section">
              <div class="custom-card mt-3">
                <div class="card-content">
                  <div v-if="project.projectStatus.toUpperCase()=='CREATED'" class="title-text underline min-height-unset">Finish Setting Up Project</div>
                  <div v-if="project.projectStatus.toUpperCase()=='CONFIRMED'" class="title-text underline min-height-unset">Submit Project</div>
                  <div v-if="project.projectStatus.toUpperCase()=='SUBMITTED'" class="title-text underline min-height-unset">Waiting for approval</div>
                  <div class="title-text-size mt-2">
                    <img v-if="project.projectStatus.toUpperCase() == 'CREATED' || project.projectStatus.toUpperCase() == 'CONFIRMED' || project.projectStatus.toUpperCase() == 'SUBMITTED' || project.projectStatus.toUpperCase() == 'APPROVED'" src="~@/assets/img/green-checkmark.png" class="mr-2" alt="Non Active Checker"/>
                    <img v-else src="~@/assets/img/non-active-checker.png" class="mr-2" alt="Non Active Checker"/>
                    <span>Create a project</span>
                  </div>
                  <div class="title-text-size mt-2 ">
                    <img v-if="project.projectStatus.toUpperCase() == 'CONFIRMED' || project.projectStatus.toUpperCase() == 'SUBMITTED' || project.projectStatus.toUpperCase() == 'APPROVED'" src="~@/assets/img/green-checkmark.png" class="mr-2" alt="Non Active Checker"/>
                    <img v-else src="~@/assets/img/non-active-checker.png" class="mr-2" alt="Non Active Checker"/>
                    <span>Edit project details</span>
                  </div>
                  <div class="title-text-size mt-2 ">
                    <img v-if="project.projectStatus.toUpperCase() == 'SUBMITTED' || project.projectStatus.toUpperCase() == 'APPROVED'" src="~@/assets/img/green-checkmark.png" class="mr-2" alt="Non Active Checker"/>
                    <img v-else src="~@/assets/img/non-active-checker.png" class="mr-2" alt="Non Active Checker"/>
                    <span>Submit project</span>
                  </div>
                  <div class="title-text-size mt-2 ">
                    <img v-if="project.projectStatus.toUpperCase() == 'APPROVED'" src="~@/assets/img/green-checkmark.png" class="mr-2" alt="Non Active Checker"/>
                    <img v-else src="~@/assets/img/non-active-checker.png" class="mr-2" alt="Non Active Checker"/>
                    <span>Project approved</span>
                  </div>
                </div>
                <div class="row">
                  <b-col>
                    <div class="d-flex mt-2 mb-2 mr-2">
                      <b-button v-if="project.projectStatus.toUpperCase()== 'CREATED'" class="btn-style" @click="() => { editProject(project.projectId) }">Edit a Project</b-button>
                      <b-button v-if="project.projectStatus.toUpperCase()=='CONFIRMED'" class="btn-style" @click="() => { submitProject(project.projectId) }">Submit Project</b-button>
                      <b-button v-if="project.projectStatus.toUpperCase()=='SUBMITTED'" class="btn-style" disabled >Approve Fee</b-button>
                    </div>
                  </b-col>
                </div>
              </div>
            </b-col>
          
            <b-col v-if="project.projectStatus.toUpperCase() == 'CREATED' || project.projectStatus.toUpperCase() == 'CONFIRMED' || project.projectStatus.toUpperCase() == 'SUBMITTED' || project.projectStatus.toUpperCase() == 'APPROVED'" cols="12" class="card-section lg-3">
              <div class="ml-5 mt-3"></div>
            </b-col>
            <b-col v-else cols="12" class="card-section lg-3">
              <div class="ml-5 mt-3">Welcome to Construction Check! Let's get started on your first project.</div>
            </b-col>
          </div>
        </b-col>
      </div>
    </div>
  </div>
</template>

<script>
import CurrentComment from './CurrentComment';

export default {
  name: 'ClientManagerProjects',
  components: {
    CurrentComment
  },
  data() {
    return {
      //If the step is 0 -> blank status 1 -> create project status 2 -> Edit project status 3 -> submit status 4 -> project approved status
      step: 0,
      user_role: '',
      projects: {}
    };
  },
  methods: {
    gotoCreateProject(){;
      if(this.user_role == 6) 
        this.$router.push('/dashboard/myprojects?create=true');
      else {
        this.$emit('createPro');
      }
      this.$store.dispatch('app/createProjectStep', { step: 1 })
    },
    editProject(projectId) {
      this.$router.push(`/dashboard/myprojects/detail/${projectId}?edit=${true}`);
    },
    submitProject(projectId) {
      this.$router.push(`/dashboard/myprojects/detail/${projectId}?edit=${false}`);
    }
  },
  created() {
    this.user_role = localStorage.getItem("user_role");
    if(localStorage.getItem('profile')){
      let profile = JSON.parse(localStorage.getItem('profile'));
      let projects = profile.currentProjects;
      projects.forEach(e => {
        if (e.projectParentId) {
          if (!this.projects[e.projectParentId]) {
            this.projects[e.projectParentId] = [e];
            return;
          }
          this.projects[e.projectParentId].push(e);
        }
      })
    }
  },
  mounted() {
  },
};
</script>
<style scoped>
.dash-welcome {
  font-family: Montserrat;
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  padding: 30px 40px 20px 40px;
  margin: 30px;
  max-height: 800px;
}
.title-text {
  font-size: 15px;
  font-weight: 700;
  line-height: 20px;
  min-height: 60px;
}

.title-text-size {
  font-size: 15px;
}

.min-height-unset {
  min-height: unset;
}

.underline {
  border-bottom: 1px solid black;
  max-width: 200px;
}
.custom-card {
  padding: 0 11px 12px 10%;
  background-color: #f4f5f8;
  min-height: 200px;
}
.btn-color {
  background-color: #0c2340;
  font-size: 12px;
  border-radius: 3px;
}

.card-section {
  width: 30%;
}
.margintop-10 {
  margin-top: 15px;
}
.profile-underline {
  margin-top: 8px;
  margin-right: 13px;
    border-bottom: 1px solid black;
}
.retangle {
  margin-top: 10px;
  padding-top: 8.3px;
  padding-bottom: 8.3px;
  padding-left: 17.99px;
  padding-right: 17.99px;
  background-color: #e9f2ff;
  margin-bottom: 15px;
}

.inline-style {
  display: flex;
}

.ml5 {
  margin-left: 5px;
}

.mb-10 {
  margin-bottom: 10px;
}

.grey-container {
  display: flex;
  justify-content: space-between;
  width: 98%;
  background-color: #e9f2ff;
}

.ml5pro {
  margin-left: 5%;
}

.date-style {
  color: #458fff;
  margin-right: 10px;
  margin-top: 8px;
}

.btn-style {
  background-color: #0C2340;
  padding: 5px 30px 5px 30px;
  border-radius: 6px;
}

.grey-underline {
  border-bottom: 1px solid #bbbbbb; 
  padding-bottom: 10px
}

@media only screen and (max-width: 600px) {
  .card-section {
    width: 100%;
  }
  .dash-welcome {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    padding: 10px 10px 20px 40px;
    margin: 0px;
    margin-top: 10px;
  }
}

.btn-style1 {
  background-color: #0C2340;
  font-weight: normal;
  font-size: 13px;
  margin-right: 5px;
  border-radius: 3px;
  border: #0C2340;
}

.project-rect {
  max-height: 600px;
  overflow-y: auto;
  overflow-x: hidden;
  width: 102%;
  padding-right: 2%;
}

::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #A9A9A9;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #b30000;
}

.list-header {
  height: 21px;
  width: 100px;
  text-align: center;
}

@media only screen and (min-width: 1495px) {
  .lg-3 {
    -ms-flex: 0 0 25%;
    -webkit-box-flex: 0;
    flex: 0 0 25%;
    max-width: 25%;
  }
  .card-section-space {
    flex: 0 0 25%;
    max-width: 25%;
  }
}
</style>
