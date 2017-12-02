<template>
	<div class="modal" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="loginModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title" id="loginModalLabel">Login</h4>
				</div>
				<div class="modal-body">
					<form action="#" method="post">
						<div class="input-group u-full-width">
							<label>Username</label>
							<input type="text" class="form-control" id="username" name="username" ref="username"/>
						</div>

						<div class="input-group u-full-width">
							<label>Password</label>
							<input type="password" class="form-control" id="password" name="password" ref="password"/>
						</div>
					</form>
				</div>

				<div class="modal-footer">
					<button type="button" class="btn btn-primary" @click.prevent="doLogin" data-dismiss="modal">Login</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'

	export default {
		name: 'ShowName',
		data () {
			return {

			}
		},

		methods: {
			...mapActions([
				'setLogin'
			]),

			doLogin () {
				let username = this.$refs.username.value;
				let password = this.$refs.password.value;

				if (username.length > 0 && password.length > 0) {
					this.setLogin({ username: username, password: password });

				} else {
					alert("Username atau Password harus diisi");
				}
		  }
		}
	}
</script>

<style scoped>

</style>