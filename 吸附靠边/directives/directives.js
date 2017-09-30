export const title = (el, binding) => { //全部指令,组件内部使用v-title,data-title="XXX"使用
    document.title = el.dataset.title
}

export const fullheight = (el, binding) => { //全部指令,组件内部使用v-title,data-title="XXX"使用
    document.body.style = 'height:100%';
}

export const fullWidth = (el, binding) => { //全部指令,组件内部使用v-title,data-title="XXX"使用
    document.body.style = 'width:100%;overflow-x:hidden;';
}

export const drag = (el, binding) => {//拖拽
	let elWidth =66,
		elHeight = 86,
		l = '';
    let oDiv = el;   //当前元素
    let self = this;  //上下文
    let windowWidth = document.body.clientWidth || document.documentElement.clientWidth;
    let windowHeight = document.body.clientHeight || document.documentElement.clientHeight;
    let ratio = windowWidth/375;
    let rightDis = windowWidth - (15 + elWidth)*ratio;
    oDiv.addEventListener('touchstart',function (e) {
    	let f = e.touches[0];
     //鼠标按下，计算当前元素距离可视区的距离
        let disX = f.clientX - oDiv.offsetLeft;
        let disY = f.clientY - oDiv.offsetTop;
        function move (e) {
        	e.preventDefault();
        	let f = e.touches[0];
          //通过事件委托，计算移动的距离 
            l = f.clientX - disX;
            let t = f.clientY - disY;
            if(l <= 15 * ratio) {//左边界
            	l = 15 * ratio;
            }else if(l >= rightDis ) {//右边界
            	l = rightDis;
            }
            if( t <= 0) {//上边界
            	t = 0
            }else if(t >= windowHeight - elHeight*ratio ){//下边界
            	t =  windowHeight - elHeight*ratio;
            }
          //移动当前元素  
            oDiv.style.left = l + 'px';
            oDiv.style.top = t + 'px';
             //将此时的位置传出去
            binding.value({x:f.pageX,y:f.pageY})
        }
        document.addEventListener('touchmove',move) 
        document.addEventListener('touchend',function (e) {             
            binding.value('end') 
        	if(l && l <= (windowWidth/2 - ( 15 + elWidth/2 ) * ratio )) {//如果没有移动,l为''
        		oDiv.style.left = 15 * ratio + 'px';
        	}else{
        		oDiv.style.left = ( windowWidth - ( 15 + elWidth) * ratio  ) + 'px';
        	}    
            document.removeEventListener('touchmove',move);//解绑事件,防止页面滚动的时候广告一起滚   
            document.ontouchend = null; 
    	   
        });
    })
    oDiv.addEventListener('touchstart',function (e) {
    	e.preventDefault();
    })
}   
