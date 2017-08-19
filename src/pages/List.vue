<template>
    <!-- <v-app  fill-height class="v-app-shell ">  -->
    <v-container fluid class="pa-0">
        <v-layout justify-center wrap class="scroll">
            <v-flex xs12 lg3>
                <ListBlock title="重要-紧急" :data="done ? ImpEmg.done : ImpEmg.undone" color="red" @previewTodo="previewTodo"></ListBlock>
            </v-flex>
            <v-flex xs12 lg3>
                <ListBlock title="重要-不紧急" :data="done ? ImpNotEmg.done : ImpNotEmg.undone" color="green" @previewTodo="previewTodo"></ListBlock>
            </v-flex>
            <v-flex xs12 lg3>
                <ListBlock title="不重要-紧急" :data="done ? NotImpEmg.done : NotImpEmg.undone" color="orange" @previewTodo="previewTodo"></ListBlock>
            </v-flex>
            <v-flex xs12 lg3>
                <ListBlock title="不重要-不紧急" :data="done ? NotImpNotEmg.done : NotImpNotEmg.undone" color="blue" @previewTodo="previewTodo"></ListBlock>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import ListBlock from '@/components/ListBlock'
import AppMask from '@/components/AppMask'

import { mapActions, mapState } from 'vuex';
import EventBus from '@/event-bus';
import { LoadServerTodos, codeToMessage } from '@/common/api';

export default {
    name: 'todo',
    components: {
        ListBlock,
    },
    data() {
        return {
            done: false,
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
        ...mapActions('todo', [
            'initTodos',
            'setTodoStatus'
        ]),
        edit: function() {
            console.log('list clicked');
        },
        previewTodo: function(todoId) {
            console.log(todoId);
            this.maskShow = true;
            this.$router.push({
                name:'detail',
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
                        id: ''
                    }
                }
            }]
        });
        this.showBottomNav();
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
        })
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
