 //异常捕获,方便在APP里面的时候,由于兼容性问题无法提示,帮助感知错误的地方
import Vue from 'vue'
console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV !== 'production') {//开发环境使用
	Vue.config.errorHandler = function (err, vm, info) {
		var str = `err错误信息:${err}, <br />
			vm错误组件:${vm._uid},<br />
			错误信息info:${info}
		`;
		console.log(str);
		document.body.innerHTML = str;
	}
}

