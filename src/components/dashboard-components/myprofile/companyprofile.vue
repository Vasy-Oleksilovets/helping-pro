<template>
  <div>
    <notifications group="foo" />
    <div class="profile-modal"></div>
    <div class="dash-profile" style="overflow: auto">
      <b-row v-if="Object.keys(company_info).length > 0">
        <!--Photo Section -->
        <b-col lg="2" class="border-right">
          <b-row class="text-center">
            <b-col class="text-center">
              <div>
                <b-avatar :src="company_info.logoPath" size="8rem"></b-avatar>
              </div>
              <div class="text-center">
                <avatar-cropper trigger="#pick-avatar" :upload-form-data="account_code" :labels="{submit: 'Submit', cancel: 'Cancel'}" :upload-url="base_url + '/api/account/upload_account_logo'" />
              </div>
              <div class="mt-2">
                <b-icon class="profile-icon mr-3" id="pick-avatar" role="button" icon="pencil-square" scale="2"></b-icon>
                <b-icon v-b-modal.profile-icon-delete-modal class="profile-icon" role="button" icon="trash" scale="2"></b-icon>
              </div>
            </b-col>
          </b-row>
          <div class="mt-5">
            <div>{{company_info.accountOffices[0].officeUsers[0].firstName}} {{company_info.accountOffices[0].officeUsers[0].lastName}}</div>
          </div>
          <b-row class="no-gutters">
            <b-col class="mt-3">{{company_info.accountOffices[0].officeUsers[0].phoneNumber | formatPhone}}</b-col>
            <b-col class="mt-3">
              <label>ext.</label>{{company_info.accountOffices[0].officeUsers[0].phoneExtension}}
            </b-col>
          </b-row>
          <b-row>
            <b-col class="mt-3 text-break">{{company_info.accountOffices[0].officeUsers[0].emailAddress}}</b-col>
          </b-row>
        </b-col>

        <!-- Information Section -->
        <b-col>
          <!-- Upper Part -->
          <b-row class="border-bottom pb-3 mt-3 justify-content-end">
            <b-col offset-sm="10" sm="2" class="text-right">
              <b-btn v-if="role === 4" v-b-modal.modal-center  class="btn-style rounded">Add new Office</b-btn>
            </b-col>
          </b-row>

          <b-row role="3" class="border-bottom pb-3 mt-3">
            <!-- Company Part -->
            <b-col sm="10">
              <div class="title-font">Company</div>
              <b-row>
                <b-col sm="6">
                  <div class="mt-2">Company Name</div>
                  <div class="mt-2 font-weight-normal">{{company_info.companyName}}</div>
                </b-col>
                <b-col sm="5">
                  <b-row>
                    <b-col sm="6">
                      <div class="mt-2">Type of Account</div>
                      <div class="mt-2 font-weight-normal">{{company_info.accountType}}</div>
                    </b-col>
                    <b-col sm="4">
                      <div class="mt-2">Account ID</div>
                      <div style="margin-left: '3%'" class="mt-2">{{company_info.accountNumber}}</div>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </b-col>
            <b-col sm="2" class="text-right d-flex justify-content-end" style="flex-flow: column nowrap"></b-col>
          </b-row>

          <b-row role="3" class="border-bottom pb-3 mt-3">
            <!-- Business Address Part -->
            <b-col sm="5">
              <div class="title-font">Company Address</div>
              <div class="font-weight-normal mt-2">{{company_info.addressLine1}}</div>
              <div class="font-weight-normal mt-2" >{{company_info.address.cityName}}, {{company_info.address.stateName}} {{company_info.address.zipCode}}</div>
            </b-col>
            <b-col sm="5">
              <div class="title-font">Billing Contact</div>
              <div class="font-weight-normal mt-2">{{company_info.billingContactName}}</div>
              <div class="font-weight-normal mt-2" >{{company_info.billingPhoneNumber | formatPhone}}</div>
            </b-col>
            <b-col sm="2" class="text-right d-flex justify-content-end" style="flex-flow: column nowrap">
              <div>
                <b-btn class="btn-style rounded" v-if="role === 4" @click="companyEdit()">Edit Company</b-btn>
              </div>
            </b-col>
          </b-row>

          <div class="accordion" role="tablist">
            <div v-for="(office, index) in company_info.accountOffices" :key="index">
              <b-row v-if="(isPortfolioAdminOffice(office)) || role !== 5" class="border-bottom pb-3 mt-3">
                <b-col sm="12">
                  <b-row>
                    <b-col sm="12">
                      <b-row class="align-items-center">
                        <b-col cols="6" sm="2">{{office.officeName}}</b-col>
                        <b-col cols="6" sm="2">{{office.phoneNumber | formatPhone}}</b-col>
                        <b-col cols="6" sm="1">{{office.phoneExtension}}</b-col>
                        <b-col cols="6" sm="2">
                          <div>{{office.address.addressLine1}}</div>
                          <div>{{office.state}}</div>
                        </b-col>
                        <b-col cols="6" sm="2">
                          {{office.accountNumber}}
                        </b-col>
                        <b-col cols="6" sm="1" v-if="office.officeName !== 'Main Office' || role === 4">
                          <b-icon icon="pencil-square" scale="1.5" v-if="role === 4" @click="saveTempOffice(index)"></b-icon>
                          <b-icon icon="pencil-square" scale="1.5" v-if="role === 5" v-b-modal.modal-edit-office @click="editCompany(index)"></b-icon>
                        </b-col>
                        <b-col v-if="office.officeName !== 'Main Office' || role === 4" cols="6" sm="2" style="text-align: end" class="d-flex">
                          <b-btn v-if="office.officeUsers.length > 0" @click="clickViewMore(index)" class="btn-style rounded ml-1">View More</b-btn>
                          <b-btn @click="gotoInvite()" class="btn-style rounded ml-1">Invite User</b-btn>
                        </b-col>    
                      </b-row>
                    </b-col>
                  </b-row>
                  <b-collapse v-model="collapse[index].show">
                    <b-row v-for="(user, userIndex) in office.officeUsers" :key="userIndex" class="pt-4 align-items-center">
                      <b-col cols="6" sm="2">{{user.profileRole}}</b-col>
                      <b-col cols="6" sm="2">{{user.firstName}} {{user.lastName}}</b-col>
                      <b-col cols="6" sm="1">{{user.phoneNumber | formatPhone}}</b-col>
                      <b-col cols="6" sm="1">{{user.phoneExtension}}</b-col>
                      <b-col cols="6" sm="3" class="text-break">{{user.emailAddress}}</b-col>
                      <b-col cols="6" sm="1">
                        <b-icon @click="saveTempUser(index, userIndex)" v-b-modal.modal-user-edit role="button" icon="pencil-square" scale="1.5" class="mr-3"></b-icon>
                      </b-col>
                      <b-col cols="6" sm="2">
                        <b-form-select @change="changedUserStatus(index, userIndex, user, $event)" :value="user.userStatusID" size="sm" class="p-2" style="padding: 0px; width: 100px; height: 30px">
                          <b-form-select-option v-for="state in user_status_list" :value="state.value" :key="state.text">{{state.display}}</b-form-select-option>
                        </b-form-select>
                      </b-col>
                    </b-row>
                  </b-collapse>
                </b-col>
              </b-row>
            </div>
          </div>

          <!-- Create Company Modal -->
          <b-modal size="xl" id="modal-center">
            <template v-slot:modal-header="{ close }">
              <!-- Emulate built in modal header close button action -->
              <h5 v-if="role === 4"> Add new office </h5>
              <h5 v-else> Add </h5>
              <img @click="close()" role="button" alt="image" src="~@/assets/img/small-icons/small-modal-remove.png"/>
            </template>
            <hr />
            <b-row v-if="role === 4">
              <b-col>
                <div class="mb-1">Office Name <span style="color: red">*</span></div>
                <div>
                  <b-form-input v-model="newOffice.officeName" placeholder="Office Name"></b-form-input>
                  <div v-if="!newOffice.officeName" style="color: red; font-size: 12px">Name is required Field</div>
                </div>
              </b-col>
              <b-col>
                <div class="mb-1">Number <span style="color: red">*</span></div>
                <div style="border: 1px solid #ced4da; padding: 0.375rem 0.75rem;font-size: 1rem; font-weight: 400;line-height: 1.5;border-radius: 0.25rem; display: flex; algin-items: center">
                  <input v-model="newOffice.phoneNumber" style="border: none" placeholder="(___)___-____"/>
                  <div>Ext.</div>
                  <input style="border: none" v-model="newOffice.phoneExtension"/>
                </div>
                <div v-if="!newOffice.phoneNumber" style="color: red; font-size: 12px">Phone Number is required Field</div>
                <div v-else-if="!phoneValidation(newOffice.phoneNumber)" style="color: red; font-size: 12px">Phone number is invalid.</div>
              </b-col>
              <b-col>
                <div class="mb-1">Zip Code <span style="color: red">*</span></div>
                <div>
                  <b-form-input v-model="newOffice.zipCode" placeholder="Zip Code"></b-form-input>
                  <div v-if="!newOffice.zipCode" style="color: red; font-size: 12px">Zip Code is required Field</div>
                </div>
              </b-col>
            </b-row>
            <b-row class="mt-2" v-if="role === 4">
              <b-col>
                <div class="mb-1">Address <span style="color: red">*</span></div>
                <div>
                  <b-form-input v-model="newOffice.addressLine1" placeholder="Line 1"></b-form-input>
                </div>
                <div v-if="!newOffice.addressLine1" style="color: red; font-size: 12px">Address Line 1 is required Field</div>
                <div class="mt-1">
                  <b-form-input v-model="newOffice.addressLine2" placeholder="Line 2"></b-form-input>
                </div>
              </b-col>
              <b-col>
                <div class="mb-1">State <span style="color: red">*</span></div>
                <div>
                  <AutoCompleteState v-model="office_state" kind="0"/>
                  <div v-if="!office_state" style="color: red; font-size: 12px">State is required Field</div>
                </div>
              </b-col>
              <b-col>
                <div class="mb-1">City <span style="color: red">*</span></div>
                <div>
                  <autocomplete v-model="newOffice.city" kind="0" :state="office_state" :disabled="office_state===''"/>
                  <div v-if="!newOffice.city" style="color: red; font-size: 12px">City is required Field</div>
                </div>
              </b-col>
            </b-row>
            <b-row class="mt-3" v-if="role!==4">
              <b-col>
                <div class="mb-1" v-if="role === 4">Technical Contact</div>
                <div class="mb-1" v-else>Project Manager</div>
                <div><b-form-input v-model="point_name" placeholder="First & Last Name"></b-form-input></div>
              </b-col>
              <b-col>
                <div class="mb-1">Number</div>
                <div style="border: 1px solid #ced4da; padding: 0.375rem 0.75rem;font-size: 1rem; font-weight: 400;line-height: 1.5;border-radius: 0.25rem">
                  <input v-model="point_number" @input="acceptNumber" style="border: none" placeholder="(___)___-____"/>
                  <label>ext.</label>
                  <input v-model="point_fax" placeholder="" style="border: none"/>
                </div>
              </b-col>
              <b-col>
                <div class="mb-1">Email</div>
                <div><b-form-input v-model="point_email" placeholder="email@address.com"></b-form-input></div>
              </b-col>
            </b-row>
            <template v-slot:modal-footer="{ cancel }">
              <div>
                <b-btn v-if="role === 4" style="background-color: #0C2340; border-radius: 3px" @click="cancel()" class="mr-2">Cancel</b-btn>
                <b-btn v-if="role === 4" :disabled="!newOffice.officeName || !newOffice.phoneNumber || !newOffice.addressLine1 || !newOffice.city || !phoneValidation(newOffice.phoneNumber)" v-b-modal.modal-company-unique style="background-color: #0C2340; border-radius: 3px" @click="cancel(), addOffice()">Add New Office</b-btn>
                <b-btn v-if="role === 5" style="background-color: #0C2340; border-radius: 3px" @click="cancel()" class="mr-2">Cancel</b-btn>
                <b-btn v-if="role === 5" style="background-color: #0C2340; border-radius: 3px" @click="cancel()">Add</b-btn>
              </div>
            </template>
          </b-modal>

          <!-- Edit Each User Modal -->
          <b-modal size="xl" id="modal-user-edit">
            <template v-slot:modal-header="{ close }">
                <!-- Emulate built in modal header close button action -->
              <h5 v-if="role === 4"> Add new office </h5>
              <h5 v-else> Add </h5>
              <img @click="close()" role="button" alt="image" src="~@/assets/img/small-icons/small-modal-remove.png"/>
            </template>
            <hr />
            <b-row v-if="role === 4">
              <b-col>
                <div class="mb-1">First Name</div>
                <div><b-form-input placeholder="City" v-model="edit_user.firstName"></b-form-input></div>
                <div v-if="!edit_user.firstName" style="color: red; font-size: 12px">Name is required Field</div>
              </b-col>
              <b-col>
                <div class="mb-1">Last Name</div>
                <div><b-form-input placeholder="City" v-model="edit_user.lastName"></b-form-input></div>
                <div v-if="!edit_user.lastName" style="color: red; font-size: 12px">Name is required Field</div>
              </b-col>
              <b-col>
                <div class="mb-1">Number</div>
                <div style="border: 1px solid #ced4da; padding: 0.375rem 0.75rem;font-size: 1rem; font-weight: 400;line-height: 1.5;border-radius: 0.25rem; display: flex">
                  <input style="border: none" v-model="edit_user.phoneNumber" placeholder="(___)___-____"/>
                  <div>ext.</div>
                  <input v-model="edit_user.phoneExtension" placeholder="" style="border: none"/>
                </div>
                <div v-if="!edit_user.phoneNumber" style="color: red; font-size: 12px">Phone Number is required Field.</div>
                <div v-else-if="!phoneValidation(edit_company.phoneNumber)" style="color: red; font-size: 12px">Phone Number is invalid.</div>
              </b-col>
            </b-row>
            <b-row v-if="role === 4">
              <b-col>
                <div class="mb-1">Email</div>
                <div><b-form-input v-model="edit_user.emailAddress" placeholder="Email"></b-form-input></div>
                <div v-if="!edit_user.emailAddress" style="color: red; font-size: 12px">Email is required Field</div>
              </b-col>
              <b-col>
                <div class="mb-1">Status</div>
                <div>
                  <AutoCompleteState v-model="edit_user.userStatusID" kind="0"/>
                </div>
              </b-col>
              <b-col></b-col>
            </b-row>
            <template v-slot:modal-footer="{ cancel }">
              <div>
                <b-btn v-if="role === 4" style="background-color: #0C2340; border-radius: 3px" @click="cancel()" class="mr-2">Cancel</b-btn>
                <b-btn v-if="role === 4" :disabled="!phoneValidation(edit_user.phoneNumber) || !edit_user.firstName || !edit_user.phoneNumber || !edit_user.emailAddress" style="background-color: #0C2340; border-radius: 3px" @click="cancel(), saveEachUser()" class="mr-2">Save Updates</b-btn>
              </div>
            </template>
          </b-modal>

          <!-- Modal for edit office -->
          <b-modal size="xl" id="modal-edit-office">
            <template v-slot:modal-header="{ close }">
              <!-- Emulate built in modal header close button action -->
              <h5 v-if="role === 4"> Edit office </h5>
              <h5 v-else> Edit </h5>
              <img @click="close()" role="button" alt="image" src="~@/assets/img/small-icons/small-modal-remove.png"/>
            </template>
            <hr />
            <b-row v-if="role === 4">
              <b-col>
                <div class="mb-1">Office Name</div>
                <div><b-form-input v-model="edit_office.officeName" placeholder="Office Name"></b-form-input></div>
                <div v-if="!edit_office.officeName" style="color: red; font-size: 12px">Office name is required Field</div>
              </b-col>
              <b-col>
                <div class="mb-1">Number</div>
                <div style="border: 1px solid #ced4da; padding: 0.375rem 0.75rem;font-size: 1rem; font-weight: 400;line-height: 1.5;border-radius: 0.25rem; display: flex; align-items: center">
                  <input v-model="edit_office.phoneNumber" style="border: none" placeholder="(___)___-____"/>
                  <div>ext.</div>
                  <input placeholder="" style="border: none" v-model="edit_office.phoneExtension"/>
                </div>
                <div v-if="!edit_office.phoneNumber" style="color: red; font-size: 12px">Phone Number is required Field</div>
                <div v-else-if="!phoneValidation(edit_office.phoneNumber)" style="color: red; font-size: 12px">Phone Number is invalid.</div>
              </b-col>
              <b-col>
                <div class="mb-1">Company ID</div>
                <div><b-form-input v-model="edit_office.accountNumber" disabled></b-form-input></div>
              </b-col>
            </b-row>
            <b-row class="mt-2" v-if="role === 4">
              <b-col>
                <div class="mb-1">Address</div>
                <div><b-form-input v-model="edit_office.address.addressLine1" placeholder="Line 1"></b-form-input></div>
                <div class="mt-1"><b-form-input v-model="edit_office.addressLine2" placeholder="Line 2"></b-form-input></div>
                <div v-if="!edit_office.address.addressLine1" style="color: red; font-size: 12px">Address is required Field</div>
              </b-col>
              <b-col>
                <div class="mb-1">State</div>
                <div>                            
                  <AutoCompleteState :default_value="temp_state.id" v-model="temp_state" kind="0"/>
                  <div v-if="!temp_state.id" style="color: red; font-size: 12px">State is required Field</div>
                  <div class="mt-1">
                    <b-form-input v-model="edit_office.address.zipCode" placeholder="Zip Code"></b-form-input>
                  </div>
                </div>
              </b-col>
              <b-col>
                <div class="mb-1">City</div>
                <div>
                  <autocomplete v-model="temp_city" :kind="0" :state="temp_state" :default_stateCode="temp_state.code" :default_cityid="temp_city.id" :disabled="!temp_state.id"/>
                </div>
                <div v-if="!temp_city.id" style="color: red; font-size: 12px">City is required Field</div>
              </b-col>
            </b-row>
            <b-row class="mt-3" v-if="role !== 4">
              <b-col>
                <div class="mb-1" v-if="role === 4">Technical Contact</div>
                <div class="mb-1" v-else>Project Manager</div>
                <div><b-form-input v-``model="point_name" placeholder="First & Last Name"></b-form-input></div>
              </b-col>
              <b-col>
                <div class="mb-1">Number</div>
                <div style="border: 1px solid #ced4da; padding: 0.375rem 0.75rem;font-size: 1rem; font-weight: 400;line-height: 1.5;border-radius: 0.25rem">
                  <input v-model="point_number" @input="acceptNumber" style="border: none" placeholder="(___)___-____"/>
                  <label>ext.</label>
                  <input v-model="point_fax" placeholder="" style="border: none"/>
                </div>
              </b-col>
              <b-col>
                <div class="mb-1">Email</div>
                <div><b-form-input v-model="point_email" placeholder="email@address.com"></b-form-input></div>
              </b-col>
            </b-row>
            <template v-slot:modal-footer="{ cancel }">
              <div>
                <b-btn style="background-color: #0C2340; border-radius: 3px" @click="cancel()" v-if="role === 4" class="mr-2">Cancel</b-btn>
                <!-- for the company view -->
                <b-btn :disabled="!edit_office.officeName || !edit_office.address.addressLine1 || !temp_state.id || !temp_city.id" style="background-color: #0C2340; border-radius: 3px" @click="editOffice(), cancel()" v-if="role === 4">Save Updates</b-btn>
                <b-btn v-if="role === 5" style="background-color: #0C2340; border-radius: 3px" @click="cancel()" class="mr-2">Cancel</b-btn>
                <b-btn v-if="role === 5" style="background-color: #0C2340; border-radius: 3px" @click="editOffice(), cancel()">Save Updates</b-btn>
              </div>
            </template>
          </b-modal>

          <!-- Edit Company Modal  -->
          <b-modal size="xl" id="modal-edit-office-company">
            <template v-slot:modal-header="{ close }">
              <!-- Emulate built in modal header close button action -->
              <h5 v-if="role === 4"> Edit office </h5>
              <h5 v-else> Edit </h5>
              <img @click="close()" role="button" alt="image" src="~@/assets/img/small-icons/small-modal-remove.png"/>
            </template>
            <hr />
            <b-row class="ml-2 mt-2 border-bottom pb-4 container">
              <b-col lg="5">
                <div class="font-weight-600 mt-3">Company <span style="color: red">*</span></div>
                <div class="mt-2">
                  <b-form-input v-model="edit_company.companyName" placeholder="Google Healthcare"></b-form-input>
                  <div v-if="!edit_company.companyName" style="color: red; font-size: 12px">Name is required Field</div>
                </div>
              </b-col>    
              <b-col lg="3" offset-lg="1">
                <div class="font-weight-600 mt-3">Type of Account<span style="color: red">*</span></div>
                <div class="mt-2">
                  <b-form-input disabled v-model="edit_company.accountType" placeholder="Government"></b-form-input>
                  <div v-if="!edit_company.accountType" style="color: red; font-size: 12px">Type of Account is required Field</div>
                </div>
              </b-col>
            </b-row>
            <b-row class="ml-2 mt-2 border-bottom pb-4 container">
              <b-col lg="5">
                <div class="font-weight-600 mt-3">Business Address</div>
                <div class="font-weight-600 mt-3">Address Line1 <span style="color: red">*</span></div>
                <div class="mt-2">
                  <b-form-input v-model="edit_company.address.addressLine1" placeholder="Google Healthcare"></b-form-input>
                  <div v-if="!edit_company.address.addressLine1" style="color: red; font-size: 12px">Address Line 1 is required Field</div>
                </div>
                <div class="font-weight-600 mt-3">Address Line2</div>
                <div class="mt-2">
                  <b-form-input v-model="edit_company.address.addressLine2" placeholder="Google Healthcare"></b-form-input>
                </div>
                <b-row class="mt-3">
                  <b-col>
                    <div class="font-weight-bold">State <span style="color: red">*</span></div>
                    <AutoCompleteState :default_value="temp_state.id" v-model="temp_state" kind="0"/>
                    <div v-if="!edit_state" style="color: red; font-size: 12px">State is required Field</div>
                  </b-col>
                  <b-col>
                    <div class="font-weight-bold">City <span style="color: red">*</span></div>
                    <autocomplete v-model="temp_city" :kind="0" :state="temp_state" :default_stateCode="temp_state.code" :default_cityid="temp_city.id" :disabled="temp_state===''"/>
                    <div v-if="!temp_city.id" style="color: red; font-size: 12px">City is required Field</div>
                  </b-col>
                </b-row>
                <b-row class="mt-3">
                  <b-col>
                    <div class="font-weight-600 mt-3">Phone number <span style="color: red">*</span></div>
                    <div style="border: 1px solid #ced4da; padding: 0.375rem 0.75rem;font-size: 1rem; font-weight: 400;line-height: 1.5;border-radius: 0.25rem; display: flex; algin-items: center">
                      <input v-model="edit_company.phoneNumber" style="border: none" placeholder="(___)___-____"/>
                      <div>Ext.</div>
                      <input style="border: none" v-model="edit_company.phoneExtension"/>
                    </div>
                    <div v-if="!edit_company.phoneNumber" style="color: red; font-size: 12px">Phone Number is required field.</div>
                    <div v-else-if="!phoneValidation(edit_company.phoneNumber)" style="color: red; font-size: 12px">Phone Number is invalid.</div>
                  </b-col>
                </b-row>
              </b-col>
              <b-col lg="5" offset-lg="1">
                <div class="font-weight-600 mt-3">Billing Contact</div>
                <div class="font-weight-600 mt-3">Name <span style="color: red">*</span></div>
                <div class="mt-2">
                  <b-form-input v-model="edit_company.billingContactName" placeholder="Thomas"></b-form-input>
                </div>
                <div class="font-weight-600 mt-3">Phone number <span style="color: red">*</span></div>
                <div class="mt-2 d-flex"  style="border: 1px solid #ced4da; padding: 0.375rem 0.75rem;font-size: 1rem; font-weight: 400;line-height: 1.5;border-radius: 0.25rem; display: flex; algin-items: center">
                  <input v-model="edit_company.billingPhoneNumber" style="border: none" placeholder="(___)___-____"/>
                  <div>Ext.</div>
                  <input style="border: none" v-model="edit_company.billingPhoneExtension"/>
                </div>
                <div v-if="!phoneValidation(edit_company.billingPhoneNumber)" style="color: red; font-size: 12px">Phone Number is invalid.</div>
                <div class="font-weight-bold" style="margin-top: 10px">Zip Code <span style="color: red">*</span></div>
                  <b-form-input v-model="edit_company.address.zipCode" placeholder="10001"></b-form-input>
                <div v-if="!edit_company.address.zipCode" style="color: red; font-size: 12px">Zip is required Field</div>
              </b-col>
            </b-row>
            <template v-slot:modal-footer="{ cancel }">
              <div>
                <b-btn style="background-color: #0C2340; border-radius: 3px" @click="cancel()" v-if="role === 4" class="mr-2">Cancel</b-btn>
                <!-- Company Profile updates -->
                <b-btn style="background-color: #0C2340; border-radius: 3px" :disabled="!edit_company.phoneNumber || !phoneValidation(edit_company.phoneNumber) || !edit_company.address.zipCode || !edit_company.companyName || !edit_company.accountType || !edit_company.address.addressLine1 || !temp_state.id || !temp_city.id" @click="editMainCompany(), cancel()" v-if="role === 4">Save Updates</b-btn>
                <b-btn v-if="role === 5" style="background-color: #0C2340; border-radius: 3px" @click="cancel()" class="mr-2">Cancel</b-btn>
                <b-btn v-if="role === 5" style="background-color: #0C2340; border-radius: 3px" @click="editOffice(), cancel()">Save Updates</b-btn>
              </div>
            </template>
          </b-modal>
            
          <!-- Profile icon delete confirm modal -->
          <b-modal id="profile-icon-delete-modal" centered>
            <template v-slot:modal-header="{}">
              <span @click="close()"></span>
            </template>
            <div class="text-center project-detail">
              <div class="mb-3">Are you sure want to remove your profile picture?</div>
            </div>
            <template v-slot:modal-footer="{ ok }">
              <div class="text-center mb-4" style="margin-left: auto; margin-right: auto;">
                <b-btn class="dialog-btn-style second-btn-style mr-2" @click="ok()">Cancel</b-btn>
                <b-btn class="dialog-btn-style second-btn-style" @click="ok(), deleteProfilePicture()">Yes</b-btn>
              </div>
            </template>
          </b-modal>

          <!-- user status changing modal -->
          <b-modal id="user-status-change-modal" no-close-on-backdrop centered>
            <template v-slot:modal-header="{}">
              <span @click="close()"></span>
            </template>
            <div class="text-center project-detail" style="font-size: 17px; padding: 0 16%">
              <div class="mb-3">Are you sure want to change the status of the user?</div>
              <div class="mb-3">Once the status is changed, the user might not be able to access their account</div>
            </div>
            <template v-slot:modal-footer="{ ok }">
              <div class="text-center mb-4" style="margin-left: auto; margin-right: auto;">
                <b-btn class="dialog-btn-style second-btn-style mr-4" @click="ok(), changeUserStatus()">Confirm</b-btn>
                <b-btn class="dialog-btn-style second-btn-style" @click="ok(), cancelUserStatus()">Cancel</b-btn>
              </div>
            </template>
          </b-modal>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import EventBus from '../../../plugins/event-bus';
