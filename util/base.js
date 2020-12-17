import {
	savePatrolWorkText,saveInsidePatroText
} from '../api/user.js'
import {
	upload
} from '../api/upload.js'
import {
	isNullOrEmpty,
	objIsNullOrEmpty,
	getUUID
} from '../util/stringUtil.js'

//判断是否有网
// isNetwork.then(res=>{
// }).catch(error=>{	
//})
// export function isNetwork() {
// 	return new Promise(((resolve,reject) => {
// 		uni.getNetworkType({
// 			success: function(res) {
// 				if (res.networkType !== 'none') {
// 					resolve(true)
// 				} else {
// 					reject(false)
// 				}
// 			},
// 			fail: function(res) {
// 				reject(false)
// 			},
// 		});
// 	})	
// }

//isNetWork(function(){
// },function(){
// })
//判断网络状态
export function isNetwork(success,fail) {
	return new Promise(((resolve,reject) => {
		uni.getNetworkType({
			success: function(res) {
				if (res.networkType !== 'none') {
					resolve(true)
					success()
				} else {
					reject(false)
					fail()
				}
			},
			fail: function(res) {
				reject(false)
				fail()
			},
		});
	}))
	
}
//上传风机文本信息
export function upLoadText(jsonData) {
	return new Promise(((resolve,reject) => {
		if(isNullOrEmpty(jsonData.windSpeed)){//判断文本中是否有温度，来区分风机巡检文本和场内巡检文本
			console.log(jsonData)
			saveInsidePatroText({
				"jsonData": jsonData
			}).then(res => {
				console.log(JSON.stringify(res))
					if(res.flag=='true'){
						console.log('上传场内巡检文本成功')
						resolve('true')
					}else{
						console.log('上传场内巡检文本失败')
						reject('false')
					}
			}).catch(err => {
					console.log('上传场内巡检文本失败')
					console.log(JSON.stringify(err))
					reject('false')
			});
		}else{
			console.log(jsonData)
			savePatrolWorkText({
				"jsonData": jsonData
			}).then(res => {
				console.log(JSON.stringify(res))
				if(res.flag=='true'){
					console.log('上传风机巡检文本成功')
					resolve('true')
				}else{
					console.log('上传风机巡检文本失败')
					reject('false')
				}
			}).catch(err => {
				console.log('上传风机巡检文本失败')
				console.log(JSON.stringify(err))
				reject('false')
			});
		}
	}))	
}
//上传照片信息
export function upLoadPic(checkDetail) {
	for (var j in checkDetail) {
		if (!isNullOrEmpty(checkDetail[j].curUrl)) {
			upload(
				'/md/mobile/patrol/savePatrolWorkPhoto',
				checkDetail[j].curUrl,
				checkDetail[j].name
			).then(res => {
				console.log('上传照片成功')
				console.log(checkDetail[j].curUrl)
				console.log(checkDetail[j].name)
				console.log(JSON.stringify(res))
			}).catch(err => {
				console.log('上传照片失败')
				console.log(JSON.stringify(err))
			})
		}
	}
}
