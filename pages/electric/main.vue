<template>
	<view class="main main-top-bg bg-my-gray">
		<cu-custom class="head" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">新能源智能运维移动APP平台</block>
		</cu-custom>
		<scroll-view scroll-x class="nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-orange cur':''" v-for="(item,index) in tabName" :key="index"
				 @tap="tabSelect" :data-id="index">
					{{item}}
				</view>
			</view>
		</scroll-view>
		<scroll-view scroll-x class="kpi-content tab-content" v-if="TabCur == 0">
			<view class="flex  p-xs margin-bottom-sm mb-sm kpi-item">
				<view  class="flex-sub  padding-sm margin-xs radius  "  v-for="(item,index) in funName" :key="index" @tap="kpiSelect" :data-id="index">
					<view  :class="index==kapCur?'text-blue-my cur kpi-icon-list':' kpi-icon-list '">
						<view style="margin-bottom: 30rpx;">
							<image :src="item.icon" class="kpi-icons"></image>
						</view>
						{{item.name}}
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="content" v-show="kapCur==0 && TabCur==0">
			<!-- #ifdef APP-PLUS || H5 -->
			<view @click="echarts.onClick" :prop="option" :change:prop="echarts.updateEcharts" id="echarts" class="echarts"></view>
			<!-- #endif -->
		</view>
		<view class="content" v-show="kapCur==1 && TabCur==0">
			<!-- #ifdef APP-PLUS || H5 -->
			<view  @click="echarts.onClick" :change:prop="echarts.updateEcharts" :prop="option2" id="myEcharts" class="myEcharts"></view>
			<!-- #endif -->
		</view>
		<view class="content" v-show="kapCur==2 && TabCur==0">
			<!-- #ifdef APP-PLUS || H5 -->
			<view  @click="echarts.onClick" :change:prop="echarts.updateEcharts" :prop="option3" id="echarts3" class="myEcharts"></view>
			<!-- #endif -->
		</view>
		<view class="content" v-show="kapCur==3 && TabCur==0">
			<!-- #ifdef APP-PLUS || H5 -->
			<view  @click="echarts.onClick" :change:prop="echarts.updateEcharts" :prop="option4" id="echarts4" class="myEcharts"></view>
			<!-- #endif -->
		</view>
		<view class="content" v-show="approvalCur==0 && TabCur==1">
			<view class="parent-container" >
				<view class="item-container" v-for="(item,index) in approval" :key="index" @tap="approvalSelection" :data-id="index">
					<view :class="index==approvalCur?'text-blue-my top-fun-three-cur':' top-fun-three-item '">
						<image :src="item.icon" class="item-kpi-icons"></image>
					</view>
					<text :class="index==approvalCur?'text-blue-my':' '">{{item.name}}</text>
				</view>
			</view>
			<view class="flex  p-xs  mb-sm">
				<view class="flex-sub table-title-bg padding-sm">申请人1</view>
				<view class="flex-sub table-title-bg padding-sm">类型</view>
				<view class="flex-sub table-title-bg padding-sm">日期</view>
				<view class="flex-sub table-title-bg padding-sm">办理</view>
			</view>
			<view class="flex  p-xs  mb-sm">
				<view class="flex-sub table-content-bg padding-sm">申请人</view>
				<view class="flex-sub table-content-bg padding-sm">类型</view>
				<view class="flex-sub table-content-bg padding-sm">日期</view>
				<view class="flex-sub table-content-bg padding-sm" @click="approvalUrl">办理</view>
			</view>
			<view class="flex  p-xs  mb-sm">
				<view class="flex-sub table-content-bg padding-sm">申请人</view>
				<view class="flex-sub table-content-bg padding-sm">类型</view>
				<view class="flex-sub table-content-bg padding-sm">日期</view>
				<view class="flex-sub table-content-bg padding-sm" @click="approvalUrl">办理</view>
			</view>
		</view>
		<view class="content" v-show="approvalCur==1 && TabCur==1">
			<view class="parent-container" >
				<view class="item-container" v-for="(item,index) in approval" :key="index" @tap="approvalSelection" :data-id="index">
					<view :class="index==approvalCur?'text-blue-my top-fun-three-cur':' top-fun-three-item '">
						<image :src="item.icon" class="item-kpi-icons"></image>
					</view>
					<text :class="index==approvalCur?'text-blue-my':' '">{{item.name}}</text>
				</view>
			</view>
			<view class="flex  p-xs  mb-sm">
				<view class="flex-sub table-title-bg padding-sm">申请人2</view>
				<view class="flex-sub table-title-bg padding-sm">类型</view>
				<view class="flex-sub table-title-bg padding-sm">日期</view>
				<view class="flex-sub table-title-bg padding-sm">办理</view>
			</view>
			<view class="flex  p-xs  mb-sm">
				<view class="flex-sub table-content-bg padding-sm">申请人</view>
				<view class="flex-sub table-content-bg padding-sm">类型</view>
				<view class="flex-sub table-content-bg padding-sm">日期</view>
				<view class="flex-sub table-content-bg padding-sm" @click="approvalUrl">办理</view>
			</view>
			<view class="flex  p-xs  mb-sm">
				<view class="flex-sub table-content-bg padding-sm">申请人</view>
				<view class="flex-sub table-content-bg padding-sm">类型</view>
				<view class="flex-sub table-content-bg padding-sm">日期</view>
				<view class="flex-sub table-content-bg padding-sm" @click="approvalUrl">办理</view>
			</view>
		</view>
		<view class="content" v-show="approvalCur==2 && TabCur==1">
			<view class="parent-container" >
				<view class="item-container" v-for="(item,index) in approval" :key="index" @tap="approvalSelection" :data-id="index">
					<view :class="index==approvalCur?'text-blue-my top-fun-three-cur':' top-fun-three-item '">
						<image :src="item.icon" class="item-kpi-icons"></image>
					</view>
					<text :class="index==approvalCur?'text-blue-my':' '">{{item.name}}</text>
				</view>
			</view>
			<view class="flex  p-xs  mb-sm">
				<view class="flex-sub table-title-bg padding-sm">申请人3</view>
				<view class="flex-sub table-title-bg padding-sm">类型</view>
				<view class="flex-sub table-title-bg padding-sm">日期</view>
				<view class="flex-sub table-title-bg padding-sm">办理</view>
			</view>
			<view class="flex  p-xs  mb-sm">
				<view class="flex-sub table-content-bg padding-sm">申请人</view>
				<view class="flex-sub table-content-bg padding-sm">类型</view>
				<view class="flex-sub table-content-bg padding-sm">日期</view>
				<view class="flex-sub table-content-bg padding-sm" @click="approvalUrl">办理</view>
			</view>
			<view class="flex  p-xs  mb-sm">
				<view class="flex-sub table-content-bg padding-sm">申请人</view>
				<view class="flex-sub table-content-bg padding-sm">类型</view>
				<view class="flex-sub table-content-bg padding-sm">日期</view>
				<view class="flex-sub table-content-bg padding-sm" @click="approvalUrl">办理</view>
			</view>
		</view>

		<view class="work-parent" v-show="TabCur==2">
			<view class="work-container" v-for="(item,index) in work" :key="index" @tap="workSelection" :data-id="index">
				<view :class="index==workCur?'text-blue-my  work-fun-item':' work-fun-item '">
					<image :src="item.icon" class="work-fun-icons"></image>
				</view>
				<view>
					<text :class="index==workCur?'text-blue-my':' '" class="margin-top-sm">{{item.name}}</text>
				</view>
			</view>
		</view>
		<!-- <view class="margin-bottom" >
			<button @click="getTemplateType">请求模板类型</button>
			<button @click="getTemplate">请求模板内容</button>
			<button @click="isOpenDatase">数据库是否打开</button>
			<button @click="openDatase">打开数据库</button>
			<button @click="saveMessage">插入数据</button>
			<button @click="queryMessage">查询数据</button>
			<button @click="sendMessage">请求网络数据</button>
			<button @click="exitLogin">退出登录</button>
		</view> -->
		<!--弹出对话框-->
		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar modal-title-bg justify-end">
					<view class="content">请签名</view>
					<view class="action " @tap="hideModal">
						<text class="cuIcon-close text-white"></text>
					</view>
				</view>
				<view class="padding-xl modal-content-bg">
					Modal 内容。
				</view>
				<view class="cu-bar bg-white justify-center">
					<view class="action">
						<button class="cu-btn modal-btn" @tap="hideModal">取消</button>
						<button class="cu-btn modal-btn" @tap="hideModal">确定</button>

					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import echarts from 'echarts'
	import { isOpenDatabase, openCommDB, executeSQL, selectSQL } from '../../util/sqlLiteUtil.js'
	import {queryAll,getPatrolTemplate} from '../../api/user.js'
	import {setToken, getToken ,setInspectionModal, getByKey ,setByKey} from '../../util/auth.js'
	import TOKEN_MESSAGE_CONTANTS from '../../constant/commonConstant.js'
	export default {
		data() {
			return {
				TabCur: 0,
				kapCur: 0,
				scrollLeft: 0,
				approvalCur:0,
				workCur:0,
				goodsCur:0,
				tabName: ['辅助管理', '物资审批', '现场工作'],
				funName: [{
					icon: '../../static/cgsp.png',
					name: 'KPI指标'
				}, {
					icon: '../../static/qxgz.png',
					name: '缺陷管理'
				}, {
					icon: '../../static/jgxm.png',
					name: '技改项目'
				}, {
					icon: '../../static/zxzg.png',
					name: '专项整改'
				}],
				approval:[{
					icon: '../../static/cgsp.png',
					name: '采购审批'
				},{
					icon: '../../static/qxgz.png',
					name: '询价审批'
				},{
					icon: '../../static/zxzg.png',
					name: '出库审批'
				}],
				work:[{
					icon: '../../static/xuncha.png',
					name: '巡查管理'
				},{
					icon: '../../static/work_manager.png',
					name: '工作票管理'
				},{
					icon: '../../static/ticket.png',
					name: '操作票管理'
				},{
					icon: '../../static/check-fix.png',
					name: '检修管理'
				}],
				images: [
					'https://dummyimage.com/800/ffffff/000000',
					'https://dummyimage.com/1600/ffffff/000000',
					'https://dummyimage.com/1280/000000/ffffff',
					'https://dummyimage.com/400/000000/ffffff',
				],
				index: null,
				orgOptions: {},
				sumValue: 1000,
				useGroupData: [{
					name: "本科",
					value: 754
				}, {
					name: "硕士",
					value: 611
				}, {
					name: "大专",
					value: 400
				}, {
					name: "博士",
					value: 200
				}],
				modalName: null,
				option: {
					legend: {
						data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
					},
					yAxis: {
						type: 'value'
					},
					series: [
						{
							name: '邮件营销',
							type: 'line',
							stack: '总量',
							data: [120, 132, 101, 134, 90, 230, 210]
						},
						{
							name: '联盟广告',
							type: 'line',
							stack: '总量',
							data: [220, 182, 191, 234, 290, 330, 310]
						},
						{
							name: '视频广告',
							type: 'line',
							stack: '总量',
							data: [150, 232, 201, 154, 190, 330, 410]
						},
						{
							name: '直接访问',
							type: 'line',
							stack: '总量',
							data: [320, 332, 301, 334, 390, 330, 320]
						},
						{
							name: '搜索引擎',
							type: 'line',
							stack: '总量',
							data: [820, 932, 901, 934, 1290, 1330, 1320]
						}]
				},
				option2:{
					  backgroundColor: '#333333',
					     title: {
					         textStyle: {
					             align: 'center',
					             color: '#fff',
					             fontSize: 20,
					         },
					         top: '5%',
					         left: 'center',
					     },
					     tooltip: {
					         trigger: 'axis',
					         axisPointer: {
					             lineStyle: {
					                 color: {
					                     type: 'linear',
					                     x: 0,
					                     y: 0,
					                     x2: 0,
					                     y2: 1,
					                     colorStops: [{
					                         offset: 0,
					                         color: 'rgba(0, 255, 233,0)'
					                     }, {
					                         offset: 0.5,
					                         color: 'rgba(255, 255, 255,1)',
					                     }, {
					                         offset: 1,
					                         color: 'rgba(0, 255, 233,0)'
					                     }],
					                     global: false
					                 }
					             },
					         },
					     },
					     grid: {
					         top: '15%',
					         left: '5%',
					         right: '5%',
					         bottom: '15%',
					         // containLabel: true
					     },
					     xAxis: [{
					         type: 'category',
					         axisLine: {
					             show: true
					         },
					         splitArea: {
					             // show: true,
					             color: '#f00',
					             lineStyle: {
					                 color: '#f00'
					             },
					         },
					         axisLabel: {
					             color: '#fff'
					         },
					         splitLine: {
					             show: false
					         },
					         boundaryGap: false,
					         data: ['A', 'B', 'C', 'D', 'E', 'F'],

					     }],

					     yAxis: [{
					         type: 'value',
					         min: 0,
					         // max: 140,
					         splitNumber: 4,
					         splitLine: {
					             show: true,
					             lineStyle: {
					                 color: 'rgba(255,255,255,0.1)'
					             }
					         },
					         axisLine: {
					             show: false,
					         },
					         axisLabel: {
					             show: false,
					             margin: 20,
					             textStyle: {
					                 color: '#d1e6eb',

					             },
					         },
					         axisTick: {
					             show: false,
					         },
					     }],
					     series: [{
					             name: '注册总量',
					             type: 'line',
					             // smooth: true, //是否平滑
					             showAllSymbol: true,
					             // symbol: 'image://./static/images/guang-circle.png',
					             symbol: 'circle',
					             symbolSize: 25,
					             lineStyle: {
					                 normal: {
					                     color: "#6c50f3",
					                     shadowColor: 'rgba(0, 0, 0, .3)',
					                     shadowBlur: 0,
					                     shadowOffsetY: 5,
					                     shadowOffsetX: 5,
					                 },
					             },
					             label: {
					                 show: true,
					                 position: 'top',
					                 textStyle: {
					                     color: '#6c50f3',
					                 }
					             },
					             itemStyle: {
					                 color: "#6c50f3",
					                 borderColor: "#fff",
					                 borderWidth: 3,
					                 shadowColor: 'rgba(0, 0, 0, .3)',
					                 shadowBlur: 0,
					                 shadowOffsetY: 2,
					                 shadowOffsetX: 2,
					             },
					             tooltip: {
					                 show: false
					             },
					             areaStyle: {
					                 normal: {
					                     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					                             offset: 0,
					                             color: 'rgba(108,80,243,0.3)'
					                         },
					                         {
					                             offset: 1,
					                             color: 'rgba(108,80,243,0)'
					                         }
					                     ], false),
					                     shadowColor: 'rgba(108,80,243, 0.9)',
					                     shadowBlur: 20
					                 }
					             },
					             data: [502.84, 205.97, 332.79, 281.55, 398.35, 214.02, ]
					         },
					         {
					             name: '注册总量',
					             type: 'line',
					             // smooth: true, //是否平滑
					             showAllSymbol: true,
					             // symbol: 'image://./static/images/guang-circle.png',
					             symbol: 'circle',
					             symbolSize: 25,
					             lineStyle: {
					                 normal: {
					                     color: "#00ca95",
					                     shadowColor: 'rgba(0, 0, 0, .3)',
					                     shadowBlur: 0,
					                     shadowOffsetY: 5,
					                     shadowOffsetX: 5,
					                 },
					             },
					             label: {
					                 show: true,
					                 position: 'top',
					                 textStyle: {
					                     color: '#00ca95',
					                 }
					             },

					             itemStyle: {
					                 color: "#00ca95",
					                 borderColor: "#fff",
					                 borderWidth: 3,
					                 shadowColor: 'rgba(0, 0, 0, .3)',
					                 shadowBlur: 0,
					                 shadowOffsetY: 2,
					                 shadowOffsetX: 2,
					             },
					             tooltip: {
					                 show: false
					             },
					             areaStyle: {
					                 normal: {
					                     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					                             offset: 0,
					                             color: 'rgba(0,202,149,0.3)'
					                         },
					                         {
					                             offset: 1,
					                             color: 'rgba(0,202,149,0)'
					                         }
					                     ], false),
					                     shadowColor: 'rgba(0,202,149, 0.9)',
					                     shadowBlur: 20
					                 }
					             },
					             data: [281.55, 398.35, 214.02, 179.55, 289.57, 356.14, ],
					         },
					     ]
				},
				option3:{
					backgroundColor: '#333333',
					    color: [{
					        type: 'linear',
					        x: 0,
					        y: 0,
					        x2: 1,
					        y2: 1,
					        colorStops: [{
					            offset: 0,
					            color: 'rgba(10,31,95,1)'
					        }, {
					            offset: 1,
					            color: 'rgba(1,232,254,1)'
					        }],
					        global: false
					    }],
					    grid: {
					        top: '16%',
					        bottom: '54%',
					        left: "50%",
					        containLabel: false
					    },
					    yAxis: [{
					        type: 'category',
					        inverse: true,
					        z: 3,
					        axisLine: {
					            show: false
					        },
					        axisTick: {
					            show: false
					        },
					        axisLabel: {
					            interval: 0,
					            inside: false,
					            textStyle: {
					                color: "RGB(78,184,252)",
					                fontSize: 25,
					            },
					            show: true
					        },
					        data: ["本科","硕士","大专","博士"]
					    }],
					    xAxis: [{
					        show: false
					    }],
					    series: [{
						"name": "大环",
						"type": "gauge",
						"splitNumber": 15,
						"radius": "82%",
						"center": ["50%", "55%"],
						"startAngle": 90,
						"endAngle": -269.9999,
						"axisLine": {
							"show": false,
							"lineStyle": {
								"color": [
									[1, "#1f59a7"]
								]
							}
						},
						"axisTick": {
							"show": false
						},
						"splitLine": {
							"show": true,
							"length": 32,
							"lineStyle": {
								"color": "auto",
								"width": 3.5
							}
						},
						"axisLabel": {
							"show": false
						},
						"detail": {
							"show": false
						}
					}, {
						"name": "小环",
						"type": "gauge",
						"splitNumber": 15,
						"radius": "78%",
						"center": ["50%", "55%"],
						"startAngle": 90,
						"endAngle": -269.9999,
						"axisLine": {
							"show": false
						},
						"axisTick": {
							"show": true,
							"lineStyle": {
								"color": "#1f59a7",
								"width": 3
							},
							"length": 20,
							"splitNumber": 5
						},
						"splitLine": {
							"show": false
						},
						"axisLabel": {
							"show": false
						},
						"detail": {
							"show": false
						}
					}, {
						"name": "学历",
						"type": "pie",
						"clockWise": true,
						"z": 2,
						"hoverAnimation": false,
						"radius": ["73%", "68%"],
						"center": ["50%", "55%"],
						"label": {
							"show": true,
							"formatter": "{d}%",
							"color": "RGB(246,175,101)",
							"fontSize": 25,
							"position": "inside"
						},
						"labelLine": {
							"show": false
						},
						"data": [{
							"value": 754,
							"name": "本科"
						}, {
							"value": 246,
							"name": "",
							"itemStyle": {
								"color": "rgba(0,0,0,0)",
								"borderWidth": 0
							},
							"tooltip": {
								"show": false
							},
							"label": {
								"show": false
							},
							"hoverAnimation": false
						}]
					}, {
						"name": "背景线",
						"type": "pie",
						"silent": true,
						"z": 1,
						"clockWise": true,
						"hoverAnimation": false,
						"radius": ["71%", "69%"],
						"center": ["50%", "55%"],
						"label": {
							"show": false
						},
						"itemStyle": {
							"label": {
								"show": false
							},
							"labelLine": {
								"show": false
							},
							"borderWidth": 5
						},
						"data": [{
							"value": 100,
							"itemStyle": {
								"color": "RGB(12,64,128)",
								"borderWidth": 0
							},
							"tooltip": {
								"show": false
							},
							"hoverAnimation": false
						}]
					}, {
						"name": "学历",
						"type": "pie",
						"clockWise": true,
						"z": 2,
						"hoverAnimation": false,
						"radius": ["58%", "53%"],
						"center": ["50%", "55%"],
						"label": {
							"show": true,
							"formatter": "{d}%",
							"color": "RGB(246,175,101)",
							"fontSize": 25,
							"position": "inside"
						},
						"labelLine": {
							"show": false
						},
						"data": [{
							"value": 611,
							"name": "硕士"
						}, {
							"value": 389,
							"name": "",
							"itemStyle": {
								"color": "rgba(0,0,0,0)",
								"borderWidth": 0
							},
							"tooltip": {
								"show": false
							},
							"label": {
								"show": false
							},
							"hoverAnimation": false
						}]
					}, {
						"name": "背景线",
						"type": "pie",
						"silent": true,
						"z": 1,
						"clockWise": true,
						"hoverAnimation": false,
						"radius": ["56%", "54%"],
						"center": ["50%", "55%"],
						"label": {
							"show": false
						},
						"itemStyle": {
							"label": {
								"show": false
							},
							"labelLine": {
								"show": false
							},
							"borderWidth": 5
						},
						"data": [{
							"value": 100,
							"itemStyle": {
								"color": "RGB(12,64,128)",
								"borderWidth": 0
							},
							"tooltip": {
								"show": false
							},
							"hoverAnimation": false
						}]
					}, {
						"name": "学历",
						"type": "pie",
						"clockWise": true,
						"z": 2,
						"hoverAnimation": false,
						"radius": ["43%", "38%"],
						"center": ["50%", "55%"],
						"label": {
							"show": true,
							"formatter": "{d}%",
							"color": "RGB(246,175,101)",
							"fontSize": 25,
							"position": "inside"
						},
						"labelLine": {
							"show": false
						},
						"data": [{
							"value": 400,
							"name": "大专"
						}, {
							"value": 600,
							"name": "",
							"itemStyle": {
								"color": "rgba(0,0,0,0)",
								"borderWidth": 0
							},
							"tooltip": {
								"show": false
							},
							"label": {
								"show": false
							},
							"hoverAnimation": false
						}]
					}, {
						"name": "背景线",
						"type": "pie",
						"silent": true,
						"z": 1,
						"clockWise": true,
						"hoverAnimation": false,
						"radius": ["41%", "39%"],
						"center": ["50%", "55%"],
						"label": {
							"show": false
						},
						"itemStyle": {
							"label": {
								"show": false
							},
							"labelLine": {
								"show": false
							},
							"borderWidth": 5
						},
						"data": [{
							"value": 100,
							"itemStyle": {
								"color": "RGB(12,64,128)",
								"borderWidth": 0
							},
							"tooltip": {
								"show": false
							},
							"hoverAnimation": false
						}]
					}, {
						"name": "学历",
						"type": "pie",
						"clockWise": true,
						"z": 2,
						"hoverAnimation": false,
						"radius": ["28%", "23%"],
						"center": ["50%", "55%"],
						"label": {
							"show": true,
							"formatter": "{d}%",
							"color": "RGB(246,175,101)",
							"fontSize": 25,
							"position": "inside"
						},
						"labelLine": {
							"show": false
						},
						"data": [{
							"value": 200,
							"name": "博士"
						}, {
							"value": 800,
							"name": "",
							"itemStyle": {
								"color": "rgba(0,0,0,0)",
								"borderWidth": 0
							},
							"tooltip": {
								"show": false
							},
							"label": {
								"show": false
							},
							"hoverAnimation": false
						}]
					}, {
						"name": "背景线",
						"type": "pie",
						"silent": true,
						"z": 1,
						"clockWise": true,
						"hoverAnimation": false,
						"radius": ["26%", "24%"],
						"center": ["50%", "55%"],
						"label": {
							"show": false
						},
						"itemStyle": {
							"label": {
								"show": false
							},
							"labelLine": {
								"show": false
							},
							"borderWidth": 5
						},
						"data": [{
							"value": 100,
							"itemStyle": {
								"color": "RGB(12,64,128)",
								"borderWidth": 0
							},
							"tooltip": {
								"show": false
							},
							"hoverAnimation": false
						}]
					}]
				},
				option4:{
					backgroundColor: "#333333",
					     title: {
					         text: (0.2 * 100).toFixed(0) + '{a|%}',
					         textStyle: {
					             fontSize: 50,
					             fontFamily: 'Microsoft Yahei',
					             fontWeight: 'normal',
					             color: '#bcb8fb',
					             rich: {
					                 a: {
					                     fontSize: 28,
					                 }
					             }
					         },
					         x: 'center',
					         y: '35%'
					     },
					     graphic: [{
					         type: 'group',
					         left: 'center',
					         top: '60%',
					         children: [{
					             type: 'text',
					             z: 100,
					             left: '10',
					             top: 'middle',
					             style: {
					                 fill: '#aab2fa',
					                 text: '流量统计',
					                 font: '20px Microsoft YaHei'
					             }
					         }]
					     }],
					     series: [{
					         type: 'liquidFill',
					         radius: '80%',
					         center: ['50%', '50%'],
					         //  shape: 'roundRect',
					         data: [0.2,0.2,0.4],
					         backgroundStyle: {
					             color: {
					                 type: 'linear',
					                 x: 1,
					                 y: 0,
					                 x2: 0.5,
					                 y2: 1,
					                 colorStops: [{
					                     offset: 1,
					                     color: 'rgba(68, 145, 253, 0)'
					                 }, {
					                     offset: 0.5,
					                     color: 'rgba(68, 145, 253, .25)'
					                 }, {
					                     offset: 0,
					                     color: 'rgba(68, 145, 253, 1)'
					                 }],
					                 globalCoord: false
					             },
					         },
					         outline: {
					             borderDistance: 0,
					             itemStyle: {
					                 borderWidth: 20,
					                 borderColor: {
					                     type: 'linear',
					                     x: 0,
					                     y: 0,
					                     x2: 0,
					                     y2: 1,
					                     colorStops: [{
					                         offset: 0,
					                         color: 'rgba(69, 73, 240, 0)'
					                     }, {
					                         offset: 0.5,
					                         color: 'rgba(69, 73, 240, .25)'
					                     }, {
					                         offset: 1,
					                         color: 'rgba(69, 73, 240, 1)'
					                     }],
					                     globalCoord: false
					                 },
					                 shadowBlur: 10,
					                 shadowColor: '#000',
					             }
					         },
							 itemStyle:{
								 color: {
								     type: 'linear',
								     x: 0,
								     y: 0,
								     x2: 0,
								     y2: 1,
								     colorStops: [{
								         offset: 1,
								         color: 'rgba(58, 71, 212, 0)'
								     }, {
								         offset: 0.5,
								         color: 'rgba(31, 222, 225, .2)'
								     }, {
								         offset: 0,
								         color: 'rgba(31, 222, 225, 1)'
								     }],
								     globalCoord: false
								 }
							 },
					         label: {
					             normal: {
					                 formatter: '',
					             }
					         }
					     }, ]
				}

			}
		},
		onLoad() {

		},
		methods: {
			changeOption() {
				const data = this.option.series[0].data
				// 随机更新示例数据
				data.forEach((item, index) => {
					data.splice(index, 1, Math.random() * 40)
				})
			},
			onViewClick(options) {
				console.log(options)
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			kpiSelect(e){
				this.kapCur = e.currentTarget.dataset.id;
			},
			// getTemplateType() {
			// 	getPatrolTemplateType().then(res => {
			// 		setByKey('templateType',JSON.stringify(res.template));
			// 	})
			// },
			getTemplate() {
				getPatrolTemplate().then(res => {
					setByKey('templateType2',JSON.stringify(res.jsonData));
					console.log(JSON.parse(getByKey('templateType2'))[0].subTaskContent)
				})
			},
			isOpenDatase() {
				var msg = isOpenDatabase()?"已打开":"未打开"
				uni.showToast({
					title:msg,
					position: 'bottom',
					icon: 'none',
					duration:1000
				})
			},
			openDatase(){
				openCommDB(function(){
					uni.showToast({
						title:'成功',
						position: 'bottom',
						icon: 'none',
						duration:1000
					})
				},function(){
					uni.showToast({
						title:'失败',
						position: 'bottom',
						icon: 'none',
						duration:1000
					})
				})
			},
			saveMessage(data){
				var token = getToken(TOKEN_MESSAGE_CONTANTS.ACCESS_TOKEN_NAME);
				setByKey('modleData',JSON.stringify(data))
				setByKey('token',token)
				console.log("---"+getByKey('modleData'))
				console.log("---"+getByKey('token'))
				var dropSql = "drop table testTable";
				executeSQL(dropSql,function(e){
					uni.showToast({
						title:'清空表成功',
						position: 'bottom',
						icon: 'none',
						duration:1000
					})
				},function(){
					uni.showToast({
						title:'清空表失败',
						position: 'bottom',
						icon: 'none',
						duration:1000
					})
				});
				var createSql = 'create table if not exists testTable("ID" CHAR(32),"userName" CHAR(100))'
				executeSQL(createSql,function(e){
					uni.showToast({
						title:'创建表成功',
						position: 'bottom',
						icon: 'none',
						duration:1000
					})
					var inserSql = "";
					for(var i in data){
						inserSql = "insert into testTable values('"+data[i].id+"','"+data[i].userName+"')";
						executeSQL(inserSql,function(e){
							uni.showToast({
								title:'保存成功',
								position: 'bottom',
								icon: 'none',
								duration:1000
							})
						},function(){
							uni.showToast({
								title:'保存失败',
								position: 'bottom',
								icon: 'none',
								duration:1000
							})
						});
					}
				},function(){
					uni.showToast({
						title:'创建表失败',
						position: 'bottom',
						icon: 'none',
						duration:1000
					})
				})
			},
			queryMessage(){
				var sql = "select * from testTable";
				var result = '';
				selectSQL(sql,function(data){
					for(var i in data){
						console.log(data)
						result = result + JSON.stringify(data[i].userName)
					}
					uni.showToast({
						title:result,
						position: 'bottom',
						icon: 'none',
						duration:1000
					})
				},function(e){
					uni.showToast({
						title:JSON.stringify(e),
						position: 'bottom',
						icon: 'none',
						duration:1000
					})
				})
			},
			//请求网络数据
			sendMessage() {
				var _this = this
				//判断网络状态
				uni.getNetworkType({
				    success: function (res) {
						if(res.networkType!='none'){
							queryAll({
								id:'123123',
								name:'23423'
							}).then(res=>{
								uni.showToast({
									title:"有网络，请求成功",
									position: 'bottom',
									icon: 'none',
									duration:5000
								})
								for(var i in res.data){
									uni.showToast({
										title:JSON.stringify(res.data[i]),
										position: 'bottom',
										icon: 'none',
										duration:5000
									})
								}
								_this.saveMessage(res.data)
							})
						}else{
							uni.showToast({
								title:"没有网络，请求失败",
								position: 'bottom',
								icon: 'none',
								duration:5000
							})
						}
				    },
					fail: function (res) {
				        uni.showToast({
				        	title:"网络检测失败",
				        	position: 'bottom',
				        	icon: 'none',
				        	duration:5000
				        })
				    },
				});
			},
			exitLogin(){
				setToken(null)
				uni.navigateTo({
				    url: 'index'
				});
			},
			workSelection(e){
				this.workCur = e.currentTarget.dataset.id;
				if(this.workCur==0){
					uni.navigateTo({
					    url: 'inspection?id=1&name=uniapp'
					});
				}
				if(this.workCur==1){
					uni.navigateTo({
					    url: 'workTicket'
					});
				}
				if(this.workCur==2){
					uni.navigateTo({
					    url: 'operationTicket'
					});
				}
				if(this.workCur==3){
					uni.navigateTo({
					    url: 'overhaul'
					});
				}
			},
			approvalSelection(e){
				this.approvalCur = e.currentTarget.dataset.id;
			},
			showModal(e) {
				this.modalName = 'DialogModal1'
			},
			hideModal(e) {
				this.modalName = null
			},
			approvalUrl(){
				if(this.approvalCur==0){
					uni.navigateTo({
					    url: 'purchaseApproval'
					});
				}
				if(this.approvalCur==1){
					uni.navigateTo({
					    url: 'enquiryApproval'
					});
				}
				if(this.approvalCur==2){
					debugger
					uni.navigateTo({
					    url: 'deliveryApproval'
					});
				}
			}
		}
	}
