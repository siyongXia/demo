<template>
	<div>
		<NavigateBar :options="navigateBarOptions"  v-if="!commonIsApp"></NavigateBar>
		<div :class="{'hasNavigateBar':!commonIsApp}"></div>
		<div class="illu_wrap bg_white mt10 ">
			<div class="section" v-for="(item,index) in list">
				<h4 class="typo_black0 fs18 typo_normal" v-if="item.title">{{item.title}}</h4>
				<div class="typo_dgrey" v-html="item.desc"></div>
				<img :src="item.img" alt="" v-if="item.img" class="fullwidth">
			</div>
		</div>
	</div>
</template>
<script>
	import NavigateBar from '../../components/common/NavigateBar.vue';
	import {mapGetters} from 'vuex';
	export default {
		data(){
			return {
				navigateBarOptions:{
					iconLeftCode:'&#xe60e;',
					title:'打卡有礼',
					bgColor:'#fff',
					color:'#000'
				},
				list:[
					{
						title:'1、如何参加健康任务？',
						desc:'在任务列表中选择【添加】健康任务。',
						img:require('./images/img1.png')
					},
					{
						title:'2、所有健康任务都有奖吗？',
						desc:'不是哦。只有含<span class="red">奖</span>字的任务才有抽奖机会哦~。按任务周期天数每天打卡任务，全部完成即可获得抽奖机会啦。',
						img:require('./images/img2.png')
					},
					{
						title:'3、如果我没有坚持每天打卡，任务会终止吗？还能抽奖吗？',
						desc:'不会终止。每个健康任务的进度都会被系统记录下来，只要继续坚持打卡完成任务，还是可以参与抽奖哒。不过抽奖采取先到先得原则，坚持每天完成任务抽到奖的机率会更大哦。',
					},
					{
						title:'4、健康任务的奖品是什么？',
						desc:'健康任务会根据不同的任务设置相应的奖品，涵盖美肤美妆类、母婴类、保健类、体检服务类等等，价值各有不同，完成任务会有惊喜哟。',
					},
					{
						title:'5、打卡完成某健康任务后，可重新再添加该任务吗？',
						desc:'可以的。当完成某健康任务后，可重新再添加该任务。若该任务有奖，完成后可再进行抽奖。',
					},
					{
						title:'6、有奖的任务是不是固定都有奖的？',
						desc:'不是哦，小六会不定期创建新的健康任务，也会不定期地给不同的任务设置奖品。欢迎常来，惊喜好礼等着你哦。',
					},
					{
						desc:'如有疑问，请添加QQ群623107988联系我们。',
					}
				]
			}
		},
		computed:{
			...mapGetters([
				'isLoading',
				'commonIsApp'
			])
		},
		methods:{

		},
		mounted(){

		},
		components:{
			NavigateBar
		},
	}
</script>

<style scoped lang="scss">
	.red {
		color:red;
	}
	.illu_wrap {
		padding:0.72rem 0.53333rem 0.29333rem; 
		line-height:0.66667rem;
		.section {
			margin-bottom:0.66667rem;
		}
	}
</style>