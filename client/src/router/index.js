import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MainPage from '@/components/MainPage'
import MainContent from '@/components/MainContent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/main-page',
      component: MainPage,
      children: [
        {
          path: '',
          component: MainContent
        }
      ]
    }
  ]
})
