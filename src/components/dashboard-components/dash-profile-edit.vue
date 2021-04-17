<template>
  <div class="po-modal-bg profile-edit" v-if="modalOpen">
    <b-card class="po-modal">
      <b-row>
        <b-col class="text-right bold-font">
          Close
          <img style="cursor: pointer" @click="closeProfileModal" role="button" alt="image" src="~@/assets/img/small-icons/small-modal-remove.png"/>
        </b-col>
      </b-row>
      <b-row>
        <!-- Photo Section -->
        <b-col lg="2" class="border-right border-right">
          <div class="title-font ml-5 mt-3">Edit your profile</div>
          <div class="bold-font ml-5 mt-4">Profile photo</div>
          <div class="text-center">
            <!-- Need to implement Avatar with backend -->
            <div class="mb-4 mt-4">
              <img v-if="userAvatar == undefined" alt="Avatar" src="~@/assets/img/small-icons/profile-icon.png"/>
              <img v-else :src="userAvatar" />
            </div>
            <b-button variant="outline-dark" id="pick-avatar">Upload an image</b-button>
            <avatar-cropper trigger="#pick-avatar" :labels="labelobj" @changed="changeAvatar" @uploading="uploadingAvatar" upload-url="/files/upload"/>
            <b-button v-if="role === 6" class="mt-2" variant="outline-dark" id="pick-avatar">Product Manager</b-button>
          </div>
        </b-col>
          <!-- Field Section -->
        <b-col lg="10">
            <!-- Full Name Row Section -->
            <b-row class="ml-2 container">
              <b-col lg="5">
                <div class="font-weight-600 mt-3">Full name</div>
                <div>
                  <input class="w-100 input-style mt-2" type="text" placeholder="First name, Last name"/>
                </div>
              </b-col>
              <b-col lg="6" offset-lg="1">
                <div class="font-weight-600 mt-3">Job Title</div>
                <div>
                  <input class="w-100 input-style mt-2" type="text" placeholder="xxx-xxx-xxxx"/>
                </div>
              </b-col>
            </b-row>
            <!-- Email and Phone number Section -->
            <b-row class="ml-2 mt-2 border-bottom pb-4 container">
              <b-col lg="5">
                <div class="font-weight-600 mt-3">Email</div>
                <div>
                  <input class="w-100 input-style mt-2" type="text" placeholder="abc@gmail.com"/>
                </div>
              </b-col>
              <b-col lg="6" offset-lg="1">
                <div class="font-weight-600 mt-3">Phone number</div>
                <div>
                  <input class="w-100 input-style mt-2" type="text" placeholder="xxx-xxx-xxxx"/>
                </div>
              </b-col>
            </b-row>
            <!--Position applied for field, Availability -->

            <!--If the user is client manager-->
            <b-row v-if="role === 6" class="ml-2 mt-2 border-bottom pb-4 container">
              <b-col lg="5">
                <div class="font-weight-600 mt-3">Company</div>
                <div class="mt-2">
                  <div style="background-color: #C9C9C9" class="p-2 rounded">Google Healthcare</div>
                </div>
              </b-col>
              <b-col lg="3" offset-lg="1">
                <div class="font-weight-600 mt-3">Type of Account</div>
                <div class="mt-2">
                  <div style="background-color: #C9C9C9" class="p-2 rounded">Government</div>
                </div>
              </b-col>
            </b-row>

            <b-row v-if="role === 6" class="ml-2 mt-2 border-bottom pb-4 container">
              <b-col lg="5">
                <div class="font-weight-600 mt-3">Business Address</div>
                <div class="font-weight-600 mt-3">Address Line1</div>
                <div class="mt-2">
                  <div style="background-color: #C9C9C9" class="p-2 rounded">Google Healthcare</div>
                </div>
                <div class="font-weight-600 mt-3">Address Line2</div>
                <div class="mt-2">
                  <div style="background-color: #C9C9C9" class="p-2 rounded">Google Healthcare</div>
                </div>
                <b-row class="mt-3">
                  <b-col>
                    <div class="font-weight-bold">City</div>
                    <div style="background-color: #C9C9C9; width: 80%" class="p-2 rounded">New York</div>
                  </b-col>
                  <b-col>
                    <div class="font-weight-bold">State</div>
                    <div style="background-color: #C9C9C9; width: 75%" class="p-2 rounded">New York</div>
                  </b-col>
                  <b-col>
                    <div class="font-weight-bold">Zip Code</div>
                    <div style="background-color: #C9C9C9; width: 75%" class="p-2 rounded">10001</div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col lg="5" offset-lg="1">
                <div class="font-weight-600 mt-3">Billing Contract</div>
                <div class="font-weight-600 mt-3">Name</div>
                <div class="mt-2">
                  <div style="background-color: #C9C9C9" class="p-2 rounded">Lee Thomas</div>
                </div>
                <div class="font-weight-600 mt-3">Phone number</div>
                <div class="mt-2">
                  <div style="background-color: #C9C9C9" class="p-2 rounded">{{'0000000000' | formatPhone}}</div>
                </div>
              </b-col>

            </b-row>

            <!--if the user is project manager or estimator-->
            <div v-else>
              <b-row class="ml-2 container">
                <b-col lg="3">
                  <div class="font-weight-600 mt-3">Position applied for</div>
                  <b-form-select class="mt-2">
                    <option v-for="job_title in job_title" v-bind:key="job_title.value" v-bind:value="job_title.text">{{ job_title.text }}</option>
                  </b-form-select>
                </b-col>
                <b-col lg="5" offset-lg="1">
                  <div class="font-weight-600 mt-3">
                    Compensation Per Hour <span class="form-asterisk">*</span>
                  </div>
                  <b-col class="form-section" cols="11" lg="11" style="display: flex; align-items: center">
                    <span class="char-sub-title" style="margin-right:5px">from</span>
                    <input
                      style="width: 30%;padding-left:10px"
                      :value="'$' + send_compensationLow"
                      class="reg-text-box"
                      hide-details
                      single-line
                      type="text"
                      @change="$set(send_compensationLow, $event)"
                      v-on:keypress="isNumber(event)"
                    />
                    <span class="char-sub-title" style="margin-right:10px">to</span>
                    <input
                      style="width: 30%;padding-left:10px"
                      :value="'$' + send_compensationHigh"
                      class="reg-text-box"
                      hide-details
                      single-line
                      type="text"
                      @change="$set(send_compensationHigh, $event)"
                      v-on:keypress="isNumber(event)"
                    />
                  </b-col>
                  <b-col cols="11" lg="11" style="display: flex; align-items: center">
                    <p class="text-bold" style="margin-top: 14px; margin-right: 10px">$0</p>
                    <div class="wrap" role="group" aria-labelledby="multi-lbl" style="--a: 50; --b: 150; --min: 0; --max: 200">
                      <label class="sr-only" for="a">Value A:</label>
                      <input id="a" type="range" min="0" value="this.send_compensationLow" max="200" v-model="send_compensationLow"/>
                      <output for="a" style="--c: var(this.send_compensationLow)"></output>
                      <label class="sr-only" for="b">Value B:</label>
                      <input id="b" type="range" min="0" value="this.send_compensationHigh" max="200" v-model="send_compensationHigh"/>
                      <output for="b" style="--c: var(this.send_compensationHigh) "></output>
                    </div>
                    <p class="text-bold" style="margin-top: 14px; margin-left: 10px">$200</p>
                  </b-col>
                </b-col>
                <!-- Availability Field -->
                <b-col lg="2">
                  <div class="font-weight-600 mt-3">Availability</div>
                  <b-form-select class="mt-2">
                    <option v-for="availability in availability_opts" v-bind:key="availability.value" v-bind:value="availability.text">{{availability.text}}</option>
                  </b-form-select>
                </b-col>
              </b-row>
              <!-- Area of Expertise Field -->
              <b-row class="ml-2 mt-3 container">
                <b-col lg="6">
                  <div class="font-weight-600 mt-3">
                    Area of Expertise
                  </div>
                  <b-form-select class="mt-2 w-75">
                    <option v-for="expertise in expertises" v-bind:key="expertise.value" v-bind:value="expertise.text">
                      {{ expertise.field }}
                    </option>
                  </b-form-select>
                </b-col>
              </b-row>
              <!-- Skills Field -->
              <b-row class="ml-2 mt-3 container">
                <b-col lg="5">
                  <div class="font-weight-600 mt-3">Skills</div>
                  <b-row v-for="row in chunkArray(skills, 3)" v-bind:key="row.index">
                    <b-col v-for="skill in row" v-bind:key="skill.value" v-bind:value="skill.value">
                      <div class="mt-2 d-flex align-items-center">
                        <input type="checkbox" class="mr-2" />
                        <div>{{ skill.value }}</div>
                      </div>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
              <!-- Project Experience -->
              <b-row class="ml-4 mt-4 mb-2 d-flex justify-content-center custom-margin-left no-gutters">
                <Categories :submitted="submitted" @exp="receiveExperiences" @otherExperience="receiveOtherExperiences"/>
              </b-row>
              <!-- Education Section -->
              <b-row class="ml-4 mt-3 container no-gutters">
                <ProfileEducation @closeProfileModal="closeProfileModal" @certs="setCerts" @edus="setEdus"/>
              </b-row>
              
              <!-- Certification & Credentials -->
            </div>
        </b-col>
      </b-row>

      <div class="no-gutters d-flex justify-content-end flex-end mb-4 mt-3 pb-4">
        <b-button type="submit" @click="closeProfileModal" class="submit-button mr-2">Cancel</b-button>
        <b-button type="submit" @click="closeProfileModal" class="submit-button">Save Updates</b-button>
      </div>
    </b-card>
  </div>
