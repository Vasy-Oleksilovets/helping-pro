<template>
  <div>
    <DashHeader :role="role" :profile="profile"/>
    <EstimatorProjectRequest v-if="role === 3" />
    <ManagerProjectRequest :role="role" v-if="role === 7 || role === 8" />
    <ManagerProjectRequest :role="role" v-if="role === 6" />
    <ManagerProjectRequest :role="role" v-if="role === 4" />
    <ManagerProjectRequest :role="role" v-if="role === 5" />
  </div>
</template>

<script>
import DashHeader from '../dash-header';
import EstimatorProjectRequest from './estimatorprojectrequest';
import ManagerProjectRequest from './managerprojectrequest/managerprojectrequest';

export default {
  name: 'ProjectRequest',
  props: ['role', 'profile'],
  components: {
    DashHeader,
    EstimatorProjectRequest,
    ManagerProjectRequest,
  },
  data() {
    return {};
  },
  methods: {},
  created() {},
};
</script>

<style scoped></style>
