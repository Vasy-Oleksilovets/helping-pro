<template>
    <div :class="leftModal || rightModal ? 'fee-submission modal-effect font-weight-bold' : 'fee-submission font-weight-bold'">

        <!-- Top Custom Modal -->
        <div v-if="leftModal" class="drawer-top p-2">
            <b-row class="no-gutters align-items-center justify-content-end mb-2 pr-3">
                <span class="mr-3" @click="hideAllModal" role="button">Close</span>
                <b-icon icon="x-circle" scale="1.4" role="button" @click="hideAllModal"></b-icon>
            </b-row>
            <b-row class="no-gutters p-2 justify-content-between" style="background-color: #CDDFF0; overflow: auto ">
                <div class="d-flex" style="width: 98%">
                    <div class="bg-white p-2 pb-3 pt-3 mr-2 text-nowrap">Project Prinicipal</div>
                    <div class="bg-white p-2 pb-3 pt-3 text-width mr-2 text-right">0</div>
                    <div class="bg-white p-2 pb-3 pt-3 text-width mr-2 text-right">0</div>
                    <div class="bg-white p-2 pb-3 pt-3 text-width-100 mr-2 text-right">0</div>
                    <div class="bg-white p-2 pb-3 pt-3 text-width mr-2 text-right">0</div>
                    <div class="bg-white p-2 pb-3 pt-3 text-width-100 mr-2 text-right">0</div>
                    <div class="bg-white p-2 pb-3 pt-3 text-width mr-2 text-right">0</div>
                    <div class="bg-white p-2 pb-3 pt-3 text-width-100 mr-2 text-right">0</div>
                    <div class="bg-white p-2 pb-3 pt-3 text-width mr-2 text-right">0</div>
                    <div class="bg-white p-2 pb-3 pt-3 text-width-100 mr-2 text-right">0</div>
                    <div class="bg-white p-2 pb-3 pt-3 text-width mr-2 text-right">0</div>
                    <div class="bg-white p-2 pb-3 pt-3 text-width-100 mr-2 text-right">0</div>
                    <div class="bg-white p-2 pb-3 pt-3 text-width mr-2 text-right">0</div>
                    <div class="bg-white p-2 pb-3 pt-3 text-width-100 mr-2 text-right">0</div>
                    <div class="bg-white p-2 pb-3 pt-3 text-width mr-2 text-right">0</div>
                    <div class="bg-white p-2 pb-3 pt-3 text-width-100 mr-2 text-right">0</div>
                </div>
                <div class="d-flex justify-content-end text-right align-items-center"><b-icon role="button" icon="three-dots-vertical" variant="dark" font-scale="1.5"></b-icon></div>
            </b-row>
        </div>

        <b-row class="no-gutters">

            <!-- Left Custom Modal -->
            <b-col sm="9" cols="12" v-if="leftModal" class="drawer-left">
                <div class="bg-white w-100 position-relative">
                    <div style="position: sticky; top: -10px; background-color:white" class="custom-header p-2 border-bottom d-flex justify-content-between">
                        <div>Plumbing/Fire Protection</div>
                        <div><b-icon role="button" icon="three-dots-vertical" variant="dark" font-scale="1.5"></b-icon></div>
                    </div>
                    <div style="max-height: 40vh; overflow: auto">
                        <div v-for="x in [1,2,3,4,5]" :key="x" class="p-2 m-2 border-bottom comment-line-style position-relative">
                            <div class="d-flex font-weight-normal myDIV">
                                <div class="mr-2">
                                    <img
                                        style="max-size: 100px"
                                        alt="Vue logo"
                                        class="ml-2"
                                        src="~@/assets/img/avatars/estimator-new-comments-avatar.png"
                                    />
                                </div>
                                <div>
                                    <div class="font-weight-bold d-flex justify-content-between">
                                        <div>Bob Project Manager/Position/Title</div>
                                        <div style="color: #909090">January 6, 2020, 9:30 AM</div>
                                    </div>
                                    <div class="mt-2">Exercitation culpa laboris ad deserunt. Amet exercitation dolor exercitation proident commodo culpa dolor reprehenderit. Sunt cillum pariatur exercitation sit dolor qui excepteur.</div>
                                </div>
                            </div>
                            <div style="position: absolute; right: 20px; top: 10px" class="hide">
                                <span role="button" class="border p-2" style="background-color: white">
                                    <b-icon class="mr-2" icon="trash-fill" scale="1.4" role="button"></b-icon>
                                    <span style="color: red">Delete comment</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="mr-3 ml-4 pb-2 ">
                        <b-form-input class="border" v-model="reply_message" placeholder="Type a new comment"></b-form-input>
                        <div class="d-flex align-items-center justify-content-end mt-3">
                            <b-icon class="mr-2" icon="paperclip" scale="1.4" role="button"></b-icon>
                            <div class="mr-2">Add an attachment</div>
                            <b-btn style="background-color: #0C2340">SEND</b-btn>
                        </div>
                    </div>
                </div>
            </b-col>

            <!-- Right Custom Modal -->

            <b-col sm="3" cols="12" v-if="rightModal" :class="leftModal? 'drawer-right1  position-relative': 'drawer-right  position-relative'" :offset-sm="leftModal? '':'9'">
                <div style="height: 30vh; overflow: auto" >
                <b-row role="button" @click="() => {leftModal = true}" class="bg-white no-gutters p-3 font-weight-normal mb-2">
                    <b-col md="3" lg="2">
                        <img
                            alt="Avatar"
                            class="mr-2 drawer-avatar"
                            src="~@/assets/img/avatars/estimator-new-comments-avatar.png"
                        />
                    </b-col>
                    <b-col md="4" lg="5">
                        <div style="color: #C9C9C9">New Unread</div>
                        <div class="font-weight-bold mt-2 font" style="font-size: 12px">Joe Estimator/Position/Title</div>
                        <div>Architectural</div>
                    </b-col>
                    <b-col md="5" lg="5" class="d-flex justify-content-end">
                        <div>
                            <div class="d-flex justify-content-end"><b-icon role="button" icon="three-dots" variant="dark" font-scale="1.5"></b-icon></div>
                            <div style="color: #C9C9C9" class="pr-2">January 1, 2020, 9:30 AM</div>
                        </div>
                    </b-col>
                </b-row>
                </div>

                <b-row class="d-flex comments-drawer bg-white mr-3 no-gutters" style="position: absolute; bottom: 0">
                    <div role="button" class="p-2 comments-tab">All comments</div>
                    <div role="button" class="p-2 comments-tab">New comments</div>
                </b-row>

            </b-col>

        </b-row>

        <div v-if="!rightModal" class="d-flex p-3 pl-4 no-gutters submission-content">
            <b-col style="width: 10%" class="title">Project Delta</b-col>
            <b-col style="width: 10%" class="title">Project name</b-col>
            <b-col style="width: 20%" sm="2" class="title"
                >Start date: 01/01/2020</b-col
            >
            <b-col style="width: 70%" sm="3" offset-sm="3" class="title">
                <div style="float: right" @click="() => { rightModal = true}" role="button">
                    <span>View comments</span
                    ><img
                        alt="Vue logo"
                        width="20"
                        class="ml-2"
                        src="~@/assets/img/small-icons/view_comments.png"
                    />
                </div>
            </b-col>

        </div>

        <div
            v-if="!rightModal && Object.keys(project).length > 0"
            style="color: white; font-size: 0.8em"
            :class="leftModal || rightModal ? 'submission-content pl-2 modal-opacity' : 'submission-content pl-2' ">
            <!--Content Part -->
            <div class="headercontent d-flex">
                <div style="width: 40%">
                    <!-- Header Part -->
                    <div class="d-flex custom-margin-left">
                        <div
                            class="custom-background-color mr-1 custom-padding-header text-center"
                            style="width: 70%;"
                        >
                            Design Submission
                        </div>
                        <div
                            class="custom-background-color"
                            style="width: 30%"
                        ></div>
                    </div>
                    <div class="d-flex mt-1 custom-margin-left">
                        <div
                            class="custom-background-color mr-1 custom-padding-header3 text-center"
                            style="width: 70%"
                        >
                            DISIPLINE
                        </div>
                        <div
                            class="custom-background-color custom-padding-header3 text-center"
                            style="width: 30%"
                        >
                            $/hour
                        </div>
                    </div>
                    <!-- Content Part -->
                    <div
                        style="background-color: #CDDFF0"
                        class="custom-margin-content"
                    >
                        <div class="d-flex mt-1">
                            <div
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 ml-1 border-left: 2px solid black"
                                style="width: 70%; color: black"
                            >
                                Project Prinicipal
                            </div>
                            <input
                                type="number"
                                value="0"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 30%; color: black; text-align: end"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <div
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 ml-1 border-left: 2px solid black"
                                style="width: 70%; color: black"
                            >
                                Project Management
                            </div>
                            <input
                                type="number"
                                value="0"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 30%; color: black; text-align: end"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <div
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 ml-1 border-left: 2px solid black"
                                style="width: 70%; color: black"
                            >
                                General Archectural
                            </div>
                            <input
                                type="number"
                                value="0"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 30%; color: black; text-align: end"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <div
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 ml-1 border-left: 2px solid black"
                                style="width: 70%; color: black"
                            >
                                Structural
                            </div>
                            <input
                                type="number"
                                value="0"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 30%; color: black; text-align: end"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <div
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 ml-1 border-left: 2px solid black"
                                style="width: 70%; color: black"
                            >
                                Machanical
                            </div>
                            <input
                                type="number"
                                value="0"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 30%; color: black; text-align: end"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <div
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 ml-1 border-left: 2px solid black"
                                style="width: 70%; color: black"
                            >
                                Electrical
                            </div>
                            <input
                                type="number"
                                value="0"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 30%; color: black; text-align: end"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <div
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 ml-1 border-left: 2px solid black"
                                style="width: 70%; color: black"
                            >
                                Site/Civil
                            </div>
                            <input
                                type="number"
                                value="0"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 30%; color: black; text-align: end"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <div
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 ml-1 border-left: 2px solid black"
                                style="width: 70%; color: black"
                            >
                                QA/QC
                            </div>
                            <input
                                type="number"
                                value="0"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 30%; color: black; text-align: end"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <div
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 ml-1 border-left: 2px solid black"
                                style="width: 70%; color: black"
                            >
                                Techical Assistant
                            </div>
                            <input
                                type="number"
                                value="0"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 30%; color: black; text-align: end"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <div
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 ml-1 border-left: 2px solid black"
                                style="width: 70%; color: black; font-size: 0.8em"
                            >
                                Subject Matter Experts (SME)
                            </div>
                            <input
                                type="number"
                                value="0"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 30%; color: black; text-align: end"
                            />
                        </div>
                    </div>
                </div>

                <div style="width: 20%" v-if="project.phase.id==1">
                    <!-- Header Part -->
                    <div class="d-flex custom-margin-left">
                        <div
                            class="custom-background-color custom-padding-header text-center"
                            style="width: 100%;"
                        >
                            Conceptual Phase
                        </div>
                    </div>
                    <div class="d-flex mt-1 custom-margin-left">
                        <div
                            class="custom-background-color mr-1 custom-padding-header3 text-center"
                            style="width: 40%"
                        >
                            LOE hrs
                        </div>
                        <div
                            class="custom-background-color custom-padding-header3 text-center"
                            style="width: 60%"
                        >
                            LOE $
                        </div>
                    </div>
                    <!-- Content Part -->
                    <div
                        style="background-color: #CDDFF0"
                        class="custom-margin-content"
                    >
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                                value="0"
                            />
                            <input
                                type="number"
                                value="0"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                                value="0"
                            />
                            <input
                                type="number"
                                value="0"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                                value="0"
                            />
                            <input
                                type="number"
                                value="0"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                                value="0"
                            />
                            <input
                                type="number"
                                value="0"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                                value="0"
                            />
                            <input
                                type="number"
                                value="0"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                                value="0"
                            />
                            <input
                                type="number"
                                value="0"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                                value="0"
                            />
                            <input
                                type="number"
                                value="0"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                                value="0"
                            />
                            <input
                                type="number"
                                value="0"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                                value="0"
                            />
                            <input
                                type="number"
                                value="0"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                                value="0"
                            />
                            <input
                                type="number"
                                value="0"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                            />
                        </div>
                    </div>
                </div>

                <div style="width: 20%" v-if="project.phase.id==2">
                    <!-- Header Part -->
                    <div class="d-flex custom-margin-left">
                        <div
                            class="custom-background-color custom-padding-header text-center"
                            style="width: 100%;"
                        >
                            Schematic Design
                        </div>
                    </div>
                    <div class="d-flex mt-1 custom-margin-left">
                        <div
                            class="custom-background-color mr-1 custom-padding-header3 text-center"
                            style="width: 40%"
                        >
                            LOE hrs
                        </div>
                        <div
                            class="custom-background-color custom-padding-header3 text-center"
                            style="width: 60%"
                        >
                            LOE $
                        </div>
                    </div>
                    <!-- Content Part -->
                    <div
                        style="background-color: #CDDFF0"
                        class="custom-margin-content"
                    >
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                                value="0"
                            />
                            <input
                                type="number"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                                value="0"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                                value="0"
                            />
                            <input
                                type="number"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                                value="0"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                                value="0"
                            />
                            <input
                                type="number"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                                value="0"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                                value="0"
                            />
                            <input
                                type="number"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                                value="0"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                                value="0"
                            />
                            <input
                                type="number"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                                value="0"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                                value="0"
                            />
                            <input
                                type="number"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                                value="0"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                                value="0"
                            />
                            <input
                                type="number"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                                value="0"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                                value="0"
                            />
                            <input
                                type="number"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                                value="0"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                                value="0"
                            />
                            <input
                                type="number"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                                value="0"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                                value="0"
                            />
                            <input
                                type="number"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                                value="0"
                            />
                        </div>
                    </div>
                </div>

                <div style="width: 20%" v-if="project.phase.id==3">
                    <!-- Header Part -->
                    <div class="d-flex custom-margin-left">
                        <div
                            class="custom-background-color text-center"
                            style="width: 100%; padding: 15px 0px 15px 0px;"
                        >
                            Design Development
                        </div>
                    </div>
                    <div class="d-flex mt-1 custom-margin-left">
                        <div
                            class="custom-background-color mr-1 custom-padding-header3 text-center"
                            style="width: 40%"
                        >
                            LOE hrs
                        </div>
                        <div
                            class="custom-background-color custom-padding-header3 text-center"
                            style="width: 60%"
                        >
                            LOE $
                        </div>
                    </div>
                    <!-- Content Part -->
                    <div
                        style="background-color: #CDDFF0"
                        class="custom-margin-content"
                    >
                        <div class="d-flex mt-1">
                            <input
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                                type="number"
                                value="0"
                            />
                            <input
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                                type="number"
                                value="0"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                                type="number"
                                value="0"
                            />
                            <input
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                                type="number"
                                value="0"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                                type="number"
                                value="0"
                            />
                            <input
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                                type="number"
                                value="0"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                                type="number"
                                value="0"
                            />
                            <input
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                                type="number"
                                value="0"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                                type="number"
                                value="0"
                            />
                            <input
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                                type="number"
                                value="0"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                                type="number"
                                value="0"
                            />
                            <input
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                                type="number"
                                value="0"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                                type="number"
                                value="0"
                            />
                            <input
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                                type="number"
                                value="0"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                                type="number"
                                value="0"
                            />
                            <input
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                                type="number"
                                value="0"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                                type="number"
                                value="0"
                            />
                            <input
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                                type="number"
                                value="0"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                                type="number"
                                value="0"
                            />
                            <input
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                                type="number"
                                value="0"
                            />
                        </div>
                    </div>
                </div>

                <div style="width: 20%" v-if="project.phase.id==4">
                    <!-- Header Part -->
                    <div class="d-flex custom-margin-left">
                        <div
                            class="custom-background-color custom-padding-header text-center"
                            style="width: 100%;"
                        >
                            Construction Docs.
                        </div>
                    </div>
                    <div class="d-flex mt-1 custom-margin-left">
                        <div
                            class="custom-background-color mr-1 custom-padding-header3 text-center"
                            style="width: 40%"
                        >
                            LOE hrs
                        </div>
                        <div
                            class="custom-background-color custom-padding-header3 text-center"
                            style="width: 60%"
                        >
                            LOE $
                        </div>
                    </div>
                    <!-- Content Part -->
                    <div
                        style="background-color: #CDDFF0"
                        class="custom-margin-content"
                    >
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                value="0"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                            />
                            <input
                                type="number"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                                value="0"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                value="0"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                            />
                            <input
                                type="number"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                                value="0"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                value="0"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                            />
                            <input
                                type="number"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                                value="0"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                value="0"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                            />
                            <input
                                type="number"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                                value="0"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                value="0"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                            />
                            <input
                                type="number"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                                value="0"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                value="0"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                            />
                            <input
                                type="number"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                                value="0"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                value="0"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                            />
                            <input
                                type="number"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                                value="0"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                value="0"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                            />
                            <input
                                type="number"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                                value="0"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                value="0"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                            />
                            <input
                                type="number"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                                value="0"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                value="0"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                            />
                            <input
                                type="number"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                                value="0"
                            />
                        </div>
                    </div>
                </div>

                <div style="width: 20%" v-if="project.phase.id==5">
                    <!-- Header Part -->
                    <div class="d-flex custom-margin-left">
                        <div
                            class="custom-background-color custom-padding-header text-center"
                            style="width: 100%;"
                        >
                            Bid/Proposal Phase
                        </div>
                    </div>
                    <div class="d-flex mt-1 custom-margin-left">
                        <div
                            class="custom-background-color mr-1 custom-padding-header3 text-center"
                            style="width: 40%"
                        >
                            LOE hrs
                        </div>
                        <div
                            class="custom-background-color custom-padding-header3 text-center"
                            style="width: 60%"
                        >
                            LOE $
                        </div>
                    </div>
                    <!-- Content Part -->
                    <div
                        style="background-color: #CDDFF0"
                        class="custom-margin-content"
                    >
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                value="0"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                            />
                            <input
                                type="number"
                                value="0"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                value="0"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                            />
                            <input
                                type="number"
                                value="0"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                value="0"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                            />
                            <input
                                type="number"
                                value="0"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                value="0"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                            />
                            <input
                                type="number"
                                value="0"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                value="0"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                            />
                            <input
                                type="number"
                                value="0"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                value="0"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                            />
                            <input
                                type="number"
                                value="0"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                value="0"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                            />
                            <input
                                type="number"
                                value="0"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                value="0"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                            />
                            <input
                                type="number"
                                value="0"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                value="0"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                            />
                            <input
                                type="number"
                                value="0"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                value="0"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                            />
                            <input
                                type="number"
                                value="0"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                            />
                        </div>
                    </div>
                </div>

                <div style="width: 20%">
                    <!-- Header Part -->
                    <div class="d-flex custom-margin-left">
                        <div
                            class="custom-background-color custom-padding-header text-center"
                            style="width: 100%;"
                        >
                            Other Services
                        </div>
                    </div>
                    <div class="d-flex mt-1 custom-margin-left">
                        <div
                            class="custom-background-color mr-1 custom-padding-header3 text-center"
                            style="width: 40%"
                        >
                            LOE hrs
                        </div>
                        <div
                            class="custom-background-color custom-padding-header3 text-center"
                            style="width: 60%"
                        >
                            LOE $
                        </div>
                    </div>
                    <!-- Content Part -->
                    <div
                        style="background-color: #CDDFF0"
                        class="custom-margin-content"
                    >
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                value="0"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                            />
                            <input
                                type="number"
                                value="0"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                value="0"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                            />
                            <input
                                type="number"
                                value="0"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                value="0"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                            />
                            <input
                                type="number"
                                value="0"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                value="0"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                            />
                            <input
                                type="number"
                                value="0"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                value="0"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                            />
                            <input
                                type="number"
                                value="0"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                value="0"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                            />
                            <input
                                type="number"
                                value="0"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                value="0"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                            />
                            <input
                                type="number"
                                value="0"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                value="0"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                            />
                            <input
                                type="number"
                                value="0"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                value="0"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                            />
                            <input
                                type="number"
                                value="0"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                            />
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                value="0"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                            />
                            <input
                                type="number"
                                value="0"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 60%; color: black; text-align: end"
                            />
                        </div>
                    </div>
                </div>

                <div style="width: 20%">
                    <!-- Header Part -->
                    <div class="d-flex custom-margin-left">
                        <div
                            class="custom-background-color custom-padding-header text-center"
                            style="width: 81%;"
                        >
                            Total Fee
                        </div>
                    </div>
                    <div class="d-flex mt-1 custom-margin-left">
                        <div
                            class="custom-background-color mr-1 custom-padding-header3 text-center"
                            style="width: 40%"
                        >
                            LOE hrs
                        </div>
                        <div
                            class="custom-background-color custom-padding-header3 text-center"
                            style="width: 40%"
                        >
                            LOE $
                        </div>
                    </div>
                    <!-- Content Part -->
                    <div style="background-color: #CDDFF0">
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                value="0"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                            />
                            <input
                                type="number"
                                value="0"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 40%; color: black; text-align: end"
                            />
                            <div
                                style="width: 20%; justify-content: center"
                                class="d-flex align-items-center"
                            >
                                <div>
                                    <img
                                        alt="Vue logo"
                                        width="15"
                                        src="~@/assets/img/small-icons/submission_fee_icon.png"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                value="0"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                            />
                            <input
                                type="number"
                                value="0"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 40%; color: black; text-align: end"
                            />
                            <div
                                style="width: 20%; justify-content: center"
                                class="d-flex align-items-center"
                            >
                                <div>
                                    <img
                                        alt="Vue logo"
                                        width="15"
                                        src="~@/assets/img/small-icons/submission_fee_icon.png"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                value="0"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                            />
                            <input
                                type="number"
                                value="0"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 40%; color: black; text-align: end"
                            />
                            <div
                                style="width: 20%; justify-content: center"
                                class="d-flex align-items-center"
                            >
                                <div>
                                    <img
                                        alt="Vue logo"
                                        width="15"
                                        src="~@/assets/img/small-icons/submission_fee_icon.png"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                value="0"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                            />
                            <input
                                type="number"
                                value="0"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 40%; color: black; text-align: end"
                            />
                            <div
                                style="width: 20%; justify-content: center"
                                class="d-flex align-items-center"
                            >
                                <div>
                                    <img
                                        alt="Vue logo"
                                        width="15"
                                        src="~@/assets/img/small-icons/submission_fee_icon.png"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                value="0"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                            />
                            <input
                                type="number"
                                value="0"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 40%; color: black; text-align: end"
                            />
                            <div
                                style="width: 20%; justify-content: center"
                                class="d-flex align-items-center"
                            >
                                <div>
                                    <img
                                        alt="Vue logo"
                                        width="15"
                                        src="~@/assets/img/small-icons/submission_fee_icon.png"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                value="0"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                            />
                            <input
                                type="number"
                                value="0"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 40%; color: black; text-align: end"
                            />
                            <div
                                style="width: 20%; justify-content: center"
                                class="d-flex align-items-center"
                            >
                                <div>
                                    <img
                                        alt="Vue logo"
                                        width="15"
                                        src="~@/assets/img/small-icons/submission_fee_icon.png"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                value="0"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                            />
                            <input
                                type="number"
                                value="0"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 40%; color: black; text-align: end"
                            />
                            <div
                                style="width: 20%; justify-content: center"
                                class="d-flex align-items-center"
                            >
                                <div>
                                    <img
                                        alt="Vue logo"
                                        width="15"
                                        src="~@/assets/img/small-icons/submission_fee_icon.png"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                value="0"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                            />
                            <input
                                type="number"
                                value="0"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 40%; color: black; text-align: end"
                            />
                            <div
                                style="width: 20%; justify-content: center"
                                class="d-flex align-items-center"
                            >
                                <div>
                                    <img
                                        alt="Vue logo"
                                        width="15"
                                        src="~@/assets/img/small-icons/submission_fee_icon.png"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                value="0"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                            />
                            <input
                                type="number"
                                value="0"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 40%; color: black; text-align: end"
                            />
                            <div
                                style="width: 20%; justify-content: center"
                                class="d-flex align-items-center"
                            >
                                <div>
                                    <img
                                        alt="Vue logo"
                                        width="15"
                                        src="~@/assets/img/small-icons/submission_fee_icon.png"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="d-flex mt-1">
                            <input
                                type="number"
                                value="0"
                                class="cell-background mt-1 mb-1 custom-padding-header2 mr-1 border-left: 2px solid black"
                                style="width: 40%; color: black; text-align: end"
                            />
                            <input
                                type="number"
                                value="0"
                                class="cell-background custom-padding-header2 mt-1 mb-1"
                                style="width: 40%; color: black; text-align: end"
                            />
                            <div
                                style="width: 20%; justify-content: center"
                                class="d-flex align-items-center"
                            >
                                <div>
                                    <img
                                        alt="Vue logo"
                                        width="15"
                                        src="~@/assets/img/small-icons/submission_fee_icon.png"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer Part -->

            <div class="headercontent d-flex">
                <div style="width: 40%">
                    <div class="d-flex mt-1 custom-margin-left">
                        <div
                            class="custom-background-color custom-padding-header2 d-flex justify-content-between"
                            style="width: 100%"
                        >
                            <div>Totals</div>
                            <div>76</div>
                        </div>
                    </div>
                </div>

                <div style="width: 20%">
                    <div class="d-flex mt-1 custom-margin-left">
                        <div
                            class="custom-background-color mr-1 custom-padding-header2 text-right"
                            style="width: 40%"
                        >
                            92
                        </div>
                        <div
                            class="custom-background-color custom-padding-header2 text-right"
                            style="width: 60%"
                        >
                            12,540
                        </div>
                    </div>
                </div>

                <div style="width: 20%">
                    <div class="d-flex mt-1 custom-margin-left">
                        <div
                            class="custom-background-color mr-1 custom-padding-header2"
                            style="width: 40%"
                        >
                            280
                        </div>
                        <div
                            class="custom-background-color custom-padding-header2 text-center"
                            style="width: 60%"
                        >
                            280
                        </div>
                    </div>
                </div>

                <div style="width: 20%">
                    <div class="d-flex mt-1 custom-margin-left">
                        <div
                            class="custom-background-color mr-1 custom-padding-header2"
                            style="width: 40%"
                        >
                            20
                        </div>
                        <div
                            class="custom-background-color custom-padding-header2 text-center"
                            style="width: 40%"
                        >
                            $46,200
                        </div>
                    </div>
                </div>
            </div>

            <!-- End Footer Part -->

            <b-row v-if="role === 7 || role === 8" class="pr-5 pt-3 no-gutters button-row align-items-center float-right">
                <span class="d-flex algin-items-center font-weight-bold" style="color: black; font-weight: 500">Submit to Delta</span>
                <b-button type="submit" class="button-color-style ml-2" v-b-modal.modal-submit-modal>Submit Fee</b-button>
            </b-row>
            <b-row v-if="role === 6 || role === 8" class="pr-5 pt-3 no-gutters button-row align-items-center float-right">
                <b-button
                    type="submit"
                    class="button-color-style ml-2"
                    v-b-modal.modal-submit-modal
                    >Approve Fee</b-button
                >
                <b-button
                    type="submit"
                    class="button-color-style ml-2"
                    v-b-modal.modal-counter-modal
                    >Counter</b-button
                >
                <b-button
                    type="submit"
                    class="button-color-style ml-2"
                    v-b-modal.modal-decline-modal
                    >Decline</b-button
                >
            </b-row>

            <b-modal id="modal-decline-modal" centered>
                <template v-slot:modal-header="{}">
                    <span @click="close()"></span>
                </template>
                <div class="text-center project-detail">
                    <div class="mb-3">
                        Are you sure you want to decline the fee<br />
                        submission? <br />
                    </div>
                </div>
                <template v-slot:modal-footer="{ ok }">
                    <div
                        class="text-center mb-4"
                        style="margin-left: auto; margin-right: auto;"
                    >
                        <b-btn
                            class="dialog-btn-style mr-5 second-btn-style"
                            @click="ok(), decline()"
                            >Yes</b-btn
                        >
                        <b-btn class="dialog-btn-style first-btn-style"
                            @click="ok()"
                            >No</b-btn
                        >
                    </div>
                </template>
            </b-modal>

            <b-modal id="modal-counter-modal" centered>
                <template v-slot:modal-header="{}">
                    <span @click="close()"></span>
                </template>
                <div class="text-center project-detail">
                    <div class="mb-3">
                        Enter your approved budget.
                    </div>
                    <div>
                        <b-form-input @change="budgetChange" v-model="budget" type="text"></b-form-input>
                    </div>
                </div>
                <template v-slot:modal-footer="{ ok }">
                    <div
                        class="text-center mb-4"
                        style="margin-left: auto; margin-right: auto;"
                    >
                        <b-btn
                            class="dialog-btn-style mr-5 second-btn-style"
                            @click="ok(), counter()"
                            >Yes</b-btn
                        >
                        <b-btn class="dialog-btn-style first-btn-style"
                            @click="ok()"
                            >No</b-btn
                        >
                    </div>
                </template>
            </b-modal>

            <b-modal id="modal-submit-modal" centered>
                <template v-slot:modal-header="{}">
                    <span @click="close()"></span>
                </template>
                <div class="text-center project-detail">
                    <div class="mb-3">
                        Are you sure you want to submit the fee<br />
                        submission? <br />
                    </div>
                    <div>
                        Once the fee submission is submitted, <br />
                        you cannot edit document.
                    </div>
                </div>
                <template v-slot:modal-footer="{ ok }">
                    <div
                        class="text-center mb-4"
                        style="margin-left: auto; margin-right: auto;"
                    >
                        <b-btn
                            class="dialog-btn-style mr-5 second-btn-style"
                            @click="ok(), approveFee()"
                            >Yes</b-btn
                        >
                        <b-btn class="dialog-btn-style first-btn-style"
                            @click="ok()"
                            >No</b-btn
                        >
                    </div>
                </template>
            </b-modal>
        </div>
    </div>
