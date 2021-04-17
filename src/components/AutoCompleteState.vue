<template>
  <div class="autocompletestate">
    <input v-if="kind==0" type="text" class="form-control" v-model="search" :disabled="disabled" @input="onChanage" @focus="isOpen = true"/>
    <input v-else type="text" class="form-control" v-model="search" :disabled="disabled" @input="onChanage" @focus="isOpen = true" style="height: 49px"/>
    <ul class="autocomplete-results" v-show="isOpen">
      <li v-if="isLoading" class="loading">Loading results...</li>
      <li v-else style="cursor: pointer; padding: 10px 20px" :class="{ 'is-active': i === arrowCounter }" v-for="(item, i) in items" :key="item.id" @click="setState(item)">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
import AddressProxy from '@/proxies/AddressProxy.js';

export default {
  name: 'AutoCompleteState',
  props: ['value', 'disabled', 'default_value', 'kind'],
  data() {
    return {
      items: [],
      isOpen: false,
      result: '',
      search: '',
      isLoading: false,
      arrowCounter: 0,
      states: []
    };
  },
  methods: {
    onChanage() {
      //If the search box is empty, the autocomplete list shoule be closed
      if(this.search) this.isOpen = true;
      else this.isOpen = false;

      let searchresult = this.states.filter((item) => item.name.toLowerCase().indexOf(this.search.toLowerCase()) > 0 || item.name.toLowerCase().indexOf(this.search.toLowerCase()) === 0);
      this.items = searchresult;
    },
    setState(result) {
      this.search = result.name;
      this.isOpen = false;
      this.value = result;
      this.$emit('input', result);
    },
  },
  created(){
    new AddressProxy().getStates().then((response) => {
      this.items = response;
      this.states = response;
      //If there is default value, need to set to the initial state
      if(typeof this.default_value !== 'undefined'){
        let searchResult = this.states.filter((item) => item.id === this.default_value);
        this.items = searchResult;
        this.search = searchResult[0].name;
        this.value = searchResult[0];
      }
    })
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
  width: 100%;
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
