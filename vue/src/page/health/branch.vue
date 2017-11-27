<template>	
	<div class="wrap fullheight fullwidth clearfix" >
		<div class="mask" @touchmove="touchmove($event)"  @click="close()"></div>
		<div class="content" >
			<div class="box_title ">
				<span class="c_9b9b9b fs14 ">选择分院</span>
				<i class="fr  close" @click="close()">×</i>
			</div>
			<ul class="sections">
				<li v-for="item in list" class="relative mb10" @click="pullUpNativeHos(item.unit_id,item.class_id,item.group_id)">
					<div class="typo_black0 mb10">{{item.unit_name}}</div>
					<div class="elli"><i class="iconfont pr5">&#xe607;</i>{{item.address}}</div>
					<i class="iconfont right_icon">&#xe6d8;</i>
				</li>
			</ul>
		</div>
		
	</div>
		
	
</template>
<script>
	export default {
		data(){
			return {

			}
		},
		methods:{
			touchmove (e) {
				e.preventDefault();
			},
			close(){
				this.$emit('close');
			},
		   pullUpNativeHos (unit_id,class_id,group_id) { //拉取原生医院主页		   		
	            if ((typeof (mJavaScriptObject) == 'object')) {   
	            	var class_id = group_id > 0 ? 0: class_id;
	                mJavaScriptObject.funGotoHospitalHomePage(unit_id,class_id)
	            } else {
	                window.location.href = '/unit/dep.html?unit_id='+unit_id + '&class_id=' + class_id;
	            }  
	            this.$parent.isBranchBoxShow = false;   
	        },
		},
		mounted(){

		},
		props:['list']
	}
</script>

<style scoped lang="scss">
	.mask {
		position:fixed;
		width:100%;
		height:100%;
		background-color: #000;
		opacity: .4;
		top:0;
		left:0;
		z-index:10000;
	}
	.close {
	    font-size: 0.64rem;
    	margin-top: -0.13333rem;
	}
	.content {
		width:6.93333rem;
		background-color: #fff;
		border-radius: 0.26667rem;
		position:fixed;
		top:50%;
		left:50%;
		transform:translate(-50%,-50%);
		z-index:10001;
		.box_title {
			padding:0.32rem;
			border-bottom: 1px solid #dadada;
		}
		.sections {
			padding:0.32rem;
			max-height:300px;
			overflow:scroll;
		}
		.right_icon {
			position:absolute;
			font-size:0.53333rem;
			top:0.10667rem;
			right:0;
		}
		
	}
</style>