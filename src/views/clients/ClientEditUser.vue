<template>
    <div class="client">
        <Navigation />
        <main class="bg-img content">
            <h4>Edit User</h4>
            <hr style="background-color:#ed6d3a; height:4px" />
            <b-breadcrumb :items="items"></b-breadcrumb>
            <section class="secWhite secValidate">
                <div class="container text-left">
                    <div v-if="user != null">
                        <form @submit="checkForm">
                            <div>
                                <input type="hidden" v-model="userCode" />
                            </div>
                            <label for="firstName">First Name: </label>&nbsp;
                            <input
                                id="firstName"
                                type="text"
                                v-model="firstName"
                            /><br />
                            <label for="lastName">Last Name: </label>&nbsp;
                            <input
                                id="lastName"
                                type="text"
                                v-model="lastName"
                            /><br />
                            <div>Email Address: {{ user.emailAddress }}</div>
                            <label for="jobTitle">Job Title: </label>&nbsp;
                            <input
                                id="jobTitle"
                                type="text"
                                v-model="jobTitle"
                            /><br />
                            <label for="phone">Phone: </label>&nbsp;
                            <input
                                id="phone"
                                type="text"
                                v-model="phoneNumber"
                            /><br />
                            <label for="enabled">Active: </label>&nbsp;
                            <input
                                type="checkbox"
                                id="enabled"
                                value="enabled"
                                v-model="enabled"
                            />
                            <br />
                            <b-btn
                                :disabled="saveBtnClicked"
                                variant="success"
                                type="submit"
                                >Save User</b-btn
                            >&nbsp;&nbsp;
                            <b-btn type="button" @click.prevent="onCancel"
                                >Cancel</b-btn
                            >
                        </form>
                    </div>
                    <p></p>
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
import AccountProxy from '@/proxies/AccountProxy.js';
import Navigation from '../../components/Navigation.vue';

export default {
    name: 'estimate',
    data() {
        return {
            errors: [],
            userCode: null,
            user: null,
            firstName: '',
            lastName: '',
            emailAddress: '',
            jobTitle: '',
            phoneNumber: '',
            enabled: null,
            saveBtnClicked: false,
            items: [
                {
                    text: 'Client Home',
                    to: { name: 'clientHome' },
                },
                {
                    text: 'Edit User',
                    active: true,
                },
            ],
        };
    },
    methods: {
        validatePassword(pw) {
            return (
                /[A-Z]/.test(pw) &&
                /[a-z]/.test(pw) &&
                /[0-9]/.test(pw) &&
                pw.length >= 6 &&
                pw.length <= 20
            );
        },
        validatePhoneNumber(tel) {
            return /^\d{3}-\d{3}-\d{4}$/.test;
        },
        checkForm: function(e) {
            this.errors = [];
            if (!this.firstName) {
                this.errors.push('First name required.');
            }
            if (!this.lastName) {
                this.errors.push('Last name required.');
            }
            if (!this.jobTitle) {
                this.errors.push('Job title required.');
            }
            if (!this.phoneNumber) {
                this.errors.push('Phone number is required.');
            } else if (!this.validatePhoneNumber(this.phoneNumber)) {
                this.errors.push(
                    'Phone number should be in format (xxx-xxx-xxxx).'
                );
            }
            if (this.errors.length == 0) {
                this.registerBtnClicked = true;
                this.saveUser(e);
                return true;
            } else {
                e.preventDefault();
            }
        },
        onCancel() {
            this.$router.push('/clientManageUsers');
        },
        saveUser(e) {
            var params = new URLSearchParams();
            params.append('firstName', this.firstName);
            params.append('lastName', this.lastName);
            params.append('jobTitle', this.jobTitle);
            params.append('phoneNumber', this.phoneNumber);
            params.append('userCode', this.userCode);
            params.append('enabled', this.enabled);
            new AccountProxy()
                .saveClientUser(params)
                .then(response => {
                    if (response.status == '200') {
                        this.hasError = false;
                        // account created
                        this.userCode = response.data;
                        // send to login page
                        if (this.userCode == null) {
                            this.errors.push(
                                'There was an error saving the user. Please try again.'
                            );
                        } else {
                            this.$router.push('/clientManageUsers');
                        }
                    } else if (response.status == '202') {
                        this.hasError = true;
                        //this.errors.push("The verification email has expired. Please click 'Get Started' and try again.");
                    } else {
                        //this.errors.push("There was an error creating your account. Please try again.");
                    }
                })
                .catch(e => {
                    this.errors.push(
                        'There was an error saving the user. Please try again.'
                    );
                });
        },
    },
    components: {
        Navigation: Navigation,
    },
    created() {
        this.userCode = this.$route.query.ucode;
        if (this.userCode != null) {
            var params = new URLSearchParams();
            params.append('userCode', this.userCode);
            new AccountProxy()
                .getClientUser(params)
                .then(response => {
                    if (response.status == '200') {
                        this.user = response.data;
                        this.userCode = this.user.userCode;
                        this.firstName = this.user.firstName;
                        this.lastName = this.user.lastName;
                        this.jobTitle = this.user.jobTitle;
                        this.emailAddress = this.user.emailAddress;
                        this.enabled = this.user.enabled;
                        this.phoneNumber = this.user.phoneNumber;
                    } else if (response.status == '100') {
                        console.log('session timed out!');
                    }
                })
                .catch(error => {
                    this.errors.push(error);
                });
        }
    },
};
</script>
