<template>
  <div class="container-left-modal-item">
    <div class="comment-frame position-relative">
      <img src="~@/assets/img/comment-frame.png"/>
    </div>
    <div class="d-flex comment-description">
      <div class="col-12">
        <span class="spn-author">{{ comment.author }}</span>
        <span class="spn-date float-right">{{ formatDate(comment.date) }}</span>
        <span class="spn-comment d-block">{{ comment.comment }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";

export default {
  name: "CommentLeftModalItem",
  props: [
    'data',
  ],  
  watch: {
    data: {
      handler: function(newValue, oldValue) {
        this.comment = Object.assign({}, newValue);
      },
      deep: true
    }
  },
  data() {
    return {
      comment: Object.assign({}, this.data),
    };
  },
  methods: {
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
  .container-left-modal-item {
    padding: 13px;
    background: white;
    display: flex;
    margin-bottom: 8px;

    font-family: Montserrat;
    font-style: normal;
  }
  .container-left-modal-item:hover {
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
    font-weight: 600;
  }
  .spn-type {
    font-size: 13px;
  }
  .spn-date {
    color: #909090;
    font-weight: 500;
  }
  .spn-comment {
    font-size: 13px;
    font-weight: 500;
  }
</style>