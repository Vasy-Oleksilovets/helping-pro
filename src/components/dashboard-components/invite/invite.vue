<template>
  <div>
    <DashHeader :role="role" :profile="profile"/>
    <div class="invite">
      <notifications group="foo" />
      <div v-if="user_role === 4" class="title-text text-dark">Invite User</div>
      <div v-if="user_role === 5" class="title-text text-dark">Invite Project Manager</div>
      <div class="sub-title text-dark">Enter email to send an invitation link.</div>
      <div v-for="(item, index) in invitePerson" :key="item.ID" class="total-block" style="position: relative">
        <div>
          <b-icon v-if="index>0" role="button" @click="deleteUser(index)" style="position: absolute; top: 10px; right: -10px" icon="x-circle" scale="1.5" variant="danger"></b-icon>
        </div>
        <div class="d-flex">
          <div>
            <div class="input-group">
              <div class="input-item d-flex align-items-center" style="margin-right: 4%">
                <b-form-input v-model="item.firstname" style="margin-right: 2%" class="input-style" placeholder="First Name"></b-form-input>
                <b-form-input v-model="item.lastname" class="input-style" placeholder="Last Name"></b-form-input>
                <b-icon style="opacity: 0.8" icon="person-fill" scale="1.5"></b-icon>
              </div>
              <div class="input-item d-flex align-items-center">
                <b-form-input v-model="item.email" class="input-style" placeholder="Enter Email"></b-form-input>
                <b-icon style="opacity: 0.8" icon="envelope-fill" scale="1.5"></b-icon>
              </div>
            </div>

            <div v-if="user_role === 4" class="input-group">
              <div class="input-item d-flex align-items-center  justify-content-between" style="margin-right: 4%">
                <b-form-select v-model="item.stateId" @change="stateChanged(item.stateId, index)">
                  <option :value="null" disabled>State</option>
                  <option v-for="state in states" v-bind:key="state.name" v-bind:value="state">{{ state.name }}</option>
                </b-form-select>
              </div>
              <div class="input-item d-flex align-items-center">
                <b-form-select v-model="item.office_name">
                  <option :value="null" disabled>Office</option>
                  <option v-for="office in item.offices_list" :key="office.accountNumber" :value="office">{{office.officeName}}</option>
                </b-form-select>
              </div>
            </div>

            <div v-if="user_role === 4" class="input-group">
              <div class="input-item d-flex align-items-center  justify-content-center"  style="margin-right: 4%">
                <div class="font-weight-bold d-flex">Select Role</div>
              </div>
              <div class="input-item d-flex align-items-center  justify-content-between">
                <b-form-select v-model="item.user_role">
                  <option value="" disabled>User role</option>
                  <option value="5">Office Manager</option>
                  <option value="6">Project Manager</option>
                  <option v-if="item.office_name && item.office_name.officeName===null" value="4">Company Administrator</option>
                </b-form-select>
              </div>
            </div>
          </div>
        </div>
        <div class="font-weight-bold text-dark mt-2" role="button" @click="addInvitePerson">+ Invite another user</div>
        <button class="btn-style mt-3" @click="invitationSend(item)">Send Invite</button>
        <hr/>
        <div class="container text-left alert-danger">
            <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                <li v-for="(error, idx) in errors" :key="idx">{{ error }}</li>
                </ul>
            </p> 
        </div>   
      </div>
      <div class="table-block">
        <div class="font-weight-bold table-header">Invitation Sent</div>
        <div class="ml-2 mt-3 table-body">
          <b-row v-for="(item, index) in invitedUsers" :key="index" class="mb-1 align-items-center">
            <b-col sm="4">{{item.firstName}} {{item.lastName}}</b-col>
            <b-col sm="5">{{item.emailAddress}}</b-col>
            <b-col sm="3">
              <div class="status-sub">{{item.status}}</div>
            </b-col>
          </b-row>    
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashHeader from '../dash-header';
import InviteUsersProxy from '@/proxies/InviteUsersProxy.js';
import AddressProxy from '@/proxies/AddressProxy.js';
import { BIcon, BIconPersonFill, BIconEnvelopeFill, BIconXCircle } from 'bootstrap-vue'
export default {
  name: 'Invite',
  components: {
    DashHeader,
    BIcon,
    BIconPersonFill,
    BIconEnvelopeFill,
    BIconXCircle
  },
  props: ['role', 'profile'],
  data() {
    return {
      invitePerson:[{
        ID: 1,
        firstname: '',
        lastname: '',
        email: '',
        stateId: null,
        cityId: '',
        office_name: null,
        user_role:'',
        offices_list: [],
      }],
      user_role: '',
      states: [],
      cities: [],
      stateId: '',
      offices_list: [],
      companyProfile: {},
      invitedUsers: [],
      
      temp_state_list: [], //Will put all the state Codes from the company profile offices
      errors: []
    };
  },
  methods: {
    stateChanged(item, index){
      this.invitePerson[index].offices_list = this.offices_list.filter((office) => office.address.stateCode == item.code);
    },

    log(msg){
    },

    addInvitePerson(){
      this.invitePerson.push({
        ID: this.invitePerson.length + 1,
        firstname: '',
        lastname: '',
        email: '',
        stateId: '',
        cityId: '',
        cities: []
      })
    },
    validEmail: function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }, 
    invitationSend(item) {
      this.errors = [];
      if (!item.email) {
          this.errors.push('Email address required.');
      } else if (!this.validEmail(item.email)) {
          this.errors.push('Valid email address required.');
      }   
      if (!item.firstname) {
          this.errors.push('First name required.');
      }          
      if (!item.lastname) {
          this.errors.push('Last name required.');
      }
      if (Object.keys(item.stateId).length === 0) {
          this.errors.push('State required.');
      }
      if (item.office_name && Object.keys(item.office_name).length === 0) {
          this.errors.push('Office name required.');
      }
      if (!item.user_role) {
          this.errors.push('User role required.');
      }
      if (this.errors.length !== 0) return;
      var params = {
        firstName: item.firstname,
        lastName: item.lastname,
        emailAddress: item.email,
        companyName: item.office_name.officeName,
        stateId: item.stateId.id,
        cityId: item.office_name.city,
        roleId: item.user_role,
        accountOfficeId: item.office_name.id
      }
      new InviteUsersProxy()
        .inviteUser(params)
        .then(response => {
          if (response.status == '200') {
            this.invites = response.data.verifyEmailsResponses;
            this.serverMessage = response.data.message;
            this.$notify({
              group: 'foo',
              title: 'Notification',
              text: 'Invitation send successfully.',
              duration: 1000,
              speed: 1000,
              type: 'success'
            });
            this.invitePerson = [{
              ID: 1,
              firstname: '',
              lastname: '',
              email: '',
              stateId: '',
              companyName: '',
              user_role:'',
              cities: []
            }];
            this.getClientInvites();
          } else {
            this.serverMessage = response.data;
          }
        })
        .catch(e => {
          this.errors.push(e);
        });
    },

    deleteUser(index){
      this.invitePerson.splice(index, 1);
    },

    getClientInvites(){
      new InviteUsersProxy().getInvitesList().then(res => {
        if(res.status === 200){
          this.invitedUsers = [...res.data];
        }
      }).catch(err => {
        console.error(err);
      })
    },

    changeOfficeIndex(index){

    }
  },
  created() {
    this.user_role = parseInt(localStorage.getItem('user_role'));
    new AddressProxy().getStates().then((response) => {
      // this.states = response;
      for(let item of response){
        if(this.temp_state_list.includes(item.code)) this.states.push(item);
        else continue;
      }
    }).catch(err => {
      console.error(err);
    });

    if(this.user_role === 4){
      let companyProfile = JSON.parse(localStorage.getItem('companyProfile'));
      this.companyProfile = companyProfile;
      for(let i=0; i<companyProfile.accountOffices.length; i++){
        this.temp_state_list.push(companyProfile.accountOffices[i].address.stateCode);
        this.offices_list.push(companyProfile.accountOffices[i]);
      }
    }

    this.getClientInvites();
  },
  mounted() {
    this.user_role = parseInt(localStorage.getItem('user_role'));
  },
  
  watch: {
    stateId: function(newValue) {
      new AddressProxy().getCities(newValue).then((response) => {
        this.cities = response;
      })
      .catch(error => {
        console.error(error);
      });  
    },
    
    cityId: function(newValue){
      this.item.stateId = this.stateId;
      this.item.cityId = newValue;
    }
  }
};
</script>

