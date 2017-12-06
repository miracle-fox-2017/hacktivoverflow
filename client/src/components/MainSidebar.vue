<template>
	<div class="main-sidebar">
		<div class="widget">
			<h3 class="widget-title">Selamat datang di Hacktiv0verflow</h3><!-- /.widget-title -->

			<div class="alert alert-success" v-if="loggedinUser.token !== '' && loggedinUser.token !== null">
				<p>Selamat Datang, <b>{{ loggedinUser.username }}</b>.</p>
				<p><i class="fa fa-envelope-o small-mr"></i> {{ loggedinUser.email }}</p>
				<p><i class="fa fa-user small-mr"></i> {{ loggedinUser.full_name }}</p>
			</div>
			<!-- /.alert alert-warning -->

			<a href="#" class="btn btn-primary btn-lg btn-ask" data-toggle="modal" data-target="#questionModal">Buat Pertanyaan</a>
		</div><!-- /.widget -->
	</div><!-- /.main-sidebar -->
</template>

<script>
	import { mapState } from 'vuex';

	export default {
		name: 'MainSidebar',
		data () {
			return {

			}
		},

		computed: {
		  ...mapState([
     		'loggedinUser'
		  ])
		}
	}
</script>

<style scoped>

</style>