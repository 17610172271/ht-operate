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
                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('订单编号')!=-1">订单编号</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('手机号')!=-1">手机号</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('城市')!=-1">城市</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('影片名称')!=-1">影片名称</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('影院')!=-1">影院</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('支付方式')!=-1">支付方式</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('原价')!=-1">原价</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('实付')!=-1">实付</li>
                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('创建时间')!=-1">创建时间</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('状态')!=-1">状态</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1">操作</li>
                        </ul>
                        <ul class="table-tbody clear" v-for="(item, index) in data.items">
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('序号')!=-1" style="max-width: 60px;">{{offset + index + 1}}</li>
                            <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('订单编号')!=-1" :title="item.trade_id">{{item.trade_id}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('手机号')!=-1" :title="item.buyer_mobile">{{item.buyer_mobile}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('城市')!=-1" :title="item.city_name">{{item.city_name}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('影片名称')!=-1" :title="item.film_name">{{item.film_name}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('影院')!=-1" :title="item.cinema_name">{{item.cinema_name}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('支付方式')!=-1":title="item.pay_type">{{item.pay_type}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('原价')!=-1":title="item.original_price">{{item.original_price}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('实付')!=-1":title="item.pay_money">{{item.pay_money}}</li>
                            <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('创建时间')!=-1":title="item.create_time">{{item.create_time}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('状态')!=-1" :title="item.status_name"
                                :class="{'text-green': item.status_name=='已付款' || item.status_name=='准备播放' || item.status_name=='播放中' || item.status_name=='播放完成','text-orange': item.status_name=='待付款','text-red': item.status_name=='已关闭'||item.status_name=='已退款'||item.status_name=='已锁定'}">{{item.status_name}}</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1">
                                <a href="javascript:;" class="link" v-if="getNavList['4050401']" @click.stop="lookDetail(item)">查看</a>
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
                    <el-dialog
                        title="查看"
                        :visible.sync="detailModal"
                        custom-class="dialog-modal1">
                        <div v-loading="modalLoading">
                            <div class="clear bg-f9">
                                <div class="col-xs-2 line-height-40 text-right text-bold min-width-105">标题</div>
                                <div class="col-xs-8 line-height-40 text-bold">内容</div>
                            </div>
                            <div class="clear">
                                <div class="col-xs-2 line-height-40 text-right min-width-105">订单编号:</div>
                                <div class="col-xs-8 line-height-40">{{detailVal.trade_id}}</div>
                            </div>
                            <div class="clear bg-f9">
                                <div class="col-xs-2 line-height-40 text-right min-width-105">城市:</div>
                                <div class="col-xs-8 line-height-40">{{detailVal.city_name}}</div>
                            </div>
                            <div class="clear">
                                <div class="col-xs-2 line-height-40 text-right min-width-105">代理商:</div>
                                <div class="col-xs-8 line-height-40">{{detailVal.agent_name}}</div>
                            </div>
                            <div class="clear bg-f9">
                                <div class="col-xs-2 line-height-40 text-right min-width-105">代理商编码:</div>
                                <div class="col-xs-8 line-height-40">{{detailVal.agent_code}}</div>
                            </div>
                            <div class="clear">
                                <div class="col-xs-2 line-height-40 text-right min-width-105">用户昵称:</div>
                                <div class="col-xs-8 line-height-40">{{detailVal.buyer}}</div>
                            </div>
                            <div class="clear bg-f9">
                                <div class="col-xs-2 line-height-40 text-right min-width-105">用户ID:</div>
                                <div class="col-xs-8 line-height-40">{{detailVal.trade_id}}</div>
                            </div>
                            <div class="clear">
                                <div class="col-xs-2 line-height-40 text-right min-width-105">手机号:</div>
                                <div class="col-xs-8 line-height-40">{{detailVal.buyer_mobile}}</div>
                            </div>
                            <div class="clear bg-f9">
                                <div class="col-xs-2 line-height-40 text-right min-width-105">影片名称:</div>
                                <div class="col-xs-8 line-height-40">{{detailVal.film_name}}</div>
                            </div>
                            <div class="clear">
                                <div class="col-xs-2 line-height-40 text-right min-width-105">影院名称:</div>
                                <div class="col-xs-8 line-height-40">{{detailVal.cinema_name}}</div>
                            </div>
                            <div class="clear bg-f9">
                                <div class="col-xs-2 line-height-40 text-right min-width-105">影院编码:</div>
                                <div class="col-xs-8 line-height-40">{{detailVal.cinema_code}}</div>
                            </div>
                            <div class="clear">
                                <div class="col-xs-2 line-height-40 text-right min-width-105">原价:</div>
                                <div class="col-xs-8 line-height-40">{{detailVal.original_price}}</div>
                            </div>
                            <div class="clear bg-f9">
                                <div class="col-xs-2 line-height-40 text-right min-width-105">优惠:</div>
                                <div class="col-xs-8 line-height-40">{{detailVal.discount_money}}</div>
                            </div>
                            <div class="clear">
                                <div class="col-xs-2 line-height-40 text-right min-width-105">实付:</div>
                                <div class="col-xs-8 line-height-40">{{detailVal.pay_money}}</div>
                            </div>
                            <div class="clear bg-f9">
                                <div class="col-xs-2 line-height-40 text-right min-width-105">支付方式:</div>
                                <div class="col-xs-8 line-height-40">{{detailVal.pay_type}}</div>
                            </div>
                            <div class="clear">
                                <div class="col-xs-2 line-height-40 text-right min-width-105">创建时间:</div>
                                <div class="col-xs-8 line-height-40">{{detailVal.create_time}}</div>
                            </div>
                            <div class="clear bg-f9">
                                <div class="col-xs-2 line-height-40 text-right min-width-105">付款时间:</div>
                                <div class="col-xs-8 line-height-40">{{detailVal.pay_time}}</div>
                            </div>
                            <div class="clear">
                                <div class="col-xs-2 line-height-40 text-right min-width-105">观看时间:</div>
                                <div class="col-xs-8 line-height-40">{{detailVal.watch_time}}</div>
                            </div>
                            <div class="clear bg-f9">
                                <div class="col-xs-2 line-height-40 text-right min-width-105">订单状态:</div>
                                <div class="col-xs-8 line-height-40">{{detailVal.status}}</div>
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
            loading: false,
            modalLoading: false,
            detailModal: false,
            detailVal: {},
            selectVal: ['序号', '订单编号', '手机号', '城市', '影片名称', '影院', '支付方式', '原价', '实付', '创建时间','状态', '操作'],
            showList: ['序号', '订单编号', '手机号', '城市', '影片名称', '影院', '支付方式', '原价', '实付', '创建时间','状态', '操作'],
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
                    name: '用户订单',
                    desc: '主要用于用户订单的查看及管理',
                    router: {
                        name: 'financial_order'
                    }
                }
            },
            //搜索
            searchOptions: [
                {
                    type: 'text',
                    name: '订单编号',
                    value: ''
                },
                {
                    type: 'text',
                    name: '用户昵称',
                    value: ''
                },
                {
                    type: 'searchSelect',
                    name: '影院',
                    value: '',
                    options: []
                },
                {
                    type: 'select',
                    name: '状态',
                    value: '',
                    options: [
                        {
                            value: 0,
                            label: '未付款'
                        },
                        {
                            value: 1,
                            label: '已付款'
                        },
                        {
                            value: 3,
                            label: '已退款'
                        },
                        {
                            value: 2,
                            label: '已取消'
                        },
                        {
                            value: 13,
                            label: '已完成'
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
                    name: '影片',
                    value: ''
                },
                {
                    type: 'searchSelect',
                    name: '城市',
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
            },
            ...mapGetters([
                'getNavList'
            ])
        },
        methods: {
            //列表页获取
            getList () {
                this.loading = true
                this.$http.post(api.financial.orderList, {
                    trade_id: this.searchOptions[0].value,
                    buyer: this.searchOptions[1].value,
                    cinema_id: this.searchOptions[2].value,
                    status: this.searchOptions[3].value,
                    start_time: this.searchOptions[4].value,
                    end_time: this.searchOptions[5].value,
                    film_name: this.searchOptions[6].value,
                    city_id: this.searchOptions[7].value,
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
            //获取全部影院接口
            getcinemaList(){
                this.$http.post(api.cinema.getAllList, {
                    type_id: 1
                }).then(res => {
                    if (res.data.code === 1) {
                        this.searchOptions[2].options = res.data.data.map(val => {
                            return {
                                label: val.name,
                                value: val.id
                            }
                        })
                    }
                })
            },
            getCityList () {
                this.$http.post(api.common.getCity, {
                    status: 3
                }).then(res => {
                    if (res.data.code === 1) {
                        this.searchOptions[7].options = res.data.data.map(val => {
                            return {
                                label: val.name,
                                value: val.id
                            }
                        })
                    }
                })
            },
            getDetailData (id) {
                this.modalLoading = true
                this.$http.post(api.financial.orderDetail, {
                    trade_id: id
                }).then(res => {
                    let that = this
                    setTimeout(function () {
                        if (res.data.code === 1) {
                            that.modalLoading = false
                            that.detailVal = res.data.data
                        }
                    }, 500)
                })
            },
            lookDetail (item) {
                this.detailModal = true
                this.getDetailData(item.trade_id)
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
                this.$router.replace({name: 'financial_order', query: {page: val}})
                this.getList()
            },
            limit (val) {
                this.getList()
            },
            searchShow (searchShow){
                this.getcinemaList()
                this.getCityList()
            },
            detailModal (val) {
                if (!val) {
                    document.getElementsByClassName('el-dialog__body')[0].scrollTo(0, 0)
                }
            }
        }
    }
</script>
<style scoped>
</style>
