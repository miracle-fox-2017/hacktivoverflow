import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import TheHomePage from '@/components/TheHomePage'
import TheLogin from '@/components/TheLogin'
import TheSignup from '@/components/TheSignup'
import TheQuestionSummary from '@/components/TheQuestionSummary'
import TheAccount from '@/components/TheAccount'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'TheHomePage',
      component: TheHomePage
    },
    {
      path: '/login',
      name: 'TheLogin',
      component: TheLogin,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) {
          next({ path: '/' })
        } else {
          next()
        }
      }
    },
    {
      path: '/signup',
      name: 'TheSignup',
      component: TheSignup
    },
    {
      path: '/question/:id',
      name: 'TheQuestionSummary',
      component: TheQuestionSummary,
      props: true
    },
    {
      path: '/myaccount',
      name: 'TheAccount',
      component: TheAccount
    }
  ]
})
