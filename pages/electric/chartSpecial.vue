<template>
	<view class="main  main-top-bg2">
		<cu-custom class="head" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">专项整改</block>
		</cu-custom>
		<scroll-view scroll-y class="bg-my-gray">
			<view class="bg-white ">
				<view  class="padding-top-sm text-right" v-if="checkID == 1">
					<button class="cu-btn" :class="isShow==1?'bg-gradual-blue':'bg-grey'" style="margin-right: 5px;" @click="showTable(1)">全部</button>
					<button class="cu-btn" :class="isShow==2?'bg-gradual-blue':'bg-grey'" style="margin-right: 5px;" @click="showTable(2)">苇湖粱</button>
					<button class="cu-btn" :class="isShow==3?'bg-gradual-blue':'bg-grey'" style="margin-right: 5px;" @click="showTable(3)">新能源</button>
				</view>
				<view class="delaye-warning-title bg-my-gray">
					<view class="bg-my-gray shadow">
						<view class="cu-item">
							<view class=" title-fix padding-sm">
								<text class="cuIcon-activity text-yellow"></text>
								<text class="text-black margin-left-sm">{{chartList[0].title}}</text>
							</view>
						</view>
						<view :change:prop="echarts.updateEcharts1" :prop="option1" :id="'echarts1'" class="myEcharts"></view>
					</view>
					<view class="margin-top-sm shadow bg-my-gray">
						<view class="cu-item margin-top-sm ">
							<view class=" title-fix padding-sm">
								<text class="cuIcon-activity text-yellow"></text>
								<text class="text-black margin-left-sm">{{chartList[1].title}}</text>
							</view>
						</view>
						<view :change:prop="echarts.updateEcharts2" :prop="option2" :id="'echarts2'" class="myEcharts"></view>
					</view>
					<view class="margin-top-sm shadow bg-my-gray">
						<view class="cu-item">
							<view class=" title-fix padding-sm">
								<text class="cuIcon-activity text-yellow"></text>
								<text class="text-black margin-left-sm">{{chartList[2].title}}</text>
							</view>
						</view>
						<view :change:prop="echarts.updateEcharts3" :prop="option3" :id="'echarts3'" class="myEcharts"></view>
					</view>
					<view class="margin-top-sm shadow bg-my-gray">
						<view class="cu-item">
							<view class=" title-fix padding-sm">
								<text class="cuIcon-activity text-yellow"></text>
								<text class="text-black margin-left-sm">{{chartList[3].title}}</text>
							</view>
						</view>
						<view :change:prop="echarts.updateEcharts4" :prop="option4" :id="'echarts4'" class="myEcharts"></view>
					</view>
				</view>
			</view>

		</scroll-view>
	</view>
