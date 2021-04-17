<template>
  <div class="dash-header">
    <!-- This is the header for the Estimator -->
    <div v-if="role === 3">
      <b-row>
        <b-col class="title-text d-flex align-items-center">
          <bread-crumb />
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="11" lg="4" class="form-section">
          <span v-if="profile.availableForWork">Available for work</span>
          <span v-if="!profile.availableForWork">Unavailable for work</span>
        </b-col>
        <b-col cols="11" lg="4" style="display: flex; margin-top: 8px">
          <span class="font-content">Open to opportunities?</span>
          <span class="font-content" style="margin-left:18px">Yes</span>
          <b-form-checkbox @change="check($event)" v-model="is_open" switch size="lg" style="transform: rotate(180deg); margin-top: 2px; width: 42px; height: 21px"></b-form-checkbox>
          <span class="font-content" style="margin-left:15px">No</span>
        </b-col>
        <b-col class="title-text justify-content-end align-items-center d-flex">
          <!-- <img v-if="profile.numberofNotifications > 0" alt="Vue logo" style="height: 24px" src="~@/assets/img/notification-icon.png"/>
          <img v-else alt="Vue logo" style="height: 24px" src="~@/assets/img/notification-whtie.png"/>
          <span class="font-content" style="margin-right: 4%">Notifications ({{profile.numberOfNotifications}})</span> -->
          <div style="border-right: 2px solid #c5c7cd; height: 100%; display: flex; align-items: center; margin: 10px 0px; margin-right: 33px">
            <span><font-awesome-icon icon="search" class="nav-tab-icon"/></span>
            <span><font-awesome-icon icon="bell" class="nav-tab-icon"/></span>
          </div>
          <div style="margin-right: 14px">
            <div>{{profile.firstName}} {{profile.lastName}}</div>
            <div>{{roles[role]}}</div>
          </div>
          <b-avatar variant="info" size="44px" style="padding: 2px; border: 2px solid #dfe0eb; background-color: white" src="https://placekitten.com/300/300"></b-avatar>
        </b-col>
      </b-row>
    </div>
    <!-- This is the header for the Project Manager -->
    <div class="project-manager-header" v-if="role === 7 || role === 8">
      <b-row class="justify-content-between w-100">
        <!-- <b-col class="title-text">{{profile.firstName + " " + profile.lastName}}</b-col> -->
        <b-col class="title-text d-flex align-items-center">
          <bread-crumb />
        </b-col>
      <!-- </b-row>
      <b-row> -->
        <b-col class="title-text justify-content-end align-items-center d-flex">
          <!-- <img v-if="profile.numberofNotifications > 0" alt="Vue logo" style="height: 24px" src="~@/assets/img/notification-icon.png"/>
          <img v-else alt="Vue logo" style="height: 24px" src="~@/assets/img/notification-whtie.png"/>
          <span class="font-content" style="margin-right: 4%">Notifications ({{profile.numberOfNotifications}})</span> -->
          <div style="border-right: 2px solid #c5c7cd; height: 100%; display: flex; align-items: center; margin: 10px 0px; margin-right: 33px">
            <span><font-awesome-icon icon="search" class="nav-tab-icon"/></span>
            <span><font-awesome-icon icon="bell" class="nav-tab-icon"/></span>
          </div>
          <div style="margin-right: 14px">
            <div>{{profile.firstName}} {{profile.lastName}}</div>
            <div>{{roles[role]}}</div>
          </div>
          <b-avatar variant="info" size="44px" style="padding: 2px; border: 2px solid #dfe0eb; background-color: white" src="https://placekitten.com/300/300"></b-avatar>
        </b-col>
      </b-row>
    </div>
    <!-- This is for the Project Administrator -->
    <div class="project-manager-header" v-if="role === 6">
      <b-row class="justify-content-between w-100">
        <b-col class="title-text d-flex align-items-center">
          <bread-crumb />
        </b-col>
      <!-- </b-row>
      <b-row> -->
        <b-col class="title-text justify-content-end align-items-center d-flex">
          <!-- <img v-if="profile.numberofNotifications > 0" alt="Vue logo" style="height: 24px" src="~@/assets/img/notification-icon.png"/>
          <img v-else alt="Vue logo" style="height: 24px" src="~@/assets/img/notification-whtie.png"/>
          <span class="font-content" style="margin-right: 4%">Notifications ({{profile.numberOfNotifications}})</span> -->
          <div style="border-right: 2px solid #c5c7cd; height: 100%; display: flex; align-items: center; margin: 10px 0px; margin-right: 33px">
            <span><font-awesome-icon icon="search" class="nav-tab-icon"/></span>
            <span><font-awesome-icon icon="bell" class="nav-tab-icon"/></span>
          </div>
          <div style="margin-right: 14px">
            <div>{{profile.firstName}} {{profile.lastName}}</div>
            <div>{{roles[role]}}</div>
          </div>
          <b-avatar variant="info" size="44px" style="padding: 2px; border: 2px solid #dfe0eb; background-color: white" src="https://placekitten.com/300/300"></b-avatar>
        </b-col>
      </b-row>
    </div>
    
    <div class="project-manager-header" v-if="role === 4 || role === 5">
      <b-row class="justify-content-between w-100">
        <b-col class="title-text d-flex align-items-center">
         <!-- <span class="custom-breadcrumb">Projects</span> -->
          <bread-crumb />
        </b-col>
        <b-col class="title-text justify-content-end align-items-center d-flex">
          <!-- <img v-if="profile.numberofNotifications > 0" alt="Vue logo" style="height: 24px" src="~@/assets/img/notification-icon.png"/>
          <img v-else alt="Vue logo" style="height: 24px" src="~@/assets/img/notification-whtie.png"/>
          <span class="font-content" style="margin-right: 4%">Notifications ({{profile.numberOfNotifications}})</span> -->
          <div style="border-right: 2px solid #c5c7cd; height: 100%; display: flex; align-items: center; margin: 10px 0px; margin-right: 33px">
            <span><font-awesome-icon icon="search" class="nav-tab-icon"/></span>
            <span><font-awesome-icon icon="bell" class="nav-tab-icon"/></span>
          </div>
          <div style="margin-right: 14px">
            <div>{{profile.firstName}} {{profile.lastName}}</div>
            <div>{{roles[role]}}</div>
          </div>
          <b-avatar variant="info" size="44px" style="padding: 2px; border: 2px solid #dfe0eb; background-color: white" src="https://placekitten.com/300/300"></b-avatar>
        </b-col>
      </b-row>
    </div>

    <div class="project-manager-header" v-if="role === 2">
      <b-row class="justify-content-between w-100">
        <b-col class="title-text">Construction Check</b-col>
      <!-- </b-row>
      <b-row> -->
        <b-col class="title-text justify-content-end align-items-center d-flex">
          <!-- <img v-if="profile.numberofNotifications > 0" alt="Vue logo" style="height: 24px" src="~@/assets/img/notification-icon.png"/>
          <img v-else alt="Vue logo" style="height: 24px" src="~@/assets/img/notification-whtie.png"/>
          <span class="font-content" style="margin-right: 4%">Notifications ({{profile.numberOfNotifications}})</span> -->
          <div style="border-right: 2px solid #c5c7cd; height: 100%; display: flex; align-items: center; margin: 10px 0px; margin-right: 33px">
            <span><font-awesome-icon icon="search" class="nav-tab-icon"/></span>
            <span><font-awesome-icon icon="bell" class="nav-tab-icon"/></span>
          </div>
          <div style="margin-right: 14px">
            <div>{{profile.firstName}} {{profile.lastName}}</div>
            <div>{{roles[role]}}</div>
          </div>
          <b-avatar variant="info" size="44px" style="padding: 2px; border: 2px solid #dfe0eb; background-color: white" src="https://placekitten.com/300/300"></b-avatar>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb'
import { roles } from '@/vue.config.js'
export default {
  data() {
    return {
      is_open: this.profile.openNew,
      roles
    };
  },
  name: 'DashHeader',
  props: ['role','profile'],
  components: {
    BreadCrumb
  },
  methods: {
    check(e) {
      this.is_open = !this.is_open;
      this.$emit('isOpen', this.is_open);
    },
  },
  created() {
  },
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
  font-size: 14px
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
