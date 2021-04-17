<template>
  <div class="autocomplete">
    <input type="text" class="form-control" v-model="search" :disabled="disabled" @input="onChanage" @keydown.down="onArrowDown" @keydown.up="onArrowUp" @keydown.enter="onEnter"/>
    <ul class="autocomplete-results" v-show="isOpen">
      <li class="loading" v-if="isLoading">Loading results...</li>
      <li class="autocomplete-result" :class="{ 'is-active': i === arrowCounter }" v-else v-for="(item, i) in items" :key="item.id" @click="setResult(item)">{{ item.number }} {{ item.title }}</li>
    </ul>
  </div>
</template>

<script>
import CodeProxy from '@/proxies/CodeProxy.js';

export default {
  name: 'Autocomplete',
  props: ['value', 'initial', 'disabled'],
  data() {
    return {
      items: [],
      isOpen: false,
      results: [],
      search: '',
      isLoading: false,
      arrowCounter: 0,
    };
  },
  methods: {
    onChanage() {
      this.isLoading = true;
      if (this.search.length < 2) {
        return;
      }

      new CodeProxy()
        .search(this.search.toLowerCase())
        .then(response => {
          this.items = response;
          this.isLoading = false;
          this.isOpen = true;
        })
        .catch(response => {});
    },

    setResult(result) {
      this.search = result.number;
      this.isOpen = false;
      this.$emit('input', result.number);
    },

    onArrowDown(evt) {
      if (this.arrowCounter < this.results.length) {
        this.arrowCounter = this.arrowCounter + 1;
      }
    },

    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1;
      }
    },

    onEnter() {
      this.search = this.results[this.arrowCounter];
      this.isOpen = false;
      this.arrowCounter = -1;
    },

    handleClickOutside(evt) {
      if (!this.$el.contains(evt.target)) {
        this.isOpen = false;
        this.arrowCounter = -1;
        if (this.search != this.value) {
          this.search = '';
          this.$emit('input', this.search);
        }
      }
    },
  },
  watch: {
      items: function(val, oldValue) {
          if (val.length != oldValue.length) {
              this.results = val;
              this.isLoading = false;
          }
      },
      value: function(val, oldValue) {
          if (val != oldValue) {
              this.search = val;
          }
      },
  },
  mounted() {
      if (this.initial != null && this.initial.length > 0) {
          this.search = this.initial;
          this.value = this.initial;
      }

      if (this.disabled == 'undefined' || this.disabled == null) {
          this.disabled = false;
      }
      document.addEventListener('click', this.handleClickOutside);
  },
  destroyed() {
      document.removeEventListener('click', this.handleClickOutside);
  },
};
</script>

<style>
.autocomplete {
    position: relative;
}

.autocomplete-results {
  position: absolute;
  z-index: 100;
  width: 300%;
  max-height: 200px;
  border: 1px solid #eeeeee;
  overflow: auto;
  padding: 0px 0px 0px 0px;
  background-color: white;
}

.autocomplete-result-list {
  position: absolute;
  z-index: 100 !important;
  width: 300%;
  max-height: 200px;
  border: 1px solid #eeeeee;
  overflow: auto;
  padding: 0px 0px 0px 0px;
  background-color: white;
}

.autocomplete-result {
    list-style: none;
    text-align: left;
    padding: 4px 2px;
    cursor: pointer;
}

.autocomplete-result.is-active,
.autocomplete-result:hover {
    background-color: #4aae9b;
    color: white;
}
</style>
