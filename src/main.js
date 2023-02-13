import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"

// 初始化
import "./assets/css/init.less"
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import { cloneDeep, isEmpty, isNil, isArray, debounce, uniqBy } from "lodash"

import * as COM from "./common/index"

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.prototype.$cloneDeep = cloneDeep
Vue.prototype.$isEmpty = isEmpty
Vue.prototype.$isNil = isNil
Vue.prototype.$isArray = isArray
Vue.prototype.$debounce = debounce
Vue.prototype.$uniqBy = uniqBy

Vue.prototype.COM = COM

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app")
