<template>
	<view class="main  main-top-bg2 bg-my-gray">
		<cu-custom class="head" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">缺陷管理</block>
		</cu-custom>
		<scroll-view scroll-y class="bg-my-gray detail-content margin-bottom-sm" >
			<view class="bg-white shadow">
				<view class="cu-bar  solid-bottom">
					<view class="action">
						<text class="cuIcon-titles text-orange"></text> 存在缺陷小时数(小时/个)
					</view>
				</view>
				<view class="cu-card case" >
					<view class="cu-item shadow ">
						<echarts :option="option" :id="option.id" class="myEcharts-one"></echarts>
					</view>
				</view>
			</view>
			<view class="bg-white shadow">
				<view class="cu-bar  solid-bottom margin-top-sm">
					<view class="action">
						<text class="cuIcon-titles text-orange"></text> 缺陷等级分析 (个)
					</view>
				</view>
				<view class="cu-card case" >
					<view class="cu-item ">
						<view style="text-align: right;">
							<button class="cu-btn" :class="isShow==0?'bg-gradual-blue':'bg-grey'" style="margin-right: 5px;" @click="showTable(0)">风机</button>
							<button class="cu-btn" :class="isShow==1?'bg-gradual-blue':'bg-grey'" @click="showTable(1)">光伏</button>
						</view>
						<echarts :option="option2" :id="option.id" class="myEcharts"></echarts>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import Echarts from '@/components/echarts/echarts.vue'
	import chartLine from "../../constant/chartLine.js";
	import {
		getFlawData
	} from '../../api/chartPost.js'
	export default {
		components: {
			Echarts
		},
		data() {
			return {
				isShow: 0,
				modalName: null,
				modalText: '',
				platform: '',
				windowWidth: '',
				windowHeight: '',
				dataList:{},
				option: {},
				option2: {},
				checkFirst: 'first'
			}
		},
		onLoad() {
			var _this = this;
			getFlawData().then(res => {
				_this.dataList = res
				_this.option = chartLine['getOption1_2'](res.data_1)
				_this.option2 = chartLine['getOption1_2_1'](res.data_2_1)
			})
		},
		mounted() {},
		methods: {
			showTable(e) {
				this.isShow = e;
				if(e){
					this.option2 = chartLine['getOption1_2_2'](this.dataList.data_2_2)

				}else{
					this.option2 = chartLine['getOption1_2_1'](this.dataList.data_2_1)
				}
			}

		}
	}
</script>
<style>
	@import url("../../static/app.css");
	@import url("../../colorui/main.css");

	body {
		height: 100%;
		font-size: 25rpx;
		background-color: #f1f1f1 !important;
	}

	uni-page-body {
		height: 100%;
		background-color: #f1f1f1 !important;
	}
	.myEcharts div {
		width: 100% !important;
	}

	.myEcharts {
		margin-top: 20px;
		width: 100%;
		height: 240px;
		margin: 0 auto;
	}

	.myEcharts-one {
		margin-top: 20px;
		width: 100%;
		height: 300px;
		margin: 0 auto;
	}
</style>
