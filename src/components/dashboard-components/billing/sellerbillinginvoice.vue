<template>
    <div class="billing-invoice">
        <b-row class="no-gutters table-header">
            <b-col class="heavy-font">Billing</b-col>
        </b-row>
        
        <div class="no-gutters table-all card-component pl-2" style="vertical-align: middle">

            <!-- this is the card section -->
            <div class="card-section pt-4 ml-4">
                <b-row class="no-gutters mt-4 heavy-font">
                    <b-col>Choose a payment option and fill out the appropriate information</b-col>
                </b-row>
                <b-row v-if="role === 6 || role === 4 || role ===5" class="bottom-line pb-4 mr-3 pr-3">
                    <b-col cols="12" sm="9">
                        <b-row>
                            <b-col sm="6" v-if="card_info.length == 0" class="heavy-font mt-4">Credit or debit cards</b-col>
                            <b-col sm="6" v-if="card_info.length > 0" class="heavy-font mt-4">Your credit or debit cards</b-col>
                            <b-col sm="4" v-if="card_info.length > 0" class="mt-4">
                                Name on card
                            </b-col>
                            <b-col sm="2" v-if="card_info.length > 0"></b-col>
                        </b-row>
                        <b-row class="no-gutters mt-4 align-items-center" v-for="card in card_info" v-bind:key="card.id" v-bind:value="card">
                            <b-col sm="6" class="d-flex align-items-center">
                                <b-form-radio
                                    v-model="billing_option" 
                                    name="bank-selection" 
                                    :value="card"
                                    style="margin: 6px; padding: 0px;" 
                                ></b-form-radio>
                                <img
                                    v-if="card.type == 'Discover'"
                                    class="img-size"
                                    style="margin-left: 5px"
                                    width="64px"
                                    alt="Vue logo"
                                    src="~@/assets/img/Discover_billing_logo.png"
                                />
                                <img
                                    v-if="card.type == 'American Express'"
                                    class="img-size"
                                    style="margin-left: 5px"
                                    width="64px"
                                    alt="Vue logo"
                                    src="~@/assets/img/Amex_billing_logo.png"
                                />
                                <img
                                    v-if="card.type == 'Diners Club'"
                                    class="img-size"
                                    style="margin-left: 5px"
                                    width="64px"
                                    alt="Vue logo"
                                    src="~@/assets/img/DinersClub_billing_logo.png"
                                />
                                <img
                                    v-if="card.type == 'JCB'"
                                    class="img-size"
                                    style="margin-left: 5px"
                                    width="64px"
                                    alt="Vue logo"
                                    src="~@/assets/img/JCB_billing_logo.png"
                                />
                                <img
                                    v-if="card.type == 'Mastercard'"
                                    class="img-size"
                                    style="margin-left: 5px"
                                    width="64px"
                                    alt="Vue logo"
                                    src="~@/assets/img/Mastercard_billing_logo.png"
                                />
                                <img
                                    v-if="card.type == 'Visa'"
                                    class="img-size"
                                    style="margin-left: 5px"
                                    width="64px"
                                    alt="Vue logo"
                                    src="~@/assets/img/Visa_billing_logo.png"
                                />
                                <span class="heavy-font ml-3" style="min-width: 100px">{{ card.type }} Card</span>
                                <span class="ml-3">ending {{ card.last_four }}</span>
                            </b-col>
                            <b-col sm="4" class="heavy-font pl-3">
                                {{ card.name_on_card }}
                            </b-col>
                            <b-col sm="2" class="pl-2 heavy-font">
                                {{ card.expiration_date }}
                            </b-col>                
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-button v-b-modal.modal-xl class="btn-style mt-4">Add a card</b-button>
                            </b-col>
                        </b-row>
                    </b-col>
                    <b-col cols="12" sm="3" class="card-style">
                        <div class="card-sub-style">
                            <b-row class="justify-content-end">
                                <img
                                    class="img-size"
                                    style="margin: 5px"
                                    width="64px"
                                    alt="Vue logo"
                                    src="~@/assets/img/Visa_billing_logo.png"
                                />
                                <img
                                    class="img-size"
                                    style="margin: 5px"
                                    width="64px"
                                    alt="Vue logo"
                                    src="~@/assets/img/Mastercard_billing_logo.png"
                                />
                                <img
                                    class="img-size"
                                    style="margin: 5px"
                                    width="64px"
                                    alt="Vue logo"
                                    src="~@/assets/img/Amex_billing_logo.png"
                                />
                            </b-row>
                            <b-row class="justify-content-end">
                                <img
                                    class="img-size"
                                    style="margin: 5px"
                                    width="64px"
                                    alt="Vue logo"
                                    src="~@/assets/img/JCB_billing_logo.png"
                                />
                                <img
                                    class="img-size"
                                    style="margin: 5px"
                                    width="64px"
                                    alt="Vue logo"
                                    src="~@/assets/img/Discover_billing_logo.png"
                                />
                                <img
                                    class="img-size"
                                    style="margin: 5px"
                                    width="64px"
                                    alt="Vue logo"
                                    src="~@/assets/img/DinersClub_billing_logo.png"
                                />
                            </b-row>
                        </div>
                    </b-col>
                </b-row>
            </div>
            <!-- card section ended -->
           
        

            <b-row class="no-gutters ml-4 mr-4 pb-4 bottom-line">
                <b-col>
                    <div v-if="paypal_info.length == 0" class="mt-4 heavy-font">PayPal</div>
                    <div v-if="paypal_info.length > 0" class="mt-4 heavy-font">Your PayPal account</div>
                    
                    <b-row class="mt-4 align-items-center no-gutters" style="margins:0px;">
                        <b-col v-if="paypal_info.length > 0"  lg="4">
                            <b-form-radio
                                v-model="billing_option" 
                                name="bank-selection"
                                style="margin: 6px; padding: 0px;" 
                            >
                                Pay now with PayPal
                            </b-form-radio>
                        </b-col>
                        <b-col v-if="paypal_info.length > 0">
                            <img
                                class="img-size paypal-button"
                                
                                width="150px"
                                alt="Vue logo"
                                src="~@/assets/img/Paypal_billing_button.png"
                            />
                        </b-col>

                    </b-row>                        

                    <b-button v-b-modal.modal-xl2 class="btn-style mt-4">Link PayPal card</b-button>
                </b-col>
                <b-col class="mt-4">
                    
                            <img
                                class="img-size billing-image"
                                style="margin-left: 5px"
                                width="64px"
                                alt="Vue logo"
                                src="~@/assets/img/PayPal_billing_logo.png"
                            />
                        
                </b-col>
            </b-row>

            <b-row class="no-gutters ml-4 mr-4 mb-4 pb-4 bottom-line">
                <b-col lg="10">
                    <b-row>
                        <b-col lg="6" v-if="banking_info.length == 0" class="mt-5 heavy-font">Checking accounts</b-col>
                        <b-col lg="5" v-if="banking_info.length > 0" class="mt-5 heavy-font">Your personal checking account</b-col>

                        <b-col lg="4" v-if="banking_info.length > 0" class="mt-5 p-0">Name on account</b-col>
                    </b-row>

                    <b-row class="no-gutters mt-4" v-for="bank in banking_info" v-bind:key="bank.id" v-bind:value="bank">    
                        <b-col lg="2">
                            <b-form-radio
                                v-model="billing_option" 
                                name="bank-selection" 
                                :value="bank"
                                style="margin: 6px; padding: 0px;" 
                            >{{ bank.bank }}, {{ bank.territory }}, {{ bank.state }}</b-form-radio>
                        </b-col>
                        <b-col lg="3">
                            ending {{ bank.last_four }}
                        </b-col>
                        <b-col lg="3" class="heavy-font">
                            {{ bank.accnt_holder }}
                        </b-col>
                    </b-row>

                    <b-button v-b-modal.modal-xl3 class="btn-style mt-4">Add bank accounts</b-button>
                </b-col>
                <b-col lg="2" class="flex-container flex-end">
                    <img
                        class="img-size billing-image"
                        width="64px"
                        alt="Vue logo"
                        src="~@/assets/img/bank-account_billing_logo.png"
                    />   
                </b-col>
            </b-row>
            <b-modal id="modal-xl" size="xl" centered title="Extra Large Modal">
                <template v-slot:modal-header="{ close }">
                    <!-- Emulate built in modal header close button action -->
                    <h6> Add a credit or debit card</h6>
                    <img
                        @click="close(), acceptClose()"
                        role="button"
                        alt="image"
                        src="~@/assets/img/small-icons/small-modal-remove.png"
                    />
                </template>
                <div class="modal-custom-content">
                    <b-row>
                        <b-col>
                            <b-row class="mt-2 align-items-center">
                                <b-col sm="4" class="heavy-font">Card number</b-col>
                                <b-col sm="5"><b-form-input v-model="card_number"></b-form-input></b-col>
                            </b-row>
                            <b-row class="mt-2 align-items-center">
                                <b-col sm="4" class="heavy-font">Name on card</b-col>
                                <b-col sm="5"><b-form-input v-model="name_on_card"></b-form-input></b-col>
                            </b-row>
                            <b-row class="mt-2 align-items-center">
                                <b-col sm="4" class="heavy-font">Expiration date</b-col>
                                <b-col sm="5"> 
                                    <vue-monthly-picker
                                        v-model="selectedMonth">
                                    </vue-monthly-picker>
                                </b-col>
                            </b-row>
                            <b-row class="mt-2 align-items-center">
                                <b-col sm="4" class="heavy-font">CVC</b-col>
                                <b-col sm="2"><b-form-input v-model="cvc_on_card"></b-form-input></b-col>
                            </b-row>
                            <b-row v-if="role === 7 || role === 8" class="mt-2">
                                <b-col sm="6" offset-sm="4">
                                    <b-form-checkbox
                                        id="checkbox-1"
                                        v-model="status"
                                        name="checkbox-1"
                                        value="accepted"
                                        unchecked-value="not_accepted"
                                        >
                                        Set as default payment method
                                    </b-form-checkbox>
                                </b-col>
                            </b-row>
                            
                        </b-col>
                        <b-col class="pr-5">
                            <b-row class="justify-content-end">
                                <img
                                    @click="clickCardType('Visa')"
                                    :class="{'img-size': true, 'active': (card_type=='Visa')}"
                                    style="margin: 5px"
                                    width="64px"
                                    alt="Vue logo"
                                    src="~@/assets/img/Visa_billing_logo.png"
                                />
                                <img
                                    @click="clickCardType('Mastercard')"
                                    :class="{'img-size': true, 'active': (card_type=='Mastercard')}"
                                    style="margin: 5px"
                                    width="64px"
                                    alt="Vue logo"
                                    src="~@/assets/img/Mastercard_billing_logo.png"
                                />
                                <img
                                    @click="clickCardType('American Express')"
                                    :class="{'img-size': true, 'active': (card_type=='American Express')}"
                                    class="img-size"
                                    style="margin: 5px"
                                    width="64px"
                                    alt="Vue logo"
                                    src="~@/assets/img/Amex_billing_logo.png"
                                />
                            </b-row>
                            <b-row class="justify-content-end">
                                <img
                                    @click="clickCardType('JCB')"
                                    :class="{'img-size': true, 'active': (card_type=='JCB')}"
                                    style="margin: 5px"
                                    width="64px"
                                    alt="Vue logo"
                                    src="~@/assets/img/JCB_billing_logo.png"
                                />
                                <img
                                    @click="clickCardType('Discover')"
                                    :class="{'img-size': true, 'active': (card_type=='Discover')}"
                                    style="margin: 5px"
                                    width="64px"
                                    alt="Vue logo"
                                    src="~@/assets/img/Discover_billing_logo.png"
                                />
                                <img
                                    @click="clickCardType('Diners Club')"
                                    :class="{'img-size': true, 'active': (card_type=='Diners Club')}"
                                    style="margin: 5px"
                                    width="64px"
                                    alt="Vue logo"
                                    src="~@/assets/img/DinersClub_billing_logo.png"
                                />
                            </b-row>
                        </b-col>
                    </b-row>
                    <hr/>
                    <b-row v-if="role === 6 || role == 5">
                        <b-col>
                            <b-row class="mt-3 align-items-center">
                                <b-col sm="4" class="heavy-font">First name</b-col>
                                <b-col sm="5"><b-form-input v-model="billing_fn"></b-form-input></b-col>
                            </b-row>
                            <b-row class="mt-3 align-items-center">
                                <b-col sm="4" class="heavy-font">Last name</b-col>
                                <b-col sm="5"><b-form-input v-model="billing_ln"></b-form-input></b-col>
                            </b-row>
                            <b-row class="mt-3 align-items-center">
                                <b-col sm="4" class="heavy-font">Address</b-col>
                                <b-col sm="5"><b-form-input v-model="billing_addr" type="password"></b-form-input></b-col>
                            </b-row>
                            <b-row class="mt-3 align-items-center">
                                <b-col sm="4" class="heavy-font">City</b-col>
                                <b-col sm="5"><b-form-input v-model="billing_city" type="password"></b-form-input></b-col>
                            </b-row>
                            <b-row class="mt-3 align-items-center">
                                <b-col sm="4" class="heavy-font">State</b-col>
                                <b-col sm="3">
                                    <b-form-select v-model="billing_state">
                                        <option value="" disabled selected hidden>Select State</option>
                                        <option v-for="state in states" v-bind:key="state.name" v-bind:value="state.code">
                                            {{ state.name }}
                                        </option>
                                    </b-form-select>
                                </b-col>
                            </b-row>
                            <b-row class="mt-3 align-items-center">
                                <b-col sm="4" class="heavy-font">Zip Code</b-col>
                                <b-col sm="3"><b-form-input v-model="billing_zip" type="password"></b-form-input></b-col>
                            </b-row>
                            <b-row class="mt-2">
                                <b-col sm="6" offset-sm="4">
                                    <b-form-checkbox
                                        id="checkbox-2"
                                        v-model="status"
                                        name="checkbox-2"
                                        value="accepted"
                                        unchecked-value="not_accepted"
                                        >
                                        Set as default payment method
                                    </b-form-checkbox>
                                </b-col>
                            </b-row>                          
                        </b-col>
                        <b-col></b-col>
                    </b-row>

                </div>
                <hr/>
                <template v-slot:modal-footer="{ cancel, ok }">
                    <div>
                        <b-btn style="color: black; background-color: white; border-color: white; font-weight: bold" @click="ok()">Cancel</b-btn>
                        <b-btn style="background-color: #0C2340; border-radius: 3px" @click="cancel(), addCard()">Add your card</b-btn>
                    </div>
                </template>
            </b-modal>


            <!-- Modal for adding Paypal --> 
            <b-modal id="modal-xl2" size="xl" centered title="Extra Large Modal">
                <template v-slot:modal-header="{ close }">
                    <!-- Emulate built in modal header close button action -->
                    <h6 class="heavy-font">Connect with PayPal</h6>
                    <img
                        @click="close(), acceptClose()"
                        role="button"
                        alt="image"
                        src="~@/assets/img/small-icons/small-modal-remove.png"
                    />
                </template>
                <div class="modal-custom-content">
                    <b-row>
                        <b-col>
                            <b-row class="mt-2 align-items-center">
                                <b-col sm="4" class="heavy-font">Email</b-col>
                                <b-col sm="5"><b-form-input v-model="paypal_email"></b-form-input></b-col>
                            </b-row>
                            <b-row class="mt-2 align-items-center">
                                <b-col sm="4" class="heavy-font">Password</b-col>
                                <b-col sm="5"><b-form-input type="password" v-model="paypal_password"></b-form-input></b-col>
                            </b-row>
                            <b-row class="mt-2">
                                <b-col sm="6" offset-sm="4">
                                    <b-form-checkbox
                                        id="checkbox-3"
                                        v-model="stay_logged_in"
                                        name="checkbox-3"
                                        value="accepted"
                                        unchecked-value="not_accepted"
                                        >
                                        Stay logged in for faster checkout
                                    </b-form-checkbox>
                                </b-col>
                            </b-row>  
                        </b-col>
                        <b-col class="pr-5">
                            <b-row class="justify-content-end mt-4">
                                <img
                                class=""
                                style="margin-left: 5px"
                                width="64px"
                                alt="Vue logo"
                                src="~@/assets/img/PayPal_billing_logo.png"
                                />
                            </b-row>
                        </b-col>
                    </b-row>
                </div>
                <hr/>
                <template v-slot:modal-footer="{ cancel, ok }">
                    <div>
                        <b-btn style="color: black; background-color: white; border-color: white; font-weight: bold" @click="ok()">Cancel</b-btn>
                        <b-btn style="background-color: #0C2340; border-radius: 3px" @click="cancel(), addPayPal()">Sign In</b-btn>
                    </div>
                </template>
            </b-modal>

            <!-- Modal for adding Banking info --> 
            <b-modal id="modal-xl3" size="xl" centered title="Extra Large Modal">
                <template v-slot:modal-header="{ close }">
                    <!-- Emulate built in modal header close button action -->
                    <h6 class="heavy-font">Add a personal checking account</h6>
                    <img
                        @click="close(), acceptClose()"
                        role="button"
                        alt="image"
                        src="~@/assets/img/small-icons/small-modal-remove.png"
                    />
                </template>
                <div class="modal-custom-content">
                    <b-row class="no-gutters">
                        <b-col>
                            <b-row class="mb-4">
                                <b-col>
                                    <b-row class="mt-3 align-items-center">
                                        <b-col sm="4" class="heavy-font">Name on account</b-col>
                                        <b-col sm="5"><b-form-input v-model="bank_name_on_accnt"></b-form-input></b-col>
                                    </b-row>
                                    <b-row class="mt-3 align-items-center">
                                        <b-col sm="4" class="heavy-font">Bank routing number</b-col>
                                        <b-col sm="5"><b-form-input v-model="bank_routing"></b-form-input></b-col>
                                    </b-row>
                                    <b-row class="mt-3 align-items-center">
                                        <b-col sm="4" class="heavy-font">Checking account number</b-col>
                                        <b-col sm="5"><b-form-input v-model="bank_accnt_num" type="password"></b-form-input></b-col>
                                    </b-row>
                                    <b-row class="mt-3 align-items-center">
                                        <b-col sm="4" class="heavy-font">Re-enter checking account number</b-col>
                                        <b-col sm="5"><b-form-input v-model="bank_accnt_check" type="password"></b-form-input></b-col>
                                    </b-row>
                                    <b-row class="no-gutters" v-if="(bank_accnt_check !== '') && (submit_banking == false)"  style="color:red">
                                        Your account numbers do not match
                                    </b-row>
                                </b-col>
                                <b-col class="pr-5">
                                    <b-row class="mb-2">
                                        How to find bank routing and checking account numbers.
                                    </b-row>
                                    <b-row sm="8">
                                        <img
                                        class=""
                                        style=""
                                        width=""
                                        alt="Vue logo"
                                        src="~@/assets/img/bank-account-check-example_1.png"
                                        />
                                    </b-row>
                                    <b-row>
                                        <b-col sm="4">
                                            Bank routing number
                                        </b-col>
                                        <b-col sm="5">
                                            Checking account number
                                        </b-col>
                                    </b-row>
                                </b-col>
                            </b-row>
                            <b-row class="no-gutters">
                                By clicking on the continue button, I agree to the terms and conditions of using my checking account as a payment method, which are listed above, and authorize Construction Check to debit my checking account.
                            </b-row>
                        </b-col>
                    </b-row>
                </div>
                <hr/>
                <template v-slot:modal-footer="{ cancel, ok }">
                    <div>
                        <b-btn style="color: black; background-color: white; border-color: white; font-weight: bold" @click="ok()">Cancel</b-btn>
                        <b-btn v-if="bank_accnt_num == bank_accnt_check" style="background-color: #0C2340; border-radius: 3px" @click="checkAccntNum(), addBankInfo(), cancel()">Add this checking account</b-btn>
                        <b-btn v-if="bank_accnt_num !== bank_accnt_check" style="background-color: #0C2340; border-radius: 3px" @click="checkAccntNum(), addBankInfo()">Add this checking account</b-btn>
                    </div>
                </template>
            </b-modal>


        </div>
    </div>
