<template>
    <v-layout>
        <div style="margin-top: 150px;"></div>

        <v-card contextual-style="info">
            <span slot="header">
                {{ $t('general.project') }}
            </span>

            <div slot="body">
                <div class="row">
                    <div class="col-2">
                        <strong class="text-secondary">
                            <button
                                @click="openModalDialog()"
                                class="btn btn-warning"
                            >
                                Create New Project
                            </button>
                        </strong>
                    </div>
                    <div class="col-3">
                        <select
                            class="form-control"
                            v-model="currentProjectID"
                            @change="getProject()"
                        >
                            <option disabled value=""
                                >Please Select Project</option
                            >
                            <option
                                v-for="project in projects"
                                :value="project.id"
                                :key="project"
                            >
                                {{ project.name }}
                            </option>
                        </select>
                    </div>
                    <div class="col-1">
                        <strong>Or</strong>
                    </div>

                    <div class="col-2">
                        <router-link
                            v-if="currentProjectID != null"
                            :to="{
                                name: 'report.show',
                                params: { project_id: currentProjectID },
                            }"
                            class="btn btn-success"
                            target="_blank"
                        >
                            Show Report
                        </router-link>
                    </div>

                    <div class="col-2">
                        <button
                            v-if="currentProjectID != null"
                            @click="removeConfirmationDialog()"
                            class="btn btn-danger pull-right"
                        >
                            Remove Project
                        </button>
                    </div>

                    <div class="col-2">
                        <router-link
                            v-if="currentProjectID != null"
                            :to="{
                                name: 'file.index',
                                params: { project_id: currentProjectID },
                            }"
                            class="btn btn-info pull-right"
                            target="_blank"
                        >
                            Files
                        </router-link>
                    </div>
                </div>

                <div class="row" v-if="showRemovalConfirmationModal">
                    <transition name="modal">
                        <div class="modal-mask">
                            <div class="modal-wrapper">
                                <div class="modal-container">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h4>
                                                    Remove Project
                                                </h4>
                                            </div>
                                            <!-- end of modal-header -->
                                            <div class="modal-body">
                                                <b>
                                                    Are you going to remove
                                                    {{ currentProject.name }}
                                                    project?
                                                </b>
                                            </div>
                                            <!-- end of modal-body -->
                                            <div class="modal-footer">
                                                <button
                                                    class="btn btn-danger"
                                                    @click="removeProject()"
                                                >
                                                    Remove
                                                </button>
                                                <button
                                                    class="btn btn-default"
                                                    @click="
                                                        showRemovalConfirmationModal = false
                                                    "
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                            <!-- end of modal-footer -->
                                        </div>
                                        <!-- end of modal-content -->
                                    </div>
                                    <!-- end of modal-dialog -->
                                </div>
                                <!-- end of modal-container -->
                            </div>
                            <!-- end of modal-wrapper -->
                        </div>
                        <!-- end of modal-mask -->
                    </transition>
                </div>

                <div class="row" v-if="showModal">
                    <transition name="modal">
                        <div class="modal-mask">
                            <div class="modal-wrapper">
                                <div class="modal-container">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h4>Create New Project</h4>
                                            </div>
                                            <!-- end of modal-header -->
                                            <div class="modal-body">
                                                <div class="form-group">
                                                    <label>
                                                        Name
                                                    </label>
                                                    <input
                                                        v-model="
                                                            newProject.name
                                                        "
                                                        type="text"
                                                        class="form-control"
                                                        placeholder="Name"
                                                    />
                                                </div>
                                                <div class="form-group">
                                                    <label>
                                                        Narrative
                                                    </label>
                                                    <textarea
                                                        class="form-control narrative-height"
                                                        rows="4"
                                                        v-model="
                                                            newProject.narrative
                                                        "
                                                    />
                                                </div>
                                                <div class="form-group">
                                                    <label>
                                                        Building Type
                                                    </label>
                                                    <select
                                                        class="form-control"
                                                        v-model="
                                                            newProject.buildingTypeId
                                                        "
                                                    >
                                                        <option
                                                            v-for="buildingType in this
                                                                .buildingTypes"
                                                            v-bind:value="
                                                                buildingType.id
                                                            "
                                                        >
                                                            <template
                                                                v-if="
                                                                    buildingType.order >=
                                                                        10
                                                                "
                                                            >
                                                                {{
                                                                    buildingType.category +
                                                                        '.' +
                                                                        buildingType.order +
                                                                        '&nbsp;&nbsp;&nbsp;' +
                                                                        buildingType.name
                                                                }}
                                                            </template>
                                                            <template
                                                                v-if="
                                                                    buildingType.order <
                                                                        10
                                                                "
                                                            >
                                                                {{
                                                                    buildingType.category +
                                                                        '.' +
                                                                        buildingType.order +
                                                                        '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                                                                        buildingType.name
                                                                }}
                                                            </template>
                                                        </option>
                                                    </select>
                                                </div>
                                                <div class="row">
                                                    <div class="col-6">
                                                        <div class="form-group">
                                                            <label>
                                                                Budget
                                                            </label>
                                                            <input
                                                                v-model="
                                                                    newProject.budget
                                                                "
                                                                v-on:change="
                                                                    budgetChange()
                                                                "
                                                                type="text"
                                                                class="form-control"
                                                                placeholder="Budget"
                                                            />
                                                        </div>
                                                        <div class="form-group">
                                                            <label>
                                                                Start Date
                                                            </label>
                                                            <date-picker
                                                                v-model="
                                                                    newProject.dateStart
                                                                "
                                                                lang="en"
                                                                class="pull-right"
                                                            />
                                                        </div>
                                                        <div class="form-group">
                                                            <label>
                                                                Drawings
                                                                Available
                                                            </label>
                                                            <select
                                                                v-model="
                                                                    newProject.drawingsAvailable
                                                                "
                                                                class="form-control"
                                                            >
                                                                <option
                                                                    v-for="booleanOption in $store
                                                                        .state
                                                                        .project
                                                                        .booleanOptions"
                                                                    v-bind:value="
                                                                        booleanOption.key
                                                                    "
                                                                    >{{
                                                                        booleanOption.value
                                                                    }}</option
                                                                >
                                                            </select>
                                                        </div>
                                                        <div class="form-group">
                                                            <label>
                                                                Procurement
                                                                Method
                                                            </label>
                                                            <select
                                                                v-model="
                                                                    newProject.procurementMethod
                                                                "
                                                                class="form-control"
                                                            >
                                                                <option
                                                                    v-for="procurementMethod in $store
                                                                        .state
                                                                        .project
                                                                        .procurementMethods"
                                                                    v-bind:value="
                                                                        procurementMethod.key
                                                                    "
                                                                    >{{
                                                                        procurementMethod.value
                                                                    }}</option
                                                                >
                                                            </select>
                                                        </div>
                                                        <div class="form-group">
                                                            <label>
                                                                Project Status
                                                            </label>
                                                            <select
                                                                v-model="
                                                                    newProject.projectStatusId
                                                                "
                                                                class="form-control"
                                                            >
                                                                <option
                                                                    v-for="projectStatus in projectStatuses"
                                                                    v-bind:value="
                                                                        projectStatus.id
                                                                    "
                                                                    >{{
                                                                        projectStatus.name
                                                                    }}</option
                                                                >
                                                            </select>
                                                        </div>
                                                        <div
                                                            class="form-group"
                                                            v-if="
                                                                newProject.buildingTypeId ==
                                                                    airportBuildingTypeId
                                                            "
                                                        >
                                                            <label>
                                                                Project Scope
                                                            </label>
                                                            <select
                                                                v-model="
                                                                    newProject.projectScope
                                                                "
                                                                class="form-control"
                                                            >
                                                                <option
                                                                    v-for="projectScope in $store
                                                                        .state
                                                                        .project
                                                                        .projectScopes"
                                                                    v-bind:value="
                                                                        projectScope.key
                                                                    "
                                                                    >{{
                                                                        projectScope.value
                                                                    }}</option
                                                                >
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <!-- end of left column -->
                                                    <div class="col-6">
                                                        <div class="form-group">
                                                            <label>
                                                                Total Square
                                                                Feet
                                                            </label>
                                                            <input
                                                                v-model="
                                                                    newProject.totalSquareFeet
                                                                "
                                                                v-on:change="
                                                                    totalSquareFeetChange()
                                                                "
                                                                type="text"
                                                                class="form-control"
                                                                placeholder="Total Square Feet"
                                                            />
                                                        </div>
                                                        <div class="form-group">
                                                            <label>
                                                                End Date
                                                            </label>
                                                            <date-picker
                                                                v-model="
                                                                    newProject.dateEnd
                                                                "
                                                                lang="en"
                                                                class="pull-right"
                                                            />
                                                        </div>
                                                        <div class="form-group">
                                                            <label>
                                                                Estimate Type
                                                            </label>
                                                            <select
                                                                v-model="
                                                                    newProject.estimateType
                                                                "
                                                                class="form-control"
                                                            >
                                                                <option
                                                                    v-for="estimateType in $store
                                                                        .state
                                                                        .project
                                                                        .estimateTypes"
                                                                    v-bind:value="
                                                                        estimateType.key
                                                                    "
                                                                    >{{
                                                                        estimateType.value
                                                                    }}</option
                                                                >
                                                            </select>
                                                        </div>
                                                        <div class="form-group">
                                                            <label>
                                                                Delivery Method
                                                            </label>
                                                            <select
                                                                v-model="
                                                                    newProject.deliveryMethod
                                                                "
                                                                class="form-control"
                                                            >
                                                                <option
                                                                    v-for="deliveryMethod in $store
                                                                        .state
                                                                        .project
                                                                        .deliveryMethods"
                                                                    v-bind:value="
                                                                        deliveryMethod.key
                                                                    "
                                                                    >{{
                                                                        deliveryMethod.value
                                                                    }}</option
                                                                >
                                                            </select>
                                                        </div>
                                                        <div class="form-group">
                                                            <label>
                                                                State
                                                            </label>
                                                            <select
                                                                v-model="
                                                                    newProject.state
                                                                "
                                                                class="form-control"
                                                            >
                                                                <option
                                                                    v-for="state in $store
                                                                        .state
                                                                        .project
                                                                        .states"
                                                                    v-bind:value="
                                                                        state.key
                                                                    "
                                                                    >{{
                                                                        state.value
                                                                    }}</option
                                                                >
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <!-- end of right column -->
                                                </div>
                                            </div>
                                            <!-- end of modal-body -->
                                            <div class="modal-footer">
                                                <button
                                                    class="btn btn-success"
                                                    @click="createProject()"
                                                    v-bind:disabled="
                                                        newProject.name ==
                                                            null ||
                                                            newProject.budget ==
                                                                null ||
                                                            newProject.dateEnd ==
                                                                null ||
                                                            newProject.dateStart ==
                                                                null ||
                                                            newProject.deliveryMethod ==
                                                                null ||
                                                            newProject.drawingsAvailable ==
                                                                null ||
                                                            newProject.estimateType ==
                                                                null ||
                                                            newProject.procurementMethod ==
                                                                null ||
                                                            newProject.projectStatusId ==
                                                                null ||
                                                            newProject.buildingTypeId ==
                                                                null ||
                                                            newProject.state ==
                                                                null ||
                                                            newProject.totalSquareFeet ==
                                                                null
                                                    "
                                                >
                                                    Create
                                                </button>
                                                <button
                                                    class="btn btn-danger"
                                                    @click="showModal = false"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                            <!-- end of modal-footer -->
                                        </div>
                                        <!-- end of modal-content -->
                                    </div>
                                    <!-- end of modal-dialog -->
                                </div>
                                <!-- end of modal-container -->
                            </div>
                            <!-- end of modal-wrapper -->
                        </div>
                        <!-- end of modal-mask -->
                    </transition>
                </div>
            </div>
        </v-card>
    </v-layout>
