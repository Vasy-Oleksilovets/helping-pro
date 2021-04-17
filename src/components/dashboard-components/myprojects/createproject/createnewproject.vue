<template>
  <div>
    <div class="text-left title-font">Create a new Project (Step 1 of 3)</div>
    <div class="create-main-part create-project-estimate">
      <b-row>
        <b-col sm="5">
          <div>
            <div class="label-text mb-2">PROJECT TYPE <span style="color: red">*</span></div>
            <slot name="title"></slot>
            <div style="color: red" class="font-weight-normal" v-if="error_msg.custom_character">{{error_msg.custom_character}}</div>
          </div>
          <div class="cmt-3">
            <div class="label-text">CONSTRUCTION TYPE <span style="color: red">*</span></div>
            <b-form-select :options="constructionTypeList" v-model="construction_type" placeholder="Construnction Type" class="mt-2"></b-form-select>
            <div style="color: red" class="font-weight-normal" v-if="error_msg.construction_type">{{error_msg.construction_type}}</div>
          </div>
          <div class="cmt-3">
            <div class="label-text mb-2">STATE <span style="color: red">*</span></div>
            <AutoCompleteState kind="0" v-model="state" :default_value="state.id"/>
            <div style="color: red" class="font-weight-normal" v-if="error_msg.state">{{error_msg.state}}</div>
          </div>
          <div class="cmt-3">
            <div class="label-text mb-2">CITY <span style="color: red">*</span></div>
            <autocomplete kind="0" :default_stateCode="state.code" :default_cityid="state.id" v-model="city" :state="state" :disabled=" state===''"/>
            <div style="color: red" class="font-weight-normal" v-if="error_msg.city">{{error_msg.city}}</div>
          </div>
        </b-col>
        <b-col offset-sm="1" sm="6">
          <div>
            <div class="label-text mb-2">CATEGORY</div>
            <slot name="category"></slot>
          </div>
          <b-form-group class="cmt-3 label-text type-of-estimate-form-group" label="TYPE OF ESTIMATE" >
              <b-form-radio @change="updateValue" v-model="project_estimate_type" name="some-radios" value="create" class="estimation-type-label">Create a project estimate</b-form-radio>
              <b-form-radio class="mt-2 estimation-type-label" @change="updateValue" v-model="project_estimate_type" name="some-radios" value="validate">Independent Cost Estimate(for validating, reconciliation purposes, or underwriting)</b-form-radio>
          </b-form-group>
          <div v-if="flag">
            <div v-if="project_estimate_type=='validate'" class="label-text cmt-3">PROJECT PHASE <span style="color: red">*</span></div>
            <div v-else class="label-text cmt-3">PROJECT PHASE (PLEASE SELECT ONE OR MORE) <span style="color: red">*</span></div>
            <b-row>
              <b-col v-if="project_estimate_type=='validate'" sm="5" md="6">
                <b-form-select v-model="phase_select" :options="phases" class="mt-2"></b-form-select>
                <div v-if="phase_select.length == 0 && submit" class="font-weight-normal" style="color: red">Please select one of the project phase</div>
              </b-col>
              <!-- <b-col class="mt-2" v-else sm="12" md="12">
                <b-form-group label="">
                  <b-form-checkbox-group v-model="phase_select" :options="phases" name="flavour-2a" stacked></b-form-checkbox-group>
                </b-form-group>
                
              </b-col> -->
              <b-col v-else class="accordion cmt-3 " sm="12" md="12" role="tablist">
                <div v-if="!count_phase_checks && submit" class="font-weight-normal" style="color: red">Please select one or more project phase</div>
                <div v-if="!isPhaseSequence && submit" class="font-weight-normal" style="color: red">Selected phases should be sequence</div>
                <div v-if="!validate_dates && submit" class="font-weight-normal" style="color: red">Selected dates are invalid</div>
                <b-card v-for="phase in phases" :key="phase.value" no-body class="mb-1">
                  <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button block v-b-toggle="`collapse-${phase.value}`" variant="light" style="display: flex; justify-content: space-between">{{phase.text}}<span v-if="phase_checks[phase.value]" class="ml-2">✓</span></b-button>
                  </b-card-header>
                  <b-collapse :id="`collapse-${phase.value}`" accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                      <b-row class="mt-3">
                        <!-- start date -->
                        <b-col>
                          <div class="label-text">SUBMISSION DATE <span style="color: red">*</span></div>
                          <b-form-datepicker :id="`start_date_${phase.value}`" :min="end_date[parseInt(phase.value) - 1] ? moment(end_date[parseInt(phase.value) - 1]).add(1, 'days').format('YYYY-MM-DD') : new Date()" v-model="start_date[phase.value]" class="mb-2 mt-2" placeholder="Choose a date"></b-form-datepicker>
                        </b-col>
                        <!-- end date -->
                        <b-col>
                          <div class="label-text">NEED REPORT BY <span style="color: red">*</span></div>
                          <b-form-datepicker v-if="start_date[phase.value]" :min="moment(start_date[phase.value]).add(10, 'days').format('YYYY-MM-DD')" :id="`end_date_${phase.value}`" v-model="end_date[phase.value]" class="mb-2 mt-2" placeholder="Choose a date"></b-form-datepicker>
                          <b-form-datepicker v-else disabled :id="`end_date_${phase.value}`" v-model="end_date[phase.value]" class="mb-2 mt-2" placeholder="Choose a date"></b-form-datepicker>
                        </b-col>
                      </b-row>
                      <b-row class="mt-2 d-flex justify-content-end">
                        <b-button class="mr-2" v-if="phase_checks[phase.value]" @click="cancelPhase(phase.value)" variant="info">Cancel</b-button>
                        <b-button v-b-toggle="`collapse-${phase.value}`" class="mr-3" @click="phaseConfirm(phase.value)" variant="info" :disabled="!start_date[phase.value] || !end_date[phase.value]">Confirm</b-button>
                      </b-row>
                    </b-card-body>
                  </b-collapse>
                </b-card>
              </b-col>
            </b-row>
            <b-row v-if="flag && project_estimate_type == 'validate'" class="cmt-3">
              <!-- start date -->
              <b-col>
                <div class="label-text">SUBMISSION DATE <span style="color: red">*</span></div>
                <b-form-datepicker id="start_date_validate" :min="new Date()" v-model="start_date_validate" class="mb-2 mt-2" placeholder="Choose a date"></b-form-datepicker>
                <div style="color: red" class="font-weight-normal" v-if="error_msg.start_date_validate">{{error_msg.start_date_validate}}</div>
              </b-col>
              <!-- end date -->
              <b-col>
                <div class="label-text">NEED REPORT BY <span style="color: red">*</span></div>
                <b-form-datepicker v-if="start_date_validate" :min="start_plus_ten_date" id="end_date_validate" v-model="end_date_validate" class="mb-2 mt-2" placeholder="Choose a date"></b-form-datepicker>
                <b-form-datepicker v-else disabled id="end_date_validate" v-model="end_date_validate" class="mb-2 mt-2" placeholder="Choose a date"></b-form-datepicker>
                <div style="color: red" class="font-weight-normal" v-if="error_msg.end_date_validate">{{error_msg.end_date_validate}}</div>
              </b-col>
            </b-row>
          </div>
        </b-col>
      </b-row>
    </div>
    <div class="btton-group d-flex justify-content-end">
      <div>
        <b-button class="next-btn-style mr-4" variant="outline-primary" v-b-modal.modal-center>Cancel</b-button>   
        <b-button class="next-btn-style" variant="outline-primary" @click="goNext">Next</b-button>   
      </div>
    </div>
  </div>
