<template>
  <div>
    <DashHeader :role="role" :profile="profile"/>
    <!-- Dashboard for Estimators -->
    <div v-if="role === 3">
      <DashCurrent :role="role"/>
      <DashOffers @openModal="openModal" />
      <DashUpcoming />
    </div>
    <!-- End for Estimators -->

    <!-- Dashboard for Project Manager's -->
    <div v-if="role === 7 || role === 8">
      <ProCurrent :role="role"/>
      <ProSubmission :role="role"/>
      <ProUpcomming :role="role"/>
      <ProSubmissionStatus :projects="projects" :role="role" :profile="profile"/>
    </div>
    <!-- Dashboard for Project Manager's -->

    <!--Dashboard for Project Administrator -->
    <div v-if="role === 6">
      <ClientManagerProjects :projects="projects"/>
      <ProSubmissionStatus :profile="profile"/>
    </div>

    <!-- Dashboard for Company -->
    <div v-if="role === 4 || role === 5">
      <CompanyOffice :profile="profile" :role="role" v-on:changedOffice="changedOffice"/>
      <ag-grid-vue style="margin: 30px; height: 500px;" class="ag-theme-alpine" id="myGrid1" :gridOptions="gridOptions" :columnDefs="columnDefs" :defaultColDef="defaultColDef" :rowData="rowData" :pagination="true"></ag-grid-vue>
    </div>

    <!-- Dashboard for superAdmin -->
    <div v-if="role === 2">
      <SuperDash />
    </div>
  </div>
</template>

<script>
import DashHeader from '../dash-header';

