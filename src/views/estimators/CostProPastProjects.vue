<template>
    <div class="costProHomePast">
        <Navigation />
        <main class="bg-img content">
            <hr style="background-color:#ed6d3a; height:4px" />
            <b-breadcrumb :items="items"></b-breadcrumb>
            <section class="secWhite">
                <div class="container text-center">
                    <h2 class="title">Past Projects</h2>
                    <div
                        v-for="pastProject in pastProjects"
                        :key="pastProject.project.id"
                    >
                        <div>
                            Project: {{ pastProject.project.name }} Date Start:
                            {{ pastProject.project.dateStart }} Date End:
                            {{ pastProject.project.dateEnd }}
                        </div>
                        <div
                            v-for="subProject in pastProject.subProjectList"
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
                                :to="`/costProViewSubProject/${subProject.id}/`"
                            >
                                <div>
                                    <p>Sub-Project Details</p>
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
            pastProjects: [],
            file: '',
            document: null,
            items: [
                {
                    text: 'Cost Pro Home',
                    to: { name: 'costProHome' },
                },
                {
                    text: 'Past Projects',
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
        getEstimatorPastProjects() {
            new ProjectProxy()
                .getEstimatorPastProjects()
                .then(response => {
                    this.pastProjects = response.data;
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
        this.getEstimatorPastProjects();
    },
};
</script>
