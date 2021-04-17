<template>
    <div class="get-started">
        <Navigation />
        <ClientRegistrationPage />
        <SiteFooter />
    </div>
</template>

<script>
//import Header from '../components/layouts/Header.vue';
import Navigation from '../components/Navigation.vue';
//import Footer from '../components/layouts/Footer.vue';
import SiteFooter from '../components/SiteFooter.vue';
import ClientRegistrationPage from '../components/registration-components/client-registration/ClientRegistrationPage.vue';

export default {
    name: 'GetStarted2',
    components: {
        ClientRegistrationPage,
        //Header,
        Navigation,
        SiteFooter,
    },
};
</script>

<style scoped></style>
