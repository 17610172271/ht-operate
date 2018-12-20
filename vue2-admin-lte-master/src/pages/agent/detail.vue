<template>
    <div class="bg-white">
        <div class="p-md border-bottom relative">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{name: 'home'}">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{name: 'agent_list'}">代理商管理</el-breadcrumb-item>
                <el-breadcrumb-item>代理商详情</el-breadcrumb-item>
            </el-breadcrumb>
            <a href="javascript:;" class="btn bg-blue1 text-white btn-back" @click="goBack">返回</a>
        </div>
        <div class="p-o-lg p-v-sm" style="padding-bottom: 50px;" v-loading="loading">
            <div>
                <h5 class="border-bottom text-xxlg text-bold p-b-sm">代理商信息</h5>
                <div>
                    <div class="p-o-sm p-v-sm clear flex">
                        <div class="col-xs-12 col-md-6 clear p-v-sm">
                            <div class="col-xs-4 max-width-105 p-n text-right">代理商编号:</div>
                            <div class="col-xs-8">{{data.code}}</div>
                        </div>
                        <div class="col-xs-12 col-md-6 clear p-v-sm">
                            <div class="col-xs-4 max-width-105 p-n text-right">代理商名称:</div>
                            <div class="col-xs-8">{{data.name}}</div>
                        </div>
                    </div>
                    <div class="p-o-sm p-v-sm clear flex">
                        <div class="col-xs-12 col-md-6 clear p-v-sm">
                            <div class="col-xs-4 max-width-105 p-n text-right">所属代理商:</div>
                            <div class="col-xs-8">{{data.upper_agent}}</div>
                        </div>
                        <div class="col-xs-12 col-md-6 clear p-v-sm">
                            <div class="col-xs-4 max-width-105 p-n text-right">创建日期:</div>
                            <div class="col-xs-8">{{data.create_time}}</div>
                        </div>
                    </div>
                    <div class="p-o-sm p-v-sm clear flex">
                        <div class="col-xs-12 col-md-6 clear p-v-sm">
                            <div class="col-xs-4 max-width-105 p-n text-right">所属区域:</div>
                            <div class="col-xs-8">{{data.region_name}}</div>
                        </div>
                        <div class="col-xs-12 col-md-6 clear p-v-sm">
                            <div class="col-xs-4 max-width-105 p-n text-right">城市:</div>
                            <div class="col-xs-8">{{data.province_name + data.city_name + data.county_name}}</div>
                        </div>
                    </div>
                    <div class="p-o-sm p-v-sm clear flex">
                        <div class="col-xs-12 col-md-6 clear p-v-sm">
                            <div class="col-xs-4 max-width-105 p-n text-right">详细地址:</div>
                            <div class="col-xs-8">{{data.address}}</div>
                        </div>
                        <div class="col-xs-12 col-md-6 clear p-v-sm">
                            <div class="col-xs-4 max-width-105 p-n text-right">代理商描述:</div>
                            <div class="col-xs-8">{{data.introduce}}</div>
                        </div>
                    </div>
                    <div class="p-o-sm p-v-sm clear">
                        <div class="col-xs-12 col-md-6 clear p-v-sm">
                            <div class="col-xs-4 max-width-105 p-n text-right">状态:</div>
                            <div class="col-xs-8">{{data.status_name}}</div>
                        </div>
                    </div>
                    <div class="p-o-sm p-v-sm clear flex">
                        <div class="col-xs-12 col-md-6 clear p-v-sm">
                            <div class="col-xs-4 max-width-105 p-n text-right">公司名称:</div>
                            <div class="col-xs-8">{{data.company}}</div>
                        </div>
                        <div class="col-xs-12 col-md-6 clear p-v-sm">
                            <div class="col-xs-4 max-width-105 p-n text-right">营业执照:</div>
                            <div class="col-xs-8"><a :href="data.business_licence" target="_blank" class="link" v-if="data.business_licence">查看详情</a></div>
                        </div>
                    </div>
                    <div class="p-o-sm p-v-sm clear flex">
                        <div class="col-xs-12 col-md-6 clear p-v-sm">
                            <div class="col-xs-4 max-width-105 p-n text-right">合同:</div>
                            <div class="col-xs-8">
                                <a v-for="(item, index) in data.contract" :href="item" target="_blank" class="link" v-if="data.contract" style="margin-right: 15px;">图片{{index + 1}}</a>
                            </div>
                        </div>
                        <div class="col-xs-12 col-md-6 clear p-v-sm">
                            <div class="col-xs-4 max-width-105 p-n text-right">合同起止日期:</div>
                            <div class="col-xs-8">{{data.contract_before_time}} - {{data.contract_after_time}}</div>
                        </div>
                    </div>
                    <div class="p-o-sm p-v-sm clear flex">
                        <div class="col-xs-12 col-md-6 clear p-v-sm">
                            <div class="col-xs-4 max-width-105 p-n text-right">法人:</div>
                            <div class="col-xs-8">{{data.legal_person}}</div>
                        </div>
                        <div class="col-xs-12 col-md-6 clear p-v-sm">
                            <div class="col-xs-4 max-width-105 p-n text-right">法人联系方式:</div>
                            <div class="col-xs-8">{{data.legal_phone}}</div>
                        </div>
                    </div>
                    <div class="p-o-sm p-v-sm clear flex">
                        <div class="col-xs-12 col-md-6 clear p-v-sm">
                            <div class="col-xs-4 max-width-105 p-n text-right">法人身份证号:</div>
                            <div class="col-xs-8">{{data.legal_person_id}}</div>
                        </div>
                        <div class="col-xs-12 col-md-6 clear p-v-sm">
                            <div class="col-xs-4 max-width-105 p-n text-right">邮箱:</div>
                            <div class="col-xs-8">{{data.legal_email}}</div>
                        </div>
                    </div>
                    <div class="p-o-sm p-v-sm clear">
                        <div class="col-xs-12 col-md-6 clear p-v-sm">
                            <div class="col-xs-4 max-width-105 p-n text-right">管理账户:</div>
                            <div class="col-xs-8">{{data.username}}</div>
                        </div>
                    </div>
                    <div class="p-o-sm p-v-sm clear flex">
                        <div class="col-xs-12 col-md-6 clear p-v-sm">
                            <div class="col-xs-4 max-width-105 p-n text-right">负责人:</div>
                            <div class="col-xs-8">{{data.leader}}</div>
                        </div>
                        <div class="col-xs-12 col-md-6 clear p-v-sm">
                            <div class="col-xs-4 max-width-105 p-n text-right">负责人联系方式:</div>
                            <div class="col-xs-8">{{data.leader_phone}}</div>
                        </div>
                    </div>
                    <div class="p-o-sm p-v-sm clear flex">
                        <div class="col-xs-12 col-md-12 clear p-v-sm">
                            <div class="col-xs-2 max-width-105 p-n text-right p-right-6">备注:</div>
                            <div class="col-xs-10">{{data.check_remark}}</div>
                        </div>
                    </div>
                </div>
                <div v-if="data.cinema_list.length > 0" class="m-t-lg">
                    <h5 class="border-bottom text-xxlg text-bold p-b-sm">影院</h5>
                    <div class="lk-table">
                        <ul class="table-thead clear">
                            <li class="col-xs-2 p-n" style="max-width: 60px;">序号</li>
                            <li class="col-xs-2 p-n">影院编号</li>
                            <li class="col-xs-3 p-n">影院名称</li>
                            <li class="col-xs-2 p-n">所属区域</li>
                            <li class="col-xs-2 p-n">城市</li>
                            <li class="col-xs-2 p-n">影厅数量</li>
                            <li class="col-xs-2 p-n">影院设备</li>
                            <li class="col-xs-2 p-n">创建时间</li>
                            <li class="col-xs-2 p-n">状态</li>
                        </ul>
                        <ul class="table-tbody clear" v-for="(item, index) in data.cinema_list">
                            <li class="col-xs-2 p-n" style="max-width: 60px;">{{index + 1}}</li>
                            <li class="col-xs-2 p-n over-omit" :title="item.code">{{item.code}}</li>
                            <li class="col-xs-3 p-n over-omit" :title="item.name">{{item.name}}</li>
                            <li class="col-xs-2 p-n over-omit" :title="item.region_name">{{item.region_name}}</li>
                            <li class="col-xs-2 p-n over-omit" :title="item.city_name">{{item.city_name}}</li>
                            <li class="col-xs-2 p-n over-omit" :title="item.hall_num">{{item.hall_num}}</li>
                            <li class="col-xs-2 p-n over-omit" :title="item.device_num">{{item.device_num}}</li>
                            <li class="col-xs-2 p-n over-omit" :title="item.create_time">{{item.create_time}}</li>
                            <li class="col-xs-2 p-n over-omit" :class="item.status==1?'text-green':'text-orange'">{{item.status_name}}</li>
                        </ul>
                    </div>
                </div>
                <div v-if="data.agent_list.length > 0" class="m-t-lg">
                    <h5 class="border-bottom text-xxlg text-bold p-b-sm">我的代理</h5>
                    <div class="lk-table">
                        <ul class="table-thead clear">
                            <li class="col-xs-2 p-n" style="max-width: 60px;">序号</li>
                            <li class="col-xs-2 p-n">代理商编号</li>
                            <li class="col-xs-3 p-n">代理商名称</li>
                            <li class="col-xs-2 p-n">所属区域</li>
                            <li class="col-xs-2 p-n">城市</li>
                            <li class="col-xs-2 p-n">影院数量</li>
                            <li class="col-xs-2 p-n">创建时间</li>
                            <li class="col-xs-2 p-n">状态</li>
                        </ul>
                        <ul class="table-tbody clear" v-for="(item, index) in data.agent_list">
                            <li class="col-xs-2 p-n" style="max-width: 60px;">{{index + 1}}</li>
                            <li class="col-xs-2 p-n over-omit" :title="item.code">{{item.code}}</li>
                            <li class="col-xs-3 p-n over-omit" :title="item.name">{{item.name}}</li>
                            <li class="col-xs-2 p-n over-omit" :title="item.region_name">{{item.region_name}}</li>
                            <li class="col-xs-2 p-n over-omit" :title="item.city_name">{{item.city_name}}</li>
                            <li class="col-xs-2 p-n over-omit" :title="item.cinema_num">{{item.cinema_num}}</li>
                            <li class="col-xs-2 p-n over-omit" :title="item.create_time">{{item.create_time}}</li>
                            <li class="col-xs-2 p-n over-omit" :class="item.status==1?'text-green':'text-orange'">{{item.status_name}}</li>
                        </ul>
                    </div>
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
                cinema_list: [],
                agent_list: []
            },
            loading: false,
        }),
        methods: {
            getData () {
                this.loading = true
                this.$http.get(api.agent.detail, {
                    params: {
                        id: this.$route.params.id,
                        type: 1
                    }
                }).then(res => {
                    let that = this
                    setTimeout(function () {
                        that.loading = false
                    }, 500)
                    if (res.data.code === 1) {
                        this.data = res.data.data
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
 .p-right-6{
     padding-right: 6px;
 }
</style>
