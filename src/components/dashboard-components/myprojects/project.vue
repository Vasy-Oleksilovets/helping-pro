<template>
  <div>
    <ClientProject :role="role" v-if="role === 3" />
    <ProjectManager :role="role" v-if="role === 7 || role === 8 || role === 6" />
    <CompanyMyProjects :role="role" :projects="projects"  v-if="role === 4 || role === 5"/>
  </div>
</template>
<script>
import DashHeader from '../dash-header';
import ClientProject from './clientproject';
import ProjectManager from './projectmanager';
import CompanyMyProjects from './companymyprojects';
export default {
  name: 'Project',
  props: ['role', 'projects', 'profile'],
  components: {
    DashHeader,
    ClientProject,
    ProjectManager,
    CompanyMyProjects
  },
  data() {
      return {};
  },
  methods: {},
  created() {
  },
};
</script>

<style scoped></style>
