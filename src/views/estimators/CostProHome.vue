<template>
    <div class="costProHome">
        <Navigation />
        <main class="bg-img content">
            <hr style="background-color:#ed6d3a; height:4px" />
            <b-breadcrumb :items="items"></b-breadcrumb>
            <section class="secWhite">
                <div class="container text-center">
                    <div v-if="estimatorProfile != null">
                        <h2 class="title">
                            {{ estimatorProfile.firstName }}
                            {{ estimatorProfile.lastName }}
                        </h2>

                        <div v-if="estimatorProfile.status == 'INCOMPLETE'">
                            Your application is incomplete. Please upload a
                            certification document for each certification listed
                            in your application.
                            <br /><br />
                            <div
                                v-for="document in estimatorProfile.estimatorDocuments"
                                :key="document.id"
                            >
                                Uploaded: {{ document.fileName }}
                            </div>
                            <div class="container">
                                <div>
                                    <label
                                        >File
                                        <input
                                            type="file"
                                            id="uploadFile"
                                            ref="uploadFile"
                                            v-on:change="handleFileUpload()"
                                        />
                                    </label>
                                    <button v-on:click="submitFile()">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div
                            v-if="
                                estimatorProfile.status == 'SUBMITTED' ||
                                    estimatorProfile.status == 'RESUBMITTED'
                            "
                        >
                            <router-link :to="'/costProCurrentProjects'"
                                >Current Projects</router-link
                            ><br />
                            <router-link :to="'/costProPastProjects'"
                                >Past Projects</router-link
                            ><br />
                            <router-link :to="'/costProProfile'"
                                >Edit Profile</router-link
                            ><br />
                        </div>
                    </div>
                </div>
            </section>
        </main>
        <footer>
            <div class="container text-center">
                <a href="#" title="">
                    <img src="~@/assets/img/logoWhite.png" alt="" />
                </a>
                <p>Copyright, 2019 Construction Check. All Rights Reserved.</p>
            </div>
        </footer>
    </div>
</template>

<script>
import Navigation from '../../components/Navigation.vue';
import EstimatorProxy from '@/proxies/EstimatorProxy.js';
import store from '@/store';

export default {
    name: 'estimate',
    data() {
        return {
            errors: [],
            token: '',
            showResponse: false,
            estimatorProfile: null,
            firstName: null,
            username: null,
            userCode: null,
            currentProjects: [],
            file: '',
            document: null,
            items: [
                {
                    text: 'Cost Pro Home',
                    active: true,
                },
            ],
        };
    },
    methods: {
        getAccountInfo: function(e) {},
        handleFileUpload() {
            this.file = this.$refs.uploadFile.files[0];
        },
        submitFile() {
            /*
          Initialize the form data
        */
            let formData = new FormData();
            formData.append('uploadFile', this.file);
            new EstimatorProxy()
                .uploadEstimatorCertFiles(formData)
                .then(response => {
                    if (response.status == '200') {
                        this.estimatorProfile = response.data;
                    }
                })
                .catch(function() {
                    console.log('FAILURE!!');
                });
        },
        getEstimatorProfile() {
            var params = new URLSearchParams();
            new EstimatorProxy()
                .getEstimatorProfile()
                .then(response => {
                    this.estimatorProfile = response.data;
                })
                .catch(error => {
                    console.error('error!: ' + error);
                })
                .finally(() => {
                    //this.isLoading = false;
                });
        },
    },
    components: {
        Navigation: Navigation,
    },
    created() {
        this.getEstimatorProfile();
    },
};
</script>
