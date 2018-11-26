<template>
    <div class="animated fadeIn">
        <div class="home-content"  v-loading="loading">
            <div class="today-data">
                <h3>平台概述<span class="text-lg">平台数据统计</span></h3>
                <div class="container-fluid m-t-md">
                    <div class="row flex">
                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 p-r-sm p-n">
                            <div class="home-data-item">
                                <div class="data-item-icon bg-blue1"><i class="fa fa-users"></i></div>
                                <div class="text-md data-item-title">代理商</div>
                                <div class="text-lg data-item-content"><span
                                    class="text-bold text-xlg">{{data.agent}}</span> 家
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 p-r-sm p-n">
                            <div class="home-data-item">
                                <div class="data-item-icon bg-green"><i class="fa fa-film"></i>
                                </div>
                                <div class="text-md data-item-title">影院</div>
                                <div class="text-lg data-item-content" v-if="data.cinema < 10000"><span
                                    class="text-bold text-xlg">{{data.cinema}}</span> 家
                                </div>
                                <div class="text-lg data-item-content" v-else><span class="text-bold text-xlg">{{parseInt(data.cinema/100)/100}}</span>
                                    万家
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 p-r-sm p-n">
                            <div class="home-data-item">
                                <div class="data-item-icon bg-orange"><i class="fa fa-caret-square-o-right text-42"></i></div>
                                <div class="text-md data-item-title">影厅</div>
                                <div class="text-lg data-item-content" v-if="data.hall<10000"><span
                                    class="text-bold text-xlg">{{data.hall}}</span> 间
                                </div>
                                <div class="text-lg data-item-content" v-else><span class="text-bold text-xlg">{{parseInt(data.hall/100)/100}}</span>
                                    万间
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 p-r-sm p-n">
                            <div class="home-data-item">
                                <div class="data-item-icon bg-yellow"><i class="fa fa-video-camera"></i></div>
                                <div class="text-md data-item-title">未绑定设备</div>
                                <div class="text-lg data-item-content" v-if="data.device<10000"><span
                                    class="text-bold text-xlg">{{data.device}}</span> 台
                                </div>
                                <div class="text-lg data-item-content" v-else><span class="text-bold text-xlg">{{parseInt(data.device/100)/100}}</span>
                                    万台
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 p-r-sm p-n">
                            <div class="home-data-item">
                                <div class="data-item-icon bg-red"><i class="fa fa-cny text-42"></i></div>
                                <div class="text-md data-item-title">成交金额</div>
                                <div class="text-lg data-item-content" v-if="data.total_income<10000"><span
                                    class="text-bold text-xlg">{{data.total_income}}</span> 元
                                </div>
                                <div class="text-lg data-item-content" v-else><span class="text-bold text-xlg">{{parseInt(data.total_income/100)/100}}</span>
                                    万元
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <h3 class="p-v-md" style="margin-top: 30px;">数据统计</h3>
            <div class="home-chart bg-white">
                <div class="home-chart-title clear">
                    <div class="pull-left text-xxlg p-l-lg today-chart-title"><span
                        class="fa fa-calendar-check-o m-r-15"></span>订单统计图
                    </div>
                    <ul class="pull-right clear text-xlg show-days hidden-xs">
                        <li class="pull-left p-o-md cursor-p"
                            :class="{'chart-selected': !$route.query.chartData || $route.query.chartData==7}"
                            @click="drawLine(7)">最近7天
                        </li>
                        <li class="pull-left p-o-md cursor-p" :class="{'chart-selected': $route.query.chartData==15}"
                            @click="drawLine(15)">最近15天
                        </li>
                        <li class="pull-left p-o-md cursor-p b-r-n"
                            :class="{'chart-selected': $route.query.chartData==30}" @click="drawLine(30)">最近30天
                        </li>
                    </ul>
                    <ul class="pull-right clear text-xlg show-days hidden-sm hidden-md hidden-lg">
                        <li class="pull-left p-o-md cursor-p"
                            :class="{'chart-selected': !$route.query.chartData || $route.query.chartData==7}"
                            @click="drawLine(7)">7天
                        </li>
                        <li class="pull-left p-o-md cursor-p" :class="{'chart-selected': $route.query.chartData==15}"
                            @click="drawLine(15)">15天
                        </li>
                        <li class="pull-left p-o-md cursor-p b-r-n"
                            :class="{'chart-selected': $route.query.chartData==30}" @click="drawLine(30)">30天
                        </li>
                    </ul>
                </div>
                <div id="homeChart" class="chart-container"></div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import api from '@/api'
    import { mapGetters, mapActions } from 'vuex'
    export default {
        components: {},
        name: 'dashboard',
        data () {
            return {
                address: '北京/北京/朝阳区',
                loading: false,
                data: {
                    agent: 0,
                    cinema_line: 0,
                    cinema: 0,
                    hall: 0,
                    device: 0,
                    total_income: 0,
                    statis: {},
                    equip_distrib: []
                },
                enterData: [],
                checkData: []
            }
        },
        computed: {
            ...mapGetters([
                'getNavList'
            ])
        },
        methods: {
            getData () {
                 this.loading = true
                 this.$http.post(api.home.home, {
                     period: this.$route.query.chartData || 7
                 }).then(res => {
                     let that = this
                     setTimeout(function () {
                         that.loading = false
                     }, 500)
                     if (res.data.code === 1) {
                         this.data = res.data.data
                         this.$nextTick(function () {
                             this.drawLine(this.$route.query.chartData)
                         })
                         // this.changeChartsData()
                     } else {
                         this.loading = false
                         this.$message({
                             type: 'warning',
                             message: res.data.msg
                         })
                     }
                 })
            },
            getNav () {
                this.$http.get(api.account.getRight).then(res => {
                    if (res.data.code === 1) {
                        this.saveNavList(res.data.data)
                        window.localStorage.setItem('navList', JSON.stringify(res.data.data))
                    }
                })
            },
            ...mapActions([
                'saveNavList'
            ]),
            drawLine (id = 7) {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('homeChart'))
                this.$router.replace({name: 'home', query: {chartData: id}})
                let column = this.data.statis.date
                let order = this.data.statis.day_order
                let play = this.data.statis.day_play
                // 绘制图表
                myChart.setOption({
                    tooltip: {trigger: 'axis'},
                    legend: {
                        data: ['订单量', '播放量'],
                        x: 'center',
                        y: 'bottom'
                    },
                    grid: {
                        left: '2%', // 图表距边框的距离
                        top: '20%',
                        right: '4%',
                        bottom: '15%',
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
                            name: '订单量',
                            color: ['#fcd683'],
                            type: 'line',
                            smooth: true,
                            itemStyle: {normal: {areaStyle: {type: 'default'}}},
                            data: order
                        },
                        {
                            name: '播放量',
                            color: ['#9fc7f3'],
                            type: 'line',
                            smooth: true,
                            itemStyle: {normal: {areaStyle: {type: 'default'}}},
                            data: play
                        }
                    ]
                })
                myChart.resize()
            }
        },
        created () {
            this.getData()
            this.getNav()
        },
        mounted () {
            let that = this
            window.addEventListener('resize', function () {
                that.$nextTick(function () {
                    that.drawLine()
                })
            })
        },
        watch: {
            '$route.query' (val) {
                this.getData()
            }
        }
    }
