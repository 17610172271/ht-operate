<template>
    <!--管理员账号列表-->
    <div v-loading="loading">
        <div class="p-lg appli-container">
            <sub-header :list="subNavList"></sub-header>
            <div class="page-container">
                <div class="page-toolbar clear m-t-sm">
                    <search-ipts :options="searchOptions" @submit="doSearch" v-show="searchShow"></search-ipts>
                    <div class="pull-left toolbar-candle clear">
                        <a href="javascript:;" title="添加" v-if="getNavList['4080104']" @click="addItem"
                           class="app-add btn bg-blue1 text-white"><i class="fa fa-plus-square"></i>添加
                        </a>
                        <div class="app-refresh btn bg-gray1" title="刷新" @click="refresh"><i
                            class="fa fa-refresh"></i></div>
                    </div>
                    <div class="pull-right clear">
                        <div class="pull-left m-r-sm opacity-8" title="列">
                            <select-checkbox :list="showList" v-model="selectVal" style="width: 60px;"></select-checkbox>
                        </div>
                        <!-- <div class="pull-left btn opacity-8 search-btn" @click="searchShow = !searchShow"><i
                            class="fa fa-search" title="搜索"></i></div> -->
                    </div>
                </div>
                <div class="page-contaoner">
                    <div class="lk-table m-t-sm">
                        <ul class="table-thead clear">
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('序号')!=-1">序号</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('用户名')!=-1">用户名</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('真实姓名')!=-1">真实姓名</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('手机号')!=-1">手机号</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('邮箱')!=-1">邮箱</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('角色')!=-1">角色</li>
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('状态')!=-1">状态</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1">操作</li>
                        </ul>
                        <ul class="table-tbody clear" v-for="(item, index) in data.items">
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('序号')!=-1">{{offset + index + 1}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('用户名')!=-1" :title="item.username">{{item.username}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('真实姓名')!=-1" :title="item.realname">{{item.realname}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('手机号')!=-1" :title="item.mobile">{{item.mobile}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('邮箱')!=-1" :title="item.email">{{item.email}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('角色')!=-1" :title="item.role_name">{{item.role_name}}</li>
                            <li class="col-xs-24 p-n over-omit" v-show="selectVal.indexOf('状态')!=-1" :title="item.status_name" :class="item.status==2?'text-red':'text-green'">{{item.status_name}}</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1">
                                <a href="javascript:;" v-if="getNavList['4080102']" title="编辑" :class="{'disabled': item.id==getAuthInfo.id}" class="link" @click.stop="editItem(item)">编辑</a>
                                <a href="javascript:;" v-if="getNavList['4080101']" :title="item.status==2?'点击启用':'点击禁用'" class="link" :class="{'disabled': item.id==getAuthInfo.id}" @click.stop="statusChange(item)">{{item.status==2?'开启':'禁用'}}</a>
                                <a href="javascript:;" v-if="getNavList['4080103']" title="删除" class="link" :class="{'disabled': item.id==getAuthInfo.id}" @click.stop="delItem(item.id)">删除</a>
                                <span v-if="!getNavList['4080102']&&!getNavList['4080101']&&!getNavList['4080103']">---</span>
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
                        :visible.sync="editModal"
                        custom-class="dialog-modal1"
                        :close-on-click-modal="false">
                        <div v-loading="modalLoading">
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 line-height-40 text-right min-width-105"><span class="text-red">*</span>用户名:</div>
                                <div class="col-xs-12 col-md-8">
                                    <el-input placeholder="请输入用户名" :disabled="type=== 'edit'"  :class="{'border-red': usernameError}" v-model="detailVal.username" @blur="validateUsername(detailVal.username)"></el-input>
                                    <p v-if="usernameError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入3-12位英文、数字、下划线组成的用户名</p>
                                </div>
                            </div>
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 line-height-40 text-right min-width-105"><span class="text-red">*</span>真实姓名:</div>
                                <div class="col-xs-12 col-md-8">
                                    <el-input placeholder="请输入真实姓名" :class="{'border-red': realnameError}" v-model="detailVal.realname" @blur="validaterealname(detailVal.realname)"></el-input>
                                    <p v-if="realnameError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入真实姓名</p>
                                </div>
                            </div>
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 line-height-40 text-right min-width-105"><span class="text-red">*</span>密码:</div>
                                <div class="col-xs-12 col-md-8">
                                    <el-input placeholder="请输入密码" type="password" :class="{'border-red': passwordError}" v-model="detailVal.password" @blur="validatePsd(detailVal.password)"></el-input>
                                    <p v-if="passwordError" class="text-red"><span class="fa fa-close m-r-xs"></span>密码由6-20位英文,数字及特殊符号组成</p>
                                </div>
                            </div>
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 line-height-40 text-right min-width-105"><span class="text-red">*</span>确认密码:</div>
                                <div class="col-xs-12 col-md-8">
                                    <el-input placeholder="请确认密码" type="password" :class="{'border-red': repasswordError}" v-model="detailVal.repassword" @blur="validateRepsd(detailVal.repassword)"></el-input>
                                    <p v-if="repasswordError" class="text-red"><span class="fa fa-close m-r-xs"></span>两次输入密码不一致</p>
                                </div>
                            </div>
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 line-height-40 text-right min-width-105"><span class="text-red">*</span>手机号:</div>
                                <div class="col-xs-12 col-md-8">
                                    <el-input placeholder="请输入手机号" :class="{'border-red': mobileError}" v-model="detailVal.mobile" @blur="validateMobile(detailVal.mobile)"></el-input>
                                    <p v-if="mobileError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入有效的手机号</p>
                                </div>
                            </div>
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 line-height-40 text-right min-width-105"><span class="text-red">*</span>Email:</div>
                                <div class="col-xs-12 col-md-8">
                                    <el-input placeholder="请输入Email" :class="{'border-red': emailError}" v-model="detailVal.email" @blur="validateEmail(detailVal.email)"></el-input>
                                    <p v-if="emailError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入有效的邮箱地址</p>
                                </div>
                            </div>
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-sm-2 line-height-40 text-right min-width-105"><span class="text-red">*</span>角色:</div>
                                <div class="col-xs-12 col-sm-8 team-select">
                                    <el-select :class="{'border-red': groupError}" @change="groupChange" v-model="detailVal.role_id" placeholder="请选择角色" popper-class="select-team">
                                        <el-option
                                            v-for="(item, index) in teamOptions"
                                            :key="index"
                                            :label="item.role_name"
                                            :value="item.role_id">
                                        </el-option>
                                    </el-select>
                                    <p v-if="groupError" class="text-red"><span class="fa fa-close m-r-xs"></span>请选择角色</p>
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
    import { mapGetters, mapActions } from 'vuex'
    export default {
        //组件
        components: {
            SelectCheckbox,
            SearchIpts,
            SubHeader,
        },
        data: () => ({
            data: {
                limit: 10,
                page: 1,
                pageSize: 1,
                total: 1,
                items: []
            },
            teamOptions: [],
            loading: false,
            modalLoading: false,
            selectVal: ['序号', '用户名', '真实姓名', '手机号', '邮箱', '角色', '状态', '操作'],
            showList: ['序号', '用户名', '真实姓名', '手机号', '邮箱', '角色', '状态', '操作'],
            options: [10, 25, 50],   //条数数目
            searchShow: false,   //搜索开关
            selectAll: false,    //多选框开关
            selectedGroup: [], // 多选框选中值
            limit: 10,
            page: 1,
            //编辑
            detailVal:{
                role_id: '',
                username:'',
                realname:'',
                mobile: '',
                email:'',
                password: '',
                repassword: ''
            }, // 编辑详情弹出框值
            groupError: false,
            usernameError: false,
            realnameError: false,
            emailError: false,
            mobileError: false,
            passwordError: false,
            repasswordError: false,
            id: '',
            type: '',
            detailModal: false, // 详情框
            editModal: false, //编辑框
            //头部文字
            subNavList: {
                parentNode: {
                    name: '账号管理',
                    router: {
                        name: 'account_list'
                    }
                },
                childNode: {
                    name: '账号列表',
                    desc: '主要用于管理员账号的查看及管理',
                    router: {
                        name: 'account_list'
                    }

                }
            },
            //搜索
            searchOptions: [
                {
                    type: 'text',
                    name: '用户名',
                    value: ''
                },
                {
                    type: 'text',
                    name: '邮箱',
                    value: ''
                },
                {
                    type: 'select',
                    name: '状态',
                    value: '',
                    options: [
                        {
                            value: 1,
                            label: '启用'
                        },
                        {
                            value: 2,
                            label: '禁用'
                        }
                    ]
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
            ...mapGetters([
                'getAuthInfo',
                'getNavList'
            ])
        },
        methods: {
            //列表页获取
            getList () {
                this.loading = true
                this.$http.post(api.system.userList, {
                    // username: this.searchOptions[0].value,
                    // email: this.searchOptions[1].value,
                    // status: this.searchOptions[2].value,
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
            // 角色分组列表
            getGroupList () {
                this.$http.post(api.system.roleList, {
                    page: 1,
                    limit: 9999
                }).then(res => {
                    if (res.data.code === 1) {
                        this.teamOptions = res.data.data.items
                    } else {
                        this.teamOptions = []
                    }
                })
            },
            //删除
            delItem(id) {
                this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post(api.system.userDel, {
                        id: id
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
            },
            // 添加
            addItem () {
                this.type = 'add'
                this.detailVal = {
                    username: '',
                    realname: '',
                    mobile: '',
                    email: '',
                    role_id: '',
                    password: '',
                    repassword: ''
                }
                this.editModal = true
                this.getGroupList()
            },
            // 获取详情
            getDetail (item) {
                this.modalLoading = true
                this.$http.post(api.system.userDetail, {
                    id: item.id
                }).then(res => {
                    if (res.data.code === 1) {
                        let that = this
                        setTimeout(function () {
                            that.modalLoading = false
                        }, 500)
                        this.detailVal = res.data.data
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
                this.detailModal = true
                this.getDetail(item)
            },
            //编辑
            editItem (item) {
                this.type = 'edit'
                this.editModal = true
                this.getDetail(item)
            },
            statusChange (item) {
                this.$confirm(item.status === 2 ? '此操作将启用该用户, 是否继续?' : '此操作将禁用该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post(api.system.userDisabled, {
                        id: item.id
                    }).then(res => {
                        if(res.data.code === 1) {
                            this.$message({
                                type: 'success',
                                message: '操作成功'
                            })
                            this.getList()
                        } else {
                            this.$message({
                                type: 'error',
                                message: res.data.msg
                            })
                        }
                    })
                })
            },
            //编辑确定按钮
            dailogSubmit () {
                if (!this.detailVal.role_id) this.groupError = true
                this.validateUsername(this.detailVal.username)
                this.validaterealname(this.detailVal.realname)
                this.validateEmail(this.detailVal.email)
                this.validateMobile(this.detailVal.mobile)
                this.validatePsd(this.detailVal.password)
                this.validateRepsd(this.detailVal.repassword)
                if (this.groupError || this.usernameError || this.realnameError || this.emailError || this.mobileError || this.passwordError || this.repasswordError) {
                    this.$message({
                        type: 'warning',
                        message: '您填写的信息格式错误'
                    })
                    return
                }
                if (this.type === 'edit') {
                    this.$http.post(api.system.userEdit, this.detailVal).then(res => {
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
                    this.$http.post(api.system.userAdd, this.detailVal).then(res => {
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
            // 验证
            validateUsername (val) {
                this.usernameError = this.vUsername(val)
            },
            validaterealname (val) {
                this.realnameError = val ? false : true
            },
            validateEmail (val) {
                this.emailError = this.vEmail(val)
            },
            validateMobile (val) {
                this.mobileError = this.vMobile(val)
            },
            validatePsd (val) {
                if (this.type === 'add' || this.detailVal.password) this.passwordError = this.vPassword(val)
                if (this.type === 'edit' && !this.detailVal.password) this.passwordError = false
            },
            validateRepsd (val) {
                this.repasswordError = val === this.detailVal.password ? false : true
            },
            vUsername: validate.username,
            vEmail: validate.email,
            vMobile: validate.mobile,
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
            page (val) {
                this.$router.replace({name: 'account_list', query: {page: val}})
                this.getList()
            },
            limit (val) {
                this.getList()
            },
            editModal (val) {
                if (val) {
                    this.groupError = false
                    this.usernameError = false
                    this.realnameError = false
                    this.emailError = false
                    this.mobileError = false
                    this.passwordError = false
                    this.repasswordError = false
                }
            }
        }
    }
</script>
<style>

</style>

