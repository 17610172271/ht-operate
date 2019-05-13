<template>
    <!--管理员账号列表-->
    <div v-loading="loading">
        <div class="p-lg appli-container">
            <sub-header :list="subNavList"></sub-header>
            <div class="page-container">
                <div class="page-toolbar clear m-t-sm">
                    <div class="pull-left toolbar-candle clear">
                        <router-link v-if="getNavList['4080203']" title="添加" :to="{name: 'right_add'}"
                           class="app-add btn bg-blue1 text-white"><i class="fa fa-plus-square"></i>添加
                        </router-link>
                        <!--<a href="javascript:;" title="删除" class="app-add btn bg-red1 text-white"-->
                           <!--@click="delItem(selectedGroup)"><i-->
                            <!--class="fa fa-trash"></i>删除</a>-->
                        <!-- <div class="app-del btn bg-red1 text-white"><i class="fa fa-minus-square"></i>删除</div> -->
                        <div class="app-refresh btn bg-gray1" title="刷新" @click="refresh"><i
                            class="fa fa-refresh"></i></div>
                    </div>
                </div>
                <div class="page-contaoner">
                    <div class="lk-table m-t-sm">
                        <ul class="table-thead clear">
                            <li class="col-xs-24 p-n">序号</li>
                            <li class="col-xs-2 p-n">角色</li>
                            <li class="col-xs-3 p-n">角色描述</li>
                            <li class="col-xs-1 p-n">操作</li>
                        </ul>
                        <ul class="table-tbody clear" v-for="(item, index) in data.items">
                            <li class="col-xs-24 p-n">{{offset + index + 1}}</li>
                            <li class="col-xs-2 p-n over-omit" :title="item.role_name">{{item.role_name}}</li>
                            <li class="col-xs-3 p-n over-omit" :title="item.role_des">{{item.role_des}}</li>
                            <li class="col-xs-1 p-n">
                                <router-link :to="{name: 'right_edit', params: {id: item.role_id}}" v-if="getNavList['4080201']" title="编辑" :class="{'disabled': item.name == '超级管理员'}" class="link" @click.stop>编辑</router-link>
                                <a href="javascript:;" title="删除" v-if="getNavList['4080202']" class="link" @click.stop="delItem(item.role_id)">删除</a>
                                <span v-if="!getNavList['4080201']&&!getNavList['4080202']">---</span>
                            </li>
                        </ul>
                        <ul class="table-tbody clear" v-if="data.items.length===0">
                            <li class="p-n over-omit">暂无更多数据</li>
                        </ul>
                    </div>
                    <div class="footer clear m-t-md">
                        <div class="pull-left news-record text-lg">
                            <span v-show="data.items.length>0">显示{{offset + 1}}到{{offset + data.items.length}}条记录，</span>共<span
                            class="text-blue">{{data.total}}</span>条记录 每页显示
                            <el-select v-model="limit" placeholder="请选择" style="width: 66px;">
                                <el-option
                                    v-for="(item,index) in options"
                                    :key="index"
                                    :label="item"
                                    :value="item">
                                </el-option>
                            </el-select>
                            条记录
                        </div>
                        <div class="pull-right">
                            <el-pagination
                                background
                                v-if="data.items.length>0"
                                layout="prev, pager, next"
                                :current-page.sync="page"
                                :page-count="pages">
                            </el-pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import SubHeader from '../common/subheader'
    import api from '@/api'
    import format from '@/tools/format'
    import validate from '@/tools/validate'
    import { mapGetters } from 'vuex'
    export default {
        //组件
        components: {
            SubHeader,
        },
        data: () => ({
            data: {
                limit: 10,
                page: 1,
                pageSize: 1,
                total: 1,
                items: []
            },
            options: [10, 25, 50],   //条数数目
            limit: 10,
            page: 1,
            loading: false,
            //头部文字
            subNavList: {
                parentNode: {
                    name: '账号管理',
                    router: {
                        name: 'account_list'
                    }
                },
                childNode: {
                    name: '角色设置',
                    desc: '主要用于账号角色的查看及管理',
                    router: {
                        name: 'account_right'
                    }
                }
            },
        }),
        computed: {
            //页数和总条数
            pages () {
                return this.data.pageSize || 1
            },
            offset () {
                return (this.page - 1) * this.limit
            },
            ...mapGetters([
                'getNavList'
            ])
        },
        methods: {
            //列表页获取
            getList () {
                this.loading = true
                this.$http.post(api.system.roleList, {
                    page: this.page,
                    limit: this.limit
                }).then(res => {
                    let that = this
                    setTimeout(function () {
                        that.loading = false
                    }, 500)
                    if (res.data.code === 1) {
                        this.data = res.data.data
                    } else {
                        this.data = {
                            limit: 10,
                            page: 1,
                            pageSize: 1,
                            total: 1,
                            items: []
                        }
                        this.$message({
                            type: 'warning',
                            message: res.data.msg
                        })
                    }
                })
            },
            //删除
            delItem(id) {
                this.$confirm('此操作将删除该角色, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post(api.system.roleDel, {
                        role_id: id
                    }).then(res => {
                        if (res.data.code === 1) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            })
                            this.getList()
                        } else {
                            this.$message({
                                type: 'warning',
                                message: res.data.msg
                            })
                        }
                    })
                }).catch(() => {
                })
            },
            //刷新
            refresh () {
                this.getList()    //列表刷新
            }
        },
        created () {
            this.page = this.$route.query.page ? parseInt(this.$route.query.page) : 1
            this.getList()
        },
        watch: {
            page (val) {
                this.$router.replace({name: 'jurisdiction_group', query: {page: val}})
                this.getList()
            },
            limit (val) {
                this.page = 1
                this.getList()
            }
        }
    }
</script>
<style>

</style>

