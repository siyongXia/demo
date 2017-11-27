<template>
	<div>
		<MaskBox @click.native="$parent.isGuideShow = false"></MaskBox>
		<div class="guide">
			<div class="container_20_15 bg_white fs16 c_333">
				<div class="lh22 pb18 bor_b">
					<div class="mb10 elli" >{{todiscount.name}}</div>
					<div class="elli">{{todiscount.subhead}}</div>
				</div>
				<div class="lh22 mt20 bor_b">
					<div class="mb10">留下您的联系方式以便商户尽快联系您</div>
					<input type="tel" placeholder="请输入您的手机号码" maxlength = 11 class="lh22 pb5" v-model="phone">
				</div>
			</div>
			<button class="lhh50 bg_green textc typo_white fullwidth fs16" @click="appointment()">预约到院</button>
		</div>
	</div>	
</template>
<script>
	import MaskBox from '../../../components/common/Mask.vue'
	import { Toast } from 'mint-ui'
	import { mapGetters } from 'vuex'
	export default {
		data(){
			return {
				phone:'',
				reg:/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
			}
		},
		methods:{
			appointment () {
				if(!this.reg.test(this.phone)) {
					Toast({
					  message: '请输入正确的手机号',
					  position: 'bottom',
					  duration: 2000,
					  position:'middle'
					});
					return;
				}
				this.$http({
		            url: '',
		            method: 'post',
		            data: this.phone
		        }).then((data)=>{
		        	console.log(data);
		        }).catch((error)=>{
		        	console.log(error);
		        })
			}
		},
		computed:{
			...mapGetters([
				// 'todiscount'
			])
		},
		mounted(){

		},
		components:{
			MaskBox
		},
		props:['todiscount']
	}
</script>

<style scoped lang="scss">
	.guide {
		position: fixed;
		width: 100%;
		bottom: 0;
		left: 0;
		z-index: 100;
		.pb18 {
			padding-bottom: 18px;
		}
		.bor_b {
			border-bottom: 1px solid #D8D8D8 ;
		}
	}
</style>