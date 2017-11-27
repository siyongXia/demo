<template>
	<div class="healthindex">
		<x-header :left-options="{backText: ''}"  v-if="!commonIsApp">匿名提问</x-header>
		<div class="project bg_white mb10 " :class="commonIsApp ? '':'mt10'">
			<div class="mb20 c_333 fs16">項目</div>		
			<Capsule :content="item.tagName" v-for="(item,index) in capsules" @click.native="select(index,item)" 
					:data-sd="item.tagId"
					:class="tags[item.tagId] ? 'active':''"
					class="mr10 mb12"></Capsule>
		</div>
		<PatientDesc @content="getContentLength"></PatientDesc>
		<button class="question_btn textc typo_white fs18" :class="canSubmit?'bg_green':'bg_gray'" @click="submit()">立即提问</button>
	</div>
</template>
<script>
	import { XHeader } from 'vux'
	import { Toast } from 'mint-ui'
	import { formateParams } from '../../utils/util.js'
	import Capsule from '../../components/common/Capsule.vue'
	import PatientDesc from './components/PatientDesc.vue'
	import { mapGetters } from 'vuex'
	export default {
		data(){
			return {
				selectId:-1,
				content:'',
				sec:'',
				canSubmit:false,
				tags:{},
				capsules:[],
				flag:true,
			}
		},
		computed:{
			...mapGetters([
				'commonIsApp'
			])
		},
		methods:{
			select (index,tag) {
				this.selectId = index;					
				if(!this.tags[tag.tagId]) {
					if( this.getCount() >= 5 ) {
						Toast({
							message:'最多只能选择5个标签',
							postion:'middle',
							classNmae:'c_white',
							duration: 2000
						})
						return;
					}
					this.$set(this.tags,tag.tagId,tag.tagName);
				}else {
					this.$set(this.tags,tag.tagId,'');
				}
				if(this.content.length >= 10) {
					this.canSubmit = true;
				}
			},
			getCount () {
				var count = 0;
				for(var k in this.tags) {
					if(this.tags[k]){
						count++;
					}
				}
				return count;
			},
			getContentLength (data) {
				this.content = data;
				if(this.content.length >= 10) {
					if(this.selectId != -1) {
						this.canSubmit = true;
					}
				}else {
					this.canSubmit = false;
				}
			},
			getQuestionTag () {
				var category_id = this.category_id;
				this.$http.get('/health/getquestiontag.html',{params:{category_id}}).then((data)=>{
					this.capsules = data.data.data;
				}).catch((err)=>{
					console.log(err)
				})
			},
			addQuestion (params) {
				window.sessionStorage.setItem('questionDesc',params.content);
				var value = formateParams(params);
				if(this.flag) {
					this.flag = false;
					  this.$http({
			            url: '/health/addquestion.html',
			            method: 'post',
			            data: value
			        })
			        .then((data) => {
			        	if(data.data.state === 1) {
			        		var id = data.data.data;
			        		this.flag = true;
			        		Toast({
								message:'提交成功',
								postion:'middle',
								classNmae:'c_white',
								duration: 1000
							})
							setTimeout(()=>{
			        			this.$router.push({path:'./beauty.html?category_id='+ this.firstCateId + '&sec='+this.sec})
			        			// 移除sessionStorage中的内容,防止新提问的时候还展示
			        			window.sessionStorage.removeItem('questionDesc');
							}, 2000);
			        	}else if(data.data.state === -1) {//登录
			        		window.sessionStorage.setItem('questionDesc',params.content);
			        		location.href = '/user/login.html?redirect_url='+encodeURIComponent(location.href);
			        	}else if(data.data.state === -2) {//完善资料

			        	}else {
			        		Toast({
								message:data.data.msg,
								postion:'middle',
								classNmae:'c_white',
								duration: 2000
							})
			        	}
			           console.log(data);
			        })
			        .catch((err) => {
			           console.log(err);
			        })
				}
			  
			},
			submit () {
				if(this.canSubmit) {
					var select = this.capsules[this.selectId],
						content = this.content,
						category_id = this.category_id,
						arr = [];
						for(var k in this.tags) {
							if(this.tags[k]) {
								arr.push({
									id:k,
									name:this.tags[k]
								})
							}
						}
					var tags = JSON.stringify(arr);
					this.addQuestion({tags,content,category_id})
				}
				
			}
		},
		mounted(){
			this.sec = this.$route.query.sec;
			this.category_id = this.$route.query.askCategoryId;
			this.firstCateId = this.$route.query.firstCateId		
			this.getQuestionTag();
		},
		components:{
			XHeader,
			Capsule,
			PatientDesc
		}
	}
</script>

<style scoped lang="scss">
	.mb12 {
		margin-bottom: 0.32rem;	
	}
	.project {
		padding:0.53333rem;
	}
	.bg_green {
		background-color: #00d2c3;
	}
	.bg_gray {
		background-color: #BEBEBE;
	}
	.active {
		border:  0.02667rem solid #00d2c3;
		color: #FFF;
		background-color: #00d2c3;
	}
	.question_btn {
		width:8.74667rem;
		height:1.17333rem;
		border-radius:0.58667rem;
		display:block;
		margin:1.06667rem auto 0;
	}
</style>