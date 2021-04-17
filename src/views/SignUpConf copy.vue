<template>
    <div>
        <Navigation />
        <main class="bg-img content">  
            <p class="conf-title-text">
                Your confirmation email is on its way!
            </p>
            <p class="conf-text">Thank you! Please check your email.</p>
            <p class="conf-text">
                Your email should be in your inbox in the next few minutes. If
                you don't see an email, please check your Spam and Junk folders.
            </p>
            <div class="closing-tag">
                <img
                    class="green-check"
                    alt="Vue logo"
                    src="~@/assets/img/green-checkmark.png"
                /><span class="conf-closing"
                    >Email sent to {{ this.email }}
                </span>
            </div>
        </main>
        <SiteFooter />
    </div>
</template>

<script>
import SignUpClient from './SignUpClient.vue';
import SignUpProf from './SignUpProf.vue';
import Header from '../components/layouts/Header.vue';
import Navigation from '../components/Navigation.vue';
import SiteFooter from '../components/SiteFooter.vue';

export default {
    name: 'SignUpConf',
    components: {
        Header,
        Navigation,
        SiteFooter
    },
    props: { userEmail: String },
    data() {
        return {
            email: this.userEmail,
        };
    },
    created() {
        this.email = localStorage.getItem('emailAddress');
    },
};
</script>

<style scoped>
.center-message {
    width: 50vw;
    margin: auto;
    margin-top: 18%;
}

.conf-title-text {
    font-weight: 800;
    font-size: 18px;
    margin-left: 30px;
}

.conf-text {
    font-weight: 500;
    font-size: 12px;
    margin-left: 35px;
}

.conf-closing {
    font-weight: 900;
    font-size: 13px;
    margin-left: 15px;
}

.green-check {
    width: 15px;
}

.closing-tag {
    margin-left: 35px;
}

@media only screen and (max-width: 1000px) {
    .center-message {
        width: 90vw;
        margin-top: 40vw;
    }
}
</style>
