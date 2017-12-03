<template>
  <div>
    <div style="text-align:left;" class="card-deck">
      <div class="card">
        <div class="card-body">
          <h3 class="card-title">{{ questions.title }}</h3>
          <hr>
          <p class="card-text">
            <small class="text-muted">
            <span style="font-weight:bold;">
              <i class="fa fa-heart" aria-hidden="true"></i> 150 
            </span> 
            <span style="font-weight:bold; margin-left:3px;">
              <i class="fa fa-comment" aria-hidden="true"></i> 58 
            </span>
            <span style="font-weight:bold; margin-left:3px;">
              <i class="fa fa-user" aria-hidden="true"></i> {{ questions.author.username }} 
            </span>
          </small>
          </p>
          <p class="card-text">{{ questions.question_content }}</p>

          <!-- Start Comment -->
          <DetailQuestionAnswer :answers="answers"/>
          <!-- End Comment -->

        </div>
      </div>
    </div>

    

    <div style="margin-top: 3%; text-align:left;" class="card-deck">
      <div class="card">
        <div class="widget-area no-padding blank">
          <div class="status-upload">
            <form>
              <textarea placeholder="What are you doing right now?" ></textarea>
              <ul>
                <li><a title="" data-toggle="tooltip" data-placement="bottom" data-original-title="Audio"><i class="fa fa-music"></i></a></li>
                <li><a title="" data-toggle="tooltip" data-placement="bottom" data-original-title="Video"><i class="fa fa-video-camera"></i></a></li>
                <li><a title="" data-toggle="tooltip" data-placement="bottom" data-original-title="Sound Record"><i class="fa fa-microphone"></i></a></li>
                <li><a title="" data-toggle="tooltip" data-placement="bottom" data-original-title="Picture"><i class="fa fa-picture-o"></i></a></li>
              </ul>
              <button type="button" class="btn btn-secondary">Answer</button>
            </form>
          </div><!-- Status Upload  -->
        </div><!-- Widget Area -->
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import DetailQuestionAnswer from '@/components/DetailQuestionAnswer'
export default {
  props: ['id'],
  components: {
    DetailQuestionAnswer
  },
  mounted () {
    // console.log('>>>', this.questions._id)
  },
  computed: {
    ...mapState([
      'questions',
      'answers'
    ])
  },
  methods: {
    ...mapActions([
      'getQuestionById',
      'findAnswerByQuestion'
    ])

  },
  created () {
    // console.log('>>>', this.id)
    this.getQuestionById(this.id)
    this.findAnswerByQuestion(this.id)
  }
}
</script>

<style scoped>
body {
  background: #fafafa;
}

.widget-area.blank {
  background: none repeat scroll 0 0 rgba(0, 0, 0, 0);
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  -ms-box-shadow: none;
  -o-box-shadow: none;
  box-shadow: none;
}

body .no-padding {
  padding: 0;
}

.widget-area {
  background-color: #fff;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  -ms-border-radius: 4px;
  -o-border-radius: 4px;
  border-radius: 4px;
  -webkit-box-shadow: 0 0 16px rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 0 0 16px rgba(0, 0, 0, 0.05);
  -ms-box-shadow: 0 0 16px rgba(0, 0, 0, 0.05);
  -o-box-shadow: 0 0 16px rgba(0, 0, 0, 0.05);
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.05);
  float: left;
  margin-top: 30px;
  padding: 25px 30px;
  position: relative;
  width: 100%;
}

.status-upload {
  background: none repeat scroll 0 0 #f5f5f5;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  -ms-border-radius: 4px;
  -o-border-radius: 4px;
  border-radius: 4px;
  float: left;
  width: 100%;
}

.status-upload form {
  float: left;
  width: 100%;
}

.status-upload form textarea {
  background: none repeat scroll 0 0 #fff;
  border: medium none;
  -webkit-border-radius: 4px 4px 0 0;
  -moz-border-radius: 4px 4px 0 0;
  -ms-border-radius: 4px 4px 0 0;
  -o-border-radius: 4px 4px 0 0;
  border-radius: 4px 4px 0 0;
  color: #777777;
  float: left;
  font-size: 14px;
  height: 142px;
  letter-spacing: 0.3px;
  padding: 20px;
  width: 100%;
  resize: vertical;
  outline: none;
  border: 1px solid #F2F2F2;
}

.status-upload ul {
  float: left;
  list-style: none outside none;
  margin: 0;
  padding: 0 0 0 15px;
  width: auto;
}

.status-upload ul>li {
  float: left;
}

.status-upload ul>li>a {
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  -ms-border-radius: 4px;
  -o-border-radius: 4px;
  border-radius: 4px;
  color: #777777;
  float: left;
  font-size: 14px;
  height: 30px;
  line-height: 30px;
  margin: 10px 0 10px 10px;
  text-align: center;
  -webkit-transition: all 0.4s ease 0s;
  -moz-transition: all 0.4s ease 0s;
  -ms-transition: all 0.4s ease 0s;
  -o-transition: all 0.4s ease 0s;
  transition: all 0.4s ease 0s;
  width: 30px;
  /* cursor: pointer; */
}

.status-upload ul>li>a:hover {
  background: none repeat scroll 0 0 #606060;
  color: #fff;
}

.status-upload form button {
  border: medium none;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  -ms-border-radius: 4px;
  -o-border-radius: 4px;
  border-radius: 4px;
  color: #fff;
  float: right;
  font-size: 14px;
  letter-spacing: 0.3px;
  margin-right: 9px;
  margin-top: 9px;
  padding: 6px 15px;
}

.dropdown>a>span.green:before {
  border-left-color: #464a4e;
}

.status-upload form button>i {
  margin-right: 7px;
}
</style>