</template>
<script>
import AddressProxy from '@/proxies/AddressProxy.js';
import Autocomplete from '@/components/AutocompleteCity.vue';
import AutoCompleteState from '@/components/AutoCompleteState.vue';
import moment from 'moment'
export default {
  name: 'CreateNewProject',
  props: ['gotoNextTab', 'goBackToProjects', 'create_new_project_info', 'custom_character'],
  components: {
    Autocomplete,
    AutoCompleteState,
  },
  data() {
    return {
      phase_select: [],
      phases: [
        { text: 'Concept Screening', value: '1' },
        { text: 'Schematic', value: '2' },
        { text: 'Design Documents', value: '3' },
        { text: 'Construction Documents', value: '4' },
        { text: 'Construction Documents, Bids, Proposals', value: '5' }
      ],
      project_estimate_type: '',
      submit: false,
      flag: false,
      constructionTypeList: [
        {
          text: "New Construction",
          value: "New Construction",
        },
        {
          text: "Renovation/Repair",
          value: "Renovation/Repair"
        },
        {
          text: "Addition",
          value: "Addition",
        }
      ],
      error_msg: {},
      states: [],
      cities: [],
      state: {},
      city: {},
      start_date: {},
      start_date_validate: '',
      end_date_validate: '',
      start_plus_ten_date: '',
      end_date: {},
      construction_type: '',
      phase_checks: {},
      phase_min_dates: {},
      start_plus_ten_dates: {}
    };
  },
  methods: {
    isEmpty(string){
      if(string.trim() === '') return true;
      else return false;
    },
    updateValue(){
      this.flag = true;
      const data = {
        phase_select: this.phase_select,
        project_estimate_type: this.project_estimate_type,
        state_select: this.state,
        city_select: this.city,
        construction_type: this.construction_type,
        start_date: this.start_date,
        end_date: this.end_date,
        phase_checks: this.phase_checks,
        start_date_validate: this.start_date_validate,
        end_date_validate: this.end_date_validate
      }
      this.$emit('sendDataToParent', data);
      return data;
    },
    validate() {
      if(this.isEmpty(this.custom_character))this.error_msg.custom_character='Project name cannot be blank';
      else delete this.error_msg.custom_character;
      if(this.isEmpty(this.construction_type))this.error_msg.construction_type='Construction Type cannot be blank';
      else delete this.error_msg.construction_type;
      if(this.state === "")this.error_msg.state='State cannot be blank';
      else delete this.error_msg.state;
      if(this.city === "")this.error_msg.city='City cannot be blank';
      else delete this.error_msg.city;
    },
    goNext(){
      this.submit = true;
      this.validate();
      const type = this.project_estimate_type;
      if (type === 'validate') {
        if(this.isEmpty(this.start_date_validate))this.error_msg.start_date_validate='Start Date cannot be blank';
        else delete this.error_msg.start_date_validate;
        if(this.isEmpty(this.end_date_validate))this.error_msg.end_date_validate='End Date cannot be blank';
        else delete this.error_msg.end_date_validate;
      }
      const data = this.updateValue();
      this.$forceUpdate();
      if(((type === 'validate' && !Array.isArray(this.phase_select) && !this.error_msg.start_date_validate && !this.error_msg.end_date_validate) || (type === 'create' && this.countPhaseChecks() && this.is_phase_sequence() && this.validateDates())) && Object.keys(this.error_msg).length == 0) {
        localStorage.setItem("params_to_create_new_project", JSON.stringify(data));
        this.gotoNextTab();
      }
    },
    goBack(){
      this.goBackToProjects();
    },
    phaseConfirm(value) {
      this.phase_checks = {...this.phase_checks, [value]: true};
    },
    cancelPhase(value) {
      this.phase_checks = {...this.phase_checks, [value]: false};
      this.start_date[value] = null;
      this.end_date[value] = null;
    },
    countPhaseChecks() {
      let count = 0;
      Object.keys(this.phase_checks).forEach(key => {
        if (this.phase_checks[key]) count++;
      })
      return count > 0;
    },
    moment(value) {
      return moment(value);
    },
    is_phase_sequence() {
      let res = true;
      const keys = Object.keys(this.phase_checks).filter(key => this.phase_checks[key]);
      let prev = parseInt(keys[0]);
      for (let i = 1; i < keys.length; i++) {
        const e = parseInt(keys[i]);
        if ((e - prev) !== 1) {
          res = false;
          break;
        }
        prev = e;
      }
      return res;
    },
    validateDates() {
      let res = true;
      Object.keys(this.phase_checks).forEach(key => {
        if (this.phase_checks[key] && this.start_date[parseInt(key) + 1] && this.start_date[parseInt(key) + 1] <= this.end_date[key]) {
            res = false;
        }
      })
      return res;
    }
  },
  created() {
    //Initalize the data if someone click the back button
    this.project_estimate_type = this.create_new_project_info.project_estimate_type;
    const { construction_type, city_select, state_select, start_date, end_date, phase_select, phase_checks } = this.create_new_project_info;
    if(construction_type) this.construction_type = construction_type;
    if(city_select) this.city = city_select;
    if(state_select) this.state = state_select;
    if(start_date) this.start_date = start_date;
    if(end_date) this.end_date = end_date;
    if(phase_checks) this.phase_checks = phase_checks;
    if(phase_select.length > 0){
      this.flag = true;
    }

    new AddressProxy().getStates().then((response) => {
      this.states = response;
    })
    .catch(error => {
      this.errors.push(error)
    });
    this.phases.forEach(phase => {
      this.phase_min_dates[phase.value] = new Date();
    })
  },
  mounted() {
    const data = JSON.parse(localStorage.getItem("params_to_create_new_project"));
    if(data) {
      const {
        construction_type, 
        city_select, 
        state_select, 
        start_date, 
        end_date, 
        phase_select, 
        phase_checks, 
        project_estimate_type,
        start_date_validate,
        end_date_validate,
      } = data;
      if(construction_type) this.construction_type = construction_type;
      if(city_select) this.city = city_select;
      if(state_select) this.state = state_select;
      if(phase_checks) this.phase_checks = phase_checks;
      if(project_estimate_type) this.project_estimate_type = project_estimate_type;
      if(start_date) this.start_date = start_date;
      if(end_date) this.end_date = end_date;
      if(start_date_validate) this.start_date_validate = start_date_validate;
      if(end_date_validate) this.end_date_validate = end_date_validate;
      if(phase_select) this.phase_select = phase_select;
      if(phase_select.length > 0 || Object.keys(phase_checks).length > 0){
        this.flag = true;
      }
      // Object.keys(start_date).forEach(key => {
      //   if(start_date[key]) {
      //     this.start_date = {...this.start_date, [parseInt(key)]: moment(start_date[key]).format('YYYY-MM-DD')}
      //   }
      // })
      // Object.keys(end_date).forEach(key => {
      //   if(end_date[key]) {
      //     this.end_date = {...this.end_date, [parseInt(key)]: moment(end_date[key]).format('YYYY-MM-DD')}
      //   }
      // })
      // console.log("#$%#", this.start_date, this.end_date);
      this.$forceUpdate();
      new AddressProxy().getStates().then((response) => {
        this.states = response;
      })
      .catch(error => {
        this.errors.push(error)
      });
      localStorage.removeItem("params_to_create_new_project")
    }
  },
  watch: {
    project_estimate_type: function(newValue, prevValue) {
      if(this.project_estimate_type == "create"){
        console.log("selected");
        const {phase_select} = this.create_new_project_info;
        if(phase_select.length > 0){
          this.phase_select = phase_select;
        }
        else this.phase_select = [];
      }
      else {
        const {phase_select} = this.create_new_project_info;
        if(phase_select.length > 0) this.phase_select = phase_select
      }
      if (prevValue === 'validate' && newValue === 'create') {
        this.start_date = {};
        this.end_date = {};
      }
      
      // this.phase_select = [];  
      if (newValue === 'create') {
        delete this.error_msg.start_date_validate;
        delete this.error_msg.end_date_validate;
      }
    },
    start_date_validate: function(newValue) {
      this.start_plus_ten_date = moment(newValue).add(10, 'days').format('YYYY-MM-DD');
      const type = this.project_estimate_type;
      if (type === 'validate') {
        this.start_date = {
          [this.phase_select]: newValue
        };
        this.phase_checks = {};
      }
    },
    end_date_validate: function(newValue) {
      const type = this.project_estimate_type;
      if (type === 'validate') {
        this.end_date = {
          [this.phase_select]: newValue
        };
        this.phase_checks = {};
      }
    },
    phase_select: function(newValue) {
      const type = this.project_estimate_type;
      if (type === 'validate') {
        // this.start_date_validate = "";
        // this.end_date_validate = "";
      }
    }
  },
  computed: {
    count_phase_checks() {
      let count = 0;
      Object.keys(this.phase_checks).forEach(key => {
        if (this.phase_checks[key]) count++;
      })
      return count > 0;
    },
    isPhaseSequence() {
      let res = true;
      const keys = Object.keys(this.phase_checks).filter(key => this.phase_checks[key]);
      let prev = parseInt(keys[0]);
      for (let i = 1; i < keys.length; i++) {
        const e = parseInt(keys[i]);
        if ((e - prev) !== 1) {
          res = false;
          break;
        }
        prev = e;
      }
      return res;
    },
    validate_dates() {
      let res = true;
      Object.keys(this.phase_checks).forEach(key => {
        if (this.phase_checks[key] && this.start_date[parseInt(key) + 1] && this.start_date[parseInt(key) + 1] <= this.end_date[key]) {
            res = false;
        }
      })
      return res;
    }
  }
};
</script>

