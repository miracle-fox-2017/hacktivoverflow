<template>
<div class="container">

<link rel="stylesheet" type="text/css" href="//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css">
<div class="container">
    <div class="row">
        <div class="col-sm-8">
            <div class="panel panel-white post panel-shadow">
                <div class="post-heading">
                    <div class="pull-left image">
                        <img src="http://bootdey.com/img/Content/user_1.jpg" class="img-circle avatar" alt="user profile image">
                    </div>
                    <div class="pull-left meta">
                        <div class="title h5">
                            <a href="#"><b>{{ answer.userId.name }}</b></a>
                            comment
                        </div>
                        <h6 class="text-muted time"> {{ answer.commentDate }} </h6>
                    </div>
                </div> 
                <div class="post-description"> 
                    <p> {{ answer.desc }} </p>
                    <div class="stats">
                        <a href="#" class="btn btn-default stat-item">
                            <i class="fa fa-thumbs-up icon"></i>2
                        </a>
<!--                         <a href="#" class="btn btn-default stat-item">
                            <i class="fa fa-thumbs-down icon"></i>12
                        </a> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>	
</div>	
</template>

<script>
import { mapActions } from 'vuex'
export default {
	props: ['comment'],
	computed : {
		answer () {
			return this.$store.state.answer
		}
	},
	methods : {
		...mapActions ([
			'getComment'
			])
	},
	created () {
		this.getComment(this.comment._id)
	}
}	
</script>