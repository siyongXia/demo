<template>
	<a :href="infobox.link_url">
		<span class="imgs backgroundimg"  v-bind="{style:'background-image:url('+ infobox.cover +')'}"></span>
		<div class="newlist-item-info">
			<p class="typo_middle typo_black lh20 h40 overtwo">{{infobox.title}}</p>
			<p class="elli typo_smaller typo_gray lh18">
				<img :src="infobox.doctor_avatar?infobox.doctor_avatar:noimg" class="fleft newimgs">
				{{infobox.doctor_name}}
				{{infobox.unit_name}}
			</p>
		</div>
	</a>
</template>
<script>
	export default {
		data(){
			return{
				defaultimg:require('../images/noimglogo.jpg'),
				noimg:require('../images/noavatar_0.jpg'),
			}
		},
		props:['infobox']	
	}
</script>
<style scoped lang = 'scss'>
	.newimgs{ display: inline-block; width: 0.373333rem;height: 0.373333rem; margin-top: 0.053333rem; margin-right:0.133333rem; border-radius: 100%;}
</style>