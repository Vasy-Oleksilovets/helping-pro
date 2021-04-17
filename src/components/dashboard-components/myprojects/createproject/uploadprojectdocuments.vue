<template>
    <div class="cc-create-project-document-upload">
      <div class="text-left title-font">Create a new project (Step 3 of 3)</div>
      
      <div class="create-project-estimate mb-5">
        <b-row class="ml-0 mr-0 mb-3">
          <div class="label-text">PLEASE UPLOAD PROJECT DOCUMENTS</div>
        </b-row>
        <b-row>
          <b-col sm="5">
            <div v-if="!docUploading" class="text-left project-detail" style="position: relative">
              <span class="info-text d-flex align-items-center"><font-awesome-icon icon="paperclip" class="custom-icon"/>Drag and drop document files to upload</span>
              <file-upload
                  style="position: absolute; top: 0; left: 0; width: 100%; height: 100%"
                  accept=".doc,.pdf,.docx,.pdf,.xlsx,.xls,.pptx,.ppt,.pptm"
                  @input="uploadOneDoc"
                  v-model="document_files"
              ></file-upload>
            </div>
            <div v-else class="progress-bar-container">
              <div class="justify-content-start align-items-center">
                  <div class="d-flex align-items-center">
                      <span class="info-text d-flex align-items-center"><font-awesome-icon icon="image" class="custom-icon"/>{{doc_upload_percent}}% - Document.jpg</span>
                  </div>
              </div>
              <b-progress :value="doc_upload_percent" :max="max" class="mb-3 mt-3"></b-progress>
            </div>
          </b-col>
          <b-col sm="5" offset-sm="2">
            <div class="example-container">
              <div v-for="(file, index) in documents" :key="`${index}_${file.name}}}`" class="d-flex align-items-center justify-content-between mb-2">
                <span v-if="file.type === 'pdf'" class="info-text d-flex align-items-center"><font-awesome-icon icon="paperclip" class="custom-icon"/>{{file.name}}</span>
                <span v-if="file.type === 'jpg'" class="info-text d-flex align-items-center"><font-awesome-icon icon="image" class="custom-icon"/>{{file.name}}</span>
                <font-awesome-icon icon="times-circle" class="close-icon" @click="removeUploadedFiles(file.kind, index)"/>
              </div>
            </div>
          </b-col>
        </b-row>
      </div>

      <div class="create-project-estimate mb-5">
        <b-row class="ml-0 mr-0 mb-3">
          <div class="label-text">PLEASE UPLOAD YOUR PROJECT DRAWINGS</div>
        </b-row>
        <b-row>
          <b-col sm="5">
            <div v-if="!drawingUploading" class="text-left project-detail" style="position: relative">
              <span class="info-text d-flex align-items-center"><font-awesome-icon icon="paperclip" class="custom-icon"/>Drag and drop document files to upload</span>
              <file-upload style="" class="cc-file-upload" accept=".pdf" @input="uploadOneDrawing" v-model="project_drawings"></file-upload>
            </div>
            <div v-else class="progress-bar-container">
              <div class="justify-content-start align-items-center">
                  <div class="d-flex align-items-center">
                      <span class="info-text d-flex align-items-center"><font-awesome-icon icon="image" class="custom-icon"/>{{drawing_upload_percent}}% - Document.jpg</span>
                  </div>
              </div>
              <b-progress :value="drawing_upload_percent" :max="max" class="mb-3 mt-3"></b-progress>
            </div>
          </b-col>
          <b-col sm="5" offset-sm="2">
            <div class="example-container">
              <div v-for="(file, index) in drawings" :key="`${index}_${file.name}}}`" class="d-flex align-items-center justify-content-between mb-2">
                <span v-if="file.type === 'pdf'" class="info-text d-flex align-items-center"><font-awesome-icon icon="paperclip" class="custom-icon"/>{{file.name}}</span>
                <span v-if="file.type === 'jpg'" class="info-text d-flex align-items-center"><font-awesome-icon icon="image" class="custom-icon"/>{{file.name}}</span>
                <font-awesome-icon icon="times-circle" class="close-icon" @click="removeUploadedFiles(file.kind, index)"/>
              </div>
            </div>
          </b-col>
        </b-row>
      </div>

      <div class="create-project-estimate mb-5">
        <b-row class="ml-0 mr-0 mb-3">
          <div class="label-text">PLEASE UPLOAD ADDITIONAL PHOTOS</div>
        </b-row>
        <b-row>
          <b-col sm="5">
              <div v-if="!photoUploading" class="text-left project-detail" style="position: relative">
                  <span class="info-text d-flex align-items-center"><font-awesome-icon icon="paperclip" class="custom-icon"/>Drag and drop document files to upload</span>
                  <file-upload accept=".jpg,.png,.tif,.gif" v-model="additional_photo_files" @input="uploadOnePhoto" class="cc-file-upload"></file-upload>
              </div>
              <div v-else class="progress-bar-container">
                <div class="justify-content-start align-items-center">
                    <div class="d-flex align-items-center">
                        <span class="info-text d-flex align-items-center"><font-awesome-icon icon="image" class="custom-icon"/>{{photo_upload_percent}}% - Document.jpg</span>
                    </div>
                </div>
                <b-progress :value="photo_upload_percent" :max="max" class="mb-3 mt-3"></b-progress>
              </div>
          </b-col>
          <b-col sm="5" offset-sm="2">
            <div class="example-container">
              <div v-for="(file, index) in photos" :key="`${index}_${file.name}}}`" class="d-flex align-items-center justify-content-between mb-2">
                <span v-if="file.type === 'pdf'" class="info-text d-flex align-items-center"><font-awesome-icon icon="paperclip" class="custom-icon"/>{{file.name}}</span>
                <span v-if="file.type === 'jpg'" class="info-text d-flex align-items-center"><font-awesome-icon icon="image" class="custom-icon"/>{{file.name}}</span>
                <font-awesome-icon icon="times-circle" class="close-icon" @click="removeUploadedFiles(file.kind, index)"/>
              </div>
            </div>
          </b-col>
        </b-row>
      </div>
      
      <div>
        <b-row class="ml-0 mr-0 mb-3">
          <div class="label-text">DON'T HAVE A DOC OR PDF? TYPE THE PROJECT DETAILS BELOW</div>
        </b-row>
        <b-row>
          <b-col sm="5">
            <b-form-textarea id="textarea-auto-height" size="sm" rows="7" v-model="document_description"></b-form-textarea>
          </b-col>
        </b-row>
      </div>
      <div class="btton-group d-flex justify-content-end mt-3">
        <div>
          <b-button class="back-btn-style mr-4" variant="outline-primary" @click="goBack">{{"<"}}</b-button>
          <b-button class="next-btn-style mr-4" variant="outline-primary" v-b-modal.modal-center>Cancel</b-button>
          <b-button class="save-btn-style mr-4" variant="outline-primary" @click="saveForLater()">Save</b-button>
          <b-button class="next-btn-style" variant="outline-primary" @click="submit()">Submit</b-button>
        </div>
      </div>

      <!-- Payment asking modal -->
      <div>
        <b-modal id="payment-verify-modal" centered>
          <template v-slot:modal-header="{}">
            <span @click="close()"></span>
          </template>
          <div class="verify-header">
            Ready to submit?
          </div>
          <div class="verify-text">
            Are you sure you want to submit the project details? Once the project details are submitted you cannot edit the document.
          </div>
          <template v-slot:modal-footer="{ ok }">
            <div>
              <b-btn class="next-btn-style" variant="outline-primary" @click="ok()">Cancel</b-btn>
              <b-btn class="cc-submit-btn" @click="ok(), submitProject()">Submit</b-btn>
            </div>
          </template>
        </b-modal>
      </div>
      <transition name="fade">
        <div v-if="show_notification" style="top: 0; position: absolute" class="cc-custom-noti">
          Project submitted
        </div>
      </transition>
    </div>
