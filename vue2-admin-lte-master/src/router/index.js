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
                    redirect: '/list',
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
                    path: '/account',
                    component: rs('account/index'),
                    meta: {requreAuth: true},
                    redirect: '/account/list',
                    children: [
                        {
                            path: 'personal',
                            name: 'account_personal',
                            component: rs('account/personal')
                        },
                        {
                            path: 'list',
                            name: 'account_list',
                            component: rs('account/list')
                        }
                    ]
                },
                {
                    path: '/vip',
                    component: rs('vip/index'),
                    meta: {requreAuth: true},
                    redirect: '/vip/list',
                    children: [
                        {
                            path: 'list',
                            name: 'vip_list',
                            component: rs('vip/list')
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
                            path: 'sync/:id',
                            name: 'sync_list',
                            component: rs('cinema/sync')
                        }
                    ]
                },
                {
                    path: '/nasSync',
                    component: rs('nasSync/index'),
                    meta: {requreAuth: true},
                    redirect: '/nasSync/list',
                    children: [
                        {
                            path: 'list',
                            name: 'sync',
                            component: rs('nasSync/sync')
                        }
                    ]
                },
                {
                    path: '/movieHall',
                    component: rs('movieHall/index'),
                    meta: {requreAuth: true},
                    redirect: '/movieHall/list',
                    children: [
                        {
                            path: 'list',
                            name: 'movieHall_list',
                            component: rs('movieHall/list')
                        },
                        {
                            path: 'addcinemas',
                            name: 'movieHall_addcinemas',
                            component: rs('movieHall/addcinemas')
                        },
                    ]
                },
                {
                    path: '/equipment',
                    component: rs('equipment/index'),
                    meta: {requreAuth: true},
                    redirect: '/equipment/list',
                    children: [
                        {
                            path: 'list',
                            name: 'equipment_list',
                            component: rs('equipment/list')
                        },
                        {
                            path: 'manufacturer',
                            name: 'manufacturer_list',
                            component: rs('equipment/manufacturer')
                        },
                        {
                            path: 'model',
                            name: 'model_list',
                            component: rs('equipment/model')
                        }
                    ]
                },
                {
                    path: '/order',
                    component: rs('order/index'),
                    meta: {requreAuth: true},
                    redirect: '/order/list',
                    children: [
                        {
                            path: 'list',
                            name: 'order_list',
                            component: rs('order/list')
                        },
                        {
                            path: 'detail/:id',
                            name: 'order_detail',
                            component: rs('order/detail')
                        }
                    ]
                },
                {
                    path: '/financial',
                    component: rs('financial/index'),
                    meta: {requreAuth: true},
                    redirect: '/financial/list',
                    children: [
                        {
                            path: 'list',
                            name: 'financial_list',
                            component: rs('financial/list')
                        },
                        {
                            path: 'detail',
                            name: 'financial_detail',
                            component: rs('financial/detail')
                        },
                    ]
                },
                {
                    path: '/statistics',
                    component: rs('statistics/index'),
                    meta: {requreAuth: true},
                    redirect: '/statistics/order',
                    children: [
                        {
                            path: 'order',
                            name: 'statistics_order',
                            component: rs('statistics/order')
                        },
                        {
                            path: 'vip',
                            name: 'statistics_vip',
                            component: rs('statistics/vip')
                        },
                        {
                            path: 'equipment',
                            name: 'statistics_equipment',
                            component: rs('statistics/equipment')
                        },
                        {
                            path: 'movieHall',
                            name: 'statistics_movieHall',
                            component: rs('statistics/movieHall')
                        }
                    ]
                },
                {
                    path: '/films',
                    component: rs('films/index'),
                    meta: {requreAuth: true},
                    redirect: '/films/list',
                    children: [
                        {
                            path: 'list',
                            name: 'films_list',
                            component: rs('films/list')
                        },
                        {
                            path: 'filmdetails',
                            name: 'films_filmdetails',
                            component: rs('films/filmdetails')
                        },
                    ]
                },
                {
                    path: '/control',
                    component: rs('control/index'),
                    meta: {requreAuth: true},
                    redirect: '/control/gateway',
                    children: [
                        {
                            path: 'gateway',
                            name: 'control_gateway',
                            component: rs('control/gateway')
                        },
                        {
                            path: 'nas',
                            name: 'control_nas',
                            component: rs('control/nas')
                        },
                        {
                            path: 'list',
                            name: 'control_list',
                            component: rs('control/list')
                        }
                    ]
                },
                {
                    path: '/news',
                    component: rs('news/index'),
                    meta: {requreAuth: true},
                    redirect: '/news/list',
                    children: [
                        {
                            path: 'list',
                            name: 'news_list',
                            component: rs('news/news')
                        },
                        {
                            path: 'add',
                            name: 'news_add',
                            component: rs('news/add')
                        }
                    ]
                },
                {
                    path: '/kdmnew',
                    component: rs('kdmnew/index'),
                    meta: {requreAuth: true},
                    redirect: '/kdmnew/list',
                    children: [
                        {
                            path: 'list',
                            name: 'kdmnew_list',
                            component: rs('kdmnew/list')
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
