<template>
  <div>
    <!-- <DashHeader v-if="is_id" :role="user_role" :profile="profile" @isOpen="setOpen"/>
    <DashHeaderDetail v-else :role="user_role" :profile="profile"/> -->
    <router-view @openModal="openModal" @openProfileModal="openProfileModal" @closeProfileModal="closeProfileModal" :role="user_role" :projects="projects" :profile="profile"></router-view>
  </div>
</template>

<script>
import DashHeader from './dash-header';
import DashHeaderDetail from './dash-header-detail';
import EstimatorProxy from '@/proxies/EstimatorProxy.js';
import AuthProxy from '@/proxies/AuthProxy.js';
import store from "@/store";
import EventBus from '../../plugins/event-bus';

export default {
  name: 'DashBody',
  props: ['menuSelect'],
  components: {
    DashHeader,
    DashHeaderDetail,
  },
  data() {
    return {
      is_id: true,
      profile: {},
      //If the user_role is 0: Estimator
      //If the user role is 1: Project Manager
      //If the user role is 2: Client
      //If the user role is 3: Company role
      //If the user role is 4: Client Manager
      //If the user role is 5: Super Admin

      //If the user role is 6 -> Project Administrator
      //If the user role is 5 -> Portfolio Administrator
      //If the user role is 4 -> Company Administrator
      //If the user role is 2 -> CC Admin 
      user_role: '',
      projects:[]
    };
  },

  methods: {
    // Open Estimator Offer Selected Modal
    openModal() {
      this.$emit('openModal');
    },
    // Open Estimator Profile Modal or Close Modal
    openProfileModal() {
      this.$emit('openProfileModal');
    },
    closeProfileModal() {
      this.$emit('closeProfileModal');
    },
    compare( a, b ) {
      if (a.createdDate < b.createdDate){
        return -1;
      }
      if (a.createdDate > b.createdDate){
        return 1;
      }
      return 0;
    },
    getDashboard(){
      new AuthProxy().getDashboard()
      .then(response => {
        this.profile = response.data;
        if(Object.keys(this.profile).length > 0){
          localStorage.setItem('profile', JSON.stringify(this.profile));
          EventBus.$emit('read_profile', {
            profile: this.profile
          });
          this.projects = this.profile.currentProjects;
          this.projects.sort(this.compare);
        }
      })
      .catch(error => {
        console.error('error!: ' + error);
      })
      .finally(() => {
        store.dispatch("auth/setMyProfile", {
          profile: this.profile,
        });
      });
    },
    setOpen(isOpen){
      var params = new URLSearchParams();
      params.append("isOpen", isOpen);
      new EstimatorProxy()
        .setEstimatorOpen(params)
        .then(response => {
          this.profile.isOpenNew = isOpen;
        })
        .catch(error => {
          console.error('error!: ' + error);
        })
        .finally(() => {
          //this.isLoading = false;
        });
    }
  },

  created() {
    this.user_role = parseInt(localStorage.getItem('user_role'));
    if (this.$route.path.indexOf('/dashboard/myprojects/detail') !== -1)
      this.is_id = false;
    else {
      this.is_id = true;
    }
    this.getDashboard();
    // TEST
  },

  watch: {
    $route(to, from) {
      if (this.$route.path.indexOf('/dashboard/myprojects/detail') !== -1)
        this.is_id = false;
      else this.is_id = true;
      this.getDashboard();
    },
  },

  mounted() {
    this.user_role = parseInt(localStorage.getItem('user_role'));
    this.getDashboard();
  },

  computed: {

  },
};
</script>

<style lang="css" scoped>
.dash-body {
  background-color: #F4F5F8;
  width: 100%;
  margin-right: 10px;
}
</style>
