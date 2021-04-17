<template>
  <div class="conceptScreening ccheck">
    <Navigation />
    <main class="bg-img content">
      <section class="secWhite secValidate login-section">
        <div class="container text-center">
          <h2 class="title">Signup</h2>
          <div class="button-custom-group">
            <b-button class="sign-up-btn" v-on:click="showTable()">
              <img class="icon" src="~@/assets/img/icons/cost.svg" />
              <div style="text-align: left; font-size: 12px">
                <div
                  class="font-weight-bold"
                >I am looking for construction cost estimating expertise</div>
                <div
                  class="mt-2"
                >We help you improve construction cost certainty using an algorithmic approach and machine learning augmented with certified construction cost experts.</div>
              </div>
            </b-button>
            <b-button class="sign-up-btn" v-on:click="showSignup('estimator')">
              <img class="icon" src="~@/assets/img/icons/opportunity.svg" />
              <div style="text-align: left; font-size: 12px">
                <div
                  class="font-weight-bold"
                >I'm looking to to provide certified construction cost expertise</div>
                <div
                  class="mt-2"
                >Work on projects of all types, sizes, and complexities, based on your education, area of estimating expertise, and experience.</div>
              </div>
            </b-button>
          </div>

          <!-- This will be shown when the user click the business / client signup tab -->
          <h4 class="mb-5" v-if="showtable">Please select one of the tier to sign up.</h4>
          <PricingTable
            :pclientRole="clientRole"
            v-on:showEmailInput="showEmailInput"
            v-if="showtable"
          />
          <!-- End -->

          <div v-if="selected" class="container text-center mt-4">
            <h3
              v-if="role=='client' && clientRole!== ''"
              class="title"
            >Let's Get Started Improving Cost Certainty</h3>
            <h3 v-if="role==='estimator'" class="title">Let's get started with your account</h3>
            <div>
              <h5
                v-if="role==='client' && clientRole!==''"
              >Please enter your primary business email address to use for your account.</h5>
              <div v-if="role==='estimator'">
                <h5>Please enter your primary business email address to use your account.</h5>
                <h5>Your job offers will be sent to this email. We will never use your email to spam or sell your data.</h5>
              </div>
              <div
                id="signupComponent"
                v-if="role==='client' && clientRole !== '' || role==='estimator'"
              >
                <form @submit="signUpForm($event)">
                  <div class="inline-form">
                    <div class="input-field">
                      <input type="text" placeholder="Email Address" v-model="email" />
                      <img class="icon" src="~@/assets/img/icons/envelope-open-solid.svg" />
                    </div>

                    <b-btn variant="success" type="submit" class="arrow">
                      Send Verification Link
                      <img
                        class="icon"
                        src="~@/assets/img/icons/arrow-right-solid.svg"
                      />
                    </b-btn>
                  </div>
                  <p v-if="error" class="error">Bad login information</p>
                  <p v-if="duplicateEmail" class="fail">This email address is already in use</p>
                  <p v-if="success" class="success">Success! Please check your email for next steps.</p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="contact-section">
        <div class="container">
          <h2>Contact</h2>
          <div class="split">
            <p>We are always happy to make valuable new contacts and are looking forward to recieving your mail or phone call.</p>

            <div class="contact-info">
              <div class="row">
                <img src="~@/assets/img/icons/icon-map.svg" />
                <div class="info address">
                  <span>
                    3423 Piedmont Road NE
                    <br />Atlanta, GA 30305
                  </span>
                </div>
              </div>
              <div class="row">
                <img src="~@/assets/img/icons/icon-phone.svg" />
                <div class="info phone">
                  <span>
                    <a href="tel:678.278.9666" class="blend">678.278.9666</a>
                  </span>
                  <br />
                  <span>
                    <a href="tel:1.800.385.5120" class="blend">1.800.385.5120</a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <SiteFooter />
  </div>
</template>

