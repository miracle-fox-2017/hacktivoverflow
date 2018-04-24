import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '@/components/IndexPage'
import MainContent  from "@/components/MainContent";
import DetailContent  from "@/components/DetailContent";

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: IndexPage,
      children: [
      	{
      		path: "",
      		name: 'IndexPage',
      		component: MainContent
      	},
        {
          path: "/:questionId",
          name: 'DetailPage',
          component: DetailContent,
          props: true
        }
      ]
    }
  ]
})
