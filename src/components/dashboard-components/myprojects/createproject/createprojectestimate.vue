<template>
    <div>
        <div class="text-left title-font">Create a new project (Step 2 of 3)</div>
        <b-row class="create-project-estimate">
            <b-col sm="5">
                <div class="label-text mb-2">CLIENT <span style="color: red">*</span></div>
                <!-- Autocomplete list for the clients -->
                <autocomplete :search="search" @submit="searchChange($event)" placeholder="Select Client" aria-label="Some Building Type">
                  <template #default="{ rootProps, inputProps, inputListeners, resultListProps, resultListListeners,results, resultProps}">
                    <div v-bind="rootProps">
                    <input v-bind="inputProps" v-on="inputListeners" v-model="custom_character" :style="no_data? 'padding: 5px 40% 5px 10px !important; ':''"/>
                    <ul style="z-index: 100 !important" v-bind="resultListProps" v-on="resultListListeners">
                      <li v-for="(result, index) in results" @focus="initialSearch" :key="index" v-bind="resultProps[index]">
                        {{ result.name }}
                      </li>
                    </ul>
                    </div>
                  </template>
                </autocomplete>
                <div class="d-flex align-items-center" role="button" style="position: absolute; right: 28px; top: 28px;" @click="addClient()">
                  <b-icon icon="plus" scale="1.5"></b-icon>
                  <div class="font-weight-normal">Add Client</div>
                </div>
                <div style="color: red" class="font-weight-normal" v-if="error_msg.client">{{error_msg.client}}</div>
                <div class="label-text mb-2 cmt-3">PROJECT NAME <span style="color: red">*</span></div>
                <b-form-input class="mt-2" v-model="project_name" @change="updateValue" placeholder="Some Project Name"></b-form-input>
                <div style="color: red" class="font-weight-normal" v-if="error_msg.project_name">{{error_msg.project_name}}</div>
                <div class="label-text mb-2 cmt-3">DELIVERY METHOD <span style="color: red">*</span></div>
                <b-form-select @change="updateValue" v-model="delivery_select" :options="deliveryMethods" placeholder="Delevery Select"></b-form-select>
                <div style="color: red" class="font-weight-normal" v-if="error_msg.delivery_select">{{error_msg.delivery_select}}</div>
                <b-row class="mt-3">
                  <b-col sm="12">
                    <div class="label-text mb-3 cmt-3">
                        DO YOU HAVE A PROJECT CONSTRUCTION BUDGET? <span style="color: red">*</span>
                    </div>
                    <b-form-radio class="mt-2 mb-1" v-model="budget_selected" name="some-radios" :value="true">Yes</b-form-radio>
                    <b-form-radio v-model="budget_selected" name="some-radios" :value="false">No</b-form-radio>
                  </b-col>
                </b-row>
                <div v-if="budget_selected" class="label-text mb-2 cmt-3">PROJECT BUDGET <span style="color: red">*</span></div>
                <b-row v-if="budget_selected" class="mt-2">
                    <b-col>
                        <b-form-input @change="budgetChange" v-model="budget" type="text"></b-form-input>
                        <div style="color: red" class="font-weight-normal" v-if="error_msg.budget">{{error_msg.budget}}</div>
                    </b-col>
                    <b-col class="d-flex align-items-center">
                        <div>{{budget | toWords}}</div>
                    </b-col>
                </b-row>
                <!-- If the budget is not selected -->
                <div v-if="budget_selected===false">
                  <div class="label-text mb-2 cmt-3">SELECT ESTIMATED PROJECT RANGE</div>
                  <b-form-select @change="updateValue" v-model="budgetRangeId" :options="estimateProjectRangeList" placeholder="Estimated Budget Range"></b-form-select>
                </div>
            </b-col>
            <b-col offset-sm="1" sm="6">
                <div class="label-text mb-2">TASK OR PROJECT NUMBER </div>
                <b-form-input v-if="!applicable" class="mt-2" @change="updateValue" v-model="task_or_project_number" placeholder="Some Task or Project Number"></b-form-input>
                <b-form-input v-else class="mt-2" disabled @change="updateValue" v-model="task_or_project_number" placeholder="Some Task or Project Number"></b-form-input>
                <b-form-checkbox
                    class="cmt-3 checkbox-label-text"
                    id="checkbox-not-applicable"
                    v-model="applicable"
                    name="checkbox-not-applicable"
                    @change="updateValue"
                    >
                    Not applicable
                </b-form-checkbox>
                <div class="label-text mb-2 cmt-3">PROCUREMENT METHOD <span style="color: red">*</span></div>
                <b-form-select @change="updateValue" v-model="procurement_select" :options="procurementMethods" placeholder="Delevery Select"></b-form-select>
                <div style="color: red" class="font-weight-normal" v-if="error_msg.procurement_select">{{error_msg.procurement_select}}</div>
                <div class="label-text mb-2 cmt-3">PLEASE TELL US ABOUT YOUR PROJECT (PROJECT NARRATIVE OR DESCRIPTION)</div>
                <b-form-textarea
                    v-if="is_project_narrative" 
                    disabled
                    class="mt-2"
                    id="textarea-auto-height"
                    v-model="description"
                    size="sm"
                    rows="8"
                ></b-form-textarea>
                <b-form-textarea
                    v-else
                    class="mt-2"
                    id="textarea-auto-height"
                    v-model="description"
                    size="sm"
                    rows="8"
                ></b-form-textarea>
                <b-form-checkbox
                    class="cmt-3 checkbox-label-text"
                    id="checkbox-project-narrative"
                    v-model="is_project_narrative"
                    name="project-narrative"
                    @change="updateValue"
                    >
                    I do not have a project narrative
                </b-form-checkbox>
            </b-col>
        </b-row>
        <div class="btton-group d-flex justify-content-end">
          <div>
            <b-button class="back-btn-style mr-4" variant="outline-primary" @click="goBack">{{"<"}}</b-button>
            <b-button class="next-btn-style mr-4" variant="outline-primary" v-b-modal.modal-center>Cancel</b-button>
            <b-button class="next-btn-style" variant="outline-primary" @click="goNext">Next</b-button>
          </div>
        </div>

        <!-- Modal for the create new client -->
        <b-modal size="xl" id="add-modal-center">
          <template v-slot:modal-header="{ close }">
            <!-- Emulate built in modal header close button action -->
            <h5> Add new client </h5>
            <img @click="close()" role="button" alt="image" src="~@/assets/img/small-icons/small-modal-remove.png"/>
          </template>
          <hr />
          <b-row class="mt-2">
            <b-col>
              <div class="mb-1">Business Name <span class="text-danger">*</span></div>
              <div>
                <b-form-input v-model="business_name" placeholder="Vendor/Company"></b-form-input>
              </div>
              <div v-if="!business_name && submit" class="text-danger">Business Name cannot be empty</div>
            </b-col>
            <b-col>
              <div class="mb-1">Address <span class="text-danger">*</span></div>
              <div>
                <b-form-input v-model="address" placeholder="Address"></b-form-input>
              </div>
              <div v-if="!address && submit" class="text-danger">Address cannot be empty.</div>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col sm="6">
              <div class="mb-1">State <span class="text-danger">*</span></div>
              <div>
                <AutoCompleteState v-model="state" kind="0"/>
              </div>
              <div v-if="Object.keys(state).length==0 && submit" class="text-danger">State cannot be empty.</div>
            </b-col>
            <b-col sm="3">
              <div class="mb-1">City <span class="text-danger">*</span></div>
              <div>
                <AutoCompleteCity kind="0" v-model="city" :state="state" :disabled="state===''"/>
              </div>
              <div v-if="Object.keys(city).length==0 && submit" class="text-danger">City cannot be empty.</div>
            </b-col>
            <b-col sm="3">
              <div class="mb-1">Zip <span class="text-danger">*</span></div>
              <div>
                <b-form-input v-model="zip" placeholder="Zip"></b-form-input>
              </div>
              <div v-if="!zip && submit" class="text-danger">Zip cannot be empty.</div>
            </b-col>
          </b-row>
          <b-row class="2">
            <b-col>
              <div class="mb-1">Email <span class="text-danger">*</span></div>
              <div>
                <b-form-input v-model="email" placeholder="Email"></b-form-input>
              </div>
              <div v-if="!email && submit" class="text-danger">Email cannot be empty.</div>
            </b-col>
            <b-col>
              <div class="mb-1">Phone <span class="text-danger">*</span></div>
              <div>
                <b-form-input v-model="phonenumber" placeholder="Phone Number"></b-form-input>
              </div>
              <div v-if="(!phonenumber || !validatePhoneNumber) && submit" class="text-danger">Phone number is invalid.</div>
            </b-col>
          </b-row>
          <template v-slot:modal-footer="{ cancel }">
            <div>
              <b-btn v-if="!business_name || !address || !zip || !email || !phonenumber || !validatePhoneNumber || Object.keys(state).length==0 || Object.keys(city).length==0 || !validateEmail(email) || !zipcodeValidation(zip)" style="background-color: #0C2340; border-radius: 3px" @click="markSubmitted()">Add New Client</b-btn>
              <b-btn v-else style="background-color: #0C2340; border-radius: 3px" @click="cancel(), addRealClient()">Add New Client</b-btn>
              <b-btn style="background-color: #0C2340; border-radius: 3px" @click="cancel()" class="mr-2">Cancel</b-btn>
            </div>
          </template>
        </b-modal>

    </div>
