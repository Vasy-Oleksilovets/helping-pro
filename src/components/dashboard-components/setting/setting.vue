<template>
  <div>
    <DashHeader :role="role" :profile="profile"/>
    <div class="project">
      <b-row class="table-all no-gutters">
        <b-col class="table-header d-flex justify-content-between">
          <div v-if="submit_status" class="ml-4"><span role="button" @click="goToback">Settings</span> > Submit Ticket</div>
          <div v-else class="ml-4">Settings</div>
        </b-col>
      </b-row>
      <!-- Submit Form -->
      <div class="content" v-if="submit_status">
        <b-row>
          <b-col class="d-flex align-items-center" role="button" @click="goToback">
            <img alt="previous Image" src="~@/assets/img/small-icons/left-arrow.png"/>
            <span class="ml-3">Back</span>
          </b-col>
        </b-row>
        <b-row class="bottom-line mt-3 ml-1 mr-1"></b-row>
        <b-row class="mt-4">
          <b-col> Name </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col sm="3">
            <b-form-input placeholder="Your name"></b-form-input>
          </b-col>
        </b-row>

        <b-row class="mt-4">
          <b-col>Email</b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col sm="3">
            <b-form-input placeholder="Your email address"></b-form-input>
          </b-col>
        </b-row>

        <b-row class="mt-4">
          <b-col> Subject </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col sm="3">
            <b-form-input placeholder="Subject"></b-form-input>
          </b-col>
        </b-row>

        <b-row class="mt-4">
          <b-col> Message </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col sm="6">
            <b-form-textarea id="textarea-small" placeholder="Type message here" no-resize style="height: 200px"></b-form-textarea>
          </b-col>
        </b-row>

        <b-row class="mt-4">
          <b-col>
            <b-button @click="openSubmitForm" style="background-color: #0C2340; padding: 10px 70px; border-radius: 3px">Send</b-button>
          </b-col>
        </b-row>
      </div>

      <!-- Information Page -->
      <div v-else class="content">
        <b-row class="no-gutters">
          <b-col>
            <img class="mr-2" src="~@/assets/img/notification-whtie.png" alt=""/>
            <span>Notifications</span>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col style="font-weight: 800">
            How would you like to receive notifications?
          </b-col>
        </b-row>
        <hr />
        <b-row>
          <b-col sm="3">By email</b-col>
          <b-col sm="3" class="d-flex">
            <span class="mr-1">Yes</span>
            <b-form-checkbox  switch size="lg" style="transform: rotate(180deg); margin-top: 2px"></b-form-checkbox>
            <span class="ml-3">No</span>
          </b-col>
        </b-row>
        <hr />
        <b-row>
          <b-col sm="3">By SMS</b-col>
          <b-col sm="3" class="d-flex">
            <span class="mr-1">Yes</span>
            <b-form-checkbox  switch size="lg" style="transform: rotate(180deg); margin-top: 2px"></b-form-checkbox>
            <span class="ml-3">No</span>
          </b-col>
        </b-row>
        <hr />
        <b-row>
          <b-col style="font-weight: 800" class="mt-2">
            We'll let you know about important updates. Do you want to receive notifications for the following?
          </b-col>
        </b-row>
        <hr />
        <b-row>
          <b-col sm="3">Billing and payments</b-col>
          <b-col sm="3" class="d-flex">
            <span class="mr-1">Yes</span>
            <b-form-checkbox  switch size="lg" style="transform: rotate(180deg); margin-top: 2px"></b-form-checkbox>
            <span class="ml-3">No</span>
          </b-col>
        </b-row>
        <hr />
        <b-row>
          <b-col sm="3">Updates on projects</b-col>
          <b-col sm="3" class="d-flex">
            <span class="mr-1">Yes</span>
            <b-form-checkbox  switch size="lg" style="transform: rotate(180deg); margin-top: 2px"></b-form-checkbox>
            <span class="ml-3">No</span>
          </b-col>
        </b-row>
        <hr />

        <!--Just only validate for the Client View-->
        <div v-if="role === 6">
          <b-row>
            <b-col sm="3">When someone makes a comment</b-col>
            <b-col sm="3" class="d-flex">
              <span class="mr-1">Yes</span>
              <b-form-checkbox  switch size="lg" style="transform: rotate(180deg); margin-top: 2px"></b-form-checkbox>
              <span class="ml-3">No</span>
            </b-col>
          </b-row>
          <hr />
        </div>

        <div v-if="role === 6">
          <b-row>
            <b-col sm="3">When estimates are approved</b-col>
            <b-col sm="3" class="d-flex">
              <span class="mr-1">Yes</span>
              <b-form-checkbox  switch size="lg" style="transform: rotate(180deg); margin-top: 2px"></b-form-checkbox>
              <span class="ml-3">No</span>
            </b-col>
          </b-row>
          <hr />
        </div>

        <div v-if="role === 6">
          <b-row>
            <b-col sm="3">When estimates are declined</b-col>
            <b-col sm="3" class="d-flex">
              <span class="mr-1">Yes</span>
              <b-form-checkbox  switch size="lg" style="transform: rotate(180deg); margin-top: 2px"></b-form-checkbox>
              <span class="ml-3">No</span>
            </b-col>
          </b-row>
          <hr />
        </div>

        <div v-if="role === 6">
          <b-row>
            <b-col sm="3">When estimates send a message</b-col>
            <b-col sm="3" class="d-flex">
              <span class="mr-1">Yes</span>
              <b-form-checkbox  switch size="lg" style="transform: rotate(180deg); margin-top: 2px"></b-form-checkbox>
              <span class="ml-3">No</span>
            </b-col>
          </b-row>
          <hr />
        </div>

        <div v-if="role!==6">
          <b-row>
            <b-col sm="3">New Comments</b-col>
            <b-col sm="3" class="d-flex">
              <span class="mr-1">Yes</span>
              <b-form-checkbox  switch size="lg" style="transform: rotate(180deg); margin-top: 2px"></b-form-checkbox>
              <span class="ml-3">No</span>
            </b-col>
          </b-row>
          <hr />
        </div>
        <b-row class="mt-4">
          <b-col class="d-flex align-items-center">
            <img class="mr-3" src="~@/assets/img/help.png" alt=""/>
            <span>Help</span>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col>Contact support</b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col sm="2">
            <b-row>
              <b-col class="d-flex align-items-center font-weight-normal">
                <img class="mr-3" src="~@/assets/img/phone-icon.png" alt=""/>
                <span>{{phoneNumber|validPhoneNumber}}</span>
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col class="font-weight-normal align-items-center d-flex">
                <img class="mr-3" src="~@/assets/img/email-icon.png" alt=""/>
                <span>email@email.com</span>
              </b-col>
            </b-row>
          </b-col>
          <b-col sm="1" style="font-weight: 800">or</b-col>
          <b-col sm="3">
            <b-button @click="openSubmitForm" style="background-color: #0C2340; border-radius: 3px; padding: 10px 40px;">Submit Ticket</b-button>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
import DashHeader from '../dash-header';
export default {
  name: 'Setting',
  props: ['role'],
  components: {
    DashHeader
  },
  props: ['role', 'profile'],
  data() {
    return {
      phoneNumber: '5555555555',
      submit_status: false
    };
  },
  methods: {
    acceptNumber() {
      var x = this.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      this.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    },
    openSubmitForm(){
      this.submit_status = true;
    },
    goToback() {
      this.submit_status = false;
    }
  },
  created() {
  },
  filters: {
    validPhoneNumber(value) {
      return value.replace(/[^0-9]/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    }
  }
};
</script>

<style scoped>
.col-width {
  width: 14.2%;
}
.project {
  font-size: 1em;
  color: black;
  font-weight: 500;
}
.table-header {
  background-color: #061831;
  color: white;
  padding: 15px 30px 15px 30px;
  min-width: 1200px !important;
}
.content {
  margin: 20px;
  background-color: white;
  min-height: 80vh;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  padding: 20px 30px;
}

.bottom-line {
  border-bottom: 1px solid #000000;
}
</style>
