<template>
	<div :style="{height: height + 'px'}" class="bg_white clearfix">
		<ul class=""  ref="box" :style="{transform: `translate3d(0,${currenTranslateY}px,0)`, transition: `transform ${noAnimate ? 0 : duration}ms`}">
			<li class="" v-for="(item,index) in list">{{item}}</li>
		</ul>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				list:['第一条公告','第二条公告','第三条公告'],
				currenTranslateY:0,
				duration:300,
				interval:2000,
				noAnimate:false,
				currentIndex:0,
				height:'',
				length:''
			}
		},
		methods:{
			go (toFirst) {
		      this.noAnimate = true
		      if (toFirst) {
		        this.currentIndex = 0
		        this.currenTranslateY = 0
		      }
		    }
		},
		mounted(){
			let firstItem = this.$refs.box.firstElementChild
	      	if (!firstItem) {
	        	return false
	      	}
		    this.length = this.$refs.box.children.length
		    this.height = firstItem.offsetHeight
		    this.cloneNode = firstItem.cloneNode(true)
       		this.$refs.box.appendChild(this.cloneNode)
			setInterval(()=>{
				this.currentIndex++;				
				this.currenTranslateY = - (this.height * this.currentIndex );
				if (this.currentIndex === this.length) {
		          setTimeout(() => {
		            this.go(true)
		          }, this.duration)
		        }else {
		          this.noAnimate = false
		        }
				
			},this.interval + this.duration)
			
		}
	}
</script>

<style scoped lang="scss">
	ul {
		line-height: 0.53333rem;
		height:auto;
	}
	li {
		height:20px;
	}
</style>