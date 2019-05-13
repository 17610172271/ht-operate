<template>
    <div class="" v-loading="loading">
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
                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('广告ID')!=-1">广告ID</li>
                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('广告名称')!=-1">广告名称</li>
                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('项目名称')!=-1">项目名称</li>
                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('广告位')!=-1">广告位</li>
                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('广告金额')!=-1">广告金额</li>
                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('下线时间')!=-1">下线时间</li>
                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('航天比例')!=-1">航天比例</li>
                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('航天收益')!=-1">航天收益</li>
                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('新光比例')!=-1">新光比例</li>
                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('新光收益')!=-1">新光收益</li>
                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('影院比例')!=-1">影院比例</li>
                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('影院收益')!=-1">影院收益</li>
                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('税率')!=-1">税率</li>
                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('税费')!=-1">税费</li>
                        </ul>
                        <ul class="table-tbody clear" v-for="(item, index) in data.items">
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('序号')!=-1" style="max-width: 60px;">{{index + offset + 1}}</li>
                            <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('广告ID')!=-1" :title="item.advert_id">{{item.advert_id}}</li>
                            <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('广告名称')!=-1" :title="item.advert_name">{{item.advert_name}}</li>
                            <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('项目名称')!=-1" :title="item.project_name">{{item.project_name}}</li>
                            <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('广告位')!=-1" :title="item.advert_type">{{item.advert_type}}</li>
                            <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('广告金额')!=-1" :title="item.advert_money">{{item.advert_money}}</li>
                            <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('下线时间')!=-1" :title="item.off_time">{{item.off_time}}</li>
                            <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('航天比例')!=-1" :title="item.ht_proportion">{{item.ht_proportion}}</li>
                            <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('航天收益')!=-1" :title="item.ht_profit">{{item.ht_profit}}</li>
                            <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('新光比例')!=-1" :title="item.xg_proportion">{{item.xg_proportion}}</li>
                            <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('新光收益')!=-1" :title="item.xg_profit">{{item.xg_profit}}</li>
                            <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('影院比例')!=-1" :title="item.cinema_proportion">{{item.cinema_proportion}}</li>
                            <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('影院收益')!=-1" :title="item.cinema_profit">{{item.cinema_profit}}</li>
                            <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('税率')!=-1" :title="item.tax_proportion">{{item.tax_proportion}}</li>
                            <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('税费')!=-1" :title="item.tax_money">{{item.tax_money}}</li>
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
    export default {
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
            selectVal: ['序号', '广告ID', '广告名称', '项目名称', '广告位', '广告金额','下线时间', '航天比例', '航天收益', '新光比例', '新光收益', '影院比例','影院收益', '税率', '税费'],
            showList:['序号', '广告ID', '广告名称', '项目名称', '广告位', '广告金额','下线时间', '航天比例', '航天收益', '新光比例', '新光收益', '影院比例','影院收益', '税率', '税费'],
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
                    name: '广告收益',
                    desc: '主要用于广告收益的查看',
                    router: {
                        name: 'financial_Advertisement'
                    }
                }
            },
            //搜索
            searchOptions: [
                {
                    type: 'text',
                    name: '广告ID',
                    value: ''
                },
                {
                    type: 'text',
                    name: '广告名称',
                    value: ''
                },
                {
                    type: 'text',
                    name: '项目名称',
                    value: ''
                },
                {
                    type: 'select',
                    name: '广告位',
                    value: '',
                    options: [
                        {
                            value:'1',
                            label:'开屏'
                        },
                         {
                             value:'2',
                             label:'banner'
                         },
                        {
                            value:'3',
                            label:'映前'
                        },

                    ]
                },
                {
                    type: 'time',
                    name: '下线时间',
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
            }
        },
        components: {
            SubHeader,
            SelectCheckbox,
            SearchIpts
        },
        methods: {
            getList () {
                this.loading = true
                this.$http.post(api.financial.Advertisement, {
                    advert_id: this.searchOptions[0].value,
                    advert_name: this.searchOptions[1].value,
                    project_name: this.searchOptions[2].value,
                    advert_type: this.searchOptions[3].value,
                    off_time: this.searchOptions[4].value,
                    type:1,
                    page: this.page,
                    limit: this.limit
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
                this.$router.replace({name: 'financial_Advertisement', query: {page: val}})
                this.getList()
            },
            limit (val) {
                this.page = 1
                this.getList()
            }
        }
    }
</script>
<style scoped>
</style>
