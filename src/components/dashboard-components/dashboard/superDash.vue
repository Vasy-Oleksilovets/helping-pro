<template>
    <div class="superDash">
        <b-row>
            <b-col sm="2">
                <!-- <b-form-select v-if="role===3" v-model="selected" :options="options"></b-form-select>
                <span v-else>Atlanta</span> -->
            </b-col>
        </b-row>
        <div v-if="is_detail_page===''" >
            <b-row class="justify-content-around">
                <div role="button"  class="text-center round-item" style="align-items-center" @click="gotoDetailPage1()">
                    <radial-progress-bar :diameter="130"
                        style="margin: 0 auto; cursor: pointer"
                        startColor="#0C2340"
                        stopColor="#0C2340"
                        innerStrokeColor="#C4C4C4"
                        :strokeWidth=15
                        :innerStrokeWidth=18
                        :completed-steps="inProgress"
                        :total-steps="totalSteps">
                        <div style="font-size: 20px;" class="font-weight-bold">{{ inProgress }}</div>
                    </radial-progress-bar>
                    <div class="title-font" style="width: 130px">New Business Signup</div>
                </div>
                <div role="button"  class="text-center round-item" style="align-items-center" @click="gotoEstimatorSignup()">
                    <radial-progress-bar :diameter="130"
                        style="margin: 0 auto"
                        startColor="#0C2340"
                        stopColor="#0C2340"
                        innerStrokeColor="#C4C4C4"
                        :strokeWidth=15
                        :innerStrokeWidth=18
                        :completed-steps="inProgress"
                        :total-steps="totalSteps">
                        <div style="font-size: 20px;" class="font-weight-bold">{{ inProgress }}</div>
                    </radial-progress-bar>
                    <div class="title-font" style="width: 130px">New Professional Signup</div>
                </div>
                <div role="button" @click="gotoToalProjects()" class="text-center round-item" style="align-items-center">
                    <radial-progress-bar :diameter="130"
                        style="margin: 0 auto"
                        startColor="#0C2340"
                        stopColor="#0C2340"
                        innerStrokeColor="#C4C4C4"
                        :strokeWidth=15
                        :innerStrokeWidth=18
                        :completed-steps="inProgress"
                        :total-steps="totalSteps">
                        <div style="font-size: 20px;" class="font-weight-bold">{{ inProgress }}</div>
                    </radial-progress-bar>
                    <div class="title-font">New Projects</div>
                </div>
                <div role="button"  class="text-center round-item" style="align-items-center" @click="gotoTotalBusiness()">
                    <radial-progress-bar :diameter="130"
                        style="margin: 0 auto"
                        startColor="#0C2340"
                        stopColor="#0C2340"
                        innerStrokeColor="#C4C4C4"
                        :strokeWidth=15
                        :innerStrokeWidth=18
                        :completed-steps="inProgress"
                        :total-steps="totalSteps">
                        <div style="font-size: 20px;" class="font-weight-bold">{{ inProgress }}</div>
                    </radial-progress-bar>
                    <div class="title-font">Total Business</div>
                </div>
                <div role="button" class="text-center round-item" style="align-items-center" @click="gotoTotalEstimators()">
                    <radial-progress-bar :diameter="130"
                        style="margin: 0 auto"
                        startColor="#0C2340"
                        stopColor="#0C2340"
                        innerStrokeColor="#C4C4C4"
                        :strokeWidth=15
                        :innerStrokeWidth=18
                        :completed-steps="inProgress"
                        :total-steps="totalSteps">
                        <div style="font-size: 20px;" class="font-weight-bold">{{ inProgress }}</div>
                    </radial-progress-bar>
                    <div class="title-font">Total Professionals</div>
                </div>
            </b-row>
            <hr  />
            <div>
                Client Data
            </div>
            <b-row class="justify-content-around">
                <div class="text-center" style="align-items-center">
                    <radial-progress-bar :diameter="130"
                        style="margin: 0 auto"
                        startColor="#0C2340"
                        stopColor="#0C2340"
                        innerStrokeColor="#C4C4C4"
                        :strokeWidth=15
                        :innerStrokeWidth=18
                        :completed-steps="inProgress"
                        :total-steps="totalSteps">
                        <div style="font-size: 20px;" class="font-weight-bold">{{ inProgress }}</div>
                    </radial-progress-bar>
                    <div class="title-font text-secondary">Companies</div>
                </div>
                <div class="text-center" style="align-items-center">
                    <radial-progress-bar :diameter="130"
                        style="margin: 0 auto"
                        startColor="#0C2340"
                        stopColor="#0C2340"
                        innerStrokeColor="#C4C4C4"
                        :strokeWidth=15
                        :innerStrokeWidth=18
                        :completed-steps="inProgress"
                        :total-steps="totalSteps">
                        <div style="font-size: 20px;" class="font-weight-bold">{{ inProgress }}</div>
                    </radial-progress-bar>
                    <div class="title-font text-secondary">Locations</div>
                </div>
                <div class="text-center" style="align-items-center">
                    <radial-progress-bar :diameter="130"
                        style="margin: 0 auto"
                        startColor="#0C2340"
                        stopColor="#0C2340"
                        innerStrokeColor="#C4C4C4"
                        :strokeWidth=15
                        :innerStrokeWidth=18
                        :completed-steps="inProgress"
                        :total-steps="totalSteps">
                        <div style="font-size: 20px;" class="font-weight-bold">{{ inProgress }}</div>
                    </radial-progress-bar>
                    <div class="title-font text-secondary">Users</div>
                </div>
                <div class="text-center" style="align-items-center">
                    <radial-progress-bar :diameter="130"
                        style="margin: 0 auto"
                        startColor="#0C2340"
                        stopColor="#0C2340"
                        innerStrokeColor="#C4C4C4"
                        :strokeWidth=15
                        :innerStrokeWidth=18
                        :completed-steps="inProgress"
                        :total-steps="totalSteps">
                        <div style="font-size: 20px;" class="font-weight-bold">{{ inProgress }}</div>
                    </radial-progress-bar>
                    <div class="title-font text-secondary">Projects</div>
                </div>
                <div class="text-center" style="align-items-center">
                    <radial-progress-bar :diameter="130"
                        style="margin: 0 auto"
                        startColor="#0C2340"
                        stopColor="#0C2340"
                        innerStrokeColor="#C4C4C4"
                        :strokeWidth=15
                        :innerStrokeWidth=18
                        :completed-steps="inProgress"
                        :total-steps="totalSteps">
                        <div style="font-size: 20px;" class="font-weight-bold">{{ inProgress }}</div>
                    </radial-progress-bar>
                    <div class="title-font text-secondary">Project in Progress</div>
                </div>
            </b-row>

            <hr  />
            <div>
                Talent Data
            </div>
            <b-row class="justify-content-around">
                <div class="text-center" style="align-items-center">
                    <radial-progress-bar :diameter="130"
                        style="margin: 0 auto"
                        startColor="#0C2340"
                        stopColor="#0C2340"
                        innerStrokeColor="#C4C4C4"
                        :strokeWidth=15
                        :innerStrokeWidth=18
                        :completed-steps="inProgress"
                        :total-steps="totalSteps">
                        <div style="font-size: 20px;" class="font-weight-bold">3000</div>
                    </radial-progress-bar>
                    <div class="title-font text-secondary">Project Managers</div>
                </div>
                <div class="text-center" style="align-items-center">
                    <radial-progress-bar :diameter="130"
                        style="margin: 0 auto"
                        startColor="#0C2340"
                        stopColor="#0C2340"
                        innerStrokeColor="#C4C4C4"
                        :strokeWidth=15
                        :innerStrokeWidth=18
                        :completed-steps="inProgress"
                        :total-steps="totalSteps">
                        <div style="font-size: 20px;" class="font-weight-bold">5780</div>
                    </radial-progress-bar>
                    <div class="title-font text-secondary">Cost Professionals</div>
                </div>
                <div class="text-center" style="align-items-center">
                    <radial-progress-bar :diameter="130"
                        style="margin: 0 auto"
                        startColor="#0C2340"
                        stopColor="#0C2340"
                        innerStrokeColor="#C4C4C4"
                        :strokeWidth=15
                        :innerStrokeWidth=18
                        :completed-steps="inProgress"
                        :total-steps="totalSteps">
                        <div style="font-size: 20px;" class="font-weight-bold">50</div>
                    </radial-progress-bar>
                    <div class="title-font text-secondary">States</div>
                </div>
                <div class="text-center" style="align-items-center">
                    <radial-progress-bar :diameter="130"
                        style="margin: 0 auto"
                        startColor="#0C2340"
                        stopColor="#0C2340"
                        innerStrokeColor="#C4C4C4"
                        :strokeWidth=15
                        :innerStrokeWidth=18
                        :completed-steps="inProgress"
                        :total-steps="totalSteps">
                        <div style="font-size: 20px;" class="font-weight-bold">19502</div>
                    </radial-progress-bar>
                    <div class="title-font text-secondary">Cities</div>
                </div>
                <div class="text-center" style="align-items-center">
                    <radial-progress-bar :diameter="130"
                        style="margin: 0 auto"
                        startColor="#0C2340"
                        stopColor="#0C2340"
                        innerStrokeColor="#C4C4C4"
                        :strokeWidth=15
                        :innerStrokeWidth=18
                        :completed-steps="inProgress"
                        :total-steps="totalSteps">
                        <div style="font-size: 20px;" class="font-weight-bold">60</div>
                    </radial-progress-bar>
                    <div class="title-font text-secondary">Project in Progress</div>
                </div>
            </b-row>
            <hr  />
            <div>
                Project Data
            </div>
            <b-row class="justify-content-around">
                <div class="text-center" style="align-items-center">
                    <radial-progress-bar :diameter="130"
                        style="margin: 0 auto"
                        startColor="#0C2340"
                        stopColor="#0C2340"
                        innerStrokeColor="#C4C4C4"
                        :strokeWidth=15
                        :innerStrokeWidth=18
                        :completed-steps="inProgress"
                        :total-steps="totalSteps">
                        <div style="font-size: 20px;" class="font-weight-bold">60</div>
                    </radial-progress-bar>
                    <div class="title-font text-secondary">In Progress</div>
                </div>
                <div class="text-center" style="align-items-center">
                    <radial-progress-bar :diameter="130"
                        style="margin: 0 auto"
                        startColor="#0C2340"
                        stopColor="#0C2340"
                        innerStrokeColor="#C4C4C4"
                        :strokeWidth=15
                        :innerStrokeWidth=18
                        :completed-steps="inProgress"
                        :total-steps="totalSteps">
                        <div style="font-size: 20px;" class="font-weight-bold">60</div>
                    </radial-progress-bar>
                    <div class="title-font text-secondary">In Queue</div>
                </div>
                <div class="text-center" style="align-items-center">
                    <radial-progress-bar :diameter="130"
                        style="margin: 0 auto"
                        startColor="#0C2340"
                        stopColor="#0C2340"
                        innerStrokeColor="#C4C4C4"
                        :strokeWidth=15
                        :innerStrokeWidth=18
                        :completed-steps="inProgress"
                        :total-steps="totalSteps">
                        <div style="font-size: 20px;" class="font-weight-bold">{{ inProgress }}</div>
                    </radial-progress-bar>
                    <div class="title-font text-secondary">Completed</div>
                </div>
                <div class="text-center" style="align-items-center">
                    <radial-progress-bar :diameter="130"
                        style="margin: 0 auto"
                        startColor="#0C2340"
                        stopColor="#0C2340"
                        innerStrokeColor="#C4C4C4"
                        :strokeWidth=15
                        :innerStrokeWidth=18
                        :completed-steps="inProgress"
                        :total-steps="totalSteps">
                        <div style="font-size: 20px;" class="font-weight-bold">{{ inProgress }}</div>
                    </radial-progress-bar>
                    <div class="title-font text-secondary">Overdue</div>
                </div>
                <div class="text-center" style="align-items-center">
                    <radial-progress-bar :diameter="130"
                        style="margin: 0 auto"
                        startColor="#0C2340"
                        stopColor="#0C2340"
                        innerStrokeColor="#C4C4C4"
                        :strokeWidth=15
                        :innerStrokeWidth=18
                        :completed-steps="inProgress"
                        :total-steps="totalSteps">
                        <div style="font-size: 20px;" class="font-weight-bold">{{ inProgress }}</div>
                    </radial-progress-bar>
                    <div class="title-font text-secondary">Dollar Value</div>
                </div>
                
            </b-row>
        </div>
        <div v-else style="overflow: auto" class="mt-4">
            <div class="d-flex justify-content-between">
                <div>
                    <b-button v-if="is_detail_page==='estimator_detail'" class="button-type rounded" @click="goBack('estimator_signup')">Back</b-button>
                    <b-button v-if="is_detail_page==='client_detail'" class="button-type rounded" @click="goBack('business_signup')">Back</b-button>
                     <b-button v-if="is_detail_page==='business_signup' || is_detail_page==='estimator_signup'" class="button-type rounded" @click="goBack('')">Back</b-button>
                </div>
                <div>
                    <div style="font-size: 18px; margin-top: 10px" v-if="is_detail_page==='business_signup'">New Business Signup</div>
                    <div style="font-size: 18px; margin-top: 10px" v-if="is_detail_page==='estimator_signup'">New Estimator Signup</div>
                    <div style="font-size: 18px; margin-top: 10px" v-if="is_detail_page==='total_projects'">New Projects</div>
                </div>
                <div>
                    <b-button v-if="is_detail_page!=='estimator_detail' && is_detail_page!=='client_detail'" class="button-type rounded" @click="viewAll()">View All</b-button>
                </div>
            </div>
            <div class="mt-2" v-if="is_detail_page==='business_signup'">
                <b-table :items="business_items" :fields="fields" responsive thClass="border-top-0" style="min-height: 20vh">
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
                            @click="gotoBusinessSignup(row)"
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
            <div class="mt-2" v-if="is_detail_page==='estimator_signup'">
                <b-table :items="estimators" :fields="estimator_fields" responsive thClass="border-top-0" style="min-height: 20vh">
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
                    <template v-slot:head(status)>
                        <b-dropdown
                            variant="primary"
                            size="lg"
                            style="background-color: white !important"
                            id="dropdown-1"
                            text="Status"
                        >
                            <b-dropdown-item @click="filter_by_status_estimator('All')">All</b-dropdown-item>
                            <b-dropdown-item
                                v-for="status in status_list"
                                :key="status.value"
                                @click="filter_by_status_estimator(status.value)"
                                >{{ status.text }}</b-dropdown-item>
                        </b-dropdown>
                    </template>
                    <template v-slot:head(discipline)>
                        <b-dropdown
                            variant="primary"
                            size="lg"
                            style="background-color: white !important; width: '80%'"
                            id="dropdown-1"
                            text="Discipline"
                        >
                            <b-dropdown-item @click="filter_by_discipline('All')">All</b-dropdown-item>
                            <b-dropdown-item @click="filter_by_discipline(item)" v-for="item in discipline_list" :key="item">
                                {{item}}
                            </b-dropdown-item>
                        </b-dropdown>
                    </template>

                    <template v-slot:head(role)>
                        <b-dropdown
                            variant="primary"
                            size="lg"
                            style="background-color: white !important; width: '80%'"
                            id="dropdown-1"
                            text="Role"
                        >
                            <b-dropdown-item @click="filter_by_role('All')">All</b-dropdown-item>
                            <b-dropdown-item @click="filter_by_role(item)" v-for="item in role_list" :key="item">
                                {{item.text}}
                            </b-dropdown-item>
                        </b-dropdown>
                    </template>

                    <template v-slot:cell(button)="row">
                        <div style="text-align: center">
                            <b-button
                                class="button-type rounded"
                                @click="gotoEstimatorDetail(row)"
                                >View More</b-button
                            >
                        </div>
                    </template>
                    <template v-slot:cell(total_projects)="row">
                        <div class="text-center">{{row.value}}</div>
                    </template>
                    <template v-slot:cell(status)="row">
                        <div class="dropdown-wrapper">
                            <b-form-select :key="row.value" @change="changeStatus(row)" v-model="row.value" :options="status_list"></b-form-select>
                        </div>
                    </template>

                    <template v-slot:cell(role)="row">
                        <div class="dropdown-wrapper">
                            <b-form-select  :key="row.value" @change="changeRole(row)" v-model="row.value" :options="role_list"></b-form-select>
                        </div>
                    </template>

                    <template v-slot:cell(projects_completed)="row">
                        <div class="text-center">{{row.value}}</div>
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
            <div class="mt-2" v-if="is_detail_page==='total_projects'">
                <b-table
                    hover
                    thClass="border-top-0"
                    :items="projects"
                    :fields="project_fields"
                    responsive="sm"
                >
                    <template v-slot:head(client_company)="data">
                        <div>
                            <span class="title-font">{{ data.label }}</span>
                        </div>
                    </template>
                    <template v-slot:head(project_building)>
                        <b-dropdown
                            variant="primary"
                            size="lg"
                            style="background-color: white !important"
                            id="dropdown-1"
                            text="Project Building"
                        >
                            <b-dropdown-item @click="filter_by_project_building('All')"
                                >All</b-dropdown-item
                            >
                            <b-dropdown-item
                                @click="filter_by_project_building('Airport')"
                                >Airport</b-dropdown-item
                            >
                            <b-dropdown-item
                                @click="filter_by_project_building('Hospital')"
                                >Hospital</b-dropdown-item
                            >
                        </b-dropdown>
                    </template>
                    <template v-slot:head(project_type)>
                        <b-dropdown
                            variant="primary"
                            size="lg"
                            style="background-color: white !important"
                            id="dropdown-1"
                            text="Project Type"
                        >
                            <b-dropdown-item @click="filter_by_project_type('All')"
                                >View all</b-dropdown-item
                            >
                            <b-dropdown-item
                                @click="filter_by_project_type('Conceptual')"
                                >Conceptual</b-dropdown-item
                            >
                            <b-dropdown-item
                                @click="filter_by_project_type('Schematic')"
                                >Schematic</b-dropdown-item
                            >
                            <b-dropdown-item @click="filter_by_project_type('Design')"
                                >Design</b-dropdown-item
                            >
                            <b-dropdown-item
                                @click="filter_by_project_type('Construction')"
                                >Construction</b-dropdown-item
                            >
                            <b-dropdown-item
                                @click="filter_by_project_type('Bids/Proposals')"
                                >Bids/Proposals</b-dropdown-item
                            >
                        </b-dropdown>
                    </template>
                    <template v-slot:head(budget)>
                        <div class="budget">
                            <b-dropdown
                                variant="primary"
                                size="lg"
                                style="background-color: white !important"
                                id="dropdown-1"
                                text="Budget"
                            >
                                <b-dropdown-form>
                                    <b-form-group
                                        label-for="dropdown-form-password"
                                        class="d-flex"
                                        style="display: flex"
                                    >   
                                        <div class="d-flex">
                                        <span style="font-weight: 600" class="mr-2"
                                            >from</span
                                        >
                                        <b-form-input
                                            id="dropdown-form-password"
                                            v-model="value[0]"
                                            type="text"
                                            size="sm"
                                        ></b-form-input>
                                        <span style="font-weight: 600" class="mr-2 ml-2"
                                            >to</span
                                        >
                                        <b-form-input
                                            id="dropdown-form-password"
                                            type="text"
                                            size="sm"
                                            v-model="value[1]"
                                        ></b-form-input>
                                        <span style="font-weight: 600" class="mr-2 ml-2"
                                            >/hr</span
                                        >
                                        </div>
                                    </b-form-group>
                                    <b-form-group>
                                        <div
                                            style="display:flex; justify-content: space-between"
                                        >
                                            <span style="font-weight: 600" class="mr-2"
                                                >$0</span
                                            >
                                            <span style="font-weight: 600" class="mr-2"
                                                >$100000</span
                                            >
                                        </div>
                                        <vue-slider
                                            v-model="value"
                                            :max="max"
                                        ></vue-slider>
                                    </b-form-group>
                                </b-dropdown-form>
                            </b-dropdown>
                        </div>
                    </template>
                    <template v-slot:head(start_date)>
                        <b-dropdown
                            variant="primary"
                            size="lg"
                            style="background-color: white !important"
                            id="dropdown-1"
                            text="Start Date"
                        >
                            <b-dropdown-item @click="filter_by_date(0)"
                                >Oldest</b-dropdown-item
                            >
                            <b-dropdown-item @click="filter_by_date(1)"
                                >Newest</b-dropdown-item
                            >
                        </b-dropdown>
                    </template>
                    <template v-slot:head(status)>
                        <b-dropdown
                            variant="primary"
                            size="lg"
                            style="background-color: white !important"
                            id="dropdown-1"
                            text="Status"
                        >
                            <b-dropdown-item @click="filter_by_status('All')"
                                >All</b-dropdown-item
                            >
                            <b-dropdown-item @click="filter_by_status('Pending')"
                                >Pending</b-dropdown-item
                            >
                            <b-dropdown-item @click="filter_by_status('Accepted')"
                                ><span class="font-weight-bold">Accepted</span></b-dropdown-item
                            >
                            <b-dropdown-item @click="filter_by_status('Deined')"
                                >Deined</b-dropdown-item
                            >
                            <b-dropdown-item @click="filter_by_status('Claimed')"
                                >Claimed</b-dropdown-item
                            >
                        </b-dropdown>
                    </template>
                    <template v-slot:head(filter_by)>
                        <b-dropdown
                            text="Filter by"
                            style="float: right;"
                            variant="outline-dark"
                            class="m-1 outline-sort-by"
                        >
                            <b-dropdown-item @click="filter_type(0)"
                                >All Messages</b-dropdown-item
                            >
                            <b-dropdown-item @click="filter_type(1)"
                                >New Messages</b-dropdown-item
                            >
                            <b-dropdown-item @click="filter_type(2)"
                                >Read Messages</b-dropdown-item
                            >
                        </b-dropdown>
                    </template>
                    <template v-slot:cell(filter_by)>
                        <b-button
                            class="button-type rounded"
                            style="float: right"
                            @click="gotoDetailPage"
                            >View Project Details</b-button
                        >
                    </template>
                    <template v-slot:cell(status)="row">
                        <span v-if="row.value == 'Denied'" style="color:#C9C9C9">{{
                            row.value
                        }}</span>
                        <span v-else>{{ row.value }}</span>
                    </template>
                    <template v-slot:cell(client_company)="row">
                        <span v-if="row.item.type == 1" style="color: #E07C00"
                            >* New *
                        </span>
                        <span
                            v-else
                            style="color: #C9C9C9; margin-right: 6px; margin-left: 6px"
                        >
                            Read
                        </span>
                        <span>{{ row.value }}</span>
                    </template>
                    <template v-slot:cell(budget)="row">
                        <span>{{ row.value | formatMoney('$', 0) }}</span>
                    </template>
                </b-table>
            </div>

            <div v-if="is_detail_page === 'estimator_detail'">
                <ExtraProfile  :role="passingData"/>
            </div>
            <div v-if="is_detail_page === 'client_detail'">
                <ExtraProfile  :role="clientPassingData"/>
            </div>
            
        </div>

        <b-modal id="modal-header-modal" centered>
            <template v-slot:modal-header="{}">
                <span @click="close()"></span>
            </template>
            <div class="text-center project-detail">
                <div class="mb-3 mt-4">
                    Please make sure to verify all the information <br/> before changing the status to Active!
                    <br />
                </div>
            </div>
            <template v-slot:modal-footer="{ ok }">
                <div
                    class="text-center mb-4"
                    style="margin-left: auto; margin-right: auto;"
                >
                    <b-btn
                        class="dialog-btn-style second-btn-style mr-2"
                        @click="ok(), changeRealStatus()"
                        >Confirm</b-btn
                    >
                    <b-btn
                        class="dialog-btn-style second-btn-style"
                        @click="ok(), cancelRealStatus()"
                        >Cancel</b-btn
                    >
                </div>
            </template>
        </b-modal>
        <b-modal id="modal-header-modal1" centered>
            <template v-slot:modal-header="{}">
                <span @click="close()"></span>
            </template>
            <div class="text-center project-detail">
                <div class="mb-3 mt-4">
                    Are you sure you want to change the status from Active to Hold?<br/>
                    This will stop the estimator from accepting new projects.
                    <br />
                </div>
            </div>
            <template v-slot:modal-footer="{ ok }">
                <div
                    class="text-center mb-4"
                    style="margin-left: auto; margin-right: auto;"
                >
                    <b-btn
                        class="dialog-btn-style second-btn-style mr-2"
                        @click="ok(), changeRealStatus()"
                        >Confirm</b-btn
                    >
                    <b-btn
                        class="dialog-btn-style second-btn-style"
                        @click="ok(), cancelRealStatus()"
                        >Cancel</b-btn
                    >
                </div>
            </template>
        </b-modal>
        <Modal v-on:submit="onRoleYes" :id="'status-modal'" :message="roleModalText"  v-on:cancel="closeRoleModal" v-bind:showModal="showRoleModal" :yesBtnText="'Confirm'" :noButtonText="'Cancel'" />
    </div>
