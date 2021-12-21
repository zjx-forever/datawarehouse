import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ShowInformationManagement from '../views/ShowInformationManagement.vue'
import Login from '../views/Login.vue'
import ErrorPage404 from '../views/ErrorPage404.vue'
import ErrorPage401 from '../views/ErrorPage401.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/t',
    name:'test',
    component:File
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/showInformationManagement',
    name: 'ShowInformationManagement',
    component: ShowInformationManagement
  },
  {
    path: '/errorPage/404',
    name: 'ErrorPage404',
    component: ErrorPage404
  },
  {
    path: '/errorPage/401',
    name: 'ErrorPage401',
    component: ErrorPage401
  },
  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/errorPage/404',
  }
]
let router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {

  let isAuthenticated = localStorage.getItem('Token')
  if (isAuthenticated == '' || isAuthenticated == undefined) {
    isAuthenticated = false
  } else {
    isAuthenticated = true
  }
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  else if (to.name === 'Login' && isAuthenticated) next({ name: 'Home' })
  else if ((to.name==='employeeManagement'||to.name==='employeeManagement'||to.name==='employeeInfoManagement'||to.name==='employeeFlowManagement')&&localStorage.getItem('userRole')!=='admin'&&isAuthenticated)next({name:'ErrorPage401'})
  else next()
})

export default router
