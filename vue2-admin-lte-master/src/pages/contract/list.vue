<template>
    <!--合同列表-->
    <div v-loading="loading">
        <div class="p-lg appli-container">
            <sub-header :list="subNavList"></sub-header>
            <div class="page-container">
                <div class="page-toolbar clear m-t-sm">
                    <search-ipts :options="searchOptions" @submit="doSearch" v-show="searchShow"></search-ipts>
                    <div class="pull-left toolbar-candle clear">
                        <a href="javascript:;" title="添加" @click="addItem" v-if="getNavList['4090103']"
                           class="app-add btn bg-blue1 text-white"><i class="fa fa-plus-square"></i>添加
                        </a>
                        <div class="app-refresh btn bg-gray1" title="刷新" @click="refresh"><i
                            class="fa fa-refresh"></i></div>
                    </div>
                    <div class="pull-right clear">
                        <div class="pull-left m-r-sm opacity-8" title="列">
                            <select-checkbox :list="showList" v-model="selectVal" style="width: 60px;"></select-checkbox>
                        </div>
                        <div class="pull-left btn opacity-8 search-btn" @click="searchShow = !searchShow"><i
                            class="fa fa-search" title="搜索"></i></div>
                    </div>
                </div>
                <div class="page-contaoner">
                    <div class="lk-table m-t-sm">
                        <ul class="table-thead clear">
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('序号')!=-1" style="max-width: 60px;">序号</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('合同编号')!=-1">合同编号</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('合同名称')!=-1">合同名称</li>
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('甲方')!=-1">甲方</li>
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('乙方')!=-1">乙方</li>
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('丙方')!=-1">丙方</li>
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('合同类型')!=-1">合同类型</li>
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('签约日期')!=-1">签约日期</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('合同开始时间')!=-1">合同开始时间</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('合同结束时间')!=-1">合同结束时间</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('已续约至')!=-1">已续约至</li>
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('创建时间')!=-1">创建时间</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1" style="min-width: 120px;">操作</li>
                        </ul>
                        <ul class="table-tbody clear" v-for="(item, index) in data.items">
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('序号')!=-1" style="max-width: 60px;">{{offset + index + 1}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('合同编号')!=-1" :title="item.serial_number">{{item.serial_number}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('合同名称')!=-1" :title="item.contract_name">{{item.contract_name}}</li>
                            <li class="col-xs-24 p-n over-omit" v-show="selectVal.indexOf('甲方')!=-1" :title="item.party_a">{{item.party_a}}</li>
                            <li class="col-xs-24 p-n over-omit" v-show="selectVal.indexOf('乙方')!=-1" :title="item.party_b">{{item.party_b}}</li>
                            <li class="col-xs-24  p-n over-omit" v-show="selectVal.indexOf('丙方')!=-1" :title="item.party_c">{{item.party_c}}</li>
                            <li class="col-xs-24 p-n over-omit" v-show="selectVal.indexOf('合同类型')!=-1":title="item.type_name">{{item.type_name}}</li>
                            <li class="col-xs-24 p-n over-omit" v-show="selectVal.indexOf('签约日期')!=-1":title="item.signing_date">{{item.signing_date}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('合同开始时间')!=-1":title="item.start_time">{{item.start_time}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('合同结束时间')!=-1":title="item.end_time">{{item.end_time}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('已续约至')!=-1":title="item.contract_time">{{item.contract_time}}</li>
                            <li class="col-xs-24 p-n over-omit" v-show="selectVal.indexOf('创建时间')!=-1" :title="item.create_time">{{item.create_time}}</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1" style="min-width: 120px;">
                                <a href="javascript:;" v-if="getNavList['4090101']" class="link" @click.stop="openDetail(item)">查看</a>
                                <a href="javascript:;" v-if="getNavList['4090102']" class="link" @click.stop="editItem(item)">编辑</a>
                                <span v-if="!getNavList['4090101']&&!getNavList['4090102']">---</span>
                            </li>
                        </ul>
                        <ul class="table-tbody clear" v-if="data.items.length===0">
                            <li class="p-n over-omit">暂无更多数据</li>
                        </ul>
                    </div>
                    <div class="footer clear m-t-md">
                        <div class="pull-left news-record text-lg">
                            <span v-show="data.items.length>0">显示{{offset + 1}}到{{offset + data.items.length}}条记录，</span>共<span
                            class="text-blue">{{data.total}}</span>条记录 每页显示
                            <el-select v-model="limit" placeholder="请选择" style="width: 66px;">
                                <el-option
                                    v-for="(item,index) in options"
                                    :key="index"
                                    :label="item"
                                    :value="item">
                                </el-option>
                            </el-select>
                            条记录
                        </div>
                        <div class="pull-right">
                            <el-pagination
                                background
                                v-if="data.items.length>0"
                                layout="prev, pager, next"
                                :current-page.sync="page"
                                :page-count="pages">
                            </el-pagination>
                        </div>
                    </div>
                    <el-dialog
                        :title="type=='edit'?'编辑':'添加'"
                        :visible.sync="detailModal"
                        custom-class="dialog-modal1">
                        <div v-loading="modalLoading">
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-3 line-height-40 text-right min-width-105"><span class="text-red">*</span>合同编号:{{detailVal.id}}</div>
                                <div class="col-xs-12 col-md-7">
                                    <el-input placeholder="请输入合同编号" :class="{'border-red': serial_numberError}" v-model="detailVal.serial_number" @blur="validateSerial_number(detailVal.serial_number)"></el-input>
                                    <p v-if="serial_numberError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入合同编号</p>
                                </div>
                            </div>
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-3 line-height-40 text-right min-width-105"><span class="text-red">*</span>合同名称:</div>
                                <div class="col-xs-12 col-md-7">
                                    <el-input placeholder="请输入合同名称" :class="{'border-red': contract_nameError}" v-model="detailVal.contract_name" @blur="validateContract_name(detailVal.contract_name)"></el-input>
                                    <p v-if="contract_nameError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入合同名称</p>
                                </div>
                            </div>
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-3 line-height-40 text-right min-width-105"><span class="text-red">*</span>甲方:</div>
                                <div class="col-xs-12 col-md-7">
                                    <el-input placeholder="请输入甲方" :class="{'border-red': party_aError}" v-model="detailVal.party_a" @blur="validateParty_a(detailVal.party_a)"></el-input>
                                    <p v-if="party_aError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入甲方</p>
                                </div>
                            </div>
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-3 line-height-40 text-right min-width-105"><span class="text-red">*</span>乙方:</div>
                                <div class="col-xs-12 col-md-7">
                                    <el-input placeholder="请输入乙方" :class="{'border-red': party_bError}" v-model="detailVal.party_b" @blur="validateParty_b(detailVal.party_b)"></el-input>
                                    <p v-if="party_bError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入乙方</p>
                                </div>
                            </div>
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-3 line-height-40 text-right min-width-105"><span class="text-red">*</span>丙方:</div>
                                <div class="col-xs-12 col-md-7">
                                    <el-input placeholder="请输入丙方" :class="{'border-red': party_cError}" v-model="detailVal.party_c" @blur="validateParty_c(detailVal.party_c)"></el-input>
                                    <p v-if="party_cError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入丙方</p>
                                </div>
                            </div>
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-3 line-height-40 text-right min-width-105"><span class="text-red">*</span>合同类型:</div>
                                <div class="col-xs-12 col-md-7">
                                    <el-select :class="{'border-red': typeError}" @change="groupChange" v-model="detailVal.type" placeholder="请选择合同类型" popper-class="select-team">
                                        <el-option
                                            v-for="(item, index) in teamOptions"
                                            :key="index"
                                            :label="item.type_name"
                                            :value="item.id">
                                        </el-option>
                                    </el-select>
                                    <p v-if="typeError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入合同类型</p>
                                </div>
                            </div>
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-3 line-height-40 text-right min-width-105"><span class="text-red">*</span>签约日期:</div>
                                <div class="col-xs-12 col-md-7">
                                    <el-date-picker
                                        @change="group11Change"
                                        v-model="detailVal.signing_date"
                                        :class="{'border-red': signing_dateError}"
                                        type="date"
                                        placeholder="请选择签约日期"
                                    >
                                    </el-date-picker>
                                    <!--<el-input placeholder="请输入签约日期" :class="{'border-red': signing_dateError}" v-model="detailVal.signing_date" @blur="validateSigning_date(detailVal.signing_date)"></el-input>-->
                                    <p v-if="signing_dateError" class="text-red"><span class="fa fa-close m-r-xs"></span>请选择签约日期</p>
                                </div>
                            </div>
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-3 line-height-40 text-right min-width-105"><span class="text-red">*</span>合同开始时间:</div>
                                <div class="col-xs-12 col-md-7">
                                    <el-date-picker
                                        @change="startChange"
                                        v-model="detailVal.start_time"
                                        :class="{'border-red': start_timeError}"
                                        type="date"
                                        placeholder="请选择合同开始时间"
                                        :picker-options="pickerOptions0">
                                    </el-date-picker>
                                    <!--<el-input placeholder="请选择合同开始时间" :class="{'border-red': start_timeError}" v-model="detailVal.start_time" @blur="validateStart_time(detailVal.start_time)"></el-input>-->
                                    <p v-if="start_timeError" class="text-red"><span class="fa fa-close m-r-xs"></span>请选择合同开始时间</p>
                                </div>
                            </div>
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-3 line-height-40 text-right min-width-105"><span class="text-red">*</span>合同结束时间:</div>
                                <div class="col-xs-12 col-md-7">
                                    <el-date-picker
                                        @change="endChange"
                                        v-model="detailVal.end_time"
                                        :class="{'border-red': end_timeError}"
                                        type="date"
                                        placeholder="请选择合同结束时间"
                                        :picker-options="pickerOptions0">
                                    </el-date-picker>
                                    <!--<el-input placeholder="请选择合同结束时间" :class="{'border-red': end_timeError}" v-model="detailVal.end_time" @blur="validateEnd_time(detailVal.end_time)"></el-input>-->
                                    <p v-if="end_timeError" class="text-red"><span class="fa fa-close m-r-xs"></span>请选择合同结束时间</p>
                                </div>
                            </div>
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-3 line-height-40 text-right min-width-105">已续约至:</div>
                                <div class="col-xs-12 col-md-7">
                                    <el-date-picker
                                        @change="contractChange"
                                        v-model="detailVal.contract_time"
                                        type="date"
                                        placeholder="请输入已续约至"
                                    >
                                    </el-date-picker>
                                    <!--<el-input placeholder="请输入已续约至" :class="{'border-red': contract_timeError}" v-model="detailVal.contract_time" @blur="validateContract_time(detailVal.contract_time)"></el-input>-->
                                    <!-- <p v-if="contract_timeError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入已续约至</p> -->
                                </div>
                            </div>
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-3 line-height-40 text-right min-width-105"><span class="text-red">*</span>上传合同:</div>
                                <div class="col-xs-12 col-md-7">
                                    <el-upload
                                        @change="validateAttachment"
                                        :class="{'border-red': attachmentError}"
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
                            <div class="p-o-sm p-v-sm clear center">
                                <el-button type="primary" @click="dailogSubmit">提交</el-button>
                                <el-button @click.stop="detailModal = false">取 消</el-button>
                            </div>
                        </div>
                    </el-dialog>
                    <el-dialog
                        title="查看"
                        :visible.sync="detailModalone"
                        custom-class="dialog-modal1">
                        <div v-loading="modalLoading">
                            <div class="clear">
                                <div class="col-xs-3 line-height-40 text-right text-bold min-width-105">标题</div>
                                <div class="col-xs-7 line-height-40 text-bold text-left">内容</div>
                            </div>
                            <div class="clear bg-f9">
                                <div class="col-xs-3 line-height-40 text-right min-width-105">合同编号:</div>
                                <div class="col-xs-7 line-height-40 text-left">{{detailVal.serial_number}}</div>
                            </div>
                            <div class="clear">
                                <div class="col-xs-3 line-height-40 text-right min-width-105">合同名称:</div>
                                <div class="col-xs-7 text-left line-height-40">{{detailVal.contract_name}}</div>
                            </div>
                            <div class="clear bg-f9">
                                <div class="col-xs-3 line-height-40 text-right min-width-105">甲方:</div>
                                <div class="col-xs-7 text-left line-height-40">{{detailVal.party_a}}</div>
                            </div>
                            <div class="clear">
                                <div class="col-xs-3 line-height-40 text-right min-width-105">乙方:</div>
                                <div class="col-xs-7 text-left line-height-40">{{detailVal.party_b}}</div>
                            </div>
                            <div class="clear bg-f9">
                                <div class="col-xs-3 line-height-40 text-right min-width-105">丙方:</div>
                                <div class="col-xs-7 text-left line-height-40">{{detailVal.party_c}}</div>
                            </div>
                            <div class="clear">
                                <div class="col-xs-3 line-height-40 text-right min-width-105">合同类型:</div>
                                <div class="col-xs-7 text-left line-height-40">{{detailVal.type_name}}</div>
                            </div>
                            <div class="clear bg-f9">
                                <div class="col-xs-3 line-height-40 text-right min-width-105">签约日期:</div>
                                <div class="col-xs-7 text-left line-height-40">{{detailVal.signing_date}}</div>
                            </div>
                            <div class="clear">
                                <div class="col-xs-3 line-height-40 text-right min-width-105">合同开始时间:</div>
                                <div class="col-xs-7 text-left line-height-40">{{detailVal.start_time}}</div>
                            </div>
                            <div class="clear bg-f9">
                                <div class="col-xs-3 line-height-40 text-right min-width-105">合同结束时间:</div>
                                <div class="col-xs-7 text-left line-height-40">{{detailVal.end_time}}</div>
                            </div>
                            <div class="clear">
                                <div class="col-xs-3 line-height-40 text-right min-width-105">已续约至:</div>
                                <div class="col-xs-7 text-left line-height-40">{{detailVal.contract_time}}</div>
                            </div>
                            <!--<div class="clear">-->
                                <!--<div class="col-xs-3 line-height-40 text-right min-width-105">合同:</div>-->
                                <!--<div class="col-xs-7 text-left line-height-40"><a v-for="(item, index) in detailVal.attachment" :href="item" target="_blank" class="link" v-if="detailVal.attachment" style="margin-right: 15px;">合同{{index+1}}</a></div>-->
                            <!--</div>-->
                            <div class="clear">
                                <div class="col-xs-3 line-height-40 text-right min-width-105">合同:</div>
                                <div class="col-xs-7 text-left line-height-40"><a v-for="(item, index) in detailVal.attachment" :href="item" target="_blank" class="link" v-if="detailVal.attachment.length>0" style="margin-right: 15px;">图片{{index + 1}}</a></div>
                            </div>
                        </div>
                    </el-dialog>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import SubHeader from '../common/subheader'
    import api from '@/api'
    import SelectCheckbox from '@/components/SelectCheckbox'
    import SearchIpts from '../common/searchIpts'
    import { mapGetters } from 'vuex'
    export default {
        //组件
        components: {
            SelectCheckbox,
            SearchIpts,
            SubHeader
        },
        data: () => ({
            data: {
                limit: 10,
                page: 1,
                pageSize: 1,
                total: 1,
                items: [],
            },
            modalLoading: false,
            pickerOptionsStart: {
                disabledDate: time => {
                    let endDateVal = this.detailVal.end_time;
                    if (endDateVal) {
                        return time.getTime() > new Date(endDateVal).getTime();
                    }
                }
            },
            pickerOptionsEnd: {
                disabledDate: time => {
                    let beginDateVal = this.detailVal.start_time;
                    if (beginDateVal) {
                        return (
                            time.getTime() <
                            new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000
                        );
                    }
                }
            },
            pickerOptions0: {
                disabledDate(time) {
                    return time.getTime() < new Date().setHours(0, 0, 0, 0)
                }
            },
            loading: false,
            selectVal: ['序号', '合同编号', '合同名称', '甲方', '乙方', '丙方', '合同类型', '签约日期', '合同开始时间','合同结束时间','已续约至', '创建时间', '操作'],
            showList: ['序号', '合同编号', '合同名称', '甲方', '乙方', '丙方', '合同类型', '签约日期', '合同开始时间','合同结束时间','已续约至', '创建时间', '操作'],
            options: [10, 25, 50],   //条数数目
            searchShow: false,   //搜索开关
            detailModal:false,
            detailModalone:false,
            openBankError:false,
            fileList:[],
            limit: 10,
            type:'',
            previewImage:'',
            teamOptions:[],
            detailVal : {
                serial_number :'',
                contract_name:'',
                party_a:'',
                party_b:'',
                party_c:'',
                type:'',
                signing_date:'',
                start_time:'',
                end_time:'',
                contract_time:'',
                attachment:[]
            },
            header: {ContentType: 'application/x-www-form-urlencoded'},
            page: 1,
            serial_numberError:false,
            contract_nameError:false,
            party_aError:false,
            party_bError:false,
            party_cError:false,
            typeError:false,
            signing_dateError:false,
            start_timeError:false,
            end_timeError:false,
            contract_timeError:false,
            dialogVisible:false,
            attachmentError: false,
            subNavList: {
                parentNode: {
                    name: '合同管理',
                    router: {
                        name: 'contract_list'
                    }
                },
                childNode: {
                    name: '合同列表',
                    desc: '主要用于合同的添加及管理',
                    router: {
                        name: 'contract_list'
                    }
                }
            },
            //搜索
            searchOptions: [
                {
                    type: 'text',
                    name: '合同名称',
                    value: ''
                },
                {
                    type: 'timerange',
                    name: '合同开始时间',
                    value: []
                }
            ],
        }),
        computed: {
            //页数和总条数
            pages () {
                return this.data.pageSize || 1
            },
            offset () {
                return (this.page - 1) * this.limit
            },
            uploadUrl () {
                return api.common.upload
            },
            ...mapGetters([
                'getNavList'
            ])
        },
        methods: {
            //列表页获取
            getList () {
                this.loading = true
                this.$http.post(api.contract.list, {
                    contract_name: this.searchOptions[0].value,
                    start_time: this.searchOptions[1].value.length === 2 ? this.searchOptions[1].value[0] : '',
                    end_time: this.searchOptions[1].value.length === 2 ? this.searchOptions[1].value[1] : '',
                    page: this.page,
                    limit: this.limit
                }).then(res => {
                    this.selectedGroup = []
                    let that = this
                    setTimeout(function () {
                        that.loading = false
                    }, 500)
                    if (res.data.code === 1) {
                        this.data = res.data.data
                    } else {
                        this.data = {
                            limit: 10,
                            page: 1,
                            pageSize: 1,
                            total: 1,
                            items: []
                        }
                        this.$message({
                            type: 'warning',
                            message: res.data.msg
                        })
                    }
                })
            },
            //添加
            addItem(){
                this.type = 'add'
                this.detailVal = {
                    serial_number :'',
                    contract_name:'',
                    party_a:'',
                    party_b:'',
                    party_c:'',
                    type:'',
                    signing_date:'',
                    start_time:'',
                    end_time:'',
                    contract_time:'',
                    attachment:[]
                },
                this.fileList = []
                this.detailModal = true
                this.getGroupList()
            },
            //获取合同类型
            getGroupList () {
                this.$http.post(api.contract.getType).then(res => {
                    if (res.data.code === 1) {
                        this.teamOptions = res.data.data
                        
                    } else {
                        this.teamOptions = []
                        this.$message({
                            type: 'warning',
                            message: res.data.msg
                        })
                    }
                })
            },
            agreementUpload (res, file) {
                if (res.code === 1) {
                    this.detailVal.attachment = res.data.image
                    this.$message({
                        type: 'success',
                        message: '合同上传成功'
                    })
                } else {
                    this.$message({
                        type: 'error',
                        message: res.msg
                    })
                }
            },
            //上传合同
            handleRemove(file, fileList) {
                this.detailVal.attachment = []
                fileList.map(val => {
                    if (val.response && val.response.code === 1) {
                        this.detailVal.attachment.push(val.response.data.image)
                    } else if (!val.response && val.isOld) {
                        this.detailVal.attachment.push(val.url)
                    }
                })
            },
            handlePictureCardPreview(file) {
                // this.previewImage = file.url
                // this.dialogVisible = true
                window.open(file.url)
            },
            contractUpload (res, file, fileList) {
                this.detailVal.attachment = []
                fileList.map(val => {
                    if (val.response && val.response.code === 1) {
                        this.detailVal.attachment.push(val.response.data.image)
                    } else if (!val.response && val.isOld) {
                        this.detailVal.attachment.push(val.url)
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

            //添加按钮
            dailogSubmit(){
                if (!this.detailVal.type) this.typeError = true
                if (!this.detailVal.signing_date) this.signing_dateError = true
                if (!this.detailVal.start_time) this.start_timeError = true
                if (!this.detailVal.end_time) this.end_timeError = true
                // if (!this.detailVal.contract_time) this.contract_timeError = true
                this.validateSerial_number(this.detailVal.serial_number)
                this.validateContract_name(this.detailVal.contract_name)
                this.validateParty_a(this.detailVal.party_a)
                this.validateParty_b(this.detailVal.party_b)
                this.validateParty_c(this.detailVal.party_c)
                if (new Date(this.detailVal.end_time).getTime() < new Date(this.detailVal.start_time).getTime()) {
                    this.$message.warning('合同结束时间应大于合同开始时间')
                    return
                }
                if (this.detailVal.contract_time && new Date(this.detailVal.contract_time).getTime() < new Date(this.detailVal.start_time).getTime()) {
                    this.$message.warning('已续约至时间应大于合同开始时间')
                    return
                }
                if (this.serial_numberError || this.contract_nameError || this.party_aError || this.party_bError || this.party_cError || this.typeError
                || this.signing_dateError || this.start_timeError || this.end_timeError) {
                    this.$message({
                        type: 'warning',
                        message: '请将信息正确填写'
                    })
                    return
                }
                if (this.type === 'edit') {
                    this.$http.post(api.contract.edit, {
                        ...this.detailVal,
                        attachment: this.detailVal.attachment.join(',')
                    }).then(res => {
                        if (res.data.code === 1) {
                            this.$message({
                                type: 'success',
                                message: '修改成功'
                            })
                            this.detailModal = false
                            this.getList()
                        } else {
                            this.$message({
                                type: 'warning',
                                message: res.data.msg
                            })
                        }
                    })
                } else {
                    this.$http.post(api.contract.add,{
                        serial_number:this.detailVal.serial_number,
                        contract_name:this.detailVal.contract_name,
                        party_a:this.detailVal.party_a,
                        party_b:this.detailVal.party_b,
                        party_c:this.detailVal.party_c,
                        type:this.detailVal.type,
                        signing_date:this.detailVal.signing_date,
                        start_time:this.detailVal.start_time,
                        end_time:this.detailVal.end_time,
                        contract_time:this.detailVal.contract_time,
                        attachment: this.detailVal.attachment.join(',')
                    }).then(res => {
                        if (res.data.code === 1) {
                            this.$message({
                                type: 'success',
                                message: '添加成功'
                            })
                            this.detailModal = false
                            this.getList()
                        } else {
                            this.$message({
                                type: 'warning',
                                message: res.data.msg
                            })
                        }
                    })
                }
            },
            //编辑
            editItem (item) {
                this.type = 'edit'
                this.detailModal = true
                this.getDetail(item)
            },
            // 获取详情
            getDetail (item) {
                this.modalLoading = true
                this.$http.post(api.contract.detail, {
                        id: item.id
                }).then(res => {
                    if (res.data.code === 1) {
                        let that = this
                        setTimeout(function () {
                            that.modalLoading = false
                        }, 500)
                        this.detailVal = res.data.data
                        this.detailVal.attachment = this.detailVal.attachment.split(',')
                        this.fileList = this.detailVal.attachment.map((val, index) => {
                            return {
                                name: 'pic' + index,
                                isOld: true,
                                url: val
                            }
                        })
                        if (this.type === 'edit') {
                            this.getGroupList()
                        }
                    } else {
                        this.$message({
                            type: 'warning',
                            message: res.data.msg
                        })
                    }
                })
            },
            // 打开详情
            openDetail (item) {
                this.detailModalone = true
                this.getDetail(item)
            },

            //验证
            validateSerial_number (val) {
                this.serial_numberError = val ? false : true
            },
            validateContract_name (val) {
                this.contract_nameError = val ? false : true
            },
            validateParty_a (val) {
                this.party_aError = val ? false : true
            },
            validateParty_b (val) {
                this.party_bError = val ? false : true
            },
            validateParty_c (val) {
                this.party_cError = val ? false : true
            },
            validateAttachment() {
                this.validateAttachment = false
            },
            groupChange () {
                this.typeError = false
            },
            group11Change() {
                this.signing_dateError = false
            },
            startChange() {
                this.start_timeError = false
            },
            endChange() {
                this.end_timeError = false
            },
            contractChange() {
                this.contract_timeError = false
            },
            //刷新
            refresh () {
                this.getList()    //列表刷新
            },
            // 搜索
            doSearch (data) {
                this.page = 1
                this.searchOptions = data
                this.getList()
            },
            // 下一页
            addPage () {
                if (this.page < this.pages) this.page += 1
            },
            // 上一页
            delPage () {
                if (this.page > 1) this.page -= 1
            }
        },
        created () {
            this.page = this.$route.query.page ? parseInt(this.$route.query.page) : 1
            this.getList()
        },
        watch: {

            page (val) {
                this.$router.replace({name: 'contract_list', query: {page: val}})
                this.getList()
            },
            limit (val) {
                this.getList()
            },
            detailModal(val) {
                if(val){
                    this.serial_numberError = false
                    this.contract_nameError = false
                    this.party_aError = false
                    this.party_bError = false
                    this.party_cError = false
                    this.typeError = false
                    this.signing_dateError = false
                    this.start_timeError = false
                    this.end_timeError = false
                    this.contract_timeError = false
                    this.attachmentError = false
                } else {
                    document.getElementsByClassName('el-dialog__body')[0].scrollTo(0, 0)
                }
            },
            detailModalone (val) {
                if (!val) {
                    document.getElementsByClassName('el-dialog__body')[0].scrollTo(0, 0)
                }
            }
        }
    }
</script>
<style scoped>
</style>
