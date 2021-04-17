<template>
  <div class="dash-header">
    <b-row>
      <b-col class="mb-2" sm="4">
        <b-form-select v-model="selected_project" @change="gotoProject" class="custom-form">
          <option v-for="(project, index) in approved_projects" :key="index" :value="project.projectId" selected>{{project.name}}</option>
        </b-form-select>
        <div class="pl-2 pt-3">Location: Atlanta, GA</div>
      </b-col>
      <b-col class="mb-2" sm="3">
        <b-row>
          <b-col sm="4">
            <b-form-select v-if="role === 7 || role === 8" class="custom-form1" v-model="selected" :options="options"></b-form-select>
            <span v-else style="color: white">Class1</span>
          </b-col>
          <b-col sm="8" style="font-size: 14px">
            <div class="mb-3">Construction Document</div>
            <div class="ml-4">
              <span class="mr-2">Low :</span><span>$1500 /</span><span style="color: red"> ( -20% ) </span>
            </div>
            <div class="ml-4">
              <span class="mr-1">High :</span><span>$1800 /</span><span> ( +100% ) </span>
            </div>
          </b-col>
        </b-row> 
      </b-col>
      <b-col class="mb-2" sm="4">
        <!-- If the Estimator View -->
        <div v-if="role === 3">
          <span class="pr-4 money-border pb-2">Total Current Estimate</span>
          <span class="money-border pb-2">{{getProjectBudget.toLocaleString() | formatMoney('$', 0)}}</span>
        </div>
        <!-- If the project Manager View -->
        <div>
          <div class="price-label1 d-flex justify-content-between">
            <div class="pr-4">Total Current Estimate</div>
            <div class="pb-2">
              {{ getProjectBudget.toLocaleString() | formatMoney('$', 0)}}
            </div>
          </div>
          <div class="d-flex justify-content-between price-label pt-1 pb-1">
            <div class="pr-4">Construction Check</div>
            <div style="color: #62FF5F">
              {{ getConstructionCheck.toLocaleString() | formatMoney('$', 0)}}
            </div>
          </div>
          <div class="price-label2 d-flex justify-content-end pt-1 align-content-center mt-2" style="background: rgba(0, 0, 0, 0.25); border-radius: 15px;">
            <span class="pt-1 pb-1 pr-1" style="color: #FF1515">${{calcDifference()}}</span>
          </div>
        </div>

        <div v-if="role === 6" style="float:right; width: 300px; font-size: 14px">
          <div class="price-label1 d-flex justify-content-between">
            <div class="pr-4">Project Budget</div>
            <div class="pb-2">
              {{ getProjectBudget.toLocaleString() | formatMoney('$', 0)}}
            </div>
          </div>
          <div class="d-flex justify-content-between price-label pt-1 pb-1">
            <div class="pr-4">Construction Check</div>
            <div style="color: #62FF5F">
              {{ getConstructionCheck.toLocaleString() | formatMoney('$', 0)}}
            </div>
          </div>
          <div class="price-label2 d-flex justify-content-end pt-1 align-content-center mt-2" style="background: rgba(0, 0, 0, 0.25); border-radius: 15px;">
            <span class="pt-1 pb-1 pr-1" style="color: #FF1515">${{calcDifference()}}</span>
          </div>
        </div>
      </b-col>
      <!-- Button For Estimator -->
      <b-col v-if="role === 3" class="mb-2" sm="2">
        <b-btn class="float-right btn-style" v-b-modal.modal-header-modal>Submit for review</b-btn>
      </b-col>
      <!-- Button For Project Manager -->
      <b-col v-if="role === 7 || role === 8" class="mb-2" sm="2">
        <b-btn class="float-right btn-style1" v-b-modal.modal-header-modal>Submit for Client</b-btn>
      </b-col>
    </b-row>
    <!-- Submit for review modal> -->
    <b-modal id="modal-header-modal" centered>
      <template v-slot:modal-header="{}">
        <span @click="close()"></span>
      </template>
      <div class="text-center project-detail">
        <div class="mb-3"> Are you sure you want to submit estimates<br /> for review? <br /> </div>
        <div> This will disable your editing capabilites of <br /> this project.</div>
      </div>
      <template v-slot:modal-footer="{ ok }">
        <div class="text-center mb-4" style="margin-left: auto; margin-right: auto;">
          <b-btn class="dialog-btn-style mr-5 second-btn-style" @click="ok()">Yes</b-btn>
          <b-btn class="dialog-btn-style first-btn-style">No</b-btn>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import store from '@/store';
export default {
  data() {
    return {
      is_open: true,
      unit: '',
      price: 10223000000,
      price1: 24658653,
      price2: -1658653,
      options: [
        { value: 'Class1', text: 'Class1' },
        { value: 'Class2', text: 'Class2' },
        { value: 'Class3', text: 'Class3' },
        { value: 'Class4', text: 'Class4' },
        { value: 'Class5', text: 'Class5' }
      ],
      selected: 'Class1',
      approved_projects: [],
      selected_project: ''
    };
  },
  name: 'DashHeaderDetail',
  computed: {
    ...mapGetters('projectmanager', [
      'getProjectBudget',
      'getConstructionCheck',
    ]),
  },
  props: ['role'],
  components: {},
  methods: {
    check(e) {
      this.is_open = !this.is_open;
    },
    calcDifference() {
      return (
        this.getProjectBudget - this.getConstructionCheck
      ).toLocaleString();
    },
    gotoProject(){
      this.$router.push(`/dashboard/myprojects/detail/${this.selected_project}`);
    }
  },
  created() {
    this.approved_projects = JSON.parse(localStorage.getItem('profile')).currentProjects.filter(project => project.projectStatus=='Approved');
  },
  mounted() {
  },
};
</script>

<style lang="css" scoped>
.dash-header {
    background-image: url("../../assets/img/header-background.png");
    font-family: Montserrat;
    background-color: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    padding: 20px 20px 10px 30px;
    color: white;
}

.custom-form {
    color: white !important;
    background-color: #133B70 !important;
    border: none !important;
    background: white url("../../assets/img/small-icons/white-arrow.png") no-repeat right 0.75rem center/8px 10px;
}
.custom-form1 {
    color: white !important;
    background-color: #0C2340 !important;
    background: white url("../../assets/img/small-icons/white-arrow.png") no-repeat right 0.75rem center/8px 10px;
    border: 1px solid white;
}

.money-border {
    border-bottom: 1px solid white;
}

.btn-style{
    background-color: #FB922F;
    color: black;
    padding: 4px 8px 4px 8px;
}

.btn-style1{
    background-color: white;
    color: black;
    padding: 4px 8px 4px 8px;
    border-radius: 1px;
}

 .dialog-btn-style {
        padding: 7px 40px 7px 40px;
        max-width: 100px;
        border-radius: 8px;
        border-width: 0;
}
.second-btn-style {
    background-color: #83afdb;
}
.first-btn-style {
    background-color: #19293e;
}
.price-label {
    max-width: 286px;
    border-bottom: 1px solid white;
}
.price-label1 {
    max-width: 287px;
}

.price-label2 {
    max-width: 291px;
}

</style>
