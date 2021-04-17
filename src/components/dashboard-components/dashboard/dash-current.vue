<template>
    <div class="dash-welcome">
        <!-- <div class="row title-text small-phone">
            Welcome to Contstruction Check New User!
        </div>
        <div class="row underline"></div>
        <div class="row title-text margintop-35">
            You don't have any upcoming projects. Let's make sure your profile
            is optimized, up to date, and set up correctly. Please review and
            complete the steps below.
        </div>
        <div class="row">
            <b-col cols="12" lg="" class="card-section">
              <div class="title-text margintop-25">Step1</div>
              <div class="custom-card">
                <div class="card-content">
                  <div style="display: flex; justify-content: space-between">
                    <div class="title-text margintop-10">Profile</div>
                    <b-button class="btn-color" @click="prof_reviewed">
                      <router-link class="review_prof_link" to="/dashboard/myprofile">Review Profile</router-link>
                      <img class="img-size" style="margin-left: 5px" width="20px" alt="Vue logo" src="~@/assets/img/pencil-icon.png"/>
                    </b-button>
                  </div>
                  <div class="profile-underline"></div>
                  <div style="display: flex">
                    <div class="retangle">
                      <img style="margin-left: 5px" alt="Vue logo" src="~@/assets/img/small-icons/default-avatar.png"/>
                    </div>
                    <div class="title-text" style="margin-top: 9%; margin-left: 5%">
                      <div>First name Last name</div>
                      <div style="margin-top: 5%"> Certification: Certified Cost Estimator </div>
                      <div v-if="profile_reviewed" style="float: right; margin-top: 7%">
                        <img style="margin-top: 8%;" width="20px" alt="Vue logo" src="~@/assets/img/small-icons/check-icon.png"/>
                      </div>
                      //<div v-else style="float: right; margin-top: 7%"><img style="margin-top: 8%;" width="20px" alt="Vue logo" src="~@/assets/img/small-icons/bell-icon.png"/></div>
                    </div>
                  </div>
                </div>
                <div></div>
              </div>
            </b-col>
            <b-col cols="12" lg="" class="card-section">
              <div class="title-text margintop-25">Step2</div>
              <div class="custom-card">
                <div class="card-content">
                  <div style="display: flex; justify-content: space-between">
                    <div class="title-text margintop-10">Profile</div>
                    <b-button class="btn-color" @click="billing_reviewed">
                      <span>Setup Billing</span>
                      <img style="margin-left: 5px" width="20px" alt="Vue logo" src="~@/assets/img/pencil-icon.png"/>
                    </b-button>
                  </div>
                  <div class="profile-underline"></div>
                  <div>
                    <div class="title-text" style="padding: 9% 10% 2% 0%">Company Name:</div>
                    <div class="title-text" style="padding: 2% 10% 9% 0%">Payment address:</div>
                  </div>
                </div>
                <div>
                  <div v-if="billing_setup" style="float: right; margin-top: 7%">
                    <img style="margin-top: 8%;" width="20px" alt="Vue logo" src="~@/assets/img/small-icons/check-icon.png"/>
                  </div>
                  //<div v-else style="float: right; margin-top: 7%"><img style="margin-top: 8%;" width="20px" alt="Vue logo" src="~@/assets/img/small-icons/bell-icon.png"/></div>
                </div>
              </div>
            </b-col>
            <b-col cols="12" lg="" class="card-section">
              <div class="title-text margintop-25">Step3</div>
              <div class="custom-card">
                <div class="card-content">
                  <div style="display: flex; justify-content: space-between">
                    <div class="title-text margintop-10">Profile</div>
                    <b-button class="btn-color" @click="preferences_reviewed">
                      <span>Edit Settings</span>
                      <img style="margin-left: 5px" width="20px" alt="Vue logo" src="~@/assets/img/pencil-icon.png"/>\
                    </b-button>
                  </div>
                  <div class="profile-underline"></div>
                  <div>
                    <div class="title-text" style="padding: 9% 10% 2% 1%">
                      <span style="margin-right:5px">
                        <img style="margin-left: 5px" alt="Vue logo" src="~@/assets/img/small-icons/bell-icon.png"/>
                      </span>
                      <span style="margin-left: 10px">Notifications</span>
                    </div>
                    <div class="title-text" style="padding: 2% 0% 8% 0.5%; vertical-algin: middle">
                      <img style="margin-left: 5px; width: 23px" alt="Vue logo" src="~@/assets/img/small-icons/setting-icon.png"/>
                      <span style="margin-left: 10px">Preferences</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div v-if="preferences_set" style="float: right; margin-top: 7%">
                    <img style="margin-top: 8%;" width="20px" alt="Vue logo" src="~@/assets/img/small-icons/check-icon.png"/>
                  </div>
                  //<div v-else style="float: right; margin-top: 7%"><img style="margin-top: 8%;" width="20px" alt="Vue logo" src="~@/assets/img/small-icons/bell-icon.png"/></div>
                </div>
              </div>
            </b-col>
        </div> -->
        <div class="d-flex justify-content-between">
          <div>Construction Check Dasboard</div>
          <div>Today's Date: {{ new Date() | moment }}</div>
        </div>
        <div class="row underline"></div>
        <b-row class="mt-4">
          <b-col lg="4" cols="11" class="mb-2">
            <!-- <ProCurrentFee /> -->
            <ProCurrentFindEstimator :role="role"/>
          </b-col>
          <b-col lg="4" cols="11" class="mb-2">
            <proCurrentEstimatorComment />
          </b-col>
          <b-col lg="4" cols="11" class="mb-2">
            <CurrentComment :role="role"/>
          </b-col>
        </b-row>
      </div>
