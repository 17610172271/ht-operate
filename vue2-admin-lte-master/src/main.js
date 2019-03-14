// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './lib/css'
import './lib/script'
import './lib/global'
import 'babel-polyfill'

import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import store from '@/store/index.js'
import ElementUI from 'element-ui'
import router from './router'
import axios from 'axios'
import echarts from 'echarts'
import api from '@/api'
import VueAMap from 'vue-amap'
//import './mock.js'

import 'element-ui/lib/theme-chalk/index.css'
import './css/ionicons.min.css?v=2.0.1'
import './css/font-awesome.min.css?v=2.0.1'
import './css/style.css?v=2.0.1'
Vue.use(Vuex)
Vue.use(VueAMap)
Vue.use(ElementUI)
VueAMap.initAMapApiLoader({
    // 高德的key
    key: 'fbf4701a85a9410fd10d0b3ce3af9f42',
    // 插件集合
    plugin: ['Autocomplete', 'PlaceSearch', 'Scale', 'OverView', 'ToolBar', 'MapType', 'PolyEditor', 'CircleEditor', 'Geolocation', 'Geocoder'],
    v: '1.4.4'
})
// 拦截器
axios.defaults.timeout = 7200; //响应时间
axios.interceptors.request.use(
        config => {
            return config
        },
        err => {
            ElementUI.Message({
                type: 'error',
                message: '请求错误!'
            })
            return Promise.resolve(err)
        }
)
axios.interceptors.response.use(
        data => {
            if (data.data.code === -14) {
                window.localStorage.removeItem('authInfo')
                router.replace({name: 'login'})
                store.actions.clearAuthInfo()
            }
            return data
        },
        err => {
            if (err.response && err.response.status === 404) {
                router.push({name: '404'})
            } else if (err.response && err.response.status >= 500) {
                ElementUI.Message({
                    type: 'error',
                    message: '服务器错误!'
                })
                router.push({name: '500'})
            } else {
                ElementUI.Message({
                    type: 'error',
                    message: '未知错误!'
                })
            }
            return Promise.resolve(err)
        }
)

Vue.prototype.$echarts = echarts
Vue.prototype.$http = axios
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    axios,
    store,
    template: '<App/>',
    components: {
        App
    }
})
