<template>
    <div style="vertical-align: middle" class="card-component">
        <div class="each_row d-flex">
            <div class="custom-text-center col-width">{{project.name}}</div>
            <div class="col-width"></div>
            <div class="col-width"></div>
            <div class="custom-text-center col-width">{{project.dateStart}}</div>
            <!-- <div v-if="project.approachingEndDate" class="col-width" style="color: red">
                <div>{{project.dateEnd}}</div>
                <div style="font-size: 10px; color: red">
                    Approaching end date
                </div>
            </div>
            <div v-else class="col-width">
                <div>{{project.dateEnd}}</div>
            </div> -->
            <div class="col-width" v-if="project.approachingEndDate">
                <div style="color: yellow">{{project.dateEnd}}</div>
            </div>
            <div class="col-width" v-else>
                <div>{{project.dateEnd}}</div>
            </div>
            
            <div class="custom-text-center col-width">{{project.projectStatus}}</div>
            <div class="custom-text-center col-width">In Progress</div>
            <!-- <b-btn class="btn-style"><router-link class="project_link" to="/dashboard/myprojects/1">Go to Project</router-link></b-btn> -->
        </div>
        <div
            style="border-bottom: 1px solid black; margin-left: 20px; margin-right: 20px"
        ></div>
        <div class="second_row d-flex">
            <div class="custom-text-center col-width">
                <b-btn v-if="role === 7 || role === 8" class="btn-style"
                    ><router-link
                        :role="role"
                        class="project_link"
                        to="/dashboard/myprojects/detail/drawings"
                        >Sort Drawings</router-link
                    ></b-btn
                >
                <b-btn v-if="role === 6" class="btn-style"
                    ><router-link
                        :role="role"
                        class="project_link"
                        :to="{path: `/dashboard/myprojects/detail/${project.projectId}/feesubmission` }"
                        >Review Fee Submission</router-link
                    ></b-btn
                >
            </div>
            <div class="custom-text-center col-width">
                <b-btn v-if="role === 7 || role === 8" class="btn-style">
                    <router-link
                        class="project_link"
                        to="/dashboard/myprojects/detail/feesubmission"
                        >Create Fee Submission</router-link
                    ></b-btn
                >
                <b-btn v-if="role === 6" class="btn-style">
                    <router-link
                        class="project_link"
                        :to="{path: `/dashboard/myprojects/detail/${project.projectId}/basisestimate` }"
                        >Review Basis of Estimate</router-link
                    ></b-btn
                >
            </div>
            <div class="custom-text-center col-width">
                <b-btn v-if="role === 7 || role === 8" class="btn-style1 custom-text-center"
                    ><router-link class="project_link" to="#"
                        >Recruit Estimators</router-link
                    ></b-btn
                >
                <div v-if="role === 7 || role === 8">
                    <img
                        width="5"
                        style="vertical-align: top"
                        src="~@/assets/img/small-icons/question-tag.png"
                        alt=""
                    />
                </div>
            </div>
            <div class="custom-text-center col-width">
                <b-btn v-if="role === 7 || role === 8" class="btn-style1 custom-text-center"
                    ><router-link class="project_link" to="#"
                        >Create Basis of Estimate</router-link
                    ></b-btn
                >
                <div v-if="role === 7 || role === 8">
                    <img
                        width="5"
                        style="vertical-align: top"
                        src="~@/assets/img/small-icons/question-tag.png"
                        alt=""
                    />
                </div>
            </div>
            <div class="custom-text-center col-width">
                <b-btn v-if="role === 7 || role === 8" class="btn-style1 custom-text-center"
                    ><router-link class="project_link" to="#"
                        >Generate Invoice</router-link
                    ></b-btn
                >
                <div v-if="role === 7 || role === 8">
                    <img
                        width="5"
                        style="vertical-align: top"
                        src="~@/assets/img/small-icons/question-tag.png"
                        alt=""
                    />
                </div>
            </div>
            <div class="custom-text-center col-width">
                <b-btn v-if="role === 7 || role === 8" class="btn-style1 custom-text-center"
                    ><router-link class="project_link" to="#"
                        >Pay Estimators</router-link
                    ></b-btn
                >
                <div v-if="role === 7 || role === 8">
                    <img
                        width="5"
                        style="vertical-align: top"
                        src="~@/assets/img/small-icons/question-tag.png"
                        alt=""
                    />
                </div>
            </div>
            <div class="custom-text-center col-width">
                <b-btn class="btn-style">
                    <router-link  class="project_link"  :to="{path: `/dashboard/myprojects/detail/${project.projectId}` }">Go to Project</router-link>
                </b-btn>
            </div>
            <!-- <b-btn class="btn-style"><router-link class="project_link" to="/dashboard/myprojects/1">Go to Project</router-link></b-btn> -->
        </div>
    </div>
</template>
<script>
export default {
    name: 'ProjectProgress',
    props: ['role', 'project'],
    data() {
        return {};
    },
    methods: {},
    created() {
    },
};
</script>

<style scoped>
.col-width {
    width: 14.2%;
}
.project {
    font-size: 1em;
    color: black;
    font-weight: 600;
}
.table-header {
    background-color: #061831;
    color: white;
    padding: 15px 30px 15px 30px;
    min-width: 1200px !important;
}
.card-component {
    background-color: white;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    margin: 10px;
    min-width: 1180px !important;
}
.each_row {
    min-width: 1000px !important;
    margin-top: 10px !important;
    padding: 10px 10px 0px 20px;
    margin-bottom: 5px;
}
.second_row {
    min-width: 1000px !important;
    margin-top: 10px !important;
    padding: 10px 10px 0px 20px;
    padding-bottom: 15px;
}
.custom-text-center {
    display: flex;
    align-items: center;
}
.btn-style {
    background-color: #0c2340;
    width: 150px;
    font-weight: normal;
    font-size: 10px;
    margin-right: 5px;
    border-radius: 3px;
    border: #0c2340;
}
.btn-style1 {
    background-color: #c9c9c9;
    width: 140px;
    font-weight: normal;
    font-size: 9px;
    margin-right: 5px;
    border-radius: 3px;
    border: #c9c9c9;
    display: flex;
    justify-content: center;
}
.project_link {
    text-decoration: none;
    color: white;
}
@media (max-width: 800px) {
    .table-all {
        overflow: auto;
    }
}
</style>
