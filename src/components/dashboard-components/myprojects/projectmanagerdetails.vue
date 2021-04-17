<template>
  <div v-if="Object.keys(project).length > 0" class="project_manager_detail position-relative">
    <div class="content-header">
      <div class="header-label">
        Details
      </div>
      <div class="header-button-group">
        <b-button :disabled="submitted" @click="toEditWindow" class="custom-btn-style" variant="outline-primary" size="sm">
          <span v-if="edit">Save</span>
          <span v-else>Edit</span>
        </b-button>
        <b-button :disabled="submitted" v-b-modal.modal-center1 class="custom-btn-style ml-3" variant="outline-primary" size="sm">
          <span>Submit</span>
        </b-button>
        <b-button v-b-modal.delete-modal class="custom-btn-style ml-3" variant="outline-primary" size="sm">
          <span>Delete</span>
        </b-button>
      </div>
    </div>
    <b-row>
      <b-col sm="6">
        <b-row class="mb-4">
          <b-col>
            <div class="label mb-1">Project Name</div>
            <div>
              <b-form-input v-if="edit" class="custom-input-style" v-model="project.name" placeholder="Enter your name"></b-form-input>
              <span v-else class="custom-input-style pt-4 content-section-text">{{ project.name }}</span>
            </div>
          </b-col>
        </b-row>
        <b-row class="mb-4">
          <b-col>
            <div class="label mb-1">Category</div>
            <div>
              <span v-if="project.buildingType.category === undefined" class="custom-input-style pt-4 content-section-text">Undefined</span>
              <span v-else class="custom-input-style pt-4 content-section-text">Category {{ project.buildingType.category }}</span>
            </div>
          </b-col>
        </b-row>
        <b-row class="mb-4">
          <b-col>
            <div class="label mb-1">Start Date</div>
            <div>
              <b-input-group v-if="edit">
                <b-form-datepicker id="start_date" v-model="project.dateStart" class="mb-2 mt-2" placeholder="Choose a date" :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }">
                </b-form-datepicker>
              </b-input-group>
              <span v-else class="custom-input-style pt-4 content-section-text">{{ project.dateStart }}</span>
            </div>
          </b-col>
        </b-row>
        <b-row class="mb-4">
          <b-col>
            <div class="label mb-1">Delivery Method</div>
            <b-form-select v-if="edit" v-model="project.deliveryMethod" :options="deliveryMethods" placeholder="Delevery Select" class="mt-2"></b-form-select>
            <div v-else>
              <span class="custom-input-style pt-4 content-section-text">{{ project.deliveryMethod }}</span>
            </div>
          </b-col>
        </b-row>
        <b-row class="mb-4">
          <b-col>
            <div class="label mb-1">State</div>
            <b-form-select v-if="edit" v-model="project.state" placeholder="State" class="mt-2">
              <option v-for="state in states" :key="state.code" :value="state">{{state.name}}</option>
            </b-form-select>
            <div v-else>
              <span class="custom-input-style pt-4 content-section-text">{{ project.state.name }}</span>
            </div>
          </b-col>
        </b-row>
        <b-row class="mb-4">
            <b-col>
                <div class="label mb-1">Project Details</div>
                <div v-if="edit">
                    <b-form-textarea
                        class="custom-textarea-style"
                        id="textarea-no-resize"
                        placeholder="Fixed height textarea"
                        rows="3"
                        v-model="project.narrative"
                        no-resize
                    ></b-form-textarea>
                </div>
                <div class="pt-4 content-section-text" v-else>
                    {{ project.narrative }}
                </div>
            </b-col>
        </b-row>
      </b-col>
      <b-col sm="6">
        <b-row class="mb-4">
          <b-col>
            <div class="label mb-1">Building Type</div>
            <div v-if="edit" style="position: relative">
              <autocomplete :search="search" @submit="searchChange($event)" placeholder="Some Building Type" aria-label="Some Building Type">
                <template #default="{rootProps, inputProps, inputListeners, resultListProps, resultListListeners, results, resultProps}">
                  <div v-bind="rootProps">
                  <input v-bind="inputProps" v-on="inputListeners" v-model="custom_character" :style="no_data? 'padding: 5px 40% 5px 10px !important; ':''"/>
                  <ul v-bind="resultListProps" v-on="resultListListeners">
                    <li v-for="(result, index) in results" :key="resultProps[index].id" v-bind="resultProps[index]">{{ result }}</li>
                  </ul>
                  </div>
                </template>
              </autocomplete>
              <div v-if="no_data" class="d-flex align-items-center" role="button" style="position: absolute; right: 10px; top: 8px;" @click="addCustomBuildingType">
                <b-icon icon="plus" scale="1.5"></b-icon>
                <div>Add Building Type</div>
              </div>
            </div>
            <div v-else>
              <b-form-input v-if="edit" class="custom-input-style" v-model="project.buildingType.name"></b-form-input>
              <span v-else class="custom-input-style pt-4 content-section-text">{{ project.buildingType.name }}</span>
            </div>
          </b-col>
        </b-row>
        <b-row class="mb-4">
          <b-col>
            <div class="label mb-1">End Date</div>
            <div>
              <b-input-group v-if="edit">
                <b-form-datepicker id="end_date" :min="project.dateStart" v-model="project.dateEnd" class="mb-2 mt-2" placeholder="Choose a date" :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }">
                </b-form-datepicker>
              </b-input-group>
              <span v-else class="custom-input-style pt-4 content-section-text">{{ project.dateEnd }}</span>
            </div>
          </b-col>
        </b-row>
        <b-row class="mb-4">
          <b-col>
            <div class="label mb-1">Procurement Method</div>
            <b-form-select v-if="edit" v-model="project.procurementMethod" :options="procurementMethods" placeholder="Delevery Select" class="mt-2"></b-form-select>
            <div v-else>
            <span class="custom-input-style pt-4 content-section-text">{{ project.procurementMethod }}</span>
            </div>
          </b-col>
        </b-row>
        <b-row class="mb-4">
          <b-col>
            <div class="label mb-1">Budget</div>
            <b-row class="align-items-center">
              <b-col md="5">
                <b-form-input v-if="edit" class="custom-input-style" v-model="project.budget"></b-form-input>
                <span v-else class="custom-input-style pt-4 content-section-text">{{ project.budget | formatMoney('$', 0) }}</span>
              </b-col>
              <b-col style="display: flex; algin-items: center">
                <span>{{ project.budget | toWords}}</span>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <!-- <b-row class="mb-2 pl-2">
        <b-col md="3">
            <div class="mb-2 small-font-style d-flex align-items-center">
                <span class="mr-3">Upload <b>project details</b> document</span>
                <div style="position: relative">
                    <b-button class="custom-btn-style" size="sm">Upload</b-button>
                    <file-upload
                        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%"
                        accept=".jpg,.pdf"
                        @input="uploadProjectDetailsDoc"
                    ></file-upload>
                </div>
            </div>
        </b-col>
    </b-row> -->
    <!-- <b-row class="mb-4 pl-2">
        <b-col md="10">
            <div class="label mb-2">Project Drawings</div>
            <div class="p-4 drawings-area">
                <div class="d-flex mb-2">
                    <LightBox
                    :media="media"
                    :show-light-box="show_image_gallery"
                    @toggleLightBox="toggleLightBox"
                    ></LightBox>
                    <div class="mr-4 photo-img" v-for="(drawing, index) in drawings" :key="drawing.filePath" style="position: relative">
                        <img
                            :key="index"
                            width="140"
                            height="180"
                              :src="drawing.pages[0] && drawing.pages[0].images[0].smallImagePath"
                            alt="Drawings"
                            @click="openImageGallery(index, 'drawing')"
                        />
                        <b-icon class="tooltiptext" style="position: absolute; right:0; top: 0" @click="deleteSelectDocument(drawing.id, 'drawings')" v-b-modal.modal-center2 role="button"  icon="x-circle-fill" scale="1.5" variant="danger"></b-icon>
                        <div role="button" v-b-tooltip.hover :title="drawing.fileName" v-if="drawing.fileName.length > 10" class="text-center">
                            {{ drawing.fileName.substring(0, 7) + "..." }}
                        </div>
                        <div v-else class="text-center">
                            {{ drawing.fileName }}
                        </div>
                    </div>
                    <vue-loading v-if="is_loading=='drawing'" style="margin-left: 10px" type="bars" color="#d9544e" :size="{ width: '50px', height: '50px' }"></vue-loading> 
                </div>
            </div>
        </b-col>
    </b-row> -->
    <!-- <b-row class="mb-2 pl-2">
        <b-col md="3">
            <div class="mb-2 small-font-style d-flex align-items-center">
                <span class="mr-3">Upload <b>project additional</b> drawings</span>
                <div style="position: relative">
                    <b-button class="custom-btn-style" size="sm">Upload</b-button>
                    <file-upload
                        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%"
                        accept=".pdf"
                        v-model="project_drawings"
                    ></file-upload>
                </div>
            </div>
        </b-col>
    </b-row> -->
    <!-- <b-row class="mb-4 pl-2">
        <b-col md="10">
            <div class="label mb-2">Additional Photos</div>
            <div class="p-4 drawings-area">
                <div class="d-flex mb-2 align-items-center">
                    <div class="mr-4 photo-img" v-for="(photo, index) in photos" :key="index" style="position: relative">
                        <img
                            width="140"
                            :src="photo.smallImagePath"
                            alt="Photo"
                            @click="openImageGallery(index, 'photo')"
                        />
                        <b-icon class="tooltiptext" style="position: absolute"  @click="deleteSelectDocument(photo.dbFileId, 'photos')"  v-b-modal.modal-center2 role="button"  icon="x-circle-fill" scale="1.5" variant="danger"></b-icon>
                        <div role="button" v-b-tooltip.hover :title="photo.fileName" v-if="photo.fileName.length > 10" class="text-center">
                            {{ photo.fileName.substring(0, 7) + "..." }}
                        </div>
                        <div v-else class="text-center">
                            {{ photo.fileName }}
                        </div>
                    </div>
                    <vue-loading v-if="is_loading=='photo'" style="margin-left: 10px" type="bars" color="#d9544e" :size="{ width: '50px', height: '50px' }"></vue-loading> 
                </div>
            </div>
        </b-col>
    </b-row> -->
    <!-- <b-row class="mb-2 pl-2">
      <b-col md="3">
        <div class="mb-2 small-font-style d-flex align-items-center">
          <span class="mr-3">Upload <b>project additional</b> photos</span>
          <div style="position: relative">
            <b-button class="custom-btn-style" size="sm">Upload</b-button>
            <file-upload style="position: absolute; top: 0; left: 0; width: 100%; height: 100%" accept=".jpg,.pdf" v-model="additional_photo_files"></file-upload>
          </div>
        </div>
      </b-col>
    </b-row> -->
    <!-- <b-row class="mb-4 pl-2">
      <b-col md="10">
        <div class="label mb-2">Project Documents</div>
        <div class="p-4 drawings-area">
          <div class="d-flex mb-2 align-items-center">
            <div class="mr-4 photo-img" v-for="(document, index) in documents" :key="index" style="position: relative">
              <b-icon class="tooltiptext" style="position: absolute"  @click="deleteSelectDocument(document.dbFileId, 'documents')"  v-b-modal.modal-center2 role="button"  icon="x-circle-fill" scale="1.5" variant="danger"></b-icon>
              <div role="button" v-b-tooltip.hover :title="document.fileName" v-if="document.fileName.length > 10" class="text-center">
                {{ document.fileName.substring(0, 7) + "..." }}
              </div>
              <div v-else class="text-center">
                {{ document.fileName }}
              </div>
            </div>
            <vue-loading v-if="is_loading=='document'" style="margin-left: 10px" type="bars" color="#d9544e" :size="{ width: '50px', height: '50px' }"></vue-loading> 
          </div>
        </div>
      </b-col>
    </b-row> -->
    <!-- <b-row class="mb-2 pl-2">
      <b-col md="3">
        <div class="mb-2 small-font-style d-flex align-items-center">
          <span class="mr-3">Upload <b>project additional</b> project documents</span>
          <div style="position: relative">
            <b-button class="custom-btn-style" size="sm">Upload</b-button>
            <file-upload style="position: absolute; top: 0; left: 0; width: 100%; height: 100%" accept=".doc,.pdf" v-model="document_files"></file-upload>
          </div>
        </div>
      </b-col>
    </b-row> -->
    <b-row class="mb-4 pl-2">
      <b-col md="10">
        <div class="replies-area">
          <b-row class="no-gutters mt-2">
            <b-col class="half-line-left" cols="5"></b-col>
            <b-col cols="2" class="small-font-style font-weight-normal text-center">View 2 previous replies</b-col>
            <b-col class="half-line-right" cols="5"></b-col>
          </b-row>
          <div class="mt-4">
            <span class="mr-2">From</span>
            <span style="font-weight: 500">Roger Client</span>
          </div>
          <div class="d-flex mt-4 justify-content-between">
            <div class="d-flex">
              <div class="mr-4">
                <img src="~@/assets/img/small-icons/client-avatar.png" alt=""/>
              </div>
              <div class="font-weight-normal">
                <div style="font-weight: 600">Roger Client</div>
                <div class="mt-2">Hello Joe the Estimator</div>
                <div class="mt-2">Thank you for the message. Some more text goes here ...</div>
              </div>
            </div>
            <div style="color: #909090" class="font-weight-normal"> January 1, 2020, 9:30 AM </div>
          </div>
          <b-button class="btn-style d-flex align-items-center justify-content-around rounded mt-4 mb-4" style="background-color: #0C2340">
            <img class="mr-3" alt="Reply Image" src="~@/assets/img/small-icons/reply.png"/>
            <span class="mr-3">Reply</span>
          </b-button>
        </div>
      </b-col>
    </b-row>
    <b-modal id="modal-center1" centered>
      <template v-slot:modal-header="{}">
        <span @click="close()"></span>
      </template>
      <div class="text-center">
        Are you sure you want to submit the project details?
        <br />
        Once the project details is submitted you cannot edit the document.
      </div>
      <template v-slot:modal-footer="{ ok }">
        <div class="text-center mb-4" style="margin-left: auto; margin-right: auto">
          <b-btn class="mr-5 pr-4 pl-4" style="background-color: #0C2340; border-color: white" @click="ok(), submitProject()">Yes</b-btn>
          <b-btn class="pr-4 pl-4" style="background-color: #95B8E4; border-color: white" @click="ok()">No</b-btn>
        </div>
      </template>
    </b-modal>
    <b-modal id="delete-modal" centered>
      <template v-slot:modal-header="{}">
        <span @click="close()"></span>
      </template>
      <div class="text-center">Are you sure you want to delete this project?</div>
      <template v-slot:modal-footer="{ ok }">
        <div class="text-center mb-4" style="margin-left: auto; margin-right: auto">
          <b-btn class="mr-5 pr-4 pl-4" style="background-color: #0C2340; border-color: white" @click="ok(), deleteProject()">Yes</b-btn>
          <b-btn class="pr-4 pl-4" style="background-color: #95B8E4; border-color: white" @click="ok()">No</b-btn>
        </div>
      </template>
    </b-modal>
    <b-modal id="modal-center2" centered>
      <template v-slot:modal-header="{}">
        <span @click="close()"></span>
      </template>
      <div class="text-center">
        Are you sure you would like to delete this file?
        <br />
        This will move it to the trash folder.
      </div>
      <template v-slot:modal-footer="{ ok }">
        <div class="text-center mb-4" style="margin-left: auto; margin-right: auto">
          <b-btn class="mr-5 pr-4 pl-4" style="background-color: #0C2340; border-color: white" @click="ok(), deleteDocument()" >Yes</b-btn>
          <b-btn class="pr-4 pl-4" style="background-color: #95B8E4; border-color: white" @click="ok()">No</b-btn>
        </div>
      </template>
    </b-modal>
  </div>
