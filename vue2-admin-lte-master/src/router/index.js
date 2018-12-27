import Vue from 'vue'
import Router from 'vue-router'
// import bus from '../lib/eventBus.js'
Vue.use(Router)
const rs = path => {
    return resolve => require(['@/pages/' + path], resolve)
}
const router = new Router({
    // mode: 'history',
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
                            path: 'watercourse',
                            name: 'financial_watercourse',
                            component: rs('financial/watercourse')
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
                            path: 'income',
                            name: 'financial_income',
                            component: rs('financial/income')
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
                        }
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
