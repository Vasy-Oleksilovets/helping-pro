<template>
    <v-layout>
        <div class="container summary">
            <div class="col-12 pt-4">
                <template v-if="viewMode === 'view'">
                    <div class="row pb-4">
                        <div class="col text-left">
                            <button
                                class="btn btn-warning"
                                @click="editProject()"
                            >
                                Edit
                            </button>
                        </div>
                        <div class="col-8"></div>
                        <div class="col text-right">
                            <button
                                class="btn btn-success pull-right"
                                @click="exportProject()"
                            >
                                Export As XLSX
                            </button>
                        </div>
                    </div>
                </template>
                <template v-if="viewMode === 'edit'">
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
                    <b-tab id="projectTab" title="Project Details" active>
                        <div
                            class="row collapse"
                            v-bind:class="{ show: isViewingProjectDetail }"
                        >
                            <div class="col-5">
                                <div class="row">
                                    <div class="col-6">
                                        :
                                        <h6>Project a:</h6>
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
                                        <span>{{ project.estimateDate }}</span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6">
                                        <h6>Client:</h6>
                                    </div>
                                    <div class="col-6">
                                        <span>{{ project.client }}</span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6">
                                        <h6>Estimator:</h6>
                                    </div>
                                    <div class="col-6">
                                        <span>{{ project.estimator }}</span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6">
                                        <h6>Checked By:</h6>
                                    </div>
                                    <div class="col-6">
                                        <span>{{ project.checkedBy }}</span>
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
                                        <h6>{{ project.docScopeDate }}</h6>
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
                                        <h6 v-html="project.narrative"></h6>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6">
                                        <h6>Type of Estimate</h6>
                                    </div>
                                    <div class="col-6">
                                        <h6>
                                            {{ project.projectStatus.name }}
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
                                                    {{ expectedAccuracyRangeL }}
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
                                                                this.project
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
                                                                this.project
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
                                                    {{ expectedAccuracyRangeH }}
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
                                                                this.project
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
                                                                this.project
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
                                                    constructionDeltaValue >= 0
                                                "
                                            >
                                                {{ constructionDelta }} / +
                                                {{ constructionDeltaPercent }}%
                                            </template>
                                            <template
                                                v-if="
                                                    constructionDeltaValue < 0
                                                "
                                            >
                                                <span class="text-danger"
                                                    >({{
                                                        constructionDelta
                                                    }})</span
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
                                </div>
                                <div class="row">
                                    <div class="col-6">
                                        <h6>Delta Price Per SQFT</h6>
                                    </div>
                                    <div class="col-6">
                                        <h6>
                                            <template
                                                v-if="pricePerSQFT2Value >= 0"
                                            >
                                                {{ pricePerSQFT2 }}
                                            </template>
                                            <template
                                                v-if="pricePerSQFT2Value < 0"
                                            >
                                                <span class="text-danger"
                                                    >({{ pricePerSQFT2 }})</span
                                                >
                                            </template>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </b-tab>
                    <b-tab id="docsTab" title="Documents">
                        <div class="container text-center">
                            testing
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
                                <template v-if="constructionDeltaValue >= 0">
                                    {{ constructionDelta }} / +
                                    {{ constructionDeltaPercent }}%
                                </template>
                                <template v-if="constructionDeltaValue < 0">
                                    <span class="text-danger"
                                        >({{ constructionDelta }})</span
                                    >
                                    /
                                    <span class="text-danger"
                                        >({{ constructionDeltaPercent }}%)</span
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
                                <template v-if="pricePerSQFT2Value >= 0">
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
                    <div class="row">
                        <div class="col-2"></div>
                        <div class="col-8 text-center">
                            <i
                                class="fa fa fa-arrow-circle-down text-primary font-size-double detail-button"
                                @click="showHideProjectDetail()"
                            >
                            </i>
                        </div>
                        <div class="col-2"></div>
                    </div>
                </template>
                <div class="row" v-if="isViewingProjectDetail">
                    <div class="col-2"></div>
                    <div class="col-8 text-center">
                        <i
                            class="fa fa fa-arrow-circle-up text-primary font-size-double detail-button"
                            @click="showHideProjectDetail()"
                        >
                        </i>
                    </div>
                    <div class="col-2"></div>
                </div>
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
            <div slot="body">
                <div class="row">
                    <div class="col-4">
                        <b class="text-primary">LEVEL DESCRIPTION</b>
                    </div>
                    <div class="col-1 text-right">
                        <b class="text-primary">QTY</b>
                    </div>
                    <div class="col-2 text-right">
                        <b class="text-primary">U/M</b>
                    </div>
                    <div class="col-1 text-right">
                        <b class="text-primary">MATERIAL COST PER</b>
                    </div>
                    <div class="col-1 text-right">
                        <b class="text-primary">LABOR COST PER</b>
                    </div>
                    <div class="col-1 text-right">
                        <b class="text-primary">SUBCONTRACTOR COST PER</b>
                    </div>
                    <div class="col-1 text-right">
                        <b class="text-primary">EQUIPMENT COST PER</b>
                    </div>
                    <div class="col-1 text-right">
                        <b class="text-primary">TOTAL COST</b>
                    </div>
                </div>
                <div class="row text-danger">
                    <div class="col-4"></div>
                    <div class="col-1 text-right">{{ totalSquareFoot }}</div>
                    <div class="col-2 text-right">SQUARE_FOOT</div>
                    <div class="col-1 text-right"></div>
                    <div class="col-1 text-right"></div>
                    <div class="col-1 text-right"></div>
                    <div class="col-1 text-right">{{ checkPricePerSQFT }}</div>
                    <div class="col-1 text-right">{{ totalCost }}</div>
                </div>
                <template v-if="viewMode === 'view'">
                    <v-cell-read-only
                        :cell="project"
                        :depth="-1"
                    ></v-cell-read-only>
                </template>
                <template v-if="viewMode === 'edit'">
                    <v-cell :cell="project" :depth="-1"></v-cell>
                </template>
                <div class="row" v-if="showAddProjectLineModal">
                    <transition name="modal">
                        <div class="modal-mask">
                            <div class="modal-wrapper">
                                <div class="modal-container">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h4>Add New Line</h4>
                                            </div>
                                            <!-- end of modal-header -->
                                            <div class="modal-body">
                                                <v-simple-cell
                                                    :cell="tempCell"
                                                ></v-simple-cell>
                                            </div>
                                            <!-- end of modal-body -->
                                            <div class="modal-footer">
                                                <button
                                                    class="btn btn-success"
                                                    @click="addNewChild()"
                                                    :disabled="
                                                        tempCell.code ===
                                                            null ||
                                                            tempCell.code ===
                                                                '' ||
                                                            tempCell.quantity ===
                                                                null ||
                                                            tempCell.unitOfMeasure ===
                                                                null ||
                                                            (tempCell.materialCostPer ===
                                                                null &&
                                                                tempCell.laborCostPer ===
                                                                    null &&
                                                                tempCell.subcontractorCostPer ===
                                                                    null &&
                                                                tempCell.equipmentCostPer ===
                                                                    null)
                                                    "
                                                >
                                                    Add
                                                </button>
                                                <button
                                                    class="btn btn-default"
                                                    @click="
                                                        showAddProjectLineModal = false
                                                    "
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                            <!-- end of modal-footer -->
                                        </div>
                                        <!-- end of modal-content -->
                                    </div>
                                    <!-- end of modal-dialog -->
                                </div>
                                <!-- end of modal-container -->
                            </div>
                            <!-- end of modal-wrapper -->
                        </div>
                        <!-- end of modal-mask -->
                    </transition>
                </div>
            </div>
            <div slot="footer"></div>
        </v-card>

        <div style="margin-top: 250px;"></div>
    </v-layout>
