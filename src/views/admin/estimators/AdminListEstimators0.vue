<template>
    <div class="adminest">
        <Navigation />
        <b-breadcrumb :items="items"></b-breadcrumb>
        <main class="bg-img content">
            <h4>Cost Estimators</h4>
            <hr style="background-color:#ed6d3a; height:4px" />
            <section class="secWhite secValidate">
                <SearchEstimators @setEstimatorList="eventEstimatorList" />

                <div v-if="estimatorList.length > 0">
                    <div class="container text-center">
                        <h5>Results</h5>
                        <div
                            v-for="estimator in estimatorList"
                            :key="estimator.emailAddress"
                        >
                            <div>
                                <div>
                                    <span
                                        >{{ estimator.firstName }}
                                        {{ estimator.lastName }}
                                        {{ estimator.emailAddress }}
                                    </span>
                                </div>
                                <hr />
                            </div>
                        </div>
                        <div v-if="estimatorList.length < 1 && btnClicked">
                            No Results Found
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
import Navigation from '@/components/Navigation.vue';
import SearchEstimators from '@/components/SearchEstimators.vue';

export default {
    name: 'estimate',
    data() {
        return {
            errors: [],
            estimatorList: [],
            btnClicked: false,
            items: [
                {
                    text: 'Admin Home',
                    to: { name: 'adminHome' },
                },
                {
                    text: 'Cost Estimators',
                    active: true,
                },
            ],
        };
    },
    methods: {
        eventEstimatorList: function(list) {
            this.estimatorList = list;
        },
    },
    components: {
        Navigation: Navigation,
        SearchEstimators: SearchEstimators,
    },
    created() {},
};
</script>
