<template>
	<view class="main bg-my-gray">
		<cu-custom class="head" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">新能源智能运维移动APP平台</block>
		</cu-custom>
		<scroll-view scroll-y class="bg-my-gray">
			<view class="ground cu-card case">
				<!-- <view class="ad-banner"></view> -->
				<view class="cu-item shadow bg-white" style="margin: 0px;padding: 15px;">
					<!-- <view class="cu-bar"> -->
						<view class="action text-bold text-shadow-title margin-top-sm">
							<text class="cuIcon-titles text-olive">选择巡检类型</text>
						</view>
					</view>
					<radio-group class="block inspection-item-content padding-bottom-sm" @change="RadioChange">
						<view class="inspection-item">
							<block v-for="(item,index) in inspectionItem" :key="index" :data-id="index">
								<view class="cu-form-group">
									<view class="title">{{item.text}}</view>
									<radio class='radio' :class="inspectionIndex=='index'?'checked':''" :checked="inspectionIndex==index+1?true:false" :value="item.id"></radio>
								</view>
							</block>
						</view>
					</radio-group>
			</view>
			
			
			<view class="flex">
				<view class="flex-sub padding-sm margin-xs radius text-center">
					<button class="cu-btn bg-green shadow common-btn common-btn-cur" @click="goScan">确定</button>
				</view>
				<!-- <view class="flex-sub padding-sm margin-xs radius text-center">
					<button class="cu-btn bg-blue shadow common-btn" @click="goLast" >取消</button>
				</view> -->
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { setByKey } from '../../util/auth.js'
	export default {
		data() {
			return {
				inspectionIndex: '1',
				inspectionItem:[]
			}
		},
		computed: {
			...mapGetters([
				'patrolTemplateType'
			])
		},
		onLoad() {
			this.inspectionItem = this.patrolTemplateType
		},
		methods: {
			RadioChange(e){
				this.inspectionIndex = e.detail.value
			},
			goScan(e){
				var _this = this
				setByKey('checkedTemplateType',_this.inspectionIndex)
				uni.navigateTo({
				    url: 'inspectionScan'
				});
			},
			goLast(){
				var _this = this
				uni.navigateTo({
				    url: 'inspectionIndex'
				});
			}
		}
	}
</script>

<style>
	@import url("../../static/app.css");
	@import url("../../colorui/main.css");
	uni-page-body{
		height: 100%;
		background-color: white;
	}
	body{
		height: 100%;
	}
	
</style>
