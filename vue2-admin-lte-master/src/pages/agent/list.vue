<template>
    <!--代理商列表-->
    <div v-loading="loading">
        <div class="p-lg appli-container">
            <sub-header :list="subNavList"></sub-header>
            <div class="page-container">
                <div class="page-toolbar clear m-t-sm">
                    <search-ipts :options="searchOptions" @submit="doSearch" v-show="searchShow"></search-ipts>
                    <div class="pull-left toolbar-candle clear">
                        <router-link :to="{name: 'agent_add'}" href="javascript:;" title="添加" class="app-add btn bg-blue1 text-white"><i class="fa fa-plus-square"></i>添加</router-link>
                        <div class="app-refresh btn bg-gray1" title="刷新" @click="refresh"><i
                            class="fa fa-refresh"></i></div>
                    </div>
                    <div class="pull-right clear">
                        <div class="pull-left m-r-sm opacity-8" title="列">
                            <select-checkbox :list="showList" v-model="selectVal" style="width: 60px;"></select-checkbox>
                        </div>
                        <div class="pull-left btn opacity-8 search-btn" @click="searchShow = !searchShow"><i
                            class="fa fa-search" title="搜索"></i></div>
                    </div>
                </div>
                <div class="page-contaoner">
                    <div class="lk-table m-t-sm">
                        <ul class="table-thead clear">
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('序号')!=-1" style="max-width: 60px;">序号</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('代理商编号')!=-1">代理商编号</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('代理商名称')!=-1">代理商名称</li>
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('所属区域')!=-1">所属区域</li>
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('城市')!=-1">城市</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('上级代理')!=-1">上级代理</li>
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('影院数量')!=-1">影院数量</li>
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('影厅数量')!=-1">影厅数量</li>
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('影院设备')!=-1">影院设备</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('创建时间')!=-1">创建时间</li>
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('状态')!=-1">状态</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1" style="min-width: 120px;">操作</li>
                        </ul>
                        <ul class="table-tbody clear" v-for="(item, index) in data.items">
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('序号')!=-1" style="max-width: 60px;">{{offset + index + 1}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('代理商编号')!=-1" :title="item.code">{{item.code}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('代理商名称')!=-1" :title="item.name">{{item.name}}</li>
                            <li class="col-xs-24 p-n over-omit" v-show="selectVal.indexOf('所属区域')!=-1" :title="item.region_name">{{item.region_name}}</li>
                            <li class="col-xs-24 p-n over-omit" v-show="selectVal.indexOf('城市')!=-1" :title="item.city_name">{{item.city_name}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('上级代理')!=-1" :title="item.upper_agent">{{item.upper_agent}}</li>
                            <li class="col-xs-24 p-n over-omit" v-show="selectVal.indexOf('影院数量')!=-1":title="item.cinema_num">{{item.cinema_num}}</li>
                            <li class="col-xs-24 p-n over-omit" v-show="selectVal.indexOf('影厅数量')!=-1":title="item.hall_num">{{item.hall_num}}</li>
                            <li class="col-xs-24 p-n over-omit" v-show="selectVal.indexOf('影院设备')!=-1":title="item.device_num">{{item.device_num}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('创建时间')!=-1":title="item.create_time">{{item.create_time}}</li>
                            <li class="col-xs-24 p-n over-omit" v-show="selectVal.indexOf('状态')!=-1" :title="item.status_name" :class="item.status==1?'text-green':'text-red'">{{item.status_name}}</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1" style="min-width: 120px;">
                                <router-link :to="{name: 'agent_detail', params: {id: item.id}}" href="javascript:;" class="link" @click.stop>查看</router-link>
                                <router-link :to="{name: 'agent_edit',params: {id: item.id}}" href="javascript:;" class="link" @click.stop>编辑</router-link>
                                <a href="javascript:;" class="link" @click.stop="statusChange(item)">{{item.status==2 ? '启用' : '禁用'}}</a>
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
    import SelectCheckbox from '@/components/SelectCheckbox'
    import SearchIpts from '../common/searchIpts'
    export default {
        //组件
        components: {
            SelectCheckbox,
            SearchIpts,
            SubHeader
        },
        data: () => ({
            data: {
                limit: 10,
                page: 1,
                pageSize: 1,
                total: 1,
                items: []
            },
            loading: false,
            selectVal: ['序号', '代理商编号', '代理商名称', '所属区域', '城市', '上级代理', '影院数量', '影厅数量', '影院设备', '创建时间', '状态', '操作'],
            showList: ['序号', '代理商编号', '代理商名称', '所属区域', '城市', '上级代理', '影院数量', '影厅数量', '影院设备', '创建时间', '状态', '操作'],
            options: [10, 25, 50],   //条数数目
            searchShow: false,   //搜索开关
            limit: 10,
            page: 1,
            subNavList: {
                parentNode: {
                    name: '代理商管理',
                    router: {
                        name: 'agent_list'
                    }
                },
                childNode: {
                    name: '代理商列表',
                    desc: '主要用代理商的查看及管理',
                    router: {
                        name: 'agent_list'
                    }
                }
            },
            //搜索
            searchOptions: [
                {
                    type: 'text',
                    name: '代理商名称',
                    value: ''
                },
                {
                    type: 'select',
                    name: '状态',
                    value: '',
                    options: [
                        {
                            value: 1,
                            label: '正常'
                        },
                        {
                            value: 2,
                            label: '失效'
                        }
                    ]
                }
            ],
        }),
        computed: {
            //页数和总条数
            pages () {
                return this.data.pageSize || 1
            },
            offset () {
                return (this.page - 1) * this.limit
            }
        },
        methods: {
            //列表页获取
            getList () {
                this.loading = true
                this.$http.post(api.agent.list, {
                    name: this.searchOptions[0].value,
                    status: this.searchOptions[1].value,
                    type: 1,
                    page: this.page,
                    limit: this.limit
                }).then(res => {
                    this.selectedGroup = []
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
            statusChange (item) {
                this.$confirm(item.status === 2 ? '此操作将启用该代理商, 是否继续?' : '此操作将禁用该代理商, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.get(api.agent.disable, {
                        params: {
                            id: item.id,
                            status: item.status === 2 ? 1 : 2
                        }
                    }).then(res => {
                        if(res.data.code === 1) {
                            this.$message({
                                type: 'success',
                                message: '操作成功'
                            })
                            if (item.status === 2) {
                                item.status = 1
                                item.status_name = '正常'
                            } else {
                                item.status = 2
                                item.status_name = '失效'
                            }
                        } else {
                            this.$message({
                                type: 'error',
                                message: res.data.msg
                            })
                        }
                    })
                })
            },
            //刷新
            refresh () {
                this.getList()    //列表刷新
            },
            // 搜索
            doSearch (data) {
                this.page = 1
                this.searchOptions = data
                this.getList()
            },
            // 下一页
            addPage () {
                if (this.page < this.pages) this.page += 1
            },
            // 上一页
            delPage () {
                if (this.page > 1) this.page -= 1
            }
        },
        created () {
            this.page = this.$route.query.page ? parseInt(this.$route.query.page) : 1
            this.getList()
        },
        watch: {
            page (val) {
                this.$router.replace({name: 'agent_list', query: {page: val}})
                this.getList()
            },
            limit (val) {
                this.getList()
            }
        }
    }
</script>
<style scoped>
</style>
