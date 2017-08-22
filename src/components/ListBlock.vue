<template>
    <div>
        <v-card flat tile>
            <v-card-title :class="[ color + '--text', 'text--' + color + '-1' ]">
                {{ title }} ({{ data.length }})
            </v-card-title>
            <v-card-text class="pa-0">
                <v-container fluid class="pa-0 pl-3 pr-3" v-for="todo in data" :key="todo.id" :ref="'list-'+todo.id">
                    <v-layout>
                        <v-flex xs1 class="pa-0">
                            <v-btn icon dark block class="pa-0 ma-0" :class="[ color + '--text']" @click.native="toggleTodoStatus(todo)">
                                <v-icon> {{ todo.get('status') ? 'check_box' : 'check_box_outline_blank' }} </v-icon>
                            </v-btn>
                        </v-flex>
                        <v-flex xs10 class="pa-0 pr-2 pt-2" :class="">
                            <v-touch @swipeleft="todo.get('status') && setTodoUnDone(todo) " @swiperight="setTodoDone(todo)" @press="deleteTodo(todo)" @tap="readTodoDetail(todo)" @panright="onPanRightStart(todo)" @panleft="onPanLeftStart(todo)" @panend="onPanEnd(todo)" :options="{ touchAction: 'pan-y' }" :swipe-options="{velocity:0.2,threshold:5}">
                                <p class="list-content" :class="{ del : todo.get('status') }" v-html="todo.get('content')"></p>
                                <span class="list-time">更新时间： {{ getUpdatedTime(todo) }}</span>
                            </v-touch>
                        </v-flex>
                        <v-flex xs1 class="pa-0">
                            <v-btn icon class="pa-0 ma-0" @click.native="editTodo(todo)">
                                <v-icon>edit</v-icon>
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
        </v-card>
    </div>
</template>
<script>
import { dateFormat } from '@/common/common';
import { mapActions } from 'vuex';


export default {
    data() {
        return {
            panning:false
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
    },
    methods: {
        ...mapActions('todo', [
            'setTodoStatus'
        ]),
        onPanRightStart: function(todo) {
            if ( !this.panning ) {
                console.log('onPanRightStart');
                if (!todo.get('status')) {
                    this.panning = true;
                    this.$refs['list-' + todo.id][0].style.border = "1px dashed rgba(0,0,0,0.2)";
                    this.$refs['list-' + todo.id][0].style.fontWeight = "bold";
                }
            }
        },
        onPanLeftStart: function(todo) {
            if (!this.panning) {
                console.log('panning left start');
                if (todo.get('status')) {
                    this.panning = true;
                    this.$refs['list-' + todo.id][0].style.border = "1px dashed rgba(0,0,0,0.2)";
                    this.$refs['list-' + todo.id][0].style.fontWeight = "bold";
                }
            }
        },
        onPanEnd: function(todo) {
            console.log('panend');
            this.$refs['list-' + todo.id][0].style.border = "";
            this.$refs['list-' + todo.id][0].style.fontWeight = "";
            this.panning = false;
        },
        editTodo: function(todo) {
            console.log('edit todo');
            console.log(todo.id);
            this.$router.push({
                name: 'edit',
                params: {
                    type: 'edit',
                    id: todo.id
                }
            })
        },
        readTodoDetail: function(todo) {
            console.log('read todo detail');
            console.log(todo);
            this.$emit('previewTodo',todo.id);
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
        setTodoUnDone: function(todo) {
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
        deleteTodo:function(todo) {
            this.$emit('deleteTodo',todo.id);
        }
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

.swipeRight {
    border: 1px solid red;
}

.del {
    text-decoration: line-through;
    color: #888;
}

</style>
