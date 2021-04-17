<template>
  <div class="adminListProjects">
    <Projects :role="user_role"/>
    <!-- <main class="bg-img content">
      <hr style="background-color:#ed6d3a; height:4px" />
      <b-breadcrumb :items="items"></b-breadcrumb>
      <section class="secWhite secValidate">
        <div class="container text-center">
          <div class="container text-left">
              <h5 style="color:#ed6d3a;">Active/Assigned</h5>
              <input type="checkbox" id="activeProjects" value="true" v-model="projectSearch.activeProjects">
              <label for="activeProjects">Active Projects</label><br/>
              <input type="checkbox" @change="clickAssigned($event)" id="assignedToMe" value="true" v-model="projectSearch.assignedToMe">
              <label for="assignedToMe">Assigned To Me</label><br/>
              <input type="checkbox" @change="clickAssigned($event)" id="unassigned" value="false" v-model="projectSearch.unassigned">
              <label for="assignedToMe">Unassigned Projects</label><br/>
          </div>
          <div class="container text-left">
              <br/>
              <button @click="searchProjects" class="btn btn-success">Search Projects</button>
          </div>

          <div v-show="showResults" class="container text-left">
              <br/>
              <h5 style="color:#ed6d3a;">Search Results</h5>
              <div v-if="this.projects.length > 0">
                <table cellpadding="10" border="1">
                  <tr>
                    <th>Project Name</th><th>Account</th><th>Budget</th><th>Fee Estimate</th><th>Start Date</th><th>End Date</th><th>Active</th><th>Assigned</th><th>Edit</th>
                  </tr>
                    <tr v-for = "project in projects" :key="project.id">
                      <div>
                          <td>{{project.name}}</td>
                          <td>{{project.accountOffice.account.companyName}}</td>
                          <td>${{formatCurrency(project.budget)}}</td>
                          <td>${{formatCurrency(project.feeEstimate)}}</td>
                          <td>{{project.dateStart}}</td>
                          <td>{{project.dateEnd}}</td>
                          <td>{{project.active}}</td>
                          <td v-if="project.assignedUser == null" @click="clickClaim(project.id)"><a href="javascript:void(0);">Claim</a></td>
                          <td v-else>{{project.assignedUser.firstName + ' ' + project.assignedUser.lastName}}</td>
                          <td v-if="project.assignedUser != null"><router-link :to="'/adminEditProject?pid=' + project.id">Edit</router-link></td>
                          <td v-else></td>
                      </tr>
                </table>
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
      </section>
    </main> -->
    <!-- <footer>
      <div class="container text-center">
        <a href="#" title="">
          <img src="~@/assets/img/logoWhite.png" alt="" />
        </a>
        <p>Copyright, 2019 Construction Check. All Rights Reserved.</p>
      </div>
    </footer> -->
  </div>
</template>

<script>
import AdminProxy from '@/proxies/AdminProxy.js';
import Navigation from "@/components/Navigation.vue";
import Projects from '../../../components/dashboard-components/projectrequests/managerprojectrequest/clientprojectsubmission';

export default {
  name: "estimate",
  data() {
    return {
      errors: [],
      showResults: false,
      projectSearch:{
        //releasedToEstimateTrue:false,
        //releasedToEstimateFalse:false,
        activeProjects:true,
        assignedToMe: true,
        unassigned: false,
      },
      projects:[],
      items: [
          {
              text: 'Admin Home',
              to: { name: 'adminHome' }
          },
          {
              text: 'Search Projects',
              active: true
          }
      ],
      user_role: 2
    };
  },
  methods: {
    searchProjects(){
      this.showResults = true;
      var params = this.projectSearch;
      new AdminProxy().getProjectSearch(params).then((response) => {
          // JSON responses are automatically parsed.
          this.projects = response;
        })
        .catch(error => {
          this.errors.push(error);
        });

    },
    formatCurrency(val){
      if(val){
        return val.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
      }else{
        return '';
      }
    },
    clickAssigned : function(e) {
      if(e.target.id == 'unassigned'){
        if(this.projectSearch.unassigned == true){
          this.projectSearch.assignedToMe = false;
        }
      }else{
        if(this.projectSearch.assignedToMe == true){
          this.projectSearch.unassigned = false;
        }
      }
    },
    clickClaim(id){
      if(confirm("Do you really want to claim this project?")){
        // assign this project to the current user
        var params = new URLSearchParams();
          params.append('projectId', id);
        new AdminProxy().claimTask(params).then((response) => {
            // JSON responses are automatically parsed.
            this.searchProjects();
          })
          .catch(error => {
            this.errors.push(error);
          });
      }
    },
  },
  components: {
    Navigation: Navigation,
    Projects
  },
  created() {

  }
};
</script>

<style scoped>
    .adminListProjects {
        padding: 10px;
        background: white;
        margin: 10px;
        border: 1px solid #dddddd;
    }
</style>
