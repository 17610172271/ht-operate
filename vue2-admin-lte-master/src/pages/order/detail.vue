<template>
    <div class="">
        <div class="p-lg appli-container">
            <sub-header :list="subNavList"></sub-header>
            <div class="page-container">
                <div class="m-t-sm">
                    <div class="text-lg">当前订单状态 : <span :class="{'text-red': data.trade_status > 1, 'text-green': data.trade_status == 1, 'text-orange': data.trade_status == 0}">{{data.status_name}}</span></div>
                    <div class="clear order-container">
                        <div class="pull-right" v-if="data.trade_status==0">
                            <el-button type="info" size="small" round plain @click="cancelOrder">取消订单</el-button>
                        </div>
                    </div>
                    <div class="container-fluid order-container p-t-md">
                        <div>订单信息:</div>
                        <div class="m-t-sm border-container">
                            <div class=" clear bg-f9">
                                <div class="col-xs-4 col-md-4 p-o-n film-add-name p-v-sm  text-center">订单编号</div>

                                <div class="col-xs-4 col-md-4 p-o-n film-add-name p-v-sm  text-center">下单时间</div>

                                <div class="col-xs-4 col-md-4 p-o-n film-add-name p-v-sm  text-center border-right-none">预约时间</div>

                            </div>
                            <div class=" clear">
                                <div class="col-xs-4 col-md-4 p-o-n film-add-name p-v-sm  text-center">{{data.trade_id}}</div>
                                <div class="col-xs-4 col-md-4 p-o-n film-add-name p-v-sm  text-center">{{format(data.trade_create_time*1000)}}</div>
                                <div class="col-xs-4 col-md-4 p-o-n film-add-name p-v-sm  text-center border-right-none">{{format(data.trade_start_time*1000)}}</div>
                            </div>
                            <div class=" clear bg-f9">
                                <div class="col-xs-4 col-md-4 p-o-n film-add-name p-v-sm  text-center">用户名称</div>

                                <div class="col-xs-4 col-md-4 p-o-n film-add-name p-v-sm  text-center">代理商</div>

                                <div class="col-xs-4 col-md-4 p-o-n film-add-name p-v-sm  text-center border-right-none">区域代理</div>

                            </div>
                            <div class=" clear">
                                <div class="col-xs-4 col-md-4 p-o-n film-add-name p-v-sm  text-center">{{data.username}}</div>
                                <div class="col-xs-4 col-md-4 p-o-n film-add-name p-v-sm  text-center">{{data.agent_name}}</div>
                                <div class="col-xs-4 col-md-4 p-o-n film-add-name p-v-sm  text-center border-right-none">{{data.region_agent_name}}</div>
                            </div>
                            <div class=" clear bg-f9">
                                <div class="col-xs-4 col-md-4 p-o-n film-add-name p-v-sm  text-center">影院名称</div>

                                <div class="col-xs-4 col-md-4 p-o-n film-add-name p-v-sm  text-center">影厅名称</div>

                                <div class="col-xs-4 col-md-4 p-o-n film-add-name p-v-sm  text-center border-right-none">影厅号</div>

                            </div>
                            <div class=" clear">
                                <div class="col-xs-4 col-md-4 p-o-n film-add-name p-v-sm  text-center">{{data.cinema_name}}</div>
                                <div class="col-xs-4 col-md-4 p-o-n film-add-name p-v-sm  text-center">{{data.hall_name}}</div>
                                <div class="col-xs-4 col-md-4 p-o-n film-add-name p-v-sm  text-center border-right-none">{{data.hall_code}}</div>
                            </div>
                            <div class=" clear bg-f9">
                                <div class="col-xs-4 col-md-4 p-o-n film-add-name p-v-sm  text-center">影片名称</div>

                                <div class="col-xs-4 col-md-4 p-o-n film-add-name p-v-sm  text-center">支付方式</div>

                                <div class="col-xs-4 col-md-4 p-o-n film-add-name p-v-sm  text-center border-right-none">订单来源</div>

                            </div>
                            <div class=" clear">
                                <div class="col-xs-4 col-md-4 p-o-n film-add-name p-v-sm  text-center">{{data.goods_name}}</div>
                                <div class="col-xs-4 col-md-4 p-o-n film-add-name p-v-sm  text-center">{{data.pay_type}}</div>
                                <div class="col-xs-4 col-md-4 p-o-n film-add-name p-v-sm  text-center border-right-none">{{data.trade_origin}}</div>
                            </div>
                            <div class=" clear bg-f9">
                                <div class="col-xs-4 col-md-4 p-o-n film-add-name p-v-sm  text-center">实际金额</div>

                                <div class="col-xs-4 col-md-4 p-o-n film-add-name p-v-sm  text-center">优惠金额</div>

                                <div class="col-xs-4 col-md-4 p-o-n film-add-name p-v-sm  text-center border-right-none">付款金额</div>

                            </div>
                            <div class=" clear">
                                <div class="col-xs-4 col-md-4 p-o-n film-add-name p-v-sm  text-center">{{data.trade_money}}</div>
                                <div class="col-xs-4 col-md-4 p-o-n film-add-name p-v-sm  text-center">{{data.discount_money}}</div>
                                <div class="col-xs-4 col-md-4 p-o-n film-add-name p-v-sm  text-center border-right-none">{{data.pay_money}}</div>
                            </div>
                        </div>
                        <div class="m-t-sm">购买人信息：</div>
                        <div  class="m-t-sm border-container">
                            <div class="clear bg-f9">
                                <div class="col-xs-3 col-md-3 p-o-n film-add-name p-v-sm  text-center">购买人</div>

                                <div class="col-xs-3 col-md-3 p-o-n film-add-name p-v-sm  text-center">手机号</div>

                                <div class="col-xs-3 col-md-3 p-o-n film-add-name p-v-sm  text-center">城市</div>

                                <div class="col-xs-3 col-md-3 p-o-n film-add-name p-v-sm  text-center border-right-none">影片类型</div>

                            </div>
                            <div class=" clear">
                                <div class="col-xs-4 col-md-3 p-o-n film-add-name p-v-sm  text-center">{{data.buyer}}</div>
                                <div class="col-xs-4 col-md-3 p-o-n film-add-name p-v-sm  text-center">{{data.buyer_mobile}}</div>
                                <div class="col-xs-4 col-md-3 p-o-n film-add-name p-v-sm  text-center">{{data.buyer_city}}</div>
                                <div class="col-xs-4 col-md-3 p-o-n film-add-name p-v-sm  text-center border-right-none">{{data.film_class}}</div>
                            </div>
                        </div>

                        <div class="m-t-sm">操作信息：</div>
                        <div  class="m-t-sm border-container">
                            <div class=" clear bg-f9">
                                <div class="col-xs-4 col-md-3 p-o-n film-add-name p-v-sm  text-center">操作者</div>

                                <div class="col-xs-4 col-md-3 p-o-n film-add-name p-v-sm  text-center">操作时间</div>

                                <div class="col-xs-4 col-md-3 p-o-n film-add-name p-v-sm  text-center">操作信息</div>

                                <div class="col-xs-4 col-md-3 p-o-n film-add-name p-v-sm  text-center border-right-none">备注信息</div>
                            </div>
                            <div class=" clear" v-for="item in data.operate_list">
                                <div class="col-xs-4 col-md-3 p-o-n film-add-name p-v-sm  text-center">{{item.operate_name}}</div>
                                <div class="col-xs-4 col-md-3 p-o-n film-add-name p-v-sm  text-center">{{format(item.operate_time*1000)}}</div>
                                <div class="col-xs-4 col-md-3 p-o-n film-add-name p-v-sm  text-center">{{item.cinema_msg}}</div>
                                <div class="col-xs-4 col-md-3 p-o-n film-add-name p-v-sm  text-center border-right-none">{{item.remark}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import SubHeader from '../common/subheader'
    import api from '@/api'
    import format from '@/tools/format'
    export default {
        data: () => ({
            data: '',
            subNavList: {
                parentNode: {
                    name: '订单管理',
                    router: {
                        name: 'order_list'
                    }
                },
                childNode: {
                    name: '订单详情',
                    desc: '主要用订单的查看及管理',
                    router: {
                        name: 'order_Orderdetails'
                    }
                }
            }
        }),
        components: {
            SubHeader
        },
        methods: {
            getData () {
                this.$http.get(api.order.detail, {
                    params: {
                        id: this.$route.params.id
                    }
                }).then(res => {
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
            cancelOrder () {
                this.$confirm( '此操作将取消该订单', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                    this.$http.get(api.order.cancel, {
                        params: {
                            trade_id: this.data.trade_id
                        }
                    }).then(res => {
                        if (res.data.code === 1) {
                            this.$message({
                                type: 'success',
                                message: '订单取消成功'
                            })
                            this.data.trade_status = 2
                        } else {
                            this.$message({
                                type: 'error',
                                message: res.data.msg
                            })
                        }
                    })
                })
            },
            submit () {},
            format: format
        },
        created () {
            this.page = this.$route.query.page ? parseInt(this.$route.query.page) : 1
            this.getData()
        },
        watch: {
            '$route' (val) {
                this.getData()
            }
        }
    }
</script>
<style scoped>
    .order-container {
        max-width: 900px;
        margin: 0px auto;
    }
</style>
