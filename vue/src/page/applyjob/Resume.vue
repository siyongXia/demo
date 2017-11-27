<template>
	<div>
		<form  method="POST">
		<!-- 基本信息 -->
			<div class="title baseinfo">基本信息 <span>(必填)</span>
			</div>
			<ul class="baseinfo">
				<li>
					<label>应聘岗位</label>
					<input class="tar" type="text" name="job_name" v-model="jobName" required placeholder="请填写">
				</li>
				<li>
					<label>手机号码</label>
					<input class="tar" type="tel" name="phone" v-model="phone"  required placeholder="请填写">
				</li>
				<li>
					<label>电子邮箱</label>
					<input class="tar" type="email" name="email" v-model="email" required placeholder="请填写">
				</li>
				<li>
					<label>姓名</label>
					<input  class="tar" type="text" name="truename" v-model="truename" required placeholder="请填写" >
				</li>
				<li @click="selectSex()">
					<label>性别</label>
					<div class="replace">{{sex}}</div>
					<input  class="hidden" type="text" name="sex" required v-model="sex" placeholder="请选择">
					<img class="arrow" :src="btnMore"></img>
				</li>
				<li>
					<label>毕业院校</label>
					<input  class="tar" type="text" name="school" v-model="school" required placeholder="请填写">
				</li>
				<li>
					<label>专业</label>
					<input  class="tar" type="text" name="major" v-model="major" required placeholder="请填写" >
				</li>
				<li style="border:none;" @click="selectDegree()">
					<label>最高学历</label>
					<div class="replace tar">{{education}}</div>
					<img class="arrow" :src="btnMore"></img>
					<input class="hidden" type="text" name="education" required :value="education" placeholder="请选择">
				</li>	
			</ul>	
		<!--  任职经历-->
			<template v-if="jobType == 0">
				<div class="title">任职经历 <span>(必填)</span></div>
				<div>
					<ul class="experience" v-for="(item,index) in workExp ">
						<li class="delete" v-show="index !=0" @click="delExp(index)">
							<span>×</span> 删除
						</li>
						<li>
							<label>当前公司</label>
							<input  class="tar" type="text" name="company" v-model="item.curCompany" required placeholder="请填写">			
						</li>
						<li>
							<label>当前职位</label>
							<input  class="tar" type="text" name="curposition" v-model="item.curPosition" required placeholder="请填写">		
						</li>
						<li class="duration" style="border:none;">
							<label class="mr10">任职时间</label>
							<div class="mr8 tar start-time" @click="selectStartTime(index)" >{{workExp[index].startTime}}</div>
							<span class="tip">至</span>
							<div class="ml8 tal" @click="selectEndTime(index)" >{{workExp[index].endTime}}</div>	
						</li>
					</ul>
				</div>
				<div class="more-experience" @click="addExp()">添加更多任职经历</div>	
			</template>
			<template v-else>
				<div class="title">在校经历  <span>(必填)</span></div>
				<div class="experience p20 bg_white">
					<textarea name="" id="" class="fullwidth textarea" placeholder="请输入您的在校经历。。。" v-model="school_experience"></textarea>
				</div>
			</template>
			<input class="submit" type="button" value="保存并应聘" @click="applyJob">
		</form>
	</div>
