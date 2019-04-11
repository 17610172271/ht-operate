module.exports = [
    {
        type: 'item',
        isHeader: true,
        name: '',
        isShow: true
    },
    {
        type: 'item',
        icon: 'fa fa-home',
        name: '首页',
        router: {
            name: 'home'
        },
        id: 401,
        isShow: true
    },
    {
        type: 'tree',
        icon: 'fa fa-globe',
        name: '影院地图',
        router: {
            name: 'map_list'
        },
        id: 402,
        isShow: false
    },
    {
        type: 'tree',
        icon: 'fa fa-users',
        name: '代理商管理',
        isShow: false,
        id: 403,
        items: [
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '代理商列表',
                router: {
                    name: 'agent_list'
                },
                id: 40301,
                isShow: false
            },
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '我的代理商',
                router: {
                    name: 'agent_mine'
                },
                id: 40302,
                isShow: false
            },
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '代理商审核',
                router: {
                    name: 'agent_check'
                },
                id: 40303,
                isShow: false
            },
        ]
    },
    {
        type: 'tree',
        icon: 'fa fa-support',
        name: '影院管理',
        isShow: false,
        id: 404,
        items: [
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '影院列表',
                router: {
                    name: 'cinema_list'
                },
                id: 40401,
                isShow: false
            },
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '影院审核',
                router: {
                    name: 'cinema_check'
                },
                id: 40402,
                isShow: false
            }
        ]
    },
    {
        type: 'tree',
        icon: 'fa fa-gg',
        name: '财务管理',
        isShow: false,
        id: 405,
        items: [
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '财务统计',
                router: {
                    name: 'financial_statistics'
                },
                id: 40501,
                isShow: false
            },
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '收入明细',
                router: {
                    name: 'financial_income'
                },
                id: 40502,
                isShow: false
            },
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '支出明细',
                router: {
                    name: 'financial_expend'
                },
                id: 40503,
                isShow: false
            },
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '用户订单',
                router: {
                    name: 'financial_order'
                },
                id: 40504,
                isShow: false
            },
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '结算管理',
                router: {
                    name: 'financial_clearing'
                },
                id: 40505,
                isShow: false
            },
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '月报表',
                router: {
                    name: 'financial_report'
                },
                id: 40506,
                isShow: false
            },
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '分账设置',
                router: {
                    name: 'financial_routing'
                },
                id: 40507,
                isShow: false
            },
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '代理商分账管理',
                router: {
                    name: 'financial_agentRouting'
                },
                id: 40508,
                isShow: false
            },
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '收益管理',
                router: {
                    name: 'financial_incomes'
                },
                id: 40509,
                isShow: false
            }
        ]
    },
    {
        type: 'tree',
        icon: 'fa fa-bar-chart',
        name: '数据统计',
        isShow: false,
        id: 406,
        items: [
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '代理商统计',
                router: {
                    name: 'statistics_agent'
                },
                id: 40601,
                isShow: false
            },
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '影院统计',
                router: {
                    name: 'statistics_cinema'
                },
                id: 40602,
                isShow: false
            },
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '播放统计',
                router: {
                    name: 'statistics_play'
                },
                id: 40603,
                isShow: false
            },
        ]
    },
    {
        type: 'tree',
        icon: 'fa fa-file-text-o',
        name: '操作日志',
        isShow: false,
        root: [1,2,3,4,5,6,7,8],
        id: 407,
        items: [
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '日志列表',
                router: {
                    name: 'log_list'
                },
                id: 40701,
                isShow: false
            }
        ]
    },
    {
        type: 'tree',
        icon: 'fa fa-user-circle-o',
        name: '系统设置',
        isShow: false,
        id: 408,
        items: [
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '账号列表',
                router: {
                    name: 'account_list'
                },
                id: 40801,
                isShow: false,
            },
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '角色设置',
                router: {
                    name: 'account_right'
                },
                id: 40802,
                isShow: false,
            }
        ]
    },
    {
        type: 'tree',
        icon: 'fa fa-registered',
        name: '合同管理',
        isShow: false,
        id: 409,
        items: [
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '合同列表',
                router: {
                    name: 'contract_list'
                },
                id: 40901,
                isShow: false
            },
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '合同类型',
                router: {
                    name: 'contract_type'
                },
                id: 40902,
                isShow: false
            }
        ]
    },
    //{
    //    type: 'tree',
    //    icon: 'fa fa-registered',
    //    name: '权限管理',
    //    root: [1],
    //    items: [
    //        //{
    //        //    type: 'item',
    //        //    icon: 'fa fa-circle-o',
    //        //    name: '规则列表',
    //        //    router: {
    //        //        name: 'jurisdiction_list'
    //        //    },
    //        //    root: [1]
    //        //},
    //        {
    //            type: 'item',
    //            icon: 'fa fa-circle-o',
    //            name: '用户组管理',
    //            router: {
    //                name: 'account_group'
    //            },
    //            root: [1]
    //        }
    //    ]
    //}
]
