<template>
  <div class="createClientAccount">
		<Navigation/>
		<main class="bg-img content">
        <hr style="background-color:#ed6d3a; height:4px"/>
        <section class="secWhite getStarted">
            <div class="container text-center">
                <h3>Create Account</h3>     
            </div>
            <div>
                <div class="container text-center">
                    <p>Thank you for confirming your email! Let's go ahead and set up your account.</p>
                    <div  class="container text-left">
                        <div>
                            <span style="color:red">*</span> fields are required!
                        </div>
                        <hr/>
                        <form @submit.prevent="checkForm">
                            <div>
                                <label for="companyName">Company Name <span style="color:red">*</span></label> &nbsp;<input :maxlength="60" id="companyName" v-model="accountRequest.companyName" type="text" name="companyName"/>
                            </div>
                            <hr/>

                            <div>                                
                                Type of Account: <span style="color:red">*</span><br/>
                                <div>
                                    <input type="radio" id="LARGE" value="LARG" v-model="accountRequest.accountType">
                                    <label for="LARGE">Large, employs 250 people or more</label>
                                </div>
                                <div>
                                    <input type="radio" id="MEDIUM" value="MEDI" v-model="accountRequest.accountType">
                                    <label for="MEDIUM">Medium, employs fewer than 250 people</label>                                 
                                </div>
                                <div>
                                    <input type="radio" id="SMALL" value="SMAL" v-model="accountRequest.accountType">
                                    <label for="SMALL">Small, employs fewer than 50 people</label>
                                </div>
                                <div>
                                    <input type="radio" id="MICRO" value="MICR" v-model="accountRequest.accountType">
                                    <label for="MICRO">Micro, employs fewer than 10 people</label>
                                </div>
                                <div>
                                    <input type="radio" id="GOVT" value="GOVT" v-model="accountRequest.accountType">
                                    <label for="GOVT">Government Agency</label>
                                </div>                                                                                                        
                            </div>
                            <hr/>   
                            <div>
                                <label for="firstName">First Name <span style="color:red">*</span></label> &nbsp;<input id="firstName" v-model="accountRequest.firstName" type="text" name="firstName"/>
                            </div>
                            <div>
                                <label for="lastName">Last Name <span style="color:red">*</span></label> &nbsp;<input id="lastName" v-model="accountRequest.lastName" type="text" name="lastName"/>
                            </div>   
                            <div>
                                <label for="jobTitle">Job Title <span style="color:red">*</span></label> &nbsp;<input id="jobTitle" v-model="accountRequest.jobTitle" type="text" name="jobTitle"/>
                            </div>
                            <div>
                                <label for="phoneNumber">Phone Number (format: xxx-xxx-xxxx)<span style="color:red">*</span></label> &nbsp;<input id="phoneNumber" v-model="accountRequest.phoneNumber" type="text" name="phoneNumber"/>
                            </div> 
                            <span><strong>Business Information</strong></span> 
                            <div>
                                <label for="address1">Address Line One <span style="color:red">*</span></label> &nbsp;<input id="address1" v-model="accountRequest.address1" type="text" name="address1"/>
                            </div>  
                            <div>
                                <label for="address2">Address Line Two</label> &nbsp;<input id="address2" v-model="accountRequest.address2" type="text" name="address2"/>
                            </div>  
                            <div>
                                <label for="city">City <span style="color:red">*</span></label> &nbsp;<input id="city" v-model="accountRequest.city" type="text" name="city"/>
                            </div>
                            <div>
                                <label for="state">State <span style="color:red">*</span></label> &nbsp;
                                <select id="state" v-model="accountRequest.state" name="state">
                                    <option value="AL">Alabama</option>
                                    <option value="AK">Alaska</option>
                                    <option value="AZ">Arizona</option>
                                    <option value="AR">Arkansas</option>
                                    <option value="CA">California</option>
                                    <option value="CO">Colorado</option>
                                    <option value="CT">Connecticut</option>
                                    <option value="DE">Delaware</option>
                                    <option value="DC">District Of Columbia</option>
                                    <option value="FL">Florida</option>
                                    <option value="GA">Georgia</option>
                                    <option value="HI">Hawaii</option>
                                    <option value="ID">Idaho</option>
                                    <option value="IL">Illinois</option>
                                    <option value="IN">Indiana</option>
                                    <option value="IA">Iowa</option>
                                    <option value="KS">Kansas</option>
                                    <option value="KY">Kentucky</option>
                                    <option value="LA">Louisiana</option>
                                    <option value="ME">Maine</option>
                                    <option value="MD">Maryland</option>
                                    <option value="MA">Massachusetts</option>
                                    <option value="MI">Michigan</option>
                                    <option value="MN">Minnesota</option>
                                    <option value="MS">Mississippi</option>
                                    <option value="MO">Missouri</option>
                                    <option value="MT">Montana</option>
                                    <option value="NE">Nebraska</option>
                                    <option value="NV">Nevada</option>
                                    <option value="NH">New Hampshire</option>
                                    <option value="NJ">New Jersey</option>
                                    <option value="NM">New Mexico</option>
                                    <option value="NY">New York</option>
                                    <option value="NC">North Carolina</option>
                                    <option value="ND">North Dakota</option>
                                    <option value="OH">Ohio</option>
                                    <option value="OK">Oklahoma</option>
                                    <option value="OR">Oregon</option>
                                    <option value="PA">Pennsylvania</option>
                                    <option value="RI">Rhode Island</option>
                                    <option value="SC">South Carolina</option>
                                    <option value="SD">South Dakota</option>
                                    <option value="TN">Tennessee</option>
                                    <option value="TX">Texas</option>
                                    <option value="UT">Utah</option>
                                    <option value="VT">Vermont</option>
                                    <option value="VA">Virginia</option>
                                    <option value="WA">Washington</option>
                                    <option value="WV">West Virginia</option>
                                    <option value="WI">Wisconsin</option>
                                    <option value="WY">Wyoming</option>
                                </select>	                                
                            </div>
                            <div>
                                <label for="zip">Zip Code <span style="color:red">*</span></label> &nbsp;<input id="zip" v-model="accountRequest.zip" type="text" name="zip"/>
                            </div>
                            <div>
                                <input type="checkbox" id="addressInvoice"  v-model="accountRequest.addressInvoice">
                                <label for="addressInvoice">This is the address for invoice/credit card</label>
                            </div>
                            <hr/>  
                            <div>
                                <p><strong>Account Username: </strong> {{accountRequest.emailAddress}}</p>
                                <p>Your password must be between 6 and 20 characters long and must contain at least one upper case letter and at least one number</p>
                            </div>
                           <div>
                                <label for="pass1">Enter password <span style="color:red">*</span></label> &nbsp;<input id="pass1" v-model="accountRequest.pass1" type="password" name="pass1"/>
                            </div>
                           <div>
                                <label for="pass2">Re-enter password <span style="color:red">*</span></label> &nbsp;<input id="pass2" v-model="accountRequest.pass2" type="password" name="pass2"/>
                            </div>                              
                            <hr/>
                            <div>
                                <h5>Construction Check™ Acknowledgement statement</h5>
                            </div>
                            <div style="margin:5px">
                                Construction Check™ will establish your company profile that includes basic information about your company. Your company profile will be searchable by others employed by your company. If you want to hide your company profile, you can do so anytime by editing the profile visibility settings on the Company Profile page after you have finished your registration.
                            </div>
                            <div style="margin:5px">
                                By clicking the Register button, you expressly acknowledge and give consent to Construction Check™ for your data entered into this system where you are located and the computer systems on which the Construction Check™ services are hosted (located in various data centers), in accordance with the Construction Check™ Privacy Statement, and applicable law.
                            </div>    
                            <div style="margin:5px">
                                You can access or modify your information entered within the application, or by contacting the Construction Check™ administrator within your organization or Construction Check™ support. By clicking the Register button consent shall be in effect and granted. Consent may be revoked by written notice to Construction Check™.
                            </div>
                            <div style="margin:5px">
                                 <input type="checkbox" id="readAndagree"  v-model="readAndagree">
                                 I have read and agree to the <a :href="privacyUrl" target="_blank">Construction Check™ Privacy Statement</a>
                            </div>                                                                               
                            <hr/> 
                             
                            <b-btn :disabled="registerBtnClicked" variant="success" type="submit">Create Account</b-btn>                                                                 
                        </form>
                    </div>
                <div class="container text-left alert-danger">
                    <p v-if="errors.length">
                        <b>Please correct the following error(s):</b>
                        <ul>
                        <li v-for="(error, idx) in errors" :key="idx">{{ error }}</li>
                        </ul>
                    </p> 
                </div>                      
                </div> 
            </div>                                         
        </section>
		</main>
		<footer>
			<div class="container text-center">
				<a href="#" title="">
					<img src="~@/assets/img/logoWhite.png" alt="">
				</a>
				<p>Copyright, 2019 Construction Check. All Rights Reserved.</p>
			</div>
		</footer>       
	</div> 
