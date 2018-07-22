import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import HomeSummaries from '@/components/HomeSummaries'
import Dashboard from '@/components/Dashboard'
import DashboardSummaries from '@/components/DashboardSummaries'
import QuestionDetail from '@/components/QuestionDetail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    component: Home,
    children: [{
      path: '',
      name: 'home',
      component: HomeSummaries
    },
    {
      path: '/questions/:id',
      name: 'questions',
      component: QuestionDetail,
      props: true
    }]
  },
  {
    path: '/dashboard',
    component: Dashboard,
    children: [{
      path: '',
      name: 'dashboard',
      component: DashboardSummaries
    }]
  }]
})
