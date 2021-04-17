<template>
  <div class="estimate">
		<Navigation/>
		<main class="bg-img content">
            <hr style="background-color:#ed6d3a; height:4px"/>
			<!--<section class="Mainbaner">
				<div class="slideTitle text-center text-white">
					<div class="container">
						<h1>Estimate Construction Check <span>&trade;</span></h1>
						<p>Improve Cost Certainty</p>
					</div>
				</div>
				<div class="fullBar">
					<div class="container">
						<b-carousel id="carousel-1" v-model="slide" :interval="4000" controls background="#ed6d3a">
							<b-carousel-slide>
								<div slot="img" class="singlSlide">
									<div class="slideContent d-flex align-items-center justify-content-center">
										<h3><span class="Slidenmbr">02</span>IMPROVED OVERSIGHT & SELECTION:</h3>
										<div class="slideRight">
											<p>Enter into genuine</p>
											<p>construction relationships</p>
										</div>
									</div>
								</div>
							</b-carousel-slide>
							<b-carousel-slide>
								<div slot="img" class="singlSlide">
									<div class="slideContent d-flex align-items-center justify-content-center">
										<h3><span class="Slidenmbr">03</span>IMPROVED OVERSIGHT & SELECTION:</h3>
										<div class="slideRight">
											<p>Enter into genuine</p>
											<p>construction relationships</p>
										</div>
									</div>
								</div>
							</b-carousel-slide>
						</b-carousel>
					</div>
				</div>
			</section> -->
			<section class="secWhite getStarted">
                <div class="container text-left">
                    <div class="indented">
                        <h3 style="color:#ed6d3a;">Select Category</h3>
                        <strong style="position: fixed">Category One</strong>
                        <div v-for = "category in categories" :key="category.id + '1'">
                            <div v-if="category.buildingCategory.id == 1">
                                <input type="radio" :id="category.id" :value="category.id" v-model="subcategory">
                                <label :for="category.id"> {{category.name}}</label>
                            </div>
                        </div>
                        <strong>Category Two</strong>
                        <div v-for = "category in categories" :key="category.id + '2'">
                            <div v-if="category.buildingCategory.id == 2">
                                <input type="radio" :id="category.id" :value="category.id" v-model="subcategory">
                                <label :for="category.id"> {{category.name}}</label>
                            </div>
                        </div>    
                        <strong>Category Three</strong>
                        <div v-for = "category in categories" :key="category.id + '3'">
                            <div v-if="category.buildingCategory.id == 3">
                                <input type="radio" :id="category.id" :value="category.id" v-model="subcategory">
                                <label :for="category.id"> {{category.name}}</label>
                            </div>
                        </div>  
                    </div>                                
                </div>
                <div class="container text-left">
                    <h3 style="color:#ed6d3a;">Private or Government Project</h3>
                    <div>
                        <input type="radio" id="projectTypeP" value="P" v-model="projectType">
                        <label for="projectTypeP">Private</label>
                    </div>
                    <div>
                        <input type="radio" id="projectTypeG" value="G" v-model="projectType">
                        <label for="projectTypeG">Government</label>
                    </div>                    
                </div>
                <div class="container text-left">
                    <h3 style="color:#ed6d3a;">Budget in U.S. Dollars</h3>
                    <div>
                        <input id="budget" v-model="budget">
                        <label for="budget"> (numbers only)</label>
                    </div>                 
                </div> 
                <div class="container text-left">
                    <h3 style="color:#ed6d3a;">Phases to Estimate</h3>
                    <input type="checkbox" id="SD" value="SD" v-model="phases">
                    <label for="SD">Schematic Design</label><br/>
                    <input type="checkbox" id="DD" value="DD" v-model="phases">
                    <label for="DD">Design Development</label><br/>
                    <input type="checkbox" id="CD" value="CD" v-model="phases">
                    <label for="CD">Construction Documents</label><br/>
                    <input type="checkbox" id="BID" value="BID" v-model="phases">
                    <label for="BID">Bid</label><br/>
                </div>                
                <div class="container text-left alert-danger">
                    <p v-if="errors.length">
                        <b>Please correct the following error(s):</b>
                        <ul>
                        <li v-for="(error, idx) in errors" :key="idx">{{ error }}</li>
                        </ul>
                    </p> 
                </div>                   
                <div class="container text-left"> 
                    <br/>
                    <button @click="checkForm" class="btn btn-success">Get Estimate</button>              
                </div>
                <div class="container text-left" v-if="showResponse == true"> 
                    <br/>
                    <!-- show estimate results -->
                    <div v-if="projectEstimate !=null">
                        <div v-for = "phaseEstimate in projectEstimate.phaseEstimateList" :key="phaseEstimate.phase.id + 'SD'">
                            <div v-if="phaseEstimate.phase.shortName == 'SD'">
                                <span><strong>Schematic Design:</strong> {{phaseEstimate.feeString}}</span> 
                            </div> 
                        </div>
                        <div v-for = "phaseEstimate in projectEstimate.phaseEstimateList" :key="phaseEstimate.phase.id + 'DD'">
                            <div v-if="phaseEstimate.phase.shortName == 'DD'">
                                <span><strong>Design Documents:</strong> {{phaseEstimate.feeString}}</span> 
                            </div>
                        </div>
                        <div v-for = "phaseEstimate in projectEstimate.phaseEstimateList" :key="phaseEstimate.phase.id + 'CD'">
                            <div v-if="phaseEstimate.phase.shortName == 'CD'">
                                <span><strong>Construction Documents:</strong> {{phaseEstimate.feeString}}</span> 
                            </div>
                        </div>
                        <div v-for = "phaseEstimate in projectEstimate.phaseEstimateList" :key="phaseEstimate.phase.id + 'BID'">
                            <div v-if="phaseEstimate.phase.shortName == 'BID'">
                                <span><strong>Bid Documents:</strong> {{phaseEstimate.feeString}}</span> 
                            </div>    
                        </div> 

                        <br/>
                        <button @click="clearEstimate()" class="btn btn-success">Clear</button>                                                                          
                    </div>
                </div>
			</section>
		</main>
		<footer>
			<div class="container text-center">
				<a href="#" title="">
					<img src="~@/assets/img/logoWhite.png" alt="">
				</a>
				<p>Copyright, 2019 Construction Check. All Rights Reserved.</p>
			</div>
		</footer>       
	</div> 
