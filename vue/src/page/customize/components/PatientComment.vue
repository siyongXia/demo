<template>
	<div class="patient_com bg_white  bor_b">
		<div class="clearfix1 lhh30 clearfix">
			<img class="avatar fl" :src="comment.user_avatar" alt="">
			<span class="fl c333 ml10 fs18">{{comment.username}}</span>
			<span class="c00c6b2 fs16 ml5 inblo w170 elli">{{comment.ill_name}}</span>
			<div class="fr ">
				<span class="iconfont pr3 " :class="index < star ? 'yellow':'gray'" v-for="(item,index) in 5 ">&#xe628;</span> 
			</div>
		</div>
		<div class="lh20 typo_dgray com_content">{{comment.content}}</div>
		<div class="mt5" v-if="comment.comment_tag_name ">
			<span class="doc_label mr5" v-for="(key,value) in JSON.parse(comment.comment_tag_name)" v-if="comment.comment_tag_name">{{key}}</span>
		</div>
		<div class="clearfix1 typo_gray fs12 mt5">
			<span class="fl">{{comment.doctor_name}}({{comment.dep_name}}) 医生</span>
			<span class="fr">{{ comment.add_time.split(' ')[0] }}</span>
			<span class="fr pr10">{{comment.depName}}</span>
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return {

			}
		},
		methods:{

		},
		computed:{
			star(){
				return Math.ceil( parseInt(this.comment.overall_score)/2 )
			}
		},
		mounted(){

		},
		props:['comment']
	}
</script>

<style scoped lang="scss">
	.w170 {
		width:4.53333rem;
	}
	.c00c6b2 {
		color:#00c6b2 ;
	}
	.yellow {
		color:#ffcc36;
	}
	.gray {
		color:#e3e3e3 ;
	}
	.pr3 {
		padding-right: 0.08rem;
	}
	.doc_label {
		border: 1px solid #e9e9e9;
		display:inline-block;
		padding: 0 0.26667rem;
		line-height:0.66667rem;
		height:0.66667rem;
		box-sizing:content-box;
		border-radius:0.53333rem;
		color:#000;
		font-size:0.32rem;

	}
	.patient_com {
		padding: 0.37333rem 0.4rem 0.53333rem;
		.lhh30 {
			line-height: 0.8rem;
			height: 0.8rem;
		}
		.corange {
			color: #ffcc36;
		}
		.avatar {
			width: 0.8rem;
			height: 0.8rem;
			border-radius: 50%;
		}
		.com_content {
			margin-top: 0.32rem;
			// margin-bottom: 0.53333rem;
		}
		&.bor_b {
		    border-bottom: 0.02667rem solid #f5f5f5;
		}
	}
</style>