</template>

<script>
    import Navigation from '@/components/Navigation.vue';
    import AccountProxy from '@/proxies/AccountProxy.js';
    import store from '@/store';

    export default {
        name: "createClientAccount",
        data() {
        return {
            readAndagree: false,
            emailConfirmed: false,
            accountRequest:{
                accountType: 'LARG',
                emailAddress: store.state.account.emailAddress,
            },            
            error: false,
            hasError: false,
            errors: [],
            verifyCode: '',
            registerBtnClicked: false,
            privacyUrl: "",
        }
        },
        methods: {
            checkForm: function (e) {
                this.errors = [];
                if (!this.accountRequest.companyName) {
                    this.errors.push('Company name required.');
                }
                if (!this.accountRequest.firstName) {
                    this.errors.push('First name required.');
                }
                if (!this.accountRequest.lastName) {
                    this.errors.push('Last name required.');
                }
                if (!this.accountRequest.jobTitle) {
                    this.errors.push('Job title required.');
                }
                if (!this.accountRequest.phoneNumber) {
                    this.errors.push('Phone number is required.');
                } else if(!this.validatePhoneNumber(this.accountRequest.phoneNumber)){
                    this.errors.push('Phone number should be in format (xxx-xxx-xxxx).');
                }             
                if (!this.accountRequest.address1) {
                    this.errors.push('Address line one required.');
                }
                if (!this.accountRequest.city) {
                    this.errors.push('City required.');
                }
                if (!this.accountRequest.state) {
                    this.errors.push('State required.');
                }
                if (!this.accountRequest.zip) {
                    this.errors.push('Zip code required.');
                }
                if (!this.accountRequest.pass1) {
                    this.errors.push('Password required.');
                }        
                if (!this.accountRequest.pass2) {
                    this.errors.push('Re-enter password required.');
                }  
                if(this.accountRequest.pass1 != null && this.accountRequest.pass2 != null && this.accountRequest.pass1 != this.accountRequest.pass2){
                    this.errors.push('Passwords do not match.');
                } else if(!this.validatePassword(this.accountRequest.pass1)){
                    this.errors.push('Password must have between 6 and 20 characters, at least one uppercase character, and at least one number.')
                }  
                if(!this.readAndagree){
                    this.errors.push('You must agree to the Construction Check™ Privacy Statement to continue.');
                }

                if(this.errors.length == 0){
                    this.registerBtnClicked = true;
                    this.registerAccount();
                    return true;
                }else{
                    e.preventDefault();
                }
            },            
            registerAccount(){
                this.accountRequest.password = this.accountRequest.pass1;
                let params = this.accountRequest;

                new AccountProxy().createAccount(params).then((response) => {
                    this.$router.push({ path: 'login' });
                })
                .catch(error => {
                    this.errors.push(error);
                }); 
            },
            validatePassword(pw) {
                return /[A-Z]/       .test(pw) &&
                    /[a-z]/       .test(pw) &&
                    /[0-9]/       .test(pw) &&
                    pw.length >= 6 && pw.length <= 20;

            },
            validatePhoneNumber(tel){
                return /^\d{3}-\d{3}-\d{4}$/ .test;
            },
            getPrivacyUrl(){
                new AccountProxy().getPrivacyUrl().then((response) => {
                    this.privacyUrl = response.data;
                })
                .catch(error => {
                    this.errors.push(error);
                });                 
            }           
        },
        components: { 
            'Navigation': Navigation,
        },
        created() {
            this.accountRequest.emailAddress = store.state.account.emailAddress
            this.privacyUrl = this.getPrivacyUrl();
        }
    }
</script>