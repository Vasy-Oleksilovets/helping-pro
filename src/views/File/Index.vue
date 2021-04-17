<template>
    <v-layout>
        <div style="margin-top: 150px;"></div>

        <v-card contextual-style="info">
            <span slot="header">
                File
            </span>
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
                </div>

                <hr />
                <template v-if="files != null && files.length > 0">
                    <div
                        class="row mb-4"
                        v-for="file in files"
                        :key="file.fileName"
                    >
                        <div class="col">
                            {{ file.fileName }}
                        </div>
                        <div class="col-2">
                            {{ file.fileType }}
                        </div>
                        <div class="col-2">
                            <button
                                class="btn btn-success pull-right"
                                @click="downloadFile(file)"
                            >
                                Download
                            </button>
                        </div>
                        <div class="col-2">
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
        </v-card>
    </v-layout>
</template>

<script>
/* ============
 * File Index Page
 * ============
 *
 * The file index page.
 */
import Vue from 'vue';
import VLayout from '@/layouts/Default.vue';
import VCard from '@/components/Card.vue';
import Loading from 'vue-loading-overlay';
import FileProxy from '@/proxies/FileProxy.js';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
    /**
     * The name of the page.
     */
    name: 'FileIndex',
    /**
     * The components that the page can use.
     */
    components: {
        VLayout,
        VCard,
        Loading,
    },
    data() {
        return {
            isLoading: false,
            file: null,
            files: [],
            showRemovalConfirmationModal: false,
            currentFile: null,
            currentProjectId: null,
            fileProxy: null,
        };
    },
    mounted() {
        this.currentProjectId = this.$route.params.project_id;
        this.fileProxy = new FileProxy({ projectId: this.currentProjectId });
        this.getFiles();
    },
    computed: {},
    methods: {
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
            this.fileProxy
                .destroy(this.currentFile.id)
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
};
</script>

<style scoped lang="css"></style>