</template>
<script>
import AddressProxy from '@/proxies/AddressProxy.js';
var converter = require('number-to-words');
import { VueLoading } from 'vue-loading-template'
import FileUpload from 'vue-upload-component/dist/vue-upload-component.part.js';
import FileProxy from '@/proxies/FileProxy.js';
import ProjectProxy from '@/proxies/ProjectProxy.js';
import Autocomplete from '@trevoreyre/autocomplete-vue';
import EstimatorProxy from '@/proxies/EstimatorProxy.js';
import { BIcon, BIconThreeDotsVertical, BIconPlus, BIconXCircle, BIconXCircleFill } from 'bootstrap-vue'
import NProgress from 'nprogress/nprogress';
import VueSlickCarousel from 'vue-slick-carousel';
  // optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
  // optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import LightBox from "vue-it-bigger-vladfork";
import("vue-it-bigger-vladfork/dist/vue-it-bigger-vladfork.min.css");

export default {
    name: 'ProjectManagerDetails',
    props: ['role', 'project_id'],
    components: {
        Autocomplete,
        EstimatorProxy,
        BIcon,
        BIconThreeDotsVertical,
        BIconXCircle,
        BIconPlus,
        FileUpload,
        BIconXCircleFill,
        VueLoading,
        VueSlickCarousel,
        LightBox
    },
    data() {
        return {
            project:{},
            errors: [],
            project_name: 'Some Project Name',
            category: 'Some Category',
            building_type: [],
            start_date: '2020-07-20',
            budget: '',
            project_detail:
                'This project consists of the acquisition of flood damaged properties located adjacent to the Park River (in the floodway) (photos were provided). Nineteen (19) properties have been identified as having substantial damages and are at high risk for future flood damages. Once acquired, these structures will be put up for bid for relocation outside the 100-year floodplain. Any unsold homes will be demolished and removed. ',
            images: [1, 2, 3, 4, 5, 6],
            drawings: [],
            photos: [],
            documents: [],
            edit: false,
            word: '',
            media: [
                { // For image
                    thumb: 'https://picsum.photos/id/870/200/300?grayscale&blur=2',
                    src: 'https://picsum.photos/id/870/200/300?grayscale&blur=2',
                },
                { // For image
                    thumb: 'https://picsum.photos/id/870/200/300?grayscale&blur=2',
                    src: 'https://picsum.photos/id/870/200/300?grayscale&blur=2',
                }
                
            ],
            submitted: false,
            deliveryMethods:[
                { key: 'Construction Manager at Risk',text: 'Construction Manager at Risk', value: 'CM_at_Risk' },
                { key: 'Construction Manager or Project Manager',text: 'Construction Manager or Project Manager', value: 'CM_MP' },
                { key: 'Design_Bid_Build',text: 'Design Bid Build', value: 'Design_Bid_Build' },
                { key: 'Design_Build',text: 'Design Build', value: 'Design_Build' },
                { key: 'Public_Private_Partnership',text: 'Public Private Partnership', value: 'Public_Private_Partnership' }
            ],
            procurementMethods: [
                { key: 'LumpSum',text: 'LumpSum', value: 'LumpSum' },
                { key: 'CompetitiveBid',text: 'CompetitiveBid', value: 'CompetitiveBid' },
                { key: 'CostPlus', text: 'CostPlus',value: 'CostPlus' },
                { key: 'TimeAndMaterials',text: 'TimeAndMaterials', value: 'TimeAndMaterials' }
            ],

            states:[],
            category_name: '',
            no_data: false,
            custom_character: '',
            deleteIndex: 0,
            document_files: [],
            project_drawings: [],
            additional_photo_files: [],
            file_data: [],
            delete_document: {},
            is_loading: '',
            show_image_gallery: false
        };
    },
    methods: {
        openImageGallery(index, type){
            this.media = [];
            if(type=='drawing'){
                for(var i=0; i<this.drawings[index].pages.length; i++){
                    this.media.push({
                        thumb: this.drawings[index].pages[i] && this.drawings[index].pages[i].images[0].largeImagePath,
                        src: this.drawings[index].pages[i] && this.drawings[index].pages[i].images[0].largeImagePath
                    });
                }
            }
            if(type=='photo'){
                this.media = [];
                this.media.push({
                    thumb: this.photos[index].largeImagePath,
                    src: this.photos[index].largeImagePath
                });
            }
            this.show_image_gallery = true;
        },
        onContext(ctx) {
            // The date formatted in the locale, or the `label-no-date-selected` string
            this.formatted = ctx.selectedFormatted;
            // The following will be an empty string until a valid date is entered
            this.selected = ctx.selectedYMD;
        },
        toEditWindow() {
            this.edit = !this.edit;
            this.project.nextStatus = "confirmed";
            if(!this.edit) this.saveProject();
        },
        async search(input) {
            this.custom_character = input;
            if (input.length < 1) {
                return [];
            }
            let result = [];
            const results = await this.receiveResult(input);
            return results.filter(element => {
                return element.toLowerCase().startsWith(input.toLowerCase());
            });
        },
        getProject(){
            // TODO
            new ProjectProxy().find(this.project_id).then((response) => {
                this.project = response.project;
                this.drawings = response.drawings;
                // this.drawings = [
                //     {
                //         fileName: "sample.pdf",
                //         filePath: "https://construction-check-development.s3.amazonaws.com/projects/6b133b06-5694-4ad7-a0ca-3d501f181244/sample.pdf",
                //         fileType: null,
                //         id: "6b133b06-5694-4ad7-a0ca-3d501f181244",
                //         pages: [
                //             {
                //                 createdDate: null,
                //                 fileName: "page_1.pdf",
                //                 filePath: "https://construction-check-development.s3.amazonaws.com/projects/6b133b06-5694-4ad7-a0ca-3d501f181244/pdfpages/8ce6cf99-88ef-4627-99d1-3a7889cb4751/page_1.pdf",
                //                 fileType: null,
                //                 id: "8ce6cf99-88ef-4627-99d1-3a7889cb4751",
                //                 images: [
                //                     {
                //                         dbFileId: null,
                //                         fileName: null,
                //                         filePath: null,
                //                         fileType: null,
                //                         id: null,
                //                         largeImagePath: "https://picsum.photos/id/870/200/300?grayscale&blur=2",
                //                         mediumImagePath: "https://picsum.photos/id/870/200/300?grayscale&blur=2",
                //                         pdfPageId: null,
                //                         smallImagePath: "https://picsum.photos/id/870/200/300?grayscale&blur=2",
                //                         thumbImagePath: "https://www.gstatic.com/webp/gallery/4.sm.jpg"
                //                     }
                                 
                //                 ],
                //                 pageNumber: 1
                //             }
                //         ]
                //     },

                //     {
                //         fileName: "sample.pdf",
                //         filePath: "https://construction-check-development.s3.amazonaws.com/projects/6b133b06-5694-4ad7-a0ca-3d501f181244/sample.pdf",
                //         fileType: null,
                //         id: "6b133b06-5694-4ad7-a0ca-3d501f181244",
                //         pages: [
                //             {
                //                 createdDate: null,
                //                 fileName: "page_1.pdf",
                //                 filePath: "https://construction-check-development.s3.amazonaws.com/projects/6b133b06-5694-4ad7-a0ca-3d501f181244/pdfpages/8ce6cf99-88ef-4627-99d1-3a7889cb4751/page_1.pdf",
                //                 fileType: null,
                //                 id: "8ce6cf99-88ef-4627-99d1-3a7889cb4751",
                //                 images: [
                //                     {
                //                         dbFileId: null,
                //                         fileName: null,
                //                         filePath: null,
                //                         fileType: null,
                //                         id: null,
                //                         largeImagePath: "https://picsum.photos/id/870/200/300?grayscale&blur=2",
                //                         mediumImagePath: "https://picsum.photos/id/870/200/300?grayscale&blur=2",
                //                         pdfPageId: null,
                //                         smallImagePath: "https://picsum.photos/id/870/200/300?grayscale&blur=2",
                //                         thumbImagePath: "https://picsum.photos/id/870/200/300?grayscale&blur=2"
                //                     }
                                 
                //                 ],
                //                 pageNumber: 1
                //             },
                //             {
                //                 createdDate: null,
                //                 fileName: "page_2.pdf",
                //                 filePath: "https://construction-check-development.s3.amazonaws.com/projects/6b133b06-5694-4ad7-a0ca-3d501f181244/pdfpages/b3c43df9-db84-4b4b-8ca2-f2ab7249ab39/page_2.pdf",
                //                 fileType: null,
                //                 id: "b3c43df9-db84-4b4b-8ca2-f2ab7249ab39",
                //                 images: [
                //                     {
                //                         dbFileId: null,
                //                         fileName: null,
                //                         filePath: null,
                //                         fileType: null,
                //                         id: null,
                //                         largeImagePath: "https://picsum.photos/id/870/200/300?grayscale&blur=2",
                //                         mediumImagePath: "https://picsum.photos/id/870/200/300?grayscale&blur=2",
                //                         pdfPageId: null,
                //                         smallImagePath: "https://picsum.photos/id/870/200/300?grayscale&blur=2",
                //                         thumbImagePath: "https://picsum.photos/id/870/200/300?grayscale&blur=2"
                //                     }
                //                 ],
                //                 pageNumber: 2
                //             }
                //         ]
                //     }
                    
                // ]
                this.documents = response.documents;
                this.photos = response.photos;
                // this.photos = [
                //     {
                //         dbFileId: "30592b81-dbbc-41c3-8d96-6a393b0fc140",
                //         fileName: "121057651_3445964415442688_4766197016382544554_o.jpg",
                //         filePath: "https://construction-check-development.s3.amazonaws.com/projects/30592b81-dbbc-41c3-8d96-6a393b0fc140/121057651_3445964415442688_4766197016382544554_o.jpg",
                //         fileType: null,
                //         id: null,
                //         largeImagePath: "https://construction-check-development.s3.amazonaws.com/projects/30592b81-dbbc-41c3-8d96-6a393b0fc140/photos/121057651_3445964415442688_4766197016382544554_o_lg.png",
                //         mediumImagePath: "https://construction-check-development.s3.amazonaws.com/projects/30592b81-dbbc-41c3-8d96-6a393b0fc140/photos/121057651_3445964415442688_4766197016382544554_o_med.png",
                //         pdfPageId: null,
                //         smallImagePath: "https://construction-check-development.s3.amazonaws.com/projects/30592b81-dbbc-41c3-8d96-6a393b0fc140/photos/121057651_3445964415442688_4766197016382544554_o_sml.png",
                //         thumbImagePath: "https://www.gstatic.com/webp/gallery/2.sm.jpg"
                //     }
                // ]
                this.custom_character = this.project.buildingType.name
            })
            .catch(error => {
            });
        },
        saveProject(){
            new ProjectProxy().saveProject(this.project).then((response) => {
                this.getProject();
                this.custom_character = this.project.buildingType.name
            })
            .catch(error => {
            });
        },
        submitProject(){
            this.edit = false;
            this.submitted = true;
            this.project.nextStatus = "submitted";
            this.saveProject();
        },
        searchChange(event){
            if(event == undefined){
                this.category_name = `Undefined`;
            }
            if(this.auto_compelete_list.length > 0){
                for(let i=0; i< this.auto_compelete_list.length; i++){
                    if(this.auto_compelete_list[i].name == event){
                        this.building_type = this.auto_compelete_list[i];
                        this.project.buildingType = this.building_type;
                        this.custom_character = this.building_type.name;
                        this.category_name = `Category ${this.building_type.category}.${this.building_type.order}`
                    }
                }
            }
            else {
                this.category_name = `Undefined`;
                const temp_building_type = {
                    category: undefined,
                    id: undefined,
                    name: this.custom_character,
                    order: undefined
                }
                this.project.buildingType = temp_building_type;
            }
        },
        async search(input) {

            if (input.length < 1) {
                return [];
            }
            let result = [];
            const results = await this.receiveResult(input);
            const return_data = results.filter(element => {
                return element.name.toLowerCase().startsWith(input.toLowerCase());
            });
            this.auto_compelete_list = return_data;
            let real_data = [];
            for(let i=0 ;i < return_data.length; i++){
                real_data.push(return_data[i].name);
            }
            if(real_data.length == 0){
                this.no_data = true
                real_data.push("No Recorded Building Type");
            }
            else this.no_data = false;
            return real_data;
        },
        receiveResult(input) {
            return new Promise(resolve => {
                new EstimatorProxy()
                    .searchExpertiseSubcategories(input)
                    .then(response => {
                        const result = response.data;
                        resolve(result);
                    })
                    .catch(e => {});
            });
        },
        addCustomBuildingType () {
            this.auto_compelete_list = [];
            this.searchChange(this.custom_character);
        },
        photoIndex(index) {
            // this.photos.splice(index, 1);
            this.deleteIndex = index;
        },
        deleteSelectDocument(id, type){
            this.delete_document = {
                id,
                type
            }
        },
        deleteDocument(){
            //Use the endpoint for the delete document 
            //id: this.delete_document.id
            //type: this.delete_document.type
            var params = new URLSearchParams();
            params.append('documentId', this.delete_document.id);
            params.append('projectId', this.project_id);
            new FileProxy().deleteProjectFile(params)
                .then(response => {

                })
                .catch(error => {
                    console.error('error!: ' + error);
                })
                .finally(() => {
                    
                })
            
        },
        toggleLightBox(v) {
            this.show_image_gallery = v || false
        },
        uploadProjectDetailsDoc(value) {
            let vm = this;
            console.log("Value is", value);
            let formData = new FormData();
            formData.append('file', value[0].file);
            NProgress.start();
            new ProjectProxy().uploadProjectDrawings(formData, this.project_id, "DRAWING").then((response) => {
                if (response.status == "200") {
                    vm.drawings.push(response.data);
                }
                NProgress.done();
            }).catch(function(){
            });
        }
    },
    created() {
        this.getProject();
        if(this.$route.query.edit=="true"){
            this.edit = true;
        }
        new AddressProxy().getStates().then((response) => {
            this.states = response;
        })
    },
    watch: {
        budget: function(newValue) {
            const result = newValue
                .replace(/\D/g, '')
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            // Vue.nextTick(() => this.price = result);
            this.budget = `$${result}`;
        },
        document_files: function(newValue) {
            this.is_loading = 'document';
            let type = ''
            if(newValue[0].type = 'image/jpeg') type = 'jpg'
            else type = 'pdf';
            let formData = new FormData();
            formData.append('projectId', this.project_id);
            formData.append('file', newValue[0].file);
            formData.append("name", newValue[0].name,);
            formData.append("type", 'document');
            new ProjectProxy().uploadProjectDocument(formData).then((response) => {
                if (response.status == "200") {
                    //this.estimatorProfile = response.data;
                    this.getProject();
                    this.is_loading = '';
                }

            }).catch(function(){

            });
        },
        project_drawings: function(newValue) {
            this.is_loading = 'drawing';
            let type = ''
            if(newValue[0].type = 'image/jpeg') type = 'jpg'
            else type = 'pdf';
            let formData = new FormData();
            formData.append('projectId', this.project_id);
            formData.append('file', newValue[0].file);
            formData.append("name", newValue[0].name,);
            formData.append("type", 'drawing');
            new ProjectProxy().uploadProjectDocument(formData).then((response) => {
                if (response.status == "200") {
                    //this.estimatorProfile = response.data;
                    this.getProject();
                    this.is_loading = '';
                }

            }).catch(function(){

            });
        },
        additional_photo_files: function(newValue) {
            this.is_loading = 'photo';
            let type = ''
            if(newValue[0].type = 'image/jpeg') type = 'jpg'
            else type = 'pdf';
            let formData = new FormData();
            formData.append('projectId', this.project_id);
            formData.append('file', newValue[0].file);
            formData.append("name", newValue[0].name,);
            formData.append("type", 'photo');
            new ProjectProxy().uploadProjectDocument(formData).then((response) => {
                if (response.status == "200") {
                    //this.estimatorProfile = response.data;
                    this.getProject();
                    this.is_loading='';
                }

            }).catch(function(){
            });
        },
        
        project_id: function(newValue){
            this.getProject();
        }
    },
    filters: {
        toWords: function (value) {
            if (!value) return ''
            return converter.toWords(value);
        }
    }

};
</script>

