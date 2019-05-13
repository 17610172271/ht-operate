<template>
    <div class="bg-white">
        <div class="p-md border-bottom relative">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{name: 'advertisement_project'}">项目列表</el-breadcrumb-item>
                <el-breadcrumb-item>项目详情</el-breadcrumb-item>
            </el-breadcrumb>
            <a href="javascript:;" class="btn bg-blue1 text-white btn-back" @click="goBack">返回</a>
        </div>
        <div class="p-o-lg p-v-sm" style="padding-bottom: 50px;" v-loading="loading">
            <div class=" border-bottom">
                <h5 class="border-bottom text-xxlg text-bold p-b-sm">项目详情</h5>
                <div class="p-v-md">
                    <div class="clear m-b-sm flex">
                        <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>项目名称:</div>
                        <div class="col-xs-9">{{addInfo.project_name}}</div>
                    </div>
                    <div class="clear m-b-sm flex">
                        <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>项目金额:</div>
                        <div class="col-xs-9">{{addInfo.money}}</div>
                    </div>
                    <div class="clear m-b-sm flex">
                        <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>合同:</div>
                        <div class="col-xs-9">
                            {{addInfo.contract_name}}
                            <a :href="addInfo.contract_url" target="_blank" class="link" v-if="addInfo.contract_url">查看详情</a>
                        </div>
                    </div>
                </div>
                <div class="p-v-md">
                    <h5 class="border-bottom text-xxlg text-bold p-b-sm">广告主信息</h5>
                    <div class="clear m-b-sm flex">
                        <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>广告主名称:</div>
                        <div class="col-xs-9">{{addInfo.advertiser_name}}</div>
                    </div>
                    <div class="clear m-b-sm flex">
                        <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>负责人姓名:</div>
                        <div class="col-xs-9">{{addInfo.leader_name}}</div>
                    </div>
                    <div class="clear m-b-sm flex">
                        <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>负责人联系方式:</div>
                        <div class="col-xs-9">{{addInfo.leader_phone}}</div>
                    </div>
                    <div class="clear m-b-sm flex">
                        <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>邮箱:</div>
                        <div class="col-xs-9">{{addInfo.leader_email}}</div>
                    </div>
                    <div class="clear m-b-sm flex">
                        <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>资质:</div>
                        <div class="col-xs-9">
                            <a :href="addInfo.qualifications" target="_blank" class="link" v-if="addInfo.contract_url">查看详情</a>
                        </div>
                    </div>
                </div>
                <div class="p-v-md">
                    <h5 class="border-bottom text-xxlg text-bold p-b-sm">分账信息</h5>
                    <div class="clear m-b-sm flex">
                        <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>航天:</div>
                        <div class="col-xs-9">{{addInfo.ht_proportion}}</div>
                    </div>
                    <div class="clear m-b-sm flex">
                        <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>新光:</div>
                        <div class="col-xs-9">{{addInfo.xg_proportion}}</div>
                    </div>
                    <div class="clear m-b-sm flex">
                        <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>影院:</div>
                        <div class="col-xs-9">{{addInfo.cinema_proportion}}</div>
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
                this.$http.post(api.advertisement.projectDetail, {
                    id: this.$route.params.id,
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
