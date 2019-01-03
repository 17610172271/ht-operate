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
                    <div class="m-t-sm">
                        <ul class="clear flex p-v-sm border-bottom">
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('序号')!=-1" style="max-width: 60px;">序号</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('代理商编号')!=-1">代理商编号</li>
                            <li class="col-xs-3 p-n text-left" v-show="selectVal.indexOf('代理商名称')!=-1">代理商名称</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('所属区域')!=-1">所属区域</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('城市')!=-1">城市</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('一级分账比例')!=-1">一级分账比例</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('二级分账比例')!=-1">二级分账比例</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('三级分账比例')!=-1">三级分账比例</li>
                        </ul>
                        <div class="p-v-sm" v-for="(item, index) in data.items">
                            <ul class="table-tbody clear flex p-v-xs hover-999">
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('序号')!=-1" style="max-width: 60px;">{{offset + index + 1}}</li>
                                <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('代理商编号')!=-1" :title="item.agent_code">{{item.agent_code}}</li>
                                <li class="col-xs-3 p-n over-omit text-left" style="padding-left: 10px;" v-show="selectVal.indexOf('代理商名称')!=-1" :title="item.agent_name" @click="item.is_show=!item.is_show">
                                    <i class="fa m-r-sm text-999 cursor-p" :class="item.is_show?'fa-minus-square-o':'fa-plus-square-o'"></i>{{item.agent_name}}
                                </li>
                                <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('所属区域')!=-1" :title="item.region_name">{{item.region_name}}</li>
                                <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('城市')!=-1" :title="item.city_name">{{item.city_name}}</li>
                                <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('一级分账比例')!=-1" :title="item.first_proportion">{{item.first_proportion}}</li>
                                <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('二级分账比例')!=-1"></li>
                                <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('三级分账比例')!=-1"></li>
                            </ul>
                            <div class="" v-for="first in item.child" v-show="item.is_show">
                                <ul class="clear flex p-v-xs hover-999">
                                    <li class="col-xs-1 p-n" v-show="selectVal.indexOf('序号')!=-1" style="max-width: 60px;"></li>
                                    <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('代理商编号')!=-1"></li>
                                    <li class="col-xs-3 p-n over-omit text-left" style="padding-left: 30px;" v-show="selectVal.indexOf('代理商名称')!=-1" :title="first.agent_name" @click="first.is_show=!first.is_show">
                                        <i class="fa m-r-sm text-999 cursor-p" :class="first.is_show?'fa-minus-square-o':'fa-plus-square-o'"></i>{{first.agent_name}}
                                    </li>
                                    <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('所属区域')!=-1" :title="first.region_name">{{first.region_name}}</li>
                                    <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('城市')!=-1" :title="first.city_name">{{first.city_name}}</li>
                                    <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('一级分账比例')!=-1" :title="first.first_proportion">{{first.first_proportion}}</li>
                                    <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('二级分账比例')!=-1" :title="first.second_proportion">{{first.second_proportion}}</li>
                                    <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('三级分账比例')!=-1" :title="first.third_proportion">{{first.third_proportion}}</li>
                                </ul>
                                <ul class="clear flex p-v-xs hover-999" v-for="second in first.child" v-show="first.is_show">
                                    <li class="col-xs-1 p-n" v-show="selectVal.indexOf('序号')!=-1" style="max-width: 60px;"></li>
                                    <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('代理商编号')!=-1"></li>
                                    <li class="col-xs-3 p-n over-omit text-left" style="padding-left: 70px;" v-show="selectVal.indexOf('代理商名称')!=-1" :title="second.agent_name">{{second.agent_name}}</li>
                                    <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('所属区域')!=-1" :title="second.region_name">{{second.region_name}}</li>
                                    <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('城市')!=-1" :title="second.city_name">{{second.city_name}}</li>
                                    <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('一级分账比例')!=-1" :title="second.first_proportion">{{second.first_proportion}}</li>
                                    <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('二级分账比例')!=-1" :title="second.second_proportion">{{second.second_proportion}}</li>
                                    <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('三级分账比例')!=-1" :title="second.third_proportion">{{second.third_proportion}}</li>
                                </ul>
                            </div>
                        </div>
                        <ul class="clear text-center p-v-sm" v-if="data.items.length===0">
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
            selectVal: ['序号', '代理商编号', '代理商名称', '所属区域', '城市', '一级分账比例', '二级分账比例', '三级分账比例'],
            showList: ['序号', '代理商编号', '代理商名称', '所属区域', '城市', '一级分账比例', '二级分账比例', '三级分账比例'],
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
                    name: '代理商分账管理',
                    desc: '主要用于代理商分账的查看及管理',
                    router: {
                        name: 'financial_agentRouting'
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
                    name: '城市',
                    value: '',
                    options: []
                },
                {
                    type: 'searchSelect',
                    name: '所属区域',
                    value: '',
                    options: []
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
                this.$http.post(api.financial.agentRouting, {
                    agent_name: this.searchOptions[0].value,
                    city_id: this.searchOptions[1].value,
                    region_id: this.searchOptions[2].value,
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
            //获取区域
            getCity(){
                this.$http.post(api.common.getCity, {
                    status: 1
                }).then(res => {
                    if (res.data.code === 1) {
                        this.searchOptions[4].options = res.data.data.map(val => {
                            return {
                                label: val.name,
                                value: val.id
                            }
                        })
                    }
                })
            },
            //获取全部代理商接口
            getAllAgent(){
                this.$http.post(api.agent.getAllAgent, {
//                        status: 1
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
                this.$router.replace({name: 'financial_agentRouting', query: {page: val}})
                this.getList()
            },
            limit (val) {
                this.getList()
            },
        }
    }
</script>
<style scoped>
    .hover-999:hover {
        background-color: #f5f5f5;
        cursor: pointer;
    }
</style>
