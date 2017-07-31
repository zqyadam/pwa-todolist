import * as types from '../mutation-types';
import { requestLogin } from '@/common/api.js'

let state = {
    currentUser: null
}

let actions = {
    setUserInfo({ commit }, userinfo) {
        commit(types.SET_USER_INFO, userinfo);
    },
    clearUserInfo({ commit }) {
        commit(types.CLEAR_USER_INFO);
    }
}

let mutations = {
    [types.SET_USER_INFO](state, userinfo) {
        state.currentUser = userinfo;
    },
    [types.CLEAR_USER_INFO](state) {
        state.currentUser = null;
    }
};


export default {
    namespaced: true,
    /* eslint-disable */
    actions,
    mutations,
    state,
}
