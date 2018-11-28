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
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('ID')!=-1">ID</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('网关编号')!=-1">网关编号</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('网关名称')!=-1">网关名称</li>
                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('MAC地址')!=-1">MAC地址</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('创建时间')!=-1">创建时间</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('影厅名称')!=-1">影厅名称</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('影院')!=-1">影院</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('区域代理')!=-1">区域代理</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('代理商')!=-1">代理商</li>
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('状态')!=-1">状态</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1">操作</li>
                        </ul>
                        <ul class="table-tbody clear" v-for="(item, index) in data.items" @click="selectItem(item.id)">
                            <li class="col-xs-24 p-n select-box">
                                <el-checkbox :label="item.id" v-model="selectedGroup"></el-checkbox>
                            </li>
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('ID')!=-1" :title="item.id">{{item.id}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('网关编号')!=-1" :title="item.code">{{item.code}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('网关名称')!=-1" :title="item.name">{{item.name}}</li>
                            <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('MAC地址')!=-1" :title="item.mac_address">{{item.mac_address}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('创建时间')!=-1" :title="item.createtime">{{item.createtime}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('影厅名称')!=-1" :title="item.hall_name">{{item.hall_name}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('影院')!=-1" :title="item.cinema_name">{{item.cinema_name}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('区域代理')!=-1" :title="item.region_agent_name">{{item.region_agent_name}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('代理商')!=-1" :title="item.agent_name">{{item.agent_name}}</li>
                            <li class="col-xs-24 p-n over-omit" v-show="selectVal.indexOf('状态')!=-1" :title="item.status_name" :class="item.status==2?'text-red':'text-green'">{{item.status_name}}</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1">
                                <a href="javascript:;" title="编辑" class="candle-btn btn" @click.stop="editItem(item)"><i
                                    class="fa fa-edit"></i></a>
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
                        :title="type=='edit'?'编辑':'添加'"
                        :visible.sync="editModal"
                        custom-class="dialog-modal1"
                        :close-on-click-modal="false">
                        <div v-loading="modalLoading">
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 p-v-sm p-r-n text-right min-width-105"><span class="text-red">*</span>网关编号:</div>
                                <div class="col-xs-12 col-md-8">
                                    <el-input placeholder="请输入网关编号" :class="{'border-red': codeError}" v-model="detailVal.code" @blur="validateCode(detailVal.code)"></el-input>
                                    <p v-if="codeError" class="text-red"><span class="fa fa-close m-r-xs"></span>网关编号不能为空</p>
                                </div>
                            </div>
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 p-v-sm p-r-n text-right min-width-105"><span class="text-red">*</span>网关名称:</div>
                                <div class="col-xs-12 col-md-8">
                                    <el-input placeholder="请输入网关名称" :class="{'border-red': gatewayError}" v-model="detailVal.name" @blur="validateName(detailVal.name)"></el-input>
                                    <p v-if="gatewayError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入网关名称</p>
                                </div>
                            </div>
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 p-v-sm p-r-n text-right min-width-105"><span class="text-red">*</span>MAC地址:</div>
                                <div class="col-xs-12 col-md-8">
                                    <el-input placeholder="请输入mac地址" :class="{'border-red': macError}" v-model="detailVal.mac_address" @blur="validateMac(detailVal.mac_address)"></el-input>
                                    <p v-if="macError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入有效的mac地址</p>
                                </div>
                            </div>
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 p-v-sm p-r-n text-right min-width-105"><span class="text-red">*</span>IP地址:</div>
                                <div class="col-xs-12 col-md-8">
                                    <el-input placeholder="请输入IP地址" :class="{'border-red': ipError}" v-model="detailVal.ip" @blur="validateIP(detailVal.ip)"></el-input>
                                    <p v-if="ipError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入有效的IP地址</p>
                                </div>
                            </div>
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 p-v-sm p-r-n text-right min-width-105">代理商:</div>
                                <div class="col-xs-12 col-md-8">
                                    <el-select v-model="detailVal.agent_id" placeholder="请选择" @visible-change="selectOpen">
                                        <el-option
                                            v-for="item in agentList"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 p-v-sm p-r-n text-right min-width-105">区域代理:</div>
                                <div class="col-xs-12 col-md-8">
                                    <el-select v-model="detailVal.region_agent_id" placeholder="请选择" @visible-change="selectOpen">
                                        <el-option
                                            v-for="item in regionAgentList"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 p-v-sm p-r-n text-right min-width-105">影院:</div>
                                <div class="col-xs-12 col-md-8">
                                    <el-select v-model="detailVal.cinema_id" placeholder="请选择" @visible-change="selectOpen">
                                        <el-option
                                            v-for="item in cinemaList"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 p-v-sm p-r-n text-right min-width-105">影厅:</div>
                                <div class="col-xs-12 col-md-8">
                                    <el-select v-model="detailVal.hall_id" placeholder="请选择" @visible-change="selectOpen">
                                        <el-option
                                            v-for="item in movieHallList"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                        </el-option>
                                    </el-select>
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
            selectVal: ['ID', '网关编号', '网关名称', 'MAC地址', '创建时间', '影厅名称', '影院', '区域代理', '代理商', '状态', '操作'],
            showList: ['ID', '网关编号', '网关名称', 'MAC地址', '创建时间', '影厅名称', '影院', '区域代理', '代理商', '状态', '操作'],
            options: [10, 25, 50],   //条数数目
            searchShow: false,   //搜索开关
            selectAll: false,    //多选框开关
            selectedGroup: [], // 多选框选中值
            limit: 10,
            page: 1,
            //编辑
            detailVal:{
                name: '',
                code: '',
                ip: '',
                agent_id: '',
                region_agent_id: '',
                cinema_id: '',
                hall_id: '',
                mac_address: ''
            }, // 编辑详情弹出框值
            ipError: false,
            codeError: false,
            macError: false,
            gatewayError: false,
            id: '',
            type: '',
            detailModal: false, // 详情框
            editModal: false, //编辑框
            openSelect: false,
            agentList: [],
            regionAgentList: [],
            cinemaList: [],
            movieHallList: [],
            //头部文字
            subNavList: {
                parentNode: {
                    name: '控制设备管理',
                    router: {
                        name: 'control_gateway'
                    }
                },
                childNode: {
                    name: '物联网网关列表',
                    desc: '主要用于物联网网关的查看及操作',
                    router: {
                        name: 'control_gateway'
                    }
                }
            },
            //搜索
            searchOptions: [
                {
                    type: 'searchSelect',
                    name: '代理商',
                    value: '',
                    options: []
                },
                {
                    type: 'searchSelect',
                    name: '区域代理',
                    value: '',
                    options: []
                },
                {
                    type: 'searchSelect',
                    name: '影院',
                    value: '',
                    options: []
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
                this.$http.post(api.nas.gatewayList, {
                    agent_id: this.searchOptions[0].value,
                    region_agent_id: this.searchOptions[1].value,
                    cinema_id: this.searchOptions[2].value,
                    status: this.searchOptions[3].value,
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
            // 获取代理商列表
            getGroupList () {
                this.$http.post(api.agent.getAllList).then(res => {
                    if (res.data.code === 1) {
                        this.agentList = res.data.data
                        this.searchOptions[0].options = res.data.data.map(val => {
                            return {
                                label: val.name,
                                value: val.id
                            }
                        })
                    } else {
                        this.agentList = []
                        this.searchOptions[0].options = []
                    }
                })
            },
            getRegionAgent () {
                this.$http.post(api.circuit.getAllList).then(res => {
                    if (res.data.code === 1) {
                        this.searchOptions[1].options = res.data.data.map(val => {
                            return {
                                label: val.name,
                                value: val.id
                            }
                        })
                    } else {
                        this.searchOptions[1].options = []
                    }
                })
            },
            getCinema () {
                this.$http.post(api.cinema.getAllList).then(res => {
                    if (res.data.code === 1) {
                        this.searchOptions[2].options = res.data.data.map(val => {
                            return {
                                label: val.name,
                                value: val.id
                            }
                        })
                    } else {
                        this.searchOptions[2].options = []
                    }
                })
            },
            //删除
            delItem(id) {
                if (id.length > 0) {
                    this.$confirm(id.length > 1 ? '此操作将批量删除选中网关, 是否继续?' : '此操作将删除该网关, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$http.get(api.nas.gatewayDel, {
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
                    code: '',
                    agent_id: '',
                    region_agent_id: '',
                    cinema_id: '',
                    hall_id: '',
                    ip: '',
                    mac_address: ''
                }
                this.editModal = true
                this.getGroupList()
            },
            // 获取详情
            getDetail (item) {
                this.modalLoading = true
                this.$http.get(api.nas.gatewayDetail, {
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
                        this.detailVal.pid = this.detailVal.pid + ''
                        this.detailVal.agent_id = this.detailVal.agent_id.split(',')
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
            selectOpen (val) {
                this.openSelect = val
            },
            statusChange (item) {
                this.$confirm(item.status === 2 ? '此操作将启用该网关, 是否继续?' : '此操作将禁用该网关, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.get(api.nas.gatewayDisable, {
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
            //编辑确定按钮
            dailogSubmit () {
                this.validateCode(this.detailVal.code)
                this.validateName(this.detailVal.name)
                this.validateIP(this.detailVal.ip)
                this.validateMac(this.detailVal.mac_address)
                if (this.codeError || this.gatewayError || this.macError || this.ipError) {
                    this.$message({
                        type: 'warning',
                        message: '您填写的信息格式错误'
                    })
                    return
                }
                if (this.type === 'edit') {
                    this.$http.post(api.nas.gatewayEdit, this.detailVal).then(res => {
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
                    this.$http.post(api.nas.gatewayAdd, this.detailVal).then(res => {
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
            validateCode (val) {
                this.codeError = val ? false : true
            },
            validateName (val) {
                this.gatewayError = val ? false : true
            },
            validateIP (val) {
              this.ipError = this.vIP(val)
            },
            validateMac (val) {
                this.macError = this.vMac(val)
            },
            vUsername: validate.username,
            vEmail: validate.email,
            vMobile: validate.mobile,
            vPassword: validate.password,
            vIP: validate.ip,
            vMac: validate.mac,
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
                this.$router.replace({name: 'control_gateway', query: {page: val}})
                this.getList()
            },
            limit (val) {
                this.getList()
            },
            'detailVal.agent_id' (val) {
                if (this.openSelect) {
                    this.detailVal.region_agent_id = ''
                    this.detailVal.cinema_id = ''
                    this.detailVal.hall_id = ''
                }
                this.$http.post(api.circuit.getAllList, {
                    agent_id: val
                }).then(res => {
                    if (res.data.code === 1) {
                        this.regionAgentList = res.data.data
                    } else {
                        this.regionAgentList = []
                        this.$message({
                            type: 'warning',
                            message: res.data.msg
                        })
                    }
                })
            },
            'detailVal.region_agent_id' (val) {
                if (this.openSelect) {
                    this.detailVal.cinema_id = ''
                    this.detailVal.hall_id = ''
                }
                this.$http.post(api.cinema.getAllList, {
                    region_agent_id: val
                }).then(res => {
                    if (res.data.code === 1) {
                        this.cinemaList = res.data.data
                    } else {
                        this.regionAgentList = []
                        this.$message({
                            type: 'warning',
                            message: res.data.msg
                        })
                    }
                })
            },
            'detailVal.cinema_id' (val) {
                if (this.openSelect) {
                    this.detailVal.hall_id = ''
                }
                this.$http.post(api.moviehall.getAllList, {
                    cinema_id: val,
                    filter: 2, // 2代表只查未绑定过网关的影厅
                    hall_id: this.detailVal.hall_id || ''
                }).then(res => {
                    if (res.data.code === 1) {
                        this.movieHallList = res.data.data
                    } else {
                        this.regionAgentList = []
                        this.$message({
                            type: 'warning',
                            message: res.data.msg
                        })
                    }
                })
            },

            searchShow (val) {
                if (val) {
                    this.getGroupList()
                    this.getRegionAgent()
                    this.getCinema()
                }
            },
            editModal (val) {
                if (val) {
                    this.ipError = false
                    this.codeError = false
                    this.macError = false
                    this.gatewayError = false
                } else {
                    document.getElementsByClassName('el-dialog__body')[0].scrollTo(0, 0)
                }
            }
        }
    }
</script>
<style>

</style>

