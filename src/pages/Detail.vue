<template>
    <v-container fluid class="pa-2">
        <v-card>
            <v-card-title class="card-title" :class="color">
                {{ cardTitle }}
            </v-card-title>
            <v-card-text class="text-xs-left markdown-body" v-html="html(todoContent)"></v-card-text>
        </v-card>
    </v-container>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import marked from 'marked'
import "github-markdown-css/github-markdown.css"
export default {
    name: 'detail',
    data() {
        return {
            currentTodo: null,
            todoContent: '',
            todoType: '',
        }
    },
    methods: {
        ...mapActions('appShell/appHeader', [
            'setAppHeader'
        ]),
        ...mapActions('appShell/appBottomNavigator', [
            'hideBottomNav'
        ]),
        ...mapActions('appShell/appSnackbar', [
            'showSnackbar',
        ]),
        ...mapActions('todos', [
            'setTodo',
            'setTodoStatus'
        ]),
        html: function(content) {
            return marked(content);
        }
    },
    computed: {
        ...mapState('todo', [
            'todos'
        ]),
        cardTitle: function() {
            switch (this.todoType) {
                case 'ImpEmg':
                    return '重要-紧急';
                    break;
                case 'ImpNotEmg':
                    return '重要-不紧急';
                    break;
                case 'NotImpEmg':
                    return '不重要-紧急';
                    break;
                case 'NotImpNotEmg':
                    return '不重要-不紧急';
                    break;
                default:
                    return 'Error: type not found';
            }
        },
        color: function() {
            switch (this.todoType) {
                case 'ImpEmg':
                    return 'red';
                    break;
                case 'ImpNotEmg':
                    return 'green';
                    break;
                case 'NotImpEmg':
                    return 'orange';
                    break;
                case 'NotImpNotEmg':
                    return 'blue';
                    break;
                default:
                    return 'red';
            }
        },
    },
    activated() {

        let todoId = this.$route.params.id;

        if (todoId && (this.currentTodo = this.todos.get(todoId))) {
            this.currentTodo = this.todos.get(todoId);
            this.todoType = this.currentTodo.get('type');
            this.todoContent = this.currentTodo.get('content');
        } else {
            this.showSnackbar({
                type: 'error',
                msg: '参数错误'
            });
            this.$router.go(-1);
        }

        this.setAppHeader({
            show: true,
            title: '查看待办事项',
            showMenu: false,
            showBack: true,
            showLogo: false,
            needBackConfirm: false,
            actions: [{
                icon: 'edit',
                route: {
                    name: 'edit',
                    params: {
                        type: 'edit',
                        id: todoId
                    }
                }
            }]
        });

        this.hideBottomNav();
    }
}

</script>
<style scoped>
.card-title {
    color: #fff;
}

.markdown-body {
    box-sizing: border-box;
    max-width: 980px;
    margin: 0 auto;
    padding: 45px;
}

@media (max-width: 767px) {
    .markdown-body {
        padding: 15px;
    }
}

</style>
