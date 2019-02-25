<template>
    <div class="bg-white">
        <div class="p-md border-bottom relative">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{name: 'home'}">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{name: 'cinema_list'}">代理商管理</el-breadcrumb-item>
                <el-breadcrumb-item>{{$route.name.indexOf('edit')>0?'编辑代理商':'添加代理商'}}</el-breadcrumb-item>
            </el-breadcrumb>
            <a href="javascript:;" class="btn bg-blue1 text-white btn-back" @click="goBack">返回</a>
        </div>
        <div class="p-o-lg p-v-sm" style="padding-bottom: 50px;" v-loading="loading">
            <div class=" border-bottom">
                <h5 class="border-bottom text-xxlg text-bold p-b-sm">{{$route.name.indexOf('edit')>0?'编辑代理商':'添加代理商'}}</h5>
                <div class="p-v-md">
                    <div class="clear m-b-sm flex">
                        <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>所属区域:</div>
                        <div class="col-xs-9">
                            <el-select v-model="addInfo.region_id" multiple :class="{'border-red': regionError}" @visible-change="statusChange" style="width: 100%;max-width: 366px;" placeholder="请选择所属区域">
                                <el-option
                                    v-for="item in regionList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                            <p v-if="regionError" class="text-red"><span class="fa fa-close m-r-xs"></span>请选择所属区域</p>
                        </div>
                    </div>
                    <div class="clear m-b-sm flex">
                        <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>代理商名称:</div>
                        <div class="col-xs-9">
                            <el-input v-model="addInfo.name" :class="{'border-red': nameError}" @blur="validateName" maxlength="15" placeholder="请输入代理商名称" style="max-width: 366px;"></el-input>
                            <p v-if="nameError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入代理商名称</p>
                        </div>
                    </div>
                    <div class="clear m-b-sm flex">
                        <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>城市:</div>
                        <div class="col-xs-9">
                            <city-select v-model="addInfo.cityLink" :class="{'border-red': cityError}" :pid="addInfo.region_id"></city-select>
                            <p v-if="cityError" class="text-red"><span class="fa fa-close m-r-xs"></span>请选择所属城市</p>
                        </div>
                    </div>
                    <div class="clear m-b-sm flex">
                        <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>详细地址:</div>
                        <div class="col-xs-9">
                            <el-input v-model="addInfo.address" :class="{'border-red': addressError}"  @blur="validateAddress" placeholder="请输入详细地址" style="max-width: 366px;"></el-input>
                            <p v-if="addressError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入详细地址</p>
                        </div>
                    </div>
                    <div class="clear m-b-sm flex">
                        <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>描述:</div>
                        <div class="col-xs-9">
                            <el-input v-model="addInfo.introduce" :class="{'border-red': introduceError}" @blur="validateIntroduce" type="textarea" rows="4" placeholder="请输入代理商描述" style="max-width: 450px;"></el-input>
                            <p v-if="introduceError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入代理商描述</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="p-v-md">
                <div class="clear m-b-sm flex m-t-lg">
                    <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>管理账户(手机号):</div>
                    <div class="col-xs-9">
                        <el-input v-model="addInfo.username" :disabled="$route.name.indexOf('edit')>0" :class="{'border-red': usernameError}" @blur="validateUsername" placeholder="请输入管理账户" style="max-width: 366px;"></el-input>
                        <p v-if="usernameError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入正确的手机号格式</p>
                    </div>
                </div>
                <div class="clear m-b-sm flex">
                    <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>负责人姓名:</div>
                    <div class="col-xs-9">
                        <el-input v-model="addInfo.leader" :class="{'border-red': leaderError}" @blur="validateLeader" placeholder="请输入负责人姓名" style="max-width: 366px;"></el-input>
                        <p v-if="leaderError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入负责人姓名</p>
                    </div>
                </div>
                <div class="clear m-b-sm flex">
                    <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>负责人手机号:</div>
                    <div class="col-xs-9">
                        <el-input v-model="addInfo.leader_phone" :class="{'border-red': leaderPhoneError}" @blur="validateLeaderPhone" placeholder="请输入负责人手机号" style="max-width: 366px;"></el-input>
                        <p v-if="leaderPhoneError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入正确的手机号格式</p>
                    </div>
                </div>
            </div>

            <div class="p-v-md">
                <h5 class="border-bottom text-xxlg text-bold p-b-sm">公司信息</h5>
                <div class="clear m-b-sm flex m-t-lg">
                    <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>公司全称:</div>
                    <div class="col-xs-9">
                        <el-input v-model="addInfo.company" :class="{'border-red': companyError}" @blur="validateCompany" placeholder="请输入公司全称" style="max-width: 366px;"></el-input>
                        <p v-if="companyError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入公司全称</p>
                    </div>
                </div>
                <div class="clear m-b-sm flex">
                    <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>法人姓名:</div>
                    <div class="col-xs-9">
                        <el-input v-model="addInfo.legal_person" :class="{'border-red': legalPersonError}" @blur="validateLegalPerson" placeholder="请输入法人姓名" style="max-width: 366px;"></el-input>
                        <p v-if="legalPersonError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入法人姓名</p>
                    </div>
                </div>
                <div class="clear m-b-sm flex">
                    <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>法人手机号:</div>
                    <div class="col-xs-9">
                        <el-input v-model="addInfo.legal_phone" :class="{'border-red': legalPhoneError}" @blur="validateLegalPhone" placeholder="请输入法人手机号" style="max-width: 366px;"></el-input>
                        <p v-if="legalPhoneError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入正确的手机号格式</p>
                    </div>
                </div>
                <div class="clear m-b-sm flex">
                    <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>法人身份证号:</div>
                    <div class="col-xs-9">
                        <el-input v-model="addInfo.legal_person_id" :class="{'border-red': legalPersonIdError}" @blur="validateLegalPersonId" placeholder="请输入法人身份证号" style="max-width: 366px;"></el-input>
                        <p v-if="legalPersonIdError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入正确的身份证号格式</p>
                    </div>
                </div>
                <div class="clear m-b-sm flex">
                    <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;">邮箱:</div>
                    <div class="col-xs-9">
                        <el-input v-model="addInfo.legal_email" :class="{'border-red': legalEmailError}" @blur="validateLegalEmail" placeholder="请输入邮箱" style="max-width: 366px;"></el-input>
                        <p v-if="legalEmailError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入正确的邮箱格式</p>
                    </div>
                </div>
                <div class="clear m-b-sm flex">
                    <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>上传营业执照:</div>
                    <div class="col-xs-9">
                        <el-upload
                            class="avatar-uploader"
                            :class="{'border-red': licenceError}"
                            :action="uploadUrl"
                            :show-file-list="false"
                            :headers="header"
                            :before-upload="beforeUpload"
                            accept="image/jpeg,jpg,png"
                            :on-success="licenceUpload">
                            <img v-if="addInfo.business_licence" :src="addInfo.business_licence" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <p v-if="licenceError" class="text-red"><span class="fa fa-close m-r-xs"></span>请上传营业执照(2M以内jpg格式图片)</p>
                        <p v-else class="text-999">(请上传2M以内jpg格式图片)</p>
                    </div>
                </div>
            </div>

            <div class="p-v-md">
                <h5 class="border-bottom text-xxlg text-bold p-b-sm">合同信息</h5>
                <div class="clear m-b-sm flex m-t-lg">
                    <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;">合同生效起止日期:</div>
                    <div class="col-xs-9">
                        <el-date-picker
                            style="width: 100%;max-width: 176px;"
                            v-model="addInfo.contract_before_time"
                            type="date"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            placeholder="开始日期">
                        </el-date-picker>
                        -
                        <el-date-picker
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
                        <el-select v-model="addInfo.pay_id" placeholder="请选择汇款方式" style="width: 100%;max-width: 366px;">
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
                        <p class="text-999">(请上传2M以内jpg格式图片)</p>
                        <el-dialog :visible.sync="dialogVisible" title="查看图片">
                            <img width="100%" :src="previewImage" alt="">
                        </el-dialog>
                    </div>
                </div>
            </div>
            <div class="p-v-lg clear">
                <div class="col-xs-3" style="max-width: 200px;"></div>
                <div class="col-xs-9">
                    <el-button type="primary" @click="submit">{{this.$route.name.indexOf('edit') > 0 ? '保存' : '开通'}}</el-button>
                    <el-button @click="goBack">取 消</el-button>
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
            // 验证
            regionError: false,
            nameError: false,
            cityError: false,
            addressError: false,
            introduceError: false,
            leaderError: false,
            leaderPhoneError: false,
            usernameError: false,
            companyError: false,
            legalPersonError: false,
            legalPhoneError: false,
            legalPersonIdError: false,
            legalEmailError: false,
            licenceError: false,
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
                    agent_id: this.$route.params.id,
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
            beforeUpload (file) {
                const isLt2M = file.size / 1024 / 1024 < 2
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 2MB!')
                }
                return isLt2M
            },
            licenceUpload (res, file) {
                console.log(res)
                if (res.code === 1) {
                    this.addInfo.business_licence = res.data.image
                    this.$message({
                        type: 'success',
                        message: '营业执照上传成功'
                    })
                    this.licenceError = false
                } else {
                    this.$message({
                        type: 'error',
                        message: res.msg
                    })
                }
            },
            handleRemove(file, fileList) {
                console.log(fileList)
                this.addInfo.contract = []
                fileList.map(val => {
                    if (val.response && val.response.code === 1) {
                        this.addInfo.contract.push(val.response.data.image)
                    } else if (!val.response && val.isOld) {
                        this.addInfo.contract.push(val.url)
                    }
                })
            },
            handlePictureCardPreview(file) {
                this.previewImage = file.url
                this.dialogVisible = true
            },
            contractUpload (res, file, fileList) {
                console.log(fileList)
                this.addInfo.contract = []
                fileList.map(val => {
                    if (val.response && val.response.code === 1) {
                        this.addInfo.contract.push(val.response.data.image)
                    } else if (!val.response && val.isOld) {
                        this.addInfo.contract.push(val.url)
                    }
                })
            },
            submit () {
                this.validateRegion()
                this.validateName()
                this.validateCity()
                this.validateAddress()
                this.validateIntroduce()
                this.validateNum()
                this.validateLeaderPhone()
                this.validateUsername()
                this.validateLeader()
                this.validateCompany()
                this.validateLegalPerson()
                this.validateLegalPhone()
                this.validateLegalPersonId()
                this.validateLegalEmail()
                this.validateLicence()
                if (this.regionError || this.nameError || this.cityError || this.addressError || this.numError || this.leaderPhoneError || this.usernameError || this.leaderError
                    || this.companyError || this.legalPersonError || this.legalPhoneError || this.legalPersonIdError || this.legalEmailError || this.licenceError || this.introduceError) {
                    this.$message.warning('填写的信息格式不正确')
                    return
                }
                if (this.$route.name.indexOf('edit') > 0) {
                    this.$http.post(api.agent.edit, {
                        ...this.addInfo,
                        region_id: this.addInfo.region_id.join(','),
                        province_id: this.addInfo.cityLink.split('/')[0],
                        city_id: this.addInfo.cityLink.split('/')[1],
                        county_id: this.addInfo.cityLink.split('/')[2],
                        contract: this.addInfo.contract.join(',')
                    }).then(res => {
                        if (res.data.code === 1) {
                            this.$message.success('保存成功')
                            this.$router.go(-1)
                        } else {
                            this.$message.error(res.data.msg)
                        }
                    })
                } else {
                    this.$http.post(api.agent.add, {
                        ...this.addInfo,
                        region_id: this.addInfo.region_id.join(','),
                        province_id: this.addInfo.cityLink.split('/')[0],
                        city_id: this.addInfo.cityLink.split('/')[1],
                        county_id: this.addInfo.cityLink.split('/')[2],
                        contract: this.addInfo.contract.join(',')
                    }).then(res => {
                        if (res.data.code === 1) {
                            this.$message.success('代理商添加成功')
                            this.$router.go(-1)
                        } else {
                            this.$message.error(res.data.msg)
                        }
                    })
                }
            },
            validateRegion () {
                this.regionError = this.addInfo.region_id && this.addInfo.region_id.length > 0 ? false : true
            },
            validateName () {
                this.nameError = this.addInfo.name ? false : true
            },
            validateCity () {
                this.cityError = this.addInfo.cityLink && this.addInfo.cityLink.split('/')[2] ? false : true
            },
            validateAddress () {
                this.addressError = this.addInfo.address ? false : true
            },
            validateIntroduce () {
                this.introduceError = this.addInfo.introduce ? false : true
            },
            validateNum () {
                if(this.addInfo.num) {
                    this.numError = /^([1-9]\d?|0)$/.test(this.addInfo.num) ? false : true
                } else {
                    this.numError = false
                }
            },
            validateLeader () {
                this.leaderError = this.addInfo.leader ? false : true
            },
            validateLeaderPhone () {
                this.leaderPhoneError = validate.mobile(this.addInfo.leader_phone)
            },
            validateUsername () {
                this.usernameError = validate.mobile(this.addInfo.username)
            },
            validateCompany () {
                this.companyError = this.addInfo.company ? false : true
            },
            validateLegalPerson () {
                this.legalPersonError = this.addInfo.legal_person ? false : true
            },
            validateLegalPhone () {
                this.legalPhoneError = validate.mobile(this.addInfo.legal_phone)
            },
            validateLegalPersonId () {
                this.legalPersonIdError = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/.test(this.addInfo.legal_person_id) ? false : true
            },
            validateLegalEmail () {
                if (this.addInfo.legal_email) {
                    this.legalEmailError = validate.email(this.addInfo.legal_email)
                } else {
                    this.legalEmailError = false
                }
            },
            validateLicence () {
                this.licenceError = this.addInfo.business_licence ? false : true
            },
            statusChange () {
                this.isSelect = true
            },
            goBack () {
                this.$router.go(-1)
            }
        },
        created () {
            this.getRegionList()

            if (this.$route.name.indexOf('edit') > 0) {
                this.getData()
            }
        },
        watch: {
            'addInfo.region_id' (val) {
                this.validateRegion()
                if (this.isSelect) {
                    this.addInfo.cityLink = ''
                }
            },
            'addInfo.cityLink' (val) {
                this.validateCity()
            }
        }
    }
</script>
<style scoped>

</style>
