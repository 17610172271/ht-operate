<template>
    <div class="animated fadeIn  bg-white home-container">
        <div class="p-md"  v-loading="loading">
            <div class="today-data border-bottom p-b-lg">
                <div class="texxxxt-lg">平台概述</div>
                <div class="container-fluid m-t-md">
                    <div class="row align-bottom flex  p-o-lg">
                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 p-r-sm p-n" >
                            <div class="home-data-item bg-white p-smone " style="background-image: url('../../../static/img/home/yellow.png')">
                                <h5 class="m-n text-white text-left"><span class="text-font-16 m-l-10">代理商总数</span> <span class="fa fa-info-circle pull-right m-r-10"></span></h5>
                                <div class="text-bold p-v-sm1" style="margin: 0 auto"><span class="text-xxxlg">{{data.agent_num || 0}}</span> <span class="text-w-20">个</span></div>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 p-r-sm p-n">
                            <div class="home-data-item bg-white p-smone" style="background-image: url('../../../static/img/home/blue.png')">
                                <h5 class="m-n text-white text-left"><span class="text-font-16 m-l-10">影院总数</span> <span class="fa fa-info-circle pull-right m-r-10"></span></h5>
                                <div class="text-bold p-v-sm1"><span class="text-xxxlg">{{data.cinema_num || 0}} </span><span class="text-w-20">个</span></div>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 p-r-sm p-n">
                            <div class="home-data-item bg-white p-smone" style="background-image: url('../../../static/img/home/green.png')">
                                <h5 class="m-n text-white text-left"><span class="text-font-16 m-l-10">本月播放次数</span> <span class="fa fa-info-circle pull-right m-r-10"></span></h5>
                                <div class="text-bold p-v-sm1"><span class="text-xxxlg">{{data.month_play_num || 0}}</span> <span class="text-w-20">次</span></div>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 p-r-sm p-n">
                            <div class="home-data-item bg-white p-smone" style="background-image: url('../../../static/img/home/red.png')">
                                <h5 class="m-n text-white text-left"><span class="text-font-16 m-l-10">待审核</span> <span class="fa fa-info-circle pull-right m-r-10"></span></h5>
                                <div class="text-bold p-v-sm1"><span class="text-xxxlg">{{data.wait_check_num || 0}}</span> <span class="text-w-20">个</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="texxxxt-lg">播放统计</div>
            <div class="border-bottom relative p-o-md">
                <el-radio-group v-model="incomeDays" size="large" class="days-select-container">
                    <el-radio-button :label="1">本月</el-radio-button>
                    <el-radio-button :label="2">上月</el-radio-button>
                    <el-radio-button :label="3">其他</el-radio-button>
                </el-radio-group>
                <el-select v-model="value" placeholder="请选择" class="month-select-container" v-show="incomeDays===3">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :disabled="item.disabled"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <div class="chart-container" id="incomeChart"></div>
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
//                statisticsStatus: 'films',
//                statisticsDays: 7,
                incomeDays: 1,   //按钮切换
                data: {
                    agent_num: 0,  //代理商初始数据
                    cinema_num: 0,  //影院总数初始数据
                    wait_check_num: 0,   //待审核初始数据
                    month_play_num: 0,  //本月播放数量初始数据
                    play_list: {
                        day: [],   //日
                        num: [],   //播放数量
                    },
                    hall_status: [],
                    reservation_film: []
                },
                options: [],
                value: 1,
                month: ''
            }
        },
        methods: {
            getChartData (month) {
                this.$http.post(api.home.home, {
                    month:month
                }).then(res => {
                    if (res.data.code === 1) {
                        this.data = res.data.data
                        let column = []
                        let datas = []
                        this.data.play_list.map(val => {
                            column.push(val.day)
                            datas.push(val.num)
                        })
                        this.drawLine('incomeChart', '', '播放次数', datas, column)
                    } else {
                        this.loading = false
                        this.$message({
                            type: 'warning',
                            message: res.data.msg
                        })
                    }
                })
            },
            drawLine (container, title, unit, data, column) {
                let myChart = this.$echarts.init(document.getElementById(container))
                // 绘制图表
                myChart.setOption({
                    title:{
                        text: '',//主标题文本，支持\n换行
                        left:'left',//离容器左侧的距离
                        top:'top'//距离容器上测的距离
                    },
                    tooltip: {
                        trigger: 'axis',
                        formatter: '日期: {b} <br/>{a} : {c} 次'
                    },
                    grid: {
                        left: '2%', // 图表距边框的距离
                        top: '20%',
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
                            name: unit,
                            color: ['#7eb6ec'],
                            type: 'line',
                            smooth: true,
                            axisLabel: {
                                formatter: '(次)'
                            },
//                            itemStyle: {normal: {areaStyle: {type: 'default'}}},
                            data: data
                        }
                    ]
                })
                myChart.resize()
            },
            getOptions () {
                let date = new Date()
                this.month = date.getMonth() + 1
                for (let i = 0; i < 12; i++) {
                    this.options.push({
                        label: i + 1 + '月',
                        value: i + 1,
                        disabled: this.month < i + 1
                    })
                }
            }
        },
        created () {
            this.getOptions()
            this.getChartData(this.month)
        },
//        mounted () {
//            let that = this
//            window.addEventListener('resize', function () {
//                that.$nextTick(function () {
//                    that.drawLine('statisticsChart', '播放统计', '日', [66, 80, 56, 120], ['1-1', '1-2', '1-3', '1-4'])
//                })
//            })
//        },
        watch: {
            incomeDays (val) {
                let month = val === 1 ? this.month : (val === 2 ? this.month - 1 : this.value)
                this.getChartData(month)
            },
            value (val) {
                this.getChartData(val)
            }
        }
    }
</script>

<style scoped>
    .home-container h3 {
        font-size: 22px;
    }
    .chart-container {
        height: 400px;
    }
    .days-select-container {
        position: absolute;
        top: 22px;
        right: 30px;
        z-index: 999;
    }
    .month-select-container {
        position: absolute;
        width: 90px;
        top: 22px;
        right: 250px;
        z-index: 999;;
    }
    .home-data-item {
        height: 130px;
        padding: 4px 10px 0px 10px;
        width: 100%;
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

    .hall-item-container {
        width: 260px;
        height: 130px;
        border: 4px solid #e4e4e4;
        border-radius: 15px;
        margin: 0 50px 40px 0;
    }
    .m-l-35 {
        margin-left: 35px;
    }
    .border-size{
        border: 3px solid rgb(228,228,228);
    }
    .text-xxxlg{
        color: whitesmoke;
        font-size: 36px;
    }
    .picker_one{
        width: 100px;
        height: 20px;
    }
    .text-w-20{
        color: whitesmoke;
        font-size: 20px;
    }
    .text-font-16{
        font-size: 16px;
    }
    .texxxxt-lg{
        font-size: 23px;
        font-weight: 400;
        margin-top: 10px;
    }
    .m-r-10{
        margin-right: 10px;
    }
    .m-l-10{
        margin-left: 7px;
    }
</style>
