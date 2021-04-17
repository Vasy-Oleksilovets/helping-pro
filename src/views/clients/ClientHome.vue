<template>
    <div class="clientHome">
        <Navigation />
        <main class="bg-img content">
            <hr style="background-color:#ed6d3a; height:4px" />
            <section class="secWhite secValidate">
                <div class="container text-center">
                    <div v-if="accountInfo != null">
                        <h2 class="title">
                            {{ accountInfo.account.companyName }}
                        </h2>
                        <router-link to="/newClientProject">
                            <div>
                                <p>New Project</p>
                            </div>
                        </router-link>
                        <router-link to="/clientProjects">
                            <div>
                                <p>My Projects</p>
                            </div>
                        </router-link>
                        <div v-if="accountInfo.clientAdmin">
                            <router-link to="/clientOffices">
                                <div>
                                    <p>Client Offices</p>
                                </div>
                            </router-link>
                        </div>
                        <div v-if="accountInfo.clientAdmin">
                            <p>All Projects</p>
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
            showResponse: false,
            accountCode: null,
            accountInfo: null,
            firstName: null,
            username: null,
            userCode: null,
        };
    },
    methods: {
        getAccountInfo: function() {
            var params = new URLSearchParams();
            new AccountProxy()
                .getAccountInfo(params)
                .then(response => {
                    if (response.status == '200') {
                        this.accountInfo = response.data;
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
        this.getAccountInfo();
    },
};
</script>
