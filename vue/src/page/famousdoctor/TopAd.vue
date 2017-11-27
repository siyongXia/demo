<template>
	<div>
		<div id="mm-jpshow" class="pop-show" v-if="addmmshow==true">
		    <div class="jpbox">
		        <div class="jpbox-content">
		            <div class="jpbox-c-b">
		            	<span><img :src="mmtitleimg"></span>
		                <p><img :src="shareimg"></p>
		            </div>
		            <a @click="mmclosepop" class="closepop clf fs22">×</a>
		        </div>
		    </div>
		</div> 
		<div class="top-app-ads layout" v-if="appadshow == true">
			<swiper :aspect-ratio="66/375" :loop="true" :auto="true" :show-dots="false">
	            <swiper-item>
					<a href="javascript:;" class="swiper-slide block" @click="download_app($event)" data-ga_statistics_click="顶部导流图-立即打开-点击">
						<div class="block pr10 layout">
							<div class="fright top-app-btn">
								立即查看
							</div>
							<img :src="iconimg">
							<div class="fleft w145 lh20 mt4 ml8">
								<div class="block typo_middle typo_black">健康160</div>
								<div class="fleft typo_smaller typo_grey lh20">去医院，缴费不用排队</div>
							</div>
						</div>
					</a>      
	            </swiper-item>
	            <swiper-item>
					<a href="javascript:;" class="swiper-slide block js-mmbtn" @click="addMm($event)" data-ga_statistics_click="顶部导流图-妈妈圈-立即打开-点击">
						<div class="block pr10 layout">
							<div class="fright top-app-btn">立即关注</div>
							<img :src="mm1img">
							<div class="fleft w145 lh20 mt4 ml8">
								<div class="block typo_middle typo_black">160妈妈圈</div>
								<div class="fleft typo_smaller typo_grey lh20">3分钟掌握高效育儿经</div>
							</div>
						</div>
					</a>   
	            </swiper-item>
	        </swiper> 
		</div>		
	</div>
</template>
<script>
	import $ from 'jquery'
	import { Swiper,  SwiperItem } from 'vux'
	export default{
		data(){
			return {
				mm1img:require('../../static/mm1.png'),
				iconimg:require('../../static/icon.png'),
				mmtitleimg:require('../../static/mmtitle.png'),
				shareimg:require('../../static/share.gif'),
				addmmshow:false,
				appadshow:true,
			}
		},
		mounted:function(){},
		components:{Swiper, SwiperItem, },
		methods:{
			addMm:function(obj){
				this.addmmshow = true;
				ga('send','event',obj.currentTarget.dataset.ga_statistics_click,'点击');
			},
			mmclosepop:function(){
				this.addmmshow = false;
			},
			//下载app
			download_app:function(obj){
				ga('send','event',obj.currentTarget.dataset.ga_statistics_click,'点击');
	            var loadDateTime = new Date();
	            window.setTimeout(function() {
	                var timeOutDateTime = new Date();
	                if (timeOutDateTime - loadDateTime < 5000) {
	                    window.location.href = "http://wap.91160.com/index.php?c=scan&a=index&code=dPhS3aD5q4R0%2BFLdoPmrhMG1v.hgq2fGRCOS7wVwqXCgYLhdNDaUnQ%3D%3D";//跳转的APP下载链接
	                } else {
	                    window.close();
	                }
	            }, 2000);
	            if (/android|Android/i.test(navigator.userAgent)) {
	                window.location.href = "jiuyi160://www.91160.com";//安卓暴露的接口
	            } else {
	                window.location.href = "jiuyi160://www.91160.com";//IOS的暴露接口
	            }
	        },				
		}
	}
</script>

<style scoped lang = 'scss'>
	/*顶部广告*/
	.w145{width:3.866667rem;}

	.top-app-ads{ position: fixed; top:0; z-index: 99;width:100%;background: #fff;}
	.top-app-ads img{float: left; width: 1.333333rem; height: 1.333333rem;}
	.top-app-ads a{padding:0.213333rem 0 0.213333rem 0.266667rem;}
	.top-app-btn{width: 100px;height: 30px;margin:9px 0;border-radius:30px;line-height: 30px; text-align: center; font-size: 14px; color:#fff;background: #00d3c2;}

	.closepop{position:absolute;bottom:-50px;left:50%;display:inline-block;width:0.8rem;height:0.8rem; margin-left:-0.4rem;line-height:0.8rem;border:solid 0.05333rem #fff;border-radius: 100%; font-size: 0.48rem; color:#fff;}
	.jpbox{position:fixed;top:0;left:0;z-index:99999;width:100%;height:100%;background: rgba(0,0,0,0.5);}
	.jpbox-content{position:absolute;top:50%;left:50%;width:6.4rem; height:9.066667rem;  margin:-5.066667rem 0 0 -3.2rem; text-align: center;}
	.jpbox-c-b{ position: relative; width: 6.4rem; height: 8.346667rem; border-radius: 0.266667rem; padding:0; background:#00d3c2;}
	.jpbox-c-b span{ position: absolute; top:-1.066667rem; left: 50%; z-index: 999; display: block; width: 2.32rem; margin-left: -1.173333rem}
	.jpbox-c-b p{float:left;width:100%;margin-top:0.533333rem;text-indent: 0;overflow: hidden;border-radius: 0.266667rem; }
	.jpbox-c-b img{width: 100%;}
	.jpbox-c-b p img{border-radius: 0.266667rem;}
</style>