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
                        <!-- <div class="app-del btn bg-red1 text-white"><i class="fa fa-minus-square"></i>删除</div> -->
                        <div class="app-refresh btn bg-gray1" title="刷新" @click="refresh"><i
                            class="fa fa-refresh"></i></div>
                    </div>
                    <div class="pull-right clear">
                        <div class="pull-left m-r-sm opacity-8" title="列">
                            <select-checkbox :list="showList" v-model="selectVal" style="width: 60px;"></select-checkbox>
                        </div>
                        <!--<div class="pull-left btn opacity-8 search-btn" @click="searchShow = !searchShow"><i-->
                            <!--class="fa fa-search" title="搜索"></i></div>-->
                    </div>
                </div>
                <div class="page-contaoner">
                    <div class="lk-table m-t-sm">
                        <ul class="table-thead clear">
                            <li class="col-xs-24 p-n select-box">
                                <el-checkbox v-model="selectAll">全选</el-checkbox>
                            </li>
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('ID')!=-1">ID</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('分组名称')!=-1">分组名称</li>
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('状态')!=-1">状态</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1">操作</li>
                        </ul>
                        <ul class="table-tbody clear" v-for="(item, index) in data.items" @click="selectItem(item.id)">
                            <li class="col-xs-24 p-n select-box">
                                <el-checkbox :label="item.id" v-model="selectedGroup"></el-checkbox>
                            </li>
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('ID')!=-1" :title="item.id">{{item.id}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('分组名称')!=-1":title="item.name">{{item.name}}</li>
                            <li class="col-xs-24 p-n over-omit" v-show="selectVal.indexOf('状态')!=-1" :class="{'text-green': item.status==1, 'text-red': item.status==2}" :title="item.status_name">{{item.status_name}}</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1">
                                <a href="javascript:;" title="编辑" :class="{'disabled': item.name == '超级管理员'}" class="link" @click.stop="editItem(item)">编辑</a>
                                <!--<a href="javascript:;" title="删除" class="link" @click.stop="delItem([item.id])">删除</a>-->
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
                                <div class="col-xs-12 col-md-2 p-v-sm p-r-n text-right min-width-105"><span class="text-red">*</span>分组名称:</div>
                                <div class="col-xs-12 col-md-8">
                                    <el-input placeholder="请输入分组名称" :class="{'border-red': nameError}" v-model="detailVal.name" @blur="validateName(detailVal.name)"></el-input>
                                    <p v-if="nameError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入分组名称</p>
                                </div>
                            </div>
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 p-v-sm p-r-n text-right min-width-105"><span class="text-red">*</span>父级:</div>
                                <div class="col-xs-12 col-sm-8 team-select">
                                    <el-select :class="{'border-red': groupError}" @change="groupChange(detailVal.pid)" v-model="detailVal.pid" placeholder="请选择" popper-class="select-team">
                                        <el-option
                                            v-for="(item, index) in parentsGroup"
                                            :key="index"
                                            :label="item.name"
                                            :value="item.id">
                                        </el-option>
                                    </el-select>
                                    <p v-if="groupError" class="text-red"><span class="fa fa-close m-r-xs"></span>请选择父级</p>
                                </div>
                            </div>
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 p-v-sm p-r-n text-right min-width-105"><span class="text-red">*</span>规则:</div>
                                <div class="col-xs-12 col-sm-8 team-select p-v-sm">
                                    <el-tree
                                        :data="ruleList"
                                        show-checkbox
                                        :check-on-click-node="true"
                                        :accordion="true"
                                        node-key="id"
                                        ref="ruleTree"
                                        :props="defaultProps">
                                    </el-tree>
                                </div>
                            </div>
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 p-v-sm p-r-n text-right min-width-105"><span class="text-red">*</span>状态:</div>
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
                limit: 10,
                page: 1,
                pageSize: 1,
                total: 1,
                items: []
            },
            teamOptions: [],
            loading: false,
            modalLoading: false,
            selectVal: ['ID', '分组名称', '状态', '操作'],
            showList: ['ID', '分组名称', '状态', '操作'],
            options: [10, 25, 50],   //条数数目
            searchShow: false,   //搜索开关
            selectAll: false,    //多选框开关
            selectedGroup: [], // 多选框选中值
            limit: 10,
            page: 1,
            parentsGroup: [],
            //编辑
            detailVal:{
                name: '',
                pid: '',
                rules: '',
                status: 1
            }, // 编辑详情弹出框值
            nameError: false,
            groupError: false,
            ruleList: [],
            defaultProps: {
                children: 'nodes',
                label: 'title'
            },
            type: '',
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
                    name: '用户组管理',
                    desc: '主要用于账号分组的查看及管理',
                    router: {
                        name: 'account_group'
                    }
                }
            },
            //搜索
            searchOptions: [
                {
                    type: 'text',
                    name: 'pid',
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
                this.$http.post(api.account.group, {
                    pid:  this.searchOptions[0].value,
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
            //删除
            delItem(id) {
                if (id.length > 0) {
                    this.$confirm(id.length > 1 ? '此操作将批量删除选中用户组, 是否继续?' : '此操作将删除该用户组, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$http.get(api.account.userdeldte, {
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
                    name: '',
                    pid: '',
                    rules: '',
                    status: 1
                }
                this.editModal = true
            },
            getData (id) {
                this.$http.get(api.account.groupDetail, {
                  params: {
                      id: id
                  }
              }).then(res => {
                  if (res.data.code === 1) {
                      this.detailVal = res.data.data
                      this.$refs.ruleTree.setCheckedKeys(this.detailVal.rules.split(','))
                  }
              })
            },
            // 打开详情
            openDetail (item) {
                this.detailModal = true
                this.getData(item.id)
            },
            //编辑
            editItem (item) {
                this.type = 'edit'
                this.editModal = true
                this.getData(item.id)
            },
            //编辑确定按钮
            dailogSubmit () {
                this.validateName(this.detailVal.name)
                this.validateGroup(this.detailVal.pid)
                this.detailVal.rules = this.$refs.ruleTree.getCheckedKeys().join(',')
                if (this.nameError) return
                if (this.type === 'edit') {
                    this.$http.post(api.account.useredit, this.detailVal).then(res => {
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
                    this.$http.post(api.account.useradd, this.detailVal).then(res => {
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
            validateName (val) {
                this.nameError = val ? false : true
            },
            validateGroup (val) {
                this.groupError = val ? false : true
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
            groupChange () {
                this.groupError = false
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
                if (val.length === this.data.length) {    //全选全不选
                    this.selectAll = true
                } else {
                    this.selectAll = false
                }
            },
            //全选全不选
            selectAll (val) {
                if (val) {
                    this.selectedGroup = []
                    this.data.map(val => {
                        this.selectedGroup.push(val.id)
                    })
                } else {
                    if (this.selectedGroup.length !== this.data.length - 1) {
                        this.selectedGroup = []
                    }
                }
            },
            page (val) {
                this.$router.replace({name: 'jurisdiction_group', query: {page: val}})
                this.getList()
            },
            limit (val) {
                this.getList()
            },
            editModal (val) {
                if (val) {
                    this.nameError = false
                    this.$http.get(api.account.childGroup).then(res => {
                        if (res.data.code === 1) {
                            this.parentsGroup = res.data.data.items
                        } else {
                            this.parentsGroup = []
                            this.$message({
                                type: 'error',
                                message: res.data.msg
                            })
                        }
                    })
                    this.$http.get(api.account.getRule).then(res => {
                        if (res.data.code === 1) {
                            this.ruleList = res.data.data.items
                        } else {
                            this.ruleList = []
                            this.$message({
                                type: 'error',
                                message: res.data.msg
                            })
                        }
                    })
                }
            }
        }
    }
</script>
<style>

</style>

