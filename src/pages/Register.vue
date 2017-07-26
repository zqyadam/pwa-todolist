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
                    <v-text-field prepend-icon="email" name="email" label="请输入邮箱" id="email" v-model.trim="email" required :rules="[checkEmail]"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout justify-center>
                <v-flex xs8>
                    <v-text-field prepend-icon="account_box" type="text" name="username" label="请输入昵称" id="username" v-model.trim="username"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout justify-center>
                <v-flex xs8>
                    <v-text-field prepend-icon="lock" :type="eye ? 'text' : 'password' " name="input-1" label="请输入密码" id="password" required :append-icon="eye ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (eye = !eye)" :rules="[checkPassword]" v-model.trim="password" counter></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout justify-center>
                <v-flex xs6 class="pa-3">
                    <v-btn primary light block @click.native="register" v-text="btnText"></v-btn>
                </v-flex>
            </v-layout>
        </v-container>
        <v-snackbar v-model="snackbar" :success="snackbarType === 'success'" :error="snackbarType === 'error'" :timeout="3000">
            {{ snackbarMsg }}
            <v-btn dark flat @click.native="snackbar = false">关闭</v-btn>
        </v-snackbar>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
import { emailCheck, clearSpace } from '../common/common.js'
import { registeUser } from '../common/api.js'


export default {
    name: 'register',
    data() {
        return {
            email: '11@qq.com',
            username: '',
            password: '111111',
            eye: false,
            btnText: '立即注册',
            snackbar: false,
            snackbarType: '',
            snackbarMsg: '',
        }
    },
    methods: {
        ...mapActions('appShell/appHeader', [
            'setAppHeader'
        ]),
        showSnackbar: function() {
            this.snackbar = true;
        },
        checkPassword: function() {
            this.password = clearSpace(this.password);
            if (!this.password) {
                return '';
            }
            return (this.password.length >= 6) ? true : '6-25位密码，不能用空格';
        },
        getUsername: function() {
            if (this.username) {
                return this.username;
            }
            if (this.email.length >= 0) {
                this.username = this.email.split('@')[0];
                return this.username;
            }
        },
        checkEmail: function() {
            this.email = clearSpace(this.email);
            if (!this.email) {
                return '';
            }
            return emailCheck(this.email) ? true : '请输入正确的邮箱格式';
        },
        register: function() {

            if (this.checkEmail() !== true || this.checkPassword() !== true) {
                // 验证邮箱和密码失败

                return '';
            }
            // 构建用户信息
            let userinfo = {
                email: this.email,
                username: this.getUsername(),
                password: this.password
            }
            this.btnText = "注册中..."
            registeUser(userinfo).then(loginedUser => {
                // 注册成功
                this.snackbarMsg = '注册成功！'
                this.snackbarType = 'success';
                this.btnText = "注册成功";
                this.showSnackbar();
            }, err => {
                // 注册失败
                console.log(err.message);
                this.snackbarMsg = err.message;
                this.snackbarType = 'error';
                this.showSnackbar();
                this.btnText = "立即注册";
            })
            console.log(userinfo);
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
