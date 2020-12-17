<template>
	<view class="pre-login">
		<image src="../../static/loading.gif"></image>
	</view>
</template>

<script>
	import {getToken} from "../../util/auth";
	import TOKEN_MESSAGE_CONTANTS from "../../constant/commonConstant";
	import {isNullOrEmpty} from "../../util/stringUtil";

	export default {
		data() {
			return {
				message: ''
			}
		},
		onLoad(){
			this.checkLogin()

		},
		methods:{
			checkLogin(){
				var token = getToken(TOKEN_MESSAGE_CONTANTS.ACCESS_TOKEN_NAME)
				if(!isNullOrEmpty(token)){
					uni.redirectTo({
						url: 'main'
					});
				}else{
					uni.redirectTo({
						url: 'index'
					});
				}
			}
		}
	}
</script>

<style>
	.pre-login{
		width: 100%;
	}
</style>
