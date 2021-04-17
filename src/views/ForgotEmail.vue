<template>
    <div class="conceptScreening ccheck">
        <Navigation />
        <main class="bg-img content">            
            <section class="secWhite secValidate login-section">
                <div v-if="!success" class="container text-center">
                    <h2 class="title">Forgot Email</h2>
                    <div >
                        
                        <h5>
                        Get help signing into Construction Check.<br/>Enter your phone number below.
                        </h5>
                        <div id="loginComponent">
                            <form @submit.prevent="verifyIdentity()">
                                <!--<div class="input-field">
                                    <input
                                        type="text"
                                        placeholder="Company Name"
                                        v-model="company_name"
                                    /><img class="icon" src="~@/assets/img/icons/hotel-solid.svg" />
                                </div><br /><br />
                                <div class="input-field">
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        v-model="full_name"
                                    /><img class="icon" src="~@/assets/img/icons/user-solid.svg" />
                                </div><br /><br />-->
                                <div class="input-field">
                                    <input
                                        type="text"
                                        placeholder="Phone Number"
                                        v-model="phone_number"
                                    /><img class="icon" src="~@/assets/img/icons/icon-phone.svg" />
                                </div><br /><br />
                                <b-btn variant="success" type="submit" class="arrow"
                                    >Verify My Identity <img class="icon" src="~@/assets/img/icons/arrow-right-solid.svg" /></b-btn>
                                <p v-if="error" class="error">
                                    Bad login information
                                </p>
                                

                                <div class="link-holder">
                                    <router-link to="/login">Go Back to Login</router-link>                                   
                                </div>

                                
                            </form>
                        </div>
                    </div>
                    <p></p>
                </div>

                <div v-if="success" class="container text-center">
                    <h2 class="title">Check Your Email</h2>
                    <div class="holder">
                        <p class="left">We sent an email with your user ID. The email might take a few minutes to arrive.</p>
                        <p class="left">We sent an email to: </p>
                        <p class="left">Didn't receive an email? <a href="">Try again</a> </p>
                    </div>
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
    name: 'conceptScreening',
    data() {
        return {
            loginError: false,
            company_name: '',
            full_name: '',
            phone_number: '',
            error: false,
            success: false,
            errors: [],
            showLogin: true,
            userCode: null,
            token: null,
            roles: '',
        };
    },
    methods: {
        verifyIdentity() {
            this.success = true;
            
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
.left {
    text-align: left;
}
.holder {
    max-width: 480px;
    text-align: left;
    margin: 0 auto;
}
</style>
