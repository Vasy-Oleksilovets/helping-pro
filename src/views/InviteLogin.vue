<template>
  <div class="conceptScreening ccheck">
    <Navigation />
    <main class="bg-img content">
      <section class="secWhite secValidate login-section">
        <div class="container text-center">
          <h2 class="title">Login to Construction Check</h2>
          <div v-if="showLogin">
            <!-- show the login screen -->
            <h5>Please confirm your password to Create a Construction Check account.</h5>
            <div id="loginComponent">
              <form @submit.prevent="callLogin()">
                <div class="input-field">
                  <input disabled type="text" placeholder="Email" v-model="emailAddress"/>
                  <img class="icon" src="~@/assets/img/icons/user-solid.svg" />
                </div>
                <div class="text-left text-danger">{{emailError}}</div>
                <br />
                <br />
                <div class="input-field">
                  <input type="password" placeholder="Password" v-model="password"/>
                  <img class="icon" src="~@/assets/img/icons/unlock-alt-solid.svg" />
                </div>
                <div class="text-left text-danger">{{passwordError}}</div>
                <br /><br />
                <div class="input-field">
                  <input type="password" placeholder="Confirm Password" v-model="confirmPassword"/>
                  <img class="icon" src="~@/assets/img/icons/unlock-alt-solid.svg" />
                </div>
                <div class="text-left text-danger">{{matchingError}}</div>
                <br />
                <br />
                <b-btn variant="success" type="submit" class="arrow">Create Account
                  <img class="icon" src="~@/assets/img/icons/arrow-right-solid.svg" />
                </b-btn>
                <p v-if="errors.length>0" class="error">
                  {{errors[0]}}
                </p>
                <div class="register-box mt-5">
                  <img class="icon" src="~@/assets/img/icons/register.svg" />
                  <div><router-link to="/signup">Click Here to Register</router-link> for a ConstructionCheck Account</div>
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
    name: 'InviteLogin',
    data() {
      return {
        loginError: false,
        emailAddress: '',
        password: '',
        confirmPassword: '',
        error: false,
        errors: [],
        showLogin: true,
        userCode: null,
        token: null,
        roles: '',

        inviteCode: '',

        //State for sending error message
        emailError: '',
        passwordError: '',
        matchingError: '',
        submitted: false,
    };
    },
    methods: {
      callLogin() {
        if(this.validateLogin()){
          this.emailError = "";
          this.matchingError = "";
          this.passwordError = "";
          var params = new URLSearchParams();
          params.append('password', this.password);
          params.append('inviteCode', this.inviteCode);
          new AccountProxy().confirmClientInvite(params).then((response) => {
            if(response.status == '200'){
              this.hasError = false;
              //Show the success message for the account creating successfully
              this.$notify({
                group: 'notify',
                type: 'success',
                title: 'Successfully Registerd',
                text: 'Accoount created successfully!',
                duration: 5000,
                speed: 1000,
              });
              this.$router.push('/login'); // send to login page
            }else if(response.status == '202'){
              this.hasError = true;
              this.errors.push("The invitation email has expired. Please contact your administrator to have another invitation sent to you.");
            } else{
              this.errors.push("There was an error creating your account. Please try again.");
            }
          })
          .catch(e => {
            this.errors.push("There was an error creating your account. Please try again.");
          })    
        }
      },

      //Get Invite Eamil just sending invite Code, backend will decode code to email and send it to the front-end
      getLocalInviteEmail(){
        var params = new URLSearchParams();
        params.append('inviteCode', this.inviteCode);
        new AccountProxy().getInviteEmail(params).then((response) => {
          if(response.status == '200'){
            this.hasError = false;
            // verified
            this.emailAddress = response.data.emailAddress
            this.emailConfirmed = true;
          }else if(response.status == '202'){
            //TODO showing the error messages when get the 202 status
            this.hasError = true;
            this.errors.push("The verification email has expired. Please click 'Get Started' and try again.");
          } else{
            this.hasError = true;
            this.errors.push("Invalid email address verification code.")
          }
        })
        .catch(e => {
          this.hasError = true;
          this.errors.push("Invalid email address verification code.")
        }) 
      },
      
      validateLogin(){
        let flag = false;
        // if(!this.emailAddress){
        //   this.emailError = 'Email Address cannot be empty';
        //   flag = true;
        // }
        // else this.emailError = '';
        if(!this.password){
          this.passwordError = 'Password cannot be empty';
          flag = true;
        }
        else{
          if(!this.validStrongPassword(this.password)) {
            this.passwordError = 'Please use the strong password.';
            flag = true;
          }
          else this.passwordError = ""
        }
        if(this.password !== this.confirmPassword){
          this.matchingError = 'Confirm password should be matched';
          flag = true;
        }
        if(flag) return false;
        else return true;
        // if(this.password===this.confirmPassword) return true;
        // else return false;
      },
      
      validStrongPassword(password){
        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        return strongRegex.test(password)
      },
    },

    components: {
      Navigation: Navigation,
      SiteFooter,
    },

    created() {
      this.inviteCode = this.$route.params.inviteCode;
      this.getLocalInviteEmail();
    }
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
</style>