</template>
<script>
	import Vue from 'vue'
	import weui from '../../plugins/weui/js/weui.js'
	import '../../plugins/weui/style/weui.min.scss';
	import autosize from '../../plugins/autosize.min.js'
	import { Toast } from 'mint-ui'
	var startYear = 1980,endYear = 2017,years=[],
		startMon = 1,endMon = 12,months = [];

	for(var i = startYear; i <= endYear ; i++) {
		years.push(i);
	} 
	for(var j = startMon; j <= endMon;j++) {
		months.push(j);
	} 
	years = years.map((value,index)=>{
		return {
			label:value +'年',
			value:value
		}
	});
	months = months.map((value,index)=>{
		return {
			label:value +'月',
			value:value
		}
	})
	export default {
		data(){
			return {
				btnMore:require('./images/btn_more.png'),
				jobId:'',
				job_name:'',
				phone:'',
				jobType:'',
				email:'',
				school_experience:'',
				truename:'',				
				sex:'请选择',
				school:'',
				major:'',
				jobName:'',
				education:'请选择',
				sexList:[
					{label:'男',value:1},
					{label:'女',value:2}
				],
				degreeList:[
					{label:'初中',value:1},
					{label:'中技',value:2},
					{label:'中专',value:3},
					{label:'高中',value:4},
					{label:'大专',value:5},
					{label:'本科',value:6},
					{label:'硕士',value:7},
					{label:'博士',value:8},
				],
				workExp:[
					{
						curCompany:'',
						curPosition:'',
						startTime:'选择开始时间',
						endTime:'选择结束时间'
					}
				]
			}
		},
		mounted(){
			this.jobType = this.$route.query.type || 0;
			this.getJobId();
			this.getJobName();
			this.initTextarea();
		},
		methods:{
			addExp(){
				this.workExp.push({
						curCompany:'',
						surPosition:'',
						startTime:'选择开始时间',
						endTime:'选择结束时间'
					})
			},
			initTextarea(){
				setTimeout(()=>{
					autosize(document.querySelectorAll('textarea'));
				},500)
			},
			delExp(id){
				this.workExp.splice(id,1);
			},
			getJobId(){
				// this.jobId = this.$route.params.jobid;
				this.jobId = this.$route.query.id;
			},
			selectSex(){
				var that = this;
				Vue.nextTick(function(){
					 weui.picker(that.sexList, {
			             className: 'custom-classname',
			             defaultValue: [1],
			             onConfirm: function (result) {
			             	that.sex = result[0].label;
			             },
			             id: 'singleLinePicker'
			          });
				})

			},
			selectDegree(){
				var that = this;
				Vue.nextTick(function(){
					 weui.picker(that.degreeList.reverse(), {
			             className: 'custom-classname',
			             defaultValue: [6],
			             onConfirm: function (result) {
			             	that.education = result[0].label;
			             },
			             id: 'singleLinePicker'
			          });	
				})						
			},
			selectStartTime(id){
				var that = this;
				Vue.nextTick(function(){
					weui.picker(years, months, {
					    defaultValue: ['2014年', '6月'],
					    onConfirm: function (result) {
					       that.workExp[id].startTime = result[0].value+'/'+result[1].value;
					    },
					    id: 'multiPickerBtn'
					});
				})
			},
			selectEndTime(id) {
				var that = this;
				Vue.nextTick(function(){
					weui.picker(years, months, {
					    defaultValue: ['2016年', '6月'],
					    onConfirm: function (result) {
					       that.workExp[id].endTime = result[0].value+'/'+result[1].value;
					    },
					    id: 'multiPickerBtn'
					});
				})
			},
			goBack(){
				this.$router.push({path:'vue/.html'});
			},
			getJobName(id){
				var that = this;
				var id = this.$route.query.id;
				this.$http.get('/act/jobdetail.html?id='+id)
					.then((response)=>{
						this.jobName = response.data.data.name;
					})
					.catch((err)=>{
						console.log(err);
					})
			},
			applyJob(){
				var that = this;
				var experience = '' ;
				if(this.jobType == 0) {
					var arr = [];
					arr.push('(');
					var experience = this.workExp.forEach((item,index)=>{
						arr.push(index);
						for(var key in item) {
							arr.push( key + ':' + item[key]);
						}
					});
					arr.push(')');
					experience = arr.join(',');
				}else {
					experience =  this.school_experience;
				}
			
				if(! (/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(this.phone))){
					Toast({
						message:'请填写正确的手机号',
						duration:2000,
						className:'c_white',
						position:'middle'
					})
					return;
				};
				if(!(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.email))){
					Toast({
						message:'请填写正确的邮箱',
						duration:2000,
						className:'c_white',
						position:'middle'
					})
					return;
				}
				if(!experience) {
					let str = this.jobType == 1 ? '请填写您的在校经历':'请填写您的任职经历'
					Toast({
						message:str,
						duration:2000,
						className:'c_white',
						position:'middle'
					})
					return;
				}
				var datas = {
						id:Number(this.jobId),
						job_name:this.jobName,
						phone:this.phone.toString() ,
						email:this.email,
						truename:this.truename,
						sex:this.sex,
						school:this.school,
						major:this.major,
						education:this.education,
						experience:experience
					},
					value = [];
				for(var key in datas) {
					value.push(key + '=' + datas[key]);
				}
				this.$http({
					method:'post',
					url:'/act/applyjob.html',
					data:value.join('&')			
					
				})
				.then((response)=>{
					if(response.data.state == 1) {

						weui.toast('简历投递成功', {
						    duration: 2000,
						    className: 'custom-classname',
						    callback: function(){ 
						    	location.href = '/apply/index.html';
						    }
						});
					}else {
						Toast({
							message:'请填写正确的信息',
							duration:2000,
							className:'c_white',
							position:'middle'
						})
					}
				})
				.catch((err)=>{
					console.log(err)
				})
			}
		}
	}
