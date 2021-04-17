<template>
  <div class="container-right-modal-item" @click="openLeftModal(comment.targetId)">
    <div class="comment-frame position-relative">
      <img src="~@/assets/img/comment-frame.png"/>
    </div>
    <div class="d-flex comment-description">
      <div class="col-6">
        <span class="d-block spn-unread">New Unread</span>
        <span class="d-block spn-author">{{ comment.author }}</span>
        <span class="d-block spn-type">Item type1</span>
      </div>
      <div class="col-6">
        <span class="d-bloack spn-date">{{ formatDate(comment.date) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from '../../../../../plugins/event-bus';
import store from "@/store";

export default {
  name: "CommentRightModalItem",
  props: [
    'data',
  ],  
  data() {
    return {
      comment: Object.assign({}, this.data),
    };
  },
  methods: {
		openLeftModal(targetId) {
      store.dispatch("comment/getCommentsByTypeId", {
        targetId: targetId,
      });

      EventBus.$emit('open_estimate_comments');
    },
    formatDate(string) {
      const date = new Date(string);
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ];
      
      return `${months[date.getMonth()]} ${date.getDate()},${date.getFullYear()}, ${date.getUTCHours()}:${date.getUTCMinutes()}`;
    }
	}
}
</script>

<style scoped>
  .container-right-modal-item {
    padding: 13px;
    background: white;
    display: flex;
    margin-bottom: 8px;

    font-family: Montserrat;
    font-style: normal;
  }
  .container-right-modal-item:hover {
    cursor: pointer;
  }
  .comment-frame {
    width: 40px;
    height: 40px;
    background: #D60000;
    border-radius: 2px;
  }
  .comment-frame img {
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .comment-description {
    width: calc(100% - 40px) !important;
  }
  .spn-unread {
    color: #C9C9C9;
    font-weight: 600;;
  }
  .spn-author {
    font-weight: 500;
  }
  .spn-type {
    font-size: 13px;
  }
  .spn-date {
    color: #909090;
    font-weight: 500;
  }
</style>