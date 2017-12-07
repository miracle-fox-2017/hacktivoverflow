import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import firebase from 'firebase'
import AskQuestion from '@/components/AskQuestion'
import DetailQuestion from '@/components/DetailQuestion'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/hacktivoverflow',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '/askquestion',
          name: 'AskQuestion',
          component: AskQuestion,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'questions/:id',
          name: 'questions',
          component: DetailQuestion,
          props: true,
          meta: {
            requiresAuth: true
          }
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) next('login')
  else if (!requiresAuth && currentUser) next('hacktivoverflow')
  else next()
})

export default router
