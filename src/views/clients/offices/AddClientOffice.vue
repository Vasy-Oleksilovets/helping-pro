<template>
    <div class="addClientOffice">
        <Navigation />
        <main class="bg-img content">
            <h4>Manage Office</h4>
            <hr style="background-color:#ed6d3a; height:4px" />
            <b-breadcrumb :items="items"></b-breadcrumb>
            <section class="secWhite secValidate">
                <div class="container text-left">
                    <span><strong>New Office</strong></span
                    ><br /><br />
                    <div>
                        <form @submit.prevent="checkOfficeForm">
                            <div>
                                <label for="addressLine1"
                                    >Address Line 1:&nbsp;</label
                                >
                                <input
                                    id="addressLine1"
                                    v-model="newOffice.addressLine1"
                                />
                            </div>
                            <div>
                                <label for="addressLine2"
                                    >Address Line 2:&nbsp;</label
                                >
                                <input
                                    id="addressLine2"
                                    v-model="newOffice.addressLine2"
                                />
                            </div>
                            <div>
                                <label for="city">City:&nbsp;</label>
                                <input id="city" v-model="newOffice.city" />
                            </div>
                            <div>
                                <label for="state">State:&nbsp;</label>
                                <input id="state" v-model="newOffice.state" />
                            </div>
                            <div>
                                <label for="zipCode">Zip Code:&nbsp;</label>
                                <input
                                    id="zipCode"
                                    v-model="newOffice.zipCode"
                                />
                            </div>
                            <br />
                            <div>
                                <b-btn
                                    :disabled="btnClicked"
                                    variant="success"
                                    type="submit"
                                    >Create New Office</b-btn
                                >
                            </div>
                        </form>
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
    name: 'addClientOffice',
    data() {
        return {
            errors: [],
            showCreateOffice: true,
            newOffice: {},
            officeId: '',
            office: null,
            btnClicked: false,
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
                    text: 'Add Client Office',
                    active: true,
                },
            ],
        };
    },
    methods: {
        saveOffice() {
            this.isLoading = true;
            new AccountProxy()
                .saveOffice(this.newOffice)
                .then(response => {
                    this.newOffice = response;
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
        checkOfficeForm: function(e) {
            if (!this.newOffice.addressLine1) {
                this.errors.push('Address line one required.');
            }
            if (!this.newOffice.city) {
                this.errors.push('City required.');
            }
            if (!this.newOffice.state) {
                this.errors.push('State required.');
            }
            if (!this.newOffice.zipCode) {
                this.errors.push('Zip code required.');
            }
            if (this.errors.length == 0) {
                this.btnClicked = true;
                this.saveOffice();
            }
            e.preventDefault();
        },
    },
    components: {
        Navigation: Navigation,
    },
    mounted() {
        //this.officeId = this.$route.params.officeId;
        //this.fetchOffice();
    },
};
</script>
