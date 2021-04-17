<template>
    <div class="card-container projectrequest-client-detail">
        <b-row class="client-project-header align-items-center">
            <b-col cols="auto" class="d-flex align-items-center">
                <img
                    role="button"
                    @click="gotoPreviousPage"
                    alt="Previous Page"
                    src="~@/assets/img/small-icons/left-arrow.png"
                    class="mr-3"
                />
                <span class="font-weight-bold">Joe Estimator</span>
            </b-col>
            <b-col cols="auto" class="d-flex align-items-center">
                <span class="mr-3 font-weight-bold">Building Type</span>
                <span class="grey-color">Airport</span>
            </b-col>
            <b-col cols="auto" class="d-flex align-items-center">
                <span class="mr-3 font-weight-bold">Project Type</span>
                <span>Conceptual</span>
            </b-col>
            <b-col cols="auto" class="d-flex align-items-center">
                <span class="mr-2 font-weight-bold">Area of expertise</span>
                <span>Gen. & Arch.</span>
            </b-col>
            <b-col cols="auto" class="d-flex align-items-center">
                <span class="mr-3 font-weight-bold">Project Fee</span>
                <span>{{2000 | formatMoney('$', 0)}}</span>
            </b-col>
            <b-col cols="auto" class="d-flex align-items-center">
                <span class="mr-3 font-weight-bold">Date Sent</span>
                <span>9/25/2020</span>
            </b-col>
            <b-col cols="auto" class="d-flex align-items-center">
                <span class="mr-3 font-weight-bold">Status</span>
                <span>Pending</span>
            </b-col>
        </b-row>
        
        <!-- Content -->

        <div class="client-project-detail-content">
            <b-row class="mt-4">
                <b-col sm="3">
                    <span class="mr-3 font-weight-bold">Company:</span>
                    <span>Atlanta</span>
                </b-col>
                <b-col sm="3" class="font-weight-bold">
                    <span class="mr-3">Project Name:</span>
                    <span>Project 1</span>
                </b-col>
            </b-row>
            <b-row class="mt-3">
                <b-col sm="3">
                    <span class="mr-3 font-weight-bold">Category/Type of Building</span>
                    <span>Airport</span>
                </b-col>
            </b-row>
            <b-row class="mt-3">
                <b-col sm="3">
                    <span class="mr-3 font-weight-bold">Location</span>
                    <span>New York</span>
                </b-col>
            </b-row>
            <b-row class="mt-3">
                <b-col sm="3">
                    <span class="mr-3 font-weight-bold">Project Type</span>
                    <span>09/01/2020 - 09/25/2020</span>
                </b-col>
            </b-row>
            <b-row class="mt-3">
                <b-col sm="3">
                    <span class="mr-3 font-weight-bold">Budget</span>
                    <span>{{2000 | formatMoney('$', 0)}}</span>
                </b-col>
            </b-row>
            <b-row class="mt-3">
                <b-col class="font-weight-bold" sm="4">
                    <span class="mr-3">Project Description</span>
                </b-col>
            </b-row>
            <b-row class="mt-2">
                <b-col sm="4">
                    <div>
                        This project consists of the acquisition of lood damaged properties located adjacent to the Park River (in the floodway) (photos were provided). Nineteen(19) properties have been identified as having substantial damages and are at high risk for future flood damages. Once acquired, these structures will be put up for bid for relocation outside the 100-year floodplain. Any unsold homes will be demolished and removed.
                    </div>
                </b-col>
            </b-row>
           <b-row class="mt-2">
                <b-col sm="4">
                    <div class="position-relative">
                        <img
                            
                            alt="Previous Page"
                            src="~@/assets/img/preview-default.png"
                            class="mr-3 img-style"
                        />
                        <div role="button" class="position-absolute font-weight-bold" style="top: 50%; left: 37%; color: #DD7B26">Click to preview</div>
                    </div>
                    <div>Attachment.pdf</div>
                </b-col>
            </b-row>
            <div v-if="user_role === 7 || role === 8">
                <b-row v-if="!is_accpeted" class="mt-5">
                    <b-col cols="6" sm="1">
                        <b-button
                            class="button-type"
                            @click="projectAccept"
                            >Accept</b-button
                        >
                    </b-col>
                    <b-col cols="6" sm="1">
                        <b-button
                            class="secondary-button-type"
                            >Decline</b-button
                        >
                    </b-col>
                </b-row>
                <b-row v-else class="mt-5">
                    <b-col>
                        <b-button
                            disabled="true"
                            class="disable-button-type"
                            @click="projectAccept"
                            >Project Submission Accepted</b-button
                        >
                    </b-col>
                </b-row>
                <div class="underline mt-3"></div>
                <b-row class="mt-4">
                    <b-col class="bottom-reply">
                        <b-button
                            class="btn-style d-flex align-items-center justify-content-around"
                            style="background-color: #0C2340"
                            ><img
                                class="mr-2"
                                alt="Reply image"
                                src="~@/assets/img/small-icons/reply.png"
                            /><span class="mr-3">Reply</span></b-button
                        >
                    </b-col>
                </b-row>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ClientProjectSubDetail',
    components: {
    },
    data() {
        return {
            is_accpeted: false,
            user_role : ''
        };
    },
    methods: {
        projectAccept(){
            this.is_accpeted = true;
        },
        gotoPreviousPage(){
            this.$router.go(-1);
        }
    },
    created() {
        this.user_role = localStorage.getItem('user_role');
    },
};
</script>

<style scoped>
.card-container {
    font-family: Montserrat;
    background-color: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    margin: 1vw 1vw;
    padding: 20px 20px 2vw 30px;
    font-weight: 600;
    font-size: 14px;
}

.projectrequest-client-detail {
    font-size: 0.85em;   
    font-weight: normal;
}

.grey-color {
    color: #C9C9C9;
}

.client-project-header {
    border-bottom: 1px solid #000000;
    margin: 0px 10px;
    padding-bottom: 10px;   
}

.client-project-detail-content {
    padding: 10px 30px;  
}

.button-type {
    background-color: #0c2340;
    color: white;
    font-weight: normal !important;
    padding: 5px 25px;
}

.secondary-button-type {
    background-color: #95B8E4;
    color: white;
    font-weight: normal !important;
    border-color: #95B8E4;
    padding: 5px 25px;
}

.bottom-reply {
    padding: 20px 20px;
    border: 1px solid #C9C9C9;
    border-radius: 10px;
}

.disable-button-type {
    background-color: #909090;
    color: white;
    font-weight: normal !important;
    border-color: #95B8E4;
    padding: 5px 25px;
}

.underline {
    border-bottom: 1px solid #C9C9C9;
}

.img-style {
    width: 100%;
}

</style>