import DashCurrent from './dash-current';
import DashUpcoming from './dash-upcoming';
import DashOffers from './dash-offers';
//Components for Project Manager View
import ProCurrent from './proCurrent';
import ProSubmission from './proSubmission';
import ProUpcomming from './proUpcomming';
import ProSubmissionStatus from './proSubmissionStatus';
//Components for Client Manager View
import ClientManagerProjects from './clientmanagerprojects';
//Components for Company View
import CompanyOffice from './companyoffice';
import SummaryTable from './summarytable'
//Components for Super Dashboard View
import SuperDash from './superDash.vue';
import AccountProxy from '@/proxies/AccountProxy.js';
import { mapGetters, mapState } from 'vuex';
import { AgGridVue } from "ag-grid-vue";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export default {
  name: 'MainDashboard',
  components: {
    DashCurrent,
    DashUpcoming,
    DashOffers,
    ProCurrent,
    ProSubmission,
    ProUpcomming,
    ClientManagerProjects,
    ProSubmissionStatus,
    CompanyOffice,
    SummaryTable,
    SuperDash,
    DashHeader,
    'ag-grid-vue': AgGridVue,
  },

  methods: {
    openModal() {
      this.$emit('openModal');
    },

    changedOffice(value) {
      this.officeCompany = value;
      //If user selected company change the projects list
      if(value !== ""){
        this.projectsCompletedList = value.projectsCompletedList;
        this.projectsInProgressList = value.projectsInProgressList;
        this.projectsInQueueList = value.projectsInQueueList;
      }
      else {
        this.projectsCompletedList = this.profile.projectsCompletedList;
        this.projectsInProgressList = this.profile.projectsInProgressList;
        this.projectsInQueueList = this.profile.projectsInQueueList;
      }
    }
  },
  data() {
    return {
      myprofile: {},
      officeCompany: "", //Temp data for the office if the user changed the office
      projectsCompletedList: [],
      projectsInProgressList: [],
      projectsInQueueList: [],
      profile: {},
      role: 4,
      newProjects: [],
      upcomingProjects: [],
      gridOptions: null,
      gridApi: null,
      columnApi: null,
      columnDefs: [{
                field: "Project Name",
            },
            {
                field: "Estimate Type",
                cellClass: 'my-class',

            },
            {
                field: "Project Phase",
                cellClass: 'my-class',

            },
            {
                field: "Office",
            },
            {
                field: "City",
            },
            {
                field: "City Manager",
            },
            {
                field: "Project Manager",

            },
            {
                field: "Type",
            },
            {
                field: "Status",
                cellStyle: params => {
                    if (params.value === 'Pending') {
                        return {
                            color: ' #f88d2b ',
                            'font-weight': '600'
                        };
                    }
                    if (params.value === 'Declined') {
                        //mark police cells as red
                        return {
                            color: ' #f05050',
                            'font-weight': '600'
                        };
                    }
                    if (params.value === 'Accepted') {
                        return {
                            color: ' #29cc97'
                        };
                    }
                    if (params.value === 'Draft') {
                        return {
                            color: '  #252733',
                            'font-weight': '600'
                        };
                    }
                    return null;
                }
            },

            {
                field: "Action",
                cellStyle: params => {
                    if (params.value === 'Edit') {
                        return {
                            width: '65px',
                            maxWidth: '65px',
                            height: '28px',
                            ' margin-top':'10px',
                            //   margin: '0 0 0 977px',
                            padding: '7px 7px 5px 5px',
                            //   margin: '5px 0 5px 7px',
                            'font-family': 'Montserrat',
                            'font-size': '11px',
                            'font-weight': 'bold',
                            'font-stretch': 'normal',
                            'font-style': 'normal',
                            'line-height': 'normal',
                            'letter-spacing':' 0.5px',
                            'text-align': 'center',
                            'border': 'solid 1px #0071e3',
                            

                            ' border-radius': '100px',
                            'background': 'none ',
                            color:' #0071e3',
                        };
                    }
                    if (params.value === 'APPROVE') {
                        //mark police cells as red
                        return {
                            width: '83px',
                            maxWidth: '83px',
                            height: '28px',
                            ' margin-top':'10px',
                            //   margin: '0 0 0 977px',
                            padding: '7px 7px 5px 5px',
                            //   margin: '5px 0 5px 7px',
                            'font-family': 'Montserrat',
                            'font-size': '11px',
                            'font-weight': 'bold',
                            'font-stretch': 'normal',
                            'font-style': 'normal',
                            'line-height': 'normal',
                            'letter-spacing':' 0.5px',
                            'text-align': 'center',
                            

                            ' border-radius': '100px',
                            'background-color': '#0071e3',
                            color:' #ffffff',
                        };
                    }
                    return null;
                }
            },
        ],
        defaultColDef: {
            resizable: true
        },
        rowData: [{
                "Project Name": "Axiom Hospital",
                "Estimate Type": "Estimate",
                "Project Phase": "N/a",
                Office: "N/a",
                City: "Atlanta",
                "City Manager": "Allan N",
                "Project Manager": "George",
                Type: "Hospital",
                Status: "Pending",
                Action: "APPROVE",
            },
            {
                "Project Name": "Axiom Hospital",
                "Estimate Type": "Estimate",
                "Project Phase": "N/a",
                Office: "N/a",
                City: "Atlanta",
                "City Manager": "Allan N",
                "Project Manager": "George",
                Type: "Hospital",
                Status: "Pending",
                Action: "Edit",
            },
            {
                "Project Name": "Axiom Hospital",
                "Estimate Type": "Estimate",
                "Project Phase": "N/a",
                Office: "N/a",
                City: "Atlanta",
                "City Manager": "Allan N",
                "Project Manager": "George",
                Type: "Hospital",
                Status: "Pending",
                Action: "APPROVE",
            },
            {
                "Project Name": "Axiom Hospital",
                "Estimate Type": "Estimate",
                "Project Phase": "N/a",
                Office: "N/a",
                City: "Atlanta",
                "City Manager": "Allan N",
                "Project Manager": "George",
                Type: "Hospital",
                Status: "Accepted",
                Action: "Edit",
            },
            {
                "Project Name": "Axiom Hospital",
                "Estimate Type": "Estimate",
                "Project Phase": "N/a",
                Office: "N/a",
                City: "Atlanta",
                "City Manager": "Allan N",
                "Project Manager": "George",
                Type: "Hospital",
                Status: "Declined",
                Action: "Edit",
            },
            {
                "Project Name": "Axiom Hospital",
                "Estimate Type": "Estimate",
                "Project Phase": "N/a",
                Office: "N/a",
                City: "Atlanta",
                "City Manager": "Allan N",
                "Project Manager": "George",
                Type: "Hospital",
                Status: "Pending",
                Action: "Edit",
            },
            {
                "Project Name": "Axiom Hospital",
                "Estimate Type": "Estimate",
                "Project Phase": "N/a",
                Office: "N/a",
                City: "Atlanta",
                "City Manager": "Allan N",
                "Project Manager": "George",
                Type: "Hospital",
                Status: "Accepted",
                Action: "Edit",
            },
            {
                "Project Name": "Axiom Hospital",
                "Estimate Type": "Estimate",
                "Project Phase": "N/a",
                Office: "N/a",
                City: "Atlanta",
                "City Manager": "Allan N",
                "Project Manager": "George",
                Type: "Hospital",
                Status: "Canceled",
                Action: "Edit",
            },
            {
                "Project Name": "Axiom Hospital",
                "Estimate Type": "Estimate",
                "Project Phase": "N/a",
                Office: "N/a",
                City: "Atlanta",
                "City Manager": "Allan N",
                "Project Manager": "George",
                Type: "Hospital",
                Status: "Draft",
                Action: "Edit",
            },
            {
                "Project Name": "Axiom Hospital",
                "Estimate Type": "Estimate",
                "Project Phase": "N/a",
                Office: "N/a",
                City: "Atlanta",
                "City Manager": "Allan N",
                "Project Manager": "George",
                Type: "Hospital",
                Status: "Approved",
                Action: "Edit",
            },
        ]
    }
  },
  mounted() {
    //If user role is company save the company profile to the localstorage
    if(this.role === 4){
      new AccountProxy().getCompanyProfile()
        .then(response => {
          this.companyProfile = response;
          localStorage.setItem('companyProfile', JSON.stringify(this.companyProfile))
        })
        .catch(error => {
          console.error('error123!: ' + error);
        })
    }
    this.gridApi = this.gridOptions.api;
    this.gridColumnApi = this.gridOptions.columnApi;
    this.gridApi.sizeColumnsToFit();
  },
  created() {
    this.office_name = this.$route.params.office_name;
    this.myprofile = this.profile;
    //Get the profile

    if(localStorage.getItem('profile')){
      this.profile = JSON.parse(localStorage.getItem('profile'));
    }
    else {
      let auth = this.$store.state.auth;
      this.profile = this.$store.state.auth.profile;
    }
    if (this.role === 8) {
        this.newProjects = this.profile.newProjects;
        this.upcomingProjects = this.profile.upcomingProjects;
    } else {
      //Set the projects list
      this.projectsCompletedList = this.profile.projectsCompletedList;
      this.projectsInProgressList = this.profile.projectsInProgressList;
      this.projectsInQueueList = this.profile.projectsInQueueList;
    }
    
  },
  beforeMount() {
    //Get the userRole
    let vm = this;
    if(localStorage.getItem('user_role')){
      this.role = JSON.parse(localStorage.getItem('user_role'));
    }
    else this.role = this.$store.state.auth.userRole;
    this.gridOptions = {};
  },
  computed: {
    ...mapGetters('auth', [
        'getToken',
        'getMyProfile'
      ]),   
    ...mapState('auth', [
      'profile'
      ])
  },
  watch: {
    '$store.state.auth.profile': function() {
      this.profile = {...this.$store.state.auth.profile};
      if (this.role === 8) {
        this.newProjects = this.profile.newProjects;
        this.upcomingProjects = this.profile.upcomingProjects;
      } else {
        this.projectsCompletedList = this.profile.projectsCompletedList;
        this.projectsInProgressList = this.profile.projectsInProgressList;
        this.projectsInQueueList = this.profile.projectsInQueueList;
      }
    }
  }
};
</script>

