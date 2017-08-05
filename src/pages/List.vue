<template>
    <div>
        <v-container fluid class="pa-0">
            <v-layout justify-center wrap>
                <v-flex xs12 lg3>
                    <ListBlock title="重要-紧急" :data="done ? ImpEmg.done : ImpEmg.undone" color="red" :done="done"></ListBlock>
                </v-flex>
                 <v-flex xs12 lg3>
                    <ListBlock title="重要-不紧急" :data="done ? ImpNotEmg.done : ImpNotEmg.undone" color="green" :done="done"></ListBlock>
                </v-flex>
                 <v-flex xs12 lg3>
                    <ListBlock title="不重要-紧急" :data="done ? NotImpEmg.done : NotImpEmg.undone" color="orange" :done="done"></ListBlock>
                </v-flex>
                 <v-flex xs12 lg3>
                    <ListBlock title="不重要-不紧急" :data="done ? NotImpNotEmg.done : NotImpNotEmg.undone" color="accent" :done="done"></ListBlock>
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
import ListBlock from '@/components/ListBlock'

import { mapActions, mapGetters } from 'vuex';
import EventBus from '@/event-bus';
import { LoadServerTodos, codeToMessage } from '@/common/api';

export default {
    name: 'todo',
    components:{
        ListBlock
    },
    data() {
        return {
            done:false
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
            this.showSnackbar({type:'error', msg:codeToMessage(err.code)})
    	 	console.log(err);
    	 })
    }
}

</script>
<style scoped>
.b {
    border: 1px solid red;
}



</style>