</script>
<style lang= "scss" scoped>
	.p20 {
		padding: 0.53333rem;
	}
	.textarea {
		resize: none;
		min-height: 5.33333rem;
		padding: 0.26667rem;
		border: 1px solid #ccc;
		border-radius: 0.21333rem;
	}
	.title {
		padding: 0.50667rem 0 0.08rem 0.48rem
		;
		font-size:0.34667rem;
		color: #a7a7a7;
		position: relative;
		span {
			color: #00caba;
			font-weight: 700;
		}
		>.his-back {
			position: absolute;
			right: 0.4rem;
			top: 0.29333rem;
			font-size: 0.48rem;
			;
			color: #a7a7a7;
			padding: 0 0.26667rem; 
		}
	}
	ul {
		background-color: #fff;		
		overflow: hidden;
		li {
			position: relative;
			display: flex;
			line-height: 1;
			height: 0.42667rem;
			box-sizing: border-box;
			margin: 0px 0px 0px 0.53333rem;
			box-sizing: border-box;
			height: 1.33333rem;	
			line-height: 1.33333rem;
			padding-bottom: 0.48rem
			;
			padding-right: 0.69333rem;
			border-bottom: 1px solid #ccc;	
			font-size: 0.37333rem;
			.arrow {
				position: absolute;
				right: 0.32rem;
				top: 0.58667rem;
				width: 0.24rem;
				height:0.16rem;
				transform:rotate(-90deg);
			}			
			.tar {
				text-align: right;
			}
			label {
				display: inline-block;
				width: 70px;
				float: left;
				color: #333;
			}
			input {
				font-size: 0.34667rem;
				color: #666;
				overflow: hidden;
				flex: 1;
				box-sizing: border-box;
				padding-left: 0.53333rem;
				height: 1.06667rem;
				line-height: 1.33333rem;
			}	
			> .tip {				
				color: #d1d1d1;
			}
		}
		li.duration {
			position: relative;
			label {
				margin-right: 0.48rem
				;
			}
			.start-time {
				margin-left: 2.13333rem;
			}
			>div {
				display: inline-block;
				width: 2.08rem;
				font-size: 0.34667rem;
				color: #d1d1d1;
			}
			.start {
				margin-left: 0.64rem;
			}
			>input {
				width: 0;
				height: 0;
				padding: 0;
			}
			.ml8{
				margin-left: 0.21333rem;
			}
			.mr8{
				margin-right: 0.21333rem;
			}
			.tip {
				color: #4a4a4a;
			}
		}

	}
	.more-experience {
		width:3.73333rem;
		height: 0.8rem;
		font-size: 0.32rem;
		margin: 0.32rem auto 1.01333rem;
		line-height: 0.8rem;
		border:1px solid #a7a7a7;
		border-radius:0.4rem;
		text-align: center; 
		color: #a7a7a7;
	}
	.submit {
		display: block;
		width: 100%;
		background:#00caba;
		height:1.36rem;
		text-align: center;
		color: #fff;
		font-size: 0.42667rem;
		margin-top: 0.29333rem;
	}
	ul.experience {
		margin-bottom: 0.13333rem;
		li.delete {
			color:red;
			span {
				display: inline-block;
				background-color: red;
				width: 0.42667rem;
				height: 0.42667rem;
				line-height: 0.42667rem;
				text-align: center;
				border-radius: 50%;
				color: #fff;
				font-size: 0.32rem;
				margin-top: 0.37333rem;
				margin-right: 0.13333rem;
			}
		}
	}
	.hidden {
		width: 0 !important;
		height: 0;
		padding: 0;
		visibility: hidden;
	}
	.replace {
		position: absolute;
		right: 0.72rem;
		top: 0px;
		font-size: 0.34667rem;
		color: #A9A9A9;
	}
	.weui-toast__content {
		text-indent: 0 !important;
	}

</style>