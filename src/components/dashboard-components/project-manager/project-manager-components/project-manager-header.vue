<template>
  <div>
    <b-row class="project-manager-header overflow-hidden">
      <b-col lg="7">
        <img class="footer-img w-100" alt="Vue logo" src="~@/assets/img/lines-bg-top.png" style="top: -260px"/>
        <b-row>
          <b-col lg="8">
            <select class="form-control dropdown-location">
              <option> Davis Healthcare Facility </option>
              <option> Davis Healthcare Facility </option>
            </select>
          </b-col>
        </b-row>
      </b-col>
      <b-col lg="5">
        <b-row>
          <b-col lg="7">
            <div>
              <span class="calculation-mark">Project Budget</span>
              <span class="calculation-mark float-right">${{ getProjectBudget.toLocaleString() }}</span>
            </div>
            <div>
              <span class="calculation-mark">Construction Check</span>
              <span class="calculation-mark calculation-check float-right">${{getConstructionCheck.toLocaleString()}}</span>
            </div>
            <hr />
            <div class="wrapper-calculation-result">
              <span class="calculation-mark calculation-red float-right">${{ calcDifference() }}</span>
            </div>
          </b-col>
          <!-- Export Button -->
          <b-col lg="5">
            <button type="button" class="btn btn-secondary btn-export float-right">EXPORT</button>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row class="project-manager-top-nav">
      <b-col lg="6" style="padding-top: 6px;">
        <button type="button" class="btn btn-secondary top-nav-button">Documents</button>
        <button type="button" class="btn btn-secondary top-nav-button ml-1">Drawings</button>
        <button type="button" class="btn btn-secondary top-nav-button ml-1">Estimates</button>
        <button type="button" class="btn btn-secondary top-nav-button ml-1">Take off</button>
      </b-col>
      <b-col lg="6" class="my-auto">
        <a class="text-white float-right a-comment-tag" @click="openComments()">
          View comments
          <img src="~@/assets/img/comments.png"/>
        </a>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import EventBus from '../../../../plugins/event-bus';
import store from "@/store";

export default {
  name: "ProjectManagerHeader",
  computed: {
    ...mapGetters("projectmanager", [
      "getProjectBudget",
      "getConstructionCheck",
    ]),
  },
  methods: {
    calcDifference() {
      return (this.getProjectBudget - this.getConstructionCheck).toLocaleString();
    },

    openComments() {
      store.dispatch("comment/initAllComments", {
        subProjectId: this.$route.params.subproject_id,
      });
      EventBus.$emit('open_comments');
    }
  },
}
</script>

<style lang="css" scoped>
.project-manager-header {
  background: #0C2340;
  height: 160px;
  padding-top: 33px;
}

.project-manager-top-nav {
  height: 62px;
  background: #061831;
}

.project-manager-top-nav button {
  font-size: 15px;
}

.top-nav-button {
  background: #C9C9C9;
  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 3px;
  height: 50px;
  color: #000000;
  width: 180px;
  font-size: 15px;
}

.a-comment-tag {
  font-size: 15px;
}

.a-comment-tag:hover {
  cursor: pointer;
  color: #FB922F !important;
}

.a-comment-tag img {
  margin-left: 12px;
  margin-top: -2px;
}

.dropdown-location {
  background: #133B70;
  color: #ffffff;
  border-color: #133B70;
}

.calculation-mark {
  font-weight: 600;
  font-size: 16px;
  color: #ffffff;
}

.calculation-check {
  color: #62FF5F;
}

.calculation-red {
  color: #FF1515;
}

hr {
  margin-top: 0.7rem;
  margin-bottom: 0.7rem;
  border: 0;
  border-top: 1px solid #ffffff;
}

.wrapper-calculation-result {
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 15px;
  display: flow-root;

  padding: 2px 14px;
  margin-left: -15px;
  margin-right: -15px;
}

.btn-export {
  background: #FB922F;
  border-radius: 1px;
  color: #000000;
  width: 114px;
}
</style>
