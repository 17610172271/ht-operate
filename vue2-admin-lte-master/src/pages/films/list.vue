<template>
    <!--管理员账号列表-->
    <div v-loading="loading">
        <div class="p-lg appli-container">
            <sub-header :list="subNavList"></sub-header>
            <div class="page-container">
                <div class="page-toolbar clear m-t-sm">
                    <search-ipts :options="searchOptions" @submit="doSearch" v-show="searchShow"></search-ipts>
                    <div class="pull-left toolbar-candle clear">
                        <!--<a href="javascript:;" title="添加" @click="addItem"-->
                           <!--class="app-add btn bg-blue1 text-white"><i class="fa fa-plus-square"></i>添加-->
                        <!--</a>-->
                        <!--<a href="javascript:;" title="删除" class="app-add btn bg-red1 text-white"-->
                           <!--@click="delItem(selectedGroup)"><i-->
                            <!--class="fa fa-trash"></i>删除</a>-->
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
                            <!--<li class="col-xs-24 p-n select-box">-->
                                <!--<el-checkbox v-model="selectAll">全选</el-checkbox>-->
                            <!--</li>-->
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('ID')!=-1">ID</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('影片名称')!=-1">影片名称</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('英文名称')!=-1">英文名称</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('时长')!=-1">时长</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('分类')!=-1">分类</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('演员')!=-1">演员</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('国家')!=-1">国家</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('导演')!=-1">导演</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('语言')!=-1">语言</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('发布日期')!=-1">发布日期</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('编剧')!=-1">编剧</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('状态')!=-1">状态</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1" style="min-width: 100px;">操作</li>
                        </ul>
                        <ul class="table-tbody clear" v-for="(item, index) in data.items" @click="selectItem(item.id)">
                            <!--<li class="col-xs-24 p-n select-box">-->
                                <!--<el-checkbox :label="item.id" v-model="selectedGroup"></el-checkbox>-->
                            <!--</li>-->
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('ID')!=-1" :title="item.id">{{item.id}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('影片名称')!=-1" :title="item.film_name">{{item.film_name}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('英文名称')!=-1" :title="item.film_en_name">{{item.film_en_name}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('时长')!=-1" :title="item.length">{{item.length}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('分类')!=-1" :title="item.class">{{item.class}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('演员')!=-1" :title="item.actor">{{item.actor}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('国家')!=-1" :title="item.zone">{{item.zone}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('导演')!=-1" :title="item.director">{{item.director}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('语言')!=-1" :title="item.language">{{item.language}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('发布日期')!=-1" :title="format(item.release_date*1000)">{{format(item.release_date*1000)}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('编剧')!=-1" :title="item.screenwriter">{{item.screenwriter}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('状态')!=-1" :class="item.status==2?'text-red':'text-green'" :title="item.status_name">{{item.status_name}}</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1" style="min-width: 100px;">
                                <a href="javascript:;" title="详情" class="candle-btn btn" @click.stop="openDetail(item)"><i
                                    class="fa fa-search-plus"></i></a>
                                <!--<a href="javascript:;" title="编辑" class="candle-btn btn" @click.stop="editItem(item)"><i-->
                                    <!--class="fa fa-edit"></i></a>-->
                                <a href="javascript:;" :title="item.status==2?'点击上线':'点击下线'" class="candle-btn btn" @click.stop="statusChange(item)"><i
                                    class="fa" :class="item.status==1? 'fa-level-down' : 'fa-level-up'"></i></a>
                                <!--<a href="javascript:;" title="删除" class="candle-btn btn"-->
                                   <!--@click.stop="delItem([item.id])"><i class="fa fa-trash"></i></a>-->
                            </li>
                        </ul>
                        <ul class="table-tbody clear" v-if="data.items.length===0">
                            <li class="p-n over-omit">暂无更多数据</li>
                        </ul>
                    </div>
                    <div class="footer clear m-t-md">
                        <div class="pull-left news-record text-lg">
                            <span v-show="data.length>0">显示{{offset + 1}}到{{offset + data.items.length}}条记录，</span>共<span
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
                        title="详情"
                        :visible.sync="detailModal"
                        custom-class="dialog-modal1">
                        <div v-loading="modalLoading">
                            <div class="clear">
                                <div class="col-xs-2 line-height-40 text-right text-bold min-width-105">标题</div>
                                <div class="col-xs-8 line-height-40 text-bold">内容</div>
                            </div>
                            <div class="clear bg-f9">
                                <div class="col-xs-2 line-height-40 text-right min-width-105">影片ID:</div>
                                <div class="col-xs-8 line-height-40">{{detailVal.id}}</div>
                            </div>
                            <div class="clear">
                                <div class="col-xs-2 line-height-40 text-right min-width-105">
                                    影片名称:</div>
                                <div class="col-xs-8 line-height-40">{{detailVal.film_name}}</div>
                            </div>
                            <div class="clear bg-f9">
                                <div class="col-xs-2 line-height-40 text-right min-width-105">
                                    英文名称:</div>
                                <div class="col-xs-8 line-height-40">{{detailVal.film_en_name}}</div>
                            </div>
                            <div class="clear">
                                <div class="col-xs-2 line-height-40 text-right min-width-105">时长:</div>
                                <div class="col-xs-8 line-height-40">{{detailVal.length}}</div>
                            </div>
                            <div class="clear bg-f9">
                                <div class="col-xs-2 line-height-40 text-right min-width-105">分类:</div>
                                <div class="col-xs-8 line-height-40">{{detailVal.class}}</div>
                            </div>
                            <div class="clear">
                                <div class="col-xs-2 line-height-40 text-right min-width-105">演员:</div>
                                <div class="col-xs-8 line-height-40">{{detailVal.actor}}</div>
                            </div>
                            <div class="clear bg-f9">
                                <div class="col-xs-2 line-height-40 text-right min-width-105">国家:</div>
                                <div class="col-xs-8 line-height-40">{{detailVal.zone}}</div>
                            </div>
                            <div class="clear">
                                <div class="col-xs-2 line-height-40 text-right min-width-105">导演:</div>
                                <div class="col-xs-8 line-height-40">{{detailVal.director}}</div>
                            </div>
                            <div class="clear bg-f9">
                                <div class="col-xs-2 line-height-40 text-right min-width-105">
                                    语言:</div>
                                <div class="col-xs-8 line-height-40">{{detailVal.language}}</div>
                            </div>
                            <div class="clear">
                                <div class="col-xs-2 line-height-40 text-right min-width-105">上映日期:</div>
                                <div class="col-xs-8 line-height-40">{{detailVal.release_date}}</div>
                            </div>
                            <div class="clear bg-f9">
                                <div class="col-xs-2 line-height-40 text-right min-width-105">编剧:</div>
                                <div class="col-xs-8 line-height-40">{{detailVal.screenwriter}}</div>
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
                                <div class="col-xs-12 col-sm-2 line-height-40 text-right min-width-105">所属组别:</div>
                                <div class="col-xs-12 col-sm-8 team-select">
                                    <el-select :class="{'border-red': groupError}" @change="groupChange" v-model="detailVal.group_id" placeholder="请选择组别" popper-class="select-team">
                                        <el-option
                                            v-for="(item, index) in teamOptions"
                                            :key="index"
                                            :label="item.name"
                                            :value="item.id">
                                        </el-option>
                                    </el-select>
                                    <p v-if="groupError" class="text-red"><span class="fa fa-close m-r-xs"></span>请选择所属组别</p>
                                </div>
                            </div>
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 line-height-40 text-right min-width-105">用户名:</div>
                                <div class="col-xs-12 col-md-8">
                                    <el-input placeholder="请输入用户名" :class="{'border-red': usernameError}" v-model="detailVal.username" @blur="validateUsername(detailVal.username)"></el-input>
                                    <p v-if="usernameError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入3-12位英文、数字、下划线组成的用户名</p>
                                </div>
                            </div>
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 line-height-40 text-right min-width-105">昵称:</div>
                                <div class="col-xs-12 col-md-8">
                                    <el-input placeholder="请输入昵称" :class="{'border-red': nicknameError}" v-model="detailVal.nickname" @blur="validateNickname(detailVal.nickname)"></el-input>
                                    <p v-if="nicknameError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入昵称</p>
                                </div>
                            </div>
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 line-height-40 text-right min-width-105">手机号:</div>
                                <div class="col-xs-12 col-md-8">
                                    <el-input placeholder="请输入手机号" :class="{'border-red': mobileError}" v-model="detailVal.mobile" @blur="validateMobile(detailVal.mobile)"></el-input>
                                    <p v-if="mobileError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入有效的手机号</p>
                                </div>
                            </div>
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 line-height-40 text-right min-width-105">Email:</div>
                                <div class="col-xs-12 col-md-8">
                                    <el-input placeholder="请输入Email" :class="{'border-red': emailError}" v-model="detailVal.email" @blur="validateEmail(detailVal.email)"></el-input>
                                    <p v-if="emailError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入有效的邮箱地址</p>
                                </div>
                            </div>
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 line-height-40 text-right min-width-105">密码:</div>
                                <div class="col-xs-12 col-md-8">
                                    <el-input placeholder="请输入密码" type="password" :class="{'border-red': passwordError}" v-model="detailVal.password" @blur="validatePsd(detailVal.password)"></el-input>
                                    <p v-if="passwordError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入有效的密码</p>
                                </div>
                            </div>
                            <div class="clear m-b-sm" v-if="type=='add'">
                                <div class="col-xs-12 col-md-2 line-height-40 text-right min-width-105">状态:</div>
                                <div class="col-xs-12 col-md-8 line-height-40">
                                    <el-radio :label="1" v-model="detailVal.status">启用</el-radio>
                                    <el-radio :label="2" v-model="detailVal.status">禁用</el-radio>
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
    export default {
        //组件
        components: {
            SelectCheckbox,
            SearchIpts,
            SubHeader,
        },
        data: () => ({
            data: {
                curr: 1,
                total: 1,
                total_page: 1,
                items: []
            },
            teamOptions: [],
            loading: false,
            modalLoading: false,
            selectVal: ['ID', '影片名称', '英文名称', '时长', '分类', '演员', '国家','导演','语言','发布日期','编剧','状态','操作'],
            showList: ['ID', '影片名称', '英文名称', '时长', '分类', '演员', '国家','导演','语言','发布日期','编剧','状态','操作'],
            options: [10, 25, 50],   //条数数目
            searchShow: false,   //搜索开关
            selectAll: false,    //多选框开关
            selectedGroup: [], // 多选框选中值
            limit: 10,
            page: 1,
            //编辑
            detailVal:{
                group_id: '',
                username:'',
                nickname:'',
                mobile: '',
                email:'',
                password: '',
                status: 1
            }, // 编辑详情弹出框值
            groupError: false,
            usernameError: false,
            nicknameError: false,
            emailError: false,
            mobileError: false,
            passwordError: false,
            id: '',
            type: '',
            detailModal: false, // 详情框
            editModal: false, //编辑框
            //头部文字
            subNavList: {
                parentNode: {
                    name: '影片库管理',
                    router: {
                        name: 'films_list'
                    }
                },
                childNode: {
                    name: '影片库列表',
                    desc: '主要用影片库的查看及管理',
                    router: {
                        name: 'films_list'
                    }
                }
            },
            //搜索
            searchOptions: [
                {
                    type: 'text',
                    name: '影片名称',
                    value: ''
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
            }
        },
        methods: {
            //列表页获取
            getList () {
                this.loading = true
                this.$http.post(api.film.list, {
                    film_name: this.searchOptions[0].value,
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
                this.$http.post(api.account.group, {
                    pid: ''
                }).then(res => {
                    if (res.data.code === 1) {
                        this.teamOptions = res.data.data
                        if (this.type === 'edit') {
                            this.teamOptions.map(val => {
                                if (val.name === this.detailVal.groupname) {
                                    this.detailVal.group_id = val.id
                                }
                            })
                        }
                    } else {
                        this.teamOptions = []
                        this.$message({
                            type: 'warning',
                            message: res.data.msg
                        })
                    }
                })
            },
            //删除
            delItem(id) {
                if (id.length > 0) {
                    this.$confirm(id.length > 1 ? '此操作将批量删除选中用户, 是否继续?' : '此操作将删除该用户, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$http.get(api.account.delete, {
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
                    username: '',
                    nickname: '',
                    mobile: '',
                    email: '',
                    group_id: '',
                    password: '',
                    status: 1
                }
                this.editModal = true
                this.getGroupList()
            },
            // 获取详情
            getDetail (item) {
                this.modalLoading = true
                this.$http.get(api.film.detail, {
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
                this.$confirm(item.status === 2 ? '此操作将电影上线, 是否继续?' : '此操作将电影下线, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.get(api.film.status, {
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
                                item.status_name = '上线'
                            } else {
                                item.status = 2
                                item.status_name = '下线'
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
            //编辑确定按钮
            dailogSubmit () {
                if (!this.detailVal.group_id) this.groupError = true
                this.validateUsername(this.detailVal.username)
                this.validateNickname(this.detailVal.nickname)
                this.validateEmail(this.detailVal.email)
                this.validateMobile(this.detailVal.mobile)
                this.validatePsd(this.detailVal.password)
                if (this.groupError || this.usernameError || this.nicknameError || this.emailError || this.mobileError || this.passwordError) return
                if (this.type === 'edit') {
                    this.$http.post(api.account.edit, this.detailVal).then(res => {
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
                    this.$http.post(api.account.add, this.detailVal).then(res => {
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
            validateNickname (val) {
                this.nicknameError = val ? false : true
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
                this.$router.replace({name: 'films_list', query: {page: val}})
                this.getList()
            },
            limit (val) {
                this.getList()
            },
            editModal (val) {
                if (val) {
                    this.groupError = false
                    this.usernameError = false
                    this.nicknameError = false
                    this.emailError = false
                    this.mobileError = false
                    this.passwordError = false
                }
            }
        }
    }
</script>
<style>

</style>