</template>
<script>
	import echarts from 'echarts'
	import {
		checkUnit,
		getZxIssue
	} from '../../api/chartPost.js'
	export default {
		data() {
			return {
				checkID: '',
				chartData: {},
				option1: {name:'123'},
				option2: {name:'123'},
				option3: {name:'123'},
				option4: {name:'123'},
				flag:false,
				isShow:'1',
				chartName:['技术监督','春秋检查','安全评估','非停及其他'],
				chartList: [{
					title: '技术监督',
					num:'',
					id: '',
					option: {}
				}, {
					title: '春秋检查',
					num:'',
					id: '',
					option: {}
				}, {
					title: '安全评估',
					num:'',
					id: '',
					option: {}
				}, {
					title: '非停及其他',
					num:'',
					id: '',
					option: {}
				}]
			}
		},
		onLoad() {
			var _this = this
			//根据权限获取列表
			checkUnit().then(res => {
				var data = {}
				data.data = 1
				_this.checkID = 1
				_this.getData(data)
			})
		},
		methods: {
			showTable(e) {
				this.isShow = e;
				var data = {}
				data.data = e
				this.getData(data)
			},
			getData(data){
				var _this = this
				getZxIssue(data).then(res => {
					_this.chartData = res
					_this.chartList.forEach((item, index) => {
						item.num = ''
						item.title = _this.chartName[index]
						index = index + 1
						item.id = 'data' + index
						item.num = '(' + _this.chartData['data_' + index].num + '/' + _this.chartData['data_' + index].count + ')'
						item.title = item.title + item.num
					})
					_this.option1 = _this.getOption(_this.chartData['data_1'])
					_this.option2 = _this.getOption(_this.chartData['data_2'])
					_this.option3 = _this.getOption(_this.chartData['data_3'])
					_this.option4 = _this.getOption(_this.chartData['data_4'])
					if(_this.flag){
						_this.initEcharts()
					}
					_this.flag = true
				})
			},
			getOption(busData) {
				var temp = "";
				var data = [0];
				if (busData.count * 1 != 0) { // 分母不为0
					temp = busData.num / busData.count;
					data = [temp.toFixed(4)];
				}
				const option = {
					id: busData.id,
					backgroundColor:'#fff',
					series: [{
						type: 'liquidFill',
						data: data,
						center: ["50%", "55%"],
						label: {
							show: true,
							color: '#294D99',
							insideColor: '#fff',
							fontSize: 22
						},
						waveAnimation: true,
						animationDuration: 0,
						animationDurationUpdate: 0,
						color: ['#1593e8'],
						radius: '70%',
						animation: true,
						backgroundStyle: {
							borderWidth: 4,
							borderColor: '#55aaff',
							color: '#e3f7ff'
						},
						outline: {
							show: true,
							borderDistance: 3,
							itemStyle: {
								borderWidth: 3,
								borderColor: '#a9c5de'
							}
						}

					}]
				};
				return option;
			}
		}
	}
</script>
<script module="echarts" lang="renderjs">
	let myChart1,myChart2,myChart3,myChart4
	export default {
		mounted() {
			if (typeof window.echarts === 'function') {
				this.initEcharts()
			} else {
				// 动态引入较大类库避免影响页面展示
				const script = document.createElement('script')
				// view 层的页面运行在 www 根目录，其相对路径相对于 www 计算
				script.src = 'static/echarts.min.js'
				script.onload = this.initChart.bind(this)
				document.head.appendChild(script)
			}
		},
		methods: {
			initChart(obj) {
				// 动态引入较大类库避免影响页面展示
				const script1 = document.createElement('script')
				// view 层的页面运行在 www 根目录，其相对路径相对于 www 计算
				script1.src = 'static/echarts-liquidfill.min.js'
				script1.onload = this.initEcharts.bind(this)
				document.head.appendChild(script1)
			},
			updateEcharts1(newValue, oldValue, ownerInstance, instance){
				if(myChart1!=null){
					myChart1.setOption(newValue)
				}

			},
			updateEcharts2(newValue, oldValue, ownerInstance, instance){
				if(myChart2!=null){
					myChart2.setOption(newValue)
				}
			},
			updateEcharts3(newValue, oldValue, ownerInstance, instance){
				if(myChart3!=null){
					myChart3.setOption(newValue)
				}
			},
			updateEcharts4(newValue, oldValue, ownerInstance, instance){
				if(myChart4!=null){
					myChart4.setOption(newValue)
				}
			},
			initEcharts() {
				myChart1 = echarts.init(document.getElementById('echarts1'), 'dark')
				myChart1.setOption(this['option1'])

				myChart2 = echarts.init(document.getElementById('echarts2'), 'dark')
				myChart2.setOption(this['option2'])

				myChart3 = echarts.init(document.getElementById('echarts3'), 'dark')
				myChart3.setOption(this['option3'])

				myChart4 = echarts.init(document.getElementById('echarts4'), 'dark')
				myChart4.setOption(this['option4'])
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

	.content {
		display: block;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
	}
	.title-fix{
		position: absolute;
		z-index: 1000;
	}
	.myEcharts div {
		background-color: #fff;
	}

	.myEcharts {
		height: 300px;
		margin: 0 auto;
	}

</style>
