<template>
    <!--管理员账号列表-->
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
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('ID')!=-1">ID</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('完成时间')!=-1">完成时间</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('影片名称')!=-1">影片名称</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('影厅名称')!=-1">影厅名称</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('影厅号')!=-1">影厅号</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('订单金额')!=-1">订单金额</li>
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('影院收入')!=-1">影院收入</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('区域代理收入')!=-1">区域代理收入</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('代理商收入')!=-1">代理商收入</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('影院')!=-1">影院</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('区域代理')!=-1">区域代理</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('代理商')!=-1">代理商</li>
                        </ul>
                        <ul class="table-tbody clear" v-for="(item, index) in data.items">
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('ID')!=-1" :title="item.id">{{item.id}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('完成时间')!=-1" :title="item.createtime">{{item.createtime}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('影片名称')!=-1" :title="item.film_name">{{item.film_name}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('影厅名称')!=-1" :title="item.hall_name">{{item.hall_name}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('影厅号')!=-1" :title="item.hall_code">{{item.hall_code}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('订单金额')!=-1" :title="item.order_money">{{item.order_money}}</li>
                            <li class="col-xs-24 p-n over-omit" v-show="selectVal.indexOf('影院收入')!=-1" :title="item.cinema_income" >{{item.cinema_income}}</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('区域代理收入')!=-1"  :title="item.region_agent_income">{{item.region_agent_income}}</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('代理商收入')!=-1"  :title="item.agent_income">{{item.agent_income}}</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('影院')!=-1"  :title="item.cinema_name">{{item.cinema_name}}</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('区域代理')!=-1"  :title="item.regionagent_name">{{item.regionagent_name}}</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('代理商')!=-1"  :title="item.agent_name">{{item.agent_name}}</li>
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
    import format from '@/tools/format'
    import validate from '@/tools/validate'
    import SelectCheckbox from '@/components/SelectCheckbox'
    import SearchIpts from '../common/searchIpts'
    export default {
        //组件
        components: {
            SelectCheckbox,
            SearchIpts,
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
            loading: false,
            selectVal: ['ID', '完成时间', '影片名称', '影厅名称', '影厅号', '订单金额', '影院收入', '区域代理收入','代理商收入','影院','区域代理','代理商'],
            showList: ['ID', '完成时间', '影片名称', '影厅名称', '影厅号', '订单金额', '影院收入', '区域代理收入','代理商收入','影院','区域代理','代理商'],
            options: [10, 25, 50],   //条数数目
            searchShow: false,   //搜索开关
            selectAll: false,    //多选框开关
            limit: 10,
            page: 1,
            //头部文字
            subNavList: {
                parentNode: {
                    name: '收入统计',
                    router: {
                        name: 'financial_list'
                    }
                },
                childNode: {
                    name: '收入详情',
                    desc: '主要用财务的查看及管理',
                    router: {
                        name: 'financial_detail'
                    }
                }
            },
            //搜索
            searchOptions: [
                {
                    type: 'time',
                    name: '时间',
                    value: ''
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
                this.$http.get(api.income.detail, {
                    params:{
                        time: this.searchOptions[0].value || this.$route.query.time,
                        id: this.$route.query.id,
                        page: this.page,
                        limit: this.limit
                    }
                }).then(res => {
                    let that = this
                    setTimeout(function () {
                        that.loading = false
                    }, 500)
                    if (res.data.code === 1) {
                        this.data = res.data.data
                    } else {
                        this.data = {}
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
            },
            format: format
        },
        created () {
            this.page = this.$route.query.page ? parseInt(this.$route.query.page) : 1
            this.getList()
        },
        watch: {
            page (val) {
                this.$router.replace({name: 'financial_detail', query: {page: val}})
                this.getList()
            },
            limit (val) {
                this.getList()
            },
        }
    }
</script>
<style>

</style>

