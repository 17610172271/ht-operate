<template>
    <div class="bg-white">
        <div class="p-md border-bottom relative">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{name: 'cinema_list'}">影院列表</el-breadcrumb-item>
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
                            <el-select v-model="addInfo.region_id" :class="{'border-red': regionError}" @visible-change="statusChange" style="width: 100%;max-width: 366px;" placeholder="请选择所属区域">
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
                        <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>影院名称:</div>
                        <div class="col-xs-9">
                            <el-input v-model="addInfo.name" :class="{'border-red': nameError}" @blur="validateName" maxlength="15" placeholder="请输入影院名称" style="max-width: 366px;"></el-input>
                            <p v-if="nameError" class="text-red"><span class="fa fa-close m-r-xs"></span>影院名称不能为空</p>
                        </div>
                    </div>
                    <div class="clear m-b-sm flex">
                        <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>城市:</div>
                        <div class="col-xs-9">
                            <city-select v-model="addInfo.cityLink" :class="{'border-red': cityError}" :pid="addInfo.region_id"></city-select>
                            <p v-if="cityError" class="text-red"><span class="fa fa-close m-r-xs"></span>请选择省市区</p>
                        </div>
                    </div>
                    <div class="clear m-b-sm flex">
                        <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>详细地址:</div>
                        <div class="col-xs-9">
                            <el-input v-model="addInfo.address" :class="{'border-red': addressError}" @focus="addressSearchShow=true"  @blur="validateAddress" placeholder="请输入详细地址" style="max-width: 366px;"></el-input>
                            <ul class="search-list-container" v-if="addInfo.address && addressSearchShow">
                                <li v-for="item in searchList" class="over-omit p-v-xs p-o-sm" @click="selectItem(item)">{{item.district}}-{{item.address.length > 0 ? item.address : ''}}-{{item.name}}</li>
                            </ul>
                            <div class="modal1" v-if="addInfo.address && addressSearchShow" @click="addressSearchShow=false"></div>
                            <p v-if="addressError" class="text-red"><span class="fa fa-close m-r-xs"></span>详细地址不能为空</p>
                        </div>
                    </div>
                    <div class="clear m-b-sm flex">
                        <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"></div>
                        <div class="col-xs-9">
                            <map-search :address="addInfo.address" :position="position" @marker="getPosition" @searchResult="getResult"></map-search>
                        </div>
                    </div>
                    <div class="clear m-b-sm flex">
                        <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;">影院描述:</div>
                        <div class="col-xs-9">
                            <el-input v-model="addInfo.introduce" type="textarea" rows="4" placeholder="请输入影院描述" style="max-width: 450px;"></el-input>
                        </div>
                    </div>
                </div>
                <div class="p-v-md border-bottom">
                    <h5 class="border-bottom text-xxlg text-bold p-b-sm">公司信息</h5>
                    <div class="clear m-b-sm flex">
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
                        <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>邮箱:</div>
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
                            <p v-else class="text-999">(请上传2M以内jpg格式图片)</p >
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-v-lg clear border-top">
                <div class="col-xs-3" style="max-width: 200px;"></div>
                <div class="col-xs-9">
                    <el-button type="primary" @click="submit">保 存</el-button>
                    <el-button @click="goBack">取 消</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import api from '@/api'
    import validate from '@/tools/validate'
    import CitySelect from '@/components/citySelect1'
    import MapSearch from '@/components/mapSearch'
    export default {
        data: () => ({
            data: {
                hall_list: []
            },
            position: [],
            addressSearchShow: false,
            searchList: [],
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
                apply_remark: '',
                company:'',
                legal_person:'',
                legal_phone:'',
                legal_person_id:'',
                legal_email:'',
                business_licence:'',
            },
            header: {ContentType: 'application/x-www-form-urlencoded'},
            address: '',
            loading: false,
            regionList: [],
            isSelect: false,
            // 验证
            regionError: false,
            nameError: false,
            cityError: false,
            addressError: false,
            numError: false,
            phoneError: false,
            companyError:false,
            legalPersonError:false,
            legalPhoneError:false,
            legalPersonIdError:false,
            legalEmailError:false,
            licenceError:false,
        }),

        components: {
            CitySelect,
            MapSearch
        },
        computed: {
            uploadUrl () {
                return api.common.upload
            }
        },
        methods: {
            getData () {
                this.loading = true
                this.$http.get(api.cinema.editDetail, {
                    params: {
                        id: this.$route.params.id,
                        type:1
                    }
                }).then(res => {
                    let that = this
                    setTimeout(function () {
                        that.loading = false
                    }, 500)
                    if (res.data.code === 1) {
                        this.addInfo = res.data.data
                        this.address = this.addInfo.address
                        this.$set(this.addInfo, 'cityLink', this.addInfo.province_id + '/' + this.addInfo.city_id + '/' + this.addInfo.county_id)
                        this.position = [this.addInfo.longitude, this.addInfo.latitude]
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
                    status: 1,
                    cinema_id: this.$route.params.id
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
            submit () {
                this.validateRegion()
                this.validateName()
                this.validateCity()
                this.validateAddress()
                this.validateNum()
                this.validatePhone()
                this.validateCompany()
                this.validateLegalPerson()
                this.validateLegalPhone()
                this.validateLegalPersonId()
                this.validateLegalEmail()
                this.validateLicence()
                if (this.regionError || this.nameError || this.cityError || this.addressError || this.numError || this.phoneError || this.companyError || this.legalPersonError || this.legalPhoneError || this.legalPersonIdError ||
                    this.legalEmailError || this.licenceError) {
                    this.$message.warning('填写的信息格式不正确')
                    return
                }
                this.$http.post(api.cinema.edit, {
                    id: this.$route.params.id || '',
                    name: this.addInfo.name,
                    address: this.address,
                    introduce: this.addInfo.introduce,
                    region_id: this.addInfo.region_id,
                    province_id: this.addInfo.cityLink.split('/')[0],
                    city_id: this.addInfo.cityLink.split('/')[1],
                    county_id: this.addInfo.cityLink.split('/')[2],
                    longitude: this.addInfo.longitude,
                    latitude: this.addInfo.latitude,
                    company: this.addInfo.company,
                    legal_person: this.addInfo.legal_person,
                    legal_phone: this.addInfo.legal_phone,
                    legal_person_id: this.addInfo.legal_person_id,
                    legal_email: this.addInfo.legal_email,
                    business_licence: this.addInfo.business_licence,
                }).then(res => {
                    if (res.data.code === 1) {
                        this.$message.success('保存成功')
                        this.$router.go(-1)
                    } else {
                        this.$message.error(res.data.msg)
                    }
                })
            },
            getResult (result) {
                this.searchList = result
            },
            selectItem (item) {
                if (item.location) {
                    this.position = [item.location.lng, item.location.lat]
                    this.addInfo.longitude = item.location.lng
                    this.addInfo.latitude = item.location.lat
                }
                this.address = item.address + item.name
                this.addInfo.address = item.address + item.name
                this.addressSearchShow = false
            },
            getPosition (val) {
                this.addInfo.longitude = val && val.length === 2 ? val[0] : ''
                this.addInfo.latitude = val && val.length === 2 ? val[1] : ''
            },
            validateRegion () {
                this.regionError = this.addInfo.region_id ? false : true
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
            validateNum () {
                if(this.addInfo.num) {
                    this.numError = /^([1-9]\d?|0)$/.test(this.addInfo.num) ? false : true
                } else {
                    this.numError = false
                }
            },
            validatePhone () {
                if(this.addInfo.leader_phone) {
                    this.phoneError = validate.mobile(this.addInfo.leader_phone)
                } else {
                    this.phoneError = false
                }
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
                this.legalEmailError = validate.email(this.addInfo.legal_email)
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
            this.getData()
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
            },
            'addInfo.address' (val) {
                this.address = val
            }
        }
    }
</script>
<style scoped>
    .search-list-container {
        width: 366px;
        overflow: hidden;
        position: absolute;
        top: 41px;
        left: 15px;
        z-index: 999;
        background-color: #fff;
        border: 1px solid #ccc;
    }
    .search-list-container li:hover {
        background-color: #cae1ff;
        cursor: pointer;
    }
</style>
