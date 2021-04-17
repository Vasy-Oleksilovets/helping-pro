<template>
    <div>
        <template v-if="cell.lines == null && cell.childLines != null">
            <div :class="spacing">
                <div :class="color" :style="indent">
                    <template v-if="depth === 0">
                        <div class="row">
                            <div class="col-10">
                                {{ cell.code }} {{ cell.title }}
                            </div>
                            <div class="col-2">
                                <!-- <button
                  class="btn btn-success pull-right"
                  @click="addChild()"
                >
                  <i class="fa fa-plus-circle"></i>
                </button> -->
                            </div>
                        </div>
                    </template>
                    <template v-if="depth > 0">
                        <div class="row">
                            <div class="col-1">
                                <input
                                    style="width: 20px; height: 20px;"
                                    type="checkbox"
                                    v-model="cell.enabled"
                                    v-on:change="updateTotal()"
                                    :disabled="cell.wholeEnabled === false"
                                />
                            </div>
                            <div class="col-5">
                                <autocomplete
                                    v-model="cell.code"
                                    :initial="cell.code"
                                    :disabled="
                                        cell.enabled === false ||
                                            cell.wholeEnabled === false
                                    "
                                />
                            </div>
                            <div class="col-4"></div>
                            <div class="col-2">
                                <button
                                    class="btn btn-danger pull-right"
                                    @click="openDeleteConfirmDialog()"
                                >
                                    <i class="fa fa-minus-circle"></i>
                                </button>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col-1"></div>
                            <div class="col-9">
                                <template
                                    v-if="
                                        cell.code === '' || cell.code === null
                                    "
                                ></template>
                                <template
                                    v-if="
                                        cell.code !== '' && cell.code !== null
                                    "
                                >
                                    {{ $store.state.code.codesHash[cell.code] }}
                                </template>
                            </div>
                            <div class="col-2"></div>
                        </div>
                    </template>
                </div>
                <div class="col-1">
                    <input
                        type="text"
                        class="form-control text-right"
                        v-model="cell.quantity"
                        :disabled="
                            depth === 0 ||
                                cell.enabled === false ||
                                cell.wholeEnabled === false
                        "
                        v-on:change="calculateTotal('quantity')"
                        placeholder="QTY"
                    />
                </div>
                <div class="col-2 text-right">
                    <select
                        class="form-control"
                        :disabled="
                            depth === 0 ||
                                cell.enabled === false ||
                                cell.wholeEnabled === false
                        "
                        v-model="cell.unitOfMeasure"
                        v-on:change="updateMeasurement()"
                    >
                        <option
                            v-for="(measurement, i) in $store.state.project
                                .measurements"
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
                        placeholder="MATERIAL COST PER"
                        :disabled="
                            depth === 0 ||
                                cell.enabled === false ||
                                cell.wholeEnabled === false
                        "
                        v-model="cell.materialCostPer"
                        v-on:change="calculateTotal('materialCostPer')"
                    />
                </div>
                <div class="col-1">
                    <input
                        type="text"
                        class="form-control text-right"
                        placeholder="LABOR COST PER"
                        :disabled="
                            depth === 0 ||
                                cell.enabled === false ||
                                cell.wholeEnabled === false
                        "
                        v-model="cell.laborCostPer"
                        v-on:change="calculateTotal('laborCostPer')"
                    />
                </div>
                <div class="col-1">
                    <input
                        type="text"
                        class="form-control text-right"
                        placeholder="SUBCONTRACTOR COST PER"
                        :disabled="
                            depth === 0 ||
                                cell.enabled === false ||
                                cell.wholeEnabled === false
                        "
                        v-model="cell.subcontractorCostPer"
                        v-on:change="calculateTotal('subcontractorCostPer')"
                    />
                </div>
                <div class="col-1">
                    <input
                        type="text"
                        class="form-control text-right"
                        placeholder="EQUIPMENT COST PER"
                        :disabled="
                            depth === 0 ||
                                cell.enabled === false ||
                                cell.wholeEnabled === false
                        "
                        v-model="cell.equipmentCostPer"
                        v-on:change="calculateTotal('equipmentCostPer')"
                    />
                </div>
                <div class="col-1">
                    <input
                        type="text"
                        class="form-control text-right"
                        placeholder="TOTAL COST"
                        :disabled="
                            depth === 0 ||
                                cell.enabled === false ||
                                cell.wholeEnabled === false
                        "
                        v-model="cell.totalCost"
                        v-on:change="updateTotal()"
                    />
                </div>
            </div>
        </template>
        <template v-if="cell.lines != null && cell.lines.length > 0">
            <cell
                v-for="(childLine, i) in cell.lines"
                :key="i + ' ' + childLine.code + ' ' + depth"
                :cell="childLine"
                :depth="depth + 1"
                v-on:evt-parent-calculate="process_event($event)"
            >
            </cell>
        </template>
        <template v-if="cell.childLines != null && cell.childLines.length > 0">
            <cell
                v-for="(childLine, i) in cell.childLines"
                :key="i + ' ' + childLine.code"
                :cell="childLine"
                :depth="depth + 1"
                v-on:evt-parent-calculate="process_event($event)"
            >
            </cell>
        </template>
        <template v-if="cell.lines == null && cell.childLines == null">
            <div class="row mt-4">
                <div class="col-4">
                    <div class="row">
                        <div class="col-1">
                            <input
                                style="width: 20px; height: 20px;"
                                type="checkbox"
                                v-model="cell.enabled"
                                v-on:change="updateTotal()"
                                :disabled="cell.wholeEnabled === false"
                            />
                        </div>
                        <div class="col-5">
                            <autocomplete
                                v-model="cell.code"
                                :initial="cell.code"
                                :disabled="
                                    cell.enabled === false ||
                                        cell.wholeEnabled === false
                                "
                            />
                        </div>
                        <div class="col-4"></div>
                        <div class="col-2">
                            <button
                                class="btn btn-danger pull-right"
                                @click="openDeleteConfirmDialog()"
                            >
                                <i class="fa fa-minus-circle"></i>
                            </button>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div class="col-1"></div>
                        <div class="col-9">
                            <template
                                v-if="cell.code === '' || cell.code === null"
                            ></template>
                            <template
                                v-if="cell.code !== '' && cell.code !== null"
                            >
                                {{ $store.state.code.codesHash[cell.code] }}
                            </template>
                        </div>
                        <div class="col-2"></div>
                    </div>
                </div>
                <div class="col-1">
                    <input
                        type="text"
                        class="form-control text-right"
                        placeholder="QTY"
                        :disabled="
                            cell.enabled === false ||
                                cell.wholeEnabled === false
                        "
                        v-model="cell.quantity"
                        v-on:change="calculateTotal('quantity')"
                    />
                </div>
                <div class="col-2 text-right">
                    <select
                        class="form-control"
                        :disabled="
                            cell.enabled === false ||
                                cell.wholeEnabled === false
                        "
                        v-model="cell.unitOfMeasure"
                        v-on:change="updateMeasurement()"
                    >
                        <option
                            v-for="(measurement, i) in $store.state.project
                                .measurements"
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
                        placeholder="MATERIAL COST PER"
                        :disabled="
                            cell.enabled === false ||
                                cell.wholeEnabled === false
                        "
                        v-model="cell.materialCostPer"
                        v-on:change="calculateTotal('materialCostPer')"
                    />
                </div>
                <div class="col-1">
                    <input
                        type="text"
                        class="form-control text-right"
                        placeholder="LABOR COST PER"
                        :disabled="
                            cell.enabled === false ||
                                cell.wholeEnabled === false
                        "
                        v-model="cell.laborCostPer"
                        v-on:change="calculateTotal('laborCostPer')"
                    />
                </div>
                <div class="col-1">
                    <input
                        type="text"
                        class="form-control text-right"
                        placeholder="SUBCONTRACTOR COST PER"
                        :disabled="
                            cell.enabled === false ||
                                cell.wholeEnabled === false
                        "
                        v-model="cell.subcontractorCostPer"
                        v-on:change="calculateTotal('subcontractorCostPer')"
                    />
                </div>
                <div class="col-1">
                    <input
                        type="text"
                        class="form-control text-right"
                        placeholder="EQUIPMENT COST PER"
                        :disabled="
                            cell.enabled === false ||
                                cell.wholeEnabled === false
                        "
                        v-model="cell.equipmentCostPer"
                        v-on:change="calculateTotal('equipmentCostPer')"
                    />
                </div>
                <div class="col-1">
                    <input
                        type="text"
                        class="form-control text-right"
                        placeholder="TOTAL COST"
                        :disabled="
                            cell.enabled === false ||
                                cell.wholeEnabled === false
                        "
                        v-model="cell.totalCost"
                        v-on:change="updateTotal()"
                    />
                </div>
            </div>
        </template>
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
                                            >Are you sure you want to delete
                                            this line?</span
                                        >
                                    </div>
                                    <!-- end of modal-body -->
                                    <div class="modal-footer">
                                        <button
                                            class="btn btn-danger"
                                            @click="removeChild()"
                                        >
                                            Delete
                                        </button>
                                        <button
                                            class="btn btn-default"
                                            @click="showModal = false"
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
    </div>
