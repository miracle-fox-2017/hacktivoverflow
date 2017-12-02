<template>
	<header class="main-header">
		<div class="container">
			<div class="row">
				<div class="col-md-4">
					<h1 class="site-title">
						<router-link :to="`/`">HacktivOverflow</router-link>
					</h1>
					<!-- /.site-title -->
				</div>
				<!-- /.col-md-2 -->

				<div class="col-md-8">
					<ul class="flat-list list-inline">
						<li>
							<a href="#" data-toggle="modal" data-target="#registerModal" class="btn btn-success">Register</a>
						</li>
						<li>
							<a href="#" data-toggle="modal" data-target="#loginModal" class="btn btn-primary">Login</a>
						</li>
						<li>
							<a href="#" class="btn btn-danger" @click.prevent="doLogout">Logout</a>
						</li>
					</ul>
					<!-- /.flat-list list-inline -->
				</div>
				<!-- /.col-md-10 -->
			</div>
			<!-- /.row -->
		</div>
	</header>
</template>

<script>
	import { mapActions } from 'vuex'

	export default {
		name: 'MainHeader',
		data () {
			return {

			}
		},

		methods: {
		 ...mapActions([
		 	'doLogout'
		 ])
		}
	}
</script>

<style scoped>
	.site-title {
		margin:  0;
	}
</style>