<style scoped>
.dash-body {
  background-color: #f4f5f8;
  width: 100%;
  height: 100%;
  margin-right: 10px;
  font-size: 13px;
  font-weight: 600;
  font-family: Montserrat !important;
}

@media only screen and (max-width: 600px) {
  .dash-body {
    font-size: 11px;
  }
}

@media only screen and (max-width: 1400px) {
  .dash-body {
    font-size: 12px;
  }
}
</style>
<style>
.ag-theme-alpine .ag-ltr .ag-cell {
  /* width: 120px;
  height: 20px; */
  flex-grow: 0;
  font-family: Montserrat;
  /* font-size: 14px; */
  font-weight: 600  !important;
  font-stretch: normal;
  font-style: normal;
  /* line-height: 1.43; */
  letter-spacing: 0.2px;
  text-align: left;
  color: #252733  ;
  background: none;
  cursor:pointer
  /* color: red; */
}

.ag-theme-alpine .ag-header-cell-label{
  font-family: Montserrat;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.2px;
  color: #7c7e89;
}

.dropdown-item{
  width: 160px;
  height: 20px;
  margin: 8px 16px 8px 16px;
  padding: 1px 0;
  font-family: Montserrat;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: 0.2px;
  text-align: left;
  color: #0071e3;
}

.form-group{
  margin-bottom: 0px;
}

.ag-theme-alpine .ag-header-cell, .ag-theme-alpine .ag-header-group-cell{
  padding-right:0 ;
}

.ag-theme-alpine .ag-ltr .ag-has-focus .ag-cell-focus:not(.ag-cell-range-selected), .ag-theme-alpine .ag-ltr .ag-context-menu-open .ag-cell-focus:not(.ag-cell-range-selected), .ag-theme-alpine .ag-ltr .ag-has-focus .ag-full-width-row.ag-row-focus .ag-cell-wrapper.ag-row-group, .ag-theme-alpine .ag-ltr .ag-cell-range-single-cell, .ag-theme-alpine .ag-ltr .ag-cell-range-single-cell.ag-cell-range-handle, .ag-theme-alpine .ag-rtl .ag-has-focus .ag-cell-focus:not(.ag-cell-range-selected), .ag-theme-alpine .ag-rtl .ag-context-menu-open .ag-cell-focus:not(.ag-cell-range-selected), .ag-theme-alpine .ag-rtl .ag-has-focus .ag-full-width-row.ag-row-focus .ag-cell-wrapper.ag-row-group, .ag-theme-alpine .ag-rtl .ag-cell-range-single-cell, .ag-theme-alpine .ag-rtl .ag-cell-range-single-cell.ag-cell-range-handle {
border:none
}
</style>