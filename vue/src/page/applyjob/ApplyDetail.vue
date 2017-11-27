<template>
	<div>
		<div class="apply-detail border-gray">
			<div class="position-name">
				<div class="title">{{info.name}}</div>
				<div class="info clearfix mb10">
					<div class="address">工作地址:  {{$parent.place[info.place] && $parent.place[info.place].name}}</div>
					<div class="workyear">工作年限: {{info.years}}</div>
					<div class="category">职位类别: {{$parent.level[info.level] && $parent.level[info.level].name}}</div>
					<div class="count">招聘人数: {{ info.num == 0 ? '若干' :info.num }}</div>
					<div class="date">发布日期: {{info.publishDate}}</div>
					<div class="calary">薪资范围: {{info.salary}}</div>
				</div>
			</div>
			<div class="responsibility mb10">
				<div>岗位职责:</div>
				<ul>
					<li v-for="(item,index) in duty">{{item}}</li>
				</ul>
			</div>
			<div class="request">
				<div>岗位要求:</div>
				<ul>
					<li v-for="(item,index) in need">{{item}}</li>
				</ul>
			</div>
			<div class="btn-more"  @click="goBack()">
				收起<img :src="btnMore" alt="">				
			</div>
		</div>
	</div>
</template>	
<script>
	export default {
		data(){
			return {
				btnMore:require('./images/btn_more.png'),
				level:['技术类','运营类','服务类','销售类','产品/项目类','职能类','市场类'],
				place:['深圳南山','深圳宝安','深圳龙岗','深圳罗湖','东莞','广州','上海','海南'],
				duty:[],
				need:[],
				info:{					
				}
			}
		},
		mounted(){
			this.$parent.footShow = true;
			this.fetchData();
			var that = this;
		},
		methods:{
			fetchData(){
				var that = this;
				// var id = this.$route.params.id;
				var id = this.$route.query.id;
				this.$http.get('/act/jobdetail.html?id='+id)
					.then((response)=>{
						that.info = response.data.data;
						that.duty = response.data.data.duty.split('\r');
						that.need = response.data.data.need.split('\r');
					})
					.catch((err)=>{
						console.log(err);
					})
			},
			goBack(){
				this.$router.go(-1);
			}
		}
	}
</script>
<style lang = "less" scoped>
	.apply-detail {
		background-color: #fff;
		border-radius: 0.10667rem;
		margin: 0.13333rem 0.32rem 1.6rem;
		padding: 0.42667rem 0.32rem 0.26667rem;
		>.position-name {
			>.title {
				font-size: 0.42667rem;
				color: #333;
				margin-bottom: 0.32rem;
			}
			>.info {
				div {
					float: left;
					width: 50%;
					font-size: 0.32rem;
					height: 0.48rem;
					line-height: 0.48rem;
				}
			}
		}
		>.btn-more {
			text-align: center;
			font-size: 0.32rem;
			color: #b3b3b3;
			margin-top: 0.26667rem;
			>img {
				width: 0.24rem;
				height: 0.16rem;
				padding: 0 0.10667rem 0.13333rem 0.05333rem;
				transform: rotate(180deg);				
			}
		}
		
		
	}
</style>