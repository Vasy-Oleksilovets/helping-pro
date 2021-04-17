<template>
    <div class="dash-company-office">
        <!-- <div v-if="role===3" class="title-font" role="button">
            All Offices <b-icon v-if="role===3" icon="caret-down-fill" scale="0.8" class="ml-3"></b-icon>
        </div>
        <div v-else class="title-font" role="button">
            Atlanta
        </div> -->
        <b-row>
            <b-col sm="2">
                <b-form-select v-if="role === 4" v-model="selectOfficeObj" @change="selectedOffice($event)">
                    <b-form-select-option value="">All Offices</b-form-select-option>
                    <b-form-select-option v-for="(office) in offices" :key="office.id" :value="office">{{office.officeName}}</b-form-select-option>
                </b-form-select>
                <span v-else>Atlanta</span>
            </b-col>
        </b-row>
        
        <b-row v-if="Object.keys(profile).length > 0" class="justify-content-around">
            <div class="text-center">
                <radial-progress-bar :diameter="150"
                    startColor="#0C2340"
                    stopColor="#0C2340"
                    innerStrokeColor="#C4C4C4"
                    :strokeWidth=25
                    :innerStrokeWidth=25
                    :completed-steps="selectOfficeObj === ''? profile.totalProjectsInProgress : selectOfficeObj.projectsInProgress"
                    :total-steps="totalSteps">
                    <div style="font-size: 20px;" class="font-weight-bold">{{ selectOfficeObj === ''? profile.totalProjectsInProgress: selectOfficeObj.projectsInProgress }}</div>
                </radial-progress-bar>
                <div class="title-font">In Progress</div>
            </div>
            <div class="text-center">
                <radial-progress-bar :diameter="150"
                    startColor="#0C2340"
                    stopColor="#0C2340"
                    innerStrokeColor="#C4C4C4"
                    :strokeWidth=25
                    :innerStrokeWidth=25
                    :completed-steps="selectOfficeObj === ''? profile.totalProjectsInQueue : selectOfficeObj.projectsInQueue"
                    :total-steps="totalSteps">
                    <div style="font-size: 20px;" class="font-weight-bold">{{ selectOfficeObj === ''? profile.totalProjectsInQueue: selectOfficeObj.projectsInQueue }}</div>
                </radial-progress-bar>
                <div class="title-font">In Queue</div>
            </div>
            <div class="text-center">
                <radial-progress-bar :diameter="150"
                    startColor="#0C2340"
                    stopColor="#0C2340"
                    innerStrokeColor="#C4C4C4"
                    :strokeWidth=25
                    :innerStrokeWidth=25
                    :completed-steps="selectOfficeObj === ''? profile.totalProjectsCompleted : selectOfficeObj.projectsOverdue"
                    :total-steps="totalSteps">
                    <div style="font-size: 20px;" class="font-weight-bold">{{ selectOfficeObj === ''? profile.totalProjectsCompleted: selectOfficeObj.projectsOverdue }}</div>
                </radial-progress-bar>
                <div class="title-font">Completed</div>
            </div>
            <div class="text-center">
                <radial-progress-bar :diameter="150"
                    startColor="#0C2340"
                    stopColor="#0C2340"
                    innerStrokeColor="#C4C4C4"
                    :strokeWidth=25
                    :innerStrokeWidth=25
                    :completed-steps="selectOfficeObj === ''? profile.totalProjectsOverdue : selectOfficeObj.projectsOverdue"
                    :total-steps="totalSteps">
                     <div style="font-size: 20px;" class="font-weight-bold">{{ selectOfficeObj === ''? profile.totalProjectsOverdue: selectOfficeObj.projectsOverdue }}</div>
                </radial-progress-bar>
                <div class="title-font">Overdue</div>
            </div>
        </b-row>
    </div>
</template>

<script>
import { BIcon, BIconCaretDownFill } from 'bootstrap-vue'
import RadialProgressBar from 'vue-radial-progress'

export default {
    name: 'CompanyOffice',
    props: ['role', 'profile'],
    components: {
        BIcon,
        BIconCaretDownFill,
        RadialProgressBar

    },
    data() {
        return {
            inProgress: 60,
            inQueue: 60,
            completed: 60,
            overdue: 60,
            dollarValue: 60,
            totalSteps: 100,

            selectOfficeObj: "", //Object Variable for checking which office is selected. Should be sent to summary component

            profile: {},
            offices: []
        };
    },
    methods: {
        //Called if the user click one of the office or all the offices
        selectedOffice(value){
           //Send the objects to summary component
           this.$emit('changedOffice', this.selectOfficeObj);
        }
    },
    created() {
        // this.profile = JSON.parse(localStorage.getItem('profile'));
        // this.profile = JSON.parse(localStorage.getItem('profile'))

        //Get the offices list from the backend
        this.offices = this.profile.accountOffices;
    },
};
</script>
<style scoped>
.dash-company-office {
    font-family: Montserrat;
    background-color: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    padding: 30px 40px 20px 40px;
    margin: 30px;
}
.title-font {
    font-size: 1.3em;
}
</style>
