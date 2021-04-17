<template>
    <b-card class="subs-card">
        <b-card-body>
            <b-row class="title-font ml-1 mb-4">Project Offers</b-row>
            <b-table hover thClass="border-top-0" :items="items" :fields="fields" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :current-page="currentPage" :per-page="perPage" responsive="sm">
                <template v-slot:head(company)="data">
                  <div class="text-center">
                    <span class="title-font text-center">{{data.label}}</span>
                  </div>
                </template>
                <template v-slot:head(project_type)>
                  <b-dropdown variant="primary" size="lg" style="background-color: white !important" id="dropdown-1" text="Project Type">
                    <b-dropdown-item @click="filter_by_project_type('All')">All</b-dropdown-item>
                    <b-dropdown-item @click="filter_by_project_type('Airport')">Airport</b-dropdown-item>
                    <b-dropdown-item @click="filter_by_project_type('Hospital')">Hospital</b-dropdown-item>
                  </b-dropdown>
                </template>
                <template v-slot:head(project_phase)>
                  <b-dropdown variant="primary" size="lg" style="background-color: white !important" id="dropdown-1" text="Project Phase">
                    <b-dropdown-item @click="filter_by_project_phase('All')">All</b-dropdown-item>
                    <b-dropdown-item @click="filter_by_project_phase('Conceptual')">Conceptual</b-dropdown-item>
                    <b-dropdown-item @click="filter_by_project_phase('Schematic')">Schematic</b-dropdown-item>
                    <b-dropdown-item @click="filter_by_project_phase('Design')">Design</b-dropdown-item>
                    <b-dropdown-item @click="filter_by_project_phase('Construction')">Construction</b-dropdown-item>
                    <b-dropdown-item @click="filter_by_project_phase('Bids/Proposals')">Bids/Proposals</b-dropdown-item>
                  </b-dropdown>
                </template>
                <template v-slot:head(compensation)="data">
                  <div>
                    <span class="title-font text-center">{{data.label}}</span>
                  </div>
                </template>
                <template v-slot:head(location)>
                  <b-dropdown variant="primary" size="lg" style="background-color: white !important" id="dropdown-1" text="Location">
                    <b-form-input v-model="search_key_location" v-on:keyup="detect_change_filter" placeholder="Search city" style="width: 90%; margin-left: 5%"></b-form-input>
                    <b-dropdown-item v-for="state in states" :key="state.name" @click="filter_by_location(state.name)">{{ state.name }}</b-dropdown-item>
                  </b-dropdown>
                </template>
                <template v-slot:head(start_date)>
                  <b-dropdown variant="primary" size="lg" style="background-color: white !important" id="dropdown-1" text="State Date">
                    <b-dropdown-item @click="filter_by_date(0)">Oldest</b-dropdown-item>
                    <b-dropdown-item @click="filter_by_date(1)">Newest</b-dropdown-item>
                  </b-dropdown>
                </template>
                <template v-slot:head(status)>
                  <b-dropdown variant="primary" size="lg" style="background-color: white !important" id="dropdown-1" text="Status">
                    <b-dropdown-item @click="filter_by_status('All')">All</b-dropdown-item>
                    <b-dropdown-item @click="filter_by_status('Pending')">Pending</b-dropdown-item>
                    <b-dropdown-item @click="filter_by_status('Accepted')">Accepted</b-dropdown-item>
                    <b-dropdown-item @click="filter_by_status('Deed')">Deined</b-dropdown-item>
                  </b-dropdown>
                </template>
                <template v-slot:head(filter_by)>
                  <b-dropdown text="Filter by" style="float: right;" variant="outline-dark" class="m-1 outline-sort-by">
                    <b-dropdown-item @click="filter_type(0)">All Messages</b-dropdown-item>
                    <b-dropdown-item @click="filter_type(1)">New Messages</b-dropdown-item>
                    <b-dropdown-item @click="filter_type(2)">Read Messages</b-dropdown-item>
                  </b-dropdown>
                </template>
                <template v-slot:cell(filter_by)>
                  <b-button class="button-type rounded" v-on:click="openModal" style="float: right">Go to Project Request</b-button>
                </template>
                <template v-slot:cell(status)="row">
                  <span v-if="row.value == 'Denied'" style="color:#C9C9C9">{{row.value}}</span>
                  <span v-else>{{ row.value }}</span>
                </template>
                <template v-slot:cell(company)="row">
                  <span v-if="row.item.type == 1" style="color: #E07C00">* New *</span>
                  <span v-else style="color: #C9C9C9; margin-right: 6px; margin-left: 6px">Read</span>
                  <span style="color: #0058DD">{{ row.value }}</span>
                </template>
            </b-table>
            <b-row>
              <b-col md="4" offset-md="4">
                <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="fill" size="sm" class="my-0"></b-pagination>
              </b-col>
            </b-row>
        </b-card-body>
    </b-card>