</template>

<script>
import { BIcon, BIconCaretDownFill } from 'bootstrap-vue'
import RadialProgressBar from 'vue-radial-progress'
import AddressProxy from '@/proxies/AddressProxy.js';
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';
import ExtraProfile from '../../../components/dashboard-components/myprofile/extraprofile';
import EstimatorProxy from '@/proxies/EstimatorProxy.js';
import Modal from '../../../components/Modal.vue'
export default {
    name: 'superDash',
    props: ['role', 'office_name'],
    components: {
        BIcon,
        BIconCaretDownFill,
        RadialProgressBar,
        VueSlider,
        ExtraProfile,
        Modal
    },
    data() {
        return {
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
            estimator_fields: [
                {
                    key: 'name',
                    sortable: false,
                },
                {
                    key: 'location',
                    sortable: false,
                },
                {
                    key: 'discipline',
                    sortable: false
                },
                {
                    key: 'role',
                    sortable: false
                },
                {
                    key: 'status',
                    sortable: false
                },
                {
                    key: 'button',
                    sortable: false
                },
            ],
            business_items: [
                { name: 'Google Healthcare', location: 'Alabama', client_id: 'AI_GA_001', total_projects: 2},
                { name: 'Atlanta Airport', location: 'Alabama', client_id: 'AI_GA_002', total_projects: 3 },
                { name: 'NewYork Station', location: 'Alabama', client_id: 'AI_GA_003' , total_projects: 4},
                { name: 'ABC Hospital', location: 'Alabama', client_id: 'AI_GA_004' , total_projects: 3}
            ],
            estimators: [],
            recent_projects: [
                { name: 'David', location: 'Alabama', discipline: 'Mechanical', status: 'Active'},
                { name: 'Peter', location: 'Alabama', discipline: 'Electrical', status: 'Hold' },
                { name: 'David', location: 'Alabama', discipline: 'Mechnical' , status: 'Active'},
                { name: 'Peter', location: 'Alabama', discipline: 'Electrical' , status: 'Hold'}
            ],
            inProgress: 60,
            inQueue: 60,
            completed: 60,
            overdue: 60,
          
          dollarValue: 60,
            totalSteps: 100,
            selected: '',
            options: [
                { value: '', text: 'All offices' },
                { value: 'Atlanta', text: 'Atlanta' },
                { value: 'Alabama', text: 'Alabama' },
                { value: 'Alaska', text: 'Alaska'}
            ],
            is_detail_page: '',
            states: [],
            search_key_location: '',
            status_list: [
                { value: 'Active', text: 'Active' },
                { value: 'Hold', text: 'Hold' }
            ],
            changeStatusValue: {},
            discipline_list: [
                'General/Architectural',
                'Structural',
                'Mechanical',
                'Electrical',
                'Site/Civil'
            ],
            default_estimators: [],
            default_business: [],

            //Data for the new projects
            totalRows: 1,
            currentPage: 1,
            perPage: 15,
            pageOptions: [5, 10, 15],
            sortBy: 'age',
            sortDesc: false,
            project_fields: [
                {
                    key: 'client_company',
                    sortable: false,
                },
                {
                    key: 'project_building',
                    sortable: false,
                },
                {
                    key: 'project_type',
                    sortable: false,
                },
                {
                    key: 'from',
                    sortable: false,
                },
                {
                    key: 'budget',
                    sortable: false,
                },
                {
                    key: 'start_date',
                    sortable: false,
                },
                {
                    key: 'date_received',
                    sortable: false,
                },
                {
                    key: 'status',
                    sortable: false,
                },
                {
                    key: 'filter_by',
                    label: 'Filter by',
                },
            ],
            projects: [
                {
                    isActive: true,
                    type: 1,
                    filter_by: '',
                    status: 'Pending',
                    start_date: '6/01/2020',
                    date_received: '6/01/2020',
                    from: 'Bruce Client',
                    budget: 2000,
                    project_type: 'Costruction',
                    project_building: 'Airport',
                    client_company: 'Delta',
                },
                {
                    isActive: true,
                    type: 1,
                    filter_by: '',
                    status: 'Accepted',
                    start_date: '6/01/2020',
                    date_received: '6/01/2020',
                    budget: 32000,
                    from: 'Bruce Client',
                    project_type: 'Costruction',
                    project_building: 'Hospital',
                    client_company: 'Google Healthcare',
                },
                {
                    isActive: true,
                    type: 2,
                    filter_by: '',
                    status: 'Denied',
                    start_date: '6/01/2020',
                    date_received: '6/01/2020',
                    budget: 2000,
                    from: 'Bruce Client',
                    project_type: 'Costruction',
                    project_building: 'Airport',
                    client_company: 'Davis Healthcare',
                },
                {
                    isActive: true,
                    type: 1,
                    filter_by: '',
                    status: 'Pending',
                    start_date: '5/01/2020',
                    date_received: '6/01/2020',
                    budget: 42000,
                    from: 'Bruce Client',
                    project_type: 'Bids/Proposals',
                    project_building: 'Hospital',
                    client_company: 'Google Healthcare',
                },
                {
                    isActive: true,
                    type: 1,
                    filter_by: '',
                    status: 'Pending',
                    start_date: '5/01/2020',
                    date_received: '6/01/2020',
                    budget: 2000,
                    from: 'Bruce Client',
                    project_type: 'Bids/Proposals',
                    project_building: 'Airport',
                    client_company: 'Atlanta',
                },
                {
                    isActive: true,
                    type: 2,
                    filter_by: '',
                    status: 'Claimed',
                    start_date: '4/01/2020',
                    date_received: '6/01/2020',
                    budget: 23000,
                    from: 'Bruce Client',
                    project_type: 'Conceptual',
                    project_building: 'Hospital',
                    client_company: 'Google Healthcare',
                },
                {
                    isActive: true,
                    type: 2,
                    filter_by: '',
                    status: 'Accepted',
                    start_date: '4/01/2020',
                    date_received: '6/01/2020',
                    budget: 32000,
                    from: 'Bruce Client',
                    project_type: 'Conceptual',
                    project_building: 'Airport',
                    client_company: 'Google Healthcare',
                },
                {
                    isActive: true,
                    type: 2,
                    filter_by: '',
                    status: 'Denied',
                    start_date: '4/01/2020',
                    date_received: '6/01/2020',
                    from: 'Bruce Client',
                    budget: 21000,  
                    project_type: 'Conceptual',
                    project_building: 'Hospital',
                    client_company: 'Google Healthcare',
                },
                {
                    isActive: true,
                    type: 2,
                    filter_by: '',
                    status: 'Pending',
                    start_date: '4/01/2020',
                    date_received: '6/01/2020',
                    from: 'Bruce Client',
                    budget: 23000,
                    project_type: 'Conceptual',
                    project_building: 'Airport',
                    client_company: 'Google Healthcare',
                },
                {
                    isActive: true,
                    type: 1,
                    filter_by: '',
                    status: 'Pending',
                    start_date: '4/01/2020',
                    date_received: '6/01/2020',
                    from: 'Bruce Client',
                    budget: 2000,
                    project_type: 'Conceptual',
                    project_building: 'Hospital',
                    client_company: 'Google Healthcare',
                },
                {
                    isActive: true,
                    type: 1,
                    filter_by: '',
                    status: 'Pending',
                    start_date: '4/01/2020',
                    date_received: '6/01/2020',
                    from: 'Bruce Client',
                    budget: 25000,
                    project_type: 'Conceptual',
                    project_building: 'Airport',
                    client_company: 'Google Healthcare',
                },
                {
                    isActive: true,
                    type: 2,
                    filter_by: '',
                    status: 'Denied',
                    start_date: '4/01/2020',
                    date_received: '6/01/2020',
                    from: 'Bruce Client',
                    budget: 72000,
                    project_type: 'Conceptual',
                    project_building: 'Hospital',
                    client_company: 'Google Healthcare',
                },
                {
                    isActive: true,
                    type: 2,
                    filter_by: '',
                    status: 'Denied',
                    start_date: '4/01/2020',
                    date_received: '6/01/2020',
                    from: 'Bruce Client',
                    budget: 92000,
                    project_type: 'Conceptual',
                    project_building: 'Airport',
                    client_company: 'Google Healthcare',
                },
                {
                    isActive: true,
                    type: 2,
                    filter_by: '',
                    status: 'Claimed',
                    start_date: '4/01/2020',
                    date_received: '6/01/2020',
                    from: 'Bruce Client',
                    budget: 2500,
                    project_type: 'Conceptual',
                    project_building: 'Hospital',
                    client_company: 'Google Healthcare',
                },
                {
                    isActive: true,
                    type: 2,
                    filter_by: '',
                    status: 'Denied',
                    start_date: '9/01/2020',
                    date_received: '6/01/2020',
                    from: 'Bruce Client',
                    budget: 42000,
                    project_type: 'Conceptual',
                    project_building: 'Airport',
                    client_company: 'Google Healthcare',
                }
            ],
            value: [0, 100000],
            max: 100000,
            passingData: 0,
            clientPassingData: 2,
            role_list: [
                { value: 'Production Manager', text: 'Production Manager' },
                { value: 'CC Project Manager', text: 'Project Manager' },
                { value: 'Estimator', text: 'Estimator' }
            ],
            showRoleModal : false,
            roleModalText : ''
        };
    },
    methods: {
        gotoDetailPage1(){
            this.is_detail_page = 'business_signup';
        },
        gotoEstimatorSignup(){
            this.is_detail_page = 'estimator_signup';
        },
        gotoToalProjects(){
            this.is_detail_page = 'total_projects';
        },

        detect_change_filter() {
            if(this.is_detail_page === "estimator_signup"){
                this.states = this.temp_states.filter(
                    state => state.name.indexOf(this.search_key_location) > -1
                );
            }
            
        },
        filter_by_location(location) {
            if(this.is_detail_page==="estimator_signup"){
                if (location == 'All') this.estimators = this.default_estimators;
                else
                    this.estimators = this.default_estimators.filter(
                        item => item.location == location
                    );
            }
            else{
                if (location == 'All') this.business_items = this.default_business;
                else
                    this.business_items = this.default_business.filter(
                        item => item.location == location
                    );
            }
        },
        changeStatus(row){
            this.changeStatusValue = row;
            if(row.value=="Hold") this.$root.$emit('bv::show::modal', 'modal-header-modal1')
            else this.$root.$emit('bv::show::modal', 'modal-header-modal')
        },
        changeRealStatus(){
            let temp = {};
            temp = this.estimators[this.changeStatusValue.index];
            temp.status = this.changeStatusValue.value;
            this.estimators[this.changeStatusValue.index] = temp;
        },
        cancelRealStatus(){
            let temp = this.estimators.splice(this.changeStatusValue.index, 1);
            this.estimators.splice(this.changeStatusValue.index, 0, temp[0]);
        },
        viewAll(){
            if(this.is_detail_page==='business_signup')
                this.$router.push('/dashboard/adminSearchClients');
            if(this.is_detail_page==='estimator_signup')
                this.$router.push('/dashboard/adminListEstimators');
            if(this.is_detail_page==='total_projects')
                this.$router.push('/dashboard/adminSearchProjects');
        },
        gotoTotalBusiness(){
            this.$router.push('/dashboard/adminSearchClients');
        },
        gotoTotalEstimators(){
            this.$router.push('/dashboard/adminListEstimators');
        },
        filter_by_discipline(status) {
            if(status == 'All') this.estimators = this.default_estimators;
            else
                this.estimators = this.default_estimators.filter(
                    item => item.discipline == status
                );
        },
        filter_by_status_estimator(status){
            if (status == 'All') this.estimators = this.default_estimators;
            else
                this.estimators = this.default_estimators.filter(
                    item => item.status == status
                );
        },
        //function for all the projects.
        filter_by_project_building(type) {
            switch (type) {
                case 'All':
                    this.projects = this.default_projects;
                    break;
                case 'Airport':
                    this.projects = this.default_projects.filter(
                        item => item.project_building == 'Airport'
                    );
                    break;
                case 'Hospital':
                    this.projects = this.default_projects.filter(
                        item => item.project_building == 'Hospital'
                    );
                    break;
                default:
                    break;
            }
        },
        filter_by_project_type(type) {
            switch (type) {
                case 'All':
                    this.projects = this.default_projects;
                    break;
                case 'Conceptual':
                    this.projects = this.default_projects.filter(
                        item => item.project_type == 'Conceptual'
                    );
                    break;
                case 'Schematic':
                    this.projects = this.default_projects.filter(
                        item => item.project_type == 'Schematic'
                    );
                    break;
                case 'Design':
                    this.projects = this.default_projects.filter(
                        item => item.project_type == 'Design'
                    );
                    break;
                case 'Costruction':
                    this.projects = this.default_projects.filter(
                        item => item.project_type == 'Costruction'
                    );
                    break;
                case 'Bids/Proposals':
                    this.projects = this.default_projects.filter(
                        item => item.project_type == 'Bids/Proposals'
                    );
                    break;
                default:
                    break;
            }
        },
        filter_by_date(type) {
            if (type == 0) {
                this.projects.sort(function(a, b) {
                    // var adate = moment("12-25-1995", "MM-DD-YYYY");
                    if (a.start_date < b.start_date) return -1;
                    if (a.start_date > b.start_date) return 1;
                    return 0;
                });
            }
            if (type == 1) {
                this.projects.sort(function(a, b) {
                    if (a.start_date > b.start_date) return -1;
                    if (a.start_date < b.start_date) return 1;
                    return 0;
                });
            }
        },
        filter_by_status(type) {
            switch (type) {
                case 'All':
                    this.projects = this.default_projects;
                    break;
                case 'Pending':
                    this.projects = this.default_projects.filter(
                        item => item.status == 'Pending'
                    );
                    break;
                case 'Accepted':
                    this.projects = this.default_projects.filter(
                        item => item.status == 'Accepted'
                    );
                    break;
                case 'Deined':
                    this.projects = this.default_projects.filter(
                        item => item.status == 'Denied'
                    );
                    break;
                case 'Claimed':
                    this.projects = this.default_projects.filter(
                        item => item.status == 'Claimed'
                    );
                    break;
                default:
                    break;
            }
        },
        goBack(param){
            this.is_detail_page = param;
        },
        gotoDetailPage(){
            this.$router.push('/dashboard/projectrequest/client/123')
        },
        gotoEstimatorDetail(row){
            this.is_detail_page = 'estimator_detail';
        },
        gotoBusinessSignup(row){
            this.is_detail_page = 'client_detail';
        },
        setEstimators(data) {
            this.estimators = data.map(element => ({
                    name: element.firstName + ' ' + element.lastName,
                    location: element.location,
                    // Set role default value to Estimator if the role is other than what mentioned in array
                    role: ['Production Manager','Estimator','CC Project Manager'].includes(element.role) ? element.role : 'Estimator',
                    discipline: element.discipline,
                    status: element.status != 'Active' ? 'Hold' : 'Active',
                    id: element.id
            }))
            this.default_estimators = this.estimators
        },
        filter_by_role(status) {
            if(status == 'All') this.estimators = this.default_estimators;
            else
                this.estimators = this.default_estimators.filter(
                    item => item.role == status.value
                );
        },
        changeRole(row) {
            this.changeStatusValue = row
            this.showRoleModal = true
            const newRole =this.role_list.find(each => each.value === row.value)
            this.roleModalText = this.getModalText('Role',newRole ? newRole.text : '')
        },
        onRoleYes(){
            if(this.changeStatusValue){
                const updatedData = {
                    estimatorProfileId: this.changeStatusValue.item.id,
                    estimatorRole: this.changeStatusValue.value
                }; 
                new EstimatorProxy().updateEstimatorRole(updatedData).then((response) => {
                    if(response.status == '200') {
                        console.log("SUCCESS: Estimator role updated successfully.")
                        // this.notificationMessage = "SUCCESS: Estimator role updated successfully.";
                    } else {
                        console.log("ERROR: Estimator role updation failed.")
                        // this.notificationMessage = "ERROR: Estimator role updation failed.";
                    }
                })
            }
            this.changeStatusValue = undefined
            this.showRoleModal =  false
        },
        closeRoleModal(){
            this.showRoleModal =  false
        },
        getModalText(modalName,value){
            return `Are you sure you want to change ${modalName} to ${value}?`
        }
    },
    created() { 
        new AddressProxy().getStates().then((response) => {
            this.states = response;
            this.temp_states = response;
            this.default_items = this.items;
            this.default_estimators = this.estimators;
            this.default_business = this.business_items;
            this.default_projects = this.projects;
        })
    },
    watch : {
        is_detail_page(){
            if(this.is_detail_page === 'estimator_signup'){
            new EstimatorProxy().getEstimators({isNewProfessional : true}).then((response) => {
                if(response.data && response.data.length) {
                    this.setEstimators(response.data);
                }
            })
        }
        }
    }
};
</script>
<style scoped>
.superDash {
    font-family: Montserrat;
    background-color: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    padding: 30px 40px 20px 40px;
    margin: 30px;
}
.button-type {
    background-color: #0c2340;
    color: white;
    font-weight: normal !important;
    padding-left: 20px;
    padding-right: 20px;
}
.title-font {
    font-size: 1em;
    color: red;
}
 .dialog-btn-style {
        padding: 7px 40px 7px 40px;
        border-radius: 8px;
        border-width: 0;
}
.second-btn-style {
    background-color: #83afdb;
}
.round-item {
    padding: 5px 20px;
}
.round-item:hover {
    background-color: #cccccc;
    transition: all 1s;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}
.dropdown-wrapper{
    width : 90%
}
</style>
