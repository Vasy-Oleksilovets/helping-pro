<template>
  <div class="confirmInvite">
		<Navigation/>
		<main class="bg-img content">           
        <hr style="background-color:#ed6d3a; height:4px"/>
        <section class="secWhite getStarted">
            <div class="container text-center">
                <h3>Confirming Email Address</h3>     
            </div>
            <div v-if="hasError" class="container text-center alert-danger">
                 <p>There was an error processing your email verification.</p>
                <div v-for="(error, idx) in errors" :key="idx">{{ error }}</div>
            </div> 
            <div v-else>
                <p>Thank you for confirming your email! Let's go ahead and create your account.</p>
                <div  class="container text-left">
                    <form id="register" @submit="checkForm">
                        <div>
                            <span style="color:red">*</span> fields are required!
                        </div> 
                        <div>
                            <p><strong>Account Username: </strong> {{emailAddress}}</p>
                            <p>Your password must be between 6 and 20 characters long and must contain at least one upper case letter and at least one number</p>
                        </div>
                        <div>
                            <label for="pass1">Enter password <span style="color:red">*</span></label> &nbsp;<input id="pass1" v-model="pass1" type="password" name="pass1"/>
                        </div>
                        <div>
                            <label for="pass2">Re-enter password <span style="color:red">*</span></label> &nbsp;<input id="pass2" v-model="pass2" type="password" name="pass2"/>
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

    export default {
        name: "confirmInvite",
        data() {
        return {
            emailConfirmed: false,
            error: false,
            hasError: false,
            errors: [],
            inviteCode: '',
            emailAddress: '',
            pass1: '',
            pass2: '',
            registerBtnClicked: false,
        }
        },
        methods: {
            checkForm: function (e) {
                this.errors = [];
                if (!this.pass1) {
                    this.errors.push('Password required.');
                }        
                if (!this.pass2) {
                    this.errors.push('Re-enter password required.');
                }  
                if(this.pass1 != null && this.pass2 != null && this.pass1 != this.pass2){
                    this.errors.push('Passwords do not match.');
                } else if(!this.validatePassword(this.pass1)){
                    this.errors.push('Password must have between 6 and 20 characters, at least one uppercase character, and at least one number.')
                }                                                                                                             

                if(this.errors.length == 0){
                    this.registerBtnClicked = true;
                    this.registerInviteUser(e);
                    e.preventDefault();
                }else{
                    e.preventDefault();
                }
            },            
            registerInviteUser(e){
                var params = new URLSearchParams();
                params.append('password', this.pass1);
                params.append('inviteCode', this.inviteCode);
                new AccountProxy().confirmClientInvite(params).then((response) => {
                    if(response.status == '200'){
                        this.hasError = false;
                        // account created
                        this.emailAddress = response.data.emailAddress;
                        // send to login page
                        this.$router.push('/login');

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
                // temp
                //e.preventDefault();

            },
            getInviteEmail(){
                var params = new URLSearchParams();
                params.append('inviteCode', this.inviteCode);
                new AccountProxy().getInviteEmail(params).then((response) => {
                    if(response.status == '200'){
                        this.hasError = false;
                        // verified
                        this.emailAddress = response.data.emailAddress
                        this.$store.commit('confirmed_email', {
                                emailAddress: this.emailAddress
                        });
                        this.emailConfirmed = true;
                    }else if(response.status == '202'){
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
            validatePassword(pw) {
                return /[A-Z]/       .test(pw) &&
                    /[a-z]/       .test(pw) &&
                    /[0-9]/       .test(pw) &&
                    pw.length >= 6 && pw.length <= 20;

            },
            validatePhoneNumber(tel){
                return /^\d{3}-\d{3}-\d{4}$/ .test;
            }            
        },
        components: { 
            'Navigation': Navigation,
        },
        created() {
            this.inviteCode = this.$route.params.inviteCode;
        }
    }
</script>
