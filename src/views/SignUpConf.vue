<template>
    <div class="conceptScreening ccheck">
        <Navigation />
        <main class="bg-img content">  
            <section class="secWhite secValidate login-section" style="height: 60vh">
                <div class="container text-center">
                    <div class="container text-center" style="margin-top: 10vh">
                        <h3 class="title">Your confirmation email is on its way!</h3>
                        <div >                            
                            <h5>
                                Your email should be in your inbox in the next few minutes.
                            </h5>
                            <h5>
                                If you don't see an email, please check your Spam and Junk folders.
                            </h5>
                            <h5 class="mt-5">
                                <img
                                    class="green-check"
                                    alt="Vue logo"
                                    src="~@/assets/img/green-checkmark.png"
                                />
                                Email sent to {{ this.email }}
                            </h5>
                        </div>
                    </div>
                   
                </div>
            </section>
        </main>
        <SiteFooter />
    </div>
</template>

<script>
import Header from '../components/layouts/Header.vue';
import Navigation from '../components/Navigation.vue';
import SiteFooter from '../components/SiteFooter.vue';
import AccountProxy from '@/proxies/AccountProxy.js';
import EstimatorProxy from '@/proxies/EstimatorProxy.js';
export default {
    name: 'SignUpConf',
    props: { userEmail: String },
    data() {
        return {
            email: this.userEmail,
        };
    },
    methods: {
    },
    components: {
        Header,
        Navigation,
        SiteFooter
    },
    created() {
        this.email = localStorage.getItem('emailAddress');
    },    
};
</script>

<style scoped>
.button-custom-group {
    display: flex;
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
