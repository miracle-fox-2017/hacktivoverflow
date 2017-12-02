import Vue from 'vue'
import Router from 'vue-router'
import HomeComponent from '@/components/HomeComponent'
import QuestionsSummariesComponent from '@/components/QuestionsSummariesComponent'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: HomeComponent,
      children: [{
        path: '',
        name: 'Home',
        component: QuestionsSummariesComponent
      }]
    }
  ]
})
