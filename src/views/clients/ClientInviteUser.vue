<template>
  <div class="clientInviteUser">
		<Navigation/>
		<main class="bg-img content">
            <h4>Invite User</h4>
            <hr style="background-color:#ed6d3a; height:4px"/> 
            <b-breadcrumb :items="items"></b-breadcrumb>
            <section class="secWhite secValidate">
                <div class="container text-left">
                    <form @submit.prevent="checkForm">
                        <label for="firstName">First Name: </label>&nbsp;
                        <input id="firstName" type="text" v-model="user.firstName"/><br/>
                        <label for="lastName">Last Name: </label>&nbsp;
                        <input id="lastName" type="text" v-model="user.lastName"/><br/>
                        <label for="emailAddress">Email Address: </label>&nbsp;
                        <input id="emailAddress" type="text" v-model="user.emailAddress"/><br/>
                        <label for="jobTitle">Job Title: </label>&nbsp;
                        <input id="jobTitle" type="text" v-model="user.jobTitle"/><br/>  
                        <label for="phone">Phone: </label>&nbsp;
                        <input id="phone" type="text" v-model="user.phoneNumber"/><br/>
                        <label for="isAdmin">Account Admin Super User: </label>&nbsp;
                        <input type="checkbox" id="isAdmin" value="isAdmin" v-model="user.admin"><br/>
                        <label for="isAccountOfficeAdmin">Account Office Admin User: </label>&nbsp;
                        <input type="checkbox" id="isAccountOfficeAdmin" value="isAccountOfficeAdmin" v-model="user.accountOfficeAdmin">
                        <br/>
                        <b-btn :disabled="newBtnClicked" variant="success" type="submit">Send Invitation</b-btn>&nbsp;&nbsp;  
                        <b-btn type=button @click.prevent="onCancel" >Cancel</b-btn> 
                    </form>
                    <div class="container text-left alert-danger">
                        <p v-if="errors.length">
                            <b>Please correct the following error(s):</b>
                            <ul>
                            <li v-for="(error, idx) in errors" :key="idx">{{ error }}</li>
                            </ul>
                        </p> 
                    </div>             
                <p></p>
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
	
	import AccountProxy from '@/proxies/AccountProxy.js';
    import Navigation from '../../components/Navigation.vue';
    
  export default {
    name: "clientInviteUser",
    data() {
      return {
        errors: [],
        user: {},
        userCode: null,
        //accountOfficeAdmin:false,
        //admin: false,
        newBtnClicked: false,
        items: [
          {
            text: 'Client Home',
            to: { name: 'clientHome' }
          },
          {
            text: 'Client Offices',
            to: { name: 'clientOffices' }
          },                    
          {
            text: 'Manage Office',
            href: '#/manageClientOffice/'
          },          
          {
            text: 'Send User Invitation',
            active: true
          }
        ],         
      }
    },
    methods: {
        
        validatePhoneNumber(tel){
            return /^\d{3}-\d{3}-\d{4}$/ .test;
        },
        checkForm: function (e) {
            this.errors = [];
            if (!this.user.emailAddress) {
                this.errors.push('Email address required.');
            } else if (!this.validEmail(this.user.emailAddress)) {
                this.errors.push('Valid email address required.');
            }             
            if (!this.user.firstName) {
                this.errors.push('First name required.');
            }
            if (!this.user.lastName) {
                this.errors.push('Last name required.');
            }
            if (!this.user.jobTitle) {
                this.errors.push('Job title required.');
            }
            if (this.user.phoneNumber && !this.validatePhoneNumber(this.user.phoneNumber)) {
               this.errors.push('Phone number should be in format (xxx-xxx-xxxx).');
            }                                                                                                                        
            if(this.errors.length == 0){
                this.newBtnClicked = true;
                this.saveUser();
                return true;
            }else{
                e.preventDefault();
            }
        }, 
        onCancel(){
            this.$router.push({ name: 'clientManageUsers'});
        }, 
        validEmail: function (email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },                 
        saveUser(){ 
            //this.user.admin = this.admin;
            //this.user.accountOfficeAdmin = this.accountOfficeAdmin;        
            this.user.accountOfficeId = this.accountOfficeId;
            new AccountProxy().sendClientUserInvitation(this.user).then((response) => {
                if(response.status == '200'){
                    this.hasError = false;
                    // account created
                    this.userCode = response.data;
                    // send to login page
                    if(this.userCode == null){
                        this.errors.push("There was an error saving the user. Please try again.");
                    }else{
                        this.$router.push('/clientManageUsers');
                    }
                }else if(response.status == '202'){
                    this.hasError = true;
                    //this.errors.push("The verification email has expired. Please click 'Get Started' and try again.");
                } else{
                    //this.errors.push("There was an error creating your account. Please try again.");
                }
            })
            .catch(e => {
                    this.errors.push("There was an error saving the user. Please try again." + e);
            })            
        },                
    },
    components: { 
        'Navigation': Navigation 
    },
    created() {
        this.accountOfficeId = localStorage.getItem("account_office_id");
        //console.info("invite client : " + localStorage.getItem("account_office_id"));
    }     
  }   
</script>