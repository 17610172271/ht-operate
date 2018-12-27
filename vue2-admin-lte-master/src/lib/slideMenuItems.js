module.exports = [
    {
        type: 'item',
        isHeader: true,
        name: '',
        root: [1,2,3,4,5,6,7,8]
    },
    {
        type: 'item',
        icon: 'fa fa-home',
        name: '首页',
        router: {
            name: 'home'
        },
        root: [1,2,3,4,5,6,7,8]
    },
    {
        type: 'tree',
        icon: 'fa fa-globe',
        name: '影院地图统计',
        root: [1,2,3,4,5,6,7,8],
        items: [
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '影院地图',
                router: {
                    name: 'map_list'
                },
                root: [1,2,3,4,5,6,7,8]
            }
        ]
    },
    {
        type: 'tree',
        icon: 'fa fa-users',
        name: '代理商管理',
        root: [1,2,3,4,5,6,7,8],
        items: [
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '代理商列表',
                router: {
                    name: 'agent_list'
                },
                root: [1,2,3,4,5,6,7,8]
            },
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '我的代理商',
                router: {
                    name: 'agent_mine'
                },
                root: [1,2,3,4,5,6,7,8]
            },
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '代理商审核',
                router: {
                    name: 'agent_check'
                },
                root: [1,2,3,4,5,6,7,8]
            },
        ]
    },
    {
        type: 'tree',
        icon: 'fa fa-support',
        name: '影院管理',
        root: [1,2,3,4,5,6,7,8],
        items: [
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '影院列表',
                router: {
                    name: 'cinema_list'
                },
                root: [1,2,3,4,5,6,7,8]
            },
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '影院审核',
                router: {
                    name: 'cinema_check'
                },
                root: [1,2,3,4,5,6,7,8]
            }
        ]
    },
    {
        type: 'tree',
        icon: 'fa fa-gg',
        name: '财务管理',
        root: [1,2,3,4,5,6,7,8],
        items: [
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '默认统计',
                router: {
                    name: 'financial_statistics'
                },
                root: [1,2,3,4,5,6,7,8]
            },
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '资金流水',
                router: {
                    name: 'financial_watercourse'
                },
                root: [1,2,3,4,5,6,7,8]
            },
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '用户订单',
                router: {
                    name: 'financial_order'
                },
                root: [1,2,3,4,5,6,7,8]
            },
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '结算管理',
                router: {
                    name: 'financial_clearing'
                },
                root: [1,2,3,4,5,6,7,8]
            },
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '月报表',
                router: {
                    name: 'financial_report'
                },
                root: [1,2,3,4,5,6,7,8]
            },
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '分账设置',
                router: {
                    name: 'financial_routing'
                },
                root: [1,2,3,4,5,6,7,8]
            },
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '收益管理',
                router: {
                    name: 'financial_income'
                },
                root: [1,2,3,4,5,6,7,8]
            }
        ]
    },
    //{
    //    type: 'item',
    //    icon: 'fa fa-ravelry',
    //    name: '区域管理',
    //    router: {
    //        name: 'region_list'
    //    },
    //    root: [1,2,3,4,5,6,7,8]
    //},
    //{
    //    type: 'item',
    //    icon: 'fa fa-hospital-o',
    //    name: '城市管理',
    //    router: {
    //        name: 'city_list'
    //    },
    //    root: [1,2,3,4,5,6,7,8]
    //},
    {
        type: 'tree',
        icon: 'fa fa-bar-chart',
        name: '数据统计',
        root: [1,2,3,4,5,6,7,8],
        items: [
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '代理商统计',
                router: {
                    name: 'statistics_agent'
                },
                root: [1,2,3,4,5,6,7,8]
            },
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '影院统计',
                router: {
                    name: 'statistics_cinema'
                },
                root: [1,2,3,4,5,6,7,8]
            },
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '播放统计',
                router: {
                    name: 'statistics_play'
                },
                root: [1,2,3,4,5,6,7,8]
            },
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '影片统计',
                router: {
                    name: 'statistics_film'
                },
                root: [1,2,3,4,5,6,7,8]
            }
        ]
    },
    {
        type: 'tree',
        icon: 'fa fa-file-text-o',
        name: '日志管理',
        root: [1,2,3,4,5,6,7,8],
        items: [
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '日志列表',
                router: {
                    name: 'log_list'
                },
                root: [1,2,3,4,5,6,7,8]
            }
        ]
    },
    {
        type: 'tree',
        icon: 'fa fa-user-circle-o',
        name: '账号管理',
        root: [1],
        items: [
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '管理账号列表',
                router: {
                    name: 'account_list'
                },
                root: [1]
            }
        ]
    },
    {
        type: 'tree',
        icon: 'fa fa-registered',
        name: '权限管理',
        root: [1],
        items: [
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '规则列表',
                router: {
                    name: 'jurisdiction_list'
                },
                root: [1]
            },
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '用户组管理',
                router: {
                    name: 'account_group'
                },
                root: [1]
            }
        ]
    }
]
