<template>
  <div>
    <DashHeader :role="role" :profile="profile"/>
    <CompanyProfile @openProfileModal="openProfileModal" v-if="role === 4 || role === 5" :role="role"/>
    <ExtraProfile @openProfileModal="openProfileModal" :role="role" v-else/>
  </div>
</template>

<script>
import DashHeader from '../dash-header';
import CompanyProfile from './companyprofile';
import ExtraProfile from './extraprofile';
export default {
  name: 'Profile',
  props: ['role', 'profile'],
  components: {
    DashHeader,
    CompanyProfile,
    ExtraProfile
  }, 
  methods: {
    openProfileModal() {
      this.$emit('openProfileModal');
    },
  },
};
</script>

<style scoped>
</style>
