<template>
  <div id="apply">   
  <loading v-show="isLoading"></loading>    
  	<header>
        <div class="banner clearfix" ref="banner">
          <mt-swipe :show-indicators="false" :auto="5000" loop>
            <mt-swipe-item v-for="(item,index) in bannerList" :key ="index">
              <img :src="item.src" alt="就医160" class="preview-img" @click="$preview.open($event,index, bigImgList)">
            </mt-swipe-item>
          </mt-swipe>
        </div>    
        <div style="height:44px;" v-show="isFixed"></div>
       <div class="selection clearfix " :class="{'fixed':isFixed}">
          <div class="position" @click="selectPostion()" :class="{'active':selectedLevel !== '职位类别'}">
            {{selectedLevel}}
            <img :src="btnMore" height="12" width="18" alt="" v-if="selectedLevel == '职位类别'">
            <img :src="btnMoreActive" height="12" width="18" alt="" v-else>
          </div>
          <div class="address" @click="selectAddress()" :class="{'active':selectedPlace !== '工作地点'}">
            {{selectedPlace}}
              <img :src="btnMore" height="12" width="18" alt="" v-if="selectedPlace == '工作地点'">
              <img :src="btnMoreActive" height="12" width="18" alt="" v-else>
   		  </div>  
        </div>
    </header>
    <transition>
    	<router-view></router-view>
    </transition>
	   
    <footer v-show="footShow">
      <div class="share active" @click="showShareImg()" disabled='true'>分享&收藏</div>
      <div class="apply" @click="applyJob()">我要应聘
      </div>
    </footer>
    <div class="cover fixed" v-show="guideShow" @click="hideShareImg()"></div>
    <img class="share-guid fixed" :src="guideImg" alt="" v-show="guideShow"> 
    <img :src="logoImg" alt="" v-show="false">
  </div>

</template>

