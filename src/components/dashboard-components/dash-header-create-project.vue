<template>
  <div class="dash-header">
    <div class="project-manager-header">
      <b-row class="justify-content-between w-100">
        <b-col class="title-text d-flex align-items-center">
          <font-awesome-icon icon="angle-left" class="mr-3" style="color: #0071e3; font-size: 24px"/>
          <span v-if="createProjectStep===1" style="color: #0071e3; cursor: pointer" @click="goBackToProjects()">Back to drafts</span>
          <span v-if="createProjectStep===2" style="color: #0071e3; cursor: pointer" @click="goBackStep()">Back to step 1</span>
          <span v-if="createProjectStep===3" style="color: #0071e3; cursor: pointer" @click="goBackStep()">Back to step 2</span>
        </b-col>
        <b-col class="title-text justify-content-end align-items-center d-flex">
          <div style="border-right: 2px solid #c5c7cd; height: 100%; display: flex; align-items: center; margin: 10px 0px; margin-right: 33px">
            <span><font-awesome-icon icon="search" class="nav-tab-icon"/></span>
            <span><font-awesome-icon icon="bell" class="nav-tab-icon"/></span>
          </div>
          <div style="margin-right: 14px">
            <div>{{$store.state.auth.profile.firstName}} {{$store.state.auth.profile.lastName}}</div>
            <div>Project Manager</div>
          </div>
          <b-avatar variant="info" size="44px" style="padding: 2px; border: 2px solid #dfe0eb; background-color: white" src="https://placekitten.com/300/300"></b-avatar>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BreadCrumb from '@/components/BreadCrumb'
export default {
  data() {
    return {
      is_open: this.profile.openNew,
    };
  },
  props: ['goBackToProjects'],
  name: 'DashHeaderCreateProject',
  components: {
    BreadCrumb
  },
  methods: {
    check(e) {
      this.is_open = !this.is_open;
      this.$emit('isOpen', this.is_open);
    },
    goBackStep() {
      this.$store.dispatch('app/createProjectStep', { step: this.createProjectStep - 1 })
    }
  },
  created() {
  },
  computed: mapState('app', ['createProjectStep'])
};
</script>

<style lang="css" scoped>
button {
  padding: 0px !important;
}
.project-manager-header {
  display: flex;
  align-items: center;
  min-height: 34px;
}
.dash-header {
  font-family: Montserrat;
  padding: 30px 30px 24px 30px;
  font-size: 16px
}
.title-text {
  font-weight: 600;
  line-height: 20px;
  color: #252733;
}
.font-content {
  font-size: 14px;
  font-weight: 600;
}
.icon-margin {
  margin-right: 10px !important;
}
.custom-notifications {
  display: flex;
  justify-content: flex-end;
  padding-top: 7px;
  z-index: 0;
}
.custom-breadcrumb {
  color: #252733; 
  letter-spacing: 0.3px; 
  font-size: 24px
}
.nav-tab-icon {
  margin-right: 28px;
  color: #c5c7cd    ;
  font-size: 16px;
}
@media only screen and (max-width: 600px) {
  .notifications {
    display: flex;
    padding-top: 7px
  }
}
</style>