<template>
    <div class="bg-white">
        <div class="p-md border-bottom relative">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{name: 'agent_list'}" v-if="fromRouter==='agent_list'">项目列表</el-breadcrumb-item>
                <el-breadcrumb-item :to="{name: 'agent_mine'}" v-else>我的项目</el-breadcrumb-item>
                <el-breadcrumb-item>{{$route.name.indexOf('edit')>0?'编辑项目':'新增项目'}}</el-breadcrumb-item>
            </el-breadcrumb>
            <a href="javascript:;" class="btn bg-blue1 text-white btn-back" @click="goBack">返回</a>
        </div>
        <div class="p-o-lg p-v-sm" style="padding-bottom: 50px;" v-loading="loading">
            <div class=" border-bottom">
                <h5 class="border-bottom text-xxlg text-bold p-b-sm">{{$route.name.indexOf('edit')>0?'编辑项目':'新增项目'}}</h5>
                <div class="p-v-md">
                    <div class="clear m-b-sm flex">
                        <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>项目名称:</div>
                        <div class="col-xs-9">
                            <el-input v-model="addInfo.name" :class="{'border-red': nameError}" @blur="validateName" placeholder="请输入项目名称" style="max-width: 366px;"></el-input>
                            <p v-if="nameError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入项目名称</p>
                        </div>
                    </div>
                    <div class="clear m-b-sm flex">
                        <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>项目金额:</div>
                        <div class="col-xs-9">
                            <el-input v-model="addInfo.money" :class="{'border-red': moneyError}" @blur="validatemoney" maxlength="15" placeholder="请输入项目金额" style="max-width: 366px;"></el-input>
                            <p v-if="moneyError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入项目金额</p>
                        </div>
                    </div>
                    <div class="clear m-b-sm flex">
                        <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>合同:</div>
                        <div class="col-xs-9">
                            <el-select v-model="addInfo.contract_id" placeholder="请选择合同"  :class="{'border-red': contract_idError}" style="width: 100%;max-width: 366px;">
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
                        <el-input v-model="addInfo.advertiser_name" :class="{'border-red': advertiser_nameError}" @blur="validateadvertiser_name" maxlength="15" placeholder="请输入广告主名称" style="max-width: 366px;"></el-input>
                        <p v-if="advertiser_nameError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入广告主名称</p>
                    </div>
                </div>
                <div class="clear m-b-sm flex">
                    <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>负责人姓名:</div>
                    <div class="col-xs-9">
                        <el-input v-model="addInfo.leader_name" :class="{'border-red': leader_nameError}" @blur="validateleader_name" maxlength="15" placeholder="请输入负责人姓名" style="max-width: 366px;"></el-input>
                        <p v-if="leader_nameError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入负责人姓名</p>
                    </div>
                </div>
                <div class="clear m-b-sm flex">
                    <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>负责人联系方式:</div>
                    <div class="col-xs-9">
                        <el-input v-model="addInfo.leader_phone" :class="{'border-red': leader_phoneError}" @blur="validateleader_phone" maxlength="15" placeholder="请输入负责人联系方式" style="max-width: 366px;"></el-input>
                        <p v-if="leader_phoneError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入负责人联系方式</p>
                    </div>
                </div>
                <div class="clear m-b-sm flex">
                    <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>邮箱:</div>
                    <div class="col-xs-9">
                        <el-input v-model="addInfo.leader_email" :class="{'border-red': leader_emailError}" @blur="validateleader_email" maxlength="15" placeholder="请输入邮箱" style="max-width: 366px;"></el-input>
                        <p v-if="leader_emailError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入邮箱</p>
                    </div>
                </div>
                <div class="clear m-b-sm flex">
                    <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>上传资质:</div>
                    <div class="col-xs-9">
                        <el-upload
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
                        <el-input v-model="addInfo.ht_proportion" :class="{'border-red': ht_proportionError}" @blur="validateht_proportion" placeholder="没有请输入0" style="max-width: 166px;"></el-input>%
                        <p v-if="ht_proportionError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入正确的航天比例</p>
                    </div>
                </div>
                <div class="clear m-b-sm flex">
                    <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>新光:</div>
                    <div class="col-xs-9">
                        <el-input v-model="addInfo.xg_proportion" :class="{'border-red': xg_proportionError}" @blur="validatexg_proportion" placeholder="没有请输入0" style="max-width: 166px;"></el-input>%
                        <p v-if="xg_proportionError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入正确的新光比例</p>
                    </div>
                </div>
                <div class="clear m-b-sm flex">
                    <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>影院:</div>
                    <div class="col-xs-9">
                        <el-input v-model="addInfo.cinema_proportion" :class="{'border-red': cinema_proportionError}" @blur="validatecinema_proportion" placeholder="没有请输入0" style="max-width: 166px;"></el-input>%
                        <p v-if="cinema_proportionError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入正确的影院比例</p>
                    </div>
                </div>
            </div>
                <div>
                    <h5 class="border-bottom text-xxlg text-bold p-b-sm">税后</h5>
                    <div class="col-xs-1 p-v-sm text-right">税收</div>
                    <div class="col-xs-2 p-v-sm text-left">6%</div>
                    <span class="col-xs-1 p-v-sm text-right">航天</span>
                    <span class="col-xs-1 p-v-sm text-left">{{addInfo.ht_proportion_after}}</span>
                    <span class="col-xs-1 p-v-sm text-right">新光</span>
                    <span class="col-xs-1 p-v-sm text-left">{{addInfo.xg_proportion_after}}</span>
                    <span class="col-xs-1 p-v-sm text-right">影院</span>
                    <span class="col-xs-1 p-v-sm text-left">{{addInfo.cinema_proportion_after}}</span>
                </div>
                <div class="p-v-md"></div>
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
                hall_list: []
            },
            fileList: [],
            contractOptions: [],
            addInfo:{
                name:'',
                money:'',
                contract_id:'',
                advertiser_name:'',
                leader_name:'',
                leader_phone:'',
                leader_email:'',
                qualifications:'',
                ht_proportion:'',
                xg_proportion:'',
                cinema_proportion:'',
                ht_proportion_after:'',
                xg_proportion_after:'',
                cinema_proportion_after:''
            },
            fromRouter: '',
            dialogVisible: false,
            previewImage: '',
            loading: false,
            // 验证
            nameError: false,
            moneyError: false,
            contract_idError: false,
            advertiser_nameError: false,
            leader_nameError: false,
            leader_phoneError: false,
            leader_emailError: false,
            ht_proportionError: false,
            xg_proportionError: false,
            cinema_proportionError: false,
            openBankError: false,
            qualificationsError :false,
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
                this.$http.post(api.advertisement.projectDetail, {
                    id: this.$route.params.id,
                }).then(res => {
                    let that = this
                    setTimeout(function () {
                        that.loading = false
                    }, 500)
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
            getselectList () {
                this.$http.post(api.advertisement.selectList, {
                    type:1
                }).then(res => {
                    if (res.data.code === 1) {
                        this.contractOptions = res.data.data
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        })
                    }
                })
            },
            beforeUpload (file) {
                const isLt2M = file.size / 1024 / 1024 < 2
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 2MB!')
                }
                return isLt2M
            },
            handleRemove(file, fileList) {
                this.addInfo.qualifications = []
                fileList.map(val => {
                    if (val.response && val.response.code === 1) {
                        this.addInfo.qualifications.push(val.response.data.image)
                    } else if (!val.response && val.isOld) {
                        this.addInfo.qualifications.push(val.url)
                    }
                })
            },
            handlePictureCardPreview(file) {
                this.previewImage = file.url
                this.dialogVisible = true
            },
            contractUpload (res, file, fileList) {
                this.addInfo.qualifications = []
                fileList.map(val => {
                    if (val.response && val.response.code === 1) {
                        this.addInfo.qualifications.push(val.response.data.image)
                        this.qualificationsError = false
                    } else if (!val.response && val.isOld) {
                        this.addInfo.qualifications.push(val.url)
                    }
                })
            },
            submit () {
                this.validateName()
                this.validatemoney()
                this.validateendcontract_id()
                this.validateadvertiser_name()
                this.validateleader_phone()
                this.validateleader_name()
                this.validateleader_email()
                this.validateht_proportion()
                this.validatexg_proportion()
                this.validateContract()
                this.validatecinema_proportion()
                if(parseFloat(this.addInfo.ht_proportion) + parseFloat(this.addInfo.xg_proportion) +parseFloat(this.addInfo.cinema_proportion) !==100){
                    this.$message.warning('分账比例相加必须为100%')
                    return
                }
                if ( this.nameError || this.moneyError || this.contract_idError || this.advertiser_nameError
                        || this.leader_nameError || this.leader_phoneError || this.leader_nameError || this.leader_emailError
                        || this.ht_proportionError || this.xg_proportionError || this.cinema_proportionError || this.qualificationsError
                ) {
                    this.$message.warning('填写的信息格式不正确')
                    return
                }
                    if (this.$route.name.indexOf('edit') > 0) {
                        this.$http.post(api.advertisement.projectEdit, {
                            name:this.addInfo.name,
                            money:this.addInfo.money,
                            contract_id:this.addInfo.contract_id,
                            advertiser_name:this.addInfo.advertiser_name,
                            leader_name:this.addInfo.leader_name,
                            leader_phone:this.addInfo.leader_phone,
                            leader_email:this.addInfo.leader_email,
                            qualifications:this.addInfo.qualifications,
                            ht_proportion:this.addInfo.ht_proportion,
                            xg_proportion:this.addInfo.xg_proportion,
                            cinema_proportion:this.addInfo.cinema_proportion,
                        }).then(res => {
                            if (res.data.code === 1) {
                                this.$message.success('保存成功')
                                this.isDraft = true
                                this.$router.go(-1)
                            } else {
                                this.$message.error(res.data.msg)
                            }
                        })
                    } else {
                        this.$http.post(api.advertisement.projectAdd, {
                            name:this.addInfo.name,
                            money:this.addInfo.money,
                            contract_id:this.addInfo.contract_id,
                            advertiser_name:this.addInfo.advertiser_name,
                            leader_name:this.addInfo.leader_name,
                            leader_phone:this.addInfo.leader_phone,
                            leader_email:this.addInfo.leader_email,
                            qualifications:this.addInfo.qualifications,
                            ht_proportion:this.addInfo.ht_proportion,
                            xg_proportion:this.addInfo.xg_proportion,
                            cinema_proportion:this.addInfo.cinema_proportion,
                        }).then(res => {
                            if (res.data.code === 1) {
                                this.$message.success('代理商新增成功')
                                this.isDraft = true
                                this.$router.go(-1)
                            } else {
                                this.$message.error(res.data.msg)
                            }
                        })
                    }

            },
            validateName () {
                this.nameError = this.addInfo.name ? false : true
            },
            validateOpenBank () {
                this.openBankError = this.addInfo.open_bank ? false : true
            },
            validateContract () {
                this.qualificationsError = this.addInfo.qualifications.length>0 ? false : true
            },
            validatemoney(){
                this.moneyError = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(this.addInfo.money) ? false : true
            },
            validateendcontract_id () {
                this.contract_idError = this.addInfo.contract_id ? false :true
            },
            validateadvertiser_name () {
                this.advertiser_nameError = this.addInfo.advertiser_name ? false : true
            },
            validateleader_name () {
                this.leader_nameError = this.addInfo.leader_name ? false : true
            },
            validateleader_phone () {
                this.leader_phoneError = validate.mobile(this.addInfo.leader_phone)
            },
            validateleader_email () {
                this.leader_emailError = validate.email(this.addInfo.leader_email)
            },
            validateht_proportion() {
                this.ht_proportionError =/^([0-9]\d?|100)(\.\d{1,2})*$/.test(this.addInfo.ht_proportion) ? false : true
            },
            validatexg_proportion() {
                this.xg_proportionError =/^([0-9]\d?|100)(\.\d{1,2})*$/.test( this.addInfo.xg_proportion) ? false :true
            },
            validatecinema_proportion() {
                this.cinema_proportionError =/^([0-9]\d?|100)(\.\d{1,2})*$/.test(this.addInfo.cinema_proportion) ? false :true
            },
            goBack () {
                this.$router.go(-1)
            }
        },
        created () {
            this.getselectList()
            if (this.$route.name.indexOf('edit') > 0) {
                this.getData()
                this.getselectList()
            }
        },
        watch: {
            'addInfo.contract_id' (val) {
                this.contract_idError = false
            },
            'addInfo.ht_proportion' (val) {
                this.addInfo.ht_proportion_after = (parseFloat(this.addInfo.ht_proportion) * 0.94).toFixed(2)
                if(this.addInfo.ht_proportion == ''){
                    this.addInfo.ht_proportion_after = ''
                }
            },
            'addInfo.xg_proportion' (val) {
                this.addInfo.xg_proportion_after = (parseFloat(this.addInfo.xg_proportion) * 0.94).toFixed(2)
                if(this.addInfo.xg_proportion == ''){
                    this.addInfo.xg_proportion_after = ''
                }
            },
            'addInfo.cinema_proportion' (val) {
                this.addInfo.cinema_proportion_after = (parseFloat(this.addInfo.cinema_proportion) * 0.94).toFixed(2)
                if(this.addInfo.cinema_proportion == ''){
                    this.addInfo.cinema_proportion_after = ''
                }
            }
        }
    }
</script>
<style scoped>

</style>
