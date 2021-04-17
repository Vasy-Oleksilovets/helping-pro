<template>
<div class="ccheck">
<main class="bg content">   
  <div class="contractor-reg form-section container">
    <b-row class="no-gutters" justify="center">
      <b-col class="client-title" cols="12">
        <h2 class="title">
          Certified Cost Professional Registration
        </h2>
      </b-col>
    </b-row>
    <b-row class="no-gutters steps" cols="12">
      <div role="button" @click="gotoStep(1)" class="step" :class="[step==1 ? 'active':'']">
        <div class="num"><span>1</span></div>
        <span>Your<br/>Information</span>
      </div>

      <div v-if="tempStep < 2" role="button" class="step" :class="[step==2 ? 'active':'']">
        <div class="num"><span>2</span></div>
        <span>Payment<br/>Address</span>
      </div>
      <div v-else role="button" @click="gotoStep(2)" class="step" :class="[step==2 ? 'active':'']">
        <div class="num"><span>2</span></div>
        <span>Payment<br/>Address</span>
      </div>
      
      <div role="button" v-if="tempStep < 3" class="step" :class="[step==3 ? 'active':'']">
        <div class="num"><span>3</span></div>
        <span>Position<br/>Details</span>
      </div>
      <div role="button" v-else @click="gotoStep(3)" class="step" :class="[step==3 ? 'active':'']">
        <div class="num"><span>3</span></div>
        <span>Position<br/>Details</span>
      </div>

      <div role="button" v-if="tempStep < 4" class="step" :class="[step==4 ? 'active':'']">
        <div class="num"><span>4</span></div>
        <span>Education &amp;<br/>Experience</span>
      </div>
      <div role="button" v-else @click="gotoStep(4)" class="step" :class="[step==4 ? 'active':'']">
        <div class="num"><span>4</span></div>
        <span>Education &amp;<br/>Experience</span>
      </div>

      <div role="button" v-if="tempStep < 5" class="step" :class="[step==5 ? 'active':'']">
        <div class="num"><span>5</span></div>
        <span>Certifications<br/>&amp; Credentials</span>
      </div>
      <div role="button" v-else @click="gotoStep(5)" class="step" :class="[step==5 ? 'active':'']">
        <div class="num"><span>5</span></div>
        <span>Certifications<br/>&amp; Credentials</span>
      </div>

      <div role="button" class="step" :class="[step==6 ? 'active':'']">
        <div class="num"><span>6</span></div>
        <span>Project<br/>Experience</span>
      </div>
    </b-row>

    <form @submit="addCertifiedCostProffesional" class="register-form">
      <b-container class="form-section" v-if="step==1">
        <b-row class="no-gutters">
          <p class="char-sub-title">Your information</p>
        </b-row>
        <b-row class="no-gutters">
          <b-col cols="11" lg="3" class="form-section">
            <div class="field-box">
              <span class="field-title">First Name<span class="form-asterisk">*</span></span>
              <input class="form-field" v-model="certifiedProfessional.firstName" placeholder=""/>
            </div>
            <div v-if="submitted1 && nameValidation(certifiedProfessional.firstName)" style="align-items: center">
              <img style="width: 15px; margin-bottom:1px;margin-right:4px;" alt="Vue logo" src="~@/assets/img/warning-icon.png"/>
              <span style="color:red">First Name invalid</span>
            </div>
          </b-col>

          <b-col cols="11" lg="3" class="form-section">
            <div class="field-box">
              <span class="field-title">Last Name<span class="form-asterisk">*</span></span>
              <input class="form-field" v-model="certifiedProfessional.lastName" placeholder=""/>
            </div>
            <div v-if="submitted1 && nameValidation(certifiedProfessional.lastName)" style="align-items: center">
              <img style="width: 15px; margin-bottom:1px;margin-right:4px;" alt="Vue logo" src="~@/assets/img/warning-icon.png"/>
              <span style="color:red">Last Name invalid</span>
            </div>
          </b-col>
          <b-col cols="11" lg="3" class="form-section">
            <div class="field-box">
              <span class="field-title">Email<span class="form-asterisk">*</span></span>
              <input class="form-field" type="text" v-model="certifiedProfessional.emailAddress" disabled />
                <!-- <input class="form-field" type="text" @change="validEmail()" v-model="certifiedProfessional.email" placeholder="Populated Email Read Only"> -->
            </div>
            <!--
            <div v-if=" submitted && !certifiedProfessional.email" style="align-items: center"><img style="width: 15px; margin-bottom:1px;margin-right:4px;" alt="Vue logo" src="~@/assets/img/warning-icon.png"> <span style="color:red">Enter email</span></div>
            <div v-if=" submitted && !isEmailValid" style="align-items: center"><img style="width: 15px; margin-bottom:1px;margin-right:4px;" alt="Vue logo" src="~@/assets/img/warning-icon.png"> <span style="color:red">Email is not valid</span></div> -->
          </b-col>
        </b-row>
        
        <b-row class="no-gutters">
          <b-col cols="12" lg="12" class="form-section">
            <b-row class="no-gutters">
              <b-col cols="11" lg="3" class="form-section">
                <div class="field-box">
                  <span class="field-title">Password <span class="form-asterisk">*</span></span>
                  <button class="pass-switch" style="display:none"></button>
                  <input v-if="!show_password" id="password" class="form-field password password-field" @change="checkPswrd" type="password" v-model="certifiedProfessional.password" placeholder=""/>
                  <input v-else id="password" class="form-field password password-field" @change="checkPswrd" type="text" v-model="certifiedProfessional.password" placeholder=""/>
                  <span v-if="show_password"><img alt="Vue logo" class="eye-icon" src="~@/assets/img/eye.png" @click="toggle_password"/></span>
                  <span v-else><img alt="Vue logo" class="eye-icon" src="~@/assets/img/eye-forbidden.png" @click="toggle_password"/></span>
                </div>
                <div v-if="submitted1 && this.certifiedProfessional.password == ''">
                  <img style="width: 15px; margin-bottom:4px;margin-right:4px;" alt="Vue logo" src="~@/assets/img/warning-icon.png"/>
                  <span style="color:red">Please enter password</span>
                </div>
                <div v-if="submitted1 && !this.validStrongPassword() && !this.certifiedProfessional.password == ''">
                  <img style="width: 15px; margin-bottom:4px;margin-right:4px;" alt="Vue logo" src="~@/assets/img/warning-icon.png"/>
                  <span style="color:red">Please enter strong password</span>
                </div>

                <div>
                  <div :class="certifiedProfessional.password?'mt-3 mt-3 valid-error-message':'mt-3 error-message'"> * Password is case sensitive. </div>
                  <div :class="certifiedProfessional.password.length > 8 && certifiedProfessional.password.length < 16?'valid-error-message':'error-message'"> * Must be at least 8 characters long and less than 16 characters. </div>
                  <!-- <div class="error-message"> * Must have character types below: </div> -->
                  <div :class="/^(?=.*[A-Z])/.test(certifiedProfessional.password)?'valid-error-message':'error-message'"> * Uppercase (A-Z) </div>
                  <div :class="/^(?=.*[a-z])/.test(certifiedProfessional.password)?'valid-error-message':'error-message'"> * Lowercase (a-z) </div>
                  <div :class="/^(?=.*[0-9])/.test(certifiedProfessional.password)?'valid-error-message':'error-message'"> * Number (0-9) </div>
                  <div :class="/^(?=.*[-+_!@#$%^&*.,?])/.test(certifiedProfessional.password)?'valid-error-message':'error-message'"> * Symbol (!, #, $, etc.) </div>
                </div>
              </b-col>
              <b-col cols="11" lg="3" class="form-section">
                <div class="field-box">
                  <span class="field-title">Confirm Password<span class="form-asterisk">*</span></span>
                  <input v-if="!show_confirm_password" class="form-field password" type="password" @change="checkPswrd" v-model="certifiedProfessional.confirmPswrd" placeholder=""/>
                  <input v-else class="form-field password" type="text" @change="checkPswrd" v-model="certifiedProfessional.confirmPswrd" placeholder=""/>
                  <span v-if="show_confirm_password"><img alt="Vue logo" class="eye-icon" src="~@/assets/img/eye.png" @click="toggle_confirm_password"/></span>
                  <span v-else><img alt="Vue logo" class="eye-icon" src="~@/assets/img/eye-forbidden.png" @click="toggle_confirm_password"/></span>
                </div>
                <div v-if="submitted1 && this.certifiedProfessional.confirmPswrd == ''">
                  <img style="width: 15px; margin-bottom:4px;margin-right:4px;" alt="Vue logo" src="~@/assets/img/warning-icon.png" />
                  <span style="color:red" >Please confirm password</span>
                </div>
              </b-col>
              <b-col cols="11" lg="3" class="form-section">
                <div class="field-box">
                  <span class="field-title">Phone Number<span class="form-asterisk">*</span></span>
                  <input class="form-field" v-model="certifiedProfessional.phoneNumber" @input="acceptNumber()" placeholder=""/>
                </div>
                <div v-if="submitted1 && !certifiedProfessional.phoneNumber" style="align-items: center">
                  <img style="width: 15px; margin-bottom:1px;margin-right:4px;" alt="Vue logo" src="~@/assets/img/warning-icon.png"/>
                  <span style="color:red">Enter phone number</span>
                </div>
                <div v-if="submitted1 && !this.phoneValidation()" style="align-items: center">
                  <img style="width: 15px; margin-bottom:1px;margin-right:4px;" alt="Vue logo" src="~@/assets/img/warning-icon.png"/>
                  <span style="color:red">Phone number is not valid.</span>
                </div>
              </b-col>
            </b-row>
            <div v-if="!pswrdConfirmed && pswrdChecked && submitted1">
              <img style="width: 15px; margin-bottom:4px;margin-right:4px;" alt="Vue logo" src="~@/assets/img/warning-icon.png" />
              <span style="color:red">The password you entered does not match</span>
            </div>
          </b-col>
        </b-row>

        <b-row class="no-gutters step-section">
          <b-col cols="12" lg="3" class="form-section step-btn">
            <b-btn variant="" v-on:click="nextStep2()" class="arrow step-btn">Go To Step 2  <img class="icon" src="~@/assets/img/icons/arrow-right-solid.svg" /></b-btn>
            <p>
              <span class="form-asterisk">*</span>
              <span class="char-general">field are required</span>
            </p>
          </b-col>
        </b-row>
      </b-container>
      
      <b-container class="form-section" v-if="step==2">
        <b-row class="no-gutters">
          <p class="char-sub-title">Payment Address information</p>
        </b-row>
        <b-row class="no-gutters">
          <b-col cols="11" lg="3" class="form-section">
            <div class="field-box">
              <span class="field-title">Address Line One<span class="form-asterisk">*</span></span>
              <input class="form-field" v-model="certifiedProfessional.addressLine1" placeholder=""/>
            </div>
            <div v-if="submitted2 && !certifiedProfessional.addressLine1" style="align-items: center">
              <img style="width: 15px; margin-bottom:1px;margin-right:4px;" alt="Vue logo" src="~@/assets/img/warning-icon.png"/>
              <span style="color:red">Enter address line one</span>
            </div>
          </b-col>
          <b-col cols="11" lg="3" class="form-section">
            <div class="field-box">
              <span class="field-title">Address Line Two</span>
              <input class="form-field" v-model="certifiedProfessional.addressLine2" placeholder=""/>
            </div>
          </b-col>
          <b-col cols="11" lg="3" class="form-section">
            <div class="no-gutters field-box justify-space-between" style="border: none !important">
              <span class="field-title">State<span class="form-asterisk">*</span></span>
              <!-- <b-form-select v-model="temp_state">
                <option value="" disabled selected hidden>State <span style="color: red">*</span></option>
                <option v-for="state in states" v-bind:key="state.name" v-bind:value="state">{{ state.name }}</option>
              </b-form-select> -->
              <AutoCompleteState class="form-field" v-model="temp_state"/>
            </div>
            <div v-if="submitted2 && !certifiedProfessional.state" style="align-items: center">
              <img style="width: 15px; margin-bottom:1px;margin-right:4px;" alt="Vue logo" src="~@/assets/img/warning-icon.png"/>
              <span style="color:red">Enter state</span>
            </div>
          </b-col>
        </b-row>
        <b-row class="no-gutters form-section">
          <b-col cols="11" lg="3" class="form-section">
            <div class="field-box">
              <span class="field-title">City<span class="form-asterisk">*</span></span>
              <autocomplete v-model="temp_city" :state="temp_state" :disabled="temp_state===''"/>
            </div>
            <div v-if="submitted2 && !certifiedProfessional.city" style="align-items: center">
              <img style="width: 15px; margin-bottom:1px;margin-right:4px;" alt="Vue logo" src="~@/assets/img/warning-icon.png"/>
              <span style="color:red">Enter city</span>
            </div>
          </b-col>
          <b-col cols="11" lg="3" class="form-section">
            <div class="field-box">
              <span class="field-title">Zip Code<span class="form-asterisk">*</span></span>
              <input class="form-field" v-model="certifiedProfessional.zipCode" placeholder=""/>
            </div>
            <div v-if="submitted2 && !certifiedProfessional.zipCode" style="align-items: center">
              <img style="width: 15px; margin-bottom:1px;margin-right:4px;" alt="Vue logo" src="~@/assets/img/warning-icon.png"/>
              <span style="color:red">Enter zip code</span>
            </div>
            <div v-if="submitted2 && !zipcodeValidation()" style="align-items: center">
              <img style="width: 15px; margin-bottom:1px;margin-right:4px;" alt="Vue logo" src="~@/assets/img/warning-icon.png"/>
              <span style="color:red">Enter valid zip code</span>
            </div>
          </b-col>
          <b-col cols="11" lg="3" class="form-section step-btn">
            <b-btn variant="" v-on:click="nextStep3()" class="arrow step-btn inline" style="margin-top: 38px">Go To Step 3  <img class="icon" src="~@/assets/img/icons/arrow-right-solid.svg" /></b-btn>
            <p>
              <span class="form-asterisk">*</span>
              <span class="char-general">field are required</span>
            </p>
          </b-col>
        </b-row>
      </b-container>

      <b-container class="form-section" v-if="step==3">
        <Positions :submitted3="submitted3" @myPositions="positions" @position="receive_position" :send_position1="send_position" />
        <br />
        <b-row class="no-gutters compensation ">
          <b-col class="form-section" cols="12" lg="3">
          <p class="char-sub-title"> Compensation Per Hour <span class="form-asterisk">*</span></p>
            <div class="compensation-row">
              <input style="width: 100%; margin-right: 0px" v-model="certifiedProfessional.compensation" class="reg-text-box" hide-details single-line type="text" v-on:keypress="isNumber(event)"/>
            </div>
          </b-col>
          <b-col class="form-section" lg="3" cols="12">
            <p class="char-sub-title">Availability <span class="form-asterisk">*</span></p>
            <b-form-select style="height: auto;" v-model="certifiedProfessional.availability">
              <option v-for="availability_opts in availability_opts" v-bind:key="availability_opts.value" v-bind:value="availability_opts.text">{{ availability_opts.text }}</option>
            </b-form-select>
          </b-col>
          <b-col cols="12" lg="3" class="form-section ">
            <b-btn variant="" v-on:click="nextStep4()" class="arrow step-btn inline">Go To Step 4  <img class="icon" src="~@/assets/img/icons/arrow-right-solid.svg" /></b-btn>
            <p>
              <span class="form-asterisk">*</span>
              <span class="char-general">field are required</span>
            </p>
          </b-col>
        </b-row>                
      </b-container>

      <b-container class="form-section" v-if="step==4">
        <b-row class="no-gutters">
          <b-col cols="11" lg="3" class="form-section">
            <p class="char-sub-title">
                Education <span class="form-asterisk">*</span>
            </p>                        
            <b-form-select v-model="certifiedProfessional.educationTypeId">
              <option v-for="edu_option in edu_options" v-bind:key="edu_option.ID" v-bind:value="edu_option.ID">{{ edu_option.edu }}</option>
            </b-form-select>
            <div v-if="submitted4 && !certifiedProfessional.educationTypeId" style="align-items: center">
              <img style="width: 15px; margin-bottom:1px;margin-right:4px;" alt="Vue logo" src="~@/assets/img/warning-icon.png" />
              <span style="color:red">Select education</span>
            </div>
          </b-col>
          <b-col cols="11" lg="3" class="form-section">
            <p class="char-sub-title"> Industry Related Experience<span class="form-asterisk">*</span></p>
            <b-form-select v-model="certifiedProfessional.experienceYearsId">
              <option v-for="indExp_option in indExp_options" v-bind:key="indExp_option.exp" v-bind:value="indExp_option.ID">{{ indExp_option.exp }}</option>
            </b-form-select>
            <div v-if="submitted4 && !certifiedProfessional.experienceYearsId" style="align-items: center">
              <img style="width: 15px; margin-bottom:1px;margin-right:4px;" alt="Vue logo" src="~@/assets/img/warning-icon.png"/>
              <span style="color:red">Select industry related experience</span>
            </div>
          </b-col>
          <b-col cols="11" lg="3" class="form-section step-btn">
            <b-btn variant="" v-on:click="nextStep5()" class="inline arrow step-btn">Go To Step 5  <img class="icon" src="~@/assets/img/icons/arrow-right-solid.svg" /></b-btn>
            <p>
              <span class="form-asterisk">*</span>
              <span class="char-general">field are required</span>
            </p>
          </b-col>
        </b-row>   
        <b-row class="no-gutters">
          <p>
            A 4-year college or Quantity Surveying degree is an
            appropriate foundation for a Construction Check cost
            professional. The following degrees are preferred due to
            the analytical foundation that these individuals develop
            and need for performing. Preferred degrees for a
            Construction Check cost professional include:
          </p>
        </b-row>
      </b-container>

      <b-container v-if="step==5">
        <Certifications :submitted5 = "submitted5" v-bind:code="certifiedProfessional.inviteCode" @certs="setCerts" />
        <b-row class="no-gutters step-section">
          <b-col cols="11" lg="3" class="form-section step-btn">
            <b-btn variant="" v-on:click="nextStep6()" class="arrow step-btn">Go To Step 6  <img class="icon" src="~@/assets/img/icons/arrow-right-solid.svg" /></b-btn>
            <p>
              <span class="form-asterisk">*</span>
              <span class="char-general">field are required</span>
            </p>
          </b-col>
        </b-row>
      </b-container>
      
      <b-container v-if="step==6">
        <Categories :submitted6 = "submitted6" @exp="projExp" @otherExperience="otherExperiences"/>
        <SectionDivide/>
        <AcknowledgementStatement v-bind:is-checked="statementAcknowledged" @acknowledged="acknowledged" />
        <button type="submit" :disabled="!statementAcknowledged" :style="statementAcknowledged? 'float: right': 'float:right; background-color: grey'" value="Get Started" class="ack-submit get-started" >Get Started<img class="icon" src="~@/assets/img/icons/thumbs-up-solid.svg" /></button>
      </b-container>
    </form>
  </div>
</main>
</div>
</template>

<script>
import AcknowledgementStatement from '../AcknowledgementStatement';
import SectionDivide from '../SectionDivide';
import Positions from './Positions';
import Certifications from './Certifications';
import Categories from './Categories';
import EstimatorProxy from '@/proxies/EstimatorProxy.js';
import AddressProxy from '@/proxies/AddressProxy.js';
import Autocomplete from '@/components/AutocompleteCity.vue';
import AutoCompleteState from '@/components/AutoCompleteState.vue';

export default {
  name: 'ContractorRegistrationPage',

  components: {
    AcknowledgementStatement,
    SectionDivide,
    Positions,
    Certifications,
    Categories,
    Autocomplete,
    AutoCompleteState
  },

  props: {
    isChecked: Boolean,
  },

  data() {
    return {
      hasError: false,
      errors:[],
      step: 5,
      tempStep: 1,
      // All Form Fields
      certifiedProfessional: {
        firstName: '',
        lastName: '',
        emailAddress: '',
        confirmEmail: '',
        password: '',
        confirmPswrd: '',
        phoneNumber: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        jobTitle: '',
        zipCode: '',
        myPositions: [],
        compensation: 50,
        educationTypeId: '',
        experienceYearsId: '',
        expertiseCategoryId: '',
        expertiseSubcategoryId: [],
        buildingTypeId: [],
        allCerts: [],
        checked: '',
        positionAppliedForId: '',
        country: 'USA',
        certificationId: [],
        otherProjectExperience: [],
        inviteCode: '',
        availability: '',
      },
      min: 0,
      max: 200,
      slider: 40,
      max_thumb: 150,
      position_options: [
        { position: 'Certified Cost Engineer' },
        { position: 'Certified Cost Estimator' },
        { position: 'Certified Cost Surveyor' },
      ],
      edu_options: [
        { ID: 1, edu: 'engineering or science based' },
        { ID: 2, edu: 'business administration, accounting, or management' },
        { ID: 3, edu: 'building/construction management or architecture' },
        { ID: 4, edu: 'information technolody / services' },
        { ID: 5, edu: 'BSc (Hons) Quanitity Surveying' },
        { ID: 6, edu: 'MSc Quanitity Surveying — Mechanical & Electrical' },
        { ID: 7, edu: 'MSc Project Management in Construction' },
        { ID: 8, edu: 'MSc Construction Management' },
      ],
      indExp_options: [
        { ID: 1, exp: '5 -10 years' },
        { ID: 2, exp: '10 - 15 years' },
        { ID: 3, exp: '15 - 20 years' },
        { ID: 4, exp: '20+ years' },
      ],
      expertises: [
        { ID: 1, field: 'General/Architectural' },
        { ID: 2, field: 'Structural' },
        { ID: 3, field: 'Mechanical' },
        { ID: 4, field: 'Electrical' },
        { ID: 5, field: 'State/Civil' },
      ],
      availability_opts: [
        { ID: 1, text: 'Full time' },
        { ID: 2, text: 'Part time' },
        { ID: 3, text: 'Contractor' },
      ],
      states: [],
      cities: [],
      temp_state: '',
      temp_city: '',
      statementAcknowledged: this.isChecked,
      statementVerified: false,
      submitted: false,
      isEmailValid: false,
      send_position: {
        area_expertise: '',
        position_applying_for: '',
        skills: [],
      },
      show_password: false,
      show_confirm_password: false,
      pswrdChecked: false,
      pswrdConfirmed: false,
      submitted1: false,
      submitted2: false,
      submitted3: false,
      submitted4: false,
      submitted5: false,
      submitted6: false,
      is_8characters: false,
      is_contain_upper: false,
      is_contain_lower: false,
      is_contain_number: false,
      is_contain_symbol: false
    };
  },

  methods: {
    nextStep: function() {
      this.step++;
      this.tempStep++;
    },

    nextStep2: function(){
      this.submitted1 = true;
      const {firstName, lastName, password, confirmPswrd, phoneNumber} = this.certifiedProfessional;
      if(!this.nameValidation(firstName) && !this.nameValidation(lastName) && password && confirmPswrd && phoneNumber && this.pswrdChecked && this.validStrongPassword() && this.phoneValidation()){
        if(password == confirmPswrd && password.length<16){
          this.step++;
          this.tempStep++;
        }
      }
    },

    nextStep3: function(){
      this.certifiedProfessional.state  = this.temp_state.id;
      this.certifiedProfessional.city = this.temp_city.id;
      this.submitted2 = true;
      const {addressLine1, city, state, zipCode} = this.certifiedProfessional;
      if(addressLine1 && city && state && zipCode && this.zipcodeValidation()){
        this.step++;
        this.tempStep++;
      }
    },

    nextStep4: function(){
      this.submitted3 = true;
      const {expertiseSubcategoryId, expertiseCategoryId, positionAppliedForId, availability} = this.certifiedProfessional;
      if(availability && expertiseCategoryId && positionAppliedForId && availability && expertiseSubcategoryId.length>0){
        this.step ++ ;
        this.tempStep++;
      }
    },

    nextStep5: function(){
      this.submitted4 = true;
      const {educationTypeId, experienceYearsId} = this.certifiedProfessional;
      if(educationTypeId && experienceYearsId){
        this.step ++ ;
        this.tempStep++;
      }
    },

    nextStep6: function(){
      this.submitted5 = true;
      const {certificationId} = this.certifiedProfessional;
      if(certificationId.length > 0){
        this.step ++ ;
        this.tempStep++;
      }
    },

    toggle_password: function() {
      this.show_password = !this.show_password;
    },

    //show or not show the confirm_password in the password field => inverse value of the original value
    toggle_confirm_password: function() {
      this.show_confirm_password = !this.show_confirm_password;
    },

    //Method to receive the position from the Position Component
    receive_position(send_position) {
      this.send_position = send_position;
      this.certifiedProfessional.expertiseCategoryId = send_position.area_expertise;
      this.certifiedProfessional.expertiseSubcategoryId = send_position.skills;
      this.certifiedProfessional.positionAppliedForId = send_position.position_applying_for;
    },

    acceptNumber() {
      //alert('hi');
      var x = this.certifiedProfessional.phoneNumber
        .replace(/\D/g, '')
        .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      this.certifiedProfessional.phoneNumber = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    },

    validEmail() {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(this.certifiedProfessional.emailAddress))
          this.isEmailValid = true;
      else this.isEmailValid = false;
    },

    isNumber: function(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        (charCode > 31 && (charCode < 48 || charCode > 57)) ||
        charCode === 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },

    acknowledged(checked) {
      this.certifiedProfessional.checked = checked;
      this.statementVerified = checked;
      this.statementAcknowledged = checked;
    },

    setCerts(allCerts) {
      this.certifiedProfessional.allCerts = allCerts;
      let result = [];
      for (let cert of allCerts) {
          result.push(cert.ID);
      }
      this.certifiedProfessional.certificationId = result;
      for(var index = 0; index < allCerts.length; index++){
      }
    },

    positions(allPositions) {
      this.certifiedProfessional.myPositions = allPositions;
      // is data being pushed?
    },

    projExp(exp) {
      this.certifiedProfessional.buildingTypeId = exp;
    },

    validationCheck(){
      const { addressLine1, firstName, lastName, allCerts, checked, positionAppliedForId, city, educationTypeId, emailAddress, 
        expertiseSubcategoryId, experienceYearsId, myPositions, phoneNumber, state, zipCode } = this.certifiedProfessional;
      if(addressLine1 && lastName && firstName && allCerts.length && 
      checked && city && educationTypeId && expertiseSubcategoryId.length && experienceYearsId && 
      positionAppliedForId && phoneNumber && state && zipCode){
          return true;
      }
      else{
        return false;
      }
    },

    addCertifiedCostProffesional(e) {
      this.submitted = true;
      e.preventDefault();
      if ( this.statementAcknowledged == false ||this.statementVerified == false) {
        this.statementAcknowledged = true;
      }
      if (this.validationCheck()) {
        const {
          firstName,
          lastName,
          emailAddress,
          confirmEmail,
          phoneNumber,
          addressLine1,
          addressLine2,
          city,
          jobTitle,
          zipCode,
          myPositions,
          compensation,
          educationTypeId,
          experienceYearsId,
          expertiseSubcategoryId,
          allCerts,
          checked,
          availability,
          buildingTypeId,
          certificationId,
          country,
          expertiseCategoryId,
          inviteCode,
          otherProjectExperience,
          positionAppliedForId
        } = this.certifiedProfessional;

      var params = this.certifiedProfessional;

      new EstimatorProxy().createEstimatorProfile(params).then((response) => {
        if (response.data == "ERROR") {
          this.responseMessage = "There was an error creating your account. Please try again."
        }else if(response.data == "DUPLICATE"){
          this.showRegistrationSection = false;
          this.responseMessage = "There is already an Estimator profile using this email address. Please login from the home page."
        }else if(response.data == "DUPEUSER"){
          this.showRegistrationSection = false;
          this.responseMessage = "There is already a registered user using this email address. Please apply with a different email address."
        }else if(response.data == "PENDING"){
          this.showRegistrationSection = false;
          this.responseMessage = "There is already an Estimator profile using this email address. Please contact Construction Check if you did not receive the acknowledement email."
        }else{
          this.$router.push('/estnotification');
          // account created, upload certifications
          this.showRegistrationSection = false;
          var ic = response.data;
          // upload certifications
          for(var index = 0; index < this.certifiedProfessional.allCerts.length; index++){                        
            let formData = new FormData();
            formData.append('uploadFile', this.certifiedProfessional.allCerts[index].file);
            formData.append("certID", this.certifiedProfessional.allCerts[index].ID);
            formData.append("certNumber", this.certifiedProfessional.allCerts[index].cert_num);
            formData.append("uploadLater", this.certifiedProfessional.allCerts[index].uploadLater);
            formData.append("code", ic);
            new EstimatorProxy().uploadEstimatorCertifications(formData).then((response) => {
              if (response.status == "200") {
              }
              else if(response.status === 201){
                console.error("this is error message");
              }
            }).catch(function(){
              console.log('FAILURE!!');
            });
          }                    
            // send user to login
        }
      })  
      .catch(e => {
        this.errors.push("There was an error creating your account. Please try again.");
      });                                     
      }
    },

    //Method that receive the data from Categories component
    otherExperiences(experiences) {
      this.certifiedProfessional.otherProjectExperience = experiences;
    },

    checkPswrd() {
      if (this.certifiedProfessional.password == this.certifiedProfessional.confirmPswrd) {
        this.pswrdConfirmed = true;
        this.pswrdChecked = true;
      } else {
        this.pswrdConfirmed = false;
        this.pswrdChecked = true;
      }
    },

    getEstimatorInviteEmail() {
      var params = new URLSearchParams();
      params.append('inviteCode', this.certifiedProfessional.inviteCode);
      //console.log("code: " + this.certifiedProfessional.inviteCode);
      new EstimatorProxy()
        .getEstimatorInviteEmail(params)
        .then(response => {
          if (response.status == '200') {
            // verified
            if (response.data.emailAddress != null) {
              this.certifiedProfessional.emailAddress = response.data.emailAddress;
              this.hasError = false;
            } else {
              this.hasError = true;
              if (response.data.error != null) {
                //this.errors.push(response.data.error);
              } else {
                //this.errors.push("An unknown error has occurred, please contact Construction Check to determine the cause.")
              }
            }
          }
        })
        .catch(e => {
          this.hasError = true;
          this.errors.push('Invalid email address verification code.');
        });
    },

    validStrongPassword(){
      var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,16})");
      return strongRegex.test(this.certifiedProfessional.password)
    },

    phoneValidation(){
      var phoneRegex =  new RegExp(/^[(]?\d{3}[)]?[(\s)?.-]\d{3}[\s.-]\d{4}$/g);
      return phoneRegex.test(this.certifiedProfessional.phoneNumber);
    },

    zipcodeValidation(){
      var zipRegex = new RegExp(/^\d{5}(?:[-\s]\d{4})?$/g);
      return zipRegex.test(this.certifiedProfessional.zipCode);
    },

    nameValidation(param){
      const reg = new RegExp(/^[a-zA-Z]*$/);
      if(reg.test(param) && param.length > 1) return false;
      else return true;
    },

    gotoStep(index) {
      this.step = index;
    }
  },

  created() {
    this.certifiedProfessional.inviteCode = this.$route.params.verifyCode;
    localStorage.removeItem('id_token');
    this.getEstimatorInviteEmail();
    new AddressProxy().getStates().then((response) => {
      this.states = response;
    })
  },
};

addEventListener('input', e => { let _t = e.target; _t.parentNode.style.setProperty(`--${_t.id}`, +_t.value); }, false);
</script>
<style>
@import '../../../assets/css/style.css';
@import '../../../assets/css/fontAwsome.css';
</style>
<style lang="css" scoped>


.custom-select {
  height: 100%;
  width: 100%;
  border: 1.5px solid #c9c9c9;
  background: #fff url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5'%3E%3Cpath fill='%23343a40' d='M2  -1h4zm0 5L0 1h4z'/%3E%3C/svg%3E") no-repeat right 0.75rem center/8px 10px;
}
.text-bold {
    font-weight: 600;
}

.eye-icon {
  position: absolute;
  width: 20px;
  right: 5px;
  top: 53px;
  z-index: 1;
}

.error-message {
  font-size: 13px; 
  color: red;
}

.valid-error-message {
  color: green;
}
@media only screen and (max-width: 600px) {
  .char-general {
    font-size: 14px;
  }
  .form-section {
    margin-left: 10px;
    margin-right: 10px;
  }
  .contractor-reg {
    margin-top: 15%;
  }
  .container {
    width: auto;
  }
}
</style>
