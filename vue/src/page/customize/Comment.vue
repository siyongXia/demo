<template>
	<div class=" clearfix">
		<NavigateBar :options="navigateBarOptions"></NavigateBar>
		<scroller lock-x scrollbar-y use-pullup  :height="scrollHeight" @on-pullup-loading="loadMore" ref="scroller">			
			<div class="mb10  bg_white mb10" >
				<div class="clearfix1 bg_white pt10 pb10 bor_b">
					<div class="fl score_item">
						<span>治疗效果</span>
						<p class="c06c7b4">{{scores.cure_score}}</p>
					</div>
					<div class="fl score_item">
						<span>医生态度</span>
						<p  class="c06c7b4">{{scores.attitude_score}}</p>
					</div>
					<div class="fl score_item">
						<span>医院服务</span>
						<p  class="c06c7b4">{{scores.services_score}}</p>
					</div>
					<div class="fl score_item">
						<span>就诊环境</span>
						<p  class="c06c7b4">{{scores.environment_score}}</p>
					</div>
				</div>
				<PatientComment v-for="(item,index) in commenList" :comment="item"></PatientComment>
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
	import PatientComment from './components/PatientComment.vue'
	export default {
		data(){
			return {
				navigateBarOptions:{
					iconLeftCode:'&#xe60e;',
					title:'患者评价',
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
				commenList:[],
				page:1,
				totalPage:1,
				scores:{}
			}
		},
		methods:{
			getCommentList(params){
				this.$http.get('/api/unit/comments',{params,params})
				.then((data)=>{
					if(params.page === 1) {
						this.totalPage = data.data.data.totalPage;
						this.scores = data.data.data.score;
					}
					this.commenList = this.commenList.concat(data.data.data.items);
					this.status.pullupStatus= 'default';
					this.$refs.scroller.donePullup()
				})
			},
			loadMore () {
				this.status.pullupStatus= 'loading'
				this.page++;
				if(this.page <= this.totalPage) {
					this.getCommentList({id:this.unit_id,page:this.page});
				}else {
					this.status.pullupStatus= 'done';
					this.$refs.scroller.donePullup()
				}
			}
		},
		mounted(){
			this.scrollHeight = getScrollHeight(48);
			this.unit_id = this.$route.query.unit_id;
			this.getCommentList({id:this.unit_id,page:this.page});
		},
		components:{
			Scroller,
			Spinner,
			PatientComment
		}
	}
</script>

<style scoped lang="scss">
	.score_item {
		width:25%;
		text-align: center;
	}
	.c06c7b4 {
		color:#06c7b4;
	}
	.bor_b {
		border-bottom: 1px solid #f1f1f1;
	}
</style>