<template>
    <div class="adminSplitPages">
        <Navigation />
        <main class="bg-img content">
            <hr style="background-color:#ed6d3a; height:4px" />
            <section class="secWhite secValidate">
                <div class="container text-center">
                    <div
                        class="row mb-4"
                        v-for="page in pdfPages"
                        :key="page.id"
                    >
                        <div class="col">
                            {{ page.fileName }}
                        </div>
                    </div>
                    <p></p>
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
import AdminProxy from '@/proxies/AdminProxy.js';
import Navigation from '@/components/Navigation.vue';
import FileProxy from '@/proxies/FileProxy.js';

export default {
    name: 'estimate',
    data() {
        return {
            errors: [],
            pdfPages: [],
            showResponse: false,
            fileId: '',
        };
    },
    methods: {
        getPdfPages() {
            new FileProxy()
                .getPdfPages(this.fileId)
                .then(response => {
                    this.pdfPages = response;
                })
                .catch(error => {
                    this.errors.push(error);
                });
        },
    },
    components: {
        Navigation: Navigation,
    },
    created() {
        this.fileId = this.$route.query.pid;
        this.getPdfPages();
    },
};
</script>
