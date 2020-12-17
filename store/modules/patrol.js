import {getPatrolTemplateType, getPatrolTemplate, getInsidePatrolList} from '../../api/patrol'
import {setByKey} from "../../util/auth";
import TOKEN_MESSAGE_CONTANTS from '../../constant/commonConstant'
const patrol = {
	state: {
		patrolTemplateType: [],
		patrolTemplate: [],
		patrolTemplateDirect: [],
		patrolTemplateDouble: [],
		insidePatrolList: []
	},
	mutations: {
		SET_PATROL_TEMPLATE_TYPE: (state, patrolTemplateType) => {
			state.patrolTemplateType = patrolTemplateType
		},
		SET_PATROL_TEMPLATE: (state, patrolTemplate) => {
			state.patrolTemplate = patrolTemplate
			for(var i =0;i < patrolTemplate.length;i++){
				var item = patrolTemplate[i]
				if("1"==item.templateType){
					state.patrolTemplateDirect.push(item)
				}else if("2"==item.templateType){
					state.patrolTemplateDouble.push(item)
				}
			}
			setByKey('patrolTemplateDirect',state.patrolTemplateDirect)
			setByKey('patrolTemplateDouble',state.patrolTemplateDouble)
		},
		SET_insidePatrolList: (state, insidePatrolList) => {
			state.insidePatrolList = insidePatrolList
		},

	},
	actions: {
		GetPatrolTemplateType({commit},state) {
			return new Promise(((resolve, reject) => {
				getPatrolTemplateType().then(response=>{
					if(response.flag=="true"){
						commit('SET_PATROL_TEMPLATE_TYPE',response.template)
						setByKey(TOKEN_MESSAGE_CONTANTS.PATROL_TEMPLATE_TYPE,response.template)
						// uni.showToast({
						//     title:"3333333333333333333333------"+response.template.length.toString(),
						//     position: 'bottom',
						//     icon: 'none',
						//     duration:3000
						// })
						resolve(response)
					}else{
						reject(response)
						return
					}
				}).catch(error=>{
					reject(error)
				})
			}))
		},
		GetPatrolTemplate({commit},state){
			return new Promise(((resolve, reject) => {
				getPatrolTemplate().then(res=>{
					if(res.flag = true){
						commit('SET_PATROL_TEMPLATE',res.jsonData)
						setByKey(TOKEN_MESSAGE_CONTANTS.PATROL_TEMPLATE,res.jsonData)
						// uni.showToast({
						//     title:"22222222222222222222222------"+res.jsonData.toString(),
						//     position: 'bottom',
						//     icon: 'none',
						//     duration:3000
						// })
						resolve(res)
					}else{
						reject(res)
					}
				}).catch(error=>{
					reject(error)
				})
			}))
		},
		setPatrolTemplateTypeFromCache({commit},patrolTemplateType){
			commit('SET_PATROL_TEMPLATE_TYPE',patrolTemplateType)
		},
		setPatrolTemplateFromCache({commit},patrolTemplate){
			commit('SET_PATROL_TEMPLATE', patrolTemplate)
		},
		GetInsidePatrolList({commit},state){
			return new Promise(((resolve, reject) => {
				getInsidePatrolList().then(res=>{
					if(res.flag = true){
						console.log("请求任务列表成功")
						commit('SET_insidePatrolList',res.jsonData)
						setByKey('insidePatrolList',res.jsonData)
						resolve(res)
					}else{
						reject(res)
					}
				}).catch(error=>{
					reject(error)
				})
			}))
		}
	}
}
export default patrol
