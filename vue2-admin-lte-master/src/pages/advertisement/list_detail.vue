
<template>
    <div class="bg-white">
        <div class="p-md border-bottom relative">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{name: 'agent_check'}">广告列表</el-breadcrumb-item>
                <el-breadcrumb-item>广告详情</el-breadcrumb-item>
            </el-breadcrumb>
            <a href="javascript:;" class="btn bg-blue1 text-white btn-back" @click="goBack">返回</a>
        </div>
        <div class="p-o-lg p-v-sm" style="padding-bottom: 50px;" v-loading="loading">
            <div class=" border-bottom">
                <h5 class="border-bottom text-xxlg text-bold p-b-sm">广告详情</h5>
                <div class="p-v-md">
                    <div class="clear m-b-sm flex">
                        <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>项目名称:</div>
                        <div class="col-xs-9">
                            <el-input v-model="addInfo.name" :class="{'border-red': nameError}" @blur="validateName" placeholder="请输入项目名称" style="max-width: 366px;" disabled></el-input>
                            <p v-if="nameError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入项目名称</p>
                        </div>
                    </div>
                    <div class="clear m-b-sm flex">
                        <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>项目金额:</div>
                        <div class="col-xs-9">
                            <el-input v-model="addInfo.money" :class="{'border-red': moneyError}" @blur="validatemoney" maxlength="15" placeholder="请输入项目金额" style="max-width: 366px;" disabled></el-input>
                            <p v-if="moneyError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入项目金额</p>
                        </div>
                    </div>
                    <div class="clear m-b-sm flex">
                        <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>合同:</div>
                        <div class="col-xs-9">
                            <el-select v-model="addInfo.contract_id" placeholder="请选择合同"  :class="{'border-red': contract_idError}" style="width: 100%;max-width: 366px;" disabled>
                                <el-option
                                    v-for="item in contractOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                            <p v-if="contract_idError" class="text-red"><span class="fa fa-close m-r-xs"></span>请选择合同</p>
                        </div>
                    </div>
                </div>
                <div class="p-v-md">
                    <h5 class="border-bottom text-xxlg text-bold p-b-sm">广告主信息</h5>
                    <div class="clear m-b-sm flex">
                        <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>广告主名称:</div>
                        <div class="col-xs-9">
                            <el-input v-model="addInfo.advertiser_name" :class="{'border-red': advertiser_nameError}" @blur="validateadvertiser_name" maxlength="15" placeholder="请输入广告主名称" style="max-width: 366px;" disabled></el-input>
                            <p v-if="advertiser_nameError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入广告主名称</p>
                        </div>
                    </div>
                    <div class="clear m-b-sm flex">
                        <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>负责人姓名:</div>
                        <div class="col-xs-9">
                            <el-input v-model="addInfo.leader_name" :class="{'border-red': leader_nameError}" @blur="validateleader_name" maxlength="15" placeholder="请输入负责人姓名" style="max-width: 366px;" disabled></el-input>
                            <p v-if="leader_nameError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入负责人姓名</p>
                        </div>
                    </div>
                    <div class="clear m-b-sm flex">
                        <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>负责人联系方式:</div>
                        <div class="col-xs-9">
                            <el-input v-model="addInfo.leader_phone" :class="{'border-red': leader_phoneError}" @blur="validateleader_phone" maxlength="15" placeholder="请输入负责人联系方式" style="max-width: 366px;" disabled></el-input>
                            <p v-if="leader_phoneError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入负责人联系方式</p>
                        </div>
                    </div>
                    <div class="clear m-b-sm flex">
                        <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>邮箱:</div>
                        <div class="col-xs-9">
                            <el-input v-model="addInfo.leader_email" :class="{'border-red': leader_emailError}" @blur="validateleader_email" maxlength="15" placeholder="请输入邮箱" style="max-width: 366px;" disabled></el-input>
                            <p v-if="leader_emailError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入邮箱</p>
                        </div>
                    </div>
                    <div class="clear m-b-sm flex">
                        <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>上传资质:</div>
                        <div class="col-xs-9">
                            <el-upload
                                disabled
                                :class="{'border-red': qualificationsError}"
                                :action="uploadUrl"
                                list-type="picture-card"
                                :file-list="fileList"
                                :on-preview="handlePictureCardPreview"
                                :headers="header"
                                :before-upload="beforeUpload"
                                accept="image/jpeg,jpg,png"
                                :on-remove="handleRemove"
                                :on-success="contractUpload">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <p v-if="qualificationsError" class="text-red"><span class="fa fa-close m-r-xs"></span>请上传资质(2M以内jpg格式图片)</p>
                            <p class="text-999">(请上传2M以内jpg格式图片)</p>
                            <el-dialog :visible.sync="dialogVisible" title="查看图片">
                                <img width="100%" :src="previewImage" alt="">
                            </el-dialog>
                        </div>
                    </div>
                </div>
                <div class="p-v-md">
                    <h5 class="border-bottom text-xxlg text-bold p-b-sm">分账信息</h5>
                    <div class="clear m-b-sm flex">
                        <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>航天:</div>
                        <div class="col-xs-9">
                            <el-input v-model="addInfo.ht_proportion" :class="{'border-red': ht_proportionError}" @blur="validateht_proportion" placeholder="请输入航天" style="max-width: 166px;" disabled></el-input>%
                            <p v-if="ht_proportionError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入正确的航天</p>
                        </div>
                    </div>
                    <div class="clear m-b-sm flex">
                        <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>新光:</div>
                        <div class="col-xs-9">
                            <el-input v-model="addInfo.xg_proportion" :class="{'border-red': xg_proportionError}" @blur="validatexg_proportion" placeholder="请输入新光" style="max-width: 166px;" disabled></el-input>%
                            <p v-if="xg_proportionError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入正确的新光</p>
                        </div>
                    </div>
                    <div class="clear m-b-sm flex">
                        <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>影院:</div>
                        <div class="col-xs-9">
                            <el-input v-model="addInfo.cinema_proportion" :class="{'border-red': cinema_proportionError}" @blur="validatecinema_proportion" placeholder="请输入影院" style="max-width: 166px;" disabled></el-input>%
                            <p v-if="cinema_proportionError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入正确的影院</p>
                        </div>
                    </div>
                </div>
                <div class="p-v-lg clear">
                    <div class="col-xs-3" style="max-width: 200px;"></div>
                    <div class="col-xs-9">
                        <el-button type="primary" @click="submit">{{$route.name.indexOf('edit') > 0 ? '保存' : '新增'}}</el-button>
                        <el-button @click="goBack">取 消</el-button>
                    </div>
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
                hall_list: [],
                items:[]
            },
            addInfo: {},
            contractOptions: [],
            previewImage: '',
            loading: false,
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
                    }
                }).then(res => {
                    let that = this
                    if (res.data.code === 1) {
                        this.addInfo = res.data.data
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
