<template>    
    <div class="typo_small lh1 bg_gray fullwidth health_product" v-title :data-title="title" ref="product">   
        <loading v-show="isLoading"></loading>     
        <div class="relative">
            <!-- 顶部轮播图 -->
            <mt-swipe :auto="4000" :continuous="true">
              <mt-swipe-item  v-for="(item,index) in bannerList">
                  <img :src="imgDomain + item" alt="" class="banner_img">   
              </mt-swipe-item>
            </mt-swipe>
          <!--   <swiper :options="bannerSwiperOption" ref="mySwiper" class="rec_pro_wrap clearfix bg_gray">
           slides
            <swiper-slide class=""  v-for="(item,index) in bannerList">
                 <img :src="imgDomain + item" alt="" class="banner_img">               
             </swiper-slide>   
             <div class="swiper-pagination" slot="pagination"></div>                   
                     </swiper> -->
            <!-- 支付类型为定金且规格产品价格不一样 -->
            <div class="advance_payment lhh50 pl15" v-if=" payment == 1 && pay_method==1">
                <span class="typo_white fs26">￥{{price_space}}</span>
                <span class="fr typo_white typo_large pr25 pl30 bg_orange fullheight btn">预付</span>
            </div>
            <!-- 支付类型为定金且规格产品价格一样 -->
            <div class="advance_payment lhh50 pl15" v-if=" payment == 1 && pay_method==2" >
                <span class="typo_white fs26">￥</span><span class="pr14 typo_white typo_xxlarge">{{goodsParts.price}}</span>
                <span class="typo_small typo_white line_through">￥{{goodsParts.orgPrice}}</span>
                <span class="fr typo_white typo_large pr25 pl30 bg_orange fullheight btn">预付</span>
            </div>  
        </div>
<div class="pro_des bg_white">  
    <!-- 定金支付 -->
    <template v-if="payment == 1">
        <div class="typo_orange typo_large lh24">预付定金
            <span class="typo_orange typo_xsmall">￥</span>{{goodsParts.deposit || 0}}
        </div>
        <div class="typo_gray lh20 mb8">到店付<span class="typo_gray typo_xsmall">￥</span>{{arrive_pay}}</div>
    </template>
    <div class="typo_middle title lh20 mb5 overtwo typo_black0">{{goodsParts.name}}</div>
    <div class="desc typo_gray lh20 overthree">{{goodsParts.subhead}}</div>
    <!-- 非定金支付 -->
    <template v-if="payment != 1 ">
        <!-- 区间价 -->
        <div class="price lh30" v-if="pay_method == 1">
           <span class="typo_orange ">￥</span><span class="pr14 typo_orange typo_xxlarge">{{price_space}}</span>
           <span class="typo_smaller typo_gray line_through">￥{{orgPrice_space}}</span>
       </div>
       <!-- 非区间价 -->
       <div class="price lh30" v-if="pay_method == 2">
           <span class="typo_orange ">￥</span><span class="pr14 typo_orange typo_xxlarge">{{goodsParts.price}}</span>
           <span class="typo_smaller typo_gray line_through">￥{{goodsParts.orgPrice}}</span>
       </div>
       <div class="lh20">
           <span class="typo_green mr15">限量 {{goodsParts.stock}}</span>
           <!-- 暂时注销,因为前期销量太小不展示 -->
           <!-- <span class="typo_gray">已售 {{goodsParts.sales || 0}}</span> -->
        </div>
   </template>
   <template v-if="payment== 1">
    <div class="lh20 pt10">
       <span class="typo_green mr15">限量 {{infos.goodsParts.stock}}</span>
       <!-- 暂时注销,因为前期销量太小不展示 -->
       <!-- <span class="typo_gray">已售 {{goodsParts.sales || 0}}</span> -->
   </div>
</template>

</div>
<!-- 相关标签 -->
<div class="pro_label bg_white mb10 relative" @click="showServiceBox()" v-if="serviceParts && serviceParts.length >0">
    <span class="label_item" v-for="item in serviceParts">
      <span class="iconfont c_00d7c4 typo_middle mr5">&#xe6ce;</span><span class="fs13 typo_gray">{{item.name}}</span>
  </span>
  <span class="iconfont  d1d1d1 icon_right mr15">&#xe619;</span>
