<template>
  <div class="costProProfile">
    <Navigation />
    <main class="bg-img content">
        <hr style="background-color:#ed6d3a; height:4px" />
        <b-breadcrumb :items="items"></b-breadcrumb>
        <section class="secWhite">
        <div class="container text-center">
            
            <b-tabs content-class="mt-3">
            <b-tab title="Profile" active>
            <div v-show="showProfileSection" id="profileSection" class="container text-left">
                <h5>Your Information</h5>
                <form v-if="estimatorProfile != null" id="saveProfile" @submit="checkForm">
                    <label for="firstName">First Name <span style="color:red">*</span></label> &nbsp;
                    <input tabindex=1 :maxlength="60" id="firstName" v-model="estimatorProfile.firstName" type="text" name="firstName"/>&nbsp;
                    <label for="emailAddress">Email <span style="color:red">*</span></label>&nbsp;
                    <span tabindex=4>{{estimatorProfile.emailAddress}}</span><br/>
                    <label for="lastName">Last Name <span style="color:red">*</span></label> &nbsp;
                    <input tabindex=2 :maxlength="60" id="lastName" v-model="estimatorProfile.lastName" type="text" name="lastName"/> &nbsp;          
                    <label for="phone">Phone Number <span style="color:red">*</span></label>&nbsp;
                    <input tabindex=3 id="phone" type="text" v-model="estimatorProfile.phoneNumber"/><br/>                       
                    <hr/>
                    <h5>Payment Address Information</h5>
                    <label for="address1">Address Line One <span style="color:red">*</span></label> &nbsp;
                    <input tabindex=6 id="address1" v-model="estimatorProfile.addressLine1" type="text" name="address1"/><br/>
                    <label for="address2">Address Line Two</label> &nbsp;
                    <input tabindex=7 id="address2" v-model="estimatorProfile.addressLine2" type="text" name="address2"/><br/>
                    <label for="city">City <span style="color:red">*</span></label> &nbsp;<input tabindex="8" id="city" v-model="estimatorProfile.city" type="text" name="city"/>&nbsp;
                    <label for="state">State <span style="color:red">*</span></label> &nbsp;
                    <select tabindex=8 id="state" v-model="estimatorProfile.state" name="state">
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="DC">District Of Columbia</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                    </select> 
                    <label for="zip">Zip Code <span style="color:red">*</span></label> &nbsp;<input tabindex=9 id="zip" v-model="estimatorProfile.zipCode" type="text" name="zip"/>&nbsp;
                    <hr/>
                    <h5>Position Applied For <span style="color:red">*</span></h5>   
                    <select tabindex=10 id="position" v-model="estimatorProfile.positionAppliedForId" name="position">
                    <option v-for="availablePosition in availablePositionList" :value="availablePosition.id" v-text="availablePosition.name" :key="availablePosition.id + '1'"></option>
                    </select>
                    <hr/>   
                    <h5>Compensation Per Hr. <span style="color:red">*</span></h5>
                    <input tabindex=11 id="compensation" v-model="estimatorProfile.compensation" type="number" name="compensation"/>
                    <hr/>  
                    <div>
                    A 4-year college or Quantity Surveying degree is an appropriate foundation for a Construction Check cost professional. 
                    The following degrees are preferred due to the analytical foundation that these individuals develop and need for performing. 
                    Preferred degrees for a Construction Check cost professional include:
                    </div> 
                    <h5>Education <span style="color:red">*</span></h5>
                    <select tabindex=12 id="education" v-model="estimatorProfile.educationTypeId" name="education">
                    <option v-for="educationOption in educationTypes" :value="educationOption.id" v-text="educationOption.name" :key="educationOption.id + '1'"></option>
                    </select>            
                    <hr/>
                    <h5>Industry Related Experience<span style="color:red">*</span></h5>
                    <select tabindex=13 id="experience" v-model="estimatorProfile.experienceYearsId" name="experience">
                    <option v-for="experienceOption in experienceYears" :value="experienceOption.id" v-text="experienceOption.name" :key="experienceOption.id + '1'"></option>
                    </select>                        
                    <hr/>
                    <h5>Area of Expertise <span style="color:red">*</span></h5>  
                    <select tabindex=14 @change="onExpertiseCategoryChange" id="expertiseCategory" v-model="estimatorProfile.expertiseCategoryId" name="expertiseCategory">
                    <option v-for="category in expertiseList" :value="category.id" v-text="category.name" :key="category.id + '1'"></option>
                    </select>
                    <br/>
                    <div v-show="showExpertiseSubcategory">
                    <span>(Press Ctrl key to select more than one)</span><br/>
                    <select tabindex=15 multiple v-show="showExpertiseSubcategory" id="expertiseSubcategory" v-model="estimatorProfile.expertiseSubcategoryId" name="expertiseSubcategory">
                        <option v-for="subcategory in expertiseSubList" :value="subcategory.id" v-text="subcategory.name" :key="subcategory.id + '1'"></option>
                    </select>   
                    </div>                     
                    <hr/> 
                    <div>
                    Certification is a formal process whereby an organization recognized by Construction Check can provide 
                    confirmation of an individual's certification. Certification differs from licensing in that licenses are 
                    permissions granted by a government entity for a person to practice within its regulatory boundaries. 
                    Certification also differs from a "certificate" that documents the successful completion of a training 
                    or education program.
                    </div>
                    <div style="color:red">You will be required to upload your certification document(s) for every certification you have.</div>  
                    <hr/>
                    <h5>Certifications & Credentials <span style="color:red">*</span> (Press Ctrl key to select more than one)</h5>
                    <select tabindex=16 size="10" id="certifications" multiple v-model="estimatorProfile.certificationId" name="certifications">
                    <optgroup v-for="certificationCategory in certificationsList" :label="certificationCategory.title" :key="certificationCategory.title + '1'">
                        <option v-for="certification in certificationCategory.certifications" :value="certification.id" v-text="certification.name" :key="certification.id + '1'"></option>
                    </optgroup>                                                                                                                                                        
                    </select>    
                    <hr/>
                    <h5>Project Experience <span style="color:red">*</span> (Press Ctrl key to select more than one)</h5>
                    <select tabindex=17 size="10" id="projectExperience" multiple v-model="estimatorProfile.buildingTypeId" name="projectExperience">
                        <optgroup v-for="category in categories" :label="category.title" :key="category.title + '1'">
                        <option v-for="buildingType in category.buildingTypes" :value="buildingType.id" v-text="buildingType.name" :key="buildingType.id + '1'"></option>
                    </optgroup>
                    </select> 
                    <br/>
                    <h5>Enter any project experience not listed above</h5>
                    <textarea tabindex=18 maxlength="400" rows="5" cols="50" id="otherProjectExperience" v-model="estimatorProfile.otherProjectExperience" name="otherProjectExperience"/>
                    <hr/>    
                    <b-btn :disabled="btnClicked" variant="success" type="submit">Update</b-btn>                                                                           
                </form>
            </div> 
            </b-tab>
            <b-tab title="Attachments">
                <div v-if="estimatorProfile != null" id="documentSection" class="container text-left">
                    <h5>Certifications</h5>
                    <div v-for="document in estimatorProfile.estimatorDocuments" :key="document.id">
                        Uploaded: {{document.fileName}} <a href="javascript:;" v-on:click="deleteFile(document.id)">Delete</a>
                    </div><br/>
                    <div>
                        <div>
                            <label>File
                                <input type="file" id="uploadFile" ref="uploadFile" v-on:change="handleFileUpload()"/><br/><br/>
                            </label>
                            <div><button v-on:click="submitFile()">Submit</button></div>
                        </div>
                    </div>                      
                </div>
            </b-tab>            
            <div v-if="showResponse">
                <h5>{{responseMessage}}</h5>               
            </div>
            <div class="container text-left alert-danger">
                <p v-if="errors.length">
                    <b>Please correct the following error(s):</b>
                    <ul>
                    <li v-for="(error, idx) in errors" :key="idx">{{ error }}</li>
                    </ul>
                </p> 
            </div>         
            <hr />   
        </b-tabs>                                
        </div>
        </section>
    </main>
    <footer>
      <div class="container text-center">
        <a href="#" title="">
          <img src="~@/assets/img/logoWhite.png" alt="" />
        </a>
        <p>Copyright, 2019 Construction Check. All Rights Reserved.</p>
      </div>
    </footer>    
  </div>
