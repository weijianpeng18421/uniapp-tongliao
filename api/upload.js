import http from '../util/request.js'

export function upload(url,fileUrl,fileName){
	return http.upload(url, {
	  // #ifdef MP-ALIPAY
	  fileType: 'image/video/audio', // 仅支付宝小程序，且必填。
	  // #endif
	  filePath: fileUrl, // 要上传文件资源的路径。
	  // 注：如果局部custom与全局custom有同名属性，则后面的属性会覆盖前面的属性，相当于Object.assign(全局，局部)
	  custom: {}, // 可以加一些自定义参数，在拦截器等地方使用。比如这里我加了一个auth，可在拦截器里拿到，如果true就传token
	  name: fileName, // 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
	  header: {},  /* 会与全局header合并，如有同名属性，局部覆盖全局 */
	  formData: {}, // HTTP 请求中其他额外的 form data
	  // 返回当前请求的task, options。请勿在此处修改options。非必填
	  getTask: (task, options) => {
	    // task.onProgressUpdate((res) => {
	    //   console.log('上传进度' + res.progress);
	    //   console.log('已经上传的数据长度' + res.totalBytesSent);
	    //   console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
	    //
	    //   // 测试条件，取消上传任务。
	    //   if (res.progress > 50) {
	    //     uploadTask.abort();
	    //   }
	    // });
		  
	  }
	})
}
  