import http from '../util/request.js'

export function login(username, password) {
	return http.get('/md/login?username=' + username + '&password=' + password)
}
export function getPatrolTemplateType() {
	return http.get('/md/mobile/patrol/getPatrolTemplateType')
}
export function getPatrolTemplate() {
	return http.get('/md/mobile/patrol/getPatrolTemplate')
}
export function savePatrolWorkText(data) { //风机文本上传
	return http.post('/md/mobile/patrol/savePatrolWorkText', data)
}
export function saveInsidePatroText(data) { //场内文本上传
	return http.post('/md/mobile/patrol/saveInsidePatrolText', data)
}
export function getDictData() {
	return http.post('/md/mobile/patrol/getDictData')
}
export function getSubmitUser() {
	return http.post('/md/mobile/patrol/getSubmitUser')
}

//----------申请审批
export function applyList() {
	return http.post('/md/mobile/purchase/apply/listApprove')
}
//详细查询
export function applyDes(uid) {
	return http.post('/md/mobile/purchase/apply/toApplyApprove'+ '?purchase_uuid='+ uid)
}
//审批检测
export function applyCheck(data) {
	return http.post('/md/mobile/purchase/apply/applyApproveCheck', data)
}
//审批保存
export function applySave(data) {
	return http.post('/md/mobile/purchase/apply/applyApprove', data)
}
//审批进度
export function applyLook(uid) {
	return http.post('/md/mobile/purchase/apply/toLookApprove' + '?purchase_uuid='+ uid)
}

//----------询价审批
export function orderList() {
	return http.post('/md/mobile/purchase/order/listApprove')
}
//详细查询
export function orderDes(uid) {
	return http.post('/md/mobile/purchase/order/toOrderApprove'+ '?purchase_order_uuid='+ uid)
}
//审批保存
export function orderSave(data) {
	return http.post('/md/mobile/purchase/order/orderApprove', data)
}
//审批进度
export function orderLook(uid) {
	return http.post('/md/mobile/purchase/order/toLookApprove' + '?purchase_order_uuid='+ uid)
}

//----------出库审批
//获取菜单接口
export function stockCheckMenu(){
	return http.post('/md/stock/outStockApply/checkMenu')
}
//获取列表
export function stockList(data){
	return http.post('/md/stock/outStockApply/list',data)
}
//获取详情
export function stockDes(data){
	return http.post('/md/stock/outStockApply/getDataById',data)
}
//审批保存
export function stockSave(data){
	return http.post('/md/stock/outStockApply/apply',data)
}

//----------基建审批
//获取菜单接口
export function constructionMenu(){
	return http.post('/md/construction/outStockApply/checkMenu')
}
//获取列表
export function constructionList(data){
	return http.post('/md/construction/outStockApply/list',data)
}
//获取详情
export function constructionDes(data){
	return http.post('/md/construction/outStockApply/getDataById',data)
}
//审批保存
export function constructionSave(data){
	return http.post('/md/construction/outStockApply/apply',data)
}

//测试方法
// export function login(param){
// 	return http.get('/wxLogin/login',param)
// }
export function queryAll(param) {
	return http.post('/wxLogin/getUserMessage', param)
}
