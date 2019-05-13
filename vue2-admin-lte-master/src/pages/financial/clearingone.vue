<template>
    <div class="bg-white">
        <div class="p-md border-bottom relative">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{name: 'financial_clearing'}">结算管理</el-breadcrumb-item>
                <el-breadcrumb-item>结算详情</el-breadcrumb-item>
            </el-breadcrumb>
            <a href="javascript:;" class="btn bg-blue1 text-white btn-back" @click="goBack">返回</a>
        </div>
        <div class="p-o-lg p-v-sm" style="padding-bottom: 50px;" v-loading="loading">
            <!--<h5 class="border-bottom text-xxlg text-bold p-b-sm">结算详情</h5>-->
            <div class="p-md">
                        <div class="lk-table">
                            <ul class="table-thead clear">
                                <li class="col-xs-1 p-n" style="max-width: 60px;">序号</li>
                                <li class="col-xs-2 p-n">广告ID</li>
                                <li class="col-xs-2 p-n">广告名称</li>
                                <li class="col-xs-2 p-n">下线时间</li>
                                <li class="col-xs-2 p-n">影院名称</li>
                                <li class="col-xs-2 p-n">影院收益</li>
                            </ul>
                            <ul class="table-tbody clear" v-for="(item, index) in data">
                                <li class="col-xs-1 p-n" style="max-width: 60px;">{{index + 1}}</li>
                                <li class="col-xs-2 p-n over-omit" :title="item.ad_id">{{item.ad_id}}</li>
                                <li class="col-xs-2 p-n over-omit" :title="item.ad_name">{{item.ad_name}}</li>
                                <li class="col-xs-2 p-n over-omit" :title="item.ad_end_time">{{item.ad_end_time}}</li>
                                <li class="col-xs-2 p-n over-omit" :title="item.cinema_name">{{item.cinema_name}}</li>
                                <li class="col-xs-2 p-n over-omit" :title="item.income_cinema">{{item.income_cinema}}</li>
                            </ul>
                            <p class="p-v-sm" v-if="data.length<=0">暂无广告收益信息</p>
                        </div>
                    </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import api from '@/api'
    import validate from '@/tools/validate'
    import { mapGetters } from 'vuex'
    export default {
        data: () => ({
            data: {

            },
            loading: false,
        }),
        computed: {
            ...mapGetters([
                'getNavList'
            ])
        },
        methods: {
            getData () {
                this.loading = true
                this.$http.get(api.financial.clearingone, {
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
