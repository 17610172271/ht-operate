<template>
    <div class="bg-white">
        <div class="p-md border-bottom relative">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{name: 'agent_list'}" v-if="fromRouter==='agent_list'">代理商列表</el-breadcrumb-item>
                <el-breadcrumb-item :to="{name: 'agent_mine'}" v-else-if="fromRouter==='agent_mine'">我的代理商</el-breadcrumb-item>
                <el-breadcrumb-item :to="{name: 'agent_check'}" v-else>代理商审核</el-breadcrumb-item>
                <el-breadcrumb-item>代理商详情</el-breadcrumb-item>
            </el-breadcrumb>
            <a href="javascript:;" class="btn bg-blue1 text-white btn-back" @click="goBack">返回</a>
        </div>
        <div class="p-o-lg p-v-sm" style="padding-bottom: 50px;" v-loading="loading">
            <div>
                <h5 class="border-bottom text-xxlg text-bold p-b-sm">代理商信息</h5>
                <!-- 基本信息 -->
                <div>
                    <div class="p-o-sm p-v-sm clear agent-detail-row">
                        <div class="col-xs-2 text-bold">基本信息</div>
                        <div class="col-xs-2">代理商编号:</div>
                        <div class="col-xs-4">{{data.code}}</div>
                    </div>
                    <div class="p-o-sm p-v-sm clear agent-detail-row">
                        <div class="col-xs-2 text-bold"></div>
                        <div class="col-xs-2">代理商名称:</div>
                        <div class="col-xs-4">{{data.name}}</div>
                    </div>
                    <div class="p-o-sm p-v-sm clear agent-detail-row">
                        <div class="col-xs-2 text-bold"></div>
                        <div class="col-xs-2">所属区域:</div>
                        <div class="col-xs-4">{{data.region_name}}</div>
                    </div>
                    <div class="p-o-sm p-v-sm clear agent-detail-row">
                        <div class="col-xs-2 text-bold"></div>
                        <div class="col-xs-2">城市:</div>
                        <div class="col-xs-4">{{data.province_name + data.city_name + data.county_name}}</div>
                    </div>
                    <div class="p-o-sm p-v-sm clear agent-detail-row">
                        <div class="col-xs-2 text-bold"></div>
                        <div class="col-xs-2">详细地址:</div>
                        <div class="col-xs-4">{{data.address}}</div>
                    </div>
                    <div class="p-o-sm p-v-sm clear agent-detail-row">
                        <div class="col-xs-2 text-bold"></div>
                        <div class="col-xs-2">所属代理商:</div>
                        <div class="col-xs-4">{{data.upper_agent}}</div>
                    </div>
                    <div class="p-o-sm p-v-sm clear agent-detail-row">
                        <div class="col-xs-2 text-bold"></div>
                        <div class="col-xs-2">描述:</div>
                        <div class="col-xs-4">{{data.introduce}}</div>
                    </div>
                    <div class="p-o-sm p-v-sm clear agent-detail-row">
                        <div class="col-xs-2 text-bold"></div>
                        <div class="col-xs-2">管理员账号:</div>
                        <div class="col-xs-4">{{data.username}}</div>
                    </div>
                    <div class="p-o-sm p-v-sm clear agent-detail-row">
                        <div class="col-xs-2 text-bold"></div>
                        <div class="col-xs-2">负责人:</div>
                        <div class="col-xs-4">{{data.leader}}</div>
                    </div>
                    <div class="p-o-sm p-v-sm clear agent-detail-row">
                        <div class="col-xs-2 text-bold"></div>
                        <div class="col-xs-2">负责人联系方式:</div>
                        <div class="col-xs-4">{{data.leader_phone}}</div>
                    </div>
                    <div class="p-o-sm p-v-sm clear agent-detail-row">
                        <div class="col-xs-2 text-bold"></div>
                        <div class="col-xs-2">分账比例:</div>
                        <div class="col-xs-4">{{data.proportion}}</div>
                    </div>
                    <div class="p-o-sm p-v-sm clear agent-detail-row">
                        <div class="col-xs-2 text-bold"></div>
                        <div class="col-xs-2">创建日期:</div>
                        <div class="col-xs-4">{{data.create_time}}</div>
                    </div>
                    <div class="p-o-sm p-v-sm clear agent-detail-row">
                        <div class="col-xs-2 text-bold"></div>
                        <div class="col-xs-2">状态:</div>
                        <div class="col-xs-4">{{data.status_name}}</div>
                    </div>
                    <!--<div class="p-o-sm p-v-sm clear agent-detail-row">-->
                        <!--<div class="col-xs-2 text-bold"></div>-->
                        <!--<div class="col-xs-2">备注:</div>-->
                        <!--<div class="col-xs-4">{{data.remark}}(字段待加)</div>-->
                    <!--</div>-->


                    <!-- 公司信息 -->
                    <div class="p-o-sm p-v-sm clear agent-detail-row m-t-lg">
                        <div class="col-xs-2 text-bold">公司信息</div>
                        <div class="col-xs-2">公司名称:</div>
                        <div class="col-xs-4">{{data.company}}</div>
                    </div>
                    <div class="p-o-sm p-v-sm clear agent-detail-row">
                        <div class="col-xs-2 text-bold"></div>
                        <div class="col-xs-2">法人姓名:</div>
                        <div class="col-xs-4">{{data.legal_person}}</div>
                    </div>
                    <div class="p-o-sm p-v-sm clear agent-detail-row">
                        <div class="col-xs-2 text-bold"></div>
                        <div class="col-xs-2">法人手机号:</div>
                        <div class="col-xs-4">{{data.legal_phone}}</div>
                    </div>
                    <div class="p-o-sm p-v-sm clear agent-detail-row">
                        <div class="col-xs-2 text-bold"></div>
                        <div class="col-xs-2">法人身份证号:</div>
                        <div class="col-xs-4">{{data.legal_person_id}}</div>
                    </div>
                    <div class="p-o-sm p-v-sm clear agent-detail-row">
                        <div class="col-xs-2 text-bold"></div>
                        <div class="col-xs-2">邮箱:</div>
                        <div class="col-xs-4">{{data.legal_email}}</div>
                    </div>
                    <div class="p-o-sm p-v-sm clear agent-detail-row">
                        <div class="col-xs-2 text-bold"></div>
                        <div class="col-xs-2">营业执照:</div>
                        <div class="col-xs-4"><a :href="data.business_licence" target="_blank" class="link" v-if="data.business_licence">查看详情</a></div>
                    </div>

                    <!-- 合同信息 -->
                    <div class="p-o-sm p-v-sm clear agent-detail-row m-t-lg">
                        <div class="col-xs-2 text-bold">合同信息</div>
                        <div class="col-xs-2">合同起止日期:</div>
                        <div class="col-xs-4">{{data.contract_before_time}} - {{data.contract_after_time}}</div>
                    </div>
                    <div class="p-o-sm p-v-sm clear agent-detail-row">
                        <div class="col-xs-2 text-bold"></div>
                        <div class="col-xs-2">汇款方式:</div>
                        <div class="col-xs-4">{{data.pay_name}}</div>
                    </div>
                    <div class="p-o-sm p-v-sm clear agent-detail-row">
                        <div class="col-xs-2 text-bold"></div>
                        <div class="col-xs-2">到账日期:</div>
                        <div class="col-xs-4">({{data.arrival_account_time}})</div>
                    </div>
                    <div class="p-o-sm p-v-sm clear agent-detail-row">
                        <div class="col-xs-2 text-bold"></div>
                        <div class="col-xs-2">合同:</div>
                        <div class="col-xs-4"><a v-for="(item, index) in data.contract" :href="item" target="_blank" class="link" v-if="data.contract" style="margin-right: 15px;">图片{{index + 1}}</a></div>
                    </div>

                    <!-- 结算信息 -->
                    <div class="p-o-sm p-v-sm clear agent-detail-row m-t-lg">
                        <div class="col-xs-2 text-bold">结算信息</div>
                        <div class="col-xs-2">户名:</div>
                        <div class="col-xs-4">{{data.account_name}}</div>
                    </div>
                    <div class="p-o-sm p-v-sm clear agent-detail-row">
                        <div class="col-xs-2 text-bold"></div>
                        <div class="col-xs-2">银行:</div>
                        <div class="col-xs-4">{{data.bank_name}}</div>
                    </div>
                    <div class="p-o-sm p-v-sm clear agent-detail-row">
                        <div class="col-xs-2 text-bold"></div>
                        <div class="col-xs-2">卡号:</div>
                        <div class="col-xs-4">{{data.bank_account}}</div>
                    </div>
                    <div class="p-o-sm p-v-sm clear agent-detail-row">
                        <div class="col-xs-2 text-bold"></div>
                        <div class="col-xs-2">开户行:</div>
                        <div class="col-xs-4">{{data.open_bank}}</div>
                    </div>
                </div>
                <el-tabs v-model="activeName" style="min-height: 300px;margin-top: 30px;">
                    <el-tab-pane label="影院信息" name="first">
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
                    </el-tab-pane>
                    <el-tab-pane label="下级代理" name="second">
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
                    </el-tab-pane>
                    <el-tab-pane label="审核记录" name="third">
                        <div class="lk-table">
                            <ul class="table-thead clear">
                                <li class="col-xs-1 p-n" style="max-width: 60px;">序号</li>
                                <li class="col-xs-2 p-n">类型</li>
                                <li class="col-xs-3 p-n">修改内容</li>
                                <li class="col-xs-2 p-n">申请时间</li>
                                <li class="col-xs-2 p-n">审核时间</li>
                                <li class="col-xs-1 p-n">审核人</li>
                                <li class="col-xs-1 p-n">审核备注</li>
                                <li class="col-xs-1 p-n">状态</li>
                            </ul>
                            <ul class="table-tbody clear" v-for="(item, index) in checkLog.items">
                                <li class="col-xs-1 p-n" style="max-width: 60px;">{{index + 1}}</li>
                                <li class="col-xs-2 p-n over-omit" :title="item.type">{{item.type}}</li>
                                <li class="col-xs-3 p-n over-omit" :title="item.update_info">{{item.update_info}}</li>
                                <li class="col-xs-2 p-n over-omit" :title="item.create_time">{{item.create_time}}</li>
                                <li class="col-xs-2 p-n over-omit" :title="item.check_time">{{item.check_time}}</li>
                                <li class="col-xs-1 p-n over-omit" :title="item.nickname">{{item.nickname}}</li>
                                <li class="col-xs-1 p-n over-omit" :title="item.remark">{{item.remark}}</li>
                                <li class="col-xs-1 p-n over-omit" :class="item.status==1?'text-green':'text-orange'">{{item.status_name}}</li>
                            </ul>
                        </div>
                    </el-tab-pane>
                </el-tabs>
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
                agent_list: [],
                items:[]
            },
            loading: false,
            fromRouter: '',
            activeName: 'first'
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
                    this.$http.post(api.agent.checkLog, {
                        id: this.$route.params.id,
                        page: this.page,
                        limit: this.limit
                    }).then(res => {
                        if(res.data.code === 1) {
                            this.checkLog = res.data.data
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
 .p-right-6{
     padding-right: 6px;
 }
 .agent-detail-row > div {
    min-width: 200px;
 }
</style>
