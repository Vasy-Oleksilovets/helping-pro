<template>
    <div class="adminest">
        <div v-if="showDetail">
        <b-btn @click="gotoBack()" style="background-color:#0c2340; border-radius: 5px" class="ml-4 pl-3 pr-3" type="submit">Back</b-btn>
        <ExtraProfile  :role="passingData"/>
        </div>
        <!-- <main v-else>
            <h4>Cost Estimators</h4>
            <hr style="background-color:#ed6d3a; height:4px" />
            <section class="secWhite secValidate">
                <SearchEstimators @setEstimatorList="eventEstimatorList" />

                <div v-if="estimatorList.length > 0">
                    <div class="container text-center">
                        <h5>Results</h5>
                        <div
                            v-for="estimator in estimatorList"
                            :key="estimator.emailAddress"
                        >
                            <div>
                                <div>
                                    <span
                                  `      >{{ estimator.firstName }}
                                        {{ estimator.lastName }}
                                        {{ estimator.emailAddress }}
                                    </span>
                                </div>
                                <hr />
                            </div>
                        </div>
                        <div v-if="estimatorList.length < 1 && btnClicked">
                            No Results Found
                        </div>
                    </div>
                </div>
            </section>
            
        </main> -->
        <div v-else class="ml-3">
            <div class="estimator-header">
                <b-button class="button-type rounded" @click="goBack()">Back</b-button>
                <div class="text-center" style="font-size: 20px">All Professional Signup</div>
                <div></div>
            </div>
            <b-table :items="estimators" :fields="estimator_fields" responsive thClass="border-top-0" style="min-height: 30vh">
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
                        style="background-color: white !important; width: '80%'"
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


                <template v-slot:head(status)>
                    <b-dropdown
                        variant="primary"
                        size="lg"
                        style="background-color: white !important; width: '80%'"
                        id="dropdown-1"
                        text="Status"
                    >
                        <b-dropdown-item @click="filterByStatus('All')">All</b-dropdown-item>
                        <b-dropdown-item @click="filterByStatus(item.value)" v-for="item in status_list" :key="item.text">
                            {{item.text}}
                        </b-dropdown-item>
                    </b-dropdown>
                </template>
                <template v-slot:cell(button)="row">
                    <div style="text-align: center">
                        <b-button
                            class="button-type rounded"
                            @click="gotoDetal(row)"
                            >View More</b-button
                        >
                    </div>
                </template>
                <template v-slot:cell(total_projects)="row">
                    <div class="text-center">{{row.value}}</div>
                </template>

                <template v-slot:cell(status)="row">
                    <div class="dropdown-wrapper">
                        <b-form-select  :key="row.value" @change="changeStatus(row)" v-model="row.value" :options="status_list"></b-form-select>
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
        <!-- <footer>
            <div class="container text-center">
                <a href="#" title="">
                    <img src="~@/assets/img/logoWhite.png" alt="" />
                </a>
                <p>Copyright, 2019 Construction Check. All Rights Reserved.</p>
            </div>
        </footer> -->
        <Modal v-on:submit="onStatusYes" :id="'status-modal'" :message="statusModalText"  v-on:cancel="closeStatusModal" v-bind:showModal="showStatusModal" :yesBtnText="'Confirm'" :noButtonText="'Cancel'"/>
        <Modal v-on:submit="onRoleYes" :id="'role-modal'" :message="roleModalText"  v-on:cancel="closeRoleModal" v-bind:showModal="showRoleModal" :yesBtnText="'Confirm'" :noButtonText="'Cancel'" />
    </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';
import SearchEstimators from '@/components/SearchEstimators.vue';
import AddressProxy from '@/proxies/AddressProxy.js';
import EstimatorProxy from '@/proxies/EstimatorProxy.js';
import ExtraProfile from '../../../components/dashboard-components/myprofile/extraprofile';
import Modal from '../../../components/Modal.vue'
export default {
    name: 'estimate',
    data() {
        return {
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
            estimators: [],
            errors: [],
            estimatorList: [],
            btnClicked: false,
            items: [
                {
                    text: 'Admin Home',
                    to: { name: 'adminHome' },
                },
                {
                    text: 'Cost Estimators',
                    active: true,
                },
            ],
            search_key_location: '',
            states: [],
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
            role_list: [
                { value: 'Production Manager', text: 'Production Manager' },
                { value: 'CC Project Manager', text: 'Project Manager' },
                { value: 'Estimator', text: 'Estimator' }
            ],
            passingData: 0,
            showDetail: false,
            notificationMessage: '',
            showStatusModal : false,
            showRoleModal : false,
            roleModalText : '',
            statusModalText : '',
            rowData : undefined
        };
    },
    watch: {
        notificationMessage: function(newVal) {
            let notificationType, notificationMessage;
            if(newVal) {
                let chunks = newVal.split(":");
                notificationType = chunks[0];
                notificationMessage = chunks[1];
            }
            this.$notify({
                group: 'notify',
                type: notificationType.toLowerCase(),
                title: notificationMessage,
                duration: 3000,
                speed: 1000,
            });
        }
    },
    methods: {
        eventEstimatorList: function(list) {
            this.estimatorList = list;
        },
        changeStatus(row){
            this.rowData = row
            this.showStatusModal = true
            this.statusModalText = this.getModalText('Status',row.value)
        },
        // Looks like changeRealStatus is a redundant code.
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
        detect_change_filter() {
            this.states = this.temp_states.filter(
                state => state.text.indexOf(this.search_key_location) > -1
            );
        },
        filter_by_location(location) {
            if (location == 'All') this.estimators = this.default_items;
            else
                this.estimators = this.default_items.filter(
                    item => item.location == location
                );
        },
        filterByStatus(status) {
            if(status == 'All') this.estimators = this.default_items;
            else
                this.estimators = this.default_items.filter(
                    item => item.status == status
                );
        },
        filter_by_discipline(status) {
            if(status == 'All') this.estimators = this.default_items;
            else
                this.estimators = this.default_items.filter(
                    item => item.discipline == status
                );
        },
        filter_by_role(status) {
            if(status == 'All') this.estimators = this.default_items;
            else
                this.estimators = this.default_items.filter(
                    item => item.role == status.value
                );
        },
        gotoDetal(index){
            this.passingData = index.item.id
            this.showDetail = true;
        },
        gotoBack(){
            this.showDetail = false;
        },
        setEstimators(data) {
            data.forEach((element)=> {
                this.estimators.push({
                    name: element.firstName + ' ' + element.lastName,
                    location: element.location,
                    // Set role default value to Estimator if the role is other than what mentioned in array
                    role: ['Production Manager','Estimator','CC Project Manager'].includes(element.role) ? element.role : 'Estimator',
                    discipline: element.discipline,
                    status: element.status != 'Active' ? 'Hold' : 'Active',
                    id: element.id
                })
            })
        },
        changeRole(row) {
            this.rowData = row
            this.showRoleModal = true
            const newRole =this.role_list.find(each => each.value === row.value)
            this.roleModalText = this.getModalText('Role',newRole ? newRole.text : '')
        },
        onRoleYes(){
            if(this.rowData){
                const updatedData = {
                    estimatorProfileId: this.rowData.item.id,
                    estimatorRole: this.rowData.value
                }; 
                new EstimatorProxy().updateEstimatorRole(updatedData).then((response) => {
                    if(response.status == '200') {
                        this.notificationMessage = "SUCCESS: Estimator role updated successfully.";
                    } else {
                        this.notificationMessage = "ERROR: Estimator role updation failed.";
                    }
                })
            }
            this.rowData = undefined
            this.showRoleModal =  false
        },
        closeRoleModal(){
            if( this.showRoleModal){
                // This was written to reset the value of role dropdown, but not woorking  as of now
                // this.estimators = this.estimators.map((each,index)=>{
                //     if(index === this.rowData.index){
                //         return {
                //             ...each,
                //             role : this.rowData.item.role
                //         }
                //     }
                //     return {...each}
                // })
                this.rowData = undefined
                this.showRoleModal =  false                
            }
        },
        onStatusYes(){
            if(this.rowData){
                const updatedData = {
                    estimatorProfileId: this.rowData.item.id,
                    estimatorStatus: this.rowData.value
                }; 
                new EstimatorProxy().updateEstimatorStatus(updatedData).then((response) => {
                        if(response.status == '200') {
                        this.notificationMessage = "SUCCESS: Estimator status updated successfully.";
                    } else {
                        this.notificationMessage = "ERROR: Estimator status updation failed.";
                    }
                })
                }
            this.rowData = undefined
            this.showStatusModal =  false
        },
        closeStatusModal () {
            if(this.statusModalText){
                // This was written to reset the value of status dropdown, but not woorking  as of now
                // this.estimators = this.estimators.map((each,index)=>{
                //     if(index === this.rowData.index){
                //         return {
                //             ...each,
                //             status : this.rowData.item.status
                //         }
                //     }
                //     return {...each}
                // })
                this.rowData = undefined
                this.showStatusModal =  false
            }
        },
        goBack(){
            this.$router.push('/dashboard/index')
        },
        getModalText(modalName,value){
            if(modalName === 'Status'){
                switch(value){
                    case 'Hold' : return `<div>Are you sure you want to change the status from Active to Hold?</div><div>This will stop the estimator from accepting new projects.</div>`
                    case 'Active' : return `<div> Please make sure to verify all the information</div><div> before changing the status to Active!</div>`
                }
            }
            return `Are you sure you want to change ${modalName} to ${value}?`
        }
    },
    components: {
        Navigation: Navigation,
        SearchEstimators: SearchEstimators,
        ExtraProfile,
        Modal : Modal
    },
    created() {
        new AddressProxy().getStates().then((response) => {
            this.states = response;
            this.temp_states = response;
            this.default_items = this.estimators;
        })
        new EstimatorProxy().getEstimators().then((response) => {
            if(response.data && response.data.length) {
                this.setEstimators(response.data);
            }
        })
    },
};
</script>

<style scoped>
    .adminest {
        padding: 10px;
        background: white;
        margin: 10px;
        border: 1px solid #dddddd;
        font-family: Montserrat;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
        padding: 30px 40px 20px 40px;
        margin: 30px;
        font-weight: 600;
    }
    .button-type {
    background-color: #0c2340;
    color: white;
    font-weight: normal !important;
    padding-left: 20px;
    padding-right: 20px;
}
.estimator-header{
    display: flex;
    justify-content:space-between;
}
.dropdown-wrapper{
    width : 90%
}

</style>