</template>
<script>
import FileUpload from 'vue-upload-component/dist/vue-upload-component.part.js';
import { BIcon, BIconX, BIconFileEarmark, BIconXCircle } from 'bootstrap-vue';
import ProjectProxy from '@/proxies/ProjectProxy.js';
export default {
  name: 'UploadProjectDocuments',
  props: ['gotoNextTab', 'upload_project_documents', 'createProject', 'goBackToProjects'],
  components: {
    FileUpload,
    BIcon,
    BIconX,
    BIconFileEarmark,
    BIconXCircle,
  },
  data() {
    return {
      uploading_files: [],
      doc_upload_percent: 0,
      drawing_upload_percent: 0,
      photo_upload_percent: 0,
      docUploading: false,
      drawingUploading: false,
      photoUploading: false,
      max: 100,

      //Info to send the backend
      document_files: [],
      additional_photo_files: [],
      project_drawings: [],
      document_description: '',
      documents: [],
      photos: [],
      drawings: [],
      show_notification: false
    };
  },
  methods: {
    saveForLater(){
      this.saveUploadFilesForCommiting();
      this.$emit('emitUploadProjectDocuments', this.uploading_files);
    },
    submit(){
      this.$bvModal.show('payment-verify-modal');
    },
    removeUploadFile(index) {
      this.uploading_files.splice(index, 1);
    },
    submitProject(){
      this.saveUploadFilesForCommiting();
      this.show_notification = true;
      setTimeout(() => {
        window.scroll({ 
          top: 0, 
          left: 0, 
          behavior: 'smooth'
        });
      }, 100)
      setTimeout(() => {
        this.show_notification = false;
        this.$emit('submitProject', this.uploading_files);
      }, 2000)
    },
    removeUploadedFiles(kind, index) {
      this[`${kind}s`].splice(index, 1);
    },
    goBack(){
      this.goBackToProjects();
    },
    saveUploadFilesForCommiting(){
      this.uploading_files = this.uploading_files.concat(this.documents, this.photos, this.drawings);
    },
    uploadOneDoc(value) {
        let formData = new FormData();
        formData.append('file', value[0].file);
        this.docUploading = true;
        let uploading = setInterval(() => {
          if(this.doc_upload_percent <= 99) {
            this.doc_upload_percent += 1;
          }
        }, 100);
        new ProjectProxy().uploadProjectDocument(formData).then((response) => {
            if (response.status == "200") {

            }
            this.docUploading = false;
            this.doc_upload_percent = 0;
            clearInterval(uploading);
        }).catch(() => {
          this.docUploading = false;
          this.doc_upload_percent = 0;
          clearInterval(uploading);
        });
    },
    uploadOneDrawing(value) {
        let formData = new FormData();
        formData.append('file', value[0].file);
        this.drawingUploading = true;
        let uploading = setInterval(() => {
          if(this.drawing_upload_percent <= 99) {
            this.drawing_upload_percent += 1;
          }
        }, 100);
        new ProjectProxy().uploadProjectDocument(formData).then((response) => {
            if (response.status == "200") {

            }
            this.drawingUploading = false;
            this.drawing_upload_percent = 0;
            clearInterval(uploading);
        }).catch(() => {
          this.drawingUploading = false;
          this.drawing_upload_percent = 0;
          clearInterval(uploading);
        });
    },
    uploadOnePhoto(value) {
        let formData = new FormData();
        formData.append('file', value[0].file);
        this.photoUploading = true;
        let uploading = setInterval(() => {
          if(this.photo_upload_percent <= 93) {
            this.photo_upload_percent += 7;
          }
        }, 100);
        new ProjectProxy().uploadProjectDocument(formData).then((response) => {
            if (response.status == "200") {

            }
            this.photoUploading = false;
            this.photo_upload_percent = 0;
            clearInterval(uploading);
        }).catch(() => {
          this.photoUploading = false;
          this.photo_upload_percent = 0;
          clearInterval(uploading);
        });
    }
  },
  created() {
    if(this.upload_project_documents){
      this.uploading_files = this.upload_project_documents;
    }
  },
  watch: {
    document_files: function(newValue) {
      let type = ''
      if(newValue[0].type = 'image/jpeg') type = 'jpg'
      else type = 'pdf';
      const data = {
        type,
        name: newValue[0].name,
        kind: 'document',
        file: newValue[0].file
      }
      this.documents.push(data);
      // this.uploading_files.push(data);
    },
    project_drawings: function(newValue) {
      let type = ''
      if(newValue[0].type = 'image/jpeg') type = 'jpg'
      else type = 'pdf';
      const data = {
        type,
        name: newValue[0].name,
        kind: 'drawing',
        file: newValue[0].file
      }
      this.drawings.push(data);
      // this.uploading_files.push(data);
    },
    additional_photo_files: function(newValue) {
      let type = ''
      if(newValue[0].type = 'image/jpeg') type = 'jpg'
      else type = 'pdf';
      const data = {
        type,
        name: newValue[0].name,
        kind: 'photo',
        file: newValue[0].file
      }
      this.photos.push(data);
      // this.uploading_files.push(data);
    },
  }
};
</script>