<script>
  import Vue from 'vue'
  import { Swipe, SwipeItem } from 'mint-ui';
  import weui from '../../plugins/weui/js/weui.js'
  import '../../plugins/weui/style/weui.min.scss'
  import VuePreview from '../../plugins/preview'
  import {mapGetters} from 'vuex'
  Vue.use(VuePreview)
  Vue.component(Swipe.name, Swipe);
  Vue.component(SwipeItem.name, SwipeItem);

  export default {
    data () {
      return {
        isFixed:false,
        footShow:true,
        isShow:false,
        jobId:'',
        jobType:'',
        jobName:'',
        selectedPlace:'工作地点',
        selectedLevel:'职位类别',
        level:['技术类','运营类','服务类','销售类','产品/项目类','职能类','市场类'],//职位
        place:['深圳南山','深圳宝安','深圳龙岗','深圳罗湖','东莞','广州','上海','海南'],//地址
        guideShow:false, //分享显示或隐藏
        btnMore:require('./images/btn_more.png'),
        btnMoreActive:require('./images/btn_more_active.png'),
        guideImg:require('./images/guide1.png'),
        logoImg:require('./images/logo.png'),
        bannerList:[
          {src:require('./images/banner_1.png')},
          {src:require('./images/banner_2.png')},
          {src:require('./images/banner_1.png')},
          {src:require('./images/banner_2.png')},
          {src:require('./images/banner_1.png')},
          {src:require('./images/banner_2.png')},
          {src:require('./images/banner_1.png')}
        ],
        bigImgList:[
          {src: require('./images/img_1.png'),w: 320,h: 420},
          {src: require('./images/img_2.png'),w: 320,h: 420},
          {src: require('./images/img_3.png'),w: 320,h: 420},
          {src: require('./images/img_4.png'),w: 320,h: 420},
          {src: require('./images/img_5.png'),w: 320,h: 420},
          {src: require('./images/img_6.png'),w: 320,h: 420},
          {src: require('./images/img_7.png'),w: 320,h: 420},
        ],
        positionList:[],
        addressList:[]
      }
    },
    computed:{
      ...mapGetters([
          'isLoading'
      ])
    },
    components:{
       Swipe, 
       SwipeItem
    },   
    methods:{
      wxShare(){
        var protocal = window.location.protocol,
            hostName = window.location.hostname,
            options = this.wxShareOptions;
        var domain = protocal + '//' + hostName;
        this.$http.get("/sys/getjsconfig.html")
          .then(  (data)=> {
            var data = data.data;
              if (data.status !== 0) { 
                return; 
              }
            wx.config({
                appId: data.appId, // 必填，公众号的唯一标识
                timestamp: data.timestamp, // 必填，生成签名的时间戳
                nonceStr: data.nonceStr, // 必填，生成签名的随机串
                signature: data.signature,// 必填，签名，见附录1
                jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            wx.ready(function(){
                wx.onMenuShareTimeline({
                    title: '就医160惹你?招你了!',
                    link: 'https://wap.91160.com/vue/apply/applyinfo.html',
                    imgUrl: 'https://wap.91160.com/vue/vuestatic/img/logo.png',
                    success: function (callback) { 
                      // 用户确认分享后执行的回调函数
                      callback&&callback();
                    },
                    cancel: function () { 
                    }
                });
              wx.onMenuShareAppMessage({
                  title: '就医160惹你?招你了!',
                  desc: '1年前我对他说：你有才华又长得帅，我们来签份劳动合同。如今他带了一群人...', // 分享描述
                  link: 'https://wap.91160.com/vue/apply/applyinfo.html',
                  imgUrl: 'https://wap.91160.com/vue/vuestatic/img/logo.png',
                  success: function (callback) { 
                    callback&&callback();
                  },
                  cancel: function () { 
                  }
              });
            });
          })
        },
      selectPostion(){
        var that = this;
        weui.picker(this.positionList, {
             className: 'custom-classname',
             defaultValue: [2],
             onConfirm: function (result) {                 
                 that.selectedLevel= result[0].label;
                 var level = result[0].value || 0;
                 var place = that.$route.query.place || 0;                
                 that.$router.push({path:'applyinfo.html?level='+level+'&place='+place + "&type="+that.jobType});
             },
             id: 'singleLinePicker'
          });
      },
      selectAddress(){
        var that = this;
         weui.picker(this.addressList, {
             className: 'custom-classname',
             defaultValue: [1],
             onConfirm: function (result) {
                that.selectedPlace = result[0].label;
                var place = result[0].value || 0;
                var level =  that.$route.query.level || 0;
                that.$router.push({path:'applyinfo.html?level='+level+'&place='+place + "&type="+that.jobType});
             },
             id: 'singleLinePicker'
          });
      },
      //顶部导航显示和隐藏
      headerChange(path){
        if(path.indexOf('resume') !== -1){
          this.$store.dispatch('APPLY_HEADER_SHOW',false)
        }else{
          this.$store.dispatch('APPLY_HEADER_SHOW',true)
        }
      },
      //底部tab显示隐藏
      footerChange(path){
        if( path.indexOf('resume') !== -1 ){
          this.$store.dispatch('APPLY_FOOTER_SHOW',false)
        }else{
          this.$store.dispatch('APPLY_FOOTER_SHOW',true)
        }
      },
      showShareImg(){
        this.guideShow = true;
      },
      hideShareImg(){
         this.guideShow = false;
      },
      applyJob(){
        var jobId = this.$route.query.id || this.jobId;
        var jobName = this.jobName;
        if(jobId==0) {
          weui.toast('请选择对应的职位', 1000);
        }else {
          this.$router.push({path:'../apply/resume.html?id='+jobId + '&type='+this.jobType});
        }
      },
      bannerControll(){
         var that = this,
          apply = document.getElementById('apply'),
          banner = this.$refs.banner,
          height = 0;
          height =  banner.offsetWidth / 320  * 80;
          banner.style.height = height + 'px';
          window.addEventListener('scroll', function(event){
              if(document.body.scrollTop >=height) {
                Vue.nextTick(function(){
                  that.isFixed = true;
                })
                
              }else {
                Vue.nextTick(function(){
                  that.isFixed = false;
                })
              }
           });
      },
      getJobCate (type) {
        this.$http.get('/act/jobcate.html',{params:{type}}).then((data)=>{
          var levelList = [], placeList =[];
          this.level = data.data.data.level;
          this.place = data.data.data.place;
          var level = data.data.data.level,
              place = data.data.data.place;

          for( let k in level ) {
            levelList.push( {label:level[k].name,value:level[k].id,disabled:false})
          }
          for( let k in place ) {
            placeList.push( {label:place[k].name,value:place[k].id,disabled:false})
          }
          this.positionList = levelList;
          this.addressList = placeList;
        }).catch((err)=>{
          console.log(err);
        })
      },
      setBackGround(){
        document.getElementById('app').style.backgroundColor = "#f7f7f7";
      }
    },
    watch:{
      $route(to,from){
        this.jobId = '';
        this.jobName = '';
        var path=to.path.substring(1);
        if(to.path !== from.path  && to.path.indexOf('applyinfo')!== -1) {
          var level = to.query.level || 0;
          var place = to.query.place || 0;
          this.$router.push({path:'applyinfo.html?level='+level+'&place='+place+'&type='+this.jobType});
        }      
      }
    },
    beforeMount(){
      this.setBackGround();
    },
    mounted(){
      this.jobType = this.$route.query.type || 0;
      this.getJobCate(this.jobType);
      this.bannerControll();
      this.wxShare();
    }
  }
</script>

<style lang = "scss" scoped>
  @import '../../style/mint-ui.min.scss';
  .mint-swipe-items-wrap {
    width: 700%;
  }
  .mint-swipe-item {
    float: left;
    >img {
      width: 100%;
    }
  }
	.weui-picker {
		font-size: 14px;
	}
  #result {
    position: absolute;
    left: 50%;
    bottom: 210px;
    z-index: 10000;
    transform: translateX(-50%);
    font-size: 18px;
  }
  #apply {
    width: 100%;
    height: 100%;
    background-color: #f7f7f7;
    font-family:PingFangSC-Regular;
    font-size:14px;
    color:#666666;
    line-height:18px;
    overflow-x: hidden;
  }
  .triangle {
    width: 9px;
    height: 6px;
  }
  header {
    >.banner {
      height: 80px;
    }
    >.selection {
      height: 44px;
      background-color: #fff;
      width: 100%;
      border-bottom: 1px solid #e6e6e6;
      >.active {
          color: #00caba;
      }
      > div {
        width: 50%;
        float: left;
        text-align: center;
        line-height: 44px;
        > img {
          width: 9px;
          height: 6px;
          margin-left: 2px;
          margin-top: -3px;
        }
      }
    }
    .fixed {
      top: 0;
      left:0;
    }
  }
  .blank {
    height: 112px;
  } 
  footer {
    position: fixed;    
    bottom: 0;
    left: 0;
    font-size: 16px;
    width: 100%;
    z-index: 10;
    >div{
      float: left;
      width: 50%;
      height: 51px;
      line-height: 51px;
      text-align: center;
      background-color: #00caba;
      color: #fff;
      >a {
        color: #fff;
      }
    }
    div.active {
      background-color: #fff;
      color: #00caba;
    }
  }
  .weui-picker__bd {
    height: 195px !important;
  }
  .swiper-container {
    height: 56px;
  }
  .swiper-wrapper  {
    width: 1000px;
    >div{
      float: left;      
    }
  }
  .picker-title {
    position: absolute;
    bottom: 190px;
    left: 110px;
    z-index: 10000;
    font-size: 18px;
    color: #333;
  }
  .img-center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .cover {
    width: 100%;
    height: 100%;
    left:0;
    top: 0;
    z-index: 2000;
    background-color: rgba(0,0,0,0.4);
  }
  .share-guid {
    width: 260px;
    height:180px; 
    right: 5px;
    top: 0px;
     z-index: 2000;
  }
</style>
