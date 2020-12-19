<template>
	<view class="main main-top-bg2">
		<cu-custom class="head" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">新能源智能运维移动APP平台</block>
		</cu-custom>
		
		<form class="my-form">
			<view class="form-css"></view>
			<view class="cu-form-group form-item">
				<view class="text-white text-color">设备名称</view>
				<input placeholder="请输入设备名称" name="input" class="text-color"></input>
			</view>
			<view class="cu-form-group form-item">
				<view class="title text-color">设备重要性</view>
				<picker @change="PickerChange" :value="index1" :range="picker2">
					<view class="picker text-color">
						{{index1>-1?picker[index1]:'请选择'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group  form-item">
				<view class="title text-color">主类别</view>
				<picker @change="PickerChange" :value="index1" :range="picker">
					<view class="picker text-color">
						{{index1>-1?picker[index1]:'请选择'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group  form-item">
				<view class="title text-color">子类别</view>
				<picker @change="PickerChange" :value="index1" :range="picker">
					<view class="picker text-color">
						{{index1>-1?picker[index1]:'请选择'}}
					</view>
				</picker>
			</view>
			<view class="login-btn-view">
				<button class="cu-btn modal-btn "  style="margin-right: 10px;">查询</button>
				<button class="cu-btn modal-btn modal-title-bg" >清空</button>
			</view>
		</form>
		
		<scroll-view scroll-x class="kpi-content tab-content" v-if="TabCur == 0">
			<view class="flex  p-xs margin-bottom-sm mb-sm kpi-item">
				<view  class="flex-sub  padding-sm margin-xs radius  "  v-for="(item,index) in funName" :key="index" @tap="overhaulSelect" :data-id="index">
					<view  :class="index==kapCur?'text-blue-my cur kpi-icon-list':' kpi-icon-list '">
						<view style="margin-bottom: 30rpx;">
							<image :src="item.icon" class="kpi-icons"></image>
						</view>
						{{item.name}}
					</view>
				</view>
			</view>
		</scroll-view>	
		<view class="split-title">基础信息</view>
		
		<view class="content">
			<view class="flex  p-xs flex-table  mb-sm">
				<view class="flex-sub table-title-bg padding-sm">主类别</view>
				<view class="flex-sub table-title-bg padding-sm">子类别</view>
				<view class="flex-sub table-title-bg padding-sm">设备编码</view>
				<view class="flex-sub table-title-bg padding-sm">安装地点</view>
				<view class="flex-sub table-title-bg padding-sm">设备全称</view>
				<view class="flex-sub table-title-bg padding-sm">责任部门</view>
			</view>
			<view class="flex  p-xs flex-table mb-sm">
				<view class="flex-sub table-content-bg padding-sm">检修区域</view>
				<view class="flex-sub table-content-bg padding-sm">工作认领</view>
				<view class="flex-sub table-content-bg padding-sm">巡检任务</view>
				<view class="flex-sub table-content-bg padding-sm">未完成</view>
				<view class="flex-sub table-content-bg padding-sm">状态</view>
				<view class="flex-sub table-content-bg padding-sm">操作</view>
			</view>
		</view>
		
		<!--弹出对话框-->
		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar modal-title-bg justify-end">
					<view class="content">工作班成员确认签字</view>
					<view class="action " @tap="hideModal">
						<text class="cuIcon-close text-white"></text>
					</view>
				</view>
				<view class="padding-xl modal-content-bg">
					工作开工前，工作负责人已将分工情况、安全措施布置情况、危险点及安全注意事项、保留的带电部分向全体工作班成员交代清楚。全体工作班成员接收交代确认签字：
				</view>
				<view class="cu-bar bg-white justify-center">
					<view class="action">
						<button class="cu-btn modal-btn" @tap="hideModal">取消</button>
						<button class="cu-btn modal-btn" @tap="goNext">确定</button>
					</view>
				</view>
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
						name: '检修查询'
					}, {
						icon: '../../static/qxgz.png',
						name: '维护查询'
					}, {
						icon: '../../static/jgxm.png',
						name: '更换查询'
					}, {
						icon: '../../static/jgxm.png',
						name: '设备图纸'
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
				//form
				index1: -1,
				picker2: ['喵喵喵2', '汪汪汪2', '哼唧哼唧2'],
				picker: ['喵喵喵', '汪汪汪', '哼唧哼唧'],
				modalName: null
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
			overhaulSelect(e){
				this.kapCur = e.currentTarget.dataset.id;
				if(this.kapCur===0){
					this.showModal()
				}
			},
			//form
			PickerChange(e) {
				this.index1 = e.detail.value
			},
			goNext(){
				uni.navigateTo({
				    url: 'overhaulQuery'
				});
			},
			showModal(e) {
				this.modalName = 'DialogModal1'
			},
			hideModal(e) {
				this.modalName = null
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
	
	.flex-table{
		width: 100%;
	}
	.form-css{
		margin-top: 30px;
	}
	
	.text-color{
		color: white !important;
		text-align: right !important;
		line-height: 30px !important;
	}
	.cu-form-group uni-picker[data-v-7f164aa6]::after {
		line-height: 30px !important;
	}
	.app-btn[data-v-7f164aa6] {
		margin: 20rpx;
	}
	.login-btn-view{
		display: flex;
	}
	body{
		height: 100%;
	}
</style>
