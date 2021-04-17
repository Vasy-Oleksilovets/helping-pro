<template>
    <div class="manageClientOffice">
        <Navigation />
        <main class="bg-img content">
            <h4>Manage Office</h4>
            <hr style="background-color:#ed6d3a; height:4px" />
            <b-breadcrumb :items="items"></b-breadcrumb>
            <section class="secWhite secValidate">
                <div>
                    <b-tabs content-class="mt-3">
                        <b-tab
                            id="officeAddresses"
                            title="Office Addresses"
                            active
                        >
                            <div class="container text-left">
                                <!--<form @submit.prevent="checkOfficeForm">
                                <div>
                                    <label for="addressLine1">Address Line 1:&nbsp;</label>
                                    <input id="addressLine1" v-model="newOffice.addressLine1">
                                </div> 
                                <div>
                                    <label for="addressLine2">Address Line 2:&nbsp;</label>
                                    <input id="addressLine2" v-model="newOffice.addressLine2">
                                </div>  
                                <div>
                                    <label for="city">City:&nbsp;</label>
                                    <input id="city" v-model="newOffice.city">
                                </div>
                                <div>
                                    <label for="state">State:&nbsp;</label>
                                    <input id="state" v-model="newOffice.state">
                                </div> 
                                <div>
                                    <label for="zipCode">Zip Code:&nbsp;</label>
                                    <input id="zipCode" v-model="newOffice.zipCode">
                                </div><br/>  
                                <div>
                                    <b-btn :disabled="btnClicked" variant="success" type="submit">Create New Project</b-btn>   
                                </div>
                            </form>  -->
                                <div>
                                    <div
                                        v-for="address in addresses"
                                        :key="address.id"
                                    >
                                        <div
                                            v-if="
                                                address.addressType.name ==
                                                    'Main'
                                            "
                                        >
                                            <div>
                                                <strong>{{
                                                    address.addressType.name
                                                }}</strong>
                                            </div>
                                            <div>
                                                Address Line 1:
                                                {{ address.addressLine1 }}
                                            </div>
                                            <div>
                                                Address Line 2:
                                                {{ address.addressLine2 }}
                                            </div>
                                            <div>City: {{ address.city }}</div>
                                            <div>
                                                State: {{ address.state }}
                                            </div>
                                            <div>
                                                Zip Code: {{ address.zipCode }}
                                            </div>
                                            <div>
                                                Country: {{ address.country }}
                                            </div>
                                            <hr />
                                        </div>
                                        <div
                                            v-if="
                                                address.addressType.name !=
                                                    'Main'
                                            "
                                        >
                                            <div>
                                                <strong>{{
                                                    address.addressType.name
                                                }}</strong>
                                            </div>
                                            <div>
                                                Address Line 1:{{
                                                    address.addressLine1
                                                }}
                                            </div>
                                            <div>
                                                Address Line 12{{
                                                    address.addressLine2
                                                }}
                                            </div>
                                            <div>City: {{ address.city }}</div>
                                            <div>
                                                State: {{ address.state }}
                                            </div>
                                            <div>
                                                Zip Code: {{ address.zipCode }}
                                            </div>
                                            <div>
                                                Country: {{ address.country }}
                                            </div>
                                            <hr />
                                        </div>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        </b-tab>
                        <b-tab title="Office Users">
                            <div>
                                <router-link :to="'/clientInviteUser'"
                                    >Invite New User</router-link
                                >
                            </div>
                            <br />
                            <div v-for="user in users" :key="user.id">
                                <div>First Name:{{ user.firstName }}</div>
                                <div>Last Name:{{ user.lastName }}</div>
                                <div>Phone:{{ user.phoneNumber }}</div>
                                <hr />
                            </div>
                        </b-tab>
                    </b-tabs>
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
    name: 'manageClientOffice',
    data() {
        return {
            errors: [],
            showCreateOffice: true,
            officeId: '',
            addresses: [],
            users: [],
            office: null,
            items: [
                {
                    text: 'Client Home',
                    to: { name: 'clientHome' },
                },
                {
                    text: 'Client Offices',
                    to: { name: 'clientOffices' },
                },
                {
                    text: 'Manage Office',
                    active: true,
                },
            ],
        };
    },
    methods: {
        fetchOffice() {
            this.isLoading = true;
            new AccountProxy()
                .getOffice(this.officeId)
                .then(response => {
                    this.office = response.accountOffice;
                    this.addresses = response.addressList;
                    this.users = response.userList;
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
        this.officeId = this.$route.params.officeId;
        localStorage.setItem('account_office_id', this.officeId);
        //console.info("test : " + localStorage.getItem("account_office_id"));
        this.fetchOffice();
    },
};
</script>
