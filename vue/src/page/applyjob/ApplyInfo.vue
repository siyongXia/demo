<template>
	<div >
		<div class="applyInfo swiper-container" >
	      <ul v-if="positionInfoList.length != 0">
	        <li v-for="(item,index) in positionInfoList" 
	        	:key="index" @click="select(index,item.name,item.id)" 
	        	:class="{'active':isSelected == index}">
	        	<router-link v-bind="{to:'applydetail.html?id='+item.id}" class="block pb10">
	        		 <div class="title">{{item.name}}</div>
			         <div class="info clearfix tl">
			            <div class="addrress">
			              <span>工作地点:</span> {{$parent.place[item.place] && $parent.place[item.place].name}}
			            </div>
			            <div class="work-year">
			              <span>工作年限:</span> {{item.years}}
			            </div>
			            <div class="category">
			              <span>职位类别:</span> {{$parent.level[item.level] && $parent.level[item.level].name}}
			            </div>
			            <div class="count">
			              <span>招聘人数:</span> {{item.num == 0 ?  '若干': item.num + '人' }}
			            </div>
			         </div>
	        	</router-link>
	        	
		       <!--  <router-link v-bind="{to:'applydetail.html?id='+item.id}">
		        	  <img src="./images/btn_more.png" alt="">
		        </router-link>	    -->      
	        </li>	        
	      </ul>
	      <ul v-else>
	      	<li>
	      		<div>就医160惹你了?招你了!</div>
	      		<div class="wrap flex  mt10 " >
	      			<img src="./images/img_logo_s.png"  alt="" style="width:80px;height:80px;" class="pr10">
	      			<div class="flex-item">1年前我对他说:你有才华又长得帅,我们来签份合同。如今他带了一群人...</div>
	      		</div>	      		
	      	</li>
	      </ul>
	    </div>
	</div>
</template>
<script>
	import Vue from 'vue'
	import {mapGetters} from 'vuex'
	export default {
		data(){
			return {
				btnMore:require('./images/btn_more.png'),
				imgLogo:require('./images/img_logo_s.png'),
				isSelected:-1,
				level:['技术类','运营类','服务类','销售类','产品/项目类','职能类','市场类'],
				place:['深圳南山','深圳宝安','深圳龙岗','深圳罗湖','东莞','广州','上海','海南']
			}
		},
		watch:{
			$route(to){
				this.getPositionInfoList();
			}
		},
		computed:{
			...mapGetters([
				'headShow',
				'positionInfoList'
			])
		},
		mounted(){
			this.$parent.footShow = false;
			this.getPositionInfoList();
		},
		methods:{
			getPositionInfoList(){
				var level = this.$route.query.level || 0;
				var place = this.$route.query.place || 0;
				var type = this.$route.query.type || 0;
				this.$store.dispatch('APPLY_INFO_LIST',{params:{level,place,type}});
			},
			select(index,jobName,jobId){
				this.isSelected = index;
				this.$parent.$data.jobName = jobName;
				this.$parent.$data.jobId = jobId;
			}
		}
	}
</script>
<style scoped lang = "scss" >
	 .applyInfo {
	    margin: 0.24rem 0.32rem 2.4rem;
	    >ul{
	      >li {
	      	box-sizing: border-box;
	      	border: 1px solid #e6e6e6;
	        border-radius: 0.10667rem;
	        background-color: #fff;
	        margin-bottom: 0.32rem;
	        padding: 0.42667rem 0.32rem 0.16rem 0.42667rem;
	        &.active {
	        	border: 1px solid #00e6d3;
	        }
        	.title {
	          font-size: 16px;
	          color: #333;
	          text-align: left;
	        }
	        .info {
	          margin-top: 0.32rem;
	          div {
	          	color: #666;
	            float:left;
	            width: 50%;
	            font-size: 0.32rem;
	            height: 0.48rem;
	            line-height: 0.48rem;
	          }
	          div:nth-child(2n) {
	            box-sizing: border-box;
	            padding-left: 0.26667rem;
	          }
	        }
	       	a {
	       		display: block;
	       		padding-top:0.13333rem;
	       		text-align: center;
	       		font-size: 0.26667rem;
	       		color: #b3b3b3;
	       		>span {
	       			padding-right: 2px;
	       		}
	       		>img {
		          width: 0.24rem;
		          height:0.16rem;
		          margin: 0.21333rem auto;
	       		 }
	       	}
      }
    } 
  }
  .defalut-img {
  	width: 1.52rem;
  	height: 1.49333rem;
  	margin-right: 0.26667rem;
  }
</style>