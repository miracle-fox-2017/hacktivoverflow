import Vue from "vue";
import Vuex from "vuex";
import http from "axios";

Vue.use(Vuex);
const axios=http.create({
  baseURL:"http://localhost:3000/"
});

export const store=new Vuex.Store({
  state:{
    postList:[]
  },
  mutations:{
    setAllPost(state,posts){
      state.postList=posts;
    },
    setNewPost(state,newPost){
      state.postList.unshift(newPost);
    }
  },
  actions:{
    getAllPost({commit}){
      axios.get("post/all").then(function({data}){
        commit("setAllPost",data.msg);
      }).catch(function(err){
        console.log(err);
      });
    },
    addNewPost({commit},newPost){
      commit("setNewPost",newPost);
    }
  }
});

export default {}