</template>
<script>
import Drawer from 'vue-simple-drawer';
import ProjectProxy from '@/proxies/ProjectProxy.js';
import { BIcon, BIconThreeDotsVertical, BIconXCircle, BIconPaperclip, BIconTrashFill, BIconThreeDots } from 'bootstrap-vue'
export default {
    name: 'Project',
    components: {
        Drawer,
        BIcon,
        BIconThreeDotsVertical,
        BIconXCircle,
        BIconPaperclip,
        BIconTrashFill,
        BIconThreeDots
    },
    props: ['role', 'project_id'],
    data() {
        return {
            open: false,
            leftModal: false,
            rightModal: false,
            budget: '',
            project: {},
            project_id: '',
        };
    },
    methods: {
        toggle() {
            this.open = !this.open;
        },
        hideAllModal(){
            this.leftModal = false;
            this.rightModal = false;
        },
        budgetChange(){
            const result = this.budget
                .replace(/\D/g, '')
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            // Vue.nextTick(() => this.price = result);'
            this.budget = `$${result}`;
            if(this.budget == "$") this.budget = "$0"
        },
        getProject(){
            new ProjectProxy().find(this.project_id).then((response) => {

                this.project = response.project;

            })
            .catch(error => {
            });
        },
        approveFee() {
             var params = new URLSearchParams();
             params.append('projectId', this.project_id);
             params.append('nextStatus', 'approved');
             new ProjectProxy().feeEstimateAction(params).then((response) => {
                 this.project = response.project;
             })
             .catch(error => {
             });
        },
        decline(){
             var params = new URLSearchParams();
             params.append('projectId', this.project_id);
             params.append('nextStatus', 'denied');
             new ProjectProxy().feeEstimateAction(params).then((response) => {
                 this.project = response.project;
             })
             .catch(error => {
             });
        },
        counter(){
            var b = this.budget.replace("$","").replace(",","");
            if(b == ""){
                b = 0;
            }
             var params = new URLSearchParams();
             params.append('projectId', this.project_id);
             params.append('nextStatus', 'countered');
             params.append('budget', b);
             new ProjectProxy().feeEstimateAction(params).then((response) => {
                 this.project = response.project;
             })
             .catch(error => {
             });
        }
    },

    created() {
        this.project_id = this.$route.params.project_id;
        this.getProject();
    },
};
</script>

