<template>
	<div class="sections flex clearfix bg_white">		
    	<ul class="sections_cate">
			<li v-for="(item,index) in ghdep" class="typo_dgrey pr5 elli" :class="activeDepId == index ? 'bg_white' : '' " @click="select(index)">{{item.dep_name}}</li>
		</ul>
    	<ul class="flex-item  sec_child" v-if="ghdep[activeDepId]">
			<li  v-for="(k,v) in ghdep[activeDepId].child_list">
				<a :href="'/doctor/index.html?unit_id='+k.unit_id+'&dep_id='+k.dep_id">{{k.dep_name}}</a>
				<span class="gone_dep" v-if="k.is_vistor">曾去过</span>
				<span class="spec_dep" v-if="!k.is_vistor && k.unit_character > 0">特色科室</span>
			</li>
		</ul>
	</div>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import { mapGetters,mapActions } from 'vuex'
	export default {
		data(){
			return {	
				swiperOption:{
			        direction: 'vertical',
			        slidesPerView: 'auto',
			        mousewheelControl: true,
			        freeMode: true,
					roundLengths : true,
					scrollbar: '.swiper-scrollbar'
				},
				type_id:''
			}
		},
		computed: {
			...mapGetters('customize',[
				'activeDepId',
				'selectDepList'
			])
		},
		components:{
		    swiper,
   			swiperSlide
		},
		methods: {
			select (index) {
				if(this.type_id) {//配合后台编辑
					return;
				}
				this.$store.commit('customize/CHANGEACTIVEDEPID',index);
			}
		},
		mounted () {
			this.type_id = this.$route.query.type_id;
		},
		props:['ghdep']
	}
</script>	

<style scoped lang = "scss">
	.gone_dep {
		display: inline-block;
	    height:0.53333rem;
	    line-height: 0.48rem;
	    color: #00d3c2;
	    border: 0.02667rem solid #00d3c2;
	    padding: 0 0.08rem;
	    border-radius: 0.13333rem;
	    margin-left: 0.13333rem;
	}
	.spec_dep {
		display: inline-block;
	    height:0.53333rem;
	    line-height: 0.48rem;
	    color: #F27B17;
	    border: 0.02667rem solid #F27B17;
	    padding: 0 0.08rem;
	    border-radius: 0.13333rem;
	    margin-left: 0.13333rem;
	}
	.sections {
		.sections_cate {
			width: 3.36rem;
			background-color: #f5f5f5;
			li {
				height: 1.28rem;
				line-height: 0.53333rem;	
				padding: 0.32rem 0.13333rem 0.32rem 0.8rem;
			}
		}
		
		.sec_child {
			li {
				min-height: 1.28rem;
				line-height: 0.53333rem;	
				padding: 0.32rem 0.13333rem 0.32rem 0.8rem;
			}
		}

	}
	.sections {
	    .swiper-container {
	        height: 100% !important;
	    }
	    .swiper-slide {
	        height: auto !important;
	    }
	    .swiper-scrollbar-drag,.swiper-scrollbar {
	        width:0 !important;
	        background-color: transparent !important;
	    }
	}
</style>