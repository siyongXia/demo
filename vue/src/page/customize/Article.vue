<template>
	<div class="bg_white wrap pl15 pr15">
		<NavigateBar :options="navigateBarOptions"></NavigateBar>
		<h3 class="pt10 fs18 typo_normal typo_black">{{article.title}}</h3>
		<div class="fs12 mt4 pb5 elli lh20">
            <span class=" typo_dgrey">{{article.source || '原创'}}&nbsp;&nbsp;
            <span class="pr5">来源：{{article.author || '未知'}}</span>
               {{article.pubdate}}</span> 
            <i class=" ml10  iconfont fs20 typo_dgrey vam"></i> 
            <span class=" ml5 typo_dgrey">3.6万</span>
        </div>
		<div v-html="content"></div>
	</div>
</template>
<script>
	import { wxShare } from '../../utils/util.js';
	export default {
		data(){
			return {
				content:'',
				article:'',
				navigateBarOptions:{
					iconLeftCode:'&#xe60e;',
					title:'资讯文章',
					bgColor:'#00d2c3',
					color:'#fff',
					iconClass:"#fff"
				},
			}
		},
		methods:{
			getData (id) {
				this.$http.get('/api/unit/article',{params:{id}})
				.then((data)=>{
					this.content = data.data.data.content;
					this.article = data.data.data;
					this.share(this.article);
				})
				.catch((error)=>{
					console.log(error);
				})
			},
			share (data) {
				var wxShareOptions = {
                    timeLine: {                                 
                        title: data.title,
                        link: '',
                        imgUrl:data.image,
                    },
                    appMessage: {
                        title: data.title,
                        desc: ' ', // 分享描述
                        link: '',
                        imgUrl: data.image,
                    }
                };  
                wxShare(wxShareOptions, this);
			},
		},
		mounted(){
			let article_id = this.$route.query.article_id;
			this.getData(article_id)
		}
	}
</script>

<style scoped lang="scss">
	.wrap {
		min-height: 100%;
	}
	.vam {
		vertical-align:middle;
	}
</style>