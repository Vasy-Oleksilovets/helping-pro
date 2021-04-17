<template>
    <div class="card-container projectrequest-client-detail">
        <b-row class="client-project-header align-items-center">
            <b-col cols="auto" class="d-flex align-items-center">
                <img
                    role="button"
                    @click="gotoPreviousPage"
                    alt="Previous Page"
                    src="~@/assets/img/small-icons/left-arrow.png"
                    class="mr-3"
                />
                <span class="font-weight-bold">Joe Estimator</span>
            </b-col>
            <b-col cols="auto" class="d-flex align-items-center">
                <span class="mr-3 font-weight-bold">Building Type</span>
                <span class="grey-color">Airport</span>
            </b-col>
            <b-col cols="auto" class="d-flex align-items-center">
                <span class="mr-3 font-weight-bold">Project Type</span>
                <span>Conceptual</span>
            </b-col>
            <b-col cols="auto" class="d-flex align-items-center">
                <span class="mr-2 font-weight-bold">Area of expertise</span>
                <span>Gen. & Arch.</span>
            </b-col>
            <b-col cols="auto" class="d-flex align-items-center">
                <span class="mr-3 font-weight-bold">Project Fee</span>
                <span>{{2000 | formatMoney('$', 0)}}</span>
            </b-col>
            <b-col cols="auto" class="d-flex align-items-center">
                <span class="mr-3 font-weight-bold">Date Sent</span>
                <span>9/25/2020</span>
            </b-col>
            <b-col cols="auto" class="d-flex align-items-center">
                <span class="mr-3 font-weight-bold">Status</span>
                <span>Pending</span>
            </b-col>
        </b-row>
        <div class="find-estimator-detail">
            <b-row class="mt-4">
                <b-col sm="3">
                    <b-form-select v-model="company" class="mt-2">
                        <option value="" disabled selected>Company</option>
                        <option value="Atlanta">Atlanta</option>
                        <option value="Delta">Delta</option>
                        <option value="Google Healthcare">Google Healthcare</option>
                        <option value="Hearfelt">Hearfelt</option>
                    </b-form-select>
                </b-col>
                <b-col sm="3">
                    <b-form-select v-model="project" class="mt-2" @change="clickProject">
                        <option value="" disabled selected>Project Name</option>
                        <option value="Project 1">Project 1</option>
                        <option value="Project 2">Project 2</option>
                        <option value="Project 3">Project 3</option>
                        <option value="Project 4">Project 4</option>
                    </b-form-select>
                </b-col>
            </b-row>
            <div v-if="showAllcontent">
                <b-row class="mt-5">
                    <b-col sm="3">
                        <span class="mr-3 font-weight-bold">Category/Type of Building</span>
                        <span>Airport</span>
                    </b-col>
                </b-row>
                <b-row class="mt-3">
                    <b-col sm="3">
                        <span class="mr-3 font-weight-bold">Project Type</span>
                        <span>Conceptual</span>
                    </b-col>
                </b-row>
                <b-row class="mt-3">
                    <b-col sm="3">
                        <span class="mr-3 font-weight-bold">Location</span>
                        <span>New York</span>
                    </b-col>
                </b-row>
                <b-row class="mt-3">
                    <b-col sm="3">
                        <span class="mr-3 font-weight-bold">Project date</span>
                        <span>01/01/2020 - 02/02/2020</span>
                    </b-col>
                </b-row>
                <b-row class="mt-3">
                    <b-col sm="5" class="d-flex align-items-center">
                        <div class="mr-3 font-weight-bold">Estimate due date</div>
                        <b-form-input
                        v-model="due_date"
                        placeholder="due date"
                        style="width: 20%;"
                        ></b-form-input>
                    </b-col>
                </b-row>
                <b-row class="mt-1 font-weight-bold">
                    <b-col style="color: red">
                        It is recommended that the estimate due is 2-5 days before the project and date so that there is time to complete the basis estimate.
                    </b-col>
                </b-row>
                <b-row class="mt-3">
                    <b-col sm="5" class="d-flex align-items-center">
                        <div class="mr-3 font-weight-bold">Total fee</div>
                        <b-form-input
                        v-model="total_fee"
                        placeholder="due date"
                        style="width: 20%;"
                        ></b-form-input>
                    </b-col>
                </b-row>
                <b-row class="mt-3">
                    <b-col sm="4">
                        <b-row class="no-gutters justify-content-between font-weight-bold">
                            <div>Project Description</div>
                            <div>Edit description</div>
                        </b-row>
                        <b-row class="mt-1">
                            <b-col>
                                This project consists of the acquistion of flood damaged propertises located adjacent to the Park River (in the floodway) (photos were provided.) Nineteen (19) propertises have been identified as having substantial damanges and are at high risk for future flood damages. One acquired, these structures will be put up for bid for relocation outside the 100-year floodplain. Any unsold homes will be demolished and removed.
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
                <b-row class="mt-2">
                    <b-col sm="4">
                        <div class="position-relative">
                            <img
                                
                                alt="Previous Page"
                                src="~@/assets/img/preview-default.png"
                                class="mr-3 img-style"
                            />
                            <div role="button" class="position-absolute font-weight-bold" style="top: 50%; left: 37%; color: #DD7B26">Click to preview</div>
                        </div>
                        <div>Attachment.pdf</div>
                    </b-col>
                </b-row>
                <b-row class="mt-5">
                    <b-col sm="2">
                        <b-button v-if="!is_sent"
                            class="button-type"
                            v-b-modal.modal-center
                            >Send Project Request</b-button
                        >
                        <b-button v-else
                            disabled
                            style="padding: 5px 25px;"
                            >Send Project Request</b-button
                        >
                    </b-col>
                </b-row>
            </div>
        </div>
        <div>
            <b-modal id="modal-center" centered>
                <template v-slot:modal-title> </template>
                <template v-slot:modal-header="{ close }">
                    <!-- Emulate built in modal header close button action -->
                    <h5></h5>
                    <img hidden
                        @click="close(), declineClose()"
                        role="button"
                        alt="image"
                        src="~@/assets/img/small-icons/small-modal-remove.png"
                    />
                </template>
                <template v-slot:default="{ close }">
                    <div class="model-content text-center">
                        <div class="font-weight-bold mb-2">Project request sent!</div>
                        <div>
                            <img 
                                @click="close(), projectSent()"
                                alt="Previous Page"
                                src="~@/assets/img/small-icons/project-accept-icon.png"
                                class="mr-3"
                            />
                        </div>
                    </div>
                </template>

               
                <template v-slot:modal-footer="{ ok, cancel, hide }">
                    <b @click="ok(), cancel(), hide()">Custom Footer</b>
                </template>
            </b-modal>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FindEstimatorsDetail',
    components: {
    },
    data() {
        return {
            project: '',
            company: '',
            due_date: '02/1/2020',
            total_fee: 12500,
            is_sent: false,
            showAllcontent : false
        };
    },
    methods: {
        projectSent(){
            this.is_sent = true;
        },
        clickProject(){
            this.showAllcontent = true;
        },
        gotoPreviousPage(){
            this.$router.go(-1);
        }
    },
    created() {},
};
</script>

<style scoped>
.card-container {
    font-family: Montserrat;
    background-color: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    margin: 1vw 1vw;
    padding: 20px 20px 2vw 30px;
    font-weight: 600;
    font-size: 14px;
}

.img-style {
    width: 100%;
}

.custom-select {
    height: 100%;
    width: 100%;
    border: 1.5px solid #c9c9c9;
    padding: 0.1rem 1rem 0rem 0.75rem;
    background: #fff url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5'%3E%3Cpath fill='%23343a40' d='M2  -1h4zm0 5L0 1h4z'/%3E%3C/svg%3E") no-repeat right 0.75rem center/8px 10px;
}

.client-project-header {
    border-bottom: 1px solid #000000;
    margin: 0px 10px;
    padding-bottom: 10px;   
}

.projectrequest-client-detail {
    font-size: 0.85em;   
    font-weight: normal;
}

.find-estimator-detail {
    padding: 20px;
}

.button-type {
    background-color: #0c2340;
    color: white;
    font-weight: normal !important;
    padding: 5px 25px;
}

</style>
