import http from '../util/request.js'

export function queryBindMessage(){
	return http.get('/admin/article/pageList')
}