</template>

<script>
/* ============
 * Project Index Page
 * ============
 *
 * The project index page.
 */
import Vue from 'vue';
import VLayout from '@/layouts/Default.vue';
import VCard from '@/components/Card.vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import DatePicker from 'vue2-datepicker';
import NumberUtil from '@/utils/NumberUtil.js';
import ProjectProxy from '@/proxies/ProjectProxy.js';

export default {
    /**
     * The name of the page.
     */
    name: 'ProjectIndex',
    /**
     * The components that the page can use.
     */
    components: {
        VLayout,
        VCard,
        Loading,
        DatePicker,
    },
    data() {
        return {
            currentProjectID: null,
            currentProject: {},
            projects: [],
            showModal: false,
            isLoading: false,
            newProject: {},
            projectStatuses: [],
            showRemovalConfirmationModal: false,
            buildingTypes: [],
            airportBuildingTypeId: 12,
        };
    },
    mounted() {
        this.fetchProjects();
        //this.fetchProjectStatuses();
        //this.fetchBuildingTypes();
    },
    computed: {},
    methods: {
        budgetChange() {
            this.newProject.budget = NumberUtil.numberFormat(
                NumberUtil.parseCommaFloat(this.newProject.budget)
            );
            if (this.newProject.budget == 'NaN') {
                debugger;
                this.newProject.budget = '';
            }
        },
        totalSquareFeetChange() {
            this.newProject.totalSquareFeet = NumberUtil.numberFormat(
                NumberUtil.parseCommaFloat(this.newProject.totalSquareFeet)
            );
            if (this.newProject.totalSquareFeet == 'NaN') {
                this.newProject.totalSquareFeet = '';
            }
        },
        openModalDialog() {
            this.newProject = {};
            this.showModal = true;
        },
        removeConfirmationDialog() {
            this.showRemovalConfirmationModal = true;
        },
        fetchProjects() {
            this.isLoading = true;
            new ProjectProxy()
                .all()
                .then(response => {
                    this.projects = response;
                })
                .catch(error => {
                    this.$notify({
                        group: 'notify',
                        type: 'error',
                        title: 'Error occurred',
                        text: 'Error occurred while getting projects',
                        duration: 5000,
                        speed: 1000,
                    });
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        fetchProjectStatuses() {
            let url = '/projects/status';
            let conf = {};

            this.isLoading = true;
            Vue.$http
                .get(url, conf)
                .then(response => {
                    this.projectStatuses = response.data;
                })
                .catch(error => {
                    console.log('error fetcihing status');
                    console.log(error);
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        fetchBuildingTypes() {
            new ProjectProxy()
                .buildingTypes()
                .then(response => {
                    this.buildingTypes = response;
                })
                .catch(error => {
                    this.$notify({
                        group: 'notify',
                        type: 'error',
                        title: 'Error occurred',
                        text: 'Error occurred while getting building types',
                        duration: 5000,
                        speed: 1000,
                    });
                })
                .finally(() => {});
        },
        getProject() {
            this.isLoading = true;
            new ProjectProxy()
                .find(this.currentProjectID)
                .then(response => {
                    this.currentProject = response.project;
                })
                .catch(error => {
                    this.$notify({
                        group: 'notify',
                        type: 'error',
                        title: 'Error occurred',
                        text: 'Error occurred while getting project',
                        duration: 5000,
                        speed: 1000,
                    });
                })
                .finally(() => {
                    setTimeout(() => {
                        this.isLoading = false;
                    }, 300);
                });
        },
        createProject() {
            let url = '/projects';
            let conf = {};

            // validate budget and total square feet
            this.newProject.budget = this.newProject.budget.replace(/,/g, '');
            if (isNaN(this.newProject.budget)) {
                this.$notify({
                    group: 'notify',
                    type: 'error',
                    title: 'Error occurred',
                    text: 'Please input Number for budget!',
                    duration: 5000,
                    speed: 1000,
                });

                return false;
            }

            this.newProject.totalSquareFeet = this.newProject.totalSquareFeet.replace(
                /,/g,
                ''
            );
            if (isNaN(this.newProject.totalSquareFeet)) {
                this.$notify({
                    group: 'notify',
                    type: 'error',
                    title: 'Error occurred',
                    text: 'Please input Number for total square feet!',
                    duration: 5000,
                    speed: 1000,
                });

                return false;
            }

            if (this.newProject.dateStart > this.newProject.dateEnd) {
                this.$notify({
                    group: 'notify',
                    type: 'error',
                    title: 'Error occurred',
                    text: 'Please Select correct dates!',
                    duration: 5000,
                    speed: 1000,
                });

                return false;
            }

            if (this.newProject.buildingTypeId == null) {
                this.$notify({
                    group: 'notify',
                    type: 'error',
                    title: 'Error occurred',
                    text: 'Please Select building type!',
                    duration: 5000,
                    speed: 1000,
                });

                return false;
            }

            let params = this.newProject;
            this.isLoading = true;
            Vue.$http
                .post(url, params, conf)
                .then(response => {
                    this.showModal = false;
                    this.$notify({
                        group: 'notify',
                        type: 'success',
                        title: 'Successfully created',
                        text: 'Project created successfully!',
                        duration: 5000,
                        speed: 1000,
                    });
                    Vue.router.push({
                        name: 'report.show',
                        params: { project_id: response.data.id },
                    });
                })
                .catch(error => {
                    this.$notify({
                        group: 'notify',
                        type: 'error',
                        title: 'Error occurred',
                        text: 'Error occurred while creating project',
                        duration: 5000,
                        speed: 1000,
                    });
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        removeProject() {
            new ProjectProxy()
                .delete(this.currentProject.id)
                .then(response => {
                    this.fetchProjects();
                    this.$notify({
                        group: 'notify',
                        type: 'success',
                        title: 'Successfully removed',
                        text: 'Project removed successfully!',
                        duration: 5000,
                        speed: 1000,
                    });
                })
                .catch(error => {
                    debugger;
                    this.$notify({
                        group: 'notify',
                        type: 'error',
                        title: 'Error occurred',
                        text: 'Error occurred while removing project',
                        duration: 5000,
                        speed: 1000,
                    });
                })
                .finally(() => {
                    this.showRemovalConfirmationModal = false;
                });
        },
    },
};
</script>

<style scoped lang="css">
.modal-dialog {
  max-width: 1080px;
}

.summary {
  top: 62px;
  background-color: #f7f7f7;
}

.loading-parent {
  position: relative;
}

.narrative-height {
  max-height: 90px;
}
</style>

<style lang="css">
.mx-input-append {
  height: auto !important;
}
.mx-input-append .mx-calendar-icon {
  height: auto !important;
}
</style>
