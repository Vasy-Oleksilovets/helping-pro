<template>
    <div>
        <b-row
            class="estimates-cell"
            v-bind:style="{ background: backgroundColor }"
        >
            <b-col lg="2" class="cell-input">
                <img
                    v-show="estimateLine.children.length == 0 && level != 4"
                    src="~@/assets/img/estimate-folder.png"
                    class="cell-folder"
                />
                <img
                    v-show="estimateLine.children.length > 0"
                    src="~@/assets/img/estimate-folder-open.png"
                    class="cell-folder"
                    @click="triggerExpanded()"
                />
                <input
                    type="text"
                    class="width-100-with-img"
                    placeholder="CODE"
                    :value="estimateLine.newNumber"
                    :disabled="true"
                />
            </b-col>
            <b-col lg="2" class="cell-input">
                <input
                    type="text"
                    class="form-control"
                    placeholder="DESCRIPTION"
                    :value="estimateLine.newTitle"
                    :disabled="true"
                />
            </b-col>
            <b-col lg="1" class="cell-input">
                <input
                    type="number"
                    class="form-control text-right"
                    placeholder="0"
                    v-model="cell.quantity"
                    v-on:change="calculateTotal()"
                />
            </b-col>
            <b-col lg="1" class="cell-input">
                <input
                    type="text"
                    class="form-control"
                    placeholder="UNIT"
                    :value="estimateLine.measurement"
                    :disabled="true"
                />
            </b-col>
            <b-col lg="1" class="cell-input">
                <input
                    type="text"
                    class="form-control text-right"
                    placeholder="0"
                    v-model="cell.materialCostPer"
                    v-on:change="calculateTotal()"
                />
            </b-col>
            <b-col lg="1" class="cell-input">
                <input
                    type="number"
                    class="form-control text-right"
                    placeholder="0"
                    v-model="cell.laborCostPer"
                    v-on:change="calculateTotal()"
                />
            </b-col>
            <b-col lg="1" class="cell-input">
                <input
                    type="number"
                    class="form-control text-right"
                    placeholder="0"
                    v-model="cell.equipmentCostPer"
                    v-on:change="calculateTotal()"
                />
            </b-col>
            <b-col lg="1" class="cell-input">
                <input
                    type="number"
                    class="form-control text-right"
                    placeholder="0"
                    v-model="cell.subcontractorCostPer"
                    v-on:change="calculateTotal()"
                />
            </b-col>
            <b-col lg="2" class="cell-input">
                <input
                    type="number"
                    class="width-100-with-three-dots text-right"
                    placeholder="0"
                    :disabled="true"
                    v-model="cell.total"
                />
                <button
                    class="btn bg-transparent three-dots"
                    type="button"
                    id="dropdownMenu2"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    <svg
                        class="bi bi-three-dots-vertical"
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
                        />
                    </svg>
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                    <button class="dropdown-item" type="button">Message</button>
                    <button
                        class="dropdown-item"
                        type="button"
                        @click="deleteEstimate()"
                    >
                        Delete
                    </button>
                </div>
            </b-col>
        </b-row>

    <EstimatesCell 
      v-show="isExpanded"
      v-for="(line, i)  in estimateLine.children"
      :estimateLine = "line"
      :key="i"
      :lineKey="i"
      :level="level + 1"
    />
  </div>
</template>

<script>
import store from "@/store";
import { debounce } from "debounce";
import EventBus from '../../../../plugins/event-bus';

export default {
    name: 'EstimatesCell',
    props: ['estimateLine', 'lineKey', 'level'],
    data() {
        return {
            cell: Object.assign({}, this.estimateLine),
            backgroundColor: this.getBackgroundColor(),
            isExpanded: true,
        };
    },
    watch: {
        estimateLine: {
            handler: function(newValue, oldValue) {
                this.cell = Object.assign({}, newValue);
            },
            deep: true,
        },
    },
    methods: {
        calculateTotal: debounce(function(e) {
            // Update cell
            const updatedCell = JSON.parse(JSON.stringify(this.cell));

            store.dispatch('projectmanager/updateProjectEstimate', {
                cell: updatedCell,
                vue: this,
            });
        }, 300),

        deleteEstimate() {
            store.dispatch('projectmanager/removeEstimateLine', {
                id: this.cell.newNumber,
                lineId: this.cell.estimateLineId,
                vue: this,
            });
        },

        triggerExpanded() {
            this.isExpanded = !this.isExpanded;
        },

        addComment() {
          if (this.cell.estimateLineId) {
            store.dispatch("comment/initAllComments", {
              subProjectId: this.$route.params.subproject_id,
            });
            
            EventBus.$emit('add_new_comment', { 
              estimateLineId: this.cell.estimateLineId 
            });
          }
        },

        getBackgroundColor() {
          if (this.level == 1)
            return '#516D8F';
          else if (this.level == 2)
            return '#95C6D9';
          else if (this.level == 3)
            return '#C6C6D9';
          else if (this.level == 4)
            return '#E3E3F0';
        }
    },
};
</script>

<style lang="css" scoped>
.estimates-cell {
  background: #516D8F;
  height: 64px;
  margin: 0;

  font-family: Montserrat;
  font-style: normal;
}

.estimates-cell input {
  margin-top: 4px;
  height: 56px;

  border-radius: 0;
  background: #F4F4F4;
  border: 1px solid #C9C9C9;
  box-sizing: border-box;

  font-size: 13px;
  font-weight: 600;
  color: black;
}

.cell-folder {
  margin-right: 15px;
  margin-top: 22px;
}

.cell-folder:hover {
  cursor: pointer;
}

.width-100-with-img {
  width: calc(100% - 35px) !important;
  float: right;
}

.width-100-with-three-dots {
  width: calc(100% - 50px) !important;
}

.cell-input {
  padding-left: 2px;
  padding-right: 2px;
}

.cell-input:first-child {
  padding-left: 15px;
}

.cell-input:last-child {
  padding-right: 15px;
}

.three-dots {
  font-size: 16px;
  color: #FFFFFF;
}

.dropdown-item {
  font-weight: 600;
  font-size: 15px;
}
</style>
