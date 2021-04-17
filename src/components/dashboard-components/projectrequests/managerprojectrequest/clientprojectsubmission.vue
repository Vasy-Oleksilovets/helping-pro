<template>
  <div class="client-project-submission">
    <b-table hover thClass="border-top-0" :items="items" :fields="fields" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :current-page="currentPage" :per-page="perPage" responsive="sm">
      <template v-slot:head(client_company)="data">
        <div>
          <span class="title-font">{{ data.label }}</span>
        </div>
      </template>
      <template v-slot:head(building_type)>
        <b-dropdown variant="primary" size="lg" style="background-color: white !important" id="dropdown-1" text="Building ">
          <b-dropdown-item @click="filter_by_building_type('All')">All</b-dropdown-item>
          <b-dropdown-item @click="filter_by_building_type('Airport')">Airport</b-dropdown-item>
          <b-dropdown-item @click="filter_by_building_type('Hospital')">Hospital</b-dropdown-item>
        </b-dropdown>
      </template>
      <template v-slot:head(project_phase)>
        <b-dropdown variant="primary" size="lg" style="background-color: white !important" id="dropdown-1" text="Project Phase">
          <b-dropdown-item @click="filter_by_project_phase('All')">View all</b-dropdown-item>
          <b-dropdown-item @click="filter_by_project_phase('Conceptual')">Conceptual</b-dropdown-item>
          <b-dropdown-item @click="filter_by_project_phase('Schematic')">Schematic</b-dropdown-item>
          <b-dropdown-item @click="filter_by_project_phase('Design')">Design</b-dropdown-item>
          <b-dropdown-item @click="filter_by_project_phase('Construction')">Construction</b-dropdown-item>
          <b-dropdown-item @click="filter_by_project_phase('Bids/Proposals')">Bids/Proposals</b-dropdown-item>
        </b-dropdown>
      </template>
      <template v-slot:head(start_date)>
        <b-dropdown variant="primary" size="lg" style="background-color: white !important" id="dropdown-1" text="Start Date">
          <b-dropdown-item @click="filter_by_date(0)">Oldest</b-dropdown-item>
          <b-dropdown-item @click="filter_by_date(1)">Newest</b-dropdown-item>
        </b-dropdown>
      </template>
      <template v-slot:head(status)>
        <b-dropdown variant="primary" size="lg" style="background-color: white !important" id="dropdown-1" text="Status">
          <b-dropdown-item @click="filter_by_status('All')">All</b-dropdown-item>
          <b-dropdown-item @click="filter_by_status('Pending')">Pending</b-dropdown-item>
          <b-dropdown-item @click="filter_by_status('Accepted')"><span class="font-weight-bold">Accepted</span></b-dropdown-item>
          <b-dropdown-item @click="filter_by_status('Deined')">Deined</b-dropdown-item>
          <b-dropdown-item @click="filter_by_status('Claimed')">Claimed</b-dropdown-item>
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
        <b-button class="button-type rounded" @click="gotoDetailPage" style="float: right">View Project Submission</b-button>
      </template>
      <template v-slot:cell(status)="row">
        <span v-if="row.value == 'Denied'" style="color:#C9C9C9">{{row.value}}</span>
        <span v-else>{{ row.value }}</span>
      </template>
      <template v-slot:cell(client_company)="row">
        <span v-if="row.item.type == 1" style="color: #E07C00">* New *</span>
        <span v-else style="color: #C9C9C9; margin-right: 6px; margin-left: 6px">Read</span>
        <span>{{ row.value }}</span>
      </template>
    </b-table>
    <b-row class="pb-5">
      <b-col md="4" offset-md="4">
        <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="fill" size="sm" class="my-0"></b-pagination>
      </b-col>
    </b-row>
  </div>
</template>

<script>;
import 'vue-slider-component/theme/default.css';

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
        { key: 'client_company', sortable: false },
        { key: 'building_type', sortable: false },
        { key: 'project_phase', sortable: false },
        { key: 'project_manager', sortable: false },
        { key: 'date_received', sortable: false },
        { key: 'start_date', sortable: false },
        { key: 'due_date', sortable: false },
        { key: 'status', sortable: false },
        { key: 'filter_by', label: 'Filter by' }
      ],
      items: [
        {
          isActive: true,
          type: 1,
          filter_by: '',
          status: 'Pending',
          start_date: '6/01/2020',
          date_received: '6/01/2020',
          due_date: '6/01/2020',
          project_manager: 'Bruce Client',
          // budget: 2000,
          project_phase: 'Costruction',
          building_type: 'Airport',
          client_company: 'Delta',
        },
        {
          isActive: true,
          type: 1,
          filter_by: '',
          status: 'Accepted',
          start_date: '6/01/2020',
          date_received: '6/01/2020',
          due_date: '6/01/2020',
          // budget: 32000,
          project_manager: 'Bruce Client',
          project_phase: 'Costruction',
          building_type: 'Hospital',
          client_company: 'Google Healthcare',
        },
        {
          isActive: true,
          type: 2,
          filter_by: '',
          status: 'Denied',
          start_date: '6/01/2020',
          date_received: '6/01/2020',
          due_date: '6/01/2020',
          // budget: 2000,
          project_manager: 'Bruce Client',
          project_phase: 'Costruction',
          building_type: 'Airport',
          client_company: 'Davis Healthcare',
        },
        {
          isActive: true,
          type: 1,
          filter_by: '',
          status: 'Pending',
          start_date: '5/01/2020',
          date_received: '6/01/2020',
          due_date: '6/01/2020',
          // budget: 42000,
          project_manager: 'Bruce Client',
          project_phase: 'Bids/Proposals',
          building_type: 'Hospital',
          client_company: 'Google Healthcare',
        }
      ],
      default_items: [],
      search_key_location: ''
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
    filter_by_building_type(type) {
      switch (type) {
        case 'All':
          this.items = this.default_items;
          break;
        case 'Airport':
          this.items = this.default_items.filter(item => item.building_type == 'Airport');
          break;
        case 'Hospital':
          this.items = this.default_items.filter(item => item.building_type == 'Hospital');
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
        case 'Deined':
          this.items = this.default_items.filter(item => item.status == 'Denied');
          break;
        case 'Claimed':
          this.items = this.default_items.filter(item => item.status == 'Claimed');
          break;
        default:
          break;
      }
    },
    filter_by_date(type) {
      if (type == 0) {
        this.items.sort(function(a, b) {
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
    gotoDetailPage() {
      this.$router.push('/dashboard/projectrequest/client/123')
    }
  },
  created() {
    this.default_items = this.items;
    this.totalRows = this.items.length;
  }
};
</script>

<style scoped>
.client-project-submission {
  padding: 0px 20px 0px 20px;
  background-color: white;
  font-size: 12px;
  font-weight: 500;
}

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