</div>
<!-- 医生信息 -->
<div class="doc_info bg_white" v-if="docRelation.unit_id || docRelation.doctor_id">
    <div class="wrapper relative ">
        <div class="hospital relative " v-if="docRelation.unit_id" :class="docRelation.doctor_id ? 'bor_b':''">
            <div  @click="getBranch(docRelation.unit_id)" class="clearfix1">
                <img :src="docRelation.unit_image" alt="" class="avatar fl mr10"  :onerror="default_hos_img">
                <div class="hos_wrap ">
                    <div class="hos_name pt10 typo_dgray elli">{{docRelation.unit_name}}</div>
                    <div class="hos_score " v-if="docRelation.unit_score">
                        <span class="iconfont yellow" v-for=" item in stars">&#xe628;</span>
                    </div>

                </div>
            </div>           
            <span class="iconfont icon_right d1d1d1">&#xe619;</span>
        </div>
        <div class="relative" v-if="docRelation.doctor_id">
            <a :href="'/doctor/detail.html?unit_id='+docRelation.unit_id+'&doc_id='+docRelation.doctor_id+'&dep_id='+docRelation.dep_id">
                 <div class="sub_title typo_dgray elli">
                    <span>{{docRelation.doctor_name}}</span><span>{{docRelation.doctor_level_name}}</span><span v-if="docRelation.doctor_score"> {{docRelation.doctor_score}}分</span>
                     <i class="iconfont fr d1d1d1">&#xe619;</i>
                </div>
                <div class="labels clearfix ">
                    <div class="label_item" v-for="(item,index) in docRelation.doctor_ill_tag">{{item.ill_name}}</div>
                </div>
                <!-- <span class="iconfont icon_right d1d1d1">&#xe619;</span> -->
            </a>           
        </div>

    </div>
</div>
<div class="pro_label bg_white  clearfix" @click="showCategoryBox()">
    <!-- <div class="fl">已选：<span class="typo_dgray">{{defaultCate.name}}，{{count}}次</span></div> -->
    <div class="fl">已选：<span class="typo_dgray">{{selectedProduct}}</span></div>
    <span class="iconfont fr d1d1d1">&#xe619;</span>
</div>
<div class=" bg_gray  textc">
    <span class="dividle typo_gray"><span class="iconfont typo_gray mr5">&#xe6d4;</span>详情</span>
</div>
<!--详情  -->
<div class="pro_detail bg_white" >
    <div v-html="detailParts.detail" class="container pt10 pb10"></div>
    <!-- goodType字段中有appointment代表后台配了就诊需知 -->
    <div class="purchase_notice " v-if="goodsParts.goodType && goodsParts.goodType.indexOf('appointment') !== -1">
        <div class="sub_title typo_dgray">
            <span>购买须知</span>
        </div>
        <div class="notice_item mt15 lh18">
            <div class="fs13 typo_dgray">有效日期</div>
            <div class="typo_smaller typo_gray">{{enduration}}</div>
        </div>
        <div class="notice_item mt15 lh18">
            <div class="fs13 typo_dgray">可预约时间段</div>
            <div class="typo_smaller typo_gray">{{appointmentParts.desc}}</div>
        </div>
        <div class="notice_item mt15 lh18">
            <div class="fs13 typo_dgray">除外日期</div>
            <div class="typo_smaller typo_gray">{{appointmentParts.exceptDate}}</div>
        </div>
        <div class="notice_item mt15 lh18">
            <div class="fs13 typo_dgray">适用人群</div>
            <div class="typo_smaller typo_gray">{{appointmentParts.fitPeople == 1 ? '男' : appointmentParts.fitPeople == 2 ?'女':'不限'}}</div>
        </div>
        <div class="notice_item mt15 lh18">
            <div class="fs13 typo_dgray">适用人数</div>
            <div class="typo_smaller typo_gray">{{appointmentParts.fitNum}}</div>
        </div>
        <div class="notice_item mt15 lh18">
            <div class="fs13 typo_dgray">预约规则 </div>
            <div class="typo_smaller typo_gray">{{appointmentParts.rule}}</div>
        </div>
    </div>
</div>
<div class=" bg_gray  textc" v-if="brandList.length >= 2 || otherBrandList.length >= 2 ">
    <span class="dividle typo_gray"><span class="iconfont typo_gray mr5">&#xe6d5;</span>推荐</span>
</div>
<!-- 品牌推荐 -->
<div class="rec_item mb10" v-if="brandList.length >= 2">
    <div class="pl15 bg_white clearfix">
        <div class="sub_title typo_dgray">
            <span>品牌推荐</span>
        </div>
    </div>
    <swiper :options="swiperOption" ref="mySwiper" class="rec_pro_wrap clearfix bg_gray">
    <!-- slides -->
    <swiper-slide class="list_item bg_white" v-for="(item,index) in brandList">
        <router-link :to="'product.html?goods_id='+item.id">
         <!--   <div class="backgroundimg" :style="{'height':'100%','width':'80%','background-image':'url('+imgDomain + JSON.parse(item.img)[0]+')'}"></div> -->
            <img :src="imgDomain + JSON.parse(item.img)[0]" alt="" class="list_item_img" style="height:3.73333rem;">
            <h5 class="list_item_title">{{item.name}}</h5>
            <div class="price lh30">
                <span class="typo_orange ">￥</span><span class="pr14 typo_orange typo_middle">{{item.price}}</span>
                <span class="typo_smaller typo_gray line_through">￥{{item.orgPrice}}</span>
            </div>
        </router-link>
    </swiper-slide>
