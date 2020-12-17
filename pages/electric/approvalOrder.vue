<template>
	<view class="main  main-top-bg2 bg-my-gray" >
		<cu-custom class="head" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">询价审批</block>
		</cu-custom>
		<scroll-view scroll-y class="detail-content bg-my-gray" >
			<view class="cu-card case no-card border-left-color">
				<view class="cu-item padding-xs">
					<view class="cu-bar">
						<view class="text-lg">
							<text class="cuIcon-titles text-blue"></text>基础信息
						</view>
					</view>
					<view class="flex detail ">
						<view class="flex-sub ">申请人：</view>
						<view class="flex-sub ">{{formList.APPLY_PERSON_NAME}}</view>
					</view>
					<view class="flex detail">
						<view class="flex-sub ">申请单位：</view>
						<view class="flex-sub ">{{formList.DETP_NAME}}</view>
					</view>
					<view class="flex detail">
						<view class="flex-sub ">询价合计金额：</view>
						<view class="flex-sub  text-left">￥{{formList.ORDER_MONEY}}</view>
					</view>
					<view class="flex detail">
						<view class="flex-sub ">申请原因及使用部位：</view>
						<view class="flex-sub  text-left">{{formList.APPLY_RESON}}</view>
					</view>
				</view>
			</view>
			<view v-for="(item,index) in goodsList" :key="index">
				<view class="cu-card case no-card margin-top-sm">
					<view class="cu-item padding-xs border-left-color">
					<view class="cu-bar">
						<view class="text-lg">
							<text class="cuIcon-titles text-blue"></text> 明细{{index + 1}}
						</view>
					</view>
					<view class="flex detail ">
						<view class="flex-sub ">物品名称：</view>
						<view class="flex-sub ">{{item.GOODS_NAME}}</view>
					</view>
					<view class="flex detail">
						<view class="flex-sub ">技术规格：</view>
						<view class="flex-sub  text-left">{{item.GOODS_SPEC}}</view>
					</view>
					<view class="flex detail">
						<view class="flex-sub ">计划数量：</view>
						<view class="flex-sub  text-left">{{item.GOODS_NUM}}</view>
					</view>
					<view class="flex detail">
						<view class="flex-sub ">计划单价：</view>
						<view class="flex-sub  text-left">￥{{item.GOODS_PRICE}}</view>
					</view>
					<view class="flex detail">
						<view class="flex-sub ">计划金额：</view>
						<view class="flex-sub  text-left">￥{{item.GOODS_MONEY}}</view>
					</view>
					
					<view class="flex detail">
						<view class="flex-sub ">询价数量：</view>
						<view class="flex-sub  text-left">{{item.GOODS_ORDER_NUM}}</view>
					</view>
					<view class="flex detail">
						<view class="flex-sub ">询价单价：</view>
						<view class="flex-sub  text-left">￥{{item.GOODS_ORDER_PRICE}}</view>
					</view>
					<view class="flex detail">
						<view class="flex-sub ">询价金额：</view>
						<view class="flex-sub  text-left">￥{{item.GOODS_ORDER_MONEY}}</view>
					</view>
	<!-- 				<view class="flex detail">
						<view class="flex-sub ">本地库存：</view>
						<view class="flex-sub  text-left text-red">{{item.GOODS_WAREHOUSE}}</view>
					</view>
					<view class="flex detail">
						<view class="flex-sub ">区域库存：</view>
						<view class="flex-sub  text-left text-red">{{item.GOODS_AREA_WAREHOUSE}}</view>
					</view> -->
					</view>
				</view>
			</view>
			<view class="bg-white">
				<view class="flex detail margin-top">
					<text class="flex-sub text-css">审批意见</text>
					<!-- <view class="flex solid-bottom margin-left" style="line-height: 40px;">
						<button class="cu-btn modal-btn my-btn my-btn-cur" @click="" >同意</button>
						<button class="cu-btn modal-btn my-btn" @click="" >不同意</button>
					</view> -->
					<radio-group @change="radioChange">
						<view class="flex-sub margin-left">
							<radio class='green margin-left-sm margin-right-sm' :class="isTrue=='1'?'checked':''" :checked="isTrue=='1'?true:false"
							 value="1"></radio>同意
							<radio class='blue margin-left-sm margin-right-sm' :class="isTrue=='2'?'checked':''" :checked="isTrue=='2'?true:false"
							 value="2"></radio>重新申请
							<radio class='red margin-left-sm margin-right-sm' :class="isTrue=='0'?'checked':''" :checked="isTrue=='0'?true:false"
							 value="0"></radio>不同意
						</view>
					</radio-group>
				</view>
				<view class="cu-form-group margin-top" style="border: 1px solid #dbd5e2;">
					<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaAInput" placeholder="请填写您的意见"></textarea>
				</view>
				<view class="flex">
					<view class="flex-sub padding-sm margin-xs radius text-center">
						<button class="cu-btn bg-green shadow common-btn common-btn-cur" @click="goSubmit">提交</button>
					</view>
					<view class="flex-sub padding-sm margin-xs radius text-center">
						<button class="cu-btn bg-green shadow common-btn common-btn-cur" @click="goTimeLine">查看进度</button>
					</view>
				</view>
			</view>
		</scroll-view>
		<!-- 弹出对话框 -->
		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar modal-title-bg justify-end">
					<view class="content">操作提示</view>
					<view class="action " @tap="hideModal">
						<text class="cuIcon-close text-white"></text>
					</view>
				</view>
				<view class="padding-xl modal-content-bg">{{modalText}}</view>
				<view class="bg-white justify-center">
					<view class="detail" :class="isPass?'flex':''">
						<view class="flex-sub"><button class="cu-btn modal-btn" @tap="hideModal(true)">{{isPass?'是':'确定'}}</button></view>
						<view class="flex-sub"><button v-if="isPass" class="cu-btn modal-btn" @tap="hideModal(false)">否</button></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		orderDes,
		orderCheck,
		orderSave
	} from '../../api/user.js'
	export default {
		data() {
			return {
				modalName: null,
				modalText: '',
				textareaAValue: '',
				isTrue: '',
				uid: '',
				detp_id: '',
				formList: {},
				goodsList: [],
				isPass:true,
				idea:['不同意','同意','重新申请']
			}
		},
		onLoad(option) {
			var _this = this
			_this.uid = option.uid
			_this.puid = option.puid
			_this.detp_id = option.detp_id
			_this.step = option.step
			_this.name = option.name
			_this.applyTime = option.time
			//默认同意
			_this.isTrue = '1'
			orderDes(option.uid).then(res => {
				_this.formList = res.formJson
				_this.goodsList = res.goodsJson
			})
		},
		methods: {
			goSubmit() {
				var _this = this
				//审批检测
				if(_this.isTrue === ''){
					_this.modalText = '请勾选审批意见!'
					_this.isPass = false
					_this.showModal()
					return
				}
				_this.saveData()
			},
			//提交保存
			saveData(){
				var _this = this
				var date = new Date();
				var formatDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
				var data = {}
				data.purchase_uuid = _this.puid
				data.purchase_order_uuid = _this.uid
				data.detp_id = _this.detp_id
				data.approve_data = formatDate
				data.idea_code = _this.isTrue
				data.idea_name = _this.idea[_this.isTrue]
				data.note = _this.textareaAValue
				data.flow_serial = _this.step
				data.order_status_name = _this.name
				orderSave(data).then(res =>{
					if (res.flag === 'true') {
						_this.isPass = false
						uni.navigateBack({
							delta: 1
						});
					} else {
						_this.isPass = false
						_this.modalText = res.msg
						_this.showModal()
					}
				})
			},
			textareaAInput(e) {
				this.textareaAValue = e.detail.value
			},
			radioChange(e) {
				this.isTrue = e.detail.value
			},
			goTimeLine() {
				var _this = this
				uni.navigateTo({
					url: 'timeline?type=order'+'&uid='+ _this.uid +'&unit=' + _this.formList.DETP_NAME + '&name=' + _this.formList.APPLY_PERSON_NAME + '&time=' + _this.applyTime
				});
			},
			//模态框
			showModal() {
				this.modalName = 'DialogModal1'
			},
			hideModal(flag) {
				var _this = this
				if(flag){
					//保存
					_this.isPass = true
					_this.modalName = null
				}else{
					_this.isTrue = '0'
					_this.modalText = '审批意见为不同意，请填写备注！'
					_this.isPass = false
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
	}

	uni-page-body {
		height: 100%;
	}
	
	.detail{
		color: #000000;
	}

	.text-css {
		font-size: 30rpx;
	}

	.margin-left {
		margin-left: 90rpx;
	}

	.my-btn {
		width: 160rpx;
		margin-right: 10px;
		height: 50rpx;
		background: -webkit-linear-gradient(top, #2a232b, #0c090e);
	}

	.my-btn-cur {
		background: -webkit-linear-gradient(right, #2E1F81, #3A67A7);
	}
	.border-left-color{
		border-left: 2px solid #F37B1D;
	}
	.cu-bar .content {
		height: 90rpx !important;
		line-height: 58rpx !important;
	}
</style>