<style scoped>

.table-header {
  background-color: #061831;
  color: white;
  padding: 15px 30px 15px 30px;
  min-width: 1200px !important;
  height: 51px;
}

.content-card {
  margin: 20px;
  background-color: white;
  min-height: 80vh;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  padding: 30px;
}

.round-icon {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  cursor: pointer;
}

.title-font {
  font-family: Montserrat;
  font-size: 19px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.4px;
  text-align: left;
  color: #252733;
  margin-bottom: 4rem;
}


.save-btn-style {
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: 0.2px;
  text-align: center;
  padding: 11px 35px 9px;
  border-radius: 8px;
}

.next-btn-style {
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: 0.2px;
  text-align: center;
  padding: 11px 25px 9px;
  border-radius: 8px;
}

.sub-btn-style {
  min-width: 200px;
  background-color: #0C2340;
  border-radius: 5px;
  padding: 8px 8px
}

.cancel-btn-style {
  background-color: white;
  border-color: white;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: 0.2px;
  color: #7c7e89;
}

.standard-color {
  background-color:#0C2340
}

.grey-color {
  background-color: #C4C4C4;
}

.create-project-estimate {
    padding: 0;
}

.project-detail {
  border-radius: 8px;
  border: solid 1px #dfe0eb;
  background-color: #f0f1f7;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: 0.2px;
  text-align: left;
  color: #7c7e89;
  padding: 1.2rem 8.1rem 7rem 1.5rem;
}

