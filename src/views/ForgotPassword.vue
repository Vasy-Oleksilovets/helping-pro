<template>
  <div class="conceptScreening ccheck">
    <Navigation />
    <main class="bg-img content">            
      <section class="secWhite secValidate login-section">
        <div v-if="!success" class="container text-center">
          <h2 class="title">Forgot Password</h2>
          <div>
            <h5>Please enter a valid email address below, we will send you a reset email.</h5>
            <div id="loginComponent">
              <form @submit.prevent="sendEmail()" >
                <div class="input-field">
                  <input type="email" placeholder="Email" v-model="email"/>
                  <img class="icon" src="~@/assets/img/icons/envelope-open-solid.svg" />
                </div>
                <div v-if="submitted && !email" class="error-msg text-danger">Email cannot be empty</div>
                <b-btn variant="success" type="submit" class="mt-4 arrow">Send Password Reset Email 
                  <img class="icon" src="~@/assets/img/icons/arrow-right-solid.svg" />
                </b-btn>
                <p v-if="success" class="success">Please check your email to reset your password.</p>
                <div class="link-holder">
                  <router-link to="/login">Go Back to Login</router-link>                                   
                </div>
              </form>
            </div>
          </div>
          <p></p>
        </div>
        <div v-if="success" class="container text-center">
         <div class="container text-center" style="margin-top: 10vh">
            <h3 class="title">RESET PASSWORD EMAIL SENT</h3>
            <div style="max-width: 700px; margin: auto">                            
              <h5> If {{this.email}} is in our records, you will receive an email from donotreply@constructioncheck.io with a link to reset your password.</h5>
              <h5> If you do not see it shortly, please check your junk mail folder. </h5>
              <h5> If you have checked your junk mail folder and still did not receive an email, please email us for assistance. </h5>
              <h5 class="mt-5">
                <img class="green-check" alt="Vue logo" src="~@/assets/img/green-checkmark.png"/> Email sent to {{ this.email }}
              </h5>
            </div>
          </div>
        </div>
      </section>
    </main>
    <SiteFooter />
  </div>
</template>

<script>
import Navigation from '../components/Navigation.vue';
import SiteFooter from '../components/SiteFooter.vue';
//import { LOGIN } from '../store/modules/auth/mutation-types';
import Vue from 'vue';
import AuthProxy from '@/proxies/AuthProxy.js';

export default {
  name: 'ForgotPassword',
  data() {
    return {
      loginError: false,
      email: '',            
      error: false,
      submitted: false,
      errors: [],
      showLogin: true,
      userCode: null,
      token: null,
      roles: '',
      success: false
    };
  },
  methods: {
    sendEmail() {
      this.submitted = true;
      if(this.email){
        let params = new FormData();
        params.append('emailAddress', this.email);
        new AuthProxy().forgotPassword(params)
        .then(response => {
          console.log(response);
          this.success = true;
        })
        .catch(error => {
          console.error('error123!: ' + error);
        })
      }
    },
  },
  components: {
    Navigation: Navigation,
    SiteFooter,        
  },
  created() {},
};
</script>
<style>
@import '../assets/css/style.css';
label {
  padding-left: 5px;
}
h3 {
  color: #ed6d3a;
}
.bold {
    font-weight: bold;
}
.error-msg {
  text-align: left;
}
.custom-margin {
  margin-top: 20vh;
  margin-bottom: 10vh;
}
</style>
