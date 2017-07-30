<template>
    <div>
        <v-container fluid class="pa-0">
            <v-layout justify-center wrap>
                <v-flex xs12 lg3>
                    <v-card flat tile>
                        <v-card-title class="red--text text--darken-1">
                            重要-紧急
                        </v-card-title>
                        <v-card-text class="pa-0">
                            <v-container fluid class="pa-0 pl-3" v-for="todo in todos" :key="todo.text">
                                <v-layout>
                                    <v-flex xs1 class="pa-0">
                                        <v-checkbox v-model="todo.done" error dark class="pa-1" hide-details></v-checkbox>
                                    </v-flex>
                                    <v-flex xs11 class="pa-0 pr-2">
                                        <p class="list" v-html="todo.text"></p>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card-text>
                    </v-card>
                    <v-divider></v-divider>
                </v-flex>
                <v-flex xs12 lg3>
                    <v-card flat tile>
                        <v-card-title class="light-green--text">
                            重要-不紧急
                        </v-card-title>
                        <v-card-text class="pa-0">
                            <v-container fluid class="pa-0 pl-3" v-for="todo in todos" :key="todo.text">
                                <v-layout>
                                    <v-flex xs1 class="pa-0">
                                        <v-checkbox v-model="todo.done" color="light-green" dark class="pa-1" hide-details></v-checkbox>
                                    </v-flex>
                                    <v-flex xs11 class="pa-0 pr-2">
                                        <p class="list" v-html="todo.text"></p>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card-text>
                    </v-card>
                    <v-divider></v-divider>
                </v-flex>
                <v-flex xs12 lg3>
                    <v-card flat tile>
                        <v-card-title class="orange--text">
                            不重要-紧急
                        </v-card-title>
                        <v-card-text class="pa-0">
                            <v-container fluid class="pa-0 pl-3"  v-for="todo in todos" :key="todo.text">
                                <v-layout>
                                    <v-flex xs1 class="pa-0">
                                        <v-checkbox v-model="todo.done" color="orange" dark class="pa-1" hide-details></v-checkbox>
                                    </v-flex>
                                    <v-flex xs11 class="pa-0 pr-2">
                                        <p class="list" v-html="todo.text"></p>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card-text>
                    </v-card>
                    <v-divider></v-divider>
                </v-flex>
                <v-flex xs12 lg3>
                    <v-card flat tile>
                        <v-card-title class="light-blue--text text--accent-4">
                            不重要-不紧急
                        </v-card-title>
                        <v-card-text class="pa-0">
                            <v-container fluid class="pa-0 pl-3" v-for="todo in todos" :key="todo.text" >
                                <v-layout>
                                    <v-flex xs1 class="pa-0">
                                        <v-checkbox v-model="todo.done" color="light-blue accent-4" dark class="pa-1" hide-details></v-checkbox>
                                    </v-flex>
                                    <v-flex xs11 class="pa-0 pr-2">
                                        <p class="list" v-html="todo.text"></p>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card-text>
                    </v-card>
                    <v-divider></v-divider>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
import EventBus from '@/event-bus';


export default {
    name: 'todo',
    data() {
        return {
            ssss: false,
            notifications: false,
            sound: true,
            widgets: false,
            todos: [{
                done: false,
                text: 'Notify me about updates to apps or games that I downloadedNotify me about updates to apps or games that I downloadedNotify me about updates to apps or games that I downloadedNotify me about updates to apps or games that I downloaded'
            }, {
                done: true,
                text: '记得明天写作业'
            }, {
                done: false,
                text: '后天还得明天写作业'
            }]
        }
    },
    methods: {
        ...mapActions('appShell/appHeader', [
            'setAppHeader'
        ]),
        ...mapActions('appShell/appBottomNavigator', [
            'showBottomNav'
        ]),
        edit: function() {
            console.log('list clicked');
        },
        changeStatus: function(todo) {
            todo.done = !todo.done;
            console.log('changeStatus');
        }
    },
    activated: function() {
        this.setAppHeader({
            title: '待办事项',
            show: true,
            showMenu: false,
            showBack: true,
            actions: [{
                icon: 'add',
                route: {
                    name: 'addTodo'
                }
            }]
        });
        this.showBottomNav();

        EventBus.$on('app-bottom-navigator:click-nav', (eventData) => {
            console.log(eventData);
            if (eventData.name === 'done') {
                this.done = true;
            } else {
                this.done = false;
            }
        });
    }
}

</script>
<style scoped>
.b {
    border: 1px solid red;
}


.list {
    max-height: 76px;
    margin-right: 10px;
    margin-bottom: 0;
    text-align: left;
    display: -webkit-box;
    display: -moz-box;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    font-size: 16px;
}

</style>
