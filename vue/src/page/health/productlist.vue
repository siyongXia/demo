<template>
	<div class="typo_small bg_white" v-bind:class="{productbox: isNotapp}" v-title data-title="服务项目">
		<template v-if='isNotapp==true'>
			<head-nav>服务项目</head-nav>
		</template>
		<div class="fullwidth service-item">
			<a v-for="(datalist,index) in datalist"  class="block pagn pt15 pb15 clearfix" :href="datalist.link">
				<cite class="backgroundimg service-item-img" :style="{'background-image':'url('+datalist.img_full_url+')'}"></cite>
				<div class="clearfix">
					<p>{{datalist.name}}</p>
					<div class="block elli mt5 lh20 typo_gray typo_small">{{datalist.subhead}}</div>
					<div class="service-price">
						<span class="price"><i class="typo_smaller">￥</i>{{datalist.price}}</span>
						<span class="orgprice">￥{{datalist.orgPrice}}</span>
					</div>
				</div>
			</a>
		</div>
		<div v-if="total_page>1" class="pt10 pb10 textc typo_small lh16 layout" id="loadmores"><img :src="loadimg" class="fleft" style="width:0.426667rem;">加载更多</div>
	</div>
		
</template>

<script>
	import HeadNav from '../../components/common/Head.vue'
	import $ from 'jquery'	
	import { Toast } from 'mint-ui'
	export default {
		data(){
			return {
				isNotapp:true,
				tur:true,
				p:1,
				total_page:'',
				datalist:[],
				loadimg:require('../doctorsaid/images/bigloading.gif'),
			}
		},
		methods:{
			scrollist:function(){
				//页面滑动加载数据
				var that = this;
				window.onscroll = function(){
					if(that.tur){
						var totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop())+2;
					    if($(document).height() <= totalheight ){
							that.tur = false;
					        if(parseInt(that.p) < parseInt(that.total_page)){
								that.p++;
								that.getList(that.p)
							}
							else{
								Toast('已经全部加载完')
								$('#loadmores').hide();
							}
					    } 				        
				    }		
				}		
			},			
			getList:function(p){ 
				var that = this;
				var unit_id = this.$route.query.unit_id;
				var code = typeof(this.$route.query.code) != 'undefined' ? this.$route.query.code : 0;
				var protocal = 'https:';
	            var hostName = window.location.hostname;
	            var domain = protocal + '//' + hostName;				
				this.$http({				
					method:'get',
					url: '/health/getunithealthservice.html?code='+code+'&unit_id='+unit_id+'&size=6&p='+p}).then(					
					function(res){
						if(res.data.status==200){
							that.datalist = that.datalist.concat(res.data.data);	
							that.total_page = res.data.total_page;						
						}else{
							Toast(res.data.msg);
						}
						if(p==that.total_page){
							$('#loadmores').hide();
						}
						that.tur = true;
					}
				)				
			},				
		},
		mounted(){
			this.getList(1);
			this.scrollist();
			var cid = this.$route.query.cid;
			if(cid==20||cid==24){
				this.isNotapp = false;
			}
		},
		components: {
			HeadNav
		}
	}
</script>
<style scoped lang="scss">	
.productbox{padding-top:1.28rem;} 
.service-item{}
.service-item a{ position: relative;}
.service-item .service-item-img{ float: left; display: inline-block; width: 2.986667rem; height: 2.24rem; margin-right: 0.266667rem;}
.service-item p{ width: 100%; max-height: 1.066667rem; line-height:0.586667rem; font-size: 0.426667rem;color: #4a4a4a; text-indent: 0;display: -webkit-box; overflow: hidden; text-overflow: ellipsis; -webkit-line-clamp: 2; -webkit-box-orient: vertical; -moz-line-clamp: 2; -moz-box-orient: vertical;}
.service-price{ position: absolute;bottom:0.32rem ; display: inline-block;
	>.price{font-size: 0.426667rem; color: #F27B17;}
	>.orgprice{ margin-left: 0.133333rem; text-decoration:line-through; font-size: 0.32rem; color: #9b9b9b;}
}
#loadmores{width:2.666667rem; margin:0 auto;}
</style>