<style lang="css" scoped>
.invite {
    margin: 30px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    background-color: white;
    padding-bottom: 5%;
}
.title-text{
    padding: 4% 20% 1% 20%;
    text-align: center;
    font-size: 25px;
    font-weight: bold;
}
.sub-title {
    font-size: 16px;
    font-weight: 700;
    text-align: center;
}
.input-group {
    display: flex;
    margin-top: 2%;
}
.input-item {
    width: 48%;
}
.input-style {
    border: 0px;
    background-color:white;
    border-bottom: 1px solid grey;
    width: 100%;
};

.input-style:focus {
    background-color: yellow;
}

.total-block {
    max-width: 640px;
    margin: 0 auto;
}

.table-block {
    max-width: 660px;
    margin: 0 auto;
}

.btn-style {
    background-color: #0c2340;
    color: white;
    padding: 5px 20px;
    border-radius: 5px;
    border: 0px;
}

.table-header {
    font-size: 16px;
}

.table-body {
    font-weight: 500;
    font-size: 13px;
}

.status-sub {
    background-color: #e8fef0;
    overflow: hidden;
    padding: 5px 10px;
    border-radius: 10px;
    text-align: center;
    color: #71cb95;
}

.status-await {
    background-color: #fef5e6;
    overflow: hidden;
    padding: 5px 10px;
    border-radius: 10px;
    text-align: center;
    color: #eab761;
}

</style>
