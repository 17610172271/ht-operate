<template>
    <div class="bg-white">
        <div class="p-md border-bottom relative">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{name: 'account_right'}">角色设置</el-breadcrumb-item>
                <el-breadcrumb-item>{{$route.params.id ? '编辑角色' : '添加角色'}}</el-breadcrumb-item>
            </el-breadcrumb>
            <a href="javascript:;" class="btn bg-blue1 text-white btn-back" @click="goBack">返回</a>
        </div>
        <div class="p-lg" style="padding-bottom: 50px;">
            <div class="clear m-b-sm flex">
                <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>角色:</div>
                <div class="col-xs-9">
                    <el-input v-model="data.name" placeholder="请输入角色名称" style="max-width: 366px;"></el-input>
                </div>
            </div>
            <div class="clear m-b-sm flex">
                <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>角色描述:</div>
                <div class="col-xs-9">
                    <el-input v-model="data.describe" placeholder="请输入角色描述" style="max-width: 366px;"></el-input>
                </div>
            </div>
            <div class="clear m-b-sm flex">
                <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>角色:</div>
                <div class="col-xs-9">
                    <tree v-model="data.right" :data="ruleList"></tree>
                </div>
            </div>
            <div class="p-v-lg clear">
                <div class="col-xs-3" style="max-width: 200px;"></div>
                <div class="col-xs-9">
                    <el-button type="primary" @click="submit">提交</el-button>
                    <el-button @click="goBack">取 消</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import api from '@/api'
    import validate from '@/tools/validate'
    import Tree from '@/components/tree'
    export default {
        data: () => ({
            data: {
                name: '',
                describe: '',
                right: []
            },
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
            loading: false,
        }),
        components: {
            Tree
        },
        methods: {
            getData () {
                this.loading = true
                this.$http.get(api.agent.detail, {
                    params: {
                        id: this.$route.params.id,
                        type: 1
                    }
                }).then(res => {
                    let that = this
                    setTimeout(function () {
                        that.loading = false
                    }, 500)
                    if (res.data.code === 1) {
                        this.data = res.data.data
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        })
                    }
                })
            },
            submit () {},
            goBack () {
                this.$router.go(-1)
            }
        },
        created () {
            if (this.$route.params.id) this.getData()
        },
        watch: {
        }
    }
</script>
<style scoped>

</style>
