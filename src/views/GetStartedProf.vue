<template>
    <div class="get-started">
        <Navigation />
        <ContractorRegistrationPage />
        <SiteFooter />
    </div>
</template>

<script>
//import Header from '../components/layouts/Header.vue';
import Navigation from '../components/Navigation.vue';
import SiteFooter from '../components/SiteFooter.vue';
import ContractorRegistrationPage from '../components/registration-components/contractor-registration/ContractorRegistrationPage.vue';

export default {
    name: 'GetStarted',
    components: {
        ContractorRegistrationPage,
        //Header,
        SiteFooter,
        Navigation
    },
};
</script>

<style scoped></style>