</template>

<script>
	
	import EstimateService from '@/api-services/estimate.service';
	import Navigation from '../components/Navigation.vue';

  export default {
    name: "estimate",
    data() {
      return {
        slide: 0,
        sliding: null,
        categories: [],
        subcategory: null,
        categories: null,
        budget:null,
        projectType: "P",
        errors: [],
        showResponse:false,
        phases: [],
        projectEstimate: null
      }
    },
    methods: {
        onSlideStart(slide) {
            this.sliding = true;
        },
        onSlideEnd(slide) {
            this.sliding = false;
        },
        isNumeric: function (n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        },
        checkForm: function (e) {
            var noErrors = true;
            this.errors = [];

            // check budget for numbers only
            if(!this.isNumeric(this.budget)){
                this.errors.push('Budget requires numbers only.');
                noErrors = false;
            }
            if (!this.budget) {
                this.errors.push('Budget required.');
                noErrors = false;
            }
            if (!this.subcategory) {
                this.errors.push('Category required.');
                noErrors = false;
            }
            if (!this.phases.length > 0) {
                this.errors.push('Select at least one phase to estimate.');
                noErrors = false;
            }

            if(noErrors){
                this.getEstimate();
                return true;
            }else{
                e.preventDefault();
            }
        },
        getEstimate: function (e){
            this.showResponse = false;
            var params = new URLSearchParams();
            params.append('subcategory', this.subcategory);
            params.append('projectType', this.projectType);
            params.append('budget', this.budget);
            params.append('phases', this.phases);

            EstimateService.getEstimate(params)
            .then(response => {
                // JSON responses are automatically parsed.
                this.projectEstimate = response.data;
                this.showResponse = true;
            })
            .catch(e => {
                this.errors.push(e)
            })            
        },
        clearEstimate(){
            this.showResponse = false;
        },    
	},
    components: { 
    'Navigation': Navigation 
    },
    created() {
        EstimateService.getAllBuildingSubcategories().then((response) => {
            this.categories = response.data
        }).catch((error) => {
        });
    }
  }
</script>
<style >
    @import "../assets/css/style.css";
    label{padding-left: 5px};
    h3{color: #ed6d3a;}
    .bold{font-weight: bold}
</style>