</swiper>
</div>
<!-- 小六推荐 -->
<div class="rec_item mb10" v-if="otherBrandList.length >= 2">
    <div class="pl15 bg_white clearfix">
        <div class="sub_title typo_dgray">
            <span>小六推荐</span>
        </div>
    </div>
    <swiper :options="swiperOption" ref="mySwiper" class="rec_pro_wrap clearfix bg_gray">
        <!-- slides -->
        <swiper-slide class="list_item bg_white" v-for="(item,index) in otherBrandList">
            <router-link :to="'product.html?goods_id='+item.id">
                <img :src="imgDomain + JSON.parse(item.img)[0]" alt="" class="list_item_img" style="height:3.73333rem;">
                <!-- <img :src="imgDomain + JSON.parse(item.img)[0]" alt="" class="list_item_img"> -->
                <h5 class="list_item_title">{{item.name}}</h5>
                <div class="price lh30">
                    <span class="typo_orange ">￥</span><span class="pr14 typo_orange typo_middle">{{item.price}}</span>
                    <span class="typo_smaller typo_gray line_through">￥{{item.orgPrice}}</span>
                </div>
            </router-link>

        </swiper-slide>
    </swiper>
</div>
<template>
    <div class="tips container bg_orange lhh50" v-if="snapshot == 1 && goodsState != 0">
        <span class="typo_white">您现在查看的是交易快照</span>
        <div class="go_detail typo_white inblo lh1 fr mt10" @click="refresh()">查看最新详情</div>
    </div>
    <div class="tips textc bg_4a4a4a typo_white lhh40" v-if="goodsState == 0">当前商品已下架</div> 
</template>
<!-- 遮罩层 -->
<mask-box v-show="isMaskBoxShow" @close="hideBox"></mask-box>
<!-- 分类 -->
<div class=" fix_bottom category bg_white " v-show="isCategoryBoxShow">
    <div class="clearfix1 container">
        <div class="img_wrap mr15 fl">
            <img :src="imgDomain + defaultCate.img" alt="" class="pro_img">
        </div>
        <div class="fl " :class="payment == 1 ? 'pt20' : 'pt35'">
            <div class="typo_orange mb5 typo_xxlarge"><span class="typo_orange typo_xsmall">￥</span>{{(defaultCate.price * count)|toFixed(2)}}</div>
            <div class="typo_smaller pb5" v-if="payment == 1">
                <span class="typo_orange mr12" v-if="payment == 1">预付定金<span class="typo_orange">￥</span>{{infos.goodsParts.deposit * count}}</span>
                <span class="typo_gray">到店付<span class="typo_gray">￥</span>{{ (defaultCate.price - infos.goodsParts.deposit) * count}}</span>
            </div>
            <div class="fs13 typo_gray">库存：{{defaultCate.stock }}</div>
        </div>
        <div class="fr fs30 typo_gray" @click="hideBox">&times;</div>
    </div>
    <!-- 规格 -->
    <div class="standard container mb20">
        <div class=" typo_gray lh18">规格</div>
        <div class="labels clearfix" @click="selectCate($event,this)">
            <template v-for="(item,index) in infos.goodsSpecialParts">
                <span :class="item.specialId == defaultCate.specialId ? 'bor_green typo_green' : 'bor_gray typo_gray'" :data-cate_id="item.specialId">{{item.name}}</span>
            </template>
        </div>
    </div>
        <!-- 数量 -->
    <div class="container clearfix1 count">
            <span class="fl typo_gray">数量:<span class="pl10">{{count}}</span></span>
            <addCount class="fr" :maxCount="Number(defaultCate.stock)" :minCount="minCount" @count="getCount" ref="addCount"></addCount>
        </div>
        <button class="lhh50 textc typo_white typo_middle bg_green fullwidth" @click="submitOrder()" :disabled="defaultCate.stock == 0">确定</button>
    </div>
    <!-- 特色服务 -->
    <div class=" bg_white fix_bottom pt20" v-show="isServiceBoxShow">
        <div class="fr fs30 typo_gray mt_10 mr10" @click="hideBox">&times;</div>
        <div class="spe_service">
            <div class="typo_large typo_dgray textc bold mb20">特色服务</div>
            <ul class="max_height_300">
                <li class="mb15" v-for="item in infos.serviceParts">
                    <div class="c_333 lh22 typo_middle mb5">{{item.name}}</div>
                    <div class="typo_gray">{{item.explain}}</div>
                </li>
            </ul>
        </div>
        <button class="lhh50 textc typo_white typo_middle bg_green fullwidth" @click="hideBox">确定</button>
    </div>
    <!-- footer -->
    <div style="height:2.13333rem;"></div>
    <div class="footer clearfix typo_middle">
        <button class="bg_white typo_dgray bor_r" disabled>在线咨询</button>
        <button class="bg_green typo_white"  :disabled="goodsParts.stock == 0 || goodsState == 0"  @click="purchase">{{payment == 0 ? '立即购买' :payment == 1 ? '支付定金':'立即预约' }}</button>
    </div>
    <scrollTop></scrollTop>
    <BranchBox :list="branchList" v-if="isBranchBoxShow" @close="closeBranchBox"></BranchBox>
    </div>
</template>

<script>
    import Product from './Product.js';
    export default Product;
</script>
<style scoped lang="scss">
    @import '../../../style/mint-ui.min';
    @import '../css/health_commom';
    @import './Product.scss';
</style>