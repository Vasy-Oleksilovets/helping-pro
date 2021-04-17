<template>
  <div class="client-project-submission">
    <b-table
        hover
        thClass="border-top-0"
        :items="items"
        :fields="fields"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :current-page="currentPage"
        :per-page="perPage"
        responsive="sm"
    >
      <template v-slot:table-colgroup="scope">
        <col v-for="field in scope.fields" :key="field.key" :style="{ width: field.key === 'button' ? '150px' : '170px' }">
      </template>
      <template v-slot:head(name)>
        <div>
          <span class="title-font">Project Name</span>
        </div>
      </template>
      <template v-slot:head(clientManager)>
        <b-dropdown variant="primary" size="lg" style="background-color: white !important" id="dropdown-1" text="Client Manager">
          <b-dropdown-item @click="showAll">All</b-dropdown-item>
          <b-dropdown-item v-for="(client, index) in clientManager_list" :key="index" @click="filterByClientManager(client)">{{client}}</b-dropdown-item>
        </b-dropdown>
      </template>
      <template v-slot:head(basis_of_estimate)>
        <b-dropdown
          variant="primary"
          size="lg"
          style="background-color: white !important"
          id="dropdown-1"
          text="Basis of Estimate">
          <b-dropdown-item @click="showAll">All</b-dropdown-item>
          <b-dropdown-item v-for="(estimate, index) in basis_of_estimate_list" :key="index" @click="filterByEstimate(estimate)">{{estimate}}</b-dropdown-item>
        </b-dropdown>
      </template>
      <template v-slot:head(location)>
        <b-dropdown
          variant="primary"
          size="lg"
          style="background-color: white !important"
          id="dropdown-1"
          text="Office Location">
          <b-dropdown-item @click="showAll()">All</b-dropdown-item>
          <b-dropdown-item v-for="(location, index) in location_list" :key="index" @click="filterByLocation(location)">{{location}}</b-dropdown-item>
          </b-dropdown>
      </template>
      <template v-slot:head(feeSubmissionStatus)>
        <div>Project Phase</div>
      </template>
      <template v-slot:head(button)>
        <div></div>
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
      <template v-slot:cell(button)>
        <b-button class="button-type rounded" style="float: right" @click="gotoDetailPage">View Project</b-button>
      </template>
      <template v-slot:cell(status)="row">
        <span v-if="row.value == 'Denied'" style="color:#C9C9C9">{{row.value}}</span>
        <span v-else>{{ row.value }}</span>
      </template>
      <template v-slot:cell(client_company)="row">
        <span v-if="row.item.type == 1" style="color: #E07C00">* New *</span>
        <span v-else style="color: #C9C9C9; margin-right: 6px; margin-left: 6px">Read</span>
        <span>{{ row.value }}</span>
      </template>
      <template v-slot:cell(budget)="row">
        <span>{{ row.value | formatMoney('$', 0) }}</span>
      </template>
    </b-table>
    <b-row class="pb-5">
      <b-col md="4" offset-md="4">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>
  </div>
</template>

<script>
//Import css and js for the range slider for the budget
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';

export default {
  name: 'CompanyMyProjectTab',
  components: {
    VueSlider,
  },
  props: ['projectType', 'projects'],
  data() {
    return {
      totalRows: 1,
      currentPage: 1,
      perPage: 15,
      pageOptions: [5, 10, 15],
      sortBy: 'age',
      sortDesc: false,
      items:[],
      fields: [
        { key: 'projectName', sortable: false },
        { key: 'clientManager', sortable: false },
        { key: 'location', sortable: false },
        { key: 'city', sortable: false },
        { key: 'portfolio_adminstrator', sortable: false },
        { key: 'project_manager', sortable: false },
        { key: 'projectType', sortable: false },
        { key: 'feeSubmissionStatus', sortable: false },
      ],
      default_items: [],

      location_list: [],
      clientManager_list: [],
      basis_of_estimate_list: [],
      project_company_list: [],
    };
  },
  methods: {
    filterByClientManager(client){
      this.items = this.projects;
    },
    filterByLocation(location){
      this.items = this.projects.filter(project => project.step==this.projectType && project.location == location);
    },
    filterByCompany(company){
      this.items = this.projects.filter(project => project.step==this.projectType && project.project_company == company);
    },
    filterByEstimate(estimate){
      this.items = this.projects.filter(project => project.step==this.projectType && project.basis_of_estimate == estimate);
    },
    showAll(){
      this.items = this.projects.filter(project => project.step==this.projectType);
    },
    gotoDetailPage(){
      this.$router.push('/dashboard/myprojects/detail');
    }
  },
  created() {
    for(let index in this.projects) {
      if(!this.location_list.includes(this.projects[index].location)  && this.projects[index].step === this.projectType)
        this.location_list.push(this.projects[index].location);
    }

    for(let index in this.projects) {
      if(!this.clientManager_list.includes(this.projects[index].clientManager)  && this.projects[index].step === this.projectType)
        this.clientManager_list.push(this.projects[index].clientManager);
    }

    for(let index in this.projects) {
      if(!this.basis_of_estimate_list.includes(this.projects[index].basis_of_estimate)  && this.projects[index].step === this.projectType)
        this.basis_of_estimate_list.push(this.projects[index].basis_of_estimate);
    }

    for(let index in this.projects) {
      if(!this.project_company_list.includes(this.projects[index].project_company)  && this.projects[index].step === this.projectType)
        this.project_company_list.push(this.projects[index].project_company);
    }
    this.items = this.projects;
  },
};
</script>

<style scoped>
.client-project-submission {
  padding: 0px 20px 0px 20px;
  background-color: white;
  font-size: 12px;
  font-weight: 500;
}

.title-font {
  font-size: 13px !important;
  font-weight: 600;
}
.submission {
  border: 2px solid #cfcfcf;
  padding: 15px;
  padding-left: 25px;
  margin: 5px;
}

.mytable thead {
  font-size: 2em !important;
}

.submissions-title {
  border-bottom: 2px solid black;
}

.sub-title {
  font-weight: 600;
}

.sub {
  background-color: red;
}

.subs-card {
  margin: 20px;
  font-weight: 500 !important;
  color: black;
}

.sub-card-body {
  margin: 20px;
  padding: 20px;
}

.sub-card-title-body {
  margin: 5px;
  margin-bottom: 15px;
  padding: 0px;
}

.dash-welcome {
  font-family: Montserrat;
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  padding: 30px 40px 20px 40px;
  margin: 30px;
}
.title-text {
  font-size: 15px;
  font-weight: 600;
  line-height: 20px;
}
.underline {
  border-bottom: 1px solid black;
}
.col {
  padding-left: 0px !important;
}

.button-type {
  background-color: #0c2340;
  color: white;
  font-weight: normal !important;
  padding-left: 20px;
  padding-right: 20px;
}

.client-project-submission th {
  font-size: 14px !important;
  font-weight: 900 !important;
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
