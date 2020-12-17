<template>
	<view class="flex">
		<view class="flex-sub bg-grey padding-sm margin-xs radius">网络请求</view>
		<view class="flex-sub bg-grey padding-sm margin-xs radius">1</view>
	</view>
</template>

<script>
	import { queryBindMessage } from '../../api/bindMessage.js'
	export default {
		name: "network",
		data() {
			return {
				name: '网络请求'
			}
		},
		onLoad() {
			this.initMessage()
			console.log("123")
			
		},
		methods:{
			initMessage(){
				queryBindMessage().then(res => {
					console.log(res)
				})
			}
		}
	}
</script>

<style>
</style>
