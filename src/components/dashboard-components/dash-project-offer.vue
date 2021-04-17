<template>
  <!-- <transition name="fade" -->
  <div class="po-modal-bg" v-if="modalOpen">
    <div v-if="show_img_dialogue" class="custom-modal-img">
      <div role="button" class="text-white float-right pr-3 pt-3 font-weight-bold" @click="close_image_modal">
        <span>Close</span>
        <img v-on:click="closeModal" class="ml-1" role="button" alt="image" src="~@/assets/img/small-icons/modal-close-icon.png"/>
      </div>
      <img class="pr-3" src="~@/assets/img/building-archecture.jpg" width="100%"/>
    </div>
    <b-card v-else class="po-modal">
      <b-card-header class="po-card-header">
        <b-row class="no-gutters po-header">
          <b-col lg="6" cols="12" class="padding0">
            <div class="font-style1">
              <img v-on:click="closeModal" class="marginlr4 mr-4" role="button" @click="close_image_modal" alt="image" src="~@/assets/img/small-icons/left-arrow.png"/>
              <span class="newcolor">* NEW *</span> GoogleHealthcare
            </div>
          </b-col>
          <b-col lg="6" cols="12" class="padding0">
            <b-row class="no-gutters row-style">
              <b-col cols="8" lg="4" class="row-style2">
                <div class="font-style1">New York City</div>
              </b-col>
              <b-col cols="4" lg="4" class="row-style2">
                <div class="font-style1">5/5/2020</div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-card-header>
      <b-card-body class="custom-modal">
        <b-row class="no-gutters">
          <b-col cols="12" lg="6">
            <p class="font-style2">Description</p>
            <p class="font-style2 font-white">This project consists of the acquisition of flood damaged properties located adjacent to the Park River (in the floodway) (photos were provided).
              Nineteen (19) properties have been identified as having substantial damages and are at high risk for future flood damages. Once acquired, these structures will be put up for bid for relocation
              outside the 100-year floodplain. Any unsold homes will be demolished and removed.
            </p>
            <div>
              <p class="font-style2"> <span>Time Period: </span> <span>01/01/2020 - 02/02/2020</span> </p>
            </div>
            <div style="margin-top: 20px;">
              <p role="button" @click="show_attachment_full" class="preview-offer">Click To Preview</p>
              <img class="po-img-screen-shot marginwidth" alt="Image" src="~@/assets/img/building-archecture.jpg"/>
            </div>
            <b-row class="no-gutters magin-style">
              <b-col lg="6" cols="12"><p class="font-style2">attachment.pdf</p></b-col>
              <b-col lg="6" cols="12" class="row-style2">
                <b-button role="button" href="/img/building-archecture.bdc6c702.jpg" download class="button-style d-flex align-items-center justify-content-between rounded">
                  <span>Download </span>
                  <img width="10" class="marginlr4 mt-1" alt="Vue logo" src="~@/assets/img/download.png"/>
                </b-button>
              </b-col>
            </b-row>
            <b-row class="no-gutters">
              <b-col class="po-btn-col" cols="6" lg="3">
                <b-button disabled v-if="is_decline || is_accept" v-b-modal.modal-center class="btn-style rounded pt-2 pb-2" style="background-color: #c1c1c1; color: white">Decline</b-button>
                <b-button v-else v-b-modal.modal-center class="btn-style rounded pt-2 pb-2" style="background-color: #83afdc; color: black">Decline</b-button>
              </b-col>
              <b-col class="po-btn-col" cols="6" lg="5">
                <b-button v-if="is_accept" v-b-modal.modal-multi-1 class="btn-style rounded pt-2 pb-2 d-flex align-items-center justify-content-center" style="background-color: #0C2340">
                  <span>Accept</span>
                  <img width="18" alt="Accept Icon" class="ml-2" src="~@/assets/img/small-icons/green-check-icon.png"/>
                </b-button>
                <b-button v-else v-b-modal.modal-multi-1 class="btn-style rounded pt-2 pb-2" style="background-color: #0C2340">Accept</b-button>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <hr />
        <b-row class="pl-3 border pt-3 pb-3 rounded">
          <b-button class="btn-style d-flex align-items-center justify-content-around rounded" style="background-color: #0C2340">
            <img class="marginlr4 mt-1" alt="Vue logo" src="~@/assets/img/small-icons/reply.png"/><span class="mr-3">Reply</span>
          </b-button>
        </b-row>
      </b-card-body>
    </b-card>

    <!-- Modal for the decline modal -->
    <b-modal id="modal-center" centered>
      <template v-slot:modal-title> </template>
      <template v-slot:modal-header="{ close }">
        <!-- Emulate built in modal header close button action -->
        <h5></h5>
        <img @click="close(), declineClose()" role="button" alt="image" src="~@/assets/img/small-icons/small-modal-remove.png"/>
      </template>
      <div class="text-center">
        <img @click="close_image_modal" alt="image" src="~@/assets/img/small-icons/red-close-icon.png"/>
        <div class="mb-3 mt-1 font-style2">Project declined!</div>
        <b-button class="rounded" style="background-color: #0C2340" @click="closeModal(), declineClose()">Go back to Project Request</b-button>
      </div>
      <template v-slot:modal-footer="{ ok, cancel, hide }"><b @click="ok(), cancel(), hide()">Custom Footer</b></template>
    </b-modal>
    <!-- End for the modal -->
    <b-modal id="modal-multi-1" centered>
      <template v-slot:modal-title> </template>
      <template v-slot:modal-header="{ close }">
        <!-- Emulate built in modal header close button action -->
        <h5></h5>
        <img @click="close(), acceptClose()" role="button" alt="image" src="~@/assets/img/small-icons/small-modal-remove.png"/>
      </template>
      <div class="text-center">
        <img @click="close_image_modal" alt="image" src="~@/assets/img/small-icons/project-accept-icon.png"/>
        <div class="mb-3 mt-1 font-style2">Project accepted</div>
        <b-button class="rounded" style="background-color: #0C2340">
          <router-link class="project_link" to="/dashboard/myprojects/1">Go to Project</router-link>
        </b-button>
        <div class="mt-3 font-weight-bold" style="hover:cursor" @click="acceptClose(), closeModal()">Go back to Project Request Page</div>
      </div>
      <template v-slot:modal-footer="{ ok, cancel, hide }">
        <b @click="ok(), cancel(), hide()">Custom Footer</b>
      </template>
    </b-modal>
    <!-- Modal for the accept modal -->
  </div>
