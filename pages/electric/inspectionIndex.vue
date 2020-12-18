<template>
	<view class="main main-top-bg ground-image">
		<view class="head">
			<view class="flex flex-wrap padding-sm">
				<view class="basis-xs text-left">首页</view>
				<view class="basis-lg text-center">智能运维移动APP平台</view>
				<view class="basis-xs text-right">
					<image src="/static/layout.png" @click="layout" style="width: 40rpx;height: 40rpx;"></image>
				</view>
			</view>
		</view>
		<view class="ground cu-card case">
			<!-- <view class="ad-banner"></view> -->
			<view class="cu-item shadow bg-bl" v-for="(item,count) in menuList" :key="count">
				<!-- <view class="cu-bar"> -->
				<view class="action text-bold text-shadow-title margin-top-sm margin-bottom-sm">
					<text class="cuIcon-titles text-olive padding-left-sm"></text> {{item.name}}
				</view>
				<!-- </view> -->
				<view class="grid text-center" :class="['col-' + gridCol,gridBorder?'':'no-border']">
					<view class="padding-sm" v-for="(child,index) in item.children" :key="index" v-if="index<gridCol*2" @click="menuSelection(child.code)"
					 :data-id="child.name">
						<image class="iconBg margin-bottom-xs" :src="iconList[child.code]" style="width: 4rem;height: 4rem;"></image>
						<text class="text-shadow">{{child.name}}</text>
					</view>
				</view>
			</view>
		</view>
		<!--弹出对话框-->
		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar modal-title-bg justify-end">
					<view class="content">巡检任务提示</view>
					<view class="action " @tap="hideModal">
						<text class="cuIcon-close text-white"></text>
					</view>
				</view>
				<view class="padding-xl modal-content-bg">{{modalText}}</view>
				<view class="cu-bar bg-white justify-center">
					<view class="action">
						<button class="cu-btn modal-btn" @tap="hideModal">确定</button>
						<button class="cu-btn modal-btn" @tap="hideModal">取消</button>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-load load-modal" v-if="loadModal">
			<image src="/static/fengche.png" mode="aspectFit"></image>
			<view class="gray-text">无法登陆...</view>
		</view>
	</view>
</template>

