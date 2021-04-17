<template>
  <div class="costProRegistration">
    <Navigation />
    <main class="bg-img content">
      <hr style="background-color:#ed6d3a; height:4px" />
      <section class="secWhite">
        <div class="container text-center">
          <h3>Certified Cost Professional Registration</h3>
        </div>
        <div v-if="showRegistrationSection" class="container text-left">
          <h5>Your Information</h5>
          <form id="register" @submit="checkForm">
            <label for="firstName">First Name <span style="color:red">*</span></label> &nbsp;
            <input tabindex=1 :maxlength="60" id="firstName" v-model="newEstimatorProfile.firstName" type="text" name="firstName"/>&nbsp;
            <label for="emailAddress">Email <span style="color:red">*</span></label>&nbsp;
            <input tabindex=4 id="emailAddress" type="text" v-model="newEstimatorProfile.emailAddress"/><br/>
            <label for="lastName">Last Name <span style="color:red">*</span></label> &nbsp;
            <input tabindex=2 :maxlength="60" id="lastName" v-model="newEstimatorProfile.lastName" type="text" name="lastName"/>
            <label for="confirmEmailAddress">Confirm Email <span style="color:red">*</span></label>&nbsp;
            <input tabindex=5 id="confirmEmailAddress" type="text" v-model="confirmEmailAddress"/><br/>            
            <label for="phone">Phone Number <span style="color:red">*</span></label>&nbsp;
            <input tabindex=3 id="phone" type="text" v-model="newEstimatorProfile.phoneNumber"/><br/>                       
            <hr/>          
            <h5>Payment Address Information</h5>
            <label for="address1">Address Line One <span style="color:red">*</span></label> &nbsp;
            <input tabindex=6 id="address1" v-model="newEstimatorProfile.addressLine1" type="text" name="address1"/><br/>
            <label for="address2">Address Line Two</label> &nbsp;
            <input tabindex=7 id="address2" v-model="newEstimatorProfile.addressLine2" type="text" name="address2"/><br/>
            <label for="city">City <span style="color:red">*</span></label> &nbsp;<input tabindex="8" id="city" v-model="newEstimatorProfile.city" type="text" name="city"/>&nbsp;
            <label for="state">State <span style="color:red">*</span></label> &nbsp;
            <select tabindex=8 id="state" v-model="newEstimatorProfile.state" name="state">
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
            <label for="zip">Zip Code <span style="color:red">*</span></label> &nbsp;<input tabindex=9 id="zip" v-model="newEstimatorProfile.zipCode" type="text" name="zip"/>&nbsp;
            <hr/>
            <h5>Position Applied For <span style="color:red">*</span></h5>   
            <select tabindex=10 id="position" v-model="newEstimatorProfile.positionAppliedForId" name="position">
              <option v-for="availablePosition in availablePositionList" :value="availablePosition.id" v-text="availablePosition.name" :key="availablePosition.id + '1'"></option>
            </select>
            <hr/>   
            <h5>Compensation Per Hr. <span style="color:red">*</span></h5>
            <input tabindex=11 id="compensation" v-model="newEstimatorProfile.compensation" type="number" name="compensation"/>
            <hr/>
            <div>
              A 4-year college or Quantity Surveying degree is an appropriate foundation for a Construction Check cost professional. 
              The following degrees are preferred due to the analytical foundation that these individuals develop and need for performing. 
              Preferred degrees for a Construction Check cost professional include:
            </div> 
            <h5>Education <span style="color:red">*</span></h5>
            <select tabindex=12 id="education" v-model="newEstimatorProfile.educationTypeId" name="education">
              <option v-for="educationOption in educationTypes" :value="educationOption.id" v-text="educationOption.name" :key="educationOption.id + '1'"></option>
            </select>            
            <hr/>
            <h5>Industry Related Experience<span style="color:red">*</span></h5>
            <select tabindex=13 id="experience" v-model="newEstimatorProfile.experienceYearsId" name="experience">
              <option v-for="experienceOption in experienceYears" :value="experienceOption.id" v-text="experienceOption.name" :key="experienceOption.id + '1'"></option>
            </select>                        
            <hr/>
            <h5>Area of Expertise <span style="color:red">*</span></h5>  
            <select tabindex=14 @change="onExpertiseCategoryChange" id="expertiseCategory" v-model="expertiseCategory" name="expertiseCategory">
              <option v-for="category in expertiseList" :value="category.id" v-text="category.name" :key="category.id + '1'"></option>
            </select>
            <br/>
            <div v-show="showExpertiseSubcategory">
              <span>(Press Ctrl key to select more than one)</span><br/>
              <select tabindex=15 multiple v-show="showExpertiseSubcategory" id="expertiseSubcategory" v-model="newEstimatorProfile.expertiseSubcategoryId" name="expertiseSubcategory">
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
            <div style="color:red">You will be required to upload your certification document(s) after your account has been created.</div>  
            <hr/>
            <h5>Certifications & Credentials <span style="color:red">*</span> (Press Ctrl key to select more than one)</h5>
            <select tabindex=16 size="10" id="certifications" multiple v-model="newEstimatorProfile.certificationId" name="certifications">
              <optgroup v-for="certificationCategory in certificationsList" :label="certificationCategory.title" :key="certificationCategory.title + '1'">
                <option v-for="certification in certificationCategory.certifications" :value="certification.id" v-text="certification.name" :key="certification.id + '1'"></option>
              </optgroup>                                                                                                                                                        
            </select>    
            <hr/>
            <h5>Project Experience <span style="color:red">*</span> (Press Ctrl key to select more than one)</h5>
            <select tabindex=17 size="10" id="projectExperience" multiple v-model="newEstimatorProfile.buildingTypeId" name="projectExperience">
                <optgroup v-for="category in categories" :label="category.title" :key="category.title + '1'">
                <option v-for="buildingType in category.buildingTypes" :value="buildingType.id" v-text="buildingType.name" :key="buildingType.id + '1'"></option>
              </optgroup>
            </select> 
            <br/>
            <h5>Enter any project experience not listed above</h5>
            <textarea tabindex=18 maxlength="400" rows="5" cols="50" id="otherProjectExperience" v-model="newEstimatorProfile.otherProjectExperience" name="otherProjectExperience"/>
            <hr/>
            <h5 v-if="newEstimatorProfile.emailAddress != null">An email will be sent to <b>{{newEstimatorProfile.emailAddress}}</b>. You must follow the link in the email to create your password. Then you can log
            in and view the status of your application.</h5>
            <b-btn :disabled="btnClicked" variant="success" type="submit">Register</b-btn>                 
          </form>
        </div>
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
        <div>
          
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
import Navigation from "@/components/Navigation.vue";
import ProjectProxy from '@/proxies/ProjectProxy.js';
import EstimatorProxy from '@/proxies/EstimatorProxy.js';

