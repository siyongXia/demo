<h1>IOS橡皮筋效果</h1>
<h2>背景</h2>
<p class="danger">
  在IOS App里面,网页到了顶部手指再往下拉,整个网页都会往下被拖动;前端如果想使用mint-ui的loadmore组件,实现下拉加载更多,效果如下图:在IOS App里面无法触发:bottom-method事件
</p>
<img src="./webView/images/pull.gif" alt="">
<h2>解决方案</h2>
- 1.自己监听window的sroll事件,当页面达到顶部的时候,触发loadmore函数;
- 2.使用vux的scroll组件,相当好用,具体如下:
```
template:
<scroller lock-x scrollbar-y use-pulldown :height="scrollHeight-10 + 'px'" @on-pulldown-loading="loadmore" ref="demo3" v-model="status2">
    <div class="msg_wrap"> 
    </div>
    <!-- slot -->
    <div slot="pulldown" class="xs-plugin-pulldown-container xs-plugin-pulldown-down" style="position: absolute; width: 100%; height: 60px; line-height: 60px; top: -60px; text-align: center;">
        <span v-show="status2.pulldownStatus === 'default'"></span>
        <span class="pulldown-arrow" v-show="status2.pulldownStatus === 'down' || status2.pulldownStatus === 'up'" :class="{'rotate': status2.pulldownStatus === 'up'}">加载更多...</span>
        <span v-show="status2.pulldownStatus === 'loading'"><spinner type="ios-small"></spinner></span>
    </div>
</scroller>
js:
//特别注意:Scroller需要注定固定的高度且只能包裹一个根元素
import { Scroller, Spinner  } from 'vux'
loadMore () {
    this.status.pullupStatus= 'loading'
    this.page++;                
    if(this.page <= this.totalPage) {
        this.getData(this.unit_id,this.page);
    }else {
        this.status.pullupStatus= 'done';
        this.$refs.scroller.donePullup()
    }
}
```