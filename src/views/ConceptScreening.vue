<template>
    <div class="conceptScreening">
        <Navigation />
        <main class="bg-img content">
            <hr style="background-color:#ed6d3a; height:4px" />
            <section class="secWhite secValidate">
                <div class="container text-center">
                    <h2 class="title">Concept Screening</h2>
                    <div v-if="showLogin">
                        <!-- show the login screen -->
                        <h5>
                            You are not currrently logged in. Please log in to
                            continue.
                        </h5>
                        <LoginComponent @submitted="onLogin" />
                    </div>
                    <p></p>
                </div>
            </section>
            <section class="secWhite getStarted">
                <div class="container text-left">
                    This is something
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
import Navigation from '../components/Navigation.vue';
import LoginComponent from '../components/LoginComponent.vue';

export default {
    name: 'conceptScreening',
    data() {
        return {
            loginError: false,
            user: '',
            user1: '',
            password: '',
            error: false,
            errors: [],
            showLogin: false,
        };
    },
    methods: {
        onLogin(value) {
            if (value == true) {
                this.showLogin = false;
            } else {
                this.showLogin = true;
                this.error = true;
                this.errors.push('Invalid login');
            }
        },
    },
    components: {
        Navigation: Navigation,
        LoginComponent: LoginComponent,
    },
    created() {
        this.showLogin = !this.$store.getters.isLoggedIn;
    },
};
</script>
<style>
@import '../assets/css/style.css';
label {
    padding-left: 5px;
}
h3 {
    color: #ed6d3a;
}
.bold {
    font-weight: bold;
}
</style>
