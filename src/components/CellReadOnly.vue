<template>
    <div>
        <template v-if="cell.lines == null && cell.childLines != null">
            <div
                :class="spacing"
                v-if="cell.enabled === true && cell.wholeEnabled === true"
            >
                <div :class="indentAndColor">
                    {{ cell.code }} {{ $store.state.code.codesHash[cell.code] }}
                </div>
                <div class="col-1">
                    <input
                        type="text"
                        class="form-control text-right"
                        placeholder="QTY"
                        disabled="disabled"
                        v-model="cell.quantity"
                    />
                </div>
                <div class="col-2 text-right">
                    <div>{{ cell.unitOfMeasure }}</div>
                </div>
                <div class="col-1">
                    <input
                        type="text"
                        class="form-control text-right"
                        placeholder="MATERIAL COST PER"
                        disabled="disabled"
                        v-model="cell.materialCostPer"
                    />
                </div>
                <div class="col-1">
                    <input
                        type="text"
                        class="form-control text-right"
                        disabled="disabled"
                        placeholder="LABOR COST PER"
                        v-model="cell.laborCostPer"
                    />
                </div>
                <div class="col-1">
                    <input
                        type="text"
                        class="form-control text-right"
                        disabled="disabled"
                        placeholder="SUBCONTRACTOR COST PER"
                        v-model="cell.subcontractorCostPer"
                    />
                </div>
                <div class="col-1">
                    <input
                        type="text"
                        class="form-control text-right"
                        disabled="disabled"
                        placeholder="EQUIPMENT COST PER"
                        v-model="cell.equipmentCostPer"
                    />
                </div>
                <div class="col-1">
                    <input
                        type="text"
                        class="form-control text-right"
                        disabled="disabled"
                        placeholder="TOTAL COST"
                        v-model="cell.totalCost"
                    />
                </div>
            </div>
        </template>
        <template v-if="cell.lines != null && cell.lines.length > 0">
            <cell-read-only
                v-for="(childLine, i) in cell.lines"
                :key="i + ' ' + childLine.code"
                :cell="childLine"
                :depth="depth + 1"
                v-on:evt-parent-calculate="process_event($event)"
            >
            </cell-read-only>
        </template>
        <template v-if="cell.childLines != null && cell.childLines.length > 0">
            <cell-read-only
                v-for="(childLine, i) in cell.childLines"
                :key="i + ' ' + childLine.code"
                :cell="childLine"
                :depth="depth + 1"
                v-on:evt-parent-calculate="process_event($event)"
            >
            </cell-read-only>
        </template>

        <template v-if="cell.lines === null && cell.childLines === null">
            <div class="row mt-4">
                <div class="col-4">
                    {{ cell.code }} {{ $store.state.code.codesHash[cell.code] }}
                </div>
                <div class="col-1">
                    <input
                        type="text"
                        class="form-control text-right"
                        placeholder="QTY"
                        disabled="disabled"
                        v-model="cell.quantity"
                    />
                </div>
                <div class="col-2 text-right">
                    <div>{{ cell.unitOfMeasure }}</div>
                </div>
                <div class="col-1">
                    <input
                        type="text"
                        class="form-control text-right"
                        placeholder="MATERIAL COST PER"
                        disabled="disabled"
                        v-model="cell.materialCost"
                    />
                </div>
                <div class="col-1">
                    <input
                        type="text"
                        class="form-control text-right"
                        placeholder="LABOR COST PER"
                        disabled="disabled"
                        v-model="cell.laborCostPer"
                    />
                </div>
                <div class="col-1">
                    <input
                        type="text"
                        class="form-control text-right"
                        placeholder="SUBCONTRACTOR PER COST"
                        disabled="disabled"
                        v-model="cell.subcontractorCostPer"
                    />
                </div>
                <div class="col-1">
                    <input
                        type="text"
                        class="form-control text-right"
                        placeholder="EQUIPMENT COST PER"
                        disabled="disabled"
                        v-model="cell.equipmentCostPer"
                    />
                </div>
                <div class="col-1">
                    <input
                        type="text"
                        class="form-control text-right"
                        placeholder="TOTAL COST"
                        disabled="disabled"
                        v-model="cell.totalCost"
                    />
                </div>
            </div>
        </template>
    </div>
</template>

<script>
/* ============
 * Cell Read Only Component
 * ============
 *
 * A basic cell read only component for report page
 *
 */
export default {
    /**
     * The name of the component
     */
    name: 'CellReadOnly',
    components: {},
    props: {
        cell: Object,
        depth: Number,
    },
    data() {
        return {};
    },
    created() {},
    mounted() {},
    computed: {
        indentAndColor() {
            if (this.depth === 0) {
                return 'text-success col-4';
            } else {
                return 'col-4 pl-' + this.depth * 4;
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
    methods: {},
};
</script>

<style scoped lang="css"></style>
