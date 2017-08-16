<template>
    <v-app fill-height fixed-footer class="edit-shell">
        <v-layout class="pa-2 fill-height" justify-center>
            <v-text-field label="待办内容" class="input-group--focused fill-height edit-area" multi-line hide-details v-model="todoContent"></v-text-field>
        </v-layout>
        <v-layout row justify-center>
            <v-dialog v-model="dialogShow">
                <v-card>
                    <v-card-title>保存更改</v-card-title>
                    <v-card-text>
                        内容有所更改，是否保存？
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="blue--text blue-1" flat="flat" @click.native="dialogShow = false">放弃</v-btn>
                        <v-btn primary @click.native="dialogShow = false">保存</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
        <footer class="app-shell-footer">
            <v-bottom-nav absolute value="true" :class="{
                'red': todoType === 'ImpEmg',
                'green': todoType === 'ImpNotEmg',
                'orange': todoType === 'NotImpEmg',
                'blue': todoType === 'NotImpNotEmg'
              }">
                <v-btn dark @click.native="todoType = 'ImpEmg'" :value="todoType === 'ImpEmg'">
                    <span>重要紧急</span>
                    <v-icon v-show="todoType === 'ImpEmg'">check_circle</v-icon>
                </v-btn>
                <v-btn dark @click.native="todoType = 'ImpNotEmg'" :value="todoType === 'ImpNotEmg'">
                    <span>重要不紧急</span>
                    <v-icon v-show="todoType === 'ImpNotEmg'">check_circle</v-icon>
                </v-btn>
                <v-btn dark @click.native="todoType = 'NotImpEmg'" :value="todoType === 'NotImpEmg'">
                    <span>不重要紧急</span>
                    <v-icon v-show="todoType === 'NotImpEmg'">check_circle</v-icon>
                </v-btn>
                <v-btn dark @click.native="todoType = 'NotImpNotEmg'" :value="todoType === 'NotImpNotEmg'">
                    <span>不重要不紧急</span>
                    <v-icon v-show="todoType === 'NotImpNotEmg'">check_circle</v-icon>
                </v-btn>
            </v-bottom-nav>
        </footer>
    </v-app>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import EventBus from '@/event-bus';

export default {
    data() {
        return {
            todoType: 'ImpEmg',
            todoContent:'',
            currentTodo: null,
            pageType:'',
            dialogShow: false
        }
    },
    methods: {
        ...mapActions('appShell/appHeader', [
            'setAppHeader'
        ]),
        ...mapActions('appShell/appBottomNavigator', [
            'hideBottomNav',
        ]),
        saveChange: function(todo) {

        },
        discardChange:function(todo) {

        },
        gotoList:function() {
            this.$router.go(-1);
        }
    },
    computed: {
        ...mapState('todo', [
            'todos'
        ]),
    },
    created: function() {
        console.log(this.$router);
        this.hideBottomNav();

        let appHeaderTitle = '';
        switch (this.$route.params.type) {
            case 'add':
                appHeaderTitle = '添加待办事项';
                this.pageType = 'add';
                break;
            case 'edit':
                appHeaderTitle = '编辑待办事项';
                this.pageType = 'edit';
                break;
            default:
                appHeaderTitle = '编辑待办事项';
                this.pageType = 'add';
        }
        this.setAppHeader({
            title: appHeaderTitle,
            show: true,
            showMenu: false,
            showBack: true,
            needBackConfirm: true,
            actions: [{
                icon: 'save',
            }]
        });
        let todoId = this.$route.params.id;
        if (todoId && (this.currentTodo = this.todos.get(todoId))) {
            console.log(this.currentTodo);
            this.currentTodo = this.todos.get(todoId);
            this.todoType = this.currentTodo.get('type');
            this.todoContent = this.currentTodo.get('content');
        }
    },
    mounted: function() {
        EventBus.$on('app-header:click-action', (eventData) => {
            console.log(eventData);
            switch (eventData.actionIdx) {
                case 0:
                    this.saveTodo();
                    break;
                default:
            }
        })
        EventBus.$on(`app-header:click-back`, (eventData) => {
            console.log('back');
            console.log(eventData);
            this.dialogShow = true;
        });
    },
    beforeDestroy: function() {
        EventBus.$off('app-header:click-action');
        EventBus.$off('app-header:click-back');
    },
}

</script>
<style scoped>
.b {
    border: 1px solid red;
}

.g {
    border: 1px solid green;
}

.edit-shell {
    padding-top: 52px;
    padding-bottom: 56px;
    height: 100%;
    width: 100%;
    margin: 0;
}

.app-shell-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
}

</style>