.progress-bar-container {
  border-radius: 8px;
  border: solid 1px #dfe0eb;
  background-color: #f0f1f7;
  padding: 1.2rem 1.5rem 0 1.5rem;
  height: calc(8.2rem + 22px);
}

.example-container {
  border-radius: 8px;
  border: solid 1px #dfe0eb;
  padding: 1.2rem 1.5rem 0 1.5rem;
  height: 100%;
}

.uploading-file-list-box {
  border: 1px solid #C9C9C9;
  height: 220px;
  overflow: auto;
}

.file-uploads.file-uploads-html5 input[type="file"] {
  overflow: hidden;
  position: fixed;
  width: 100% !important;
  height: 1px;
  z-index: -1;
  opacity: 0;
}

.label-text {
  font-size: 12px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.3px;
  text-align: left;
  color: #7c7e89;
}

.info-text {
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: 0.2px;
  text-align: left;
  color: #7c7e89;
}

.custom-icon {
  font-size: 19px;
  margin-right: 10px;
  color: #c5c7cd;
}

.close-icon {
  font-size: 19px;
  margin-right: 10px;
  color: #7c7e89;
}

.progress {
  border-radius: 1.25rem;
}
.progress-bar {
  border-radius: 1.25rem;
  background-color: #c5c7cd !important;
}

.cc-file-upload {
  position: absolute; 
  top: 0; 
  left: 0; 
  width: 100%; 
  height: 100%
}

.verify-header {
  margin: 32px 32px 17px 32px;
  font-family: Montserrat;
  font-size: 24px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.3px;
  text-align: left;
  color: #252733;
}
.verify-text {
  margin: 0px 32px 30px 32px;
  font-family: Montserrat;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: 0.2px;
  text-align: left;
  color: #000000;
}

.cc-submit-btn {
  width: 104px;
  height: 40px;
  margin: 10px 15px 10px 15px;
  padding: 11px 24px 9px;
  border-radius: 8px;
  background-color: #0071e3;
  font-size: 14px;
  font-family: Montserrat;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: 0.2px;
  text-align: center;
  border-color: #0071e3;
}

.cc-cancel-btn {
  background-color: white;
  border-color: white;
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

.cc-custom-noti {
  left: 0;
  height: 48px;
  margin: 26px 24px 0px 2%;
  font-family: Montserrat;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: 0.2px;
  color: #ffffff;
  background-color: #29cc97;
  border-radius: 8px;
  width: 96%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.back-btn-style {
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: 0.2px;
  text-align: center;
  padding: 11px 20px 9px;
  border-radius: 8px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.back-btn-style {
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: 0.2px;
  text-align: center;
  padding: 11px 20px 9px;
  border-radius: 8px;
}
</style>

<style>
.modal-body {
  border-bottom: 1px solid #dfe0eb;
}
#payment-verify-modal___BV_modal_body_ {
  padding: 0 !important;
}
.modal-dialog.modal-md.modal-dialog-centered {
  max-width: 546px !important;
}
#payment-verify-modal___BV_modal_footer_ {
  padding: 1.5rem;
}
#payment-verify-modal___BV_modal_content_ {
  border-radius: 12px;
}
</style>

