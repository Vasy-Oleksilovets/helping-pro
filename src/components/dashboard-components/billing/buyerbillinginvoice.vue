<template>
    <div class="billing-invoice">
        <b-row class="no-gutters table-header">
            <b-col class="heavy-font">Billing</b-col>
        </b-row>
        <div class="no-gutters table-all card-component p-3" style="vertical-align: middle">
            <div class="font-weight-normal title-font mt-3">Please choose one of the following methods for Payments & Billing</div>
            <b-row class="mt-3"> 
                <b-col>
                    <b-row class="no-gutters mt-3">
                        <div class="d-flex align-items-center">
                            <b-form-radio v-model="payment_method" name="purchase_order" @select="updatePayment()" value="task"></b-form-radio>
                        </div>
                        <div class="title-font">Pay with Task Order</div>
                    </b-row>
                </b-col>
                <b-col class="d-flex justify-content-end align-items-end">
                </b-col>
            </b-row>
            <hr/> 
            <b-row class="mt-3"> 
                <b-col>
                    <b-row class="no-gutters mt-3">
                        <div class="d-flex align-items-center">
                            <b-form-radio v-model="payment_method" name="purchase_order" @input="updatePayment()" value="purchase"></b-form-radio>
                        </div>
                        <div class="title-font">Pay with Purchase Order</div>
                    </b-row>
                </b-col>
                <b-col class="d-flex justify-content-end align-items-end">
                </b-col>
            </b-row>
            <hr/> 
            <b-row class="mt-3">  
                <b-col sm="9" v-if="role === 4 || role === 5 || role === 6">
                    <b-row class="no-gutters">
                        <b-col>
                            <b-row class="no-gutters mt-3">
                                <div class="d-flex align-items-center">
                                    <b-form-radio v-model="payment_method" name="purchase_order" @input="updatePayment()" value="debit"></b-form-radio>
                                </div>
                                <div class="title-font">Pay by debit or credit card</div>
                            </b-row>
                        </b-col>
                    </b-row>
                </b-col>
                <b-col sm="3" class="d-flex justify-content-end">
                    <div>
                        <div class="mb-2">
                            <img 
                                class="mr-2"
                                alt="Visa Card Image"
                                src="~@/assets/img/Visa_billing_logo.png"
                            />
                            <img
                                class="mr-2"
                                alt="Master Card Image"
                                src="~@/assets/img/Mastercard_billing_logo.png"
                            />
                            <img
                                class="mr-2"
                                alt="Master Card Image"
                                src="~@/assets/img/Amex_billing_logo.png"
                            />
                        </div>
                        <div>
                            <img
                                class="mr-2"
                                alt="JCB Card Image"
                                src="~@/assets/img/JCB_billing_logo.png"
                            />
                            <img
                                class="mr-2"
                                alt="Discover Card Image"
                                src="~@/assets/img/Discover_billing_logo.png"
                            />
                            <img
                                class="mr-2"
                                alt="DinersClub Card Image"
                                src="~@/assets/img/DinersClub_billing_logo.png"
                            />
                        </div>
                    </div>
                </b-col>
            </b-row>
            <hr />
            <b-row class="mt-3"> 
                <b-col>
                    <b-row class="no-gutters mt-3">
                        <div class="d-flex align-items-center">
                            <b-form-radio v-model="payment_method" name="payment" @input="updatePayment()" value="paypal"></b-form-radio>
                        </div>
                        <div class="title-font">Pay now with paypal</div>
                    </b-row>
                </b-col>
                <b-col class="d-flex justify-content-end align-items-end">
                    <img 
                        class="mr-2"
                        alt="Visa Card Image"
                        src="~@/assets/img/PayPal_billing_logo.png"
                    />
                </b-col>
            </b-row>
            <hr/>
            <b-row class="mt-3 mb-5">  
                <b-col class="mt-3">
                    <b-row class="no-gutters">
                        <div class="d-flex align-items-center">
                            <b-form-radio v-model="payment_method" name="payment" @input="updatePayment()" value="bank"></b-form-radio>
                        </div>
                        <div class="title-font">Pay with bank account</div>
                    </b-row>
                </b-col>
                <b-col class="d-flex justify-content-end align-items-end">
                    <img 
                        class="mr-2"
                        alt="Visa Card Image"
                        src="~@/assets/img/bank-account_billing_logo.png"
                    />
                </b-col>
            </b-row>
            <b-row>
                <b-col class="d-flex justify-content-end">
                    <div style="color: red" v-if="!validate()">You must choose one of the following payments before moving on to the next page.</div>
                </b-col>
            </b-row>

            <hr/>

            <div class="btton-group d-flex justify-content-end">
                <div>
                    <b-button class="next-btn-style">Save Payment Option</b-button>
                </div>
            </div>


        </div>
    </div>
</template>

<script>

import VueMonthlyPicker from 'vue-monthly-picker'
import moment from 'moment'
export default {
    name: 'BuyerBillingInvoice',
    props: ['role'],
    components: {
        VueMonthlyPicker
    },
    data() {
        return {
            payment_method: 'task',
        }
    },
    methods: {
        validate(){
            if(this.payment_method==="") return false;
            else return true;
        },
        updatePayment(){
            this.$emit('addedPayment', this.payment_method);
        },
    }
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

.table-header {
    background-color: #061831;
    color: white;
    padding: 15px 30px 15px 30px;
    min-width: 1200px !important;
    height: 51px;
}

.content-card {
    margin: 20px;
    background-color: white;
    min-height: 80vh;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    border-radius: 3px;
    padding: 30px;
}

.round-icon {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    cursor: pointer;
}

.title-font {
    font-weight: 600;
    font-size: 16px;
}


.next-btn-style {
    background-color: #0C2340;
    border-radius: 3px;
    min-width: 150px;
}

.sub-btn-style {
    min-width: 200px;
    background-color: #0C2340;
    border-radius: 5px;
    padding: 8px 8px
}

.cancel-btn-style {
    background-color: white;
    border-color: white;
    color: black;
}

.standard-color {
    background-color:#0C2340
}

.grey-color {
    background-color: #C4C4C4;
}

.create-project-estimate {
    padding: 1% 5%;
}

</style>