<script>
import Header from "../components/layouts/Header.vue";
import Navigation from "../components/Navigation.vue";
import SiteFooter from "../components/SiteFooter.vue";
import AccountProxy from "@/proxies/AccountProxy.js";
import EstimatorProxy from "@/proxies/EstimatorProxy.js";
import PricingTable from "../components/PricingTable.vue";
export default {
  name: "SignUp",
  components: {
    PricingTable,
    Header,
    Navigation,
    SiteFooter
  },
  data() {
    return {
      loginError: false,
      email: "",
      error: false,
      errors: [],
      selected: false,
      success: false,
      role: "",
      email_error: false,
      duplicateEmail: false,
      showtable: false,
      clientRole: "" //Varaible for sending the role from the construction check.io
    };
  },
  methods: {
    showEmailInput(role) {
      this.role = "client";
      this.selected = true;
      this.clientRole = role;
    },
    showTable() {
      this.showtable = true;
      this.selected = false;
    },
    signUpForm(e) {
      if (this.validEmail(this.email)) {
        this.email_error = false;
        e.preventDefault();
        if (this.validEmail(this.email)) {
          var params = new URLSearchParams();
          params.append("emailAddress", this.email);
          if (this.role == "client") {
            let roleId;
            if (this.clientRole === "project") roleId = 6;
            if (this.clientRole === "portfolio") roleId = 5;
            if (this.clientRole === "enterprise") roleId = 4;
            params.append("roleId", roleId);
            new AccountProxy()
              .verifyEmailAddress(params)
              .then(response => {
                if (response.status == "200") {
                  if (response.data == "SENT") {
                    this.success = true;
                    localStorage.setItem("emailAddress", this.email);
                    this.$router.push("/signupconf");
                  } else {
                    // email exists
                    this.duplicateEmail = true;
                  }
                }
              })
              .catch(e => {
                this.errors.push(e);
              });
          } else if (this.role == "estimator") {
            new EstimatorProxy()
              .sendEstimatorRegistrationEmail({ emailAddress: this.email })
              .then(response => {
                if (response.data == "SENT") {
                  localStorage.setItem("emailAddress", this.email);
                  this.$router.push("/signupconf");
                } else {
                  // email exists
                  this.duplicateEmail = true;
                }
              })
              .catch(e => {});
          }
        }
      } else this.email_error = true;
    },
    makeSelection() {
      this.selected = true;
    },
    showSignup(param) {
      this.role = param;
      this.showtable = false;
      this.selected = true;
    },
    validEmail: function(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  },
  created() {
    localStorage.removeItem("id_token");
    if (this.$route.query.project === "true") {
      this.clientRole = "project";
      this.showTable();
      setTimeout(() => {
        this.showEmailInput("project");
      }, 500);
    }
    if (this.$route.query.enterprise === "true") {
      this.clientRole = "enterprise";
      this.showTable();
      setTimeout(() => {
        this.showEmailInput("enterprise");
      }, 500);
    }
    if (this.$route.query.portfolio === "true") {
      this.clientRole = "portfolio";
      this.showTable();
      setTimeout(() => {
        this.showEmailInput("portfolio");
      }, 500);
    }
  }
};
</script>

<style scoped>
.button-custom-group {
  display: flex !important;
  justify-content: center;
}

.sign-up-button {
  background-color: #0c2340;
  color: #ffffff;
  width: 450px;
  padding-top: 10px;
  padding-bottom: 10px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);
  margin-left: 30px;
  margin-right: 30px;
}

.sign-up-options {
  display: flex;
  justify-content: space-between;
  width: 60vw;
}

.sign-up-title {
  text-align: center;
  margin-bottom: 100px;
  font-size: 18px;
  font-weight: 800;
}

.center-message {
  width: 60vw;
  margin: auto;
  margin-top: 10%;
  left: 0;
  right: 0;
}

.sign-up-text {
  text-decoration: none;
  color: #ffffff;
}
.submit-button {
  height: auto !important;
}

@media only screen and (max-width: 1000px) {
  body {
    background-color: lightblue;
  }
  .button-custom-group {
    display: block;
    justify-content: center;
    font-size: 10px !important;
  }
  .sign-up-button {
    background-color: #0c2340;
    color: #ffffff;
    width: 100%;
    height: 50px;
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);
    margin-top: 5vh;
    margin-bottom: 0vh;
    margin-left: 0px;
  }
  .center-message {
    margin-top: 30vw !important;
    width: 80vw;
  }
}
</style>
