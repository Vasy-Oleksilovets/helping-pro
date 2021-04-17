<template>
    <div class="home">
        <Navigation></Navigation>
        <main class="bg-img content">
            <section class="Mainbaner">
                <div class="slideTitle text-center text-white">
                    <div class="container">
                        <h1>Construction Check <span>&trade;</span></h1>
                        <p>Improve Cost Certainty</p>
                    </div>
                </div>
                <div class="fullBar">
                    <div class="container">
                        <b-carousel
                            id="carousel-1"
                            v-model="slide"
                            :interval="4000"
                            controls
                            background="#ed6d3a"
                        >
                            <b-carousel-slide>
                                <div slot="img" class="singlSlide">
                                    <div
                                        class="slideContent d-flex align-items-center justify-content-center"
                                    >
                                        <h3>
                                            <span class="Slidenmbr">02</span
                                            >IMPROVED OVERSIGHT & SELECTION:
                                        </h3>
                                        <div class="slideRight">
                                            <p>Enter into genuine</p>
                                            <p>construction relationships</p>
                                        </div>
                                    </div>
                                </div>
                            </b-carousel-slide>
                            <b-carousel-slide>
                                <div slot="img" class="singlSlide">
                                    <div
                                        class="slideContent d-flex align-items-center justify-content-center"
                                    >
                                        <h3>
                                            <span class="Slidenmbr">03</span
                                            >IMPROVED OVERSIGHT & SELECTION:
                                        </h3>
                                        <div class="slideRight">
                                            <p>Enter into genuine</p>
                                            <p>construction relationships</p>
                                        </div>
                                    </div>
                                </div>
                            </b-carousel-slide>
                        </b-carousel>
                    </div>
                </div>
            </section>
            <section class="secWhite secValidate">
                <div class="container text-center">
                    <h2 class="title">
                        Validate your Concepts, Studies, and Budgets
                    </h2>
                    <p>
                        Construction Check is where construction concepts,
                        studies and budgets for the build environment all get
                        validated. Construction Check uses an algorithmic
                        approach and Machine Learning to analyze your project
                        budget prior to project approval, award, bonding,
                        financing, or funding. Construction Stakeholders public
                        and private can trust they’ll get an Independent,
                        Objective, and Unbiased opinion of probable construction
                        costs.
                    </p>
                </div>
            </section>
            <section class="secGray">
                <div class="container text-center">
                    <h2 class="title">
                        Choose a Validation method based on your projects
                        status:
                    </h2>
                    <div
                        class="statusCards d-flex align-items-center justify-content-center"
                    >
                        <router-link to="conceptScreening">
                            <div
                                class="singlCard d-flex align-items-center justify-content-center flex-column"
                            >
                                <div class="Cardicon lightBulb"></div>
                                <p>My Concept Screening</p>
                            </div>
                        </router-link>
                        <div
                            class="singlCard d-flex align-items-center justify-content-center flex-column"
                        >
                            <div class="Cardicon bookIcon"></div>
                            <p>Study or Feasability</p>
                        </div>
                        <div
                            class="singlCard d-flex align-items-center justify-content-center flex-column"
                        >
                            <div class="Cardicon docIcon"></div>
                            <p>Budget & Financing Authorization</p>
                        </div>
                        <div
                            class="singlCard d-flex align-items-center justify-content-center flex-column"
                        >
                            <div class="Cardicon editIcon"></div>
                            <p>Validate Bids & Estimates</p>
                        </div>
                    </div>
                </div>
            </section>
            <section class="secWhite getStarted">
                <div class="container text-center">
                    <p>
                        In the built environment, outcomes matter more than
                        promises: that’s why construction stakeholders should
                        <a href="#" title="">trust, but verify</a>.
                    </p>
                    <b-button variant="danger" class="">GET STARTED</b-button
                    >&nbsp;
                    <router-link to="estimators/costProRegistration">
                        <b-button variant="success" class=""
                            >ESTIMATOR SIGNUP</b-button
                        >
                    </router-link>
                </div>
            </section>
            costProRegistration
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

export default {
    name: 'home',
    data() {
        return {
            slide: 0,
            sliding: null,
        };
    },
    methods: {
        onSlideStart(slide) {
            this.sliding = true;
        },
        onSlideEnd(slide) {
            this.sliding = false;
        },
    },
    components: {
        Navigation: Navigation,
    },
};
</script>
<style>
@import '../assets/css/style.css';
</style>
