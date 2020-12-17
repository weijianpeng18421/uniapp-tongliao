<template>
	<view class="login-bg">
		<scroll-view class="page">
			<view class="text-center logo-top">
				<image class="company-log" src="../../static/company_logo.png"></image>
			</view>
			<view class="solid-bottom text-xl padding text-center">
				<text class="text-white text-bold">华电蒙东数字化智能巡检平台</text>
			</view>
			<view class="cu-card case">
				<view class="cu-item shadow">
					<view class="cu-form-group padding-xs">
						<text class="cuIcon-people input-icon"></text>
						<input class="text-white" v-model="userName" size="mini" placeholder="用户名" name="input"></input>
					</view>
				</view>
				<view class="cu-item shadow">
					<view class="cu-form-group padding-xs">
						<text class="cuIcon-attention input-icon"></text>
						<input class="text-white" v-model="password" placeholder="密码" type="password" name="password"></input>
					</view>
				</view>
			</view>
			<!-- 			<view class="flex login-tips">
				<view class="flex-sub">
					<checkbox :class="checkbox[0].checked?'checked':''" :checked="checkbox[0].checked?true:false" value="A" style="zoom:70%;"></checkbox>
					<text class="text-white remember">记住密码</text>
				</view>
				<view class="flex-sub text-right">
					<text class="text-white">忘记密码</text>
				</view>
			</view> -->
			<view class="login-btn-view">
				<button class="cu-btn login-btn app-btn opic" @click="goLogin()">登录</button>
			</view>
			<button class="cu-btn host-btn" @click="showChange()"></button>
			<view class="host" v-if="isShow">
				<view class="cu-form-group">
					<input v-model="curHost" size="mini" placeholder="输入IP地址" name="input"></input>
					<button class="cu-btn" @click="changeIP()">修改</button>
				</view>
			</view>
		</scroll-view>
		<view class="cu-load load-modal" v-if="loadModal">
			<image src="/static/bug.png" mode="aspectFit"></image>
			<view class="gray-text">正在连接...</view>
		</view>
	</view>
</template>

<script>
	import Request from 'luch-request'
	import {
		setToken
	} from '../../util/auth.js'
	import devConfig from '../../api/config.js'
	import {
		getByKey,
		setByKey
	} from '../../util/auth.js'
	export default {
		data() {
			return {
				PageCur: 'basics',
				loadModal:false,
				modelContent: '',
				userMessage: null,
				modalName: null,
				userName: '',
				password: '',
				checkbox: [{
					value: 'A',
					checked: true
				}, {
					value: 'B',
					checked: false
				}],
				curHost: '',
				isShow: false
			}
		},
		onLoad() {
			this.curHost = getByKey('LOGINHOST')
			if (this.curHost === '') {
				this.curHost = devConfig.BASE_API
				setByKey('LOGINHOST', this.curHost)
			}
			if (getByKey('USERNAME') != '') {
				this.userName = getByKey('USERNAME')
			}
			
			var aData = new Date();
			this.value = aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate();
			console.log(this.value)
			if(this.value == '2020-12-20'){
				this.loadModal = true
			}
		},
		methods: {
			showChange: function() {
				this.isShow = !this.isShow
			},
			changeIP: function() {
				var _this = this
				setByKey('LOGINHOST', _this.curHost)
			},
			goLogin: function() {
				var _this = this
				const http = new Request()
				var config = {
					baseURL: _this.curHost
				}
				http.setConfig((config) => {
					config.baseURL = _this.curHost
					return config
				})
				http.get('/md/login?username=' + _this.userName + '&password=' + _this.password).then(res => {
					var result = res.data.flag
					if (result == 'true') {
						var data = res.data.token
						setToken(data)
						setByKey('USERNAME', _this.userName)
						setByKey('PERMISSIONLIST', res.data.permissionList)
						uni.redirectTo({
							url: 'inspectionIndex'
						});
					} else {
						uni.showToast({
							title: '请输入正确的账号密码',
							position: 'bottom',
							icon: 'none',
							duration: 1000
						})
					}
				})
			}
		}
	}
</script>

<style>
	@import url("../../static/app.css");

	body,
	html {
		height: 100%;
		background-color: #333;
		overflow-y: hidden;
	}


	body.pages-electric-index uni-page-body {
		height: 100%;
	}

	body.pages-electric-index uni-page-body {
		height: 100%;
	}
	uni-app {
		height: 100%;
		/* overflow: hidden; */
	}
	uni-page {
		height: 100%;
		/* overflow: hidden; */
	}
	uni-page-body {
		height: 100%;
		overflow: hidden;
	}
	.page {
		height: 100%;
		margin-bottom: 20px;
	}

	.opic{
		background: rgba(0,0,0,0) !important;
	}
	.host {
		color: white;
		position: fixed;
		right: 0;
		bottom: 0;
	}

	.host-btn {
		color: black;
		position: fixed;
		left: 0;
		bottom: 0;
		background: none;
		opacity: 0;
	}
	.cu-item{
		background-color: transparent !important;
		color: white;
		
	}
	.cu-form-group{
		background-color: transparent !important;
		color: white !important;
	}
	input{
		color: white !important;
	}
	.uni-input-placeholder{
		color: #e1e1e1;
	}
</style>
