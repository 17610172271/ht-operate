<template>
    <div class="bg-white">
        <div class="p-md border-bottom relative">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{name: 'cinema_list'}" v-if="fromRouter==='cinema_list'">影院列表</el-breadcrumb-item>
                <el-breadcrumb-item :to="{name: 'cinema_check'}" v-else>影院审核</el-breadcrumb-item>
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
                            <div class="col-xs-4 max-width-105 p-n text-right">所属区域:</div>
                            <div class="col-xs-8">{{data.region_name}}</div>
                        </div>
                        <div class="col-xs-12 col-md-6 clear p-v-sm">
                            <div class="col-xs-4 max-width-105 p-n text-right">公司名称:</div>
                            <div class="col-xs-8">{{data.company}}</div>
                        </div>
                    </div>
                    <div class="p-o-sm p-v-xs clear flex">
                        <div class="col-xs-12 col-md-6 clear p-v-sm">
                            <div class="col-xs-4 max-width-105 p-n text-right">所属代理商:</div>
                            <div class="col-xs-8">{{data.upper_agent}}</div>
                        </div>
                        <div class="col-xs-12 col-md-6 clear p-v-sm">
                            <div class="col-xs-4 max-width-105 p-n text-right">法人姓名:</div>
                            <div class="col-xs-8">{{data.legal_person}}</div>
                        </div>
                    </div>

                    <div class="p-o-sm p-v-xs clear flex">
                        <div class="col-xs-12 col-md-6 clear p-v-sm">
                            <div class="col-xs-4 max-width-105 p-n text-right">影院编号:</div>
                            <div class="col-xs-8">{{data.code}}</div>
                        </div>
                        <div class="col-xs-12 col-md-6 clear p-v-sm">
                            <div class="col-xs-4 max-width-105 p-n text-right">法人手机号:</div>
                            <div class="col-xs-8">{{data.legal_phone}}</div>
                        </div>
                    </div>
                    <div class="p-o-sm p-v-xs clear flex">
                        <div class="col-xs-12 col-md-6 clear p-v-sm">
                            <div class="col-xs-4 max-width-105 p-n text-right">影院名称:</div>
                            <div class="col-xs-8">{{data.name}}</div>
                        </div>
                        <div class="col-xs-12 col-md-6 clear p-v-sm">
                            <div class="col-xs-4 max-width-105 p-n text-right">法人身份证号:</div>
                            <div class="col-xs-8">{{data.legal_person_id}}</div>
                        </div>
                    </div>
                    <div class="p-o-sm p-v-xs clear flex">
                        <div class="col-xs-12 col-md-6 clear p-v-sm">
                            <div class="col-xs-4 max-width-105 p-n text-right">城市:</div>
                            <div class="col-xs-8">{{data.province_name + data.city_name + data.county_name}}</div>
                        </div>
                        <div class="col-xs-12 col-md-6 clear p-v-sm">
                            <div class="col-xs-4 max-width-105 p-n text-right">营业执照:</div>
                            <div class="col-xs-8">
                                <a :href="data.business_licence" target="_blank" class="link" v-if="data.business_licence">查看详情</a>
                            </div>
                        </div>
                    </div>
                    <div class="p-o-sm p-v-xs clear flex">
                        <div class="col-xs-12 col-md-6 clear p-v-sm">
                            <div class="col-xs-4 max-width-105 p-n text-right">详细地址:</div>
                            <div class="col-xs-8">{{data.address}}</div>
                        </div>
                        <div class="col-xs-12 col-md-6 clear p-v-sm">
                            <div class="col-xs-4 max-width-105 p-n text-right">邮箱:</div>
                            <div class="col-xs-8">{{data.legal_email}}</div>
                        </div>
                    </div>
                    <div class="p-o-sm p-v-xs clear flex">
                        <div class="col-xs-12 col-md-6 clear p-v-sm">
                            <div class="col-xs-2 max-width-105 p-n text-right">影院设备:</div>
                            <div class="col-xs-10">{{data.device_num || 0}} 套</div>
                        </div>
                    </div>
                    <div class="p-o-sm p-v-xs clear flex">
                        <div class="col-xs-12 col-md-6 clear p-v-sm">
                            <div class="col-xs-2 max-width-105 p-n text-right">影厅数量:</div>
                            <div class="col-xs-10">{{data.hall_num || 0}} 个</div>
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
                            <div class="col-xs-2 max-width-105 p-n text-right">状态:</div>
                            <div class="col-xs-10">{{data.status_name}}</div>
                        </div>
                    </div>
                    <div class="p-o-sm p-v-xs clear flex">
                        <div class="col-xs-12 col-md-6 clear p-v-sm">
                            <div class="col-xs-2 max-width-105 p-n text-right">创建日期:</div>
                            <div class="col-xs-10">{{data.create_time}}</div>
                        </div>
                    </div>
                    <div class="p-o-sm p-v-xs clear flex">
                        <div class="col-xs-12 col-md-12 clear p-v-sm">
                            <div class="col-xs-2 max-width-105 p-n text-right p-right-6">审核信息:</div>
                            <div class="col-xs-10">{{data.check_remark}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <el-tabs v-model="activeName" style="min-height: 300px;margin-top: 30px;">
                <el-tab-pane label="影厅信息" name="first">
                    <div class="p-sm">
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
                </el-tab-pane>
                <el-tab-pane label="设备申请单" name="second">
                    <div class="p-sm">
                        <div class="lk-table">
                            <ul class="table-thead clear">
                                <li class="col-xs-1 p-n" style="max-width: 60px;">序号</li>
                                <li class="col-xs-2 p-n">申请单编号</li>
                                <li class="col-xs-2 p-n">申请日期</li>
                                <li class="col-xs-1 p-n">申请数量</li>
                                <li class="col-xs-1 p-n">负责人</li>
                                <li class="col-xs-2 p-n">联系方式</li>
                                <li class="col-xs-2 p-n">审核时间</li>
                                <li class="col-xs-1 p-n">状态</li>
                            </ul>
                            <ul class="table-tbody clear" v-for="(item, index) in data.apply_list" v-if="data.apply_list.length>0">
                                <li class="col-xs-1 p-n" style="max-width: 60px;">{{index + 1}}</li>
                                <li class="col-xs-2 p-n over-omit" :title="item.code">{{item.code}}</li>
                                <li class="col-xs-2 p-n over-omit" :title="item.create_time">{{item.create_time}}</li>
                                <li class="col-xs-1 p-n over-omit" :title="item.num">{{item.num}}</li>
                                <li class="col-xs-1 p-n over-omit" :title="item.leader">{{item.leader}}</li>
                                <li class="col-xs-2 p-n over-omit" :title="item.leader_phone">{{item.leader_phone}}</li>
                                <li class="col-xs-2 p-n over-omit" :title="item.check_time">{{item.check_time}}</li>
                                <li class="col-xs-1 p-n over-omit" :class="item.status_name=='已完成'?'text-green':'text-orange'">{{item.status_name}}</li>
                            </ul>
                            <p class="p-v-sm" v-if="data.apply_list.length<=0">暂无申请单信息</p>
                        </div>
                    </div>
                </el-tab-pane>
                <!--<el-tab-pane label="审核记录" name="third">-->
                    <!--<div class="lk-table">-->
                        <!--<ul class="table-thead clear">-->
                            <!--<li class="col-xs-1 p-n" style="max-width: 60px;">序号</li>-->
                            <!--<li class="col-xs-2 p-n">类型</li>-->
                            <!--<li class="col-xs-3 p-n">修改前</li>-->
                            <!--<li class="col-xs-3 p-n">修改后</li>-->
                            <!--<li class="col-xs-2 p-n">申请时间</li>-->
                            <!--<li class="col-xs-2 p-n">审核时间</li>-->
                            <!--<li class="col-xs-1 p-n">审核人</li>-->
                            <!--<li class="col-xs-1 p-n">状态</li>-->
                        <!--</ul>-->
                        <!--<ul class="table-tbody clear" v-for="(item, index) in data.apply_list" v-if="data.apply_list.length>0">-->
                            <!--<li class="col-xs-1 p-n" style="max-width: 60px;">{{index + 1}}</li>-->
                            <!--<li class="col-xs-2 p-n over-omit" :title="item.code">{{item.code}}</li>-->
                            <!--<li class="col-xs-3 p-n over-omit" :title="item.name">{{item.name}}</li>-->
                            <!--<li class="col-xs-3 p-n over-omit" :title="item.region_name">{{item.region_name}}</li>-->
                            <!--<li class="col-xs-2 p-n over-omit" :title="item.city_name">{{item.city_name}}</li>-->
                            <!--<li class="col-xs-2 p-n over-omit" :title="item.cinema_num">{{item.cinema_num}}</li>-->
                            <!--<li class="col-xs-1 p-n over-omit" :title="item.create_time">{{item.create_time}}</li>-->
                            <!--<li class="col-xs-1 p-n over-omit" :class="item.status==1?'text-green':'text-orange'">{{item.status_name}}</li>-->
                        <!--</ul>-->
                    <!--</div>-->
                <!--</el-tab-pane>-->
            </el-tabs>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import api from '@/api'
    import validate from '@/tools/validate'
    export default {
        data: () => ({
            data: {
                hall_list: [],
                apply_list: []
            },
            loading: false,
            activeName: 'first',
            fromRouter: ''
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
        beforeRouteEnter (to, from, next) {
            next(vm => {
                vm.fromRouter = from.name
            })
        },
        created () {
            this.getData()
        },
        watch: {
        }
    }
</script>
<style scoped>
    .lk-table .table-tbody {
        border-bottom: none;
    }
    .lk-table > ul {
        background-color: #fff;
    }
    .lk-table .table-thead li,
    .lk-table .table-tbody li {
        border-right: none;
    }
    .lk-table {
        border: none;
        border-top: 1px solid #eaeaea;
    }
    .p-right-6{
        padding-right: 6px;
    }
</style>
