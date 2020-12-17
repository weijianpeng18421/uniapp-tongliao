<template>
	<view class="main main-top-bg2 bg-my-gray">
		<cu-custom class="head" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">巡检开始</block>
		</cu-custom>
		<view class="text-center" >
			<view class="cu-bar  solid-bottom bg-white">
				<view class="action">
					<text class="cuIcon-titles text-orange"></text> 操作
				</view>
			</view>
			<scroll-view scroll-x class="  response cu-steps steps-bottom bg-white padding-top-sm" :scroll-into-view="'scroll-' + scroll"
			 scroll-with-animation>
				<view class="cu-item padding-lr-xl" :class="index>scroll?'':'text-blue'" v-for="(item,index) in listLength-1" :key="index"
				 :id="'scroll-' + index" @click="checkNum(index)">
					序号 {{index + 1}} <text class="num" :data-index="index + 1"></text>
				</view>
				<view class="cu-item padding-lr-xl" :class="listLength-1>scroll?'':'text-blue'" :key="listLength" :id="'scroll-' + listLength-1"
				 @click="checkNum(listLength-1)">
					完成 <text class="num" :data-index="listLength"></text>
				</view>
			</scroll-view>
			<scroll-view scroll-y class="check-content bg-my-gray">
				<block v-for="(item,index) in checkDetail" :key="index" :data-id="index">
					<view class="margin-left-sm margin-right-sm" v-if="scroll===index && scroll!==listLength-1">
						<view class="flex detail detail-first">
							<view class="basis-sm text-left">序号：</view>
							<view class="flex-sub ">{{index+1}}</view>
						</view>
						<view class="flex detail ">
							<view class="basis-sm text-left">检查部位：</view>
							<view class="flex-sub ">{{item.task}}</view>
						</view>
						<view class="flex detail ">
							<view class="basis-sm text-left">检查内容：</view>
							<view class="flex-sub ">{{item.subTaskContent}}</view>
						</view>
						<view class="flex detail ">
							<view class="basis-sm text-left">检查重点：</view>
							<view class="flex-sub ">{{item.taskEmphasis}}</view>
						</view>
						<view class="flex detail " v-if="item.upperLimit!=''">
							<view class="basis-sm text-left">上限：</view>
							<view class="flex-sub ">{{item.upperLimit}}</view>
						</view>
						<view class="flex detail " v-if="item.lowerLimit!=''">
							<view class="basis-sm text-left">下限：</view>
							<view class="flex-sub ">{{item.lowerLimit}}</view>
						</view>
						<view class="flex detail " v-if="item.lowerLimit!=''">
							<view class="basis-sm text-left">上下限实际值：</view>
							<view class="flex-sub ">
								<input maxlength="50" placeholder="请输入上下限实际值" name="input" class="text-color" @input="valueChange"></input>
							</view>
						</view>
						<view class="flex detail ">
							<view class="basis-sm text-left">现场情况：</view>
							<view class="flex-sub ">
								<radio-group @change="statusChange">
									<view class="flex-sub">
										正常<radio class='blue margin-left-sm margin-right-sm' :class="checkDetail[index].status=='1'?'checked':''"
										 :checked="checkDetail[index].status=='1'?true:false" value="1"></radio>
										不正常<radio class='red margin-left-sm margin-right-sm' :class="checkDetail[index].status=='0'?'checked':''"
										 :checked="checkDetail[index].status=='0'?true:false" value="0"></radio>
									</view>
								</radio-group>
							</view>
						</view>
						<view class="flex detail ">
							<view class="basis-sm text-left">备注：</view>
							<view class="flex-sub ">
								<view class="cu-form-group" style="padding: 0px;min-height: 26px !important;height: 26px;">
									<input maxlength="50" placeholder="请输入备注" name="input" class="text-color" @input="inputChange" ></input>
								</view>
							</view>
						</view>
						<view class="flex detail " v-if="item.isPhoto=='1' || item.status=='0'">
							<view class="basis-sm text-left">拍照：</view>
							<view class="flex-sub">
								<view class="text-left">
									<text class="cuIcon-camera" @click="gotPic"></text>
								</view>
								<view class="flex-sub">
									<image :src="checkDetail[index].curUrl" style="width: 150px;height: 150px;"></image>
								</view>
							</view>
						</view>
					</view>
				</block>
				<view class="action text-center margin-sm" v-if="scroll!=listLength-1">
					<button class="cu-btn  shadow grey-btn " @tap="LastSteps" v-if="scroll!=0">上一步</button>
					<button class="cu-btn  shadow grey-btn margin-left-sm" @tap="ScrollSteps">下一步</button>
				</view>
				<view v-if="scroll===listLength-1">
					<view class="check-end-text margin-sm">{{checkDetail[listLength-1].content}}</view>
					<!--使用组件进行签名-->
					<sign-modal :modalName.sync="signModalName" :url.sync="signUrl" ref="currentModal"></sign-modal>
					<view>
						<image :src="signUrl" style="width: 120px;height: 80px;"></image>
					</view>
					<button v-if="signUrl==''" class="cu-btn app-btn submit-btn" @click="showSignModal()">签名</button>
					<button v-if="signUrl!=''" class="cu-btn app-btn submit-btn" @click="goNext()">确定</button>
					<select-mod class="cu-btn app-btn submit-btn sel-btn" :searchList="areaList" @chooseItem="chooseArea"></select-mod>
				</view>
			</scroll-view>
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
		savePatrolWorkText
	} from '../../api/user.js'
	import {
		mapGetters
	} from 'vuex'
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
	import signModal from '../../components/modal/signModal.vue'
	import SelectMod from '../../components/modal/selectMod.vue'
	export default {
		components: {
			signModal,
			SelectMod
		},
		data() {
			return {
				content: '扫码二维码',
				scroll: 0,
				url: [],
				curUrl: '',
				listLength: 0,
				checkDetail: [],
				templateType: '1',
				jsonData: {},
				detail: [],
				id: '',
				modalName: null,
				modalText: '',
				signModalName: null,
				signUrl: '',
				area: 'AA',
				areaValue: '请选择审核人',
				areaList: [{
					key: 'AA',
					value: '请选择审核人'
				}],
				checkList: []
			}
		},
		computed: {
			...mapGetters([
				'patrolTemplateType',
				'patrolTemplateDirect',
				'patrolTemplateDouble'
			])
		},
		onLoad() {
			this.templateType = getByKey('checkedTemplateType')
			this.jsonData = JSON.parse(getByKey('headerDetail'))
			this.getTemplate()
			this.id = getUUID()
			this.setSubmit()
		},
		methods: {
			//获取审核人列表
			setSubmit() {
				var _this = this
				_this.$nextTick(() => {
					getByKey('submitUser').forEach((item, index) => {
						var data = {}
						data.key = item.approvalUserId
						data.value = item.approvalUserName
						_this.areaList.push(data)
					})
				})
			},
			chooseArea(selectKey, selectValue) {
				let self = this
				self.area = selectKey
				self.areaValue = selectValue
				console.log(self.area)
				console.log(self.areaValue)
			},
			//点击下一步
			ScrollSteps() {
				this.isChecked()
			},
			//点击上一步
			LastSteps() {
				this.scroll = this.scroll == 0 ? 0 : this.scroll - 1
			},
			//拍照
			gotPic() {
				var _this = this
				uni.chooseImage({
					count: 6, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera'], //从相册选择
					success: function(res) {
						//_this.signUrl = res.tempFilePaths[0]测签名
						_this.checkDetail[_this.scroll].curUrl = res.tempFilePaths[0]
						_this.checkDetail[_this.scroll].name = _this.id + '_' + _this.checkDetail[_this.scroll].taskNum + '_' + _this.checkDetail[
							_this.scroll].subTaskNum
					}
				});
			},
			//点击序号跳转步骤
			checkNum(index) {
				this.scroll = index
				this.getDate()
				this.cacheCheckDetail()
			},
			//记录巡检中打钩的时间
			getDateByChecked() {
				var _this = this
				var date = new Date();
				var formatDate = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日 ' + date.getHours() +
					':' + (date.getMinutes() > 10 ? date.getMinutes() : '0' + date.getMinutes());
				_this.checkDetail[_this.scroll].workTime = formatDate
			},
			//最后一步步骤--获得时间
			getDate() {
				var _this = this
				if (_this.scroll == _this.listLength - 1) {
					var date = new Date();
					var formatDate = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日 ' + date.getHours() +
						':' + (date.getMinutes() > 10 ? date.getMinutes() : '0' + date.getMinutes());
					_this.checkDetail[_this.scroll].content = '本巡检工作已于' + formatDate + '完成。'
				}
			},
			//确定
			goNext() {
				var _this = this
				if (_this.area === 'AA') {
					_this.modalText = '请选择审核人'
					uni.showToast({
						title: _this.modalText,
						position: 'center',
						icon: 'none',
						duration: 1000
					})
					return
				}
				var newCheckDetail = _this.checkDetail.slice(0, -1) //删掉数组最后一个,因为最后是完成步骤
				//把签名照片存进数组
				var signItem = {
					curUrl: '',
					name: ''
				}
				signItem.curUrl = _this.signUrl
				// signItem.name = getUUID()
				signItem.name = _this.id //11.11日修改签名图片的name为文本信息中的id
				newCheckDetail.push(signItem) //把签名照片存进数组
				//拼jsonData
				_this.jsonData.detail = _this.detail
				_this.jsonData.id = _this.id
				_this.jsonData.approvalUserId = _this.area
				_this.jsonData.approvalUserName = _this.areaValue
				setByKey('checkDetail', newCheckDetail) //缓存全部巡检数据（有照片）
				setByKey('jsonData', _this.jsonData) //缓存要上传的全部文本数据

				//判断网络状态并上传
				isNetwork(function() {
					console.log(1)
					upLoadText(_this.jsonData).then(data =>{
						console.log(data+'---------------------')
						upLoadPic(newCheckDetail)
						setByKey('checkDetail', null) //缓存全部巡检数据（有照片）
						setByKey('jsonData', null) //缓存要上传的全部文本数据
						_this.modalText = '巡检任务保存成功'
						_this.showModal()
					}).catch(err => {
						console.log(err+'---------------------')
						_this.modalText = '巡检任务保存失败，请联系系统管理员。'
						_this.showModal()
					});
					
				}, function() {
					console.log(2)
					_this.modalText = '没有网，巡检任务已缓存'
					_this.showModal()
				})
			},
			//状态单选框
			statusChange(e) {
				this.checkDetail[this.scroll].status = e.detail.value
				this.getDateByChecked()
			},
			//加载模版内容
			getTemplate() {
				var _this = this
				var templateData = _this.templateType == "1" ? _this.patrolTemplateDirect : _this.patrolTemplateDouble;
				for (var i in templateData) {
					if (templateData[i].templateType == _this.templateType) {
						var checkDetailItem = {
							taskNum: '', //序号
							task: '', //检查部位
							subTaskNum: '', //子序号
							subTaskContent: '', //检查内容
							taskEmphasis: '', //检查重点
							status: '', //是否正常，0是不正常，1是正常
							notes: '', //备注
							value: '', //实际值 手填部分的内容
							isPhoto: '', //是否拍照；0是false,1是true
							upperLimit: '', //上限
							lowerLimit: '', //下限
							workTime: '', //每次打钩的时间
							curUrl: '', //图片路径
							name: '' //图片名
						}
						checkDetailItem.taskNum = templateData[i].taskNum;
						checkDetailItem.task = templateData[i].task;
						checkDetailItem.subTaskNum = templateData[i].subTaskNum;
						checkDetailItem.subTaskContent = templateData[i].subTaskContent;
						checkDetailItem.taskEmphasis = templateData[i].taskEmphasis;
						checkDetailItem.isPhoto = templateData[i].isPhoto;
						checkDetailItem.upperLimit = templateData[i].upperLimit != undefined ? templateData[i].upperLimit : '';
						checkDetailItem.lowerLimit = templateData[i].lowerLimit != undefined ? templateData[i].lowerLimit : '';
						_this.checkDetail.push(checkDetailItem);
					}
				}
				//最后一步完成步骤
				var lastItem = {
					content: ''
				}
				_this.checkDetail.push(lastItem);
				_this.listLength = _this.checkDetail.length;
			},
			//备注输入框
			inputChange(e) {
				this.checkDetail[this.scroll].notes = e.detail.value
				console.log(this.checkDetail[this.scroll])
			},
			//实际值输入框
			valueChange(e) {
				this.checkDetail[this.scroll].value = e.detail.value
			},
			//下一步时1.判断单选框是否选择2.如果需要拍照是否拍照3.如果不正常是否拍照
			isChecked() {
				var _this = this
				if (_this.checkDetail[_this.scroll].status === '') {
					_this.modalText = '现场情况还没有选择'
					uni.showToast({
						title: _this.modalText,
						position: 'center',
						icon: 'none',
						duration: 1000
					})
				} else {
					if ((_this.checkDetail[_this.scroll].isPhoto === '1' || _this.checkDetail[_this.scroll].status === '0') && _this.checkDetail[
							_this.scroll].curUrl === '') {
						_this.modalText = '巡检任务还没有拍照'
						uni.showToast({
							title: _this.modalText,
							position: 'center',
							icon: 'none',
							duration: 1000
						})
					} else {
						if ((_this.checkDetail[_this.scroll].lowerLimit != '' || _this.checkDetail[_this.scroll].upperLimit != '') &&
							_this.checkDetail[_this.scroll].value === '') {
							_this.modalText = '没有填写实际值'
							uni.showToast({
								title: _this.modalText,
								position: 'center',
								icon: 'none',
								duration: 1000
							})
						} else {
							var tempDetailItem = { //要上传的巡检参数
								taskNum: '', //序号
								subTaskNum: '', //子序号
								status: '', //是否正常，0是不正常，1是正常
								notes: '', //备注
								value: '' //实际值 手填部分的内容
							}
							tempDetailItem.taskNum = _this.checkDetail[_this.scroll].taskNum;
							tempDetailItem.subTaskNum = _this.checkDetail[_this.scroll].subTaskNum;
							tempDetailItem.status = _this.checkDetail[_this.scroll].status;
							tempDetailItem.notes = _this.checkDetail[_this.scroll].notes;
							tempDetailItem.value = _this.checkDetail[_this.scroll].value;
							tempDetailItem.workTime = _this.checkDetail[_this.scroll].workTime;
							console.log(_this.checkDetail[_this.scroll])
							_this.detail[_this.scroll] = tempDetailItem;
							console.log(_this.detail)
							_this.goNextStep()
						}
					}
				}
			},
			//下一步操作
			goNextStep() {
				var _this = this
				_this.scroll = _this.scroll == _this.listLength - 1 ? _this.listLength - 1 : _this.scroll + 1
				_this.getDate()
				_this.cacheCheckDetail()
			},
			//缓存巡检数据
			cacheCheckDetail() {
				setByKey('checkDetail', this.checkDetail.slice(0, -1))
			},
			//模态框
			showModal() {
				this.modalName = 'DialogModal1'
			},
			hideModal() {
				this.modalName = null
				uni.redirectTo({
					url: 'inspectionIndex'
				});
			},
			//签名框
			showSignModal() {
				var _this = this;
				_this.signModalName = 'show';
			},

		}
	}
</script>

<style>
	@import url("../../static/app.css");
	@import url("../../colorui/main.css");

	uni-page-body {
		height: 100%;
	}
	.main{
		background-color: #F1F1F1;
	}
	body {
		height: 100%;
	}

	.flex-sub {
		text-align: left;
	}

	.check-content {
		background-color: #fff;
		color: #000000;
		height: 100%;
	}

	.cuIcon-camera {
		font-size: 30px;
	}

	.check-end-text {
		color: #FF0000;
		text-align: center !important;
	}

	.content-position {
		position: fixed;
	}

	.basis-sm {
		flex-basis: 25%
	}

	.cu-form-group {
	}

	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
	.sel-btn {
			width: 50%;
			display: table;
			margin: auto;
			margin-top: 10px;
		}
</style>
