export const toFixed = (value,params) => { //全部指令,组件内部使用v-title,data-title="XXX"使用
   return Number(value).toFixed(params)
}

export const timeFormat = (value) => { //根据毫秒值计算时间
	var value = parseInt(value);
	function double( val ){
		return val >= 10 ? val : ( '0' + val )
	}
	var d = new Date(),
		time = new Date(value);
	d.setHours(0);
	d.setMinutes(0);
	d.setSeconds(0);
	var start = d.setMilliseconds(0);
	var isToday = d.getDate() == time.getDate() ? true:false;
	if( ( value - start ) < 24 * 60 * 60 * 1000 && isToday) {		
   		return double( time.getHours() ) + ':' + double( time.getMinutes() ) 
	}else {
		var str = '';
		str += time.toLocaleDateString() ;
		str += ' ';
		str += double( time.getHours() ) + ':' + double( time.getMinutes() ) ;
		return str;
	}
}
	const DAYSEC = 24 * 60 * 60 * 1000,
		  HOURSEC = 60 * 60 * 1000,
		  MINSEC = 60 *1000;
export const hourFormat = (value) => { //根据毫秒值计算时间

	var day = parseInt(value/DAYSEC),
		hour = parseInt ( value % DAYSEC / HOURSEC ),
		min = parseInt( value % HOURSEC/MINSEC),
		sec = parseInt(value % MINSEC/ 1000),
		str = '';
	if(day > 0) {
		if( hour > 0) {
			str = `${day}天${hour}小时`
		}else{
			str = `${day}天`
		}
	}else if(hour > 0) {
		if( min > 0) {
			str = `${hour}小时${min}分钟`
		}else{
			str = `${hour}小时`
		}
	}else if(min > 0){
		if( sec > 0) {
			str = `${min}分钟${sec}秒`
		}else{
			str = `${min}分钟`
		}
	}else{
		str = `${sec}秒`
	}
	return str;
}