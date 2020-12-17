<template>
	<view class="main  bg-my-gray">
		<cu-custom class="head" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">扫码设备二维码</block>
		</cu-custom>
		<view class="text-center padding" style="margin-top: 20%;">
			<image src="../../static/scan.png" style="width: 120px;height: 120px;"></image>
			<view class="">
				<text class=" text-center">{{content}}</text>
			</view>
			<view class="split-title" v-if="code!=''">
				<text class="">{{code}}</text>
			</view>
			<button class="cu-btn bg-green shadow common-btn common-btn-cur" @tap="goScan">扫一扫</button>
		</view>
	</view>
</template>

<script>
	import {getByKey ,setByKey} from '../../util/auth.js'
	export default {
		data() {
			return {
				inspectionIndex: '1',
				content:'请扫描设备上的二维码获取风场相关信息',
				code:''
			}
		},
		onLoad() {

		},
		methods: {
			goScan(e){
				var _this = this
				uni.scanCode({
				    onlyFromCamera: true,
				    success: function (res) {
						_this.code = res.result
						setByKey('code',_this.code)
						uni.navigateTo({
							url:'inspectionHeader'
						})
				    }
				});
			}
		}
	}
</script>

<style>
	@import url("../../static/app.css");
	@import url("../../colorui/main.css");
	uni-page-body{
		height: 100%;
	}
	.main{
		background-color: #F1F1F1;
	}
	body{
		height: 100%;
	}
</style>
