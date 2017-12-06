<template>
	<div class="container">
		<div class="row">
			<div class="col-md-8">
				<router-view></router-view>
			</div>

			<div class="col-md-4">
				<MainSidebar></MainSidebar>
			</div>
		</div>
	</div>
</template>

<script>
import MainSidebar from '@/components/MainSidebar'
	export default {
		name: 'IndexPage',
		components: {
			MainSidebar
		},
		data () {
			return {

			}
		}
	}
</script>

<style scoped>

</style>