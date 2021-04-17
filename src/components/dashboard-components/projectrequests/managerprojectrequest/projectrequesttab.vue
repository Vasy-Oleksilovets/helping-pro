<template>
    <div class="client-project-submission">
        <b-table
            hover
            thClass="border-top-0"
            :items="items"
            :fields="fields"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :current-page="currentPage"
            :per-page="perPage"
            responsive="sm"
        >
            <template v-slot:head(company)="data">
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
             <template v-slot:head(area_of_expertise)>
                <b-dropdown
                    variant="primary"
                    size="lg"
                    style="background-color: white !important"
                    id="dropdown-1"
                    text="Area of Expertise"
                >
                    <b-dropdown-item @click="filter_by_area_of_expertise('All')"
                        >View all</b-dropdown-item
                    >
                    <b-dropdown-item
                        @click="filter_by_area_of_expertise('General & Architectural')"
                        >General & Architectural</b-dropdown-item
                    >
                    <b-dropdown-item
                        @click="filter_by_area_of_expertise('Structural')"
                        >Structural</b-dropdown-item
                    >
                    <b-dropdown-item
                        @click="filter_by_area_of_expertise('Electrical')"
                        >Electrical</b-dropdown-item
                    >
                    <b-dropdown-item
                        @click="filter_by_area_of_expertise('Site & Civil')"
                        >Site & Civil</b-dropdown-item
                    >
                </b-dropdown>
            </template>
            <template v-slot:head(compensation)>
                <div class="compensation text-center">
                    <b-dropdown
                        variant="primary"
                        size="lg"
                        style="background-color: white !important"
                        id="dropdown-1"
                        text="Compensation"
                    >
                        <b-dropdown-form>
                            <b-form-group
                                label-for="dropdown-form-password"
                                class="d-flex"
                            >
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
                            </b-form-group>
                            <b-form-group>
                                <div
                                    style="display:flex; justify-content: space-between"
                                >
                                    <span style="font-weight: 600" class="mr-2"
                                        >$0</span
                                    >
                                    <span style="font-weight: 600" class="mr-2"
                                        >$200</span
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
            <template v-slot:head(date_sent)>
                <b-dropdown
                    variant="primary"
                    size="lg"
                    style="background-color: white !important"
                    id="dropdown-1"
                    text="Date Sent"
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
                        >Accepted</b-dropdown-item
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
                    v-on:click="gotoDetailPage"
                    style="float: right"
                    >View Project Submission</b-button
                >
            </template>
            <template v-slot:cell(status)="row">
                <span v-if="row.value == 'Denied'" style="color:#C9C9C9">{{
                    row.value
                }}</span>
                <span v-else>{{ row.value }}</span>
            </template>
            <template v-slot:cell(company)="row">
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
            <template v-slot:cell(compensation)="row">
                <div class="text-center"><span>${{ row.value }}/hr</span></div>
            </template>
        </b-table>
        <b-row class="pb-5">
            <b-col md="4" offset-md="4">
                <b-pagination
                    v-model="currentPage"
                    :total-rows="totalRows"
                    :per-page="perPage"
                    align="fill"
                    size="sm"
                    class="my-0"
                ></b-pagination>
            </b-col>
        </b-row>
    </div>
</template>

<script>
//Import css and js for the range slider for the compensation
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';

