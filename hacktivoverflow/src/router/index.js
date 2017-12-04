import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import TheHomePage from '@/components/TheHomePage'
import TheLogin from '@/components/TheLogin'
import TheSignup from '@/components/TheSignup'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TheHomePage',
      component: TheHomePage
    },
    {
      path: '/login',
      name: 'TheLogin',
      component: TheLogin
    },
    {
      path: '/signup',
      name: 'TheSignup',
      component: TheSignup
    }
  ]
})
