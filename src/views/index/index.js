import Vue from 'vue'
import App from './index.vue'
import store from '../../store'
import Api from '@/api' // Vue全局使用Api
import localStorage from '../../store/localStorage'
import sessionStorage from '../../store/sessionStorage'
import {
    Toast, Checkbox, Popup,Dialog
} from 'vant'
import 'vant/lib/index.css'

Vue.use(Toast).use(Checkbox).use(Popup).use(Dialog);
Vue.config.productionTip = false
Vue.prototype.Api = Api.testApi
Vue.prototype.local = localStorage // Vue全局使用localStorage
Vue.prototype.session = sessionStorage // Vue全局使用sessionStorage
/* 定义不同入口，跳转路径配置 index.js */
if (location.hostname === 'localhost') {
    // Vue.prototype.HTTPLOCAT = ''
    Vue.prototype.HTTPLOCAT = '/moneybear-h5-shopApp/dist'
} else {
    Vue.prototype.HTTPLOCAT = '' // （这个路径改为你服务器访问路径）
}
/* eslint-disable no-new */
new Vue({
    store,
    render: h => h(App)
}).$mount('#app')
