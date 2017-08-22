<template>
    <div>
    <v-container>
        <v-layout justify-center>
            <v-flex xs8 lg3 mb-4>
                <img src="../assets/img/todolist1.png" alt="logo">
            </v-flex>
        </v-layout>
        <v-layout justify-center>
            <v-flex xs8 lg4>
                <v-text-field prepend-icon="email" name="email" label="邮箱" id="email" v-model.trim="email" required :rules="[checkEmail]"></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout justify-center>
            <v-flex xs8 lg4>
                <v-text-field prepend-icon="lock" v-model.trim="password" :type="eye ? 'text' : 'password' " name="input-1" label="密码" id="password" required counter :append-icon="eye ? 'visibility' : 'visibility_off'" :append-icon-cb="function(){eye = !eye}" :rules="[checkPassword]"></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout justify-center>
            <v-flex xs6 lg3>
                <v-btn primary dark block @click.native="login">登录</v-btn>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs8 offset-xs2>
                <p>
                    还没有账号？注册一个吧~
                    <v-btn error flat small :to="{name:'register'}" router>立即注册</v-btn>
                </p>
            </v-flex>
        </v-layout>
    </v-container>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
import { emailCheck, clearSpace } from '../common/common.js'

import { requestLogin, codeToMessage, isLogedin } from '@/common/api.js'

export default {
    name: 'login',
    data() {
        return {
            email: 'test@test.com',
            password: '111111',
            eye: false,
        }
    },
    methods: {
        ...mapActions('appShell', [
            'disablePageTransition'
        ]),
        ...mapActions('appShell/appHeader', [
            'setAppHeader'
        ]),
        ...mapActions('appShell/appBottomNavigator', [
            'hideBottomNav'
        ]),
        ...mapActions('appShell/appSnackbar', [
            'showSnackbar',
        ]),
        // ...mapActions('user', [
        //     'setUserInfo'
        // ]),
        checkPassword: function() {
            this.password = clearSpace(this.password);
            if (!this.password) {
                return ''
            }
            return (this.password.length >= 6) ? true : '6-25位密码，不能用空格';
        },
        checkEmail: function() {
            this.email = clearSpace(this.email);
            if (!this.email) {
                return '';
            }
            return emailCheck(this.email) ? true : '请输入正确的邮箱格式';
        },
        login: function() {
            console.log('try login');
            if (this.checkEmail() !== true || this.checkPassword() !== true) {
                // 验证邮箱和密码失败
                console.log(this.email);
                console.log(this.password);
                console.log('email or password check failed');
                return '';
            }
            requestLogin({ email: this.email, password: this.password }).then((loginedInUser) => {

                console.log('user login passed, going to todo page');
                console.log(loginedInUser);
                this.$router.push({ name: 'list' })

            }, (err) => {
                this.showSnackbar({ type: 'error', msg: codeToMessage(err.code) });
                return Promise.reject(err);
            })

        }
    },
    mounted: function() {
        if (isLogedin()) {
            this.$router.push({ name: 'list' });
        } else {
            this.setAppHeader({
                title: 'Todo List',
                show: true,
                showMenu: false,
                showBack: false,
                showLogo: false,
                actions: []
            });
            this.hideBottomNav();
        }
    }
}

</script>
<style scoped>
.container {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.container img {
    width: 100%;
    height: 100%;
}

</style>
