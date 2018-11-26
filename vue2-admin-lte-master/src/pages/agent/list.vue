<template>
    <!--代理商列表-->
    <div v-loading="loading">
        <div class="p-lg appli-container">
            <sub-header :list="subNavList"></sub-header>
            <div class="page-container">
                <div class="page-toolbar clear m-t-sm">
                    <search-ipts :options="searchOptions" @submit="doSearch" v-show="searchShow"></search-ipts>
                    <div class="pull-left toolbar-candle clear">
                        <a href="javascript:;" title="添加" @click="addItem"
                           class="app-add btn bg-blue1 text-white"><i class="fa fa-plus-square"></i>添加
                        </a>
                        <a href="javascript:;" title="删除" class="app-add btn bg-red1 text-white"
                           @click="delItem(selectedGroup)"><i
                            class="fa fa-trash"></i>删除</a>
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
                    <el-breadcrumb separator="/" class="m-t-sm" v-show="navList.length > 1">
                        <el-breadcrumb-item :to="{name: 'agent_list', query: {id: item.id, level: item.level, page: page}}" :replace="true" v-for="(item, index) in navList">{{item.name}}</el-breadcrumb-item>
                    </el-breadcrumb>
                    <div class="lk-table m-t-sm">
                        <ul class="table-thead clear">
                            <li class="col-xs-24 p-n select-box">
                                <el-checkbox v-model="selectAll">全选</el-checkbox>
                            </li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('ID')!=-1">ID</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('代理商名称')!=-1">代理商名称</li>
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('区域')!=-1">区域</li>
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('省份')!=-1">省份</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('座机')!=-1">座机</li>
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('法人')!=-1">法人</li>
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('负责人')!=-1">负责人</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('负责人电话')!=-1">负责人电话</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('分账比例')!=-1">分账比例</li>
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('状态')!=-1">状态</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('管理账号')!=-1">管理账号</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1" style="min-width: 100px;">操作</li>
                        </ul>
                        <ul class="table-tbody clear" v-for="(item, index) in data.items" @click="selectItem(item.id)">
                            <li class="col-xs-24 p-n select-box">
                                <el-checkbox :label="item.id" v-model="selectedGroup"></el-checkbox>
                            </li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('ID')!=-1" :title="item.id">{{item.id}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('代理商名称')!=-1" :title="item.name">{{item.name}}</li>
                            <li class="col-xs-24 p-n over-omit" v-show="selectVal.indexOf('区域')!=-1" :title="item.region_name">{{item.region_name}}</li>
                            <li class="col-xs-24 p-n over-omit" v-show="selectVal.indexOf('省份')!=-1" :title="item.city_name">{{item.city_name}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('座机')!=-1" :title="item.fixed_telephone">{{item.fixed_telephone}}</li>
                            <li class="col-xs-24 p-n over-omit" v-show="selectVal.indexOf('法人')!=-1":title="item.legal_person">{{item.legal_person}}</li>
                            <li class="col-xs-24 p-n over-omit" v-show="selectVal.indexOf('负责人')!=-1":title="item.leader">{{item.leader}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('负责人电话')!=-1":title="item.leader_phone">{{item.leader_phone}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('分账比例')!=-1":title="item.proportion">{{item.proportion || 0}}%</li>
                            <li class="col-xs-24 p-n over-omit" v-show="selectVal.indexOf('状态')!=-1" :title="item.status_name"  :class="item.status==2?'text-red':'text-green'">{{item.status_name}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('管理账号')!=-1" :title="item.username">{{item.username}}</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1" style="min-width: 100px;">
                                <a href="javascript:;" title="查看次级代理商" :disabled="!item.isHaveChildren" class="candle-btn btn" @click.stop="lookNextAgent(item)"><i
                                    class="fa fa-paper-plane text-lg"></i></a>
                                <a href="javascript:;" title="编辑" class="candle-btn btn" @click.stop="editItem(item)"><i
                                    class="fa fa-edit"></i></a>
                                <a href="javascript:;" title="分账设置" class="candle-btn btn" @click.stop="openAccount(item)"><i
                                    class="fa fa-rmb"></i></a>
                                <a href="javascript:;" :title="item.status==2?'点击启用':'点击禁用'" class="candle-btn btn" @click.stop="statusChange(item)"><i
                                    class="fa" :class="item.status==2? 'fa-lightbulb-o' : 'fa-ban'"></i></a>
                                <a href="javascript:;" title="删除" class="candle-btn btn"
                                   @click.stop="delItem([item.id])"><i class="fa fa-trash"></i></a>
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
                                layout="prev, pager, next"
                                :current-page.sync="page"
                                :page-count="pages">
                            </el-pagination>
                        </div>
                    </div>
                    <el-dialog
                        title="分账设置"
                        :visible.sync="accountModal"
                        custom-class="dialog-modal1"
                        :close-on-click-modal="false">
                        <div class="text-center m-t-lg clear">
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 p-v-sm p-r-n text-right min-width-105">分账比例:</div>
                                <div class="col-xs-11 col-md-6">
                                    <el-input placeholder="请输入分账比例" v-model="accountNum"></el-input>
                                </div>
                                <div class="col-xs-1 col-md-1 p-n text-left line-height-40">
                                %
                                </div>
                            </div>
                            <div class="col-xs-12 col-md-9 m-t-lg">
                                <el-button type="primary" @click="setAccount">确 定</el-button>
                                <el-button @click="accountModal = false">取 消</el-button>
                            </div>
                        </div>
                    </el-dialog>
                    <el-dialog
                        :title="type=='edit'?'编辑':'添加'"
                        :visible.sync="editModal"
                        custom-class="dialog-modal1"
                        :close-on-click-modal="false">
                        <div v-loading="modalLoading">
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 p-v-sm p-r-n text-right min-width-105">所属代理商:</div>
                                <div class="col-xs-12 col-md-8">
                                    <el-select v-model="detailVal.pid" filterable clearable placeholder="请选择代理商">
                                        <el-option
                                        v-for="item in agentOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 p-v-sm p-r-n text-right min-width-105"><span class="text-red">*</span>代理商:</div>
                                <div class="col-xs-12 col-md-8">
                                    <el-input placeholder="请输入代理商" :class="{'border-red': nameError}" v-model="detailVal.name" @blur="validateName(detailVal.name)"></el-input>
                                    <p v-if="nameError" class="text-red"><span class="fa fa-close m-r-xs"></span>代理商不能为空</p>
                                </div>
                            </div>
                            <div class="clear">
                                <div class="col-xs-12 col-md-2 p-v-sm p-r-n text-right min-width-105"><span class="text-red">*</span>代理商地址:</div>
                                <div class="col-xs-12 col-md-9">
                                    <city-select v-model="detailVal.cityLink" :class="{'border-red': addressError}"></city-select>
                                </div>
                            </div>
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 p-v-sm p-r-n text-right min-width-105"></div>
                                <div class="col-xs-12 col-md-8">
                                    <el-input placeholder="请输入详细地址" :class="{'border-red': addressError}" v-model="detailVal.address"></el-input>
                                    <p v-if="addressError" class="text-red"><span class="fa fa-close m-r-xs"></span>代理商地址不能为空</p>
                                </div>
                            </div>
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 p-v-sm p-r-n text-right min-width-105"><span class="text-red">*</span>代理商电话:</div>
                                <div class="col-xs-12 col-md-8">
                                    <el-input placeholder="请输入代理商电话" :class="{'border-red': fixedTelError}" v-model="detailVal.fixed_telephone" @blur="validateFixedTel(detailVal.fixed_telephone)"></el-input>
                                    <p v-if="fixedTelError" class="text-red"><span class="fa fa-close m-r-xs"></span>代理商电话格式不正确</p>
                                </div>
                            </div>
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 p-v-sm p-r-n text-right min-width-105"><span class="text-red">*</span>法人姓名:</div>
                                <div class="col-xs-12 col-md-8">
                                    <el-input placeholder="请输入法人姓名" :class="{'border-red': legalError}" v-model="detailVal.legal_person" @blur="validateLegal(detailVal.legal_person)"></el-input>
                                    <p v-if="legalError" class="text-red"><span class="fa fa-close m-r-xs"></span>法人姓名不能为空</p>
                                </div>
                            </div>
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 p-v-sm p-r-n text-right min-width-105">法人身份证号:</div>
                                <div class="col-xs-12 col-md-8">
                                    <el-input placeholder="请输入法人身份证号" v-model="detailVal.legal_person_id"></el-input>
                                </div>
                            </div>
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 p-v-sm p-r-n text-right min-width-105"><span class="text-red">*</span>负责人:</div>
                                <div class="col-xs-12 col-md-8">
                                    <el-input placeholder="请输入负责人" :class="{'border-red': leaderError}" v-model="detailVal.leader" @blur="validateLeader(detailVal.leader)"></el-input>
                                    <p v-if="leaderError" class="text-red"><span class="fa fa-close m-r-xs"></span>负责人不能为空</p>
                                </div>
                            </div>
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 p-v-sm p-r-n text-right min-width-105"><span class="text-red">*</span>负责人手机号:</div>
                                <div class="col-xs-12 col-md-8">
                                    <el-input placeholder="请输入负责人手机号" :class="{'border-red': leaderTelError}" v-model="detailVal.leader_phone" @blur="validateLeaderTel(detailVal.leader_phone)"></el-input>
                                    <p v-if="leaderTelError" class="text-red"><span class="fa fa-close m-r-xs"></span>手机号格式不正确</p>
                                </div>
                            </div>
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 p-v-sm p-r-n text-right min-width-105">负责人邮箱:</div>
                                <div class="col-xs-12 col-md-8">
                                    <el-input placeholder="请输入负责人邮箱" :class="{'border-red': leaderEmailError}" v-model="detailVal.leader_email" @blur="validateLeaderEmail(detailVal.leader_email)"></el-input>
                                    <p v-if="leaderEmailError" class="text-red"><span class="fa fa-close m-r-xs"></span>邮箱格式不正确</p>
                                </div>
                            </div>
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 p-v-sm p-r-n text-right min-width-105">上传营业执照:</div>
                                <div class="col-xs-12 col-md-8">
                                    <el-upload
                                        class="avatar-uploader"
                                        :action="uploadUrl"
                                        :show-file-list="false"
                                        :headers="header"
                                        accept="image/jpeg,jpg"
                                        :on-success="licenceUploadSuccess"
                                        :before-upload="beforeLicenceUpload">
                                        <img v-if="detailVal.business_licence" :src="detailVal.business_licence" class="avatar">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </div>
                            </div>
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 p-v-sm p-r-n text-right min-width-105">代理商介绍:</div>
                                <div class="col-xs-12 col-md-8">
                                    <el-input placeholder="请输入代理商介绍" type="textarea" rows="4" v-model="detailVal.introduce"></el-input>
                                </div>
                            </div>
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 p-v-sm p-r-n text-right min-width-105"><span class="text-red">*</span>管理账号:</div>
                                <div class="col-xs-12 col-md-8">
                                    <el-input placeholder="请输入管理账号" :disabled="type=='edit'" :class="{'border-red': usernameError}" v-model="detailVal.username" @blur="validateUsername(detailVal.username)"></el-input>
                                    <p v-if="usernameError" class="text-red"><span class="fa fa-close m-r-xs"></span>管理账号由3-20位英文,数字及下划线组成</p>
                                </div>
                            </div>
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 p-v-sm p-r-n text-right min-width-105"><span class="text-red">*</span>管理密码:</div>
                                <div class="col-xs-12 col-md-8">
                                    <el-input placeholder="请输入管理密码" type="password" :class="{'border-red': passwordError}" v-model="detailVal.password" @blur="validatePsd(detailVal.password)"></el-input>
                                    <p v-if="passwordError" class="text-red"><span class="fa fa-close m-r-xs"></span>密码由6-20位英文,数字及特殊字符组成</p>
                                </div>
                            </div>
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 p-v-sm p-r-n text-right min-width-105"><span class="text-red">*</span>确认密码:</div>
                                <div class="col-xs-12 col-md-8">
                                    <el-input placeholder="请再次输入管理密码" type="password" :class="{'border-red': passwordAgainError}" v-model="detailVal.password_again" @blur="validatePasswordAgain(detailVal.password_again)"></el-input>
                                    <p v-if="passwordAgainError" class="text-red"><span class="fa fa-close m-r-xs"></span>两次密码输入不一致</p>
                                </div>
                            </div>
                            <div class="text-center m-t-lg clear">
                                <div class="col-xs-12 col-md-9">
                                    <el-button type="primary" @click="dailogSubmit">确 定</el-button>
                                    <el-button @click="editModal = false">取 消</el-button>
                                </div>
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
    import format from '@/tools/format'
    import validate from '@/tools/validate'
    import SelectCheckbox from '@/components/SelectCheckbox'
    import SearchIpts from '../common/searchIpts'
    import CitySelect from '@/components/citySelect'
    export default {
        //组件
        components: {
            SelectCheckbox,
            SearchIpts,
            SubHeader,
            CitySelect
        },
        data: () => ({
            data: {
                limit: 10,
                page: 1,
                pageSize: 1,
                total: 1,
                items: []
            },
            navList: [
                {
                    name: '代理商列表',
                    id: '',
                    level: 0
                }
            ],
            agentOptions: [],
            teamOptions: [],
            loading: false,
            modalLoading: false,
            selectVal: ['ID', '代理商名称', '区域', '省份', '座机', '法人', '负责人', '负责人电话', '管理账号', '分账比例', '状态', '操作'],
            showList: ['ID', '代理商名称', '区域', '省份', '座机', '法人', '负责人', '负责人电话', '管理账号', '分账比例', '状态', '操作'],
            options: [10, 25, 50],   //条数数目
            searchShow: false,   //搜索开关
            selectAll: false,    //多选框开关
            selectedGroup: [], // 多选框选中值
            limit: 10,
            page: 1,
            //编辑
            detailVal:{
                pid:'',
                name:'',  //代理商名称
                fixed_telephone:'',  //座机
                cityLink: '',
                province_id:'',  //区域
                city_id:'', //城市ID
                region_id: '', // 区域id
                address:'', //详细地址
                legal_person:'',   // 法人
                legal_person_id: '', // 法人身份证号
                leader: '',     //  负责人
                leader_phone: '',   // 负责人电话
                leader_email:'', //负责人邮箱
                business_licence:'', //营业执照
                introduce:'', //介绍
                username:'',  //管理用户名
                password:'',  //管理密码
                password_again: '', // 确认密码
            },
            // 编辑添加提示
            nameError: false,
            addressError: false,
            fixedTelError: false,
            legalError: false,
            leaderError: false,
            leaderTelError: false,
            leaderEmailError: false,
            usernameError:false,
            passwordError: false,
            passwordAgainError: false,
            header: {ContentType: 'application/x-www-form-urlencoded'},
            id: '',
            type: '',
            accountNum: '',
            accountItem: '',
            accountModal: false,
            editModal: false, //编辑框
            subNavList: {
                parentNode: {
                    name: '代理商管理',
                    router: {
                        name: 'agent_list'
                    }
                },
                childNode: {
                    name: '代理商列表',
                    desc: '主要用代理商的查看及管理',
                    router: {
                        name: 'agent_list'
                    }
                }
            },
            //搜索
            searchOptions: [
                {
                    type:'city',
                    name:'地区',
                    value:''
                },
                {
                    type: 'text',
                    name: '代理商名称',
                    value: ''
                },
                {
                    type: 'select',
                    name: '状态',
                    value: '',
                    options: [
                        {
                            value: 1,
                            label: '正常'
                        },
                        {
                            value: 2,
                            label: '失效'
                        }
                    ]
                },
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
            }
        },
        methods: {
            //列表页获取
            getList () {
                this.loading = true
                this.$http.post(api.agent.list, {
                    pid: this.$route.query.id || '',
                    region_id: this.searchOptions[0].value.split('/')[0],
                    province_id: this.searchOptions[0].value.split('/')[1],
                    city_id: this.searchOptions[0].value.split('/')[2],
                    name: this.searchOptions[1].value,
                    status: this.searchOptions[2].value,
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
            getAgent () {
                this.$http.post(api.agent.getAllList).then(res => {
                    if (res.data.code === 1) {
                        this.agentOptions = res.data.data
                    } else {
                        this.agentOptions = []
                        this.$message({
                            type: 'warning',
                            message: res.data.msg
                        })
                    }
                })
            },
            lookNextAgent (item) {
                console.log(item);
                // 如果有次级代理商 push
                if (item.isHaveChildren) {
                    this.navList = this.navList.slice(0, item.level)
                    this.navList.push({
                        name: item.name,
                        id: item.id,
                        level: item.level
                    })
                }
                this.$router.replace({name: 'agent_list', query: {id: item.id, level: item.level, page: this.page}})
            },
            openAccount (item) {
                this.accountNum = item.proportion || 0
                this.accountItem = item
                this.accountModal = true
            },
            setAccount () {
                if (this.accountNum) {
                    if (!/^100$|^(\d|[1-9]\d)(\.\d{1,2})*$/.test(this.accountNum)) {
                        this.$message({
                            type: 'warning',
                            message: '分账比例为100以内正数,且最多保留两位小数'
                        })
                        return
                    }
                    this.$http.post(api.agent.setAccount, {
                        proportion: this.accountNum,
                        agent_id: this.accountItem.id
                    }).then(res => {
                        if (res.data.code === 1) {
                            this.$message({
                                type: 'success',
                                message: '操作成功'
                            })
                            this.getList()
                            this.accountModal = false
                        } else {
                            this.$message({
                                type: 'error',
                                message: res.data.msg
                            })
                        }
                    })
                }  else {
                    this.$message({
                        type: 'warning',
                        message: '请输入分账比例'
                    })
                }
            },
            //删除
            delItem(id) {
                if (id.length > 0) {
                    this.$confirm(id.length > 1 ? '此操作将批量删除选中代理商, 是否继续?' : '此操作将删除该代理商, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$http.get(api.agent.del, {
                            params: {
                                id: id.join(',')
                            }
                        }).then(res => {
                            if (res.data.code === 1) {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                })
                                this.getList()
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: res.data.msg
                                })
                            }
                        })
                    }).catch(() => {
                    })
                } else {
                    this.$message({
                        type: 'warning',
                        message: '请选中需要操作的项'
                    })
                }
            },
            // 添加
            addItem () {
                this.type = 'add'
                this.detailVal = {
                    pid: '',
                    name:'',  //代理商名称
                    fixed_telephone:'',  //座机
                    cityLink: '',
                    province_id:'', //省份ID
                    city_id:'', //城市ID
                    region_id: '',
                    address:'', //详细地址
                    legal_person:'',   // 法人
                    legal_person_id: '',   // 法人身份证号
                    leader: '',     //  负责人
                    leader_phone: '',   // 负责人电话
                    leader_email:'', //负责人邮箱
                    business_licence:'', //营业执照
                    introduce:'', //介绍
                    username:'',  //管理用户名
                    password:'',  //管理密码
                    password_again: ''
                }
                this.editModal = true
                this.addressError = false
            },
            // 获取详情
            getDetail (item) {
                this.modalLoading = true
                this.$http.get(api.agent.details, {
                    params: {
                        id: item.id
                    }
                }).then(res => {
                    if (res.data.code === 1) {
                        let that = this
                        setTimeout(function () {
                            that.modalLoading = false
                        }, 500)
                        this.detailVal = res.data.data
                        this.detailVal.pid = this.detailVal.pid === 0 ? '' : this.detailVal.pid
                        this.$set(this.detailVal, 'cityLink', this.detailVal.region_id + '/' + this.detailVal.province_id + '/' + this.detailVal.city_id)
                    } else {
                        this.$message({
                            type: 'warning',
                            message: res.data.msg
                        })
                    }
                })
            },
            statusChange (item) {
                this.$confirm(item.status === 2 ? '此操作将启用该代理商, 是否继续?' : '此操作将禁用该代理商, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.get(api.agent.disable, {
                        params: {
                            id: item.id,
                            status: item.status === 2 ? 1 : 2
                        }
                    }).then(res => {
                        if(res.data.code === 1) {
                            this.$message({
                                type: 'success',
                                message: '操作成功'
                            })
                            if (item.status === 2) {
                                item.status = 1
                                item.status_name = '正常'
                            } else {
                                item.status = 2
                                item.status_name = '失效'
                            }
                        } else {
                            this.$message({
                                type: 'error',
                                message: res.data.msg
                            })
                        }
                    })
                })
            },
            //编辑
            editItem (item) {
                this.type = 'edit'
                this.editModal = true
                this.getDetail(item)
            },
            //添加/编辑  确定按钮
            dailogSubmit () {
                this.validateUsername(this.detailVal.username)
                this.validateName(this.detailVal.name)
                this.validateLeaderEmail(this.detailVal.leader_email)
                this.validateLeaderTel(this.detailVal.leader_phone)
                this.validatePsd(this.detailVal.password)
                this.validatePasswordAgain(this.detailVal.password_again)
                this.validateFixedTel(this.detailVal.fixed_telephone)
                this.validateLeader(this.detailVal.leader)
                this.validateLegal(this.detailVal.legal_person)
                this.validateAddress()
                if (this.nameError || this.addressError || this.fixedTelError || this.legalError || this.leaderError || this.leaderTelError || this.leaderEmailError
                 || this.passwordError || this.passwordAgainError || this.usernameError) {
                    this.$message({
                        type: 'warning',
                        message: '您填写的信息格式错误'
                    })
                    return
                }
                // this.detailVal.pid = this.detailVal.pid[this.detailVal.pid.length - 1]
                if (this.type === 'edit') {
                    this.$http.post(api.agent.edit, this.detailVal).then(res => {
                        if (res.data.code === 1) {
                            this.$message({
                                type: 'success',
                                message: '修改成功'
                            })
                            this.editModal = false
                            this.getList()
                        } else {
                            this.$message({
                                type: 'warning',
                                message: res.data.msg
                            })
                        }
                    })
                } else {
                    this.$http.post(api.agent.add, this.detailVal).then(res => {
                        if (res.data.code === 1) {
                            this.$message({
                                type: 'success',
                                message: '添加成功'
                            })
                            this.editModal = false
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
            licenceUploadSuccess (res, file) {
                this.detailVal.business_licence = res.data.image
            },
            beforeLicenceUpload (file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('营业执照只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('营业执照图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            // 验证
            validateUsername (val) {
                this.usernameError = this.vUsername(val)
            },
            validateName (val) {
                this.nameError = val ? false : true
            },
            validateAddress () {
                if (this.detailVal.cityLink.split('/')[2] && this.detailVal.address) {
                    this.detailVal.region_id = this.detailVal.cityLink.split('/')[0] || ''
                    this.detailVal.province_id = this.detailVal.cityLink.split('/')[1] || ''
                    this.detailVal.city_id = this.detailVal.cityLink.split('/')[2] || ''
                    this.addressError = false
                } else {
                    this.addressError = true
                }
            },
            validateFixedTel (val) {
                this.fixedTelError = this.vTel(val)
            },
            validateLeader (val) {
                this.leaderError = val ? false : true
            },
            validateLegal (val) {
                this.legalError = val ? false : true
            },
            validateLeaderEmail (val) {
                if (val) {
                    this.leaderEmailError = this.vEmail(val)
                } else {
                    this.leaderEmailError = false
                }if (val) {
                    this.leaderEmailError = this.vEmail(val)
                } else {
                    this.leaderEmailError = false
                }
            },
            validateLeaderTel (val) {
                this.leaderTelError = this.vMobile(val)
            },
            validatePsd (val) {
                if (this.type === 'add' || this.detailVal.password) this.passwordError = this.vPassword(val)
                if (this.type === 'edit' && !this.detailVal.password) this.passwordError = false
            },
            validatePasswordAgain (val) {
                this.passwordAgainError = val === this.detailVal.password ? false : true
            },
            vUsername: validate.username,
            vEmail: validate.email,
            vMobile: validate.mobile,
            vTel: validate.tel,
            vPassword: validate.password,
            groupChange () {
                this.groupError = false
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
            // 点击该行复选框选中
            selectItem (id) {
                if (this.selectedGroup.indexOf(id) !== -1) {
                    this.selectedGroup.splice(this.selectedGroup.indexOf(id), 1)
                } else {
                    this.selectedGroup.push(id)
                }
            },
            // 下一页
            addPage () {
                if (this.page < this.pages) this.page += 1
            },
            // 上一页
            delPage () {
                if (this.page > 1) this.page -= 1
            },
            format: format
        },
        created () {
            this.page = this.$route.query.page ? parseInt(this.$route.query.page) : 1
            this.getList()
        },
        watch: {
            //监听checkbook
            selectedGroup (val) {
                if (val.length === this.data.items.length && val.length > 0) {    //全选全不选
                    this.selectAll = true
                } else {
                    this.selectAll = false
                }
            },
            //全选全不选
            selectAll (val) {
                if (val) {
                    this.selectedGroup = []
                    this.data.items.map(val => {
                        this.selectedGroup.push(val.id)
                    })
                } else {
                    if (this.selectedGroup.length !== this.data.items.length - 1) {
                        this.selectedGroup = []
                    }
                }
            },
            page (val) {
                this.$router.replace({name: 'agent_list', query: {page: val}})
                this.getList()
            },
            limit (val) {
                this.getList()
            },
            '$route.query.id' (val) {
                this.getList()
            },
            '$route.query.level' (val) {
                if (!val) val = 0
                this.navList = this.navList.slice(0, val + 1)
            },
            'detailVal.cityLink' (val) {
                this.addressError = val && val.split('/')[2] && this.detailVal.address ? false : true
            },
            'detailVal.address' (val) {
                this.addressError = val && this.detailVal.cityLink && this.detailVal.cityLink.split('/')[2] ? false : true
            },
            editModal (val) {
                if (val) {
                    this.nameError =  false
                    this.addressError =  false
                    this.fixedTelError =  false
                    this.legalError =  false
                    this.leaderError =  false
                    this.leaderTelError =  false
                    this.leaderEmailError =  false
                    this.passwordError =  false
                    this.passwordAgainError =  false
                    this.usernameError = false
                    this.getAgent()
                } else {
                    document.getElementsByClassName('el-dialog__body')[0].scrollTo(0, 0)
                }
            }
        }
    }
</script>
<style scoped>
</style>
