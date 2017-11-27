<template>
	<div >
		<NavigateBar :options="navigateBarOptions"></NavigateBar>
		<template v-if="is_customize === 0">
			<div class=" textc typo_lgray fs16">
				<div class="error-icry ptb iconfont">&#xe643;</div>
				<div class="mb10">非定制化主页医院！</div>
				<i>页面<b id="wait">{{timeCount}}</b>s后自动<a id="href" href="javascript:window.history.back();" class="link">跳转</a></i>
			</div>
		</template>
		<template v-else>
			<div ref="content">
				<!-- banner -->
				<div class="banner banner_cus relative" :class="notice.content ? 'min40':''" chpid="banner" ref='banner' >
					<swiper :options="bannerswiperOption" ref="mySwiper" style="height: 6.4rem;" v-show="isNotEmptyObject(banner) || type_id==1 ">
						<swiper-slide v-for="(item,index) in banner">
							<a :href="item.link ? item.link :'javascript:void(0)'" class="relative block fs0 fullwidth">
								<img :src="item.image" :alt="item.alias">
								<span class="iconfont typo_white  video_icon" v-if="item.typeId === '2'">&#xe6ee;</span>
							</a>						
						</swiper-slide>
						<div class="swiper-pagination"  slot="pagination" v-show="banner.length > 1"></div>
					</swiper>	
					<!-- 放号通知 -->
					<a class="lhh40 pl15 pr15 bg_orange tip typo_white flex" :href="notice.url" v-if="notice.content"> 
						<i class="iconfont mt2 fs20">&#xe6df;</i>
						<span class="flex-item fs16 pl10">{{notice.content}}</span>
						<i class="iconfont">&#xe619;</i>
					</a>					
				</div>
				<!-- 医院信息 -->
				<HospitalInfo :unitInfo="unitInfo" ref='unit' v-if="isNotEmptyObject(unitInfo) || type_id==1 " ></HospitalInfo>		
				
				<!-- 栏目信息 -->
				<div class="mb10" ref="todiscount"  >
					<router-link :to="'brand.html?unit_id='+unitInfo.unit_id" class="lhh44 container bg_white flex columns" chpid="ambient">
						<span class="iconfont icon" >&#xe6ba;</span>
						<span class="flex-item c_333">品牌环境及详情介绍</span>
						<i class="iconfont pl5 typo_orange" v-if="isVideoIConShow">&#xe6e2;</i>
						<span class="iconfont c_d1d1d1" >&#xe619;</span>
					</router-link>
					<div class="lhh44 container bg_white flex columns">
						<span class="iconfont icon">&#xe69d;</span>
						<a class="flex-item c_333" v-if="unitInfo.map" :href="'/unit/privatemap.html?unit_id='+unitInfo.unit_id">{{unitInfo.address}}</a>
						<span class="iconfont c_d1d1d1">&#xe619;</span>
					</div>
					<router-link :to="todiscount[0]?todiscount[0].url:''" @click="gaSend(unitInfo.unit_name + '-引导到院-展现')"  class="lhh44 container bg_white flex columns" chpid="todiscount" v-if="isNotEmptyObject(todiscount) || type_id ==1 ">
						<span class="iconfont icon fs10">&#xe60b;</span>
						<span class="flex-item c_333 elli">{{todiscount[0] && todiscount[0].name}}</span>
						<span class="typo_orange">立即领取<i class="iconfont pl5 relative new">&#xe6e1;</i></span>				
						<span class="iconfont c_d1d1d1">&#xe619;</span>
					</router-link>
				</div>			
			</div>	
			<div class="blocks_wrap" v-if="ordering.length	|| type_id ==1">	
				<!-- 基础服务 -->
				<div chpid="basicssrv" ref='basicssrv' v-show="basicssrv.isClose == '0' ||  type_id == 1 ">
					<SubTitle title="基础服务" ></SubTitle>
					<div class="flex service bg_white mb10">
						<div class="flex-item bor_r service_item">
							<span class="iconfont bg_62CD02 typo_white icon">&#xe6b5;</span>
							<a class="inblo" href="/disease/index.html">
								<div class="c_333 fs16 lh22 mb3 ">疾病导诊</div>
								<div class="typo_gray lh18">了解常见疾病知识</div>
							</a>
						</div>
						<div class="flex-item service_item">
							<span class="iconfont bg_green typo_white icon">&#xe6e3;</span>
							<a class="inblo" :href="'/order/rule.html?unit_id='+unitInfo.unit_id">
								<div class="c_333 fs16 lh22 mb3 ">预约规则</div>
								<div class="typo_gray lh18">了解医院就诊规则</div>
							</a>
						</div>
					</div>
				</div>	
				<!-- 预约挂号 -->
				<div ref='ghdep' chpid="ghdep" v-show="isNotEmptyObject(ghdep) || type_id ==1 ">
					<SubTitle title="预约挂号" ></SubTitle>
					<SectionSelect class="mb10" :ghdep="ghdep"></SectionSelect>
				</div>
				<!-- 院内服务 -->
				<div   chpid="hospitalsrv" ref='hospitalsrv' v-show="isNotEmptyObject(hospitalsrv) || type_id ==1 ">
					<SubTitle title="院内服务"></SubTitle>
					<div class="mb10 sec_services horizontal bg_white clearfix">
						<swiper :options="swiperOption1" ref="mySwiper">
							<!-- slides -->
							<swiper-slide>
								<div class="flex">
									<a :href="item.url" class="sec_services_item textc relative block"  v-for="(item,index) in hospitalsrv" v-if="item.open === '1'">
										<div class="fs14 lh22 typo_dgray">{{item.title}}</div>
										<div class="fs12 typo_gray">{{item.more}}</div>
										<i class="iconfont fs20 typo_white icon" v-html="icon[index]"></i>
									</a>
								</div>					
							</swiper-slide>
							<div class="swiper-scrollbar"   slot="scrollbar"></div>
						</swiper> 
					</div>
				</div>
				<!-- 优势科室 -->
				<div  chpid="hotdeps" ref='hotdeps' v-show="isNotEmptyObject(hotdeps) || type_id ==1 ">
					<SubTitle title="优势科室" :linkUrl="hotdeps.length >=4 ? 'section.html?unit_id='+unitInfo.unit_id:''"></SubTitle>
					<div class="container pt20 pb10 bg_white good_sections clearfix1 mb10">
						<GoodSection v-for="(item,index) in hotdeps.slice(0,4)" :section="item"></GoodSection>
					</div>
				</div>
				<!-- 名医推荐 -->
				<div chpid="hotdoctor" ref='hotdoctor' v-show="isNotEmptyObject(hotdoctor) || type_id ==1 ">
					<SubTitle title="名医推荐" :linkUrl="hotdoctor.length > 2 ? 'doctor.html?unit_id='+unitInfo.unit_id : ''"></SubTitle>
					<div class="mb10 pt20 bg_white mb10">
						<Doctor v-for="(item,index) in hotdoctor.slice(0,2)" :info="item">{{index}}</Doctor>			
					</div>
				</div>
				<!-- 广告位 -->
				<div class="mb10 centreimgs"   chpid="centreimgs" ref='centreimgs' v-show="isNotEmptyObject(centreimgs) || type_id ==1 ">
					<SubTitle title="广告位" v-if="type_id ==1"></SubTitle>
					<swiper :options="centreimgsSwiperOption" ref="mySwiper">
						<!-- slides -->
						<swiper-slide v-for="(item,index) in centreimgs">
							<a :href="item.link">
								<img :src="item.image" :alt="item.alias">					
							</a>						
						</swiper-slide>
						<!-- Optional controls -->
						<div class="swiper-pagination"  slot="pagination"  v-show="centreimgs && centreimgs.length > 1"></div>
					</swiper>			
				</div>
				<!-- 服务项目 -->
				<div class="bg_white service_rec mb20 pb20"  chpid="hotservice" ref='hotservice'  v-show="isNotEmptyObject(hotservice) || type_id ==1 ">
					<SubTitle title="服务项目" :linkUrl="'/vue/health/productlist.html?unit_id='+unitInfo.unit_id"></SubTitle>
					<ServiceItem v-for="(item,index) in hotservice.slice(0,3)" :info="item"></ServiceItem>
				</div>
				<!-- 资讯动态 -->
				<div class="bg_white mb10 news pb20"   chpid="hotnews" ref='hotnews' v-show="isNotEmptyObject(hotnews) || type_id ==1 ">
					<SubTitle title="资讯动态" :linkUrl="hotnews.length >= 3 ? 'news.html?unit_id='+unitInfo.unit_id:''"></SubTitle>
					<div class="pt10">					
						<NewsItem v-for="(item,index) in hotnews.slice(0,3)" :content="item"></NewsItem>
					</div>
				</div>
				<!-- 同类推荐 -->
				<!-- <div class="mb10 clearfix horizontal" > 
					<SubTitle title="同类推荐" ></SubTitle>
					<swiper :options="swiperOption1" ref="mySwiper">
						slides
						<swiper-slide>
							<div class="rec_wrapper bg_white flex"    style="width:1000%;">
								<div class="rec_item " v-for="item in 5">
									<div class="backgroundimg img" style="background-image:url('https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1502849714&di=8cd6bf88ecc323e05dd2fd1914f871ec&src=http://img.taopic.com/uploads/allimg/140326/235113-1403260U22059.jpg')"></div>
									<div class="typo_dgray lh20 ">香港大学深圳医院</div>
									<span class="typo_gray lh18 fs12">0.4km</span>
								</div>
							</div>
						</swiper-slide>
						<div class="swiper-scrollbar"   slot="scrollbar"></div>
					</swiper> 
				</div>
				附近药店
				<div class="mb20 clearfix horizontal" > 
					<SubTitle title="附近药店" ></SubTitle>
					<swiper :options="swiperOption1" ref="mySwiper">
						slides
						<swiper-slide>
							<div class="rec_wrapper bg_white flex"  style="width:1000%;">
								<div class="rec_item " v-for="item in 5">
									<div class="backgroundimg img" style="background-image:url('https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1502849714&di=8cd6bf88ecc323e05dd2fd1914f871ec&src=http://img.taopic.com/uploads/allimg/140326/235113-1403260U22059.jpg')"></div>
									<div class="typo_dgray lh20 ">香港大学深圳医院</div>
									<span class="typo_gray lh18 fs12">0.4km</span>
								</div>
							</div>
						</swiper-slide>
						<div class="swiper-scrollbar"   slot="scrollbar"></div>
					</swiper> 
				</div> -->
			</div>
			<!-- 患者评价 -->
			<div class="mb10" chpid="comment" ref='commentList' v-show="isNotEmptyObject(commentList) || type_id ==1 " >
				<SubTitle title="患者评价" :linkUrl="'comment.html?unit_id='+unitInfo.unit_id"></SubTitle>
				<PatientComment v-for="(item,index) in commentList" :comment="item" ></PatientComment>
			</div>
			<!-- 其他分院 -->
			<div class="mb10"  ref='hpbranch' chpid="hpbranch" v-show="isNotEmptyObject(hpbranch) || type_id ==1 " > 
				<SubTitle title="其他分院" ></SubTitle>
				<HosSection v-for="(item,index) in hpbranch" :info="item" :distance="CoolWPDistance(lat,lng,item.map[0],item.map[1])"></HosSection>
			</div>
			<Guide v-if="isGuideShow" :todiscount="todiscount[0]"></Guide>
			<LabelBox  v-if="isLabelShow" :unitTags="unitInfo.unit_tags"></LabelBox>
			<div class="lhh50" v-if="false"></div>			
			<FullButton  
			:content="'匿名在线咨询'" :bgColor="'#00D2C3'" :color="'#fff'" v-if="false">
			</FullButton>
		</template>
		
	</div>
