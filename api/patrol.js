import http from '../util/request.js'

export function getPatrolTemplateType(param){
	return http.post('/md/mobile/patrol/getPatrolTemplateType',param)
}
export function getPatrolTemplate(param){
	return http.post('md/mobile/patrol/getPatrolTemplate',param)
}
export function getInsidePatrolList(param){
	return http.post('md/mobile/patrol/getInsidePatrolList',param)
}

