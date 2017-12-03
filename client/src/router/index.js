import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Questions from '@/components/Questions'
import Question from '@/components/Question'
import QuestionAsk from '@/components/QuestionAsk'

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
          component: Questions
        },
        {
          path: 'question',
          component: Questions
        },
        {
          path: 'question/:id',
          component: Question
        }
      ]
    },
    {
      path: '/ask',
      component: QuestionAsk
    }
  ]
})
