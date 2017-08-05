<template>
    <div>
        <v-container fluid class="pa-0">
            <v-layout justify-center wrap>
                <v-flex xs12 lg3>
                    <v-card flat tile>
                        <v-card-title class="red--text text--red-1">
                            重要-紧急
                        </v-card-title>
                        <v-card-text class="pa-0">
                            <v-container fluid class="pa-0 pl-3" v-for="todo in done?ImpEmg.done:ImpEmg.undone" :key="todo.id">
	                            <v-touch v-on:swipeleft="onSwipeLeft(todo)" v-on:press="press(todo)">
	                                <v-layout>
	                                    <v-flex xs1 class="pa-0">
	                                        <!-- <v-checkbox v-model="todo.attributes.status" error dark class="pa-1" hide-details></v-checkbox> -->
                                            <v-btn icon dark block class="pa-0 ma-0 red--text" @click.native="toggleTodoStatus(todo)">
                                                <v-icon> {{ todo.get('status')?'check_box': 'check_box_outline_blank'}}</v-icon>
                                            </v-btn>
	                                    </v-flex>
	                                    <v-flex xs11 class="pa-0 pr-2">
	                                        <p class="list" v-html="todo.get('content')"></p>
                                            <span style="color:#ccc;">更新时间： getUpdatedTime(todo)</span>
	                                    </v-flex>
	                                </v-layout>
                                </v-touch>
                            </v-container>
                        </v-card-text>
                    </v-card>
                    <v-divider></v-divider>
                </v-flex>
                <!-- <v-flex xs12 lg3>
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
                </v-flex> -->
            </v-layout>
        </v-container>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import EventBus from '@/event-bus';
import { LoadServerTodos } from '@/common/api';

export default {
    name: 'todo',
    data() {
        return {
            done:false
            // todos: [{
            //     done: false,
            //     text: 'Notify me about updates to apps or games that I downloadedNotify me about updates to apps or games that I downloadedNotify me about updates to apps or games that I downloadedNotify me about updates to apps or games that I downloaded'
            // }, {
            //     done: true,
            //     text: '记得明天写作业'
            // }, {
            //     done: false,
            //     text: '后天还得明天写作业'
            // }]
        }
    },
    computed:{
        ...mapGetters('todo',[
          'ImpEmg',
          'ImpNotEmg',
          'NotImpEmg',
          'NotImpNotEmg'
        ])
    },
    methods: {
        ...mapActions('appShell/appHeader', [
            'setAppHeader'
        ]),
        ...mapActions('appShell/appBottomNavigator', [
            'showBottomNav'
        ]),
        ...mapActions('todo', [
            'initTodos',
            'setTodoStatus'
        ]),
        edit: function() {
            console.log('list clicked');
        },
        changeStatus: function(todo) {
            todo.done = !todo.done;
            console.log('changeStatus');
        },
        onSwipeLeft:function(todo) {
        	console.log('swipeleft');
        	console.log(todo);
            // this.$router.push({
            //     name:'edit',
            //     params: {
            //         id: todo.id
            //     }
            // })
        },
        press:function(todo) {
        	console.log('press');
        	console.log(todo);
        },
        toggleTodoStatus:function(todo) {
            console.log(!todo.get('status'));
            this.setTodoStatus({
                id:todo.id,
                status:!todo.get('status')
            })
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
                    path: '/edit'
                }
            }]
        });
        this.showBottomNav();
    },
    created:function() {
    	 EventBus.$on('app-bottom-navigator:click-nav', (eventData) => {
            console.log(eventData);
            if (eventData.name === 'done') {
                this.done = true;
            } else {
                this.done = false;
            }
        });
    	LoadServerTodos().then((todos)=>{
    	 	console.log(todos);
            this.initTodos(todos)
    	 },(err)=>{
    	 	console.log(err);
    	 })
    	// console.log(todos);
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
