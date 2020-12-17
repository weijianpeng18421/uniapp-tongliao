<template>
    <view class="main">
        <cu-custom class="head" :isBack="true">
            <block slot="content">错误</block>
        </cu-custom>
        <view class="error">
            <text class="lg error-icon cuIcon-warnfill"></text>
            <view class="error-msg">{{errMsg}}</view>
        </view>
    </view>
</template>
<script>
    export default {
        data(){
            return {
                errMsg: '这是错误信息'
            }
        },
        onLoad(option){
            const _this = this;
            _this.errMsg = option.errMsg
        }
    }
</script>
<style>
    @import url("../../static/app.css");
    @import url("../../colorui/main.css");
    body{
        height: 100%;
        background-color: #333333;
    }
    uni-page-body{
        height: 100%;
        background-color: #333333;
    }

</style>
