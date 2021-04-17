<template>
    <div>
        <b-row class="p-3">
            <b-col sm="4">Project Healthcare Facility</b-col>
            <b-col offset-sm="4" sm="4"
                ><span class="float-right" v-b-modal.modal-center
                    >Add New Document<img
                        alt="Vue logo"
                        width="20"
                        class="ml-2"
                        src="~@/assets/img/small-icons/file-plus-icon.png"/></span
            ></b-col>
        </b-row>
        <div class="table-all">
            <div class="custom-table-header d-flex align-items-center">
                <b-col class="text-center" cols="1" md="1">
                    <div style="font-size: 10px">Select all</div>
                    <div>
                        <b-form-checkbox
                            id="checkbox-1"
                            v-model="check_all"
                            name="checkbox-1"
                            @change="toggle_All"
                        >
                        </b-form-checkbox>
                    </div>
                </b-col>
                <b-col cols="4" md="4">File Name</b-col>
                <b-col cols="1" md="1">
                    <b-dropdown
                        variant="primary"
                        size="lg"
                        style="background-color: #0C2340 !important; margin-bottom: 2px"
                        id="dropdown-1"
                        text="File type"
                    >
                        <b-dropdown-item @click="show_all_type_data()"
                            >All type</b-dropdown-item
                        >
                        <b-dropdown-item
                            v-for="type in file_type_list"
                            :key="type"
                            @click="filter_by_file_type(type)"
                            >{{ type }}</b-dropdown-item
                        >
                    </b-dropdown>
                </b-col>
                <b-col cols="1" md="1">
                    <b-dropdown
                        variant="primary"
                        size="lg"
                        style="background-color: #0C2340 !important; margin-bottom: 2px"
                        id="dropdown-1"
                        text="Size"
                    >
                        <b-dropdown-item @click="sort_by_size(0)">Smallest</b-dropdown-item>
                        <b-dropdown-item @click="sort_by_size(1)">Largest</b-dropdown-item>
                        
                    </b-dropdown>
                </b-col>
                <b-col cols="2" md="2">
                     <b-dropdown
                        variant="primary"
                        size="lg"
                        style="background-color: #0C2340 !important; margin-bottom: 2px"
                        id="dropdown-1"
                        text="Date Updated"
                    >
                        <b-dropdown-item @click="sort_by_date(0)">Oldest</b-dropdown-item>
                        <b-dropdown-item @click="sort_by_date(1)">Newest</b-dropdown-item>
                        
                    </b-dropdown>
                </b-col>
                <b-col cols="2" md="2">
                     <b-dropdown
                        variant="primary"
                        size="lg"
                        style="background-color: #0C2340 !important; margin-bottom: 2px"
                        id="dropdown-1"
                        text="Uploaded By"
                    >
                        <b-dropdown-item @click="filter_by_upload_user(user)" v-for="user in upload_user_list" :key="user">{{user}}</b-dropdown-item>                        
                    </b-dropdown>
                </b-col>
                <b-col cols="1" md="1"></b-col>
            </div>
            <div class="mt-2">
                <b-form-checkbox-group
                    id="checkbox-group-2"
                    v-model="selected"
                    name="flavour-2"
                >
                    <div v-for="(document, index) in documents" :key="document.name">
                        <div
                            style="vertical-align: middle"
                            :class="index%2==0? 'grey-color each_row d-flex align-items-center custom-table-content': 'bg-white each_row d-flex align-items-center custom-table-content'">
                            <b-col class="text-center" cols="1" md="1">
                                <b-form-checkbox v-bind:value="document.id"></b-form-checkbox>
                            </b-col>
                            <b-col cols="2" md="2">{{document.file_name}}</b-col>
                            <b-col cols="2" md="2">
                                <span
                                    v-if="!editable[index]"
                                    role="button"
                                    class="file-name-change"
                                    >File name</span>
                                <input
                                    class="file_name_input_style"
                                    v-else
                                    v-model="documents[index].file_name"/>
                                <img
                                    @click="editFileName(index)"
                                    role="button"
                                    alt="Profile Edit"
                                    width="18"
                                    class="ml-2"
                                    src="~@/assets/img/small-icons/profile-edit-pencil.png"/>
                            </b-col>
                            <b-col cols="1" md="1">{{document.file_type}}</b-col>
                            <b-col cols="1" md="1">{{document.file_size}} kb</b-col>
                            <b-col cols="2" md="2">{{document.data_updated}}</b-col>
                            <b-col cols="2" md="2">{{document.uploaded_by}}</b-col>
                            <b-col cols="2" md="2">Download<img
                                alt="Vue logo"
                                width="11"
                                class="ml-2"
                                src="~@/assets/img/small-icons/download.png"/></b-col>
                        </div>
                        
                    </div>
                </b-form-checkbox-group>
            </div>
        </div>
        <div>
            <!-- Download All selected button -->
            <b-btn v-if="check_all" class="btn-active-style mt-4 ml-5"
                >Download all selected</b-btn>
            <b-btn v-else class="btn-nonactive-style mt-4 ml-5"
                >Download all selected</b-btn>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
