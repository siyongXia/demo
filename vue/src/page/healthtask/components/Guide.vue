<template>
	<div @touchmove="prevent($event)" @click="goNext()" >
		<div class="mask">
			<div class="circle circle1 " :class="commonIsApp ? 'circle1app':''" v-if="showId === 1"></div>
			<div class="circle circle2 " :style="commonIsApp ? 'top:6.05333rem;':''" v-if="showId === 2" :class="'day' + date"></div>
			<div class="circle circle3 " :class="commonIsApp ? 'circle3app':''" v-if="showId === 3"></div>
			<div class="circle circle4 " :class="commonIsApp ? 'circle4app':''" v-if="showId === 4"></div>
			<div class="circle circle5 " :class="commonIsApp ? 'circle5app':''" v-if="showId === 5"></div>
		</div>
		<img  :class="commonIsApp ? 'step1app':''" src="../images/step1.png" alt="" class="step step1 " v-if="showId === 1">		
		<img   :style="commonIsApp ? 'top:8.96rem;':''" src="../images/step2.png" alt="" class="step step2 day4 " v-if="showId === 2 && date <= 4" :class="'day' + date" >		
		<img   :style="commonIsApp ? 'top:8.96rem;':''" src="../images/step2_back.png" alt="" class="step step2 " v-if="showId === 2 && date > 4" :class="'day' + date">		
		<img   :class="commonIsApp ? 'step3app':''" src="../images/step3.png" alt="" class="step step3 " v-if="showId === 3">		
		<img   :class="commonIsApp ? 'step4app':''" src="../images/step4.png" alt="" class="step step4 " v-if="showId === 4">		
		<img   :class="commonIsApp ? 'step5app':''" src="../images/step5.png" alt="" class="step step5 " v-if="showId === 5">
		
	</div>
	
</template>
<script>
	import { getRatio } from '../../../utils/util.js';
	import { mapGetters } from 'vuex';
	export default {
		data(){
			return {
				showId:1,
				date:''
			}
		},
		computed:{
			...mapGetters([
				'commonIsApp'
			])
		},
		methods:{
			prevent (e) {
				e.preventDefault();
			},
			goNext () {
				this.showId++;
				if(this.showId > 5) {
					this.$parent.showGuide = false;
					window.localStorage.setItem('isTaskGuideShow',1);
					this.$parent.flag = false;
					this.$parent.isSigned = false;	
					if(this.$parent.dayTask.length === 1 && this.$parent.dayTask[0].test === 1)	{//清楚假数据
						this.$parent.dayTask = [];
					}		
					return;
				}
				if( this.showId === 4 ) {
					this.$parent.scrollToPosition('#firstTask',460 * getRatio());
				}				
				
				if( this.showId === 5 ) {
					this.$parent.scrollToPosition('#task_wrapper',0);
				}
				
			}
		},
		mounted(){
			var date = (new Date().getDay() + 1) % 7;
			this.date = ( date === 0 ? 7 : date );
		}
	}
</script>

<style scoped lang="scss">
	.circle1app {
		top:0.05333rem !important;
	}
	.step1app {
		top:0.85333rem !important;
	}
	.circle3app {
		top:8.85333rem !important;
	}
	.step3app {
		top:10.72rem !important;
	}
	.circle5app {
		top:11.25333rem !important;
	}
	.step5app {
		top:7.25333rem !important;
	}
	.mask {
		position:fixed;
		width:100%;
		height:100%;
		background-color: #000;
		opacity:.5;
		z-index:10000;
		top: 0;
		left:0;
	}
	.step,.circle {
		position:fixed;
		z-index:10001;
	}
	.circle {
		border-radius:50%;
		border: 0.02667rem solid #FFD200;
		background-color: #fff;
		// opacity:.8;
	}
	.step1 {
		right: 1.06667rem;
    	top: 2.13333rem;
	}	 
	.step2 {
    	top: 10.0rem;
	}
	.step2.day1 {		
    	left: 1.46667rem;
	}
	.circle2.day1 {
   		left: -0.66667rem;
	}
	.step2.day2 {		
    	left: 3.06667rem;
	}	
	.circle2.day2 {
   		left: 0.66667rem;
	}
	.circle2.day3 {
   		left: 2.0rem;
	}
	.step2.day3 {		
    	left: 4.4rem;
	}	
	.step2.day4 {	
		top:10.24rem;
    	right: 0.0rem;
	}
	.circle2.day4 {
   		left: 3.46667rem;
	}	
	.step2.day5 {	
		top:10.24rem;
    	right: 4.0rem;
	}
	.circle2.day5 {
   		left: 4.93333rem;
	}	
	.step2.day6 {	
		top:10.24rem;
    	right: 2.66667rem;
	}
	.circle2.day6 {
   		left: 6.26667rem;
	}	
	.step2.day7 {	
		top:10.24rem;
    	right: 1.33333rem;
	}
	.circle2.day7 {
   		left: 7.6rem;
	}	
	.step3 {
	    top: 11.73333rem;
    	right: 2.66667rem;
	}
	.step4 {
	    top: 8.26667rem;
    	right: 1.33333rem;
	}
	.step5 {
	    top: 8.53333rem;
   		right: 2.0rem;
	}
	   
	.circle1 {
		width: 1.2rem;	
		height: 1.2rem;	
		top:1.33333rem;
		right:-0.02667rem;
	}
	.circle2 {
		width: 2.93333rem;	
		height: 2.93333rem;	
	    top: 7.33333rem;
	}
	
	.circle3 {
		width: 2.13333rem;	
		height: 2.13333rem;	
        top: 10.13333rem;
    	right: 0.8rem;
	}
	.circle4 {
		width: 2.13333rem;	
		height: 2.13333rem;	
        top: 11.6rem;
   		right: 0.4rem;
	}
	.circle5{
		width: 2.13333rem;	
		height: 2.13333rem;	
        top: 12.53333rem;
   		right: 0.4rem;
	}
</style>