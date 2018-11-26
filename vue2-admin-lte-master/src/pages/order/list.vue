<template>
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
                        <el-select v-model="status.value" placeholder="状态" class="m-r-sm pull-left" style="width: 80px" clearable>
                            <el-option
                                v-for="option in status.options"
                                :key="option.value"
                                :label="option.label"
                                :value="option.value">
                            </el-option>
                        </el-select>
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
                            <li class="col-xs-24 p-n select-box">
                                <el-checkbox v-model="selectAll">全选</el-checkbox>
                            </li>
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('ID')!=-1">ID</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('订单号')!=-1">订单号</li>
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('影院')!=-1">影院</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('影厅')!=-1">影厅</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('电影名称')!=-1">电影名称</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('用户账号')!=-1">用户账号</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('下单时间')!=-1">下单时间</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('预约时间')!=-1">预约时间</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('支付方式')!=-1">支付方式</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('付款金额')!=-1">付款金额</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('实际金额')!=-1">实际金额</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('优惠金额')!=-1">优惠金额</li>
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('订单状态')!=-1">订单状态</li>
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('区域代理商')!=-1">区域代理商</li>
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('代理商')!=-1">代理商</li>
                            <!--<li class="col-xs-1 p-n" v-show="selectVal.indexOf('购买人手机号')!=-1">购买人手机号</li>-->
                            <!--<li class="col-xs-1 p-n" v-show="selectVal.indexOf('商品数量')!=-1">商品数量</li>-->
                            <!--<li class="col-xs-24 p-n" v-show="selectVal.indexOf('状态')!=-1">状态</li>-->
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1">操作</li>
                        </ul>
                        <ul class="table-tbody clear" v-for="(item, index) in data.items">
                            <li class="col-xs-24 p-n select-box">
                                <el-checkbox :label="item.id" v-model="selectedGroup"></el-checkbox>
                            </li>
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('ID')!=-1" :title="item.id">{{item.trade_id}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('订单号')!=-1" :title="item.code">{{item.code}}</li>
                            <li class="col-xs-24 p-n over-omit" v-show="selectVal.indexOf('影院')!=-1" :title="item.cinema_name">{{item.cinema_name}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('影厅')!=-1" :title="item.hall_name">{{item.hall_name}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('电影名称')!=-1" :title="item.goods_name">{{item.goods_name}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('用户账号')!=-1" :title="item.username">{{item.username}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('下单时间')!=-1" :title="format(item.trade_create_time*1000)">{{format(item.trade_create_time*1000)}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('预约时间')!=-1" :title="format(item.trade_start_time*1000)">{{format(item.trade_start_time*1000)}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('支付方式')!=-1" :title="item.pay_type">{{item.pay_type}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('付款金额')!=-1" :title="item.trade_money">{{item.trade_money}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('实际金额')!=-1" :title="item.trade_money">{{item.trade_money}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('优惠金额')!=-1" :title="item.discount_money">{{item.discount_money}}</li>
                            <li class="col-xs-24 p-n over-omit" v-show="selectVal.indexOf('订单状态')!=-1" :class="{'text-green': item.trade_status==1, 'text-red': item.trade_status==2}" :title="item.status_name">{{item.status_name}}</li>
                            <li class="col-xs-24 p-n over-omit" v-show="selectVal.indexOf('区域代理商')!=-1" :title="item.region_agent_name">{{item.region_agent_name}}</li>
                            <li class="col-xs-24 p-n over-omit" v-show="selectVal.indexOf('代理商')!=-1" :title="item.agent_name">{{item.agent_name}}</li>
                    <!--        <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('购买人手机号')!=-1" :title="item.buyer_mobile">{{item.buyer_mobile}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('商品数量')!=-1" :title="item.goods_num">{{item.goods_num}}</li>
                            <li class="col-xs-24 p-n over-omit" v-show="selectVal.indexOf('状态')!=-1":title="item.status">{{item.status}}</li>-->
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1">
                                <router-link :to="{name: 'order_detail', params: {id: item.trade_id}}" href="javascript:;" title="详情" class="candle-btn btn"><i
                                    class="fa fa-search-plus"></i></router-link>
                            </li>
                        </ul>
                        <ul class="table-tbody clear" v-if="data.items.length===0">
                            <li class="p-n over-omit">暂无更多数据</li>
                        </ul>
                    </div>
                    <div class="footer clear m-t-md">
                        <div class="pull-left news-record text-lg">
                            <span v-show="data.length>0">显示{{offset + 1}}到{{offset + data.items.length}}条记录，</span>共<span
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
                curr: 1,
                total: 1,
                total_page: 1,
                items: []
            },
            teamOptions: [],
            loading: false,
            modalLoading: false,
            selectVal: ['ID', '影院', '影厅', '电影名称', '用户账号', '下单时间','预约时间', '支付方式','付款金额','实际金额','优惠金额','订单状态','区域代理商','代理商', '操作'],
            showList: ['ID', '影院', '影厅', '电影名称', '用户账号', '下单时间','预约时间', '支付方式','付款金额','实际金额','优惠金额','订单状态','区域代理商','代理商', '操作'],
            options: [10, 25, 50],   //条数数目
            searchShow: false,   //搜索开关
            selectAll: false,    //多选框开关
            selectedGroup: [], // 多选框选中值
            limit: 10,
            page: 1,
            type: '',
            detailModal: false, // 详情框
            editModal: false, //编辑框
            //头部文字
            subNavList: {
                parentNode: {
                    name: '订单管理',
                    router: {
                        name: 'order_list'
                    }
                },
                childNode: {
                    name: '订单列表',
                    desc: '主要用订单的查看及管理',
                    router: {
                        name: 'order_list'
                    }
                }
            },
            //搜索
            searchOptions: [
                {
                    type: 'searchSelect',
                    name: '代理商',
                    value: '',
                    options: []
                },
                {
                    type: 'searchSelect',
                    name: '区域代理',
                    value: '',
                    options: []
                },
                {
                    type: 'searchSelect',
                    name: '影院',
                    value: '',
                    options: []
                },
                {
                    type: 'select',
                    name: '支付方式',
                    value: '',
                    options: [
                        {
                            value: 'wechat',
                            label: '微信'
                        },
                        {
                            value: 'alipay',
                            label: '支付宝'
                        },
                    ]
                },
                {
                    type: 'time1',
                    name: '开始时间',
                    value: ''
                },
                {
                    type: 'time1',
                    name: '结束时间',
                    value: ''
                },
            ],
            status: {
                value: '',
                options: [
                    {
                        value: 1,
                        label: '有效'
                    },
                    {
                        value: 2,
                        label: '待审核'
                    },
                    {
                        value: 3,
                        label: '待支付'
                    },
                    {
                        value: 4,
                        label: '已取消'
                    },
                    {
                        value: 5,
                        label: '待退款'
                    },
                    {
                        value: 6,
                        label: '已退款'
                    },
                    {
                        value: 7,
                        label: '已完成'
                    },
                ]
            }
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
                this.$http.post(api.order.list, {
                    agent_id: this.searchOptions[0].value,
                    region_agent_id: this.searchOptions[1].value,
                    cinema_id: this.searchOptions[2].value,
                    pay_type: this.searchOptions[3].value,
                    order_before_time: this.searchOptions[4].value,
                    order_after_time: this.searchOptions[5].value,
                    status: this.status.value,
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
            // 获取代理商列表
            getGroupList () {
                this.$http.post(api.agent.getAllList).then(res => {
                    if (res.data.code === 1) {
                        this.agentList = res.data.data
                        this.searchOptions[0].options = res.data.data.map(val => {
                            return {
                                label: val.name,
                                value: val.id
                            }
                        })
                    } else {
                        this.agentList = []
                        this.searchOptions[0].options = []
                    }
                })
            },
            getRegionAgent () {
                this.$http.post(api.circuit.getAllList).then(res => {
                    if (res.data.code === 1) {
                        this.searchOptions[1].options = res.data.data.map(val => {
                            return {
                                label: val.name,
                                value: val.id
                            }
                        })
                    } else {
                        this.searchOptions[1].options = []
                    }
                })
            },
            getCinema () {
                this.$http.post(api.cinema.getAllList).then(res => {
                    if (res.data.code === 1) {
                        this.searchOptions[2].options = res.data.data.map(val => {
                            return {
                                label: val.name,
                                value: val.id
                            }
                        })
                    } else {
                        this.searchOptions[2].options = []
                    }
                })
            },
            refresh () {
                this.getList()
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
                this.$router.replace({name: 'order_list', query: {page: val}})
                this.getList()
            },
            limit (val) {
                this.getList()
            },
            searchShow (val) {
                if (val) {
                    this.getGroupList()
                    this.getRegionAgent()
                    this.getCinema()
                }
            },
            'status.value' (val) {
                this.getList()
            }
        }
    }
</script>
<style>

</style>

