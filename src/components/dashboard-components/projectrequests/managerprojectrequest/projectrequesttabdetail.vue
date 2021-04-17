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
            <b-row class="mt-5">
                <b-col sm="3">
                    <span class="mr-3 font-weight-bold">Company:</span>
                    <span>Atlanta</span>
                </b-col>
                <b-col sm="3">
                    <span class="mr-3 font-weight-bold">Project Name:</span>
                    <span>Project 1</span>
                </b-col>
                <b-col offset-sm="3" sm="3" class="d-flex justify-content-end">
                    <b-button class="button-type">Edit Project Request</b-button>
                </b-col>
            </b-row>
            <b-row class="mt-3">
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
                    <span class="mr-3 font-weight-bold">Project date</span>
                    <span>02/1/2020</span>
                </b-col>
            </b-row>
            <b-row class="mt-3">
                <b-col sm="5" class="d-flex align-items-center">
                    <span class="mr-3 font-weight-bold">Total fee</span>
                    <span>{{12500 | formatMoney('$', 0)}}</span>
                </b-col>
            </b-row>
            <b-row class="mt-3 font-weight-bold">
                <b-col style="color: red">
                    It is recommended that the estimate due is 2-5 days before the project and date so that there is time to complete the basis estimate.
                </b-col>
            </b-row>
            
            <b-row class="mt-3">
                <b-col sm="4">
                    <b-row class="no-gutters justify-content-between font-weight-bold">
                        <div>Project Description</div>
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
                    <!-- <div class="d-flex; align-items-center">
                        <div>Attachment.pdf</div>
                        <div></div>
                        <div>Download 
                            <img
                                width="10"
                                class="marginlr4 mt-1"
                                alt="Vue logo"
                                src="~@/assets/img/download.png"
                            />
                        </div>
                    </div> -->
                </b-col>
            </b-row>
            <b-row class="mt-1 font-weight-bold">
                <b-col cols="6" sm="2">
                    <span role="button">Attachment.pdf</span>
                </b-col>
                <b-col style="display: flex; justify-content: flex-end" cols="6" sm="2">
                    <div class="d-flex align-items-center"><span role="button" class="mr-2">Download</span><img role="button" width="10" class="marginlr4 mt-1" alt="Download icon" src="~@/assets/img/download.png"/></div>
                </b-col>
            </b-row>
            <div class="underline mt-3"></div>
            <b-row class="mt-4">
                <b-col class="bottom-reply">
                    <!-- <div>To Joe Estimator</div> -->
                    <b-row v-for="message in messages" :key="message.message">
                        <b-col class="d-flex">
                            <div class="mr-4">
                                <img
                                    alt="New Comments Avatar"
                                    src="~@/assets/img/avatars/estimator-new-comments-avatar.png"/>
                            </div>
                            <div>
                                <div class="font-weight-bold mb-2">{{message.to}}</div>
                                <div class="mb-4" style="line-height: 1.5">{{message.message}}</div>
                            </div>
                        </b-col>
                        <b-col sm="2" class="float-right">
                            <div>{{ Date.now() | moment }}</div>
                        </b-col>
                    </b-row>
                    
                    <b-form-textarea v-if="is_message" class="mb-4"
                        v-model="message"
                        id="textarea-small"
                        size="sm"
                        placeholder="Text a message"
                        rows="1"
                    ></b-form-textarea>
                    <b-button v-if="!is_message"
                        @click="showMessage"
                        class="btn-style d-flex align-items-center justify-content-around"
                        style="background-color: #0C2340">
                        <img
                            class="mr-2"
                            alt="Reply image"
                            src="~@/assets/img/small-icons/reply.png"
                        /><span class="mr-3">Reply</span></b-button
                    >
                    <div v-if="is_message" class="d-flex align-items-center">
                        <b-button class="button-type mr-4" @click="sendMessage">Send</b-button>
                        <div v-b-modal.modal-attachment class="d-flex align-items-center">
                            <img role="button" src="~@/assets/img/attachment.png" class="mr-2"/> 
                            <span role="button" class="font-weight-bold">Add an attachment</span>
                        </div>
                    </div>
                </b-col>
            </b-row>


            <b-modal id="modal-attachment" size="xl">
                <template v-slot:modal-header="{ close }">
                    <!-- Emulate built in modal header close button action -->
                    <div
                        class="d-flex align-items-center justify-content-between w-100 custom-border-bottom pb-2"
                    >
                        <div class="font-weight-bold ml-3">Add new document</div>
                        <img
                            @click="close()"
                            role="button"
                            alt="image"
                            src="~@/assets/img/small-icons/small-modal-remove.png"
                        />
                    </div>
                </template>
                <div class="text-center project-detail" style="position: relative">
                    <div class="mt-2">
                        <img
                            role="button"
                            alt="File Default Image"
                            src="~@/assets/img/small-icons/upload-avatar-default.png"
                        />
                    </div>
                    <div class="mt-4">Drag and drop document files to upload</div>
                    <file-upload
                        style="position: absolute; top: 0; left: 44%; width: 130px; height: 140px"
                        accept="image/*"
                        v-model="files"
                    ></file-upload>
                </div>
                <template v-slot:modal-footer="{ ok }">
                    <div
                        class="text-center mb-4"
                        style="margin-left: auto; margin-right: auto;"
                    >
                        <b-btn
                            class="dialog-btn-style first-btn-style"
                            @click="ok()"
                            >SELECT FILES</b-btn
                        >
                    </div>
                </template>
            </b-modal>

        </div>
    </div>
</template>

<script>

import moment from 'moment';
import FileUpload from 'vue-upload-component/dist/vue-upload-component.part.js';
export default {
    name: 'ProjectRequestTabDetail',
    components: {
        moment,
        FileUpload
    },
    data() {
        return {
            project: '',
            company: '',
            due_date: '02/1/2020',
            total_fee: 12500,
            is_message: false,
            message: '',
            messages: [],
            edit_status: false,
            files: [],
        };
    },
    methods: {
        showMessage(){
            this.is_message = true;
        },
        sendMessage(){
            if(this.message){
                let messageObject = {
                    to : "Joe Estimator",
                    message: this.message,
                    time: Date()
                }
                this.messages.push(messageObject);
            }
        },
        gotoPreviousPage(){
            this.$router.go(-1);
        }
    },
    filters: {
            moment: function (date) {
                return moment(date).format('MMMM Do YYYY, h:mm:ss a');
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
    padding: 5px 30px;
    border-radius: 2px;
}

.bottom-reply {
    padding: 20px 20px;
    border: 1px solid #C9C9C9;
    border-radius: 10px;
}

.underline {
    border-bottom: 1px solid #C9C9C9;
}

</style>
