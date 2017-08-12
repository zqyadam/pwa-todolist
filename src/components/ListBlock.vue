<template>
    <div>
        <v-card flat tile>
            <v-card-title :class="[ color + '--text', 'text--' + color + '-1' ]">
                {{ title }} ({{ data.length }})
            </v-card-title>
            <v-card-text class="pa-0">
                <v-touch @swipeleft="setTodoUnDone(todo)" @press="deleteTodo(todo)" @swiperight="setTodoDone(todo)" @tap="editTodo(todo)" @panright="!todo.get('status') && onPanStart(todo.id)" @panleft="todo.get('status') && onPanStart(todo.id)" @panend="onPanEnd(todo.id)" v-for="todo in data" :key="todo.id" :options="{ touchAction: 'pan-y' }" :swipe-options="{velocity:0.2,threshold:5}" >
                    <v-container fluid class="pa-0 pl-3" :ref="'list-'+todo.id" >
                        <v-layout>
                            <v-flex xs1 class="pa-0">
                                <v-btn icon dark block class="pa-0 ma-0" :class="[ color + '--text']" @click.native="toggleTodoStatus(todo)">
                                    <v-icon> {{ todo.get('status') ? 'check_box' : 'check_box_outline_blank' }} </v-icon>
                                </v-btn>
                            </v-flex>
                            <v-flex xs11 class="pa-0 pr-2 pt-2">
                                <p class="list-content" v-html="todo.get('content')"></p>
                                <span class="list-time">更新时间： {{ getUpdatedTime(todo) }}</span>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-touch>
            </v-card-text>
        </v-card>
        <v-divider></v-divider>
    </div>
</template>
<script>
import { dateFormat } from '@/common/common';
import { mapActions } from 'vuex';


export default {
    data() {
        return {
        	
        }
    },
    props: {
        title: {
            required: true,
            type: String
        },
        color: {
            required: true,
            type: String
        },
        data: {
            required: true,
            type: Array
        },
        // done:{
        // 	type:Boolean
        // }
    },
    methods: {
        ...mapActions('todo', [
            'setTodoStatus'
        ]),
        onSwipeUp: function() {
            console.log('onSwipeUp');
        },
        onPanStart: function(id) {
            console.log('onPanStart');
            console.log(this.$refs['list-'+id]);
            console.log("2px "+ this.color +" solid");
            this.$refs['list-'+id][0].style.border = "1px dashed rgba(0,0,0,0.2)";
            this.$refs['list-'+id][0].style.fontWeight = "bold";
        },
        onPanEnd: function(id) {
            console.log('panend');
            this.$refs['list-'+id][0].style.border="";
            this.$refs['list-'+id][0].style.fontWeight = "";
        },
        onSwipeLeft: function(todo) {
            console.log('swipeleft:');
            console.log(todo);
            // this.$router.push({
            //     name:'edit',
            //     params: {
            //         id: todo.id
            //     }
            // })
        },
        editTodo: function(todo) {
            console.log('edit todo');
            console.log(todo);
            // this.$router.push({
            //     name:'edit',
            //     params: {
            //         id: todo.id
            //     }
            // })
        },
        toggleTodoStatus: function(todo) {
            this.setTodoStatus({
                id: todo.id,
                status: !todo.get('status')
            })
        },
        setTodoDone: function(todo) {
            if (!todo.get('status')) {
                this.setTodoStatus({
                    id: todo.id,
                    status: true
                })
            }
        },
        setTodoUnDone:function(todo) {
        	if (todo.get('status')) {
                this.setTodoStatus({
                    id: todo.id,
                    status: false
                })
            }
        },
        getUpdatedTime: function(todo) {
            return new Date(todo.updatedAt).format("yyyy-MM-dd hh:mm:ss");
        },
    },
    created: function() {
        Date.prototype.format = dateFormat;
    }
}

</script>
<style scoped>
.list-content {
    max-height: 90px;
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

.list-time {
    color: #ccc;
    text-align: left;
    display: block;
}

.swipeRight{
	border: 1px solid red;
}
</style>
