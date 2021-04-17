<template>
    <div class="adminClients">
        <!-- <Navigation /> -->
        <main class="bg-img content">
            <!-- <hr style="background-color:#ed6d3a; height:4px" />
            <b-breadcrumb :items="items"></b-breadcrumb> -->
            <section class="secWhite secValidate">
                <div class="text-center">
                    <button @click="changeUser('client')" :class="{'active': (selected==='client'), 'tab-button': true}">Invite Clients</button>
                </div>
                <div class="text-center">
                    <button @click="changeUser('estimator')" :class="{'active': (selected==='estimator'), 'tab-button': true, 'mt-2': true}">Invite Professionals</button>
                </div>
                <div class="sub-title text-dark">Enter email to send an invitation link.</div>
                <div v-for="(item, index) in invitePerson" :key="item.ID" class="total-block" style="position: relative">
                    <div>
                        <b-icon v-if="index>0" role="button" @click="deleteUser(index)" style="position: absolute; top: 10px; right: -10px" icon="x-circle" scale="1.5" variant="danger"></b-icon>
                    </div>
                    <div class="d-flex">
                        <div>
                            <div class="input-group">
                                <div class="input-item d-flex align-items-center" style="margin-right: 4%">
                                    <b-form-input v-model="item.firstname" style="margin-right: 2%" class="input-style" placeholder="First Name"></b-form-input>
                                    <b-form-input v-model="item.lastname" class="input-style" placeholder="Last Name"></b-form-input>
                                    <b-icon style="opacity: 0.8" icon="person-fill" scale="1.5"></b-icon>
                                </div>
                                <div class="input-item d-flex align-items-center">
                                    <b-form-input v-model="item.email" class="input-style" placeholder="Enter Email"></b-form-input>
                                    <b-icon style="opacity: 0.8" icon="envelope-fill" scale="1.5"></b-icon>
                                </div>
                            </div>
                        
                            <div v-if="user_role === 4" class="input-group">
                                <div class="input-item d-flex align-items-center"  style="margin-right: 4%">
                                    <b-form-select v-model="item.uniqueOfficeID">
                                        <option value="" disabled>Select Unique Office ID</option>
                                        
                                    </b-form-select>
                                </div>
                                <div class="input-item d-flex align-items-center  justify-content-between">
                                    <b-form-select v-model="item.user_role">
                                        <option value="" disabled>User role</option>
                                        <option value="Office Manager">
                                            Office Manager
                                        </option>
                                        <option value="Office Manager">
                                            Project Manager
                                        </option>
                                        <option value="Client Administrator">
                                            Client Administrator
                                        </option>
                                    </b-form-select>
                                </div>
                            </div>
                            <div v-if="user_role === 4" class="input-group">
                                <div class="input-item d-flex align-items-center  justify-content-between" style="margin-right: 4%">
                                    <b-form-select v-model="item.state" @change="stateChanged(item)">
                                        <option value="" disabled>Select State</option>
                                        <option v-for="state in states" v-bind:key="state.name" v-bind:value="state.code">
                                            {{ state.name }}
                                        </option>
                                    </b-form-select>
                                </div>

                                <autocomplete
                                    v-model="item.city"
                                    :state="item.state"
                                    :disabled="
                                        item.state===''
                                    "
                                />
                                
                                <!-- <div class="input-item d-flex align-items-center">
                                    <b-form-select v-model="item.city">
                                        <option value="" disabled>Select City</option>
                                        <option v-for="city in item.cities" v-bind:key="city.name" v-bind:value="city.name">
                                            {{ city.name }}
                                        </option>
                                    </b-form-select>
                                </div> -->
                            </div>
                        </div>
                    </div>
                    <div class="font-weight-bold text-dark mt-2" role="button" @click="addInvitePerson">+ Invite another user</div>
                    <button class="btn-style mt-3" @click="invitationSend(item)">Send Invite</button>
                    <hr/>
                </div>
                <div class="table-block">
                    <div class="font-weight-bold table-header">Invitation Sent</div>
                    <div class="ml-2 mt-3 table-body">
                        <b-row class="mb-1 align-items-center">
                            <b-col sm="4">Varan Sahi</b-col>
                            <b-col sm="5">varun.sahi3425@gmail.com</b-col>
                            <b-col sm="3">
                                <div class="status-sub">Subscribed</div>
                            </b-col>
                        </b-row>
                        <b-row class="mb-1 align-items-center">
                            <b-col sm="4">Priyanka shrivastav</b-col>
                            <b-col sm="5">priyanka.shri1987@gmail.com</b-col>
                            <b-col sm="3">
                                <div class="status-sub">Subscribed</div>
                            </b-col>
                        </b-row>
                        <b-row class="mb-1 align-items-center">
                            <b-col sm="4">Amit kumar chaurasiya</b-col>
                            <b-col sm="5">amit.chourasyia@gmail.com</b-col>
                            <b-col sm="3">
                                <div class="status-await">Awaiting</div>
                            </b-col>
                        </b-row>
                    </div>
                </div>
                <!-- <div class="container text-center">
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
                            <b-btn
                                :disabled="btnClicked"
                                variant="success"
                                type="submit"
                                >Send Invite Email</b-btn
                            >
                        </form>
                    </div>
                    <div>{{ serverMessage }}</div>
                    <p></p>
                </div> -->
                <hr />
                <div class="container text-left">
                    <div>
                        <b-btn type="button" @click.prevent="showMore"
                            >Load Last 25 Invitation Results</b-btn
                        >
                        <!--<a href="#" @click.prevent="showMore">Load Last 25 Invitation Results</a>-->
                    </div>
                    <br />
                    <div>
                        <table cellpadding="10" border="1">
                            <tr>
                                <th>Email</th>
                                <th>Expired</th>
                                <th>Expires</th>
                                <th>Invited By</th>
                                <th>Account Name</th>
                                <th>Action</th>
                            </tr>
                            <tr
                                v-for="invite in invites"
                                :key="'ENT' + invite.inviteCode"
                            >
                                <td>{{ invite.emailAddress }}</td>
                                <td>{{ invite.expired }}</td>
                                <td>{{ invite.expires }}</td>
                                <td>{{ invite.invitedByUser }}</td>
                                <td>{{ invite.accountName }}</td>
                                <td v-if="invite.resend == true">
                                    <a href="#" @click.prevent="resend(invite)"
                                        >Send New Invite</a
                                    >
                                </td>
                                <td v-else>N/A</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </section>
        </main>
        <!-- <footer>
            <div class="container text-center">
                <a href="#" title="">
                    <img src="~@/assets/img/logoWhite.png" alt="" />
                </a>
                <p>Copyright, 2019 Construction Check. All Rights Reserved.</p>
            </div>
        </footer> -->
    </div>
