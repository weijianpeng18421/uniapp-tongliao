<template>
	<view class="cu-modal" :class="modalStatus=='show'?'show':''">
		<view class="cu-dialog">
			<view class="cu-bar modal-title-bg justify-end">
				<view class="content">{{name}}</view>
				<view class="action" @tap="hideModal">
					<text class="cuIcon-close text-red"></text>
				</view>
			</view>
			<!--签名内容-->
			<view class="modal-content-bg padding-xl text-center">
				<view class="title">请在下面输入签名：</view>
				<canvas class="mycanvas" canvas-id="mycanvas" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend"></canvas>
				<view class="cu-bar justify-center">
					<button class="cu-btn modal-btn" @tap="finish">确定</button>
					<button class="cu-btn modal-btn" @tap="clear">清除</button>
				</view>
			</view>
			<!--签名内容结束-->
		</view>
	</view>
</template>

<script>
	export default {
		name: 'signModal',
		props: ['modalName','url'],
		data() {
			return {
				name: '签名',
				modalStatus: null,
				ctx:'',         //绘图图像
				points:[]       ,//路径点集合 
				signUrl:''
			}
		},
		watch:{
			modalName(newValue){
				this.modalStatus = newValue
			}
		},
		created() {
			var _this = this;
			_this.ctx = uni.createCanvasContext("mycanvas",this);   //创建绘图对象
			
			//设置画笔样式
			_this.ctx.lineWidth = 4;
			_this.ctx.lineCap = "round"
			_this.ctx.lineJoin = "round"
		},
		methods:{
			hideModal: function(){
				var _this = this;
				_this.modalStatus=null
				_this.$emit('update:modalName',null)
			},
			showModal: function(){
				var _this = this;
				_this.modalStatus = 'Modal'
			},
			//触摸开始，获取到起点
			touchstart:function(e){
				var _this = this;
				let startX = e.changedTouches[0].x;
				let startY = e.changedTouches[0].y;
				let startPoint = {X:startX,Y:startY};
				
				/* **************************************************
					#由于uni对canvas的实现有所不同，这里需要把起点存起来
				 * **************************************************/
				_this.points.push(startPoint);
				
				//每次触摸开始，开启新的路径
				_this.ctx.beginPath();
			},
			
			//触摸移动，获取到路径点
			touchmove:function(e){
				var _this = this;
				let moveX = e.changedTouches[0].x;
				let moveY = e.changedTouches[0].y;
				let movePoint = {X:moveX,Y:moveY};
				this.points.push(movePoint);       //存点
				let len = _this.points.length;
				if(len>=2){
					this.draw();                   //绘制路径
				}
				
			},
			
			// 触摸结束，将未绘制的点清空防止对后续路径产生干扰
			touchend:function(){   
				var _this = this;            
				_this.points=[];
			},
			
			/* ***********************************************
			#   绘制笔迹
			#	1.为保证笔迹实时显示，必须在移动的同时绘制笔迹
			#	2.为保证笔迹连续，每次从路径集合中区两个点作为起点（moveTo）和终点(lineTo)
			#	3.将上一次的终点作为下一次绘制的起点（即清除第一个点）
			************************************************ */
			draw: function() {
				var _this = this;     
				let point1 = _this.points[0]
				let point2 = _this.points[1]
				_this.points.shift()
				_this.ctx.moveTo(point1.X, point1.Y)
				_this.ctx.lineTo(point2.X, point2.Y)
				_this.ctx.stroke()
				_this.ctx.draw(true)
			},
			
			//清空画布
			clear:function(){
				let that = this;
				uni.getSystemInfo({
					success: function(res) {
						let canvasw = res.windowWidth;
						let canvash = res.windowHeight;
						that.ctx.clearRect(0, 0, canvasw, canvash);
						that.ctx.draw(true);
					},
				})
			},
			
			//完成绘画并保存到本地
			finish:function(){
				var _this = this
				uni.canvasToTempFilePath({
				  canvasId: 'mycanvas',
				  success: function(res) {
					let path = res.tempFilePath;
					_this.signUrl = res.tempFilePath
					uni.saveImageToPhotosAlbum({
						filePath:path,
						success: function(){
							_this.signUrl = path
							_this.$emit('update:url',_this.signUrl)
							_this.hideModal()
							console.log(_this.signUrl)
						}
					})
					
					
				  } 
				})
			}
		}
	}
</script>

<style>
	@import url("../../static/app.css");
	@import url("../../colorui/main.css");
	.mycanvas{
		text-align: center;
		width: 100%;
		background-color: azure;
		margin-top: 10px;
	}
	.cu-btn{
		margin: 0px 10px;
	}
</style>
