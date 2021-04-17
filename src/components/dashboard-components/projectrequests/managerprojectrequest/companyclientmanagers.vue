<template>
    <div class="client-project-submission">
        <b-table
            hover
            thClass="border-top-0"
            :items="items"
            :fields="role === 5? client_manager_fields : fields"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :current-page="currentPage"
            :per-page="perPage"
            responsive="sm"
        >
            <template v-slot:table-colgroup="scope">
                <col
                    v-for="field in scope.fields"
                    :key="field.key"
                    :style="{ width: field.key === 'filter_by' ? '100px' : '170px' }"
                >
            </template>
            <template v-slot:head(client_manager)>
                <b-dropdown
                    v-if="role === 4"
                    variant="primary"
                    size="lg"
                    style="background-color: white !important"
                    id="dropdown-1"
                    text="Client Manager"
                >
                    <b-dropdown-item @click="showAll">All</b-dropdown-item>
                    <b-dropdown-item v-for="client in client_manager_list" :key="client" @click="filterByClient(client)">{{client}}</b-dropdown-item>
                </b-dropdown>
                <b-dropdown
                    v-else
                    variant="primary"
                    size="lg"
                    style="background-color: white !important"
                    id="dropdown-1"
                    text="Project Manager"
                >
                    <b-dropdown-item @click="showAll">All</b-dropdown-item>
                    <b-dropdown-item v-for="client in client_manager_list" :key="client" @click="filterByClient(client)">{{client}}</b-dropdown-item>
                </b-dropdown>
    
            </template>
            <template v-if="role === 5 || role === 4" v-slot:head(office_location)>
                <b-dropdown
                    variant="primary"
                    size="lg"
                    style="background-color: white !important"
                    id="dropdown-1"
                    text="Office Location"
                >
                    <b-dropdown-item @click="showAll">All</b-dropdown-item>
                    <b-dropdown-item v-for="office in office_location_list" :key="office" @click="filterByOffice(office)">{{office}}</b-dropdown-item>
                </b-dropdown>
            </template>
            <template v-slot:head(in_progress)>
                <b-dropdown
                    variant="primary"
                    size="lg"
                    style="background-color: white !important"
                    id="dropdown-1"
                    text="In Progress"
                >
                    <b-dropdown-item @click="showAll">All</b-dropdown-item>
                    <b-dropdown-item v-for="progress in in_progress_list" :key="progress" @click="filterByProgress(progress)">{{progress}}</b-dropdown-item>
                </b-dropdown>
            </template>
            <template v-slot:head(in_queue)>
                <div class="in_queue">
                    <b-dropdown
                        variant="primary"
                        size="lg"
                        style="background-color: white !important"
                        id="dropdown-1"
                        text="In Queue"
                    >
                        <b-dropdown-item @click="showAll">All</b-dropdown-item>
                        <b-dropdown-item v-for="queue in in_queue_list" :key="queue" @click="filterByQueue(queue)">{{queue}}</b-dropdown-item>
                    </b-dropdown>
                </div>
            </template>
            <template v-slot:head(completed)>
                <b-dropdown
                    variant="primary"
                    size="lg"
                    style="background-color: white !important"
                    id="dropdown-1"
                    text="Completed"
                >
                    <b-dropdown-item @click="showAll">All</b-dropdown-item>
                    <b-dropdown-item v-for="completed in completed_list" :key="completed" @click="filterByCompleted(completed)">{{completed}}</b-dropdown-item>
                </b-dropdown>
            </template>
            <template v-slot:head(overdue)>
                <b-dropdown
                    variant="primary"
                    size="lg"
                    style="background-color: white !important"
                    id="dropdown-1"
                    text="OverDue"
                >
                    <b-dropdown-item @click="showAll">All</b-dropdown-item>
                    <b-dropdown-item v-for="overdue in overdue_list" :key="overdue" @click="filterByOverdue(overdue)">{{overdue}}</b-dropdown-item>
                </b-dropdown>
            </template>
            
            <template v-slot:head(filter_by)>
                <span></span>
            </template>
            <template v-slot:cell(filter_by)>
                <b-button
                    class="button-type rounded"
                    @click="gotoDetailPage"
                    style="float: right"
                    >View Project</b-button
                >
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
//Import css and js for the range slider for the in_queue
import 'vue-slider-component/theme/default.css';

