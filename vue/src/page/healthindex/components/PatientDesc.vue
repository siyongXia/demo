<template>
	<div class="container bg_white">
		<div class="fs16 c_333 lh22 mb10">问题描述</div>
		<div class="relative">			
			<textarea placeholder="描述您的问题" maxlength="200" v-model="content"></textarea>
			<span class="count">{{count}}/200</span>
		</div>
		<div class="mt20">医生回答只作为建议，不作为诊疗依据</div>
		
	</div>
</template>
<script>
	export default {
		data(){
			return {
				content:'',
				count:0
			}
		},
		watch:{
			content (now) {
				this.count = now.length;
				this.$emit('content',now);
			}
		},
		methods:{
			getContent() {
				var content = window.sessionStorage.getItem('questionDesc');
				if(content){
					this.content = content;
				}
			}
		},
		mounted(){
			this.getContent();
		}
	}
</script>

<style scoped lang="scss">
	.container {
		padding:0.26667rem 0.4rem 0.53333rem 0.4rem;
	}
	.count {
		position: absolute;
		right: 0.26667rem;
		bottom:0.26667rem;
	}
	textarea {
		resize:none;
		border: 1px solid #E9E9E9;
		border-radius: 8px;
		height:105px;
		width: 100%;
		padding:0.32rem 0.42667rem;
	}

</style>