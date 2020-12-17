<template>
	<view class="main main-top-bg2">
		<cu-custom class="head" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">设备详情</block>
		</cu-custom>
		<scroll-view scroll-y class="detail-content">
			<view class="flex detail detail-first" >
				<view class="flex-sub ">公司名称：</view>
				<view class="flex-sub ">苇湖梁新能源公司</view>
			</view>
			<view class="flex detail " >
				<view class="flex-sub ">场站名称：</view>
				<view class="flex-sub ">xxx</view>
			</view>
			<view class="flex detail " >
				<view class="flex-sub ">金额合计：</view>
				<view class="flex-sub ">xxx</view>
			</view>
			<view class="flex detail " >
				<view class="flex-sub ">采购原因：</view>
				<view class="flex-sub ">由于设备部需要,xxxxx</view>
			</view>
			<view class="split-title text-red">市场次异常提示</view>
			<view class="table-content">
				<view class="flex  p-xs flex-table  mb-sm">
					<view class="flex-sub table-title-bg padding-sm">巡检任务</view>
					<view class="flex-sub table-title-bg padding-sm">异常情况</view>
				</view>
				<view class="flex  p-xs flex-table mb-sm">
					<view class="flex-sub table-content-bg padding-sm">齿轮润滑油</view>
					<view class="flex-sub table-content-bg padding-sm"><text class="text-red">1.8</text></view>
				</view>
				<view class="flex  p-xs flex-table mb-sm">
					<view class="flex-sub table-content-bg padding-sm">齿轮温度</view>
					<view class="flex-sub table-content-bg padding-sm"><text class="text-red">102</text></view>
				</view>
				<view class="text-center" style="margin-top: 20px;">
					<button class="cu-btn bg-green shadow common-btn common-btn-cur text-center" @click="goCheck">知道了</button>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
				
			}
		},
		onLoad() {
	
		},
		methods: {
			goCheck(){
				uni.navigateTo({
					url:'inspectionCheck'
				})
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
	body{
		height: 100%;
	}
</style>
