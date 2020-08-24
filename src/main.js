import Vue from 'vue'
import App from './App.vue'
import router from "@/router"

//引入API
import * as API from "@/Api"
Vue.prototype.$API=API

//引入element-ui组件
import "@/plugins/element-ui"


Vue.config.productionTip = false







import "@/assets/js/gt"
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
