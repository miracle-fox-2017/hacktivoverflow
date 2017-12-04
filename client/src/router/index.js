import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import HomeSummaries from '@/components/HomeSummaries'
import Dashboard from '@/components/Dashboard'
import DashboardSummaries from '@/components/DashboardSummaries'

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
        component: HomeSummaries
      }]
    }, {
      path: '/dashboard',
      component: Dashboard,
      children: [{
        path: '',
        name: 'Dashboard',
        component: DashboardSummaries
      }]
    }
  ]
})
