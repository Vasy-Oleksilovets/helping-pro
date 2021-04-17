<template>
  <b-card class="subs-card">
    <b-card-body>
        <b-table hover thClass="border-top-0" :items="items" :fields="fields" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" responsive fixed>
          <template v-slot:table-colgroup="scope">
            <col v-for="field in scope.fields" :key="field.key" :style="{ width: field.key === 'name' ? '250px' : '180px' }">
          </template>
          <template v-slot:head(name)>
            <div v-if="role === 7" class="title-font">New Project Assignments</div>
            <div v-if="role === 8" class="title-font">New Project Submission</div>
          </template>
          <template v-slot:head(filter_by)>
            <span></span>
          </template>
          <template v-slot:cell(filter_by)>
            <b-button class="button-type rounded">View Project Submission</b-button>
          </template>
          <template v-slot:cell(status)="row">
            <span v-if="row.value == 'Denied'" style="color:#C9C9C9">{{row.value}}</span>
            <span v-else>{{ row.value }}</span>
          </template>
          <template v-slot:cell(name)="row">
            <span v-if="row.item.type == 1" style="color: #E07C00">* New *</span>
            <span v-else style="color: #C9C9C9;">{{row.value}}</span>
            <span v-if="row.item.type ==1 " style="color: #0058DD">{{ row.value }}</span>
          </template>
        </b-table>
        <b-row class="font-weight-bold ml-1">
          <a href="#">View New Project Submissions</a>
        </b-row>
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  name: 'ProSubmission',
  props: ["role"],
  data() {
    return {
      newProjectSubmissions: [],
      sortBy: 'age',
      sortDesc: false,
      items:[],
      fields: [
        { key: 'name', sortable: false },
        { key: 'project_phase', sortable: false },
        // { key: 'client', sortable: false },
        { key: 'project_type', sortable: false },
        { key: 'location', sortable: false },
        { key: 'submission_date', sortable: false },
        { key: 'due_date', sortable: false },
        { key: 'filter_by', label: 'Filter by' },
      ],
    };
  },
  methods: {},
  mounted(){     	
  },
  watch: {
    '$store.state.auth.profile': function() {
      let profile = this.$store.state.auth.profile;
      if (profile !== null) {
        this.newProjectSubmissions = profile.newProjects;
        if(this.newProjectSubmissions == null){
          this.newProjectSubmissions = [];
        } else {
          this.items = [];
          for(var index = 0; index < this.newProjectSubmissions.length;index++){
            var item = {};
            var newProject = this.newProjectSubmissions[index];
            item.name = newProject.name;
            if(newProject.projectViewed) item.type = 0;
            else item.type = 1;
            item.client = newProject.clientName;
            item.category = newProject.categoryName;
            item.location = newProject.location;
            item.date_posted = newProject.datePosted;
            this.items.push(item);
          }
        }	
      }
    }
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
    margin: 30px;
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
