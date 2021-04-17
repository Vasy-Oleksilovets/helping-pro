<template>
  <!-- <div class="w-100 h-100 current-fee-body">
    <div class="border-bottom border-dark">Find Estimators For Project</div>
    <div class="margin-4-percent mb-2">
      <div class="margin-2-percent">
        <span>General & Architectual - Assigned (L.Thomas)</span>
      </div>
      <div class="margin-2-percent font-color-grey">
        <span>Structural - Unassigned</span>
      </div>
      <div class="margin-2-percent font-color-grey">
        <span>Mechanical - Unassigned</span>
      </div>
      <div class="margin-2-percent font-color-grey">
        <span>Electrical - Unassigned</span>
      </div>
      <div class="margin-2-percent font-color-grey">
        <span>Site & Civil - Unassigned</span>
      </div>
    </div>
    <b-row class="d-flex justify-content-end mr-auto">
      <button type="button" class="btn btn-custom-style"> Create Fee Submission </button>
    </b-row>
  </div> -->
  <div class="w-100 h-100 current-fee-body">
    <div class="border-bottom border-dark">Project Status</div>
    <div v-if="role === 7" class="margin-4-percent mb-2">
      <div class="margin-2-percent">
        <span>In Progress</span>
      </div>
      <div class="margin-2-percent">
        <span>In Queue</span>
      </div>
      <div class="margin-2-percent">
        <span>Approaching Due Date</span>
      </div>
      <div class="margin-2-percent">
        <span>Over Due</span>
      </div>
      <div class="margin-2-percent">
        <span>Under Review</span>
      </div>
      <div class="margin-2-percent">
        <span>Completed</span>
      </div>
    </div>
    <div v-if="role === 8">
      <div class="margin-2-percent">
        <span>Unassigned Projects</span>
      </div>
      <div class="margin-2-percent">
        <span>In Progress</span>
      </div>
      <div class="margin-2-percent">
        <span>In Queue</span>
      </div>
      <div class="margin-2-percent">
        <span>Approching Due Date</span>
      </div>
      <div class="margin-2-percent">
        <span>Over Due</span>
      </div>
      <div class="margin-2-percent">
        <span>Under Review</span>
      </div>
    </div>
    <div v-if="role === 3">
      <div class="margin-2-percent">
        <span>Unassigned Projects</span>
      </div>
      <div class="margin-2-percent">
        <span>In Progress</span>
      </div>
      <div class="margin-2-percent">
        <span>In Queue</span>
      </div>
      <div class="margin-2-percent">
        <span>Approching Due Date</span>
      </div>
      <div class="margin-2-percent">
        <span>Over Due</span>
      </div>
      <div class="margin-2-percent">
        <span>Under Review</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProCurrentFindEstimator',
  props: ["role"],
  data() {
    return {
      userRole: ''
    };
  }
};
</script>

<style scoped>
.current-fee-body {
  background: #f4f5f8;
  padding: 10px 20px 10px 20px;
}

.margin-bottom-13-percent {
  margin-bottom: 10%;
}

.margin-4-percent {
  margin-top: 4%;
}

.margin-2-percent {
  margin-top: 1%;
}

.btn-custom-style {
  background: #0c2340 !important;
  color: white;
  font-size: 0.8em;
  padding: 5px 4px 5px 4px;
  font-weight: 400;
  border-radius: 3px;
}

.font-color-grey {
  color: #c9c9c9;
}
</style>
