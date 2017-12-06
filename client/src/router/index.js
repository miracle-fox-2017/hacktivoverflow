import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '@/components/Index'
import Timeline from '@/components/Timeline'
import DetailQuestion from '@/components/DetailQuestion'
import UserQuestion from '@/components/UserQuestion'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: HelloWorld
    },
    {
      path: '/index',
      component: Index,
      beforeEnter: (to, from, next) => {
        if (!localStorage.getItem('tokenOverflow')) {
          next({name: 'Login'})
        } else {
          next()
        }
      },
      children: [
        {
          path: '/',
          name: 'Index',
          component: Timeline
        },
        {
          path: '/userquestion',
          name: 'User',
          component: UserQuestion
        },
        {
          path: '/detail',
          name: 'DetailQuestion',
          component: DetailQuestion,
          props: true
        }
      ]
    }
  ]
})