</template>
<script>	
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import HospitalInfo from './components/HospitalInfo.vue';
	import SubTitle from '../../components/common/SubTitle.vue';
	import SectionSelect from '../../components/common/SectionSelect.vue'
	import GoodSection from './components/GoodSection.vue';
	import Doctor from './components/Doctor.vue'
	import ServiceItem from './components/ServiceItem.vue'
	import NewsItem from './components/NewsItem.vue'
	import PatientComment from './components/PatientComment.vue'
	import HosSection from './components/HosSection.vue'
	import FullButton from '../../components/common/FullBotton.vue'
	import Guide from './components/Guide.vue'
	import LabelBox from './components/Label.vue'
	import { mapGetters, mapActions } from 'vuex'
	import { setCookie, readCookie, CoolWPDistance, isNotEmptyObject, isAppOrWeixin } from '../../utils/util.js'
	import { MP } from '../../plugins/BMap.js'
	export default {
		data(){
			return {	
				is_customize:1,
				timeCount:5,
				bannerswiperOption:	{
					direction : 'horizontal',
					grabCursor : true,
					setWrapperSize :true,
					autoHeight: true,
					pagination : '.swiper-pagination',
					paginationClickable :true,
					observeParents:true,
					autoplay: 3000,
					loop:true,
					initialSlide:1
				},	
				centreimgsSwiperOption:	{
					direction : 'horizontal',
					grabCursor : true,
					setWrapperSize :true,
					autoHeight: true,
					pagination : '.swiper-pagination',
					paginationClickable :true,
					observeParents:true,
					autoplay: 3000,
					loop:true,
					initialSlide:1
				},
				swiperOption1: {
					direction: 'horizontal',
					slidesPerView: 'auto',
					freeMode: true,
				    roundLengths : true, //防止文字模糊
				    scrollbar:'.swiper-scrollbar',
				},
				navigateBarOptions:{
					iconLeftCode:'&#xe60e;',
					title:'机构主页',
					bgColor:'#00d2c3',
					color:'#fff',
					iconClass:"#fff"
				},
				isGuideShow:false,
				isLabelShow:false,
				page:1,
				lat:'',
				class_id:'',
				id:'',
				type_id:'',
				lng:'',
				contentBox:'',
				icon:{
					order:'&#xe638;',
					today:'&#xe635;',
					bindcard:'&#xe639;',
					queue:'&#xe634;',
					roompay:'&#xe637;',
					report:'&#xe636;',
					notice:'&#xe65f;'
				}

			}
		},
		mounted(){	
			var id = this.$route.query.unit_id;
			this.type_id= this.$route.query.type_id;
			this.id = id;
			this.class_id = this.$route.query.class_id;
			this.contentBox = this.$refs.content;
			this.getAllDatas();								
			this.getLatAndLng((lat,lng)=>{
				this.lat = lat;
				this.lng = lng;
			});
		},
		watch:{
			banner () {
				if(this.banner.length <= 1) {
					this.bannerswiperOption.autoplay = 0;
					this.bannerswiperOption.loop = false;
				}
			},
			centreimgs () {
				if(this.centreimgs.length <= 1) {
					this.centreimgsSwiperOption.autoplay = 0;
					this.centreimgsSwiperOption.loop = false;
				}
			},
			$route(to,from){
				console.log(to);
				this.class_id = to.query.class_id;
				this.page =1;
				if(to.path === from.path) {
					window.scrollTo(0,0);
					this.getAllDatas();
				}
				
			}
		},
		computed:{
			...mapGetters('customize',[
				'unitInfo',
				'banner',
				'hotdeps',
				'hotdoctor',
				'hotnews',
				'hotservice',
				'commentList',
				'hospitalsrv',
				'notice',
				'centreimgs',
				'ghdep',
				'hpbranch',
				'ordering',
				'todiscount',
				'isVideoIConShow',
				'basicssrv'
			])			
		},
		methods:{
			...mapActions('customize',[
				'getData',
				'getGhDep',
				'getHpbranch',
				'getCommentList'
			]),
			getLatAndLng(callback){
				this.$nextTick(function () {					
			        MP().then( BMap => {
			            var currentLat = readCookie('currentLat') || '';
						var currentLon = readCookie('currentLon') || '';
						if(currentLat && currentLon){
							callback(currentLat,currentLon);
						}else{
							var geolocation = new BMap.Geolocation();
							geolocation.getCurrentPosition (function (r) {
								if (this.getStatus() == BMAP_STATUS_SUCCESS) {
									var mk = new BMap.Marker(r.point);
									currentLat = r.point.lat;
									currentLon = r.point.lng;
									setCookie('currentLat', currentLat);
									setCookie('currentLon', currentLon);
									callback(currentLat,currentLon);
								}
							});
						}
			        })
			    })			
			},		
			callback (data){	
				if(this.page == 1) {
					this.is_customize = data.data.is_customize;
					if(this.is_customize === 0) {
						var timer = setInterval(()=>{
							this.timeCount--;
							if(this.timeCount <= 0) {
								this.timeCount = 0;
								clearInterval(timer);
								window.history.back()
							}
						},1000)
					}
					this.getGhDep('/api/unit/departments?id='+this.id+'&class_id='+this.class_id);	
				}
				var ordering = data.data.ordering;
				if(ordering) {
					setTimeout(()=>{//排序
						ordering.split(',').forEach((item,index)=>{
							if(item == 'ambient' || item == 'ambientimgs' || item == 'ambientvideo' || item =='banner' || item =='todiscount' || item =='hpbranch' || item =='comment') {
							}else {						
								this.contentBox.appendChild(this.$refs[item]);
							}
						});						
					},30);
				}
				var pager = data.data.pager;
				if(  ++this.page <= pager.total  ) {
					var page = this.page;
					this.getAllDatas();
				}else {
					this.getCommentList({id:this.id});
					this.getHpbranch('/api/unit/branches?id='+this.id+'&class_id='+this.class_id);	
				}			
				
			},
			getAllDatas () {	
				this.getData({id:this.id,class_id:this.class_id,limit:3,page:this.page,type_id:this.type_id, callback:this.callback})
			},
			beforeDestroy () {
				this.getDatas = null;
			},
			CoolWPDistance:CoolWPDistance,
			isNotEmptyObject:isNotEmptyObject
		},
		components:{
			HospitalInfo,
			SubTitle,
			SectionSelect,
			GoodSection,
			Doctor,
			ServiceItem,
			NewsItem,
			PatientComment,
			HosSection,
			swiper,
			swiperSlide,
			FullButton,
			Guide,
			LabelBox
		},
	}
