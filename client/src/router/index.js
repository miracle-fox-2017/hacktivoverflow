import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage'
import MainContent from '@/components/MainContent'
import PostDetails from '@/components/PostDetails'
import PostQuestion from '@/components/PostQuestion'
import Login from '@/components/Login'
import EditPost from '@/components/EditPost'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/main-page',
      component: MainPage,
      children: [
        {
          path: '',
          name: 'MainContent',
          component: MainContent
        },
        {
          path: '/main-page/details/:postId',
          name: 'PostDetails',
          component: PostDetails,
          props: true
        },
        {
          path: '/main-page/post',
          name: 'PostQuestion',
          component: PostQuestion
        },
        {
          path: '/main-page/edit/:postId',
          name: 'EditPost',
          component: EditPost,
          props: true
        }
      ]
    }
  ]
})
