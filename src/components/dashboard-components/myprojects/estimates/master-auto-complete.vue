<template>
    <div class="autocomplete">
        <div class="form-group has-search w-100">
            <span class="fa fa-search form-control-feedback"></span>
            <!-- <input type="text" class="form-control" placeholder="Search"> -->
            <input
                type="text"
                class="form-control"
                v-model="search"
                :disabled="disabled"
                @input="onChanage"
                @keydown.down="onArrowDown"
                @keydown.up="onArrowUp"
                @keydown.enter="onEnter"
                @mousedown="mouseDown"
                placeholder="Search"
            />
        </div>
        <ul
            class="autocomplete-results"
            v-show="isOpen"
            v-on:scroll="scrollFunction"
        >
            <li class="loading" v-if="isLoading">Loading results...</li>
            <li
                class="autocomplete-result"
                :class="{ 'is-active': i === arrowCounter }"
                v-else
                v-for="(item, i) in items"
                :key="item.id"
                @click="setResult(item)"
            >
                {{ item.number }}
                {{ item.title }}
            </li>
        </ul>
    </div>
</template>

<script>
import CodeProxy from '@/proxies/CodeProxy.js';
import store from '@/store';
import { mapGetters } from 'vuex';
var $ = require('jquery');

export default {
    name: 'MasterAutocomplete',
    props: ['value', 'initial', 'disabled'],
    computed: {},
    data() {
        return {
            items: [],
            isOpen: false,
            results: [],
            search: '',
            isLoading: false,
            arrowCounter: 0,
            allCodes: [],
            sliceLength: 10,
        };
    },
    methods: {
        onChanage() {
            this.isLoading = true;
            /**
             * If the user types at least two numbers or three characters, call /search endpoint
             * Else show all master codes
             * */

            if (!this.validateSearchCode(this.search)) {
                this.items = this.allCodes.slice(0, this.sliceLength);
                this.isLoading = false;
                this.isOpen = true;
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
            this.search = '';
            this.isOpen = false;

            store.dispatch('code/setNewEstimateStatus', {
                status: true,
                number: result.number,
                title: result.title,
                id: result.id,
            });

            this.$emit('input', this.search);
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
        mouseDown() {
            this.onChanage();
        },
        validateSearchCode(keyword) {
            if (keyword.length >= 3) return true;
            if (keyword.length == 2 && /^\d+$/.test(keyword)) return true;
            return false;
        },
        scrollFunction({ target: { scrollTop, clientHeight, scrollHeight } }) {
            if (scrollTop + clientHeight >= scrollHeight) {
                this.sliceLength += 10;
                if (this.sliceLength >= this.allCodes.length)
                    this.sliceLength = this.allCodes.length;
                this.onChanage();
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

        new CodeProxy()
            .simple()
            .then(response => {
                this.allCodes = response;
            })
            .catch(response => {});
    },
    destroyed() {
        document.removeEventListener('click', this.handleClickOutside);
    },
};
</script>

<style>
.autocomplete {
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;

    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 1em;
}

.autocomplete input {
    height: 40px;
    border-radius: 3px;

    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 1em;
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
    top: 58px;
}

.autocomplete-result {
    list-style: none;
    text-align: left;
    padding: 11px 2px;
    cursor: pointer;
    background-image: none;
}

.autocomplete-result.is-active,
.autocomplete-result:hover {
    background-color: #e9e9e9;
    color: #000000;
}

.has-search .form-control {
    padding-left: 2.375rem;
}

.has-search .form-control-feedback {
    position: absolute;
    z-index: 2;
    display: block;
    width: 2.5rem;
    height: 2.5rem;
    line-height: 2.5rem;
    text-align: center;
    pointer-events: none;
    color: #000000;
    top: 12px;
}
</style>
