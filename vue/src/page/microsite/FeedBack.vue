<template>
	<div class="hospital-feedback">
		<div class="total-comment">
			<h3 class="lh24 typo_xlarge">总体评价</h3>
			<div class="comment clearfix">
				<span class="iconfont" v-for="(item,index) in 8" 
					  :class="{'active':index < total}" 
					  @click="evaluateTotal(index)">&#xe628;</span>
			</div>
		</div>
		<div class="items">
			<div>
				<label>就医环境</label>
				<span class="iconfont pr10 " v-for="(item,index) in 5" 
					  :class="{'active':index < environment}" 
					  @click="evaluateEnv(index)">&#xe628;</span>
			</div>
			<div>
				<label>服务态度</label>
				<span class="iconfont pr10" v-for="(item,index) in 5" 
					  :class="{'active':index < attitude}" 
					  @click="evaluateAtt(index)">&#xe628;</span>
			</div>
			<div>
				<label>等候时间</label>
				<span class="iconfont pr10" v-for="(item,index) in 5" 
					  :class="{'active':index < waitTime}" 
					  @click="evaluateTime(index)">&#xe628;</span>
			</div>
		</div>
		<div class="exp">
			<textarea placeholder="请写下你的就医经验"></textarea>
			
		</div>
		<input type="button" value="提交" class="submit">
	</div>
</template>

<script>
	export default {
		data(){
			return {
				environment:0,
				attitude:0,
				waitTime:0,
				total:0
			}
		},
		methods:{
			evaluateEnv(index){
				this.environment = index + 1;
			},
			evaluateAtt(index){
				this.attitude = index + 1;
			},
			evaluateTime(index){
				this.waitTime = index + 1;
			},
			evaluateTotal(index){
				this.total = index + 1;
			}
		}
	}
</script>

<style scoped lang = 'scss'>
	.hospital-feedback {
		overflow: hidden;
		text-align: center;

		>.total-comment {
			h3{
				color: #9b9b9b;
				font-weight: normal;
				line-height: 0.64rem;
				margin-top: 0.8rem;
			}
			.comment {
				width: 5.33333rem;
				margin: 0 auto;
				text-align: center;
				padding: 0.16rem 0;
				>span {
					font-size: 0.85333rem;
					color: #ced4da;
					float: left;
					line-height: 1;
					padding-bottom: 0.13333rem;
					margin: 0 0.1066rem;
				}
			}
		}
		>.items {
			background-color: #f6f6f6;
			color: #9b9b9b;
			padding: 0.4rem 0;
			margin-top: 0.26667rem;
			margin-bottom: 0.26667rem;
			label {
				font-size: 0.42667rem;
				line-height: 0.74667rem;
				min-width:1.6rem; 
    			color: #9b9b9b;
			}
			span {
				font-size: 28px;
				color: #ced4da;
			}
		}
		>.exp {
		    width: 240px;
		    padding-top: 10px;
		    height: auto;
		    margin: 0 auto;
		    margin-top: 18px;
		    border-bottom: solid 1px #f1f1f1;
		    color: #fff;
		    background: #fff;
		    >textarea {
		    	resize: none;
	    	    width: 240px;
	    	    overflow-y: hidden;
			    border: none;
			    text-align: center;
			    font-size: 16px;
			    color: #9b9b9b;
		    }

		}
		>.submit {
		    height: 38px;
		    padding: 0 2.4rem;
		    border: solid 1px #00d3c2;
		    border-radius: 19px;
		    line-height: 38px;
		    font-size: 0.48rem;
		    color: #00d3c2;
		    background: #fff;
		}
	}
	.iconfont.active {
		color:#ffe101 !important;
	}
</style>