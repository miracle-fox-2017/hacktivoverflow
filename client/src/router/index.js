import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '@/components/LoginPage'
import MainPage from '@/components/MainPage'
import ContentPage from '@/components/ContentPage'
import QuestionsList from '@/components/QuestionsList'

Vue.use(Router)

export default new Router({
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
            }
          ]
        },
        {
          path: '/login',
          name: 'LoginPage',
          component: LoginPage
        }
      ]
    }
  ]
})
