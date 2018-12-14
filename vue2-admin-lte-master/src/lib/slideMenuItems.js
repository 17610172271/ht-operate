module.exports = [
    {
        type: 'item',
        isHeader: true,
        name: '',
        root: [1,2,3,5,6,7,8]
    },
    {
        type: 'item',
        icon: 'fa fa-home',
        name: '首页',
        router: {
            name: 'home'
        },
        root: [1,2,3,5,6,7,8]
    },
    //{
    //    type: 'item',
    //    icon: 'fa fa-home',
    //    name: '设备分布',
    //    router: {
    //        name: 'map_list'
    //    },
    //    root: [1,2,3,5,6,7,8]
    //},
    {
        type: 'tree',
        icon: 'fa fa-users',
        name: '代理商管理',
        root: [1,2,3,5,6,7,8],
        items: [
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '代理商列表',
                router: {
                    name: 'agent_list'
                },
                root: [1,2,3,5,6,7,8]
            }
        ]
    },
    {
        type: 'tree',
        icon: 'fa fa-support',
        name: '影院管理',
        root: [1,2,3,5,6,7,8],
        items: [
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '影院列表',
                router: {
                    name: 'cinema_list'
                },
                root: [1,2,3,5,6,7,8]
            }
        ]
    },
    {
        type: 'tree',
        icon: 'fa fa-caret-square-o-right text-lg',
        name: '影厅管理',
        root: [1,2,3,5,6,7,8],
        items: [
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '影厅列表',
                router: {
                    name: 'movieHall_list'
                },
                root: [1,2,3,5,6,7,8]
            }
        ]
    },
    {
        type: 'item',
        icon: 'fa fa-circle-o-notch',
        name: 'NAS影片同步',
        router: {
            name: 'sync'
        },
        root: [1,2,3,5,6,7,8]
    },
    //{
    //    type: 'tree',
    //    icon: 'fa fa-podcast',
    //    name: '播放设备管理',
    //    root: [1,2,3,5,6,7,8],
    //    items: [
    //        {
    //            type: 'item',
    //            icon: 'fa fa-circle-o',
    //            name: '播放设备列表',
    //            router: {
    //                name: 'equipment_list'
    //            },
    //            root: [1,2,3,5,6,7,8]
    //        },
    //        {
    //            type: 'item',
    //            icon: 'fa fa-circle-o',
    //            name: '厂商管理',
    //            router: {
    //                name: 'manufacturer_list'
    //            },
    //            root: [1,2,3,5,6,7,8]
    //        },
    //        {
    //            type: 'item',
    //            icon: 'fa fa-circle-o',
    //            name: '型号管理',
    //            router: {
    //                name: 'model_list'
    //            },
    //            root: [1,2,3,5,6,7,8]
    //        }
    //    ]
    //},
    {
        type: 'tree',
        icon: 'fa fa-list-alt',
        name: '订单管理',
        root: [1,2,3,5,6,7,8],
        items: [
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '订单列表',
                router: {
                    name: 'order_list'
                },
                root: [1,2,3,5,6,7,8]
            }
        ]
    },
    {
        type: 'tree',
        icon: 'fa fa-gg',
        name: '财务管理',
        root: [1,2,3,5,6,7,8],
        items: [
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '收入统计',
                router: {
                    name: 'financial_list'
                },
                root: [1,2,3,5,6,7,8]
            }
        ]
    },
    {
        type: 'tree',
        icon: 'fa fa-bar-chart',
        name: '数据统计',
        root: [1,2,3,5,6,7,8],
        items: [
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '订单统计',
                router: {
                    name: 'statistics_order'
                },
                root: [1,2,3,5,6,7,8]
            },
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '会员统计',
                router: {
                    name: 'statistics_vip'
                },
                root: [1,2,3,5,6,7,8]
            },
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '设备统计',
                router: {
                    name: 'statistics_equipment'
                },
                root: [1,2,3,5,6,7,8]
            },
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '影厅统计',
                router: {
                    name: 'statistics_movieHall'
                },
                root: [1,2,3,5,6,7,8]
            }
        ]
    },
    //{
    //    type: 'tree',
    //    icon: 'fa fa-film',
    //    name: '影片库管理',
    //    root: [1,2,3,5,6,7,8],
    //    items: [
    //        {
    //            type: 'item',
    //            icon: 'fa fa-circle-o',
    //            name: '影片库列表',
    //            router: {
    //                name: 'films_list'
    //            },
    //            root: [1,2,3,5,6,7,8]
    //        },
    //    ]
    //},
    //{
    //    type: 'tree',
    //    icon: 'fa fa-gamepad',
    //    name: '控制设备管理',
    //    root: [1,2,3,5,6,7,8],
    //    items: [
    //        {
    //            type: 'item',
    //            icon: 'fa fa-circle-o',
    //            name: '物联网网关管理',
    //            router: {
    //                name: 'control_gateway'
    //            },
    //            root: [1,2,3,5,6,7,8]
    //        },
    //        {
    //            type: 'item',
    //            icon: 'fa fa-circle-o',
    //            name: 'NAS服务器',
    //            router: {
    //                name: 'control_nas'
    //            },
    //            root: [1,2,3,5,6,7,8]
    //        }
    //    ]
    //},
    //{
    //    type: 'tree',
    //    icon: 'fa fa-bell-o',
    //    name: '消息管理',
    //    root: [1,2,3,5,6,7,8],
    //    items: [
    //        {
    //            type: 'item',
    //            icon: 'fa fa-circle-o',
    //            name: '消息列表',
    //            router: {
    //                name: 'news_list'
    //            },
    //            root: [1,2,3,5,6,7,8]
    //        },
    //        //{
    //        //    type: 'item',
    //        //    icon: 'fa fa-circle-o',
    //        //    name: '发布消息',
    //        //    router: {
    //        //        name: 'news_add'
    //        //    },
    //        //    root: [1,2,3,5,6,7,8]
    //        //}
    //    ]
    //},
    {
        type: 'tree',
        icon: 'fa fa-file-text-o',
        name: '日志管理',
        root: [1,2,3,5,6,7,8],
        items: [
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '日志列表',
                router: {
                    name: 'log_list'
                },
                root: [1,2,3,5,6,7,8]
            }
        ]
    },
    {
        type: 'tree',
        icon: 'fa fa-user-circle-o',
        name: '账号管理',
        root: [1,2,3,5,6,7,8],
        items: [
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '个人配置',
                router: {
                    name: 'account_personal'
                },
                root: [1,2,3,5,6,7,8]
            },
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '管理账号列表',
                router: {
                    name: 'account_list'
                },
                root: [1,2,3,5,6,7,8]
            }
        ]
    },
    {
        type: 'tree',
        icon: 'fa fa-registered',
        name: '权限管理',
        root: [1,2,3,5,6,7,8],
        items: [
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '规则列表',
                router: {
                    name: 'jurisdiction_list'
                },
                root: [1,2,3,5,6,7,8]
            },
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '用户组管理',
                router: {
                    name: 'account_group'
                },
                root: [1,2,3,5,6,7,8]
            }
        ]
    },
    {
        type: 'tree',
        icon: 'fa fa-diamond',
        name: '会员管理',
        root: [1,2,3,5,6,7,8],
        items: [
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '会员列表',
                router: {
                    name: 'vip_list'
                },
                root: [1,2,3,5,6,7,8]
            }
        ]
    },
    //{
    //    type: 'tree',
    //    icon: 'fa fa-cubes',
    //    name: 'kdm管理',
    //    root: [1,2,3,5,6,7,8],
    //    items: [
    //        {
    //            type: 'item',
    //            icon: 'fa fa-circle-o',
    //            name: 'kdm列表',
    //            router: {
    //                name: 'kdmnew_list'
    //            },
    //            root: [1,2,3,5,6,7,8]
    //        }
    //    ]
    //},
]
