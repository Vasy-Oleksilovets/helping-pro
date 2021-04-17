<template>
    <b-row class="new-estimates-cell">
        <b-col lg="2" class="cell-input">
            <!-- <img src="~@/assets/img/estimate-folder.png" class="cell-folder"/> -->
            <div class="left-yellow-outline"></div>
            <input
                type="text"
                class="width-100-with-img float-right"
                placeholder="CODE"
                :value="newNumber"
                :disabled="true"
            />
        </b-col>
        <b-col lg="2" class="cell-input">
            <input
                type="text"
                class="form-control"
                placeholder="DESCRIPTION"
                :value="newTitle"
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
            <select class="form-control" v-model="cell.measurement">
                <option
                    v-for="item in $store.state.project.measurements"
                    :value="item.key"
                    :key="item.key"
                >
                    {{ item.value }}
                </option>
            </select>
        </b-col>
        <b-col lg="1" class="cell-input">
            <input
                type="number"
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
            <a class="btn-estimate-action" @click="closeEstimate()">
                <i class="fa fa-times-circle" aria-hidden="true"></i>
            </a>
            <a class="btn-estimate-action" @click="addEstimate()">
                <i class="fa fa-plus-circle" aria-hidden="true"></i>
            </a>
        </b-col>
    </b-row>
</template>

<script>
import store from '@/store';
import { debounce } from 'debounce';

export default {
    name: 'NewEstimatesCell',
    props: ['isShow', 'newNumber', 'newTitle', 'newId'],
    data() {
        return {
            cell: new Object(),
        };
    },
    mounted() {
        this.initCell();
    },
    methods: {
        initCell() {
            this.cell = Object.assign(new Object(), {
                quantity: 0,
                measurement: null,
                materialCostPer: 0,
                laborCostPer: 0,
                equipmentCostPer: 0,
                subcontractorCostPer: 0,
                total: 0,
                newNumber: this.newNumber,
                newTitle: this.newTitle,
                newId: this.newId,
            });
        },
        closeEstimate() {
            this.initCell();
            store.dispatch('code/setNewEstimateStatus', {
                status: false,
                number: null,
                title: null,
                id: null,
            });
            store.dispatch('projectmanager/reCalculateCCValue');
        },
        addEstimate() {
            this.cell.newNumber = this.newNumber;
            this.cell.newTitle = this.newTitle;
            this.cell.newId = this.newId;

            // Copy cell to newCell
            const newCell = JSON.parse(JSON.stringify(this.cell));
            store.dispatch('projectmanager/createProjectEstimate', {
                cell: newCell,
                vue: this,
            });

            // Remove new estimate line
            store.dispatch('code/setNewEstimateStatus', {
                status: false,
                number: null,
                title: null,
                id: null,
            });
            this.initCell();
        },

        calculateTotal: debounce(function(e) {
            this.cell.total = (
                (Number(this.cell.materialCostPer) +
                    Number(this.cell.laborCostPer) +
                    Number(this.cell.equipmentCostPer) +
                    Number(this.cell.subcontractorCostPer)) *
                Number(this.cell.quantity)
            ).toFixed(2);

            // Update the total of construction check
            store.dispatch('projectmanager/reCalculateCCValue');
            const total =
                store.state.projectmanager.constructionCheck +
                Number(this.cell.total);
            store.dispatch('projectmanager/setContructionCheckValue', {
                total: total,
            });
        }, 300),
    },
};
</script>

<style lang="css" scoped>
.new-estimates-cell {
  background: #FFE8AC;
  height: 64px;
  margin: 0;

  font-family: Montserrat;
  font-style: normal;
}

.new-estimates-cell input, .new-estimates-cell select {
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
}

.width-100-with-img {
  width: calc(100% - 35px) !important;
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

.left-yellow-outline {
  width: 4px;
  background:#FE912C;;
  height: 100%;

  float: left;
  position: absolute;
  left: 0;
}

.btn-estimate-action  {
  color: #061831;
  font-size: 20px;
  margin-left: 7px;
}

.btn-estimate-action:hover  {
  color: #FB922F;
  cursor: pointer;
}
</style>
