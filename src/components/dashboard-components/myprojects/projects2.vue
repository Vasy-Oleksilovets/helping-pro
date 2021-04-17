<template>
  <div>
    <DashHeader :role="role" :profile="profile" />
    <!-- test -->
    <div class="sheet">
        <b-modal id="filter-modal" centered title="BootstrapVue">
        <span class="modal-title">Filter Projects</span>
          <hr />
          <span  class="collaspe-title" v-b-toggle.collapse-1>      <i class="fa fa-minus plus-icon when-closed" ></i>
          <i class="fa fa-plus plus-icon when-open" ></i>Date Received</span>
          <hr />
          <b-collapse id="collapse-1">
            <b-form-group v-slot="{ ariaDescribedby }" class="filter-radio" v-model="filter.date">
              <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" class="textfeild" name="some-radios" value="A"><span class="radio-label">New</span> </b-form-radio>
              <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" class="textfeild" name="some-radios" value="B"><span class="radio-label">Claim</span></b-form-radio>
              <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" class="textfeild" name="some-radios" value="C"><span class="radio-label">Assign</span></b-form-radio>
            </b-form-group>
          </b-collapse>
        <span  class="collaspe-title" v-b-toggle.collapse-2>      
          <i class="fa fa-minus plus-icon when-closed" ></i>
          <i class="fa fa-plus plus-icon when-open" ></i>Status</span>
          <hr />
          <b-collapse id="collapse-2">
            <b-form-group v-slot="{ ariaDescribedby }" class="filter-radio" v-model="filter.date">
              <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" class="textfeild" name="some-radios" value="A"><span class="radio-label">New</span> </b-form-radio>
              <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" class="textfeild" name="some-radios" value="B"><span class="radio-label">Claim</span></b-form-radio>
              <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" class="textfeild" name="some-radios" value="C"><span class="radio-label">Assign</span></b-form-radio>
            </b-form-group>
            </b-collapse>
                <span  class="collaspe-title" v-b-toggle.collapse-3>      
                  <i class="fa fa-minus plus-icon when-closed" ></i>
                  <i class="fa fa-plus plus-icon when-open" ></i>Action</span>
                  <hr />
                  <b-collapse id="collapse-3">
                    <b-form-group v-slot="{ ariaDescribedby }" class="filter-radio" v-model="filter.date">
                    <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" class="textfeild" name="some-radios" value="A"><span class="radio-label">New</span> </b-form-radio>
                    <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" class="textfeild" name="some-radios" value="B"><span class="radio-label">Claim</span></b-form-radio>
                    <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" class="textfeild" name="some-radios" value="C"><span class="radio-label">Assign</span></b-form-radio>
                  </b-form-group>
                </b-collapse>
            <template #modal-footer>
              <b-button variant="primary" class="float-right cancel-btn" @click="$bvModal.hide('filter-modal')">
                <span class="cancel-label">Cancel</span>
              </b-button>
              <button class=" btn-save"><span class="btn-label">Done</span></button>
            </template>
        </b-modal>
        <div class="head d-flex justify-content-between">
            <div class="d-flex">
                <span class="count-title"> Showing 100 of 100 </span>
                <div class="" style="display:inline-block">
                    <i class="fa fa-search search"></i>
                    <input type="text" name="search" placeholder="search" v-model="filter.search" class=" textarea-bg">
                </div>
            </div>
            <div class="d-flex" style="position: relative">
                <button class="btn filter" v-b-modal.filter-modal><i class="fa fa-filter filter-icon"></i>Filter</button>
                <div @click="toggleColumnPanel" style="border: solid 1px #f0f1f7; padding: 9px 16px; border-radius: 8px; cursor: pointer; position: relative">
                    <span style="margin-right: 16px; color: #4b506d; font-family: Montserrat;font-size: 14px;font-weight: normal;font-stretch: normal;font-style: normal;line-height: 1.43;letter-spacing: 0.3px;text-align: left;">Columns</span>
                    <i class="fa fa-caret-down" style="color: #7c7e89;"></i>
                </div>
                <div :class="isToggleColumnPanel ? 'd-block' : 'd-none'" style="position: absolute; left: 81px; top: 47px; z-index: 1000; width: 214px; border: solid 0.5px #dfe0eb; background-color: white; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);border-radius: 4px;">
                    <div v-for="(column, index) in columnDefs" @click="toggleColumn(index)" style="width: 214px; height: 46px; padding: 13px 16px; cursor: pointer" :key="index">
                        <span style="font-family: Montserrat; font-size: 14px; font-weight: 600; font-stretch: normal; font-style: normal; line-height: 1.43; letter-spacing: 0.2px; color: #0071e3;display: flex; justify-content: space-between" :style="columnsStatus[index] ? 'color: #0071e3' : 'color: #7c7e89'">{{column.field}}<i v-if="columnsStatus[index]" class="fa fa-check" ></i></span>
                    </div>
                </div>
                <button class=" btn-bg"><span class="btn-label"> Create Project</span></button>
             </div>
        </div>
        <ag-grid-vue style="width: 100%; height: 80%;" class="ag-theme-alpine" id="myGrid" @rowClicked="rowClicked" :gridOptions="gridOptions" :columnDefs="columnDefs_final" :defaultColDef="defaultColDef" :rowData="rowData" :pagination="true" :key="JSON.stringify(columnDefs_final)"></ag-grid-vue>
    </div>
  </div>
