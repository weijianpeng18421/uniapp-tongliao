import http from '../util/request.js'

export function getRefreshToken(token) {
	return http.get('/main/tokenManager/refreshToken?code=' + token)
}
export function refresh2accessToken(param){
	return http.post('/refreshManager/accessToken',param)
}