<template>
  <div class="dash-nav">
    <b-row class="no-gutters">
      <div class="nav-upper">
        <div style="display: flex; justify-content: space-between; align-items: center">
          <img class="cc-logo-dash" alt="CC logo" src="../../assets/img/thumbnail_Construction-Check_Logo_Horiz_Tagline2_Knockout_2.png"/>
          <div style="color: white; margin-right: 5%" class="hamberger-menu">
            <i class="fa fa-bars fa-2x" aria-hidden="true" @click="toggleMenu"></i>
          </div>
        </div>

        <!--General User Nenu-->
        <ul v-if="user_role!==2" :class="{'active-menu': showMenu, 'dash-nav-list':true}">
          <router-link to="/dashboard/index">
            <li class="dash-nav-item" v-bind:class="{ active: currentTab==0 }" @click="currentTab=0">
              <span>Dashboard</span>
              <img class="dash-nav-arrow" style="" alt="Vue logo" src="~@/assets/img/nav-arrow.png"/>
            </li>
          </router-link>

          <router-link v-if="user_role === 5 || user_role === 4" to="/dashboard/createproject">
            <li class="dash-nav-item" v-bind:class="{ active: currentTab==1 }" @click="currentTab=1">
              <span>Create Project</span>
              <img class="dash-nav-arrow" style="" alt="Vue logo" src="~@/assets/img/nav-arrow.png"/>
            </li>
          </router-link>

          <router-link to="/dashboard/myprojects">
            <li class="dash-nav-item" v-bind:class="{ active: currentTab==2 }" @click="currentTab=2">
              <span v-if="user_role === 5 || user_role === 4">Project Submission</span>
              <span v-else>Projects</span>
              <img class="dash-nav-arrow" alt="Vue logo" src="~@/assets/img/nav-arrow.png"/>
            </li>
          </router-link>
          <router-link v-if="user_role === 4 || user_role === 5" to="/dashboard/projects">
            <li class="dash-nav-item" v-bind:class="{ active: currentTab==3 }" @click="currentTab=3">
              <span>Projects</span>
              <img class="dash-nav-arrow" style="" alt="Vue logo" src="~@/assets/img/nav-arrow.png"/>
            </li>
          </router-link>
            <router-link to="/dashboard/projects2">
            <li class="dash-nav-item" v-bind:class="{ active: currentTab==3 }" @click="currentTab=3">
              <span>Projects 2</span>
              <img class="dash-nav-arrow" style="" alt="Vue logo" src="~@/assets/img/nav-arrow.png"/>
            </li>
          </router-link>
          <router-link to="/dashboard/projectrequest">
            <li class="dash-nav-item" v-bind:class="{ active: currentTab==4 }" @click="currentTab=4">
              <span v-if="user_role === 6">Project Submission</span>
              <span v-else-if="user_role === 4">Location</span>
              <span v-else-if="user_role === 5">Project Managers</span>
              <span v-else-if="user_role === 3">Project Offers</span>
              <span v-else>Project Request</span>
              <img class="dash-nav-arrow" style="" alt="Vue logo" src="~@/assets/img/nav-arrow.png"/>
            </li>
          </router-link>
          <router-link v-if="user_role === 4 || user_role === 5 || user_role === 2" to="/dashboard/companyinvite">
            <li class="dash-nav-item" v-bind:class="{ active: currentTab==5}" @click="currentTab=5">
              <span v-if="user_role === 4">Invite Users</span>
              <span v-if="user_role === 5">Invite Managers</span>
              <img class="dash-nav-arrow" style="" alt="Vue logo" src="~@/assets/img/nav-arrow.png"/>
            </li>
          </router-link>
          <router-link v-if="user_role === 4 || user_role == 6 || user_role == 5"  to="/dashboard/addclient">
            <li class="dash-nav-item" v-bind:class="{ active: currentTab==6 }" @click="currentTab=6">
              <span>Add Client</span>
              <img class="dash-nav-arrow" style="" alt="Vue logo" src="~@/assets/img/nav-arrow.png"/>
            </li>
          </router-link>
          <router-link to="/dashboard/myprofile">
            <li class="dash-nav-item" v-bind:class="{ active: currentTab==7 }" @click="currentTab=7">
              <span v-if="user_role === 5 || user_role === 4">Office Profile</span>
              <!-- <span v-else-if="user_role === 4">Company Profile</span> -->
              <span v-else>My Profile</span>
              <img class="dash-nav-arrow" style="" alt="Vue logo" src="~@/assets/img/nav-arrow.png"/>
            </li>
          </router-link>
          <router-link to="/dashboard/billing">
            <li class="dash-nav-item" v-bind:class="{ active: currentTab==8 }" @click="currentTab=8">
              <span v-if="user_role === 3 || user_role === 7 || role === 8">Payment Methods</span>
              <span v-else>Payment Options</span>
              <img class="dash-nav-arrow" style="" alt="Vue logo" src="~@/assets/img/nav-arrow.png"/>
            </li>
          </router-link>
          <router-link to="/dashboard/settings">
            <li class="dash-nav-item" v-bind:class="{ active: currentTab==9 }" @click="currentTab=9">
              <span>Settings</span>
              <img class="dash-nav-arrow" style="" alt="Vue logo" src="~@/assets/img/nav-arrow.png"/>
            </li>
          </router-link>
          <div @click="signOut" role="button" class="d-flex justify-content-center align-items-center signout">
            <b-icon icon="box-arrow-in-right" scale="2" class="mr-3"></b-icon>
            <div>Sign Out</div>
          </div>
        </ul>

        <!-- Admin User Navbar -->
        <ul v-else class="dash-nav-list">
          <router-link to="/dashboard/index">
            <li class="dash-nav-item" v-bind:class="{ active: currentTab==0 }" @click="currentTab=0">
              <span>Dashboard</span>
              <img class="dash-nav-arrow" style="" alt="Vue logo" src="~@/assets/img/nav-arrow.png"/>
            </li>
          </router-link>
          <router-link to="/dashboard/adminSearchClients">
            <li class="dash-nav-item" v-bind:class="{ active: currentTab==1 }" @click="currentTab=1">
              <span>Clients</span>
              <img class="dash-nav-arrow" style="" alt="Vue logo" src="~@/assets/img/nav-arrow.png"/>
            </li>
          </router-link>
          <router-link to="/dashboard/adminListEstimators">
            <li class="dash-nav-item" v-bind:class="{ active: currentTab==2 }" @click="currentTab=2">
              <span>Estimators</span>
              <img class="dash-nav-arrow" style="" alt="Vue logo" src="~@/assets/img/nav-arrow.png"/>
            </li>
          </router-link>
          <router-link to="/dashboard/adminSearchProjects">
            <li class="dash-nav-item" v-bind:class="{ active: currentTab==3 }" @click="currentTab=3">
              <span>Projects</span>
              <img class="dash-nav-arrow" style="" alt="Vue logo" src="~@/assets/img/nav-arrow.png"/>
            </li>
          </router-link>
          <router-link to="/dashboard/adminInviteClients">
            <li class="dash-nav-item" v-bind:class="{ active: currentTab==4 }" @click="currentTab=4">
              <span>Invite Users</span>
              <img class="dash-nav-arrow" style="" alt="Vue logo" src="~@/assets/img/nav-arrow.png"/>
            </li>
          </router-link>
          <div @click="signOut" role="button" style="margin-top: 70%;" class="d-flex justify-content-center align-items-center">
            <b-icon icon="box-arrow-in-right" scale="2" class="mr-3"></b-icon>
            <div>Sign Out</div>
          </div>
        </ul>
      </div>
    </b-row>
    <b-row class="no-gutters copyright">
      <p class="cr-text">Copyright, 2020</p>
      <p class="cr-text">Construction Check.</p>
      <p class="cr-text">All Rights Reserved.</p>
    </b-row>
  </div>
