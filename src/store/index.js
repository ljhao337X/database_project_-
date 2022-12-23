import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: '',
        is_login: false,
        user: {
            id: '',
            nickname: '',
            avatar: ''
        }
    },
    getters: {},
    mutations: {
        set_nickname(state, token) {
            state.user.nickname = token;
        },
        set_is_login(state, is_login) {
            state.is_login = is_login;
        },
        set_user(state, user) {
            state.user = user;
        },
        logout(state) {
            state.is_login = false;
        }
    },
    actions: {},
    modules: {},
    plugins: [
        createPersistedState({
            storage: window.localStorage,
            key: 'store',
            render(state) {
                return { ...state };
            },
        }),
    ],
});
