function getOption2_3(bushData) {
	var res1 = [];
	if (bushData) {
		bushData.forEach(function(t) {
			res1.push(t["value"]);
		});
	}
	var resObj = {};
	for (var i = 0; i < bushData.length; i++) {
		resObj[bushData[i]["name"]] = bushData[i];
	}
	var arrValue = res1
	var sumValue = eval(arrValue.join('+'))
	var objData = resObj
	var res = {
		series: [],
		yAxis: [],
		objData: objData
	};
	for (var i = 0; i < bushData.length; i++) {
		res.series.push({
			name: '',
			type: 'pie',
			clockWise: false, // 顺时加载
			hoverAnimation: false, // 鼠标移入变大
			radius: [85 - i * 45 + '%', 68 - i * 20 + '%'],
			center: ["40%", "55%"],
			label: {
				show: false
			},
			itemStyle: {
				label: {
					show: false
				},
				labelLine: {
					show: false
				},
				borderWidth: 5
			},
			data: [{
				value: bushData[i].value,
				name: bushData[i].name
			}, {
				value: 100 - bushData[i].value,
				name: '',
				itemStyle: {
					color: "rgba(0,0,0,0)",
					borderWidth: 0
				},
				tooltip: {
					show: false
				},
				hoverAnimation: false
			}]
		});
		res.series.push({
			name: '',
			type: 'pie',
			silent: true,
			z: 1,
			clockWise: false, // 顺时加载
			hoverAnimation: false, // 鼠标移入变大
			radius: [85 - i * 45 + '%', 68 - i * 20 + '%'],
			center: ["40%", "55%"],
			label: {
				show: false
			},
			itemStyle: {
				label: {
					show: false
				},
				labelLine: {
					show: false
				},
				borderWidth: 5
			},
			data: [{
				value: 100,
				itemStyle: {
					color: "#828282",
					borderWidth: 0
				},
				tooltip: {
					show: false
				},
				hoverAnimation: false
			}]
		});
	}
	var data = res
	var option = {
		id:'2_3',
		title: {
			text: '技改项目完成率',
			left: 'center',
			textStyle: {
				color: '#00aaff'
			}
		},
		backgroundColor: '#fff',
		legend: {
			show: true,
			icon: "circle",
			top: "center",
			left: '77.5%',
			data: ["特大项目", "重大项目", "一般项目"],
			width: 50,
			padding: [0, 5],
			itemGap: 25,
			formatter: function(name) {
				return "{title|" + name + "}\n{value|" +
					(data.objData[name].value) + "}  {title|%}";
			},
			textStyle: {
				rich: {
					title: {
						fontSize: 10,
						color: "#000"
					},
					value: {
						fontSize: 10,
						color: "#000"
					}
				}
			}
		},
		tooltip: {
			show: true,
			trigger: "item",
			formatter: "{a}<br>{b}:{c}({d}%)"
		},
		color: ['#C1232B', '#E87C25', '#27727B'],
		yAxis: [{
			type: 'category',
			inverse: true,
			axisLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			axisLabel: {
				interval: 0,
				inside: true,
				textStyle: {
					color: "#000",
					fontSize: 16
				},
				show: true
			},
			data: data.yAxis
		}],
		xAxis: [{
			show: false
		}],
		series: data.series
	};
	return option;
}

function getOption1_2_2(busData) {
	var data = [{
		value: busData.data[0],
		name: '一级缺陷'
	}, {
		value: busData.data[1],
		name: '二级缺陷'
	}, {
		value: busData.data[2],
		name: '三级缺陷'
	}]
	var option = {
		id: '1_2_2',
		backgroundColor: '#fff',
		tooltip: {
			trigger: 'item',
			formatter: "{b} : {d}% <br/> {c}"
		},
		title: {
			text: busData.textData,
			subtext: '光伏机组缺陷',
			x: 'center',
			y: 'center',
			textStyle: {
				fontSize: 14,
				fontWeight: 'normal',
				color: '#000'
			},
			subtextStyle: {
				fontSize: 14,
				align: "center",
				fontWeight: 'normal',
				color: '#000'
			}
		},
		series: [{
			type: 'pie',
			radius: ['50', '65'],
			center: ['50%', '50%'],
			animation: true,
			color: ['#80c269', '#00FFFF', '#0090F1'],
			itemStyle: {
				normal: {
					borderWidth: 1,
					borderColor: '#00aaff'
				}
			},
			data: data,
			labelLine: {
				normal: {
					show: true,
					length: 10,
					length2: 15,
					lineStyle: {
						color: '#000',
						width: 2
					}
				}
			},
			label: {
				normal: {
					formatter: '{b|{b}}\n{hr|}\n{c|{c}}',
					rich: {
						b: {
							fontSize: 12,
							color: '#000',
							align: 'left',
							padding: 4
						},
						hr: {
							borderColor: '#55aaff',
							width: '100%',
							borderWidth: 2,
							height: 0
						},
						c: {
							fontSize: 12,
							align: 'center',
							padding: 4,
							color: '#000'
						}
					}
				}
			}
		}]
	};
	return option;
}

