<template>
  <div class="conceptScreening ccheck">
    <Navigation />
    <main class="bg-img content">
      <section class="secWhite secValidate login-section">
        <div class="container text-center">
          <h2 class="title">Login to Construction Check</h2>
          <div v-if="showLogin">
            <!-- show the login screen -->
            <h5>You are not currrently logged in. Please log in to continue.
            </h5>
            <div id="loginComponent">
              <form @submit.prevent="callLogin()">
                <div class="input-field">
                  <input type="email" placeholder="Email" v-model="user"/><img class="icon" src="~@/assets/img/icons/user-solid.svg" />
                </div><br /><br />
                <div class="input-field">
                  <input type="password" placeholder="Password" v-model="password"/>
                  <img class="icon" src="~@/assets/img/icons/unlock-alt-solid.svg" />
                </div>
                <br />
                <br />
                <b-btn variant="success" type="submit" class="arrow">Login <img class="icon" src="~@/assets/img/icons/arrow-right-solid.svg" /></b-btn>
                <div v-if="error" class="alert alert-danger mt-5">
                  <strong> <b-icon icon="exclamation-circle"></b-icon> Error!</strong> &nbsp; Wrong email and password combination.
                </div>
                <div class="link-holder d-flex justify-content-center">
                  <router-link to="/forgot-password">Forgot Password?</router-link>
                  <!-- <router-link to="/forgot-email">Forgot Email</router-link> -->
                </div>
                <div class="register-box">
                  <img class="icon" src="~@/assets/img/icons/register.svg" />
                  <div><router-link to="/signup">Click Here to Register</router-link> for a ConstructionCheck Account.</div>
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
//import { LOGIN } from '../store/modules/auth/mutation-types';
import Vue from 'vue';
import AuthProxy from '@/proxies/AuthProxy.js';

export default {
  name: 'Login',
  data() {
    return {
      loginError: false,
      user: '',
      password: '',
      error: false,
      errors: [],
      showLogin: true,
      userCode: null,
      token: null,
      roles: '',
    };
  },
  methods: {
    callLogin() {
      var params = new URLSearchParams();
      params.append('username', this.user);
      params.append('password', this.password);
      new AuthProxy()
        .getLogin(params)
        .then(response => {
          // JSON responses are automatically parsed.
          if(response.status == '200') {
            console.log(response);
            // good login
            this.token = response.data.token;
            // set the token
            Vue.$http.defaults.headers.common.Authorization = `Bearer ${ this.token }`;
            localStorage.setItem('id_token', this.token);
            this.isLoggedIn = true;
            let role = response.data.roles[0].id;
            console.log(`This is the user role from the backend ${this.role}`);
            sessionStorage.setItem("isAuthenticated", true);
            if (role === 1) {
              //If the user role is 1 it is CC Super Admin
              this.$store.state.userRole = 1;
              this.$store.dispatch('auth/login', {
                  token: this.token,
                  userRole: 1,
              });
              localStorage.setItem('user_role', 1);
              this.$router.push('/dashboard/index');
            } else if (role === 2) {
              //If the user role is 2, it is CC Admin
              this.$store.state.userRole = 2;
              this.$store.dispatch('auth/login', {
                  token: this.token,
                  userRole: 2,
              });
              localStorage.setItem('user_role', 2);
              this.$router.push('/dashboard/index');
            }  else if (role === 3) {
              //If the user role is 3, it is CC Estimator
              this.$store.state.userRole = 3;
              this.$store.dispatch('auth/login', {
                  token: this.token,
                  userRole: 3,
              });
              localStorage.setItem('user_role', 3);
              this.$router.push('/dashboard/index');
            }  else if (role === 4) {
              //If the user role is 4, it is Company Administrator
              this.$store.state.userRole = 4;
              this.$store.dispatch('auth/login', {
                  token: this.token,
                  userRole: 4,
              });
              localStorage.setItem('user_role', 4);
              this.$router.push('/dashboard/index');
            } else if(role === 5){
              //If the user role is 5, it is portfolio Administrator
              this.$store.state.userRole = 5;
              localStorage.setItem('user_role', 5);
              this.$store.dispatch('auth/login', {
                token: this.token,  
                userRole: 5 // This is the Project Administrator Role
              });
              this.$router.push('/dashboard/index');
            }
            else if(role === 6){
              //If the user role is 6, it is Project Administrator Role
              this.$store.state.userRole = 6;
              this.$store.dispatch('auth/login', {
                  token: this.token,
                  userRole: 6,
              });
              localStorage.setItem('user_role', 6)
              this.$router.push('/dashboard/index');
            }
            else if(role === 7){
              //If the user role is 7, it is Project Manager Role
              this.$store.state.auth.userRole = 7;
              this.$store.dispatch('auth/login', {
                  token: this.token,
                  userRole: 7,
              });
              localStorage.setItem('user_role', 7)
              this.$router.push('/dashboard/index');
            }
            else if(role === 8){
              //If the user role is 8, it is Production Manager Role
              this.$store.state.userRole = 8;
              this.$store.dispatch('auth/login', {
                token: this.token,
                userRole: 8,
              });
              localStorage.setItem('user_role', 8)
              this.$router.push('/dashboard/index');
            }
          } else {
            // bad login
            this.$store.state.loginSuccess = false;
            this.isLoggedIn = false;
            this.$store.dispatch('auth/logout');
          }
          if(response.status === 202){
            this.error = true;
          }
        })
        .catch(e => {
          console.log(e);
          this.error=true;
        });
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
</style>
