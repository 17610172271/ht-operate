<template>
    <div class="bg-white">
        <div class="p-md border-bottom relative">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{name: 'home'}">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{name: 'financial_clearing'}">结算管理</el-breadcrumb-item>
                <el-breadcrumb-item>结算详情</el-breadcrumb-item>
            </el-breadcrumb>
            <a href="javascript:;" class="btn bg-blue1 text-white btn-back" @click="goBack">返回</a>
        </div>
        <div class="p-o-lg p-v-sm" style="padding-bottom: 50px;" v-loading="loading">
            <!--<h5 class="border-bottom text-xxlg text-bold p-b-sm">结算详情</h5>-->
            <el-tabs v-model="tabVal">
                <el-tab-pane label="代理商收益" name="first">
                    <div class="p-md">
                        <div class="lk-table">
                            <ul class="table-thead clear">
                                <li class="col-xs-1 p-n" style="max-width: 60px;">序号</li>
                                <li class="col-xs-2 p-n">代理商编号</li>
                                <li class="col-xs-2 p-n">代理商</li>
                                <li class="col-xs-2 p-n">分账比例</li>
                                <li class="col-xs-2 p-n">金额</li>
                                <li class="col-xs-2 p-n">操作</li>
                            </ul>
                            <ul class="table-tbody clear" v-for="(item, index) in data.agent_list">
                                <li class="col-xs-1 p-n" style="max-width: 60px;">{{index + 1}}</li>
                                <li class="col-xs-2 p-n over-omit" :title="item.agent_code">{{item.agent_code}}</li>
                                <li class="col-xs-2 p-n over-omit" :title="item.agent_name">{{item.agent_name}}</li>
                                <li class="col-xs-2 p-n over-omit" :title="item.proportion">{{item.proportion}}</li>
                                <li class="col-xs-2 p-n over-omit" :title="item.money">{{item.money}}</li>
                                <li class="col-xs-2 p-n over-omit"><a href="javascript:;" class="link" @click="openDetail(item.agent_id)">详情</a></li>
                            </ul>
                            <p class="p-v-sm" v-if="data.agent_list.length<=0">暂无代理商收益信息</p>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="影院收益" name="second">
                    <div class="p-md">
                        <div class="lk-table">
                            <ul class="table-thead clear">
                                <li class="col-xs-1 p-n" style="max-width: 60px;">序号</li>
                                <li class="col-xs-2 p-n">影院编号</li>
                                <li class="col-xs-2 p-n">影院名称</li>
                                <li class="col-xs-2 p-n">分账比</li>
                                <li class="col-xs-2 p-n">影片</li>
                                <li class="col-xs-2 p-n">金额</li>
                                <li class="col-xs-2 p-n">操作</li>
                            </ul>
                            <ul class="table-tbody clear" v-for="(item, index) in data.cinema_list">
                                <li class="col-xs-1 p-n" style="max-width: 60px;">{{index + 1}}</li>
                                <li class="col-xs-2 p-n over-omit" :title="item.cinema_code">{{item.cinema_code}}</li>
                                <li class="col-xs-2 p-n over-omit" :title="item.cinema_name">{{item.cinema_name}}</li>
                                <li class="col-xs-2 p-n over-omit" :title="item.proportion">{{item.proportion}}</li>
                                <li class="col-xs-2 p-n over-omit" :title="item.film_name">{{item.film_name}}</li>
                                <li class="col-xs-2 p-n over-omit" :title="item.money">{{item.money}}</li>
                                <li class="col-xs-2 p-n over-omit"><a href="javascript:;" class="link" @click="openDetail(item.cinema_id)">详情</a></li>
                            </ul>
                            <p class="p-v-sm" v-if="data.cinema_list.length<=0">暂无影院收益信息</p>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <el-dialog
                title="详情"
                :visible.sync="detailModal"
                custom-class="dialog-modal2">
                <div v-loading="modalLoading" style="min-height: 550px;">
                    <div class="clear">
                        <div class="col-xs-4 line-height-40 text-center text-bold min-width-105">日期</div>
                        <div class="col-xs-4 line-height-40 text-bold text-center">金额</div>
                    </div>
                    <div class="clear" :class="{'bg-f9': index%2==0}" v-for="(item, index) in detailVal">
                        <div class="col-xs-4 line-height-40 text-center min-width-105">{{item.date}}</div>
                        <div class="col-xs-4 line-height-40 text-center">{{item.money}}</div>
                    </div>
                    <div class="p-v-sm text-center" v-if="detailVal.length==0">暂无数据</div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import api from '@/api'
    import validate from '@/tools/validate'
    export default {
        data: () => ({
            data: {
                agent_list: [],
                cinema_list: []
            },
            detailModal: false,
            detailVal: [],
            modalLoading: false,
            tabVal: 'first',
            loading: false,
        }),
        methods: {
            getData () {
                this.loading = true
                this.$http.get(api.financial.clearingDetail, {
                    params: {
                        id: this.$route.params.id
                    }
                }).then(res => {
                    let that = this
                    setTimeout(function () {
                        that.loading = false
                        if (res.data.code === 1) {
                            that.data = res.data.data
                        } else {
                            that.$message({
                                type: 'error',
                                message: res.data.msg
                            })
                        }
                    }, 500)
                })
            },
            openDetail (id) {
                this.detailVal = []
                this.detailModal = true
                this.modalLoading = true
                this.$http.get(api.financial.clearingDates, {
                    params: {
                        id: id,
                        month: this.$route.query.apply_month
                    }
                }).then(res => {
                    let that = this
                    setTimeout(function () {
                        that.modalLoading = false
                        if (res.data.code === 1) {
                            that.detailVal = res.data.data
                        } else {
                            that.$message.error(res.data.msg)
                        }
                    }, 500)
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
            detailModal (val) {
                if (!val) {
                    document.getElementsByClassName('el-dialog__body')[0].scrollTo(0, 0)
                }
            }
        }
    }
</script>
<style scoped>
</style>
