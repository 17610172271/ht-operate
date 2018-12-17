<template>
    <div class="bg-white">
        <div class="p-md border-bottom relative">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{name: 'home'}">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{name: 'cinema_list'}">我的影院</el-breadcrumb-item>
                <el-breadcrumb-item>影院详情</el-breadcrumb-item>
            </el-breadcrumb>
            <a href="javascript:;" class="btn bg-blue1 text-white btn-back" @click="goBack">返回</a>
        </div>
        <div class="p-o-lg p-v-sm" style="padding-bottom: 50px;" v-loading="loading">
            <div>
                <h5 class="border-bottom text-xxlg text-bold p-b-sm">影院信息</h5>
                <div>
                    <div class="p-o-sm p-v-xs clear flex">
                        <div class="col-xs-12 col-md-6 clear p-v-sm">
                            <div class="col-xs-4 max-width-105 p-n text-right">所属代理商:</div>
                            <div class="col-xs-8">{{data.upper_agent}}</div>
                        </div>
                        <div class="col-xs-12 col-md-6 clear p-v-sm">
                            <div class="col-xs-4 max-width-105 p-n text-right">所属区域:</div>
                            <div class="col-xs-8">{{data.region_name}}</div>
                        </div>
                    </div>
                    <div class="p-o-sm p-v-xs clear flex">
                        <div class="col-xs-12 col-md-6 clear p-v-sm">
                            <div class="col-xs-4 max-width-105 p-n text-right">影院编号:</div>
                            <div class="col-xs-8">{{data.code}}</div>
                        </div>
                        <div class="col-xs-12 col-md-6 clear p-v-sm">
                            <div class="col-xs-4 max-width-105 p-n text-right">影院名称:</div>
                            <div class="col-xs-8">{{data.name}}</div>
                        </div>
                    </div>

                    <div class="p-o-sm p-v-xs clear flex">
                        <div class="col-xs-12 col-md-6 clear p-v-sm">
                            <div class="col-xs-4 max-width-105 p-n text-right">城市:</div>
                            <div class="col-xs-8">{{data.province_name + data.city_name + data.county_name}}</div>
                        </div>
                        <div class="col-xs-12 col-md-6 clear p-v-sm">
                            <div class="col-xs-4 max-width-105 p-n text-right">详细地址:</div>
                            <div class="col-xs-8">{{data.address}}</div>
                        </div>
                    </div>
                    <div class="p-o-sm p-v-xs clear flex">
                        <div class="col-xs-12 col-md-6 clear p-v-sm">
                            <div class="col-xs-2 max-width-105 p-n text-right" style="padding-right: 5px;">影院描述:</div>
                            <div class="col-xs-10" style="max-width: 60%;">{{data.introduce}}</div>
                        </div>
                    </div>
                    <div class="p-o-sm p-v-xs clear flex">
                        <div class="col-xs-12 col-md-6 clear p-v-sm">
                            <div class="col-xs-4 max-width-105 p-n text-right">影厅数量:</div>
                            <div class="col-xs-8">{{data.hall_num}}</div>
                        </div>
                        <div class="col-xs-12 col-md-6 clear p-v-sm">
                            <div class="col-xs-4 max-width-105 p-n text-right">影院设备:</div>
                            <div class="col-xs-8">{{data.device_num}}</div>
                        </div>
                    </div>
                    <div class="p-o-sm p-v-xs clear flex">
                        <div class="col-xs-12 col-md-6 clear p-v-sm">
                            <div class="col-xs-4 max-width-105 p-n text-right">创建日期:</div>
                            <div class="col-xs-8">{{data.create_time}}</div>
                        </div>
                        <div class="col-xs-12 col-md-6 clear p-v-sm">
                            <div class="col-xs-4 max-width-105 p-n text-right">状态:</div>
                            <div class="col-xs-8">{{data.status_name}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h5 class="border-bottom text-xxlg text-bold p-b-sm">影厅信息</h5>
                <div class="lk-table">
                    <ul class="table-thead clear">
                        <li class="col-xs-1 p-n" style="max-width: 60px;">序号</li>
                        <li class="col-xs-3 p-n">影厅名称</li>
                        <li class="col-xs-2 p-n">服务器(NAS)</li>
                        <li class="col-xs-2 p-n">服务器(NAS)编号</li>
                        <li class="col-xs-2 p-n">放映机</li>
                        <li class="col-xs-2 p-n">放映机序列号</li>
                        <li class="col-xs-2 p-n">网关</li>
                        <li class="col-xs-2 p-n">网关编号</li>
                        <li class="col-xs-2 p-n">创建时间</li>
                        <li class="col-xs-2 p-n">状态</li>
                    </ul>
                    <ul class="table-tbody clear" v-for="(item, index) in data.hall_list" v-if="data.hall_list.length>0">
                        <li class="col-xs-1 p-n" style="max-width: 60px;">{{index + 1}}</li>
                        <li class="col-xs-3 p-n over-omit" :title="item.name">{{item.name}}</li>
                        <li class="col-xs-2 p-n over-omit" :title="item.nas_name">{{item.nas_name}}</li>
                        <li class="col-xs-2 p-n over-omit" :title="item.nas_code">{{item.nas_code}}</li>
                        <li class="col-xs-2 p-n over-omit" :title="item.play_name">{{item.play_name}}</li>
                        <li class="col-xs-2 p-n over-omit" :title="item.play_code">{{item.play_code}}</li>
                        <li class="col-xs-2 p-n over-omit" :title="item.gateway_name">{{item.gateway_name}}</li>
                        <li class="col-xs-2 p-n over-omit" :title="item.gateway_code">{{item.gateway_code}}</li>
                        <li class="col-xs-2 p-n over-omit" :title="item.create_time">{{item.create_time}}</li>
                        <li class="col-xs-2 p-n over-omit" :class="item.status_name=='正常'?'text-green':'text-orange'">{{item.status_name}}</li>
                    </ul>
                    <p class="p-v-sm" v-if="data.hall_list.length<=0">暂无影厅信息</p>
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
                hall_list: []
            },
            loading: false,
        }),
        methods: {
            getData () {
                this.loading = true
                this.$http.get(api.cinema.detail, {
                    params: {
                        id: this.$route.params.id
                    }
                }).then(res => {
                    let that = this
                    setTimeout(function () {
                        that.loading = false
                    }, 500)
                    if (res.data.code === 1) {
                        this.data = res.data.data
                        this.data.hall_list = res.data.data.hall_list.map(val => {
                            return {
                                ...val,
                                iptShow: false,
                                cname: val.name
                            }
                        })
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        })
                    }
                })
            },
            goBack () {
                this.$router.go(-1)
            }
        },
        created () {
            this.getData()
        },
        watch: {
        }
    }
</script>
<style scoped>

</style>
