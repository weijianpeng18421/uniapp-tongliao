<template>
	<view class="main main-top-bg2 bg-my-gray">
		<cu-custom class="head" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">巡检开始</block>
		</cu-custom>
		<view class="text-center bg-white" >
			<view class="cu-bar  solid-bottom ">
				<view class="action">
					<text class="cuIcon-title text-orange"></text> 操作
				</view>
				<!-- <view class="action">退出巡检</view> -->
			</view>
			<scroll-view scroll-x class=" padding response cu-steps steps-bottom " :scroll-into-view="'scroll-' + scroll"
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
			<scroll-view scroll-y class="check-content ">
				<block v-for="(item,index) in checkDetail" :key="index" :data-id="index">
					<view class="margin-left-sm margin-right-sm text-black" v-if="scroll===index && scroll!==listLength-1">
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
								<input maxlength="50" placeholder="请输入上下限实际值" name="input" class="text-color" @input="valueChange" :value="checkDetail[index].value"></input>
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
								<input maxlength="50" placeholder="请输入备注" name="input" class="text-color" @input="inputChange" :value="checkDetail[index].notes"></input>
							</view>
						</view>
						<view class="flex detail " v-if="item.isPhoto=='1' || item.status=='0'">
							<view class="basis-sm text-left">拍照：</view>
							<view class="flex-sub ">
								<text class="lg text-gray cuIcon-camera" @click="gotPic"></text>
								<view>
									<image :src="checkDetail[index].curUrl"></image>
								</view>
							</view>
						</view>
					</view>
				</block>
				<view class="action margin-bottom-sm" v-if="scroll!=listLength-1">
					<button class="cu-btn  shadow grey-btn" @tap="LastSteps" v-if="scroll!=0">上一步</button>
					<button class="cu-btn  shadow grey-btn" @tap="ScrollSteps">下一步</button>
				</view>
				<view v-if="scroll===listLength-1">
					<view class="check-end-text">{{checkDetail[listLength-1].content}}</view>
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
		<!--弹出扫一扫对话框-->
		<view class="cu-modal" :class="modalName2=='DialogModal2'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar modal-title-bg justify-end">
					<view class="content">巡检任务提示</view>
					<view class="action " @tap="hideModal2">
						<text class="cuIcon-close text-white"></text>
					</view>
				</view>
				<view class="padding-xl modal-content-bg">{{modalText2}}</view>
				<!-- <button class="cu-btn bg-green shadow common-btn common-btn-cur" @tap="goScan">扫一扫</button> -->
				<view class="cu-bar bg-white justify-center">
					<view class="action">
						<button class="cu-btn modal-btn" @tap="hideModal2">取消</button>
						<button class="cu-btn modal-btn" @tap="goScan">确定</button>
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
				listLength: 0,//部巡检记录的长度
				checkDetail: [],//要上传的全部巡检记录，页面加载存入
				templateType: '1',
				jsonData: {},
				detail: [],//要上传的巡检文本记录，点下一步才会存入
				id: '',
				modalName: null,//保存巡检任务模态框
				modalText: '',
				modalName2: null,//扫一扫模态框
				modalText2: '',
				signModalName: null,
				signUrl: '',
				area: 'AA',
				areaValue: '请选择审核人',
				areaList: [{
					key: 'AA',
					value: '请选择审核人'
				}],
				currentJsonData: {}
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
			this.currentJsonData = getByKey('currentJsonData')
			this.getTemplate()
			this.id = getUUID()
			this.setSubmit()
		},
		methods: {
			//打开扫一扫
			goScan(e){
				var _this = this
				uni.scanCode({
				    onlyFromCamera: true,
				    success: function (res) {
						_this.modalName2 = null
						_this.goNextStep()
				    }
				});
			},
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
							console.log(_this.checkDetail[_this.scroll].name)
					}
				});
			},
			//点击序号跳转步骤
			checkNum(index) {
				this.scroll = index
				this.getDate()
				//this.cacheCheckDetail()
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
				var date = new Date();
				var formatDate = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日 ' + date.getHours() +
					':' + (date.getMinutes() > 10 ? date.getMinutes() : '0' + date.getMinutes());
				if (_this.scroll == _this.listLength - 1) {
					_this.checkDetail[_this.scroll].content = '本巡检工作已于' + formatDate + '完成。'
				}
			},
			//确定
			goNext() {
				var _this = this
				if (_this.area === 'AA') {
					_this.modalText = '请选择提交人'
					uni.showToast({
						title: _this.modalText,
						position: 'center',
						icon: 'none',
						duration: 1000
					})
					return
				}
				console.log(_this.signUrl)
				console.log('999')
				var newCheckDetail = _this.checkDetail.slice(0, -1) //删掉数组最后一个,因为最后是完成步骤
				//把签名照片存进数组
				var signItem = {
					curUrl: '',
					name: ''
				}
				signItem.curUrl = _this.signUrl
				signItem.name = _this.id
				newCheckDetail.push(signItem) //把签名照片存进数组
				//拼jsonData
				_this.jsonData.detail = _this.detail
				_this.jsonData.id = _this.id
				_this.jsonData.logCode = _this.currentJsonData.logCode
				_this.jsonData.wtid = _this.currentJsonData.wtid
				_this.jsonData.windFarmId = _this.currentJsonData.windFarmId
				_this.jsonData.windFarmName = _this.currentJsonData.windFarmName
				_this.jsonData.patrolNum = _this.currentJsonData.patrolNum
				_this.jsonData.patrolDate = _this.currentJsonData.workDate
				_this.jsonData.templateType = _this.currentJsonData.templateTypeCode
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
				//当前场内巡检任务成功，删除任务列表中该任务
				var tempInsidePatrolList = getByKey('insidePatrolList')
				var taskIndex = getByKey('taskIndex')//任务下标
				tempInsidePatrolList.splice(taskIndex,1)
				setByKey('insidePatrolList',tempInsidePatrolList)
			},
			//状态单选框
			statusChange(e) {
				this.checkDetail[this.scroll].status = e.detail.value
				this.getDateByChecked()
			},
			//加载模版内容
			getTemplate() {
				var _this = this
				var templateData = _this.currentJsonData.templateData
				templateData.forEach((item, index) => {
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
					checkDetailItem.taskNum = item.taskNum;
					checkDetailItem.task = item.task;
					checkDetailItem.subTaskNum = item.subTaskNum;
					checkDetailItem.subTaskContent = item.subTaskContent;
					checkDetailItem.taskEmphasis = item.taskEmphasis;
					checkDetailItem.isPhoto = item.isPhoto;
					checkDetailItem.upperLimit = item.upperLimit != undefined ? item.upperLimit : '';
					checkDetailItem.lowerLimit = item.lowerLimit != undefined ? item.lowerLimit : '';
					_this.checkDetail.push(checkDetailItem);
				})
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
			},
			//实际值输入框
			valueChange(e) {
				this.checkDetail[this.scroll].value = e.detail.value
			},
			//下一步时1.判断单选框是否选择2.如果需要拍照是否拍照3.如果不正常是否拍照
			//数据存入detail
			//子任务之间扫码判断
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
							_this.detail[_this.scroll] = tempDetailItem;
							//如果当前步骤的任务id等于下个步骤的任务id就进入下一步，否则扫一扫，最后完成的步骤不扫
							if(_this.checkDetail[_this.scroll].taskNum==_this.checkDetail[_this.scroll+1].taskNum||_this.scroll+1==_this.listLength-1){
								_this.goNextStep()
							}else{
								_this.modalText2 = '扫一扫'
								_this.showModal2()
							}
							
						}
					}
				}
			},
			//下一步操作
			goNextStep() {
				var _this = this
				_this.scroll = _this.scroll == _this.listLength - 1 ? _this.listLength - 1 : _this.scroll + 1
				_this.getDate()
				//_this.cacheCheckDetail()
			},
			//缓存巡检数据
			cacheCheckDetail() {
				setByKey('checkDetail', this.checkDetail.slice(0, -1))
			},
			//保存巡检模态框
			showModal() {
				this.modalName = 'DialogModal1'
			},
			hideModal() {
				this.modalName = null
				uni.redirectTo({
					url: 'inspectionIndex'
				});
			},
			//扫一扫模态框
			showModal2() {
				this.modalName2 = 'DialogModal2'
			},
			hideModal2() {
				this.modalName2 = null
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

	body {
		height: 100%;
	}

	.flex-sub {
		text-align: left;
	}

	.detail {
	}

	.check-content {
		height: 100%;
	}

	.detail .basis-xs {}

	.content-detail {
		margin: 0px 20px;
	}

	.cuIcon-camera {
		font-size: 30px;
	}

	.steps-bottom {}

	.check-end-text {
		color: #FF0000;
		text-align: center !important;
		font-size: 20px;
		margin-top: 20px;
	}

	.content-position {
		position: fixed;
	}
	.basis-sm {
		flex-basis: 25%
	}
	.sel-btn {
		width: 50%;
		display: table;
		margin: auto;
		margin-top: 10px;
	}
</style>
