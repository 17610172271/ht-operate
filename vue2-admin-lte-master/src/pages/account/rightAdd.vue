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
                    <el-input v-model="data.role_name" placeholder="请输入角色名称" style="max-width: 366px;"></el-input>
                </div>
            </div>
            <div class="clear m-b-sm flex">
                <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>角色描述:</div>
                <div class="col-xs-9">
                    <el-input v-model="data.role_des" placeholder="请输入角色描述" style="max-width: 366px;"></el-input>
                </div>
            </div>
            <div class="clear m-b-sm flex">
                <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>菜单:</div>
                <div class="col-xs-9">
                    <tree v-model="data.menu_list" :data="ruleList"></tree>
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
                role_name: '',
                role_des: '',
                menu_list: []
            },
            ruleList: [],
            loading: false,
        }),
        components: {
            Tree
        },
        methods: {
            getData () {
                this.loading = true
                this.$http.post(api.system.roleDetail, {
                    role_id: this.$route.params.id
                }).then(res => {
                    let that = this
                    setTimeout(function () {
                        that.loading = false
                    }, 500)
                    if (res.data.code === 1) {
                        this.data = res.data.data
                        this.data.menu_list = this.data.menu_list.split(',')
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        })
                    }
                })
            },
            getMenu () {
                this.$http.post(api.system.menu).then(res => {
                    if (res.data.code === 1) {
                        this.ruleList = res.data.data.items
                    } else {
                        this.ruleList = []
                    }
                })
            },
            submit () {
                if (!this.data.role_name) {
                    this.$message.warning('请输入角色名称')
                    return
                }
                if (!this.data.role_des) {
                    this.$message.warning('请输入角色描述')
                    return
                }
                if (this.data.menu_list.length === 0) {
                    this.$message.warning('请选择角色菜单')
                    return
                }
                if (this.$route.params.id) {
                    this.$http.post(api.system.roleEdit, {
                        role_id: this.$route.params.id,
                        role_name: this.data.role_name,
                        role_des: this.data.role_des,
                        menu_list: this.data.menu_list.join(',')
                    }).then(res => {
                        if (res.data.code === 1) {
                            this.$message({
                                type: 'success',
                                message: '保存成功'
                            })
                            this.goBack()
                        } else {
                            this.$message({
                                type: 'warning',
                                message: res.data.msg
                            })
                        }
                    })
                } else {
                    this.$http.post(api.system.roleAdd, {
                        role_name: this.data.role_name,
                        role_des: this.data.role_des,
                        menu_list: this.data.menu_list.join(',')
                    }).then(res => {
                        if (res.data.code === 1) {
                            this.$message({
                                type: 'success',
                                message: '添加成功'
                            })
                            this.goBack()
                        } else {
                            this.$message({
                                type: 'warning',
                                message: res.data.msg
                            })
                        }
                    })
                }
            },
            goBack () {
                this.$router.go(-1)
            }
        },
        created () {
            if (this.$route.params.id) this.getData()
            this.getMenu()
        },
        watch: {
            'data.menu_list' (val) {
            }
        }
    }
</script>
<style scoped>

</style>
