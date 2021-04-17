<template>
  <div class="adminListProjects">
    <!-- <Navigation /> -->
    <main class="bg-img content">
      <!-- <hr style="background-color:#ed6d3a; height:4px" />
      <b-breadcrumb :items="items"></b-breadcrumb> -->
      <section class="secWhite secValidate">
        <!-- <div class="container text-center">
          <div>
                <select v-model="selected" class="form-control" @change="accountChange($event)">
                    <option v-for="account in accounts" :value="account.accountCode" v-text="account.companyName" :key="account.accountCode + '1'"></option>
                </select>
          </div>

          <div class="container text-left">
              <br/>
              <hr/>

              <div v-if="this.selectedAccount != null">
                  <div>Name: {{selectedAccount.account.companyName}}</div>
                  <div>Account Type: {{selectedAccount.accountType}}</div>
                  <div>Active Projects: {{selectedAccount.numActiveProjects}}</div>
                  <div>Account Offices: {{selectedAccount.numAccountOffices}}</div>
              </div>

          </div>
          <p></p>
        </div>
        <div class="container text-left alert-danger">
            <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                <li v-for="(error, idx) in errors" :key="idx">{{ error }}</li>
                </ul>
            </p>
        </div> -->
        <div v-if="is_detail_page" style="background: white; margin: 10px 10px; padding: 10px 20px">
            <div class="text-center" style="font-size: 20px">All Business Signup</div>
            <b-table class="mt-2" :items="items1" :fields="fields" responsive thClass="border-top-0" style="min-height: 40vh">
                <template v-slot:table-colgroup="scope">
                    <col
                        v-for="field in scope.fields"
                        :key="field.key"
                        :style="{ width: '14%' }"
                    >
                </template>
                <template v-slot:head(location)>
                <b-dropdown
                    variant="primary"
                    size="lg"
                    style="background-color: white !important"
                    id="dropdown-1"
                    text="Location"
                >
                    <b-form-input
                        v-model="search_key_location"
                        v-on:keyup="detect_change_filter"
                        placeholder="Search city"
                        style="width: 90%; margin-left: 5%"
                    ></b-form-input>
                    <b-dropdown-item @click="filter_by_location('All')">All</b-dropdown-item>
                    <b-dropdown-item
                        v-for="state in states"
                        :key="state.name"
                        @click="filter_by_location(state.name)"
                        >{{ state.name }}</b-dropdown-item
                    >
                </b-dropdown>
                </template>
                <template v-slot:cell(button)="row">
                    <b-button
                        class="button-type rounded"
                        @click="gotoDetal(row)"
                        >View More</b-button
                    >
                </template>
                <template v-slot:cell(total_projects)="row">
                    <div class="text-center">{{row.value}}</div>
                </template>
                    <template v-slot:cell(client_id)="row">
                    <div class="text-center">{{row.value}}</div>
                </template>
                    <template v-slot:cell(projects_completed)="row">
                    <div class="text-center">{{row.value}}</div>
                </template>
                
                <template v-slot:head(name)>
                    <div class="title-center">Company Name</div>
                </template>
                <template v-slot:head(total_projects)="row">
                    <div class="text-center">{{row.label}}</div>
                </template>
                <template v-slot:head(client_id)="row">
                    <div class="text-center">{{row.label}}</div>
                </template>
                    <template v-slot:head(projects_completed)="row">
                    <div class="text-center">{{row.label}}</div>
                </template>
                <template v-slot:head(button)>
                    <div class="title-font"></div>
                </template>
            </b-table>
        </div>
        <div v-else style="background: white; margin: 10px 10px; padding: 10px 20px">
            <b-button
                class="button-type rounded"
                @click="goBack(row)"
                >Back</b-button
            >
            <ExtraProfile  :role="passingData"/>
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
import AdminProxy from '@/proxies/AdminProxy.js';
import Navigation from "@/components/Navigation.vue";
import AddressProxy from '@/proxies/AddressProxy.js';
import ExtraProfile from '../../../components/dashboard-components/myprofile/extraprofile';
export default {
  name: "estimate",
  data() {
    return {
      errors: [],
      selected: '',
      accounts:{},
      account: {},
      selectedAccount:null,
      items: [
          {
              text: 'Admin Home',
              to: { name: 'adminHome' }
          },
          {
              text: 'Search Clients',
              active: true
          }
      ],
      fields: [
        {
            key: 'name',
            sortable: false,
        },
        {
            key: 'location',
            sortable: false,
        },
        {
            key: 'client_id',
            sortable: false
        },
        {
            key: 'total_projects',
            sortable: false
        },

        {
            key: 'button',
            sortable: false
        },
      ],
      items1: [
        { name: 'Google Healthcare', location: 'Alabama', client_id: 'AI_GA_001', total_projects: 2},
        { name: 'Atlanta Airport', location: 'Alabama', client_id: 'AI_GA_002', total_projects: 3 },
        { name: 'NewYork Station', location: 'Alabama', client_id: 'AI_GA_003' , total_projects: 4},
        { name: 'ABC Hospital', location: 'Alabama', client_id: 'AI_GA_004' , total_projects: 3}
      ],
      search_key_location: '',
      states: [],
      default_items: [],
      passingData: 0,
      is_detail_page: true
    };
  },
  methods: {
    loadAccounts(){
      new AdminProxy().getAllAccounts().then((response) => {
          // JSON responses are automatically parsed.
          this.accounts = response;
        })
        .catch(error => {
          this.errors.push(error);
        });
    },
    accountChange(){
        var params = new URLSearchParams();
        params.append('accountCode', this.selected);
        new AdminProxy().getAccount(params).then((response) => {
            // JSON responses are automatically parsed.
            this.selectedAccount = response;
            })
            .catch(error => {
            this.errors.push(error);
            });
    },
    filter_by_location(location) {
        if (location == 'All') this.items1 = this.default_items;
        else
            this.items1 = this.default_items.filter(
                item => item.location == location
            );
    },
    detect_change_filter() {
        this.states = this.temp_states.filter(
            state => state.text.indexOf(this.search_key_location) > -1
        );
    },
    gotoDetal() {
        this.is_detail_page = false;
    },
    goBack() {
        this.is_detail_page = true;
    }
  },
  components: {
    Navigation: Navigation,
    ExtraProfile
  },
  created() {
    this.loadAccounts();
    new AddressProxy().getStates().then((response) => {
        this.states = response;
        this.temp_states = response;
        this.default_items = this.items1;
    })
  }
};
</script>

<style scoped>
.adminListProjects {
    font-family: Montserrat;
    background-color: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    padding: 30px 40px 20px 40px;
    margin: 30px;
    width: 100%;
    height: 100%;
    margin-right: 10px;
    font-size: 13px;
    font-weight: 600;
    font-family: Montserrat !important;
}
.button-type {
    background-color: #0c2340;
    color: white;
    font-weight: normal !important;
    padding-left: 20px;
    padding-right: 20px;
}
</style>
