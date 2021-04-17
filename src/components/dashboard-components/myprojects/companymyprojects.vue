<template>
  <div>
    <b-tabs class="project-request-container">
      <b-tab v-if="this.activeTab === 0" title="In Progress" active>
        <CompanyMyProjectTab :projects="projectsInProgressList" :project_type='0'/>
      </b-tab>
      <b-tab v-else title="In Progress">
        <CompanyMyProjectTab :projects="projectsInProgressList" :project_type='0'/>
      </b-tab>
      <b-tab v-if="activeTab === 1" title="In Queue" active>
        <CompanyMyProjectTab :projects="projectsInQueueList" :project_type='1'/>
      </b-tab>
      <b-tab v-else title="In Queue">
        <CompanyMyProjectTab :projects="projectsInQueueList" :project_type='1'/>
      </b-tab>
      <b-tab v-if="activeTab === 2" title="Complete" active>
        <CompanyMyProjectTab :projects="projectsCompletedList" :project_type='2'/>
      </b-tab>
      <b-tab v-else title="Complete">
        <CompanyMyProjectTab :projects="projectsCompletedList" :project_type='2'/>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import CompanyMyProjectTab from './companymyprojects/companymyprojecttab.vue';
export default {
  name: 'CompanyMyProjects',
  components: { 
    CompanyMyProjectTab
  },
  props: ['projects'],
  data() {
    return {
      projectsInQueueList: [],
      projectsInProgressList: [],
      projectsCompletedList: [],
      activeTab: 0
    };
  },
  methods: {},
  created() {
    if(localStorage.getItem('profile')){
      let profile = JSON.parse(localStorage.getItem('profile'));
      this.projectsInQueueList = profile.projectsInQueueList;
      this.projectsInProgressList = profile.projectsInProgressList;
      this.projectsCompletedList = profile.projectsCompletedList;
    }
    let type = this.$route.query.type;
    if(type){
      if(type == '0'){
        this.activeTab = 0;
      }
      if(type == '1'){
        this.activeTab = 1;
      }
      if(type == '2'){
        this.activeTab = 2;
      }
    }
  },
};
</script>

<style scoped>
.project-request-container {
  margin: 20px;
}
</style>
