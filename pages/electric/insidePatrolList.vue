<template>
	<view class="main main-top-bg2 bg-my-gray ">
		<cu-custom class="head" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">待办任务</block>
		</cu-custom>
		<view class="cu-card ">
			<view class="cu-item border-top-color">
				<scroll-view scroll-y class="content bg-white  "  v-if="TabCur == 0">
					<view class="flex flex-wrap">
						<view class="basis-xs table-title-bg ">序号</view>
						<view class="basis-xs table-title-bg ">场站名称</view>
						<view class="basis-xs table-title-bg ">巡检名称</view>
						<view class="basis-xs table-title-bg ">巡检次数</view>
						<view class="basis-xs table-title-bg ">操作</view>
					</view>
					<view class="flex margin-top-sm" v-for="(item,index) in insidePatrolList" :key="index" :data-id="index">
						<block >
							<view class="basis-xs table-content-bg ">{{index+1}}</view>
							<view class="basis-xs table-content-bg  text-sm">{{item.windFarmName}}</view>
							<view class="basis-xs table-content-bg  text-sm">{{item.templateTypeName}}</view>
							<view class="basis-xs table-content-bg  text-sm">{{item.patrolNum}}</view>
							<view class="basis-xs table-content-bg text-blue" @click="clickExecute(index)">办理</view>
						</block>
					</view>
				</scroll-view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import echarts from 'echarts'
	import { isOpenDatabase, openCommDB, executeSQL, selectSQL } from '../../util/sqlLiteUtil.js'
	import {queryAll,getPatrolTemplateType,getPatrolTemplate} from '../../api/user.js'
	import {setToken, getToken ,setInspectionModal, getByKey ,setByKey} from '../../util/auth.js'
	import TOKEN_MESSAGE_CONTANTS from '../../constant/commonConstant.js'
	import {isNullOrEmpty,objIsNullOrEmpty,getUUID} from '../../util/stringUtil.js'
	import {
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				approvalCur:0,
				workCur:0,
				goodsCur:0,
				tabName: ['采购审批', '询价审批', '出库审批', '基建审批'],
				index: null,
				orgOptions: {},
				sumValue: 1000,
				insidePatrolList: [],
				patrolNum: "",
				currentTemplateData: [],
				currentJsonData: "",
				tempTemplateData: [],
			}
		},
		onLoad(option) {
			if(!isNullOrEmpty(option.tabCur)){
				this.TabCur = option.tabCur
			}
			this.insidePatrolList = getByKey('insidePatrolList')
			this.patrolNum = getByKey('patrolNum')
			// this.templateData = JSON.parse(this.insidePatrolList.templateData)
			
		},
		methods: {
			clickExecute(e){
				var _this = this; 
				//封装场内巡检需要的模版数据
				_this.currentTemplateData = JSON.parse(_this.insidePatrolList[e].templateData)
				_this.currentJsonData = _this.insidePatrolList[e]
				_this.currentJsonData.templateData = []
				var patrolTemplate = getByKey(TOKEN_MESSAGE_CONTANTS.PATROL_TEMPLATE)
				patrolTemplate.forEach((item, index) => {
					if(_this.currentJsonData.templateTypeName==item.task){
						_this.tempTemplateData.push(item)
					}
				})
				_this.tempTemplateData.forEach((item, index) => {
					_this.currentTemplateData.forEach((item2, index2) => {
						if(item.taskNum==item2.taskNum && item.subTaskNum==item2.subTaskNum){
							_this.currentJsonData.templateData.push(item)
						}
					})
				})
				setByKey('currentJsonData',_this.currentJsonData)
				//记录当前点击的任务索引
				setByKey('taskIndex',e)
				uni.navigateTo({
					url: 'insidePatrolHeader'
				});
			}
		}
	}
</script>


<style>
	@import url("../../static/app.css");
	@import url("../../colorui/main.css");
	body{
		height: 100%;
	}
	uni-page-body{
		height: 100%;
	}
  .ec-canvas {
		display: flex;
		height: 100%;
		flex: 1;
	}

	.canvasView {
		width: 700upx;
		height: 500upx;
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
		color: #7c87da;
	}
	.tab-content{
		color: white;
	}
	.kpi-icon-list{
		width: 120rpx;
		height: 120rpx;
		border: 2px solid #717071;
		border-radius: 60rpx;
		text-align: center;
		background: -webkit-linear-gradient(top,#0b090c,#353036);
	}
	.kpi-item .cur{
		width: 120rpx;
		height: 120rpx;
		border: 2px solid #211c23;
		border-radius: 60rpx;
		text-align: center;
		border: 2px solid #42519d;
		background: -webkit-linear-gradient(top,#1d0b74,#404e9b);
	}
	.main-top-bg2{
		height: 100%;
	}
</style>
