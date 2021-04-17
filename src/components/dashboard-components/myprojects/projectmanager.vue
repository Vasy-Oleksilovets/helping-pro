<template>
  <div>
    <DashHeader :role="role" :profile="profile"/>
    <div class="project">
      <div v-if="!is_clicreate_page" class="table-all">
        <div class="table-header d-flex justify-content-between">
          <div class="col-width">Project name</div>
          <div class="col-width"></div>
          <div class="col-width"></div>
          <div class="col-width">Start date</div>
          <div class="col-width">End date</div>
          <div class="col-width">Status</div>
          <div class="col-width">Progress</div>
        </div>
        <div v-if="role === 6" style="margin: 10px; padding: 10px">
          <b-btn @click="createProject" class="btn-style">Create New Project + </b-btn>
        </div>
        <div id="projectList">
          <ProjectProgress v-for="project in pageOfItems" :key="project.id" :project="project" :role="role" />
        </div>
        <div class="pb-0 pt-3 pagination-bar">
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="projectList"
            align="left"
          ></b-pagination>
        </div>
      </div>
      <!-- When client Manager Click the create project button will show the create project page -->
      <ClientCreateProjectManager v-on:cancelCreate="cancel($event)" v-if="is_clicreate_page" />
    </div>
  </div>
</template>
<script>
import DashHeader from '../dash-header';
import ProjectProgress from './projectprogress';
import ClientCreateProjectManager from './climanagercreatepro';
export default {
  name: 'ProjectManager',
  props: ['role', 'profile'],
  components: {
    DashHeader,
    ProjectProgress,
    ClientCreateProjectManager,
  },
  data() {
    return {
      projects : [],
      is_clicreate_page: false,
      perPage: 15,
      currentPage: 1,
    };
  },
  methods: {
    //This method is only available for the client manager -> when client manager click the create project on the top of the my projects page
    createProject() {
      this.is_clicreate_page = true;
    },
    cancel(){
      this.is_clicreate_page = false;
    },
    compare( a, b ) {
      if ( a.dateEnd < b.dateEnd ){
        return -1;
      }
      if ( a.dateEnd > b.dateEnd ){
        return 1;
      }
      return 0;
    },
  },

  created() {
    if(this.$route.query.create) this.is_clicreate_page = true;
    var profile = JSON.parse(localStorage.getItem('profile'));
    if(profile && profile.currentProjects){
      this.projects = profile.currentProjects.sort(this.compare);
    }
  },

  computed: {
    rows() {
      return this.projects.length
    },
    pageOfItems() {
      return this.projects.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage,
      );
    }
  }
};
</script>

<style scoped>
.col-width {
  width: 14.2%;
}
.project {
  font-size: 1em;
  color: black;
  font-weight: 600;
}
.table-header {
  background-color: #061831;
  color: white;
  padding: 15px 30px 15px 30px;
  min-width: 1200px !important;
}
.card-component {
  background-color: white;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  margin: 10px;
  min-width: 1180px !important;
}
.each_row {
  min-width: 1000px !important;
  margin-top: 10px !important;
  padding: 10px 10px 0px 20px;
  margin-bottom: 5px;
}
.second_row {
  min-width: 1000px !important;
  margin-top: 10px !important;
  padding: 10px 10px 0px 20px;
  padding-bottom: 15px;
}
.custom-text-center {
  display: flex;
  align-items: center;
}
.btn-style {
  background-color: orange;
  font-weight: normal;
  font-size: 13px;
  margin-right: 5px;
  border-radius: 3px;
  border: orange;
}
.project_link {
  text-decoration: none;
  color: white;
}
.pagination-bar {
  display: flex;
  justify-content: center;
}
@media (max-width: 800px) {
  .table-all {
    overflow: auto;
  }
}
</style>
