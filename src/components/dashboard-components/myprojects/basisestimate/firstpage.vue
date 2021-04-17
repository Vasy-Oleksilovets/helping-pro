<template>
    <b-row class="content-card">
        <b-col cols="12" sm="4"></b-col>
        <b-col cols="12" sm="4" class="text-center">
            <div class="title-font basis-title">Basis of Estimate</div>
            <div class="image-style">
                <img
                    width="190"
                    alt="Contstruction Logo"
                    src="~@/assets/img/construction-logo.png"
                />
            </div>
        </b-col>
        <b-col cols="12" sm="4">
            <div class="text-block">
                <div>
                    <span class="mr-2 mb-2 title-font">Company name:</span
                    ><span>Google Healthcare</span>
                </div>
                <div>
                    <span class="mr-2 mb-2 title-font">Project details:</span
                    ><span></span>
                </div>
                <div>
                    <span class="mr-2 mb-2 title-font">Building category</span
                    ><span>Warehouse</span>
                </div>
                <div>
                    <span class="mr-2 mb-2 title-font">Project Type:</span
                    ><span>Conceptual</span>
                </div>
                <div>
                    <span class="mr-2 mb-2 title-font">Budget:</span
                    ><span>$100,000</span>
                </div>
            </div>
        </b-col>
    </b-row>
</template>
<script>
export default {
    name: 'FirstPage',
    components: {},
    data() {
        return {};
    },
    methods: {},
    created() {},
};
</script>

<style scoped>
.basis-estimate-first-page {
    font-weight: normal;
}
.content-card {
    margin: 20px;
    background-color: white;
    border-radius: 3px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    min-height: 80vh;
    padding: 25px;
    font-weight: normal;
}

.title-font {
    font-weight: bold;
}

.basis-title {
    margin-top: 12vh;
}

.image-style {
    margin-top: 5vh;
}

.text-block {
    margin-top: 6vh;
}
</style>
