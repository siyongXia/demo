<template>
	<div class="add_wrapper clearfix bg_white">
		<button class="fl bg_white typo_middle" @click="substract()">-</button>
		<input type="tel" v-model="count" class="fl">
		<button class="fr bg_white typo_middle" @click="add()">+</button>
	</div>
</template>
<script>
	import { Toast } from 'mint-ui';
	export default {
		data(){
			return {
				count:1
			}
		},
		mounted(){
			this.count = this.minCount;
		},
		methods:{
			add(){
				if(this.count < this.maxCount) {

					this.count++;
				}				
			},
			substract(){
				if(this.count > 1) {
					this.count--
				}				
			}
		},
		watch:{
			count(){
				if(this.count > this.maxCount){
					 Toast({
                        message: '数量不能超过库存',
                        position: 'middle',
                        duration: 2000
                    });
					this.count = 1;
					return;
				}
			   this.$emit('count',this.count);
			},
			minCount(){
				this.count = this.minCount
			}
		},		
		props:{
			maxCount:Number,
			minCount:Number
		}
	}
</script>
<style scoped lang="scss">
	.fl {
		float:left;
	}
	.fr {
		float:right;
	}
	.add_wrapper {
		height:0.69333rem;
		border: 2px solid #dbdbdb;
		width:2.50667rem;
		>button {
			display:inline-block;
			width:0.58667rem;
			height:0.58667rem;
			line-height:0.58667rem;
			&:active {
				background-color:rgba(0,0,0,0.1);
			}
		}
		>input {
			height:0.58667rem;
			line-height:0.58667rem;
			text-align: center;
			border-left:1px solid #dbdbdb;
			border-right:1px solid #dbdbdb;
			width:calc(100% - 1.17333rem);
		}
	}
</style>