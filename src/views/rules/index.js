import Vue from 'vue'
import App from './index.vue'
import Api from '@/api' // Vue全局使用Api
import {
    NavBar
} from 'vant'
import 'vant/lib/index.css'

Vue.use(NavBar);
Vue.config.productionTip = false
Vue.prototype.Api = Api.testApi
new Vue({
    render: h => h(App)
}).$mount('#app')
