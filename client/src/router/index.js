import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import QuestionsSummaries from '@/components/QuestionsSummaries'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      children: [{
        path: '',
        name: 'Home',
        component: QuestionsSummaries
      }]
    }
  ]
})
