<template>
	<div class="hide textc"  ref="scrollBtn"  @click="scrollTop()">
		<span class="iconfont js_scroll_top "></span>
	</div>
</template>
<script>
	export default {
		mounted(){
			this.showBtn();			
		},
		methods:{
			showBtn(e){
				var scrollBtn = this.$refs.scrollBtn;
				window.addEventListener('scroll',function(e){
					var scrollTop = document.documentElement.getBoundingClientRect().top;
					if(scrollTop < -300) {
						scrollBtn.style.display = 'block';
					}else {
						scrollBtn.style.display = 'none';
					}
				}); 
			},
			getScrollOffsets(_w) {//获取页面的滚动位置
			    _w = _w || window;
			    //for all and IE9+
			    if (_w.pageXOffset != null) return {
			        x: _w.pageXOffset,
			        y: _w.pageYOffset
			    };
			    //for IE678
			    var _d = _w.document;
			    if (document.compatMode == "CSS1Compat") return { //for IE678
			        x: _d.documentElement.scrollLeft,
			        y: _d.documentElement.scrollTop
			    };
			    //for other mode
			    return {
			        x: _d.body.scrollLeft,
			        y: _d.body.scrpllTop
			    };
			},
			getViewPortSize(_w) {//获取页面的窗口大小
			    _w = _w || window;
			    //for all and IE9+
			    if (_w.innerWidth != null) return {
			        x: _w.innerWidth,
			        y: _w.innerHeight
			    };
			    //for IE678
			    var _d = _w.document;
			    if (document.compatMode == "CSS1Compat") return { //for IE678
			        x: _d.documentElement.clientWidth,
			        y: _d.documentElement.clientHeight
			    };
			    //for other mode
			    return {
			        x: _d.body.clientWidth,
			        y: _d.body.clientHeight
			    };
			 },
			scrollPosition(_obj) {//参数_obj可以是任何页面上存在的元素的id，或者是指定元素本身
			    var targetX, targetY;
			    if (!_obj) { //如果不指定锚点元素，就跳到页面顶端0，0位置
			        targetX = 0;
			        targetY = 0;
			    } else {
			        if (typeof (_obj) == "string") {
			            _obj = document.getElementById(_obj);
			        } else {
			            _obj = _obj
			        }
			        targetX = _obj.getBoundingClientRect().left + this.getScrollOffsets().x;
			        targetY = _obj.getBoundingClientRect().top + this.getScrollOffsets().y; 
			    }
			 
			    //如果目标元素的位置在最后一屏，那就指定目标位置为页面底部
			    //如果目标元素的位置为负数，就指定目标位置为页面顶部
			    var maxTargetX=document.body.scrollWidth-this.getViewPortSize().x;
			    if(targetX>=maxTargetX) targetX=maxTargetX;
			    if(targetX<0) targetX=0;
			    var maxTargetY=document.body.scrollHeight-this.getViewPortSize().y;
			    if(targetY>=maxTargetY) targetY=maxTargetY;
			    if(targetY<0) targetY=0;
			 	var that = this;
			    var tempTimer = setInterval(function () {
			        var currentY = that.getScrollOffsets().y;
			        var currentX = that.getScrollOffsets().x;
			        //跳转位置的缓冲公式
			        var tempTargetY = currentY - (currentY - targetY) / 10;
			        var tempTargetX = currentX - (currentX - targetX) / 10;
			        //由于缓冲公式会生成小数，而scrollTo函数会省略小数点后面的数字，所以要对跳转的坐标做一些微调
			        if (Math.abs(tempTargetY - currentY) < 1) {
			            tempTargetY - currentY > 0 ? tempTargetY++ : tempTargetY--;
			        }
			        if (Math.abs(tempTargetX - currentX) < 1) {
			            tempTargetX - currentX > 0 ? tempTargetX++ : tempTargetX--;
			        }
			        //页面跳转
			        window.scrollTo(tempTargetX, tempTargetY);
			        //到达指定位置后清除一下Interval
			        if ( Math.abs(that.getScrollOffsets().y - targetY) <= 2 && Math.abs(that.getScrollOffsets().x - targetX) <= 2  ) {
			            clearInterval(tempTimer);
			            window.scrollTo(targetX, targetY);
			            //console.log("done");
			        }
			    }, 10);
			},
			scrollTop(){
				this.scrollPosition(document.documentElement);
			}

		}
	}
</script>
<style scoped>
	.hide {
		display: none;

	}
	.show {
		display: block;
	}
	div {
	    position: fixed;
	    right: 4.8%;
	    bottom: 8.8%;
	    z-index: 222;
	    width: 35px;
	    height: 35px;
	    line-height: 35px;
	    border-radius: 50%;
	    background-color: rgba(0, 0, 0, 0.6);
	}
	.js_scroll_top {
		color: #fff;
		
	}
</style>