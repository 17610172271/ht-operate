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
            <h5 class="border-bottom text-xxlg text-bold p-b-sm">结算信息</h5>
            <el-tabs v-model="tabVal">
                <el-tab-pane label="代理商收益" name="first">
                    <div class="p-sm">
                        <div class="lk-table">
                            <ul class="table-thead clear">
                                <li class="col-xs-1 p-n" style="max-width: 60px;">序号</li>
                                <li class="col-xs-2 p-n">代理商编号</li>
                                <li class="col-xs-2 p-n">代理商</li>
                                <li class="col-xs-2 p-n">分账比例</li>
                                <li class="col-xs-1 p-n">金额</li>
                                <li class="col-xs-3 p-n">时间</li>
                            </ul>
                            <ul class="table-tbody clear" v-for="(item, index) in data.hall_list">
                                <li class="col-xs-1 p-n" style="max-width: 60px;">{{index + 1}}</li>
                                <li class="col-xs-2 p-n over-omit" :title="item.name">{{item.name}}</li>
                                <li class="col-xs-2 p-n over-omit" :title="item.nas_name">{{item.nas_name}}</li>
                                <li class="col-xs-2 p-n over-omit" :title="item.nas_code">{{item.nas_code}}</li>
                                <li class="col-xs-1 p-n over-omit" :title="item.play_name">{{item.play_name}}</li>
                                <li class="col-xs-3 p-n over-omit" :title="item.play_code">{{item.play_code}}</li>
                            </ul>
                            <p class="p-v-sm" v-if="data.hall_list.length<=0">暂无代理商收益信息</p>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="影院收益" name="second">
                    <div class="p-sm">
                        <div class="lk-table">
                            <ul class="table-thead clear">
                                <li class="col-xs-1 p-n" style="max-width: 60px;">序号</li>
                                <li class="col-xs-2 p-n">影院编号</li>
                                <li class="col-xs-2 p-n">影院名称</li>
                                <li class="col-xs-1 p-n">分账比</li>
                                <li class="col-xs-2 p-n">影片</li>
                                <li class="col-xs-1 p-n">金额</li>
                                <li class="col-xs-3 p-n">时间</li>
                            </ul>
                            <ul class="table-tbody clear" v-for="(item, index) in data.apply_list">
                                <li class="col-xs-1 p-n" style="max-width: 60px;">{{index + 1}}</li>
                                <li class="col-xs-2 p-n over-omit" :title="item.code">{{item.code}}</li>
                                <li class="col-xs-2 p-n over-omit" :title="item.create_time">{{item.create_time}}</li>
                                <li class="col-xs-1 p-n over-omit" :title="item.num">{{item.num}}</li>
                                <li class="col-xs-2 p-n over-omit" :title="item.leader">{{item.leader}}</li>
                                <li class="col-xs-1 p-n over-omit" :title="item.leader_phone">{{item.leader_phone}}</li>
                                <li class="col-xs-3 p-n over-omit" :title="item.check_time">{{item.check_time}}</li>
                            </ul>
                            <p class="p-v-sm" v-if="data.apply_list.length<=0">暂无影院收益信息</p>
                        </div>
                    </div>
                </el-tab-pane>
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
            tabVal: 'first',
            loading: false,
        }),
        methods: {
            getData () {
//                this.loading = true
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
</style>
