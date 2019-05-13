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
                    <!-- 公司信息 -->
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
                    <div class="p-md clear">
                        <!--<div class="col-sm-12 col-md-6 p-v-sm">-->
                            <!--<div class="p-lg chart-container border" id="age-container"></div>-->
                        <!--</div>-->
                        <h5 class="border-bottom text-xxlg text-bold p-b-sm">用户信息</h5>
                        <div class="col-sm-12 col-md-6 p-v-sm">
                            <div class="p-lg chart-container border" id="region-container"></div>
                        </div>
                        <!--<div class="col-sm-12 col-md-6 p-v-sm">-->
                            <!--<div class="p-lg chart-container border" id="sex-container"></div>-->
                        <!--</div>-->
                    </div>
                    <div class="p-md clear">
                        <h5 class="border-bottom text-xxlg text-bold p-b-sm">广告效果</h5>
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
                                <el-tab-pane label="启动次数" name="times"></el-tab-pane>
                                <el-tab-pane label="日均启动" name="daytimes"></el-tab-pane>
                                <el-tab-pane label="日均时长" name="daylength"></el-tab-pane>
                                <el-tab-pane label="单次均时长" name="timelength"></el-tab-pane>
                            </el-tabs>
                            <!--<el-radio-group v-model="statisticsDays" size="small" class="days-select-container">-->
                                <!--<el-radio-button label="day">天</el-radio-button>-->
                                <!--<el-radio-button label="month">月</el-radio-button>-->
                            <!--</el-radio-group>-->
                            <div class="chart-container" id="statisticsChart"></div>
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
//            columns: [],
//            openData: [],
//            dayOpenData: [],
//            dayUseData: [],
//            onceUseData: [],
            checkLog: {
                items: []
            },
            loading: false,
            fromRouter: '',
            statisticsStatus: 'times',
        }),
        methods: {
            getData () {
                this.loading = true
                this.$http.get(api.agent.detail, {
                    params: {
                        id: this.$route.params.id,
                        type: 1,
                        start_time: format(this.start_time, 'YYYY-MM'),
                        end_time:  format(this.end_time, 'YYYY-MM')

                    }
                }).then(res => {
                    let that = this
                    setTimeout(function () {
                        that.loading = false
                    }, 500)
                    if (res.data.code === 1) {
                        this.data = res.data.data
                        this.data.region = this.data.region.map(val => {
                            return {
                                name: val.province,
                                value: val.num
                            }
                        })
                        this.$nextTick(() => {
//                            this.drawPie('age-container', this.data.age, '年龄分布情况')
                            this.drawPie('region-container', this.data.region, '省市分布情况')
//                            this.drawPie('sex-container', this.data.gender, '性别分布情况')
                        })
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        })
                    }
                })
            },
            drawPie (container, data, title) {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById(container))
                myChart.resize()
                // 绘制图表
                myChart.setOption({
                    title:{
                        text: title,//主标题文本，支持\n换行
                        left:'left',//离容器左侧的距离
                        top:'top'//距离容器上侧的距离
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c}人 (占{d}%)"
                    },
                    grid: {
                        left: '2%', // 图表距边框的距离
                        top: '10%',
                        right: '10%',
                        bottom: '15%',
                        containLabel: true
                    },
                    calculable : true,
                    series : [
                        {
                            name:'',
                            type:'pie',
                            radius : '65%',
                            center: ['50%', '60%'],
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
                if (val === 'times') {
                    this.drawLine(this.openData, this.columns, '启动次数')
                } else if (val === 'daytimes') {
                    this.drawLine(this.dayOpenData, this.columns, '启动次数')
                } else if (val === 'daylength') {
                    this.drawLine(this.dayUseData, this.columns, '时长(分钟)')
                } else if (val === 'timelength') {
                    this.drawLine(this.onceUseData, this.columns, '时长(分钟)')
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