<style scoped>
.project_manager_detail {
    font-size: 1em;
    font-weight: 500;
    margin: 1.7rem 2.5rem 2.7rem 2.1rem;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    padding: 24px 31px 39px 32px;
}
.label {
  font-family: Mulish;
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.1px;
  text-align: left;
  color: #7c7e89;
}
.content-section-text {
  font-family: Mulish;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.2px;
  text-align: left;
  color: #252733;
}
.custom-input-style {
}
.custom-textarea-style {
    font-size: 0.8em;
    height: 100px;
    text-align: justify;
}
.small-font-style {
    font-size: 0.8em;
}
.custom-btn-style {
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: 0.2px;
  text-align: center;
  padding: 11px 20px 9px;
  border-radius: 8px;
  width: 8rem;
}
.drawings-area {
    background-color: white;
    max-height: 300px;
    overflow: auto;
    font-weight: bold;
    max-width: 850px;
}
.replies-area {
    background-color: white;
    max-height: 300px;
    overflow: 'auto';
    font-weight: bold;
    border-radius: 10px;
    box-sizing: border-box;
    border: 1px solid #c9c9c9;
    max-width: 1000;
    padding: 5px 20px 5px 20px;
}
.half-line-left {
    border-bottom: 1px solid #c9c9c9;
    margin-bottom: 8px;
}
.half-line-right {
    border-bottom: 1px solid #c9c9c9;
    margin-bottom: 8px;
}

.photo-img .tooltiptext {
  z-index: 1;

  /* Fade in tooltip - takes 1 second to go from 0% to 100% opac: */
  opacity: 0;
  transition: opacity 1s;
}

.photo-img:hover .tooltiptext {
  opacity: 1;
}

.custom-margin-style {
    margin-top: -100px;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
}
.header-label {
  display: flex;
  justify-content: start;
  font-size: 19px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.4px;
  text-align: left;
  color: #000000;
}
.header-button-group {
  display: flex;
  justify-content: end;
}
@media only screen and (max-width: 600px) {
    .position-custom {
        position: relative;
        position: sticky;
    }
}
</style>
