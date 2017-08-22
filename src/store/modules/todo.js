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
        // commit(types.ADD_TODO, todo);
        commit(types.SET_TODO, todo);
    },
    deleteTodo({ commit, state }, todoID) {
        console.log(state);
        if ((state.todos instanceof Map) && todoID) {
            let todo = state.todos.get(todoID);
            return todo.set('enable',false).save().then((changedTodo)=>{
                commit(types.REMOVE_TODO, changedTodo.id)
                return changedTodo;
            },(err)=>{
                console.log(err);
                return err
            })
        }
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
            return err
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
            let todos = new Map(state.todos.entries());
            todos.delete(todoID);
            state.todos = todos;
        }
    },
    [types.SET_TODO](state, todo) {
        if ((state.todos instanceof Map) && todo.id) {
            let todos = new Map(state.todos.entries());
            todos.set(todo.id, todo);
            state.todos = todos;
        }
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