</template> 

<script>
import AvatarCropper from 'vue-avatar-cropper';
import ProfileEducation from './education.vue';
import Categories from '../registration-components/contractor-registration/Categories';

import EventBus from '../../plugins/event-bus';

export default {
    name: 'ProfileEditView',
    components: {
        ProfileEducation,
        AvatarCropper,
        Categories,
    },
    data() {
        return {
            //Label for a data of photo file dialogue
            labelobj: {
                submit: 'Submit',
                cancel: 'Cancel',
            },
            //Variable using for validation
            submitted: false,
            userAvatar: undefined,
            modalOpen: true,
            projectExp: [],
            job_title: [
                { ID: 1, text: 'Certified Cost Engineer' },
                { ID: 2, text: 'Certified Cost Estimator' },
                { ID: 3, text: 'Certified Cost Surveyor' },
            ],
            availability_opts: [
                { ID: 1, text: 'Full time' },
                { ID: 2, text: 'Part time' },
                { ID: 3, text: 'Contractor' },
            ],
            expertises: [
                { ID: 1, field: 'General/Architectural' },
                { ID: 2, field: 'Structural' },
                { ID: 3, field: 'Mechanical' },
                { ID: 4, field: 'Electrical' },
                { ID: 5, field: 'State/Civil' },
            ],
            skills: [
                { ID: 1, value: 'Skill1' },
                { ID: 2, value: 'Skill2' },
                { ID: 3, value: 'Skill3' },
                { ID: 4, value: 'Skill4' },
                { ID: 5, value: 'Skill5' },
                { ID: 6, value: 'Skill6' },
                { ID: 7, value: 'Skill7' },
                { ID: 8, value: 'Skill8' },
                { ID: 9, value: 'Skill9' },
            ],
            certifications: [],
            educations: [],

            //Project Experiences Array of data to send to the backend: example: [0,4,5,6] ProjectExperience ID;
            send_project_experiences: [],
            //Other project experience Array of data to send to the backend: example: [1,3,5]
            send_other_project_experiences: [],
            //
            send_compensationHigh: 150,
            send_compensationLow: 50,


            role: '',
        };
    },
    methods: {
        closeModal() {
            // this.modalOpen = false;
            this.$emit('closeProfileModal');
        },
        closeProfileModal() {
            this.$emit('closeProfileModal');
        },
        chunkArray(array, size) {
            let result = [];
            let arrayCopy = [...array];
            while (arrayCopy.length > 0) {
                result.push(arrayCopy.splice(0, size));
            }
            return result;
        },
        search(input) {
            if (input.length < 1) {
                return [];
            }
            return this.not_listed_exps.filter(exp => {
                return exp.toLowerCase().startsWith(input.toLowerCase());
            });
        },
        changeAvatar(file) {},
        uploadingAvatar(form, xhr) {},
        addMultiCategory() {},
        setCerts(allCerts) {
            this.certifications = allCerts;
        },
        setEdus(allEdus) {
            this.educations = allEdus;
        },
        /*Method that recive the your selections from the prject experience filed -> recieve the child component of <Categories/>
        Receive only ID of experiences like [6,11,4] */
        receiveExperiences(experiences) {
            this.send_project_experiences = experiences;
        },
        /* Method that receive the your selections from the other project experience field -> receive the child component of <Categories/>
        Receive only Id of other experiences like [0,2,3] */
        receiveOtherExperiences(otherExperiences) {
            this.send_other_project_experiences = otherExperiences;
        },
    },
    mounted() {
        EventBus.$on('edit_user_profile', (payLoad) => {
            this.role = payLoad.user_role;
        })
    },
    created() {
    },
    filters: {
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
};

addEventListener(
    'input',
    e => {
        let _t = e.target;
        _t.parentNode.style.setProperty(`--${_t.id}`, +_t.value);
    },
    false
);
</script>

<style scoped>
.custom-select {
    background: #fff
        url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5'%3E%3Cpath fill='%23343a40' d='M2  -1h4zm0 5L0 1h4z'/%3E%3C/svg%3E")
        no-repeat right 0.75rem center/8px 10px;
}

.po-btn-col {
    padding: 0px !important;
}

.po-modal-bg {
    position: absolute;
    top: 0px;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    font-size: 14px;
    font-weight: normal;
    line-height: 17px;
}

.po-modal {
    position: relative;
    top: 1.5%;
    width: 95%;
    margin: auto;
    height: 96vh;
    overflow: auto;
    z-index: 2;
}

.title-font {
    font-size: 16px;
    font-weight: 600;
}

.bold-font {
    font-weight: 600;
}

.input-style {
    padding: 1px;
    border: 1px solid #c9c9c9;
    border-radius: 4px;
    padding: 8px 10px;
}

.font-weight-600 {
    font-weight: 600;
}

.grey-background {
    background: #f3f3f3;
}

.profile-edit {
    font-size: 0.8em;
}

.submit-button {
    width: 150px;
    text-decoration: none;
    outline: none;
    background-color: #0c2340;
}

@media only screen and (max-width: 1400px) {
    .custom-margin-left {
        margin-left: 35px;
    }
}
</style>
