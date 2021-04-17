<template>
  <div class="dash-welcome">
    <div class="d-flex justify-content-between">
      <div>Construction Check Dasboard</div>
      <div>Today's Date: {{ new Date() | moment }}</div>
    </div>
    <div class="row underline"></div>
    <b-row class="mt-4">
      <b-col lg="4" cols="11" class="mb-2">
        <!-- <ProCurrentFee /> -->
        <ProCurrentFindEstimator :role="role"/>
      </b-col>
      <b-col lg="4" cols="11" class="mb-2">
        <proCurrentEstimatorComment />
      </b-col>
      <b-col lg="4" cols="11" class="mb-2">
        <CurrentComment :role="role"/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import ProCurrentFee from './proCurrentFee';
import CurrentComment from './CurrentComment';
import proCurrentEstimatorComment from './proCurrentEstimatorComment';
import ProCurrentFindEstimator from './proCurrentFindEstimator';
import moment from 'moment'

export default {
  name: 'ProCurrent',
  components: {
    ProCurrentFee,
    CurrentComment,
    ProCurrentFindEstimator,
    proCurrentEstimatorComment,
  },
  props: ["role"],
  data() {
    return {
      profile: {},
      currentProjects: [],
      newProjectSubmissions: [],
    };
  }, 
  created(){
  }, 
  filters: {
    moment: function (date) {
      return moment(date).format('LL, h:mm A');
    }
  }, 
  watch: {
    '$store.state.auth.profile': function() {
      let profile = this.$store.state.auth.profile;
      if(profile !== null){  
        this.currentProjects = profile.currentProjects;
        this.newProjectSubmissions = profile.newProjectSubmissions;
        if(this.currentProjects == null){
          this.currentProjects = [];
        }	
        if(this.newProjectSubmissions == null){
          this.newProjectSubmissions = [];
        }		
      } 
    }
  }        
};
</script>

<style scoped>
.dash-welcome {
  font-family: Montserrat;
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  padding: 30px 40px 20px 40px;
  margin: 30px;
  font-weight: 600;
  line-height: 20px;
}
.title-text {
  font-size: 1.15em;
  font-weight: 600;
  line-height: 20px;
}

.underline {
  border-bottom: 1px solid black;
}
.col-lg-6 {
  padding-left: 0px !important;
}

@media only screen and (max-width: 600px) {
  .dash-welcome {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    padding: 10px 10px 20px 40px;
    margin: 0px;
    margin-top: 10px;
  }
  .small-phone {
    margin-right: 5px;
  }
}
@media only screen and (max-width: 1400px) {
}
</style>
