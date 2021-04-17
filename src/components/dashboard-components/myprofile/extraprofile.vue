<template>
  <div v-if="Object.keys(profile.length > 0)">
    <div class="profile-modal"></div>
    <div class="dash-profile">
      <b-row class="float-right align-items-center mr-1">
        <!-- <b-btn v-if="role === 6" @click="editProfile" class="btn-style rounded pr-4 pl-4">Edit Profile</b-btn> -->
        <div v-if="!editMode"  class="d-flex" role="button" @click="openModal">
          <span class="mr-2">Edit</span>
          <img alt="Vue logo" src="~@/assets/img/small-icons/profile-edit-pencil.png"/>
        </div>
        <b-btn style="background-color:#0c2340; border-radius: 5px" class="pl-3 pr-3" v-else @click="saveData">Save</b-btn >
      </b-row>
      <b-row>
        <!--Photo Section -->
        <b-col lg="2" class="border-right">
          <div class="text-center">
            <div class="mb-4 mt-4">
              <img alt="Vue logo" src="~@/assets/img/small-icons/profile-icon.png"/>
            </div>
            <div>{{profile.firstName}} {{profile.lastName}}</div>
            <div>{{profile.companyName}}</div>
          </div>
          <div>
          <!-- <div v-if="role === 3"> -->
            <div class="text-center mt-3">Open to work?</div>
            <div class="d-flex justify-content-center mt-3">
              <span>Yes</span>
              <b-form-checkbox :disabled="!editMode" v-model="profile.openToNewPosition" switch size="lg" class="checkbox-style"></b-form-checkbox>
              <span class="ml-3">No</span>
            </div>
            <div v-for="type of availability" :key="type.id" class="text-center mt-3"><span :class="profile.availability !== type.id ? 'grey-font' : ''">{{type.name}}</span></div>
          </div>
        </b-col>
        <!-- Information Section -->
        <b-col>
          <!-- Upper Part -->
          <b-row class="border-bottom pb-3 mt-3">
            <!-- Email Part -->
            <b-col lg="5">
              <div class="title-font">Email</div>
              <div v-if="role !== 6" class="ml-4 mt-2">
                <div>{{profile.emailAddress}}</div>
                <div class="grey-font mt-2">Notification preferences</div>
                  <!-- <label class="mt-2 d-flex align-items-center">
                  <input type="radio" name="email" v-model="emailNotification" :value="'0'"  class="mr-2" />
                  <div>Yes, email me when there is a new project offer</div>
                  </label>
                  <label class="d-flex align-items-center mt-2">
                  <input type="radio" name="email" v-model="emailNotification" :value="'1'"  class="mr-2" />
                  <div>No, do not email me. I will login tocheck new project offers.</div>
                  </label> -->
                  <b-form-group :disabled="!editMode" v-slot="{ }">
                    <b-form-radio  v-model="profile.emailNotification"  name="email" value="1">Yes, email me when there is a new project offer</b-form-radio>
                    <b-form-radio  v-model="profile.emailNotification" name="email" value="0">No, do not email me. I will login tocheck new project offers.</b-form-radio>
                  </b-form-group>
              </div>
            </b-col>
            <!--Phone number part -->

            <b-col lg="5" offset-lg="1">
              <div>Phone number</div>
              <div class="ml-4 mt-2">
                <div>{{profile.billingContact | formatPhone}}</div>
                <div class="grey-font mt-2">Notification preferences</div>
                <div class="mt-2 d-flex align-items-center">
                  <b-form-group :disabled="!editMode" v-slot="{ }">
                    <b-form-radio  v-model="profile.phoneNotification"  name="phone" value="1">Yes, text me when there is a new project offer</b-form-radio>
                    <b-form-radio  v-model="profile.phoneNotification" name="phone" value="0">No, do not text me. I will login to check new project offers.</b-form-radio>
                  </b-form-group>
                  </div>
              </div>
            </b-col>
          </b-row>
          <!-- Position Part -> Center part -->
          <!-- First Row -->
          <div>
          <!-- <div v-if="role === 0"> -->
            <div class="title-font mt-3">Position applied for</div>
            <b-row v-if="!editMode">
              <b-col  lg="3" class="ml-4 mt-2">{{profile.positionAppliedName}}</b-col>
              <b-col lg="3" class="mt-2">Compensation: <span>${{profile.compensation}}/hr</span></b-col>
              <b-col lg="3" class="mt-2">{{availability.find(each => each.id === profile.availability) ?availability.find(each => each.id === profile.availability).name : ''}}</b-col>
            </b-row>
            <b-row v-else>
              <b-col>
                <b-form-select @change="setPosition" v-model="profile.positionAppliedId">
                  <b-form-select-option v-for="position of positionList" :key="position.id" :value="position.id">{{position.name}}</b-form-select-option>
                </b-form-select>
              </b-col>
              <b-col>
                 <b-form-input placeholder="Compensation" v-model="profile.compensation" :state="compensationState" type="number"></b-form-input>
              </b-col>
              <b-col>
                <b-form-select v-model="profile.availability">
                  <b-form-select-option v-for="item of availability" :key="item.id" :value="item.id">{{item.name}}</b-form-select-option>
                </b-form-select>
              </b-col>
            </b-row>
            <b-row v-if="!editMode">
              <b-col lg="3">
                <div class="subtitle-font mt-4">Area of expertise</div>
                <div class="ml-4 mt-1">
                  <div>{{profile.areaOfExpertiseName}}</div>
                  <!-- <div class="d-flex align-items-center mt-3">
                    <span class="mr-2">Change</span><img alt="Vue logo" src="~@/assets/img/small-icons/profile-edit-pencil.png"/>
                  </div> -->
                </div>
              </b-col>
              <b-col lg="3">
                <div class="subtitle-font mt-4">Skills</div>
                <div class="ml-4 mt-1">
                  <div class="mb-3" v-for="skill of profile.skills" :key="skill.id">{{skill.name}}</div>
                </div>
              </b-col>
            </b-row>
            <b-row v-else>
              <b-col lg="3">
                <div class="subtitle-font mt-4">Area of expertise</div>
                <b-form-select @change="setExpertise" v-model="profile.areaOfExpertiseId">
                  <b-form-select-option v-for="expertise of expertiseCategories" :key="expertise.id" :value="expertise.id">{{expertise.name}}</b-form-select-option>
                </b-form-select>
              </b-col>
              <b-col lg="7">
                <div class="subtitle-font mt-4">Skills</div>
                <div class="ml-4 mt-1">
                  <b-form-checkbox-group @change="setSkiils" stacked v-model="selectedSkills" :options="skills">
                    <!-- <b-form-checkbox v-for="skill of skills" :key="skill.id" :value="skill.id">{{skill.name}}</b-form-checkbox> -->
                  </b-form-checkbox-group>
                </div>
              </b-col>
            </b-row>
            <b-row v-if="!editMode" class="border-bottom pb-3">
              <b-col> 
                <div class="subtitle-font">Project experience</div>
                <div class="ml-4 mt-1 mt-3" v-for="(category,index) of profile.buildings" :key="index">
                  <div class="bold-font-weight">{{category.title}}</div>
                  <div class=" ml-4 mt-3" v-for="building of category.buildingTypes" :key="building.id">{{building.name}}</div>
                </div>
              </b-col>
            </b-row>
            <b-row v-else class="border-bottom pb-3">
              <b-col> 
                <div class="subtitle-font">Project experience</div>
                <b-form-select  class="mt-3" @change="setBuildings" multiple v-model="selectedBuildings">
                      <b-form-select-option-group v-for="(group,index) of buildingTypes" :key="index" :label="group.title">
                            <b-form-select-option v-for="item of group.buildingTypes" :key="item.id" :value="item.id">
                              {{item.name}}
                            </b-form-select-option>
                      </b-form-select-option-group>
                  </b-form-select>
              </b-col>
            </b-row>

            <!--  Education and Certification Part  -->
            <b-row v-if="!editMode" class="pb-3 mt-3">
              <!-- Education Part -->
              <b-col lg="5">
                <div class="title-font">Education</div>
                <div class="mt-2 ml-4">
                  <div>{{profile.educationTypeName}}</div>
                </div>
              </b-col>
            </b-row>
            <b-row v-else class="pb-3 mt-3">
              <!-- Education Part -->
              <b-col lg="5">
                <div class="title-font">Education</div>
                <div class="mt-2">
                <b-form-select @change="setEducationType" v-model="profile.educationTypeId">
                  <b-form-select-option v-for="education of educationTypes" :key="education.id" :value="education.id">{{education.name}}</b-form-select-option>
                </b-form-select>
                </div>
              </b-col>
            </b-row>

            <b-row v-if="!editMode" class="pb-3 mt-3">
              <!-- Experience Part -->
              <b-col lg="5">
                <div class="title-font">Industry Related Experience</div>
                <div class="mt-2 ml-4">
                  <div>{{profile.experienceYearsName}}</div>
                </div>
              </b-col>
            </b-row>
            <b-row v-else class="pb-3 mt-3">
              <!-- Experience Part -->
              <b-col lg="5">
                <div class="title-font">Industry Related Experience</div>
                <div class="mt-2">
                 <b-form-select @change="setExperience" v-model="profile.experienceYearsId">
                  <b-form-select-option v-for="experience of experienceYears" :key="experience.id" :value="experience.id">{{experience.name}}</b-form-select-option>
                </b-form-select>
                </div>
              </b-col>
            </b-row>

            <b-row v-if="!editMode" class="pb-3 mt-3">
              <!--Certification part -->
              <b-col>
                <div class="title-font">Certification</div>
                <div v-for="(certification,index) of profile.certifications" :key="certification.id" class="mt-2">
                  <div class="ml-2">
                    <span>{{index + 1}}. </span>  
                    <span>{{certification.name}}</span>  
                  </div>
                  <div class=" ml-4 mt-3">
                      <span>Certification number: </span>
                      <span>{{certification.number}}</span>
                  </div>
                </div>
              </b-col>
            </b-row>
            <b-row v-else class="pb-3 mt-3">
              <b-col>
                <div style="display:flex;justify-content:space-between">
                  <div class="title-font">Certification</div>
                  <b-btn style="background-color:#0c2340; border-radius: 5px" class="pl-3 pr-3" @click="addCertification">Add</b-btn>
                </div>
              <div class="ml-2  mt-2" style="display:flex"  v-for="(certification,indexParent) of profile.certifications" :key="certification.id" :class="certification.id">
                <span>{{indexParent + 1}}.</span>
                <div class="ml-2">
                  <b-form-select @change="setCertification($event,indexParent)" :value="certification.id">
                      <b-form-select-option-group v-for="(group,index) of certifications" :key="index" :label="group.title">
                            <b-form-select-option v-for="item of group.certifications" :key="item.id" :value="item.id">
                              {{item.name}}
                            </b-form-select-option>
                      </b-form-select-option-group>
                  </b-form-select>
                  <b-form-input class="mt-2" style="width : 50%" placeholder="Certification Number" v-model="profile.certifications[indexParent].number"></b-form-input>
                </div>
              </div>
              </b-col>
            </b-row>
          </div>
          <div>
          <!-- <div v-if="role === 7 || role === 8"> -->
            <div class="title-font mt-3">Project details</div>
            <b-row>
              <b-col lg="12" class="ml-4 mt-2">Company: <span class="font-weight-normal">{{profile.projectDetails && profile.projectDetails.company ? profile.projectDetails.company: ''}}</span></b-col>
              <b-col lg="12" class="ml-4 mt-2">Building Category: <span class="font-weight-normal">{{profile.projectDetails && profile.projectDetails.buildingCategory ? profile.projectDetails.buildingCategory: ''}}</span></b-col>
              <b-col lg="12" class="ml-4 mt-2">Project Type: <span class="font-weight-normal">{{profile.projectDetails && profile.projectDetails.projectType ? profile.projectDetails.projectType: ''}}</span></b-col>
              <b-col lg="12" class="ml-4 mt-2">Budget: <span class="font-weight-normal">{{profile.projectDetails && profile.projectDetails.budget ? profile.projectDetails.budget: ''}}</span></b-col>
            </b-row>
          </div>
          <b-row class="border-bottom pb-3 mt-3">
          <!-- <b-row v-if="role === 6" class="border-bottom pb-3 mt-3"> -->
            <!-- Company Part -->
            <b-col lg="12">
              <div class="title-font">Company</div>
              <b-row>
                <b-col sm="4">
                  <div class="mt-2">Company Name</div>
                  <div class="mt-2 font-weight-normal">{{profile.companyName}}</div>
                </b-col>
                <b-col sm="4">
                  <div class="mt-2">Type of Account</div>
                  <div class="mt-2 font-weight-normal">{{profile.typeOfAccount}}</div>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
          <b-row v-if="!editMode" class="border-bottom pb-3 mt-3">
          <!-- <b-row v-if="role === 6" class="border-bottom pb-3 mt-3"> -->
            <!-- Business Address Part -->
            <b-col lg="4">
              <div class="title-font">Business Address</div>
              <div class="font-weight-normal mt-2">{{profile.address}},</div>
              <div v-if="profile.address2" class="font-weight-normal mt-2">{{profile.address2}},</div>
              <div class="font-weight-normal mt-2" >{{`${profile.city},${profile.state}`}}</div>
            </b-col>
            <b-col lg="4">
              <div class="title-font">Billing Contact</div>
              <div class="font-weight-normal mt-2">{{profile.firstName +' ' + profile.lastName}}</div>
              <div class="font-weight-normal mt-2" >{{profile.billingContact | formatPhone}}</div>
            </b-col>
          </b-row>
          <b-row v-else class="border-bottom pb-3 mt-3">
            <b-col lg="4">
              <div class="title-font">Business Address</div>
              <b-form-input placeholder="Address Line 1" class="mt-2" v-model="profile.address" />
              <b-form-input placeholder="Address Line 2" class="mt-2" v-model="profile.address2" />
              <b-form-select class="mt-2" @change="setState" v-model="profile.stateId">
                  <b-form-select-option v-for="state of states" :key="state.id" :value="state.id">{{state.name}}</b-form-select-option>
              </b-form-select>
              <b-form-select class="mt-2" @change="setCity" v-model="profile.cityId">
                  <b-form-select-option v-for="city of cities" :key="city.id" :value="city.id">{{city.name}}</b-form-select-option>
              </b-form-select>
              <b-form-input placeholder="Zip Code" class="mt-2" v-model="profile.zipCode" />
            </b-col>
            <b-col lg="4">
              <div class="title-font">Billing Contact</div>
              <b-form-input placeholder="First Name" class="mt-2" v-model="profile.firstName" />
              <b-form-input placeholder="Last Name" class="mt-2" v-model="profile.lastName" />
              <b-form-input placeholder="Phone Number" @keypress="contactKeyPress" class="mt-2" v-model="profile.billingContact" />
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import EventBus from '../../../plugins/event-bus';
import AccountProxy from '@/proxies/AccountProxy.js';
import AddressProxy from '@/proxies/AddressProxy.js';
import EstimatorProxy from '@/proxies/EstimatorProxy.js';
export default {
  name: 'Profile',
  props: ['role'],
  computed :{
    compensationState(){
       return this.profile.compensation >= 0
    },
  },
  methods: {
    editProfile() {
      this.$emit('openProfileModal');
      setTimeout(() => {
        EventBus.$emit('edit_user_profile', {user_role: this.role})
      }, 1)
    },
    openModal() {
      this.editMode = true
    },
    saveData(){
      let error = false
      this.notificationMessage = ''
      const { 
        firstName,
        lastName,
        billingContact,
        address,
        stateCode,
        cityId,
        zipCode,
        positionAppliedId,
        areaOfExpertiseId,
        skills,
        compensation,
        availability,
        educationTypeId,
        experienceYearsId,
        certifications,
        buildings,
        emailAddress,
        phoneNotification,
        emailNotification,
        openToNewPosition
      } = this.profile
      if(!firstName){
        error = true
        this.notificationMessage = 'ERROR: First Name is required'
      }
      if(!error && !lastName){
        error = true
        this.notificationMessage = 'ERROR: Last Name is required'
      }
      if(!error && !billingContact){
        error = true
        this.notificationMessage = 'ERROR: Phone Number is required'
      }
      if(!error){
        const cleaned = ('' + billingContact).replace(/\D/g, '')
        const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
        if(!match){
          error = true
          this.notificationMessage = 'ERROR: Please enter a valid phone number'
        }
      }
      if(!error && !address){
        error = true
        this.notificationMessage = 'ERROR: Address Line 1 is required'
      }
      if(!error && !stateCode){
        error = true
        this.notificationMessage = 'ERROR: State is required'
      }
      if(!error && !cityId){
        error = true
        this.notificationMessage = 'ERROR: City is required'
      }
      if(!error && !zipCode){
        error = true
        this.notificationMessage = 'ERROR: Zip Code is required'
      }
      if(!error && (isNaN(Number(zipCode)) || (!isNaN(Number(zipCode)) && zipCode.toString().length < 5))){
        error = true
        this.notificationMessage = 'ERROR: Enter a valid Zip Code'
      }

      if(!error && !positionAppliedId){
        error = true
        this.notificationMessage = 'ERROR: Position Applied For is required'
      }
      if(!error && !areaOfExpertiseId){
        error = true
        this.notificationMessage = 'ERROR: Area of Expertise is required'
      }
      if(!error && !skills.length){
        error = true
        this.notificationMessage = 'ERROR: Select at least one skill'
      }
      if(!error && Number(compensation) < 0){
        error = true
        this.notificationMessage = 'ERROR: Compensation cannot be negative'
      }
      if(!error && !educationTypeId){
        error = true
        this.notificationMessage = 'ERROR: Education is required'
      }
      if(!error && !availability){
        error = true
        this.notificationMessage = 'ERROR: Availability is required'
      }
      if(!error && !experienceYearsId){
        error = true
        this.notificationMessage = 'ERROR: Industry Relation Experience is required'
      }
      if(!error && !certifications.length){
        error = true
        this.notificationMessage = 'ERROR: At least one certification is required'
      }
      if(!error && !buildings.length){
        error = true
        this.notificationMessage = 'ERROR: Project Experience is required'
      }
      if(!error){
        new EstimatorProxy().updateEstimatorProfile({
          ...this.profileInfo,
          id : this.role,
          firstName,
          lastName,
          emailAddress ,
          phoneNumber :billingContact,
          addressLine1 : address,
          addressLine2 : this.profile.address2,
          city : cityId,
          state : this.states.find(each => each.code === stateCode).id,
          zipCode,
          positionAppliedForId : positionAppliedId,
          compensation : compensation ? compensation : 0,
          educationTypeId ,
          experienceYearsId ,
          expertiseCategoryId : areaOfExpertiseId,
          expertiseSubcategoryId : skills.map(each => each.id),
          certificationId : certifications.map(each => each.id),
          buildingTypeId :  this.selectedBuildings,
          phoneNotification : Number(phoneNotification) ? true : false,
          emailNotification : Number(emailNotification) ? true : false,
          openToNewPosition : openToNewPosition ? true : false
        })
          .then(res => {
            this.editMode = false
            this.notificationMessage = `SUCCESS: Updated Successfully`
          })
          .catch(err => {
            this.notificationMessage = `ERROR: Update Failed`
          })
      }
    },
    setPosition(){
      const position = this.positionList.find(each => each.id === this.profile.positionAppliedId)
      this.profile = {...this.profile,positionAppliedName :position.name ? position.name : ''}
    },
    setExpertise(){
      const expertise = this.expertiseCategories.find(each => each.id === this.profile.areaOfExpertiseId)
      this.profile = {...this.profile,areaOfExpertiseName :expertise.name ? expertise.name : ''}
      this.selectedSkills= []
      this.getSkills(expertise.id)
    },
    setEducationType(){
      const educationType = this.educationTypes.find(each => each.id === this.profile.educationTypeId)
      this.profile = {...this.profile,educationTypeName :educationType.name ? educationType.name : ''}
    },
    setExperience(){
      const experience = this.experienceYears.find(each => each.id === this.profile.experienceYearsId)
      this.profile = {...this.profile,experienceYearsName :experience.name ? experience.name : ''}
    },
    setCertification(event,index){
      const selectedCertificationId = event
      const selectedCertification = this.unGroupedCertifications.find(each => each.id === selectedCertificationId)
      const certifications = this.profile.certifications.map((each,position) => position === index ? {...each,id:event,name : selectedCertification.name} : {...each} )
      this.profile = {
        ...this.profile,
        certifications,
      }
    },
    addCertification(){
      const emptyCertifications = this.profile.certifications.find(each => !each.id && !each.name && !each.number)
      if(!emptyCertifications){
        const certifications = [...this.profile.certifications,{
          id : '',
          name : ''
        }]
        this.profile = {...this.profile, certifications}
      }
    },
    setState(){
      const state = this.states.find(state => state.id === this.profile.stateId)
      this.profile = {...this.profile,state : state.name}
      this.getCities(state.code)
    },
    setCity(){
      const city = this.cities.find(city => city.id === this.profile.cityId)
      this.profile = {...this.profile,city : city.name}
    },
    setPhone(){
      // var cleaned = ('' + this.profile.billingContact).replace(/\D/g, '')
      // var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
      // if (match) {
      //   var intlCode = (match[1] ? '+1 ' : '')
      //   this.profile.billingContact = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
      // } 
      const x = this.profile.billingContact
          .replace(/\D/g, '')
          .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      this.profile = {...this.profile,billingContact : 'ABC'  };     
      // this.profile = {...this.profile,billingContact :!x[2]
      //     ? x[1]
      //     : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '')  };     
    },
    getCities(code){
        new AddressProxy().getCities(code)
          .then(res => {
            this.cities = res
            const {cityId} = this.profile
            const city = res.find(each => each.id === cityId)
            this.profile = {...this.profile,city : city.name}
          })
          .catch(err => console.log('Error',err))
    },
    getSkills(id){
      new EstimatorProxy().getExpertiseSubcategories(id)
      .then(res => this.skills = res.data.map(each => ({...each, value : each.id, text: each.name})))
      .catch()
    },
    setSkiils(e){
      const checkedSkills = this.skills.filter(each => e.includes(each.id))
      this.profile = {...this.profile, skills : checkedSkills}
    },
    setBuildings(e){
      this.profile = {...this.profile, buildings :this.buildingTypes.map(category => {
        const buildingTypes = category.buildingTypes.filter(each => e.length && e.includes(each.id) )
        return {...category,buildingTypes}
      }).filter(each => each.buildingTypes.length) }
    },
    getStates(){
      new AddressProxy().getStates()
        .then(res =>{
          this.states = res
          const {stateCode} = this.profile
          const userState = res.find(each => each.code === stateCode || each.id === Number(stateCode) )
          this.profile = {...this.profile,stateId : userState.id ? userState.id : '', state: userState.name ? userState.name : '',stateCode : userState.code}
          this.getCities(userState.code)  
        })
        .catch(err => console.log("Error",err))
    },
    contactKeyPress($event){
      const keyCode = $event.keyCode || $event.which
      if (keyCode === 8|| (keyCode >= 48 && keyCode <= 57)) {
        // this.setPhone()
        const x = this.profile.billingContact
          .replace(/\D/g, '')
          .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        if(`${x[1]}${x[2]}${x[3]}`.length < 10){
          this.profile.billingContact = !x[2]
          ? x[1]
          : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '')
          return true;
        }
        $event.preventDefault()
        return false
      } else {
        $event.preventDefault()
        return false;
      } 
    },
    getExtraProfile(){
      new AccountProxy().getExtraProfile({estimatorProfileId :this.role.toString()})
          .then(res => {
            // this.companyProfile = response;
            // this.company_info = response;
            // this.account_code.accountCode = response.accountCode;
            // //Set the collapse variables
            // for(let i=0; i<response.accountOffices.length; i++){
            //     this.collapse.push({show: false});
            // }
            const [profile,lists, profileInfo] = res
            this.profileInfo = profileInfo
            this.positionList = lists.availablePositionList ? lists.availablePositionList : []
            this.buildingTypes = lists.buildingTypes ? lists.buildingTypes : []
            this.certifications = lists.certifications ? lists.certifications:   []
            this.educationTypes = lists.educationTypes ? lists.educationTypes : []
            this.experienceYears =lists.experienceYears ? lists.experienceYears : []
            this.expertiseCategories = lists.expertiseCategoryList ? lists.expertiseCategoryList : []
            this.certifications.forEach(each => {
                this.unGroupedCertifications = [...this.unGroupedCertifications,...each.certifications]
            }) 
            this.buildingTypes.forEach(each => {
              this.unGroupedBuildings = [...this.unGroupedBuildings,...each.buildingTypes]
            })
            this.selectedBuildings = profileInfo.buildingTypeId &&  profileInfo.buildingTypeId.length ? profileInfo.buildingTypeId : []
            this.profile = {
              phoneNotification : profile.phoneNotification ?  1 : 0,
              emailNotification : profile.emailNotification ?  1 : 0,
              availability : profileInfo.availability ? profileInfo.availability : 'Part Time',
              positionAppliedName : profile.positionApplied && profile.positionApplied.name ? profile.positionApplied.name : '',
              positionAppliedId : profile.positionApplied && profile.positionApplied.id ? profile.positionApplied.id : 0,
              compensation : profile.compensation ? profile.compensation : 0,
              openToNewPosition : profileInfo.openToNewPosition,
              areaOfExpertiseName : profile.expertiseSubcategories && profile.expertiseSubcategories.length && profile.expertiseSubcategories[0] && profile.expertiseSubcategories[0].expertiseCategory && profile.expertiseSubcategories[0].expertiseCategory.name ?profile.expertiseSubcategories[0].expertiseCategory.name : '' ,
              areaOfExpertiseId : profile.expertiseSubcategories && profile.expertiseSubcategories.length && profile.expertiseSubcategories[0] && profile.expertiseSubcategories[0].expertiseCategory && profile.expertiseSubcategories[0].expertiseCategory.id ?profile.expertiseSubcategories[0].expertiseCategory.id : 1 ,
              skills :profile.expertiseSubcategories && profile.expertiseSubcategories.length ? profile.expertiseSubcategories.map(each => ({
                id : each.id,name : each.name
              })) : [],
              educationTypeId : profile.educationType && profile.educationType.id ? profile.educationType.id : 1,
              educationTypeName : profile.educationType && profile.educationType.name ? profile.educationType.name : '',
              billingContact : profileInfo.phoneNumber ? profileInfo.phoneNumber : '',
              address : profile.address && profile.address.addressLine1 ? profile.address.addressLine1 : '',
              lastName : profileInfo.lastName ?profileInfo.lastName : '',
              firstName : profileInfo.firstName ?profileInfo.firstName : '',
              experienceYearsName : profile.experienceYears && profile.experienceYears.name ? profile.experienceYears.name: '',
              experienceYearsId : profile.experienceYears && profile.experienceYears.id ? profile.experienceYears.id: 1,
              emailAddress : profile.user && profile.user.emailAddress ? profile.user.emailAddress : '' ,
              certifications :  profile.certifications ? profile.certifications : [],
              companyName : '' , // Not coming
              typeOfAccount : '', // Not coming
              stateCode : profileInfo.state ? profileInfo.state :'',
              cityId : profileInfo.city ? Number(profileInfo.city) : '',
              address2 :  profileInfo.addressLine2,
              zipCode :  profileInfo.zipCode,
              buildings : this.buildingTypes.map(category => {
              const buildingTypes = category.buildingTypes.filter(each => profileInfo.buildingTypeId && profileInfo.buildingTypeId.length && profileInfo.buildingTypeId.includes(each.id) )
              return {...category,buildingTypes}
            }).filter(each => each.buildingTypes.length),
              projectDetails : {
                company :'', // Not coming
                buildingCategory : '',  // Not coming
                projectType : '',  // Not coming
                budget : 0  // Not coming
              }
            }
            this.selectedSkills = this.profile.skills.map(each => each.id)
            this.getStates()
            this.getSkills(this.profile.areaOfExpertiseId)
          })
          .catch(error => {
              console.error('Error' , error);
          })
    },
  },
 watch: {
        notificationMessage: function(newVal) {
            let notificationType, notificationMessage;
            if(newVal) {
                let chunks = newVal.split(":");
                notificationType = chunks[0];
                notificationMessage = chunks[1];
            this.$notify({
                group: 'notify',
                type: notificationType.toLowerCase(),
                title: notificationMessage,
                duration: 3000,
                speed: 1000,
            });
            }
        }
    },
  data() {
    return {
      profileInfo : {},
      profile: {}, //Users profile for the profile page,
      positionList : [],
      buildingTypes : [],
      certifications : [],
      educationTypes :[],
      experienceYears : [],
      expertiseCategories : [],
      editMode : false,
      availability : [
        {
          id :'Part Time',
          name : 'Part time'
        },
        {
          id : 'Full Time',
          name : 'Full time'
        },
        {
          id : 'Constructor',
          name : 'Constructor'
        },
      ],
      unGroupedCertifications :[],
      states : [],
      cities : [],
      skills : [],
      selectedSkills : [],
      unGroupedBuildings : [],
      selectedBuildings : [],
      notificationMessage :''
    };
  },

  filters: {
    formatPhone: function (phoneNumberString) {
      var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
      var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
      if (match) {
        var intlCode = (match[1] ? '+1 ' : '')
        return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
      }
      return null
    }
  },
  created(){
    this.getExtraProfile();
  }
};
</script>

<style scoped>
.dash-profile {
    font-family: Montserrat;
    background-color: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    margin: 1vw 1vw;
    padding: 20px 20px 2vw 30px;
    font-weight: 600;
    font-size: 14px;
}

.checkbox-style {
    transform: rotate(180deg);
    margin-top: 2px;
    width: 42px;
}

.btn-style {
    background-color: #0C2340
}

.grey-font {
    color: #909090;
}

.title-font {
    font-size: 1.2em;
}

.subtitle-font {
    font-size: 1.1em;
}

.bold-font-weight {
    font-weight: bold;
}

.blue-font {
    color: #0075ff;
    cursor: pointer;
}

.normal-font {
    font-weight: normal;
}

footer {
    background: white !important;
}

.profile-modal {
    display: block;
    width: 900px;
    height: 90%;
    background: red;
}
</style>
