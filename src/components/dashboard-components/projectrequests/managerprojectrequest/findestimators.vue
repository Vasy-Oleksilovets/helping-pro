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
            <template v-slot:head(certification)>
                <b-dropdown
                    variant="primary"
                    size="lg"
                    style="background-color: white !important"
                    id="dropdown-1"
                    text="Certification"
                >
                    <b-dropdown-item @click="filter_by_certification('All')"
                        >All</b-dropdown-item
                    >
                    <b-dropdown-item
                        @click="filter_by_certification('Certified')"
                        >Certified</b-dropdown-item
                    >
                    <b-dropdown-item @click="filter_by_certification('Pending')"
                        >Pending</b-dropdown-item
                    >
                </b-dropdown>
            </template>
            <template v-slot:head(filter_by)>
                <span></span>
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
            <template v-slot:head(project_experience)>
                <b-dropdown
                    variant="primary"
                    size="lg"
                    style="background-color: white !important"
                    id="dropdown-1"
                    text="Project Experience"
                >
                    <b-form-input
                        v-model="search_key_experience"
                        v-on:keyup="detect_change_filter_experience"
                        placeholder="Search experience"
                        style="width: 90%; margin-left: 5%"
                    ></b-form-input>
                    <b-dropdown-item
                        v-for="experience in experiences"
                        :key="experience.name"
                        @click="filter_by_project_experience(experience.name)"
                        >{{ experience.name }}</b-dropdown-item
                    >
                </b-dropdown>
            </template>
            <template v-slot:head(compensation)>
                <div class="compensation">
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
            <template v-slot:head(availability)>
                <b-dropdown
                    variant="primary"
                    size="lg"
                    style="background-color: white !important"
                    id="dropdown-1"
                    text="Availability"
                >
                    <b-dropdown-item @click="filter_by_availability('All')"
                        >All</b-dropdown-item
                    >
                    <b-dropdown-item
                        @click="filter_by_availability('Full time')"
                        >Full time</b-dropdown-item
                    >
                    <b-dropdown-item
                        @click="filter_by_availability('Part time')"
                        >Part time</b-dropdown-item
                    >
                    <b-dropdown-item
                        @click="filter_by_availability('Contractor')"
                        >Contractor</b-dropdown-item
                    >
                </b-dropdown>
            </template>
            <template v-slot:cell(filter_by)>
                <b-button
                    class="button-type rounded"
                    @click="gotoDetailPage"
                    style="float: right"
                    >Send Project Request</b-button
                >
            </template>
            <template v-slot:cell(availability)="row">
                <span v-if="row.value == 'Denied'" style="color:#C9C9C9">{{
                    row.value
                }}</span>
                <span v-else>{{ row.value }}</span>
            </template>
            <template v-slot:cell(certification)="row">
                <span v-if="row.item.type == 1">
                    {{ row.value }}
                </span>
                <span v-else style="color: #C9C9C9;">
                    {{ row.value }}
                </span>
            </template>
            <template v-slot:cell(compensation)="row">
                <span>${{ row.value }}/hr</span>
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
    name: 'FindEstimators',
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
                    key: 'estimator_list',
                    sortable: false,
                },
                {
                    key: 'certification',
                    sortable: false,
                },
                {
                    key: 'area_of_expertise',
                    sortable: false,
                },
                {
                    key: 'project_experience',
                    sortable: false
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
                    key: 'availability',
                    sortable: false,
                },
                {
                    key: 'filter_by',
                    label: 'Filter by',
                },
            ],
            experiences: [
                { name: 'experience1' },
                { name: 'experience2' },
                { name: 'experience3' },
                { name: 'experience4' },
                { name: 'experience5' },
                { name: 'experience6' }
            ],
            states: [
                { name: 'All', value: 'ALL' },
                { name: 'Alabama', value: 'AL' },
                { name: 'Alaska', value: 'AK' },
                { name: 'Arkansas', value: 'AR' },
                { name: 'California', value: 'CA' },
                { name: 'Colorado', value: 'CO' },
                { name: 'Connecticut', value: 'CT' },
                { name: 'Delaware', value: 'DE' },
                { name: 'Florida', value: 'FL' },
                { name: 'Georgia', value: 'GA' },
                { name: 'Hawaii', value: 'HI' },
                { name: 'Idaho', value: 'ID' },
                { name: 'Illinois', value: 'IL' },
                { name: 'Indiana', value: 'IN' },
                { name: 'Iowa', value: 'IA' },
                { name: 'Kansas', value: 'KS' },
                { name: 'Kentucky', value: 'KY' },
                { name: 'Louisiana', value: 'LA' },
                { name: 'Maine', value: 'ME' },
                { name: 'Maryland', value: 'MD' },
                { name: 'Massachusetts', value: 'MA' },
                { name: 'Michigan', value: 'MI' },
                { name: 'Minnesota', value: 'MO' },
                { name: 'Mississippi', value: 'MS' },
                { name: 'Missouri', value: 'MO' },
                { name: 'Montana', value: 'MT' },
                { name: 'Nebraska', value: 'NE' },
                { name: 'Nevada', value: 'NV' },
                { name: 'New Hampshire', value: 'NH' },
                { name: 'New Jersey', value: 'NJ' },
                { name: 'New Mexico', value: 'NM' },
                { name: 'New York', value: 'NY' },
                { name: 'North Carolina', value: 'NC' },
                { name: 'North Dakota', value: 'ND' },
                { name: 'Ohio', value: 'OH' },
                { name: 'Oklahoma', value: 'OK' },
                { name: 'Oregon', value: 'OR' },
                { name: 'Pennsylvania', value: 'PA' },
                { name: 'Rhode Island', value: 'RI' },
                { name: 'South Carolina', value: 'SC' },
                { name: 'South Dakota', value: 'SD' },
                { name: 'Tennessee', value: 'TN' },
                { name: 'Texas', value: 'TX' },
                { name: 'Utah', value: 'UT' },
                { name: 'Vermont', value: 'VI' },
                { name: 'Virginia', value: 'VA' },
                { name: 'Washington', value: 'WA' },
                { name: 'West Virginia', value: 'WV' },
                { name: 'Wisconsin', value: 'WI' },
                { name: 'Wyoming', value: 'WY' },
            ],
            items: [
                {
                    isActive: true,
                    type: 1,
                    availability: 'Full time',
                    compensation: 20,
                    location: 'New York',
                    area_of_expertise: 'General & Architectural',
                    certification: 'Certified',
                    estimator_list: 'Delta',
                },
                {
                    isActive: true,
                    type: 1,
                    availability: 'Full time',
                    compensation: 30,
                    location: 'New York',
                    area_of_expertise: 'Structural',
                    certification: 'Certified',
                    estimator_list: 'Estimator name',
                },
                {
                    isActive: true,
                    type: 2,
                    availability: 'Part time',
                    compensation: 20,
                    location: 'New York',
                    area_of_expertise: 'Mechanical',
                    certification: 'Pending',
                    estimator_list: 'Davis Healthcare',
                },
                {
                    isActive: true,
                    type: 1,
                    availability: 'Part time',
                    compensation: 30,
                    location: 'New York',
                    area_of_expertise: 'Electrical',
                    certification: 'Certified',
                    estimator_list: 'Estimator name',
                },
                {
                    isActive: true,
                    type: 1,
                    availability: 'Contractor',
                    compensation: 40,
                    location: 'New York',
                    area_of_expertise: 'Site & Civil',
                    certification: 'Certified',
                    estimator_list: 'Atlanta',
                },
                {
                    isActive: true,
                    type: 2,
                    availability: 'Contractor',
                    compensation: 40,
                    location: 'New York',
                    area_of_expertise: 'General & Architectural',
                    certification: 'Pending',
                    estimator_list: 'Estimator name',
                },
                {
                    isActive: true,
                    type: 2,
                    availability: 'Full time',
                    compensation: 35,
                    location: 'New York',
                    area_of_expertise: 'Structural',
                    certification: 'Pending',
                    estimator_list: 'Estimator name',
                },
                {
                    isActive: true,
                    type: 2,
                    availability: 'Full time',
                    compensation: 25,
                    location: 'New York',
                    area_of_expertise: 'Structural',
                    certification: 'Pending',
                    estimator_list: 'Estimator name',
                },
                {
                    isActive: true,
                    type: 2,
                    availability: 'Pending',
                    compensation: 20,
                    location: 'New York',
                    area_of_expertise: 'Mechanical',
                    certification: 'Pending',
                    estimator_list: 'Estimator name',
                },
                {
                    isActive: true,
                    type: 1,
                    availability: 'Part time',
                    compensation: 30,
                    location: 'New York',
                    area_of_expertise: 'Electrical',
                    certification: 'Certified',
                    estimator_list: 'Estimator name',
                },
                {
                    isActive: true,
                    type: 1,
                    availability: 'Part time',
                    compensation: 40,
                    location: 'New York',
                    area_of_expertise: 'Site & Civil',
                    certification: 'Certified',
                    estimator_list: 'Estimator name',
                },
                {
                    isActive: true,
                    type: 2,
                    availability: 'Part time',
                    compensation: 40,
                    location: 'New York',
                    area_of_expertise: 'Site & Civil',
                    certification: 'Pending',
                    estimator_list: 'Estimator name',
                },
                {
                    isActive: true,
                    type: 2,
                    availability: 'Full time',
                    compensation: 35,
                    location: 'New York',
                    area_of_expertise: 'General & Architectural',
                    certification: 'Pending',
                    estimator_list: 'Estimator name',
                },
                {
                    isActive: true,
                    type: 2,
                    availability: 'Part time',
                    compensation: 25,
                    location: 'New York',
                    area_of_expertise: 'Structural',
                    certification: 'Pending',
                    estimator_list: 'Estimator name',
                },
                {
                    isActive: true,
                    type: 2,
                    availability: 'Full time',
                    compensation: 20,
                    location: 'New York',
                    area_of_expertise: 'Electrical',
                    certification: 'Pending',
                    estimator_list: 'Estimator name',
                },
                {
                    isActive: true,
                    type: 1,
                    availability: 'Part time',
                    compensation: 30,
                    location: 'New York',
                    area_of_expertise: 'Electrical',
                    certification: 'Certified',
                    estimator_list: 'Estimator name',
                },
                {
                    isActive: true,
                    type: 1,
                    availability: 'Full time',
                    compensation: 20,
                    location: 'New York',
                    area_of_expertise: 'Electrical',
                    certification: 'Certified',
                    estimator_list: 'Estimator name',
                },
                {
                    isActive: true,
                    type: 2,
                    availability: 'Part time',
                    compensation: 25,
                    location: 'New York',
                    area_of_expertise: 'Electrical',
                    certification: 'Certified',
                    estimator_list: 'Estimator name',
                },
            ],
            default_items: [],
            //Keyword that can be typed on keyword button
            search_key_location: '',
            //Price for the filter price range
            search_key_experience:'',
            //Set for the compensation slider
            value: [0, 200],
            max: 200,
            search_key_location: '',
            temp_states: [],
            temp_experiences: []
        };
    },
    methods: {
        openModal() {
            this.$emit('openModal');
        },
        filter_by_location(location) {
            if (location == 'All') this.items = this.default_items;
            else
                this.items = this.default_items.filter(
                    item => item.location == location
                );
        },
        filter_by_location(experience) {
            if (experience == 'All') this.items = this.default_items;
            else
                this.items = this.default_items.filter(
                    item => item.experience == experience
                );
        },
        detect_change_filter() {
            this.states = this.temp_states.filter(
                state => state.name.indexOf(this.search_key_location) > -1
            );
        },
        detect_change_filter_experience() {
            this.experiences = this.temp_experiences.filter(
                experience => experience.name.indexOf(this.search_key_experience) > -1
            );
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
        filter_by_certification(type) {
            switch (type) {
                case 'All':
                    this.items = this.default_items;
                    break;
                case 'Certified':
                    this.items = this.default_items.filter(
                        item => item.certification == 'Certified'
                    );
                    break;
                case 'Pending':
                    this.items = this.default_items.filter(
                        item => item.certification == 'Pending'
                    );
                    break;
                default:
                    break;
            }
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
        filter_by_availability(type) {
            switch (type) {
                case 'All':
                    this.items = this.default_items;
                    break;
                case 'Full time':
                    this.items = this.default_items.filter(
                        item => item.availability == 'Full time'
                    );
                    break;
                case 'Part time':
                    this.items = this.default_items.filter(
                        item => item.availability == 'Part time'
                    );
                    break;
                case 'Contractor':
                    this.items = this.default_items.filter(
                        item => item.availability == 'Contractor'
                    );
                    break;
                default:
                    break;
            }
        },
        gotoDetailPage() {
            this.$router.push('/dashboard/projectrequest/find/1')
        }
    },
    created() {
        this.default_items = this.items;
        this.totalRows = this.items.length;
        this.temp_states = this.states;
        this.temp_experiences = this.experiences;
    },

    watch: {
        value: function(newValue) {
            this.items = this.default_items.filter(
                item =>
                    item.compensation > newValue[0] &&
                    item.compensation < newValue[1]
            );
        },
    },
};
</script>

<style scoped>
.client-project-submission {
    padding: 20px 20px 20px 20px;
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