</script>

<style scoped lang = "scss">
	.video_icon {
		position: absolute;
		left: 50%;
		top: 50%;
		font-size: 1.33333rem;
		opacity: .8;
		transform:translate(-50%,-50%);
	}
	.blocks_wrap {
		display:flex;
		flex-direction:column;
	}
	.iconfont.new {
		padding-right: 0.13333rem;
	}
	.iconfont.new::after {
		content: '';
		position: absolute;
		width: 0.13333rem;
		height: 0.13333rem;
		border-radius: 50%;
		background-color: red;
		right: 0rem;
		top: -0.13333rem;
	}
	.bg_orange {
		background-color: #ffb937;
	}
	.c_d1d1d1{
		color: #d1d1d1;
	}
	.add_125 {
		width: 100%;
		height: 3.33333rem;
	}
	.lh25 {line-height: 0.66667rem;}
	.mb3 {
		margin-bottom: 0.08rem;
	}
	.bor_r {
		border-right: 0.02667rem solid #f5f5f5;
	}
	.bg_62CD02 {
		background-color: #62CD02;
	}

	.container {
		padding-left: 0.4rem;
		padding-right: 0.4rem;
	}
	.min40 {
		min-height: 1.06667rem;
	}
	.banner {
		
		.tip {
			position: absolute;	
			top: 0;		
			left: 0;
			z-index:10;
			width: 100%;
			opacity: 0.9;
		}
	}
	.hospital {
		padding: 0.53333rem 0.4rem 0.4rem;
		.label_item {
			display:inline-block;
			height: 0.53333rem;
			line-height: 0.53333rem;
			border-radius: 0.53333rem;
			color: #fff;
			background-color: #00D2C3;
			text-align: center;
			font-size: 0.32rem;
			padding: 0 0.21333rem;
			margin-right: 0.13333rem;
		}
	}
	.columns {
		.icon {
			display: inline-block;
			width: 0.53333rem;
			height: 0.53333rem;
			line-height: 0.53333rem;
			text-align: center;
			border-radius:50%;
			background-color: #00d2c3;
			color: #fff;
			margin-top:0.32rem;
			margin-right: 0.26667rem;
		}
	}
	.sec_services {
		padding: 0.96rem 0.53333rem 0.53333rem;
		.sec_services_item {
			width: 3.68rem;
			height: 2.0rem;
			padding-top: 0.66667rem;
			background-color: #f5f5f5;
			margin-right: 5px;
			i.icon {
				width: 1.14667rem;
				height: 1.14667rem;
				line-height: 0.88rem;
				border-radius: 50%;
				background-color: #00d2c3;
				border: 4px solid #fff;
				position: absolute;
				left: 50%;
				top: 0;
				z-index: 100;
				transform:translate(-50%,-50%) 
			}
		}
	}

	.service {
		.service_item {
			padding: 0.42667rem  0 0.42667rem  0.42667rem;
		}
		.icon {
			display: inline-block;
			width: 1.01333rem;
			height: 1.01333rem;
			line-height: 1.06667rem;
			font-size: 18px;
			text-align: center;
			border-radius: 50%;
			margin-right: 0.26667rem;
			vertical-align: top;
		}
	}
	.good_sections {
		.section_item:nth-child(2n-1) {
			float: left;
		}
		.section_item:nth-child(2n) {
			float: right;
		}
	}
	.rec_wrapper {
		padding: 0.53333rem 0.4rem;
	}
	.rec_item {
		width: 3.73333rem;
		margin-right: 0.13333rem;
		.img {
			height: 2.66667rem;
			width: 100%;
		}
	}	
	.error-icry {
		font-size: 2.66667rem;
		margin-top: 1.06667rem;
	}
</style>