<template>
    <div class="clientOffices">
        <Navigation />
        <main class="bg-img content">
            <h4>Client Offices</h4>
            <hr style="background-color:#ed6d3a; height:4px" />
            <b-breadcrumb :items="items"></b-breadcrumb>
            <section class="secWhite secValidate">
                <div
                    v-if="this.mainOffice != null && this.mainOffice.length > 0"
                >
                    <router-link :to="'/addClientOffice'"
                        >Add New Satellite Office</router-link
                    >
                </div>
                <br />
                <div
                    v-if="this.mainOffice != null && this.mainOffice.length > 0"
                >
                    <span><strong>Main Office</strong></span>
                    <div v-for="office in mainOffice" :key="office.id">
                        <div>
                            <div>
                                <div
                                    v-for="address in office.addresses"
                                    :key="address.id"
                                >
                                    <div
                                        v-if="
                                            address.addressType.name == 'Main'
                                        "
                                    >
                                        <span>{{ address.city }}</span
                                        >, <span>{{ address.state }}</span> ,
                                        <span>{{ address.zipCode }}</span>
                                        <span>{{ address.country }}</span>
                                        &nbsp;<router-link
                                            :to="
                                                '/manageClientOffice/' +
                                                    office.id
                                            "
                                        >
                                            &nbsp;Manage Office and
                                            Users</router-link
                                        >
                                        <hr />
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </div>
                    </div>
                </div>
                <div v-if="this.offices.length > 0">
                    <span><strong>Satellite Offices</strong></span>
                    <div v-for="office in offices" :key="office.id">
                        <div>
                            <div>
                                <div
                                    v-for="address in office.addresses"
                                    :key="address.id"
                                >
                                    <div
                                        v-if="
                                            address.addressType.name == 'Main'
                                        "
                                    >
                                        <span>{{ address.city }}</span
                                        >, <span>{{ address.state }}</span> ,
                                        <span>{{ address.zipCode }}</span>
                                        <span>{{ address.country }}</span>
                                        &nbsp;<router-link
                                            :to="
                                                '/manageClientOffice/' +
                                                    office.id
                                            "
                                        >
                                            &nbsp;Manage Office and
                                            Users</router-link
                                        >
                                        <hr />
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </div>
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
import Vue from 'vue';
import AccountProxy from '@/proxies/AccountProxy.js';
import Navigation from '@/components/Navigation.vue';

export default {
    name: 'clientOffices',
    data() {
        return {
            errors: [],
            showCreateOffice: true,
            offices: [],
            mainOffice: [],
            items: [
                {
                    text: 'Client Home',
                    to: { name: 'clientHome' },
                },
                {
                    text: 'Client Offices',
                    active: true,
                },
            ],
        };
    },
    methods: {
        fetchOffices() {
            this.isLoading = true;
            var params = new URLSearchParams();
            new AccountProxy()
                .getOffices(params)
                .then(response => {
                    this.mainOffice = response.MAIN;
                    this.offices = response.SAT;
                    if (this.mainOffice == null) {
                        this.mainOffice = [];
                    }
                    if (this.offices == null) {
                        this.offices = [];
                    }
                })
                .catch(error => {
                    this.$notify({
                        group: 'notify',
                        type: 'error',
                        title: 'Error occurred',
                        text: 'Error occurred while getting projects',
                        duration: 5000,
                        speed: 1000,
                    });
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
    },
    components: {
        Navigation: Navigation,
    },
    mounted() {
        this.fetchOffices();
    },
};
</script>
