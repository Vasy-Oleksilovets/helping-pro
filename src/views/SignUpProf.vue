<template>
    <div>
        <Header />
        <div class="center-message">
            <form @submit="emailSubmit($event)">
                <p class="get-started-text">Let's get started!</p>
                <p class="email-text">
                    Please enter your primary business email address to use for
                    your account.
                </p>
                <p class="email-text">
                    Your job offers will be sent to this email. We will never
                    use your email for spam or sell your data.
                </p>
                <b-card class="email-entry-form">
                    <b-row class="form-row">
                        <b-col cols="12" lg="2" class="full-width">
                            <p class="email-card-title">E-mail Address</p>
                        </b-col>
                        <b-col cols="12" lg="6" class="full-width">
                            <input
                                class="email-entry"
                                v-on:blur="validEmail(email)"
                                type="text"
                                v-model="email"
                                placeholder="abcd@email.com"
                            />
                        </b-col>
                        <b-col cols="12" lg="3" class="full-width">
                            <b-button type="submit" class="submit-button"
                                >Send Verification Link</b-button
                            >
                        </b-col>
                    </b-row>
                </b-card>
                <div v-if="submitted && this.email == ''">
                    <div class="warning">
                        <img
                            style="width: 15px; margin-bottom:4px;margin-right:4px;"
                            alt="Vue logo"
                            src="~@/assets/img/warning-icon.png"
                        />
                        <span>Enter a primary business email</span>
                    </div>
                </div>
                <div
                    v-if="
                        submitted &&
                            this.email !== '' &&
                            !validEmail(this.email)
                    "
                >
                    <div class="warning">
                        <img
                            style="width: 15px; margin-bottom:4px;margin-right:4px;"
                            alt="Vue logo"
                            src="~@/assets/img/warning-icon.png"
                        />
                        <span>Please enter a valid email address</span>
                    </div>
                </div>
                <div v-if="submitted && duplicateEmail">
                    <div class="warning">
                        <img
                            style="width: 15px; margin-bottom:4px;margin-right:4px;"
                            alt="Vue logo"
                            src="~@/assets/img/warning-icon.png"
                        />
                        <span>This email address is already in use</span>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Header from '../components/layouts/Header.vue';
import EstimatorProxy from '@/proxies/EstimatorProxy.js';

export default {
    name: 'SignUpProf',
    components: {
        Header,
    },
    props: { userEmail: String },
    data() {
        return {
            duplicateEmail: false,
            email: '',
            submitted: false,
        };
    },
    methods: {
        emailSubmit(e) {
            e.preventDefault();
            this.submitted = true;
            if (this.validEmail(this.email)) {
                var params = new URLSearchParams();
                params.append('emailAddress', this.email);
                new EstimatorProxy()
                    .sendEstimatorRegistrationEmail(params)
                    .then(response => {
                        if (response.data == 'SENT') {
                            localStorage.setItem('emailAddress', this.email);
                            this.$router.push('/signupconf');
                        } else {
                            // email exists
                            this.duplicateEmail = true;
                        }
                    })
                    .catch(e => {
                    });
            }
        },

        validEmail: function(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
    },
    created() {
        localStorage.removeItem('id_token');
    },          
};
</script>

<style scoped>
.email-entry {
    width: 100%;
    border-radius: 3px;
    height: 35px;
    border-color: rgba(0, 0, 0, 0.25);
    padding-left: 10px;
}

.email-entry-form {
    margin-top: 30px;
    padding-top: 1%;
    padding-bottom: 1%;
    box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.25);
}

.full-width {
    display: flex !important;
    justify-content: center;
    align-content: center;
    padding-left: 0px;
    padding-right: 0px;
    height: 100%;
    position: relative;
}

.full-width p {
    top: 50%;
}

.center-message {
    width: 45vw;
    margin: auto;
    margin-top: 10%;
}
.submit-button {
    text-decoration: none;
    outline: none;
    background-color: #0c2340;
    font-size: 11px;
}
.submit-text {
    text-decoration: none;
    color: #ffffff;
    font-weight: 200;
}

.email-card-title {
    margin: none;
    font-weight: 800;
    font-size: 13px;

    text-align: center;
    margin-top: 7%;
    height: 30px;
}

.get-started-text {
    font-weight: 800;
    font-size: 18px;
    margin-left: 30px;
}

.email-text {
    font-weight: 600;
    font-size: 12px;
    margin-left: 35px;
}

.form-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.warning {
    color: red;
    margin-top: 15px;
    margin-left: 35px;
}
@media only screen and (max-width: 1000px) {
    .center-message {
        width: 90%;
        margin-top: 40vw;
    }

    .email-entry {
        height: 40px;
    }

    .submit-button {
        height: 90%;
    }
    .full-width {
        margin-bottom: 10px;
    }
    .submit-button {
        margin-top: 5%;
    }
    .email-card-title {
        font-weight: 800;
        font-size: 13px;
        margin-top: 5%;
        text-align: none;
        margin-top: 10%;
    }
    .get-started-text {
        margin-left: 0px;
    }
    .email-text {
        margin-left: 0px;
    }
}
</style>
