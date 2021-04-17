<template>
  <div>
    <DashHeader v-if="!is_clicreate_page" :role="role" :profile="profile"/>
    <div v-if="!is_clicreate_page">
      <ClientManagerProjects v-on:goBack="goBack" v-on:createPro="gotoCreateProject" :role="role" :profile="profile" :projects="projects"/>
    </div>
    <ClientCreateProjectManager v-on:cancelCreate="cancel($event)" v-if="is_clicreate_page" v-on:goback="goBack" />
  </div>
</template>
<script>
import DashHeader from '../dash-header';
import DashHeaderCreateProject from '../dash-header-create-project';
import ClientManagerProjects from './clientmanagerprojects';
import ProSubmissionStatus from './proSubmissionStatus';
import ClientCreateProjectManager from '../myprojects/climanagercreatepro'

export default {
  name: 'CreateProject',
  props: ['role', 'profile'],
  components: {
    DashHeader,
    ClientManagerProjects,
    ProSubmissionStatus,
    ClientCreateProjectManager,
    DashHeaderCreateProject
  },
  data() {
    return {
      projects: [],
      profile: {},
      is_clicreate_page: false,
    };
  },
  methods: {
    gotoCreateProject(){
      this.is_clicreate_page = true;
    },
    goBack(){
      this.is_clicreate_page = false;
      console.log(this.role);
    }
  },
};
</script>

<style scoped>
.btn-style1 {
  background-color: #0C2340;
  font-weight: normal;
  font-size: 13px;
  margin-right: 5px;
  border-radius: 3px;
  border: #0C2340;
}
</style>
