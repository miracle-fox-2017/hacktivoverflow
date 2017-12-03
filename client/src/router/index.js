import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import AllQuestions from '@/components/AllQuestions'
import QuestionDetail from '@/components/QuestionDetail'
import EditQuestion from '@/components/EditQuestion'

Vue.use(Router)

export default new Router({
  mode: 'history',	
  routes: [
    {
      path: '/',
      component: Home,
      children : [
	      {
	      	path: '',
	      	name: 'Home',
	      	component: AllQuestions
	      },
	      {
	      	path: ':questionId',
	      	component: QuestionDetail,
	      	props: true 
	      },
	      {
	      	path: 'edit/:questionId',
	      	component: EditQuestion,
	      	props: true 
	      }	      
      ]
    }
  ]
})
