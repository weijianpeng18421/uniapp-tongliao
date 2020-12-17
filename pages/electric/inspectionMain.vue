<template>
	<view class="main main-top-bg2 bg-my-gray">
		<cu-custom class="head" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">通知及KPI</block>
		</cu-custom>

		<!-- 设备可用率 -->
		<scroll-view scroll-y class="bg-my-gray detail-content margin-bottom-sm">
			<view class="shadow">
				<view class="cu-bar bg-white solid-bottom ">
					<view class="action">
						<text class="cuIcon-titles text-orange "></text>
						{{title}}
					</view>
					<view class="action">
						<button class="cu-btn  shadow" data-target="gridModal"  @tap="showModal">分析</button>
					</view>
				</view>
				<view class="cu-card case no-card " >
					<view class="cu-item shadow-warp">
						<view class="grid col-3 margin-bottom-xl">
							<view class="article">
								<view class="flag flag-left">
									可用率
								</view>
							</view>
							<view class="margin-top-xl" v-for="(item,index) in availabilityData" :key="index">
								<view :class="'text-center availability-top-right-color-'+index">
									<view class="margin-top-sm text-Abc text-lg">{{item.value}}</view>
									<view class="text-xl margin-top-sm">{{item.name}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="shadow">
				<view class="cu-bar bg-white solid-bottom margin-top-lg">
					<view class="action">
						<text class="cuIcon-titles text-orange"></text> 通知
					</view>
				</view>
				<view class="cu-card case no-card shadow" >
					<view class="cu-item shadow-warp">
						<view class="cu-list menu-avatar">
							<view class="flex solid-bottom" v-for="(item,index) in noticeList" :key="index" v-if="item.content != ''">
								<view class="basis-xl  padding-sm text-cut cuIcon-titles">{{item.content}}</view>
								<view class="basis-sm  padding-sm text-cut text-right">{{item.time}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>

</template>

<script>
	import {
		Issue,
		allChart
	} from '../../api/chartPost.js'
	export default {
		data() {
			return {
				title: '月蒙东区域',
				noticeList: [],
				availabilityData: [{
					name: "本年累计",
					value: "75%"
				}, {
					name: "去年同期",
					value: "76%"
				}, {
					name: "管控限制",
					value: "77%"
				}],
				navList:[{
					code: 'kpi',
					name: 'kpi'
				},{
					code: 'notice',
					name: '通知'
				}],
				TabCur: 0,
			}
		},
		onLoad() {
			var _this = this
			Issue().then(res => {
				_this.noticeList = res.notes
			})
			allChart().then(res => {
				_this.title = res.showMonth + _this.title
				_this.availabilityData[0].value = res.nowYear + '%'
				_this.availabilityData[1].value = res.lastYear + '%'
				_this.availabilityData[2].value = res.limite + '%'
			})

		},
		methods: {
			showModal() {
				uni.navigateTo({
					url: 'chartAnalysis'
				});
			},
			tabSelect(e){
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			}
		}
	}
</script>
<style>
	page{background-color:#f1f1f1!important;}
</style>
<style scoped>
	@import url("../../static/app.css");
	@import url("../../colorui/main.css");
	.main{
		background-color: #f1f1f1 !important;
	}
	page {
		background-color: #f1f1f1 !important;
	}
	.ec-canvas {
		display: flex;
		height: 100%;
		flex: 1;
	}
	/* 设备可用率 */
	.availability {
		background-color: #fff;
		width: 100%;
	}

	.availability-top {
		display: flex;
		text-align: center;
		line-height: 45px;
	}

	.availability-top-left {
		width: 25%;
	}

	.availability-top-mid {
		width: 50%;
		text-align: center;
		font-size: 18px;
		font-weight: bold;
		color: #3a76b9;
	}

	.availability-top-right-color-0 {
		font-weight: bold;
		color: #3a76b9;
	}

	.availability-top-right-color-1 {
		font-weight: bold;
		color: #9f6a3e;
	}

	.availability-top-right-color-2 {
		font-weight: bold;
		color: #ac3d38;
	}

	.availability-bottom {
		margin-top: 10upx;
		height: 50%;
		/* font-size: 16px; */
	}

	.margin-top-sm {
		margin-top: 3px;
	}

	.cu-btn-color {
		color: #FFFFFF;
		height: 60upx;
		font-size: 20upx;
		margin: 10px 10px 0 0;
	}

	.article {
		min-height:80px;
		position: absolute;
		overflow: hidden;
		top: 0px;
	}

	.article .flag {
		position: absolute;
		height: 25px;
		line-height: 25px;
		text-align: center;
		width: 120px;
		background-color: #3a76b9;
		color: #fff;
		font-size: 13px;
	}

	.article .flag-left {
		-moz-transform: rotate(-45deg);
		-ms-transform: rotate(-45deg);
		-o-transform: rotate(-45deg);
		-webkit-transform: rotate(-45deg);
		transform: rotate(-45deg);
		left: -40px;
		top: 10px;
	}

</style>
