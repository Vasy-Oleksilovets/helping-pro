<template>
<div class="ccheck">
<main class="bg content">
  <div class="contractor-reg form-section container">
  <b-container class="client-reg">
    <b-row class="no-gutters" justify="center">
      <b-col class="client-title" cols="11" lg="12">
        <h2 class="text-center title">Client Registration</h2>
      </b-col>
    </b-row>
    <p style="diplay: none">{{ isIdle }}</p>
    <b-row class="no-gutters steps" cols="12">
      <div role="button" @click="gotoSpecificPage(1)" class="step" :class="[step==1 ? 'active':'']">
        <div class="num"><span>1</span></div>
        <span>Your<br/>Information</span>
      </div>
      <div role="button" v-if="tempStep > 1" @click="gotoSpecificPage(2)" class="step" :class="[step==2 ? 'active':'']">
        <div class="num"><span>2</span></div>
        <span>Company<br/>Info</span>
      </div>
      <div role="button" v-else class="step" :class="[step==2 ? 'active':'']">
        <div class="num"><span>2</span></div>
        <span>Company<br/>Info</span>
      </div>
      <div role="button" v-if="tempStep > 2" @click="gotoSpecificPage(3)" class="step" :class="[step==3 ? 'active':'']">
        <div class="num"><span>3</span></div>
        <span>Business<br/>Address</span>
      </div>
        <div role="button" v-else class="step" :class="[step==3 ? 'active':'']">
        <div class="num"><span>3</span></div>
        <span>Business<br/>Address</span>
      </div>
    </b-row>
    <form @submit="addClient" class="register-form">
      <section class="form-section" v-if="step==1">
        <b-row class="no-gutters">
          <b-col cols="11" lg="3" class="form-section">
            <p class="char-sub-title">Your information</p>
          </b-col>
        </b-row>
        <b-row class="no-gutters">
          <b-col cols="11" lg="3" class="form-section">
            <div class="field-box">
              <span class="field-title">First Name<span class="form-asterisk">*</span></span>
              <input class="form-field" v-model="accountRequest.firstName" placeholder=""/>
            </div>
            <div v-if="submitted1 && nameValidation(accountRequest.firstName)">
              <img style="width: 15px; margin-bottom:4px;margin-right:4px;" alt="Vue logo" src="~@/assets/img/warning-icon.png"/>
              <span style="color:red">First Name invalid</span>
            </div>
          </b-col>
          <b-col cols="11" lg="3" class="form-section">
            <div class="field-box">
              <span class="field-title">Last Name<span class="form-asterisk">*</span></span>
              <input class="form-field" v-model="accountRequest.lastName" placeholder=""/>
            </div>
            <div v-if="submitted1 && nameValidation(accountRequest.lastName)">
              <img style="width: 15px; margin-bottom:4px;margin-right:4px;" alt="Vue logo" src="~@/assets/img/warning-icon.png"/>
              <span style="color:red">Last Name invalid</span>
            </div>
          </b-col>
          <b-col cols="11" lg="3" class="form-section">
            <div class="field-box">
                <span class="field-title">Email<span class="form-asterisk">*</span></span>
                <input class="form-field" type="text" v-model="accountRequest.emailAddress" disabled />
            </div>
          </b-col>
        </b-row>
        <b-row class="no-gutters">
          <b-col cols="11" lg="3" class="form-section">
            <div class="field-box">
              <span class="field-title">Password<span class="form-asterisk">*</span></span>
              <button class="pass-switch" style="display:none" v-on:click="switchVisibility(show / hide)"></button>
              <div style="position: relative">
                <input v-if="!show_password" id="password" class="form-field password password-field" @change="checkPswrd" type="password" v-model="accountRequest.password" placeholder=""/>
                <input v-else id="password" class="form-field password password-field" @change="checkPswrd" type="text" v-model="accountRequest.password" placeholder=""/>
                <span v-if="show_password">
                  <img alt="Vue logo" class="eye-icon" src="~@/assets/img/eye.png" @click="toggle_password"/>
                </span>
                <span v-else>
                  <img alt="Vue logo" class="eye-icon" src="~@/assets/img/eye-forbidden.png" @click="toggle_password"/>
                </span>
              </div>
            </div>
            <div v-if="submitted1 && !this.validStrongPassword()">
              <img style="width: 15px; margin-bottom:4px;margin-right:4px;" alt="Vue logo" src="~@/assets/img/warning-icon.png"/>
              <span v-if="this.accountRequest.password" style="color:red">Please enter strong password</span>
              <span v-else style="color:red">Please enter password</span>
            </div>
            <div v-if="!accountRequest.password === accountRequest.confirmPswrd && submitted1">
              <img style="width: 15px; margin-bottom:4px;margin-right:4px;" alt="Vue logo" src="~@/assets/img/warning-icon.png"/>
              <span style="color:red">The password you entered does not match</span>
            </div>
            <div>
              <div :class="accountRequest.password?'mt-3 mt-3 valid-error-message':'mt-3 error-message'"> * Password is case sensitive. </div>
              <div :class="accountRequest.password.length > 8 && accountRequest.password.length < 16?'valid-error-message':'error-message'"> * Must be at least 8 characters long and less than 16 characters. </div>
              <div :class="/^(?=.*[A-Z])/.test(accountRequest.password)?'valid-error-message':'error-message'"> * Uppercase (A-Z) </div>
              <div :class="/^(?=.*[a-z])/.test(accountRequest.password)?'valid-error-message':'error-message'"> * Lowercase (a-z) </div>
              <div :class="/^(?=.*[0-9])/.test(accountRequest.password)?'valid-error-message':'error-message'"> * Number (0-9) </div>
              <div :class="/^(?=.*[-+_!@#$%^&*.,?])/.test(accountRequest.password)?'valid-error-message':'error-message'"> * Symbol (!, #, $, etc.) </div>
            </div>
          </b-col>
          <b-col cols="11" lg="3" class="form-section">
            <div class="field-box">
              <span class="field-title">Confirm Password
              <span class="form-asterisk">*</span></span>
              <div style="position: relative">
                <input v-if="!show_confirm_password" class="form-field password" type="password" @change="checkPswrd" v-model="accountRequest.confirmPswrd" placeholder=""/>
                <input v-else class="form-field password" type="text" @change="checkPswrd" v-model="accountRequest.confirmPswrd" placeholder=""/>
                <span v-if="show_confirm_password">
                  <img alt="Vue logo" class="eye-icon" src="~@/assets/img/eye.png" @click="toggle_confirm_password"/>
                </span>
                <span v-else>
                  <img alt="Vue logo" class="eye-icon" src="~@/assets/img/eye-forbidden.png" @click="toggle_confirm_password"/>
                </span>
              </div>
            </div>
            <div v-if="submitted1 && this.accountRequest.confirmPswrd == ''">
              <img style="width: 15px; margin-bottom:4px;margin-right:4px;" alt="Vue logo" src="~@/assets/img/warning-icon.png"/>
              <span style="color:red">Please confirm password</span>
            </div>
          </b-col>
          <b-col cols="11" lg="3" class="form-section">
            <div class="field-box">
              <span class="field-title">Phone Number<span class="form-asterisk">*</span></span>
              <input class="form-field" type="text" v-model="accountRequest.phoneNumber" @input="acceptNumber()" placeholder=""/>
            </div>
            <div v-if="submitted1 && !this.phoneValidation()">
              <img style="width: 15px; margin-bottom:4px;margin-right:4px;" alt="Vue logo" src="~@/assets/img/warning-icon.png"/>
              <span v-if="this.accountRequest.phoneNumber" style="color:red">Please enter the phone number.</span>
              <span v-else style="color:red">Phone number is invalid</span>
            </div>
          </b-col>
        </b-row>
        <b-row class="no-gutters step-section">
          <b-col cols="12" lg="3" class="form-section step-btn">
            <b-btn variant="" v-on:click="nextStep2()" class="arrow step-btn">Go To Step 2  <img class="icon" src="~@/assets/img/icons/arrow-right-solid.svg" /></b-btn>
            <p><span class="form-asterisk">*</span><span class="char-general">field are required</span></p>
          </b-col>
        </b-row>
      </section>

      <section class="form-section" v-if="step==2">
        <b-row class="no-gutters">
          <b-col cols="11" lg="3" class="form-section">
            <div class="field-box">
              <span class="field-title">Job Title<span class="form-asterisk">*</span></span>
              <input disabled class="form-field" v-model="accountRequest.jobTitle" placeholder=""/>
            </div>
            <div v-if="submitted2 && this.accountRequest.jobTitle == ''">
              <img style="width: 15px; margin-bottom:4px;margin-right:4px;" alt="Vue logo" src="~@/assets/img/warning-icon.png"/>
              <span style="color:red">Please Enter Job Title</span>
            </div>
          </b-col>
          <b-col cols="11" lg="3" class="form-section">
            <div class="field-box">
              <span class="field-title">Company Name<span class="form-asterisk">*</span></span>
              <input class="form-field" v-model="accountRequest.companyName" placeholder=""/>
            </div>
            <div v-if="submitted2 && isEmpty(this.accountRequest.companyName)">
              <img style="width: 15px; margin-bottom:4px;margin-right:4px;" alt="Vue logo" src="~@/assets/img/warning-icon.png"/>
              <span style="color:red">Please enter company name</span>
            </div>
            <div v-if="submitted2 && !isCompanyName(this.accountRequest.companyName)">
              <img style="width: 15px; margin-bottom:4px;margin-right:4px;" alt="Vue logo" src="~@/assets/img/warning-icon.png"/>
              <span style="color:red">Cannot contain special characters.</span>
            </div>
          </b-col>
          <b-col cols="11" lg="3" class="form-section">
            <span class="field-title">Standard Industrial Classification (SIC)<span class="form-asterisk">*</span></span>
            <b-form-select v-model="accountRequest.sicValue">
              <option value="" disabled selected hidden>Standard Industrial Classification*</option>
              <option v-for="elementtype in SIC" v-bind:key="elementtype.index" v-bind:value="elementtype.value">{{ elementtype.name }}</option>
            </b-form-select>
            <div v-if=" submitted2 &&this.accountRequest.sicValue == ''">
              <img style="width: 15px; margin-bottom:4px;margin-right:4px;" alt="Vue logo" src="~@/assets/img/warning-icon.png"/>
              <span style="color:red">Please select Standard Industrial Classification</span>
            </div>
          </b-col>
        </b-row>
        <b-row class="no-gutters">
          <b-col cols="11" lg="3" class="form-section">
            <span class="field-title">Type of Account<span class="form-asterisk">*</span></span>
            <b-form-select v-model="accountType">
              <option value="" disabled selected hidden>Type of Account *</option>
              <option v-for="account_type in type_of_account_list" v-bind:key="account_type.text" v-bind:value="account_type.value">{{ account_type.text }}</option>
            </b-form-select>

            <div v-if="submitted2 &&this.accountType == ''">
              <img style="width: 15px; margin-bottom:4px;margin-right:4px;" alt="Vue logo" src="~@/assets/img/warning-icon.png"/>
              <span style="color:red">Please select account type</span>
            </div>
          </b-col>
          <b-col v-if="this.accountType=='Private/Public'" cols="11" lg="3" class="form-section">
            <span class="field-title">Size of Business<span class="form-asterisk">*</span></span>
            <b-form-select v-model="businessSize">
              <option value="" disabled selected hidden> *</option>
              <option v-for="elementtype in accountTypes" v-bind:key="elementtype.index" v-bind:value="elementtype.size">{{ elementtype.type }}</option>
            </b-form-select>
            <div v-if="submitted2 &&this.businessSize == ''">
              <img style="width: 15px; margin-bottom:4px;margin-right:4px;" alt="Vue logo" src="~@/assets/img/warning-icon.png"/>
              <span style="color:red">Please select account type</span>
            </div>
          </b-col>
          <b-col cols="12" lg="3" class="form-section step-btn">
            <b-btn variant="" v-on:click="nextStep3()" class="arrow step-btn inline">Go To Step 3  <img class="icon" src="~@/assets/img/icons/arrow-right-solid.svg" /></b-btn>
            <p><span class="form-asterisk">*</span><span class="char-general">field are required</span></p>
          </b-col>
        </b-row>
      </section>

      <section class="form-section" v-if="step==3">
        <div>
            <p class="char-sub-title">Business Address</p>
            <br />
            <b-row class="no-gutters">
              <b-col cols="11" lg="3" class="form-section">
                <div class="field-box">
                  <span class="field-title">Address Line One<span class="form-asterisk">*</span></span>
                  <input class="form-field" v-model="accountRequest.address1" placeholder=""/>
                </div>
                <div v-if="!this.accountRequest.address1 && this.submitted3">
                  <img style="width: 15px; margin-bottom:4px;margin-right:4px;" alt="Vue logo" src="~@/assets/img/warning-icon.png"/>
                  <span style="color:red">Please enter an address</span>
                </div>
              </b-col>
              <b-col cols="11" lg="3" class="form-section">
                <div class="field-box">
                  <span class="field-title">Address Line Two</span>
                  <input class="form-field" v-model="accountRequest.address2" placeholder=""/>
                </div>
              </b-col>
              <b-col cols="11" lg="3" class="form-section">
                <span class="field-title">State<span class="form-asterisk">*</span></span>
                <AutoCompleteState v-model="temp_state"/>
                <div v-if="!this.temp_state && this.submitted3">
                  <img style="width: 15px; margin-bottom:4px;margin-right:4px;" alt="Vue logo" src="~@/assets/img/warning-icon.png"/>
                  <span style="color:red">Please select a state</span>
                </div>
              </b-col>
            </b-row>
            <b-row class="no-gutters">
              <b-col cols="11" lg="3" class="form-section">
                <div class="field-box">
                  <span class="field-title">City<span class="form-asterisk">*</span></span>
                  <autocomplete v-model="temp_city" :state="temp_state" :disabled="temp_state===''"/>
                </div>
                <div v-if="!this.temp_city && this.submitted3">
                  <img style="width: 15px; margin-bottom:4px;margin-right:4px;" alt="Vue logo" src="~@/assets/img/warning-icon.png"/>
                  <span style="color:red">Please Enter city</span>
                </div>
              </b-col>
              <b-col cols="11" lg="3" class="form-section">
                <div class="field-box">
                  <span class="field-title">Zip Code<span class="form-asterisk">*</span></span>
                  <input class="form-field" v-model="accountRequest.zip" placeholder=""/>
                </div>
                <div v-if="!this.zipcodeValidation() && this.submitted3">
                  <img style="width: 15px; margin-bottom:4px;margin-right:4px;" alt="Vue logo" src="~@/assets/img/warning-icon.png"/>
                  <span v-if="!accountRequest.zip" style="color:red">Please Enter Zip Code</span>
                  <span v-else style="color:red">Zip code is invalid</span>
                </div>
              </b-col>
              <b-col cols="12" lg="3" class="form-section step-btn">
              </b-col>
            </b-row>
            <br />
        </div>
        <SectionDivide />
        <AcknowledgementStatement v-bind:is-checked="statementAcknowledged" @acknowledged="acknowledged"/>
        <button style="float: right" type="submit" :class="!this.zipcodeValidation() || !this.temp_city || !this.temp_state || !this.accountRequest.address1 || !statementAcknowledged? 'grey-style': ''" value="Get Started" class="ack-submit get-started" >Get Started<img class="icon" src="~@/assets/img/icons/thumbs-up-solid.svg" /></button>
      </section>

    </form>
  </b-container>
  </div>
</main>
</div>
</template>

<script>
import AcknowledgementStatement from '../AcknowledgementStatement';
import SectionDivide from '../SectionDivide';
//import axios from 'axios';
import AccountProxy from '@/proxies/AccountProxy.js';``
import AddressProxy from '@/proxies/AddressProxy.js';
import Autocomplete from '@/components/AutocompleteCity.vue';
import AutoCompleteState from '@/components/AutoCompleteState.vue';

export default {
  name: 'ClientRegistrationPage',
  components: {
    AcknowledgementStatement,
    SectionDivide,
    Autocomplete,
    AutoCompleteState
  },
  props: {
    isChecked: Boolean,
  },
  data() {
    return {
      step: 1,
      tempStep: 1,
      inviteCode: '',
      hasError: false,
      errors: [],
      accountType: '',
      businessSize:'',
      accountRequest: {
        emailAddress: '',
        confirmEmail: '',
        password: '',
        confirmPswrd: '',
        firstName: '',
        lastName: '',
        jobTitle: '',
        phoneNumber: '',
        companyName: '',
        sicValue: '',
        address1: '',
        address2: '',
        cityName: '',
        stateCode: '',
        zip: '',
        checked: '',
        accountType: '',
        roleId: '',
        address: {
          addressLine1: '',
          addressLine2: '',
          cityId: '',
          cityName: '',
          stateId: '',
          stateCode: '',
          stateName: '',
          zipCode: ''
        }
      },
      states: [],
      accountTypes: [
        { type: 'Large — 250+ employees', size: 'LAGR' },
        { type: 'Medium — 50 to 250 employees', size: 'MEDI' },
        { type: 'Small — 10 to 50 employees', size: 'SMAL' },
        { type: 'Micro — 1 to 10 employees', size: 'MICR' },
      ],
      SIC: [
        { name: '01-09 Agriculture, Forestry, Fishing', value: '01-09 Agriculture, Forestry, Fishing' },
        { name: '10-14 Mining', value: '10-14 Mining' },
        { name: '15-17 Construction', value: '15-17 Construction' },
        { name: '20-39 Manufacturing', value: '20-39 Manufacturing' },
        { name: '40-49 Transportation & Public Utilities', value: '40-49 Transportation & Public Utilities' },
        { name: '50-51 Wholesale Trade', value: '50-51 Wholesale Trade' },
        { name: '52-59 Retail Trade', value: '52-59 Retail Trade' },
        { name: '60-67 Finance, Insurance, Real Estate', value: '60-67 Finance, Insurance, Real Estate' },
        { name: '70-89 Services (Professional, Business, Engineering, Accounting etc…)', value: '70-89 Services (Professional, Business, Engineering, Accounting etc…)' },
        { name: '91-99 Public Administation (Federal, State, local & Legistative)', value: '91-99 Public Administation (Federal, State, local & Legistative)' },
      ],
      // Booleans values for the acknowledgement section
      statementAcknowledged: this.isChecked,
      statementVerified: false,
      submitted: false,
      formIsComplete: false,
      pswrdConfirmed: false,
      pswrdChecked: false,
      emailConfirmed: true,
      emailChecked: true,
      //Show the password of the input file
      show_password: false,
      show_confirm_password: false,
      billing_statement_checked: false,
      submitted1: false,
      submitted2: false,
      submitted3: false,
      modalShow: true,
      user_roles_list: [
        { text: 'Company Administrator', value: 4},
        { text: 'Office Manager', value: 5},
        { text: 'Project Manager', value: 6}
      ],
      type_of_account_list: [
        {text: 'Private/Public', value: 'Private/Public'},
        {text: 'Government', value: 'GOVT'}
      ],
      user_role: '',
      states: [],
      cities: [],
      temp_state: '',
      temp_city: '',
      is_idle: false //If the user didn't do anything it will become true 5mins
    };
  },
  methods: {
      gotoLandingPage() {
        location.replace("https://beta.constructioncheck.io/");
      },

      nextStep2: function() {
        const {firstName, lastName, password, confirmPswrd, phoneNumber} = this.accountRequest;
        if(!this.nameValidation(firstName) && !this.nameValidation(lastName) && password && confirmPswrd && phoneNumber && this.validStrongPassword() && password.length < 16 && this.phoneValidation()) {
          if(this.accountRequest.password == this.accountRequest.confirmPswrd){
            this.step++;
            this.tempStep=2;
            for(let i=0; i<this.user_roles_list.length; i++){
              if(this.user_roles_list[i].value === this.user_role) {
                this.accountRequest.jobTitle = this.user_roles_list[i].text;
              }
            }
          }
        }
        else this.submitted1 = true;
      },

      nextStep3: function(){
        this.accountRequest.roleId = this.user_role;
        const {jobTitle, companyName, sicValue} = this.accountRequest;
        if((jobTitle && companyName && this.accountType == 'Private/Public' && this.businessSize && sicValue !== "" && this.isCompanyName(companyName)) || (jobTitle && companyName && this.accountType == 'GOVT' && !this.isEmpty(sicValue) && this.isCompanyName(companyName))) {
          this.step++;
          this.tempStep=3;
        }
        else this.submitted2 = true;
      },

      //show or not show the password in the password field => inverse value of the original value
      toggle_password: function() {
        this.show_password = !this.show_password;
      },

      //show or not show the confirm_password in the password field => inverse value of the original value
      toggle_confirm_password: function() {
        this.show_confirm_password = !this.show_confirm_password;
      },

      validEmail: function(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      },

      checkEmail() {
        if (
          this.accountRequest.emailAddress ==
            this.accountRequest.confirmEmail
        ) {
          this.emailConfirmed = true;
          this.emailChecked = true;
        } else {
          this.emailConfirmed = false;
          this.emailChecked = true;
        }
      },

      acceptNumber() {
        //alert('hi');
        var x = this.accountRequest.phoneNumber
          .replace(/\D/g, '')
          .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        this.accountRequest.phoneNumber = !x[2]
          ? x[1]
          : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
      },

      checkPswrd() {
        if (this.accountRequest.password == this.accountRequest.confirmPswrd) {
          this.pswrdConfirmed = true;
          this.pswrdChecked = true;
        } else {
          this.pswrdConfirmed = false;
          this.pswrdChecked = true;
        }
      },

      switchVisibility() {
        const passwordField = document.querySelector('.password');

        if (passwordField.getAttribute('type') == 'password') {
          passwordField.setAttribute('type', 'text');
        } else {
          passwordField.setAttribute('type', 'password');
        }
      },

      acknowledged(checked) {
        this.accountRequest.checked = checked;
        this.statementVerified = checked;
        this.statementAcknowledged = checked;
      },

      formCompleted(e) {
        e.preventDefault();
      },

      validationCheck() {
        //Set the city and state for the params to send to the register endpoint
        this.accountRequest.address.stateCode = this.temp_state.code;
        this.accountRequest.address.stateName = this.temp_state.name;
        this.accountRequest.address.stateId = this.temp_state.id;

        this.accountRequest.address.cityId = this.temp_city.id;
        this.accountRequest.address.cityName = this.temp_city.name;
        
        this.accountRequest.stateCode = this.temp_state.code;
        this.accountRequest.cityName = this.temp_city.name;

        
        const { address1, address2, checked, cityName, companyName, confirmEmail, confirmPswrd, emailAddress, firstName, jobTitle, lastName, password, phoneNumber, stateCode, zip} = this.accountRequest;
        //Check only third step validation
        //if ( this.pswrdConfirmed && this.emailConfirmed && this.validEmail(emailAddress) && emailAddress && password && confirmPswrd && firstName && lastName && jobTitle && phoneNumber && companyName &&address1 && city && state && zip && checked ) return true;
        
        this.accountRequest.address.addressLine1 = address1;
        this.accountRequest.address.addressLine2 = address2;
        this.accountRequest.address.zipCode = zip;
        
        if ( address1 && cityName && stateCode && zip && checked ) return true;
        else return false;
      },

      nameValidation(param){
        const reg = new RegExp(/^[a-zA-Z]*$/);
        if(reg.test(param) && param.length > 1) return false;
        else return true;
      },

      addClient(e) {
        e.preventDefault();
        this.submitted3 = true;
        if(this.validationCheck()){
          new AccountProxy()
          .businessSuccessSignupEmail({
            emailAddress: this.accountRequest.emailAddress, 
            roleId: this.user_role
          })
          .then(response => {
          })
          .catch(error => {
            console.log("this is Error")
          })
          console.log(this.accountRequest);
          new AccountProxy()
            .createAccount(this.accountRequest)
            .then(response => {
              this.$notify({
                group: 'notify',
                type: 'success',
                title: 'Success',
                text: 'Signup Successfully!',
                duration: 3000,
                speed: 1000,
              });
              setTimeout(() => {
                this.$router.push('/login');
              }, 3000);
            })
            .catch(error => {
              this.errors.push(error);
          });
        }
        else console.log("There is some error for the validation");
      },

      getClientEmailAddress() {
        var params = new URLSearchParams();
        params.append('verifyCode', this.inviteCode);
        new AccountProxy()
          .confirmEmailAddress(params)
          .then(response => {
            if (response.status == '200') {
              if (response.data.emailAddress != null) {
                this.hasError = false;
                this.accountRequest.emailAddress =
                  response.data.emailAddress;
              } else {
                this.hasError = true;
              }
              if(response.data.roleId) this.user_role = response.data.roleId;
            } else if (response.status == '202') {
              this.hasError = true;
              //this.errors.push("The verification email has expired. Please click 'Get Started' and try again.");
            } else {
              this.hasError = true;
              //this.errors.push("Invalid email address verification code.")
            }
          })
          .catch(e => {
            this.hasError = true;
            //this.errors.push("Error! Invalid email address verification code.")
          });
      },

      //Validation Function
      validStrongPassword(){
        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,16})");
        return strongRegex.test(this.accountRequest.password)
      },

      phoneValidation(){
        var phoneRegex =  new RegExp(/^[(]?\d{3}[)]?[(\s)?.-]\d{3}[\s.-]\d{4}$/g);
        return phoneRegex.test(this.accountRequest.phoneNumber);
      },

      zipcodeValidation(){
        var zipRegex = new RegExp(/^\d{5}(?:[-\s]\d{4})?$/g);
        return zipRegex.test(this.accountRequest.zip);
      },

      gotoSpecificPage(step){
        this.step = step;
      },

      //Validation Functions
      isEmpty(param){
        if(param) return false;
        else return true;
      },

      isCompanyName(param){
        var regex = new RegExp(/^[a-zA-Z0-9& ]*$/g); //Just accept number and english characters
        return regex.test(param);
      }
  },
  created() {
      this.inviteCode = this.$route.params.verifyCode;
      localStorage.removeItem('id_token');
      this.getClientEmailAddress();
      new AddressProxy().getStates().then((response) => {
          this.states = response;
      })

  },
  watch: {
    temp_state: function(newVal) {
      this.temp_city = '';
      new AddressProxy().getCities(newVal).then((response) => {
        this.cities = response;
      })
      .catch(error => {
        console.log(error);
      });  
    },
    accountType: function(newVal) {
      if(newVal === "Private/Public")
        this.accountRequest.accountType = this.businessSize;
      else
        this.accountRequest.accountType = newVal;
    },
    businessSize: function(newVal) {
      this.accountRequest.accountType = newVal;
    },
    //If the idle is true(there isn't any user's interaction) go to the login page
    is_idle: function(newVal) {
      this.$router.push('/');
    }
  },
  computed: {
    //Checking the user's interation if it is idle for 5 mins change the value
    isIdle() {
      this.is_idle = this.$store.state.idleVue.isIdle;
    }
  }
};
</script>
<style>
@import '../../../assets/css/style.css';
@import '../../../assets/css/fontAwsome.css';
</style>
<style lang="css" scoped>
.client-reg {
    margin-top: 5%;
}
.client-reg li {
    color: black;
}
.custom-select {
    height: 100%;
    width: 100%;
    border: 1.5px solid #c9c9c9;
    background: #fff url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5'%3E%3Cpath fill='%23343a40' d='M2  -1h4zm0 5L0 1h4z'/%3E%3C/svg%3E") no-repeat right 0.75rem center/8px 10px;
}
.password-field {
    padding-right: 20px;
    padding-bottom: 3px;
}
.eye-icon {
    position: absolute;
    width: 20px;
    right: 20px;
    top: 18px;
    z-index: 1;
}
.confirmButton:hover {
    background-color: #DF7B00;
}
.confirmButton {
    background-color: #0C2340; 
    border-radius: 3px
}

.error-message {
    font-size: 13px; 
    color: red;
}
.valid-error-message {
    color: green;
}
.grey-style {
  background-color: grey;
}
@media only screen and (max-width: 1000px) {
    .client-reg {
        margin-top: 20%;
    }
}
</style>
