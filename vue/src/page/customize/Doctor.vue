<template>
	<div class=" clearfix">
		<NavigateBar :options="navigateBarOptions"></NavigateBar>
		<scroller lock-x scrollbar-y use-pullup  :height="scrollHeight" @on-pullup-loading="loadMore" ref="scroller">
			<div class="mb10 pt20 bg_white mb10" >
				<Doctor v-for="(item,index) in docList" :info="item"></Doctor>
			</div>
			<!--pullup slot-->
			<div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
				<span v-show="status.pullupStatus === 'default'"></span>
				<span class="pullup-arrow" v-show="status.pullupStatus === 'down' || status.pullupStatus === 'up'" :class="{'rotate': status.pullupStatus === 'up'}">↑</span>
				<span v-show="status.pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
				<div  v-show="status.pullupStatus === 'done'" class="pt20 lh20 typo_gray textc mb10">没有更多啦～</div>	
			</div>
		</scroller>			
	</div>		
	
</template>
<script>
	import { Scroller, Spinner } from 'vux'
	import { getScrollHeight } from '../../utils/util.js'
	import Doctor from './components/Doctor.vue'
	export default {
		data(){
			return {
				navigateBarOptions:{
					iconLeftCode:'&#xe60e;',
					title:'名医推荐',
					bgColor:'#00d2c3',
					color:'#fff',
					iconClass:"#fff"
				},
				status: {
			       pullupStatus: 'default',
			       pulldownStatus: 'default'
			    },
			    scrollHeight:'',
				unit_id:'',
				docList:[],
				page:1,
				totalPage:1
			}
		},
		methods:{
			getData(params){
				this.$http.get('/api/unit/recommendDoctor',{params,params})
				.then((data)=>{
					if(params.page === 1) {
						this.totalPage = data.data.data.totalPage;
					}
					this.docList = this.docList.concat(data.data.data.data);
					this.status.pullupStatus= 'default';
					this.$refs.scroller.donePullup()
				})
			},
			loadMore () {
				this.status.pullupStatus= 'loading'
				this.page++;
				if(this.page <= this.totalPage) {
					this.getData({id:this.unit_id,page:this.page});
				}else {
					this.status.pullupStatus= 'done';
					this.$refs.scroller.donePullup()
				}
			}
		},
		mounted(){
			this.scrollHeight = getScrollHeight(48);
			this.unit_id = this.$route.query.unit_id;
			this.getData({id:this.unit_id,page:this.page});
		},
		components:{
			Scroller,
			Spinner,
			Doctor
		}
	}
</script>

<style scoped lang="scss">
	
</style>