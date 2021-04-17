<template>
  <header id="header" >
    <b-navbar toggleable="md" type="light" variant="white">
      <div class="container">
        <b-navbar-brand @click="gotoOriginalPage">
          <img src="~@/assets/img/logo-on-white.svg" alt=""/>
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <nav id="site-navigation" class="main-navigation">
            <div class="top-row">
              <div class="menu-header-menu-top-container">
                <ul id="menu-header-menu-top" class="menu">
                  <li class="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-101"><a href="https://beta.constructioncheck.io/#about_us" aria-current="page">About Us</a></li>
                  <li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-102"><a href="https://beta.constructioncheck.io/resources">Resources</a></li>
                  <li class="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-362"><a href="https://beta.constructioncheck.io/#hiring" aria-current="page">Hiring</a></li>
                  <li class="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-103"><a href="https://beta.constructioncheck.io/#contact_us" aria-current="page">Contact Us</a></li>
                  <li v-if="login" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-104">
                    <router-link to="/signup">Sign Up</router-link>
                  </li>
                  <li v-else class="menu-item menu-item-type-custom menu-item-object-custom menu-item-104">
                    <router-link to="/login">Log in</router-link>
                  </li>
                </ul>
              </div>
            </div>
            <div class="bottom-row">
              <div class="menu-header-menu-bottom-container">
                <ul id="menu-header-menu-bottom" class="menu">
                  <li class="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-105"><a href="https://beta.constructioncheck.io/#services" aria-current="page">Products</a></li>
                  <li class="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-106"><a href="https://beta.constructioncheck.io/#how_it_works" aria-current="page">How It Works</a></li>
                  <li class="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-107"><a href="https://beta.constructioncheck.io/#pricing" aria-current="page">Pricing</a></li>
                  <li class="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-108"><a href="https://beta.constructioncheck.io/#security" aria-current="page">Security &amp; Compliance</a></li>
                </ul>
              </div>
            </div>
          </nav>
        </b-collapse>
      </div>
    </b-navbar>
  </header>
</template>

<script>
import AccountProxy from '@/proxies/AccountProxy.js';
//import { LOGOUT } from '../store/modules/auth/mutation-types';
import Vue from 'vue';

export default {
  name: 'navigation',
  data() {
    return {
      authenticated: false,
      login: true
    };
  },
  methods: {
    loginF: function() {
      this.authenticated = false;
      this.$router.push('/login');
    },
    logout: function() {
      this.authenticated = false;
      new AccountProxy('')
        .logout()
        .then(response => {
          this.$store.dispatch('auth/logout');
        })
        .catch(error => {
          this.$store.dispatch('auth/logout');
        });
    },
    gotoOriginalPage: function () {
      location.replace("https://beta.constructioncheck.io/")
    }
  },
  components: {},
  created() {
    if(this.$router.history.current.path == '/signup') this.login = false;
    else this.login = true;
    this.authenticated = this.$store.state.auth.token != null && this.$store.state.auth.token != '';
    Vue.$http.defaults.headers.common.Authorization = '';
  }
};
</script>
