<template>
    <v-container fluid class="pa-0">
        <v-layout justify-center wrap class="scroll">
            <v-flex xs12 lg3>
                <ListBlock title="重要-紧急" :data="done ? ImpEmg.done : ImpEmg.undone" color="red" @previewTodo="previewTodo" @deleteTodo="showDeleteTodoSnackbar"></ListBlock>
            </v-flex>
            <v-flex xs12 lg3>
                <ListBlock title="重要-不紧急" :data="done ? ImpNotEmg.done : ImpNotEmg.undone" color="green" @previewTodo="previewTodo" @deleteTodo="showDeleteTodoSnackbar"></ListBlock>
            </v-flex>
            <v-flex xs12 lg3>
                <ListBlock title="不重要-紧急" :data="done ? NotImpEmg.done : NotImpEmg.undone" color="orange" @previewTodo="previewTodo" @deleteTodo="showDeleteTodoSnackbar"></ListBlock>
            </v-flex>
            <v-flex xs12 lg3>
                <ListBlock title="不重要-不紧急" :data="done ? NotImpNotEmg.done : NotImpNotEmg.undone" color="blue" @previewTodo="previewTodo" @deleteTodo="showDeleteTodoSnackbar"></ListBlock>
            </v-flex>
        </v-layout>
        <AppMask :show="snackbar" @click.native="deleteTodoCancelled"></AppMask>
        <v-snackbar :timeout="0" bottom multi-line v-model="snackbar" error>
            确定删除？
            <v-spacer></v-spacer>
            <v-btn outline round @click.native="deleteTodoCancelled">取消</v-btn>
            <v-btn round secondary ripple light @click.native="deleteTodoConfirmed">删除</v-btn>
        </v-snackbar>
    </v-container>
</template>
<script>
import ListBlock from '@/components/ListBlock'
import AppMask from '@/components/AppMask'

import { mapActions, mapState } from 'vuex';
import EventBus from '@/event-bus';
import { LoadServerTodos, codeToMessage, getCurrentUser } from '@/common/api';

export default {
    name: 'todo',
    components: {
        ListBlock,
        AppMask
    },
    data() {
        return {
            done: false,
            snackbar: false,
            deletingTodoId:''
        }
    },
    computed: {
        // ...mapGetters('todo', [
        //     'ImpEmg',
        //     'ImpNotEmg',
        //     'NotImpEmg',
        //     'NotImpNotEmg'
        // ]),
        ...mapState('todo', [
            'todos'
        ]),
        ImpEmg: function() {
            return this.filterTodos('ImpEmg')
        },
        ImpNotEmg: function() {
            return this.filterTodos('ImpNotEmg')
        },
        NotImpEmg: function() {
            return this.filterTodos('NotImpEmg')
        },
        NotImpNotEmg: function() {
            return this.filterTodos('NotImpNotEmg')
        },
    },
    methods: {
        ...mapActions('appShell/appHeader', [
            'setAppHeader'
        ]),
        ...mapActions('appShell/appBottomNavigator', [
            'showBottomNav'
        ]),
        ...mapActions('appShell/appSnackbar', [
            'showSnackbar',
        ]),
        ...mapActions('appShell/appSidebar', [
            'setAppSidebar',
        ]),
        ...mapActions('todo', [
            'initTodos',
            'setTodoStatus',
            'deleteTodo'
        ]),
        edit: function() {
            console.log('list clicked');
        },
        previewTodo: function(todoId) {
            console.log(todoId);
            this.maskShow = true;
            this.$router.push({
                name: 'detail',
                params: {
                    type: 'edit',
                    id: todoId
                }
            })
        },
        filterTodos: function(type) {
            return this.todos ? {
                done: [...this.todos.values()].filter(todo => ((todo.get('type') === type) && (todo.get('status') === true))).sort((todo1, todo2) => { return todo2.updatedAt - todo1.updatedAt }),
                undone: [...this.todos.values()].filter(todo => ((todo.get('type') === type) && (todo.get('status') === false))).sort((todo1, todo2) => { return todo2.updatedAt - todo1.updatedAt }),
            } : {};
        },
        showDeleteTodoSnackbar:function(todoId) {
            this.deletingTodoId = todoId;
            this.snackbar = true;
        },
        deleteTodoConfirmed:function() {
            console.log('delete todo confirmed');
            this.deleteTodo(this.deletingTodoId).then(()=>{
                this.deletingTodoId = '';
                this.snackbar = false;
                this.showSnackbar({ type: 'success', msg: '删除成功！' });
            },(err)=>{
                this.showSnackbar({ type: 'error', msg: codeToMessage(err.code) });
                this.deletingTodoId = '';
                this.snackbar = false;
            });
        },
        deleteTodoCancelled:function() {
            console.log('delete todo cancelled');
            this.deletingTodoId = '';
            this.snackbar = false
        }
    },
    activated: function() {
        console.log('activating page');
        this.setAppHeader({
            title: '待办事项',
            show: true,
            showMenu: true,
            showBack: false,
            actions: [{
                icon: 'add',
                route: {
                    name: 'edit',
                    params: {
                        type: 'add',
                        id: 'add'
                    }
                }
            }]
        });
        this.showBottomNav();
        let currentUser = getCurrentUser();
        this.setAppSidebar({
            user:{
                name: currentUser.get('username'),
                email:currentUser.get('email')
            }
        })
    },
    created: function() {
        EventBus.$on('app-bottom-navigator:click-nav', (eventData) => {
            if (eventData.name === 'done') {
                this.done = true;
            } else {
                this.done = false;
            }
        });
        LoadServerTodos().then((todos) => {
            console.log(todos);
            this.initTodos(todos)
        }, (err) => {
            this.showSnackbar({ type: 'error', msg: codeToMessage(err.code) })
            console.log(err);
        });
        
    }
}

</script>
<style scoped>
.b {
    border: 1px solid red;
}

.card-position {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 70px 20px 80px 20px;
    z-index: 9999;
}

.card-content {
    background-color: #fff;
    overflow-y: scroll;
    opacity: 1;
    color: #000;
}


.card-mask {
    padding: 50px;
}









/*.scroll{
    overflow-y: scroll;
}*/

</style>