export default {
    name: 'ProjectManagerDetail',
    components: {},
    data() {
        return {
            documents: [
                {
                    id: 0,
                    file_name: 'Document 1',
                    file_type: 'jpg',
                    file_size: 10,
                    data_updated: '03/05/2020',
                    uploaded_by: 'Roger Williams',
                },
                {
                    id: 1,
                    file_name: 'Document 2',
                    file_type: 'jpg',
                    file_size: 9,
                    data_updated: '02/04/2020',
                    uploaded_by: 'Roger Williams',
                },
                {
                    id: 2,
                    file_name: 'Document 3',
                    file_type: 'png',
                    file_size: 7,
                    data_updated: '07/04/2020',
                    uploaded_by: 'Roger Williams',
                },
                {
                    id: 3,
                    file_name: 'Document 4',
                    file_type: 'png',
                    file_size: 8,
                    data_updated: '03/10/2020',
                    uploaded_by: 'Roger Williams',
                },
            ],
            //Data that save initially
            temp_documents: [],
            selected: [],
            check_all: false,
            files: [],
            //file type list that save the olny list of the files
            file_type_list: [],
            //step: 0 Documents step: 1 Drawings step: 2 Estimates step: 3 Take off
            step: 0,
            editable: [],
            //If the role equals 0: Estimator View
            //Else 1: Project Manager View
            role: 1,
            upload_user_list: []
        };
    },
    methods: {
        toggle_All(checked) {
            const download_list = this.documents.map(document => {
                return document.id;
            });
            this.selected = checked ? download_list : [];
        },
        removeDuplicates(data) {
            return [...new Set(data)];
        },
        //Filter data with file type
        filter_by_file_type(type) {
            this.documents = this.temp_documents.filter(
                document => document.file_type == type
            );
        },
        show_all_type_data() {
            this.documents = this.temp_documents;
        },
        view_tags(type) {
            this.step = type;
        },
        editFileName(index) {
            this.editable[index] = !this.editable[index];
            this.$forceUpdate();
        },
        sort_by_size(type) {
            //This is the smallest
            this.documents = this.documents.sort((a, b) => {
                if(a.file_size > b.file_size) {
                    if(type == 0) return 1;
                    else return -1;
                }
                else{
                    if(type==0) return -1;
                    else return 1;
                }
            })
        },
        sort_by_date(type) {
            this.documents = this.documents.sort((a, b) => {
                if(moment(a.data_updated) > moment(b.data_updated)) {
                    if(type == 0) return 1;
                    else return -1;
                }
                else{
                    if(type==0) return -1;
                    else return 1;
                }
            })
        },
        filter_by_upload_user(user){
            this.documents = this.temp_documents.filter(document => document.uploaded_by = user)
        }
    },
    created() {
        const temp_list_type = this.documents.map(document => {
            return document.file_type;
        });
        this.file_type_list = this.removeDuplicates(temp_list_type);
        this.temp_documents = this.documents;
        //Initialize Editable array with false
        for (var i = 0; i < this.documents.length; i++) {
            this.editable[i] = false;
        }
        this.upload_user_list = this.documents.map((item) => {
            return item.uploaded_by;
        });
        this.upload_user_list = this.upload_user_list.filter((item, index) => this.upload_user_list.indexOf(item)==index);
    },
    watch: {
        $route(to, from) {},
    },
};
</script>

<style lang="css" scoped>
.custom-table-content {
       padding: 15px 20px 15px 0px;
       padding-right: 20px;
   }
   .project-detail {
       font-size: 13px;
       color: black;
       font-weight: 600;
   }
   .proj-det-modal {
       position: absolute;
       background-color: black;
   }
   .project-detail {
       font-weight: 600;
   }
   .sub-menu-button {
       background-color: #061831;
   }
   .btn-style {
       margin: 5px 0px 5px 10px;
       min-width: 100px;
       background-color: #E5E5E5;
       color: black;
   }
   .btn-style1 {
       margin: 5px 0px 5px 10px;
       min-width: 100px;
       background-color: #C9C9C9;
       color: black;
   }
   .dialog-btn-style {
       padding: 7px 40px 7px 40px;
       max-width: 200px;
       border-radius: 8px;
       border-width: 0;
   }
   .second-btn-style {
       background-color: #83afdb;
   }
   .first-btn-style {
       background-color: #19293e;
   }
   .custom-table-header {
       background-color: #0C2340;
       color: white;
       padding: 10px 20px 10px 0px;
       min-width: 1065px !important;
   }
   .grey-color {
       background-color: #E7E7E7;
   }
   .file-name-change {
       font-size: 0.9em;
   }
   .custom-control-inline {
       margin-right: 0rem !important;
   }
   .btn-active-style {
       border-radius: 5px;
       border-width: 0;
       background-color: #0C2340;
       color: white;
   }
   .btn-nonactive-style {
       border-radius: 5px;
       border-width: 0;
       background-color: #C9C9C9;
       color: white;
   }
   .each_row{
       min-width: 1065px !important;
   }
   .custom-border-bottom {
       border-bottom: 1px solid #C9C9C9
   }
   .file_name_input_style {
       width: 150px;
       border: 1px solid white;
   }

   @media (max-width: 800px) {
       .table-all {
           overflow: auto;
           width: auto;
       }
   }
</style>
