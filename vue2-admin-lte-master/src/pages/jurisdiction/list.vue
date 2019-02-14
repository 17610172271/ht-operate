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
                            <li class="col-xs-24 p-n select-box">
                                <el-checkbox v-model="selectAll">全选</el-checkbox>
                            </li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('ID')!=-1">ID</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('名称')!=-1">名称</li>
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('规则')!=-1">规则</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1">操作</li>
                        </ul>
                        <ul class="table-tbody clear" v-for="(item, index) in data.items" @click="selectItem(item.id)">
                            <li class="col-xs-24 p-n select-box">
                                <el-checkbox :label="item.id" v-model="selectedGroup"></el-checkbox>
                            </li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('ID')!=-1" :title="item.id">{{item.id}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('名称')!=-1" :title="item.title">{{item.title}}</li>
                            <li class="col-xs-24 p-n over-omit" v-show="selectVal.indexOf('规则')!=-1" :title="item.name">{{item.name}}</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1">
                                <a href="javascript:;" class="link" @click.stop="openDetail(item)">查看</a>
                                <a href="javascript:;" class="link" @click.stop="editItem(item)">编辑</a>
                                <a href="javascript:;" class="link" @click.stop="delItem([item.id])">删除</a>
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
                        title="详情"
                        :visible.sync="detailModal"
                        custom-class="dialog-modal1">
                        <div v-loading="modalLoading">
                            <div class="clear">
                                <div class="col-xs-2 min-width-105 line-height-40 text-right text-bold">标题</div>
                                <div class="col-xs-8 line-height-40 text-bold">内容</div>
                            </div>
                            <div class="clear bg-f9">
                                <div class="col-xs-2 min-width-105 line-height-40 text-right">ID:</div>
                                <div class="col-xs-8 line-height-40">{{detailVal.id}}</div>
                            </div>
                            <div class="clear">
                                <div class="col-xs-2 min-width-105 line-height-40 text-right">父级:</div>
                                <div class="col-xs-8 line-height-40">{{detailVal.pid}}</div>
                            </div>
                            <div class="clear bg-f9">
                                <div class="col-xs-2 min-width-105 line-height-40 text-right">名称:</div>
                                <div class="col-xs-8 line-height-40">{{detailVal.title}}</div>
                            </div>
                            <div class="clear">
                                <div class="col-xs-2 min-width-105 line-height-40 text-right">规则:</div>
                                <div class="col-xs-8 line-height-40">{{detailVal.name}}</div>
                            </div>
                            <div class="clear bg-f9">
                                <div class="col-xs-2 min-width-105 line-height-40 text-right">是否为菜单:</div>
                                <div class="col-xs-8 line-height-40">{{detailVal.ismenu==1?'是':'否'}}</div>
                            </div>
                            <div class="clear">
                                <div class="col-xs-2 min-width-105 line-height-40 text-right">状态:</div>
                                <div class="col-xs-8 line-height-40">{{detailVal.status_name}}</div>
                            </div>
                        </div>
                    </el-dialog>
                    <el-dialog
                        :title="type=='edit'?'编辑':'添加'"
                        :visible.sync="editModal"
                        custom-class="dialog-modal1"
                        :close-on-click-modal="false">
                        <div v-loading="modalLoading">
                            <!--<div class="clear m-b-sm" v-if="type=='edit'">-->
                                <!--<div class="col-xs-12 col-md-2 p-v-sm p-r-n text-right min-width-105">ID:</div>-->
                                <!--<div class="col-xs-12 col-md-8">-->
                                    <!--<el-input v-model="detailVal.id" disabled class="max-width-200"></el-input>-->
                                <!--</div>-->
                            <!--</div>-->
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 p-v-sm p-r-n text-right min-width-105">父级:</div>
                                <div class="col-xs-12 col-sm-8 team-select">
                                    <el-select v-model="detailVal.pid" placeholder="请选择" popper-class="select-team">
                                        <el-option
                                            v-for="(item, index) in teamOptions"
                                            :key="index"
                                            :label="item.title"
                                            :value="item.id">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 p-v-sm p-r-n text-right min-width-105"><span class="text-red">*</span>名称:</div>
                                <div class="col-xs-12 col-md-8">
                                    <el-input placeholder="请输入名称" :class="{'border-red': nameError}" v-model="detailVal.title" @blur="validateName(detailVal.title)"></el-input>
                                    <p v-if="nameError" class="text-red"><span class="fa fa-close m-r-xs"></span>名称不能为空</p>
                                </div>
                            </div>

                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 p-v-sm p-r-n text-right min-width-105"><span class="text-red">*</span>规则:</div>
                                <div class="col-xs-12 col-md-8">
                                    <el-input placeholder="请输入规则" :class="{'border-red': regularError}" v-model="detailVal.name" @blur="validateRegular(detailVal.name)"></el-input>
                                    <p v-if="regularError" class="text-red"><span class="fa fa-close m-r-xs"></span>规则不能为空</p>
                                </div>
                            </div>
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 p-v-sm p-r-n text-right min-width-105"><span class="text-red">*</span>是否为菜单:</div>
                                <div class="col-xs-12 col-md-8 line-height-40">
                                    <el-radio :label="1" v-model="detailVal.ismenu">是</el-radio>
                                    <el-radio :label="2" v-model="detailVal.ismenu">否</el-radio>
                                </div>
                            </div>
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 p-v-sm p-r-n text-right min-width-105"><span class="text-red">*</span>状态:</div>
                                <div class="col-xs-12 col-md-8 line-height-40">
                                    <el-radio :label="1" v-model="detailVal.status">正常</el-radio>
                                    <el-radio :label="2" v-model="detailVal.status">显示</el-radio>
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
            teamOptions: [],
            loading: false,
            modalLoading: false,
            selectVal: ['ID', '名称', '规则', '操作'],
            showList: ['ID', '名称', '规则', '操作'],
            options: [10, 25, 50],   //条数数目
            searchShow: false,   //搜索开关
            selectAll: false,    //多选框开关
            selectedGroup: [], // 多选框选中值
            limit: 10,
            page: 1,
            //编辑
            detailVal:{
                id: '',
                pid: '',
                name: '',
                title: '',
                icon: '',
                weigh: '',
                condition: '',
                remark: '',
                ismenu:1,
                status:1
            }, // 编辑详情弹出框值
            ismenuError: false,
            regularError: false,
            nameError: false,
            titleError: false,
            statusError: false,
            groupError:false,
            id: '',
            type: '',
            header: {ContentType: 'application/x-www-form-urlencoded'},
            detailModal: false, // 详情框
            editModal: false, //编辑框
            //头部文字
            subNavList: {
                parentNode: {
                    name: '权限管理',
                    router: {
                        name: 'jurisdiction_list'
                    }
                },
                childNode: {
                    name: '规则列表',
                    router: {
                        name: 'jurisdiction_list'
                    }
                }
            },
            //搜索
            searchOptions: [
                {
                    type: 'text',
                    name: '名称',
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
                this.$http.post(api.authrule.list, {
                    title: this.searchOptions[0].value,
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
                this.$http.get(api.authrule.rule).then(res => {
                    if (res.data.code === 1) {
                        if (res.data.data.items.length > 0) {
                            this.teamOptions = res.data.data.items
                        } else {
                            this.detailVal.pid = '无'
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
                    this.$confirm(id.length > 1 ? '此操作将批量删除选中规则, 是否继续?' : '此操作将删除该规则, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$http.get(api.authrule.del, {
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
                    id: '',
                    pid: '',
                    name: '',
                    title: '',
                    icon: '',
                    weigh: '',
                    condition: '',
                    remark: '',
                    ismenu:1,
                    status:1
                }
                this.editModal = true
            },
            // 打开详情
            openDetail (item) {
                this.detailModal = true
                this.getDetail(item)
            },
            // 获取详情
            getDetail (item) {
                this.modalLoading = true
                this.$http.get(api.authrule.detail, {
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
//                        this.$set(this.detailVal, 'cityLink', this.detailVal.region_id + '/' + this.detailVal.province_id + '/' + this.detailVal.city_id)
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
            //编辑
            editItem (item) {
                this.type = 'edit'
                this.editModal = true
                this.getDetail(item)
            },
            //编辑确定按钮
            dailogSubmit () {
                this.validateName(this.detailVal.title)
                this.validateRegular(this.detailVal.name)
                this.validateStatus(this.detailVal.status)
                if (this.groupError || this.ismenuError || this.nameError ||  this.pidError || this.titleError || this.statusError) return
                this.detailVal.pid = this.detailVal.pid === '无' ? 0 : this.detailVal.pid
                if (this.type === 'edit') {
                    this.$http.post(api.authrule.edit, this.detailVal).then(res => {
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
                    this.$http.post(api.authrule.add, this.detailVal).then(res => {
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

            validateIsmenu (val) {
                this.ismenuError = val ? false : true
            },

            validateRegular (val) {
                this.regularError = val ? false : true
            },
            validateName (val) {
                this.nameError = val ? false : true
            },
            validateStatus (val) {
                this.statusError = val ? false : true
            },
            vUsername: validate.username,
            vEmail: validate.email,
            vMobile: validate.mobile,
            vPassword: validate.password,
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
                this.$router.replace({name: 'jurisdiction_list', query: {page: val}})
                this.getList()
            },
            limit (val) {
                this.getList()
            },
//            'detailVal.agent_id' (val) {
//                this.agentError = val ? false : true
//            },
//            'detailVal.cityLink' (val) {
//                this.addressError = val && this.detailVal.address ? false : true
//            },
//            'detailVal.address' (val) {
//                this.addressError = val && this.detailVal.cityLink ? false : true
//            },
            editModal (val) {
                if (val) {
                    this.groupError = false
                    this.regularError =  false
                    this.nameError =  false
                    this.titleError =  false
                    this.getGroupList()
                } else {
                    document.getElementsByClassName('el-dialog__body')[0].scrollTo(0, 0)
                }
            }
        }
    }
</script>
<style>

</style>

