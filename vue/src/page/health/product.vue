<template>
	<div class="typo_small lh1 bg_gray" v-title :data-title="htmlTitle">
		<loading v-show="isLoading"></loading>  
		<div class="relative">
			<!-- 顶部轮播图 -->
		 	<swiper :options="bannerSwiperOption" ref="mySwiper" class="rec_pro_wrap clearfix bg_gray">
		    <!-- slides -->
		      <swiper-slide class=""  v-for="(item,index) in bannerList">
		      	<img :src="item.src" alt="" class="banner_img">		       
		      </swiper-slide>         
			</swiper>
			<div class="advance_payment lhh50 pl15" v-if=" pay_method == 1">
				<span class="typo_white fs26">￥250000-600000</span>
				<span class="fr typo_white typo_large pr25 pl30 bg_orange fullheight btn">预付</span>
			</div>
		</div>
		<div class="pro_des bg_white">
			<template v-if="pay_method == 1">
				<div class="typo_orange typo_large lh24">预付定金<span class="typo_orange typo_xsmall">￥</span>280</div>
				<div class="typo_gray lh20 mb8">到店付<span class="typo_gray typo_xsmall">￥</span>222000-590000</div>
			</template>			
			<h4 class="typo_middle title lh20 mb5 overtwo">{{infos.goodsParts.name}}</h4>
			<div class="desc typo_dgray lh20 overthree">{{infos.goodsParts.subhead}}</div>			
			<template v-if="pay_method == 2">
				<div class="price lh30">
					<span class="typo_orange ">￥</span><span class="pr14 typo_orange typo_xxlarge">{{infos.goodsParts.price}}</span>
					<span class="typo_smaller typo_gray line_through">￥{{infos.goodsParts.orgPrice}}</span>
				</div>
				<div class="lh20">
					<span class="typo_green mr15">限量{{infos.goodsParts.stock}}</span>
					<span class="typo_gray">已售{{infos.goodsParts.sales}}</span>
				</div>
			</template>
			<template v-if="pay_method == 1">
				<div class="lh20 pt10">
					<span class="typo_green mr15">限量</span>
				</div>
			</template>
			
		</div>
		<!-- 相关标签 -->
		<div class="pro_label bg_white mb10 relative" @click="showServiceBox()">
			<span class="label_item"><span class="iconfont c_00d7c4 typo_middle mr5">&#xe6ce;</span><span class="fs13 typo_gray">160自营</span></span>
			<span class="label_item"><span class="iconfont c_00d7c4 typo_middle mr5">&#xe6ce;</span><span class="fs13 typo_gray">160自营</span></span>
			<span class="label_item"><span class="iconfont c_00d7c4 typo_middle mr5">&#xe6ce;</span><span class="fs13 typo_gray">160自营</span></span>
			<span class="iconfont  d1d1d1 icon_right mr15">&#xe619;</span>
		</div>
		<!-- 医生信息 -->
		<div class="doc_info bg_white">
			<div class="wrapper relative">
				<div class="hospital relative ">
					<img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3709370999,2141085996&fm=26&gp=0.jpg" alt="" class="avatar fl mr10">
					<div class="hos_wrap ">
						<div class="hos_name pt10 typo_dgray elli">深圳远东妇儿科医院</div>
						<div class="hos_score ">
							<span class="iconfont yellow">&#xe628;</span>
							<span class="iconfont yellow">&#xe628;</span>
							<span class="iconfont yellow">&#xe628;</span></div>
					</div>	
					<span class="iconfont icon_right d1d1d1">&#xe619;</span>
				</div>
				<div class="relative">
					<div class="sub_title typo_dgray elli">
						<span>何艳萍</span><span>主治医生</span><span> 5.8分</span>
					</div>
					<div class="labels clearfix ">
						<div class="label_item">鼻整形</div>
						<div class="label_item">鼻整形</div>
						<div class="label_item">鼻整形</div>
					</div>				
					<span class="iconfont icon_right d1d1d1">&#xe619;</span>
				</div>
				
			</div>			
		</div>
		<div class="pro_label bg_white  clearfix">
		  <div class="fl">已选：<span class="typo_dgray">{{defaultCate.name}}，{{count}}次</span></div>
			<span class="iconfont fr d1d1d1">&#xe619;</span>
		</div>
		<div class=" bg_gray  textc">
			<span class="dividle typo_gray"><span class="iconfont typo_gray mr5">&#xe6d4;</span>详情</span>		
		</div>
		<div class="pro_detail bg_white">
				<div class="lhh44 textc  typo_dgray">闪亮双眼，生动传神，微创自然双眼皮</div>
				<img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1089399937,1684001946&fm=26&gp=0.jpg" alt="" class="img mb10">
				<div class="purchase_notice ">
					<div class="sub_title typo_dgray">
						<span>购买须知</span>
					</div>
					<div class="notice_item mt15 lh18">
						<div class="fs13 typo_dgray">有效日期</div>
						<div class="typo_smaller typo_gray">{{infos.appointmentParts.startTime.substr(0,10)}} - {{infos.appointmentParts.endTime.substr(0,10)}}</div>
					</div>
					<div class="notice_item mt15 lh18">
						<div class="fs13 typo_dgray">可预约时间段</div>
						<div class="typo_smaller typo_gray">{{infos.appointmentParts.isEnduring}}</div>
					</div>
					<div class="notice_item mt15 lh18">
						<div class="fs13 typo_dgray">除外日期</div>
						<div class="typo_smaller typo_gray">{{infos.appointmentParts.exceptDate}}</div>
					</div>
					<div class="notice_item mt15 lh18">
						<div class="fs13 typo_dgray">适用人群</div>
						<div class="typo_smaller typo_gray">{{infos.appointmentParts.fitPeople}}</div>
					</div>
					<div class="notice_item mt15 lh18">
						<div class="fs13 typo_dgray">适用人数</div>
						<div class="typo_smaller typo_gray">{{infos.appointmentParts.fitNum}}人</div>
					</div>
					<div class="notice_item mt15 lh18">
						<div class="fs13 typo_dgray">预约规则 </div>
						<div class="typo_smaller typo_gray">{{infos.appointmentParts.orderLimit}}</div>
					</div>
				</div>
		</div>	
		<div class=" bg_gray  textc">
			<span class="dividle typo_gray"><span class="iconfont typo_gray mr5">&#xe6d5;</span>推荐</span>		
		</div>
		<!-- 品牌推荐 -->
		<div class="rec_item mb10">
			<div class="pl15 bg_white clearfix">
				<div class="sub_title typo_dgray">
					<span>品牌推荐</span>
				</div>			
			</div>
		 	<swiper :options="swiperOption" ref="mySwiper" class="rec_pro_wrap clearfix bg_gray">
		    <!-- slides -->
	      <swiper-slide class="list_item bg_white"  v-for="(item,index) in 10">	      
	      	<img src="http://img0.imgtn.bdimg.com/it/u=876822412,3555842191&fm=214&gp=0.jpg" alt="" class="list_item_img">
	        <h5 class="list_item_title">闪亮双眼，生动传神，微创自然双眼皮</h5>
	        <div class="price lh30">
				<span class="typo_orange ">￥</span><span class="pr14 typo_orange typo_xxlarge">2500</span>
				<span class="typo_small typo_gray line_through">￥4600</span>
			</div>
	      </swiper-slide>         
			</swiper>
		</div>
		<template v-if="false">
			<div class="tips container bg_orange lhh50" v-if="true">
				<span class="typo_white">您现在查看的是交易快照</span>
				<a href="#" class="go_detail typo_white inblo lh1 fr mt10">查看最新详情</a>
			</div>
			<div class="tips textc bg_4a4a4a typo_white lhh40" v-else>当前商品已下架</div>			
			
		</template>
		
		<!-- 遮罩层 -->
		<mask-box v-show="isMaskBoxShow" @close="hideBox"></mask-box>	
		<!-- 分类 -->
		<div class=" fix_bottom category bg_white " @touchmove="prevent($event)" v-show="isCategoryBoxShow">
			<div class="clearfix1 container">
				<div class="img_wrap mr15 fl">
					<img src="http://k2.jsqq.net/uploads/allimg/1705/7_170524143440_5.jpg" alt="" class="pro_img">
				</div>
				<div class="fl price">
					<div class="typo_orange mb5 typo_xxlarge"><span class="typo_orange typo_xsmall">￥</span>{{defaultCate.price}}</div>
					<div class="fs13 typo_gray">库存：{{defaultCate.stock}}</div>
				</div>
				<div class="fr fs30 typo_gray" @click="hideBox">&times;</div>
			</div>
			<!-- 规格 -->
			<div class="standard container mb20">
				<div class=" typo_gray lh18">规格</div>
				<div class="labels clearfix" @click="selectCate($event)">
					<template v-for="(item,index) in infos.goodsSpecialParts">
						<span :class="item.specialId == defaultCate.specialId ? 'bor_green typo_green' : 'bor_gray typo_gray'" :data-cate_id="item.specialId">{{item.name}}</span>
					</template>					
				</div>
			</div>
			<!-- 数量 -->
			<div class="container clearfix1 count">
				<span class="fl typo_gray ">数量</span>
				<addCount class="fr" :maxCount="Number(defaultCate.stock)" :minCount="minCount" @count="getCount"></addCount>	
			</div>
			<button class="lhh50 textc typo_white typo_middle bg_green fullwidth" @click="selectedCate()" :disabled="defaultCate.stock == 0">确定</button>
		</div>
		<!-- 特色服务 -->
		<div class=" bg_white fix_bottom pt20"  @touchmove="prevent($event)" v-show="isServiceBoxShow">
			<div class="fr fs30 typo_gray mt_10 mr10" @click="hideBox">&times;</div>
			<div class="spe_service">				
				<div class="typo_large typo_dgray textc bold mb20">特色服务</div>
				<ul>	
					<li class="mb15">
						<div class="c_333 lh22 typo_middle mb5">正品保障</div>
						<div class="typo_gray">深圳阳光整形美容医院是华南整形美容医院领导品牌</div>
					</li>
					<li class="mb15">
						<div class="c_333 lh22 typo_middle mb5">正品保障</div>
						<div class="typo_gray">深圳阳光整形美容医院是华南整形美容医院领导品牌</div>
					</li>
					<li class="mb15">
						<div class="c_333 lh22 typo_middle mb5">正品保障</div>
						<div class="typo_gray">深圳阳光整形美容医院是华南整形美容医院领导品牌</div>
					</li>
				</ul>
			</div>
			<button class="lhh50 textc typo_white typo_middle bg_green fullwidth" >确定</button>
		</div>
		<!-- footer -->
		<div style="height:145px;"></div>	
		<div class="footer clearfix typo_middle">
			<button class="bg_white typo_dgray" disabled >在线咨询</button>
			<button class="bg_green typo_white" @click="purchase()">立即购买</button>
		</div>
		<scrollTop></scrollTop>
		
	</div>
		
