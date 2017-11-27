<template>
	<div class="fullheight">	
		<transition name="router-fade" mode="out-in">
      <div class="fullheight" >
        <loading v-if="isLoading && $route.meta.loading"></loading>
        <keep-alive >
          <router-view  v-if="$route.meta.keepAlive" ></router-view>
        </keep-alive>
        <router-view  v-if="!$route.meta.keepAlive"></router-view>
      </div>
    	</transition>
    </div>
</template>

<script>
  import { isAppOrWeixin,commonIsApp } from './utils/util.js'
  import { mapGetters } from 'vuex'
  	export default {
      mounted(){
        if(isAppOrWeixin(this)) {
          this.$store.commit('HIDENAVIGATEBAR');
          this.$store.commit('ISAPP');
        };  
       //  if(commonIsApp(this)) {
       //    this.$store.commit('ISAPP');
      	// }
      },
      computed: {
        ...mapGetters([
          'isLoading'
        ])
      }
    }

</script>

<style lang="scss">
  	@import './style/common';
  	@import './style/health';
  	// @import './style/iconFont/iconfont.scss';
	.router-fade-enter-active, .router-fade-leave-active {
	  	transition: opacity .3s;
	}
	.router-fade-enter, .router-fade-leave-active {
	  	opacity: 0;
	}
</style>