</template>

<script>
/* ============
 * Cell Component
 * ============
 *
 * A basic cell component for report page
 *
 */
import Vue from 'vue';
import store from '@/store';
import NumberUtil from '@/utils/NumberUtil.js';
import Autocomplete from '@/components/Autocomplete.vue';

export default {
    /**
     * The name of the component
     */

    name: 'Cell',
    components: {
        Autocomplete,
    },
    props: {
        cell: Object,
        depth: Number,
    },
    data() {
        return {
            showModal: false,
        };
    },
    created() {},
    mounted() {},
    computed: {
        color() {
            if (this.depth === 0) {
                return 'text-success col-4';
            } else {
                return 'col-4';
            }
        },
        indent() {
            if (this.depth === 0) {
                return '';
            } else {
                return 'padding-left: ' + (15 + this.depth * 10) + 'px;';
            }
        },
        spacing() {
            if (this.depth === 0) {
                return 'row mt-4';
            } else {
                return 'row mt-2';
            }
        },
    },
    methods: {
        process_event() {
            store.commit('report/UPDATEPARENT', this.cell);

            if (this.depth !== 0) {
                this.$emit('evt-parent-calculate');
            } else {
                this.$root.$emit('evt-calculate');
            }
        },
        calculateTotal(field) {
            if (
                !NumberUtil.validFloat(
                    NumberUtil.parseCommaFloat(this.cell[field])
                )
            ) {
                return;
            }

            this.cell[field] = NumberUtil.numberFormat(
                NumberUtil.fixPoint(
                    NumberUtil.parseCommaFloat(this.cell[field])
                )
            );

            if (
                !NumberUtil.validFloat(
                    NumberUtil.parseCommaFloat(this.cell.materialCostPer)
                )
            ) {
                return;
            }

            if (
                !NumberUtil.validFloat(
                    NumberUtil.parseCommaFloat(this.cell.laborCostPer)
                )
            ) {
                return;
            }

            if (
                !NumberUtil.validFloat(
                    NumberUtil.parseCommaFloat(this.cell.subcontractorCostPer)
                )
            ) {
                return;
            }

            if (
                !NumberUtil.validFloat(
                    NumberUtil.parseCommaFloat(this.cell.equipmentCostPer)
                )
            ) {
                return;
            }

            if (
                !NumberUtil.validFloat(
                    NumberUtil.parseCommaFloat(this.cell.quantity)
                )
            ) {
                return;
            }

            this.cell.totalCost =
                NumberUtil.parseCommaFloat(this.cell.quantity) *
                    NumberUtil.parseCommaFloat(this.cell.materialCostPer) +
                NumberUtil.parseCommaFloat(this.cell.quantity) *
                    NumberUtil.parseCommaFloat(this.cell.laborCostPer) +
                NumberUtil.parseCommaFloat(this.cell.quantity) *
                    NumberUtil.parseCommaFloat(this.cell.subcontractorCostPer) +
                NumberUtil.parseCommaFloat(this.cell.quantity) *
                    NumberUtil.parseCommaFloat(this.cell.equipmentCostPer);
            this.updateTotal();
        },
        updateTotal() {
            this.cell.totalCost = NumberUtil.numberFormat(
                NumberUtil.fixPoint(
                    NumberUtil.parseCommaFloat(this.cell.totalCost)
                )
            );
            this.cell.wholeEnabled = this.cell.enabled;
            store.commit('report/UPDATE', this.cell);
            if (this.depth !== 0) {
                this.$emit('evt-parent-calculate');
            } else {
                this.$root.$emit('evt-calculate');
            }
            this.cell.wholeEnabled = true;
        },
        addChild() {
            let childLine = {
                childLines: [],
                code: '',
                estimateLineId: null,
                quantity: 1,
                quantityBase: null,
                quantityCount: 0,
                selected: null,
                title: '',
                totalCost: 0,
                totalCostBase: null,
                unitOfMeasure: 'UNIT_PER',
                materialCostPer: 0,
                laborCostPer: 0,
                subcontractorCostPer: 0,
                equipmentCostPer: 0,
                enabled: true,
                wholeEnabled: true,
            };
            this.cell.childLines.push(childLine);
        },
        removeChild() {
            if (this.cell.estimateLineId != null) {
                Vue.$http
                    .delete(
                        '/reports/api/estimates/' + this.cell.estimateLineId
                    )
                    .then(() => {
                        store.commit('report/REMOVE', this.cell);
                        if (this.depth !== 0) {
                            this.$emit('evt-parent-calculate');
                        } else {
                            this.$root.$emit('evt-calculate');
                        }

                        this.$notify({
                            group: 'notify',
                            type: 'success',
                            title: 'Successfully removed',
                            text: 'Cell removed successfully!',
                            duration: 5000,
                            speed: 1000,
                        });
                    })
                    .catch(() => {
                        this.$notify({
                            group: 'notify',
                            type: 'error',
                            title: 'Error occurred',
                            text: 'Error occurred while removing cell',
                            duration: 5000,
                            speed: 1000,
                        });
                    })
                    .finally(() => {});
            } else {
                store.commit('report/REMOVE', this.cell);
                if (this.depth !== 0) {
                    this.$emit('evt-parent-calculate');
                } else {
                    this.$root.$emit('evt-calculate');
                }

                this.$notify({
                    group: 'notify',
                    type: 'success',
                    title: 'Successfully removed',
                    text: 'Cell removed successfully!',
                    duration: 5000,
                    speed: 1000,
                });
            }
        },
        openDeleteConfirmDialog() {
            this.showModal = true;
        },
        updateMeasurement() {
            this.cell.changed = true;
        },
    },
};
</script>

<style scoped lang="css"></style>
