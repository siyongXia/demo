<template>
	<div class="clearfix1 healthindex">
		<x-header :left-options="{backText: ''}">选择城市</x-header>
		<div class="mt10 fs16">
			<scroller lock-x :height="scollHeight"  ref="scrollerArea" class="province fl ">
				<ul class="bg_gray" >
					<li v-for="(item,index) in area_names" :class="item.area_id == area_id ? 'bg_white typo_green':'' " @click="selectArea(item.areaId)">{{item.area_name}}</li>
				</ul>
			</scroller>
			<scroller lock-x :height="scollHeight"  ref="scrollerCity" class="city fl bg_white">
				<ul class="bg_white">
					<li v-for="(item,index) in citys" @click="selectCity(item.area_id,item.area_name)">{{item.area_name}}</li>
				</ul>
			</scroller>
		</div>
	</div>
</template>
<script>
	import { Scroller, XHeader } from 'vux'
	import { getClientInfo } from '../../utils/util.js'
	export default {
		data(){
			return {
				activeId:0,
				scollHeight:'',
				area_names:[],
				citys:[],
				area_id:0,
				backUrl:''
			}
		},
		watch:{
			area_id (now) {
				this.citys = this.area_names.filter((item,index)=>{
					return item.areaId == now ||  item.area_id == now;
				})[0].children;			
		        this.$nextTick(() => {//城市区域返回顶部
			      this.$refs.scrollerCity.reset({top: 0})
			    })
			}
		},
		methods:{
			selectArea(id) {
				this.area_id = id || 0;
			},
			selectCity(id,cityName) {
				var redirect = this.$route.query.redirect;
				this.$store.commit('healthindex/CHANGECITYNAME',cityName);
				// var category_id = window.sessionStorage.getItem('category_id',this.category_id);
				// this.$router.push({path:'../health/index.html?category_id='+category_id+'&city_id='+id})
				var query = Object.assign({},this.$route.query);
				delete query.redirect;
				query = Object.assign(query,{city_id:id,city_name:cityName})
				this.$router.push({name:redirect,query:query})
			},
			initScollHeight () {
				var clientInfo = getClientInfo();
				var ratio = clientInfo.clientWidth / 375;
				this.scollHeight = clientInfo.clientHeight - 56 * ratio + 'px';
			},
			getData () {
				this.$http.get('/main/cityList.html').then((data)=>{
					this.area_names = data.data.data;
					this.citys = this.area_names[0].children || []
				}).catch((err)=>{
					console.log(err);
				})
			}
		},
		mounted(){
			this.initScollHeight();
			this.getData();
			this.scrollerCity = this.$refs.scrollerCity;	
		},
		components:{
			XHeader,
			Scroller
		}
	}
</script>

<style scoped lang="scss">
	.bg_gray{
		background: #F9F9F9;
	}
	.province {
		width:33.33%;
		li {
			padding-left:0.53333rem;
		}
	}
	.city {
		width:66.67%;
		li {
			padding-left:0.69333rem;
		}
	}
	li {
		height:1.28rem;
		line-height:1.28rem;
	}
</style>