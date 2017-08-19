import * as types from '../mutation-types';

let state = {
    todos: new Map()
}

// function filterTodos(state, type) {
//     return state.todos ? {
//         done: [...state.todos.values()].filter(todo => ((todo.get('type') === type) && (todo.get('status') === true))).sort((todo1, todo2) => {return todo2.updatedAt - todo1.updatedAt}),
//         undone: [...state.todos.values()].filter(todo => ((todo.get('type') === type) && (todo.get('status') === false))).sort((todo1, todo2) => {return todo2.updatedAt - todo1.updatedAt}),
//     } : {};
// }


// let getters = {
//     ImpEmg: function(state) {
//         return filterTodos(state, 'ImpEmg')
//     },
//     ImpNotEmg: function(state) {
//         return filterTodos(state, 'ImpNotEmg')
//     },
//     NotImpEmg: function(state) {
//         return filterTodos(state, 'NotImpEmg')
//     },
//     NotImpNotEmg: function(state) {
//         return filterTodos(state, 'NotImpNotEmg')
//     },
// }


let actions = {
    initTodos({ commit }, todos) {
        commit(types.INIT_TODO, todos);
    },
    addTodo({ commit }, todo) {
        commit(types.ADD_TODO, todo);
    },
    removeTodo({ commit }, todoID) {
        commit(types.REMOVE_TODO, todoID)
    },
    setTodoStatus({ commit }, todoInfo) {
        let todo = state.todos.get(todoInfo.id);
        todo.set('status', todoInfo.status).save().then((changedTodo) => {
            commit(types.SET_TODO, changedTodo);
        },(err)=>{
        	console.log(err);
        })
    },
    setTodo({ commit }, todo){
        return todo.save().then((changedTodo)=>{
            commit(types.SET_TODO, changedTodo);
            return changedTodo
        },(err)=>{
            console.log(err);
        })
    }
}


let mutations = {
    [types.INIT_TODO](state, todos) {
        let mapTodo = new Map();
        todos.forEach((todo) => {
            mapTodo.set(todo.id, todo)
        })
        state.todos = mapTodo;
    },
    [types.ADD_TODO](state, todo) {
        if ((state.todos instanceof Map) && todo.id) {
            state.todos.set(todo.id, todo)
        }
    },
    [types.REMOVE_TODO](state, todoID) {
        if ((state.todos instanceof Map) && state.todos.has(todoID)) {
            state.todos.delete(todoID)
        }
    },
    [types.SET_TODO](state, changedTodo) {
        let todos = new Map(state.todos.entries());
        todos.set(changedTodo.id, changedTodo);
        state.todos = todos;
    }
};



export default {
    namespaced: true,
    /* eslint-disable */
    actions,
    // getters,
    mutations,
    state,
}
