<template>
  <div>
    <DashHeader :role="role" :profile="profile"/>
    <div class="project">
      <!-- Information Page -->
      <div class="content">
        <div class="d-flex justify-content-end">
          <button :style="{display: list_or_detail_page? 'none': 'block'}" class="btn-style" v-b-modal.add-modal-center>Add Client</button>
          <button v-if="list_or_detail_page" class="btn-style" v-b-modal.edit-modal-center>Edit Client</button>
        </div>

        <!-- Company Logo -->
        <div v-if="Object.keys(companyProfile).length > 0" class="text-center">
          <b-row class="text-center">
            <b-col class="text-center">
              <div>
                <b-avatar :src="companyProfile.logoPath" size="8rem">    
                </b-avatar>
              </div>
            </b-col>
          </b-row>
          <div class="mt-3">
            <div v-if="!list_or_detail_page">All Clients</div>
            <div style="font-size: 18px" class="font-weight-bold" v-if="list_or_detail_page">{{edit_client.name}}</div>
          </div>
        </div>

        <div v-if="list_or_detail_page">
          <button class="btn-style" @click="goback">Go Back</button>
        </div>

        <div v-if="list_or_detail_page" class="mt-4" style="max-width: 500px; margin: 0 auto">
          <b-row>
            <b-col>ClientID: {{edit_client.clientId}}</b-col>
            <b-col>Email: {{edit_client.emailAddress}}</b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>Projects Completed: {{ edit_client.numberProjectsCompleted === null? 0: edit_client.numberProjectsCompleted}}</b-col>
            <b-col>Projects in Progress: {{edit_client.numberProjectsInProgress === null? 0: edit_client.numberProjectsInProgress}}</b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>Projects in Queue: {{edit_client.numberProjectsInQueue === null? 0: edit_client.numberProjectsInQueue}}</b-col>
            <b-col>Phone: {{edit_client.phoneNumber | formatPhone}}</b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>State: {{edit_client.address.stateName}}</b-col>
            <b-col>City: {{edit_client.address.cityName}}</b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>Zip: {{edit_client.address.zipCode}}</b-col>
          </b-row>
        </div>

        <div style="overflow: auto" v-else class="mt-4">
          <b-table id="clientTable" :items="items" :fields="fields" :per-page="perPage" :current-page="currentPage" responsive thClass="border-top-0" style="min-height: 20vh">
            <!-- Table Width Customzation -->
            <template v-slot:table-colgroup="scope">
              <col v-for="field in scope.fields" :key="field.key" :style="{ width: '14%' }">
            </template>
            <!-- Table Body Customization --> 
            <template v-slot:cell(button)="row">
              <b-button class="button-type rounded" @click="gotoDetal(row)">View More</b-button>
            </template>
            <template v-slot:cell(numberProjectsInQueue)="row">
              <div class="text-center">{{row.value.numberProjectsCompleted == null? 0: row.value}}</div>
            </template>
              <template v-slot:cell(numberProjectsInProgress)="row">
              <div class="text-center">{{row.value.numberProjectsCompleted == null? 0: row.value}}</div>
            </template>
            <template v-slot:cell(numberProjectsCompleted)="row">
              <div class="text-center">{{row.value.numberProjectsCompleted == null? 0: row.value}}</div>
            </template>
            <template v-slot:cell(address)="row">
              <div>{{row.value.stateName}}</div>
            </template>
            
            <!-- Table Head Customization -->
            <template v-slot:head(address)>
              <b-dropdown variant="primary" size="lg" style="background-color: white !important" id="dropdown-1" text="Location">
                <b-form-input v-model="search_key_location" v-on:keyup="detect_change_filter" placeholder="Search city" style="width: 90%; margin-left: 5%"></b-form-input>
                <b-dropdown-item @click="filter_by_location('All')">Select All</b-dropdown-item>
                <b-dropdown-item v-for="state in states" :key="state.name" @click="filter_by_location(state.name)">{{ state.name }}</b-dropdown-item>
              </b-dropdown>
            </template>
            <template v-slot:head(name)>
              <div class="title-font">Vendor/Company</div>
            </template>
            <template v-slot:head(numberProjectsInQueue)>
              <div class="text-center">Projects in Queue</div>
            </template>
            <template v-slot:head(numberProjectsInProgress)>
              <div class="text-center">Projects in Progress</div>
            </template>
            <template v-slot:head(numberProjectsCompleted)>
              <div class="text-center">Projects Completed</div>
            </template>
            <template v-slot:head(button)>
              <div class="title-font"></div>
            </template>
          </b-table>
          <div class="pb-0 pt-3 pagination-bar">
            <b-pagination
              v-model="currentPage"
              :total-rows="rows"
              :per-page="perPage"
              aria-controls="projectList"
            ></b-pagination>
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
                <autocomplete kind="0" v-model="city" :state="state" :disabled="state===''"/>
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
              <div v-else-if="!validateEmail(email) && submit" class="text-danger">Email is invalid.</div>
            </b-col>
            <b-col>
              <div class="mb-1">Phone <span class="text-danger">*</span></div>
              <div>
                <b-form-input v-model="phonenumber" placeholder="Phone Number"></b-form-input>
              </div>
              <div v-if="!phonenumber && submit" class="text-danger">Phone Number cannot be empty.</div>
              <div v-else-if="!phoneValidation(phonenumber) && submit" class="text-danger">Phone is invalid.</div>
            </b-col>
          </b-row>
          <template v-slot:modal-footer="{ cancel }">
            <div>
              <b-btn v-if="!business_name || !address || !zip || !email || !phonenumber || Object.keys(state).length==0 || Object.keys(city).length==0 || !phoneValidation(phonenumber) || !validateEmail(email) || !zipcodeValidation(zip)" style="background-color: #0C2340; border-radius: 3px" @click="markSubmitted()">Add New Client</b-btn>
              <b-btn v-else style="background-color: #0C2340; border-radius: 3px" @click="cancel(), addClient()">Add New Client</b-btn>
              <b-btn style="background-color: #0C2340; border-radius: 3px" @click="cancel()" class="mr-2">Cancel</b-btn>
            </div>
          </template>
        </b-modal>

        <!-- Modal for the edit client -->
        <b-modal size="xl" id="edit-modal-center">
          <template v-slot:modal-header="{ close }">
            <!-- Emulate built in modal header close button action -->
            <h5> Edit client </h5>
            <img @click="close()" role="button" alt="image" src="~@/assets/img/small-icons/small-modal-remove.png"/>
          </template>

          <hr />

          <!-- Modal Body -->
          <!-- Confirm the editing client is selected -->
          <div v-if="Object.keys(edit_client).length > 0" class="moday-custom-body">
            <b-row class="mt-2">
              <b-col>
                <div class="mb-1">Business Name <span class="text-danger">*</span></div>
                <div>
                  <b-form-input v-model="edit_client.name" placeholder="Vendor/Company"></b-form-input>
                </div>
                <div v-if="!edit_client.name && submit" class="text-danger">Business Name cannot be empty</div>
              </b-col>
              <b-col>
                <div class="mb-1">Address <span class="text-danger">*</span></div>
                <div>
                  <b-form-input v-model="edit_client.address.addressLine1" placeholder="Address"></b-form-input>
                </div>
                <div v-if="!edit_client.address.addressLine1 && submit" class="text-danger">Address Name cannot be empty</div>
              </b-col>
            </b-row>
            <b-row class="mt-2">
              <b-col sm="6">
                <div class="mb-1">State <span class="text-danger">*</span></div>
                <div>
                  <AutoCompleteState kind="0" v-model="state" :default_value="edit_client.address.stateId"/>
                </div>
                <div v-if="Object.keys(state).length==0 && submit" class="text-danger">State cannot be empty.</div>
              </b-col>
              <b-col sm="3">
                <div class="mb-1">City <span class="text-danger">*</span></div>
                <div>
                  <autocomplete kind="0" v-model="edit_client.city" :state="state" :default_stateCode="edit_client.address.stateCode" :default_cityid="edit_client.address.cityId" :disabled="state===''"/>
                </div>
                <div v-if="Object.keys(edit_client.city).length==0 && submit" class="text-danger">City cannot be empty.</div>
              </b-col>
              <b-col sm="3">
                <div class="mb-1">Zip <span class="text-danger">*</span></div>
                <div>
                  <b-form-input v-model="edit_client.address.zipCode" placeholder="Zip"></b-form-input>
                </div>
                <div v-if="!edit_client.address.zipCode && submit" class="text-danger">Zip Code cannot be empty.</div>
              </b-col>
            </b-row>
            <b-row class="2">
              <b-col>
                <div class="mb-1">Email <span class="text-danger">*</span></div>
                <div>
                  <b-form-input v-model="edit_client.emailAddress" placeholder="Email"></b-form-input>
                </div>
                <div v-if="!edit_client.emailAddress && submit" class="text-danger">Email Address cannot be empty.</div>
                <div v-else-if="!validateEmail(edit_client.emailAddress) && submit" class="text-danger">Email is invalid.</div>
              </b-col>
              <b-col>
                <div class="mb-1">Phone <span class="text-danger">*</span></div>
                <div>
                  <b-form-input v-model="phonenumber" placeholder="Phone Number"></b-form-input>
                </div>
                <div v-if="!phonenumber && submit" class="text-danger">Phone Number cannot be empty.</div>
                <div v-else-if="!phoneValidation(phonenumber)" class="text-danger">Phone Number is invalid.</div>
              </b-col>
            </b-row>
          </div>
          
          <template v-slot:modal-footer="{ cancel }">
            <div>
              <b-btn class="mr-2" v-if="!edit_client.name || !edit_client.address.addressLine1 || !edit_client.address.zipCode || !edit_client.emailAddress || !phonenumber || !phoneValidation(phonenumber) || !validateEmail(edit_client.emailAddress)" style="background-color: #0C2340; border-radius: 3px" @click="markSubmitted()">Save Updates</b-btn>
              <b-btn class="mr-2" v-else style="background-color: #0C2340; border-radius: 3px" @click="cancel(), editClient()">Save Updates</b-btn>
              <b-btn style="background-color: #0C2340; border-radius: 3px" @click="cancel(), cancelEdit()" class="mr-2">Cancel</b-btn>
            </div>
          </template>
        </b-modal>
      </div>
    </div>
  </div>