</template>

<script>
import AddressProxy from '@/proxies/AddressProxy.js';
import VueMonthlyPicker from 'vue-monthly-picker'
import moment from 'moment'
export default {
    name: 'SellerBillingInvoice',
    props: ['role'],
    components: {
        VueMonthlyPicker
    },
    data() {
        return {
            billing_option: '',
            card_info: [
                
            ],
            paypal_info: [

            ],
            banking_info: [
            /*    {
                    accnt_holder: 'Bob Project Manager',
                    accnt_num: '1234578987654321',
                    bank_routing: "0987654321",
                    bank: 'PCS Bank USA',
                    territory: 'NA',
                    state: 'NY',
                    last_four: "4321",
                } */
            ],

            //Insert Card Information
            card_type: '',
            card_number: '',
            name_on_card: '',
            expiration_date: '',
            cvc_on_card: '',

            billing_fn: '',
            billing_ln: '',
            billing_addr: '',
            billing_city: '',
            billing_state: '',
            billing_zip: '',

            selectedMonth: moment(),

            // // Info for PayPal
            paypal_email: '',
            paypal_password: '',
            stay_logged_in: '',

            // // Info for Banking
            bank_name_on_accnt: '',
            bank_routing: '',
            bank_accnt_num: '',
            bank_accnt_check: '',
            submit_banking: true,

            // States
            states: [],
            
        }
    },
    methods: {
        clickCardType(type){
            this.card_type=type;
        },
        addCard(){
            const temp = {
                type: this.card_type,
                card_number: this.card_number,
                name_on_card: this.name_on_card,
                expiration_date: '01/2020',
                cvc: this.cvc_on_card,
                last_four: '5389',
                type: "Discover",

                first_name: this.billing_fn,
                last_name: this.billing_ln,
                Address: this.billing_addr,
                city: this.billing_city,
                state: this.billing_state,
                zip_code: this.billing_zip,
            }
            this.card_info.push(temp);
        },

        addPayPal(){
            const temp = {
                email: this.paypal_email,
                password: this.paypal_password,
                stay_logged_in: this.stay_logged_in,
            }
            this.paypal_info.push(temp);
        },

        addBankInfo(){
            if (this.submit_banking == true) {
                const temp = {
                    accnt_holder: this.bank_name_on_accnt,
                    bank_routing: this.bank_routing,
                    accnt_num: this.bank_accnt_num,
                    //bank_accnt_check: this.bank_accnt_check,
                    last_four: this.bank_accnt_num.substr(this.bank_accnt_num.length - 4),
                    bank: "Wachvovia USA",
                    state: "GA",
                    territory: "NA",
                };
                this.banking_info.push(temp);
            } 
        },

        checkAccntNum(){
            if (this.bank_accnt_num == this.bank_accnt_check) {
                this.submit_banking = true;
                //alert("we match");
            } else {
                this.submit_banking = false
                //alert("we dont match");
            }
        },
        cancel(){

        },
    },
    created() {
        new AddressProxy().getStates().then((response) => {
            this.states = response;
        })
    },
};
</script>

<style scoped>

.table-header {
    background-color: #061831;
    color: white;
    padding: 15px 30px 15px 30px;
}

.card-component {
    background-color: white;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    margin: 10px;
}

.btn-style {
    background-color: #0c2340;
    width: 140px;
    font-weight: normal;
    font-size: 10px;
    margin-right: 5px;
    border-radius: 3px;
    border: #0c2340;
    text-align: center;
}

.custom-text-center {
    display: flex;
    align-items: center;
}

.bottom-line {
    border-bottom: 1px solid #C9C9C9;
}

.billing-image {
    position:absolute;
    bottom:0;
    right:0;
}

.heavy-font {
    font-weight: bold;
}

.paypal-button {
    cursor: pointer;
}

.card-style {
    position: relative
}

.card-sub-style {
    position: absolute; 
    bottom: 0; 
    right: 20px
}

.active {
    border: 2px solid black;
}

@media (max-width: 482px) {
    .card-sub-style {
        position: relative; 
        bottom: 0; 
        right: 20px
    }
}

</style>
