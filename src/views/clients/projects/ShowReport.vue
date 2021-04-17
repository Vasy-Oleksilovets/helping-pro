<template>
    <div class="client">
        <Navigation />
        <main class="bg-img content">
            <h4>Projects</h4>
            <hr style="background-color:#ed6d3a; height:4px" />
            <b-breadcrumb :items="items"></b-breadcrumb>
            <section class="secWhite secValidate">
                <div class="container summary">
                    <div class="col-12 pt-4">
                        <!--<template v-if="viewMode == 'view'">
          <div class="row pb-4">
            <div class="col text-left">
              <button
                class="btn btn-warning"
                @click="editProject()">
                Edit
              </button>
            </div>
            <div class="col-8">
            </div>
            <div class="col text-right">
              <button
                class="btn btn-success pull-right"
                @click="exportProject()"
                >
                Export As XLSX
              </button>
            </div>
          </div>
        </template>-->
                        <template v-if="viewMode == 'edit'">
                            <div class="row pb-4">
                                <div class="col-2">
                                    <button
                                        class="btn btn-primary"
                                        @click="viewProject()"
                                    >
                                        View
                                    </button>
                                </div>
                                <div class="col-7"></div>
                                <div class="col-2">
                                    <button
                                        class="btn btn-info pull-right"
                                        @click="openAddProjectLineModal()"
                                    >
                                        Add Line
                                    </button>
                                </div>
                                <div class="col-1">
                                    <button
                                        class="btn btn-success pull-right"
                                        @click="saveProject()"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </template>
                        <b-tabs content-class="mt-3">
                            <b-tab
                                id="projectTab"
                                title="Project Details"
                                active
                            >
                                <div
                                    class="row collapse"
                                    v-bind:class="{
                                        show: isViewingProjectDetail,
                                    }"
                                >
                                    <div class="col-5">
                                        <div class="row">
                                            <div class="col-6">
                                                <h6>Project:</h6>
                                            </div>
                                            <div class="col-6">
                                                <span>{{ project.title }}</span>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6">
                                                <h6>Estimate Date:</h6>
                                            </div>
                                            <div class="col-6">
                                                <span>{{
                                                    project.estimateDate
                                                }}</span>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6">
                                                <h6>Client:</h6>
                                            </div>
                                            <div class="col-6">
                                                <span>{{
                                                    project.client
                                                }}</span>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6">
                                                <h6>Estimator:</h6>
                                            </div>
                                            <div class="col-6">
                                                <span>{{
                                                    project.estimator
                                                }}</span>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6">
                                                <h6>Checked By:</h6>
                                            </div>
                                            <div class="col-6">
                                                <span>{{
                                                    project.checkedBy
                                                }}</span>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6">
                                                <h6>Charge #:</h6>
                                            </div>
                                            <div class="col-6"></div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6">
                                                <h6>Doc Scope Date:</h6>
                                            </div>
                                            <div class="col-6">
                                                <h6>
                                                    {{ project.docScopeDate }}
                                                </h6>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6">
                                                <h6>Total Square Footage:</h6>
                                            </div>
                                            <div class="col-6">
                                                <h6>{{ totalSquareFoot }}</h6>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6">
                                                <h6>Start Date:</h6>
                                            </div>
                                            <div class="col-6">
                                                <h6>{{ project.dateStart }}</h6>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6">
                                                <h6>End Date:</h6>
                                            </div>
                                            <div class="col-6">
                                                <h6>{{ project.dateEnd }}</h6>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6">
                                                <h6>Total Months:</h6>
                                            </div>
                                            <div class="col-6">
                                                <h6>{{ project.months }}</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="offset-1 col-6">
                                        <div class="row">
                                            <div class="col-6">
                                                <h6>Narrative</h6>
                                            </div>
                                            <div class="col-6">
                                                <h6
                                                    v-html="project.narrative"
                                                ></h6>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6">
                                                <h6>Type of Estimate</h6>
                                            </div>
                                            <div class="col-6">
                                                <h6>
                                                    {{
                                                        project.projectStatus
                                                            .name
                                                    }}
                                                </h6>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6">
                                                <h6>Current Level of Detail</h6>
                                            </div>
                                            <div class="col-6">
                                                <h6>
                                                    {{
                                                        project.projectStatus
                                                            .levelOfInfo
                                                    }}
                                                </h6>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6">
                                                <h6>Project Budget</h6>
                                            </div>
                                            <div class="col-6">
                                                <h6>{{ projectBudget }}</h6>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6">
                                                <h6>Budget Price Per SQFT</h6>
                                            </div>
                                            <div class="col-6">
                                                <h6>{{ pricePerSQFT1 }}</h6>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6">
                                                <h6>Expected Accuracy Range</h6>
                                            </div>
                                            <div class="col-6">
                                                <div class="row">
                                                    <div class="col-12">
                                                        <h6>
                                                            L:
                                                            {{
                                                                expectedAccuracyRangeL
                                                            }}
                                                            <template
                                                                v-if="
                                                                    this.project
                                                                        .projectStatus
                                                                        .expectedAccuracyLow1 >=
                                                                        0
                                                                "
                                                            >
                                                                /+<span
                                                                    >({{
                                                                        this
                                                                            .project
                                                                            .projectStatus
                                                                            .expectedAccuracyLow1 *
                                                                            100
                                                                    }}%)</span
                                                                >
                                                            </template>
                                                            <template
                                                                v-if="
                                                                    this.project
                                                                        .projectStatus
                                                                        .expectedAccuracyLow1 <
                                                                        0
                                                                "
                                                            >
                                                                /-<span
                                                                    class="text-danger"
                                                                    >({{
                                                                        this
                                                                            .project
                                                                            .projectStatus
                                                                            .expectedAccuracyLow1 *
                                                                            100
                                                                    }}%)</span
                                                                >
                                                            </template>
                                                        </h6>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-12">
                                                        <h6>
                                                            H:
                                                            {{
                                                                expectedAccuracyRangeH
                                                            }}
                                                            <template
                                                                v-if="
                                                                    this.project
                                                                        .projectStatus
                                                                        .expectedAccuracyHigh2 >=
                                                                        0
                                                                "
                                                            >
                                                                /+<span
                                                                    >({{
                                                                        this
                                                                            .project
                                                                            .projectStatus
                                                                            .expectedAccuracyHigh2 *
                                                                            100
                                                                    }}%)</span
                                                                >
                                                            </template>
                                                            <template
                                                                v-if="
                                                                    this.project
                                                                        .projectStatus
                                                                        .expectedAccuracyHigh2 <
                                                                        0
                                                                "
                                                            >
                                                                /-<span
                                                                    class="text-danger"
                                                                    >({{
                                                                        this
                                                                            .project
                                                                            .projectStatus
                                                                            .expectedAccuracyHigh2 *
                                                                            100
                                                                    }}%)</span
                                                                >
                                                            </template>
                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="rol">
                                            <div class="col-12">
                                                <h6></h6>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6">
                                                <h6>Construction Check:</h6>
                                            </div>
                                            <div class="col-6">
                                                <h6>{{ totalCost }}</h6>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6">
                                                <h6>CC Price Per SQFT:</h6>
                                            </div>
                                            <div class="col-6">
                                                <h6>{{ checkPricePerSQFT }}</h6>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6">
                                                <h6>Delta</h6>
                                            </div>
                                            <div class="col-6">
                                                <h6>
                                                    <template
                                                        v-if="
                                                            constructionDeltaValue >=
                                                                0
                                                        "
                                                    >
                                                        {{ constructionDelta }}
                                                        / +
                                                        {{
                                                            constructionDeltaPercent
                                                        }}%
                                                    </template>
                                                    <template
                                                        v-if="
                                                            constructionDeltaValue <
                                                                0
                                                        "
                                                    >
                                                        <span
                                                            class="text-danger"
                                                            >({{
                                                                constructionDelta
                                                            }})</span
                                                        >
                                                        /
                                                        <span
                                                            class="text-danger"
                                                            >({{
                                                                constructionDeltaPercent
                                                            }}%)</span
                                                        >
                                                    </template>
                                                </h6>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6">
                                                <h6>Delta Price Per SQFT</h6>
                                            </div>
                                            <div class="col-6">
                                                <h6>
                                                    <template
                                                        v-if="
                                                            pricePerSQFT2Value >=
                                                                0
                                                        "
                                                    >
                                                        {{ pricePerSQFT2 }}
                                                    </template>
                                                    <template
                                                        v-if="
                                                            pricePerSQFT2Value <
                                                                0
                                                        "
                                                    >
                                                        <span
                                                            class="text-danger"
                                                            >({{
                                                                pricePerSQFT2
                                                            }})</span
                                                        >
                                                    </template>
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </b-tab>
                            <b-tab id="docsTab" title="Documents">
                                <div
                                    id="documentSection"
                                    class="container text-left"
                                >
                                    <UploadProjectFiles
                                        v-bind:showDelete="showDelete"
                                        ref="uploadProjectFiles"
                                    />
                                </div>
                            </b-tab>
                        </b-tabs>
                        <template v-if="!isViewingProjectDetail">
                            <div class="row">
                                <div class="col-1"></div>
                                <div class="col-2">
                                    <h6>Construction Check:</h6>
                                </div>
                                <div class="col-2">
                                    <h6>{{ totalCost }}</h6>
                                </div>
                                <div class="col-2"></div>
                                <div class="col-2">
                                    <h6>CC Price Per SQFT:</h6>
                                </div>
                                <div class="col-2">
                                    <h6>{{ checkPricePerSQFT }}</h6>
                                </div>
                                <div class="col-1"></div>
                            </div>
                            <div class="row">
                                <div class="col-1"></div>
                                <div class="col-2">
                                    <h6>Delta</h6>
                                </div>
                                <div class="col-2">
                                    <h6>
                                        <template
                                            v-if="constructionDeltaValue >= 0"
                                        >
                                            {{ constructionDelta }} / +
                                            {{ constructionDeltaPercent }}%
                                        </template>
                                        <template
                                            v-if="constructionDeltaValue < 0"
                                        >
                                            <span class="text-danger"
                                                >({{ constructionDelta }})</span
                                            >
                                            /
                                            <span class="text-danger"
                                                >({{
                                                    constructionDeltaPercent
                                                }}%)</span
                                            >
                                        </template>
                                    </h6>
                                </div>
                                <div class="col-2"></div>
                                <div class="col-2">
                                    <h6>Delta Price Per SQFT</h6>
                                </div>
                                <div class="col-2">
                                    <h6>
                                        <template
                                            v-if="pricePerSQFT2Value >= 0"
                                        >
                                            {{ pricePerSQFT2 }}
                                        </template>
                                        <template v-if="pricePerSQFT2Value < 0">
                                            <span class="text-danger"
                                                >({{ pricePerSQFT2 }})</span
                                            >
                                        </template>
                                    </h6>
                                </div>
                                <div class="col-1"></div>
                            </div>
                            <!--<div class="row">
            <div class="col-2"></div>
            <div class="col-8 text-center">
              <i
                class="fa fa fa-arrow-circle-down text-primary font-size-double detail-button"
                @click="showHideProjectDetail()"
                >
              </i>
            </div>
            <div class="col-2"></div>
          </div> -->
                        </template>
                        <!--<div class="row" v-if="isViewingProjectDetail">
          <div class="col-2"></div>
          <div class="col-8 text-center">
            <i
              class="fa fa fa-arrow-circle-up text-primary font-size-double detail-button"
              @click="showHideProjectDetail()"
              >
            </i>
          </div>
          <div class="col-2"></div>
        </div>-->
                        <div class="row pb-2"></div>
                    </div>
                </div>

                <div
                    v-bind:class="{
                        'margin-top-long-summary': isViewingProjectDetail,
                        'margin-top-short-summary': !isViewingProjectDetail,
                    }"
                ></div>

                <v-card card-style="row">
                    <div slot="footer"></div>
                </v-card>

                <div style="margin-top: 250px;"></div>
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
import Vue from 'vue';
import Navigation from '@/components/Navigation.vue';
import VLayout from '@/layouts/Default.vue';
import VCard from '@/components/Card.vue';
import store from '@/store';
import VCell from '@/components/Cell.vue';
import VCellReadOnly from '@/components/CellReadOnly.vue';
import VSimpleCell from '@/components/SimpleCell.vue';
import NumberUtil from '@/utils/NumberUtil.js';
import FileProxy from '@/proxies/FileProxy.js';
import UploadProjectFiles from '@/components/UploadProjectFiles.vue';

