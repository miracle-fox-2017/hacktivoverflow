import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MainContent from '@/components/MainContent'
import DetailQuestion from '@/components/DetailQuestion'
import LoginPage from '@/components/LoginPage'
import RegisterPage from '@/components/RegisterPage'
import MainContentAuthor from '@/components/MainContentAuthor'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: HelloWorld,
      children: [
        {
          path: '',
          name: 'MainContent',
          component: MainContent
        }, {
          path: '/questions/:id/:title',
          component: DetailQuestion,
          props: true
        }, {
          path: '/author/:id',
          name: 'MainContentAuthor',
          component: MainContentAuthor
        }
      ]
    }, {
      path: '/login',
      component: LoginPage,
      name: 'LoginPage'
    }, {
      path: '/register',
      component: RegisterPage
    }
  ]
})
