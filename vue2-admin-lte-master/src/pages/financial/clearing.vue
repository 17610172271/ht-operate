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
                            <li class="col-xs-4 p-n" v-show="selectVal.indexOf('银行信息')!=-1">银行信息</li>
                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('结算时间')!=-1">结算时间</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1" style="min-width: 130px;">操作</li>
                        </ul>
                        <ul class="table-tbody clear" v-for="(item, index) in data.items">
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('序号')!=-1" style="max-width: 60px;">{{offset + index + 1}}</li>
                            <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('结算编号')!=-1" :title="item.settlement_code">{{item.settlement_code}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('结算对象')!=-1" :title="item.agent_name">{{item.agent_name}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('申请结算月份')!=-1" :title="item.apply_month">{{item.apply_month}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('结算金额')!=-1" :title="item.settlement_money">{{item.settlement_money}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('状态')!=-1" :title="item.status_name"
                                :class="{'text-999': item.status_name=='已结算'}">{{item.status_name}}</li>
                            <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('申请时间')!=-1":title="item.apply_time">{{item.apply_time}}</li>
                            <li class="col-xs-4 p-n over-omit text-left" v-show="selectVal.indexOf('银行信息')!=-1" style="padding:2px 5px;"
                                :title="item.account_name + ',' + item.bank_name + ',' + item.bank_account + ',' + item.open_bank">
                                <div class="over-omit" style="line-height: 18px;font-size: 12px;">{{item.account_name}}, {{item.bank_name}}</div>
                                <div class="over-omit" style="line-height: 18px;font-size: 12px;">{{item.bank_account}}, {{item.open_bank}}</div>
                            </li>
                            <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('结算时间')!=-1":title="item.settlement_time">{{item.settlement_time}}</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1" style="min-width: 130px;">
                                <a href="javascript:;" class="link" :class="{'disabled': !(item.status_name=='未结算'&&item.certificate)}" @click.stop="doClearing(item)" v-if="getNavList['4050501']">结算</a>
                                <router-link :to="{name: 'clearingDetail', params: {id: item.id}, query: {apply_month: item.apply_month}}" href="javascript:;" class="link" v-if="getNavList['4050502']">详情</router-link>
                                <a :href="item.certificate" class="link" @click.stop target="_blank" v-if="getNavList['4050504']&&item.certificate">查看凭证</a>
                                <el-upload
                                    v-else-if="getNavList['4050503']"
                                    class="inline-block"
                                    :action="uploadUrl"
                                    accept="image/*"
                                    :show-file-list="false"
                                    :headers="header"
                                    :on-success="uploadCertificate">
                                    <a href="javascript:;" title="上传凭证" class="link" @click="id=item.id">上传凭证</a>
                                </el-upload>
                                <span v-if="!getNavList['4050501']&&!getNavList['4050502']&&!(getNavList['4050504']&&item.certificate)&&!getNavList['4050503']">---</span>
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
            loading: false,
            selectVal: ['序号', '结算编号', '结算对象', '申请结算月份', '结算金额', '状态', '申请时间', '银行信息', '结算时间', '操作'],
            showList: ['序号', '结算编号', '结算对象', '申请结算月份', '结算金额', '状态', '申请时间', '银行信息', '结算时间', '操作'],
            options: [10, 25, 50],   //条数数目
            searchShow: false,   //搜索开关
            limit: 10,
            page: 1,
            header: {ContentType: 'application/x-www-form-urlencoded'},
            id: '',
            subNavList: {
                parentNode: {
                    name: '财务管理',
                    router: {
                        name: 'financial_statistics'
                    }
                },
                childNode: {
                    name: '结算管理',
                    desc: '主要用于代理商结算信息的查看及管理',
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
                    options: [
                        {
                            label: '已结算',
                            value: 1
                        },
                        {
                            label: '未结算',
                            value: 2
                        }
                    ]
                }
            ]
        }),
        computed: {
            //页数和总条数
            pages () {
                return this.data.pageSize || 1
            },
            offset () {
                return (this.page - 1) * this.limit
            },
            uploadUrl () {
                return api.common.upload
            },
            ...mapGetters([
                'getNavList'
            ])
        },
        methods: {
            //列表页获取
            getList () {
                this.loading = true
                this.$http.post(api.financial.clearing, {
                    settlement_code: this.searchOptions[0].value,
                    agent_name: this.searchOptions[1].value,
                    start_time: this.searchOptions[2].value,
                    end_time: this.searchOptions[3].value,
                    status: this.searchOptions[4].value,
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
            doClearing (item) {
                this.$confirm('此操作将将对该代理商进行结算, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.get(api.financial.clearingComplete, {
                        params: {
                            id: item.id
                        }
                    }).then(res => {
                        if (res.data.code === 1) {
                            this.$message({
                                type: 'success',
                                message: '结算成功!'
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
            uploadCertificate (res) {
                if (res.code === 1) {
                    this.$http.post(api.financial.uploadCertificate, {
                        id: this.id,
                        url: res.data.image
                    }).then(res => {
                        if (res.data.code === 1) {
                            this.$message({
                                type: 'success',
                                message: '上传成功'
                            })
                            this.getList()
                        } else {
                            this.$message({
                                type: 'error',
                                message: res.msg
                            })
                        }
                    })
                } else {
                    this.$message({
                        type: 'error',
                        message: res.msg
                    })
                }
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
