import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '@/components/LoginPage'
import MainPage from '@/components/MainPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage,
      children: [
        {
          path: '/login',
          name: 'LoginPage',
          component: LoginPage
        }
      ]
    }
  ]
})
