<template>
	<div class="modal" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="registerModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title" id="registerModalLabel">Buat Akun Baru</h4>
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

						<div class="input-group u-full-width">
							<label>Email</label>
							<input type="email" class="form-control" id="email" name="email" ref="email"/>
						</div>

						<div class="input-group u-full-width">
							<label>Full Name</label>
							<input type="text" class="form-control" id="full_name" name="full_name" ref="full_name"/>
						</div>
					</form>
				</div>

				<div class="modal-footer">
					<button type="button" class="btn btn-primary" @click.prevent="doRegister" data-dismiss="modal">Register</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'RegisterModal',
		data () {
			return {

			}
		},

		methods: {
		  doRegister () {
		  	let username = this.$refs.username.value;
		  	let password = this.$refs.password.value;
		  	let email = this.$refs.email.value;
		  	let full_name = this.$refs.full_name.value;
		  	let registerData = {
		  		username: username,
		  		password: password,
		  		email: email,
		  		full_name: full_name
		  	}

		   if (username.length > 0 && password.length > 0 && email.length > 0 && full_name.length > 0) {
		   	this.$http.post('/api/signup', registerData)
		   		.then(({data}) => {
		   			console.log('Account created '+data);
		   			alert("Account berhasil dibuat. Silahkan login untuk mengakses website.");

		   		}).catch(err => console.log({message:'Something Wrong', error: err.message}));

		   } else {
		   	alert("Data pendaftaran harus lengkap");
		   }
		  }
		}
	}
</script>

<style scoped>

</style>