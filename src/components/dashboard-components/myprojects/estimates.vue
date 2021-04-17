<template>
  <div>
    <!-- Header -->
    <div class="estimate-header-filter-bar d-flex">
      <b-col cols="6" sm="4">
        <MasterAutoComplete class="ml-4" v-model="code" :initial="code" :disabled="false"/>
      </b-col>
      <b-col cols="6" sm="2" offset-sm="6" class="pr-" style="align-items: center; display: flex; justify-content: flex-end; background-color: #1C3452;">
        <div style="color: #FB922F"> Back to top <img src="~@/assets/img/back-to-top.png" /></div>
      </b-col>
    </div>
    <div class="estimates-main-body">
      <b-row class="estimates-header-columns no-gutters">
        <b-col cols="2"> CODE </b-col>
        <b-col cols="2"> DESCRIPTION </b-col>
        <b-col cols="1"> QUANTITY </b-col>
        <b-col cols="1"> UNIT </b-col>
        <b-col cols="1"> MATERIAL COST </b-col>
        <b-col cols="1"> LABOR COST </b-col>
        <b-col cols="1"> EQUIPMENT COST </b-col>
        <b-col cols="1"> SUBCONTRACTOR COST </b-col>
        <b-col cols="2"> TOTAL </b-col>
      </b-row>

      <transition name="fade">
        <NewEstimatesCell class="mt-2" v-show="getNewEstimateStatus" :newNumber="getNewCodeNumber" :newTitle="getNewCodeTitle" :newId="getNewId"/>
      </transition>

      <div class="estimates-body">
        <CommentModal />
        <EstimatesCell v-show="showEstimateLines" v-for="(line, i) in getEstimateLines" :estimateLine="line" :key="i" :lineKey="i" :level="1" class="mb-3 block-estimate-rows"/>
      </div>
      <!-- Body with EstimatesCells -->
    </div>
  </div>
</template>

<script>
import NewEstimatesCell from './estimates/new-estimates-cell';
import EstimatesCell from './estimates/estimates-cell';
import MasterAutoComplete from './estimates/master-auto-complete';
import CommentModal from './estimates/comments/comment-modal'
import { mapGetters } from 'vuex';
import EventBus from '../../../plugins/event-bus';
import store from '@/store';

export default {
  name: 'Estimates',
  components: {
    NewEstimatesCell,
    EstimatesCell,
    MasterAutoComplete,
    CommentModal
  },
  data() {
      return {
        code: '',
        showEstimateLines: true
      };
  },
  mounted() {
    store.dispatch('projectmanager/initiateEstimateLine', {
      id: this.$route.params.project_id,
    });
    EventBus.$on('show_estimate_lines', (value) => {
      this.showEstimateLines = value;
    });
  },
  computed: {
    ...mapGetters('code', [
      'getNewEstimateStatus',
      'getNewCodeNumber',
      'getNewCodeTitle',
      'getNewId',
    ]),
    ...mapGetters('projectmanager', ['getEstimateLines']),
  },
};
</script>

<style lang="css" scoped>
.estimates-header-columns {
  min-width: 1200px;
  background-color: #061831;;
  height: 64px;
  font-family: Montserrat;
  color: #ffffff;
  text-align: center;
}

.estimates-header-columns div {
  margin: auto;
}

.estimate-header-filter-bar {
  background-color: #1C3452;
}

.a-back-to-top {
  color: #FB922F !important;
}

.a-back-to-top:hover {
  cursor: pointer;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.estimates-body {
  background: white;
  margin-top: 15px;

  height: 500px;
  overflow-y: scroll;
  min-width: 1200px;
}

.block-estimate-rows {
  border: 3px solid #516D8F;
}

  /**
    Estimate body scroll bar styles
   */
.estimates-body::-webkit-scrollbar-track {
  border-radius: 5px;
}

.estimates-body::-webkit-scrollbar {
  width: 9px;
  background-color: #FFFFFF;
}

.estimates-body::-webkit-scrollbar-thumb {
  background-color: silver;
}

.estimates-main-body {
  min-width: auto;
  overflow: auto;
}
</style>