</template>

<script>
import ProCurrentFee from './proCurrentFee';
import CurrentComment from './CurrentComment';
import proCurrentEstimatorComment from './proCurrentEstimatorComment';
import ProCurrentFindEstimator from './proCurrentFindEstimator';
import moment from 'moment'
export default {
    name: 'DashCurrent',
    props: ["role"],
    components: {
      ProCurrentFee,
      CurrentComment,
      ProCurrentFindEstimator,
      proCurrentEstimatorComment,
    },
    data() {
        return {
            profile_reviewed: false,
            billing_setup: false,
            preferences_set: false,
        };
    },
    methods: {
      prof_reviewed() {
          this.profile_reviewed = true;
      },
      billing_reviewed() {
          this.billing_setup = true;
      },
      preferences_reviewed() {
          this.preferences_set = true;
      },
    },
    filters: {
      moment: function (date) {
        return moment(date).format('LL, h:mm A');
      }
    }, 
};
</script>

<style scoped>
.dash-welcome {
    font-family: Montserrat;
    background-color: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    padding: 30px 40px 20px 40px;
    margin: 30px;
}
.title-text {
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
}
.underline {
    border-bottom: 1px solid black;
}
.margintop-35 {
    margin-top: 35px;
    margin-right: 10px;
}
.margintop-25 {
    margin-top: 25px;
}
.custom-card {
    margin-top: 15px;
    padding: 11px 11px 12px 32px;
    background-color: #f4f5f8;
    height: 80% !important;
}
.btn-color {
    background-color: #0c2340;
    font-size: 12px;
    border-radius: 3px;
}

.card-section {
    width: 30%;
}
.margintop-10 {
    margin-top: 15px;
}
.profile-underline {
    margin-top: 8px;
    margin-right: 13px;
    border-bottom: 1px solid black;
}
.review_prof_link {
    text-decoration: none;
    color: white;
}
.retangle {
    margin-top: 20px;
    padding-top: 8.3px;
    padding-bottom: 8.3px;
    padding-left: 17.99px;
    padding-right: 17.99px;
    background-color: #e9f2ff;
    margin-bottom: 15px;
    height: 100%;
    margin: auto;
}
@media only screen and (max-width: 600px) {
    .card-section {
        width: 100%;
    }
    .dash-welcome {
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
        padding: 10px 10px 20px 40px;
        margin: 0px;
        margin-top: 10px;
    }
    .small-phone {
        margin-right: 5px;
    }
}
@media only screen and (max-width: 1400px) {
    .retangle {
        padding-left: 5px;
        padding-right: 5px;
    }
    .btn-color {
        background-color: #0c2340;
        font-size: 10px;
        border-radius: 3px;
    }
    .img-size {
        width: 14px;
    }
}
</style>
