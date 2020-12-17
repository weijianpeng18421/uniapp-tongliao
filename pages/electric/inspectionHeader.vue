<template>
	<view class="main main-top-bg2 bg-my-gray">
		<cu-custom class="head" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">华电蒙东数字化智能巡检平台</block>
		</cu-custom>
		<view class="cu-bar  bg-white">
			<view class="action">
				<text class="cuIcon-titles text-blue"></text>巡检信息
			</view>
		</view>
		<scroll-view scroll-y class="bg-my-gray" >
			<form>
				<view class="cu-form-group">
					<view class="title">工作票号</view>
					<input maxlength="50" v-model="headerDetail.wtid" placeholder="请输入工作票号" name="input"  @input="inputChange" ></input>
				</view>
				<view class="cu-form-group " v-show="false">
					<view class="title">风场id</view>
					<input maxlength="50" v-model="headerDetail.windFarmId" disabled placeholder="请输入风场id" name="input" @input="inputChange" ></input>
				</view>
				<view class="cu-form-group ">
					<view class="title">风场名称</view>
					<input maxlength="50" v-model="headerDetail.windFarmName" disabled placeholder="请输入风场名称" name="input"  @input="inputChange" ></input>
				</view>
				<view class="cu-form-group">
					<view class="title">温　　度</view>
					<input maxlength="50" v-model="headerDetail.temperature" placeholder="请输入温度" name="input"  @input="inputChange" ></input>
				</view>
				<view class="cu-form-group">
					<view class="title">风　　速</view>
					<input maxlength="50" v-model="headerDetail.windSpeed" placeholder="请输入风速" name="input"  @input="inputChange" ></input>
				</view>
				<view class="cu-form-group" v-show="false">
					<view class="title">风机编码</view>
					<input maxlength="50" v-model="headerDetail.deviceCode" disabled placeholder="请输入风机编码" name="input"  @input="inputChange" ></input>
				</view>
				<view class="cu-form-group">
					<view class="title">风机名称</view>
					<input maxlength="50" v-model="headerDetail.deviceName" disabled placeholder="请输入风机编码" name="input" class="text-color" @input="inputChange" ></input>
				</view>
				<view class="cu-form-group">
					<view class="title">巡检次数</view>
					<picker @change="PickerChange" :value="index" :range="patrolNum">
						{{index>-1?patrolNum[index]:'请选择'}}
					</picker>				
				</view>
				<view class="cu-form-group">
					<view class="title">巡检日期</view>
					<input maxlength="50" v-model="headerDetail.patrolDate" disabled placeholder="请输入巡检日期" name="input" @input="inputChange" ></input>
				</view>
				<view class="cu-form-group" v-show="false">
					<view class="title">模板类型</view>
					<input maxlength="50" v-model="headerDetail.templateType" placeholder="请输入模板类型" name="input"  @input="inputChange" ></input>
				</view>
			</form>
			<view class="flex ">
				<view class="flex-sub   text-center ">
					<button class="cu-btn  shadow common-btn common-btn-cur" @click="goScan">确定</button>
				</view>
				<!-- <view class="flex-sub padding-sm margin-xs radius text-center">
					<button class="cu-btn bg-blue shadow common-btn"  @click="goLast" >取消</button>
				</view> -->
			</view>
			<view class="check-end-text">{{content}}</view>
		</scroll-view>
	</view>
</template>

<script>
	import {getByKey ,setByKey} from '../../util/auth.js'
	import {isNullOrEmpty,objIsNullOrEmpty} from '../../util/stringUtil.js'
	import { mapGetters } from 'vuex'

	export default {
		data() {
			return {
				inspectionIndex: 'test',
				inspectionItem:[],
				headerDetail:{
					wtid:'',
					windFarmId:'1',//风场id
					windFarmName:'1',//风场名称
					temperature:'',
					windSpeed:'',
					deviceCode:'1',//风机id
					deviceName:'1',//风机名称
					patrolNumCode:'',
					patrolNumText:'',
					patrolDate:'',
					templateType:''
				},
				content:'',
				index:-1,
				patrolNum:[],
				picker2: ['喵喵喵2', '汪汪汪2', '哼唧哼唧2'],
			}
		},
		computed: {
			...mapGetters([
				'patrolTemplateType',
				'patrolTemplate'
			])
		},
		onLoad() {
			let _this = this
			this.inspectionItem = _this.patrolTemplateType
			this.headerDetail.templateType = getByKey('checkedTemplateType')
			this.getData()
			this.getCode()
			this.getPatrolNum()
		},
		methods: {
			RadioChange(e){
				this.inspectionIndex = e.detail.value
			},
			goScan(e){
				var _this = this
				var flag = true 
				if(objIsNullOrEmpty(_this.headerDetail)){
					_this.content = '请将巡检信息填写完整'
				}else{
					setByKey('headerDetail',JSON.stringify(_this.headerDetail))
					uni.navigateTo({
					    url: 'inspectionCheck'
					});
				}	
			},
			inputChange(){
				this.content = ''
			},
			getData(){
				var date = new Date();
				var formatDate = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日 ' + date.getHours() + ':' + (date.getMinutes()>10?date.getMinutes():'0'+date.getMinutes());
				this.headerDetail.patrolDate = formatDate
			},
			getCode(){
				var _this = this
				var strArrays = getByKey('code').split(';')
				if(strArrays[0]!=''){
					_this.headerDetail.windFarmId = strArrays[0]
					_this.headerDetail.windFarmName = strArrays[1]
					_this.headerDetail.deviceCode = strArrays[2]
					_this.headerDetail.deviceName = strArrays[3]
				}
			},
			getPatrolNum(){
				var _this = this
				var tempPatrolNum = getByKey('patrolNum')
				for(var i in tempPatrolNum){
					_this.patrolNum.push(tempPatrolNum[i].text)
				}
			},
			PickerChange(e) {
				this.inputChange()
				this.index = e.detail.value ==-1?0:e.detail.value
				this.headerDetail.patrolNumCode = this.index+1+''
				this.headerDetail.patrolNumText = this.patrolNum[this.index]
			},
			goLast(){
				var _this = this
				uni.navigateTo({
				    url: 'inspectionScan'
				});
			}
		}
	}
</script>

<style>
	@import url("../../static/app.css");
	@import url("../../colorui/main.css");
	
	.main{
		height: 100%;
		background-color: #F1F1F1;
	}
	uni-page{
		background-color: #F1F1F1 !important;
	}
	.check-end-text{
		color: #FF0000;
		text-align: center !important;
		margin-top: 20px;
	}
	.cu-form-group{
		
	}
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
