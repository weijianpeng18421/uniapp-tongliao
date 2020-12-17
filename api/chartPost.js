import http from '../util/request.js'

//通知公告
export function Issue() {
	return http.get('/md/mobile/firstPage/kpi/Issue')
}

//设备可用率
//通辽级
export function allChart() {
	return http.get('/md/mobile/firstPage/kpi/allChart')
}
//区域级
export function areaChart() {
	return http.get('/md/mobile/firstPage/kpi/areaChart')
}
//场站级
export function stationChart() {
	return http.get('/md/mobile/firstPage/kpi/stationChart')
}
//缺陷信息
export function getFlawData() {
	return http.get('/md/mobile/firstPage/flaw/getFlawData')
}

//技改项目
//项目完成率
export function getMoney() {
	return http.get('/md/mobile/firstPage/project/getMoney')
}
//文档完整率
export function getFileRate() {
	return http.get('/md/mobile/firstPage/project/getFileRate')
}
//延期预警
export function getProjectData(data) {
	return http.get('/md/mobile/firstPage/project/getProjectData',data)
}
//专项整改
//检测权限
export function checkUnit() {
	return http.get('/md/mobile/firstPage/check/checkUnit')
}
//获取专项整改信息
export function getZxIssue(data) {
	return http.post('/md/mobile/firstPage/zx/getZxIssue',data)
}