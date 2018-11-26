<template>
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
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('影厅名称')!=-1">影厅名称</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('影厅号')!=-1">影厅号</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('创建时间')!=-1">创建时间</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('影院名称')!=-1">影院名称</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('代理商')!=-1">代理商</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('价格')!=-1">价格</li>
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('设备状态')!=-1">设备状态</li>
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('影厅状态')!=-1">影厅状态</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1" style="min-width: 120px;">操作</li>
                        </ul>
                        <ul class="table-tbody clear" v-for="(item, index) in data.items" @click="selectItem(item.id)">
                            <li class="col-xs-24 p-n select-box">
                                <el-checkbox :label="item.id" v-model="selectedGroup"></el-checkbox>
                            </li>
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('ID')!=-1" :title="item.id">{{item.id}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('影厅名称')!=-1" :title="item.name">{{item.name}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('影厅号')!=-1" :title="item.code">{{item.code}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('创建时间')!=-1" :title="item.createtime">{{item.createtime}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('影院名称')!=-1" :title="item.cinema_name">{{item.cinema_name}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('代理商')!=-1" :title="item.agent_name">{{item.agent_name}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('价格')!=-1" :title="item.price">{{item.price || 0}}</li>
                            <li class="col-xs-24 p-n over-omit" v-show="selectVal.indexOf('设备状态')!=-1" :title="item.device_status">{{item.device_status}}</li>
                            <li class="col-xs-24 p-n over-omit" v-show="selectVal.indexOf('影厅状态')!=-1" :title="item.status_name" :class="item.status==2?'text-red':'text-green'">{{item.status_name}}</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1" style="min-width: 120px;">
                                <a href="javascript:;" title="详情" class="candle-btn btn" @click.stop="openDetail(item)"><i
                                    class="fa fa-search-plus"></i></a>
                                <a href="javascript:;" title="编辑" class="candle-btn btn" @click.stop="editItem(item)"><i
                                    class="fa fa-edit"></i></a>
                                <a href="javascript:;" title="设置价格" class="candle-btn btn" @click.stop="openAccount(item)"><i
                                    class="fa fa-rmb"></i></a>
                                <a href="javascript:;" title="绑定设备" class="candle-btn btn" @click.stop="bindItem(item)"><i
                                    class="fa fa-link"></i></a>
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
                        title="设置影厅价格"
                        :visible.sync="accountModal"
                        custom-class="dialog-modal1"
                        :close-on-click-modal="false">
                        <div class="text-center m-t-lg clear">
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 p-v-sm p-r-n text-right min-width-105">价格:</div>
                                <div class="col-xs-11 col-md-6">
                                    <el-input placeholder="请输入价格" v-model="accountNum"></el-input>
                                </div>
                                <div class="col-xs-1 col-md-1 p-n text-left line-height-40">
                                    元
                                </div>
                            </div>
                            <div class="col-xs-12 col-md-9 m-t-lg">
                                <el-button type="primary" @click="setAccount">确 定</el-button>
                                <el-button @click="accountModal = false">取 消</el-button>
                            </div>
                        </div>
                    </el-dialog>
                    <el-dialog
                        title="查看设备状态"
                        :visible.sync="detailModal"
                        custom-class="dialog-modal1">
                        <div v-loading="modalLoading">
                            <div class="clear m-t-sm">
                                <div class="line-height-40 pull-left text-bold">院线: {{hallStatus.region_agent_name}}</div>
                                <div class="line-height-40 pull-left text-bold m-l-lg">影厅: {{hallStatus.hall_name}}</div>
                            </div>
                            <div class="clear m-t-sm">
                                <div class="col-xs-3 line-height-40 text-right text-bold">设备名称:</div>
                                <div class="col-xs-8 line-height-40 text-center text-bold">状态</div>
                            </div>
                            <div class="clear m-t-sm" v-for="item in hallStatus.device_list">
                                <div class="col-xs-3 line-height-40 text-right">{{item.device_name}}:</div>
                                <div class="col-xs-8 line-height-40 text-center" :class="{'text-green': item.status==1, 'text-red': item.status==2, 'text-orange': item.status==3}">{{item.status_name}}</div>
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
                                <div class="col-xs-12 col-md-2 p-v-sm p-r-n text-right min-width-105"><span class="text-red">*</span>代理商:</div>
                                <div class="col-xs-12 col-md-8">
                                    <el-select v-model="detailVal.agent_id" :class="{'border-red': agentError}" filterable clearable placeholder="请选择代理商">
                                        <el-option
                                        v-for="item in agentOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <p v-if="agentError" class="text-red"><span class="fa fa-close m-r-xs"></span>代理商不能为空</p>
                                </div>
                            </div>
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 p-v-sm p-r-n text-right min-width-105"><span class="text-red">*</span>影院:</div>
                                <div class="col-xs-12 col-md-8">
                                    <el-select v-model="detailVal.cinema_id" :class="{'border-red': cinemaError}" placeholder="请选择" @visible-change="selectOpen">
                                        <el-option
                                            v-for="item in cinemaList"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                        </el-option>
                                    </el-select>
                                    <p v-if="cinemaError" class="text-red"><span class="fa fa-close m-r-xs"></span>影院不能为空</p>
                                </div>
                            </div>
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 p-v-sm p-r-n text-right min-width-105"><span class="text-red">*</span>影厅:</div>
                                <div class="col-xs-12 col-md-8">
                                    <el-input placeholder="请输入影厅名称" :class="{'border-red': nameError}" v-model="detailVal.name" @blur="validateName(detailVal.name)"></el-input>
                                    <p v-if="nameError" class="text-red"><span class="fa fa-close m-r-xs"></span>影厅不能为空</p>
                                </div>
                            </div>
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 p-v-sm p-r-n text-right min-width-105"><span class="text-red">*</span>影厅号码:</div>
                                <div class="col-xs-12 col-md-8">
                                    <el-input placeholder="请输入影厅号码" :class="{'border-red': codeError}" v-model="detailVal.code" @blur="validateCode(detailVal.code)"></el-input>
                                    <p v-if="codeError" class="text-red"><span class="fa fa-close m-r-xs"></span>影厅号码为最长4位数字</p>
                                </div>
                            </div>
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 p-v-sm p-r-n text-right min-width-105">影厅介绍:</div>
                                <div class="col-xs-12 col-md-8">
                                    <el-input placeholder="请输入影厅介绍" type="textarea" rows="4" v-model="detailVal.introduce"></el-input>
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
                    <el-dialog
                        title="绑定设备"
                        :visible.sync="bindModal"
                        custom-class="dialog-modal1"
                        :close-on-click-modal="false">
                        <div v-loading="modalLoading">
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-4 p-v-sm p-r-n text-right"><span class="text-red">*</span>NAS:</div>
                                <div class="col-xs-12 col-md-8">
                                    <el-select v-model="bindList.nas_id" placeholder="请选择">
                                        <el-option
                                            v-for="item in bindList.Nas"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-4 p-v-sm p-r-n text-right"><span class="text-red">*</span>播放器:</div>
                                <div class="col-xs-12 col-md-8">
                                    <el-select v-model="bindList.play_id" placeholder="请选择">
                                        <el-option
                                            v-for="item in bindList.play"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-4 p-v-sm p-r-n text-right"><span class="text-red">*</span>网关:</div>
                                <div class="col-xs-12 col-md-8">
                                    <el-select v-model="bindList.gateway_id" placeholder="请选择">
                                        <el-option
                                            v-for="item in bindList.gateway"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div class="text-center m-t-lg clear">
                                <div class="col-xs-12 col-md-12">
                                    <el-button type="primary" @click="bindSubmit">确 定</el-button>
                                    <el-button @click="bindModal = false">取 消</el-button>
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
            selectVal: ['ID', '影厅名称', '影厅号', '创建时间', '影院名称', '代理商', '价格', '设备状态','影厅状态','操作'],
            showList: ['ID', '影厅名称', '影厅号', '创建时间', '影院名称', '代理商', '价格', '设备状态','影厅状态', '操作'],
            options: [10, 25, 50],   //条数数目
            searchShow: false,   //搜索开关
            selectAll: false,    //多选框开关
            selectedGroup: [], // 多选框选中值
            limit: 10,
            page: 1,
            //编辑
            agentOptions: [],
            detailVal:{
                name: '',
                agent_id: '',
                cinema_id: '',
                code: '',
                introduce: ''
            }, // 编辑详情弹出框值
            hallStatus: '',
            nameError: false,
            codeError: false,
            agentError: false,
            regionAgentError: false,
            cinemaError: false,
            bindList: {
                Nas: [],
                gateway: [],
                play: [],
                nas_id: '',
                gateway_id: '',
                play_id: ''
            },
            agentList: [],
            regionAgentList: [],
            cinemaList: [],
            id: '',
            type: '',
            accountNum: '',
            accountItem: '',
            accountModal: false,
            bindModal: false,
            detailModal: false, // 详情框
            editModal: false, //编辑框
            openSelect: false,
            subNavList: {
                parentNode: {
                    name: '影厅管理',
                    router: {
                        name: 'movieHall_list'
                    }
                },
                childNode: {
                    name: '影厅列表',
                    desc: '主要用影厅的查看及管理',
                    router: {
                        name: 'movieHall_list'
                    }
                }
            },
            //搜索
            searchOptions: [
                {
                    type: 'text',
                    name: '影厅名称',
                    value: ''
                },
                {
                    type: 'text',
                    name: '代理商',
                    value: ''
                },
                {
                    type: 'text',
                    name: '影院',
                    value: ''
                },
                {
                    type: 'select',
                    name: '状态',
                    value: '',
                    options:[
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
            }
        },
        methods:{
            //列表页获取
            getList () {
                this.loading = true
                this.$http.post(api.moviehall.list, {
                    name: this.searchOptions[0].value,
                    agent_name: this.searchOptions[1].value,
                    cinema_name: this.searchOptions[2].value,
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
            // 角色分组列表
            getGroupList () {
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
            openAccount (item) {
                this.accountNum = item.price || 0
                this.accountItem = item
                this.accountModal = true
            },
            setAccount () {
                if (this.accountNum) {
                    if (!/^[0-9]{1,3}(\.[0-9]{0,2})?$/.test(this.accountNum)) {
                        this.$message({
                            type: 'warning',
                            message: '请输入0-999.99的正整数'
                        })
                        return
                    }
                    this.$http.post(api.moviehall.setAccount, {
                        price: this.accountNum,
                        hall_id: this.accountItem.id
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
                        message: '请输入影厅价格'
                    })
                }
            },
            //删除
            delItem(id) {
                if (id.length > 0) {
                    this.$confirm(id.length > 1 ? '此操作将批量删除选中影厅, 是否继续?' : '此操作将删除该影厅, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$http.get(api.moviehall.del, {
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
                    agent_id: '',
                    cinema_id: '',
                    code: '',
                    introduce: ''
                }
                this.editModal = true
            },
            // 获取详情
            getDetail (item) {
                this.modalLoading = true
                this.$http.get(api.moviehall.detail, {
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
                this.$http.get(api.moviehall.status, {
                    params: {
                        id: item.id
                    }
                }).then(res => {
                    if (res.data.code === 1) {
                        this.hallStatus = res.data.data
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        })
                    }
                })
            },
            bindItem (item) {
                this.id = item.id
                this.bindModal = true

            },
            bindSubmit () {
                if (!this.bindList.play_id) {
                    this.$message({
                        type: 'warning',
                        message: '请选择播放器'
                    })
                    return
                }
                if (!this.bindList.nas_id) {
                    this.$message({
                        type: 'warning',
                        message: '请选择NAS服务器'
                    })
                    return
                }
                if (!this.bindList.gateway_id) {
                    this.$message({
                        type: 'warning',
                        message: '请选择网关'
                    })
                    return
                }
                this.$http.post(api.moviehall.device, this.bindList).then(res => {
                    if (res.data.code === 1) {
                        this.$message({
                            type: 'success',
                            message: '绑定成功'
                        })
                        this.bindModal = false
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        })
                    }
                    this.getList()
                })
            },
            //编辑
            editItem (item) {
                this.type = 'edit'
                this.id = item.id
                this.editModal = true
                this.getDetail(item)
            },
            selectOpen (val) {
                this.openSelect = val
            },
            //编辑确定按钮
            dailogSubmit () {
                this.validateAgent()
                this.validateCinema()
                this.validateCode(this.detailVal.code)
                this.validateName(this.detailVal.name)
                if (this.nameError || this.codeError || this.agentError || this.regionAgentError || this.cinemaError) {
                    this.$message({
                        type: 'warning',
                        message: '您填写的信息格式错误'
                    })
                    return
                }
                if (this.type === 'edit') {
                    this.$http.post(api.moviehall.edit, this.detailVal).then(res => {
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
                    this.$http.post(api.moviehall.add, this.detailVal).then(res => {
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
            validateAgent () {
                this.agentError = this.detailVal.agent_id ? false : true
            },
            validateCinema () {
                this.cinemaError = this.detailVal.cinema_id ? false : true
            },
            validateName (val) {
                this.nameError = val ? false : true
            },
            validateCode (val) {
                this.codeError = /^[0-9]{1,4}$/.test(val) ? false : true
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
                this.$router.replace({name: 'movieHall_list', query: {page: val}})
                this.getList()
            },
            limit (val) {
                this.getList()
            },
            'detailVal.agent_id' (val) {
                this.detailVal.cinema_id = ''
                this.agentError = val ? false : true
                this.$http.post(api.cinema.getAllList, {
                    agent_id: val
                }).then(res => {
                    if (res.data.code === 1) {
                        this.cinemaList = res.data.data
                    } else {
                        this.cinemaList = []
                        this.$message({
                            type: 'warning',
                            message: res.data.msg
                        })
                    }
                })
            },
            'detailVal.cinema_id' (val) {
                this.cinemaError = val ? false : true
            },
            editModal (val) {
                if (val) {
                    this.nameError = false
                    this.codeError = false
                    this.agentError = false
                    this.cinemaError = false
                    this.getGroupList()
                } else {
                    document.getElementsByClassName('el-dialog__body')[0].scrollTo(0, 0)
                }
            },
            bindModal (val) {
                if (val) {
                    this.$http.get(api.moviehall.bindList, {
                        params: {
                            hall_id: this.id
                        }
                    }).then(res => {
                        if (res.data.code === 1) {
                            this.bindList = res.data.data
                        } else {
                            this.bindList = {
                                Nas: [],
                                gateway: [],
                                play: [],
                                nas_id: '',
                                gateway_id: '',
                                play_id: ''
                            }
                            this.$message({
                                type: 'warning',
                                message: res.data.msg
                            })
                        }
                    })
                }
            }
        }
    }
</script>
<style scoped>
</style>
