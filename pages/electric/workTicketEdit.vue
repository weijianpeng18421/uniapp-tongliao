<template>
	<view class="main main-top-bg2">
		<cu-custom class="head" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">工作票开票</block>
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
			<scroll-view scroll-x class="bg-my-grey padding-xs response cu-steps steps-bottom" :scroll-into-view="'scroll-' + scroll"
			 scroll-with-animation>
				<view class="cu-item padding-lr-xl" :class="index>scroll?'':'text-blue'" v-for="(item,index) in listLength-1" :key="index" :id="'scroll-' + index" @click="checkNum(index)">
					序号 {{index + 1}} <text class="num" :data-index="index + 1"></text>
				</view>
				<view class="cu-item padding-lr-xl" :class="listLength-1>scroll?'':'text-blue'"  :key="listLength" :id="'scroll-' + listLength-1" @click="checkNum(listLength-1)">
					完成 <text class="num" :data-index="listLength"></text>
				</view>
			</scroll-view>
			<scroll-view scroll-y class="check-content"  >
				<view class="padding-sm" v-show="scroll===0">
					<view class="flex  p-xs flex-table mb-sm">
						<view class="flex-sub common-table-content padding-sm">操作票编号</view>
						<view class="flex-treble common-table-content padding-sm">271G220190411360</view>
					</view>
					<view class="flex  p-xs flex-table mb-sm">
						<view class="flex-sub common-table-content padding-sm">操作票开始时间</view>
						<view class="flex-treble common-table-content padding-sm">{{localTime}}</view>
					</view>
					<view class="flex  p-xs flex-table mb-sm">
						<view class="flex-sub common-table-content padding-sm">操作票结束时间</view>
						<view class="flex-treble common-table-content padding-sm">{{localTime}}</view>
					</view>
					<view class="flex  p-xs flex-table mb-sm">
						<view class="flex-sub common-table-content padding-sm">操作任务</view>
						<view class="flex-treble common-table-content padding-sm"></view>
					</view>
				</view>
				<block v-for="(item,index) in checkDetail" :key="index" :data-id="index" >
					<view class="check-content" v-show="scroll===index && scroll!==listLength-1">
						<view class="padding-sm">
							<view class="flex  p-xs flex-table mb-sm">
								<view class="flex-sub common-table-content padding-sm">顺序</view>
								<view class="flex-treble common-table-content padding-sm">{{index+1}}</view>
							</view>
							<view class="flex  p-xs flex-table mb-sm">
								<view class="flex-sub common-table-content padding-sm">操作危险点、安全措施和注意事项</view>
								<view class="flex-treble common-table-content padding-sm">{{item.checkPoint}}</view>
							</view>
							<view class="flex  p-xs flex-table mb-sm">
								<view class="flex-sub common-table-content padding-sm">执行</view>
								<view class="flex-treble common-table-content padding-sm">
									<radio-group @change="executeRadioChange">
										<view class="flex-sub" >
											是<radio class='blue margin-left-sm margin-right-sm' :class="checkDetail[index].executeRadio=='1'?'checked':''" :checked="checkDetail[index].executeRadio=='1'?true:false" value="1"></radio>
											否<radio class='red margin-left-sm margin-right-sm' :class="checkDetail[index].executeRadio=='0'?'checked':''" :checked="checkDetail[index].executeRadio=='0'?true:false" value="0"></radio>
										</view>
									</radio-group>
								</view>
							</view>
							<view class="flex  p-xs flex-table mb-sm">
								<view class="flex-sub common-table-content padding-sm">确认</view>
								<view class="flex-treble common-table-content padding-sm">
									<radio-group @change="verifyRadioChange">
										<view class="flex-sub" >
											是<radio class='blue margin-left-sm margin-right-sm' :class="checkDetail[index].verifyRadio=='1'?'checked':''" :checked="checkDetail[index].verifyRadio=='1'?true:false" value="1"></radio>
											否<radio class='red margin-left-sm margin-right-sm' :class="checkDetail[index].verifyRadio=='0'?'checked':''" :checked="checkDetail[index].verifyRadio=='0'?true:false" value="0"></radio>
										</view>
									</radio-group>
								</view>
							</view>
							<view class="flex  p-xs flex-table mb-sm">
								<view class="flex-sub common-table-content padding-sm">时间</view>
								<view class="flex-treble common-table-content padding-sm">{{item.time}}</view>
							</view>
						</view>
						<view class="split-title text-center" @click="addPage()">点击新增</view>
						<view class="split-title text-center" @click="deletePage()" v-show="scroll!=0">点击删除</view>
					</view>
				</block>
				<view v-show="scroll===listLength-1">
					<view class="padding-xs">
						<view class="flex  p-xs flex-table mb-sm">
							<view class="flex-sub common-table-content padding-sm">操作人</view>
							<view class="flex-treble common-table-content padding-sm">确认以上工作已完成</view>
							<view class="flex-treble common-table-content padding-sm">签名</view>
						</view>
						<view class="flex  p-xs flex-table mb-sm">
							<view class="flex-sub common-table-content padding-sm">监护人</view>
							<view class="flex-treble common-table-content padding-sm">确认以上工作已完成</view>
							<view class="flex-treble common-table-content padding-sm">签名</view>
						</view>
						<view class="flex  p-xs flex-table mb-sm">
							<view class="flex-sub common-table-content padding-sm">值班负责人</view>
							<view class="flex-treble common-table-content padding-sm">确认以上工作已完成</view>
							<view class="flex-treble common-table-content padding-sm">签名</view>
						</view>
						<view class="flex  p-xs flex-table mb-sm">
							<view class="flex-sub common-table-content padding-sm">值长</view>
							<view class="flex-treble common-table-content padding-sm">确认以上工作已完成</view>
							<view class="flex-treble common-table-content padding-sm">签名</view>
						</view>
						<view class="flex  p-xs flex-table mb-sm">
							<view class="flex-sub common-table-content padding-sm">操作票评价</view>
							<view class="flex-treble common-table-content padding-sm">确认以上工作已完成</view>
							<view class="flex-treble common-table-content padding-sm"></view>
						</view>
					</view>
					<button class="cu-btn app-btn submit-btn" @click="goNext()">提交</button>
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
				localTime:'',
				checkDetail:[{
					id:'1',
					name:'发电机',
					checkPoint:'发电机外观无掉漆、无锈蚀痕迹。',
					executeRadio:'',
					verifyRadio:'',
					time:''
				},{
					
				}
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
				this.localTime = formatDate
				this.checkDetail[this.scroll].time = formatDate
			},
			goNext(){
				uni.navigateTo({
				    url: 'overhaul'
				});
			},
			executeRadioChange(e) {
				this.checkDetail[this.scroll].executeRadio = e.detail.value
			},
			verifyRadioChange(e) {
				this.checkDetail[this.scroll].verifyRadio = e.detail.value
			},
			addPage(){
				var obj = {
					id:this.scroll+2,
					name:'发电机',
					checkPoint:'',
					executeRadio:'',
					verifyRadio:'',
					time:''
				};
				this.checkDetail.splice(this.listLength-1,0,obj);
				this.listLength = this.checkDetail.length;
				this.ScrollSteps();
			},
			deletePage(){
				this.checkDetail.splice(this.scroll,1);
				this.listLength = this.checkDetail.length;
				this.LastSteps();
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
	.flex-sub{
		flex: 2 !important;
	}
</style>
