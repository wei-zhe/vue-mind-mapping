import Vue from 'vue'
import App from './App.vue'
import MindMapping from '../packages/index'
import svgJs from "./svg/index"

Vue.use(svgJs);
Vue.use(MindMapping)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
