<template>
    <div class="">
        <div class="p-lg">
            <sub-header :list="subNavList"></sub-header>
            <div class="page-container">
                <div class="clear p-v-md">
                    <div class="statistics-datas-item pull-left m-r-lg">
                        <h5 class="p-o-md">影院总数:</h5>
                        <div class="p-v-sm text-30 text-center">{{data.total_cinema}} 个</div>
                    </div>
                    <div class="statistics-datas-item pull-left">
                        <h5 class="p-o-md">本月新增影院:</h5>
                        <div class="p-v-sm text-30 text-center">{{data.month_cinema}} 个</div>
                    </div>
                </div>
                <div class="m-t-md">
                    <h5 class="border-bottom text-bold text-xxlg p-v-sm">影院统计</h5>
                    <div class="clear flex p-v-md">
                        <div id="agentNum-chart" class="chart-container col-xs-12 col-lg-8 p-n"></div>
                        <div class="col-xs-12 col-lg-3 p-n" style="max-width: 320px;">
                            <div class="text-bold text-xxlg m-b-sm">各区域影院排名</div>
                            <div class="rank-item clear flex" v-for="(item, index) in rankList">
                                <div class="rank-num col-xs-3 p-n m-t-sm" style="max-width: 20px;" :class="{'bg-dark text-white': index < 3}">{{index + 1}}</div>
                                <div class="col-xs-6 p-n over-omit"> {{item.region_name}}</div>
                                <div class="col-xs-3 p-n text-center" style="padding: 0 10px;">{{item.cinema_num}}</div>
                            </div>
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
    import sort from '@/tools/sort'
    export default {
        data: () => ({
            data: '',
            rankList: [],
            subNavList: {
                parentNode: {
                    name: '数据统计',
                    router: {
                        name: 'statistics_agent'
                    }
                },
                childNode: {
                    name: '影院统计',
                    desc: '主要用于影院的查看及统计',
                    router: {
                        name: 'statistics_cinema'
                    }
                }
            }
        }),
        components: {
            SubHeader
        },
        methods: {
            getData () {
                this.$http.post(api.statistics.cinema).then(res => {
                    if (res.data.code === 1) {
                        this.data = res.data.data
                        // 处理影院统计数据
                        let data = []
                        let column = []
                        this.data.region_cinema.map(val => {
                            data.push(val.cinema_num)
                            column.push(val.region_name)
                        })
                        // 处理影院排名数据
                        this.rankList = this.data.region_cinema.sort(sort('cinema_num'))
                        // 画图
                        this.drawChart('agentNum-chart', '各区域影院统计', data, column) // 影院统计图
                    } else {
                        this.$message.error(res.data.msg)
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
                    tooltip: {
                        trigger: 'axis',
                        formatter: '{b} <br/>{a} : {c} 个'
                    },
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
                        data: column,
                        name: '区域'
                    },
                    yAxis : [
                        {
                            type : 'value',
                            name: '数量'
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
        },
        watch: {
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
