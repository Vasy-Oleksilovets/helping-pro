<template>
    <div class="adminHome">
        <!-- <Navigation /> -->
        <main class="bg-img content">
            <!-- <hr style="background-color:#ed6d3a; height:4px" />
            <section class="secWhite secValidate"> -->
                <div class="container text-center">
                    <p></p>
                </div>
            </section>
        </main>
        <!-- <footer>
            <div class="container text-center">
                <a href="#" title="">
                    <img src="~@/assets/img/logoWhite.png" alt="" />
                </a>
                <p>Copyright, 2019 Construction Check. All Rights Reserved.</p>
            </div>
        </footer> -->
    </div>
</template>

<script>
import AdminProxy from '@/proxies/AdminProxy.js';
import Navigation from '@/components/Navigation.vue';

export default {
    name: 'estimate',
    data() {
        return {
            errors: [],
        };
    },
    methods: {
        getAccountInfo: function(e) {},
    },
    components: {
        Navigation: Navigation,
    },
    created() {},
};
</script>
