import {login,getSubmitUser} from '../../api/user.js'
import {setByKey} from "../../util/auth";

const user = {
	state: {
		user: '',
		status:'',
		name: '',
		roles: [],
		subuser:{}
	},
	mutations: {
		SET_TOKEN: (state, token) =>{
			state.token = token
		},
		SET_NAME: (state,token) => {
			state.name = name
		},
		SET_SUBUSER: (state,subuser) => {
			state.subuser = subuser
		},
		
	},
	actions: {
		loginByUserName({commit},userInfo){
			const username = userInfo.username.trim()
			return new Promise((resolve,reject)=>{
				login(username,userInfo.password).then(response=>{
					console.log(res)
				}).catch(error=>{
					console.log('error')
				})
			})
		},
		getSubmitUserList({commit},subuser){
			return new Promise((resolve,reject)=>{
				getSubmitUser().then(res=>{
					commit('SET_SUBUSER',res)
					setByKey('submitUser',res)
					resolve(res)
				}).catch(error=>{
					reject(error)
				})
			})
		}
	}
}
export default user