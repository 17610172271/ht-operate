<template>
    <div class="search-ipts-container time-range clear">
        <div class="search-item m-b-sm m-r-md p-l-n pull-left" v-for="item in searchOptions">
            <div v-if="item.type=='time'" class="clear">
                <div class="pull-left p-n search-name">{{item.name}}</div>
                <div class="pull-left p-n">
                    <el-date-picker
                        v-model="item.value"
                        type="datetimerange"
                        :picker-options="pickerOptions2"
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        align="left">
                    </el-date-picker>
                </div>
            </div>
            <div v-if="item.type=='time1'" class="clear">
                <div class="pull-left p-n search-name">{{item.name}}</div>
                <div class="pull-left p-n">
                    <el-date-picker
                        v-model="item.value"
                        type="daterange"
                        :picker-options="pickerOptions"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        align="left">
                    </el-date-picker>
                </div>
            </div>
        </div>
        <div class="search-btns pull-left m-b-sm p-l-n text-center">
            <a href="javascript:;" class="btn bg-blue1 text-white app-add m-r-sm" @click="submit">提交</a>
            <a href="javascript:;" class="btn bg-gray1 text-white app-add" @click="reset">重置</a>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        props: ['options', 'value'],
        data: () => ({
            searchOptions: [],
            pickerOptions: {
                shortcuts: [{
                    text: '今日',
                    onClick(picker) {
                        const end = new Date(new Date().setHours(0, 0, 0, 0))
                        const start = new Date(new Date().setHours(0, 0, 0, 0))
                        picker.$emit('pick', [start, end])
                    }
                }, {
                    text: '昨日',
                    onClick(picker) {
                        const end = new Date(new Date().setHours(0, 0, 0, 0))
                        const start = new Date(new Date().setHours(0, 0, 0, 0))
                        start.setTime(start - 3600 * 1000 * 24 * 1)
                        end.setTime(end - 3600 * 1000 * 24 * 1)
                        picker.$emit('pick', [start, end])
                    }
                }, {
                    text: '最近7天',
                    onClick(picker) {
                        const end = new Date(new Date().setHours(24, 0, 0, 0))
                        const start = new Date(new Date().setHours(0, 0, 0, 0))
                        start.setTime(start - 3600 * 1000 * 24 * 6)
                        end.setTime(end - 3600 * 1000 * 24 * 1)
                        picker.$emit('pick', [start, end])
                    }
                }, {
                    text: '最近30天',
                    onClick(picker) {
                        const end = new Date(new Date().setHours(24, 0, 0, 0))
                        const start = new Date(new Date().setHours(0, 0, 0, 0))
                        start.setTime(start - 3600 * 1000 * 24 * 29)
                        end.setTime(end - 3600 * 1000 * 24 * 1)
                        picker.$emit('pick', [start, end])
                    }
                }, {
                    text: '最近90天',
                    onClick(picker) {
                        const end = new Date(new Date().setHours(24, 0, 0, 0))
                        const start = new Date(new Date().setHours(0, 0, 0, 0))
                        start.setTime(start - 3600 * 1000 * 24 * 89)
                        end.setTime(end - 3600 * 1000 * 24 * 1)
                        picker.$emit('pick', [start, end])
                    }
                }]
            },
            pickerOptions2: {
                shortcuts: [{
                    text: '今日',
                    onClick(picker) {
                        const end = new Date(new Date().setHours(24, 0, 0, 0))
                        const start = new Date(new Date().setHours(0, 0, 0, 0))
                        picker.$emit('pick', [start, end])
                    }
                }, {
                    text: '昨日',
                    onClick(picker) {
                        const end = new Date(new Date().setHours(0, 0, 0, 0))
                        const start = new Date(new Date().setHours(0, 0, 0, 0))
                        start.setTime(start - 3600 * 1000 * 24 * 1)
                        picker.$emit('pick', [start, end])
                    }
                }, {
                    text: '最近7天',
                    onClick(picker) {
                        const end = new Date(new Date().setHours(24, 0, 0, 0))
                        const start = new Date(new Date().setHours(0, 0, 0, 0))
                        start.setTime(start - 3600 * 1000 * 24 * 6)
                        picker.$emit('pick', [start, end])
                    }
                }, {
                    text: '最近30天',
                    onClick(picker) {
                        const end = new Date(new Date().setHours(24, 0, 0, 0))
                        const start = new Date(new Date().setHours(0, 0, 0, 0))
                        start.setTime(start - 3600 * 1000 * 24 * 29)
                        picker.$emit('pick', [start, end])
                    }
                }, {
                    text: '最近90天',
                    onClick(picker) {
                        const end = new Date(new Date().setHours(24, 0, 0, 0))
                        const start = new Date(new Date().setHours(0, 0, 0, 0))
                        start.setTime(start - 3600 * 1000 * 24 * 89)
                        picker.$emit('pick', [start, end])
                    }
                }]
            }
        }),
        methods: {
            submit () {
                this.$emit('submit', this.searchOptions)
            },
            reset () {
                for (let i = 0; i < this.searchOptions.length; i++) {
                    this.searchOptions[i].value = null
                }
                this.$emit('submit', this.searchOptions)
            }
        },
        mounted () {
            this.searchOptions = this.options
        },
        watch: {}
    }
</script>
<style scoped>
    .search-name {
        height: 40px;
        line-height: 40px;
        padding-right: 10px;
        text-align: right;
        overflow: hidden;
    }

    .search-btns {
        padding-top: 5px;
    }

</style>