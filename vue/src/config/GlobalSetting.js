const GlobalSetting = {
	IM:{
		host:'10.1.2.44',
		port:'9090'
	},
	STATICDOMAIN:'https://static.91160.com',
	IMAGESDOMAIN:'https://images.91160.com/',
	WEIXIN:process.env.NODE_ENV == 'production' ? 'https://weixin.91160.com' : 'https://weixintest2.91160.com',
}
export default GlobalSetting;