import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/home";
import Access from "@/components/access";
import AllPost from "@/components/component-all-post";
import Post from "@/components/component-post";
import UserPosts from "@/components/user-posts";

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      component:Home,
      children:[
        {
          path:"",
          component:AllPost
        },
        {
          path:"post/:postId",
          component:Post,
          props:true
        },
        {
          path:"user/:userId",
          component:UserPosts,
          props:true
        }
      ]
    },
    {
      path:"/access",
      component:Access
    }
  ]
})
