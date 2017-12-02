import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage'
import LoginPage from '@/components/LoginPage'
import RegisterPage from '@/components/RegisterPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'mainPage',
      component: MainPage
    },
    {
      path: '/login',
      component: LoginPage,
      name: 'LoginPage'
    },
    {
      path: '/register',
      component: RegisterPage
    }
  ]
})
