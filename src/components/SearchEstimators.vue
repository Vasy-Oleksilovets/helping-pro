<template>
  <div class="admin">
        <div class="container text-center">
            <h2 class="text-dark mt-4 font-weight-bold">Search Estimators</h2>
            <h5 class="text-dark">Area of Expertise <span style="color:red">*</span></h5>
            <form id="search" @submit="checkForm">
                <select class="area-expertise" tabindex=14 @change="onExpertiseCategoryChange" id="expertiseCategory" v-model="expertiseCategory" name="expertiseCategory">
                <option v-for="category in expertiseList" :value="category.id" v-text="category.name" :key="category.id + '1'"></option>
                </select>
                <br/>
                <div v-show="showExpertiseSubcategory">
                <span class="mt-3">(Press Ctrl key to select more than one)</span><br/>
                <select tabindex=15 multiple v-show="showExpertiseSubcategory" id="expertiseSubcategoryId" v-model="estimatorSearch.expertiseSubcategoryId" name="expertiseSubcategoryId">
                    <option v-for="subcategory in expertiseSubList" :value="subcategory.id" v-text="subcategory.name" :key="subcategory.id + '1'"></option>
                </select>
                </div>
                <hr/>
                <h5 class="text-dark">Project Experience <span style="color:red">*</span> (Press Ctrl key to select more than one)</h5>
                <select tabindex=17 size="10" id="projectExperience" multiple v-model="estimatorSearch.buildingTypeId" name="projectExperience">
                    <option id="ALL">ALL</option>
                    <optgroup v-for="category in categories" :label="category.title" :key="category.title + '1'">
                    <option v-for="buildingType in category.buildingTypes" :value="buildingType.id" v-text="buildingType.name" :key="buildingType.id + '1'"></option>
                </optgroup>
                </select>
                <br/>
                <b-btn :disabled="btnClicked" variant="success" type="submit">Search</b-btn>
            </form>
            <hr/>
        <div class="container text-left alert-danger">
            <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                <li v-for="(error, idx) in errors" :key="idx">{{ error }}</li>
                </ul>
            </p>
        </div>
          <p></p>
        </div>
	</div>
</template>

<script>

  import AdminProxy from '@/proxies/AdminProxy.js';
  import EstimatorProxy from '@/proxies/EstimatorProxy.js';

  export default {
    name: "estimate",
    data() {
      return {
        errors: [],
        estimatorList: [],
        expertiseList: [],
        categories: [],
        expertiseSubList: [],
        estimatorSearchObj: null,
        showExpertiseSubcategory: false,
        expertiseCategory:'',
        expertiseSubcategory:[],
        btnClicked: false,
        estimatorSearch: {
            expertiseSubcategoryId:[],
            buildingTypeId:[],
        },
        items: [
          {
            text: 'Admin Home',
            to: { name: 'adminHome' }
          },
          {
            text: 'Cost Estimators',
            active: true
          }
        ],
      }
    },
    methods: {
      checkForm: function (e) {
        this.errors = [];
        if (!this.estimatorSearch.expertiseSubcategoryId || this.estimatorSearch.expertiseSubcategoryId.length == 0) {
            this.errors.push('Area of expertise required.');
        }
        if (!this.estimatorSearch.buildingTypeId || this.estimatorSearch.buildingTypeId.length == 0) {
            this.errors.push('Project experience required.');
        }

        if(this.errors.length == 0){
            //this.btnClicked = true;
            this.getEstimators(e);
        }
        e.preventDefault();
      },
        getEstimatorSearchObjects(){
            new AdminProxy().getEstimatorSearchObjects().then((response) => {
                this.estimatorSearchObj = response;
                if(this.estimatorSearchObj != null){
                    this.expertiseList = this.estimatorSearchObj.expertiseCategoryList;
                    this.categories = this.estimatorSearchObj.buildingTypes;
                }
            })
            .catch(error => {
                this.errors.push(error);
            })
        },
        onExpertiseCategoryChange(event){
            var val = event.target.value;
            if(val != null && val != ''){
                this.setExpertiseSubList(val);
            }else{
                this.showExpertiseSubcategory = false;
            }
        },
        setExpertiseSubList(val){
            if(val != null && val != ''){
                new EstimatorProxy().getExpertiseSubcategories(val).then((response) => {
                    this.expertiseSubList = response.data
                    this.showExpertiseSubcategory = true;
                }).catch((error) => {

                });
            }else{
                this.showExpertiseSubcategory = false;
            }
        },
        getEstimators(){
            var params = new URLSearchParams();
            params.append('buildingTypeId', this.estimatorSearch.buildingTypeId);
            params.append('expertiseSubcategoryId', this.estimatorSearch.expertiseSubcategoryId);
            new AdminProxy().getEstimatorsSearch(params).then((response) => {
                this.estimatorList = response;
                this.$emit('setEstimatorList', this.estimatorList)
            })
            .catch(error => {
                this.errors.push(error)
            })
        }
    },
    components: {

    },
    created() {
      this.getEstimatorSearchObjects()
    }
  }
</script>


<style scoped>
    .area-expertise {
        padding: 10px 20px;
        border-color: grey;
        border-radius: 3px;
    }
</style>
