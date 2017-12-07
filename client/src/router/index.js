import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from '@/components/LandingPage'
import Signin from '@/components/Signin'
import Signup from '@/components/Signup'
import QuestionDetail from '@/components/QuestionDetail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/',
      name: 'LandingPage',
      component: LandingPage
    },
    {
      path: '/:id',
      name: 'QuestionDetail',
      component: QuestionDetail,
      props: true
    }
  ]
})