function getOption1_2_1(busData) {
	var data = [{
		value: busData.data[0],
		name: '一级缺陷'
	}, {
		value: busData.data[1],
		name: '二级缺陷'
	}, {
		value: busData.data[2],
		name: '三级缺陷'
	}]
	var option = {
		id: '1_2_1',
		backgroundColor: '#fff',
		tooltip: {
			trigger: 'item',
			formatter: "{b} : {d}% <br/> {c}"
		},
		title: {
			text: busData.textData,
			subtext: '风机机组缺陷',
			x: 'center',
			y: 'center',
			textStyle: {
				fontSize: 14,
				fontWeight: 'normal',
				color: '#000'
			},
			subtextStyle: {
				fontSize: 14,
				align: "center",
				fontWeight: 'normal',
				color: '#000'
			}
		},
		series: [{
			type: 'pie',
			radius: ['50', '65'],
			center: ['50%', '50%'],
			animation: true,
			color: ['#80c269', '#00FFFF', '#0090F1'],
			itemStyle: {
				normal: {
					borderWidth: 1,
					borderColor: '#00aaff'
				}
			},
			data: data,
			labelLine: {
				normal: {
					show: true,
					length: 10,
					length2: 15,
					lineStyle: {
						color: '#000',
						width: 2
					}
				}
			},
			label: {
				normal: {
					formatter: '{b|{b}}\n{hr|}\n{c|{c}}',
					rich: {
						b: {
							fontSize: 12,
							color: '#000',
							align: 'left',
							padding: 4
						},
						hr: {
							borderColor: '#55aaff',
							width: '100%',
							borderWidth: 2,
							height: 0
						},
						c: {
							fontSize: 12,
							align: 'center',
							padding: 4,
							color: '#000'
						}
					}
				}
			}
		}]
	};
	return option;
}

function getOption1_3_2(busData) {
	var temp = "";
	var data = [0];
	if (busData.count * 1 != 0) { // 分母不为0
		temp = busData.num / busData.count;
		data = [temp.toFixed(4)];
	}
	const option = {
		id: '1_3_2',
		title: {
			text: '春秋检查(' + busData.num + '/' + busData.count + ')',
			x: "center",
			y: 4,
			textStyle: {
				color: '#fff',
				fontSize: 12,
				fontWeight: 'normal'
			}
		},
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
				borderColor: '#f0efec',
				color: '#e3f7ff'
			},
			outline: {
				show: true,
				borderDistance: 3,
				itemStyle: {
					borderWidth: 3,
					borderColor: '#e7e6e6'
				}
			}

		}]
	};
	return option;
}

