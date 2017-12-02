import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import LoginPage from '@/components/LoginPage'
import RegisterPage from '@/components/RegisterPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
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
