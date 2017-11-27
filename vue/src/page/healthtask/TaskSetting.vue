<template>
	<div  class="task_wrapper" v-title :data-title="'任务设置'">
		<loading v-if="isLoading"></loading>
		<NavigateBar :options="navigateBarOptions" v-if="!commonIsApp"></NavigateBar>
		<div class="clearfix  bg_gray" :class="{'hasNavigateBar':!commonIsApp}">
			<ul class=" mt24 bg_white">
				<li class="clearfix1 lhh50 typo_middle setting_item pl20 pr20">
					<label for="" class="fl c_333">接收推送消息</label>
					<mt-switch v-model="notice_switch" class="fr mt12" @change="switchNotice"></mt-switch>
				</li>
				<li class="clearfix1 lhh50 typo_middle setting_item pl20 pr20">
					<label for="" class="fl c_333">设置提醒
						<span class="c_bebebe typo_small pl5"><i v-if="tip_time == '08:00'">默认</i>每天<span class="typo_green">{{tip_time}}</span>点提醒</span>
					</label>
					<span class="fr typo_small updata typo_green" id="update">修改</span>
					<!-- <span class="fr typo_small updata typo_green"  @click="openPicker()">修改</span> -->
					<mt-datetime-picker
					ref="picker"
					type="time"
					@confirm="handleConfirm"
					v-model="tip_time">
				</mt-datetime-picker>
			</li>
		</ul>
	</div>
	<!-- <FullButton :content="'删除任务'" :bgColor="'#FFF'" :color="'#FF7777'" @click.native="delTask()"></FullButton> -->
</div>
</template>

<script>	
	import FullButton from '../../components/common/FullBotton.vue';
	import NavigateBar from '../../components/common/NavigateBar.vue';
	import * as api from './api/api.js';
	import {Toast} from 'mint-ui';
	import Vue from 'vue';
	import { Switch ,DatetimePicker} from 'mint-ui';
	import {mapGetters} from 'vuex';
	Vue.component(Switch.name, Switch);
	Vue.component(DatetimePicker.name, DatetimePicker);
	export default {
		data(){
			return {
				navigateBarOptions:{
					iconLeftCode:'&#xe60e;',
					title:'任务设置',
					bgColor:'#fff',
					color:'#000'
				},
				notice_switch:false,
				tip_time:'08:00',
				task_id:''
			}
		},
		computed:{
			...mapGetters([
				'isLoading',
				'commonIsApp'
			])
		},
		methods:{
			openPicker() {
				this.$refs.picker.open();   
			},
			handleConfirm(value ){
				var notice_switch = this.notice_switch == true ? 1 : 0,
					type = 'sign-notice',
					tip_time = value;
				api.saveNotive({notice_switch,type,tip_time},(data)=>{
					if(data.state == 1) {
						Toast({
							message: '修改成功',
							position: 'middle',
							duration: 1000,
							className: 'c_white'
						});
					}else {
						Toast({
							message: '修改失败',
							position: 'middle',
							duration: 1000,
							className: 'c_white'
						});
					}
				},(error)=>{	
					console.log(error);
				})
			},		
			switchNotice(){
				setTimeout(()=>{
					var notice_switch = this.notice_switch == true ? 1 : 0,
					task_id = this.task_id,
					type = 'sign-notice',
					tip_time = this.tip_time || '08:00';
					api.saveNotive({notice_switch,type,tip_time},(data)=>{
						if(data.state == 1) {
							Toast({
								message: '修改成功',
								position: 'middle',
								duration: 1000,
								className: 'c_white'
							});
						}
					},(error)=>{	
						console.log(error);
					})
				},300)
				
			},
			getSettings(task_id){
				api.getSettings({},(data)=>{
					if(data.state == 1) {
						this.tip_time = data.data.tip_time || '08:00';
						this.notice_switch = data.data.switch == 1 ? true:false;
					}
				},(error)=>{
					console.log(error);
				})
			}
		},
		mounted(){
			this.task_id = this.$route.query.task_id;
			this.getSettings();
			var that = this;
			document.getElementById('update').onclick = function(){
				that.$refs.picker.open();   
			}
		},
		components:{
			FullButton,
			NavigateBar
		}
	}
</script>

<style scoped lang = 'scss'>
	.lhh50 {
		line-height: 1.33333rem;
		height: 1.33333rem;
	}
	.clearfix1::after {
		content: '';
		display: block;
		width: 100%;
		height: 0;
		clear: both;
		visibility: hidden;
	}
	.c_bebebe {
		color: #BEBEBE ;
	} 
	.mt24 {
		margin-top: 0.64rem;
	}
	.mt12 {
		margin-top: 12px;
	}
	.setting_item {
		border-bottom: 1px solid #E9E9E9 ;
	}
	.setting_item:last-child {
		border:none;
	}
	.updata {
		text-decoration: underline;
	}
</style>