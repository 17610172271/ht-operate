<template>
    <div class="bg-white">
        <div class="p-md border-bottom relative">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{name: 'home'}">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{name: 'cinema_list'}">影院管理</el-breadcrumb-item>
                <el-breadcrumb-item>编辑影院</el-breadcrumb-item>
            </el-breadcrumb>
            <a href="javascript:;" class="btn bg-blue1 text-white btn-back" @click="goBack">返回</a>
        </div>
        <div class="p-o-lg p-v-sm" style="padding-bottom: 50px;" v-loading="loading">
            <div>
                <h5 class="border-bottom text-xxlg text-bold p-b-sm">编辑影院</h5>
                <div class="p-v-md">
                    <div class="clear m-b-sm flex">
                        <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;">所属代理商:</div>
                        <div class="col-xs-9 p-v-sm">{{addInfo.upper_agent}}</div>
                    </div>
                    <div class="clear m-b-sm flex">
                        <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>所属区域:</div>
                        <div class="col-xs-9">
                            <el-select v-model="addInfo.region_id" disabled style="width: 100%;max-width: 366px;" placeholder="请选择所属区域">
                                <el-option
                                    v-for="item in regionList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="clear m-b-sm flex">
                        <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>影院名称:</div>
                        <div class="col-xs-9">
                            <el-input v-model="addInfo.name" disabled maxlength="15" placeholder="请输入影院名称" style="max-width: 366px;"></el-input>
                        </div>
                    </div>
                    <div class="clear m-b-sm flex">
                        <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>城市:</div>
                        <div class="col-xs-9">
                            <city-select v-model="addInfo.cityLink" disabled :pid="addInfo.region_id"></city-select>
                        </div>
                    </div>
                    <div class="clear m-b-sm flex">
                        <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>详细地址:</div>
                        <div class="col-xs-9">
                            <el-input v-model="addInfo.address" disabled placeholder="请输入详细地址" style="max-width: 366px;"></el-input>
                        </div>
                    </div>
                    <div class="clear m-b-sm flex">
                        <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;">影院描述:</div>
                        <div class="col-xs-9">
                            <el-input v-model="addInfo.introduce" disabled type="textarea" rows="4" placeholder="请输入影院描述" style="max-width: 450px;"></el-input>
                        </div>
                    </div>
                </div>
            </div>
            <div class="border-bottom p-v-lg">
                <div class="clear m-b-sm flex">
                    <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;">审核备注:</div>
                    <div class="col-xs-9">
                        <el-input v-model="remark" type="textarea" rows="6" placeholder="请输入审核备注" style="max-width: 450px;"></el-input>
                    </div>
                </div>
            </div>

            <div class="p-v-lg clear">
                <div class="col-xs-3" style="max-width: 200px;"></div>
                <div class="col-xs-9">
                    <el-button style="min-width: 84px;" type="primary" @click="checkSubmit('pass')">通过</el-button>
                    <el-button style="min-width: 84px;" type="danger" @click="checkSubmit('notpass')">不通过</el-button>
                    <el-button style="min-width: 84px;" @click="goBack">取 消</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import api from '@/api'
    import validate from '@/tools/validate'
    import CitySelect from '@/components/citySelect1'
    export default {
        data: () => ({
            data: {
                hall_list: []
            },
            remark: '',
            addInfo: {
                upper_agent: '',
                cityLink: '',
                name: '',
                region_id: '',
                province_id: '',
                city_id: '',
                county_id: '',
                address: '',
                leader: '',
                leader_phone: '',
                num: '',
                apply_remark: ''
            },
            loading: false,
            regionList: [],
            isSelect: false,
        }),

        components: {
            CitySelect
        },
        methods: {
            getData () {
                this.loading = true
                this.$http.get(api.cinema.editDetail, {
                    params: {
                        id: this.$route.params.id
                    }
                }).then(res => {
                    let that = this
                    setTimeout(function () {
                        that.loading = false
                    }, 500)
                    if (res.data.code === 1) {
                        this.addInfo = res.data.data
                        this.$set(this.addInfo, 'cityLink', this.addInfo.province_id + '/' + this.addInfo.city_id + '/' + this.addInfo.county_id)
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        })
                    }
                })
            },
            //获取区域列表
            getRegionList () {
                this.$http.post(api.common.getCity, {
                    status: 1
                }).then(res => {
                    if (res.data.code === 1) {
                        this.regionList = res.data.data
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        })
                    }
                })
            },
            //审核
            checkSubmit (type) {
                if (type === 'notpass') {
                    this.$confirm('此操作将\'不通过审核\', 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        if (!this.remark) {
                            this.$message({
                                type: 'warning',
                                message: '审核不通过备注不能为空'
                            })
                            return
                        } else {
                            this.sendCheck(type)
                        }
                    })
                } else {
                    this.$confirm('此操作将\'通过审核\', 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.sendCheck(type)
                    })
                }
            },
            sendCheck (type) {
                this.$http.post(api.cinema.check, {
                    id: this.$route.params.id,
                    status: type === 'pass' ? 1 : 3,
                    check_remark: this.remark
                }).then(res => {
                    let that = this
                    setTimeout(function () {
                        that.loading = false
                    }, 500)
                    if (res.data.code === 1) {
                        this.$message({
                            type: 'success',
                            message: '审核成功'
                        })
                        this.$router.push({name: 'cinema_check'})
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
            this.getRegionList()
            this.getData()
        },
        watch: {
        }
    }
</script>
<style scoped>

</style>
