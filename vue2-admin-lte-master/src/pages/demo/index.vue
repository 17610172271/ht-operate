<template>
    <div class="p-md">
        <tree v-model="nodeVal" :data="ruleList"></tree>
    </div>  
</template>
<script>
    import Tree from '@/components/tree'
    export default {
        data: () => ({
            ruleList: [
                {
                    id: 1,
                    label: '代理商管理',
                    children: [
                        {
                            id: 11,
                            label: '代理商列表',
                            children: [
                                {
                                    id: 111,
                                    label: '查看'
                                },
                                {
                                    id: 112,
                                    label: '编辑'
                                },
                                {
                                    id: 113,
                                    label: '删除'
                                }
                            ]
                        },
                        {
                            id: 12,
                            label: '我的代理商',
                            children: [
                                {
                                    id: 121,
                                    label: '查看'
                                },
                                {
                                    id: 122,
                                    label: '审核'
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 2,
                    label: '影院管理',
                    children: [
                        {
                            id: 21,
                            label: '影院列表',
                            children: [
                                {
                                    id: 211,
                                    label: '查看'
                                },
                                {
                                    id: 212,
                                    label: '编辑'
                                },
                                {
                                    id: 213,
                                    label: '删除'
                                }
                            ]
                        },
                        {
                            id: 22,
                            label: '我的影院',
                            children: [
                                {
                                    id: 221,
                                    label: '查看'
                                },
                                {
                                    id: 222,
                                    label: '审核'
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 3,
                    label: '账号管理',
                    children: [
                        {
                            id: 31,
                            label: '账号列表',
                            children: [
                                {
                                    id: 311,
                                    label: '添加'
                                },
                                {
                                    id: 312,
                                    label: '编辑'
                                },
                                {
                                    id: 313,
                                    label: '禁用'
                                }
                            ]
                        }
                    ]
                }
            ],
            nodeVal: [],
        }),
        components: {
            Tree
        },
        methods: {
            
        },
        created () {
        },
        watch: {
            
        }
    }
</script>
