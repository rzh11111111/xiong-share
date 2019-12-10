import Vue from 'vue'
import App from './index.vue'
import {
    NavBar, Icon, List, Cell
} from 'vant'
import 'vant/lib/index.css'

Vue.use(NavBar).use(Icon).use(List).use(Cell);
Vue.config.productionTip = false
/* 定义不同入口，跳转路径配置 index.js */
if (location.hostname === 'localhost') {
    // Vue.prototype.HTTPLOCAT = ''
    Vue.prototype.HTTPLOCAT = '/moneybear-shop-app/dist'
} else {
    Vue.prototype.HTTPLOCAT = '' // （这个路径改为你服务器访问路径）
}
new Vue({
    render: h => h(App)
}).$mount('#app')