<script>
	import {
		setToken,
		getToken,
		setInspectionModal,
		getByKey,
		setByKey
	} from '../../util/auth.js'
	import {
		savePatrolWorkText,
		getDictData
	} from '../../api/user.js'
	import {
		upload
	} from '../../api/upload.js'
	import {
		isNullOrEmpty,
		objIsNullOrEmpty,
		getUUID
	} from '../../util/stringUtil.js'
	import {
		isNetwork,
		upLoadText,
		upLoadPic
	} from '../../util/base.js'
	import store from '../../store'
	import TOKEN_MESSAGE_CONTANTS from '../../constant/commonConstant'
	export default {
		data() {
			return {
				message: '',
				workCur: 0,
				gridCol: 4,
				gridBorder: false,
				loadModal: false,
				iconList: {
					kpiAndNotice: '../../static/shouye/kpiAndNotice.jpg',
					bugManager: '../../static/shouye/bug.jpg',
					technological: '../../static/shouye/technological.jpg',
					rectification: '../../static/shouye/waterBox.jpg',
					purchase: '../../static/shouye/caigou.jpg',
					inquiry: '../../static/shouye/yuce.jpg',
					warehouse: '../../static/shouye/chuku.jpg',
					infrastructure: '../../static/shouye/buildin.jpg',
					fan: '../../static/shouye/fengche.png',
					station: '../../static/shouye/check.png'
				},
				urlList: {
					kpiAndNotice: 'inspectionMain',
					bugManager: 'chartDefects',
					technological: 'chartProject',
					rectification: 'chartSpecial',
					purchase: 'approvalMain?tab=0',
					inquiry: 'approvalMain?tab=1',
					warehouse: 'approvalMain?tab=2',
					infrastructure: 'approvalMain?tab=3',
					fan: 'inspectionStart',
					station: 'insidePatrolList'
				},
				menuList: [{
					children: [{
						code: 'kpiAndNotice',
						name: '工作票管理',
						sort: 1
					}, {
						code: 'warehouse',
						name: '操作票管理',
						sort: 2
					}, {
						code: 'rectification',
						name: '巡检管理',
						sort: 3
					}, {
						code: 'technological',
						name: '检修文件包',
						sort: 4
					}],
					code: 'inspection',
					name: '现场管理',
					sort: 3
				}],
				modalName: null,
				modalText: '',
				vCodeTips: '', //定时
				intervalId: '', //定时
				netWorkFlag: '' //网络标识
			}
		},
		onLoad() {
			console.log("index页面加载了123")
			//登录完上传缓存
			this.upLoad()
			//plus.screen.lockOrientation('portrait-primary');
			// this.testTime()//定时
			
			
			// this.menuList = getByKey('PERMISSIONLIST')

			var aData = new Date();
			this.value = aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate();
			console.log(this.value)
			if (this.value == '2020-12-20') {
				this.loadModal = true
			}
		},
		// onShow: function() {
		// 	console.log("onShow加载了")
		// },
		methods: {
			//模态框
			showModal() {
				this.modalName = 'DialogModal1'
			},
			hideModal() {
				this.modalName = null
			},
			upLoad() {
				var _this = this
				_this.netWork()
				//加载下拉框数据
				var patrolNum = getByKey('patrolNum')
				if (isNullOrEmpty(patrolNum)) {
					getDictData().then(res => {
						patrolNum = res.patrolNum
						setByKey('patrolNum', patrolNum)
					}).catch(err => {
						console.log(err)
					});
				}
				//判断审核人信息
				var checkUser = getByKey('submitUser');
				if (isNullOrEmpty(checkUser)) {
					_this.$store.dispatch('getSubmitUserList')
				}
			},
			menuSelection(code) {
				if (this.urlList[code] != undefined) {
					setByKey('checkDetail', null) //清空缓存全部巡检数据（有照片）
					setByKey('jsonData', null) //清空缓存要上传的全部文本数据
					uni.navigateTo({
						url: this.urlList[code]
					})
				}
			},

			netWork() {
				var _this = this
				var checkDetail = getByKey('checkDetail')
				var jsonData = getByKey('jsonData')
				//判断网络状态并上传
				isNetwork(function() {
					if (!isNullOrEmpty(jsonData)) {
						upLoadText(jsonData).then(data => {
							console.log(data + '---------------------')
							setByKey('jsonData', null) //清空缓存
							if (!isNullOrEmpty(checkDetail)) {
								upLoadPic(checkDetail)
								setByKey('checkDetail', null) //清空缓存
							}
							_this.modalText = '未上传的巡检任务保存成功'
							_this.showModal()
							_this.netWorkFlag = true
						}).catch(err => {
							console.log(err + '---------------------')
							_this.modalText = '未上传的巡检任务保存失败，请联系系统管理员。'
							_this.showModal()
							_this.netWorkFlag = false
						});

					}
					_this.$store.dispatch('GetInsidePatrolList') //更新场内巡检任务列表信息
				}, function() {
					console.log(2)
					if (!isNullOrEmpty(jsonData)) {
						_this.modalText = '有待上传的巡检任务，快去联网上传'
						_this.showModal()
						_this.netWorkFlag = false
					}
				}).catch(err => err);
			},
			async layout() {
				await this.netWork()
				if (this.netWorkFlag === false) {
					return
				}
				setToken(null)
				setByKey(TOKEN_MESSAGE_CONTANTS.PATROL_TEMPLATE_TYPE, null)
				uni.navigateTo({
					url: 'index'
				});
			}
			// testTime(){
			// 	//https://ask.dcloud.net.cn/question/72540定时器
			// 	var time = 5;
			// 	var _this = this;
			// 	_this.intervalId = setInterval(function () {
			// 		time = time - 1;
			// 		_this.$nextTick(function () {
			// 		_this.vCodeTips = '重新发送(' + time + ')';
			// 		console.log(_this.vCodeTips);
			// 		})
			// 		if (time == 0) {
			// 			time = 5;
			// 		}
			// 	}, 1000);
			// }
		}
	}
</script>

<style>
	@import url("../../static/app.css");
	@import url("../../colorui/main.css");

	page {
		background-color: #fff;
	}

	.ground {
		height: 100%;
		width: 100%;
		position: absolute;
		background: url(../../static/shouye/3.png)no-repeat center center;
		background-size: cover;
	}

	.ad-banner {
		width: 100%;
		height: 30%;
	}

	.ad-banner image {
		width: 100%;
		height: 100%;
	}


	.main {
		background-color: #f1f1f1;
	}


	body,
	html {
		height: 100%;
	}

	body {
		background-color: #f1f1f1;
	}

	uni-page-body {
		height: 100%;
	}

	.layoutStyle {
		width: 35px;
		height: 35px;
		margin: 5rpx;
	}

	.layoutStyle image {
		width: 100%;
		height: 100%;
	}

	.bg-bl {
		background-color: rgba(0, 0, 0, 0.1) !important;
		color: #ffffff;
		min-height: 30px;
	}

	.iconBg {
		border-radius: 1rem;
		width: 4rem;
		height: 4rem;
	}

	.text-shadow-title {
		font-size: 1rem;
		text-shadow: 0.05rem 0.05rem #333;
	}

	.text-shadow {
		text-shadow: 0.05rem 0.05rem #333;
	}

	.text-center {
		text-align: center;
	}

	.cu-item {
		margin: 5px !important;
	}
</style>
