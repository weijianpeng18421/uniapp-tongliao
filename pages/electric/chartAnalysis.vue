<template>
	<view class="main  main-top-bg2 bg-white">
		<cu-custom class="head" :isBack="true">
			<block slot="backText">返回</block>
		</cu-custom>
		<scroll-view scroll-x class=" nav bg-white" style="color: #000000;border: 1px solid #424242;">
			<view class="flex text-center bg-white">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-blue cur':'text-black'" v-for="(item,index) in tabs" :key="index" @tap="tabSelect" :data-id="index">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		<view class="bg-white">
			<echarts :option="option" :id="option.id" :style="'height:' + windowHeight +'px;width:'+ windowWidth + 'px;'"></echarts>
		</view>
	</view>
</template>

<script>
	import Echarts from '@/components/echarts/echarts.vue'
	import chartLine from "../../constant/chartLine.js"
	import {
		areaChart,stationChart
	} from '../../api/chartPost.js'
	export default {
		components: {
			Echarts
		},
		data() {
			return {
				tabs:[{
					name:'区域'
				},{
					name:'场站'
				}],
				TabCur:0,
				modalName: null,
				modalText: '',
				platform: '',
				windowWidth: '',
				windowHeight: '',
				option: {}
			}
		},
		onLoad() {
			this.getAreaChart()
		},
		created() {
			var _this = this
			uni.getSystemInfo({
				success: function(res) {
					_this.platform = res.platform
					if (res.platform == 'iphone' || res.platform == 'android') {
						setTimeout(function(){
							plus.screen.lockOrientation('landscape-primary')	
						},1300)
						_this.windowWidth = res.windowHeight
						_this.windowHeight = res.windowWidth * 0.9
					} else {
						_this.windowWidth = res.windowWidth
						_this.windowHeight = res.windowHeight * 0.88
					}
				}
			})
		},
		mounted() {},
		destroyed() {
			if (this.platform == 'iphone' || this.platform == 'android') {
				plus.screen.lockOrientation('portrait-primary');
			}
		},
		methods: {
			clickArea: function() {
				this.getAreaChart()
			},
			clickGround: function() {
				this.getStationChart()
			},
			getAreaChart(){
				var _this = this
				areaChart().then(res => {
					_this.option = chartLine['getOption3_1'](res)
				})
			},
			getStationChart(){
				var _this = this
				stationChart().then(res => {
					_this.option = chartLine['getOption3_2'](res)
				})
			},
			clickBack: function() {
				uni.navigateBack({
					delta: 1
				})
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
				if(this.TabCur == 0){
					this.clickArea()
				}else{
					this.clickGround()
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

	#chart {
		height: 25rem;
		width: 45rem;
	}

	.view-fix {
		z-index: 1000;
		position: absolute;
		top: 120upx;
		right: 50upx;
	}
	.uni-scroll-view{
		background-color: #333333 !important;
	}
	.uni-scroll-view-content {
	    width: 100%;
	    height: 100%;
	    background-color: #333333 !important;
	    color: white;
	}

</style>
