<template>
	<view class="main main-top-bg">
		<cu-custom class="head" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">新能源智能运维移动APP平台</block>
		</cu-custom>
		
		
		<view class="parent-container" >
			<view class="item-container" v-for="(item,index) in funName" :key="index" @tap="kpiSelect" :data-id="index">
				<view :class="index==kapCur?'text-blue-my kpi-icon-list-item-cur':' kpi-icon-list-item '">
					<image :src="item.icon" class="item-kpi-icons"></image>
				</view>
				<text :class="index==kapCur?'text-blue-my':' '">{{item.name}}</text>
			</view>
		</view>
		
		<view class="content" v-show="kapCur==0">
			<view class="flex  p-xs flex-table  mb-sm">
				<view class="flex-sub table-title-bg padding-sm">序号</view>
				<view class="flex-sub table-title-bg padding-sm">发起人</view>
				<view class="flex-sub table-title-bg padding-sm">发起日期</view>
				<view class="flex-sub table-title-bg padding-sm">审批人</view>
			</view>
			<view class="flex  p-xs flex-table mb-sm">
				<view class="flex-sub table-content-bg padding-sm">序号</view>
				<view class="flex-sub table-content-bg padding-sm">发起人</view>
				<view class="flex-sub table-content-bg padding-sm">发起日期</view>
				<view class="flex-sub table-content-bg padding-sm">审批人</view>
			</view>
			<view class="flex  p-xs flex-table mb-sm">
				<view class="flex-sub table-content-bg padding-sm">序号</view>
				<view class="flex-sub table-content-bg padding-sm">发起人</view>
				<view class="flex-sub table-content-bg padding-sm">发起日期</view>
				<view class="flex-sub table-content-bg padding-sm">审批人</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				TabCur: 0,
				kapCur: 0,
				scrollLeft: 0,
				funName: [
					{
						icon: '../../static/cgsp.png',
						name: '我的待办'
					}, {
						icon: '../../static/qxgz.png',
						name: '工作票开票'
					}, {
						icon: '../../static/jgxm.png',
						name: '工作票查询'
					}
					],
				images: [
					'https://dummyimage.com/800/ffffff/000000',
					'https://dummyimage.com/1600/ffffff/000000',
					'https://dummyimage.com/1280/000000/ffffff',
					'https://dummyimage.com/400/000000/ffffff',
				],
				index: null,
				orgOptions: {},
			}
		},
		onLoad() {

		},
		methods: {
			changeOption() {
				const data = this.option.series[0].data
				// 随机更新示例数据
				data.forEach((item, index) => {
					data.splice(index, 1, Math.random() * 40)
				})
			},
			onViewClick(options) {
				console.log(options)
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			kpiSelect(e){
				this.kapCur = e.currentTarget.dataset.id;
				if(this.kapCur===1){
					uni.navigateTo({
						url:'workTicketEdit'
					})
				}
			}
		}
	}
</script>

<style>
	@import url("../../static/app.css");
	@import url("../../colorui/main.css");
  .ec-canvas {
		display: flex;
		height: 100%;
		flex: 1;
	}

	.canvasView {
		width: 700upx;
		height: 500upx;
	}
	uni-page-body{
		height: 100%;
	}
	.echarts-wrap {
	  width: 100%;
	  height: 300px;
	}
	.nav{
		color: white;
		height: 100rpx;
		margin-top: 50rpx;
	}
	.nav .cu-item.cur{
		background-color: #231e24;
		border-radius: 60rpx;
		border: 2px solid #352e35;
		box-shadow:2px 3px 3px #000000;
		color: white;
	}
	.text-blue-my{
		color: #7c87da !important;
	}
	.tab-content{
		color: white;
	}
	.kpi-icon-list{
		width: 100rpx;
		height: 100rpx;
		border: 2px solid #717071;
		border-radius: 50rpx;
		text-align: center;
		background: -webkit-linear-gradient(top,#0b090c,#353036);
	}
	.kpi-item .cur{
		width: 100rpx;
		height: 100rpx;
		border: 2px solid #211c23;
		border-radius: 50rpx;
		text-align: center;
		border: 2px solid #42519d;
		background: -webkit-linear-gradient(top,#1d0b74,#404e9b);
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 100rpx;
	}

	.echarts {
		margin-top: 20px;
		width: 400px;
		height: 300px;
	}
	
	.parent-container{
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding: 0 30rpx;
		margin-top: 80rpx;
		margin-bottom: 20rpx;
	}
	.item-container{
		display: flex;
		align-items: center;
	}
	.item-container text{
		color: white;
		margin-left: 12rpx;
	}
	.flex-table{
		width: 100%;
	}
	body{
		height: 100%;
	}
</style>