</template>

<script>
import DashHeader from "../dash-header";
import ProjectProgress from "./projectprogress";
import ClientCreateProjectManager from "./climanagercreatepro";
import { AgGridVue } from "ag-grid-vue";
import AccountProxy from '@/proxies/AccountProxy.js';

export default {
    name: "ProjectManager",
    props: ["role", "profile"],
    components: {
        AgGridVue,

        DashHeader,
        ProjectProgress,
        ClientCreateProjectManager,
    },
    data() {
        return {
            filter: {
                type: '',
                date: '',
                status: '',
                search: '',
            },

            gridOptions: null,
            gridApi: null,
            columnApi: null,
            columnDefs: null,
            columnDefs_final: null,
            defaultColDef: null,
            // modules: AllCommunityModules,

            rowData: null,
            isToggleColumnPanel: false,
            columnsStatus: []
        };
    },
    beforeMount() {
        this.gridOptions = {};

        this.columnDefs = [{
                field: "Project Name",
            },
            {
                field: "Estimate Type",
                cellClass: 'my-class',

            },
            {
                field: "Project Phase",
                cellClass: 'my-class',

            },
            {
                field: "Office",
            },
            {
                field: "City",
            },
            {
                field: "City Manager",
            },
            {
                field: "Project Manager",

            },
            {
                field: "Type",
            },
            {
                field: "Status",
                cellStyle: params => {
                    if (params.value === 'Pending') {
                        return {
                            color: ' #f88d2b ',
                            'font-weight': '600'
                        };
                    }
                    if (params.value === 'Declined') {
                        //mark police cells as red
                        return {
                            color: ' #f05050',
                            'font-weight': '600'
                        };
                    }
                    if (params.value === 'Accepted') {
                        return {
                            color: ' #29cc97'
                        };
                    }
                    if (params.value === 'Draft') {
                        return {
                            color: '  #252733',
                            'font-weight': '600'
                        };
                    }
                    return null;
                }
            },

            {
                field: "Action",
                cellStyle: params => {
                    if (params.value === 'Edit') {
                        return {
                            width: '65px',
                            maxWidth: '65px',
                            height: '28px',
                            ' margin-top':'10px',
                            //   margin: '0 0 0 977px',
                            padding: '7px 7px 5px 5px',
                            //   margin: '5px 0 5px 7px',
                            'font-family': 'Montserrat',
                            'font-size': '11px',
                            'font-weight': 'bold',
                            'font-stretch': 'normal',
                            'font-style': 'normal',
                            'line-height': 'normal',
                            'letter-spacing':' 0.5px',
                            'text-align': 'center',
                            'border': 'solid 1px #0071e3',
                            ' border-radius': '100px',
                            'background': 'none ',
                            color:' #0071e3',
                        };
                    }
                    if (params.value === 'APPROVE') {
                        //mark police cells as red
                        return {
                            width: '83px',
                            maxWidth: '83px',
                            height: '28px',
                            ' margin-top':'10px',
                            //   margin: '0 0 0 977px',
                            padding: '7px 7px 5px 5px',
                            //   margin: '5px 0 5px 7px',
                            'font-family': 'Montserrat',
                            'font-size': '11px',
                            'font-weight': 'bold',
                            'font-stretch': 'normal',
                            'font-style': 'normal',
                            'line-height': 'normal',
                            'letter-spacing':' 0.5px',
                            'text-align': 'center',
                            

                            ' border-radius': '100px',
                            'background-color': '#0071e3',
                            color:' #ffffff',
                        };
                    }
                    return null;
                }
            },
        ];
        this.defaultColDef = {
            resizable: true
        };

        this.rowData = [{
                "Project Name": "Axiom Hospital",
                "Estimate Type": "Estimate",
                "Project Phase": "N/a",
                Office: "N/a",
                City: "Atlanta",
                "City Manager": "Allan N",
                "Project Manager": "George",
                Type: "Hospital",
                Status: "Pending",
                Action: "APPROVE",
            },
            {
                "Project Name": "Axiom Hospital",
                "Estimate Type": "Estimate",
                "Project Phase": "N/a",
                Office: "N/a",
                City: "Atlanta",
                "City Manager": "Allan N",
                "Project Manager": "George",
                Type: "Hospital",
                Status: "Pending",
                Action: "Edit",
            },
            {
                "Project Name": "Axiom Hospital",
                "Estimate Type": "Estimate",
                "Project Phase": "N/a",
                Office: "N/a",
                City: "Atlanta",
                "City Manager": "Allan N",
                "Project Manager": "George",
                Type: "Hospital",
                Status: "Pending",
                Action: "APPROVE",
            },
            {
                "Project Name": "Axiom Hospital",
                "Estimate Type": "Estimate",
                "Project Phase": "N/a",
                Office: "N/a",
                City: "Atlanta",
                "City Manager": "Allan N",
                "Project Manager": "George",
                Type: "Hospital",
                Status: "Accepted",
                Action: "Edit",
            },
            {
                "Project Name": "Axiom Hospital",
                "Estimate Type": "Estimate",
                "Project Phase": "N/a",
                Office: "N/a",
                City: "Atlanta",
                "City Manager": "Allan N",
                "Project Manager": "George",
                Type: "Hospital",
                Status: "Declined",
                Action: "Edit",
            },
            {
                "Project Name": "Axiom Hospital",
                "Estimate Type": "Estimate",
                "Project Phase": "N/a",
                Office: "N/a",
                City: "Atlanta",
                "City Manager": "Allan N",
                "Project Manager": "George",
                Type: "Hospital",
                Status: "Pending",
                Action: "Edit",
            },
            {
                "Project Name": "Axiom Hospital",
                "Estimate Type": "Estimate",
                "Project Phase": "N/a",
                Office: "N/a",
                City: "Atlanta",
                "City Manager": "Allan N",
                "Project Manager": "George",
                Type: "Hospital",
                Status: "Accepted",
                Action: "Edit",
            },
            {
                "Project Name": "Axiom Hospital",
                "Estimate Type": "Estimate",
                "Project Phase": "N/a",
                Office: "N/a",
                City: "Atlanta",
                "City Manager": "Allan N",
                "Project Manager": "George",
                Type: "Hospital",
                Status: "Canceled",
                Action: "Edit",
            },
            {
                "Project Name": "Axiom Hospital",
                "Estimate Type": "Estimate",
                "Project Phase": "N/a",
                Office: "N/a",
                City: "Atlanta",
                "City Manager": "Allan N",
                "Project Manager": "George",
                Type: "Hospital",
                Status: "Draft",
                Action: "Edit",
            },
            {
                "Project Name": "Axiom Hospital",
                "Estimate Type": "Estimate",
                "Project Phase": "N/a",
                Office: "N/a",
                City: "Atlanta",
                "City Manager": "Allan N",
                "Project Manager": "George",
                Type: "Hospital",
                Status: "Approved",
                Action: "Edit",
            },
        ];
        for (let i = 0; i < this.columnDefs.length; i++) {
            this.columnsStatus.push(true);
        }
        this.columnDefs_final = [...this.columnDefs];
    },
    methods: {
        rowClicked() {
            console.log(this.columnDefs);
            // this.columnDefs.splice(1,1);
            alert('row cicked');

        },
        getAccountInfo: function() {
            var params = new URLSearchParams();
            new AccountProxy()
                .getAccountProjects(params)
                .then(response => {
                if (response.status == '200') {
                    // this.projects = response.data;
                    console.log(response.data);
                    console.log(JSON.stringify(response.data));
                }
                })
                .catch(error => {
                this.errors.push(error);
                });
        },
        toggleColumnPanel() {
             this.isToggleColumnPanel = !this.isToggleColumnPanel;
        },
        toggleColumn(index) {
            this.columnsStatus = [...this.columnsStatus];
            this.columnsStatus[index] = !this.columnsStatus[index];
            this.columnDefs_final = [];
            for (let i = 0; i < this.columnDefs.length; i++) {
                const e = this.columnDefs[i];
                if (this.columnsStatus[i]) {
                    this.columnDefs_final.push(e)
                }
            }
            setTimeout(() => {
                this.gridApi = this.gridOptions.api;
                this.gridApi.sizeColumnsToFit();  
            }, 0)
        }
    },
    created() {
        this.getAccountInfo();
    },
    mounted() {
        this.gridApi = this.gridOptions.api;
        this.gridColumnApi = this.gridOptions.columnApi;
        this.gridApi.sizeColumnsToFit();  
    },
    computed: {
    },
};

