<template>
	<view class="main  main-top-bg2 bg-my-gray">
		<cu-custom class="head" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">技改项目</block>
		</cu-custom>
		<scroll-view scroll-y class="bg-my-gray margin-bottom-sm">
			<view class="bg-white shadow">
				<view class="cu-bar  solid-bottom">
					<view class="action">
						<text class="cuIcon-titles text-orange"></text> 完成率监控%
					</view>
				</view>
				<view class="cu-card case" >
					<view class="cu-item shadow ">
						<view class="text-right margin-bottom-lg">
							<button class="cu-btn" :class="isShow==0?'bg-gradual-blue':'bg-grey'" style="margin-right: 5px;" @click="showTable(0)">项目</button>
							<button class="cu-btn" :class="isShow==1?'bg-gradual-blue':'bg-grey'" @click="showTable(1)">文档</button>
						</view>
						<echarts :option="option" :id="option.id" class="myEcharts-one"></echarts>
					</view>
				</view>
			</view>
			<view class="bg-white shadow margin-top-sm margin-bottom-sm">
				<view class="cu-bar  solid-bottom">
					<view class="action">
						<text class="cuIcon-titles text-orange"></text> 项目延期预警
					</view>
				</view>
				<view class="cu-card case" >
					<view class="cu-item shadow ">
						<view class="delaye-warning-content">
							<view class=" text-center" v-if="delayList.length == 0">
								暂无数据
							</view>
							<view class="delaye-warning-item solids-bottom" v-for="(item,index) in delayList" :key="index">
								<view class="delaye-warning-top">
									<view class="delaye-warning-index text-blue">
										TOP{{index+1}}
									</view>
									<view class="delaye-warning-company text-green">
										【{{item.UNIT_NAME}}】
									</view>
									<view class="delaye-warning-project text-yellow">
										【{{item.PROJECT_TYPE_NAME}}】
									</view>
									<view class="delaye-warning-date text-red">
										{{item.countDown ? item.countDown : 0}}天
									</view>
								</view>
								<view class="delaye-warning-bottom">
									{{item.PROJECT_NAME}}
								</view>
								<view class="line-one"></view>
							</view>
						</view>
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
		getMoney,
		getFileRate,
		getProjectData
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
				option: {},
				fileList: {},
				projectList: {},
				delayList: []
			}
		},
		onLoad() {
			var _this = this;
			getMoney().then(res => {
				_this.projectList = res
				_this.option = chartLine['getOption2_3'](res)
			})
			getFileRate().then(res => {
				_this.fileList = res
			})
			/*	index: "TOP1",
					company: "苇湖梁公司",
					project: "特大项目",
					date: "-65天",
					des: "这里是XXXXX001项目的说明"*/
			getProjectData().then(res => {
				_this.delayList = res
			})
		},
		mounted() {},
		methods: {
			showTable(e) {
				this.isShow = e;
				if (e) {
					this.option = chartLine['getOption2_3'](this.fileList)
					this.option.title.text = '项目文件完整率'
				} else {
					this.option = chartLine['getOption2_3'](this.projectList)
					this.option.title.text = '技改项目完成率'
				}
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

	body {
		height: 100%;
		font-size: 25rpx;
	}

	uni-page-body {
		height: 100%;
		background-color: #f1f1f1 !important;
	}
	uni-page-wrapper {
		background-color: #f1f1f1 !important;
	}
	.myEcharts div {
		width: 100% !important;
	}

	.myEcharts-one {
		margin-top: 20px;
		width: 100%;
		height: 300px;
		margin: 0 auto;
	}

	/* 项目延期预警 */
	.delaye-warning {
		background-color: #fff;
		width: 100%;
		color: #000;
	}

	.delaye-warning-item {
		margin-top: 10px;
	}

	.delaye-warning-title {
		clear: #000;
	}

	.delaye-warning-top {
		display: flex;
		text-align: center;
	}

	.delaye-warning-index {
		width: 15%;
		line-height: 40upx;
	}

	.delaye-warning-company {
		text-align: left;
		width: 45%;
	}

	.delaye-warning-project {
		text-align: left;
		width: 30%;
	}

	.delaye-warning-date {
		width: 10%;
	}

	.delaye-warning-bottom {
		padding: 5px 0 10px 15%;
	}
	.line-one { /*内嵌水平线*/
	width:100%;
	margin:0 auto;
	border: 0;
	height: 0;
	}
</style>