export default {
    name: 'estimate',
    data() {
        return {
            showDelete: true, // used in child Component UploadProjectFiles
            showRemovalConfirmationModal: false,
            project: store.state.report.project,
            currentProjectId: null,
            isLoading: false,
            viewMode: null,
            isViewingProjectDetail: false,
            formHasErrors: false,
            showAddProjectLineModal: false,
            tempCell: {
                code: '',
                quantity: 0,
                totalCost: null,
                unitOfMeasure: 'UNIT_PER',
                materialCostPer: 0,
                laborCostPer: 0,
                subcontractorCostPer: 0,
                equipmentCostPer: 0,
                changed: true,
            },
            items: [
                {
                    text: 'Client Home',
                    to: { name: 'clientHome' },
                },
                {
                    text: 'Projects',
                    to: { name: 'clientProjects' },
                },
                {
                    text: 'Project',
                    active: true,
                },
            ],
        };
    },
    methods: {
        handleFileUpload() {
            this.file = this.$refs.file.files[0];
        },
        showHideProjectDetail() {
            if (this.isViewingProjectDetail) {
                this.isViewingProjectDetail = false;
            } else {
                this.isViewingProjectDetail = true;
            }
        },
        calculateTotal() {
            let totalCost = 0.0;
            for (let line of this.project.lines) {
                if (line.enabled != null && line.enabled == false) {
                    continue;
                }

                if (
                    line.totalCost != null &&
                    NumberUtil.parseCommaFloat(line.totalCost) > 0
                ) {
                    totalCost =
                        totalCost + NumberUtil.parseCommaFloat(line.totalCost);
                }
            }

            this.project.totalCost = totalCost;
        },
        saveProject() {
            let linesParam = [];
            for (let line of store.state.report.project.lines) {
                this.composeParams(linesParam, line);
            }

            if (this.formHasErrors === true) {
                this.$notify({
                    group: 'notify',
                    type: 'error',
                    title: 'Error occurred',
                    text: 'Please fill with correct values',
                    duration: 5000,
                    speed: 1000,
                });
                this.formHasErrors = false;

                return;
            }

            if (linesParam.length === 0) {
                this.$notify({
                    group: 'notify',
                    type: 'error',
                    title: 'Error occurred',
                    text: 'No changes to save',
                    duration: 5000,
                    speed: 1000,
                });

                return;
            }

            this.isLoading = true;
            let params = {
                lines: linesParam,
                projectId: this.$route.params.project_id,
            };
            Vue.$http
                .post('/api/reports/estimates', params, {})
                .then(response => {
                    this.$notify({
                        group: 'notify',
                        type: 'success',
                        title: 'Successfully saved',
                        text: 'Project saved successfully!',
                        duration: 5000,
                        speed: 1000,
                    });
                    store.commit('report/IGNORE_CHANGES', {});
                })
                .catch(error => {
                    this.$notify({
                        group: 'notify',
                        type: 'error',
                        title: 'Error occurred',
                        text: 'Error occurred while saving project',
                        duration: 5000,
                        speed: 1000,
                    });
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        composeParams(arr, line) {
            if (line.changed === true) {
                if (
                    (!NumberUtil.validFloat(
                        NumberUtil.parseCommaFloat(line.materialCostPer)
                    ) &&
                        !NumberUtil.validFloat(
                            NumberUtil.parseCommaFloat(line.laborCostPer)
                        ) &&
                        !NumberUtil.validFloat(
                            NumberUtil.parseCommaFloat(
                                line.subcontractorCostPer
                            )
                        ) &&
                        !NumberUtil.validFloat(
                            NumberUtil.parseCommaFloat(line.equipmentCostPer)
                        )) ||
                    !NumberUtil.validFloat(
                        NumberUtil.parseCommaFloat(line.quantity)
                    ) ||
                    line.unitOfMeasure == null
                ) {
                    this.formHasErrors = true;

                    return;
                }

                const count = NumberUtil.parseCommaFloat(line.quantity);
                const materialCostPer = NumberUtil.parseCommaFloat(
                    line.materialCostPer
                );
                const laborCostPer = NumberUtil.parseCommaFloat(
                    line.laborCostPer
                );
                const subcontractorCostPer = NumberUtil.parseCommaFloat(
                    line.subcontractorCostPer
                );
                const equipmentCostPer = NumberUtil.parseCommaFloat(
                    line.equipmentCostPer
                );
                if (
                    (materialCostPer >= 0.0 ||
                        laborCostPer >= 0.0 ||
                        subcontractorCostPer >= 0.0 ||
                        equipmentCostPer >= 0.0) &&
                    count >= 0.0
                ) {
                    arr.push({
                        materialCostPer: materialCostPer,
                        laborCostPer: laborCostPer,
                        subcontractorCostPer: subcontractorCostPer,
                        equipmentCostPer: equipmentCostPer,
                        count: count,
                        code: line.code,
                        unitOfMeasure: line.unitOfMeasure,
                        measurement: line.unitOfMeasure,
                        codeId: line.estimateLineId,
                        projectId: this.$route.params.project_id,
                        estimateLineId: line.estimateLineId,
                        selected: line.enabled && line.wholeEnabled,
                    });
                }
            }

            if (line.childLines != null && line.childLines.length > 0) {
                for (const childLine of line.childLines) {
                    this.composeParams(arr, childLine);
                }
            }
        },
        editProject() {
            this.viewMode = 'edit';
        },
        viewProject() {
            this.viewMode = 'view';
        },
        openAddProjectLineModal() {
            this.tempCell = {
                code: '',
                quantity: 0,
                totalCost: null,
                unitOfMeasure: 'UNIT_PER',
                unitPrice: 0,
                changed: true,
            };
            this.showAddProjectLineModal = true;
        },
        addNewChild() {
            let linesParam = [];
            this.composeParams(linesParam, this.tempCell);
            if (this.formHasErrors == true) {
                this.$notify({
                    group: 'notify',
                    type: 'error',
                    title: 'Error occurred',
                    text: 'Please fill with correct values',
                    duration: 5000,
                    speed: 1000,
                });
                this.formHasErrors = false;

                return;
            }

            if (linesParam.length == 0) {
                this.$notify({
                    group: 'notify',
                    type: 'error',
                    title: 'Error occurred',
                    text: 'No changes to add',
                    duration: 5000,
                    speed: 1000,
                });

                return;
            }

            const newLine = {
                code: this.tempCell.code,
                estimateLineId: null,
                quantity: this.tempCell.quantity,
                selected: null,
                totalCost: this.tempCell.totalCost,
                unitOfMeasure: this.tempCell.unitOfMeasure,
                unitPrice: this.tempCell.unitPrice,
                enabled: true,
                wholeEnabled: true,
                changed: true,
            };
            this.project.lines.push(newLine);
            this.showAddProjectLineModal = false;
        },
        exportProject() {
            let linesParam = [];
            for (let line of store.state.report.project.lines) {
                this.composeParams(linesParam, line);
            }

            if (this.formHasErrors == true) {
                this.$notify({
                    group: 'notify',
                    type: 'error',
                    title: 'Error occurred',
                    text: 'Please fill with correct values',
                    duration: 5000,
                    speed: 1000,
                });
                this.formHasErrors = false;

                return;
            }

            if (linesParam.length > 0) {
                this.$notify({
                    group: 'notify',
                    type: 'error',
                    title: 'Error occurred',
                    text: 'Please save all changes first then export again!',
                    duration: 5000,
                    speed: 1000,
                });

                return;
            }

            this.isLoading = true;
            const projectId = this.$route.params.project_id;
            const url = '/api/reports/' + projectId + '/xlsx';
            const options = { responseType: 'blob' };
            Vue.$http
                .get(url, options)
                .then(response => {
                    if (!window.navigator.msSaveOrOpenBlob) {
                        const url = window.URL.createObjectURL(
                            new Blob([response.data])
                        );
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute(
                            'download',
                            this.project.title + '.xlsx'
                        );
                        document.body.append(link);
                        link.click();
                    } else {
                        // BLOB FOR EXPLORER 11
                        const url = window.navigator.msSaveOrOpenBlob(
                            new Blob([response.data]),
                            this.project.title + '.xlsx'
                        );
                        const link = document.createElement('a');
                        link.setAttribute(
                            'download',
                            this.project.title + '.xlsx'
                        );
                        document.body.appendChild(link);
                        link.click();
                    }
                    this.$notify({
                        group: 'notify',
                        type: 'success',
                        title: 'Successfully exported',
                        text: 'Project exported successfully!',
                        duration: 5000,
                        speed: 1000,
                    });
                })
                .catch(error => {
                    this.$notify({
                        group: 'notify',
                        type: 'error',
                        title: 'Error occurred',
                        text: 'Error occurred while exporting project',
                        duration: 5000,
                        speed: 1000,
                    });
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
    },
    components: {
        Navigation: Navigation,
        UploadProjectFiles: UploadProjectFiles,
        VLayout,
        VCard,
        VCell,
        VCellReadOnly,
        VSimpleCell,
    },
    mounted() {
        this.$root.$on('evt-calculate', () => {
            this.calculateTotal();
        });
        this.viewMode = 'view';
        this.isViewingProjectDetail = true;

        this.currentProjectId = this.$route.params.project_id;
        this.$refs.uploadProjectFiles.setProjectId(this.currentProjectId);
    },
    computed: {
        totalSquareFoot() {
            return NumberUtil.numberFormat(this.project.totalSqFt);
        },
        totalUnitPrice() {
            return NumberUtil.currencyFormatter(this.project.totalUnitPrice);
        },
        totalCost() {
            return NumberUtil.currencyFormatter(this.project.totalCost);
        },
        expectedAccuracyRangeL() {
            let totalEstimate = this.project.totalEstimate;
            let rangeL =
                totalEstimate *
                (1 + this.project.projectStatus.expectedAccuracyLow1);

            return NumberUtil.currencyFormatter(rangeL);
        },
        expectedAccuracyRangeH() {
            let totalEstimate = this.project.totalEstimate;
            let rangeL =
                totalEstimate *
                (1 + this.project.projectStatus.expectedAccuracyHigh2);

            return NumberUtil.currencyFormatter(rangeL);
        },
        projectBudget() {
            let totalEstimate = this.project.totalEstimate;

            return NumberUtil.currencyFormatter(totalEstimate);
        },
        pricePerSQFT1() {
            let pricePerSQFT1 =
                this.project.totalEstimate / this.project.totalSqFt;

            return NumberUtil.currencyFormatter(pricePerSQFT1);
        },
        checkPricePerSQFT() {
            let checkPrice = this.project.totalCost / this.project.totalSqFt;

            return NumberUtil.currencyFormatter(checkPrice);
        },
        constructionDelta() {
            let delta = this.project.totalEstimate - this.project.totalCost;
            if (delta < 0) {
                delta = delta * -1;
            }

            return NumberUtil.currencyFormatter(delta);
        },
        constructionDeltaPercent() {
            let delta = this.project.totalEstimate - this.project.totalCost;
            if (delta < 0) {
                delta = delta * -1;
            }

            return parseInt((delta / this.project.totalEstimate) * 100);
        },
        constructionDeltaValue() {
            let delta = this.project.totalEstimate - this.project.totalCost;

            return delta;
        },
        pricePerSQFT2() {
            let pricePerSQFT2 =
                this.project.totalEstimate / this.project.totalSqFt -
                this.project.totalCost / this.project.totalSqFt;
            if (pricePerSQFT2 < 0) {
                pricePerSQFT2 = pricePerSQFT2 * -1;
            }

            return NumberUtil.currencyFormatter(pricePerSQFT2);
        },
        pricePerSQFT2Value() {
            let pricePerSQFT2 =
                this.project.totalEstimate / this.project.totalSqFt -
                this.project.totalCost / this.project.totalSqFt;

            return pricePerSQFT2;
        },
    },
    beforeRouteEnter(to, from, next) {
        store.dispatch('project/measurement');
        store
            .dispatch('code/index')
            .then(res => {
                store.commit('code/INDEX', res);

                const projectId = to.params.project_id;
                store
                    .dispatch('report/find', projectId)
                    .then(response => {
                        store.commit('report/FIND', response);
                        next();
                    })
                    .catch(() => {
                        console.log('Request failed...');
                    })
                    .finally(() => {});
            })
            .catch(() => {
                console.log('Get MasterFormatCode Request failed...');
            })
            .finally(() => {});
    },
};
</script>
