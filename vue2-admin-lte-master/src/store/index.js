import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        authInfo: window.localStorage.getItem('authInfo') ? JSON.parse(window.localStorage.getItem('authInfo')) : '',
        newsNum: 0,
        navList: window.localStorage.getItem('navList') ? JSON.parse(window.localStorage.getItem('navList')) : ''
    },
    getters: {
        getAuthInfo (state) {
            return state.authInfo
        },
        getNavList (state) {
            return state.navList
        },
        getNewsNum (state) {
            return state.newsNum
        }
    },
    actions: {
        setAuthInfo({commit, state}, val){
            commit("setCount", val)
        },
        saveNewsNum({commit, state}, val){
            commit("SaveNewsNum", val)
        },
        saveNavList({commit, state}, val){
            commit("SaveNavist", val)
        }
    },
    mutations: {
        setCount (state, val) {
            state.authInfo = val
        },
        SaveNewsNum (state, val) {
            state.newsNum = val
        },
        SaveNavist (state, val) {
            state.navList = val
        }
    }
})
export default store
