<template>
<div>
    <!-- Header -->
    <b-row class="estimate-header-filter-bar">
        <b-col lg="4">
            <MasterAutoComplete v-model="code" :initial="code" :disabled="false" />
        </b-col>
        <b-col lg="4"> </b-col>
        <b-col lg="4">
            <b-row class="h-100">
                <b-col lg="7"> </b-col>
                <!-- Back to top -->
                <b-col lg="5" class="my-auto">
                    <a class="text-white float-right a-back-to-top">
                        Back to top
                        <img src="~@/assets/img/back-to-top.png" />
                    </a>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
    <b-row class="estimates-header-columns">
        <b-col lg="2">
            CODE
        </b-col>
        <b-col lg="2">
            DESCRIPTION
        </b-col>
        <b-col lg="1">
            QUANTITY
        </b-col>
        <b-col lg="1">
            UNIT
        </b-col>
        <b-col lg="1">
            MATERIAL COST
        </b-col>
        <b-col lg="1">
            LABOR COST
        </b-col>
        <b-col lg="1">
            EQUIPMENT COST
        </b-col>
        <b-col lg="1">
            SUBCONTRACTOR COST
        </b-col>
        <b-col lg="2">
            TOTAL
        </b-col>
    </b-row>

    <!-- Body with EstimatesCells -->
    <transition name="fade">
        <NewEstimatesCell class="mt-2" v-show="getNewEstimateStatus" :newNumber="getNewCodeNumber" :newTitle="getNewCodeTitle" :newId="getNewId" />
    </transition>

    <div class="estimates-body">
        <CommentModal />

        <EstimatesCell v-show="showEstimateLines" v-for="(line, i)  in getEstimateLines" :estimateLine="line" :key="i" :lineKey="i" :level="1" class="mb-3 block-estimate-rows" />
    </div>
</div>
</template>

<script>
import NewEstimatesCell from './new-estimates-cell';
import EstimatesCell from './estimates-cell';
import MasterAutoComplete from './master-auto-complete';
import CommentModal from './comments/comment-modal'
import {
    mapGetters
} from 'vuex';
import EventBus from '../../../../plugins/event-bus';

export default {
    name: "Estimates",
    components: {
        NewEstimatesCell,
        EstimatesCell,
        MasterAutoComplete,
        CommentModal,
    },
    data() {
        return {
            code: '',
            showEstimateLines: true,
        };
    },
    mounted() {
        EventBus.$on('show_estimate_lines', (value) => {
            this.showEstimateLines = value;
        });
    },
    computed: {
        ...mapGetters("code", [
            "getNewEstimateStatus",
            "getNewCodeNumber",
            "getNewCodeTitle",
            "getNewId",
        ]),
        ...mapGetters("projectmanager", [
            "getEstimateLines",
        ]),
    },
    methods: {

    }
}
</script>

<style lang="css" scoped>
.estimates-header-columns {
    background-color: #061831;
    ;
    height: 64px;

    font-family: Montserrat;
    color: #ffffff;
    text-align: center;
}

.estimates-header-columns div {
    margin: auto;
}

.estimate-header-filter-bar {
    height: 80px;
    background: #1C3452;
}

.a-back-to-top {
    color: #FB922F !important;
}

.a-back-to-top:hover {
    cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active below version 2.1.8 */
    {
    opacity: 0;
}

.estimates-body {
    background: white;
    margin-top: 15px;

    height: 500px;
    overflow-y: scroll;
    position: relative;
}

.block-estimate-rows {
    border: 3px solid #516D8F;
}

/**
    Estimate body scroll bar styles
   */
.estimates-body::-webkit-scrollbar-track {
    border-radius: 5px;
}

.estimates-body::-webkit-scrollbar {
    width: 9px;
    background-color: #FFFFFF;
}

.estimates-body::-webkit-scrollbar-thumb {
    background-color: silver;
}
</style>