<style scoped>

@media (max-width: 700px) {
    .drawer-right1 {
        padding: 10px 30px 10px 10px;
        z-index: 100;
        width: 30%;
        background-color: #EEEEEE;
        font-size: 10px;
        height: 100% !important;
    }
    .drawer-avatar {
        width: 10% !important;
    }
}
.submission-content {
    min-width: 1200px;
    overflow-x: auto;
}
.title {
    font-size: 1.1em;
}
.fee-submission {
    overflow: auto;
    font-weight: normal;
    height: 90vh;
}
.modal-effect {
    background-color: rgba(0,0,0, 0.3);
}
.custom-background-color {
    background-color: #061831;
}
.custom-padding-header {
    padding: 15px 10px 15px 10px;
}
.custom-padding-header2 {
    padding: 10px 10px 10px 10px;
}
.custom-padding-header3 {
    padding: 10px 0px 10px 0px;
}
.cell-background {
    background-color: white;
}
.submission-footer {
    background-color: #061831;
    padding: 10px 10px 10px 10px;
    width: 97.8%;
}
.custom-margin-left {
    margin-right: 2px;
}
.custom-margin-content {
    border-right: 2px solid #061831;
}
.button-color-style {
    background-color: #061831;
    font-weight: normal;
}
.dialog-btn-style {
    padding: 7px 40px 7px 40px;
    max-width: 100px;
    border-radius: 8px;
    border-width: 0;
}
.second-btn-style {
    background-color: #83afdb;
}
.first-btn-style {
    background-color: #19293e;
}
.headercontent input {
    border: 0px !important;
}

