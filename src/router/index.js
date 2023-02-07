import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: { path: '/select-table' }
  },
  {
    path: '/select-table',
    name: 'select-table',
    component: resolve => require(['../views/selectTable.vue'], resolve)
  }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
