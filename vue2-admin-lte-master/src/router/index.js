import Vue from 'vue'
import Router from 'vue-router'
// import bus from '../lib/eventBus.js'
Vue.use(Router)
const rs = path => {
    return resolve => require(['@/pages/' + path], resolve)
}
const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: rs('home/index'),
            redirect: {name: 'login'},
            children: [
                {
                    path: '/home',
                    name: 'home',
                    meta: {requreAuth: true},
                    component: rs('home/home')
                },
                {
                    path: '/map',
                    meta: {requreAuth: true},
                    component: rs('map/index'),
                    redirect: '/map/list',
                    children: [
                        {
                            path: 'list',
                            name: 'map_list',
                            component: rs('map/list')
                        },
                        {
                            path: 'detail/:id',
                            name: 'map_detail',
                            component: rs('map/detail')
                        }
                    ]
                },
                {
                    path: '/demo',
                    component: rs('demo/index'),
                    name: 'demo_index',
                },
                {
                    path: '/agent',
                    component: rs('agent/index'),
                    meta: {requreAuth: true},
                    redirect: '/agent/list',
                    children: [
                        {
                            path: 'list',
                            name: 'agent_list',
                            component: rs('agent/list')
                        },
                        {
                            path: 'detail/:id',
                            name: 'agent_detail',
                            component: rs('agent/detail')
                        },
                        {
                            path: 'add',
                            name: 'agent_add',
                            component: rs('agent/add')
                        },
                        {
                            path: 'edit/:id',
                            name: 'agent_edit',
                            component: rs('agent/add')
                        },{
                            path: 'mine',
                            name: 'agent_mine',
                            component: rs('agent/mine')
                        },
                        {
                            path: 'check',
                            name: 'agent_check',
                            component: rs('agent/checkList')
                        },
                        {
                            path: 'check/detail/:id',
                            name: 'agent_check_detail',
                            component: rs('agent/checkDetail')
                        }
                    ]
                },
                {
                    path: '/cinema',
                    component: rs('cinema/index'),
                    meta: {requreAuth: true},
                    redirect: '/cinema/list',
                    children: [
                        {
                            path: 'list',
                            name: 'cinema_list',
                            component: rs('cinema/list')
                        },
                        {
                            path: 'detail/:id',
                            name: 'cinema_detail',
                            component: rs('cinema/detail')
                        },
                        {
                            path: 'edit/:id',
                            name: 'cinema_edit',
                            component: rs('cinema/edit')
                        },
                        {
                            path: 'check',
                            name: 'cinema_check',
                            component: rs('cinema/check')
                        },
                        {
                            path: 'check/detail',
                            name: 'cinema_check_detail',
                            component: rs('cinema/checkDetail')
                        }
                    ]
                },
                {
                    path: '/financial',
                    component: rs('financial/index'),
                    meta: {requreAuth: true},
                    redirect: '/financial/statistics',
                    children: [
                        {
                            path: 'statistics',
                            name: 'financial_statistics',
                            component: rs('financial/statistics')
                        },
                        {
                            path: 'income',
                            name: 'financial_income',
                            component: rs('financial/income')
                        },
                        {
                            path: 'expend',
                            name: 'financial_expend',
                            component: rs('financial/expend')
                        },
                        {
                            path: 'order',
                            name: 'financial_order',
                            component: rs('financial/order')
                        },
                        {
                            path: 'clearing',
                            name: 'financial_clearing',
                            component: rs('financial/clearing')
                        },
                        {
                            path: 'clearingDetail/:id',
                            name: 'clearingDetail',
                            component: rs('financial/clearingDetail')
                        },
                        {
                            path: 'clearingone/:id',
                            name: 'clearingone',
                            component: rs('financial/clearingone')
                        },
                        {
                            path: 'report',
                            name: 'financial_report',
                            component: rs('financial/report')
                        },
                        {
                            path: 'routing',
                            name: 'financial_routing',
                            component: rs('financial/routing')
                        },
                        {
                            path: 'agentRouting',
                            name: 'financial_agentRouting',
                            component: rs('financial/agentRouting')
                        },
                        {
                            path: 'incomes',
                            name: 'financial_incomes',
                            component: rs('financial/incomes')
                        },
                        {
                            path: 'Advertisement',
                            name: 'financial_Advertisement',
                            component: rs('financial/Advertisement')
                        },
                        {
                            path: 'incomesDetail/:id',
                            name: 'financial_incomes_detail',
                            component: rs('financial/incomesDetail')
                        }
                    ]
                },
                {
                    path: '/statistics',
                    component: rs('statistics/index'),
                    meta: {requreAuth: true},
                    redirect: '/statistics/agent',
                    children: [
                        {
                            path: 'agent',
                            name: 'statistics_agent',
                            component: rs('statistics/agent')
                        },
                        {
                            path: 'cinema',
                            name: 'statistics_cinema',
                            component: rs('statistics/cinema')
                        },
                        {
                            path: 'play',
                            name: 'statistics_play',
                            component: rs('statistics/play')
                        },
                        {
                            path: 'film',
                            name: 'statistics_film',
                            component: rs('statistics/film')
                        }
                    ]
                },
                {
                    path: '/log',
                    component: rs('log/index'),
                    meta: {requreAuth: true},
                    redirect: '/log/list',
                    children: [
                        {
                            path: 'list',
                            name: 'log_list',
                            component: rs('log/log')
                        }
                    ]
                },
                {
                    path: '/account',
                    component: rs('account/index'),
                    meta: {requreAuth: true},
                    redirect: '/account/list',
                    children: [
                        {
                            path: 'list',
                            name: 'account_list',
                            component: rs('account/list')
                        },
                        {
                            path: 'right',
                            name: 'account_right',
                            component: rs('account/right')
                        },
                        {
                            path: 'right_add',
                            name: 'right_add',
                            component: rs('account/rightAdd')
                        },
                        {
                            path: 'right_edit/:id',
                            name: 'right_edit',
                            component: rs('account/rightAdd')
                        }
                    ]
                },
                {
                    path: '/advertisement',
                    component: rs('advertisement/index'),
                    meta: {requreAuth: true},
                    redirect: '/advertisement/project',
                    children: [
                        {
                            path: 'project',
                            name: 'advertisement_project',
                            component: rs('advertisement/project')
                        },
                        {
                            path: 'add',
                            name: 'advertisement_project_add',
                            component: rs('advertisement/project_add')
                        },
                        {
                            path: 'edit/:id',
                            name: 'advertisement_project_edit',
                            component: rs('advertisement/project_add')
                        },
                        {
                            path: 'detail/:id',
                            name: 'advertisement_project_detail',
                            component: rs('advertisement/project_detail')
                        },
                        {
                            path: 'list',
                            name: 'advertisement_list',
                            component: rs('advertisement/list')
                        },
                        {
                            path: 'listadd',
                            name: 'advertisement_list_add',
                            component: rs('advertisement/list_add')
                        },
                        {
                            path: 'listedit/:id',
                            name: 'advertisement_list_edit',
                            component: rs('advertisement/project_add')
                        },
                        {
                            path: 'listdetail/:id',
                            name: 'advertisement_list_detail',
                            component: rs('advertisement/list_detail')
                        },
                        {
                            path: 'Statistics',
                            name: 'advertisement_statistics',
                            component: rs('advertisement/Statistics')
                        },
                        {
                            path: 'effect',
                            name: 'advertisement_effect',
                            component: rs('advertisement/effect')
                        },
                        {
                            path: 'effectdetail/:id',
                            name: 'advertisement_effect_detail',
                            component: rs('advertisement/effect_detail')
                        },
                        {
                            path: 'effectdetailone/:id',
                            name: 'advertisement_effect_detailone',
                            component: rs('advertisement/effect_detailone')
                        },
                        {
                            path: 'waiting',
                            name: 'advertisement_waiting',
                            component: rs('advertisement/waiting')
                        },
                    ]
                },
                {
                    path: '/jurisdiction',
                    component: rs('jurisdiction/index'),
                    meta: {requreAuth: true},
                    redirect: '/jurisdiction/list',
                    children: [
                        {
                            path: 'list',
                            name: 'jurisdiction_list',
                            component: rs('jurisdiction/list')
                        },
                        {
                            path: 'group',
                            name: 'account_group',
                            component: rs('jurisdiction/group')
                        }
                    ]
                },
                {
                    path: '/before',
                    component: rs('before/index'),
                    meta: {requreAuth: true},
                    redirect: '/before/list',
                    children: [
                        {
                            path: 'list',
                            name: 'before_list',
                            component: rs('before/list')
                        },
                    ]
                },
                {
                    path: '/contract',
                    component: rs('contract/index'),
                    meta: {requreAuth: true},
                    redirect: '/contract/list',
                    children: [
                        {
                            path: 'list',
                            name: 'contract_list',
                            component: rs('contract/list')
                        },
                        {
                            path: 'type',
                            name: 'contract_type',
                            component: rs('contract/type')
                        }
                    ]
                },
                {
                    path: '/login',
                    name: 'login',
                    component: rs('common/login')
                },
                {
                    path: '/404',
                    name: '404',
                    component: rs('common/404')
                },
                {
                    path: '/500',
                    name: '500',
                    component: rs('common/500')
                }
            ]
        },
        {
            path: '*', component: rs('common/404')
        }
    ],
    linkActiveClass: 'active'
})
//router.beforeEach((to, from, next) => {
//    // 判断去往的页面是否需要登录
//    if (to.matched.some(record => record.meta.requreAuth) && !window.localStorage.getItem('Auth')) {
//        next({
//            path: '/login',
//            query: {from: to.fullPath}
//        })
//    } else {
//        next()
//    }
//})
export default router
