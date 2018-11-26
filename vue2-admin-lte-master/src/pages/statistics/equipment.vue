<template>
    <div class="">
        <div class="p-lg appli-container">
            <sub-header :list="subNavList"></sub-header>
            <div class="page-container">
                <h5 class="text-xlg text-bold">数据统计</h5>
                <div class="clear">
                    <div class="m-t-sm p-r-sm p-l-n text-white col-xs-6 col-md-4 col-lg-2">
                        <div class="equipment-statistics-item p-o-sm bg-blue1">
                            <div class="text-md">全部设备</div>
                            <div class="text-center text-lg m-t-sm">{{data.total_device}} 台</div>
                        </div>
                    </div>
                    <div class="m-t-sm p-r-sm p-l-n text-white col-xs-6 col-md-4 col-lg-2">
                        <div class="equipment-statistics-item p-o-sm bg-qing">
                            <div class="text-md">未绑定设备</div>
                            <div class="text-center text-lg m-t-sm">{{data.unbind_device}} 台</div>
                        </div>
                    </div>
                    <div class="m-t-sm p-r-sm p-l-n text-white col-xs-6 col-md-4 col-lg-2">
                        <div class="equipment-statistics-item p-o-sm bg-green">
                            <div class="text-md">已绑定设备</div>
                            <div class="text-center text-lg m-t-sm">{{data.bind_device}} 台</div>
                        </div>
                    </div>
                    <div class="m-t-sm p-r-sm p-l-n text-white col-xs-6 col-md-4 col-lg-2">
                        <div class="equipment-statistics-item p-o-sm bg-orange">
                            <div class="text-md">播放中设备</div>
                            <div class="text-center text-lg m-t-sm">{{data.in_play_device}} 台</div>
                        </div>
                    </div>
                    <div class="m-t-sm p-r-sm p-l-n text-white col-xs-6 col-md-4 col-lg-2">
                        <div class="equipment-statistics-item p-o-sm bg-yellow">
                            <div class="text-md">未播放设备</div>
                            <div class="text-center text-lg m-t-sm">{{data.no_play_device}} 台</div>
                        </div>
                    </div>
                    <div class="m-t-sm p-r-sm p-l-n text-white col-xs-6 col-md-4 col-lg-2">
                        <div class="equipment-statistics-item p-o-sm bg-red">
                            <div class="text-md">异常设备</div>
                            <div class="text-center text-lg m-t-sm">{{data.abnormal_play_device}} 台</div>
                        </div>
                    </div>
                </div>
                <div class="page-toolbar clear m-t-lg">
                    <search-ipts :options="searchOptions" @submit="doSearch" v-show="searchShow"></search-ipts>
                    <div class="pull-left toolbar-candle clear">
                        <div class="app-refresh btn bg-gray1" title="刷新" @click="refresh"><i
                            class="fa fa-refresh"></i></div>
                    </div>
                    <div class="pull-right clear m-r-sm clear">
                        <div class="pull-left btn opacity-8 search-btn" @click="searchShow = !searchShow"><i
                            class="fa fa-search" title="搜索"></i></div>
                    </div>
                </div>
                <div class="clear">
                    <div class="p-r-sm m-t-sm p-l-n col-xs-12 col-md-6 col-lg-4" v-for="item in data.deviceStatistics.items">
                        <div class="equipment-item p-o-sm">
                            <div class="text-lg text-bold">代理商: <span class="text-normal">{{item.name}}</span></div>
                            <div class="p-t-md clear">
                                <div class="col-xs-4 text-bold p-n">区域代理: <span class="text-normal">{{item.region_agent}}家</span></div>
                                <div class="col-xs-4 text-bold p-n">影院: <span class="text-normal">{{item.cinema}}家</span></div>
                                <div class="col-xs-4 text-bold p-n">影厅: <span class="text-normal">{{item.hall}}家</span></div>
                            </div>
                            <div class="p-t-md clear">
                                <div class="col-xs-4 text-bold p-n">绑定设备: <span class="text-normal">{{item.bind_device}}台</span></div>
                                <div class="col-xs-4 text-bold p-n">在播放: <span class="text-normal">{{item.in_play_device}}台</span></div>
                                <div class="col-xs-4 text-bold p-n">未播放: <span class="text-normal">{{item.no_play_device}}台</span></div>
                            </div>
                            <div class="text-bold p-t-sm">异常设备: <span class="text-normal">{{item.abnormal_play_device}}台</span></div>
                        </div>
                    </div>
                </div>
                <div class="footer clear m-t-md">
                    <div class="pull-left news-record text-lg">
                        <span v-show="data.deviceStatistics.length>0">显示{{offset + 1}}到{{offset + data.deviceStatistics.items.length}}条记录，</span>共<span
                        class="text-blue">{{data.deviceStatistics.total}}</span>条记录 每页显示
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
</template>
<script type="text/ecmascript-6">
    import SubHeader from '../common/subheader'
    import SearchIpts from '../common/searchIpts'
    import api from '@/api'
    export default {
        data: () => ({
            data: {
                abnormal_play_device: 0,
                bind_device: 0,
                in_play_device: 0,
                no_play_device: 0,
                total_device: 0,
                unbind_device: 0,
                deviceStatistics: {
                    curr: 1,
                    total: 1,
                    total_page: 1,
                    items: []
                },
                play_statistics: ''
            },
            limit: 10,
            page: 1,
            options: [10, 25, 50],   //条数数目
            searchShow: false,
            subNavList: {
                parentNode: {
                    name: '数据统计',
                    router: {
                        name: 'statistics_order'
                    }
                },
                childNode: {
                    name: '设备统计',
                    desc: '主要用于设备的查看及统计',
                    router: {
                        name: 'statistics_equipment'
                    }
                }
            },
            searchOptions: [
                {
                    type: 'text',
                    name: '代理商',
                    value: ''
                },
                {
                    type: 'text',
                    name: '区域代理',
                    value: ''
                },
                {
                    type: 'text',
                    name: '影院',
                    value: ''
                },
            ]
        }),
        computed: {
            //页数和总条数
            pages () {
                return this.data.deviceStatistics.pageSize || 1
            },
            offset () {
                return (this.page - 1) * this.limit
            }
        },
        components: {
            SubHeader,
            SearchIpts
        },
        methods: {
            getList () {
                this.loading = true
                this.$http.post(api.statistics.equipment, {
                    agent_name: this.searchOptions[0].value,
                    region_agent_name: this.searchOptions[1].value,
                    cinema_name: this.searchOptions[2].value,
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
                            abnormal_play_device: 0,
                            bind_device: 0,
                            in_play_device: 0,
                            no_play_device: 0,
                            total_device: 0,
                            unbind_device: 0,
                            deviceStatistics: {
                                curr: 1,
                                total: 1,
                                total_page: 1,
                                items: []
                            }
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
        },
        created () {
            this.page = this.$route.query.page ? parseInt(this.$route.query.page) : 1
            this.getList()
        },
        watch: {
            page (val) {
                this.$router.replace({name: 'statistics_equipment', query: {page: val}})
                this.getList()
            }
        }
    }
</script>
<style scoped>

</style>