export default {
    name: 'CompanyClientManager',
    components: {
    },
    props: ['role'],
    data() {
        return {
            totalRows: 1,
            currentPage: 1,
            perPage: 15,
            pageOptions: [5, 10, 15],
            sortBy: 'age',
            sortDesc: false,
            client_manager_fields: [
                {
                    key: 'client_manager',
                    sortable: false,
                },
                {
                    key: 'in_progress',
                    sortable: false,
                },
                {
                    key: 'in_queue',
                    sortable: false,
                },
                {
                    key: 'completed',
                    sortable: false,
                },
                {
                    key: 'overdue',
                    sortable: false,
                },
                {
                    key: 'filter_by',
                    label: 'Filter by',
                },
            ],
            fields: [
                {
                    key: 'client_manager',
                    sortable: false,
                },
                {
                    key: 'office_location',
                    sortable: false,
                },
                {
                    key: 'in_progress',
                    sortable: false,
                },
                {
                    key: 'in_queue',
                    sortable: false,
                },
                {
                    key: 'completed',
                    sortable: false,
                },
                {
                    key: 'overdue',
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
                    completed: '2 projects',
                    overdue: 'None',
                    in_queue: 'None',
                    in_progress: '4 projects',
                    office_location: 'Texas',
                    client_manager: 'Alexa',
                },
                {
                    isActive: true,
                    type: 1,
                    filter_by: '',
                    completed: '5 projects',
                    overdue: 'None',
                    in_queue: '3 projects',
                    in_progress: '4 projects',
                    office_location: 'New York',
                    client_manager: 'David',
                },
                {
                    isActive: true,
                    type: 2,
                    filter_by: '',
                    completed: 'None',
                    overdue: 'None',
                    in_queue: 'None',
                    in_progress: '4 projects',
                    office_location: 'New York',
                    client_manager: 'Alexa',
                },
                {
                    isActive: true,
                    type: 1,
                    filter_by: '',
                    completed: '2 projects',
                    overdue: 'None',
                    in_queue: 'None',
                    in_progress: '4 projects',
                    office_location: 'New York',
                    client_manager: 'Alexa',
                },
                {
                    isActive: true,
                    type: 1,
                    filter_by: '',
                    completed: '2 projects',
                    overdue: 'None',
                    in_queue: 'None',
                    in_progress: '4 projects',
                    office_location: 'Texas',
                    client_manager: 'Alexa',
                },
                {
                    isActive: true,
                    type: 2,
                    filter_by: '',
                    completed: '2 projects',
                    overdue: 'None',
                    in_queue: 'None',
                    in_progress: '4 projects',
                    office_location: 'New York',
                    client_manager: 'Alexa',
                },
                {
                    isActive: true,
                    type: 2,
                    filter_by: '',
                    completed: '2 projects',
                    overdue: 'None',
                    in_queue: 'None',
                    in_progress: '4 projects',
                    office_location: 'New York',
                    client_manager: 'Alexa',
                },
                {
                    isActive: true,
                    type: 2,
                    filter_by: '',
                    completed: '2 projects',
                    overdue: 'None',
                    in_queue: 'None',  
                    in_progress: '4 projects',
                    office_location: 'New York',
                    client_manager: 'Alexa',
                },
                {
                    isActive: true,
                    type: 2,
                    filter_by: '',
                    completed: '2 projects',
                    overdue: 'None',
                    in_queue: 'None',
                    in_progress: '4 projects',
                    office_location: 'New York',
                    client_manager: 'Alexa',
                },
                {
                    isActive: true,
                    type: 1,
                    filter_by: '',
                    completed: '2 projects',
                    overdue: 'None',
                    in_queue: 'None',
                    in_progress: '4 projects',
                    office_location: 'New York',
                    client_manager: 'Alexa',
                },
                {
                    isActive: true,
                    type: 1,
                    filter_by: '',
                    completed: '2 projects',
                    overdue: 'None',
                    in_queue: 'None',
                    in_progress: '4 projects',
                    office_location: 'New York',
                    client_manager: 'Alexa',
                }
            ],
            default_items: [],
            //Keyword that can be typed on keyword button
            search_key_location: '',
            //Price for the filter price range,
            office_location_list: [],
            in_progress_list: [],
            in_queue_list: [],
            completed_list: [],
            overdue_list:[],
            client_manager_list: [],

        };
    },
    methods: {
        openModal() {
            this.$emit('openModal');
        },
        filter_type(type) {
        },
        //Filter function by
        filter_by_office_location(type) {

        },
        filter_by_in_progress(type) {
        },
        gotoDetailPage() {
            // this.$router.push('/dashboard/myprojects/detail');
            this.$router.push('/dashboard/index');
        },
        showAll(){
            this.items = this.default_items;
        },
        filterByOffice(office) {
            this.items = this.default_items.filter(item => item.office_location == office)
        },
        filterByProgress(progress) {
            this.items = this.default_items.filter(item => item.in_progress == progress)
        },
        filterByQueue(queue) {
            this.items = this.default_items.filter(item => item.in_queue == queue)
        },
        filterByCompleted(completed) {
            this.items = this.default_items.filter(item => item.completed == completed)
        },
        filterByOverdue(overdue) {
            this.items = this.default_items.filter(item => item.overdue == overdue)
        },
        filterByClient(client) {
            this.items = this.default_items.filter(item => item.client_manager == client)
        }
    },
    created() {
        this.default_items = this.items;
        this.totalRows = this.items.length;

        for(let index in this.default_items) {
            if(!this.office_location_list.includes(this.default_items[index].office_location))
                this.office_location_list.push(this.default_items[index].office_location);
        }
        for(let index in this.default_items) {
            if(!this.in_progress_list.includes(this.default_items[index].in_progress))
                this.in_progress_list.push(this.default_items[index].in_progress);
        }
        for(let index in this.default_items) {
            if(!this.in_queue_list.includes(this.default_items[index].in_queue))
                this.in_queue_list.push(this.default_items[index].in_queue);
        }
        for(let index in this.default_items) {
            if(!this.completed_list.includes(this.default_items[index].completed))
                this.completed_list.push(this.default_items[index].completed);
        }
        for(let index in this.default_items) {
            if(!this.overdue_list.includes(this.default_items[index].overdue))
                this.overdue_list.push(this.default_items[index].overdue);
        }
        for(let index in this.default_items) {
            if(!this.client_manager_list.includes(this.default_items[index].client_manager))
                this.client_manager_list.push(this.default_items[index].client_manager);
        }
    }
};
</script>

<style scoped>
.client-project-submission {
    padding: 15px 20px 0px 20px;
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
