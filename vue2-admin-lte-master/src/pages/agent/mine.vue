<template>
    <!--代理商列表-->
    <div v-loading="loading">
        <div class="p-lg appli-container mine-agent">
            <sub-header :list="subNavList"></sub-header>
            <div class="page-container">
                <div class="page-toolbar clear m-t-sm">
                    <search-ipts :options="searchOptions" @submit="doSearch" v-show="searchShow"></search-ipts>
                    <div class="pull-left toolbar-candle clear">
                        <router-link :to="{name: 'agent_add'}" v-if="getNavList['4030202']" href="javascript:;" title="添加" class="app-add btn bg-blue1 text-white"><i class="fa fa-plus-square"></i>添加</router-link>
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
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('影院数量')!=-1">影院数量</li>
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('影厅数量')!=-1">影厅数量</li>
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('影院设备')!=-1">影院设备</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('创建时间')!=-1">创建时间</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('合同截止日期')!=-1">合同截止日期</li>
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('状态')!=-1">状态</li>
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('分账百分比')!=-1">分账百分比</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1" style="min-width: 130px;">操作</li>
                        </ul>
                        <ul class="table-tbody clear" v-for="(item, index) in data.items">
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('序号')!=-1" style="max-width: 60px;">{{offset + index + 1}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('代理商编号')!=-1" :title="item.name">{{item.code}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('代理商名称')!=-1" :title="item.name">{{item.name}}</li>
                            <li class="col-xs-24 p-n over-omit" v-show="selectVal.indexOf('所属区域')!=-1" :title="item.region_name">{{item.region_name}}</li>
                            <li class="col-xs-24 p-n over-omit" v-show="selectVal.indexOf('影院数量')!=-1":title="item.cinema_num">{{item.cinema_num}}</li>
                            <li class="col-xs-24 p-n over-omit" v-show="selectVal.indexOf('影厅数量')!=-1":title="item.hall_num">{{item.hall_num}}</li>
                            <li class="col-xs-24 p-n over-omit" v-show="selectVal.indexOf('影院设备')!=-1":title="item.device_num">{{item.device_num}}  套</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('创建时间')!=-1":title="item.create_time">{{item.create_time}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('合同截止日期')!=-1":title="item.contract_after_time">{{item.contract_after_time}}</li>
                            <li class="col-xs-24 p-n over-omit" v-show="selectVal.indexOf('状态')!=-1" :title="item.status_name" :class="{'text-green':item.status==1, 'text-red':item.status==3 || item.is_draft==1 ||item.status==4, 'text-orange': item.status==2}">{{item.status_name}}</li>
                            <li class="col-xs-24 p-n over-omit" v-show="selectVal.indexOf('分账百分比')!=-1" :title="item.proportion">{{item.proportion}} %</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1" style="min-width: 130px;">
                                <router-link :to="{name: 'agent_detail', params: {id: item.id}}" v-if="getNavList['4030201']&&item.is_draft!==1" href="javascript:;" class="link" @click.stop>查看</router-link>
                                <router-link :to="{name: 'agent_edit', params: {id: item.id, isDraft: 1}, query: {isDraft: 1}}" v-if="getNavList['4030201']&&item.is_draft===1" href="javascript:;" class="link" @click.stop>查看</router-link>
                                <router-link :to="{name: 'agent_edit',params: {id: item.id}}" href="javascript:;" v-if="item.status==3&&getNavList['4030203']" class="link" @click.stop>再次申请</router-link>
                                <a href="javascript:;" :class="{'disabled': item.status!=1}" class="link" v-else-if="getNavList['4030204']" @click.stop="openAccount(item)">分账设置</a>
                                <a href="javascript:;" title="删除" class="link" v-show="item.is_draft==1" @click.stop="delItem(item.id)">删除</a>
                                <span v-if="!getNavList['4030201']&&!(item.status==3&&getNavList['4030203'])&&!getNavList['4030204']">---</span>
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
                                v-if="data.items.length>0"
                                background
                                layout="prev, pager, next"
                                :current-page.sync="page"
                                :page-count="pages">
                            </el-pagination>
                        </div>
                    </div>
                    <el-dialog
                        title="代理商分账比例设置"
                        :visible.sync="accountModal"
                        custom-class="dialog-modal2"
                        :close-on-click-modal="false">
                        <div class="text-center m-t-lg clear">
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 p-v-sm p-r-n text-right min-width-105">分账比例:</div>
                                <div class="col-xs-11 col-md-6">
                                    <el-input placeholder="请输入分账比例" v-model="accountNum"></el-input>
                                </div>
                                <div class="col-xs-1 col-md-1 p-n text-left line-height-40">
                                    %
                                </div>
                            </div>
                            <div class="m-t-lg text-center">
                                <el-button type="primary" @click="setAccount">确 定</el-button>
                                <el-button @click="accountModal = false">取 消</el-button>
                            </div>
                        </div>
                    </el-dialog>
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
    import { mapGetters } from 'vuex'
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
            accountModal: false,
            accountNum: '',
            accountItem: {},
            loading: false,
            selectVal: ['序号', '代理商编号', '代理商名称', '所属区域', '影院数量', '影厅数量', '影院设备', '创建时间', '合同截止日期', '状态','分账百分比', '操作'],
            showList: ['序号', '代理商编号', '代理商名称', '所属区域', '影院数量', '影厅数量', '影院设备', '创建时间', '合同截止日期', '状态','分账百分比', '操作'],
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
                    name: '我的代理商',
                    desc: '主要用于我的代理商的查看及管理',
                    router: {
                        name: 'agent_mine'
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
                    type: 'time',
                    name: '创建起始时间',
                    value: ''
                },
                {
                    type: 'time',
                    name: '截止时间',
                    value: ''
                },
                {
                    type: 'searchSelect',
                    name: '所属区域',
                    value: '',
                    options:[]
                },
                {
                    type: 'select',
                    name: '状态',
                    value: '',
                    options: [
                        {
                            value:'1',
                            label:'正常'
                        },
                        {
                            value:'2',
                            label:'待审核'
                        },
                        {
                            value:'4',
                            label:'已禁用'
                        },

                    ]
                },
            ],
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
                this.$http.post(api.agent.list, {
                    name: this.searchOptions[0].value,
                    start_time: this.searchOptions[1].value,
                    end_time: this.searchOptions[2].value,
                    region_id: this.searchOptions[3].value,
                    status: this.searchOptions[4].value,
                    type: 2,
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
            openAccount (item) {
                this.accountNum = item.proportion || 0
                this.accountItem = item
                this.accountModal = true
            },
            setAccount () {
                if (this.accountNum) {
                    if (!/^100$|^(\d|[1-9]\d)(\.\d{1,2})*$/.test(this.accountNum)) {
                        this.$message({
                            type: 'warning',
                            message: '分账比例为100以内正数,且最多保留两位小数'
                        })
                        return
                    }
                    this.$http.post(api.agent.setAccount, {
                        proportion: this.accountNum,
                        agent_id: this.accountItem.id
                    }).then(res => {
                        if (res.data.code === 1) {
                            this.$message({
                                type: 'success',
                                message: '代理商分账设置成功'
                            })
                            this.getList()
                            this.accountModal = false
                        } else {
                            this.$message({
                                type: 'error',
                                message: res.data.msg
                            })
                        }
                    })
                }  else {
                    this.$message({
                        type: 'warning',
                        message: '请输入分账比例'
                    })
                }
            },
            delItem(id) {
                this.$confirm('此操作将删除该代理商草稿, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.get(api.agent.delDraft, {
                        params:{
                            id: id
                        }
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
                this.$router.replace({name: 'agent_mine', query: {page: val}})
                this.getList()
            },
            limit (val) {
                this.page = 1
                this.getList()
            },
            searchShow (searchShow){
                this.$http.post(api.common.getCity, {
                    status: 1
                }).then(res => {
                    if (res.data.code === 1) {
                        this.searchOptions[3].options = res.data.data.map(val => {
                            return {
                                label: val.name,
                                value: val.id
                            }
                        })
                        //                        this.region_id = this.regionList[0].value
                    }
                    //                    else {
                    //                        this.regionList = []
                    //                    }
                })
            },
        }
    }
</script>
<style scoped>
</style>
