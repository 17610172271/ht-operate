<template>
    <div v-loading="loading">
        <div class="appli-container bg-white">
            <div class="p-md border-bottom relative clear">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{name: 'home'}">首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{name: 'financial_income'}">收益管理</el-breadcrumb-item>
                    <el-breadcrumb-item>收益详情</el-breadcrumb-item>
                    <el-breadcrumb-item>{{$route.query.cinema_name}}</el-breadcrumb-item>
                </el-breadcrumb>
                <a href="javascript:;" class="btn bg-blue1 text-white btn-back" style="right: 40px;" @click="goBack">返回</a>
            </div>
            <div class="page-container" style="margin-top: 0;">
                <div class="page-toolbar clear m-t-sm">
                    <div class="pull-left toolbar-candle clear">
                        <router-link :to="{name: 'agent_add'}" href="javascript:;" title="添加" class="app-add btn bg-blue1 text-white"><i class="fa fa-plus-square"></i>添加</router-link>
                        <div class="app-refresh btn bg-gray1" title="刷新" @click="refresh"><i
                            class="fa fa-refresh"></i></div>
                    </div>
                    <div class="pull-right clear">
                        <div class="pull-left m-r-sm opacity-8" title="列">
                            <select-checkbox :list="showList" v-model="selectVal" style="width: 60px;"></select-checkbox>
                        </div>
                    </div>
                </div>
                <div class="page-contaoner" style="margin-top: 0;">
                    <div class="lk-table m-t-sm">
                        <ul class="table-thead clear">
                            <li class="col-xs-3 p-n" v-show="selectVal.indexOf('订单编号')!=-1">订单编号</li>
                            <li class="col-xs-3 p-n" v-show="selectVal.indexOf('影片名称')!=-1">影片名称</li>
                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('原价')!=-1">原价</li>
                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('实付')!=-1">实付</li>
                            <li class="col-xs-4 p-n" v-show="selectVal.indexOf('时间')!=-1">时间</li>
                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('营业税')!=-1">营业税</li>
                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('专项资金')!=-1">专项资金</li>
                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('新光')!=-1">新光</li>
                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('航天')!=-1">航天</li>
                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('版权')!=-1">版权</li>
                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('影院')!=-1">影院</li>
                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('一级代理')!=-1">一级代理</li>
                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('二级代理')!=-1">二级代理</li>
                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('三级代理')!=-1">专项资金</li>
                        </ul>
                        <ul class="table-tbody clear" v-for="(item, index) in data.items">
                            <li class="col-xs-3 p-n" v-show="selectVal.indexOf('订单编号')!=-1" :title="item.trade_id">{{item.trade_id}}</li>
                            <li class="col-xs-3 p-n over-omit" v-show="selectVal.indexOf('影片名称')!=-1" :title="item.film_name">{{item.film_name}}</li>
                            <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('原价')!=-1" :title="item.price">{{item.price}}</li>
                            <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('实付')!=-1" :title="item.pay_money">{{item.pay_money}}</li>
                            <li class="col-xs-4 p-n over-omit" v-show="selectVal.indexOf('时间')!=-1" :title="item.time">{{item.time}}</li>
                            <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('营业税')!=-1":title="item.sales_tax">{{item.sales_tax}}</li>
                            <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('专项资金')!=-1":title="item.special_funds">{{item.special_funds}}</li>
                            <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('新光')!=-1":title="item.xg">{{item.xg}}</li>
                            <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('航天')!=-1":title="item.ht">{{item.ht}}</li>
                            <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('版权')!=-1" :title="item.copyright">{{item.copyright}}</li>
                            <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('影院')!=-1" :title="item.cinema">{{item.cinema}}</li>
                            <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('一级代理')!=-1" :title="item.agent_first">{{item.agent_first}}</li>
                            <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('二级代理')!=-1" :title="item.agent_second">{{item.agent_second}}</li>
                            <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('三级代理')!=-1" :title="item.agent_third">{{item.agent_third}}</li>
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
            selectVal: ['订单编号', '影片名称', '原价', '实付', '时间', '营业税', '专项资金', '新光', '航天', '版权', '影院', '一级代理', '二级代理', '三级代理'],
            showList: ['订单编号', '影片名称', '原价', '实付', '时间', '营业税', '专项资金', '新光', '航天', '版权', '影院', '一级代理', '二级代理', '三级代理'],
            options: [10, 25, 50],   //条数数目
            searchShow: false,   //搜索开关
            limit: 10,
            page: 1,
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
                this.$http.get(api.financial.incomesDetail, {
                    params: {
                        cinema_id: this.$route.params.id,
                        start_time: this.$route.query.start_time,
                        end_time: this.$route.query.end_time,
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
            // 下一页
            addPage () {
                if (this.page < this.pages) this.page += 1
            },
            // 上一页
            delPage () {
                if (this.page > 1) this.page -= 1
            },
            goBack () {
                this.$router.go(-1)
            }
        },
        created () {
            this.page = this.$route.query.page ? parseInt(this.$route.query.page) : 1
            this.getList()
        },
        watch: {
            page (val) {
                this.$router.replace({name: 'financial_income_detail', query: {page: val}})
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
