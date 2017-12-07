<template>
<div class="form-group col-md-8" v-show="token != undefined">
<form>
  <textarea type="text" class="form-control" rows="5" v-model="answer"></textarea>
  <a type="button" class="btn btn-default" @click="createAnswer">Reply</a>
</form>
</div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  props: ['id'],
  data: function () {
    return {
      answer: '',
      token: ''
    }
  },
  methods: {
    ...mapActions([
      'createNewAnswer'
    ]),
    createAnswer () {
      let payload = {
        id: this.id,
        answer: this.answer
      }
      this.createNewAnswer(payload)
      this.answer = ''
    }
  },
  created () {
    this.token = localStorage.getItem('token')
  }
}
</script>

<style>
</style>