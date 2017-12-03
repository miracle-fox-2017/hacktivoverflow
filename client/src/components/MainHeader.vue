<template>
	<header class="main-header">
		<div class="container">
			<div class="row">
				<div class="col-md-4">
					<h1 class="site-title">
						<router-link :to="`/`">Hacktiv<b>0verflow</b></router-link>
					</h1>
					<!-- /.site-title -->
				</div>
				<!-- /.col-md-2 -->

				<div class="col-md-8">
					<ul class="flat-list list-inline menu-list text-right">
						<li>
							<a href="#" data-toggle="modal" data-target="#registerModal" class="btn btn-warning">Register</a>
						</li>
						<li v-if="loggedinUser.token === '' || loggedinUser.token === null">
							<a href="#" data-toggle="modal" data-target="#loginModal" class="btn"><i class="fa fa-user"></i> Login</a>
						</li>
						<li v-if="loggedinUser.token !== '' && loggedinUser.token !== null">
							<a href="#" class="btn btn-danger" @click.prevent="doLogout"><i class="fa fa-sign-out"></i> Logout</a>
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
	import { mapActions, mapState } from 'vuex'

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
		},

		computed: {
			...mapState([
				'loggedinUser'
			])
		},
	}
</script>

<style scoped>
	.site-title {
		margin:  0;
	}

	.menu-list li{
		margin-right: 0rem;
	}

	.main-header {
		background: #E64A19;
		padding: 1rem 0;
		color: #fafafa;
		margin-bottom: 3rem;
	}

	.main-header a {
		color:  #fafafa;
	}

	.main-header a:hover {
		text-decoration: none;
		color:  gold;
	}
</style>