</template>

<script>
import Navigation from "../../components/Navigation.vue";
import EstimatorProxy from '@/proxies/EstimatorProxy.js';

export default {
  name: "estimate",
  data() {
    return {
        errors: [],
        btnClicked: false,
        showResponse: false,
        estimatorProfile: null,
        firstName: null,
        username: null,
        userCode: null,
        file: '',
        document:null,
        estimatorRegistrationObj: null,
        availablePosition:'',
        availablePositionList:[], 
        expertiseCategory: '',
        expertiseList: [],        
        expertiseSubcategory:[],
        showExpertiseSubcategory: true, 
        expertiseSubList:[],   
        buildingType: '',
        category: '',
        certification: '',
        showProfileSection: true,
        showDocumentSection: false, 
        document:null,
        items: [
          {
            text: 'Cost Pro Home',
            to: { name: 'costProHome' }
          },
          {
            text: 'Edit Profile',
            active: true
          }
        ],               
    };
  },
  methods: {
    checkForm: function (e) {
        this.errors = [];
        var validEmail = false;
        var validConfirm = false;

        if (!this.estimatorProfile.firstName) {
            this.errors.push('First name required.');
        }
        if (!this.estimatorProfile.lastName) {
            this.errors.push('Last name required.');
        }
    
        if (!this.estimatorProfile.phoneNumber) {
            this.errors.push('Phone number is required.');
        } else if(!this.validatePhoneNumber(this.estimatorProfile.phoneNumber)){
            this.errors.push('Phone number should be in format (xxx-xxx-xxxx).');
        }   
       
        if (!this.estimatorProfile.addressLine1) {
            this.errors.push('Address line one required.');
        }
        if (!this.estimatorProfile.city) {
            this.errors.push('City required.');
        }
        if (!this.estimatorProfile.state) {
            this.errors.push('State required.');
        }
        if (!this.estimatorProfile.zipCode) {
            this.errors.push('Zip code required.');
        }
        if (!this.estimatorProfile.positionAppliedForId) {
            this.errors.push('Position applied for required.');
        }
        if (!this.estimatorProfile.compensation) {
            this.errors.push('Compensation per hour required.');
        }                
        if (!this.estimatorProfile.educationTypeId) {
            this.errors.push('Education required.');
        }  
        if (!this.estimatorProfile.experienceYearsId) {
            this.errors.push('Industry related experience required.');
        }
        if (!this.estimatorProfile.expertiseSubcategoryId || this.estimatorProfile.expertiseSubcategoryId.length == 0) {
            this.errors.push('Area of expertise required.');
        }  
        if (!this.estimatorProfile.certificationId || this.estimatorProfile.certificationId.length == 0) {
            this.errors.push('Certifications required.');
        }  
        if (!this.estimatorProfile.buildingTypeId || this.estimatorProfile.buildingTypeId.length == 0) {
            this.errors.push('Project experience required.');
        }                                              

        if(this.errors.length == 0){
            this.btnClicked = true;
            this.updateEstimatorProfile();
        }
        e.preventDefault();
    },
    getEstimatorRegistrationObj(){
        new EstimatorProxy().getEstimatorRegistrationObjects().then((response) => {
            this.estimatorRegistrationObj = response;
            if(this.estimatorRegistrationObj != null){
                this.availablePositionList = this.estimatorRegistrationObj.availablePositionList;
                this.expertiseList = this.estimatorRegistrationObj.expertiseCategoryList;
                this.categories = this.estimatorRegistrationObj.buildingTypes;
                this.educationTypes = this.estimatorRegistrationObj.educationTypes;
                this.experienceYears = this.estimatorRegistrationObj.experienceYears;
                this.certificationsList = this.estimatorRegistrationObj.certifications;

                this.getProfileInfo();
            }
        }).catch((error) => {
            console.log("ERROR!");
        });
    },    
    getProfileInfo() {
      new EstimatorProxy().getProfileInfo()
        .then(response => {
          // JSON responses are automatically parsed.
          if (response.status == "200") {
            var errorCode = response.data.errorCode;
            if (errorCode != null) {
              if (errorCode == "SessionExpired") {
                this.$store.commit("session_expired", {});
              }
              console.log("Error: " + errorCode);
            } else {
              this.estimatorProfile = response.data;
              this.setExpertiseSubList(this.estimatorProfile.expertiseCategoryId);
            }
          } else if (response.status == "100") {
            console.log("session timed out!");
          }
        })
        .catch(error => {
            console.log("error! " + error);
          // Error
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            // console.log(error.response.data);
            console.log(error.response.status);
            // console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log("error request " + error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          this.errors.push(error);
        });
    },
    onExpertiseCategoryChange(event){
        var val = event.target.value;
        this.setExpertiseSubList(val);
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
    handleFileUpload(){
        this.file = this.$refs.uploadFile.files[0];
    },
    submitFile(){
        /*
          Initialize the form data
        */
        let formData = new FormData();
        formData.append('uploadFile', this.file);
        new EstimatorProxy().uploadEstimatorCertFiles(formData).then((response) => {
            if (response.status == "200") {
                this.estimatorProfile = response.data;
            }

        }).catch(function(){
        });
    },
    deleteFile(id){
        if(confirm("Do you really want to delete this document?")){
            var params = new URLSearchParams();
            params.append('documentId', id);
            new EstimatorProxy().deleteEstimatorCertFile(params).then((response) => {
                if (response.status == "200") {
                    var errorCode = response.data.errorCode;
                    if (errorCode != null) {
                    if (errorCode == "SessionExpired") {
                        this.$store.commit("session_expired", {});
                    }
                    } else {
                        this.estimatorProfile = response.data;
                    }
                }
            })
            .catch(e => {
                    this.errors.push("There was an error deleting the file. Please try again.");
            }) 
        }

    },
    updateEstimatorProfile(){
        this.estimatorProfile.country = "USA";
        var params = this.estimatorProfile;
        new EstimatorProxy().updateEstimatorProfile(params).then((response) => {
            if (response.data == "ERROR") {
                this.showResponse = true;
                this.responseMessage = "There was an error updating your profile. Please try again."
            }else{
                // account updated
                this.showResponse = true;
                this.responseMessage = "Your profile has been updated!"
            }
        })
        .catch(e => {
            this.errors.push("There was an error updating your profile. Please try again.");
        })      
    },
    validatePhoneNumber(tel){
        return /^\d{3}-\d{3}-\d{4}$/ .test(tel);
    },                   
  },
  components: {
    Navigation: Navigation
  },
  created() {
    this.getEstimatorRegistrationObj();
  }
};
</script>
