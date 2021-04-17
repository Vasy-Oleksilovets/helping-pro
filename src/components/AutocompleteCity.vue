<template>
    <div class="autocomplete">
        <input
            v-if="kind==0"
            type="text"
            class="form-control"
            v-model="search"
            :disabled="disabled"
            @input="onChanage"
            @focus="isOpen = true"
        />
        <input
            v-else
            type="text"
            class="form-control"
            v-model="search"
            :disabled="disabled"
            @input="onChanage"
            @focus="isOpen = true"
            style="height: 49px"
        />
        <ul class="autocomplete-results" v-show="isOpen">
            <li class="loading" v-if="isLoading">
                Loading results...
            </li>
            <li
                style="cursor: pointer; padding: 10px 20px"
                :class="{ 'is-active': i === arrowCounter }"
                v-else
                v-for="(item, i) in items"
                :key="item.id"
                @click="setCity(item)"
            >
                {{ item.name }}
            </li>
        </ul>
    </div>
</template>

<script>
import AddressProxy from '@/proxies/AddressProxy.js';

export default {
    name: 'AutocompleteCity',
    props: ['value', 'state', 'disabled', 'kind', 'default_stateCode', 'default_cityid'],
    data() {
        return {
            items: [],
            isOpen: false,
            search: '',
            isLoading: false,
            arrowCounter: 0,
            cities: []
        };
    },
    methods: {
        onChanage() {
            let searchresult = this.cities.filter((item) => item.name.toLowerCase().indexOf(this.search.toLowerCase()) > 0 || item.name.toLowerCase().indexOf(this.search.toLowerCase()) === 0);
            this.items = searchresult;
        },
        setCity(result) {
            this.search = result.name;
            this.isOpen = false;
            this.value = result;
            this.$emit('input', result);
        },
    },
    watch: {
        state: function(newValue) {
            this.isLoading = true;
            if(Object.keys(newValue).length > 0){
                this.result = '';
                new AddressProxy().getCities(newValue.code).then((response) => {
                    this.items = response;
                    this.cities = response;
                    this.isLoading = false;
                })
            }
        }
    },
    created(){
        if(this.default_stateCode !== undefined && this.default_stateCode!==null){
            new AddressProxy().getCities(this.default_stateCode).then((response) => {
                this.items = response;
                this.cities = response;
                this.isLoading = false;
                if(!this.default_cityid !== undefined){
                    let searchResult = this.cities.filter((item) => item.id == this.default_cityid);
                    this.items = searchResult;
                    this.search = searchResult[0].name;
                    this.value = searchResult[0];
                }
              
            })
        }
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
