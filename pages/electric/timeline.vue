<template>
	<view class="main main-top-bg2">
		<cu-custom class="head" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">审批进度</block>
		</cu-custom>
		<view class="cu-timeline">
			<view class="cu-time">申请</view>
			<view class="cu-item cur text-blue">
				<view class="content bg-blue shadow-blur">
					<view>单位：{{applyUnit}}</view>
					<view>申请人：{{applyName}}</view>
					<view>申请时间：{{applyTime}}</view>
				</view>
			</view>
			<view class="cu-time">审批</view>
			<view class="cu-item cur text-blue" v-for="(item,index) in checkList" :key="index">
				<view class="content bg-blue shadow-blur">
					<view>流程名称：{{item.approves_name}}</view>
					<view>审批人员：{{item.person_name}}</view>
					<view>意见：{{item.idea_name}}</view>
					<view>备注：{{item.note}}</view>
					<view>审批时间：{{item.approve_data}}</view>
				</view>
			</view>
			<view class="cu-time">审批结果</view>
		</view>



	</view>
</template>

<script>
	import {
		applyLook,orderLook
	} from '../../api/user.js'
	export default {
		data() {
			return {
				type:'',
				uid:'',
				localTime: '',
				applyTime: '',
				applyUnit: '',
				applyName: '',
				checkList:[]
			};
		},
		onLoad(option) {
			var _this = this
			_this.type = option.type
			_this.uid = option.uid
			_this.applyTime = option.time
			_this.applyName = option.name
			_this.applyUnit = option.unit
			_this.getPlan()
		},
		methods: {
			getPlan(){
				var _this = this
				if(_this.uid !== undefined){
					if(_this.type == 'apply'){
					applyLook(_this.uid).then(res => {
						if(res.list.length !== 0){
							_this.checkList = res.list
						}
					})
					}else if(_this.type == 'order'){
						orderLook(_this.uid).then(res => {
							if(res.list.length !== 0){
								_this.checkList = res.list
							}
						})
					}
				}
			},
			getDate() {
				var date = new Date();
				var formatDate = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日 ' + date.getHours() +
					':' + (date.getMinutes() > 10 ? date.getMinutes() : '0' + date.getMinutes());
				this.localTime = formatDate
			}
		}
	}
</script>

<style>
	@import url("../../static/app.css");
	@import url("../../colorui/main.css");

	uni-page-body {
		height: 100%;
		background-color: #ffffff;
	}

	body {
		height: 100%;
		font-size: 20px !important;
		background-color: #ffffff !important;
	}

	.check-end-text {
		color: #FF0000;
		text-align: center !important;
		font-size: 15px;
		margin-top: 20px;
	}

	uni-input {
		font-size: 28px !important;
	}

	.cu-timeline>.cu-item::before {
		background-color: #ffffff !important;
	}

	.cu-timeline {
		background-color: #ffffff !important;
	}
</style>
