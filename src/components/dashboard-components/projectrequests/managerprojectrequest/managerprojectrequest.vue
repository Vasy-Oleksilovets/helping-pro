<template>
    <div>
        <b-tabs class="project-request-container">
            <b-tab v-if="role === 7 || role === 8" title="Client Project Submission" active>
                <ClientProjectSubmission />
            </b-tab>
            <b-tab v-if="role === 7 || role === 8" title="Find Estimators">
                <FindEstimators />
            </b-tab>
            <b-tab v-if="role === 7 || role === 8" title="Project Request">
                <ProjectRequestTab />
            </b-tab>
        </b-tabs>
        <ClientProjectSubmission v-if="role === 6" class="border mr-3 ml-3"/>
        <CompanyClientManagers v-if="role === 4" :role="role" class="border mr-3 ml-3"/>
        <CompanyClientManagers v-if="role === 5" :role="role" class="border mr-3 ml-3"/>
    </div>
</template>

<script>
import ClientProjectSubmission from './clientprojectsubmission';
import FindEstimators from './findestimators';
import ProjectRequestTab from './projectrequesttab';
import CompanyClientManagers from './companyclientmanagers';
export default {
    name: 'ManagerProjectRequest',
    props: ['role'],
    components: {
        ClientProjectSubmission,
        FindEstimators,
        ProjectRequestTab,
        CompanyClientManagers
    },
    data() {
        return {};
    },
    methods: {},
    created() {},
};
</script>

<style scoped>
.project-request-container {
    margin: 20px;
}
</style>
