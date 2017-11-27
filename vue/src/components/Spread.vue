<template>
    <div class="bg_white relative clearfix1 clearfix" ref="box" :class="{clearfix:isSpread}">
        <slot ></slot>
        <template v-if="length > 3">
            <div class="textc spread_btn" v-if="!isSpread" @click="toggle(1)">展开更多 <span class="iconfont">&#xe625;</span></div>
            <div class="textc spread_btn" v-else @click="toggle(2)">收起 <span class="iconfont">&#xe626;</span></div>      
        </template>

    </div>
</template>

<script>

    export default {
        data(){
            return {
                isSpread:false,
                _height:'100px',
            }
        },
        methods:{
            toggle(i){
                this.isSpread = !this.isSpread ;
                if(i === 1 ) {
                    this.$refs.box.style.maxHeight = null;       
                }else {
                    this.$refs.box.style.maxHeight = this.height;       
                }
            }
        },
        props:['height','length'],
        mounted(){
         this.$refs.box.style.maxHeight = this.height;         
     }
 }
</script>

<style scoped lang="scss">
    .spread_btn {
        position:absolute;
        bottom:0;
        width:100%;
        height:0.8rem;
        line-height:.533333rem;
        z-index:2;
        background: #fff;
    }
</style>