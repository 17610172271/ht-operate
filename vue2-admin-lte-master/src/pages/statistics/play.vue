<template>
    <div class="">
        <div class="p-lg">
            <sub-header :list="subNavList"></sub-header>
            <div class="page-container">
                <div class="clear p-v-md">
                    <div class="statistics-datas-item pull-left m-r-lg">
                        <h5 class="p-o-md">总播放次数:</h5>
                        <div class="p-v-sm text-30 text-center">{{data.total_play}} 个</div>
                    </div>
                    <div class="statistics-datas-item pull-left m-r-lg">
                        <h5 class="p-o-md">本周播放次数:</h5>
                        <div class="p-v-sm text-30 text-center">{{data.week_play}} 个</div>
                    </div>
                    <div class="statistics-datas-item pull-left">
                        <h5 class="p-o-md">本月播放次数:</h5>
                        <div class="p-v-sm text-30 text-center">{{data.month_play}} 个</div>
                    </div>
                </div>
                <div class="m-t-md">
                    <h5 class="border-bottom text-bold text-xxlg p-v-sm">区域影院播放统计</h5>
                    <div class="clear flex p-v-md">
                        <div id="agentNum-chart" class="chart-container col-xs-12 col-lg-8 p-n"></div>
                        <div class="col-xs-12 col-lg-3 p-n" style="max-width: 320px;">
                            <div class="text-bold text-xxlg m-b-sm">各区域影院播放排名</div>
                            <div class="rank-item clear flex" v-for="(item, index) in rankList">
                                <div class="rank-num col-xs-3 p-n m-t-sm" style="max-width: 20px;" :class="{'bg-dark text-white': index < 3}">{{index + 1}}</div>
                                <div class="col-xs-6 p-n over-omit"> {{item.region_name}}</div>
                                <div class="col-xs-3 p-n text-center" style="padding: 0 10px;">{{item.play_num}}</div>
                            </div>
                        </div>
                    </div>
                    <h5 class="border-bottom text-bold text-xxlg p-v-sm m-t-md">各区域影院播放影片统计</h5>
                    <div class="clear m-t-md">
                        <div class="pull-left" style="padding:14px;">选择区域: </div>
                        <div class="pull-left p-sm">
                            <el-select v-model="region_id" size="mini" placeholder="请选择区域">
                                <el-option
                                    v-for="item in regionList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div id="agentCinema-chart" class="chart-container"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import SubHeader from '../common/subheader'
    import api from '@/api'
    import sort from '@/tools/sort'
    export default {
        data: () => ({
            data: '',
            region_id: '',
            regionList: [],
            rankList: [],
            subNavList: {
                parentNode: {
                    name: '数据统计',
                    router: {
                        name: 'statistics_agent'
                    }
                },
                childNode: {
                    name: '播放统计',
                    desc: '主要用于播放量的查看及统计',
                    router: {
                        name: 'statistics_play'
                    }
                }
            }
        }),
        components: {
            SubHeader
        },
        methods: {
            getData () {
                this.$http.post(api.statistics.play, {
                    region_id: this.region_id
                }).then(res => {
                    if (res.data.code === 1) {
                        this.data = res.data.data
                        // 处理代理商统计数据
                        let data = []
                        let column = []
                        this.data.region_cimena_play.map(val => {
                            data.push(val.play_num)
                            column.push(val.region_name)
                        })
                        // 处理代理商排名数据
                        this.rankList = this.data.region_cimena_play.sort(sort('play_num'))
                        // 处理代理商影院数据
                        let data1 = []
                        let column1 = []
                        this.data.region_cinema_film_play.map(val => {
                            data1.push(val.film_play_num)
                            column1.push(val.cinema_name)
                        })
                        // 画图
                        this.drawChart('agentNum-chart', '各区域影院统计', data, column)
                        this.drawChart('agentCinema-chart', '各区域影院播放影片统计', data1, column1)
                    } else {
                        this.$message.error(res.data.msg)
                    }
                })
            },
            getOptions () {
                this.$http.post(api.common.getCity, {
                    status: 1
                }).then(res => {
                    if (res.data.code === 1) {
                        this.regionList = res.data.data.map(val => {
                            return {
                                label: val.name,
                                value: val.id
                            }
                        })
                        this.region_id = this.regionList[0].value
                    } else {
                        this.regionList = []
                    }
                })
            },
            drawChart (container, title, data, column) {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById(container))
                // 绘制图表
                myChart.setOption({
                    title : {
                        text: title,
                        left: 'center'
                    },
                    tooltip: {trigger: 'axis'},
                    grid: {
                        left: '2%', // 图表距边框的距离
                        top: '20%',
                        right: '10%',
                        bottom: '15%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
//                        boundaryGap: false,
                        data: column
                    },
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series: [
                        {
                            name: '数量',
                            color: ['#7cb5ec'],
                            barMaxWidth: '40',
                            type: 'bar',
                            data: data
                        }
                    ]
                })
                myChart.resize()
            }
        },
        created () {
            this.getData()
            this.getOptions()
        },
        watch: {
            region_id (val) {
                this.getData()
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

    .rank-item {
        height: 40px;
        line-height: 40px;
        font-size: 16px;
    }
    .rank-num {
        display: inline-block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #f0f2f5;
        line-height: 20px;
        text-align: center;
        margin-right: 20px;
    }
    .bg-dark {
        background-color: #314659;
    }
</style>
