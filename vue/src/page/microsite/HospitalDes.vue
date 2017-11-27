<template>
	<div class="page">
		<div class="title" ref="title">{{info.title}}</div>
		<div class="time"> <span class="iconfont typo_xxlarge pr10" v-if="info.update_time">&#xe635;</span>{{info.update_time}}</div>
		<div class="hospitalinfo-content" v-html="info.content"></div>
	</div>
</template>

<script>
	import MicroFooter from './Footer.vue'
	import AppAd from './AppAd.vue'
	export default {
		data(){
			return {
				title:'',
				info:{}
			}
		},
		components:{
			MicroFooter,
			AppAd
		},
		methods:{
			fetchData(){
				var article_id = this.$route.query.article_id;
				this.$http.get('/microsite/articledetail.html?article_id=' + article_id)
					.then((response)=>{
						if(response.data.status != 0) {
							this.info = response.data.data;
							if( response.data.data.type === '4') {//如果是链接,直接跳转
								window.location.href = response.data.data.content;
							}							
						}
					})
			}
		},
		mounted(){
			this.fetchData();
		},
		filters:{
		    formatTime(input) {
		      var toDouble = function (num) {
			      return num > 10 ? num : '0' + num; 
		      }
		      if(!input) {
		      	return '';
		      }
		      var d = new Date( parseInt(input) * 1000 );
		      var year = d.getFullYear(),
		          month = toDouble ( d.getMonth() + 1 ),
		          day = toDouble ( d.getDate() ), 
		          hour = toDouble (d.getHours() ),
		          min = toDouble ( d.getMinutes() ),
		          sec = toDouble ( d.getSeconds() );
		      return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;

		    }
	  }
	}
</script>

<style scoped lang = 'scss'>
	.page {
	    padding: 0 5%;
	    min-height: 360px;
	    padding-bottom: 50px;
	    background-color: #fff;
	   
	    >.title {
    	    padding: 15px 0;
		    font-size: 20px;
		    color: #4a4a4a;
		    line-height: 1.2;
	    }
	    >.time {
	    	color: #8e8e8e;
	    	font-size: 15px;
	    	>.iconfont {
	    		color:#8e8e8e;
	    	}
	    }
	    .hospitalinfo-content {
	    	padding: 15px 0;
	    	font-size: 14px;
	    	img {
	    		max-width: 100%;
	    	}
	    }
	}
</style>