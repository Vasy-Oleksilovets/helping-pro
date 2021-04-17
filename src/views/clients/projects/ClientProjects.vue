<template>
    <div class="clientProjects">
        <Navigation />
        <main class="bg-img content">
            <h4>Projects</h4>
            <hr style="background-color:#ed6d3a; height:4px" />
            <b-breadcrumb :items="items"></b-breadcrumb>
            <section class="secWhite secValidate">
                <div v-if="this.projects.length > 0">
                    <div v-for="project in projects" :key="project.id">
                        <div>
                            <div>
                                <span>{{ project.name }}</span
                                ><span>Start Date: {{ project.dateStart }}</span
                                ><span>End Date: {{ project.dateEnd }}</span>
                                <router-link :to="'/report/' + project.id">
                                    &nbsp;Edit</router-link
                                >
                            </div>
                            <hr />
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
import Vue from 'vue';
import ProjectProxy from '@/proxies/ProjectProxy.js';
import Navigation from '@/components/Navigation.vue';

export default {
    name: 'clientProjects',
    data() {
        return {
            errors: [],
            showCreateProject: true,
            projects: [],
            items: [
                {
                    text: 'Client Home',
                    to: { name: 'clientHome' },
                },
                {
                    text: 'Projects',
                    active: true,
                },
            ],
        };
    },
    methods: {
        fetchProjects() {
            this.isLoading = true;
            var params = new URLSearchParams();
            new ProjectProxy()
                .getProjects(params)
                .then(response => {
                    this.projects = response;
                })
                .catch(error => {
                    this.$notify({
                        group: 'notify',
                        type: 'error',
                        title: 'Error occurred',
                        text: 'Error occurred while getting projects',
                        duration: 5000,
                        speed: 1000,
                    });
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
    },
    components: {
        Navigation: Navigation,
    },
    mounted() {
        this.fetchProjects();
    },
};
</script>
