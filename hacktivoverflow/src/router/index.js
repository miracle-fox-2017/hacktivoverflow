import Vue from 'vue'
import Router from 'vue-router'
import Questions from '@/components/QuestionCards'
import QuestionDetail from '@/components/QuestionDetail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'QuestionsList',
      component: Questions
      // children: [
      //   {
      //     path: '/'
      //   }
      // ]
    },
    {
      path: '/:id',
      name: 'QuestionDetail',
      component: QuestionDetail,
      props: true
    }
  ]
})
