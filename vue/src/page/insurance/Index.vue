<template>
	<div class="bgf0 insuranceimg clearfix">
		<div class="relative fullwidth block textc typo_large typo_white bg_green lh24 pt10 pb10">
			【小棉袄】个人医疗保险
		</div>
		<img :src="insura1">
		<img :src="insura2" class="mt10">
		<div class="mt10 fleft fullwidth">
			<menu-title>产品七大特点</menu-title>
		</div>
		<img :src="insura3">
		<img :src="insura4" class="mt10">
		<img :src="insura5" class="mt10">
		<img :src="insura6" class="mt10">
		<img :src="insura7" class="mt10">
		<img :src="insura8" class="mt10">
		<img :src="insura9" class="mt10">
		<div class="mt10 fleft fullwidth">
			<menu-title>投保须知</menu-title>
		</div>
		<div class="fleft fullwidth bg_white textc pb15 clearfix">
			<i class="inblo oval alignc mt20 lh28 bgffc pl20 pr20 typo_white typo_small">适用人群</i>
			<div class="pagn mt20">
				<div class="forpeople clearfix">
					<dl v-for="(forpeople,index) in forpeople">
						<dt>{{forpeople.title}}</dt>
						<dd v-html='forpeople.con1'></dd>
						<dd v-html='forpeople.con2'></dd>
					</dl>
				</div>
				<span class="block textl pt10 typo_dgray">*保障期间为1年，等待期为30天</span>
			</div>
		</div>
		<a @click="gaSend('小棉袄个人医疗保险-立即购买')" href="https://mes.citic-prudential.com.cn/online/esale/mobiletemplate/XAN-M/details_XAN.html?planCode=XANM001&orgFrom=NYKJ&appFrom=mobile&saleCode=EB&aloneQuotePage=0&securityCode=5708da16cce13f2c1e011b5fef58f84c" class="fixedbtm fullwidth block textc typo_middle typo_white bg_green lh28 pt10 pb10">立即购买</a>
	</div>
</template>
<script>
	import Vue from 'vue'
	import MenuTitle from './Menu.vue'
	import {WxOath,getAppToken,wxShare} from '../../utils/util.js'
	export default {
		data () {
			return {
				loadimg:require('../../static/bigloading.gif'),
				insura1:require('./images/insura1.jpg'),
				insura2:require('./images/insura2.jpg'),
				insura3:require('./images/insura3.jpg'),
				insura4:require('./images/insura4.jpg'),
				insura5:require('./images/insura5.jpg'),
				insura6:require('./images/insura6.jpg'),
				insura7:require('./images/insura7.jpg'),
				insura8:require('./images/insura8.jpg'),
				insura9:require('./images/insura9.jpg'),
				forpeople:[
					{title:'投保年龄',con1:'30天～45周岁',con2:'40～60周岁'},
					{title:'投保计划',con1:'信诚【小棉袄】<br> 个人医疗保险计划一',con2:'信诚【小棉袄】<br> 个人医疗保险计划二'},
					{title:'年度赔付额度',con1:'200万',con2:'120万'},
				],
			}
		},
		components:{
			MenuTitle
		},
		mounted: function () {
			var wxShareOptions={
					timeLine:{
						title:'【小棉袄】个人医疗保险',
						link:'',
						imgUrl:'https://static.91160.com/wechat/img/common/logo.jpg',
					},
					appMessage:{
						title:'【小棉袄】个人医疗保险',
                	desc: '【小棉袄】个人医疗保险', // 分享描述
						link:'',
						imgUrl:'https://static.91160.com/wechat/img/common/logo.jpg',
				},				
            callback: function() {

							    },
            cancelCallback: function() {

							    }
        	}
        	wxShare(wxShareOptions, this);
						    },
		methods:{		
						    }
    		}			
</script>
<style scoped lang = 'scss'>
	$ddwidth:10rem-0.48rem*2-0.95rem;
	.bgf0{background: #f0f0f0;}
	.bgffc{background: #ffc107;/*黄色*/}
	.goback{position: absolute;left:0.26667rem; top:0.29333rem; width: 0.64rem; height: 0.64rem; text-align:center; line-height: 0.64rem;}
	.insuranceimg{padding-bottom:1.54667rem;}
	.insuranceimg img{float:left; width: 100%;}
	.forpeople{border-top: solid 0.026667rem #999;border-left: solid 0.026667rem #999; }
	.forpeople dl{float:left;
		>dt{padding:0.133333rem 0;border-bottom: solid 0.026667rem #999; border-right: solid 0.026667rem #999; line-height:0.746667rem; font-size: 0.373333rem;color: #4a4a4a}
		>dd{height:1.44rem;padding:0.133333rem 0;border-bottom: solid 0.026667rem #999; border-right: solid 0.026667rem #999; font-size: 0.32rem;color: #4a4a4a}
	}
	.forpeople dl:nth-child(1),.forpeople dl:nth-child(3){width:31.5%;}
	.forpeople dl:nth-child(1) dd,.forpeople dl:nth-child(3) dd{line-height:1.173333rem;}
	.forpeople dl:nth-child(2){width:37%;line-height:0.586667rem;}
</style>