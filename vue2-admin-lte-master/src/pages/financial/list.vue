<template>
    <!--管理员账号列表-->
    <div v-loading="loading">
        <div class="p-lg appli-container">
            <sub-header :list="subNavList"></sub-header>
            <div class="page-container">
                <div class="page-toolbar clear m-t-sm">
                    <search-ipts :options="searchOptions" @submit="doSearch" v-show="searchShow"></search-ipts>
                    <div class="pull-left toolbar-candle clear">
                        <!--<a href="javascript:;" title="添加" @click="addItem"-->
                           <!--class="app-add btn bg-blue1 text-white"><i class="fa fa-plus-square"></i>添加-->
                        <!--</a>-->
                        <!--<a href="javascript:;" title="删除" class="app-add btn bg-red1 text-white"-->
                           <!--@click="delItem(selectedGroup)"><i-->
                            <!--class="fa fa-trash"></i>删除</a>-->
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
                            <!--<li class="col-xs-24 p-n select-box">-->
                                <!--<el-checkbox v-model="selectAll">全选</el-checkbox>-->
                            <!--</li>-->
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('ID')!=-1">ID</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('影院名称')!=-1">影院名称</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('订单数量')!=-1">订单数量</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('订单金额')!=-1">订单金额</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('总收入')!=-1">总收入</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('可结算')!=-1">可结算</li>
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('已结算')!=-1">已结算</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('区域代理商')!=-1">区域代理商</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('代理商')!=-1">代理商</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('城市')!=-1">城市</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1">操作</li>
                        </ul>
                        <ul class="table-tbody clear" v-for="(item, index) in data.items" @click="selectItem(item.id)">
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('ID')!=-1" :title="item.id">{{item.id}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('影院名称')!=-1" :title="item.cinema_name">{{item.cinema_name}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('订单数量')!=-1" :title="item.order_num">{{item.order_num}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('订单金额')!=-1" :title="item.order_amount">{{item.order_amount}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('总收入')!=-1" :title="item.incomer_total">{{item.incomer_total}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('可结算')!=-1" :title="item.can_settled">{{item.can_settled}}</li>
                            <li class="col-xs-24 p-n over-omit" v-show="selectVal.indexOf('已结算')!=-1" :title="item.has_settled" >{{item.has_settled}}</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('区域代理商')!=-1"  :title="item.regionagent_name">{{item.regionagent_name}}</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('代理商')!=-1"  :title="item.agent_name">{{item.agent_name}}</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('城市')!=-1"  :title="item.city_name">{{item.city_name}}</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1">
                                <router-link :to="{name: 'financial_detail', query: {id: item.id, time: item.create_time}}" href="javascript:;" title="详情"
                                             class="candle-btn btn"><i class="fa fa-search-plus"></i></router-link>
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
            teamOptions: [],
            loading: false,
            modalLoading: false,
            selectVal: ['ID', '影院名称', '订单数量', '订单金额', '总收入', '可结算', '已结算', '区域代理商','代理商','城市', '操作'],
            showList: ['ID', '影院名称', '订单数量', '订单金额', '总收入', '可结算', '已结算', '区域代理商','代理商','城市', '操作'],
            options: [10, 25, 50],   //条数数目
            searchShow: false,   //搜索开关
            selectAll: false,    //多选框开关
            selectedGroup: [], // 多选框选中值
            limit: 10,
            page: 1,
            //编辑
            detailVal:{
                group_id: '',
                username:'',
                nickname:'',
                mobile: '',
                email:'',
                password: '',
                status: 1
            }, // 编辑详情弹出框值
            groupError: false,
            usernameError: false,
            nicknameError: false,
            emailError: false,
            mobileError: false,
            passwordError: false,
            id: '',
            type: '',
            detailModal: false, // 详情框
            editModal: false, //编辑框
            //头部文字
            subNavList: {
                parentNode: {
                    name: '财务管理',
                    router: {
                        name: 'financial_list'
                    }
                },
                childNode: {
                    name: '收入统计',
                    desc: '主要用财务的查看及管理',
                    router: {
                        name: 'financial_list'
                    }
                }
            },
            //搜索
            searchOptions: [
                {
                    type: 'time',
                    name: '开始时间',
                    value: ''
                },
                {
                    type: 'time',
                    name: '结束时间',
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
                this.$http.post(api.income.list, {
                    begintime: this.searchOptions[0].value,
                    endtime: this.searchOptions[1].value,
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
            // 点击该行复选框选中
            selectItem (id) {
                if (this.selectedGroup.indexOf(id) !== -1) {
                    this.selectedGroup.splice(this.selectedGroup.indexOf(id), 1)
                } else {
                    this.selectedGroup.push(id)
                }
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
                this.$router.replace({name: 'financial_list', query: {page: val}})
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