</template>

<script>
import { BIcon, BIconBoxArrowInRight } from 'bootstrap-vue'
export default {
  name: 'DashNav',
  props: ['modal_open', 'user_role'],
  data() {
    return {
      currentTab: 0,
      showMenu: true
    };
  },
  components: {
    BIcon,
    BIconBoxArrowInRight
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    signOut() {
      this.$store.dispatch('auth/logout');
      this.$store.dispatch('app/reset');
      this.$router.push('/login');
      localStorage.clear();
    },
    resizeWindow() {
      if(window.innerWidth > 991) this.showMenu = false
    }
  },
  created: function() {
    var currentUrl = window.location.pathname;
    switch (currentUrl) {
      case '/dashboard/adminSearchClients':
        this.currentTab = 1;
        break;
      case '/dashboard/adminListEstimators':
        this.currentTab = 2;
        break;
      case '/dashboard/adminSearchProjects':
        this.currentTab = 3;
        break;
      default:
          break;
    }
    window.addEventListener("resize", this.resizeWindow);
  },
  watch: {
    $route(to, from) {
      var currentUrl = window.location.pathname;
      switch (currentUrl) {
        case '/dashboard/adminSearchClients':
          this.currentTab = 1;
          break;
        case '/dashboard/adminListEstimators':
          this.currentTab = 2;
          break;
        case '/dashboard/adminSearchProjects':
          this.currentTab = 3;
          break;
        default:
          break;
      }
    },
  }
};
</script>

<style lang="css" scoped>
.dash-nav-arrow {
  color: #999999;
  height: 15px;
}

a {
  text-decoration: none;
  color: white;
}

.dash-nav-item {
  height: 40px;
  padding-top: 10px;
  padding-left: 15px;
  padding-right: 15px;
}



.dash-nav-item:hover {
    background-color: #030B16
}

li {
    display: flex;
    justify-content: space-between;
}

.copyright {
    flex-direction: column;
    align-content: center;
}

.copyright p {
    margin: 0px;
}

.cc-logo-dash {
    width: 80%;
    margin: auto;
}

.cr-text {
    text-align: center;
    color: white;
}

.dash-nav-list {
    list-style-type: none;
    padding: 0px;
    color: white;
    width: 100%;
    overflow: hidden;
}

.dash-nav {
    padding-top: 15px;
    padding-bottom: 15px;
    display: flex;
    min-height: 100vh;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
    background: #0C2340;
}

.nav-upper {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.hamberger-menu {
    display: none;
}

.signout {
    margin-top: 70%;
}

@media only screen and (max-width: 1000px) {
    .nav-upper {
        display: flex;
        width: 100%;
    }
    .cc-logo-dash {
        width: 30%;
        margin: 0px 0px 0px 20px;
    }
    .hamberger-menu {
        display: block;
    }
    .copyright {
        flex-direction: column;
        align-content: center;
        display: none
    }
    .dash-nav-list {
        height: auto;
    }
    .dash-nav-list-mobile {
        list-style-type: none;
        padding: 0px;
        color: white;
        width: 100%;
    }
    .dash-nav {
        padding-top: 15px;
        padding-bottom: 15px;
        display: flex;
        min-height: 10vh;
        height: 100%;
        flex-direction: column;
        justify-content: space-between;
        background: #0C2340;
    }
    .signout {
        margin-top: 5%;
    }
    .active-menu {
        height: 0;
    }
}

.active {
    background-color: #030B16
}
</style>
