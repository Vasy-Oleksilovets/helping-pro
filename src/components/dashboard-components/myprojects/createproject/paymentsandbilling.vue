<template>
    <div>          
        <div class="text-center title-font mt-3">Payments & Billing</div>
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
            <b-col sm="9">
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
            <b-button class="cancel-btn-style mr-4" v-b-modal.modal-center>Cancel</b-button>    
            <div>
                <b-button v-if="!validate()" class="next-btn-style">Create Project</b-button>
                <b-button v-else v-b-modal.modal-xl @click="createProject" class="next-btn-style">Create Project</b-button>
            </div>
        </div>
    </div>
</template>
<script>
import moment from 'moment'
import VueMonthlyPicker from 'vue-monthly-picker'
export default {
    name: 'PaymentsAndBilling',
    components: {
        VueMonthlyPicker
    },
    props: [],
    data() {
        return {
            purchase_file: null,
            order_file: null,
            payment_method: 'task'
        };
    },
    methods: {
        validate(){
            if(this.payment_method==="") return false;
            else return true;
        },
        createProject() {
            this.$emit('createProject', true);
        },
        updatePayment(){
            this.$emit('addedPayment', this.payment_method);
        }
    },
    created() {},
    watch: {
    },
};
</script>

<style scoped>

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
