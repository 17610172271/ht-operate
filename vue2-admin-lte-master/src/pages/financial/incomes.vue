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
                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('序号')!=-1" style="max-width: 60px;">序号</li>
                            <li class="col-xs-3 p-n" v-show="selectVal.indexOf('影院名称')!=-1">影院名称</li>
                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('所属区域')!=-1">所属区域</li>
                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('所属代理商')!=-1" style="min-width: 80px">所属代理商</li>
                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('城市')!=-1">城市</li>
                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('订单数')!=-1">订单数</li>
                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('实付总数')!=-1">实付总数</li>
                            <li class="col-xs-3 p-n" v-show="selectVal.indexOf('观影日期')!=-1">观影日期</li>
                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('新光')!=-1">新光</li>
                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('航天')!=-1">航天</li>
                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('版权')!=-1">版权</li>
                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('影院')!=-1">影院</li>
                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('代理商')!=-1">代理商</li>
                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('营业税')!=-1">营业税</li>
                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('专项资金')!=-1">专项资金</li>
                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('操作')!=-1">操作</li>
                        </ul>
                        <ul class="table-tbody clear" v-for="(item, index) in data.items">
                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('序号')!=-1" style="max-width: 60px;">{{offset + index + 1}}</li>
                            <li class="col-xs-3 p-n over-omit" v-show="selectVal.indexOf('影院名称')!=-1" :title="item.cinema_name">{{item.cinema_name}}</li>
                            <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('所属区域')!=-1" :title="item.region_name">{{item.region_name}}</li>
                            <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('所属代理商')!=-1" style="min-width: 80px" :title="item.agent_name">{{item.agent_name}}</li>
                            <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('城市')!=-1" :title="item.city_name">{{item.city_name}}</li>
                            <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('订单数')!=-1" :title="item.trade_num">{{item.trade_num}}</li>
                            <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('实付总数')!=-1":title="item.total_pay_money">{{item.total_pay_money}}</li>
                            <li class="col-xs-3 p-n over-omit" v-show="selectVal.indexOf('观影日期')!=-1":title="item.time">{{item.time}}</li>
                            <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('新光')!=-1":title="item.xg">{{item.xg}}</li>
                            <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('航天')!=-1":title="item.ht">{{item.ht}}</li>
                            <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('版权')!=-1" :title="item.copyright">{{item.copyright}}</li>
                            <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('影院')!=-1" :title="item.cinema">{{item.cinema}}</li>
                            <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('代理商')!=-1" :title="item.agent">{{item.agent}}</li>
                            <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('营业税')!=-1" :title="item.sales_tax">{{item.sales_tax}}</li>
                            <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('专项资金')!=-1" :title="item.special_funds">{{item.special_funds}}</li>
                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('操作')!=-1">
                                <router-link :to="{name: 'financial_incomes_detail', params: {id: item.cinema_id}, query: {time: item.time}}"
                                    v-if="getNavList['4050901']" href="javascript:;" class="link" @click.stop>查看</router-link>
                                <span v-else>---</span>
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
            selectVal: ['序号', '影院名称', '所属区域','所属代理商', '城市', '订单数', '实付总数', '观影日期', '新光', '航天', '版权', '影院', '代理商', '营业税', '专项资金', '操作'],
            showList: ['序号', '影院名称', '所属区域','所属代理商', '城市', '订单数', '实付总数', '观影日期', '新光', '航天', '版权', '影院', '代理商', '营业税', '专项资金', '操作'],
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
                    name: '收益管理',
                    desc: '主要用于收益的查看及管理',
                    router: {
                        name: 'financial_income'
                    }
                }
            },
            //搜索
            searchOptions: [
                {
                    type: 'text',
                    name: '影院名称',
                    value: ''
                },
                {
                    type: 'searchSelect',
                    name: '所属区域',
                    value: '',
                    options: []
                },
                {
                    type: 'searchSelect',
                    name: '代理商等级',
                    value: '',
                    options: [
                        {
                            value:'1',
                            label:'一级代理商'
                        },
                        {
                            value:'2',
                            label:'二级代理商'
                        },
                        {
                            value:'3',
                            label:'三级代理商'
                        },

                    ]
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
                    type: 'text',
                    name: '代理商名称',
                    value: ''
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
                this.$http.post(api.financial.incomes, {
                    cinema_name: this.searchOptions[0].value,
                    region_id: this.searchOptions[1].value,
                    level: this.searchOptions[2].value,
                    start_time: this.searchOptions[3].value,
                    end_time: this.searchOptions[4].value,
                    agent_name: this.searchOptions[5].value,
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
                this.$router.replace({name: 'financial_income', query: {page: val}})
                this.getList()
            },
            limit (val) {
                this.page = 1
                this.getList()
            },
            searchShow (val){
                if (val) {
                    this.$http.post(api.common.getCity, {
                        status: 1
                    }).then(res => {
                        if (res.data.code === 1) {
                            this.searchOptions[1].options = res.data.data.map(val => {
                                return {
                                    label: val.name,
                                    value: val.id
                                }
                            })
                        }
                    })
                }
            }
        }
    }
</script>
<style scoped>
</style>
