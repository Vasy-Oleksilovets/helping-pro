<template>
    <b-container class="form-section">
        <p class="acknowledgement-warning" v-if="isChecked && !checked" v-bind:class="{ show: isChecked }" style="color: #DF7B00">
          You must agree to the Construction Check™ Acknowledgement statement
          by clicking the checkbox below to continue.
        </p>
        <div class="acknowledge-box">
            <label for="checkbox-cont" style="margin-bottom: 20px; margin-top: 10px;">
                <input type="checkbox" id="checkbox"
                    v-model="checked"
                    class="ack-checkbox"
                    v-on:click="acknowledged"
                    style="margin-top: 0px"
                />
                <span class="checkmark"></span>
                <span>I have read and agreed to the &nbsp; 
                  <a href="https://beta.constructioncheck.io/terms-of-use/">Construction Check Terms of Use &amp; Terms of Service</a>
                </span>
            </label>
            <br />
        </div>
    </b-container>
</template>
<script>
export default {
    name: 'AcknowledgementStatement',
    props: {
        isChecked: Boolean,
    },
    data() {
        return {
            checked: false,
        };
    },
    methods: {
        acknowledged() {
            var checked = !this.checked;
            this.$emit('acknowledged', checked);
        },
    },
};
</script>

<style lang="css" scoped>
@media only screen and (max-width: 600px) {
    .acknowledgement-text {
        margin-right: 30px;
        justify-content: space-between;
    }
    .ml-5{
        margin-left: 0rem !important;
    }
}
</style>
