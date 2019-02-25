<template>
    <div v-loading="loading">
        <div class="p-lg">
            <sub-header :list="subNavList"></sub-header>
            <div class="page-container">
                <div class="clear p-v-md">
                    <div class="statistics-datas-item pull-left m-r-lg">
                        <h5 class="p-o-md">总收入:</h5>
                        <div class="p-v-sm text-xxlg text-center">¥ {{format(data.total_income || 0)}}</div>
                    </div>
                    <div class="statistics-datas-item pull-left m-r-lg">
                        <h5 class="p-o-md">航天总收益:</h5>
                        <div class="p-v-sm text-xxlg text-center">¥ {{format(data.ht_total_profit || 0)}}</div>
                    </div>
                    <div class="statistics-datas-item pull-left">
                        <h5 class="p-o-md">待结算金额:</h5>
                        <div class="p-v-sm text-xxlg text-center">¥ {{format(data.wait_settlement || 0)}}</div>
                    </div>
                </div>
                <div class="m-t-md">
                    <el-radio-group v-model="tabVal" size="medium">
                        <el-radio-button label="first" >总收入</el-radio-button>
                        <el-radio-button label="second">航天收益</el-radio-button>
                    </el-radio-group>
                    <div class="chart-container m-t-md" id="defaultChart">

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
    import format from '@/tools/formatMoney'
    export default {
        //组件
        components: {
            SelectCheckbox,
            SearchIpts,
            SubHeader
        },
        data: () => ({
            loading: false,
            data: {},
            tabVal: 'first',
            month: [],
            income: [],
            profit: [],
            subNavList: {
                parentNode: {
                    name: '财务管理',
                    router: {
                        name: 'financial_statistics'
                    }
                },
                childNode: {
                    name: '财务统计',
                    desc: '主要用于财务数据统计',
                    router: {
                        name: 'financial_statistics'
                    }
                }
            },
        }),
        methods: {
            getData () {
                this.$http.post(api.financial.statistics).then(res => {
                    if (res.data.code === 1) {
                        this.data = res.data.data
                        this.month = []
                        this.income = []
                        this.profit = []
                        this.data.items.map(val => {
                            this.month.push(val.month)
                            this.income.push(val.income)
                            this.profit.push(val.profit)
                        })

                        if (this.tabVal === 'first') {
                            this.drawChart('defaultChart', '总收入统计图表', this.income, this.month)
                        } else {
                            this.drawChart('defaultChart', '航天收益统计图表', this.profit, this.month)
                        }
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
                        formatter: '月份: {b} <br/>{a} : {c} 元'
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
                        data: column
                    },
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series: [
                        {
                            name: '金额',
                            color: ['#7cb5ec'],
                            barMaxWidth: '40',
                            type: 'bar',
                            data: data
                        }
                    ]
                })
                myChart.resize()
            },
            format: format
        },
        mounted () {
            this.getData()
        },
        watch: {
            tabVal (val) {
                if (val === 'first') {
                    this.drawChart('defaultChart', '总收入统计图表', this.income, this.month)
                } else {
                    this.drawChart('defaultChart', '航天收益统计图表', this.profit, this.month)
                }
            }
        }
    }
</script>
<style scoped>
    .statistics-datas-item {
        width: 200px;
        height: 110px;
        border: 1px solid #999;
        border-radius: 15px;
    }
</style>
