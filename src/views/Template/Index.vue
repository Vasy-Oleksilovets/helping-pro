<template>
    <v-layout>
        <div style="margin-top: 150px;"></div>

        <v-card contextual-style="info">
            <span slot="header">
                Template
            </span>
            <div slot="body">
                <div class="row mb-2">
                    <div class="col-9">
                        Project Type:
                    </div>
                    <div class="col-2">
                        <button
                            class="btn btn-info pull-right"
                            v-bind:disabled="
                                currentBuildingType === null ||
                                    isTemplatesLoaded === false
                            "
                            @click="openAddLineModal()"
                        >
                            Add Line
                        </button>
                    </div>
                    <div class="col-1">
                        <button
                            class="btn btn-success pull-right"
                            v-bind:disabled="
                                currentBuildingType === null ||
                                    isTemplatesLoaded === false
                            "
                            @click="saveTemplates()"
                        >
                            Save
                        </button>
                    </div>
                </div>

                <div class="row">
                    <div class="col-11">
                        <select
                            v-model="currentBuildingType"
                            class="form-control"
                        >
                            <option disabled value=""></option>

                            <option
                                v-for="buildingType in buildingTypes"
                                :value="buildingType.id"
                                :key="buildingType.id"
                            >
                                <template v-if="buildingType.order >= 10">
                                    {{
                                        buildingType.category +
                                            '.' +
                                            buildingType.order +
                                            '&nbsp;&nbsp;&nbsp;' +
                                            buildingType.name
                                    }}
                                </template>
                                <template v-if="buildingType.order < 10">
                                    {{
                                        buildingType.category +
                                            '.' +
                                            buildingType.order +
                                            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                                            buildingType.name
                                    }}
                                </template>
                            </option>
                        </select>
                    </div>
                    <div class="col-1">
                        <button
                            class="btn btn-primary pull-right"
                            @click="loadTemplates()"
                        >
                            Load
                        </button>
                    </div>
                </div>

                <hr />
                <div class="row mb-2">
                    <div class="col-2">
                        <span>Code</span>
                    </div>
                    <div class="col-2">
                        <span>Title</span>
                    </div>
                    <div class="col-1 text-right">
                        <span>Count Per 1000 Sq Ft</span>
                    </div>
                    <div class="col-2 text-right">
                        <span>Measurement</span>
                    </div>
                    <div class="col-1 text-right">
                        <span>Material Cost Per</span>
                    </div>
                    <div class="col-1 text-right">
                        <span>Labor Cost Per</span>
                    </div>
                    <div class="col-1 text-right">
                        <span>Subcontractor Cost Per</span>
                    </div>
                    <div class="col-1 text-right">
                        <span>Equipment Cost Per</span>
                    </div>
                    <div class="col-1"></div>
                </div>
                <!-- end of header -->
                <hr />

                <template v-if="templates.length > 0">
                    <div
                        class="row mb-4"
                        v-for="template in templates"
                        :key="template.masterFormatCode"
                    >
                        <div class="col-2">
                            <autocomplete
                                v-model="template.masterFormatCode"
                                :initial="template.masterFormatCode"
                                :disabled="false"
                            />
                        </div>
                        <div class="col-2">
                            {{
                                $store.state.code.codesHash[
                                    template.masterFormatCode
                                ]
                            }}
                        </div>
                        <div class="col-1">
                            <input
                                type="text"
                                class="form-control text-right"
                                v-model="template.countPer1000SqFt"
                                v-on:change="
                                    numberFormat(template, 'countPer1000SqFt')
                                "
                            />
                        </div>
                        <div class="col-2">
                            <select
                                v-model="template.measurement"
                                class="form-control"
                            >
                                <option disabled value="">Measurement</option>
                                <option
                                    v-for="(measurement, i) in $store.state
                                        .project.measurements"
                                    :key="i"
                                    :value="measurement"
                                >
                                    {{ measurement }}
                                </option>
                            </select>
                        </div>
                        <div class="col-1">
                            <input
                                type="text"
                                class="form-control text-right"
                                v-model="template.materialCostPer"
                                v-on:change="
                                    numberFormat(template, 'materialCostPer')
                                "
                            />
                        </div>
                        <div class="col-1">
                            <input
                                type="text"
                                class="form-control text-right"
                                v-model="template.laborCostPer"
                                v-on:change="
                                    numberFormat(template, 'laborCostPer')
                                "
                            />
                        </div>
                        <div class="col-1">
                            <input
                                type="text"
                                class="form-control text-right"
                                v-model="template.subcontractorCostPer"
                                v-on:change="
                                    numberFormat(
                                        template,
                                        'subcontractorCostPer'
                                    )
                                "
                            />
                        </div>
                        <div class="col-1">
                            <input
                                type="text"
                                class="form-control text-right"
                                v-model="template.equipmentCostPer"
                                v-on:change="
                                    numberFormat(template, 'equipmentCostPer')
                                "
                            />
                        </div>
                        <div class="col-1">
                            <button
                                class="btn btn-danger pull-right"
                                @click="openDeleteConfirmDialog(template)"
                            >
                                <i class="fa fa-minus-circle"></i>
                            </button>
                        </div>
                    </div> </template
                ><!-- end of template repeat -->

                <div class="row" v-if="showAddLineModal">
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
                                                    class="btn btn-primary"
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
                                                    @click="addMore()"
                                                >
                                                    Add More
                                                </button>
                                                <button
                                                    class="btn btn-success"
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
                                                    @click="addNewChild()"
                                                >
                                                    Add & Close
                                                </button>
                                                <button
                                                    class="btn btn-default"
                                                    @click="
                                                        showAddLineModal = false
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

                <div class="row" v-if="showModal">
                    <transition name="modal">
                        <div class="modal-mask">
                            <div class="modal-wrapper">
                                <div class="modal-container">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h4>Delete Line</h4>
                                            </div>
                                            <!-- end of modal-header -->
                                            <div class="modal-body">
                                                <span
                                                    >Are you sure you want to
                                                    delete this line?</span
                                                >
                                            </div>
                                            <!-- end of modal-body -->
                                            <div class="modal-footer">
                                                <button
                                                    class="btn btn-danger"
                                                    @click="deleteTemplate()"
                                                >
                                                    Delete
                                                </button>
                                                <button
                                                    class="btn btn-default"
                                                    @click="cancelModal()"
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
                <!-- end of removal modal -->

                <div class="loading-parent">
                    <loading
                        :active.sync="isLoading"
                        :can-cancel="false"
                        :is-full-page="true"
                    />
                </div>
            </div>
            <div slot="footer"></div>
        </v-card>

        <div style="margin-top: 250px;"></div>
    </v-layout>
