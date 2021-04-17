<template>
    <div class="sidebar-desktop">
        <div class="logo" :style="collapsed ? 'visibility: hidden' : null">
            <img src="../../assets/img/logo_.png" alt="DASHNAV LOGO"/>
        </div>
        <template v-if="user_role!==2">
            <router-link class="router-link-no-underline" to="/dashboard/index">
                <div class="d-flex nav-tab" :style="collapsed ? 'padding-left: 20px' : null" :class="{'active-tab': currentTab == 0}" @click="navTabClick(0)">
                    <font-awesome-icon icon="chart-pie" class="nav-tab-icon" />
                    <span class="title">Dashboard</span>
                </div>
            </router-link>
            <router-link class="router-link-no-underline" v-if="user_role === 5 || user_role === 4" to="/dashboard/createproject">
                <div class="d-flex nav-tab" :style="collapsed ? 'padding-left: 20px' : null" :class="{'active-tab': currentTab == 1}" @click="navTabClick(1)">
                    <font-awesome-icon icon="folder-plus" class="nav-tab-icon" />
                    <span class="title">Drafts</span>
                </div>
            </router-link>
            <router-link class="router-link-no-underline" v-if="user_role === 5 || user_role === 4" to="/dashboard/projectindex">
                <div class="d-flex nav-tab" :style="collapsed ? 'padding-left: 20px' : null" :class="{'active-tab': currentTab == 2}" @click="navTabClick(2)">
                    <font-awesome-icon v-if="user_role === 5 || user_role === 4" icon="mail-bulk" class="nav-tab-icon" />
                    <font-awesome-icon v-else icon="book" class="nav-tab-icon" />
                    <span class="title" v-if="user_role === 5 || user_role === 4">Project Index</span>
                    <span class="title" v-else>Projects</span>
                </div>
            </router-link>
            <router-link class="router-link-no-underline" v-if="user_role === 4 || user_role === 5" to="/dashboard/projects">
                <div class="d-flex nav-tab" :style="collapsed ? 'padding-left: 20px' : null" :class="{'active-tab': currentTab == 3}" @click="navTabClick(3)">
                    <font-awesome-icon icon="book" class="nav-tab-icon" />
                    <span class="title">Projects</span>
                </div>
            </router-link>
            <router-link class="router-link-no-underline" to="/dashboard/projectrequest">
                <div class="d-flex nav-tab" :style="collapsed ? 'padding-left: 20px' : null" :class="{'active-tab': currentTab == 4}" @click="navTabClick(4)">
                    <font-awesome-icon v-if="user_role === 6" icon="mail-bulk" class="nav-tab-icon" />
                    <font-awesome-icon v-else-if="user_role === 5" icon="user-friends" class="nav-tab-icon" />
                    <font-awesome-icon v-else icon="map" class="nav-tab-icon" />
                    <span class="title" v-if="user_role === 6">Project Submission</span>
                    <span class="title" v-else-if="user_role === 4">Location</span>
                    <span class="title" v-else-if="user_role === 5">Project Managers</span>
                    <span class="title" v-else-if="user_role === 3">Project Offers</span>
                    <span class="title" v-else>Project Request</span>
                </div>
            </router-link>
            <router-link class="router-link-no-underline" v-if="user_role === 4 || user_role === 5 || user_role === 2" to="/dashboard/companyinvite">
                <div class="d-flex nav-tab" :style="collapsed ? 'padding-left: 20px' : null" :class="{'active-tab': currentTab == 5}" @click="navTabClick(5)">
                    <font-awesome-icon icon="user-tie" class="nav-tab-icon" />
                    <span class="title" v-if="user_role === 4">Invite Users</span>
                    <span class="title" v-if="user_role === 5">Invite Managers</span>
                </div>
            </router-link>
            <router-link class="router-link-no-underline" v-if="user_role === 4 || user_role == 6 || user_role == 5"  to="/dashboard/addclient">
                <div class="d-flex nav-tab" :style="collapsed ? 'padding-left: 20px' : null" :class="{'active-tab': currentTab == 6}" @click="navTabClick(6)">
                    <font-awesome-icon icon="user-plus" class="nav-tab-icon" />
                    <span class="title">Add Client</span>
                </div>
            </router-link>
            <router-link class="router-link-no-underline" to="/dashboard/myprofile">
                <div class="d-flex nav-tab" :style="collapsed ? 'padding-left: 20px' : null" :class="{'active-tab': currentTab == 7}" @click="navTabClick(7)">
                    <font-awesome-icon icon="id-badge" class="nav-tab-icon" />
                    <span class="title" v-if="user_role === 5 || user_role === 4">Office Profile</span>
                    <span class="title" v-else>My Profile</span>
                </div>
            </router-link>
            <router-link class="router-link-no-underline" to="/dashboard/billing">
                <div class="d-flex nav-tab" :style="collapsed ? 'padding-left: 20px' : null" :class="{'active-tab': currentTab == 8}" @click="navTabClick(8)">
                    <font-awesome-icon icon="comment-dollar" class="nav-tab-icon" />
                    <span class="title" v-if="user_role === 3 || user_role === 7 || role === 8">Payment Methods</span>
                    <span class="title" v-else>Payment Options</span>
                </div>
            </router-link>
            <router-link class="router-link-no-underline" to="/dashboard/settings">
                <div class="d-flex nav-tab" :style="collapsed ? 'padding-left: 20px' : null" :class="{'active-tab': currentTab == 9}" @click="navTabClick(9)">
                    <font-awesome-icon icon="cog" class="nav-tab-icon" />
                    <span class="title">Settings</span>
                </div>
            </router-link>
            <div @click="signOut" role="button" class="d-flex nav-tab signout"  :style="collapsed ? 'padding-left: 20px' : null">
                <b-icon icon="box-arrow-in-right" class="nav-tab-icon"></b-icon>
                <span class="title">Sign Out</span>
            </div>
        </template>
        <template v-else>
            <router-link class="router-link-no-underline" to="/dashboard/index">
                <div class="d-flex nav-tab" :style="collapsed ? 'padding-left: 20px' : null" :class="{'active-tab': currentTab == 0}" @click="navTabClick(0)">
                    <font-awesome-icon icon="chart-pie" class="nav-tab-icon" />
                    <span class="title">Dashboard</span>
                </div>
            </router-link>
            <router-link class="router-link-no-underline" to="/dashboard/adminSearchClients">
                <div class="d-flex nav-tab" :style="collapsed ? 'padding-left: 20px' : null" :class="{'active-tab': currentTab == 1}" @click="navTabClick(1)">
                    <font-awesome-icon icon="user-tie" class="nav-tab-icon" />
                    <span class="title">Clients</span>
                </div>
            </router-link>
            <router-link class="router-link-no-underline" to="/dashboard/adminListEstimators">
                <div class="d-flex nav-tab" :style="collapsed ? 'padding-left: 20px' : null" :class="{'active-tab': currentTab == 2}" @click="navTabClick(2)">
                    <font-awesome-icon icon="lightbulb" class="nav-tab-icon" />
                    <span class="title">Estimators</span>
                </div>
            </router-link>
            <router-link class="router-link-no-underline" to="/dashboard/adminSearchProjects">
                <div class="d-flex nav-tab" :style="collapsed ? 'padding-left: 20px' : null" :class="{'active-tab': currentTab == 3}" @click="navTabClick(3)">
                    <font-awesome-icon icon="book" class="nav-tab-icon" />
                    <span class="title">Projects</span>
                </div>
            </router-link>
            <router-link class="router-link-no-underline" to="/dashboard/adminInviteClients">
                <div class="d-flex nav-tab" :style="collapsed ? 'padding-left: 20px' : null" :class="{'active-tab': currentTab == 5}" @click="navTabClick(5)">
                    <font-awesome-icon icon="users" class="nav-tab-icon" />
                    <span class="title">Invite Users</span>
                </div>
            </router-link>
            <div @click="signOut" role="button" class="d-flex nav-tab signout" :style="collapsed ? 'padding-left: 20px' : null">
                <b-icon icon="box-arrow-in-right" class="nav-tab-icon"></b-icon>
                <span class="title">Sign Out</span>
            </div>
        </template>
    </div>
