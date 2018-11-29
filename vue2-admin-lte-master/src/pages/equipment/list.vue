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
                        <el-upload
                            class="inline-block"
                            :action="uploadUrl"
                            :show-file-list="false"
                            :headers="header"
                            :on-success="importPlayer">
                            <a href="javascript:;" title="导入" class="app-add btn bg-orange1 text-white"><i class="fa fa-folder-open-o"></i>导入</a>
                        </el-upload>
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
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('厂商')!=-1">厂商</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('型号')!=-1">型号</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('设备编号')!=-1">设备编号</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('别名')!=-1">别名</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('mac地址')!=-1">mac地址</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('创建时间')!=-1">创建时间</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('密钥起止时间')!=-1">密钥起止时间</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('影厅名称')!=-1">影厅名称</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('影院名称')!=-1">影院名称</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('区域代理')!=-1">区域代理</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('代理商')!=-1">代理商</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('设备状态')!=-1">设备状态</li>
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('状态')!=-1">状态</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1">操作</li>
                        </ul>
                        <ul class="table-tbody clear" v-for="(item, index) in data.items" @click="selectItem(item.id)">
                            <li class="col-xs-24 p-n select-box">
                                <el-checkbox :label="item.id" v-model="selectedGroup"></el-checkbox>
                            </li>
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('ID')!=-1" :title="item.id">{{item.id}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('厂商')!=-1" :title="item.manufacturer_name">{{item.manufacturer_name}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('型号')!=-1" :title="item.model_name">{{item.model_name}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('设备编号')!=-1" :title="item.serial_number">{{item.serial_number}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('别名')!=-1" :title="item.alias">{{item.alias}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('mac地址')!=-1" :title="item.mac_address">{{item.mac_address}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('创建时间')!=-1" :title="item.create_time">{{item.create_time}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('密钥起止时间')!=-1" :title="item.key_valid_time">{{item.key_valid_time}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('影厅名称')!=-1" :title="item.hall_name">{{item.hall_name}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('影院名称')!=-1" :title="item.cinema_name">{{item.cinema_name}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('区域代理')!=-1" :title="item.region_agent_name">{{item.region_agent_name}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('代理商')!=-1" :title="item.agent_name">{{item.agent_name}}</li>
                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('设备状态')!=-1" :title="item.device_status_name">{{item.device_status_name}}</li>
                            <li class="col-xs-24 p-n over-omit" v-show="selectVal.indexOf('状态')!=-1" :class="item.status==2 ? 'text-red': 'text-green'" :title="item.status_name">{{item.status_name}}</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1">
                                <!--<a href="javascript:;" title="详情" class="candle-btn btn" @click.stop="openDetail(item)"><i-->
                                    <!--class="fa fa-search-plus"></i></a>-->
                                <a href="javascript:;" title="编辑" class="candle-btn btn" @click.stop="editItem(item)"><i
                                    class="fa fa-edit"></i></a>
                                <!--<a href="javascript:;" :title="item.status=='禁用'?'点击启用':'点击禁用'" class="candle-btn btn" @click.stop="statusChange(item)"><i-->
                                    <!--class="fa" :class="item.status=='禁用'? 'fa-lightbulb-o' : 'fa-ban'"></i></a>-->
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
                        title="详情"
                        :visible.sync="detailModal"
                        custom-class="dialog-modal1">
                        <div v-loading="modalLoading">
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
                                <div class="col-xs-8 line-height-40">{{detailVal.groupname}}</div>
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
                        </div>
                    </el-dialog>
                    <el-dialog
                        :title="type=='edit'?'编辑':'添加'"
                        :visible.sync="editModal"
                        custom-class="dialog-modal1"
                        :close-on-click-modal="false">
                        <div v-loading="modalLoading">
                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 p-v-sm p-r-n text-right min-width-105"><span class="text-red">*</span>设备厂商:</div>
                                <div class="col-xs-12 col-md-8">
                                    <el-select v-model="detailVal.manufacturer_id" :class="{'border-red': manufacturerError}" placeholder="请选择" @change="validateManufacturer(detailVal.manufacturer_id)" @visible-change="selectOpen1">
                                        <el-option
                                            v-for="item in manufacturerList"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                        </el-option>
                                    </el-select>
                                    <p v-if="manufacturerError" class="text-red"><span class="fa fa-close m-r-xs"></span>设备厂商不能为空</p>
                                </div>
                            </div>

                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 p-v-sm p-r-n text-right min-width-105"><span class="text-red">*</span>设备型号:</div>
                                <div class="col-xs-12 col-md-8">
                                    <el-select v-model="detailVal.model_id" :class="{'border-red': modelError}" placeholder="请选择" @change="validateModel(detailVal.model_id)">
                                        <el-option
                                            v-for="item in modelList"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                        </el-option>
                                    </el-select>
                                    <p v-if="modelError" class="text-red"><span class="fa fa-close m-r-xs"></span>设备型号不能为空</p>
                                </div>
                            </div>

                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 p-v-sm p-r-n text-right min-width-105"><span class="text-red">*</span>设备编号:</div>
                                <div class="col-xs-12 col-md-8">
                                    <el-input placeholder="请输入设备编号" :class="{'border-red': serial_numberError}" v-model="detailVal.serial_number" @blur="validateSerial_number(detailVal.serial_number)"></el-input>
                                    <p v-if="serial_numberError" class="text-red"><span class="fa fa-close m-r-xs"></span>设备编号不能为空</p>
                                </div>
                            </div>

                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 p-v-sm p-r-n text-right min-width-105">别名:</div>
                                <div class="col-xs-12 col-md-8">
                                    <el-input placeholder="请输入别名" v-model="detailVal.alias"></el-input>
                                </div>
                            </div>

                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 p-v-sm p-r-n text-right min-width-105"><span class="text-red">*</span>MAC地址:</div>
                                <div class="col-xs-12 col-md-8">
                                    <el-input placeholder="请输入MAC" :class="{'border-red': mac_addressError}" v-model="detailVal.mac_address" @blur="validateMac_address(detailVal.mac_address)"></el-input>
                                    <p v-if="mac_addressError" class="text-red"><span class="fa fa-close m-r-xs"></span>MAC地址格式不正确</p>
                                </div>
                            </div>

                            <div class="clear m-b-sm">
                                <div class="col-xs-12 col-md-2 p-v-sm p-r-n text-right min-width-105"><span class="text-red">*</span>密钥时间:</div>
                                <div class="col-xs-12 col-md-8">
                                    <!--<el-date-picker-->
                                        <!--v-model="detailVal.time"-->
                                        <!--type="daterange"-->
                                        <!--@change="validateTime"-->
                                        <!--:class="{'border-red': timeError}"-->
                                        <!--range-separator="至"-->
                                        <!--value-format="yyyy-MM-dd"-->
                                        <!--start-placeholder="开始日期"-->
                                        <!--end-placeholder="结束日期">-->
                                    <!--</el-date-picker>-->
                                    <el-date-picker
                                        v-model="detailVal.time"
                                        type="daterange"
                                        range-separator="至"
                                        @change="validateTime"
                                        :class="{'border-red': timeError}"
                                        value-format="yyyy-MM-dd"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期">
                                    </el-date-picker>
                                    <p v-if="timeError" class="text-red"><span class="fa fa-close m-r-xs"></span>请选择密钥时间</p>
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
            selectVal: ['ID', '厂商', '型号', '设备编号', '别名', 'mac地址','创建时间', '密钥起止时间', '影厅名称', '影院名称', '区域代理', '代理商', '设备状态', '状态', '操作'],
            showList: ['ID', '厂商', '型号', '设备编号', '别名', 'mac地址','创建时间', '密钥起止时间', '影厅名称', '影院名称', '区域代理', '代理商', '设备状态', '状态', '操作'],
            options: [10, 25, 50],   //条数数目
            searchShow: false,   //搜索开关
            selectAll: false,    //多选框开关
            selectedGroup: [], // 多选框选中值
            limit: 10,
            page: 1,
            openSelect: false,
            openSelect1: false,
            manufacturerList: [],
            modelList: [],
            agentList: [],
            regionAgentList: [],
            cinemaList: [],
            movieHallList: [],
            header: {ContentType: 'application/x-www-form-urlencoded'},
            //编辑
            detailVal:{
                id:'',
                manufacturer_id:'',  //  厂商ID
                model_id:'',     //型号ID
                serial_number:'',     //编号
                alias:'',     //别名
                mac_address:'',     //MAC地址
                time: '',
                key_start_time:'',     //私钥有效时间（前）
                key_end_time:'',     //私钥有效时间（后）
                agent_id:'',     //代理商ID
                region_agent_id:'',     //区域代理商ID
                cinema_id:'',     //影院ID
                hall_id:'',     //影厅ID
            }, // 编辑详情弹出框值
            manufacturerError: false,
            modelError: false,
            serial_numberError: false,
            mac_addressError: false,
            timeError: false,
            id: '',
            type: '',
            detailModal: false, // 详情框
            editModal: false, //编辑框
            //头部文字
            subNavList: {
                parentNode: {
                    name: '设备管理',
                    router: {
                        name: 'equipment_list'
                    }
                },
                childNode: {
                    name: '播放设备列表',
                    desc: '主要用播放设备的查看及管理',
                    router: {
                        name: 'equipment_list'
                    }
                }
            },
            //搜索
            searchOptions: [
                {
                    type: 'searchSelect',
                    name: '厂商',
                    value: '',
                    options: []
                },
                {
                    type: 'text',
                    name: '设备型号',
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
            },
            uploadUrl () {
                return api.device.export
            }
        },
        methods: {
            //列表页获取
            getList () {
                this.loading = true
                this.$http.post(api.device.playlist, {
                    manufacturer_id: this.searchOptions[0].value,
                    model_id: this.searchOptions[1].value,
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
            getGroupList () {
                this.$http.post(api.agent.getAllList).then(res => {
                    if (res.data.code === 1) {
                        this.agentList = res.data.data
                    } else {
                        this.agentList = []
                        this.$message({
                            type: 'warning',
                            message: res.data.msg
                        })
                    }
                })
                this.$http.post(api.device.manufacturer).then(res => {
                    if (res.data.code === 1) {
                        this.manufacturerList = res.data.data
                        if (this.manufacturerList.length > 0) this.detailVal.manufacturer_id = this.manufacturerList[0].id
                    } else {
                        this.manufacturerList = []
                        this.$message({
                            type: 'warning',
                            message: res.data.msg
                        })
                    }
                })
            },
            importPlayer (res) {
                if (res.code === 1) {
                    this.$message({
                        type: 'success',
                        message: '导入成功'
                    })
                } else {
                    this.$message({
                        type: 'error',
                        message: res.msg
                    })
                }

            },
            // 添加
            addItem () {
                this.type = 'add'
                this.detailVal = {
                    manufacturer_id:'',  //  厂商ID
                    model_id:'',     //型号ID
                    serial_number:'',     //编号
                    alias:'',     //别名
                    mac_address:'',     //MAC地址
                    time: '',
                    key_start_time:'',     //私钥有效时间（前）
                    key_end_time:'',     //私钥有效时间（后）
                    agent_id:'',     //代理商ID
                    region_agent_id:'',     //区域代理商ID
                    cinema_id:'',     //影院ID
                    hall_id:'',     //影厅ID
                }
                this.editModal = true
                this.getGroupList()
            },
            // 获取详情
            getDetail (item) {
                this.modalLoading = true
                this.$http.get(api.device.detail, {
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
                        this.$set(this.detailVal, 'time', [this.detailVal.key_start_time, this.detailVal.key_end_time])
                        // this.detailVal.time = [this.detailVal.key_start_time, this.detailVal.key_end_time]
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
            selectOpen1 (val) {
                this.openSelect1 = val
            },
            statusChange (item) {
                this.$confirm(item.status === '禁用' ? '此操作将启用该用户, 是否继续?' : '此操作将禁用该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.get(api.account.disable, {
                        params: {
                            id: item.id,
                            status: item.status=='禁用' ? 1 : 2
                        }
                    }).then(res => {
                        if(res.data.code === 1) {
                            this.$message({
                                type: 'success',
                                message: '操作成功'
                            })
                            if (item.status === '禁用') {
                                item.status = '启用'
                            } else {
                                item.status = '禁用'
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
                this.validateTime()
                this.validateManufacturer(this.detailVal.manufacturer_id)
                this.validateModel(this.detailVal.model_id)
                this.validateSerial_number(this.detailVal.serial_number)
                this.validateMac_address(this.detailVal.mac_address)
                if ( this.manufacturerError || this.modelError || this.serial_numberError || this.mac_addressError || this.timeError) {
                    this.$message({
                        type: 'warning',
                        message: '您填写的信息格式错误'
                    })
                    return
                }
                if (this.type === 'edit') {
                    this.$http.post(api.device.editplay, this.detailVal).then(res => {
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
                    this.$http.post(api.device.addplay, this.detailVal).then(res => {
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

            // 厂商ID
            validateManufacturer (val) {
                this.manufacturerError = val ? false : true
            },
            //型号ID
            validateModel (val) {
                this.modelError = val ? false : true
            },
            //编号
            validateSerial_number (val) {
                this.serial_numberError = val ? false : true
            },
            //MAC地址
            validateMac_address (val) {
                this.mac_addressError = this.vMac(val)
            },
            validateTime () {
                if (this.detailVal.time.length === 2) {
                    this.detailVal.key_start_time = this.detailVal.time[0]
                    this.detailVal.key_end_time = this.detailVal.time[1]
                    this.timeError = false
                } else {
                    this.timeError = true
                }
            },
            vUsername: validate.username,
            vEmail: validate.email,
            vMobile: validate.mobile,
            vPassword: validate.password,
            vMac: validate.mac,
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
                this.$router.replace({name: 'equipment_list', query: {page: val}})
                this.getList()
            },
            limit (val) {
                this.getList()
            },
            'detailVal.manufacturer_id' (val) {
                if (this.openSelect1) {
                    this.detailVal.model_id = ''
                }
                this.$http.post(api.device.model, {
                    manufacturer_id: val
                }).then(res => {
                    if (res.data.code === 1) {
                        this.modelList = res.data.data
                        if (this.modelList.length > 0) this.detailVal.model_id = this.modelList[0].id
                    } else {
                        this.modelList = []
                        this.$message({
                            type: 'warning',
                            message: res.data.msg
                        })
                    }
                })
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
                    filter: 1, // 1代表只查未绑定过设备的影厅
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
            editModal (val) {
                if (val) {
                    this.manufacturerError = false
                    this.modelError = false
                    this.serial_numberError = false
                    this.mac_addressError = false
                    this.timeError = false
                } else {
                    document.getElementsByClassName('el-dialog__body')[0].scrollTo(0, 0)
                }
            },
            searchShow (val) {
                if (val) {
                    this.$http.post(api.device.manufacturer).then(res => {
                        if (res.data.code === 1) {
                            this.searchOptions[0].options = res.data.data.map(val => {
                                return {
                                    value: val.id,
                                    label: val.name
                                }
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

