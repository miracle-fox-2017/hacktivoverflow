import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import QuestionCard from '@/components/QuestionCard'
import QuestionDetail from '@/components/QuestionDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: HelloWorld,
      children: [
        {
          path: '',
          name: 'QuestionCard',
          component: QuestionCard
        },
        {
          path: '/question/:id',
          name: 'QuestionDetail',
          component: QuestionDetail,
          props: true
        }
      ]
    }
  ]
})
