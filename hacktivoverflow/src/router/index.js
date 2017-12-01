import Vue from 'vue'
import Router from 'vue-router'
import Questions from '@/components/QuestionCards'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'QuestionsList',
      component: Questions
    }
  ]
})
