import TOKEN_MESSAGE_CONTANTS from '../constant/commonConstant.js'


export function getToken() {
	try {
		const token = uni.getStorageSync(TOKEN_MESSAGE_CONTANTS.ACCESS_TOKEN_NAME)
		if (token == null || token === undefined || token === 'undefined' || token === 'null') {
			return null
		} else {
			return token
		}
	} catch (e) {
		return null
	}
}
export function getByKey(key) {
	try {
		const token = uni.getStorageSync(key)
		if (token == null || token === undefined || token === 'undefined' || token === 'null') {
			return null
		} else {
			return token
		}
	} catch (e) {
		return null
	}
}
export function setByKey(key,data) {
	try{
		uni.setStorageSync(key,data)
	}catch (e) {
		return null
	}
}
export function setToken(data) {
	try{
		uni.setStorageSync(TOKEN_MESSAGE_CONTANTS.ACCESS_TOKEN_NAME,data)
	}catch (e) {
		return null
	}
}
// 保存巡检模版信息
export function setInspectionModal(data) {
	try{
		uni.setStorageSync(TOKEN_MESSAGE_CONTANTS.INSPECTION_MODAL,data)
	}catch (e) {
		return null
	}
}