</template>

<script>	
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	import addCount from 'components/common/addCount.vue';
	import maskBox from 'components/common/Mask.vue';
	import scrollTop from 'components/common/scrollTop.vue';
	import BranchBox from './branch.vue'
	export default {
		data(){
			return {
				htmlTitle:'哈哈哈哈',
				infos:[],
				imgDomain:'images.91160.com',
				defaultCate:{},
				count:1,
				tmpCount:1,
				minCount:1,
				isCategoryBoxShow:false,
				isMaskBoxShow:false,
				isServiceBoxShow:false,
				selected_cate_id:0,
				pay_method:2,
				bannerList:[
					{src:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1089399937,1684001946&fm=26&gp=0.jpg'},
					{src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1498466033739&di=086100f36a35d683c44e192e73adfd99&imgtype=0&src=http%3A%2F%2Fpic24.nipic.com%2F20121008%2F3822951_094451200000_2.jpg'}
				],
				banners: [ 
				 		'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1089399937,1684001946&fm=26&gp=0.jpg', 
				 		'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1089399937,1684001946&fm=26&gp=0.jpg' 
		 		],
		 		bannerSwiperOption:{
		 			direction : 'horizontal',
			        grabCursor : true,
		            autoHeight: true,
		            pagination : '.swiper-pagination',
		 		},
		        swiperOption: {
		          direction : 'horizontal',
		          grabCursor : true,
		          setWrapperSize :true,
		          autoHeight: true,
		          pagination : '.swiper-pagination',
		          slidesPerView: 2.12,
		          spaceBetween: 5
		        }
			}
		},
		methods:{
			getData(){
				this.$http.get('/health/detail.html',{params:{goods_id:19}})
				.then((res)=>{
					if(res.status == 200) {
						this.infos = res.data.data;
						this.initCategoryBox();
					}
				}).catch((err)=>{
					console.log(err);
				})
			},
			initCategoryBox(){
				var categories = this.infos.goodsSpecialParts;
				categories.forEach((item,index)=>{
					if(item.isDefault == '1') {
						this.defaultCate = item;
					}
				})
			},
			getCount(count){
				this.tmpCount = count;
			},
			showCategoryBox(){
				this.isCategoryBoxShow = true;
				this.isMaskBoxShow = true;
			},
			showServiceBox(){
				this.isServiceBoxShow = true;
				this.isMaskBoxShow = true;
			},
			hideBox(){
				this.isCategoryBoxShow = false;
				this.isMaskBoxShow = false;
				this.isServiceBoxShow = false;
				this.minCount = 1;
			},
			purchase(){
				this.showCategoryBox();
			},
			prevent(e){//防止背景滑动
				e.preventDefault();
			},
			selectCate(e){
				 this.infos.goodsSpecialParts.forEach((item,index)=>{
				 	if(  item.specialId == e.target.dataset.cate_id ) {
				 		this.defaultCate = item;
				 		return false;
				 	}
				})
			},
			selectedCate(){
				this.count = this.tmpCount;
				this.minCount = this.tmpCount;
				this.isCategoryBoxShow = false;
				this.isMaskBoxShow = false;
			}
		},
		mounted(){
			this.getData();
		},
	  components: {
	    swiper,
	    swiperSlide,
	    addCount,
	    maskBox,
		scrollTop,
		BranchBox

	  }
	}
</script>
<style scoped lang="scss">	
	
  @import '../../style/mint-ui.min';
  @import './css/health_commom';
  .pr14 {padding-right:0.37333rem;}
  .lh30 {line-height:0.8rem;}
  .fs26 {font-size:0.69333rem;}
  .mt_10{margin-top:-0.26667rem;}
  .mb15 {margin-bottom:0.4rem;}
  .pl15 {padding-left:0.4rem;}
  .pr25 {padding-right: 0.66667rem;}
  .lh18 {line-height:0.48rem;}
  .mr15 {margin-right:0.4rem;}
  .mint-swipe {height: 300px;}
  .c_00d7c4 {color:#00D7C4;}
  .fs13 {font-size:0.34667rem;}
  .d1d1d1 {color:#d1d1d1;}
  .yellow {color:#F6B53D ;} 
  .advance_payment {
  	position:absolute;
  	width:100%;
  	bottom:0;
  	background-color: #00d2c3;
  	z-index:10;  
  	>.btn::before {
  		content:'';
  		position:absolute;
  		right:2.42667rem;
  		width: 0;
	    height: 0;
	    border-top: 0.66667rem solid transparent;
	    border-right: 0.53333rem solid #FFB937;
	    border-bottom: 0.66667rem solid transparent;

  	}	
  }

  .sub_title {
		border-left: 3px solid #00d3c2;
		padding-left:0.13333rem;
		color:#4A4A4A;
		font-size:0.42667rem;
		margin: 0.26667rem 0 0.32rem 0;
		>span {
			margin-right:0.64rem;
		}
	}
	.banner_img {
		width:100%;
		height:300px;
	}
  .pro_des {
  	padding: 0.53333rem 0.4rem;
  	margin-bottom:0.26667rem;
  	>.price {
  		margin-top: 0.21333rem;
  	}
  }
  .icon_right {
		position:absolute;
		right:0;
		top:50%;
		transform:translateY(-50%);
	}
  .pro_label {
  	max-height:2.34667rem;
  	overflow:hidden;
  	line-height:1.17333rem;
  	padding:0 0.4rem;
  	>.label_item:not(:nth-child(3n)) {
  		margin-right:0.48rem;
  		display:inline-block;
  		text-align: center;	
  	}
  }
	.doc_info {
	overflow:hidden;
	margin-bottom:0.53333rem;	
	>.wrapper {
		margin:0.53333rem 0.4rem;		
	}
	.hospital {
		border-bottom:1px solid #f1f1f1;
		padding-bottom:0.26667rem;
	}
	.hos_wrap {
		overflow:hidden;
		height:1.33333rem;
	}
	.hos_name {
		margin-bottom:0.26667rem;
		width:6.93333rem;
	}
	.hos_score{
		font-size:0;
		>span {
			font-size:0.32rem;
			padding-right:0.13333rem;
		}
	}
	.labels {		
		margin-top:0.26667rem;	
		line-height:1;
		>.label_item {
			display:inline-block;
			float:left;
			margin-right:0.13333rem;
			// height:0.53333rem;
			line-height:0.53333rem;
			padding:0 0.26667rem;
			font-size:0.32rem;
			border:1px solid #ccc;
			border-radius: 0.53333rem;
		}
	}
	.avatar {
		width:1.33333rem;
		height:1.33333rem;
	}		
}

.pro_detail {

	>img {
		width:100%;
		height:7.33333rem;
	}
	>.purchase_notice{
		padding:0.45333rem 0.4rem 0.26667rem;
	}
}
.list_item_img {			
	width:100%;
	height:4.53333rem;
}
.list_item {
	width:4.48rem;
	border-radius:0.16rem;
	overflow:hidden;
	float:left;
	margin-right:0.13333rem;
}

.list_item_title {
	padding :0.21333rem 0.4rem 0;
	line-height: 20px;
	color:#4a4a4a;
	font-weight: normal;
}
.rec_item {
	.rec_pro_wrap {
		padding-top:0.13333rem;
		padding-left:0.13333rem;			
	}
	.price{
		padding:0 0.4rem;
	}
}
.bg_orange {
	background: #FFB937;
}
.tips {
	color:#fff;
	position:fixed;
	bottom:50px;
	width:100%;
	z-index:100;
	>.go_detail {
		padding:0.21333rem 0.32rem;
		height:0.8rem;
		border: 1px solid #FFFFFF;
		border-radius: 0.8rem;
	}
}
.footer {
	position:fixed;
	bottom:0;
	width:100%;
	z-index:100;
	>button {
		width:50%;
		height:50px;
		text-align: center;
		line-height:50px;
		float:left;
		font-size:0.42667rem;
	}
}

.category {
	.img_wrap {
		width:2.66667rem;
		height:2.66667rem;
		padding:0.4rem 0;
		border-radius:0.26667rem;
		border: 1px solid #f1f1f1;
		margin-top: -0.53333rem;
		background-color: #fff;
	}
	.pro_img{
		width:100%;
		height:1.86667rem;
	}
	.price {
		padding-top:1.01333rem;
	}
	.standard {
		margin-top: 1.01333rem;
	}
	.labels {
		font-size:0;
		max-height:2.50667rem;
		>span {
			display:inline-block;
			padding:0.16rem 0.32rem;
			border-radius: 0.13333rem;
			font-size:0.34667rem;
			margin:0.53333rem 0.26667rem 0 0;
		}
	}
	.count {
		height:0.69333rem;
		line-height:0.69333rem;
		margin-bottom:1.33333rem;
	}
}
.spe_service {
	padding:0 0.98667rem 0 0.42667rem;

}	

</style>