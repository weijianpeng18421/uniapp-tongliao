const getters = {
	token: state => state.user.token,
	name: state => state.user.name,
	roles: state => state.user.roles,
	patrolTemplateType: state => state.patrol.patrolTemplateType,
	patrolTemplate: state => state.patrol.patrolTemplate,
	patrolTemplateDirect: state => state.patrol.patrolTemplateDirect,
	patrolTemplateDouble: state => state.patrol.patrolTemplateDouble,
	subuser: state => state.user.subuser,
	insidePatrolList: state => state.patrol.insidePatrolList
}
export default getters
