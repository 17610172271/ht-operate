<template>
    <div class="bg-white">
        <div class="p-md border-bottom relative">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{name: 'agent_list'}" v-if="fromRouter==='agent_list'">广告列表</el-breadcrumb-item>
                <el-breadcrumb-item :to="{name: 'agent_mine'}" v-else>我的广告</el-breadcrumb-item>
                <el-breadcrumb-item>{{$route.name.indexOf('edit')>0?'编辑广告':'新增广告'}}</el-breadcrumb-item>
            </el-breadcrumb>
            <a href="javascript:;" class="btn bg-blue1 text-white btn-back" @click="goBack">返回</a>
        </div>
        <div class="p-o-lg p-v-sm" style="padding-bottom: 50px;" v-loading="loading">
            <h5 class="border-bottom text-xxlg text-bold p-b-sm">{{$route.name.indexOf('edit')>0?'编辑广告':'新增广告'}}</h5>
            <div class="p-v-md">
                    <div class="clear m-b-sm flex">
                        <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>项目名称:</div>
                        <div class="col-xs-9">
                            <el-select v-model="addInfo.project_id" placeholder="请选择项目名称"  :class="{'border-red': project_idError}" style="width: 100%;max-width: 366px;">
                                <el-option
                                    v-for="item in projectOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                            <p v-if="project_idError" class="text-red"><span class="fa fa-close m-r-xs"></span>请选择项目名称</p>
                        </div>
                    </div>
                    <div class="clear m-b-sm flex">
                        <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>广告名称:</div>
                        <div class="col-xs-9">
                            <el-input v-model="addInfo.name" :class="{'border-red': nameError}" @blur="validateName" placeholder="请输入广告名称" style="max-width: 366px;"></el-input>
                            <p v-if="nameError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入广告名称</p>
                        </div>
                    </div>
                    <div class="clear m-b-sm flex">
                        <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>广告金额:</div>
                        <div class="col-xs-9">
                            <el-input v-model="addInfo.money" :class="{'border-red': moneyError}" @blur="validatemoney" placeholder="请输入广告金额" style="max-width: 366px;"></el-input>
                            <p v-if="moneyError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入广告金额</p>
                        </div>
                    </div>
                    <div class="clear m-b-sm flex">
                        <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>广告类型:</div>
                        <div class="col-xs-9">
                            <el-select v-model="addInfo.type_id" placeholder="请选择广告类型"  :class="{'border-red': type_idError}" style="width: 100%;max-width: 366px;">
                                <el-option
                                    v-for="item in typeOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                            <p v-if="type_idError" class="text-red"><span class="fa fa-close m-r-xs"></span>请选择广告类型</p>
                        </div>
                    </div>
                    <div class="clear m-b-sm flex">
                        <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span><span  v-if="typeRout">展现次数</span><span v-else="">展现天数</span>:</div>
                        <div class="col-xs-9">
                            <el-input v-model="addInfo.show_num" :class="{'border-red': show_numError}" @blur="validateshow_num" placeholder="请输入展现次数" style="max-width: 366px;"></el-input>
                            <p v-if="show_numError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入展现次数</p>
                        </div>
                    </div>
                    <div class="clear m-b-sm flex">
                        <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>广告位:</div>
                        <div class="col-xs-9">
                            <el-select v-model="addInfo.site_id" placeholder="请选择广告位"  :class="{'border-red': site_idError}" style="width: 100%;max-width: 366px;">
                                <el-option
                                    v-for="item in siteOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                            <p v-if="site_idError" class="text-red"><span class="fa fa-close m-r-xs"></span>请选择广告位</p>
                        </div>
                    </div>
                    <div class="clear m-b-sm flex">
                        <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>备注:</div>
                        <div class="col-xs-9">
                            <el-input type="textarea" v-model="addInfo.remark" :class="{'border-red': remarkError}" @blur="validateremark" placeholder="请输入备注" style="max-width: 366px;"></el-input>
                            <p v-if="remarkError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入备注</p>
                        </div>
                    </div>
                    <h5 class="border-bottom text-xxlg text-bold p-b-sm">广告信息 </h5>
                    <div v-if="openRout">
                        <h4>开屏</h4>
                        <div class="clear m-b-sm flex">
                            <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>投放区域:</div>
                            <div class="col-xs-9">
                                <el-radio v-model="addInfo.region_id" label="1">全部区域</el-radio>
                                <p v-if="region_idError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入投放区域</p>
                            </div>
                        </div>
                        <div class="clear m-b-sm flex">
                            <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>投放日期:</div>
                            <div class="col-xs-9">
                                <el-date-picker
                                    :class="{'border-red': timeError}"
                                    @blur="validatetime"
                                    v-model="addInfo.time"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                </el-date-picker>
                                <p v-if="timeError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入投放日期</p>
                            </div>
                        </div>
                        <div class="clear m-b-sm flex">
                            <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>跳转地址:</div>
                            <div class="col-xs-9">
                                <el-input v-model="addInfo.jump_url" :class="{'border-red': jump_urlError}" @blur="validatejump_url" placeholder="请输入跳转地址" style="max-width: 366px;"></el-input>
                                <p v-if="jump_urlError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入跳转地址</p>
                            </div>
                        </div>
                        <div class="clear m-b-sm flex">
                            <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>上传Android开屏:</div>
                            <div class="col-xs-9">
                                <el-upload
                                    :class="{'border-red': android_imgError}"
                                    :action="uploadUrl"
                                    list-type="picture-card"
                                    :file-list="fileList"
                                    :on-preview="handlePictureCardPreview"
                                    :headers="header"
                                    :before-upload="beforeUpload"
                                    accept="image/jpeg,jpg,png"
                                    :on-success="android_imgUpload">
                                    <i class="el-icon-plus"></i>
                                </el-upload>
                                <p v-if="android_imgError" class="text-red"><span class="fa fa-close m-r-xs"></span>请上传Android开屏</p>
                                <p class="text-999">(请上传2M以内jpg格式图片)</p>
                                <el-dialog :visible.sync="dialogVisible" title="查看图片">
                                    <img width="100%" :src="previewImage" alt="">
                                </el-dialog>
                            </div>
                        </div>
                        <div class="clear m-b-sm flex">
                            <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>上传IOS开屏:</div>
                            <div class="col-xs-9">
                                <el-upload
                                    :class="{'border-red': ios_imgError}"
                                    :action="uploadUrl"
                                    list-type="picture-card"
                                    :file-list="fileList"
                                    :on-preview="handlePictureCardPreview"
                                    :headers="header"
                                    :before-upload="beforeUpload"
                                    accept="image/jpeg,jpg,png"
                                    :on-success="ios_imgUpload">
                                    <i class="el-icon-plus"></i>
                                </el-upload>
                                <p v-if="ios_imgError" class="text-red"><span class="fa fa-close m-r-xs"></span>请上传IOS开屏</p>
                                <p class="text-999">(请上传2M以内jpg格式图片)</p>
                                <el-dialog :visible.sync="dialogVisible" title="查看图片">
                                    <img width="100%" :src="previewImage" alt="">
                                </el-dialog>
                            </div>
                        </div>
                        <div class="clear m-b-sm flex">
                            <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>上传IOS开屏(X以上):</div>
                            <div class="col-xs-9">
                                <el-upload
                                    :class="{'border-red': ios_x_imgError}"
                                    :action="uploadUrl"
                                    list-type="picture-card"
                                    :file-list="fileList"
                                    :on-preview="handlePictureCardPreview"
                                    :headers="header"
                                    :before-upload="beforeUpload"
                                    accept="image/jpeg,jpg,png"
                                    :on-success="ios_x_imgUpload">
                                    <i class="el-icon-plus"></i>
                                </el-upload>
                                <p v-if="ios_x_imgError" class="text-red"><span class="fa fa-close m-r-xs"></span>请上传IOS开屏</p>
                                <p class="text-999">(请上传2M以内jpg格式图片)</p>
                                <el-dialog :visible.sync="dialogVisible" title="查看图片">
                                    <img width="100%" :src="previewImage" alt="">
                                </el-dialog>
                            </div>
                        </div>
                    </div>
                    <div v-else-if="bannerRout">
                        <h4>banner</h4>
                        <div class="clear m-b-sm flex">
                            <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>投放区域:</div>
                            <div class="col-xs-9">
                                <el-radio v-model="addInfo.region_id" label="1">全部区域</el-radio>
                                <p v-if="region_idError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入投放区域</p>
                            </div>
                        </div>
                        <div class="clear m-b-sm flex">
                            <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>投放日期:</div>
                            <div class="col-xs-9">
                                <el-date-picker
                                    :class="{'border-red': timeError}"
                                    @blur="validatetime"
                                    v-model="addInfo.time"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                </el-date-picker>
                                <p v-if="timeError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入投放日期</p>
                            </div>
                        </div>
                        <div class="clear m-b-sm flex">
                            <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>跳转地址:</div>
                            <div class="col-xs-9">
                                <el-input v-model="addInfo.jump_url" :class="{'border-red': jump_urlError}" @blur="validatejump_url" placeholder="请输入跳转地址" style="max-width: 366px;"></el-input>
                                <p v-if="jump_urlError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入跳转地址</p>
                            </div>
                        </div>
                        <div class="clear m-b-sm flex">
                            <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>上传Android开屏:</div>
                            <div class="col-xs-9">
                                <el-upload
                                    :class="{'border-red': android_imgError}"
                                    :action="uploadUrl"
                                    list-type="picture-card"
                                    :file-list="fileList"
                                    :on-preview="handlePictureCardPreview"
                                    :headers="header"
                                    :before-upload="beforeUpload"
                                    accept="image/jpeg,jpg,png"
                                    :on-success="android_imgUpload">
                                    <i class="el-icon-plus"></i>
                                </el-upload>
                                <p v-if="android_imgError" class="text-red"><span class="fa fa-close m-r-xs"></span>请上传Android开屏</p>
                                <p class="text-999">(请上传2M以内jpg格式图片)</p>
                                <el-dialog :visible.sync="dialogVisible" title="查看图片">
                                    <img width="100%" :src="previewImage" alt="">
                                </el-dialog>
                            </div>
                        </div>
                        <div class="clear m-b-sm flex">
                            <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>上传IOS开屏:</div>
                            <div class="col-xs-9">
                                <el-upload
                                    :class="{'border-red': ios_imgError}"
                                    :action="uploadUrl"
                                    list-type="picture-card"
                                    :file-list="fileList"
                                    :on-preview="handlePictureCardPreview"
                                    :headers="header"
                                    :before-upload="beforeUpload"
                                    accept="image/jpeg,jpg,png"
                                    :on-success="ios_imgUpload">
                                    <i class="el-icon-plus"></i>
                                </el-upload>
                                <p v-if="ios_imgError" class="text-red"><span class="fa fa-close m-r-xs"></span>请上传IOS开屏</p>
                                <p class="text-999">(请上传2M以内jpg格式图片)</p>
                                <el-dialog :visible.sync="dialogVisible" title="查看图片">
                                    <img width="100%" :src="previewImage" alt="">
                                </el-dialog>
                            </div>
                        </div>
                    </div>
                    <div v-else-if="beforeRout">
                        <h4>映前</h4>
                        <div class="clear m-b-sm flex">
                            <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>投放区域:</div>
                            <div class="col-xs-9">
                                <el-radio v-model="addInfo.region_id" label="1">全部区域</el-radio>
                                <p v-if="region_idError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入投放区域</p>
                            </div>
                        </div>
                        <div class="clear m-b-sm flex">
                            <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>视频位置:</div>
                            <div class="col-xs-9">
                                <el-select v-model="addInfo.video_site" placeholder="请选择视频位置"  :class="{'border-red': video_siteError}" style="width: 100%;max-width: 366px;">
                                    <el-option
                                        v-for="item in video_siteOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <p v-if="video_siteError" class="text-red"><span class="fa fa-close m-r-xs"></span>请选择视频位置</p>
                            </div>
                        </div>
                        <div class="clear m-b-sm flex">
                            <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>视频时长:</div>
                            <div class="col-xs-9">
                                <el-select v-model="addInfo.video_length" placeholder="请选择视频时长"  :class="{'border-red': video_lengthError}" style="width: 100%;max-width: 366px;">
                                    <el-option
                                        v-for="item in video_lengthOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <p v-if="video_lengthError" class="text-red"><span class="fa fa-close m-r-xs"></span>请选择视频时长</p>
                            </div>
                        </div>
                        <div class="clear m-b-sm flex">
                            <div class="col-xs-3 p-v-sm text-right" style="max-width: 200px;"><span class="text-red">*</span>投放日期:</div>
                            <div class="col-xs-9">
                                <el-date-picker
                                    :class="{'border-red': timeError}"
                                    @blur="validatetime"
                                    v-model="addInfo.time"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                </el-date-picker>
                                <p v-if="timeError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入投放日期</p>
                            </div>
                        </div>

                    </div>
                    <div class="p-v-lg clear">
                        <div class="col-xs-3" style="max-width: 200px;"></div>
                        <div class="col-xs-9">
                            <el-button type="primary" @click="submit">{{$route.name.indexOf('edit') > 0 ? '保存' : '开通'}}</el-button>
                            <el-button @click="goBack">取 消</el-button>
                        </div>
                    </div>
            </div>
        </div>
    </div>
    <!--</div>-->
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
            projectOptions: [],
            typeOptions:[
                {
                    label: 'CPM',
                    value: 1
                },
                {
                    label: 'CPT',
                    value: 2
                },
            ],
            siteOptions:[
                {
                    label: '开屏',
                    value: 1
                },
                {
                    label: 'banner',
                    value: 2
                },
                {
                    label: '映前',
                    value: 3
                },
            ],
            video_lengthOptions:[
                {
                    label: '15s',
                    value: 1
                },
                {
                    label: '30s',
                    value: 2
                },
                {
                    label: '45s',
                    value: 3
                },
                {
                    label: '60s',
                    value: 3
                },
            ],
            video_siteOptions:[],
            addInfo:{
                project_id:'',
                name:'',
                type_id:'',
                money:'',
                show_num:'',
                remark:'',
                site_id:'',
                region_id:'',
                start_time:'',
                end_time:'',
                jump_url:'',
                android_img:'',
                ios_img:'',
                ios_x_img:'',
                video_length:'',
                video_site:'',
                video_name:'',
                time:''
            },
            fromRouter: '',
            dialogVisible: false,
            previewImage: '',
            loading: false,
            // 验证
            nameError: false,
            moneyError: false,
            project_idError: false,
            type_idError: false,
            show_numError: false,
            remarkError: false,
            site_idError: false,
            region_idError: false,
            timeError: false,
            jump_urlError: false,
            android_imgError: false,
            ios_imgError: false,
            ios_x_imgError: false,
            video_siteError: false,
            video_lengthError: false,
            openRout: false,
            bannerRout: false,
            beforeRout: false,
            typeRout:false,
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
                this.$http.get(api.advertisement.projectDetail, {
                    params: {
                        id: this.$route.params.id,
                    }
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
                    type:2
                }).then(res => {
                    if (res.data.code === 1) {
                        this.projectOptions = res.data.data
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        })
                    }
                })
            },
            getvideo_site () {
                this.$http.post(api.advertisement.selectList, {
                    type:5
                }).then(res => {
                    if (res.data.code === 1) {
                        this.video_siteOptions = res.data.data
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
//            handleRemove(file, fileList) {
//                this.addInfo.qualifications = []
//                fileList.map(val => {
//                    if (val.response && val.response.code === 1) {
//                        this.addInfo.qualifications.push(val.response.data.image)
//                    } else if (!val.response && val.isOld) {
//                        this.addInfo.qualifications.push(val.url)
//                    }
//                })
//            },
            handlePictureCardPreview(file) {
                this.previewImage = file.url
                this.dialogVisible = true
            },
            android_imgUpload (res, file, fileList) {
                this.addInfo.android_img = []
                fileList.map(val => {
                    if (val.response && val.response.code === 1) {
                        this.addInfo.android_img.push(val.response.data.image)
                        this.android_imgError = false
                    } else if (!val.response && val.isOld) {
                        this.addInfo.android_img.push(val.url)
                    }
                })
            },
            ios_imgUpload (res, file, fileList) {
                this.addInfo.ios_img = []
                fileList.map(val => {
                    if (val.response && val.response.code === 1) {
                        this.addInfo.ios_img.push(val.response.data.image)
                        this.ios_imgError = false
                    } else if (!val.response && val.isOld) {
                        this.addInfo.ios_img.push(val.url)
                    }
                })
            },
            ios_x_imgUpload (res, file, fileList) {
                this.addInfo.ios_x_img = []
                fileList.map(val => {
                    if (val.response && val.response.code === 1) {
                        this.addInfo.ios_x_img.push(val.response.data.image)
                        this.ios_x_imgError = false
                    } else if (!val.response && val.isOld) {
                        this.addInfo.ios_x_img.push(val.url)
                    }
                })
            },
            submit () {
                this.validateName()
                this.validatemoney()
                this.validatetype_id()
                this.validateproject_id()
                this.validateshow_num()
                this.validateremark()
                this.validatesite_id()
                if ( this.nameError || this.moneyError || this.type_idError || this.project_idError
                        || this.show_numError || this.remarkError || this.site_idError
                ) {
                    this.$message.warning('填写的信息格式不正确')
                    return
                }
                if(this.addInfo.site_id ===1) {
                    this.validateregion_id()
                    this.validatetime()
                    this.validatejump_url()
                    this.validateandroid_img()
                    this.validateios_img()
                    this.validateios_x_img()
                    if( this.region_idError || this.timeError || this.jump_urlError || this.android_imgError || this.ios_imgError || this.ios_x_imgError) {
                        this.$message.warning('填写的信息格式不正确')
                        return
                    }
                }else if(this.addInfo.site_id ===2) {
                    this.validateregion_id()
                    this.validatetime()
                    this.validatejump_url()
                    this.validateandroid_img()
                    this.validateios_img()
                    if( this.region_idError || this.timeError || this.jump_urlError || this.android_imgError || this.ios_imgError ) {
                        this.$message.warning('填写的信息格式不正确')
                        return
                    }
                }else if(this.addInfo.site_id ===3) {
                    this.validateregion_id()
                    this.validatetime()
                    this.validatevideo_length()
                    this.validatevideo_site()
                    if( this.region_idError || this.timeError || this.video_lengthError || this.video_siteError) {
                        this.$message.warning('填写的信息格式不正确')
                        return
                    }
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
            validateproject_id () {
                this.project_idError = this.addInfo.project_id ? false :true
            },
            validateName () {
                this.nameError = this.addInfo.name ? false : true
            },
            validatemoney(){
                this.moneyError = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(this.addInfo.money) ? false : true
            },
            validatetype_id () {
                this.type_idError = this.addInfo.type_id ? false :true
            },
            validateshow_num () {
                this.show_numError =/^(0|\+?[1-9][0-9]*)$/.test(this.addInfo.show_num) ? false : true
            },
            validateremark() {
                this.remarkError = this.addInfo.remark ? false : true
            },
            validatesite_id() {
                this.site_idError = this.addInfo.site_id ? false :true
            },
            validateregion_id() {
                this.region_idError = this.addInfo.region_id ? false :true
            },
            validatetime() {
                this.timeError = this.addInfo.time ? false :true
            },
            validatejump_url() {
                this.jump_urlError = this.addInfo.jump_url ? false :true
            },
            validateandroid_img () {
                this.android_imgError = this.addInfo.android_img ? false : true
            },
            validateios_img () {
                this.ios_imgError = this.addInfo.ios_img ? false : true
            },
            validateios_x_img () {
                this.ios_x_imgError = this.addInfo.ios_x_img ? false : true
            },
            validatevideo_length () {
                this.video_lengthError = this.addInfo.video_length ? false : true
            },
            validatevideo_site () {
                this.video_siteError = this.addInfo.video_site ? false : true
            },
            validateContract () {
                this.qualificationsError = this.addInfo.qualifications.length>0 ? false : true
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
                this.ht_proportionError = this.addInfo.ht_proportion ? false : true
            },
            validatexg_proportion() {
                this.xg_proportionError = this.addInfo.xg_proportion ? false :true
            },
            validatecinema_proportion() {
                this.cinema_proportionError = this.addInfo.cinema_proportion ? false :true
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
        watch:{
            'addInfo.site_id' (val) {
                this.site_idError = false
                if(this.addInfo.site_id ===1) {
                    this.openRout = true
                    this.bannerRout = false
                    this.beforeRout = false
                }else if(this.addInfo.site_id ===2) {
                    this.openRout = false
                    this.beforeRout = false
                    this.bannerRout = true
                }else if(this.addInfo.site_id ===3) {
                    this.getvideo_site()
                    this.beforeRout = true
                    this.bannerRout = false
                    this.openRout = false
                }
            },
            'addInfo.type_id' (val) {
                this.type_idError = false
                if(this.addInfo.type_id ===1) {
                    this.typeRout = true
                }else if(this.addInfo.type_id ===2) {
                    this.typeRout = false
                }
            },
            'addInfo.region_id' (val) {
                this.region_idError = false
            },
            'addInfo.project_id' (val) {
                this.project_idError = false
            }
        }
    }
</script>
<style scoped>

</style>