export default {
    name: 'ProjectRequestTab',
    components: {
        VueSlider,
    },
    data() {
        return {
            totalRows: 1,
            currentPage: 1,
            perPage: 15,
            pageOptions: [5, 10, 15],
            sortBy: 'age',
            sortDesc: false,
            fields: [
                {
                    key: 'company',
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
                    key: 'estimator_name',
                    sortable: false
                },
                {
                    key: 'area_of_expertise',
                    sortable: false
                },
                {
                    key: 'compensation',
                    sortable: false,
                },
                {
                    key: 'date_sent',
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
            items: [
                {
                    isActive: true,
                    type: 1,
                    filter_by: '',
                    status: 'Pending',
                    date_sent: '6/01/2020',
                    compensation: 20,
                    project_type: 'Costruction',
                    estimator_name: 'Joe Estimator',
                    area_of_expertise: 'General & Archectural',
                    project_building: 'Airport',
                    company: 'Delta',
                },
                {
                    isActive: true,
                    type: 1,
                    filter_by: '',
                    status: 'Accepted',
                    date_sent: '6/01/2020',
                    compensation: 32,
                    project_type: 'Costruction',
                    estimator_name: 'Joe Estimator',
                    area_of_expertise: 'General & Architectural',
                    project_building: 'Hospital',
                    company: 'Google Healthcare',
                },
                {
                    isActive: true,
                    type: 2,
                    filter_by: '',
                    status: 'Denied',
                    date_sent: '6/01/2020',
                    compensation: 20,
                    project_type: 'Costruction',
                    estimator_name: 'Joe Estimator',
                    area_of_expertise: 'Structural',
                    project_building: 'Airport',
                    company: 'Davis Healthcare',
                },
                {
                    isActive: true,
                    type: 1,
                    filter_by: '',
                    status: 'Pending',
                    date_sent: '5/01/2020',
                    compensation: 42,
                    project_type: 'Bids/Proposals',
                    estimator_name: 'Joe Estimator',
                    area_of_expertise: 'Electrical',    
                    project_building: 'Hospital',
                    company: 'Google Healthcare',
                },
                {
                    isActive: true,
                    type: 1,
                    filter_by: '',
                    status: 'Pending',
                    date_sent: '5/01/2020',
                    compensation: 20,
                    project_type: 'Bids/Proposals',
                    estimator_name: 'Joe Estimator',
                    area_of_expertise: 'Site & Civil',    
                    project_building: 'Airport',
                    company: 'Atlanta',
                },
                {
                    isActive: true,
                    type: 2,
                    filter_by: '',
                    status: 'Claimed',
                    date_sent: '4/01/2020',
                    compensation: 23,
                    project_type: 'Conceptual',
                    estimator_name: 'Joe Estimator',
                    area_of_expertise: 'General & Architectural',    
                    project_building: 'Hospital',
                    company: 'Google Healthcare',
                },
                {
                    isActive: true,
                    type: 2,
                    filter_by: '',
                    status: 'Accepted',
                    date_sent: '4/01/2020',
                    compensation: 32,
                    project_type: 'Conceptual',
                    estimator_name: 'Joe Estimator',
                    area_of_expertise: 'Structural',    
                    project_building: 'Airport',
                    company: 'Google Healthcare',
                },
                {
                    isActive: true,
                    type: 2,
                    filter_by: '',
                    status: 'Denied',
                    date_sent: '4/01/2020',
                    compensation: 21,
                    project_type: 'Conceptual',
                    estimator_name: 'Joe Estimator',
                    area_of_expertise: 'Machanical',    
                    project_building: 'Hospital',
                    company: 'Google Healthcare',
                },
                {
                    isActive: true,
                    type: 2,
                    filter_by: '',
                    status: 'Pending',
                    date_sent: '4/01/2020',
                    compensation: 23,
                    project_type: 'Conceptual',
                    estimator_name: 'Joe Estimator',
                    area_of_expertise: 'Electrical',    
                    project_building: 'Airport',
                    company: 'Google Healthcare',
                },
                {
                    isActive: true,
                    type: 1,
                    filter_by: '',
                    status: 'Pending',
                    date_sent: '4/01/2020',
                    compensation: 20,
                    project_type: 'Conceptual',
                    estimator_name: 'Joe Estimator',
                    area_of_expertise: 'Site & Civil',
                    project_building: 'Hospital',
                    company: 'Google Healthcare',
                },
                {
                    isActive: true,
                    type: 1,
                    filter_by: '',
                    status: 'Pending',
                    date_sent: '4/01/2020',
                    compensation: 25,
                    project_type: 'Conceptual',
                    estimator_name: 'Joe Estimator',
                    area_of_expertise: 'General & Archectural',
                    project_building: 'Airport',
                    company: 'Google Healthcare',
                },
                {
                    isActive: true,
                    type: 2,
                    filter_by: '',
                    status: 'Denied',
                    date_sent: '4/01/2020',
                    compensation: 72,
                    project_type: 'Conceptual',
                    estimator_name: 'Joe Estimator',
                    area_of_expertise: 'Structural',
                    project_building: 'Hospital',
                    company: 'Google Healthcare',
                },
                {
                    isActive: true,
                    type: 2,
                    filter_by: '',
                    status: 'Denied',
                    date_sent: '4/01/2020',
                    compensation: 92,
                    project_type: 'Conceptual',
                    estimator_name: 'Joe Estimator',
                    area_of_expertise: 'Structural',
                    project_building: 'Airport',
                    company: 'Google Healthcare',
                },
                {
                    isActive: true,
                    type: 2,
                    filter_by: '',
                    status: 'Claimed',
                    date_sent: '4/01/2020',
                    compensation: 25,
                    project_type: 'Conceptual',
                    estimator_name: 'Joe Estimator',
                    area_of_expertise: 'Structural',
                    project_building: 'Hospital',
                    company: 'Google Healthcare',
                },
                {
                    isActive: true,
                    type: 2,
                    filter_by: '',
                    status: 'Denied',
                    date_sent: '9/01/2020',
                    compensation: 42,
                    project_type: 'Conceptual',
                    estimator_name: 'Joe Estimator',
                    area_of_expertise: 'Structural',
                    project_building: 'Airport',
                    company: 'Google Healthcare',
                },
                {
                    isActive: true,
                    type: 1,
                    filter_by: '',
                    status: 'Denied',
                    date_sent: '8/01/2020',
                    compensation: 25,
                    project_type: 'Schematic',
                    estimator_name: 'Joe Estimator',
                    area_of_expertise: 'Structural',
                    project_building: 'Hospital',
                    company: 'Google Healthcare',
                },
                {
                    isActive: true,
                    type: 1,
                    filter_by: '',
                    status: 'Pending',
                    date_sent: '8/01/2020',
                    compensation: 82,
                    project_type: 'Schematic',
                    estimator_name: 'Joe Estimator',
                    area_of_expertise: 'Structural',
                    project_building: 'Airport',
                    company: 'Google Healthcare',
                },
                {
                    isActive: true,
                    type: 2,
                    filter_by: '',
                    status: 'Denied',
                    date_sent: '8/01/2020',
                    compensation: 20,
                    project_type: 'Schematic',
                    estimator_name: 'Joe Estimator',
                    area_of_expertise: 'Structural',
                    project_building: 'Hospital',
                    company: 'Google Healthcare',
                },
            ],
            default_items: [],
            //Keyword that can be typed on keyword button
            search_key_location: '',
            //Price for the filter price range

            //Set for the compensation slider
            value: [0, 200],
            max: 200,
        };
    },
    methods: {
        openModal() {
            this.$emit('openModal');
        },
        filter_by_area_of_expertise(type) {
            switch (type) {
                case 'All':
                    this.items = this.default_items;
                    break;
                case 'General & Architectural':
                    this.items = this.default_items.filter(
                        item =>
                            item.area_of_expertise == 'General & Architectural'
                    );
                    break;
                case 'Structural':
                    this.items = this.default_items.filter(
                        item => item.area_of_expertise == 'Structural'
                    );
                    break;
                case 'Site & Civil':
                    this.items = this.default_items.filter(
                        item => item.area_of_expertise == 'Site & Civil'
                    );
                    break;
                case 'Mechanical':
                    this.items = this.default_items.filter(
                        item => item.area_of_expertise == 'Mechanical'
                    );
                    break;
                case 'Electrical':
                    this.items = this.default_items.filter(
                        item => item.area_of_expertise == 'Electrical'
                    );
                    break;
                default:
                    break;
            }
        },
        filter_type(type) {
            switch (type) {
                case 1:
                    this.items = this.default_items.filter(
                        item => item.type == 1
                    );
                    break;
                case 0:
                    this.items = this.default_items;
                    break;
                case 2:
                    this.items = this.default_items.filter(
                        item => item.type == 2
                    );
                    break;
                default:
                    break;
            }
        },
        //Filter function by
        filter_by_project_building(type) {
            switch (type) {
                case 'All':
                    this.items = this.default_items;
                    break;
                case 'Airport':
                    this.items = this.default_items.filter(
                        item => item.project_building == 'Airport'
                    );
                    break;
                case 'Hospital':
                    this.items = this.default_items.filter(
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
                    this.items = this.default_items;
                    break;
                case 'Conceptual':
                    this.items = this.default_items.filter(
                        item => item.project_type == 'Conceptual'
                    );
                    break;
                case 'Schematic':
                    this.items = this.default_items.filter(
                        item => item.project_type == 'Schematic'
                    );
                    break;
                case 'Design':
                    this.items = this.default_items.filter(
                        item => item.project_type == 'Design'
                    );
                    break;
                case 'Costruction':
                    this.items = this.default_items.filter(
                        item => item.project_type == 'Costruction'
                    );
                    break;
                case 'Bids/Proposals':
                    this.items = this.default_items.filter(
                        item => item.project_type == 'Bids/Proposals'
                    );
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
                    this.items = this.default_items.filter(
                        item => item.status == 'Pending'
                    );
                    break;
                case 'Accepted':
                    this.items = this.default_items.filter(
                        item => item.status == 'Accepted'
                    );
                    break;
                case 'Deined':
                    this.items = this.default_items.filter(
                        item => item.status == 'Denied'
                    );
                    break;
                case 'Claimed':
                    this.items = this.default_items.filter(
                        item => item.status == 'Claimed'
                    );
                    break;
                default:
                    break;
            }
        },

        filter_by_date(type) {
            if (type == 0) {
                this.items.sort(function(a, b) {
                    // var adate = moment("12-25-1995", "MM-DD-YYYY");
                    if (a.date_sent < b.date_sent) return -1;
                    if (a.date_sent > b.date_sent) return 1;
                    return 0;
                });
            }
            if (type == 1) {
                this.items.sort(function(a, b) {
                    if (a.date_sent > b.date_sent) return -1;
                    if (a.date_sent < b.date_sent) return 1;
                    return 0;
                });
            }
        },
        gotoDetailPage() {
            this.$router.push('/dashboard/projectrequest/request/1')
        }
    },
    created() {
        this.default_items = this.items;
        this.totalRows = this.items.length;
    },

    watch: {
        value: function(newValue) {
            this.items = this.default_items.filter(
                item => item.compensation > newValue[0] && item.compensation < newValue[1]
            );
        },
    },
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
