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
                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('操作内容')!=-1">操作内容</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作人')!=-1">操作人</li>
                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('操作时间')!=-1">操作时间</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作IP')!=-1">操作IP</li>
                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('操作Url')!=-1">操作Url</li>
                        </ul>
                        <ul class="table-tbody clear" v-for="(item, index) in data.items">
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('序号')!=-1" style="max-width: 60px;">{{index + offset + 1}}</li>
                            <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('操作内容')!=-1" :title="item.title">{{item.title}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('操作人')!=-1" :title="item.username">{{item.username}}</li>
                            <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('操作时间')!=-1" :title="item.create_time">{{item.create_time}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('操作IP')!=-1" :title="item.ip">{{item.ip}}</li>
                            <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('操作Url')!=-1" :title="item.url">{{item.url}}</li>
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
            selectVal: ['序号', '操作内容', '操作人', '操作时间', '操作IP', '操作Url'],
            showList: ['序号', '操作内容', '操作人', '操作时间', '操作IP', '操作Url'],
            options: [10, 25, 50],   //条数数目
            searchShow: false,   //搜索开关
            limit: 10,
            page: 1,
            subNavList: {
                parentNode: {
                    name: '操作日志',
                    router: {
                        name: 'log_list'
                    }
                },
                childNode: {
                    name: '日志列表',
                    desc: '主要用于日志的查看及管理',
                    router: {
                        name: 'log_list'
                    }
                }
            },
            //搜索
            searchOptions: [
                {
                    type: 'text',
                    name: '操作人',
                    value: ''
                },
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
        components: {
            SubHeader,
            SelectCheckbox,
            SearchIpts
        },
        methods: {
            getList () {
                this.loading = true
                this.$http.post(api.log.list, {
                    username: this.searchOptions[0].value,
                    start_time: this.searchOptions[1].value,
                    end_time: this.searchOptions[2].value,
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
                this.$router.replace({name: 'log_list', query: {page: val}})
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
