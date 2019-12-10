import Vue from 'vue'
import App from './index.vue'
import {
    NavBar
} from 'vant'
import 'vant/lib/index.css'

Vue.use(NavBar);
Vue.config.productionTip = false

new Vue({
    render: h => h(App)
}).$mount('#app')