.fee-submission {
    position: relative;
}

.drawer-right {
    padding: 10px 30px 10px 10px;
    z-index: 100;
    width: 30%;
    background-color: #EEEEEE;
    height: 100%;
    font-size: 10px;
    height: 90vh;
}
.drawer-right1 {
    padding: 10px 30px 10px 10px;
    z-index: 100;
    width: 30%;
    background-color: #EEEEEE;
    font-size: 10px;
    height: 80vh;
}

.drawer-left {
    padding: 10px 30px 10px 10px;
    z-index: 100;
    width: 70%;
    background-color: #EEEEEE;
    height: 50%;
    overflow: auto;
}

.drawer-top {
    width: 100%;
    background-color: #EEEEEE;
    z-index: 1000;
}

.text-width {
    width: 8%;
}

.text-width-100 {
    width: 16%;
}

.comments-drawer {
    min-width: 90%;
}

.modal-opacity {
    opacity: 0.4;
}

.hide {

    opacity: 0;
}
.hide:hover {
    opacity: 1;
}

.comment-line-style:hover + .hide {
    background-color: rgba(0,0,0, 0.1);
    display: block;
}


.myDIV:hover + .hide {

    opacity: 1;
    transition: all 1s;
}

.comments-tab:hover {
    background-color: rgba(0,0,0,0.1)
}

.drawer-avatar {
    width: 95%;
}


</style>
