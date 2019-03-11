<template>
    <!--代理商列表-->
    <div v-loading="loading">
        <div class="p-lg appli-container">
            <sub-header :list="subNavList"></sub-header>
            <div class="page-container">
                <div class="page-toolbar clear m-t-sm">
                    <search-ipts :options="searchOptions" @submit="doSearch" v-show="searchShow"></search-ipts>
                    <h5 class="text-center text-bold text-xxlg">{{searchOptions[0].value.split('-')[0]}}年{{searchOptions[0].value.split('-')[1]}}月报表</h5>
                </div>
                <div class="page-contaoner">
                    <div class="lk-table m-t-sm">
                        <ul class="table-thead clear">
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('日期')!=-1">日期</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('航天收益')!=-1">航天收益</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('新光')!=-1">新光</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('代理商')!=-1">代理商</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('影院')!=-1">影院</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('版权')!=-1">版权</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('5%专项资金')!=-1">5%专项资金</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('3.3%营业税')!=-1">3.3%营业税</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('小计')!=-1">小计</li>
                        </ul>
                        <ul class="table-tbody clear" v-for="(item, index) in data" v-if="data.length>0 && item.isShow"">
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('日期')!=-1" :title="item.date">{{item.date}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('航天收益')!=-1" :title="item.ht_profit">{{item.ht_profit}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('新光')!=-1" :title="item.xg">{{item.xg}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('代理商')!=-1" :title="item.agent">{{item.agent}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('影院')!=-1" :title="item.cinema">{{item.cinema}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('版权')!=-1":title="item.copyright">{{item.copyright}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('5%专项资金')!=-1":title="item.special_funds">{{item.special_funds}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('3.3%营业税')!=-1":title="item.sales_tax">{{item.sales_tax}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('小计')!=-1":title="item.subtotal">{{item.subtotal}}</li>
                        </ul>
                        <ul class="table-tbody clear" v-if="data.length===0">
                            <li class="p-n over-omit">暂无更多数据</li>
                        </ul>
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
            data: [],
            yearList: [],
            monthList: [],
            loading: false,
            selectVal: ['日期', '航天收益', '新光', '代理商', '影院', '版权', '5%专项资金', '3.3%营业税', '小计'],
            showList: ['日期', '航天收益', '新光', '代理商', '影院', '版权', '5%专项资金', '3.3%营业税', '小计'],
            options: [10, 25, 50],   //条数数目
            searchShow: true,   //搜索开关
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
                    name: '月报表',
                    desc: '主要用于月报表的查看及管理',
                    router: {
                        name: 'financial_report'
                    }
                }
            },
            //搜索
            searchOptions: [
                {
                    type: 'time2',
                    name: '选择月份',
                    value: '',
                    options: []
                }
            ],
        }),
        methods: {
            //列表页获取
            getList () {
                this.loading = true
                this.$http.post(api.financial.report, {
                    year: this.searchOptions[0].value.split('-')[0],
                    month: this.searchOptions[0].value.split('-')[1]
                }).then(res => {
                    let that = this
                    setTimeout(function () {
                        that.loading = false
                    }, 500)
                    if (res.data.code === 1) {
                        this.data = res.data.data.map((val, index) => {
                            return {
                                ...val,
                                isShow: index === 0 ? true : (new Date(val.date).getTime() > new Date().getTime() ? false : true)
                            }
                        })
                    } else {
                        this.data = []
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
            let year = new Date().getFullYear()
            let month = new Date().getMonth() + 1
            this.searchOptions[0].value = year + '-' + month
            this.page = this.$route.query.page ? parseInt(this.$route.query.page) : 1
            this.getList()
        },
        watch: {
            page (val) {
                this.$router.replace({name: 'financial_report', query: {page: val}})
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
