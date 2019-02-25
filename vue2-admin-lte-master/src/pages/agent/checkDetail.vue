<template>
    <div class="bg-white">
        <div class="p-md border-bottom relative">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{name: 'home'}">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{name: 'agent_check'}">代理商审核列表</el-breadcrumb-item>
                <el-breadcrumb-item>审核代理商</el-breadcrumb-item>
            </el-breadcrumb>
            <a href="javascript:;" class="btn bg-blue1 text-white btn-back" @click="goBack">返回</a>
        </div>
        <div class="p-o-lg p-v-sm" style="padding-bottom: 50px;" v-loading="loading">
            <div class=" border-bottom">
                <h5 class="border-bottom text-xxlg text-bold p-b-sm">审核代理商</h5>
                <div class="p-v-md">
                    <div class="clear m-b-sm flex">
                        <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>所属区域:</div>
                        <div class="col-xs-9">
                            <el-select v-model="addInfo.region_id" multiple disabled style="width: 100%;max-width: 366px;" placeholder="请选择所属区域">
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
                        <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>代理商名称:</div>
                        <div class="col-xs-9">
                            <el-input v-model="addInfo.name" disabled maxlength="15" placeholder="请输入代理商名称" style="max-width: 366px;"></el-input>
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
                        <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>描述:</div>
                        <div class="col-xs-9">
                            <el-input v-model="addInfo.introduce" disabled type="textarea" rows="4" placeholder="请输入代理商描述" style="max-width: 450px;"></el-input>
                        </div>
                    </div>
                </div>
            </div>

            <div class="p-v-md">
                <div class="clear m-b-sm flex m-t-lg">
                    <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>管理账户(手机号):</div>
                    <div class="col-xs-9">
                        <el-input v-model="addInfo.username" disabled  placeholder="请输入管理账户" style="max-width: 366px;"></el-input>
                    </div>
                </div>
                <div class="clear m-b-sm flex">
                    <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>负责人姓名:</div>
                    <div class="col-xs-9">
                        <el-input v-model="addInfo.leader" disabled  placeholder="请输入负责人姓名" style="max-width: 366px;"></el-input>
                    </div>
                </div>
                <div class="clear m-b-sm flex">
                    <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>负责人手机号:</div>
                    <div class="col-xs-9">
                        <el-input v-model="addInfo.leader_phone" disabled placeholder="请输入负责人手机号" style="max-width: 366px;"></el-input>
                    </div>
                </div>
            </div>

            <div class="p-v-md">
                <h5 class="border-bottom text-xxlg text-bold p-b-sm">公司信息</h5>
                <div class="clear m-b-sm flex m-t-lg">
                    <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>公司全称:</div>
                    <div class="col-xs-9">
                        <el-input v-model="addInfo.company" disabled placeholder="请输入公司全称" style="max-width: 366px;"></el-input>
                    </div>
                </div>
                <div class="clear m-b-sm flex">
                    <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>法人姓名:</div>
                    <div class="col-xs-9">
                        <el-input v-model="addInfo.legal_person" disabled  placeholder="请输入法人姓名" style="max-width: 366px;"></el-input>
                    </div>
                </div>
                <div class="clear m-b-sm flex">
                    <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>法人手机号:</div>
                    <div class="col-xs-9">
                        <el-input v-model="addInfo.legal_phone" disabled placeholder="请输入法人手机号" style="max-width: 366px;"></el-input>
                    </div>
                </div>
                <div class="clear m-b-sm flex">
                    <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>法人身份证号:</div>
                    <div class="col-xs-9">
                        <el-input v-model="addInfo.legal_person_id" disabled placeholder="请输入法人身份证号" style="max-width: 366px;"></el-input>
                    </div>
                </div>
                <div class="clear m-b-sm flex">
                    <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;">邮箱:</div>
                    <div class="col-xs-9">
                        <el-input v-model="addInfo.legal_email" disabled placeholder="请输入邮箱" style="max-width: 366px;"></el-input>
                    </div>
                </div>
                <div class="clear m-b-sm flex">
                    <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>上传营业执照:</div>
                    <div class="col-xs-9">
                        <el-upload
                            disabled
                            class="avatar-uploader"
                            :action="uploadUrl"
                            :show-file-list="false"
                            :headers="header"
                            accept="image/jpeg,jpg,png">
                            <a v-if="addInfo.business_licence" target="_blank" :href="addInfo.business_licence"><img :src="addInfo.business_licence" class="avatar"></a>
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </div>
                </div>
            </div>

            <div class="p-v-md">
                <h5 class="border-bottom text-xxlg text-bold p-b-sm">合同信息</h5>
                <div class="clear m-b-sm flex m-t-lg">
                    <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;">合同生效起止日期:</div>
                    <div class="col-xs-9">
                        <el-date-picker
                            disabled
                            style="width: 100%;max-width: 176px;"
                            v-model="addInfo.contract_before_time"
                            type="date"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            placeholder="开始日期">
                        </el-date-picker>
                        -
                        <el-date-picker
                            disabled
                            style="width: 100%;max-width: 176px;"
                            v-model="addInfo.contract_after_time"
                            type="date"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            placeholder="结束日期">
                        </el-date-picker>
                    </div>
                </div>
                <div class="clear m-b-sm flex">
                    <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;">汇款方式:</div>
                    <div class="col-xs-9">
                        <el-select v-model="addInfo.pay_id" disabled placeholder="请选择汇款方式" style="width: 100%;max-width: 366px;">
                            <el-option
                                v-for="item in contractOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="clear m-b-sm flex">
                    <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;">到账日期:</div>
                    <div class="col-xs-9">
                        <el-date-picker
                            disabled
                            style="width: 100%;max-width: 366px;"
                            v-model="addInfo.arrival_account_time"
                            type="date"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            placeholder="到账日期">
                        </el-date-picker>
                    </div>
                </div>
                <div class="clear m-b-sm flex">
                    <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;">上传合同:</div>
                    <div class="col-xs-9">
                        <el-upload
                            disabled
                            class="check-detail-upload"
                            :action="uploadUrl"
                            :file-list="fileList"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :headers="header"
                            accept="image/jpeg,jpg,png">
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible" title="查看图片">
                            <img width="100%" :src="previewImage" alt="">
                        </el-dialog>
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
    import CitySelect from '@/components/citySelect'
    export default {
        data: () => ({
            data: {
                hall_list: []
            },
            remark: '',
            fileList: [],
            addInfo: {
                cityLink: '',
                name: '',
                region_id: [],
                province_id: '',
                city_id: '',
                county_id: '',
                address: '',
                leader: '',
                leader_phone: '',
                legal_person: '',
                legal_person_id: '',
                business_licence: '',
                introduce: '',
                username: '',
                legal_email: '',
                legal_phone: '',
                contract: [],
                company: '',
                contract_before_time: '',
                contract_after_time: '',
                arrival_account_time: '',
                pay_id: ''
            },
            contractOptions: [
                {
                    label: '转账',
                    value: 1
                },
                {
                    label: '汇款',
                    value: 2
                },
                {
                    label: '支票',
                    value: 3
                }
            ],
            dialogVisible: false,
            previewImage: '',
            loading: false,
            regionList: [],
            isSelect: false,
            header: {ContentType: 'application/x-www-form-urlencoded'},
        }),
        computed: {
            uploadUrl () {
                return api.common.upload
            }
        },
        components: {
            CitySelect
        },
        methods: {
            getData () {
                this.loading = true
                this.$http.get(api.agent.detail, {
                    params: {
                        id: this.$route.params.id,
                        type: 2
                    }
                }).then(res => {
                    let that = this
                    setTimeout(function () {
                        that.loading = false
                    }, 500)
                    if (res.data.code === 1) {
                        this.addInfo = res.data.data
                        this.addInfo.region_id = this.addInfo.region_id.split(',').map(val => {
                            return parseInt(val)
                        })
                        this.addInfo.pay_id = this.addInfo.pay_id ? this.addInfo.pay_id : ''
                        this.$set(this.addInfo, 'cityLink', this.addInfo.province_id + '/' + this.addInfo.city_id + '/' + this.addInfo.county_id)
                        this.fileList = this.addInfo.contract.map(val => {
                            return {
                                isOld: true,
                                url: val
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
            handlePictureCardPreview(file) {
                this.previewImage = file.url
                this.dialogVisible = true
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
                this.$http.post(api.agent.check, {
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
                        this.$router.go(-1)
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
