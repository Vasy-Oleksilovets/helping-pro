<template>
    <b-card class="subs-card">
        <b-card-body>
            <b-row class="title-font ml-1 mb-4">Project Offers</b-row>
            <b-table
                hover
                thClass="border-top-0"
                :items="items"
                :fields="fields"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                responsive="sm"
            >
                <template v-slot:head(company)="data">
                    <div class="text-center">
                        <span class="title-font text-center">{{
                            data.label
                        }}</span>
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
                        <b-dropdown-item
                            @click="filter_by_project_type('Conceptual')"
                            >Conceptual</b-dropdown-item
                        >
                        <b-dropdown-item
                            @click="filter_by_project_type('Schematic')"
                            >Schematic</b-dropdown-item
                        >
                        <b-dropdown-item
                            @click="filter_by_project_type('Design')"
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
                <template v-slot:head(compensation)="data">
                    <div>
                        <span class="title-font text-center">{{
                            data.label
                        }}</span>
                    </div>
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
                        <b-dropdown-item
                            v-for="state in states"
                            :key="state.name"
                            @click="filter_by_location(state.name)"
                            >{{ state.name }}</b-dropdown-item
                        >
                    </b-dropdown>
                </template>
                <template v-slot:head(date_submitted)>
                    <b-dropdown
                        variant="primary"
                        size="lg"
                        style="background-color: white !important"
                        id="dropdown-1"
                        text="Date Submitted"
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
                        <b-dropdown-item @click="filter_by_status('Pending')"
                            >Pending</b-dropdown-item
                        >
                        <b-dropdown-item @click="filter_by_status('Accepted')"
                            >Accepted</b-dropdown-item
                        >
                        <b-dropdown-item @click="filter_by_status('Deed')"
                            >Deined</b-dropdown-item
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
                        v-on:click="openModal"
                        style="float: right"
                        >Go to Project Request</b-button
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
                    <span style="color: #0058DD">{{ row.value }}</span>
                </template>
            </b-table>
            <b-row class="ml-1 font-weight-bold">
                <a href="#">Go to Project request page</a>
            </b-row>
        </b-card-body>
    </b-card>
</template>

<script>
import AddressProxy from '@/proxies/AddressProxy.js';
export default {
    name: 'DashOffers',
    data() {
        return {
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
                    key: 'compensation',
                    sortable: false,
                },
                {
                    key: 'location',
                    sortable: false,
                },
                {
                    key: 'date_submitted',
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
                    type: 2,
                    filter_by: '',
                    status: 'New message',
                    date_submitted: '6/01/2020',
                    location: 'California',
                    compensation: '$20/hr',
                    project_type: 'Costruction',
                    project_building: 'Hospital',
                    company: 'Google Healthcare',
                },
                {
                    isActive: true,
                    type: 1,
                    filter_by: '',
                    status: 'Pending',
                    date_submitted: '5/01/2020',
                    location: 'Colorado',
                    compensation: '$30/hr',
                    project_type: 'Bids/Proposals',
                    project_building: 'Airport',
                    company: 'Google Healthcare',
                },
                {
                    isActive: true,
                    type: 2,
                    filter_by: '',
                    status: 'Accepted',
                    date_submitted: '4/01/2020',
                    location: 'Connecticut',
                    compensation: '$40/hr',
                    project_type: 'Conceptual',
                    project_building: 'Hospital',
                    company: 'Google Healthcare',
                },
                {
                    isActive: true,
                    type: 1,
                    filter_by: '',
                    status: 'Pending',
                    date_submitted: '9/01/2020',
                    location: 'Alabama',
                    compensation: '$20/hr',
                    project_type: 'Conceptual',
                    project_building: 'Airport',
                    company: 'Google Healthcare',
                },
                {
                    isActive: true,
                    type: 2,
                    filter_by: '',
                    status: 'Accepted',
                    date_submitted: '8/01/2020',
                    location: 'Alaska',
                    compensation: '$30/hr',
                    project_type: 'Schematic',
                    project_building: 'Hospital',
                    company: 'Google Healthcare',
                },
                {
                    isActive: true,
                    type: 1,
                    filter_by: '',
                    status: 'Denied',
                    date_submitted: '7/01/2020',
                    location: 'Arkansas',
                    compensation: '$20/hr',
                    project_type: 'Design',
                    project_building: 'Airport',
                    company: 'Google Healthcare',
                },
            ],
            default_items: [],
            states: [],
            temp_states: [],
            //Keyword that can be typed on keyword button
            search_key_location: '',
        };
    },
    methods: {
        openModal() {
            this.$emit('openModal');
            this.$router.push('/dashboard/projectrequest');
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
                case 'Denied':
                    this.items = this.default_items.filter(
                        item => item.status == 'Denied'
                    );
                    break;
                default:
                    break;
            }
        },
        filter_by_location(location) {
            this.items = this.default_items.filter(
                item => item.location == location
            );
        },
        detect_change_filter() {
            this.states = this.temp_states.filter(
                state => state.name.indexOf(this.search_key_location) > -1
            );
        },

        filter_by_date(type) {
            if (type == 0) {
                this.items.sort(function(a, b) {
                    // var adate = moment("12-25-1995", "MM-DD-YYYY");
                    if (a.date_submitted < b.date_submitted) return -1;
                    if (a.date_submitted > b.date_submitted) return 1;
                    return 0;
                });
            }
            if (type == 1) {
                this.items.sort(function(a, b) {
                    if (a.date_submitted > b.date_submitted) return -1;
                    if (a.date_submitted < b.date_submitted) return 1;
                    return 0;
                });
            }
        },
    },
    created() {
        this.default_items = this.items;
        this.temp_states = this.states;
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