</script>

<style scoped>
.sheet {
    width: 97%;
    height: 700px;
    margin: 20px;
    padding: 1.7rem;
    border-radius: 8px;
    border: solid 1px #dfe0eb;
    background-color: #ffffff;
}

.project {
  font-size: 1em;
  color: black;
  font-weight: 500;
}

.count-title {
  width: 197px;
  height: 23px;
  margin: 8px 17px 9px 0;
  font-family: Montserrat;
  font-size: 19px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.4px;
  text-align: left;
  color: #252733;
}

.collaspe-item {
  height: 17px;
  flex-grow: 0;
  font-family: Montserrat;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.2px;
  text-align: left;
  color: #7c7e89;
}

.btn-label {
  width: 107px;
  height: 20px;
  font-family: Montserrat;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: 0.2px;
  text-align: center;
  color: #ffffff;
}

.textarea-bg {
  width: 255px;
  height: 40px;
  padding: 10px 12px;
  border-radius: 0px 8px 8px 0px;
  border: solid 1px #f0f1f7;
  border-left-style: none;
  border-left-width: 0;
  background-color: #fcfdfe;
  display: inline-block;
}

.search {
  border-radius: 8px 0px 0px 8px;
  padding: 12px 12px;
  border: solid 1px #f0f1f7;
  border-right-style: none;
  border-right-width: 0;
  background-color: #ffffff;
}

