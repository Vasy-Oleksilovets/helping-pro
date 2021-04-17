<template>
    <div class="costProHomeCurrent">
        <Navigation />
        <main class="bg-img content">
            <hr style="background-color:#ed6d3a; height:4px" />
            <b-breadcrumb :items="items"></b-breadcrumb>
            <section class="secWhite">
                <div class="container text-center">
                    <h2 class="title">Current Projects</h2>
                    <div
                        v-for="currentProject in currentProjects"
                        :key="currentProject.project.id"
                    >
                        <div>
                            Project: {{ currentProject.project.name }} Date
                            Start: {{ currentProject.project.dateStart }} Date
                            End: {{ currentProject.project.dateEnd }}
                        </div>
                        <div
                            v-for="subProject in currentProject.subProjectList"
                            :key="subProject.id"
                        >
                            <span><b>Sub-Project</b></span>
                            <div>
                                Type: {{ subProject.expertiseCategory.name }}
                            </div>
                            <div>
                                Fee:
                                {{ formatCurrency(subProject.estimatorFee) }}
                            </div>
                            <div>
                                Number of Pages: {{ subProject.numberOfPages }}
                            </div>
                            <router-link
                                :to="
                                    `/costProEditSubProject/${
                                        subProject.id
                                    }/?a=e`
                                "
                            >
                                <div>
                                    <p>Edit Sub-Project</p>
                                </div>
                            </router-link>
                            <br />
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
import ProjectProxy from '@/proxies/ProjectProxy.js';
import store from '@/store';

export default {
    name: 'estimate',
    data() {
        return {
            errors: [],
            token: '',
            showResponse: false,
            estimatorProfile: null,
            currentProjects: [],
            file: '',
            document: null,
            items: [
                {
                    text: 'Cost Pro Home',
                    to: { name: 'costProHome' },
                },
                {
                    text: 'Current Projects',
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
        formatCurrency(val) {
            if (val) {
                return '$' + val.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            } else {
                return '';
            }
        },
        getEstimatorCurrentProjects() {
            new ProjectProxy()
                .getEstimatorCurrentProjects()
                .then(response => {
                    this.currentProjects = response.data;
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
        this.getEstimatorCurrentProjects();
    },
};
</script>