</template>

<script>
import AddressProxy from '@/proxies/AddressProxy.js';
export default {
  name: 'EstimatorProjectRequest',
  data() {
    return {
      totalRows: 1,
      currentPage: 1,
      perPage: 15,
      pageOptions: [5, 10, 15],
      sortBy: 'age',
      sortDesc: false,
      fields: [
        { key: 'company', sortable: false },
        { key: 'project_type', sortable: false },
        { key: 'project_phase', sortable: false },
        // { key: 'compensation', sortable: false },
        { key: 'location', sortable: false },
        { key: 'start_date', sortable: false },
        { key: 'due_date', sortable: false },
        { key: 'status', sortable: false },
        { key: 'filter_by', label: 'Filter by' },
      ],
      items: [
        {
          isActive: true,
          type: 2,
          filter_by: '',
          status: 'Claimed',
          start_date: '6/01/2020',
          due_date: '6/01/2020',
          location: 'California',
          compensation: '$20/hr',
          project_phase: 'Costruction',
          project_type: 'Hospital',
          company: 'Google Healthcare',
        },
        {
          isActive: true,
          type: 2,
          filter_by: '',
          status: 'Available',
          start_date: '6/01/2020',
          due_date: '6/01/2020',
          location: 'California',
          compensation: '$20/hr',
          project_phase: 'Costruction',
          project_type: 'Hospital',
          company: 'Google Healthcare',
        },
        {
          isActive: true,
          type: 2,
          filter_by: '',
          status: 'Declined',
          start_date: '6/01/2020',
          due_date: '6/01/2020',
          location: 'California',
          compensation: '$20/hr',
          project_phase: 'Costruction',
          project_type: 'Hospital',
          company: 'Google Healthcare',
        },
        {
          isActive: true,
          type: 1,
          filter_by: '',
          status: 'Pending',
          start_date: '5/01/2020',
          due_date: '6/01/2020',
          location: 'Colorado',
          compensation: '$30/hr',
          project_phase: 'Bids/Proposals',
          project_type: 'Airport',
          company: 'Google Healthcare',
        },
        {
          isActive: true,
          type: 1,
          filter_by: '',
          status: 'Pending',
          start_date: '5/01/2020',
          due_date: '6/01/2020',
          location: 'Colorado',
          compensation: '$30/hr',
          project_phase: 'Bids/Proposals',
          project_type: 'Airport',
          company: 'Google Healthcare',
        },
        {
          isActive: true,
          type: 2,
          filter_by: '',
          status: 'Accepted',
          start_date: '4/01/2020',
          due_date: '6/01/2020',
          location: 'Connecticut',
          compensation: '$40/hr',
          project_phase: 'Conceptual',
          project_type: 'Hospital',
            company: 'Google Healthcare',
        },
        {
          isActive: true,
          type: 2,
          filter_by: '',
          status: 'Accepted',
          start_date: '4/01/2020',
          due_date: '6/01/2020',
          location: 'Connecticut',
          compensation: '$40/hr',
          project_phase: 'Conceptual',
          project_type: 'Hospital',
          company: 'Google Healthcare',
        }
      ],
      default_items: [],
      states: [],
      temp_states: [],
      search_key_location: '',
    };
  },

  methods: {
    openModal() {
      this.$emit('openModal');
    },

    filter_type(type) {
      switch (type) {
        case 1:
          this.items = this.default_items.filter(item => item.type == 1);
          break;
        case 0:
          this.items = this.default_items;
          break;
        case 2:
          this.items = this.default_items.filter(item => item.type == 2);
          break;
        default:
          break;
      }
    },

    //Filter function by
    filter_by_project_type(type) {
      switch (type) {
        case 'All':
          this.items = this.default_items;
          break;
        case 'Airport':
          this.items = this.default_items.filter(item => item.project_type == 'Airport');
          break;
        case 'Hospital':
          this.items = this.default_items.filter(item => item.project_type == 'Hospital');
          break;
        default:
          break;
      }
    },

    filter_by_project_phase(type) {
      switch (type) {
        case 'All':
          this.items = this.default_items;
          break;
        case 'Conceptual':
          this.items = this.default_items.filter(item => item.project_phase == 'Conceptual');
          break;
        case 'Schematic':
          this.items = this.default_items.filter(item => item.project_phase == 'Schematic');
          break;
        case 'Design':
          this.items = this.default_items.filter(item => item.project_phase == 'Design');
          break;
        case 'Costruction':
          this.items = this.default_items.filter(item => item.project_phase == 'Costruction');
          break;
        case 'Bids/Proposals':
          this.items = this.default_items.filter(item => item.project_phase == 'Bids/Proposals');
          break;
        default:
          break;
      }
    },

    filter_by_status(type) {
      switch (type) {
        case 'All':
          this.items = this.default_items;
          break;
        case 'Pending':
          this.items = this.default_items.filter(item => item.status == 'Pending');
          break;
        case 'Accepted':
          this.items = this.default_items.filter(item => item.status == 'Accepted');
          break;
        case 'Denied':
          this.items = this.default_items.filter(item => item.status == 'Denied');
          break;
        default:
          break;
      }
    },

    filter_by_location(location) {
      if (location == 'All') this.items = this.default_items;
      else this.items = this.default_items.filter(item => item.location == location);
    },

    detect_change_filter() {
      this.states = this.temp_states.filter(state => state.name.indexOf(this.search_key_location) > -1);
    },

    filter_by_date(type) {
      if (type == 0) {
        this.items.sort(function(a, b) {
          // var adate = moment("12-25-1995", "MM-DD-YYYY");
          if (a.start_date < b.start_date) return -1;
          if (a.start_date > b.start_date) return 1;
          return 0;
        });
      }
      if (type == 1) {
        this.items.sort(function(a, b) {
          if (a.start_date > b.start_date) return -1;
          if (a.start_date < b.start_date) return 1;
          return 0;
        });
      }
    },
  },

  created() {
    new AddressProxy().getStates().then((response) => {
      this.states = response;
      this.temp_states = response;
      this.default_items = this.items;
    })
  },
};
</script>

