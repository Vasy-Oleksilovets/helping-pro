<template>
  <b-card class="subs-card">
    <b-card-body>
      <b-table hover thClass="border-top-0" :items="items" :fields="role === 7? fields: productionManagerFields" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" responsive fixed>
        <template v-slot:table-colgroup="scope">
          <col v-for="field in scope.fields" :key="field.key" :style="{ width: field.key === 'name' ? '230px' : '160px' }">
        </template>
        <template v-slot:head(name)>
          <div class="title-font">Upcoming Projects</div>
        </template>
        <template v-slot:head(filter_by)>
          <span></span>
        </template>
        <template v-slot:cell(filter_by)>
          <b-button class="button-type rounded">View Project Details</b-button>
        </template>
        <template v-slot:cell(status)="row">
          <span v-if="row.value == 'Denied'" style="color:#C9C9C9">{{row.value}}</span>
          <span v-else>{{ row.value }}</span>
        </template>
        <template v-slot:cell(company)="row">
          <span v-if="row.item.type == 1" style="color: #E07C00">* New *</span>
          <span v-else style="color: #C9C9C9; margin-right: 6px; margin-left: 6px"> Read </span>
          <span style="color: #0058DD">{{ row.value }}</span>
        </template>
      </b-table>
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  name: 'ProUpcomming',
  props: ["role"],
  data() {
    return {
      sortBy: 'age',
      sortDesc: false,
      profile: {},
      items: [],
      upcomingProjects: [],
      fields: [
        { key: 'name', sortable: false },
        { key: 'project_phase', sortable: false },
        { key: 'project_type', sortable: false },
        { key: 'location', sortable: false },
        { key: 'start_date', sortable: false },
        { key: 'end_date', sortable: false },
        { key: 'due_date', sortable: false },
        { key: 'filter_by', label: 'Filter by' },
      ],
      productionManagerFields: [
        { key: 'name', sortable: false },
        { key: 'project_phase', sortable: false },
        { key: 'project_type', sortable: false },
        { key: 'location', sortable: false },
        { key: 'start_date', sortable: false },
        { key: 'due_date', sortable: false },
        { key: 'filter_by', label: 'Filter by' },
      ]
    };
  },
  methods: {},
  created(){
  },
  watch: {
    '$store.state.auth.profile': function() {
      let profile = this.$store.state.auth.profile;
      if(profile !== null){
        this.upcomingProjects = profile.upcomingProjects;
        if(this.upcomingProjects == null){
          this.upcomingProjects = [];
        }else{
          this.items = [];
          for(var index = 0; index < this.upcomingProjects.length;index++){
            var item = {};
            var upcomingProject = this.upcomingProjects[index];
            item.name = upcomingProject.name;
            item.category = upcomingProject.categoryName;
            item.location = upcomingProject.location;
            item.start_date = upcomingProject.dateStart;
            item.end_date = upcomingProject.dateEnd;
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
  padding: 5px 27px;
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