.filter {
  font-family: Montserrat;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: 0.2px;
  text-align: left;
  color: #4b506d;
}

.Vector {
  width: 12px;
  height: 12px;
  background-color: #c5c7cd;
}

.btn-bg {
  width: 155px;
  height: 40px;
  margin: 0 0 0 19px;
  padding: 11px 24px 9px;
  border-radius: 8px;
  background-color: #0071e3;
  border: none;
}

.btn-label {
  width: 107px;
  height: 20px;
  font-family: Montserrat;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: 0.2px;
  text-align: center;
  color: #ffffff;
}

.dropdown-label {
  width: 150px;
  height: 20px;
  margin: 0 16px 0 0;
  padding: 1px 0;
  font-family: Montserrat;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: 0.2px;
  text-align: left;
  color: #0071e3 !important;
}

.filter-projects {
  width: 482px;
  height: 29px;
  font-family: Montserrat;
  font-size: 24px;
  margin: 32px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.3px;
  text-align: left;
  color: #252733;
}

hr {
  margin-top: 0rem;
  margin-bottom: 0rem;
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.textfeild {
    width: 48px;
    height: 20px;
    flex-grow: 0;
    margin: 3px 112.1px 0 13.3px;
    font-family: Montserrat;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.43;
    letter-spacing: 0.3px;
    text-align: left;
    color: #252733;
    margin-bottom: 1rem;
}

.head {
    margin-bottom: 30px;

}

.filter-icon {
  margin-right: 10px;
}

.plus-icon{
  height: 24px;
  margin-right: 20px;
  padding: 7px 7px 19px 7px;
  border-radius: 8px;
  background-color: #f0f1f7;
  color: #7c7e89;
}
.filter-radio{
  padding-left: 36px;
  padding-top: 8px;
}
.cancel-label{
  width: 67px;
  height: 20px;
  font-family: Montserrat;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: 0.2px;
  text-align: center;
  color: #7c7e89;
}

.cancel-btn{
  width: 67px;
  height: 40px;
  padding: 10px 0;
}

.btn-save{
  width: 94px;
  padding: 11px 24px 9px;
  border-radius: 8px;
  border: none;
  background-color: #0071e3;
  margin: 27px 32px 27px 17px;
}

.check{
  margin-left: 8px;
  color: #0071e3;
}

.radio-label{
  width: 33px;
  height: 20px;
  margin: 0 5px 15px 14px;
  font-family: Montserrat;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: 0.3px;
  text-align: left;
  color: #252733;
  font-weight: 500;
}

.dropdown-columns{
  border-radius: 8px;
  border: solid 1px #f0f1f7;
  background-color: #fcfdfe;
}

.collapsed > .when-closed,
:not(.collapsed) > .when-open {
  display: none;
}

.collaspe-title {
    display: block;
    padding: 1rem 2.5rem;
}

.collaspe-title:focus {
  outline: none;  
}

.modal-title {
    font-family: Montserrat;
    font-size: 24px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.3px;
    text-align: left;
    color: #252733;
    padding: 2.1rem;
    display: block;
}
</style>

<style>
.modal-footer{
    background:none !important;
}
.ag-theme-alpine .ag-ltr .ag-cell {
  /* width: 120px;
  height: 20px; */
  flex-grow: 0;
  font-family: Montserrat;
  /* font-size: 14px; */
  font-weight: 600  !important;
  font-stretch: normal;
  font-style: normal;
  /* line-height: 1.43; */
  letter-spacing: 0.2px;
  text-align: left;
  color: #252733  ;
  background: none;
  cursor:pointer
  /* color: red; */
}

.ag-theme-alpine .ag-header-cell-label{
  font-family: Montserrat;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.2px;
  color: #7c7e89;
}

.dropdown-item{
  width: 160px;
  height: 20px;
  margin: 8px 16px 8px 16px;
  padding: 1px 0;
  font-family: Montserrat;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: 0.2px;
  text-align: left;
  color: #0071e3;
}

.form-group{
  margin-bottom: 0px;
}

.ag-theme-alpine .ag-header-cell, .ag-theme-alpine .ag-header-group-cell{
  padding-right:0 ;
}

.ag-theme-alpine .ag-ltr .ag-has-focus .ag-cell-focus:not(.ag-cell-range-selected), .ag-theme-alpine .ag-ltr .ag-context-menu-open .ag-cell-focus:not(.ag-cell-range-selected), .ag-theme-alpine .ag-ltr .ag-has-focus .ag-full-width-row.ag-row-focus .ag-cell-wrapper.ag-row-group, .ag-theme-alpine .ag-ltr .ag-cell-range-single-cell, .ag-theme-alpine .ag-ltr .ag-cell-range-single-cell.ag-cell-range-handle, .ag-theme-alpine .ag-rtl .ag-has-focus .ag-cell-focus:not(.ag-cell-range-selected), .ag-theme-alpine .ag-rtl .ag-context-menu-open .ag-cell-focus:not(.ag-cell-range-selected), .ag-theme-alpine .ag-rtl .ag-has-focus .ag-full-width-row.ag-row-focus .ag-cell-wrapper.ag-row-group, .ag-theme-alpine .ag-rtl .ag-cell-range-single-cell, .ag-theme-alpine .ag-rtl .ag-cell-range-single-cell.ag-cell-range-handle {
border:none
}
#filter-modal .close {
    display: none;
}
#filter-modal___BV_modal_content_ {
    border-radius: 12px;
}
.collapse.show {
    padding: 1rem 0;
    border-bottom: 1px solid #dfe0eb;
}
</style> 


