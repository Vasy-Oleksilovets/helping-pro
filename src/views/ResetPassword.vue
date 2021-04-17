<template>
  <div class="conceptScreening ccheck">
    <Navigation />
    <main class="bg-img content">            
      <section class="secWhite secValidate login-section">
        <div class="container text-center">
          <h2 class="title">Change your password</h2>
          <div>
            <h5>Enter your new password. Once confirmed, you can enter your new password to log in to your account.</h5>
            <div id="loginComponent">
              <form class="text-start" @submit.prevent="sendEmail()" >
                
                <div class="input-field">
                  <input type="password" placeholder="New Password" v-model="password"/>
                  <img class="icon" src="~@/assets/img/icons/unlock-alt-solid.svg" />
                </div>
                <div class="text-danger text-left">{{passwordError}}</div>

                <div class="input-field mt-4">
                  <input type="password" placeholder="Confirm Password" v-model="conPassword"/>
                  <img class="icon" src="~@/assets/img/icons/unlock-alt-solid.svg" />
                </div>

                <div class="text-danger text-left mt-1" v-if="conpasswordError"><b-icon icon="exclamation-circle"></b-icon> {{conpasswordError}}</div>
                <div class="text-danger text-left mt-1" v-if="matchingError"><b-icon icon="exclamation-circle"></b-icon> {{matchingError}}</div>
                <div class="text-danger text-left mt-1" v-if="lengthError"><b-icon icon="exclamation-circle"></b-icon> {{lengthError}}</div>
                <div class="text-danger text-left mt-1" v-if="numberError"><b-icon icon="exclamation-circle"></b-icon> {{numberError}}</div>
                <div class="text-danger text-left mt-1" v-if="specialCharError"><b-icon icon="exclamation-circle"></b-icon> {{specialCharError}}</div>
                <div class="text-danger text-left mt-1" v-if="letterError"><b-icon icon="exclamation-circle"></b-icon> {{letterError}}</div>

                <b-btn  variant="success" type="submit" class="mt-5 arrow">Reset Password <img class="icon" src="~@/assets/img/icons/arrow-right-solid.svg" />
                </b-btn>

                <div class="link-holder">
                  <router-link to="/login">Go Back to Login</router-link>                                   
                </div>
              </form>
            </div>
          </div>
          <p></p>
        </div>
      </section>
    </main>
    <SiteFooter />
  </div>
</template>

<script>
import Navigation from '../components/Navigation.vue';
import SiteFooter from '../components/SiteFooter.vue';
import AccountProxy from '@/proxies/AccountProxy.js';

export default {
  name: 'ResetPassword',
  data() {
    return {
      submitted: false,
      password: '',
      conPassword: '',
      token: '',

      passwordError: '',
      conpasswordError: '',
      matchingError: '',
      lengthError:'',
      numberError:'',
      specialCharError:'',
      letterError:''
    };
  },
  methods: {
    validateForm(){
      if(!this.token){
        return false;
      }
      if(!this.password){
        this.passwordError = "Password cannot be empty.";
        return false;
      }
      else this.passwordError = '';
      if(!this.conPassword){
        this.conpasswordError = "Confirm Password cannot be empty.";
        return false;
      }
      else this.conpasswordError = '';
      if(this.password !== this.conPassword){
        this.matchingError = "These passwords don't match. Try again?";
        return false;
      }
      else this.matchingError = '';
      if (this.password.length <= 7){
        this.lengthError = "Please set a password longer than seven characters.";
        return false
      }
      else this.lengthError='';
      if (!/\d/.test(this.password)){
        this.numberError = "Password should contain at least one number.";
        return false
      }
      else this.numberError='';
      if (!/[!@#\$%\^\&*\)\(+=._-]/.test(this.password)){
        this.specialCharError = "Password should contain a special character. Hint: @, *";
        return false
      }
      else this.specialCharError='';
      if (!/[A-Za-z]/.test(this.password)){
        this.lengthError = "Password should contain at least one letter.";
        return false
      }
      else this.lengthError='';
      return true;
    },
    sendEmail() {
      console.log("reset password");
      this.submitted = true;
      if(this.validateForm()){
        var params = new URLSearchParams();
        params.append('token', this.token);
        params.append('password', this.password);
        //TODO Use the endpoint for changing the password;
        new AccountProxy()
          .passwordReset(params)
          .then(response => {
            if(!response){
              this.$notify({
              group: 'notify',
              type: 'error',
              title: 'Error',
              text: 'Password change failed. Please try again!.',
              duration: 5000,
              speed: 1000,
            });
            }
            else{
              this.$notify({
              group: 'notify',
              type: 'success',
              title: 'Success',
              text: 'Password changed successfully.',
              duration: 5000,
              speed: 1000,
            });
          }
          this.$router.push('/login');
          })
          .catch(error => {
            console.log(error)
            this.$notify({
              group: 'notify',
              type: 'error',
              title: 'Error',
              text: 'There is some error to change the password.',
              duration: 5000,
              speed: 1000,
            });
          });
      }
    }
  },
  components: {
    Navigation: Navigation,
    SiteFooter,        
  },
  created() {
    this.token = this.$route.params.id;
  },
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
</style>