</script>

<script module="echarts" lang="renderjs">
	let myChart,myChart1,myChart3,myChart4
	export default {
		mounted() {
			if (typeof window.echarts === 'function') {
				this.initEcharts()
				this.initEcharts2()
				this.initEcharts3()
				this.initEcharts4()
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
			initChart(obj){
				this.initEcharts.bind(obj)
				this.initEcharts2.bind(obj)
				this.initEcharts3.bind(obj)
				this.initEcharts()
				this.initEcharts2()
				this.initEcharts3()
				// 动态引入较大类库避免影响页面展示
				const script1 = document.createElement('script')
				// view 层的页面运行在 www 根目录，其相对路径相对于 www 计算
				script1.src = 'static/echarts-liquidfill.min.js'
				script1.onload = this.initEcharts4.bind(this)
				document.head.appendChild(script1)
			},
			initEcharts() {
				myChart = echarts.init(document.getElementById('echarts'),'dark')
				// 观测更新的数据在 view 层可以直接访问到
				myChart.setOption(this.option)
				myChart.resize()
			},
			initEcharts2() {

				myChart1 = echarts.init(document.getElementById('myEcharts'),'dark')
				// 观测更新的数据在 view 层可以直接访问到
				myChart1.setOption(this.option2)
				myChart1.resize()
			},
			initEcharts3() {
				myChart3 = echarts.init(document.getElementById('echarts3'),'dark')
				// 观测更新的数据在 view 层可以直接访问到
				myChart3.setOption(this.option3)
				myChart3.resize()
			},
			initEcharts4(){
				myChart4 = echarts.init(document.getElementById('echarts4'),'dark')
				// 观测更新的数据在 view 层可以直接访问到
				myChart4.setOption(this.option4)
				myChart4.resize()
			},
			updateEcharts(newValue, oldValue, ownerInstance, instance) {
				// 监听 service 层数据变更
				myChart.setOption(newValue)
			},
			onClick(event, ownerInstance) {
				// 调用 service 层的方法
				ownerInstance.callMethod('onViewClick', {
					test: 'test'
				})
			}
		}
	}
</script>

<style>
	@import url("../../static/app.css");
	@import url("../../colorui/main.css");
  .ec-canvas {
		display: flex;
		height: 100%;
		flex: 1;
	}

	.canvasView {
		width: 700upx;
		height: 500upx;
	}
	uni-page-body{
		height: 100%;
	}
	.echarts-wrap {
	  width: 100%;
	  height: 300px;
	}
	.nav{
		color: white;
		height: 100rpx;
		margin-top: 50rpx;
	}
	.nav .cu-item.cur{
		background-color: #231e24;
		border-radius: 60rpx;
		border: 2px solid #352e35;
		box-shadow:2px 3px 3px #000000;
		color: white;
	}
	.text-blue-my{
		color: #7c87da;
	}
	.tab-content{
		color: white;
	}
	.kpi-icon-list{
		width: 120rpx;
		height: 120rpx;
		border: 2px solid #717071;
		border-radius: 60rpx;
		text-align: center;
		background: -webkit-linear-gradient(top,#0b090c,#353036);
	}
	.kpi-item .cur{
		width: 120rpx;
		height: 120rpx;
		border: 2px solid #211c23;
		border-radius: 60rpx;
		text-align: center;
		border: 2px solid #42519d;
		background: -webkit-linear-gradient(top,#1d0b74,#404e9b);
	}
	.content {
		display: block;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	.echarts {
		margin-top: 20px;
		width: 400px;
		height: 300px;
		margin: 0 auto;
	}
	.myEcharts div{
		width: 100% !important;
	}
	.myEcharts{
		margin-top: 20px;
		width: 400px;
		height: 300px;
		margin: 0 auto;
	}
	body{
		height: 100%;
	}
</style>