<style scoped>
.title-font {
  font-size: 13px !important;
  font-weight: 600;
}
.submission {
  border: 2px solid #cfcfcf;
  padding: 15px;
  padding-left: 25px;
  margin: 5px;
}

.mytable thead {
  font-size: 2em !important;
}

.submissions-title {
  border-bottom: 2px solid black;
}

.sub-title {
  font-weight: 600;
}

.sub {
  background-color: red;
}

.subs-card {
  margin: 20px;
  font-weight: 500 !important;
  color: black;
}

.sub-card-body {
  margin: 20px;
  padding: 20px;
}

.sub-card-title-body {
  margin: 5px;
  margin-bottom: 15px;
  padding: 0px;
}

.dash-welcome {
  font-family: Montserrat;
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  padding: 30px 40px 20px 40px;
  margin: 30px;
}
.title-text {
  font-size: 15px;
  font-weight: 600;
  line-height: 20px;
}
.underline {
  border-bottom: 1px solid black;
}
.col {
  padding-left: 0px !important;
}

.button-type {
  background-color: #0c2340;
  color: white;
  font-weight: normal !important;
}

@media only screen and (max-width: 600px) {
  .dash-welcome {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    padding: 10px 10px 20px 40px;
    margin: 0px;
    margin-top: 10px;
  }
  .small-phone {
    margin-right: 5px;
  }
}
</style>
