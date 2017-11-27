/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * 
 */
let routerMode;
let appId;
let rootRouter;
if (process.env.NODE_ENV == 'development') {
	routerMode = 'hash';
	appId = 'wx0001f8ab87472985';
	rootRouter = "/";
}else if (process.env.NODE_ENV == 'test'){
	routerMode = 'history';
	appId ='wx0001f8ab87472985';//57appid
	rootRouter = "/vue";
}else{
	routerMode = 'history';
	appId ='wx4606443306ae82b9';//线上appid
	rootRouter = "/vue";
}

export {
	routerMode,
	appId,
	rootRouter
}