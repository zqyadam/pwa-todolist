<template>
    <div>
        <v-container>
            <img src="../assets/img/todolist1.png" alt="logo">
            <v-layout justify-center>
                <v-flex xs8>
                    <v-text-field prepend-icon="email" name="email" label="邮箱" id="email" v-model.trim="email" required :rules="[checkEmail]"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout justify-center>
                <v-flex xs8>
                    <v-text-field prepend-icon="lock" v-model.trim="password" :type="eye ? 'text' : 'password' " name="input-1" label="密码" id="password" required counter :append-icon="eye ? 'visibility' : 'visibility_off'" :append-icon-cb="function(){eye = !eye}" :rules="[checkPassword]"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout justify-center>
                <v-flex xs6>
                    <v-btn primary light block>登录</v-btn>
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs8 offset-xs2>
                    <p>
                        还没有账号？注册一个吧~
                        <v-btn error flat small floating  :to="{name:'register'}" router >立即注册</v-btn>
                    </p>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
import { emailCheck, clearSpace } from '../common/common.js'

export default {
    name: 'login',
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
        ...mapActions('appShell/appBottomNavigator', [
            'hideBottomNav'
        ]),

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
        }
    },
    activated: function() {
        this.setAppHeader({
            title: 'Todo List',
            show: true,
            showMenu: false,
            showBack: false,
            showLogo: false,
        });
        this.hideBottomNav();
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
    width: 40%;
    margin-bottom: 10px;
}







/*.login {
    color: white;
}*/

</style>
