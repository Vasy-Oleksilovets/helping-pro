<template>
    <div class="confirmEmailAddress">
        <Navigation />
        <main class="bg-img content">
            <hr style="background-color:#ed6d3a; height:4px" />
            <section class="secWhite getStarted">
                <div class="container text-center">
                    <h3>Confirming Email Address</h3>
                </div>
                <div v-if="hasError" class="container text-center alert-danger">
                    <p>
                        There was an error processing your email verification.
                    </p>
                    <div v-for="(error, idx) in errors" :key="idx">
                        {{ error }}
                    </div>
                </div>
            </section>
        </main>
        <footer>
            <div class="container text-center">
                <a href="#" title="">
                    <img src="~@/assets/img/logoWhite.png" alt="" />
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
    name: 'confirmEmailAddress',
    data() {
        return {
            emailConfirmed: false,
            error: false,
            hasError: false,
            errors: [],
            verifyCode: '',
            emailAddress: '',
        };
    },
    methods: {
        confirmEmail() {
            var params = new URLSearchParams();
            params.append('verifyCode', this.verifyCode);
            new AccountProxy()
                .confirmEmailAddress(params)
                .then(response => {
                    if (response.status == '200') {
                        this.hasError = false;
                        // verified
                        this.emailAddress = response.data.emailAddress;
                        store.commit('account/CONFIRMED_EMAIL', {
                            emailAddress: this.emailAddress,
                        });
                        this.emailConfirmed = true;
                        this.$router.push('/login');
                    } else if (response.status == '202') {
                        this.hasError = true;
                        this.errors.push(
                            "The verification email has expired. Please click 'Get Started' and try again."
                        );
                    } else {
                        this.hasError = true;
                        this.errors.push(
                            'Invalid email address verification code.'
                        );
                    }
                })
                .catch(e => {
                    this.hasError = true;
                    this.errors.push(
                        'Error! Invalid email address verification code.'
                    );
                });
        },
    },
    components: {
        Navigation: Navigation,
    },
    created() {
        this.verifyCode = this.$route.params.verifyCode;
        this.confirmEmail();
    },
};
</script>
