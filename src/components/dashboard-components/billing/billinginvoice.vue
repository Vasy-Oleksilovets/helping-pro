<template>
  <div>
    <DashHeader :role="role" :profile="profile"/>
    <BuyerBillingInvoice :role="role" v-if="role === 6 || role === 4 || role === 5"/>
    <SellerBillingInvoice :role="role" v-if="role === 3 || role === 7 || role === 8"/>
  </div>
</template>

<script>
import DashHeader from '../dash-header';
import BuyerBillingInvoice from './buyerbillinginvoice';
import SellerBillingInvoice from './sellerbillinginvoice';
import VueMonthlyPicker from 'vue-monthly-picker'
export default {
  name: 'Invoice',
  props: ['role'],
  components: {
    DashHeader,
    VueMonthlyPicker,
    BuyerBillingInvoice,
    SellerBillingInvoice
  },
  props: ['role', 'profile'],
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