function getOption3_1(busData) {
	var china = new Array('零', '一', '二', '三', '四', '五', '六', '七', '八', '九',
		"十", "十一", "十二");
	var showMonth = busData.showMonth;
	showMonth = china[showMonth];
	if (showMonth == "零") {
		showMonth = "一";
	}
	var data = {
		showMonth: showMonth,
		nowYear: busData.nowYear,
		lastYear: busData.lastYear,
		limite: busData.limite
	}
	const option = {
		id: '3_1',
		backgroundColor: '#fff',
		notMerge: true,
		title: {
			text: data.showMonth + '月份区域设备可用率趋势分析',
			left: 'center',
			textStyle: {
				color: '#00aaff'
			}
		},
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			x: '30',
			y: '20',
			itemWidth: 10,
			itemHeight: '10',
			data: [{
				name: '本年累计完成',
				icon: 'circle',
				textStyle: {
					color: '#005500',
					fontSize: '10'
				}
			}, {
				name: '去年同期完成',
				icon: 'circle',
				textStyle: {
					color: '#55aaff',
					fontSize: '10'
				}
			}]

		},
		calculable: true,
		xAxis: [{
			type: 'category',
			data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月',
				'十月', '十一月', '十二月'
			],
			axisLabel: {
				show: true,
				interval: 0,
				textStyle: {
					color: '#000'
				}
			},
			axisLabel: {
				interval: 0,
				textStyle: {
					color: '#000',
					fontSize: '12'
				}
			}
		}],
		yAxis: [{
			type: 'value',
			scale: true,
			splitLine: {
				lineStyle: {
					color: '#00007f'
				}
			},
			axisLabel: {
				textStyle: {
					color: '#000',
					fontSize: '10'
				}
			},
			axisLine: {
				lineStyle: {
					color: '#000', // 颜色
					width: 1
				}
			}
		}],
		series: [{
			name: '本年累计完成',
			type: 'line',
			data: data.nowYear,
			label: {
				normal: {
					color: '#005500',
					show: true,
					position: 'top'
				}
			},
			itemStyle: {
				normal: {
					color: '#005500'
				}
			},
			markLine: {
				data: [{
					yAxis: data.limite,
					itemStyle: {
						normal: {
							color: '#ff7373'
						}
					}
				}]
			}
		}, {
			name: '去年同期完成',
			type: 'line',
			data: data.lastYear,
			label: {
				normal: {
					color: '#55aaff',
					show: true,
					position: 'top'
				}
			},
			itemStyle: {
				normal: {
					color: '#55aaff',
					lineStyle: {
						width: 1,
						type: 'dashed' // 'dotted'虚线 'solid'实线
					}
				}
			}
		}, {
			name: '年累计均值',
			type: 'line',
			data: []
		}]
	};
	return option
}

function getOption3_2(busData) {
	var china = new Array('零', '一', '二', '三', '四', '五', '六', '七', '八', '九',
		"十", "十一", "十二");
	var showMonth = busData.showMonth;
	showMonth = china[showMonth];
	if (showMonth == "零") {
		showMonth = "一";
	}
	var data = {
		showMonth: showMonth,
		dept: busData.dept,
		nowYear: busData.nowYear,
		lastYear: busData.lastYear,
		limite1: busData.limite1,
		limite2: busData.limite2,
		limite3: busData.limite3
	}
	const option = {
		id: '3_2',
		backgroundColor: '#fff',
		notMerge: true,
		title: {
			text: data.showMonth + '月份场站设备可用率对比分析',
			left: 'center',
			textStyle: {
				color: '#00aaff'
			}
		},
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			x: '30',
			y: '20',
			itemWidth: 10,
			itemHeight: '10',
			data: [{
				name: '本年累计完成',
				icon: 'circle',
				textStyle: {
					color: '#008181',
					fontSize: '10'
				}
			}, {
				name: '去年同期完成',
				icon: 'circle',
				textStyle: {
					color: '#55aaff',
					fontSize: '10'
				}
			}]

		},
		calculable: true,
		xAxis: [{
			type: 'category',
			data: data.dept,
			axisLabel: {
				show: true,
				interval: 0,
				textStyle: {
					color: '#000'
				}
			},
			axisLabel: {
				interval: 0,
				rotate: 40,
				textStyle: {
					color: '#000',
					fontSize: '12'
				}
			}
		}],
		yAxis: [{
			type: 'value',
			scale: true,
			splitLine: {
				lineStyle: {
					color: '#000'
				}
			},
			axisLabel: {
				textStyle: {
					color: '#000',
					fontSize: '10'
				}
			},
			axisLine: {
				lineStyle: {
					color: '#1f3054', // 颜色
					width: 1
				}
			}
		}],
		series: [{
			name: '本年累计完成',
			type: 'bar',
			data: data.nowYear,
			label: {
				normal: {
					color: '#008181',
					show: true,
					interval: 0,
					rotate: 90,
					fontWeight: 'bold',
					position: ['0%', '98%']
				}
			},
			itemStyle: {
				normal: {
					color: '#008181'
				}
			},
			markLine: {
				data: [{
					yAxis: data.limite1,
					itemStyle: {
						normal: {
							color: '#ff7373'
						}
					}
				}, {
					yAxis: data.limite2,
					itemStyle: {
						normal: {
							color: '#ff7373'
						}
					}
				}, {
					yAxis: data.limite3,
					itemStyle: {
						normal: {
							color: '#ff7373'
						}
					}
				}]
			}
		}, {
			name: '去年同期完成',
			type: 'bar',
			data: data.lastYear,
			label: {
				normal: {
					color: '#000',
					show: true,
					interval: 0,
					rotate: 90,
					fontWeight: 'bold',
					position: ['0%', '98%']
				}
			},
			itemStyle: {
				normal: {
					color: '#55aaff',
					lineStyle: {
						width: 1,
						type: 'dashed' // 'dotted'虚线 'solid'实线
					}
				}
			}
		}, {
			name: '年累计均值',
			type: 'bar',
			data: []
		}]
	};
	return option
}

