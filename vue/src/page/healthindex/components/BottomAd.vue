<template>
	<div class="add " ref="add" v-drag="greet" :class="isTransiton ? 't':''" v-if="isAddShow" >
		<a :href="info.url">
			<img :src="info.image" alt="">			
			<!-- <img :src="img" alt="">			 -->
		</a>
		<div class="close mt5" id="close">&times;</div>
	</div>
</template>
<script>
	import { readCookie, setCookie } from '../../../utils/util.js'
	export default {
		data(){
			return {
				add:'',	
				isTransiton:false,	
				isAddShow:true,	
			}
		},
		methods:{
			bindEvent() {

			},
			greet(val){
                this.val = val;
                if(val === 'end') {
                	this.isTransiton = true;
                }else{
                	this.isTransiton = false;
                }
            },
            // close () {
            // 	this.isAddShow = false;
            // 	setCookie(this.cookieName,1);
            // 	return false;
            // },
            init () {
            	if(readCookie(this.cookieName) == 1) {
            		this.isAddShow = false;
            	}else{
            		this.isAddShow = true;
            	}
            }
		},
		mounted(){
			this.add = this.$refs.add;
			this.init();
			var that = this;
			document.getElementById('close').addEventListener('touchstart',function(){
				that.isAddShow = false;
            	setCookie(that.cookieName,1);
            	return false;
			})
		},
		props:['info','cookieName']
	}
</script>

<style scoped lang="scss">
	// * { touch-action: none; } 
	.add {
		width:1.76rem;
		text-align: center;
		position: fixed;
		bottom:2.0rem;
		right:0.4rem;
		height:2.66667rem;
		img {
			width:1.76rem;
			height:1.76rem;
			border-radius:50%;
			overflow:hidden;
			display:block;
		}		
	}
	.close {
		display:inline-block;
		width:0.8rem;
		height:0.8rem;
		border: 1px solid #f9f9f9;
		color:#9c9c9c;
		border-radius:50%;
		line-height:0.74667rem;
		text-align: center;
		background-color: #fff;
		font-size: 0.53333rem;
		z-index: 1000;
		&:active {
			background-color: #f5f5f5;
		}
	} 
	.t {
		transition:left 1s;
	}
</style>