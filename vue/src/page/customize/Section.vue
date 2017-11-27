<template>
	<div>
		<NavigateBar :options="navigateBarOptions"></NavigateBar>		
		<scroller lock-x scrollbar-y use-pullup  :height="scrollHeight" @on-pullup-loading="loadMore" ref="scroller">
			<div class="container pt20 pb10 bg_white good_sections clearfix1 mb10" >
				<GoodSection v-for="(item,index) in sectionList" :section="item"></GoodSection>
			</div>
			<!--pullup slot-->
			<div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
				<span v-show="status.pullupStatus === 'default'"></span>
				<span class="pullup-arrow" v-show="status.pullupStatus === 'down' || status.pullupStatus === 'up'" :class="{'rotate': status.pullupStatus === 'up'}">↑</span>
				<span v-show="status.pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
			</div>
		</scroller>	
	</div>
	
</template>
<script>
	import Vue from 'vue'
	import GoodSection from './components/GoodSection.vue'
	import { getScrollHeight } from '../../utils/util.js'
	import { Scroller, Spinner } from 'vux'
	import { Toast } from 'mint-ui'
	export default {
		data(){
			return {
				navigateBarOptions:{
					iconLeftCode:'&#xe60e;',
					title:'优势科室',
					bgColor:'#00d2c3',
					color:'#fff',
					iconClass:"#fff"
				},
				sectionList:[],
				status: {
			       pullupStatus: 'default',
			       pulldownStatus: 'default'
			    },
			    scrollHeight:'',
			    page:1,
			    unit_id:'',
			    lock:false
			} 
		},		
		methods:{
			loadMore () {
				this.status.pullupStatus= 'loading'
				this.page++;
				if(this.page <= this.totalPage) {
					this.getData({id:this.unit_id,page:this.page});
				}else {		
					Toast({
                        message: '没有更多数据',
                        position: 'middle',
                        duration: 1000,
                        className: 'c_white'
                    });		
					this.status.pullupStatus= 'done';
					this.$refs.scroller.donePullup()
				}
			},
			getData (params) {
				if(!this.lock) {
					this.lock = true;
					this.$http.get('/api/unit/recommendDepartment',{params})
					.then((data)=>{
						if(data.status == 200) {
							this.lock = false;
							this.sectionList = this.sectionList.concat(data.data.data.data);
							this.$refs.scroller.donePullup();
							if(params.page == this.current_page) {
								this.totalPage = parseInt(data.data.data.totalPage);
							}
						}
					})
					.catch((error)=>{
						console.log(error);
					})
				}
				
			}
		},
		mounted(){	
			this.scrollHeight = getScrollHeight(48);
			this.current_page = this.$route.query.page || 1;
			this.unit_id = this.$route.query.unit_id;
			this.getData({id:this.unit_id,page:this.page});			
		},
		components:{
			GoodSection,Scroller, Spinner
		}
	}
</script>

<style scoped lang="scss">
	.good_sections {
		.section_item:nth-child(2n-1) {
			float: left;
		}
		.section_item:nth-child(2n) {
			float: right;
		}
	}
	.container {
		padding-left: 0.4rem;
		padding-right: 0.4rem;
	}
</style>
