<template>
  <div class="container-fluid">
    <ProjectManagerHeader />
    <Estimates/>
  </div>
</template>

<script>
import Estimates from './project-manager-components/estimates';
import ProjectManagerHeader from './project-manager-components/project-manager-header';
import store from '@/store';

export default {
  name: 'ProjectManager',
  components: {
    Estimates,
    ProjectManagerHeader,
  },
  mounted() {
    store.dispatch('projectmanager/initiateEstimateLine', {
      id: this.$route.params.subproject_id,
    });
  }
};
</script>

<style lang="css" scoped></style>
