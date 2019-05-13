<template>
    <!--管理员账号列表-->
    <div>
        <div class="p-md appli-container">
            <div class="border-bottom navlist-container clear">
                <el-breadcrumb separator="/" class="text-lg pull-left" style="line-height: 34px;">
                    <el-breadcrumb-item :to="{ path: '/statistics/users' }">数据统计</el-breadcrumb-item>
                    <el-breadcrumb-item>用户统计</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="m-t-sm bg-white">
                <div class="clear p-v-md">
                    <div class="statistics-datas-item pull-left m-r-lg m-l-lg">
                        <h5 class="p-o-md m-t-md">总广告数(个):</h5>
                        <div class="text-30 text-center">{{data.total}}</div>
                    </div>
                    <div class="statistics-datas-item pull-left">
                        <h5 class="p-o-md m-t-md">进行中广告数(个):</h5>
                        <div class="text-30 text-center">{{data.totaling}}</div>
                    </div>
                </div>
                <div class="p-sm">
                    <h3>用户分析</h3>
                    <div class="p-sm border-bottom">
                        <el-date-picker
                            v-model="start_time"
                            :type="date"
                            :clearable="false"
                            placeholder="开始日期">
                        </el-date-picker>
                        <span class="text-gray">至</span>
                        <el-date-picker
                            v-model="end_time"
                            :type="date"
                            :clearable="false"
                            placeholder="结束日期">
                        </el-date-picker>
                    </div>
                    <div class="p-v-md border-bottom relative p-o-md">
                        <el-tabs v-model="statisticsStatus">
                            <el-tab-pane label="映前播放量" name="all"></el-tab-pane>
                        </el-tabs>
                        <!--<el-radio-group v-model="statisticsDays" size="small" class="days-select-container">-->
                            <!--<el-radio-button label="day">天</el-radio-button>-->
                            <!--<el-radio-button label="month">月</el-radio-button>-->
                        <!--</el-radio-group>-->
                        <div class="chart-container" id="statisticsChart"></div>
                    </div>
                    <!--<div class="p-v-lg p-o-sm">-->
                        <!--<div class="clear p-sm">-->
                            <!--<a href="javascript:;" class="text-blue1 pull-left" @click="detailShow=!detailShow">{{detailShow?'收起':'打开'}}明细数据</a>-->
                            <!--<a href="javascript:;" class="text-blue1 pull-right" @click="exportData" v-if="getNavList['1140101']">导出</a>-->
                        <!--</div>-->
                        <!--<div v-show="detailShow">-->
                            <!--<div class="lk-table">-->
                                <!--<ul class="table-thead clear">-->
                                    <!--<li class="col-xs-6 p-n">日期</li>-->
                                    <!--<li class="col-xs-3 p-n text-center">累计用户</li>-->
                                    <!--<li class="col-xs-3 p-n text-center">累计注册用户</li>-->
                                <!--</ul>-->
                                <!--<ul class="table-tbody clear" v-for="(item, index) in dataDetailList.items" v-if="dataDetailList.items.length>0">-->
                                    <!--<li class="col-xs-6 p-n">{{item.date}}</li>-->
                                    <!--<li class="col-xs-3 p-n text-center" :title="item.total_user_num">{{item.total_user_num}}</li>-->
                                    <!--<li class="col-xs-3 p-n text-center" :title="item.total_register_user_num">{{item.total_register_user_num}}</li>-->
                                <!--</ul>-->
                                <!--<p class="p-v-sm" v-if="dataDetailList.items.length<=0">暂无数据</p>-->
                            <!--</div>-->
                            <!--<div class="p-v-sm clear">-->
                                <!--<el-pagination-->
                                    <!--class="pull-right"-->
                                    <!--@size-change="getDataDetailList"-->
                                    <!--@current-change="getDataDetailList"-->
                                    <!--:current-page.sync="page"-->
                                    <!--:page-size="pageSize"-->
                                    <!--layout="prev, pager, next, jumper"-->
                                    <!--:total="pages">-->
                                <!--</el-pagination>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import api from '@/api'
    import format from '@/tools/format'
    import { mapGetters } from 'vuex'
    export default {
        //组件
        components: {
        },
        data: () => ({
        loading: false,
        data: {
            total: 0,
            totaling: 0,
            list: []
        },
        start_time: '',
        end_time: '',
        statisticsStatus: 'all',
//        statisticsDays: 'day',
        columns: [],
        allData: [],
//        registData: [],
        detailShow: true,
//        dataDetailList: {
//            page: 1,
//            pageSize: 10,
//            total:1,
//            items: []
//        },
        page: 1,
        pageSize: 10
    }),
    computed: {
//        date () {
//            return this.statisticsDays === 'day' ? 'date' : 'month'
//        },
//        pages () {
//            return this.dataDetailList.total / this.pageSize || 1
//        },
    ...mapGetters([
            'getNavList'
        ])
    },
    methods: {
        getAllData () {
            this.loading = true
            this.$http.post(api.advertisement.adstatistics, {
//                date_type: this.statisticsDays,
//                start_time: this.statisticsDays === 'day' ? format(this.start_time, 'YYYY-MM-DD') : format(this.start_time, 'YYYY-MM'),
//                end_time: this.statisticsDays === 'day' ? format(this.end_time, 'YYYY-MM-DD') : format(this.end_time, 'YYYY-MM')
                start_time: format(this.end_time, 'YYYY-MM-DD'),
                end_time: format(this.end_time, 'YYYY-MM-DD'),
            }).then(res => {
                let that = this
                setTimeout(function () {
                    that.loading = false
                }, 500)
            if (res.data.code === 1) {
                this.data = res.data.data
                this.columns = []
                this.allData = []
//                this.registData = []
                this.data.list.map(val => {
                    this.columns.push(val.date)
                this.allData.push(val.paly_num)
//                this.registData.push(val.total_register_user)
            })
                this.$nextTick(() => {
                    this.drawLine(this.allData, this.columns, 'line')
            })
            } else {
                this.$message({
                    type: 'warning',
                    message: res.data.msg
                })
            }
        })

        },
//        getDataDetailList () {
//            this.$http.post(api.statistics.userDetail, {
//                page: this.page || 1,
//                limit: this.pageSize || 10,
//                start_time: this.statisticsDays === 'day' ? format(this.start_time, 'YYYY-MM-DD') : format(this.start_time, 'YYYY-MM'),
//                end_time: this.statisticsDays === 'day' ? format(this.end_time, 'YYYY-MM-DD') : format(this.end_time, 'YYYY-MM')
//            }).then(res => {
//                if (res.data.code === 1) {
//                this.dataDetailList = res.data.data
//            } else {
//                this.$message({
//                    type: 'warning',
//                    message: res.data.msg
//                })
//            }
//        })
//        },
        getData () {
            this.getAllData()
//            this.getDataDetailList()
        },
        getDate (days) {
            var date1 = new Date()
            var time1=date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate();//time1表示当前时间
            var date2 = new Date(date1);
            date2.setDate(date1.getDate()+days);
            var time2 = date2.getFullYear()+"-"+(date2.getMonth()+1)+"-"+date2.getDate();
            return time2
        },
        drawLine (data, columns) {
            let myChart = this.$echarts.init(document.getElementById('statisticsChart'))
            myChart.resize()
            // 绘制图表
            myChart.setOption({
                title:{
                    text: '',//主标题文本，支持\n换行
                    left:'left',//离容器左侧的距离
                    top:'top'//距离容器上测的距离
                },
                tooltip: {trigger: 'axis'},
                grid: {
                    left: '40', // 图表距边框的距离
                    top: '55',
                    right: '40',
                    bottom: '30',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
//                    boundaryGap: this.statisticsDays === 'day' ? false : true,
                    data: columns,
                    name: '日期'
                },
                yAxis: {
                    name: '播放次数',
                },
                series: [
                    {
                        name: '播放次数',
                        color: ['#7eb6ec'],
//                        type: this.statisticsDays === 'day' ? 'line' : 'bar',
                        barMaxWidth: '40',
                        smooth: true,
                        data: data
                    }
                ]
            })
        },
//        exportData () {
//            window.open(api.statistics.userExport+'?start_time=' + (this.statisticsDays === 'day' ? format(this.start_time, 'YYYY-MM-DD') : format(this.start_time, 'YYYY-MM')) +'&end_time=' + (this.statisticsDays === 'day' ? format(this.end_time, 'YYYY-MM-DD') : format(this.end_time, 'YYYY-MM')))
//        },
    },
    created () {
        this.start_time = this.getDate(-10)
        this.end_time = this.getDate(0)
        this.getData()
    },
    watch: {
//        statisticsDays (val) {
//            this.getData()
//        },
        start_time (val) {
            this.getData()
        },
        end_time (val) {
            this.getData()
        },
        statisticsStatus (val) {
            if (val === 'all') {
                this.drawLine(this.allData, this.columns)
            }
//            else {
//                this.drawLine(this.registData, this.columns)
//            }
        }
    }
    }
</script>
<style>
    .statistics-datas-item {
        width: 200px;
        height: 110px;
        border: 1px solid #999;
        border-radius: 15px;
    }
</style>

