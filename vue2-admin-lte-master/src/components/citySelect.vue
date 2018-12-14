<template>
    <div class="address-link-container clear">
        <div class="address-item p-n">
            <el-select v-model="province" placeholder="请选择省" style="width: 120px;" @visible-change="selectProvince">
                <el-option
                    v-for="item in provinceList"
                    :key="item.id"
                    :label="item.name"
                    @click="selectProvince"
                    :value="item.id">
                </el-option>
            </el-select>
        </div>
        <div class="address-item p-n">
            <el-select v-model="city" placeholder="请选择市" style="width: 120px;" @visible-change="selectCity">
                <el-option
                    v-for="item in cityList"
                    :key="item.id"
                    :label="item.name"
                    @click="selectCity"
                    :value="item.id">
                </el-option>
            </el-select>
        </div>
        <div class="address-item p-n">
            <el-select v-model="area" placeholder="请选择区" style="width: 120px;" @change="selectArea">
                <el-option
                    v-for="item in areaList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>
            </el-select>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import api from '@/api'
    export default {
        props: {
            value: '',
            pid: ''
        },
        data: () => ({
            provinceList: [],
            cityList: [],
            areaList: [],
            province: '',
            city: '',
            area: '',
            selectShow: false
        }),
        methods: {
            getProvince () {
                this.$http.post(api.common.getCity, {
                    pid: this.pid || '',
                    status: 2
                }).then(res => {
                    if (res.data.code === 1) {
                        this.provinceList = res.data.data
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        })
                    }
                })
            },
            getCity () {
                this.$http.post(api.common.getCity, {
                    pid: this.province,
                    status: 2
                }).then(res => {
                    if (res.data.code === 1) {
                        this.cityList = res.data.data
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        })
                    }
                })
            },
            getArea () {
                this.$http.post(api.common.getCity, {
                    pid: this.city,
                    status: 2
                }).then(res => {
                    if (res.data.code === 1) {
                        this.areaList = res.data.data
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        })
                    }
                })
            },
            selectArea () {
                this.$emit('input', this.province + '/' + this.city + '/' + this.area)
            },
            selectProvince (val) {
                this.selectShow = val

            },
            selectCity (val) {
                this.selectShow = val
                this.$emit('input', this.province + '/' + this.city + '/' + this.area)
            }
        },
        mounted () {
            this.province = this.value.split('/')[0] ? this.value.split('/')[0] * 1 : ''
            this.city = this.value.split('/')[1] ? this.value.split('/')[1] * 1 : ''
            this.area = this.value.split('/')[2] ? this.value.split('/')[2] * 1 : ''
        },
        created () {
            this.getProvince()
        },
        watch: {
            value (val) {
                this.province = val.split('/')[0] ? val.split('/')[0] * 1 : ''
                this.city = val.split('/')[1] ? val.split('/')[1] * 1 : ''
                this.area = val.split('/')[2] ? val.split('/')[2] * 1 : ''
            },
            pid (val) {
                this.getProvince()
            },
            province (val) {
                if (this.selectShow) {
                    this.city = ''
                    this.area = ''
                }
                this.getCity()
                this.$emit('input', this.province + '/' + this.city + '/' + this.area)
            },
            city (val) {
                if (this.selectShow) {
                    this.area = ''
                }
                if (this.city) this.getArea()
                this.$emit('input', this.province + '/' + this.city + '/' + this.area)
            },
            area (val) {
                this.$emit('input', this.province + '/' + this.city + '/' + this.area)
            }
        }
    }
</script>
<style>
    .address-item {
        margin-right: 3px;
        float: left;
    }
</style>
