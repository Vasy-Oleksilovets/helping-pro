<template>
    <div class="adminHome">
        <Navigation />
        <main class="bg-img content">
            <hr style="background-color:#ed6d3a; height:4px" />
            <section class="secWhite secValidate">
                <div class="container text-center">
                    <div v-if="userInfo != null">
                        <h2 class="title">
                            {{ userInfo.firstName }} {{ userInfo.lastName }}
                        </h2>
                        <router-link to="/adminListEstimators">
                            <div>
                                <p>Search Estimators</p>
                            </div>
                        </router-link>
                        <router-link to="/adminSearchProjects">
                            <div>
                                <p>Search Projects</p>
                            </div>
                        </router-link>
                        <router-link to="/adminSearchClients">
                            <div>
                                <p>Search Clients</p>
                            </div>
                        </router-link>
                        <router-link to="/adminInviteClients">
                            <div>
                                <p>Client Invites</p>
                            </div>
                        </router-link>
                        <router-link to="/adminInviteProfessionals">
                            <div>
                                <p>Invite Professionals</p>
                            </div>
                        </router-link>
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
import AdminProxy from '@/proxies/AdminProxy.js';
import Navigation from '@/components/Navigation.vue';
import { mapGetters } from 'vuex';

export default {
    name: 'estimate',
    data() {
        return {
            errors: [],
            showResponse: false,
            accountCode: null,
            userInfo: null,
            firstName: null,
            username: null,
            userCode: null,
        };
    },
    methods: {
        getAccountInfo: function(e) {},
    },
    components: {
        Navigation: Navigation,
    },
    created() {     
        this.token = this.$store.getters.getToken;
        if (this.token == '') {
            this.$router.push('/login');
        } else {
            var params = new URLSearchParams();
            new AdminProxy()
                .getAdminProfile(params)
                .then(response => {
                    // JSON responses are automatically parsed.
                    this.userInfo = response.data;
                })
                .catch(error => {
                    // Error
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        // console.log(error.response.headers);
                    } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        console.log('error request ' + error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                    }
                    this.errors.push(error);
                });
        }
    },
    computed: {
        ...mapGetters('auth', [
            'getToken',
        ]),   
    },
};
</script>
