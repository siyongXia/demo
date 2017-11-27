//健康任务
const HealthTaskIndex = r => require.ensure([], () => r(require('page/healthtask/TaskIndex')), 'HealthTaskIndex')
const HealthTaskList = r => require.ensure([], () => r(require('page/healthtask/TaskList')), 'HealthTaskList')
const HealthTaskDetail = r => require.ensure([], () => r(require('page/healthtask/TaskDetail')), 'HealthTaskDetail')
const HealthTaskSetting = r => require.ensure([], () => r(require('page/healthtask/TaskSetting')), 'HealthTaskSetting')
const HealthTaskIllustrate = r => require.ensure([], () => r(require('page/healthtask/taskIllustrate')), 'HealthTaskIllustrate')
const HealthTaskRegular = r => require.ensure([], () => r(require('page/healthtask/TaskRegular')), 'HealthTaskRegular')

export default [
	//健康任务 
    { path: 'health/taskindex.html', component: HealthTaskIndex,meta:{ needLogin:true} },
    { path: 'health/tasklist.html', component: HealthTaskList ,meta:{ needLogin:true}},
    { path: 'health/taskdetail.html', component: HealthTaskDetail ,meta:{ needLogin:true}},
    { path: 'health/tasksetting.html', component: HealthTaskSetting ,meta:{ needLogin:true}},
    { path: 'health/taskIllustrate.html', component: HealthTaskIllustrate},
    { path: 'health/taskregular.html', component: HealthTaskRegular},
]