</script>

<style scoped>
    .chart-container {
        height: 300px;
    }
    .text-42 {
        font-size: 42px !important;
    }
    .home-container {
        height: 100%;
    }

    .home-content {
        padding: 30px 30px 0 30px;
        padding-right: 20px;
    }

    .home-content h3 {
        font-size: 22px;
        color: #434343;
        margin: 0;
    }

    .home-content h3 > span {
        color: #666;
        margin-left: 8px;
    }

    .home-data-item {
        height: 80px;
        padding: 14px 0px 0px 80px;
        width: 100%;
        /*margin-right: 1.6%;*/
        display: inline-block;
        box-shadow: 1px 0px 1px rgba(187, 187, 187, 0.75);
        border-radius: 2px;
        color: #333;
        text-align: center;
        position: relative;
        cursor: pointer;
    }

    .home-data-item:hover {
        box-shadow: 1px 0px 10px rgba(187, 187, 187, 0.75);
    }

    .data-item-title {
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
    }

    .data-item-content {
        font-size: 16px;
        margin-top: 15px;
    }

    .data-item-icon {
        width: 80px;
        height: 80px;
        position: absolute;
        top: 0;
        left: 0;
    }

    .data-item-icon .fa {
        font-size: 30px;
        color: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .data-item-icon .fa.text-40 {
        font-size: 40px;
    }

    .p-r-sm.p-n {
        padding: 0;
        padding-right: 15px;
    }

    /*图表*/
    .home-chart-title {
        height: 60px;
        line-height: 60px;
    }

    .home-chart-title .fa-calendar-check-o {
        vertical-align: 2px;
    }

    .home-chart {
        height: 380px;
    }

    .home-chart-title {
        border: 1px solid #ddd;
    }

    .chart-selected {
        border: 1px solid #ddd;
        border-top: 3px solid #3691F5;
        border-bottom: 1px solid #fff;
        background-color: #fff;
        margin-top: -4px;
    }

    .home-chart-title .b-r-n {
        border-right: none;
    }

    .data-icon-size {
        font-size: 44px;
    }

    .today-data-xs {
        font-size: 14px;
    }

    .today-data-xs > span {
        font-size: 14px;
        float: right;
    }

    @media (max-width: 768px) {
        /*图表*/
        .chart-container {
            height: 240px;
        }

        .home-chart {
            height: 330px;
        }

        .home-content {
            padding: 15px;
        }

        .home-content h3 {
            font-size: 16px;
        }

        .home-content h3 > span {
            font-size: 12px;
        }

        .home-content .today-data h3 {
            margin-bottom: 20px;
        }

        .data-col-item {
            padding-right: 5px;
        }
    }

    @media (min-width: 768px) and (max-width: 1200px) {
        .home-data-item {
            margin-top: 20px;
        }
    }
</style>