</template>
<script>

import { BIcon, BIconThreeDotsVertical, BIconXCircle, BIconPlus } from 'bootstrap-vue';
import FileUpload from 'vue-upload-component/dist/vue-upload-component.part.js';
var converter = require('number-to-words');
import AccountProxy from '@/proxies/AccountProxy.js';
import Autocomplete from '@trevoreyre/autocomplete-vue';
import AutoCompleteState from '@/components/AutoCompleteState.vue';
import AutoCompleteCity from '@/components/AutocompleteCity.vue'

export default {
    name: 'CreateProjectEstimate',
    props: ['gotoNextTab', 'create_project_esti_info', 'building_type', 'goBackToProjects'],
    components: {
        BIcon,
        BIconThreeDotsVertical,
        BIconXCircle,
        BIconPlus,
        FileUpload,
        Autocomplete,
        AutoCompleteState,
        AutoCompleteCity
    },
    data() {
        return {
            //Custom_Character from the autocomplex box to add the project experiences list
            no_data: false,
            auto_compelete_list: [],
            is_project_narrative: false,
            applicable: false,
            deliveryMethods:[
                { key: 'Construction Manager at Risk',text: 'Construction Manager at Risk', value: 'CM_at_Risk' },
                { key: 'Construction Manager or Project Manager',text: 'Construction Manager or Project Manager', value: 'CM_MP' },
                { key: 'Design_Bid_Build',text: 'Design Bid Build', value: 'Design_Bid_Build' },
                { key: 'Design_Build',text: 'Design Build', value: 'Design_Build' },
                { key: 'Public_Private_Partnership',text: 'Public Private Partnership', value: 'Public_Private_Partnership' }
            ],

            procurementMethods: [
                { key: 'CompetitiveBid',text: 'CompetitiveBid', value: 'CompetitiveBid' },
                { key: 'CostPlus', text: 'CostPlus',value: 'CostPlus' },
                { key: 'LumpSum',text: 'LumpSum', value: 'LumpSum' },
                { key: 'Negotiate',text: 'Negotiate', value: 'Negotiate' },
                { key: 'TimeAndMaterials',text: 'Time & Materials', value: 'TimeAndMaterials' }
            ],

            estimateProjectRangeList: [
              { text: 'Less than $1M', value: 1 },
              { text: '$1M to <$2M', value: 2 },
              { text: '$2M to <$5M', value: 3 },
              { text: '$5M to <$10M', value: 4 },
              { text: '$10M to <$20M', value: 5 },
              { text: '$20M to <$30M', value: 6 },
              { text: '$30M to <$40M', value: 7 },
              { text: '$40M to <$60M', value: 8 },
              { text: '$60M to <$80M', value: 9 },
              { text: '$80M to <$100M', value: 10 },
              { text: '$80M to <$100M', value: 11 },
              { text: '$100M to <$130M', value: 12 },
              { text: '$130M to <$160M', value: 13 },
              { text: '$160M to <$200M', value: 14 },
              { text: '>$200M', value: 15 },
            ],

            //Data to submit
            project_name: '',
            category_name: '',
            budget: '',
            project_narrative: false,
            task_or_project_number: '',
            description: '',
            delivery_select: '',
            procurement_select: '',
            budget_selected: null,
            error_msg: {},
            client: {},
            clientList: [
                // { key: 'Big Test Company',text: 'Big Test Company', value: 'Big Test Company' },
            ],
            accountCode: '',
            budgetRangeId: '',

            //Client AutoComplete Variables list
            no_data: false,
            custom_character: '',

            //States for the create client
            business_name: '',
            address: '',
            state: {},
            city: {},
            zip: '',
            email: '',
            phonenumber: '',
            submit: false
        };
    },
    methods: {
        updateValue(){
          this.err_message = '';
          if(this.applicable) this.task_or_project_number = '';
          if(this.is_project_narrative) this.description = '';
          const data = {
            project_name: this.project_name,
            budget: this.budget,
            task_or_project_number: this.task_or_project_number,
            description: this.description,
            is_project_narrative: this.is_project_narrative,
            applicable: this.applicable,
            building_type: this.building_type,
            category: this.category_name,
            delivery_select: this.delivery_select,
            procurement_select: this.procurement_select,
            client: this.client,
            budget_selected: this.budget_selected,
            budgetRangeId: this.budgetRangeId
          }
          data.budget = this.budget.replace('\,\g' , '').replace('$' , '');
          this.$emit('emitCreateProjectEstimate', data);
          // localStorage.setItem('createproject')
        },

        isEmpty(string){
          if(string.trim() === '') return true;
          else return false;
        },

        isBudget(number) {
          const regEx = /^[0-9]*$/g;
          if(this.budget.replace(/,/g , '').replace('$' , '').match(regEx)) return true;
          else return false;
        },

        validate(){
          if(!this.client.name) this.error_msg.client='Client cannot be blank';
          else delete this.error_msg.client;
          if(this.isEmpty(this.project_name))this.error_msg.project_name='Project name cannot be blank';
          else delete this.error_msg.project_name;
          if(this.isEmpty(this.delivery_select)) this.error_msg.delivery_select='Delevery Select cannot be blank';
          else delete this.error_msg.delivery_select;
          if(this.isEmpty(this.procurement_select)) this.error_msg.procurement_select='Procurement Method cannot be blank.';
          else delete this.error_msg.procurement_select;
        },

        goNext(){
          this.validate();
          if(Object.keys(this.error_msg).length == 0 && this.isBudget(this.budget)) {
              this.updateValue();
              this.gotoNextTab();
          }
          this.$forceUpdate();
        },

        budgetChange(){
          const result = this.budget
              .replace(/\D/g, '')
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          // Vue.nextTick(() => this.price = result);'
          this.budget = `$${result}`;
          if(this.budget == "$") this.budget = "$0"
        },

        initialSearch(){
          search("");
        },

        getAccountOffices(){
          let formData = new FormData();
          formData.append('accountCode', this.accountCode);
          new AccountProxy().getAccountClients(formData).then((response) => {
              this.clientList = response;
          }).catch(function(){
              console.error("error catched");
          });    
        },

        //AutoComplete Function
        async search(input) {
          const results = this.clientList;
          const return_data = results.filter(element => {
            return element.name.toLowerCase().startsWith(input.toLowerCase());
          });
          this.auto_compelete_list = return_data;
          let real_data = [];
          for(let i=0 ;i < return_data.length; i++){
            real_data.push(return_data[i]);
          }
          if(real_data.length == 0){
            this.no_data = true
            real_data.push({
              name: 'No Client'
            });
          }
          else this.no_data = false;
          return real_data;
        },  

        searchChange(event){
          console.log(event);
          this.client = event; // Set the client name
          this.custom_character = event.name;
        },

        addClient(){
          this.$bvModal.show('add-modal-center');
          this.custom_character = "";
        },

        addRealClient(){
          //Add the parameters
          var mydata = {};
          mydata.name = this.business_name;
          mydata.address = this.address;
          mydata.stateId = this.state.id;
          mydata.cityId = this.city.id;
          mydata.zip = this.zip;
          mydata.phoneNumber = this.phonenumber.replace('(', '').replace(')','').replace(' ', '').replace('-', '');
          mydata.emailAddress = this.email;

          new AccountProxy().saveAccountClient(mydata).then((response) => {
            this.$notify({
              group: 'notify',
              type: 'success',
              title: 'Added Successfully.',
              text: 'New clients added successfully.',
              duration: 5000,   
              speed: 1000,
            });
            this.custom_character = this.business_name;
            this.client = response.data;
            this.getAccountOffices();
            this.$forceUpdate();
            //Format the autocomplete field
          })
          .catch(e => {
            console.log("error");
          })
        },

        markSubmitted() {
          this.submit = true;
        },

        //Validation Functions
        phoneValidation(phone){
          var phoneRegex =  new RegExp(/^[(]?\d{3}[)]?[(\s)?.-]\d{3}[\s.-]\d{4}$/g);
          return phoneRegex.test(phone);
        },
        validateEmail(email) {
          const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(String(email).toLowerCase());
        },

        zipcodeValidation(zip){
          var zipRegex = new RegExp(/^\d{5}(?:[-\s]\d{4})?$/g);
          return zipRegex.test(zip);
        },

        goBack(){
          this.goBackToProjects();
        },
    },
    created() {
      const {project_name, budget, project_number, applicable, task_or_project_number, description, is_project_narrative, delivery_select, procurement_select, client, budget_selected, budgetRangeId} = this.create_project_esti_info;
      if(project_name) this.project_name = project_name;
      if(budget) this.budget = budget;
      if(project_number) this.project_number = project_number;
      if(applicable) this.applicable = applicable;
      if(task_or_project_number) this.task_or_project_number = task_or_project_number;
      if(description) this.description = description;
      if(is_project_narrative) this.is_project_narrative = is_project_narrative;
      if(delivery_select) this.delivery_select = delivery_select;
      if(budget_selected!==undefined) this.budget_selected = budget_selected;
      if(budgetRangeId!==undefined) this.budgetRangeId = budgetRangeId;
      if(client) {
        this.client = client;
        this.custom_character = client.name;
      }
      if(procurement_select) this.procurement_select = procurement_select;
      //Get the accountCode in profile but it is in only company profile in the localstorage
      //TODO check the accountCode is in other role
      let profile = JSON.parse(localStorage.getItem('profile'));
      this.accountCode = profile.accountCode;
      this.getAccountOffices();
    },
    filters: {
        toWords: function (value) {
            if (!value) return ''
            if (value.match(/\d/g)) return converter.toWords(value.replace(/,/g , '').replace('$' , ''));
            else return '';
        }
    },
    computed: {
      validatePhoneNumber(){
        var phoneRegex =  new RegExp(/^[(]?\d{3}[)]?[(\s)?.-]?\d{3}[\s.-]?\d{4}$/g);
        return phoneRegex.test(this.phonenumber);
      },
    },
};
</script>

<style scoped>
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

.create-project-estimate {
  padding: 0;
  padding-top: 3.5rem;
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

.checkbox-label-text {
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: 0.3px;
  text-align: left;
  color: #252733;
}

.btton-group {
  padding-top: 5.5rem;
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
.custom-checkbox .custom-control-label::before {
    border-radius: 50%;
}
.custom-control-label::after {
    position: absolute;
    top: 0;
    left: -1.5rem;
    display: block;
    width: 1.6rem;
    height: 1.6rem;
    content: "";
    background: no-repeat 50% / 50% 50%;
}
.custom-control-label::before {
    position: absolute;
    top: 0;
    left: -1.4rem;
    display: block;
    width: 1.4rem;
    height: 1.4rem;
    pointer-events: none;
    content: "";
    background-color: #fff;
    border: #adb5bd solid 1px;
}
.custom-control-label {
  padding-left: 14px;
}
</style>