<template>
    <div class="search-ipts-container clear">
        <div class="search-item col-xs-4 m-b-sm p-l-n" :class="{'col-md-6 col-lg-6': item.type=='city'}" v-for="item in searchOptions">
            <div v-if="item.type=='text'">
                <div class="col-xs-4 p-n search-name">{{item.name}}</div>
                <div class="col-xs-8 p-n">
                    <el-input
                        :placeholder="item.name"
                        v-model="item.value"
                        clearable>
                    </el-input>
                </div>
            </div>
            <div v-if="item.type=='time'">
                <div class="col-xs-4 p-n search-name">{{item.name}}</div>
                <div class="col-xs-8 p-n">
                    <el-date-picker
                        v-model="item.value"
                        type="date"
                        value-format="yyyy-MM-dd"
                        style="width: 100%;"
                        clearable
                        placeholder="选择日期"
                        :picker-options="pickerOptions1">
                    </el-date-picker>
                </div>
            </div>
            <div v-if="item.type=='select'">
                <div class="col-xs-4 p-n search-name">{{item.name}}</div>
                <div class="col-xs-8 p-n">
                    <el-select v-model="item.value" placeholder="请选择" style="width: 100%;" clearable>
                        <el-option
                            v-for="option in item.options"
                            :key="option.value"
                            :label="option.label"

                            :value="option.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div v-if="item.type=='searchSelect'">
                <div class="col-xs-4 p-n search-name">{{item.name}}</div>
                <div class="col-xs-8 p-n">
                    <el-select v-model="item.value" filterable  placeholder="请选择" style="width: 100%;" clearable>
                        <el-option
                            v-for="option in item.options"
                            :key="option.value"
                            :label="option.label"
                            :value="option.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div v-if="item.type=='time1'">
                <div class="col-xs-4 p-n search-name">{{item.name}}</div>
                <div class="col-xs-8 p-n">
                    <el-date-picker
                        v-model="item.value"
                        type="date"
                        clearable
                        value-format="timestamp"
                        style="width: 100%;"
                        placeholder="选择日期">
                    </el-date-picker>
                </div>
            </div>
            <div v-if="item.type=='time2'">
                <div class="col-xs-4 p-n search-name">{{item.name}}</div>
                <div class="col-xs-8 p-n">
                    <el-date-picker
                        v-model="item.value"
                        type="month"
                        clearable
                        value-format="yyyyMM"
                        style="width: 100%;"
                        placeholder="选择月份">
                    </el-date-picker>
                </div>
            </div>
            <!--<div v-if="item.type=='city'" class="clear" style="display: flex;">-->
                <!--<div class="col-xs-2 p-n search-name" style="min-width: 50px;flex-grow: 1">地区 </div>-->
                <!--<div class="col-xs-10 p-n" style="flex-grow: 1">-->
                    <!--<city-select v-model="item.value"></city-select>-->
                <!--</div>-->
            <!--</div>-->
            <div v-if="item.type=='timerange'" class="clear">
                <div class="col-xs-4 p-n search-name">{{item.name}}</div>
                <div class="col-xs-8 p-n daterange-container">
                    <el-date-picker
                        v-model="item.value"
                        clear-icon=""
                        type="daterange"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        align="left"
                        :picker-options="pickerOptions2"
                    >
                    </el-date-picker>
                </div>
            </div>
        </div>
        <div class="search-btns col-xs-4 col-sm-4 col-md-4 col-lg-3 m-b-sm p-l-n text-center">
            <a href="javascript:;" class="btn bg-blue1 text-white app-add m-r-sm" @click="submit">提交</a>
            <a href="javascript:;" class="btn bg-gray1 text-white app-add" @click="reset">重置</a>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import CitySelect from '@/components/citySelect'
    export default {
        props: ['options', 'value'],
        data: () => ({
            searchOptions: [],
            pickerOptions1: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
            },
            pickerOptions2: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
            },
        }),
        components: {
            CitySelect
        },
        methods: {
            submit () {
                this.$emit('submit', this.searchOptions)
            },
            reset () {
                for (let i = 0; i < this.searchOptions.length; i++) {
                    this.searchOptions[i].value = ''
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
    .col-lg-6 {
        width: 50%;
    }
    .col-md-6 {
        width: 50%;
    }
</style>