<style scoped>
.create-main-part {
    padding: 3% 15%;
    min-height: 500px;
}


.table-header {
    background-color: #061831;
    color: white;
    padding: 15px 30px 15px 30px;
    min-width: 1200px !important;
    height: 51px;
}

.content-card {
    margin: 20px;
    background-color: white;
    min-height: 80vh;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    border-radius: 3px;
    padding: 30px;
}

.round-icon {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    cursor: pointer;
}

.title-font {
  font-family: Montserrat;
  font-size: 19px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.4px;
  text-align: left;
  color: #252733;
}


.next-btn-style {
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: 0.2px;
  text-align: center;
  padding: 11px 35px 9px;
  border-radius: 8px;
}

.sub-btn-style {
    min-width: 200px;
    background-color: #0C2340;
    border-radius: 5px;
    padding: 8px 8px
}

.cancel-btn-style {
  background-color: white;
  border-color: white;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: 0.2px;
  color: #7c7e89;
}

.standard-color {
    background-color:#0C2340
}

.grey-color {
    background-color: #C4C4C4;
}

.create-project-estimate {
    padding: 0;
    padding-top: 3.5rem;
}

.project-detail {
    font-size: 0.9em;
    color: black;
    font-weight: 600;
    background-color: #F2F2F2;
    padding: 40px 10px
}

.uploading-file-list-box {
    border: 1px solid #C9C9C9;
    height: 220px;
    overflow: auto;
}

.dialog-btn-style {
    width: 100px;
    border-radius: 3px;
}

.dialog-btn-style1 {
    width: 150px;
    border-radius: 3px;
}

.label-text {
  font-family: Montserrat;
  font-size: 12px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.3px;
  text-align: left;
  color: #7c7e89;
}

.cmt-3 {
  margin-top: 2rem;
}

.estimation-type-label {
  font-size: 13px;
}

.save-btn-style {
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: 0.2px;
  text-align: center;
  padding: 11px 35px 9px;
  border-radius: 8px;
  margin-right: 2.25rem;
}

.back-btn-style {
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: 0.2px;
  text-align: center;
  padding: 11px 20px 9px;
  border-radius: 8px;
}
</style>
<style>
.estimation-type-label label {
  font-weight: 500 !important;
}
.type-of-estimate-form-group legend {
  margin-bottom: 1rem !important;
}
</style>
