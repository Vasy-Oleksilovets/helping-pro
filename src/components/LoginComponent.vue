<template>
    <div id="loginComponent">
        <form @submit.prevent="callLogin()">
            <input
                type="text"
                placeholder="username"
                v-model="user"
            /><br /><br />
            <input
                type="password"
                placeholder="password"
                v-model="password"
            /><br /><br />
            <b-btn variant="success" type="submit">Login</b-btn>
            <p v-if="error" class="error">Bad login information</p>
        </form>
    </div>
</template>

<script>
import AuthProxy from '@/proxies/AuthProxy.js';
import { LOGIN_SUCCESS } from '../store/modules/account/mutation-types';
export default {
    name: 'conceptScreening',
    data() {
        return {
            user: '',
            password: '',
            error: false,
            isLoggedIn: false,
            errors: [],
        };
    },
    methods: {
        callLogin() {
            var params = new URLSearchParams();
            params.append('username', this.user);
            params.append('password', this.password);
            new AuthProxy()
                .getLogin(params)
                .then(response => {
                    // JSON responses are automatically parsed.
                    if (response.status == '200') {
                        // good login
                        this.$store.commit(LOGIN_SUCCESS, {
                            userName: response.data.username,
                            firstName: response.data.firstName,
                        });
                        this.isLoggedIn = true;
                        this.$emit('submitted', this.isLoggedIn);
                    } else {
                        // bad login
                        this.$store.state.loginSuccess = false;
                        this.isLoggedIn = false;
                        this.$emit('submitted', this.isLoggedIn);
                    }
                })
                .catch(e => {
                    this.errors.push(e);
                });
        },
    },
};
</script>
