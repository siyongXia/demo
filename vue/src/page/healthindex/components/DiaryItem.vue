<template>
	<div class="diary_item bg_white fullheight">
		<div class="top clearfix1 mb20" v-if="info.unit">
			<div class="avatar fl mr10 inblo backgroundimg" 				
				:style="'background-image:url('+info.unit.image+'),url(https://static.91160.com/wechat/img/unit/bg_hos.png)'"></div>
			<div class="fl w200 ">
				<div class="fs16 c_333 lh22 elli">{{info.unit.author}}</div>
				<div class="fs12 typo_gray lh18 elli">{{info.unit.unit_name}}</div>
			</div>
			<button class="fr focus fs14 mt5" :class="info.unit.isFocus === 1 ? 'btn_gray':'btn_green'" @click="focus(info.unitId)"><i class="fs18" v-if="info.unit.isFocus !== 1">+</i>{{info.unit.isFocus === 1 ? '取消关注':'关注'}}</button>
		</div>
		<div @click="play($event,info.id)">
			<div class="clearfix1 mb15 ">
				<div v-for="(item,index) in JSON.parse(info.videoImg)" class="relative inblo imgs"  :data-link="item.link ? 2: 1" :data-vid="item.vid">				
					<img :src="IMAGESDOMAIN + item.img" alt="" class="fullheight fullwidth"  :data-link="item.link ? 2: 1" :data-vid="item.vid">
					<i class="iconfont video_icon" v-if="item.vid"  :data-link="item.link ? 2: 1" :data-vid="item.vid">&#xe6ee;</i>
				</div>
				<!-- <img :src="item" alt="" v-for="(item,index) in imgs" class="imgs"  data-link="2">			 -->
			</div>
			<div class="lh20 mb5 c_333 overtwo" data-link="1">{{info.description || '暂无'}}</div>
			<div class="typo_gray fs12" data-link="1">{{info.addTime}}</div>
		</div>
			
	</div> 
</template>
<script>
	import { formateParams, getUrlParam  } from '../../../utils/util.js'
	import  GlobalSetting  from '../../../config/GlobalSetting.js'
	import { Toast } from 'mint-ui'
	export default {
		data(){
			return {
				isFocus:0,
				IMAGESDOMAIN:GlobalSetting.IMAGESDOMAIN,				
			}
		},
		methods:{
			focus (id) {
				var value = formateParams({focus_id:id,type:3});
				this.$http({
					method:'post',
					url:'/do/focus.html',
					data:value
				}).then((data)=>{
					if(data.data.state === 1) {
						Toast({
							message:data.data.msg,
							postion:'middle',
							classNmae:'c_white',
							duration: 2000
						})
						this.$store.commit('healthindex/INIYDAIRYANDADD',id);
						return;
						// if(this.isFocus === 1) {
						// 	this.isFocus = 0;
						// }else {
						// 	this.isFocus = 1;
						// }

					}
				}).catch((err)=>{
					console.log(err);
				})
			},
			play (e,id) {
				var topValue = '';
				try {
					topValue = document.getElementsByClassName('xs-container')[0].style.transform.match(/translateY\(-?(\d+)px\)/)[1];					
				}catch(err) {
					topValue = 0;
					// console.log(err);
				}	
				this.$parent.topValue = topValue ;//控制iframe的top
				if(e.target.dataset.link === '1') {
					this.$router.push({path:'consult.html',query:{article_id:id,nyappshare:1}})
				}else {
					var vid = e.target.dataset.vid ;
					this.$parent.vid = vid;
				}
			}
		},
		mounted(){
			this.isFocus = this.info.unit.isFocus;
		},
		props:['info']
	}
</script>

<style scoped lang="scss">
	.diary_item {
		padding:0.53333rem 0.4rem 0.53333rem 0.53333rem;
	}
	.w200 { 
		width: 5.33333rem;	
	}
	.avatar {
		width:1.06667rem;
		height:1.06667rem;
	}
	.focus {
		// width:1.73333rem;
		padding:0 0.26667rem;
		height:0.8rem;
		line-height:0.64rem;		
		background-color: #fff;
		border-radius:0.4rem;		
		text-align: center;
		&:active {
			background-color: #f5f5f5;
		}
	}
	.imgs {
		width:4.26667rem;
		height:3.2rem;
		float: left;
		&:nth-child(2) {
			float: right;
		}
	}
	.btn_gray {
        color: #BEBEBE;
        border: 1px solid #BEBEBE;
    }
    .btn_green {
        color:#00d2c3;
        border: 0.02667rem solid #00d2c3;
    }
    .video_icon {
    	position:absolute;
    	font-size:1.33333rem;
    	opacity: .4;
    	left:50%;
    	top:50%;
    	transform:translate(-50%,-50%);		
    }
</style>
