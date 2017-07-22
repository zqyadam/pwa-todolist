<template>
    <div>
        <v-container>
            <img src="../assets/img/todolist1.png" alt="logo">
            <v-layout>
                <v-flex row xs8 offset-xs2>
                    <v-text-field name="input-1" label="邮箱" id="username" v-model="username" required></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs8 offset-xs2>
                    <v-text-field :type="eye ? 'text' : 'password' " name="input-1" label="密码" id="password" required :append-icon="eye ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (eye = !eye)" v-model="password" min="6" max="" hint="不少于6位" counter></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs4 offset-xs2>
                    <v-btn primary light>登录</v-btn>
                </v-flex>
                <v-flex xs4>
                    <v-btn>清空</v-btn>
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs8 offset-xs2>
                    <p>
                        还没有账号？注册一个吧~
                        <v-btn error flat small floating tag="a" to="/register">立即注册</v-btn>
                    </p>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>
<script>
import { mapActions } from 'vuex';


export default {
    name: 'login',
    data() {
        return {
            username: '',
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
    },
    activated:function() {
        this.setAppHeader({
        	title:'Todo List',
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
