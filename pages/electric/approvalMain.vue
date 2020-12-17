<template>
	<view class="main main-top-bg2">
		<cu-custom class="head" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content" >{{tabName[TabCur]}}</block>
		</cu-custom>
		<scroll-view scroll-y class="content  bg-my-gray"  v-if="TabCur == 0">
			<view class="cu-card case no-card">
				<view class="cu-item">
					<view class="flex  p-xs  mb-sm solids-bottom border-top-color">
						<view class="flex-sub table-title-bg padding-sm ">申请日期</view>
						<view class="flex-sub table-title-bg padding-sm">申请人</view>
						<view class="flex-sub table-title-bg padding-sm">类型</view>
						<view class="flex-sub table-title-bg padding-sm">办理</view>
					</view>
					<view class="flex  p-xs  mb-sm solid-bottom text-center" v-for="(item,index) in applyList" :key="index">
						<view class="flex-sub  padding-sm text-sm">{{item.APPLY_DATE}}</view>
						<view class="flex-sub  padding-sm text-sm">{{item.APPLY_PERSON_NAME}}</view>
						<view class="flex-sub  padding-sm text-sm">{{item.TYPE_NAME}}</view>
						<view class="flex-sub  padding-sm text-sm text-blue text-bold " @click="approvalUrl(item)">办理</view>
					</view>
				</view>
			</view>
		</scroll-view>

		<scroll-view scroll-y class="content  bg-my-gray" v-if="TabCur == 1">
			<view class="cu-card case no-card">
				<view class="cu-item border-top-color">
					<view class="flex  p-xs  mb-sm solids-bottom ">
						<view class="flex-sub table-title-bg padding-sm">申请日期</view>
						<view class="flex-sub table-title-bg padding-sm">申请人</view>
						<view class="flex-sub table-title-bg padding-sm">类型</view>
						<view class="flex-sub table-title-bg padding-sm">办理</view>
					</view>
					<view class="flex  p-xs  mb-sm text-center solid-bottom" v-for="(item,index) in orderList" :key="index">
						<view class="flex-sub  padding-sm text-sm">{{item.APPLY_DATE}}</view>
						<view class="flex-sub  padding-sm text-sm">{{item.APPLY_PERSON_NAME}}</view>
						<view class="flex-sub  padding-sm text-sm">{{item.TYPE_NAME}}</view>
						<view class="flex-sub  padding-sm text-sm text-blue text-bold " @click="approvalUrl(item)">办理</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<scroll-view scroll-y class="content  bg-my-gray " v-if="TabCur == 2">
			<view class="cu-card case no-card">
				<view class="cu-item border-top-color">
					<view class="cu-bar solid-bottom text-black">
						<view class="action">
							<text class="cuIcon-title text-blue "></text>
							<text class="text-blue text-bold">{{checkTitle}}</text>
						</view>
						<view class="action">
							<button class="cu-btn shadow bg-gradual-blue" @tap="showModal" data-target="gridModal">选择</button>
						</view>
					</view>
					<view class="flex  p-xs  mb-sm solids-bottom ">
						<view class="flex-sub table-title-bg padding-sm">申请日期</view>
						<view class="flex-sub table-title-bg padding-sm">申请人</view>
						<view class="flex-sub table-title-bg padding-sm">仓库</view>
						<view class="flex-sub table-title-bg padding-sm">办理</view>
					</view>
					<view class="flex  p-xs  mb-sm solid-bottom text-center" v-for="(item,index) in boundList" :key="index">
						<view class="flex-sub  padding-sm text-sm">{{item.APPLY_DATE}}</view>
						<view class="flex-sub  padding-sm text-sm">{{item.APPLY_PERSION_NAME}}</view>
						<view class="flex-sub  padding-sm text-sm">{{item.OA_STOCK_NAME}}</view>
						<view class="flex-sub  padding-sm text-sm text-blue text-bold " @click="approvalUrl(item)">办理</view>
					</view>
				</view>
			</view>
		</scroll-view>

		<scroll-view scroll-y class="content  bg-my-gray " v-if="TabCur == 3">
			<view class="cu-card case no-card">
				<view class="cu-item border-top-color">
					<view class="cu-bar solid-bottom  text-black">
						<view class="action">
							<text class="cuIcon-title text-blue "></text>
							<text class="text-blue text-bold">{{checkTitle}}</text>
						</view>
						<view class="action">
							<button class="cu-btn shadow bg-gradual-blue" @tap="showModal" data-target="gridModal">选择</button>
						</view>
					</view>
					<view class="flex  p-xs  mb-sm solids-bottom ">
						<view class="flex-sub table-title-bg padding-sm">申请日期</view>
						<view class="flex-sub table-title-bg padding-sm">申请人</view>
						<view class="flex-sub table-title-bg padding-sm">仓库</view>
						<view class="flex-sub table-title-bg padding-sm">办理</view>
					</view>
					<view class="flex  p-xs  mb-sm solid-bottom text-center" v-for="(item,index) in basisList" :key="index">
						<view class="flex-sub  padding-sm  text-sm">{{item.APPLY_DATE}}</view>
						<view class="flex-sub  padding-sm text-sm">{{item.APPLY_PERSION_NAME}}</view>
						<view class="flex-sub  padding-sm text-sm">{{item.OA_STOCK_NAME}}</view>
						<view class="fflex-sub  padding-sm text-sm text-blue text-bold " @click="approvalUrl(item)">办理</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="cu-modal" :class="modalName=='gridModal'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop>
				<radio-group class="block" @change="childChange">
					<view class="cu-list menu text-left">
						<view class="cu-item" v-for="(item,index) in checkList" :key="index">
							<label class="flex justify-between align-center flex-sub">
								<view class="flex-sub">{{item.MENU_NAME}}</view>
								<radio class="round" :value="(index) + ''" :class="childCol==index?'checked':''" :checked="childCol==index"></radio>
							</label>
						</view>
					</view>
				</radio-group>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		applyList,
		orderList,
		stockCheckMenu,
		stockList,
		constructionMenu,
		constructionList
	} from '../../api/user.js'
	export default {
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				approvalCur: 0,
				workCur: 0,
				goodsCur: 0,
				tabName: ['采购审批', '询价审批', '出库审批', '基建审批'],
				index: null,
				orgOptions: {},
				sumValue: 1000,
				applyList: [],
				orderList: [],
				boundList: [],
				basisList: [],
				checkList: [],
				childTab: 0,
				childScroll: 0,
				modalName: null,
				childCol: -1,
				checkTitle: '审批选择',
				checkState: -5
			}
		},
		onLoad(option) {
			this.TabCur = option.tab
			this.getCurList(option.tab)
		},
		onShow() {
			this.applyList = []
			this.orderList = []
			this.boundList = []
			this.basisList = []
			this.getCurList('0')
			this.getCurList('1')
			this.getStockList(this.checkState)
		},
		methods: {
			getStockList(index) {
				var _this = this
				var data = {}
				_this.boundList = []
				_this.basisList = []
				data.STATUS = _this.checkState
				if (_this.TabCur == '2') {
					stockList(data).then(res => {
						if (res.list != '[]') {
							_this.boundList = res.list
						}
					})
				} else if(_this.TabCur == '3') {
					constructionList(data).then(res => {
						if (res.list != '[]') {
							_this.basisList = res.list
						}
					})
				}
			},
			childChange(e) {
				var _this = this
				_this.childCol = e.detail.value
				_this.checkTitle = _this.checkList[_this.childCol].MENU_NAME
				var state = _this.checkList[_this.childCol].url
				if (_this.TabCur == '2') {
					_this.checkState = state.substr(36)
				} else if (_this.TabCur == '3') {
					_this.checkState = state.substr(43)
				}
				_this.getStockList(_this.checkState)
				_this.hideModal()
			},
			tabSelect(e) {
				var _this = this
				_this.TabCur = e.currentTarget.dataset.id;
				_this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				_this.getCurList(_this.TabCur)
			},
			getCurList(index) {
				var _this = this
				if(index == undefined) return
				index = index.toString()
				switch (index) {
					case '0':
						applyList().then(res => {
							_this.applyList = res.list
						})
						break;
					case '1':
						orderList().then(res => {
							_this.orderList = res.list
						})
						break;
					case '2':
						_this.checkTitle = '审批选择'
						_this.checkState = -5
						_this.childCol = -1
						stockCheckMenu().then(res => {
							_this.checkList = res
						})
						_this.boundList = []
						break;
					case '3':
						_this.checkTitle = '审批选择'
						_this.checkState = -5
						_this.childCol = -1
						constructionMenu().then(res => {
							_this.checkList = res
						})
						_this.basisList = []
						break;
				}
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			approvalUrl(item) {
				var url = ''
				switch (this.TabCur.toString()) {
					case '0':
						url = 'approvalApply' + '?uid=' + item.PURCHASE_UUID + '&detp_id=' + item.DETP_ID + '&step=' + item.APPLY_STATUS_CODE +
							'&name=' + item.APPLY_STATUS_NAME + '&time=' + item.APPLY_DATE
						break;
					case '1':
						url = 'approvalOrder' + '?uid=' + item.PURCHASE_ORDER_UUID + '&detp_id=' + item.DETP_ID + '&step=' + item.ORDER_STATUS_CODE +
							'&name=' + item.ORDER_STATUS_CODE + '&time=' + item.APPLY_DATE + '&puid=' + item.PURCHASE_UUID
						break;
					case '2':
						url = 'approvalStock' + '?uid=' + item.ID
						break;
					case '3':
						url = 'approvalConstruction' + '?uid=' + item.ID
						break;
				}
				uni.navigateTo({
					url: url
				});
			}
		}
	}
</script>


<style>
	@import url("../../static/app.css");
	@import url("../../colorui/main.css");

	html,
	body {
		height: 100%;
		background-color: #f1f1f1;
	}

	uni-page {
		background-color: #333 !important;
	}

	uni-page-body {
		height: 100%;
		background-color: #f1f1f1;
	}

	uni-page-wrapper {
		background-color: #f1f1f1 !important;
	}

	.nav {
		color: black;
		height: 100rpx;
		margin-top: 50rpx;
	}

	.nav .cu-item.cur {
		background-color: #ffffff;
		border-radius: 60rpx;

		box-shadow: 2px 3px 3px #00007f;
		color: black;
	}

	.main{
		background-color: #f1f1f1;
	}

	.table-content-bg:last-child{
		color: #fff;

	}
	.border-top-color{
		border-top: 2px solid #f37b1d;
	}
	.table-title-bg{
		color: #000000;
		background: #FFFFFF;
		/* border: 2px solid #00557f; */
	}

	.text-blue-my {
		color: #7c87da;
	}

	.tab-content {
		color: white;
	}

	.cu-list.menu>.cu-item {
		background-color: #ffffff;
		color: #000000;
	}

	.cu-list.menu>.cu-item:after {
	}

</style>
