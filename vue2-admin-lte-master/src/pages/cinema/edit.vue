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
                                <li v-for="item in searchList" class="over-omit p-v-xs p-o-sm" @click="selectItem(item.location)">{{item.district}}-{{item.address.length > 0 ? item.address : ''}}-{{item.name}}</li>
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
                apply_remark: ''
            },
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
        }),

        components: {
            CitySelect,
            MapSearch
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
            submit () {
                this.validateRegion()
                this.validateName()
                this.validateCity()
                this.validateAddress()
                this.validateNum()
                this.validatePhone()
                if (this.regionError || this.nameError || this.cityError || this.addressError || this.numError || this.phoneError) {
                    this.$message.warning('填写的信息格式不正确')
                    return
                }
                this.$http.post(api.cinema.edit, {
                    id: this.$route.params.id || '',
                    name: this.addInfo.name,
                    address: this.addInfo.address,
                    introduce: this.addInfo.introduce,
                    region_id: this.addInfo.region_id,
                    province_id: this.addInfo.cityLink.split('/')[0],
                    city_id: this.addInfo.cityLink.split('/')[1],
                    county_id: this.addInfo.cityLink.split('/')[2],
                    longitude: this.addInfo.longitude,
                    latitude: this.addInfo.latitude
                }).then(res => {
                    if (res.data.code === 1) {
                        this.$message.success('保存成功')
                        this.$router.push({name: 'cinema_list'})
                    } else {
                        this.$message.error(res.data.msg)
                    }
                })
            },
            getResult (result) {
                this.searchList = result
            },
            selectItem (position) {
                if (position) {
                    this.position = [position.lng, position.lat]
                    this.addInfo.longitude = position.lng
                    this.addInfo.latitude = position.lat
                }
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
