<template>
	<div class="healthindex" v-title data-title="推荐医院">
		<x-header :left-options="{backText: ''}">推荐医院
			<router-link :to="{path:'select.html',query:{category_id:category_id,ordering:ordering,sec:sec}}" slot="right" class="typo_green fs16 c_333">筛选</router-link>
		</x-header>  
		<scroller lock-x scrollbar-y use-pullup  :height="scrollHeight" @on-pullup-loading="loadMore" ref="scroller">
			<div>
				<div class="mt10" v-if="hosList && hosList.length > 0">
					<HosService v-for="(item,index) in hosList" :info="item" :distance="ordering == 1 ? item.distance:CoolWPDistance(lat,lng,item.lat,item.lng)"></HosService>

				</div>
				<div v-if="!hasData" class="pt15 ypo_gray textc pb15 textc  bg_white mt10" >
					<img src="../../static/nodata1.png" alt="" class="health_nodata">
					<div class="mt10">暂无数据</div>
				</div>	
			</div>
			
			<!--pullup slot-->
			<div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
				<span v-show="status.pullupStatus === 'default'"></span>
				<span class="pullup-arrow" v-show="status.pullupStatus === 'down' || status.pullupStatus === 'up'" :class="{'rotate': status.pullupStatus === 'up'}">↑</span>
				<span v-show="status.pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
				<div  v-show="status.pullupStatus === 'done' && hosList.length > 0" class="pt10 lh20 typo_gray textc pb10">没有更多啦～</div>	
			</div>
		</scroller>	
		
		<BottomAd :info="unitBottomAd" cookieName="hosBottomAdd" v-if="unitBottomAd.image"></BottomAd>
	</div>
	
</template>
<script>
	import { XHeader } from 'vux'
	import BottomAd from './components/BottomAd.vue'
	import HosService from './components/HosService.vue'
	import { mapState,mapActions } from 'vuex'
	import { MP } from '../../plugins/BMap.js'
	import { CoolWPDistance, readCookie, setCookie, getScrollHeight } from '../../utils/util.js'
	import { Scroller, Spinner } from 'vux'
	export default {
		data(){
			return {
				lat:'',
				lng:'',
				hosList:[],
				page:1,
				category_id:'',
				sec:'',//二级栏目id
				ordering:0,
				hasData:true,
				allLoaded:false,
				status: {
			       pullupStatus: 'default',
			       pulldownStatus: 'default'
			    },
			    scrollHeight:'',
			}
		},	
		methods:{
			...mapActions('healthindex',[
				'getCategoryAndAdd'
			]),
			getData (params) {
				let { category_id ,page, lat, lng, ordering } =  params ;
				this.$http.get('/health/getrecunit.html',{params:{category_id ,page, lat, lng, ordering}}).then((data)=>{
					if(data.data.state === 1) {
						if(params.loadMore) {
							this.hosList = this.hosList.concat(data.data.data);	
						}else {
							this.hosList = data.data.data;	
							if(this.hosList.length === 0 ) {
								this.hasData = false;
							}
						}
						if(data.data.data.length < 5) {//全部加载完成
							this.allLoaded = true;							
						}	
						this.status.pullupStatus= 'done';
						this.$refs.scroller.donePullup()			
					}
				}).catch((err)=>{
					console.log(err);
				})
			},
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
									setCookie('currentLat', currentLat,0.1);
									setCookie('currentLon', currentLon,0.1);
									callback(currentLat,currentLon);
								}
							});
						}
			        })
			    })			
			},	
			loadMore () {
				this.status.pullupStatus= 'loading'
				this.page++;
				if(!this.allLoaded) {
					if(this.ordering == 1) {
						this.getData({category_id:this.category_id,page:this.page,loadMore:1,lat:this.lng,lng:this.lat,ordering:this.ordering});
					}else {
						this.getData({category_id:this.category_id,page:this.page,loadMore:1,ordering:this.ordering});
					}
				}else {					
					this.status.pullupStatus= 'done';
					this.$refs.scroller.donePullup()
				}
			},
			CoolWPDistance:CoolWPDistance
		},
		mounted(){
			this.scrollHeight = getScrollHeight(46);
			this.category_id = this.$route.query.category_id;			
			this.sec = this.$route.query.sec;
			this.ordering = this.$route.query.ordering || 0;
			var category_id = this.category_id,lat,lng;
			if(this.sec && this.sec !== '0') {
				category_id = this.sec;
			}	
			if(readCookie('currentLat')) {
				this.lat = readCookie('currentLat') || '';
				this.lng = readCookie('currentLon') || '';
			}else {
				this.getLatAndLng((lat,lng)=>{
					this.lat = lat;
					this.lng = lng;		
				});
			}
			if(this.ordering == 1) {
				//后台接口要求传的经纬度是反的							
				this.getData({category_id:category_id,page:1,lat:this.lng,lng:this.lat,ordering:this.ordering});
			}else {
				this.getData({category_id:category_id,page:1,ordering:this.ordering});
			}			
			this.getCategoryAndAdd({category_id:this.category_id})
			
		},
		computed:{
			...mapState('healthindex',[
				'unitBottomAd'
			])
		},
		components:{
			XHeader,
			HosService,
			BottomAd, 
			Scroller, 
			Spinner
		}
	}
</script>

<style scoped lang="scss">
	
</style>