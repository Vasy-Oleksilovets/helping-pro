<template>
    <div class="simple-cell">
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
        <!-- end of head -->
        <div class="row mt-4">
            <div class="col-4">
                <div class="row">
                    <div class="col-5">
                        <autocomplete v-model="cell.code" :disabled="false" />
                    </div>
                    <div class="col-7">
                        <template v-if="cell.code !== '' && cell.code !== null">
                            {{ $store.state.code.codesHash[cell.code] }}
                        </template>
                    </div>
                </div>
            </div>
            <!-- end of code -->
            <div class="col-1">
                <input
                    type="text"
                    class="form-control text-right"
                    placeholder="QTY"
                    v-model="cell.quantity"
                    v-on:change="calculateTotal('quantity')"
                />
            </div>
            <!-- end of quantity -->
            <div class="col-2 text-right">
                <select class="form-control" v-model="cell.unitOfMeasure">
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
            <!-- end of measurement -->
            <div class="col-1">
                <input
                    type="text"
                    class="form-control text-right"
                    placeholder="MATERIAL COST PER"
                    v-model="cell.materialCostPer"
                    v-on:change="calculateTotal('materialCostPer')"
                />
            </div>
            <div class="col-1">
                <input
                    type="text"
                    class="form-control text-right"
                    placeholder="LABOR COST PER"
                    v-model="cell.laborCostPer"
                    v-on:change="calculateTotal('laborCostPer')"
                />
            </div>
            <div class="col-1">
                <input
                    type="text"
                    class="form-control text-right"
                    placeholder="SUBCONTRACTOR COST PER"
                    v-model="cell.subcontractorCostPer"
                    v-on:change="calculateTotal('subcontractorCostPer')"
                />
            </div>
            <div class="col-1">
                <input
                    type="text"
                    class="form-control text-right"
                    placeholder="EQUIPMENT COST PER"
                    v-model="cell.equipmentCostPer"
                    v-on:change="calculateTotal('equipmentCostPer')"
                />
            </div>
            <!-- end of unit price -->
            <div class="col-1">
                <input
                    type="text"
                    class="form-control text-right"
                    placeholder="TOTAL COST"
                    v-model="cell.totalCost"
                    v-on:change="updateTotal()"
                />
            </div>
            <!-- end of total cost -->
        </div>
    </div>
</template>

<script>
/* ============
 * Simple Cell Component
 * ============
 *
 * A simple cell component for report page especially for modal
 *
 */
import NumberUtil from '@/utils/NumberUtil.js';
import Autocomplete from '@/components/Autocomplete.vue';

export default {
    /**
     * The name of the component
     */
    name: 'SimpleCell',
    components: {
        Autocomplete,
    },
    props: {
        cell: Object,
    },
    data() {
        return {};
    },
    created() {},
    mounted() {},
    computed: {},
    methods: {
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
        },
    },
};
</script>

<style scoped lang="css"></style>
