<template>
    <!--管理员账号列表-->
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
                        <!-- <div class="app-del btn bg-red1 text-white"><i class="fa fa-minus-square"></i>删除</div> -->
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
                            <li class="col-xs-24 p-n select-box" v-show="selectVal.indexOf('checkbox')!=-1">
                                <el-checkbox v-model="selectAll">全选</el-checkbox>
                            </li>
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('ID')!=-1">ID</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('用户名')!=-1">用户名</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('昵称')!=-1">昵称</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('分组名称')!=-1">分组名称</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('邮箱')!=-1">邮箱</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('手机号')!=-1">手机号</li>
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('状态')!=-1">状态</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1">操作</li>
                        </ul>
                        <ul class="table-tbody clear" v-for="(item, index) in data.items" @click="selectItem(item.id)">
                            <li class="col-xs-24 p-n select-box" v-show="selectVal.indexOf('checkbox')!=-1">
                                <el-checkbox :label="item.id" v-model="selectedGroup"></el-checkbox>
                            </li>
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('ID')!=-1" :title="item.id">{{item.id}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('用户名')!=-1" :title="item.username">{{item.username}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('昵称')!=-1" :title="item.nickname">{{item.nickname}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('分组名称')!=-1":title="item.name">{{item.name}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('邮箱')!=-1" :title="item.email">{{item.email}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('手机号')!=-1":title="item.mobile">{{item.mobile}}</li>
                            <li class="col-xs-24 p-n over-omit" v-show="selectVal.indexOf('状态')!=-1":title="item.status">{{item.status}}</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1">
                                <a href="javascript:;" title="详情" class="candle-btn btn" @click.stop="openDetail(item)"><i
                                    class="fa fa-search-plus"></i></a>
                                <a href="javascript:;" title="编辑" class="candle-btn btn" @click.stop="editItem(item)"><i
                                    class="fa fa-edit"></i></a>
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
                            <span v-show="data.length>0">显示{{offset + 1}}到{{offset + data.items.length}}条消息，</span>共<span
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
                        <div class="clear">
                            <div class="col-xs-2 line-height-40 text-right text-bold">标题</div>
                            <div class="col-xs-8 line-height-40 text-bold">内容</div>
                        </div>
                        <div class="clear bg-f9">
                            <div class="col-xs-2 line-height-40 text-right">用户名:</div>
                            <div class="col-xs-8 line-height-40">{{detailVal.username}}</div>
                        </div>
                        <div class="clear">
                            <div class="col-xs-2 line-height-40 text-right">昵称:</div>
                            <div class="col-xs-8 line-height-40">{{detailVal.nickname}}</div>
                        </div>
                        <div class="clear bg-f9">
                            <div class="col-xs-2 line-height-40 text-right">分组名称:</div>
                            <div class="col-xs-8 line-height-40">{{detailVal.name}}</div>
                        </div>
                        <div class="clear">
                            <div class="col-xs-2 line-height-40 text-right">Email:</div>
                            <div class="col-xs-8 line-height-40">{{detailVal.email}}</div>
                        </div>
                        <div class="clear bg-f9">
                            <div class="col-xs-2 line-height-40 text-right">手机号:</div>
                            <div class="col-xs-8 line-height-40">{{detailVal.mobile}}</div>
                        </div>
                        <div class="clear">
                            <div class="col-xs-2 line-height-40 text-right">状态:</div>
                            <div class="col-xs-8 line-height-40">{{detailVal.status}}</div>
                        </div>
                    </el-dialog>
                    <el-dialog
                        :title="type=='edit'?'编辑':'添加'"
                        :visible.sync="editModal"
                        custom-class="dialog-modal1"
                        :close-on-click-modal="false">
                        <div v-loading="modalLoading">
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-sm-2 line-height-40 text-right">所属组别:</div>
                                <div class="col-xs-12 col-sm-8 team-select">
                                    <el-select v-model="detailVal.group" placeholder="请选择组别" popper-class="select-team">
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
                                <div class="col-xs-12 col-md-2 line-height-40 text-right">用户名:</div>
                                <div class="col-xs-12 col-md-8">
                                    <el-input placeholder="请输入用户名" v-model="detailVal.username" @blur="validateUsername(detailVal.username)"></el-input>
                                    <p v-if="usernameError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入3-12位英文、数字、下划线组成的用户名</p>
                                </div>
                            </div>
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 line-height-40 text-right">昵称:</div>
                                <div class="col-xs-12 col-md-8">
                                    <el-input placeholder="请输入昵称" v-model="detailVal.nickname" @blur="validateNickname(detailVal.nickname)"></el-input>
                                    <p v-if="nicknameError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入昵称</p>
                                </div>
                            </div>
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 line-height-40 text-right">Email:</div>
                                <div class="col-xs-12 col-md-8">
                                    <el-input placeholder="请输入Email" v-model="detailVal.email" @blur="validateEmail(detailVal.email)"></el-input>
                                    <p v-if="emailError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入有效的邮箱地址</p>
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
            selectVal: ['checkbox', 'ID', '用户名', '昵称', '分组名称', '邮箱', '手机号', '状态', '操作'],
            showList: ['checkbox', 'ID', '用户名', '昵称', '分组名称', '邮箱', '手机号', '状态', '操作'],
            options: [10, 25, 50],   //条数数目
            searchShow: false,   //搜索开关
            selectAll: false,    //多选框开关
            selectedGroup: [], // 多选框选中值
            limit: 10,
            page: 1,
            //编辑
            detailVal:{
                group: '',
                username:'',
                nickname:'',
                email:''
            }, // 编辑详情弹出框值
            groupError: false,
            usernameError: false,
            nicknameError: false,
            emailError: false,
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
                    name: '管理账号列表',
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
                    type: 'text',
                    name: '状态',
                    value: ''
                }
            ],
        }),
        computed: {
            //页数和总条数
            pages () {
                return this.data.total_page || 1
            },
            offset () {
                return (this.page - 1) * this.limit
            }
        },
        methods: {
            //列表页获取
            getList () {
                this.loading = true
                this.$http.post(api.account.list, {
                    username: this.searchOptions[0].value,
                    email: this.searchOptions[1].value,
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
                            curr: 1,
                            total: 1,
                            total_page: 1,
                            items: []
                        }
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
                            if (res.data.code === 200) {
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
                    email: '',
                    group: ''
                }
                this.editModal = true
            },
            // 详情
            openDetail (item) {
                this.detailVal = item
                this.detailModal = true
            },
            //编辑
            editItem (item) {
                this.type = 'edit'
                this.detailVal = item
                this.editModal = true
            },
            //编辑确定按钮
            dailogSubmit () {
                if (this.type === 'edit') {
                    this.$http.post(api.account.edit, {
                    }).then(res => {
                        if (res.data.code === 1) {
                            this.editModal = false
                            this.$message({
                                type: 'success',
                                message: '修改成功'
                            })
                        } else {
                            this.$message({
                                type: 'warning',
                                message: res.data.msg
                            })
                        }
                        this.getList()
                    })
                } else {
                    this.editModal = false
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
            vUsername: validate.username,
            vEmail: validate.email,
            vMobile: validate.mobile,
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
                if (val.length === this.data.items.length) {    //全选全不选
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
                this.$router.replace({name: 'account_list', query: {page: val}})
                this.getList()
            },
            limit (val) {
                this.getList()
            }
        }
    }
</script>
<style>

</style>

