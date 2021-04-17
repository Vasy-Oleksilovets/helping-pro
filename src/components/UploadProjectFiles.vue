<template>
    <div
        v-if="currentProjectId"
        id="documentSection"
        class="container text-left"
    >
        <h5>Blueprints</h5>
        <div slot="body">
            <div class="row mb-4">
                <div class="col-12">
                    <input
                        type="file"
                        id="file"
                        ref="file"
                        v-on:change="handleFileUpload()"
                    />
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <button
                        type="button"
                        class="btn btn-success"
                        @click="uploadFile()"
                    >
                        Upload
                    </button>
                </div>
                <div v-if="!showDelete" style="padding-top: 10px">
                    <h5>
                        NOTE: Once you have uploaded a blueprint/document, you
                        will NOT be able to delete it. Please ensure that you
                        are uploading the correct document(s).
                    </h5>
                </div>
            </div>

            <hr />
            <template v-if="files != null && files.length > 0">
                <div class="row mb-4" v-for="file in files" :key="file.id">
                    <div class="col">
                        {{ file.fileName }}
                    </div>
                    <div class="col-2">
                        {{ file.fileType }}
                    </div>
                    <div v-if="showSplitPages" class="col-2">
                        <router-link
                            :to="'/adminManageSplitPages?pid=' + file.id"
                            >Manage Split Pages</router-link
                        >
                    </div>
                    <div class="col-2">
                        <button
                            class="btn btn-success pull-right"
                            @click="downloadFile(file)"
                        >
                            Download
                        </button>
                    </div>
                    <div v-if="showDelete" class="col-2">
                        <button
                            class="btn btn-danger"
                            @click="removeConfirmationDialog(file)"
                        >
                            Delete
                        </button>
                    </div>
                </div>
                <!-- end of file row-->
            </template>
            <div class="row" v-if="showRemovalConfirmationModal">
                <transition name="modal">
                    <div class="modal-mask">
                        <div class="modal-wrapper">
                            <div class="modal-container">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h4>
                                                Delete File
                                            </h4>
                                        </div>
                                        <!-- end of modal-header -->
                                        <div class="modal-body">
                                            <b>
                                                Are you going to delete
                                                {{ currentFile.fileName }}?
                                            </b>
                                        </div>
                                        <!-- end of modal-body -->
                                        <div class="modal-footer">
                                            <button
                                                class="btn btn-danger"
                                                @click="deleteFile()"
                                            >
                                                Delete
                                            </button>
                                            <button
                                                class="btn btn-default"
                                                @click="
                                                    showRemovalConfirmationModal = false;
                                                    currentFile = null;
                                                "
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                        <!-- end of modal-footer -->
                                    </div>
                                    <!-- end of modal-content -->
                                </div>
                                <!-- end of modal-dialog -->
                            </div>
                            <!-- end of modal-container -->
                        </div>
                        <!-- end of modal-wrapper -->
                    </div>
                    <!-- end of modal-mask -->
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import ProjectProxy from '@/proxies/ProjectProxy.js';
import FileProxy from '@/proxies/FileProxy.js';

export default {
    name: 'uploadProjectFiles',
    props: {
        showDelete: {
            type: Boolean,
            default: false,
        },
        showSplitPages: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            errors: [],
            file: null,
            files: [],
            currentFile: null,
            currentProjectId: null,
            showRemovalConfirmationModal: false,
        };
    },
    methods: {
        setProjectId: function(value) {
            this.currentProjectId = value;
            this.fileProxy = new FileProxy({
                projectId: this.currentProjectId,
            });
            this.getFiles();
        },
        handleFileUpload() {
            this.file = this.$refs.file.files[0];
        },
        uploadFile() {
            if (this.file == null) {
                this.$notify({
                    group: 'notify',
                    type: 'error',
                    title: 'Error occurred',
                    text: 'Please select file to upload',
                    duration: 5000,
                    speed: 1000,
                });

                return;
            }
            let params = new FormData();
            params.append('file', this.file);
            params.append('projectId', this.currentProjectId);
            var options = {
                headers: { 'Content-Type': 'multipart/form-data' },
            };
            this.isLoading = true;
            this.fileProxy
                .upload(params, options)
                .then(response => {
                    this.$notify({
                        group: 'notify',
                        type: 'success',
                        title: 'Successfully uploaded',
                        text: 'File uploaded successfully!',
                        duration: 5000,
                        speed: 1000,
                    });
                    this.file = null;
                    this.getFiles();
                })
                .catch(error => {
                    this.$notify({
                        group: 'notify',
                        type: 'error',
                        title: 'Error occurred',
                        text: 'Error occurred while uploading file',
                        duration: 5000,
                        speed: 1000,
                    });
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        getFiles() {
            this.isLoading = true;
            if (this.currentProjectId) {
                this.fileProxy = new FileProxy({
                    projectId: this.currentProjectId,
                });
                this.fileProxy
                    .all()
                    .then(response => {
                        this.files = response;

                        this.$notify({
                            group: 'notify',
                            type: 'success',
                            title: 'Successfully retrieved files',
                            text: 'Retrieved files successfully',
                            duration: 5000,
                            speed: 1000,
                        });
                    })
                    .catch(error => {
                        this.$notify({
                            group: 'notify',
                            type: 'error',
                            title: 'Error occurred',
                            text: 'Error occurred while retrieving files',
                            duration: 5000,
                            speed: 1000,
                        });
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            }
        },
        downloadFile(file) {
            const options = { responseType: 'blob' };
            this.fileProxy.download(file.id, options).then(response => {
                if (!window.navigator.msSaveOrOpenBlob) {
                    const url = window.URL.createObjectURL(
                        new Blob([response])
                    );
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', file.fileName);
                    document.body.appendChild(link);
                    link.click();
                } else {
                    // BLOB FOR EXPLORER 11
                    const url = window.navigator.msSaveOrOpenBlob(
                        new Blob([response]),
                        file.fileName
                    );
                    const link = document.createElement('a');
                    link.setAttribute('download', file.fileName);
                    document.body.appendChild(link);
                    link.click();
                }
            });
        },
        deleteFile() {
            this.isLoading = true;
            let params = new FormData();
            params.append('documentId', this.currentFile.id);
            params.append('projectId', this.currentProjectId);
            this.fileProxy
                .deleteProjectFile(params)
                .then(response => {
                    this.$notify({
                        group: 'notify',
                        type: 'success',
                        title: 'Successfully deleted files',
                        text: 'Deleted file successfully',
                        duration: 5000,
                        speed: 1000,
                    });
                    this.getFiles();
                })
                .catch(error => {
                    this.$notify({
                        group: 'notify',
                        type: 'error',
                        title: 'Error occurred',
                        text: 'Error occurred while deleting file',
                        duration: 5000,
                        speed: 1000,
                    });
                })
                .finally(() => {
                    this.showRemovalConfirmationModal = false;
                    this.isLoading = false;
                });
        },
        removeConfirmationDialog(file) {
            this.currentFile = file;
            this.showRemovalConfirmationModal = true;
        },
    },
    components: {},
    mounted() {
        //this.getFiles();
        //this.fileProxy = new FileProxy({'projectId': this.projectId});
    },
};
</script>