</template>

<script>
/* ============
 * Report Show Page
 * ============
 *
 * The report show page.
 */
import Vue from 'vue';
import VLayout from '@/layouts/Default.vue';
import VCard from '@/components/Card.vue';
import store from '@/store';
import VCell from '@/components/Cell.vue';
import VCellReadOnly from '@/components/CellReadOnly.vue';
import VSimpleCell from '@/components/SimpleCell.vue';
import NumberUtil from '@/utils/NumberUtil.js';

export default {
    /**
     * The name of the page.
     */
    name: 'ReportShow',
    /**
     * The components that the page can use.
     */
    components: {
        VLayout,
        VCard,
        VCell,
        VCellReadOnly,
        VSimpleCell,
    },
    data() {
        return {
            project: store.state.report.project,
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
        };
    },
    mounted() {
        this.$root.$on('evt-calculate', () => {
            this.calculateTotal();
        });
        this.viewMode = 'view';
        this.isViewingProjectDetail = false;
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
            return this.project.totalEstimate - this.project.totalCost;
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
            return (
                this.project.totalEstimate / this.project.totalSqFt -
                this.project.totalCost / this.project.totalSqFt
            );
        },
    },
    methods: {
        showHideProjectDetail() {
            this.isViewingProjectDetail = !this.isViewingProjectDetail;
        },
        calculateTotal() {
            let totalCost = 0.0;
            for (let line of this.project.lines) {
                if (line.enabled != null && line.enabled === false) {
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
                .then(() => {
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
                .catch(() => {
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
                materialCostPer: 0,
                laborCostPer: 0,
                subcontractorCostPer: 0,
                equipmentCostPer: 0,
                changed: true,
            };
            this.showAddProjectLineModal = true;
        },
        addNewChild() {
            let linesParam = [];
            this.composeParams(linesParam, this.tempCell);
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
                materialCostPer: this.tempCell.materialCostPer,
                laborCostPer: this.tempCell.laborCostPer,
                subcontractorCostPer: this.tempCell.subcontractorCostPer,
                equipmentCostPer: this.tempCell.equipmentCostPer,
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
            const url = '/reports/api/' + projectId + '/xlsx';
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
                        window.navigator.msSaveOrOpenBlob(
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
                .catch(() => {
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
                    // .catch(() => {
                    //   // eslint-disable-next-line no-console
                    //   console.log("Request failed...");
                    // })
                    .finally(() => {});
            })
            .catch(() => {
                // eslint-disable-next-line no-console
                console.log('Get MasterFormatCode Request failed...');
            })
            .finally(() => {});
    },
};
</script>

<style scoped lang="css">
.modal-dialog {
  max-width: 1080px;
}

.margin-top-long-summary {
  margin-top: 450px;
}

.margin-top-short-summary {
  margin-top: 300px;
}

.summary {
  position: fixed;
  top: 100px;
  right: 0;
  left: 0;
  z-index: 1030;

  background-color: #f7f7f7;
}

.font-size-double {
  font-size: 2rem;
}

.detail-button:hover{
  cursor: pointer;
}
</style>
