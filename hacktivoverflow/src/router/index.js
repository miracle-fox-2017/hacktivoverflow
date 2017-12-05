import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import TheHomePage from '@/components/TheHomePage'
import TheLogin from '@/components/TheLogin'
import TheSignup from '@/components/TheSignup'
import TheQuestion from '@/components/TheQuestion'
import TheQuestionSummary from '@/components/TheQuestionSummary'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TheHomePage',
      component: TheHomePage,
      children: [{
        path: '',
        name: 'TheQuestion',
        component: TheQuestion
      }]
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
    }
  ]
})