</template>

<script>
export default {
  name: 'ProjectOfferModal',
  data() {
    return {
      modalOpen: true,
      //Show attachment image or not
      show_img_dialogue: false,
      //variable that can evaluate decline or not.
      is_decline: false,
      //variable that can evaluate accepted or not.
      is_accept: false,
    };
  },
  methods: {
    closeModal() {
      // this.modalOpen = false;
      this.$emit('closeModal');
    },
    show_attachment_full() {
      this.show_img_dialogue = true;
      // this.modalOpen = false;
    },
    close_image_modal() {
      this.show_img_dialogue = false;
    },
    downloadWithVueResource() {
      this.$http({ method: 'get', url: this.url, responseType: 'arraybuffer',})
        .then(response => {
          this.forceFileDownload(response);
        })
        .catch();
    },
    acceptClose() {
      this.is_accept = true;
    },
    declineClose() {
      this.is_decline = true;
    },
  }
};
</script>

<style scoped>
.po-btn-col {
    padding: 0px !important;
}

.po-modal-bg {
    position: absolute;
    top: 0px;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
}

.po-modal {
    position: relative;
    top: 7%;
    width: 97%;
    margin: auto;
}

.po-header {
    display: flex;
    justify-content: flex-end;
}

.po-card-header {
    width: 98%;
    padding-left: 0px;
    padding-right: 0px;
    margin: auto;
    background: none !important;
    background-color: none !important;
    border-bottom: 1px solid #c9c9c9;
}

.po-img-screen-shot {
    /*    background: url(Screen Shot 2020-05-18 at 4.46.png); */
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
}

.preview-offer {
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    top: 50%;
    font-family: Montserrat;
    font-weight: bold;
    font-size: 1.1em;
    line-height: 15px;
    /* identical to box height */
    text-align: center;
    color: #dd7b26;
}

.project_link {
    text-decoration: none;
    color: white;
}

.project_page_link {
    text-decoration: none;
    color: #000000;
}

.marginlr4 {
    margin-bottom: 4px;
    margin-right: 4px;
}

.padding0 {
    padding: 0px;
}

.font-style1 {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 1.1em;
    line-height: 20px;
    color: #0058dd;
}

.font-style2 {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
}

.background-style {
    color: #ffffff;
    background-color: #0c2340;
    border: none;
}

.font-white {
    color: whtie;
}

.newcolor {
    color: #e07c00;
}

.marginwidth {
    width: 100%;
    margin-bottom: 4px;
    margin-right: 4px;
}

.magin-style {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
}

.row-style {
    display: flex;
    justify-content: flex-end;
}

.row-style2 {
    display: flex;
    padding: 0px;
    justify-content: flex-end;
}

.button-style {
    width: 120px;
    border: none;
    background-color: #fb922f;
    color: #000000;
}
.btn-style {
    width: 120px;
    border: none;
}

.height16 {
    height: 16px;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.8s ease-in-out;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.custom-modal {
    max-height: 800px !important;
    overflow: auto !important;
}

.custom-modal-img {
    max-height: 100% !important;
    overflow: auto !important;
}
</style>
