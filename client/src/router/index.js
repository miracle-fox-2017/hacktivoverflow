import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import QuestionsList from '@/components/QuestionsList'
import QuestionDetail from '@/components/QuestionDetail'
import UsersList from '@/components/UsersList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          name: 'QuestionsList',
          component: QuestionsList
        },
        {
          path: 'users',
          name: 'UsersList',
          component: UsersList
        },
        {
          path: 'question/detail/:id',
          name: 'questionDetail',
          component: QuestionDetail,
          props: true
        }
      ]
    }
  ]
})