import Avatar from 'vue-avatar-component'
import FileUpload from 'vue-upload-component/dist/vue-upload-component.part.js';
import AccountProxy from '@/proxies/AccountProxy.js';
import AddressProxy from '@/proxies/AddressProxy.js';
import AvatarCropper from "vue-avatar-cropper"
import Autocomplete from '@/components/AutocompleteCity.vue';
import AutoCompleteState from '@/components/AutoCompleteState.vue';

import {BIcon, BIconPencilSquare, BIconTrash } from 'bootstrap-vue'
export default {
  name: 'CompanyProfile',
  props: ['role'],
  components: {
    BIcon,
    BIconPencilSquare,
    Avatar,
    FileUpload,
    AvatarCropper,
    BIconTrash,
    Autocomplete,
    AutoCompleteState
  },

  data() {
    return {
      //all the data fields for the creating company
      newOffice: {},
      create_office_name: '',
      office_number: '',
      office_fax: '',
      office_address_1: '',
      office_city: '',
      office_state: '',
      office_address_2: '',
      point_name: '',
      point_number: '',
      point_fax: '',
      point_email: '',
      admin_name: '',
      admin_number: '',
      admin_fax: '',
      admin_email: '',
      admin_status: '',
      billing_name: '',
      billing_number: '',
      billing_fax: '',
      billing_email: '',
      edit_office_index: '',
      companyProfile: {},
      collapse: [],
      new_office_unique_id: '',
      edit_user_info: {},
      user_status_list: [
          { text: 'Active', display:'Active', value: 1 },
          { text: 'Suspended', display:'Hold', value: 2 },
          { text: 'Terminated', display: 'Terminated', value: 3 }
      ],
      each_user_edit: {},
      edit_office_index: '',
      edit_user_index: '',
      company_info: {},
      edit_company:{
        address: {}
      },
      edit_office: {
        address: {}
      },
      edit_user: {},
      state_list: [],
      city_list: [],
      edit_state: {},
      document_files: [],     
      userAvatar: undefined,
      base_url: process.env.VUE_APP_API_BASE_URL,
      account_code: {
        accountCode: ''
      },
      temp_state: {
        code: '',
        id: '',
        name: ''
      },
      temp_city: {
        id: '',
        name: ''
      },
      state_changed_user_index: {},
      prevUserStatus: null
    }
  },

  methods: {
    addOffice() {
      this.newOffice.state = this.office_state;
      let params = {
        addressLine1: this.newOffice.addressLine1,
        city: this.newOffice.city.name,
        officeName: this.newOffice.officeName,
        phoneExtension: this.newOffice.phoneExtension,
        phoneNumber: this.newOffice.phoneNumber,
        state: this.newOffice.state.code,
        zipCode: this.newOffice.zipCode,
        address: {
          addressLine1: this.newOffice.addressLine1,
          addressLine2: this.newOffice.addressLine2,
          cityId: this.newOffice.city.id,
          cityName: this.newOffice.city.name,
          stateId: this.newOffice.state.id,
          stateCode: this.newOffice.state.code,
          stateName: this.newOffice.state.name,
          zipCode: this.newOffice.zipCode
        }
      }
      new AccountProxy().saveOffice(params)
        .then(response => {
          this.getCompanyProfile();
        })
        .catch(err => {
          console.error(err);
        })
    },
    
    acceptNumber() {
      var x = this.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      this.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    },

    getCompanyProfile(){
      new AccountProxy().getCompanyProfile()
        .then(response => {
          this.companyProfile = response;
          this.company_info = response;
          console.log("%@%@", this.company_info, this.$store.state.auth.profile);
          this.account_code.accountCode = response.accountCode;
          //Set the collapse variables
          for(let i=0; i<response.accountOffices.length; i++){
            this.collapse.push({show: false});
          }
        })
        .catch(error => {
          console.error('error123!: ' + error);
        })
    },

    editOffice(){
      this.edit_office.address.cityId = this.temp_city.id;
      this.edit_office.address.cityName = this.temp_city.name;
      this.edit_office.address.stateId = this.temp_state.id;
      this.edit_office.address.stateName = this.temp_state.name;
      this.edit_office.address.stateCode = this.temp_state.code;

      this.edit_office.addressLine1 = this.edit_office.address.addressLine1;
      this.edit_office.addressLine2 = this.edit_office.address.addressLine2;
      this.edit_office.cityName = this.temp_city.name;
      this.edit_office.stateCode = this.temp_state.code;
      this.edit_office.zipCode = this.edit_office.address.zipCode;

      this.company_info.accountOffices[this.edit_office_index] = this.edit_office;
      new AccountProxy().updateAccountOffice(this.edit_office)
      .then(response => {
        this.$forceUpdate();
      })
      .catch(error => {
        console.error('error123!: ' + error);
      })                 
    },

    openModal() {
      this.$emit('openProfileModal');
      setTimeout(() => {
        EventBus.$emit('edit_user_profile', {
          user_role: this.role
        })
      }, 1)
    },

    clickViewMore(index){
      this.collapse[index].show = !this.collapse[index].show;
      if(this.collapse[index].show == true){
        for(let i=0; i<this.collapse.length; i++){
          if(i == index) continue;
          else this.collapse[i].show = false;
        }
      }
    },

    gotoInvite(){
      this.$router.push('/dashboard/companyinvite');
    },

    saveEachUser(){
      //TODO Need to send the request to the backend to save the changes
      this.company_info.accountOffices[this.edit_office_index].officeUsers[this.edit_user_index] = this.edit_user;
      this.$forceUpdate();
      this.realcompanyEdit();
    },

    companyEdit(){
      this.edit_company = Object.assign({}, this.company_info);
      
      this.temp_state.id = this.edit_company.address.stateId;
      this.temp_state.name = this.edit_company.address.stateName;
      this.temp_state.code = this.edit_company.address.stateCode;

      this.temp_city.id = this.edit_company.address.cityId;
      this.temp_city.name = this.edit_company.address.cityName;

      this.$bvModal.show('modal-edit-office-company');
    },
    
    //edit main company function
    editMainCompany(){
      this.edit_company.state = this.temp_state.id;
      this.edit_company.accountOffices[0].address.stateId = this.temp_state.id;
      this.edit_company.accountOffices[0].address.stateCode = this.temp_state.code;
      this.edit_company.accountOffices[0].address.stateName = this.temp_state.name;
      this.edit_company.accountOffices[0].address.cityId = this.temp_city.id;
      this.edit_company.accountOffices[0].address.cityName = this.temp_city.name;

      this.edit_company.address = this.edit_company.accountOffices[0].address;

      this.company_info = this.edit_company;
      this.realcompanyEdit();
    },

    //Can use companyEdit function on anywhere for the editing
    realcompanyEdit(){
      new AccountProxy().updateAccount(this.company_info)
        .then(response => {
          // Sanjan, what do you need in the response?
          // We need to reload the company, right?
          
          //Show the success notification
          this.$notify({
            group: 'foo',
            title: 'Notification',
            text: 'Edit successfully',
            duration: 1000,
            speed: 1000,
            type: 'success'
          });
        })
        .catch(error => {
          console.error('error123!: ' + error);
        })   
    },

    formatEditCity(){
      this.company_edit_info.city = '';
    },

    saveTempOffice(index){
      this.edit_office = Object.assign({}, this.company_info.accountOffices[index]);
      //Set the temp
      this.temp_state.id = this.edit_office.address.stateId;
      this.temp_state.code = this.edit_office.address.stateCode;
      this.temp_state.name = this.edit_office.address.stateName;
      this.temp_city.id = this.edit_office.address.cityId;
      this.temp_city.cityName = this.edit_office.address.cityName;

      this.edit_office_index = index;
      this.$bvModal.show('modal-edit-office');
    },

    saveTempUser(officeIndex, userIndex){
      this.edit_user = Object.assign({}, this.company_info.accountOffices[officeIndex].officeUsers[userIndex]);
      this.edit_office_index = officeIndex;
      this.edit_user_index = userIndex;
    },

    deleteProfilePicture() {
      var params = new URLSearchParams();
      params.append("accountCode", this.company_info.accountCode);     
      new AccountProxy().deleteCompanyLogo(params)
        .then(response => {
        })
    },

    phoneValidation(phone){
      var phoneRegex =  new RegExp(/^[+]?(?:[0-9]{2})?[0-9]{10}$/g);
      return phoneRegex.test(phone);
    },

    changedUserStatus(index, userIndex, prev, newVal){
      this.prevUserStatus = prev.userStatusID;
      this.state_changed_user_index = {
        index,
        userIndex
      }
      prev.userStatusID = newVal;
      this.$bvModal.show('user-status-change-modal');
    },

    changeUserStatus() {
      const { index, userIndex } = this.state_changed_user_index;
      const user = this.company_info.accountOffices[index].officeUsers[userIndex];
      let userStatusID;
      this.user_status_list.forEach(state => {
        if (state.value == user.userStatusID) {
          userStatusID = state.text;
        }
      })
      let formData = new FormData();
      formData.append('status', userStatusID);
      formData.append('userCode', user.userCode);
      new AccountProxy().setUserStatus(formData)
        .then(response => {
        })
        .catch(error => {
            
        })
    },

    cancelUserStatus() {
      const { index, userIndex } = this.state_changed_user_index;
      this.company_info.accountOffices[index].officeUsers[userIndex].userStatusID = parseInt(this.prevUserStatus);
    },

    isPortfolioAdminOffice(office) {
      console.log("@#$@#", office, this.$store.state.auth.profile);
      const user = this.$store.state.auth.profile;
      let res = false;
      for (let i = 0; i < user.accountOffices.length; i++) {
        const e = user.accountOffices[i];
        if(e.id === office.id) {
          res = true;
        }
      }
      return this.role === 5 && (office.officeName === 'Main Office' || res)
    }
  },

  created() {
    //Get state list
    new AddressProxy().getStates().then((response) => {
      this.state_list = response;
    })
    this.getCompanyProfile();
  },

  filters: {
    formatPhone: function (phoneNumberString) {
      var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
      var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
      if (match) {
        var intlCode = (match[1] ? '+1 ' : '')
        return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
      }
      return null
    }
  },

  watch: {
    office_state: function(newVal) {
      this.temp_city = '';
      new AddressProxy().getCities(newVal).then((response) => {
        this.city_list = response;
      })
      .catch(error => {
        console.error(error);
      });  
    },

    edit_state: function(newVal) {
      this.temp_city = '';
      new AddressProxy().getCities(newVal).then((response) => {
        this.city_list = response;
      })
      .catch(error => {
        console.error(error);
      });  
    },

    //If the file is changed, it will saved to the backend as logo.
    document_files: function(newFile) {
      let formData = new FormData();
      formData.append('accountCode', this.company_info.accountCode);
      formData.append('file', newFile[0].file);
      var options = {
        headers: { 'Content-Type': 'multipart/form-data' },
      };
      new AccountProxy().uploadCompanyLogo(formData, options)
        .then(response => {
          this.company_info.logoPath = response.data;
        })
        .catch(error => {
            
        })
    }
  },
};
</script>

<style scoped>
.profile-icon {
  color: #0C2340;
}
.custom-button {
  background: rgba(0, 0, 0, 0);
  border-color: rgba(0, 0, 0, 0);
  margin: auto;
}
.custom-button-delete {
  background: rgba(0, 0, 0, 0);
  border-color: rgba(0, 0, 0, 0);
  right: 40px;
}
.dash-profile {
  font-family: Montserrat;
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  margin: 1vw 1vw;
  padding: 20px 20px 2vw 30px;
  font-weight: 600;
  font-size: 12px;
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
.dialog-btn-style {
  padding: 7px 40px 7px 40px;
  border-radius: 8px;
  border-width: 0;
}
.second-btn-style {
  background-color: #83afdb;
}
.first-btn-style {
  background-color: #19293e;
}
@media (min-width: 576px){
  .modal-dialog {
    min-height: calc(100% - 3.5rem);
  }
}
</style>
