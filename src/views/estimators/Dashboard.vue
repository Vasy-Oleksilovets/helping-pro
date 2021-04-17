<template>
  <b-row class="dashboard">
    <b-col cols="2" class="dash-navbar" style="padding: 0px;" :style="collapsed ? 'flex: 3.333%; max-width: 3.33%' : null">
      <DashNav :user_role="role" @selectMenu="selectMenu" />
    </b-col>
    <b-col cols="10" class="background-card dash-body" style="width: 100vh; padding: 0px;" :style="collapsed ? 'flex: 96.666%; max-width: 96.666%' : null">
      <!-- Dash Main Part -->
      <DashBody :menuSelect="menuSelect" @openModal="openModal" @openProfileModal="openProfileModal"/>
      <!-- Modal for Estimator ProfileViewer and Dashboard offer Modal -->
      <DashProjectOffer @closeModal="closeModal" v-if="modalOpen" />
      <ProfileEditView @closeProfileModal="closeProfileModal" v-if="profilemodalOpen" />
    </b-col>
  </b-row>
</template>

<script>
import DashBody from '../../components/dashboard-components/dash-body';
import DashNav from '../../components/dashboard-components/dash-nav';
import DashProjectOffer from '../../components/dashboard-components/dash-project-offer';
import ProfileEditView from '../../components/dashboard-components/dash-profile-edit';

export default {
  name: 'Dash-view',
  components: {
    DashBody,
    DashNav,
    DashProjectOffer,
    ProfileEditView,
  },
  data() {
    return {
      modalOpen: false,
      profilemodalOpen: false,
      menuSelect: 0,
      role: '',
      collapsed: this.$store.state.app.dashNavToggle
    };
  },
  methods: {
    openModal() {
      this.modalOpen = !this.modalOpen;
    },
    closeModal() {
      this.modalOpen = false;
    },
    closeProfileModal() {
      this.profilemodalOpen = false;
    },
    selectMenu(value) {
      this.menuSelect = value;
      this.$forceUpdate();
    },
    openProfileModal() {
      this.profilemodalOpen = !this.profilemodalOpen;
    },
  },
  created() {
    //Get the userRole
    let vm = this;
    if(localStorage.getItem('user_role')){
      this.role = JSON.parse(localStorage.getItem('user_role'));
    }
    else this.role = this.$store.state.auth.userRole;
    console.log(`this is the user role from Dashboard ${this.role}`);
  },
  watch: {
    '$store.state.app.dashNavToggle': function() {
      this.collapsed = this.$store.state.app.dashNavToggle;
    }
  }
};
</script>

<style scoped>
.background-card {
  background-color: #f9f9f9;
  padding-left: 0px !important;
  width: 100% !important;
  min-height: 100vh;
  height: auto;
}

.dashboard {
  width: 100vw;
  margin: 0px;
  padding: 0px;
}

@media only screen and (min-width: 650px) and (max-width: 1200px) {
  .dash-navbar {
    -webkit-box-flex: 0;
    flex: 0 0 7% !important;
    max-width: 7% !important;
  }
  .dash-body {
    -webkit-box-flex: 0;
    flex: 0 0 93% !important;
    max-width: 93% !important;
  }
}

@media only screen and (max-width: 650px) {
  .dash-navbar {
    -webkit-box-flex: 0;
    flex: 0 0 10% !important;
    max-width: 10% !important;
  }
  .dash-body {
    -webkit-box-flex: 0;
    flex: 0 0 90% !important;
    max-width: 90% !important;
  }
}

@media only screen and (min-width: 1200px) and (max-width: 1431px) {
  .dash-navbar {
    -webkit-box-flex: 0;
    flex: 0 0 5% !important;
    max-width: 5% !important;
  }
  .dash-body {
    -webkit-box-flex: 0;
    flex: 0 0 95% !important;
    max-width: 95% !important;
  }
}
</style>
