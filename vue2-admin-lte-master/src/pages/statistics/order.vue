<template>
    <div class="p-lg">
        <sub-header :list="subNavList"></sub-header>
        <div class="page-container">
            <h5 class="text-xlg text-bold">数据统计</h5>
            <div class="p-sm clear">
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4 p-r-sm p-n">
                    <div class="home-data-item">
                        <div class="data-item-icon bg-blue1"><i class="fa fa-list-alt text-42"></i></div>
                        <div class="text-md data-item-title">订单数量</div>
                        <div class="text-lg data-item-content" v-if="data.order_num<10000"><span
                            class="text-bold text-xlg">{{data.order_num}}</span> 单
                        </div>
                        <div class="text-lg data-item-content" v-else><span class="text-bold text-xlg">{{parseInt(data.order_num / 100)/100}}</span>
                            万单
                        </div>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4 p-r-sm p-n">
                    <div class="home-data-item">
                        <div class="data-item-icon bg-green1"><i class="fa fa-gg text-42"></i></div>
                        <div class="text-md data-item-title">成交金额</div>
                        <div class="text-lg data-item-content" v-if="data.income_money<10000"><span
                            class="text-bold text-xlg">{{data.income_money}}</span> 元
                        </div>
                        <div class="text-lg data-item-content" v-else><span class="text-bold text-xlg">{{parseInt(data.income_money / 100)/100}}</span>
                            万元
                        </div>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4 p-r-sm p-n">
                    <div class="home-data-item">
                        <div class="data-item-icon bg-yellow1"><i class="fa fa-caret-square-o-right"></i>
                        </div>
                        <div class="text-md data-item-title">影片播放次数</div>
                        <div class="text-lg data-item-content" v-if="data.play_num < 10000"><span
                            class="text-bold text-xlg">{{data.play_num}}</span> 次
                        </div>
                        <div class="text-lg data-item-content" v-else><span class="text-bold text-xlg">{{parseInt(data.play_num/100)/100}}</span>
                            万次
                        </div>
                    </div>
                </div>
            </div>
            <div class="m-t-lg row">
                <div class="col-xs-12 col-lg-12 echarts-item" id="orderChart"></div>
                <div class="col-xs-12 col-lg-6 echarts-item m-t-lg" id="areaChart"></div>
                <div class="col-xs-12 col-lg-6 echarts-item m-t-lg">
                    <div class="switch-container">
                        <h5>订单的转化</h5>
                        <div class="regist-box switch-item bg-blue1">注册用户 {{data.ladder_statistics.registered_users}}</div>
                        <div class="browse-box switch-item bg-green1">浏览用户 {{data.ladder_statistics.browse_user}}</div>
                        <div class="appointment-box switch-item bg-yellow1">预约用户 {{data.ladder_statistics.appointment_user}}</div>
                        <div class="paid-box switch-item bg-qing">支付订单 {{data.ladder_statistics.pay_order}}</div>
                        <div class="finished-box switch-item bg-orange1">完成交易 {{data.ladder_statistics.finish_order}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import SubHeader from '../common/subheader'
    import api from '@/api'
    export default {
        data: () => ({
            data: {
                ladder_statistics: {
                    ladder_statistics: 0,
                    browse_user: 0,
                    appointment_user: 0,
                    pay_order: 0,
                    finish_order: 0
                }
            },
            subNavList: {
                parentNode: {
                    name: '数据统计',
                    router: {
                        name: 'statistics_order'
                    }
                },
                childNode: {
                    name: '订单统计',
                    desc: '主要用于订单的查看及统计',
                    router: {
                        name: 'statistics_order'
                    }
                }
            }
        }),
        components: {
            SubHeader
        },
        methods: {
            getData () {
                this.$http.post(api.statistics.order).then(res => {
                    if (res.data.code === 1) {
                        this.data = res.data.data
                        this.drawOrder()
                        this.drawOrderArea()
                    } else {
                        this.data = {
                            ladder_statistics: {
                                ladder_statistics: 0,
                                browse_user: 0,
                                appointment_user: 0,
                                pay_order: 0,
                                finish_order: 0
                            }
                        }
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        })
                    }
                })
            },
            drawOrder () {
                // 订单统计
                let myChart = this.$echarts.init(document.getElementById('orderChart'))
                let column = this.data.order_statistics.date
                let day_finish_order = this.data.order_statistics.day_finish_order
                let day_order = this.data.order_statistics.day_order
                // 绘制图表
                let option = {
                    title : {
                        text: '订单统计',
                        left: 'left',//离容器左侧的距离
                        top: 'top'//距离容器上测的距离
                    },
                    tooltip: {trigger: 'axis'},
                    legend: {
                        data: ['订单数量', '成交订单'],
                        x: 'center',
                        y: 'bottom'
                    },
                    grid: {
                        left: '2%', // 图表距边框的距离
                        top: '15%',
                        right: '4%',
                        bottom: '10%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: column
                    },
                    yAxis: {},
                    series: [
                        {
                            name: '订单数量',
                            color: ['#fcd683'],
                            type: 'line',
                            smooth: true,
                            itemStyle: {normal: {areaStyle: {type: 'default'}}},
                            data: day_order
                        },
                        {
                            name: '成交订单',
                            color: ['#9fc7f3'],
                            type: 'line',
                            smooth: true,
                            itemStyle: {normal: {areaStyle: {type: 'default'}}},
                            data: day_finish_order
                        }
                    ]
                }
                myChart.setOption(option)
                myChart.resize()
            },
            drawOrderArea () {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('areaChart'))
                // 绘制图表
                let newData = []
                for (let key in this.data.equip_distrib) {
                    newData.push({
                        name: key,
                        value: this.data.equip_distrib[key]
                    })
                }
                let option = {
                    title: {
                        text: '订单分布地区',//主标题文本，支持\n换行
                        left: 'left',//离容器左侧的距离
                        top: 'top'//距离容器上测的距离
                    },
                    color: ['#ed7d31', '#5b9bd5', '#a5a5a5', '#FF9566', '#4472c4', '#9C6448', '#FFBC6C', '#9E96EA', '#9EEA42', '#A1B1BE', '#96CEEA', '#7BD6B1', '#4EA8F2', '#FF9566', '#F9E385', '#9C6448', '#FFBC6C', '#9E96EA', '#9EEA42', '#A1B1BE', '#96CEEA', '#7BD6B1', '#4EA8F2', '#FF9566', '#F9E385', '#9C6448', '#FFBC6C', '#9E96EA', '#9EEA42', '#A1B1BE'],
                    legend: {
                        borderColor: '#ccc',
                        borderWidth: 0,
                        y: 'bottom',
                        padding: 5,
                    },
                    tooltip: {    //鼠标移入,显示气泡
                        trigger: 'item',
                        formatter: function (p) {
                            return p.data.name + ' ' + p.percent + '%'
                        }
                    },
                    textStyle: {
                        color: 'rgba(0, 0, 0)'//文字的颜色
                    },
                    series: [
                        {
                            name: '订单分布地区',
                            type: 'pie',//每个系列，通过type决定自己的系列型号
                            radius: '50%',
                            center: ['50%', '50%'],
                            selectedMode: 'single',
                            data: newData,
                            itemStyle: {
                                normal: {
                                    borderColor: '#fff',
                                    borderWidth: 1,
                                    label: {
                                        show: true,
                                        formatter: '{b}, {c}, {d}%'
                                    },
                                    labelLine: {show: true}
                                },
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }

                            }
                        }
                    ]
                }
                myChart.setOption(option)
            }
        },
        created () {
            this.page = this.$route.query.page ? parseInt(this.$route.query.page) : 1
            this.getData()
        },
        mounted () {
            let that = this
            window.addEventListener('resize', function () {
                that.$nextTick(function () {
                    that.drawOrder()
                    that.drawOrderArea()
                })
            })
        },
    }
</script>
<style scoped>
    .echarts-item {
        height: 300px;
        padding: 0 10px;
    }
    .switch-container h5 {
        font-size: 18px;
        font-weight: 700;
        margin: 5px 0 15px 0;
    }
    .switch-container .switch-item {
        height: 50px;
        border: 1px solid #999;
        margin: 0 auto;
        line-height: 48px;
        text-align: center;
    }
    .regist-box {
        width: 50%;
    }
    .browse-box {
        width: 42%;
    }
    .appointment-box {
        width: 34%;
    }
    .paid-box {
        width: 26%;
    }
    .finished-box {
        width: 18%;
    }
</style>
