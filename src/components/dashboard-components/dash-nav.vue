<template>
    <SidebarMenu @toggle-collapse="onToggleCollapse" :collapsed="$store.state.app.dashNavToggle" :menu="menu">
      <span slot="toggle-icon"><font-awesome-icon icon="arrows-alt-h"/></span>
    </SidebarMenu>
</template>

<script>
import { SidebarMenu } from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import DashNavOrigin from './dash-nav-origin'

export default {
  name: 'DashNav',
  props: ['modal_open', 'user_role'],
  components: {
    SidebarMenu,
    DashNavOrigin
  },
  data() {
    return {
        currentTab: 0,
        menu: [{
            component: DashNavOrigin,
            props: {
                user_role: this.user_role
            }
        }],
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
    onToggleCollapse(collapsed) {
        this.$store.dispatch('app/dashNavToggle')
    }
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
  }
};
</script>

<style scoped>
.v-sidebar-menu {
    background-color: #142d4c;
}
.v-sidebar-menu.vsm_expanded {
    position: sticky;
    width: 100%;
    height: 100vh;
}
.v-sidebar-menu.vsm_collapsed {
    position: sticky;
    width: 100%;
    height: 100vh;
}
</style>
<style>
.vsm--scroll-wrapper {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}
.vsm--scroll-wrapper::-webkit-scrollbar {
  display: none;
}
</style>
