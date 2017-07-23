<template>
    <div>
        <v-container fluid>
            <v-layout justify-center>
                <p class="ma-5">
                    用户注册
                </p>
            </v-layout>
            <v-layout justify-center>
                <v-flex xs8>
                    <v-text-field prepend-icon="email" name="input-1" label="请输入邮箱" id="username" v-model.trim="email" required :rules="[checkEmail]"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout justify-center>
                <v-flex xs8>
                    <v-text-field prepend-icon="lock" :type="eye ? 'text' : 'password' " name="input-1" label="请输入密码" id="password" required :append-icon="eye ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (eye = !eye)" :rules="[checkPassword]" v-model.trim="password" counter></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout justify-center>
                <v-flex xs6 class="pa-3">
                    <v-btn primary light block>立即注册</v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>
<script>

import { mapActions } from 'vuex';
import { emailCheck,clearSpace } from '../common/common.js'

export default {
    name: 'register',
    data() {
        return {
            email: '',
            password: '',
            eye: false,
        }
    },
    methods: {
        ...mapActions('appShell/appHeader', [
            'setAppHeader'
        ]),
        checkPassword: function() {
            this.password = clearSpace(this.password);
            return (this.password.length >= 6) ? true : '6-25位密码，不能用空格';
        },
        checkEmail: function() {
            this.email = clearSpace(this.email);
            if (!this.email) {
            	return '邮箱不能为空';
            }
            return emailCheck(this.email) ? true : '请输入正确的邮箱格式';
        }
    },
    activated: function() {
        this.setAppHeader({
            title: '注册账号',
            show: true,
            showMenu: false,
            showBack: true,
            actions: [{
                icon: 'home',
                route: {
                    name: 'home'
                }
            }]
        });
    }
}

</script>
<style scoped>
p {
    font-size: 48px;
    /*border: 1px solid red;*/
}

.container {
    width: 100%;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    /*border: 1px solid red;*/
}

</style>
