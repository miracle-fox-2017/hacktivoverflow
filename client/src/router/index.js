import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '@/components/LoginPage'
import MainPage from '@/components/MainPage'
import ContentPage from '@/components/ContentPage'
import QuestionsList from '@/components/QuestionsList'
import QuestionDetail from '@/components/QuestionDetail'
import MyAccount from '@/components/MyAccount'
import UsersList from '@/components/UsersList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: MainPage,
      children: [
        {
          path: '',
          component: ContentPage,
          children: [
            {
              path: '',
              name: 'QuestionsList',
              component: QuestionsList
            },
            {
              path: '/questions/:id',
              name: 'QuestionDetail',
              component: QuestionDetail,
              props: true
            },
            {
              path: '/users',
              name: 'UsersList',
              component: UsersList
            }
          ]
        },
        {
          path: '/myaccount',
          name: 'MyAccount',
          component: MyAccount,
          beforeEnter: (to, from, next) => {
            if (localStorage.getItem('accesstoken')) {
              next()
            } else {
              next('/login')
            }
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    }
  ]
})
