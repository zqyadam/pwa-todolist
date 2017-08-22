<template>
    <v-app fill-height class="v-app-shell">
        <v-layout class="pa-3 fill-height" justify-center>
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
                        <v-btn class="blue--text blue-1" flat="flat" @click.native="showSaveChangeDialogCancelled">放弃</v-btn>
                        <v-btn primary @click.native="showSaveChangeDialogConfirmed">保存</v-btn>
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
import { AddTodoItem, codeToMessage } from '@/common/api';

export default {
    data() {
        return {
            todoType: 'ImpEmg',
            todoContent: '',
            currentTodo: null,
            pageType: '',
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
        ...mapActions('todo', [
            'setTodo',
            'addTodo'
        ]),
        ...mapActions('appShell/appSnackbar', [
            'showSnackbar',
        ]),
        // 显示保存更改对话框
        showSaveChangeDialog: function() {
            this.dialogShow = true;
        },
        // 点击保存更改对话框的"保存"按钮
        showSaveChangeDialogConfirmed: function() {
            console.log('dialog confirm clicked');
            if (this.pageType === 'edit') {
                this.saveTodoChange();
            } else if (this.pageType === 'add') {
                this.createTodo();
            } else {
                this.gotoListPage();
            }
        },
        // 点击保存更改对话框的"放弃"按钮
        showSaveChangeDialogCancelled: function() {
            this.gotoListPage();
        },
        isContentChanged: function() {
            return this.currentTodo.get('content') !== this.todoContent;
        },
        saveTodoChange: function() {
            this.currentTodo.set('type', this.todoType);
            this.currentTodo.set('content', this.todoContent);
            this.setTodo(this.currentTodo).then((changedTodo) => {
                this.showSnackbar({ type: 'success', msg: '保存成功！' });
                this.gotoListPage();
            }, (err) => {
                console.log(err);
                this.showSnackbar({ type: 'error', msg: codeToMessage(err.code) });
            });
        },
        createTodo: function() {
            // 没有内容直接返回
            if (!this.todoContent) {
                this.showSnackbar({ type: 'error', msg: '什么都没有，写点什么吧~！' });
                return
            }
            console.log('add a new todo');
            AddTodoItem({ content: this.todoContent, type: this.todoType }).then((newTodo) => {
                this.addTodo(newTodo);
                this.currentTodo = newTodo;
                this.showSnackbar({ type: 'success', msg: '添加成功！' });
                this.$router.push({ name: 'list' });
            }, (err) => {
                this.showSnackbar({ type: 'error', msg: codeToMessage(err.code) });
            })
        },
        gotoListPage: function() {
            this.$router.push({
                name: 'list'
            });
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
        if (todoId && (this.pageType !== 'add') && (this.currentTodo = this.todos.get(todoId))) {
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
                    if (this.pageType == 'edit') {
                        this.saveTodoChange();
                    } else if (this.pageType == 'add') {
                        this.createTodo();
                    }
                    break;
                default:
            }
        })
        EventBus.$on(`app-header:click-back`, (eventData) => {
            console.log('back');
            console.log(eventData);
            if (this.pageType === 'edit' && this.isContentChanged()) {
                this.showSaveChangeDialog();
            } else if (this.pageType === 'add' && this.todoContent) {
                this.showSaveChangeDialog();
            } else {
                this.gotoListPage();
            }


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



.app-shell-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
}

</style>
