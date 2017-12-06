<template>
  <div class="container">
    <div class="col-xs-6 col-md-8">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a class="nav-link disabled" href="#">All Questions </a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" data-toggle="tab" href="#home">newest</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-toggle="tab" href="#profile">suggested</a>
        </li>
      </ul>
      <div id="myTabContent" class="tab-content">
        <div class="tab-pane fade in active show" id="home">
          <the-question-list v-for="question in questions" :question="question"></the-question-list>
        </div>
        <div class="tab-pane fade" id="profile">
          <p>Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit.</p>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="panel panel-default">
        <div class="panel-heading"><h3>List of Questions</h3>
          <ul class="list-group">
            <TheSideBar v-for="question in questions" :question="question"></TheSideBar>
          </ul>
        </div>
      </div>
  </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import TheQuestionList from '@/components/TheQuestionList'
import TheSideBar from '@/components/TheSideBar'

export default {
  components: {
    TheSideBar,
    TheQuestionList
  },
  methods: {
    ...mapActions([
      'getAllQuestions'
    ])
  },
  created () {
    this.getAllQuestions ()
  },
  computed: {
    ...mapState([
      'questions'
    ])
  }

}
</script>
