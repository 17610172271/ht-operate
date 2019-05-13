<template>
    <div class="bg-white">
        <div class="p-md border-bottom relative">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{name: 'advertisement_project'}" v-if="fromRouter==='advertisement_project'">广告管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{name: 'advertisement_effect'}" v-else-if="fromRouter==='advertisement_effect'">广告效果</el-breadcrumb-item>
                <!--<el-breadcrumb-item :to="{name: 'agent_check'}" v-else>代理商审核</el-breadcrumb-item>-->
                <el-breadcrumb-item>广告详情</el-breadcrumb-item>
            </el-breadcrumb>
            <a href="javascript:;" class="btn bg-blue1 text-white btn-back" @click="goBack">返回</a>
        </div>
        <div class="p-o-lg p-v-sm" style="padding-bottom: 50px;" v-loading="loading">
            <div>
                <h5 class="border-bottom text-xxlg text-bold p-b-sm">广告信息</h5>
                <!-- 基本信息 -->
                <div>
                    <div class="p-o-sm p-v-sm clear agent-detail-row m-t-lg">
                        <div class="col-xs-1 text-bold"></div>
                        <div class="col-xs-2">广告ID:</div>
                        <div class="col-xs-4">{{data.company}}</div>
                    </div>
                    <div class="p-o-sm p-v-sm clear agent-detail-row">
                        <div class="col-xs-1 text-bold"></div>
                        <div class="col-xs-2">广告名称:</div>
                        <div class="col-xs-4">{{data.legal_person}}</div>
                    </div>
                    <div class="p-o-sm p-v-sm clear agent-detail-row">
                        <div class="col-xs-1 text-bold"></div>
                        <div class="col-xs-2">广告类型:</div>
                        <div class="col-xs-4">{{data.legal_phone}}</div>
                    </div>
                    <div class="p-o-sm p-v-sm clear agent-detail-row">
                        <div class="col-xs-1 text-bold"></div>
                        <div class="col-xs-2">投放区域:</div>
                        <div class="col-xs-4">{{data.legal_person_id}}</div>
                    </div>
                    <div class="p-o-sm p-v-sm clear agent-detail-row">
                        <div class="col-xs-1 text-bold"></div>
                        <div class="col-xs-2">广告位:</div>
                        <div class="col-xs-4">{{data.legal_email}}</div>
                    </div>
                    <div class="p-o-sm p-v-sm clear agent-detail-row">
                        <div class="col-xs-1 text-bold"></div>
                        <div class="col-xs-2">投放日期:</div>
                        <div class="col-xs-4">{{data.legal_person_id}}</div>
                    </div>
                    <div class="p-o-sm p-v-sm clear agent-detail-row">
                        <div class="col-xs-1 text-bold"></div>
                        <div class="col-xs-2">曝光次数:</div>
                        <div class="col-xs-4">{{data.legal_email}}</div>
                    </div>
                    <div class="p-sm">
                        <h3>广告分析</h3>
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
                                <el-tab-pane label="累计用户" name="all"></el-tab-pane>
                                <el-tab-pane label="累计注册用户" name="register"></el-tab-pane>
                            </el-tabs>
                            <el-radio-group v-model="statisticsDays" size="small" class="days-select-container">
                                <el-radio-button label="day">天</el-radio-button>
                                <el-radio-button label="month">月</el-radio-button>
                            </el-radio-group>
                            <div class="chart-container" id="statisticsChart"></div>
                        </div>
                        <div class="p-v-lg p-o-sm">
                            <div class="clear p-sm">
                                <a href="javascript:;" class="text-blue1 pull-left" @click="detailShow=!detailShow">{{detailShow?'收起':'打开'}}明细数据</a>
                                <a href="javascript:;" class="text-blue1 pull-right" @click="exportData" v-if="getNavList['1140101']">导出</a>
                            </div>
                            <div v-show="detailShow">
                                <div class="lk-table">
                                    <ul class="table-thead clear">
                                        <li class="col-xs-6 p-n">日期</li>
                                        <li class="col-xs-3 p-n text-center">累计用户</li>
                                        <li class="col-xs-3 p-n text-center">累计注册用户</li>
                                    </ul>
                                    <ul class="table-tbody clear" v-for="(item, index) in dataDetailList.items" v-if="dataDetailList.items.length>0">
                                        <li class="col-xs-6 p-n">{{item.date}}</li>
                                        <li class="col-xs-3 p-n text-center" :title="item.total_user_num">{{item.total_user_num}}</li>
                                        <li class="col-xs-3 p-n text-center" :title="item.total_register_user_num">{{item.total_register_user_num}}</li>
                                    </ul>
                                    <p class="p-v-sm" v-if="dataDetailList.items.length<=0">暂无数据</p>
                                </div>
                                <div class="p-v-sm clear">
                                    <el-pagination
                                        class="pull-right"
                                        @size-change="getDataDetailList"
                                        @current-change="getDataDetailList"
                                        :current-page.sync="page"
                                        :page-size="pageSize"
                                        layout="prev, pager, next, jumper"
                                        :total="pages">
                                    </el-pagination>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import api from '@/api'
    import validate from '@/tools/validate'
    export default {
        data: () => ({
            data: {
                items:[]
            },
            start_time: '',
            end_time: '',
            statisticsStatus: 'all',
            columns: [],
            allData: [],
            registData: [],
            loading: false,
            fromRouter: '',
        }),
        methods: {
            getData () {
                this.loading = true
                this.$http.get(api.agent.detail, {
                    params: {
                        id: this.$route.params.id,
                        type: 1,
                        start_time: format(this.start_time, 'YYYY-MM'),
                        end_time: format(this.end_time, 'YYYY-MM')

                    }
                }).then(res => {
                    let that = this
                    setTimeout(function () {
                        that.loading = false
                    }, 500)
                    if (res.data.code === 1) {
                        this.data = res.data.data
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        })
                    }
                })
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
                        boundaryGap: this.statisticsDays === 'day' ? false : true,
                        data: columns,
                        name: '日期'
                    },
                    yAxis: {
                        name: '用户数/(个)',
                    },
                    series: [
                        {
                            name: '用户数',
                            color: ['#7eb6ec'],
                            type: this.statisticsDays === 'day' ? 'line' : 'bar',
                            barMaxWidth: '40',
                            smooth: true,
                            data: data
                        }
                    ]
                })
            },
            goBack () {
                this.$router.go(-1)
            }
        },
        beforeRouteEnter (to, from, next) {
            next(vm => {
                vm.fromRouter = from.name
            })
        },
        created () {
            this.getData()
        },
        watch: {
            statisticsStatus (val) {
                if (val === 'all') {
                    this.drawLine(this.allData, this.columns)
                } else {
                    this.drawLine(this.registData, this.columns)
                }
            }
        }
    }
</script>
<style scoped>
    .p-right-6{
        padding-right: 6px;
    }
    .agent-detail-row > div {
        min-width: 200px;
    }
</style>