function getOption1_2(busData) {
	var data = {
		lgName: ["48", "72", "168", "240", "360"],
		caName: busData.caName,
		data: [{
				"name": "48",
				"type": "bar",
				"stack": "总量",
				"animation": true,
				"itemStyle": {
					"normal": {
						"label": {
							"show": false,
							"position": "insideRight"
						},
						"color": "#0064c8"
					}
				},
				"data": busData.data[0]
			},
			{
				"name": "72",
				"type": "bar",
				"stack": "总量",
				"animation": true,
				"itemStyle": {
					"normal": {
						"label": {
							"show": false,
							"position": "insideRight"
						},
						"color": "#00c8c8"
					}
				},
				"data": busData.data[1]
			},
			{
				"name": "168",
				"type": "bar",
				"stack": "总量",
				"animation": true,
				"itemStyle": {
					"normal": {
						"label": {
							"show": false,
							"position": "insideRight"
						},
						"color": "#00c800"
					}
				},
				"data": busData.data[2]
			},
			{
				"name": "240",
				"type": "bar",
				"stack": "总量",
				"animation": true,
				"itemStyle": {
					"normal": {
						"label": {
							"show": false,
							"position": "insideRight"
						},
						"color": "#c8c800"
					}
				},
				"data": busData.data[3]
			},
			{
				"name": "360",
				"type": "bar",
				"stack": "总量",
				"animation": true,
				"itemStyle": {
					"normal": {
						"label": {
							"show": false,
							"position": "insideRight"
						},
						"color": "#c86400"
					}
				},
				"data": busData.data[4]
			}
		]
	}
	const option = {
		notMerge: true,
		id: '1_2',
		backgroundColor: '#fff',
		tooltip: {
			trigger: "item",
			position: "left",
			axisPointer: {
				type: "shadow"
			}
		},
		grid: {
			left: "16%",
			top: 25,
			bottom: 20,
			borderWidth: 0
		},
		legend: {
			data: data.lgName,
			y: "top",
			x: "center",
			textStyle: {
				color: "#000",
				fontFamily: "Microsoft YaHei"
			}
		},
		calculable: !1,
		xAxis: [{
			type: "value",
			axisLine: {
				lineStyle: {
					color: "#4a4a4a",
					width: 1
				}
			},
			axisTick: {
				show: !0
			},
			name: "",
			nameTextStyle: {
				color: "#000"
			},
			axisLabel: {
				textStyle: {
					color: "#000",
					fontFamily: "Microsoft yahei"
				}
			},
			splitArea: {
				show: !1
			},
			splitLine: {
				show: !1
			}
		}],
		yAxis: [{
			type: "category",
			axisLine: {
				lineStyle: {
					color: "#4a4a4a",
					width: 1
				}
			},
			axisLabel: {
				// formatter : function(a) {
				// 	for (i in a)
				// 		return a.length > 5 ? a.substring(0, 4)
				// 				+ ".." : a
				// },
				textStyle: {
					color: "#000",
					fontFamily: "Microsoft yahei"
				}
			},
			axisTick: {
				show: !1
			},
			splitArea: {
				show: !1
			},
			splitLine: {
				show: !1
			},
			data: data.caName
		}],
		series: data.data,
		noDataLoadingOption: {
			text: "暂无数据",
			effect: "whirling"
		}
	};
	return option
}

export default {
	getOption1_2, //缺陷-小时数
	getOption1_2_1, //可用率-区域
	getOption1_2_2, //可用率-场站
	getOption1_3_2, //水滴图
	getOption2_3, //雷达图
	getOption3_1, //缺陷-风机
	getOption3_2 //缺陷-光伏
}
