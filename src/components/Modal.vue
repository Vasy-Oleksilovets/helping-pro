<template>
  <div>
    <b-modal v-bind:id="id" v-model="localShowModal" centered>
      <template v-slot:modal-header="{}">
        <span @click="close()"></span>
      </template>
      <div class="text-center modal-body" v-html="message" >
        <!-- {{ message }} -->
      </div>
      <template v-slot:modal-footer="{}">
        <div
          class="text-center mb-4"
          style="margin-left: auto; margin-right: auto"
        >
          <b-btn
            class="dialog-btn-style mr-2"
            style="background-color: #83afdb"
            @click="submit()"
            >{{ yesBtnText }}</b-btn
          >
          <b-btn
            class="dialog-btn-style"
            style="background-color: #83afdb"
            @click="cancel() "
            >{{ noButtonText }}</b-btn
          >
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
/*
How to use:-
<Modal v-on:submit="onModalYes()"  v-on:cancel="onModalCancel()" v-bind:showModal="showModal" />
onModalYes - Function that executes on clicking "Yes"
onModalCancel - Function that executes on clicking "No"
showModal - Boolean variable that toggles the modal. 
Note :- Do change the value of this boolean variable to false in both onModalCancel and onModalYes function
*/
export default {
  name: "Modal",
  props: {
    // The message of the modal
    message: {
      type: String,
      default: "Are you sure?",
    },
    // The text in the yes button
    yesBtnText: {
      type: String,
      default: "Yes",
    },
    // The text in the No button
    noButtonText: {
      type: String,
      default: "No",
    },
    // The boolean that toggles the modal
    showModal: {
      type: Boolean,
      default: false,
    },
    id:{
      type : String,
      default : 'modal'
    }
  },
  methods: {
    // Callback once Yes is clicked
    submit() {
      this.$emit("submit");
    },
    // Callback once No is clicked
    cancel() {
      this.$bvModal.hide(this.id)
      // this.$emit("cancel");
    },
  },
  // The local value of boolean is computed based on the prop
  computed: {
    localShowModal: {
      get: function() {
        return this.showModal ? true : false;
      },
      set: function() {},
    },
  },
  mounted() {
    this.$root.$on("bv::modal::hide", (bvEvent, modalId) => {
      this.$emit("cancel");
    });
  },
};
</script>

<style scoped>
.dialog-btn-style {
  padding: 7px 40px 7px 40px;
  border-radius: 8px;
  border-width: 1px;
}
.modal-body{
  padding : 1rem
}
</style>