</template>

<script>
/* ============
 * Template Index Page
 * ============
 * The template index page
 */
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import store from '@/store';
import VLayout from '@/layouts/Default.vue';
import Autocomplete from '@/components/Autocomplete.vue';
import VCard from '@/components/Card.vue';
import TemplateProxy from '@/proxies/TemplateProxy.js';
import ProjectProxy from '@/proxies/ProjectProxy.js';
import NumberUtil from '@/utils/NumberUtil.js';
import VSimpleCell from '@/components/SimpleCell.vue';

export default {
    /**
     * The name of the page
     */
    name: 'TemplateIndex',
    /**
     * The components that the page can use.
     */
    components: {
        VLayout,
        VCard,
        Loading,
        Autocomplete,
        VSimpleCell,
    },
    data() {
        return {
            currentBuildingType: null,
            templates: [],
            isLoading: false,
            showModal: false,
            currentTemplate: null,
            isTemplatesLoaded: false,
            buildingTypes: [],
            showAddLineModal: false,
            formHasErrors: false,
            tempCell: {
                code: '',
                quantity: 0,
                totalCost: null,
                unitOfMeasure: 'UNIT_PER',
                materialCostPer: null,
                laborCostPer: null,
                subcontractorCostPer: null,
                equipmentCostPer: 0,
                changed: true,
            },
        };
    },
    mounted() {
        new ProjectProxy()
            .buildingTypes()
            .then(response => {
                this.buildingTypes = response;
            })
            .catch(() => {
                this.$notify({
                    group: 'notify',
                    type: 'error',
                    title: 'Error occurred',
                    text: 'Error occurred while getting building types',
                    duration: 5000,
                    speed: 1000,
                });
            })
            .finally(() => {});
    },
    computed: {},
    methods: {
        numberFormat(template, field) {
            template[field] = NumberUtil.numberFormat(
                NumberUtil.fixPoint(NumberUtil.parseCommaFloat(template[field]))
            );
        },
        loadTemplates() {
            this.isLoading = true;
            let options = { buildingTypeId: this.currentBuildingType };
            new TemplateProxy(options)
                .all()
                .then(response => {
                    this.templates = response;
                    for (let template of this.templates) {
                        template.countPer1000SqFt = NumberUtil.numberFormat(
                            NumberUtil.fixPoint(
                                NumberUtil.parseCommaFloat(
                                    template.countPer1000SqFt
                                )
                            )
                        );
                        template.materialCostPer = NumberUtil.numberFormat(
                            NumberUtil.fixPoint(
                                NumberUtil.parseCommaFloat(
                                    template.materialCostPer
                                )
                            )
                        );
                        template.laborCostPer = NumberUtil.numberFormat(
                            NumberUtil.fixPoint(
                                NumberUtil.parseCommaFloat(
                                    template.laborCostPer
                                )
                            )
                        );
                        template.subcontractorCostPer = NumberUtil.numberFormat(
                            NumberUtil.fixPoint(
                                NumberUtil.parseCommaFloat(
                                    template.subcontractorCostPer
                                )
                            )
                        );
                        template.equipmentCostPer = NumberUtil.numberFormat(
                            NumberUtil.fixPoint(
                                NumberUtil.parseCommaFloat(
                                    template.equipmentCostPer
                                )
                            )
                        );
                    }
                    this.isTemplatesLoaded = true;
                })
                .catch(() => {
                    this.$notify({
                        group: 'notify',
                        type: 'error',
                        title: 'Error occurred',
                        text: 'Error occurred while getting templates',
                        duration: 5000,
                        speed: 1000,
                    });
                    this.isTemplatesLoaded = false;
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        saveTemplates() {
            let options = [...this.templates];
            for (const option of options) {
                if (
                    !NumberUtil.validFloat(
                        NumberUtil.parseCommaFloat(option.countPer1000SqFt)
                    ) ||
                    (!NumberUtil.validFloat(
                        NumberUtil.parseCommaFloat(option.materialCostPer)
                    ) &&
                        !NumberUtil.validFloat(
                            NumberUtil.parseCommaFloat(option.laborCostPer)
                        ) &&
                        !NumberUtil.validFloat(
                            NumberUtil.parseCommaFloat(
                                option.subcontractorCostPer
                            )
                        ) &&
                        !NumberUtil.validFloat(
                            NumberUtil.parseCommaFloat(option.equipmentCostPer)
                        ))
                ) {
                    this.$notify({
                        group: 'notify',
                        type: 'error',
                        title: 'Error occurred',
                        text: 'Please input valid number',
                        duration: 5000,
                        speed: 1000,
                    });

                    return;
                }

                option.countPer1000SqFt = NumberUtil.parseCommaFloat(
                    option.countPer1000SqFt
                );
                option.materialCostPer = NumberUtil.parseCommaFloat(
                    option.materialCostPer
                );
                option.laborCostPer = NumberUtil.parseCommaFloat(
                    option.laborCostPer
                );
                option.subcontractorCostPer = NumberUtil.parseCommaFloat(
                    option.subcontractorCostPer
                );
                option.equipmentCostPer = NumberUtil.parseCommaFloat(
                    option.equipmentCostPer
                );
            }
            this.isLoading = true;
            new TemplateProxy()
                .create(options)
                .then(() => {
                    this.$notify({
                        group: 'notify',
                        type: 'success',
                        title: 'Successfully saved',
                        text: 'The templates saved successfully',
                        duration: 5000,
                        speed: 1000,
                    });
                    this.isLoading = false;
                    this.loadTemplates();
                })
                .catch(() => {
                    this.$notify({
                        group: 'notify',
                        type: 'error',
                        title: 'Error occurred',
                        text: 'Error occurred while saving templates',
                        duration: 5000,
                        speed: 1000,
                    });
                    this.isLoading = false;
                })
                .finally(() => {});
        },
        openDeleteConfirmDialog(template) {
            this.currentTemplate = Object.assign({}, template);
            this.showModal = true;
        },
        deleteTemplate() {
            new TemplateProxy()
                .destroy(this.currentTemplate.id)
                .then(() => {
                    this.loadTemplates();
                    this.$notify({
                        group: 'notify',
                        type: 'success',
                        title: 'Successfully removed',
                        text: 'The template removed successfully',
                        duration: 5000,
                        speed: 1000,
                    });
                })
                .catch(() => {
                    this.$notify({
                        group: 'notify',
                        type: 'error',
                        title: 'Error occurred',
                        text: 'Error occurred while removing template',
                        duration: 5000,
                        speed: 1000,
                    });
                })
                .finally(() => {
                    this.cancelModal();
                });
        },
        openAddLineModal() {
            this.initTempCell();
            this.showAddLineModal = true;
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

            const newTemplate = {
                masterFormatCode: this.tempCell.code,
                measurement: this.tempCell.unitOfMeasure,
                countPer1000SqFt: this.tempCell.quantity,
                materialCostPer: this.tempCell.materialCostPer,
                laborCostPer: this.tempCell.laborCostPer,
                subcontractorCostPer: this.tempCell.subcontractorCostPer,
                equipmentCostPer: this.tempCell.equipmentCostPer,
                buildingTypeId: this.currentBuildingType,
            };

            this.templates.push(newTemplate);
            this.showAddLineModal = false;
        },
        addMore() {
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

            const newTemplate = {
                masterFormatCode: this.tempCell.code,
                measurement: this.tempCell.unitOfMeasure,
                countPer1000SqFt: this.tempCell.quantity,
                materialCostPer: this.tempCell.materialCostPer,
                laborCostPer: this.tempCell.laborCostPer,
                subcontractorCostPer: this.tempCell.subcontractorCostPer,
                equipmentCostPer: this.tempCell.equipmentCostPer,
                buildingTypeId: this.currentBuildingType,
            };

            this.templates.push(newTemplate);
            this.initTempCell();
        },
        initTempCell() {
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
        },
        cancelModal() {
            this.showModal = false;
            this.currentTemplate = null;
        },
    },
    beforeRouteEnter(to, from, next) {
        store.dispatch('project/measurement');
        store
            .dispatch('code/index')
            .then(response => {
                store.commit('code/INDEX', response);
            })
            .catch(() => {
                // eslint-disable-next-line no-console
                console.log('Get MasterFormatCode Request failed...');
            })
            .finally(() => {
                next();
            });
    },
};
</script>

<style scoped lang="css">
.modal-dialog {
  max-width: 1080px;
}

.loading-parent {
    position: relative;
  }
</style>
