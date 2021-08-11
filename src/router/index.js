import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/lists',
    name: 'Lists',
    component: () => import( '../views/Lists.vue')
  },
  {
    path: '',
    redirect: { name: 'Login'}
  }
]

const router = new VueRouter({
  routes
})

export default router
