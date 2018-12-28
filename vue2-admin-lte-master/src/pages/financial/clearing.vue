<template>
    <!--代理商列表-->
    <div v-loading="loading">
        <div class="p-lg appli-container">
            <sub-header :list="subNavList"></sub-header>
            <div class="page-container">
                <div class="page-toolbar clear m-t-sm">
                    <search-ipts :options="searchOptions" @submit="doSearch" v-show="searchShow"></search-ipts>
                    <div class="pull-left toolbar-candle clear">
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
                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('结算编号')!=-1">结算编号</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('结算对象')!=-1">结算对象</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('申请结算月份')!=-1">申请结算月份</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('结算金额')!=-1">结算金额</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('状态')!=-1">状态</li>
                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('申请时间')!=-1">申请时间</li>
                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('银行信息')!=-1">银行信息</li>
                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('结算时间')!=-1">结算时间</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1" style="min-width: 130px;">操作</li>
                        </ul>
                        <ul class="table-tbody clear" v-for="(item, index) in data.items">
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('序号')!=-1" style="max-width: 60px;">{{offset + index + 1}}</li>
                            <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('结算编号')!=-1" :title="item.code">{{item.code}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('结算对象')!=-1" :title="item.name">{{item.name}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('申请结算月份')!=-1" :title="item.region_name">{{item.region_name}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('结算金额')!=-1" :title="item.city_name">{{item.city_name}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('状态')!=-1" :title="item.upper_agent">{{item.upper_agent}}</li>
                            <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('申请时间')!=-1":title="item.cinema_num">{{item.cinema_num}}</li>
                            <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('银行信息')!=-1":title="item.hall_num">{{item.hall_num}}</li>
                            <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('结算时间')!=-1":title="item.device_num">{{item.device_num}}</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1" style="min-width: 130px;">
                                <a href="javascript:;" class="link">结算</a>
                                <router-link :to="{name: 'clearingDetail', params: {id: item.id}}" href="javascript:;" class="link">详情</router-link>
                                <a href="javascript:;" class="link">上传凭证</a>
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
            selectVal: ['序号', '结算编号', '结算对象', '申请结算月份', '结算金额', '状态', '申请时间', '银行信息', '结算时间', '操作'],
            showList: ['序号', '结算编号', '结算对象', '申请结算月份', '结算金额', '状态', '申请时间', '银行信息', '结算时间', '操作'],
            options: [10, 25, 50],   //条数数目
            searchShow: false,   //搜索开关
            limit: 10,
            page: 1,
            subNavList: {
                parentNode: {
                    name: '财务管理',
                    router: {
                        name: 'financial_statistics'
                    }
                },
                childNode: {
                    name: '结算管理',
                    desc: '主要用代理商结算信息的查看及管理',
                    router: {
                        name: 'financial_clearing'
                    }
                }
            },
            //搜索
            searchOptions: [
                {
                    type: 'text',
                    name: '结算编号',
                    value: ''
                },
                {
                    type: 'text',
                    name: '结算对象',
                    value: ''
                },
                {
                    type: 'time',
                    name: '开始时间',
                    value: ''
                },
                {
                    type: 'time',
                    name: '截止时间',
                    value: ''
                },
                {
                    type: 'select',
                    name: '状态',
                    value: '',
                    options: []
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
            }
        },
        methods: {
            //列表页获取
            getList () {
                this.loading = true
                this.$http.post(api.agent.list, {
                    name: this.searchOptions[0].value,
                    pid: this.searchOptions[1].value,
                    start_time: this.searchOptions[2].value,
                    end_time: this.searchOptions[3].value,
                    region_id: this.searchOptions[4].value,
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
                this.$router.replace({name: 'financial_clearing', query: {page: val}})
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
