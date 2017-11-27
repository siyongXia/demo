<template>
	<router-link :to="{path:'askdetail.html',query:{id:info.questionId,nyappshare:1}}" class="pl30 pb20 bor_b mt20 block" v-if="info.answer.content">
		<Question :question="info.content"></Question>
		<template >
			<Answer :answer="info.answer.content"></Answer>
			<div class="fs12 mb5">
				<img :src="info.answer.doctor.image " alt="" class="avatar" v-if="info.answer.doctorId != '0'">
				<img :src="info.answer.unit.image || 'http://static.91160.com/wechat/img/unit/bg_hos.png' " alt="" class="avatar" v-else>				
				<span v-if="info.answer.doctorId != '0'">{{info.answer.doctor.doctor_name}}</span>
				<span>{{info.answer.unit.unit_name}}</span>
			</div>
			<div class="fs12">
				<span class="bg_FEF mr10 pl5 pr5 c_333" v-if="info.answer.isBest === '1'">最佳答案</span>
				<span>回答时间：{{info.answer.addTime}}</span>
				<span class="fr">{{info.answerNum}}个回答</span>
			</div>
		</template>		
	</router-link>
</template>	
<script>
	import Question from '../components/Question.vue'
	import Answer from '../components/Answer.vue'
	export default {
		data(){
			return {

			}
		},
		methods:{
			
		},
		mounted(){
			
		},
		components:{
			Question,
			Answer
		},
		props:['info']
	}
</script>

<style scoped lang="scss">
	
	
	.avatar {
		width:0.37333rem;
		height:0.37333rem;
		border-radius:50%;
		overflow: hidden;
		vertical-align: bottom;;
	}

</style>