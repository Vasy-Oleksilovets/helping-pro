<template>
  <b-card class="subs-card prosubmissionstatus">
    <b-card-body>
      <div style="font-size: 14px" class="font-weight-bold">Submission Status</div>
      <b-table hover thClass="border-top-0" :items="items" :fields="fields" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" responsive="sm">
        <template v-slot:head(name)>
          <div>Project Name</div>
        </template>
        <template v-slot:head(clientName)>
          <b-dropdown variant="primary" size="lg" style="background-color: white !important" id="dropdown-1" text="Client">
            <b-dropdown-item @click="filter_by_projectname('View all')">View all</b-dropdown-item>
            <b-dropdown-item :key="name" v-for="name in project_name_lists" @click="filter_by_projectname(name)">{{name}}</b-dropdown-item>
          </b-dropdown>
        </template>
        <template v-slot:head(phaseName)>
          <b-dropdown variant="primary" size="lg" style="background-color: white !important" id="dropdown-1" text="Type of Submission">
            <b-dropdown-item @click="filter_by_project_type('View all')">View all</b-dropdown-item>
            <b-dropdown-item v-for="name in prject_type_lists" :key="name" @click="filter_by_project_type(name)">{{name}}</b-dropdown-item>
          </b-dropdown>
        </template>
        <template v-slot:head(category)>
          <b-dropdown variant="primary" size="lg" style="background-color: white !important" id="dropdown-1" text="Project Type">
            <b-dropdown-item @click="filter_by_category('View all')">View all</b-dropdown-item>
            <b-dropdown-item :key="name" v-for="name in category_lists" @click="filter_by_category(name)">{{name}}</b-dropdown-item>
          </b-dropdown>
        </template>
        <template v-slot:table-colgroup="scope">
          <col v-for="field in scope.fields" :key="field.key" :style="{ width: '15%' }">
        </template>

        <template v-slot:head(projectStatus)>
          <b-dropdown variant="primary" size="lg" style="background-color: white !important" id="dropdown-1" text="Status">
            <b-dropdown-item @click="filter_by_status('View all')">View all</b-dropdown-item>
            <b-dropdown-item :key="name" v-for="name in status_lists" @click="filter_by_status(name)">{{name}}</b-dropdown-item>
          </b-dropdown>
        </template>
        <template v-slot:head(dateStart)>
          <b-dropdown variant="primary" size="lg" style="background-color: white !important" id="dropdown-1" text="Date Submitted">
            <b-dropdown-item @click="filter_by_date(0)">View all</b-dropdown-item>
            <b-dropdown-item @click="filter_by_date(1)">Oldest</b-dropdown-item>
            <b-dropdown-item @click="filter_by_date(2)">Newest</b-dropdown-item>
          </b-dropdown>
        </template>
      </b-table>
    </b-card-body>
  </b-card>
</template>

<script>
import EventBus from '../../../plugins/event-bus';
export default {
  name: 'ProSubmissionStatus',
  props: ['profile', 'role'],
  data() {
    return {
      sortBy: 'age',
      sortDesc: false,
      fields: [
        { key: 'category', sortable: false },
        { key: 'clientName', sortable: false },
        { key: 'phaseName', sortable: false },
        // { key: 'name', sortable: false },
        { key: 'dateStart', sortable: false },
        { key: 'projectStatus', sortable: false },
      ],
      items: [],
      default_items: [],
      myprofile: {},
      client_lists: [],
      project_name_lists: [],
      prject_type_lists: [],
      category_lists: [],
      type_of_submission_lists: [],
      status_lists: []
    };
  },
  methods: {
    filter_by_date(type) {
      if (type == 1) {
        this.items.sort(function(a, b) {
          if (a.dateStart < b.dateStart) return -1;
          if (a.dateStart > b.dateStart) return 1;
          return 0;
        });
      }
      if (type == 2) {
        this.items.sort(function(a, b) {
          if (a.dateStart > b.dateStart) return -1;
          if (a.dateStart < b.dateStart) return 1;
          return 0;
        });
      }
      if (type == 0) {
        this.items = this.default_items;
      }
    },
    filter_by_submission(type) {
      if (type === 'View all') this.items = this.default_items;
      else this.items = this.default_items.filter(item => item.type_of_submission == type);
    },
    filter_by_name(name) {
      if (name === 'View all') this.items = this.default_items;
      else this.items = this.default_items.filter(item => item.name == name);
    },
    filter_by_projectname(name){
      if (name === 'View all') this.items = this.default_items;
      else this.items = this.default_items.filter(item => item.clientName == name);
    },
    filter_by_project_type(name){
      if (name === 'View all') this.items = this.default_items;
      else this.items = this.default_items.filter(item => item.phaseName == name);
    },
    filter_by_category(name){
      if (name === 'View all') this.items = this.default_items;
      else this.items = this.default_items.filter(item => item.category == name);
    },
    filter_by_status(projectStatus) {
      if (projectStatus === 'View all') this.items = this.default_items;
      else this.items = this.default_items.filter(item => item.projectStatus == projectStatus);
    },
  },
  created() {
    this.myprofile = this.profile;
    this.default_items = this.items;
  },
  mounted() {
    EventBus.$on('read_profile', (payLoad) => {
      this.myprofile = payLoad.profile;
      this.items = this.myprofile.currentProjects;
      this.default_items = this.items;

      for(let index in this.items) {
        if(!this.client_lists.includes(this.items[index].name))
          this.client_lists.push(this.items[index].name);
        if(!this.project_name_lists.includes(this.items[index].clientName))
          this.project_name_lists.push(this.items[index].clientName);
        if(!this.prject_type_lists.includes(this.items[index].phaseName))
          this.prject_type_lists.push(this.items[index].phaseName);
        if(!this.category_lists.includes(this.items[index].category))
          this.category_lists.push(this.items[index].category);
        if(!this.status_lists.includes(this.items[index].projectStatus))
          this.status_lists.push(this.items[index].projectStatus);
      }
    });
  }
};
</script>

<style scoped>
.title-font {
  font-size: 1.1em;
  font-weight: 600;
}

.mytable thead {
  font-size: 2em !important;
}

.sub-title {
  font-weight: 600;
}

.subs-card {
  width: 100%;
  font-weight: 500 !important;
  color: black;
}

.title-text {
  font-size: 15px;
  font-weight: 600;
  line-height: 20px;
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
