<template>
	<view class="main main-top-bg2">
		<cu-custom class="head" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">检修开始</block>
		</cu-custom>
		<view class="text-center" style="margin-top: 40px;">
			<view class="cu-bar bg-my-grey solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange"></text> 操作
				</view>
				<view class="action">
					<button class="cu-btn  shadow grey-btn" @tap="LastSteps">上一步</button>
					<button class="cu-btn  shadow grey-btn" @tap="ScrollSteps">下一步</button>
				</view>
			</view>
			<scroll-view scroll-x class="bg-my-grey padding response cu-steps steps-bottom" :scroll-into-view="'scroll-' + scroll"
			 scroll-with-animation>
				<view class="cu-item padding-lr-xl" :class="index>scroll?'':'text-blue'" v-for="(item,index) in listLength-1" :key="index" :id="'scroll-' + index" @click="checkNum(index)">
					序号 {{index + 1}} <text class="num" :data-index="index + 1"></text>
				</view>
				<view class="cu-item padding-lr-xl" :class="listLength-1>scroll?'':'text-blue'"  :key="listLength" :id="'scroll-' + listLength-1" @click="checkNum(listLength-1)">
					完成 <text class="num" :data-index="listLength"></text>
				</view>
			</scroll-view>
			<scroll-view scroll-y class="check-content"  >
				<block v-for="(item,index) in checkDetail" :key="index" :data-id="index" >
					<view class="content-detail" v-show="scroll===index && scroll!==listLength-1">
						<view class="flex detail detail-first">
							<view class="basis-sm text-left">序号：</view>
							<view class="flex-sub ">{{item.id}}</view>
						</view>
						<view class="flex detail " >
							<view class="basis-sm text-left">检查部位：</view>
							<view class="flex-sub ">{{item.name}}</view>
						</view>
						<view class="flex detail " >
							<view class="basis-sm text-left">检查内容：</view>
							<view class="flex-sub ">{{item.content}}</view>
						</view>
						<view class="flex detail ">
							<view class="basis-sm text-left">检查重点：</view>
							<view class="flex-sub ">{{item.checkPoint}}</view>
						</view>
						<view class="flex detail " >
							<view class="basis-sm text-left">现场情况：</view>
							<radio-group @change="RadioChange">
								<view class="flex-sub" >
									是<radio class='blue margin-left-sm margin-right-sm' :class="radio=='1'?'checked':''" :checked="radio=='1'?true:false" value="1"></radio>
									否<radio class='red margin-left-sm margin-right-sm' :class="radio=='0'?'checked':''" :checked="radio=='0'?true:false" value="0"></radio>
								</view>
							</radio-group>
						</view>
						<view class="flex detail " >
							<view class="basis-sm text-left">时间：</view>
							<view class="flex-sub ">{{item.time}}</view>
						</view>
					</view>
				</block>
				<view v-show="scroll===listLength-1">
					<view class="flex check-end-text text-white">工作班人员已全部撤离，现场已清理完毕。全部工作于{{checkDetail[listLength-1].time}}结束。</view>
					<view class="padding-xs">
						<view class="flex  p-xs flex-table mb-sm">
							<view class="flex-sub common-table-content padding-sm bg ">检修交代</view>
						</view>
						<view class="flex  p-xs flex-table mb-sm">
							<view class="flex-sub common-table-content padding-sm">工作票编号</view>
							<view class="flex-treble common-table-content padding-sm">271G220190411360</view>
						</view>
						<view class="flex  p-xs flex-table mb-sm">
							<view class="flex-sub common-table-content padding-sm">工作任务</view>
							<view class="flex-treble common-table-content padding-sm">风机维护</view>
						</view>
						<view class="flex  p-xs flex-table mb-sm">
							<view class="flex-sub common-table-content padding-sm">主要工作内容</view>
							<view class="flex-treble common-table-content padding-sm"></view>
						</view>
					</view>
					<view class="flex check-end-text text-red">我已确认以上工作都已完成！</view>
					<view class="flex ">
						<view class="check-end-text text-white">工作负责人签字：</view>
						<view class="flex-sub "></view>
					</view>
					<button class="cu-btn app-btn submit-btn" @click="goNext()">确定</button>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scroll: 0,
				url:[],
				curUrl:'',
				listLength: 0,
				radio:'',
				checkDetail:[{
					id:'1',
					name:'发电机',
					content:'发电及外观',
					checkPoint:'发电机外观无掉漆、无锈蚀痕迹。',
					status:'正常',
					time:''
				},
				{
					id:'2',
					name:'发电机',
					content:'集油盒',
					checkPoint:'集油盒内无废油。',
					status:'正常',
					time:''
				},
				{
					id:'3',
					name:'发电机',
					content:'发电机与弹性支撑',
					checkPoint:'检查橡胶是否有碎裂、变形现象。',
					status:'正常',
					time:''
				},
				{
					id:'4',
					name:'发电机',
					content:'发电机安装螺栓力矩',
					checkPoint:'弹性支撑螺栓:1150Nm 发电机与后低架连螺栓:140Nm。',
					status:'正常',
					time:''
				},
				{
					id:'5',
					name:'发电机',
					content:'发电机对中',
					checkPoint:'按照发电机对中工艺和标准检查发电机对中垂直:角度<0.1%，距离+0.9mm~1.0mm，发电机比齿轮箱高水平：角度<0.1%，距离-1.0mm~-1.1mm',
					status:'正常',
					time:''
				},
				]
			}
		},
		onLoad() {
			this.listLength = this.checkDetail.length
			this.getDate()
		},
		methods: {
			ScrollSteps() {
				this.scroll= this.scroll == this.listLength-1 ? this.listLength-1 : this.scroll + 1	
				this.getDate()
			},
			LastSteps() {
				this.scroll= this.scroll == 0 ? 0 : this.scroll - 1				
			},
			gotPic(){
				var _this = this
				uni.chooseImage({
				    count: 6, //默认9
				    sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['camera'], //从相册选择
				    success: function (res) {
				        _this.url = res.tempFilePaths
						_this.curUrl = res.tempFilePaths[0]
				    }
				});
			},
			checkNum(index){
				this.scroll= index
				this.getDate()
			},
			getDate(){
				var date = new Date();
				var formatDate = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日 ' + date.getHours() + ':' + (date.getMinutes()>10?date.getMinutes():'0'+date.getMinutes());
				this.checkDetail[this.scroll].time = formatDate
			},
			goNext(){
				uni.navigateTo({
				    url: 'overhaul'
				});
			},
			RadioChange(e) {
				this.radio = e.detail.value
			},
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
		background-color: #333333 !important;
	}
	.flex-sub{
		text-align: left;
	}
	.detail{
		border: 1px solid #ccc;
	}
	.check-content{
		background-color: #333333;
		height: 100%;
	}
	.detail .basis-xs{
		
	}
	.content-detail{
		margin: 0px 20px;
	}
	.cuIcon-camera{
		font-size: 30px;
	}
	.steps-bottom{
		
	}
	.check-end-text{
		padding: 20px;
		font-size: 20px;
	}
	uni-radio .wx-radio-input, uni-checkbox .wx-checkbox-input, uni-radio .uni-radio-input, uni-checkbox .uni-checkbox-input{
		width: 30px;
		height: 30px;
	}
	uni-radio::before, uni-checkbox::before{
		right: 0px !important;
	}
</style>
