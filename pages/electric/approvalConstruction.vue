<template>
	<view class="main  main-top-bg2 bg-my-gray" >
		<cu-custom class="head" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">基建审批</block>
		</cu-custom>
		<scroll-view scroll-y class="detail-content bg-my-gray margin-top-sm">
			<view class="cu-card case no-card border-left-color">
				<view class="cu-item padding-xs">
					<view class="flex detail ">
						<view class="flex-sub ">申请单号：</view>
						<view class="flex-sub ">{{formList.APPLY_NO}}</view>
					</view>
					<view class="flex detail">
						<view class="flex-sub ">申请单位：</view>
						<view class="flex-sub ">{{formList.APPLY_UNIT_NAME}}</view>
					</view>
					<view class="flex detail">
						<view class="flex-sub ">申请人：</view>
						<view class="flex-sub ">{{formList.APPLY_PERSION_NAME}}</view>
					</view>
					<view class="flex detail">
						<view class="flex-sub ">申请原因：</view>
						<view class="flex-sub ">{{formList.APPLY_REASON}}</view>
					</view>
					<view class="flex detail">
						<view class="flex-sub ">仓库：</view>
						<view class="flex-sub ">{{formList.OA_STOCK_NAME}}</view>
					</view>
					<view class="flex detail">
						<view class="flex-sub ">申请数量：</view>
						<view class="flex-sub ">{{formList.APPLY_QUANTITY}}</view>
					</view>
					<view class="flex detail">
						<view class="flex-sub ">申请金额：</view>
						<view class="flex-sub ">￥{{formList.APPLY_MONEY}}</view>
					</view>
				</view>
			</view>
			<view v-for="(item,index) in division" :key="'division'+index">
				<view v-if="index<formList.STATUS">
					<view class="cu-card case no-card margin-top-sm">
						<view class="cu-item padding-xs border-left-color">
							<view class="cu-bar justify-left">
								<view class="action sub-title">
									<text class="text-ml text-blue">{{divisionName[index]}}</text>
									<text class="bg-blue" style="width:3rem"></text>
								</view>
							</view>
							<view class="flex detail">
								<view class="flex-sub ">审批日期：</view>
								<view class="flex-sub  text-left">{{formList[item+'APPROVAL_DATE']}}</view>
							</view>
							<view class="flex detail">
								<view class="flex-sub ">审批意见：</view>
								<view class="flex-sub  text-left">{{idea[formList[item+'APPROVAL_RESULT']]}}</view>
							</view>
							<view class="flex detail">
								<view class="flex-sub ">部门负责人：</view>
								<view class="flex-sub  text-left">{{formList[item+'PERSION_NAME']}}</view>
							</view>
							<view class="flex detail">
								<view class="flex-sub ">备注：</view>
								<view class="flex-sub  text-left">{{formList[item+'APPROVAL_REMARK']}}</view>
							</view>
						</view>
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
						<view class="flex detail detail-first">
							<view class="flex-sub ">物品名称：</view>
							<view class="flex-sub ">{{item.PRODUCT_NAME}}</view>
						</view>
						<view class="flex detail">
							<view class="flex-sub ">技术规格：</view>
							<view class="flex-sub  text-left">{{item.SPECIFICATION}}</view>
						</view>
						<view class="flex detail">
							<view class="flex-sub ">申请数量：</view>
							<view class="flex-sub  text-left">{{item.APPLY_QUANTITY}}</view>
						</view>
						<view class="flex detail">
							<view class="flex-sub ">计划单价：</view>
							<view class="flex-sub  text-left">￥{{item.PLAN_PRICE}}</view>
						</view>
						<view class="flex detail">
							<view class="flex-sub ">计划金额：</view>
							<view class="flex-sub  text-left">￥{{item.PLAN_MONEY}}</view>
						</view>
						<view class="flex detail">
							<view class="flex-sub ">当前库存：</view>
							<view class="flex-sub  text-left text-red">{{item.NOW_HAS_QUANTITY}}</view>
						</view>
						<view class="flex detail">
							<view class="flex-sub ">备注：</view>
							<view class="flex-sub  text-left text-red">{{item.REMARK}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="bg-white">
				<view class="flex detail margin-top-sm padding-top-sm">
					<text class="flex-sub ">审批意见</text>
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
					<!-- 				<view class="flex-sub padding-sm margin-xs radius text-center">
						<button class="cu-btn bg-green shadow common-btn common-btn-cur" @click="goTimeLine">查看进度</button>
					</view> -->
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
		constructionDes,
		constructionSave
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
				isPass: true,
				idea: ['不同意', '同意', '重新申请'],
				division: {
					'0': 'RESPONSIBLE_',
					'1': 'MSAIN_',
					'2': 'SUPERVISOR_',
					'3': 'ENGIN_',
					'4': 'PLAN_'
				},
				divisionName:['经办人审核','总包审核','监理审核','工程监督审核','计划发展部监督审核'],
				apply: ['APPROVAL_DATE', 'APPROVAL_RESULT', 'PERSION', 'PERSION_NAME', 'APPROVAL_REMARK']
			}
		},
		onLoad(option) {
			var _this = this
			_this.uid = option.uid
			_this.detp_id = option.detp_id
			_this.step = option.step
			_this.name = option.name
			_this.applyTime = option.time
			//默认同意
			_this.isTrue = '1'
			var data = {}
			data.ID = option.uid
			constructionDes(data).then(res => {
				_this.formList = res.formJson
				_this.goodsList = res.applyProductData
			})
		},
		methods: {
			goSubmit() {
				var _this = this
				//审批检测
				if (_this.isTrue === '') {
					_this.modalText = '请勾选审批意见!'
					_this.isPass = false
					_this.showModal()
					return
				}
				_this.saveData()
			},
			//提交保存
			saveData() {
				var _this = this
				var date = new Date();
				var formatDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
				var data = {}

				data.ID = _this.formList.ID
				for (var i = 0; i < 5; i++) {
					_this.apply.forEach(item => {
						data[_this.division[i] + item] = _this.formList[_this.division[i] + item] == null ? '' : _this.formList[_this.division[
							i] + item]
					})
				}
				data.STATUS = _this.formList.STATUS
				data[_this.division[_this.formList.STATUS] + 'APPROVAL_DATE'] = formatDate
				data[_this.division[_this.formList.STATUS] + 'APPROVAL_RESULT'] = _this.isTrue
				data[_this.division[_this.formList.STATUS] + 'PERSION'] = ''
				data[_this.division[_this.formList.STATUS] + 'PERSION_NAME'] = ''
				data[_this.division[_this.formList.STATUS] + 'APPROVAL_REMARK'] = _this.textareaAValue
				constructionSave(data).then(res => {
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
					url: 'timeline?uid=' + _this.uid + '&unit=' + _this.formList.DETP_NAME + '&name=' + _this.formList.APPLY_PERSON_NAME +
						'&time=' + _this.applyTime
				});
			},
			//模态框
			showModal() {
				this.modalName = 'DialogModal1'
			},
			hideModal(flag) {
				var _this = this
				if (flag) {
					//保存
					_this.isPass = true
					_this.modalName = null
				} else {
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

	.cu-bar .content {
		height: 90rpx !important;
		line-height: 58rpx !important;
	}
	.border-left-color{
		border-left: 2px solid #F37B1D;
	}
</style>
