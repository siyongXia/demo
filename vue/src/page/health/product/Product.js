var sharetitle, description, shareurl, shareimg,ret;
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import addCount from 'components/common/addCount.vue';
import maskBox from 'components/common/Mask.vue';
import scrollTop from 'components/common/scrollTop.vue';
import BranchBox from '../branch.vue'
import { mapActions, mapGetters } from 'vuex';
import * as api from '../api/api.js';
import { getAppToken, wxShare } from '../../../utils/util';
import NavigateBar from '../../../components/common/NavigateBar.vue'
import { Swipe, SwipeItem } from 'mint-ui';
import Vue from 'vue'
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
var handler = function () {
    event.preventDefault();
    event.stopPropagation();
};
export default {
    data() {
        return {
            goods_id: '',
            infos: { appointmentParts: '', detailParts: '', goodsParts: '', goodsSpecialParts: '', serviceParts: '', docRelation: '' },
            imgDomain: 'https://images.91160.com/',
            default_hos_img:'this.src="' + require('../images/hos_default.png') + '"',
            appointmentParts:{},
            detailParts:{},
            selectedProduct:'未选择',
            goodsParts:{},
            isBranchBoxShow:false,
            branchList:[],
            snapshot:'',
            goodsState:1,
            title:'健康160',
            goodsSpecialParts:{},
            serviceParts:{},
            docRelation:{},
            defaultCate: {},
            // count: 1,
            payment: '',//支付方式 0 全款 1 定金 2 免支付
            price_space: '',
            orgPrice_space:'',
            tmpCount: 1,
            minCount: 1,
            pay_method: '',//区间价格,2代表无区间,1代表有区间
            isCategoryBoxShow: false,
            isMaskBoxShow: false,
            isServiceBoxShow: false,
            selected_cate_id: 0,
            bannerList: [],
            brandList: {},
            otherBrandList: {},
            bannerSwiperOption: {
                autoplay:3500,
                loop:true,
                direction: 'horizontal',
                grabCursor: true,
                autoHeight: true,
                pagination: '.swiper-pagination',
            },
            swiperOption: {
                direction: 'horizontal',
                paginationClickable :true,
                prevButton:'.swiper-button-prev',
                nextButton:'.swiper-button-next',
                grabCursor: true,
                setWrapperSize: true,
                autoHeight: true,
                pagination: '.swiper-pagination',
                slidesPerView: 2.12,
                spaceBetween: 5
            },
            navigateBarOptions:{
                iconLeftCode:'&#xe60e;',
                title:'我的服务订单',
                bgColor:'#00d2c3',
                color:'#fff',
                iconClass:'c_white',
                iconRightCode:''
            }
        }
    },
    computed: {
        ...mapGetters('health', [
            'count',
        ]),
        ...mapGetters([
          'isLoading'
        ]),
        arrive_pay() {
             var deposit = this.goodsParts.deposit;
            if(this.pay_method == 1) {               
                var arr = this.price_space.split('-');
                if(arr.length < 2) {
                     return (parseFloat(arr[0]) - deposit);
                }else {
                    return (parseFloat(arr[0]) - deposit) + '-' + (parseFloat(arr[1]) - deposit);
                }
            }else if(this.pay_method == 2){
                return this.defaultCate.price - deposit;
            }           
        },
        orgPrice_space(){
            var deposit = this.goodsParts.deposit;
            var arr = this.orgPrice_space.split('-');
            return (parseFloat(arr[0]) - deposit) + '-' + (parseFloat(arr[1]) - deposit);
        },
        infos() {
            return JSON.parse(window.sessionStorage.getItem('infos'));
        },
        stars(){
            return Math.ceil(parseInt(this.docRelation.unit_score)/2);
        },
        period (){
            if(this.appointmentParts.isAllday == 1) {
                return '全天有效';
            }else {
                var str = '';
                if(this.appointmentParts.amStart > 0){
                    str += '早上' + this.appointmentParts.amStart  + '-' + this.appointmentParts.amEnd;
                }
                if(this.appointmentParts.pmStart > 0) {
                    str += '下午'  + this.appointmentParts.pmStart  + '-' + this.appointmentParts.pmEnd;
                }
                return str;
            }
        },
        enduration(){
            if(this.appointmentParts.isEnduring == 1) {
                return '长期有效'
            }else {
               return this.appointmentParts.startTime  + ' - ' + this.appointmentParts.endTime
            }
        }
    },
    methods: {
        ...mapActions('health', [
            'getCount'
        ]),      
        getData(goods_id) {
            this.$http.get('/health/detail.html', { params: { goods_id } })
                .then((res) => {
                    if (res.status == 200) {
                        this.infos = res.data.data;
                        this.initCategoryBox();
                    }
                }).catch((err) => {
                    console.log(err);
                })
        }, 
        pullUpNativeHos (unit_id) { //拉取原生医院主页
            if ((typeof (mJavaScriptObject) == 'object')) {         
                mJavaScriptObject.funGotoHospitalHomePage(unit_id,0)
            } else {
                window.location.href = '/unit/dep.html?unit_id='+unit_id ;
            }     
        },    
        getBranch(unit_id){
            this.$http.get('/ask/branchUnitList.html',{params:{unit_id:unit_id,is_health:1}}).then((data)=>{
                var data = data.data.data;
                if(data && data.length > 1) {
                    this.branchList = data;   
                    this.isBranchBoxShow = true;  
                    document.body.addEventListener('touchmove',handler,false); 
                }else {
                    this.pullUpNativeHos(unit_id,0);
                }
            }).catch((err)=>{
                console.log(err);
            })           
        },
        closeBranchBox () {
            this.isBranchBoxShow = false;
            document.body.removeEventListener('touchmove',handler,false); 
        },
        initCategoryBox() {
            var categories = this.infos.goodsSpecialParts;
            categories.forEach((item, index) => {
                if (item.isDefault == '1') {
                    this.defaultCate = item;
                }
            })
        },
        getRecommend() {
            api.getRecommend(this.goods_id, (data) => {
                if(!data) return;
                this.brandList = data.brand || [];
                this.otherBrandList = data.orther_brand || [];
            }, (err) => {
                console.log(err);
            })
        },
        submitOrder() {
            this.$router.push({ path: 'orderconfirm.html' });
            document.body.style = '';
        },
        showCategoryBox() {
            this.isCategoryBoxShow = true;
            this.isMaskBoxShow = true;
            document.body.style = 'height:100%;overflow:hidden;';
        },
        showServiceBox() {
            this.isServiceBoxShow = true;
            this.isMaskBoxShow = true;
            document.body.style = 'height:100%;overflow:hidden;';
        },
        hideBox() {
            this.isCategoryBoxShow = false;
            this.isMaskBoxShow = false;
            this.isServiceBoxShow = false;
            this.$refs.addCount.count = 1;
            document.body.style = '';
        },
        purchase() {
            if (this.goodsSpecialParts && this.goodsSpecialParts.length > 1) {
                this.showCategoryBox();
            } else {
                this.$router.push({ path: 'orderconfirm.html' })
            }
        },
        prevent(e) { //防止背景滑动           
            e.preventDefault();
        },
        selectCate(e) {
            var that = this;
            this.infos.goodsSpecialParts.forEach((item, index) => {
                if (item.specialId == e.target.dataset.cate_id) {
                    this.defaultCate = item;
                    this.selectedProduct = item.name;
                    window.sessionStorage.setItem('defaultCate', JSON.stringify(item));
                    this.$refs.addCount.count = 1;
                    return false;
                }
            })
        },    
        selectedCate() {
            this.count = this.tmpCount;
            this.minCount = this.tmpCount;
            this.isCategoryBoxShow = false;
            this.isMaskBoxShow = false;
        },
        getNyAppShare: function () {//app分享获取参数
            var that = this;
            that.cid = this.$route.query.cid
            that.js_app_login_token = getAppToken(that.cid);
            var code = this.$route.query.code;
            var data_v = {
                title: sharetitle,
                details: description,
                img: shareimg,
                timeLineTitle: sharetitle,
                timeLineDetails: description,
                timeLineImg: shareimg,
                shareurl: shareurl
            }     
            if (sharetitle && description && shareimg) {
                this.$http({
                    method: 'get',
                    async: false,
                    url: '/sys/appencrypt.html?cid=' + that.cid + '&jstoken=' + encodeURIComponent(that.js_app_login_token) + '&code=' + code + '&data=' + JSON.stringify(data_v)
                }).then(
                    function (res) {                        
                        ret = res.data.data;                      
                    }
                )
            }
            return ret;
        },
        getProductInfo(goods_id,order_id) {
            api.getProductInfo(goods_id,order_id,
                (data) => {
                    this.snapshot = data.snapshot || 0; //1代表有屏幕快照,0代表没有
                    this.goodsState = data.goodsState || 1;//1代表没有下架,0代表已经下架
                    this.infos = data;
                    this.title = data.goodsParts.name;
                    this.goodsParts = data.goodsParts;
                    this.serviceParts = data.serviceParts;
                    this.payment = data.goodsParts.payment;
                    this.docRelation = data.docRelation;                    
                    this.detailParts = data.detailParts;
                    this.appointmentParts = data.appointmentParts;
                    this.goodsSpecialParts = data.goodsSpecialParts;
                    this.bannerList = JSON.parse(data.goodsParts.img);                   
                    window.sessionStorage.setItem('infos', JSON.stringify(data)); //跳转到confirm页面的时候用
                    window.sessionStorage.setItem('payment', JSON.stringify(data.goodsParts.payment));
                    var categories = data.goodsSpecialParts;
                    categories.map((item, index)=>{//如果规格图片没有,默认使用商品图的第一张
                        if(!item.img) {
                            item.img =  JSON.parse(data.goodsParts.img)[0];
                        }
                    })
                    categories.forEach((item, index) => {//选择默认规格
                        if (item.isDefault == '1') {                            
                            this.defaultCate = item;
                            window.sessionStorage.setItem('defaultCate', JSON.stringify(item));
                            this.price_space = item.price_space;
                            this.orgPrice_space = item.orgPrice_space;
                        }
                    });
                    var goodsSpecialParts = data.goodsSpecialParts;
                    if(goodsSpecialParts && goodsSpecialParts.length == 1) {//如果只有一个规格,则显示默认规格的名字,如果多个规格,则显示未选择
                        this.selectedProduct =  this.defaultCate.name;
                    }
                    goodsSpecialParts.forEach((item, index) => {
                        if (item.price_space) {
                            this.pay_method = 1;
                        }else {
                            this.pay_method = 2;
                        }
                    });
                    var wxShareOptions = {
                        timeLine: {                                 
                            title: this.infos.goodsParts.name,
                            link: '',
                            imgUrl: this.imgDomain + JSON.parse(this.infos.goodsParts.img)[0],
                        },
                        appMessage: {
                            title: this.infos.goodsParts.name,
                            desc: this.infos.goodsParts.subhead || '健康服务', // 分享描述
                            link: '',
                            imgUrl: this.imgDomain + JSON.parse(this.infos.goodsParts.img)[0],
                        },
                        callback: function() {

                        },
                        cancelCallback: function() {

                        }
                    },
                    appShareOptions = {
                        title: this.infos.goodsParts.name,
                        details: this.infos.goodsParts.subhead,
                        img: this.imgDomain + JSON.parse(this.infos.goodsParts.img)[0],
                        timeLineTitle: this.infos.goodsParts.name,
                        timeLineDetails: this.infos.goodsParts.subhead,
                        timeLineImg: this.imgDomain +JSON.parse(this.infos.goodsParts.img)[0],
                        shareurl: location.href
                    }
                    sharetitle =  this.infos.goodsParts.name;
                    description = this.infos.goodsParts.subhead,
                    shareimg = this.imgDomain +JSON.parse(this.infos.goodsParts.img)[0],
                    shareurl = 'https://weixin.91160.com/vue/health/product.html?goods_id='+ goods_id;
                    wxShare(wxShareOptions, this);
                    // getNyAppShare(appShareOptions, this);
                    window.getNyAppShareParam = this.getNyAppShare; 
                },
                (err) => {
                    console.log(err);
                }
            )
        },
        refresh() {
            location.href = location.href.replace(/&order_id=\d+/, '');
        }
    },
    watch:{
        $route(){
            location.reload();
        }
    },
    mounted() {
        this.goods_id = this.$route.query.goods_id;
        var order_id = this.$route.query.order_id || '';
        this.getProductInfo(this.goods_id,order_id);
        this.getRecommend();

    },
    components: {
        swiper,
        swiperSlide,
        addCount,
        maskBox,
        scrollTop,
        NavigateBar,
        BranchBox
    }
}