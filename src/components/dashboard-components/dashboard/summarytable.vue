<template>
  <b-card class="subs-card">
    <b-card-body>
      <h6 class="font-weight-bold" v-if="project_type===0">Projects in Queue</h6>
      <h6 class="font-weight-bold" v-if="project_type===1">Projects In Progress</h6>
      <h6 class="font-weight-bold" v-if="project_type===2">Projects In Completed</h6>
      <b-table hover thClass="border-top-0" :items="items" :fields="role === 5 ? client_manager_fields: fields" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" responsive fixed>
        <template v-slot:table-colgroup="scope">
          <col v-for="field in scope.fields" :key="field.key" :style="{ width: field.key === 'name' ? '250px' : '170px' }">
        </template>
        <!-- Set the custom header -->
        <template v-slot:head(projectName)>
          <!-- <div v-if="project_type==0" class="title-font">Projects In Queue</div>
          <div v-if="project_type==1" class="title-font">Projects In Progress</div>
          <div v-if="project_type==2" class="title-font">Projects In Completed</div> -->
          <div>Project Name</div>
        </template>
        <template v-slot:head(button)>
          <div class="title-font"></div>
        </template>
        <template v-slot:head(feeSubmissionStatus)>
          <div class="title-font">Fee Submission</div>
        </template>
        <template v-slot:head(clientManager)>
          <b-dropdown
            variant="primary"
            size="lg"
            style="background-color: white !important"
            id="dropdown-1"
            text="Client Manager">
            <b-dropdown-item @click="showAll">All</b-dropdown-item>
            <b-dropdown-item v-for="(client, index) in client_manager_list" :key="index" @click="filterByClientManager(client)">{{client}}</b-dropdown-item>
          </b-dropdown>
        </template>
        <template v-if="role === 4" v-slot:head(location)>
          <b-dropdown
            variant="primary"
            size="lg"
            style="background-color: white !important"
            id="dropdown-1"
            text="Office Location">
            <b-dropdown-item @click="showAll()">All</b-dropdown-item>
            <b-dropdown-item v-for="(location, index) in office_location_list" :key="index" @click="filterByLocation(location)">{{location}}</b-dropdown-item>
          </b-dropdown>
        </template>
        <template v-slot:head(project_company)>
          <b-dropdown
            variant="primary"
            size="lg"
            style="background-color: white !important"
            id="dropdown-1"
            text="Project Company">
            <b-dropdown-item @click="showAll()">All</b-dropdown-item>
            <b-dropdown-item v-for="(company, index) in project_company_list" :key="index" @click="filterByCompany(company)">{{company}}</b-dropdown-item>
          </b-dropdown>
        </template>
        <template v-slot:head(client)>
          <b-dropdown
            variant="primary"
            size="lg"
            style="background-color: white !important"
            id="dropdown-1"
            text="Client">
            <b-dropdown-item @click="showAll()">All</b-dropdown-item>
            <b-dropdown-item v-for="(client, index) in client_list" :key="index" @click="filterByClient(client)">{{client}}</b-dropdown-item>
          </b-dropdown>
        </template>
        <template v-slot:cell(name)="row">
          <span v-if="row.item.is_new" style="color: #E07C00; margin-top: 3px">* New *</span>
          <span>{{row.value}}</span><span v-if="row.item.type ==1 " style="color: #0058DD">{{ row.value }}</span>
        </template>
        <template v-slot:cell(button)="row">
          <b-btn @click="gotoSubmissionPage(row.item.projectId)" class="button-type rounded">View Project</b-btn>
        </template>
      </b-table>
      <b-row class="font-weight-bold ml-1">
        <a v-if="project_type==0" href="/dashboard/myprojects?type=1">View Project in Queue Page</a>
        <a v-if="project_type==1" href="/dashboard/myprojects?type=0">View Project in Progress Page</a>
        <a v-if="project_type==2" href="/dashboard/myprojects?type=2">View Project in Completed Page</a>
      </b-row>
    </b-card-body>
  </b-card>
</template>

<script>

export default {
  name: 'SummaryTable',
  props: ['project_type', 'projects', 'role'],
  data() {
    return {
      sortBy: 'age',
      sortDesc: false,
      items:[],
      office_location_list: [],
      client_manager_list: [],
      client_list: [],
      project_company_list: [],
      client_manager_fields: [
        { key: 'projectName', sortable: false },
        { key: 'projectType', sortable: false},
        { key: 'client', sortable: false },
        { key: 'project_company', sortable: false},
        { key: 'feeSubmissionStatus', sortable: false},
        { key: 'button', sortable: false }
      ],
      fields: [
        { key: 'projectName', sortable: false },
        { key: 'projectType', sortable: false},
        { key: 'location', sortable: false},
        { key: 'clientManager', sortable: false},
        { key: 'client', sortable: false },
        { key: 'feeSubmissionStatus', sortable: false },
        { key: 'button', sortable: false }
      ],
    };
  },
  methods: {
    filterByLocation(location){
      this.items = this.projects.filter(project => project.step==this.project_type && project.office_location == location);
      if(this.items.length > 3 ) {
        this.items = this.items.splice(0, 3);
      }
    },
    filterByCompany(company){
      this.items = this.projects.filter(project => project.step==this.project_type && project.project_company == company);
      if(this.items.length > 3 ) {
        this.items = this.items.splice(0, 3);
      }
    },
    filterByClient(client){
      this.items = this.projects.filter(project => project.step==this.project_type && project.client == client);
      if(this.items.length > 3 ) {
        this.items = this.items.splice(0, 3);
      }
    },
    showAll(){
      this.items = this.projects.filter(project => project.step==this.project_type);
      if(this.items.length > 3 ) {
        this.items = this.items.splice(0, 3);
      }
    },
    gotoSubmissionPage(projectId){
      if (projectId) {
        this.$router.push(`/dashboard/myprojects/detail/${projectId}`)
      }
    }
  },
  created(){	
    this.items = this.projects;
  },     
  watch: {
    projects: function(newValue) {
      this.items = newValue;
    }
  }          
};
</script>

<style scoped>
.title-font {
  font-size: 1.1em;
  font-weight: 600;
}

.mytable thead {
  font-size: 2em !important;
}

.sub-title {
  font-weight: 600;
}

.subs-card {
  margin: 30px;
  font-weight: 500 !important;
  color: black;
}

.title-text {
  font-size: 15px;
  font-weight: 600;
  line-height: 20px;
}

.button-type {
  background-color: #0c2340;
  color: white;
  font-weight: normal !important;
}

@media only screen and (max-width: 600px) {
  .dash-welcome {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    padding: 10px 10px 20px 40px;
    margin: 0px;
    margin-top: 10px;
  }
  .small-phone {
    margin-right: 5px;
  }
}
</style>