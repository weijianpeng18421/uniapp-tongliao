<template>
	<view class="main main-top-bg2 bg-my-gray">
		<cu-custom class="head" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">新能源智能运维移动APP平台</block>
		</cu-custom>
		<view class="cu-bar  bg-white">
			<view class="action">
				<text class="cuIcon-titles text-blue"></text>站内巡检信息
			</view>
		</view>

		<scroll-view scroll-y class="bg-my-gray">
			<form>
				<view class="cu-form-group">
					<view class="title">工作票号</view>
					<input maxlength="50" v-model="siteDetail.wtid" placeholder="请输入工作票号" name="input" class="text-color" @input="inputChange"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">风场名称</view>
					<input maxlength="50" v-model="siteDetail.windFarmName" disabled placeholder="请输入风场名称" name="input" class="text-color"
					 @input="inputChange"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">巡检次数</view>
					<input maxlength="50" v-model="siteDetail.patrolNum" disabled placeholder="请输入巡检次数" name="input" class="text-color"
					 @input="inputChange"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">巡检日期</view>
					<input maxlength="50" v-model="siteDetail.patrolDate" disabled placeholder="请输入巡检日期" name="input" class="text-color"
					 @input="inputChange"></input>
				</view>
			</form>
			<view class="flex">
				<view class="flex-sub padding-sm margin-xs radius text-center">
					<button class="cu-btn bg-green shadow common-btn common-btn-cur" @click="goScan">确定</button>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		getByKey,
		setByKey
	} from '../../util/auth.js'
	import {
		isNullOrEmpty,
		objIsNullOrEmpty
	} from '../../util/stringUtil.js'
	import {
		mapGetters
	} from 'vuex'

	export default {
		data() {
			return {
				inspectionIndex: 'test',
				inspectionItem: [],
				siteDetail: {
					wtid: '',
					windFarmId: '', //风场id
					windFarmName: '', //风场名称
					patrolNum: '',
					patrolDate: ''
				},
				content: '',
				sitList: ''
			}
		},
		onLoad() {
			let _this = this
			this.getCode()
		},
		methods: {
			RadioChange(e) {
				this.inspectionIndex = e.detail.value
			},
			goScan(e) {
				var _this = this
				var flag = true
				if (isNullOrEmpty(_this.siteDetail.wtid)) {
						_this.content = '请将巡检信息填写完整'
						uni.showToast({
							title: _this.content,
							position: 'center',
							icon: 'none',
							duration: 1000
						})
				} else {
					_this.sitList.wtid = _this.siteDetail.wtid
					setByKey('currentJsonData',_this.sitList)
					uni.navigateTo({
						url: 'insidePatrolCheck'
					});
				}
			},
			inputChange() {
				this.content = ''
			},
			// getData() {
			// 	var date = new Date();
			// 	var formatDate = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日 ' + date.getHours() +
			// 		':' + (date.getMinutes() > 10 ? date.getMinutes() : '0' + date.getMinutes());
			// 	this.siteDetail.patrolDate = formatDate
			// },
			getCode() {
				var _this = this
				_this.sitList = getByKey('currentJsonData')
				if (_this.sitList != '') {
					_this.siteDetail.windFarmId = _this.sitList.windFarmId
					_this.siteDetail.windFarmName = _this.sitList.windFarmName
					_this.siteDetail.patrolNum = _this.sitList.patrolNum
					_this.siteDetail.patrolDate = _this.sitList.workDate
				}
			}
		}
	}
</script>

<style>
	@import url("../../static/app.css");
	@import url("../../colorui/main.css");

	uni-page-body {
		height: 100%;
	}

	body {
		height: 100%;
		font-size: 25px !important;
	}

	.check-end-text {
		color: #FF0000;
		text-align: center !important;
		font-size: 15px;
		margin-top: 20px;
	}
</style>