export default {
  name: "costProRegistration",
  data() {
      return {
        showRegistrationSection:true,
        showResponse:false,
        responseMessage:'',
        loginError: false,
        //firstName: '',
        //lastName: '',
        password: '',
        //emailAddress: '',
        confirmEmailAddress: '',
        //phoneNumber: '',
        buildingTypes: [],
        category: '',
        categories: [],
        buildingType: '',
        chooseType: '',
        projectExperience: [],
        certifications: [],
        expertise:'',
        expertiseCategory: '',
        expertiseList: [],
        expertiseSubcategory:[],
        showExpertiseSubcategory: false,
        expertiseSubList:[],
        errors: [],
        btnClicked: false,
        estimatorRegistrationObj: null,
        availablePosition:'',
        availablePositionList:[],
        educationOption: '',
        educationTypes:[],
        experienceOption:'',
        experienceYears:[],
        certificationCategory:'',
        certificationsList:[],
        newEstimatorProfile: {
          expertiseSubcategoryId:[],
          certificationId:[],
          buildingTypeId:[],
        },
      }
    },
    methods: {
      checkForm: function (e) {
        this.errors = [];
        var validEmail = false;
        var validConfirm = false;

        if (!this.newEstimatorProfile.firstName) {
            this.errors.push('First name required.');
        }
        if (!this.newEstimatorProfile.lastName) {
            this.errors.push('Last name required.');
        }
       
        if (!this.newEstimatorProfile.emailAddress) {
          this.errors.push("Email required.");
        } else if (!this.validEmail(this.newEstimatorProfile.emailAddress)) {
          this.errors.push("Valid email address required.");
        }else{
          validEmail = true;
        }
        if (!this.confirmEmailAddress) {
          this.errors.push("Confirm Email required.");
        } else if (!this.validEmail(this.confirmEmailAddress)) {
          this.errors.push("Valid confirm email address required.");
        }else{
          validConfirm = true;
        }
        if((validEmail && validConfirm) && (this.newEstimatorProfile.emailAddress != this.confirmEmailAddress)){
          this.errors.push("Confirm email address does not match email address.");
        }        
        if (!this.newEstimatorProfile.phoneNumber) {
            this.errors.push('Phone number is required.');
        } else if(!this.validatePhoneNumber(this.newEstimatorProfile.phoneNumber)){
            this.errors.push('Phone number should be in format (xxx-xxx-xxxx).');
        }   
       
        if (!this.newEstimatorProfile.addressLine1) {
            this.errors.push('Address line one required.');
        }
        if (!this.newEstimatorProfile.city) {
            this.errors.push('City required.');
        }
        if (!this.newEstimatorProfile.state) {
            this.errors.push('State required.');
        }
        if (!this.newEstimatorProfile.zipCode) {
            this.errors.push('Zip code required.');
        }

        if (!this.newEstimatorProfile.positionAppliedForId) {
            this.errors.push('Position applied for required.');
        }
        if (!this.newEstimatorProfile.compensation) {
            this.errors.push('Compensation per hour required.');
        }                
        if (!this.newEstimatorProfile.educationTypeId) {
            this.errors.push('Education required.');
        }  
        if (!this.newEstimatorProfile.experienceYearsId) {
            this.errors.push('Industry related experience required.');
        }
        if (!this.newEstimatorProfile.expertiseSubcategoryId || this.newEstimatorProfile.expertiseSubcategoryId.length == 0) {
            this.errors.push('Area of expertise required.');
        }  
        if (!this.newEstimatorProfile.certificationId || this.newEstimatorProfile.certificationId.length == 0) {
            this.errors.push('Certifications required.');
        }  
        if (!this.newEstimatorProfile.buildingTypeId || this.newEstimatorProfile.buildingTypeId.length == 0) {
            this.errors.push('Project experience required.');
        }                                              

        if(this.errors.length == 0){
            this.btnClicked = true;
            this.createEstimatorProfile(e);
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
              }
          }).catch((error) => {
              console.log("ERROR! " + error);
          });
      } ,
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
                  console.log(error);
              });   
          }else{
              this.showExpertiseSubcategory = false;
          }  
      },  
      validatePassword(pw) {
          return /[A-Z]/       .test(pw) &&
              /[a-z]/       .test(pw) &&
              /[0-9]/       .test(pw) &&
              pw.length >= 6 && pw.length <= 20;

      },
      validatePhoneNumber(tel){
          return /^\d{3}-\d{3}-\d{4}$/ .test(tel);
      },
      validEmail: function(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      },   
      createEstimatorProfile(){
        this.newEstimatorProfile.country = "USA";
        var params = this.newEstimatorProfile;
        new EstimatorProxy().createEstimatorProfile(params).then((response) => {
          if (response.data == "ERROR") {
            this.showResponse = true;
            this.responseMessage = "There was an error creating your account. Please try again."
          }else if(response.data == "DUPLICATE"){
            this.showRegistrationSection = false;
            this.showResponse = true;s
            this.responseMessage = "There is already an Estimator profile using this email address. Please login from the home page."
          }else if(response.data == "DUPEUSER"){
            this.showRegistrationSection = false;
            this.showResponse = true;
            this.responseMessage = "There is already a registered user using this email address. Please apply with a different email address."
          }else if(response.data == "PENDING"){
            this.showResponse = true;
            this.showRegistrationSection = false;
            this.responseMessage = "There is already an Estimator profile using this email address. Please contact Construction Check if you did not receive the acknowledement email."
          }else{
            // account created, show message about email
            this.showRegistrationSection = false;
            this.showResponse = true;
            this.responseMessage = "The link sent to your email will expire in 48 hours. Please follow the instructions in the email in order to log in to your account."
          }
        })
        .catch(e => {
                this.errors.push("There was an error creating your account. Please try again.");
        });          
      },           
	},
  components: {
    Navigation: Navigation,
  },
  mounted() {
  },  
  created() {
      this.getEstimatorRegistrationObj();
      localStorage.removeItem('id_token');
  }
};
</script>