</template>
<script>
import DashHeader from './dash-header';
import AddressProxy from '@/proxies/AddressProxy.js';
import AccountProxy from '@/proxies/AccountProxy.js';
import Autocomplete from '@/components/AutocompleteCity.vue';
import AutoCompleteState from '@/components/AutoCompleteState.vue';

import Avatar from 'vue-avatar-component'

export default {
  name: 'AddClient',
  components: {
    Autocomplete,
    AutoCompleteState,
    Avatar,
    DashHeader
  },
  props: ['role', 'profile'],
  data() {
    return {
      list_or_detail_page: false,
      detal_obj: {},
      fields: [
        {
          key: 'name',
          sortable: false,
        },
        {
          key: 'address',
          sortable: false,
        },
        {
          key: 'numberProjectsInProgress',
          sortable: false
        },
        {
          key: 'numberProjectsInQueue',
          sortable: false 
        },
        {
          key: 'numberProjectsCompleted',
          sortable: false
        },
        {
          key: 'clientId',
          sortable: false
        },
        {
          key: 'button',
          sortable: false
        },
      ],
      items: [],
      states: [],
      cities: [],
      business_name: '', 
      address: '', 
      city: {}, 
      state: {}, 
      zip: '', 
      email: '',
      phonenumber:'',
      search_key_location: '',
      temp_states: [],
      default_items:[],

      companyProfile: {},
      clients: [], // Show the clients list for the company profile
      edit_client: {}, // Temp object for editing the client profile,
      temp_client: {},
      submit: false,
      userRole: '',
      perPage: 15,
      currentPage: 1,
    };
  },

  methods: {
    //When someone click the detail page on the row of the clients
    gotoDetal(row){
      this.list_or_detail_page = true;
      this.edit_client = row.item;
      //SEt for the empty state and city attribute for the validation
      this.edit_client.state = {
        code: row.item.address.stateCode,
        id: row.item.address.stateId,
        name: row.item.address.stateName
      };
      this.edit_client.city = {
        id: row.item.address.cityId,
        name: row.item.address.cityName
      };
      this.temp_client = Object.assign({}, this.edit_client);
      this.phonenumber = this.edit_client.phoneNumber;
    },

    goback(){
      this.list_or_detail_page = false;
    },

    //Add Client function when someone click the submit for the adding dialogue
    addClient(){
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
        this.getClientsList();
      })
      .catch(e => {
        console.error("error");
      })
    },

    cancelEdit() {
      this.edit_client = Object.assign({}, this.temp_client);
    },

    //Edit client function
    editClient(){
      const {id, name, emailAddress, phoneNumber} = this.edit_client;
      let stateId = this.state.id;
      let cityId = this.edit_client.city.id;
      let zip = this.edit_client.address.zipCode;
      let address = this.edit_client.address.addressLine1;
      let param = {
        id,
        name,
        emailAddress,
        phoneNumber,
        stateId,
        cityId,
        zip,
        address
      }
      new AccountProxy().editAccountClient(param).then((response) => {
        if(response.status === 200){
          this.$notify({
            group: 'notify',
            type: 'success',
            title: 'Added Successfully.',
            text: 'New clients added successfully.',
            duration: 5000,
            speed: 1000,
          });
          this.getClientsList();
        }
        else{
          console.error("there is some error");
        }
      })
    },

    //Mark the flag for submitting
    markSubmitted() {
      this.submit = true;
    },

    detect_change_filter() {
      this.states = this.temp_states.filter(
        state => state.name.indexOf(this.search_key_location) > -1
      );
    },

    filter_by_location(location) {
      if (location == 'All') this.items = this.default_items;
      else this.items = this.default_items.filter(item => item.address.stateName == location);
    },

    //Get Company profile to show the company information
    getCompanyProfile(){
      new AccountProxy().getCompanyProfile()
        .then(response => {
          this.companyProfile = response;
          this.getClientsList();
        })
        .catch(error => {
          console.error('error123!: ' + error);
        })
    },

    //Get clients list for showing the client list on the table -> only called after the reading company profile page successfully.
    getClientsList() {
      let params = new FormData();
      if(this.userRole === '4'){
        params.append('accountCode', this.companyProfile.accountCode);
      }
      else{
        let profile = JSON.parse(localStorage.getItem('profile'));
        params.append('accountCode', profile.accountCode);
      }
      
      new AccountProxy().getAccountClients(params)
        .then(response => {
          this.items = response;
          this.default_items = response;
        })
        .catch(error => {
          console.error('error123!: ' + error);
        })
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
    }
      
  },
  created() { 
    //Grab the states list for the header filtering function
    new AddressProxy().getStates().then((response) => {
      this.states = response;
      this.temp_states = response;
    });
    //Get the info to show for the company profile
    //Get the userrole from the localstorage
    this.userRole = localStorage.getItem('user_role');
    if(this.userRole === '4' || this.userRole === '5'){
      this.getCompanyProfile();
    }
    if(this.userRole === '6'){
      this.getClientsList();
    }
  },

  filters: {
    //Phone showing validation for the edit and add client dialogue(showing on the page)
    formatPhone: function (phoneNumberString) {
      var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
      var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
      if (match) {
        var intlCode = (match[1] ? '+1 ' : '')
        return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
      }
      return null
    }
  },

  watch: {
    phonenumber: function(phoneNumberString) {
      var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
      var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
      if (match) {
        var intlCode = (match[1] ? '+1 ' : '')
        this.phonenumber = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
      }
    }
  },

  computed: {
    rows() {
      return this.items.length
    }
  }
};
</script>

<style scoped>
.project {
    font-size: 1em;
    color: black;
    font-weight: 500;
}
.content {
    margin: 20px;
    background-color: white;
    min-height: 80vh;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    padding: 20px 30px;
}
.button-type {
    background-color: #0c2340;
    color: white;
    font-weight: normal !important;
    padding-left: 20px;
    padding-right: 20px;
}
.btn-style {
    background-color: #0C2340;
    border-color: #0C2340;
    color: white;
    padding: 3px 15px;
    border-radius: 3px;
}
 .dialog-btn-style {
        padding: 7px 40px 7px 40px;
        border-radius: 8px;
        border-width: 0;
}
.second-btn-style {
    background-color: #83afdb;
}
.pagination-bar {
  display: flex;
  justify-content: center;
}
</style>
