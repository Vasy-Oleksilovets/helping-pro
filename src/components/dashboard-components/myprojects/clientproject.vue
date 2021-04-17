<template>
    <div class="project">
        <div class="mt-2 d-flex">
            <b-col md="2" offset-md="10">
                <b-dropdown
                    text="Filter by: All projects"
                    variant="outline-darker"
                    class="m-2"
                >
                    <b-dropdown-item @click="filter_by_status(0)" href="#"
                        >All Projects</b-dropdown-item
                    >
                    <b-dropdown-item @click="filter_by_status(1)" href="#"
                        >Current Projects</b-dropdown-item
                    >
                    <b-dropdown-item @click="filter_by_status(2)" href="#"
                        >Upcoming Projects</b-dropdown-item
                    >
                    <b-dropdown-item @click="filter_by_status(3)" href="#"
                        >Completed Projects</b-dropdown-item
                    >
                </b-dropdown>
            </b-col>
        </div>
        <div class="table-all">
            <div class="table-header d-flex">
                <b-col cols="4" md="4">Project name</b-col>
                <b-col cols="2" md="2">Start date</b-col>
                <b-col cols="2" md="2">End date</b-col>
                <b-col cols="2" md="2">Status</b-col>
                <b-col cols="2" md="2"></b-col>
            </div>
            <div
                style="vertical-align: middle"
                class="each_row d-flex"
                v-for="project in projects"
                :key="project.name"
            >
                <b-col cols="4" md="4" class="custom-text-center">{{
                    project.name
                }}</b-col>
                <b-col cols="2" md="2" class="custom-text-center">{{
                    project.start_date
                }}</b-col>
                <b-col cols="2" md="2" class="custom-text-center">{{
                    project.end_date
                }}</b-col>
                <b-col cols="2" md="2" class="custom-text-center">{{
                    project.status
                }}</b-col>
                <b-col cols="2" md="2">
                    <b-btn class="btn-style"
                        ><router-link
                            class="project_link"
                            to="/dashboard/myprojects/1"
                            >Go to Project</router-link
                        ></b-btn
                    >
                </b-col>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ClientProject',
    data() {
        return {
            projects: [
                {
                    name: 'Google Healthcard',
                    start_date: '12/01/2019',
                    end_date: '12/11/2019',
                    status: 'Current Project',
                },
                {
                    name: 'Delta',
                    start_date: '01/02/2020',
                    end_date: '01/10/2020',
                    status: 'Current Project',
                },
                {
                    name: 'Atlanta',
                    start_date: '02/02/2020',
                    end_date: '02/10/2020',
                    status: 'Current Project',
                },
                {
                    name: 'Hearfelt',
                    start_date: '03/02/2020',
                    end_date: '03/12/2020',
                    status: 'Current Project',
                },
                {
                    name: 'Hearfelt',
                    start_date: '04/02/2020',
                    end_date: '04/12/2020',
                    status: 'Current Project',
                },
                {
                    name: 'Hearfelt',
                    start_date: '05/02/2020',
                    end_date: '05/12/2020',
                    status: 'Current Project',
                },
                {
                    name: 'Hearfelt',
                    start_date: '05/02/2020',
                    end_date: '05/12/2020',
                    status: 'Upcomming Project',
                },
                {
                    name: 'Hearfelt',
                    start_date: '05/02/2020',
                    end_date: '05/12/2020',
                    status: 'Upcomming Project',
                },
                {
                    name: 'Hearfelt',
                    start_date: '05/02/2020',
                    end_date: '05/12/2020',
                    status: 'Completed Project',
                },
            ],
            temp_projects: [],
        };
    },
    methods: {
        filter_by_status(status) {
            switch (status) {
                case 0:
                    this.projects = this.temp_projects;
                    break;
                case 1:
                    this.projects = this.temp_projects.filter(
                        project => project.status == 'Current Project'
                    );
                    break;
                case 2:
                    this.projects = this.temp_projects.filter(
                        project => project.status == 'Upcomming Project'
                    );
                    break;
                case 3:
                    this.projects = this.temp_projects.filter(
                        project => project.status == 'Completed Project'
                    );
                    break;
                default:
                    break;
            }
        },
    },
    created() {
        this.temp_projects = this.projects;
    },
};
</script>

<style scoped>
.project {
    font-size: 1em;
    color: black;
    font-weight: 600;
}
.table-header {
    background-color: #061831;
    color: white;
    padding: 10px 20px 10px 30px;
    min-width: 1000px !important;
}
.each_row {
    background-color: white;
    min-width: 1000px !important;
    margin: 10px;
    margin-top: 10px !important;
    padding: 10px 10px 10px 20px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
}
.custom-text-center {
    display: flex;
    align-items: center;
}
.btn-style {
    background-color: #0c2340;
    padding: 5px 30px 5px 30px;
    border-radius: 3px;
}
.project_link {
    text-decoration: none;
    color: white;
}
@media (max-width: 800px) {
    .table-all {
        overflow: auto;
    }
}
</style>
