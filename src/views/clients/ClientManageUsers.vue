<template>
    <div class="client">
        <Navigation />
        <main class="bg-img content">
            <h4>Manage Users</h4>
            <hr style="background-color:#ed6d3a; height:4px" />
            <b-breadcrumb :items="items"></b-breadcrumb>
            <section class="secWhite secValidate">
                <div class="container text-center">
                    <div>
                        <router-link :to="'/clientInviteUser'"
                            >Invite New User</router-link
                        >
                    </div>
                    <br />
                    <div v-if="userList != null">
                        <h5>List of Current Users</h5>
                        <div v-for="user in userList" :key="user.emailAddress">
                            <div>
                                <div>
                                    <span
                                        >{{ user.firstName }}
                                        {{ user.lastName }}
                                        {{ user.emailAddress }} </span
                                    ><span
                                        >Job Title: {{ user.jobTitle }} Phone:
                                        {{ user.phoneNumber }}
                                    </span>
                                    Active: {{ user.enabled }}&nbsp;<router-link
                                        :to="
                                            '/clientEditUser?ucode=' +
                                                user.userCode
                                        "
                                        >Edit</router-link
                                    >
                                </div>
                                <hr />
                            </div>
                        </div>
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
            userList: [],
            items: [
                {
                    text: 'Client Home',
                    to: { name: 'clientHome' },
                },
                {
                    text: 'Manage Users',
                    active: true,
                },
            ],
        };
    },
    methods: {
        getAccountUsers() {
            var params = new URLSearchParams();
            new AccountProxy()
                .getAccountUsers(params)
                .then(response => {
                    if (response.status == '200') {
                        var errorCode = response.data.errorCode;
                        if (errorCode != null) {
                            if (errorCode == 'SessionExpired') {
                                this.$store.commit('session_expired', {});
                            }
                            console.log('Error: ' + errorCode);
                        } else {
                            this.userList = response.data;
                        }
                    } else if (response.status == '100') {
                        console.log('session timed out!');
                    }
                })
                .catch(error => {
                    this.errors.push(error);
                });
        },
    },
    components: {
        Navigation: Navigation,
    },
    created() {
        this.getAccountUsers();
    },
};
</script>
