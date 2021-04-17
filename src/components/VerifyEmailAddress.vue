<template>
    <div id="verifyEmailAddress">
        <h4>Validation</h4>

        <div class="text-center">
            We'll send you an email to confirm your address.<br /><br />
        </div>
        <div>
            <form @submit.prevent="verifyEmail">
                <div>
                    <p
                        style="color:red"
                        v-for="(error, idx) in errors"
                        :key="idx"
                    >
                        {{ error }}
                    </p>
                </div>
                <input
                    type="text"
                    size="30"
                    placeholder="Enter Business Email Address"
                    v-model="emailAddress"
                /><br /><br />
                <b-btn :disabled="btnClicked" variant="success" type="submit"
                    >Verify Business Email Address</b-btn
                >
            </form>
        </div>
        <div>{{ serverMessage }}</div>
    </div>
</template>

<script>
import AccountProxy from '@/proxies/AccountProxy.js';
export default {
    name: 'verifyEmailAddress',
    data() {
        return {
            emailAddress: '',
            error: false,
            errors: [],
            btnClicked: false,
            serverMessage: '',
        };
    },
    methods: {
        verifyEmail() {
            this.errors = [];
            if (!this.emailAddress) {
                this.errors.push('Email required.');
            } else if (!this.validEmail(this.emailAddress)) {
                this.errors.push('Valid email required.');
            }

            if (!this.errors.length) {
                this.btnClicked = true;
                var params = new URLSearchParams();
                params.append('emailAddress', this.emailAddress);
                new AccountProxy()
                    .verifyEmailAddress(params)
                    .then(response => {
                        if (response.status == '200') {
                            this.serverMessage = response.data;
                        } else {
                            // bad login
                            this.$store.state.loginSuccess = false;
                            this.isLoggedIn = false;
                            this.$emit('submitted', this.isLoggedIn);
                        }
                    })
                    .catch(e => {
                        this.errors.push(e);
                    });
            }
        },
        checkForm: function(e) {
            this.errors = [];
            if (!this.email) {
                this.errors.push('Email required.');
            } else if (!this.validEmail(this.emailAddress)) {
                this.errors.push('Valid email required.');
            }
        },
        validEmail: function(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
    },
    created() {
        this.serverMessage = '';
    },
    computed: {
        isDisabled: function() {
            return !this.btnClicked;
        },
    },
};
</script>