</template>

<script>
import AccountProxy from '@/proxies/AccountProxy.js';
import AdminProxy from '@/proxies/AdminProxy.js';
import Navigation from '@/components/Navigation.vue';
import { BIcon, BIconPersonFill, BIconEnvelopeFill, BIconXCircle } from 'bootstrap-vue'

export default {
    name: 'estimate',
    components: {
        BIcon,
        BIconPersonFill,
        BIconEnvelopeFill,
        BIconXCircle,
        Navigation: Navigation
    },
    data() {
        return {
            errors: [],
            invites: [],
            emailAddress: '',
            btnClicked: false,
            serverMessage: '',
            invitePerson:[{
                ID: 1,
                firstname: '',
                lastname: '',
                email: '',
                state: '',
                uniqueOfficeID: '',
                user_role:'',
                cities: []
            }],
            items: [
                {
                    text: 'Admin Home',
                    to: { name: 'adminHome' },
                },
                {
                    text: 'Client Invites',
                    active: true,
                },
            ],
            user_role: '',
            selected: 'client'
        };
    },
    methods: {
        verifyEmail() {
            if (!this.emailAddress) {
                this.errors.push('Email required.');
            } else if (!this.validEmail(this.emailAddress)) {
                this.errors.push('Valid email required.');
            }

            if (!this.errors.length) {
                this.errors = [];
                //this.btnClicked = true;
                var params = new URLSearchParams();
                params.append('emailAddress', this.emailAddress);
                new AccountProxy()
                    .verifyEmailAddress(params)
                    .then(response => {
                        if (response.status == '200') {
                            this.serverMessage = response.data;
                            this.btnClicked = false;
                            this.emailAddress = '';
                        } else {
                            this.serverMessage = response.data;
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
        showMore: function() {
            new AdminProxy()
                .getInviteEmailList('')
                .then(response => {
                    if (response.status == '200') {
                        this.invites = response.data;
                        this.serverMessage = '';
                    } else {
                        this.serverMessage = response.data;
                    }
                })
                .catch(e => {
                    this.errors.push(e);
                });
        },
        resend: function(inv) {
            var params = new URLSearchParams();
            params.append('inviteCode', inv.inviteCode);
            new AdminProxy()
                .resendInvite(params)
                .then(response => {
                    if (response.status == '200') {
                        this.invites = response.data.verifyEmailsResponses;
                        this.serverMessage = response.data.message;
                    } else {
                        this.serverMessage = response.data;
                    }
                })
                .catch(e => {
                    this.errors.push(e);
                });
        },
        addInvitePerson(){
            this.invitePerson.push({
                ID: this.invitePerson.length + 1,
                firstname: '',
                lastname: '',
                email: '',
                state: '',
                city: '',
                cities: []
            })
        },
        deleteUser(index){
            this.invitePerson.splice(index, 1);
        },
        changeUser(user){
            this.selected = user;
        }
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

<style lang="css" scoped>
.invite {
    margin: 30px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    background-color: white;
    padding-bottom: 5%;
}
.title-text{
    padding: 4% 20% 1% 20%;
    text-align: center;
    font-size: 25px;
    font-weight: bold;
}
.sub-title {
    font-size: 16px;
    font-weight: 700;
    text-align: center;
}
.input-group {
    display: flex;
    margin-top: 2%;
}
.input-item {
    width: 48%;
}
.input-style {
    border: 0px;
    background-color:white;
    border-bottom: 1px solid grey;
    width: 100%;
};

.input-style:focus {
    background-color: yellow;
}

.total-block {
    max-width: 640px;
    margin: 0 auto;
}

.table-block {
    max-width: 660px;
    margin: 0 auto;
}

.btn-style {
    background-color: #0c2340;
    color: white;
    padding: 5px 20px;
    border-radius: 5px;
    border: 0px;
}

.table-header {
    font-size: 16px;
}

.table-body {
    font-weight: 500;
    font-size: 13px;
}

.status-sub {
    background-color: #e8fef0;
    overflow: hidden;
    padding: 5px 10px;
    border-radius: 10px;
    text-align: center;
    color: #71cb95;
}

.status-await {
    background-color: #fef5e6;
    overflow: hidden;
    padding: 5px 10px;
    border-radius: 10px;
    text-align: center;
    color: #eab761;
}

.secWhite {
    background: white;
    margin: 20px;
}

.tab-button {
    padding: 10px;
    min-width: 200px;
    transition: 1s all;
}

.active {
    background-color: #0C2340;
    color: white;
    transition: 1s all;
    border-color: #0C2340;
}

</style>