</template>

<script>
export default {
  name: 'DashNavOrigin',
  props: ['modal_open', 'user_role'],
  data() {
    return {
        currentTab: 0,
        collapsed: this.$store.state.app.dashNavToggle
    }
  },
  methods: {
    navTabClick(val) {
        this.currentTab = val;
    },
    signOut() {
        this.$store.dispatch('auth/logout');
        this.$store.dispatch('app/reset');
        this.$router.push('/login');
        localStorage.clear();
    },
  },
  created() {
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
    '$store.state.app.dashNavToggle': function() {
        this.collapsed = this.$store.state.app.dashNavToggle;
    }
  }
};
</script>

<style scoped>
.sidebar-desktop {
    display: flex;
    position: sticky;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: #142d4c;
    padding-left: 3px;
    border: none;
    overflow-y: scroll;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}
.sidebar-desktop::-webkit-scrollbar {
  display: none;
}

.title {
    width: 159px;
    height: 20px;
    font-family: Montserrat;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.2px;
    text-align: left;
    color: #ffffff;
}
.logo {
    min-height: 128px;
    padding: 36px 0 0 32px;
}
.nav-tab {
    display: flex;
    align-items: center;
    width: 100%;
    height: 56px;
    padding-left: 32px;
    border: none;
    cursor: pointer;
}
.nav-tab-icon {
    margin-right: 24px;
    color: #ffffff;
    font-size: 16px;
}
.active-tab {
    background: white;
    border-right: 1px solid white;
}
.active-tab .title {
    color: #4b506d;
}
.active-tab .nav-tab-icon {
    color: #142d4c;
}
.router-link-no-underline {
    display: inline-block;
    text-decoration:none;
}
.signout {
    margin-top: 5%;
    margin-bottom: 10%;
}
@media only screen and (max-width: 1551px) {
    .nav-tab {
        padding-left: 20px;
    }
    .logo {
        padding-left: 20px;
    }
}
@media only screen and (max-width: 1431px) {
    .nav-tab .title {
        display: none;
    }
    .sidebar-desktop {
        width: 60px;
    }
    .logo {
        visibility: hidden;
    }
    .signout {
        margin: 30px 0 20px;
    }
}
@media only screen and (max-width: 685px) {
    .nav-tab {
        padding-left: calc(4.1vw - 8px);
    }
}
</style>
<style>
@media only screen and (max-width: 1431px) {
    .vsm--toggle-btn {
        display: none !important;
    }
}

</style>
