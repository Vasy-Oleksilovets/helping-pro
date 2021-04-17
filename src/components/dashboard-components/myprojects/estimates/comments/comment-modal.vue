<template>
<div>
    <!-- Show SELECTED ESTIMATE LINE -->
    <transition name="fade">
        <EstimatesCell 
            v-if="getSelectedEstimateLine && openLeftModal"
            :estimateLine="getSelectedEstimateLine"
            :level="1"
            :isExpand=false
            class="comment-estimate-line"
        />
    </transition>
    <div class="d-flex h-100" :class="openRightModal && !openLeftModal ? 'position-absolute w-100' : ''">
        <!-- Left Comment Modal -->
        <div class="modal left fade" :class="openLeftModal ? 'd-block show' : 'd-none'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <span class="close-span text-left" @click="closeLeftModal()">
                            Estimate Line
                        </span>

                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeLeftModal()">
                            <img class="ml-1" role="button" alt="image" src="~@/assets/img/small-icons/small-modal-remove.png" />
                        </button>
                    </div>

                    <div class="modal-body">
                        <CommentLeftModalItem v-for="(comment, i)  in getEstimateComments" :data="comment" :key="i" />

                        <div class="container-add-comment">
                            <input class="input-add-comment" type="text" placeholder="Type a new comment" v-model="message" />
                            <div class="cotainer-attachment">
                                <button type="button" class="btn btn-secondary btn-send float-right" @click="addComment()">SEND</button>
                                <a class="link-add-attachment float-right">
                                    <img src="~@/assets/img/attachment.png" />
                                    Add an attachment
                                </a>
                            </div>
                        </div>
                    </div>
                </div><!-- modal-content -->
            </div><!-- modal-dialog -->
        </div><!-- modal -->

        <!-- Right Comment Modal -->
        <div class="modal right fade" :class="openRightModal ? !openLeftModal ? 'left-60 d-block show': 'd-block show' : 'd-none'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <span class="close-span" @click="closeRightModal()">
                            Close
                        </span>

                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeRightModal()">
                            <img class="ml-1" role="button" alt="image" src="~@/assets/img/small-icons/small-modal-remove.png" />
                        </button>
                    </div>

                    <div class="modal-body">
                        <CommentRightModalItem v-for="(comment, i)  in getAllComments" :data="comment" :key="i" />
                    </div>
                </div><!-- modal-content -->
            </div><!-- modal-dialog -->
        </div><!-- modal -->
    </div>
</div>
</template>

<script>
import CommentRightModalItem from './comment-right-modal-item';
import CommentLeftModalItem from './comment-left-modal-item';
import EventBus from '../../../../../plugins/event-bus';
import {
    mapGetters
} from 'vuex';
import store from "@/store";
import EstimatesCell from '../estimates-cell';

export default {
    name: "CommentModal",
    components: {
        CommentRightModalItem,
        CommentLeftModalItem,
        EstimatesCell,
    },
    data() {
        return {
            code: '',
            openRightModal: false,
            openLeftModal: false,
            message: '',
        };
    },
    mounted() {
        EventBus.$on('open_comments', (payLoad) => {
            this.openRightModal = !this.openRightModal;

            if (!this.openRightModal)
                this.openLeftModal = false;

            EventBus.$emit('show_estimate_lines', !this.openLeftModal);
        });

        EventBus.$on('open_estimate_comments', (payLoad) => {
            this.openLeftModal = true;
            EventBus.$emit('show_estimate_lines', !this.openLeftModal);
        });

        EventBus.$on('add_new_comment', (payLoad) => {
            store.dispatch("comment/getCommentsByTypeId", {
                targetId: payLoad.estimateLineId,
            });

            this.openRightModal = true;
            this.openLeftModal = true;

            EventBus.$emit('show_estimate_lines', !this.openLeftModal);
        });
    },
    computed: {
        ...mapGetters("comment", [
            "getAllComments",
            "getEstimateComments",
            "getSelectedEstimateLine",
        ]),
    },
    methods: {
        closeRightModal() {
            this.openRightModal = false;
            this.openLeftModal = false;
            EventBus.$emit('show_estimate_lines', !this.openLeftModal);
        },
        closeLeftModal() {
            this.openLeftModal = false;
            EventBus.$emit('show_estimate_lines', !this.openLeftModal);
        },
        addComment() {
            if (this.message == '' || this.message == null)
                return;
            store.dispatch("comment/addComment", {
                message: this.message,
                vue: this,
            });

            this.message = '';
        }
    }
}
</script>

<style>
/**
    Comment Modal
   */
.modal {
    position: relative;
    width: inherit;
}

.modal.left .modal-dialog,
.modal.right .modal-dialog {
    position: relative;
    margin: auto;
    height: 100%;
    -webkit-transform: translate3d(0%, 0, 0);
    -ms-transform: translate3d(0%, 0, 0);
    -o-transform: translate3d(0%, 0, 0);
    transform: translate3d(0%, 0, 0);
}

.modal.left {
    right: 35%;
    width: 59%;
    margin-right: 1%;
}

.modal.left .modal-dialog,
.modal.right .modal-dialog {
    max-width: 1200px;
}

.modal.right {
    width: 40%;
}

.modal.left .modal-content,
.modal.right .modal-content {
    height: 100%;
    overflow-y: auto;
}

.modal.left .modal-body,
.modal.right .modal-body {
    padding: 15px 15px 80px;
    overflow-y: scroll;
    max-height: 500px;
}

/*Left*/
.modal.left.fade .modal-dialog {
    left: auto;
    -webkit-transition: opacity 0.3s linear, left 0.3s ease-out;
    -moz-transition: opacity 0.3s linear, left 0.3s ease-out;
    -o-transition: opacity 0.3s linear, left 0.3s ease-out;
    transition: opacity 0.3s linear, left 0.3s ease-out;
}

.modal.left.fade.show .modal-dialog {
    left: auto;
}

/*Right*/
.modal.right.fade .modal-dialog {
    right: -600px;
    -webkit-transition: opacity 0.3s linear, right 0.3s ease-out;
    -moz-transition: opacity 0.3s linear, right 0.3s ease-out;
    -o-transition: opacity 0.3s linear, right 0.3s ease-out;
    transition: opacity 0.3s linear, right 0.3s ease-out;
}

.modal.right.fade.show .modal-dialog {
    right: 0;
}

/* ----- MODAL STYLE ----- */
.modal-content {
    border-radius: 0;
    border: none;
    background: #EEEEEE;
}

.modal-header {
    border-bottom-color: #EEEEEE;
    padding-bottom: .1rem;
}

.modal-header .close {
    opacity: 1;
    padding-left: .3rem;
}

.close-span {
    width: 100%;
    text-align: right;
    font-weight: 600;
    font-size: 18px;
    cursor: pointer;
}

/**
    Modal body scroll bar styles
   */
.modal-body::-webkit-scrollbar {
    width: 9px;
    border-radius: 10px;
}

.modal-body::-webkit-scrollbar-thumb {
    background-color: silver;
    border-radius: 10px;
}

.left-60 {
    left: 60%;
}

/** Add comment */
.cotainer-attachment {
    margin-top: 5px;
    display: flow-root;
}

.btn-send {
    background: #0C2340;
}

.input-add-comment {
    width: 100%;
    height: 40px;
    padding-left: 15px;
}

.link-add-attachment {
    font-weight: 600;
    margin-right: 10px;
    margin-top: 4px;
}

.link-add-attachment img {
    margin-right: 10px;
}

.comment-estimate-line {
    position: relative;
    z-index: 1100;
    margin-bottom: 15px;
}
</style>
